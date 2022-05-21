import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { coinTosymbol } from '../../../CoinAndSymbols/symbols';
// "autosize": false,
// "showVolume": false,
// "scalePosition": "no",
// "scaleMode": "Normal",
// "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
// "noTimeScale": false,
// "valuesTracking": "1",
// "chartType": "",
// "${coinTosymbol[coin]}",
function OpenChart({ coin }) {
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            let scriptContent = `
            <!-- TradingView Widget BEGIN -->
            new TradingView.widget(
                {
                "symbol": "${coinTosymbol[coin]}"+"USD",
                lineColor: 'rgba(69, 61, 241, 1)',
                topColor: 'rgba(69, 61, 241, 0.35)',
                bottomColor: 'rgba(69, 61, 241, 0)',
                rightPriceScale: {
                    borderVisible: true,
                },
                "chartOnly": false,
                "width": "100%",
                "min-width": "200px",
                "height": "400px",
                "locale": "en",
                "colorTheme": "dark",
                "gridLineColor": "rgba(240, 243, 250, 0.3)",
                "fontColor": "#787B86",
                "isTransparent": false,
                "interval": "D",
                "timezone": "Etc/UTC",
                "theme": "dark",
                "style": "3",
                "locale": "en",
                "toolbar_bg": "#f1f3f6",
                "enable_publishing": true,
                "border-radius":"10px",
                "allow_symbol_change": true,
                "container_id": "tradingview_7f1fe"
              }
                );
            <!-- TradingView Widget END -->`
            let newScript = document.createElement("script");
            newScript.type = 'text/javascript';
            newScript.async = true;
            newScript.innerHTML = `${scriptContent}`;
            let firstScript = document.createElement("script");
            firstScript.type = 'text/javascript';
            firstScript.src = "https://s3.tradingview.com/tv.js";
            firstScript.async = true;
            firstScript.addEventListener('load', function () {
                document.body.appendChild(newScript);
            });
            document.body.appendChild(firstScript);
        }
        return () => {
            mounted = false;
        }
    }, [])
    return (
        <div>
            <div className="tradingview-widget-container">
                <div id="tradingview_7f1fe"></div>
                <div className="tradingview-widget-copyright"><a href={`/`} rel="noopener" target="_blank">
                    <span className="blue-text">Chart presented</span></a> by TradingView</div>

            </div>
        </div>
    )
}

export default OpenChart