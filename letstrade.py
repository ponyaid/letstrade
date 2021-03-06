import os
import base64
import logging
import markdown
import collections
from datetime import datetime
from threading import Thread
from datetime import timedelta
from urllib.parse import urljoin

from flask import request, render_template, abort, session, redirect, Response, send_from_directory, make_response
from flask_mail import Message

from app import create_app, mail
from config import Config
from app.utils import currency_request, format_currency
from app.models import *
from app.database import db


app = create_app(Config)


def format_terms(queries):
    items = {}
    for query in queries:
        if query.year not in items.keys():
            items[query.year] = {
                'average': {query.currency: query.average},
                'number': {query.currency: query.number},
                'yld': {query.currency: query.yld}
            }
        else:
            items[query.year]['average'].update(
                {query.currency: query.average})
            items[query.year]['number'].update(
                {query.currency: query.number})
            items[query.year]['yld'].update(
                {query.currency: query.yld})

    od = collections.OrderedDict(sorted(items.items()))
    return od


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
        app.permanent_session_lifetime = timedelta(days=365)
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

            host = request.url_root
            enc_email = base64.b64encode(email.encode())
            url = urljoin(host, 'unsubscribe/' + enc_email.decode())
            msg.html = html.format(url=url)

            Thread(target=send_email, args=(msg,)).start()

        return Response(status=200)

    abort(405)


@app.route('/', methods=['GET'])
def index():
    time = datetime.now()

    if request.method == 'GET':
        currency_data = dict()
        btc_data = currency_request('btc')
        eth_data = currency_request('eth')
        xrp_data = currency_request('xrp')
        if btc_data and eth_data and xrp_data:
            currency_data = {
                'BTC': format_currency(btc_data),
                'ETH': format_currency(eth_data),
                'XRP': format_currency(xrp_data, True),
            }

        grows = Grow.query.order_by(Grow.year).all()

        shorts = Short.query.order_by(Short.year).all()
        mediums = Medium.query.order_by(Medium.year).all()
        longs = Long.query.order_by(Long.year).all()

        # shorts = format_terms(short_query)
        # mediums = format_terms(medium_query)
        # longs = format_terms(long_query)

        resp = make_response(render_template(
            'index.html',
            data=currency_data,
            grows=grows,
            shorts=shorts,
            mediums=mediums,
            longs=longs
        )
        )
        # resp.headers.add('Set-Cookie', 'SameSite=None; Secure')
        # resp.set_cookie('SameSite', 'None', secure=True)
        app.logger.info(datetime.now() - time)
        return resp

    abort(405)


@app.route('/faq', methods=['GET'])
def faq():
    if request.method == 'GET':

        questions = Question.query.order_by(Question.create).all()

        for question in questions:
            question.body = markdown.markdown(question.body)

        resp = make_response(render_template('faq.html', questions=questions))

        return resp
    abort(405)


@app.route('/guides', methods=['GET'])
def guides():
    if request.method == 'GET':
        return render_template('guides.html')
    abort(405)


@app.route('/statistics2019', methods=['GET'])
def statistics():
    # if request.method == 'GET':
    #     return render_template('statistics.html')
    # abort(405)
    abort(404)


@app.route('/unsubscribe/<enc_email>', methods=['GET'])
def unsubscribe(enc_email):
    email = ''
    try:
        email = base64.b64decode(enc_email.encode()).decode()
    except (base64.binascii.Error, UnicodeDecodeError):
        abort(404)

    lead = Lead.query.filter_by(email=email).first()
    db.session.delete(lead) if lead else None
    db.session.commit()
    return Response(response='Successful unsubscription', status=200)


@app.route('/robots.txt')
@app.route('/sitemap.xml')
def static_from_root():
    return send_from_directory(app.static_folder, request.path[1:])


if __name__ != '__main__':
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)


if __name__ == '__main__':
    app.run()
