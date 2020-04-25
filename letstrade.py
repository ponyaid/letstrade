import os
import logging
from threading import Thread

from flask import request, render_template, abort, session, redirect, Response
from flask_mail import Message

from app import create_app, mail
from config import Config
from app.utils import currency_request, format_currency
from app.models import *
from app.database import db

app = create_app(Config)


def send_email(msg):
    with app.app_context():
        try:
            mail.send(msg)
        except Exception as e:
            app.logger.error(e)


@app.route('/get_session', methods=['GET'])
def get_session():
    if request.method == 'GET':
        session.permanent = True
        session['terms'] = os.urandom(24)
        return redirect(request.args.get('next'))
    abort(405)


@app.route('/index_form/', methods=['POST'])
def index_form():
    if request.method == 'POST' and request.json:
        email = request.json.get('email')
        lead = Lead(email=email)
        db.session.add(lead)
        db.session.commit()

        if app.config['SEND_MESSAGE']:
            msg = Message('LETS.TRADE',
                          sender=app.config.get('SENDER'),
                          recipients=[email])

            with open('email.html', 'r') as f:
                html = f.read()

            msg.html = html

            Thread(target=send_email, args=(msg,)).start()

        return Response(status=200)

    abort(405)


@app.route('/', methods=['GET'])
def index():
    app.logger.debug('this is a DEBUG message')
    if request.method == 'GET':
        currency_data = dict()
        btc_data = currency_request('btc')
        eth_data = currency_request('eth')
        xrp_data = currency_request('xrp')
        if btc_data and eth_data and xrp_data:
            currency_data = {
                'BTC': format_currency(btc_data),
                'ETH': format_currency(eth_data),
                'XRP': format_currency(xrp_data),
            }
        return render_template('index.html', data=currency_data)
    abort(405)


@app.route('/faq', methods=['GET'])
def faq():
    if request.method == 'GET':
        return render_template('faq.html')
    abort(405)


@app.route('/guides', methods=['GET'])
def guides():
    if request.method == 'GET':
        return render_template('guides.html')
    abort(405)


@app.route('/statistics', methods=['GET'])
def statistics():
    if request.method == 'GET':
        return render_template('statistics.html')
    abort(405)


if __name__ == '__main__':
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)
    app.run()
