import os
import json
from requests import Session
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects


X_CMC_PRO_API_KEY = os.environ.get('X_CMC_PRO_API_KEY')
URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest'
HEADERS = {
    'X-CMC_PRO_API_KEY': X_CMC_PRO_API_KEY,
    'Accept': 'application/json'
}


def currency_request(*args):
    session = Session()
    session.headers.update(HEADERS)
    symbol = ','.join(args)
    try:
        response = session.get(URL, params={'symbol': '%s' % symbol})
        data = json.loads(response.text)
        return data.get('data')
    except (ConnectionError, Timeout, TooManyRedirects) as e:
        print(e)
        return None
