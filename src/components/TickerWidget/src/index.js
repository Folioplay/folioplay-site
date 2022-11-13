import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { coinTosymbol } from '../../../CoinAndSymbols/symbols';
import '../style/index.css'
function TickerWidget() {
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            mounted = false;
            let scriptContent = `
            {
                "symbols": [
                {
                "description": "",
                "proName": "COINBASE:BTCUSD"
                },
                {
                "description": "",
                "proName": "COINBASE:ETHUSD"
                },
                {
                "description": "",
                "proName": "COINBASE:ETHUSD"
                },
                {
                "description": "",
                "proName": "COINBASE:SOLUSD"
                },
                {
                "description": "",
                "proName": "COINBASE:USDTUSD"
                },
                {
                "description": "",
                "proName": "BITSTAMP:XRPUSD"
                },
                {
                "description": "",
                "proName": "COINBASE:LTCUSD"
                },
                {
                "description": "",
                "proName": "COINBASE:BCHUSD"
                },
                {
                "description": "",
                "proName": "COINBASE:DOTUSD"
                },
                {
                "description": "",
                "proName": "COINBASE:LINKUSD"
                },
                {
                "description": "",
                "proName": "COINBASE:XLMUSD"
                },
                {
                "description": "",
                "proName": "BINANCEUS:BNBUSD"
                },
                {
                "description": "",
                "proName": "BINANCE:XMRUSD"
                },
                {
                "description": "",
                "proName": "COINBASE:EOSUSD"
                },
                {
                "description": "",
                "proName": "BINANCE:TRXUSD"
                },
                {
                "description": "",
                "proName": "COINBASE:XTZUSD"
                },
                {
                "description": "",
                "proName": "BINANCE:NEOUSD"
                },
                {
                "description": "",
                "proName": "BINANCE:VETUSD"
                },
                {
                "description": "",
                "proName": "COINBASE:MKRUSD"
                },
                {
                "description": "",
                "proName": "COINBASE:DASHUSD"
                },
                {
                "description": "",
                "proName": "BINANCE:ZECUSD"
                },
                {
                "description": "",
                "proName": "BINANCE:IOTAUSD"
                },
                {
                "description": "",
                "proName": "COINBASE:DOGEUSD"
                },
                {
                "description": "",
                "proName": "FTX:HTUSD"
                },
                {
                "description": "",
                "proName": "BITTREX:DFIUSD"
                },
                {
                "description": "",
                "proName": "BINANCE:ZILUSD"
                },
                {
                "description": "",
                "proName": "COINBASE:AAVEUSD"
                },
                {
                "description": "",
                "proName": "COINBASE:UNIUSD"
                },
                {
                "description": "",
                "proName": "COINBASE:COMPUSD"
                },
                {
                "description": "",
                "proName": "COINBASE:YFIUSD"
                },
                {
                "description": "",
                "proName": "COINBASE:SUSHIUSD"
                }
            ],
            "showSymbolLogo": true,
            "colorTheme": "light",
            "isTransparent": false,
            "displayMode": "compact",
            "locale": "in"
            }`
            let newScript = document.createElement("script");
            newScript.type = 'text/javascript';
            newScript.async = true;
            newScript.innerHTML = `${scriptContent}`;
            newScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
            document.getElementById('ticker').appendChild(newScript);
        }
    }, [])
    return (
        <div id="ticker-wrapper">
            <div id="ticker"></div>
        </div>
    )
}

export default TickerWidget