import datetime
import json
import os

import psycopg2

from flask import (abort, Flask, jsonify, make_response, redirect,
                  request, session)
from flask_session import Session


app = Flask(__name__, static_folder='../build', static_url_path='/')
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

_SUPPORTED_LOCALES = ('en', 'fi')


def get_dbcon():
    dbcon = psycopg2.connect(host=os.environ['SQL_HOST'],
                             database=os.environ['DB_NAME'],
                             user=os.environ['ROLE_NAME'],
                             password=os.environ['ROLE_PASSWORD'])
    return dbcon


@app.route('/')
def index():

    if not session.get('answer-id'):
        # If this is the initial entry, add timestamp to database and
        # return a session cookie.
        page_loaded_dt = datetime.datetime.now()

        with get_dbcon() as dbcon:
            with dbcon.cursor() as cur:
                # Add entry to database; Page was visited.
                cur.execute(
                    """
                    INSERT INTO
                        survey_answers (page_loaded, locale)
                    VALUES (%s, 'fi')
                    RETURNING dbid
                    ;""", (page_loaded_dt,))
                dbid = cur.fetchone()

        # Set session cookie.
        session['answer-id'] = dbid

    response = make_response(app.send_static_file('index.html'))
    return response


@app.route('/set-locale', methods=('POST',))
def set_locale():
    if not session.get('answer-id'):
        abort(400)

    if 'locale' not in request.json.keys():
        abort(400)

    locale = request.json['locale'].lower()
    dbid = session['answer-id'][0]

    if locale not in _SUPPORTED_LOCALES:
        abort(400)

    with get_dbcon() as dbcon:
        with dbcon.cursor() as cur:
            # Update language.
            cur.execute(
                """
                UPDATE
                    survey_answers
                SET
                    locale = %s
                WHERE
                    dbid = %s
                ;""", (locale, dbid))
            dbcon.commit()

    response = jsonify(success=True)
    return response


@app.route('/set-survey-start', methods=('POST',))
def set_survey_start():
    if not session.get('answer-id'):
        abort(400)

    dbid = session['answer-id'][0]

    with get_dbcon() as dbcon:
        with dbcon.cursor() as cur:
            # Update survey starting timestamp (only the first time,
            # even if the respondent decides to return to the start
            # page).
            survey_start_dt = datetime.datetime.now()
            cur.execute(
                """
                UPDATE
                    survey_answers
                SET
                    started = COALESCE(started, %s)
                WHERE
                    dbid = %s
                ;""", (survey_start_dt, dbid))
            dbcon.commit()

    response = jsonify(success=True)
    return response


@app.route('/survey-complete', methods=('POST',))
def survey_complete():
    if not session.get('answer-id'):
        abort(400)

    dbid = session['answer-id'][0]

    results_json = request.json.copy()

    # Survey completed; Reset the session cookie in case the user
    # decides to reload the page and redo the survey.
    session['answer-id'] = None

    # Make sure each key has either a real or a None value.
    results_json['data-collect-consent'] = results_json.get('data-collect-consent')
    results_json['email'] = results_json.get('email')
    results_json['answers'] = results_json.get('answers')
    results_json['result'] = results_json.get('result')

    if not results_json['data-collect-consent']:
        # If consent is not given, make sure potential personal data is
        # not even accidentally stored.
        results_json['email'] = None
        results_json['answers'] = None
        results_json['result'] = None

    if results_json['result'] is not None:
        # The result is stored as an integer that references the study
        # programs table.
        results_json['result'] = int(results_json['result'])

    locale = None
    if results_json['answers'] is not None:
        # Delete redundant fields from the answers.
        if 'language_selection' in results_json['answers']:
            # Grab the locale from the results: This is the language
            # the survey was finished in. In case it happens to be
            # different than the one in database, we update the row.
            locale = results_json['answers']['language_selection'].lower()
            del results_json['answers']['language_selection']

        if 'data_collection_consent' in results_json['answers']:
            del results_json['answers']['data_collection_consent']

        if 'email_address' in results_json['answers']:
            del results_json['answers']['email_address']

        # If the answers are provided and we can store them, cast them
        # to string. Casting None into "null" is not very useful.
        results_json['answers'] = json.dumps(results_json['answers'])

    # TODO: Encrypt email address.

    with get_dbcon() as dbcon:
        with dbcon.cursor() as cur:
            cur.execute(
            """
            SELECT
                completed IS NOT NULL
            FROM
                survey_answers
            WHERE
                dbid = %s
            ;""", (dbid, )
            )
            already_answered = cur.fetchone()[0]
            if already_answered:
                # Technically this check is a bit redundant with the
                # session dbid check, but it does not hurt to make sure.
                abort(403)

            survey_complete_dt = datetime.datetime.now()
            params = (
                results_json['data-collect-consent'],
                survey_complete_dt,
                locale,
                results_json['email'],
                results_json['answers'],
                results_json['result'],
                dbid,
            )
            try:
                # Update locale only if the new value is not NULL (None)
                # regardless of the previous value.
                cur.execute(
                    """
                    UPDATE
                        survey_answers
                    SET
                        consent_given = %s,
                        completed = %s,
                        locale = COALESCE(%s, locale),
                        email = %s,
                        answers = %s,
                        result = %s
                    WHERE
                        dbid = %s
                    ;""", params)
                dbcon.commit()
            except Exception as e:
                print(e)
                abort(400)

    response = jsonify(success=True)
    return response


if __name__ == '__main__':
    app()

