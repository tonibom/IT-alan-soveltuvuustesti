import datetime
import os

import psycopg2

from flask import Flask, jsonify, make_response, request, session
from flask_session import Session

app = Flask(__name__, static_folder='../build', static_url_path='/')
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)


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
                        survey_answers (page_loaded)
                    VALUES (%s)
                    RETURNING dbid
                    ;""", (page_loaded_dt,))
                dbid = cur.fetchone()

        # Set session cookie.
        session['answer-id'] = dbid

    response = make_response(app.send_static_file('index.html'))
    return response


if __name__ == '__main__':
    app()

