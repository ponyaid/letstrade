import {CountUp} from 'countup.js';


let subscribeBtcMsg = {
    "event": "bts:subscribe",
    "data": {
        "channel": "live_trades_btcusd"
    }
};

let subscribeEthMsg = {
    "event": "bts:subscribe",
    "data": {
        "channel": "live_trades_ethusd"
    }
};

let subscribeXrpMsg = {
    "event": "bts:subscribe",
    "data": {
        "channel": "live_trades_xrpusd"
    }
};


initWebsocket();


function getDate() {
    let date = Date.now();
    let offset = new Date().getTimezoneOffset();
    let gmt = new Date(date + (offset * 60000));
    let opt = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        // hour12: false
    };
    return gmt.toLocaleDateString('en-GB', opt)
}


function countAnimation(target, startVal, endVal, d) {
    const options = {
        startVal: startVal,
        decimalPlaces: d,
        separator: '',
        prefix: '$',
    };
    let demo = new CountUp(target, endVal, options);
    if (!demo.error) {
        demo.start();
    } else {
        console.error(demo.error);
    }
}


function serializePrice(channel, data) {
    let element = document.getElementById(channel);

    let date = getDate();
    let dateElement = element.querySelector('.currency-item__date');
    dateElement.innerHTML = date;

    let target = element.querySelector('.currency-item__price');
    let startVal = parseFloat(target.textContent.substr(1));

    if (channel === 'live_trades_xrpusd') {
        countAnimation(target, startVal, data.price, 5)
    } else {
        countAnimation(target, startVal, data.price, 2)
    }

}


function initWebsocket() {
    let ws = new WebSocket("wss://ws.bitstamp.net");

    ws.onopen = function () {
        ws.send(JSON.stringify(subscribeBtcMsg));
        ws.send(JSON.stringify(subscribeEthMsg));
        ws.send(JSON.stringify(subscribeXrpMsg));
    };

    ws.onmessage = function (evt) {
        let response = JSON.parse(evt.data);

        switch (response.event) {
            case 'trade': {
                serializePrice(response.channel, response.data);
                break;
            }
            case 'bts:request_reconnect': {
                initWebsocket();
                break;
            }
        }

    };

    ws.onclose = function () {
        console.log('Websocket connection closed');
        initWebsocket();
    };
}
