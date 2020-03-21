import os
from datetime import datetime

from flask import request, render_template, abort, session, redirect, Response

from app import create__app
from config import Config
from app.utils import currency_request
from app.models import Lead
from app.database import db


app = create__app(Config)


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
    currency_data = currency_request('BTC', 'ETH', 'XRP')
    if currency_data:
        currency_data = {
            'BTC': {
                'price': '% .2f' % currency_data['BTC']['quote']['USD']['price'],
                'percent': '% .2f' % currency_data['BTC']['quote']['USD']['percent_change_24h'],
                'negative': True if currency_data['BTC']['quote']['USD']['percent_change_24h'] < 0 else False,
                'date': datetime.now().strftime('%b %d, %Y, %H:%M:%S')
            },
            'ETH': {
                'price': '% .2f' % currency_data['ETH']['quote']['USD']['price'],
                'percent': '% .2f' % currency_data['ETH']['quote']['USD']['percent_change_24h'],
                'negative': True if currency_data['ETH']['quote']['USD']['percent_change_24h'] < 0 else False,
                'date': datetime.now().strftime('%b %d, %Y, %H:%M:%S')
            },
            'XRP': {
                'price': '% .2f' % currency_data['XRP']['quote']['USD']['price'],
                'percent': '% .2f' % currency_data['XRP']['quote']['USD']['percent_change_24h'],
                'negative': True if currency_data['XRP']['quote']['USD']['percent_change_24h'] < 0 else False,
                'date': datetime.now().strftime('%b %d, %Y, %H:%M:%S')
            },
        }
    if request.method == 'GET':
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


if __name__ == '__main__':
    app.run(debug=False)
