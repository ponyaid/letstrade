import os

from flask import request, render_template, abort, session, redirect, Response

from app import create_app
from config import Config
from app.utils import currency_request, format_currency
from app.models import *
from app.database import db


app = create_app(Config)

SENDER = 'notify.go.eco.grpup@gmail.com'
SENDER_PASS = '$Joo3m21$J'

app.config.update(dict(
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=587,
    MAIL_USE_TLS=True,
    MAIL_USE_SSL=False,
    MAIL_DEBUG=False,
    MAIL_USERNAME='%s' % SENDER,
    MAIL_PASSWORD='%s' % SENDER_PASS,
    MAIL_DEFAULT_SENDER='%s' % SENDER,
    MAIL_MAX_EMAILS=None,
    MAIL_ASCII_ATTACHMENTS=False,
))


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
        return Response(status=200)
    abort(405)


@app.route('/', methods=['GET'])
def index():
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
    app.run(debug=False)
