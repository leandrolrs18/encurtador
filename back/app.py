from flask import Flask
from flask import request, json, render_template, Response, flash, redirect, url_for
import os
from flask_cors import CORS
from hashids import Hashids
from datetime import date, datetime
from connection import run_insert_query, run_select_query, run_update_query, run_select_query_e
from queries import (insert_user, insert_urls, atualize_urls, login_url, busca_urls)

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'this should be a secret random string'

hashids = Hashids(min_length=4, salt=app.config['SECRET_KEY'])


@app.route("/login", methods=['POST'])
def login():

    request_data = request.get_json()
    val = (request_data['user'], request_data['password'])
    res = run_select_query_e(login_url, val)

    if len(res) > 0 : return  str(res[0][0]) 
    else : return ("-1")


@app.route('/show/<idUser>', methods=['GET'])
def exercicio_instrutor_musculo(idUser):
    val = (idUser, )

    return run_select_query(busca_urls, val)


@app.route('/add_url/<idUser>', methods=('GET', 'POST'))
def index(idUser):

    request_data = request.get_json()

    if request.method == 'POST':
        data_ = date.today()
        val = (request_data['link'], data_, idUser )
        url_id = run_insert_query(insert_urls, val, "LINKS")

        hashid = hashids.encode(url_id)
        short_url = 'http://127.0.0.1:3000/' + hashid
        print(short_url)
        val = (short_url, idUser)

        return run_update_query(atualize_urls, val, "LINKS")


if __name__ == "__main__":
        app.run(debug=True)