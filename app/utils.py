import json
from datetime import datetime
from urllib.parse import urljoin
from requests import Session
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects


URL = 'https://www.bitstamp.net/api/v2/ticker/'
HEADERS = {'Accept': 'application/json'}


def currency_request(currency):
    session = Session()
    session.headers.update(HEADERS)
    try:
        response = session.get(url=urljoin(URL, '%susd' % currency))
        data = json.loads(response.text)
        return data
    except (ConnectionError, Timeout, TooManyRedirects, json.decoder.JSONDecodeError) as e:
        print(e)
        return None


def format_currency(data, diff=False):
    negative = True if float(data['last']) - float(data['open']) < 0 else False
    percent = float(data['last']) / float(data['open']) - 1
    difference = (float(data['last']) * percent)
    data = {
        'price': '%s' % data['last'],
        'difference': '%.2f' % difference if not diff else '%.4f' % difference,
        'percent': '%.2f' % ((float(data['last']) - float(data['open'])) * 100 / float(data['last'])),
        'negative': negative,
        'date': datetime.utcnow().strftime('%b %d, %Y, %H:%M:%S')
    }
    return data
