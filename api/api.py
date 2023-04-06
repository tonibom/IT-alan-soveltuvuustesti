import datetime
import os

import psycopg2

from flask import Flask
from flask import jsonify


app = Flask(__name__, static_folder='../build', static_url_path='/')


def get_dbcon():
    dbcon = psycopg2.connect(host=os.environ['SQL_HOST'],
                             database=os.environ['DB_NAME'],
                             user=os.environ['ROLE_NAME'],
                             password=os.environ['ROLE_PASSWORD'])
    return dbcon


@app.route('/')
def index():
    page_loaded_dt = datetime.datetime.now()

    with get_dbcon() as dbcon:
        with dbcon.cursor() as cur:
            cur.execute(
                """
                INSERT INTO
                    survey_answers (page_loaded)
                VALUES (%s)
                ;""", (page_loaded_dt,))

    return app.send_static_file('index.html')


if __name__ == '__main__':
    app()

