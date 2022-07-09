import React from "react";

export default function TeamPreview({ superstars, mooning, rekt }) {
    // superstars = [{ "name": "Bitcoin", "symbol": "btc", "isSelected": true }, { "name": "Ethereum", "symbol": "eth", "isSelected": true }];
    // mooning = [{ "name": "Bitcoin", "symbol": "btc", "isSelected": true }, { "name": "Ethereum", "symbol": "eth", "isSelected": true }];
    // rekt = [{ "name": "Bitcoin", "symbol": "btc", "isSelected": true }, { "name": "Ethereum", "symbol": "eth", "isSelected": true }];
    superstars = [{ name: "default" }, { name: "default" }]
    mooning = [{ name: "default" }, { name: "default" }, { name: "default" }, { name: "default" }, { name: "default" }, { name: "default" }]
    rekt = [{ name: "default" }, { name: "default" }, { name: "default" }, { name: "default" }, { name: "default" }, { name: "default" }]
    return (
        <div className="team-preview">
            <div className="bucket-preview mb-20">
                {/* <span className="font-size-20 mr-20">Superstar</span> */}
                {superstars.map((coin, index) => {
                    return (
                        <div className="superstars-preview coin-preview ml-20 mt-10">
                            {/* <img src={require('../../../images/coinLogos/' + coin.symbol.toLowerCase() + '.png').default} width="80" height="80" /> */}
                        </div>

                    );
                })}
            </div>
            <div className="bucket-preview mb-20 mt-10">
                {/* <span className="font-size-20 mr-20">Mooning</span> */}
                {mooning.map((coin, index) => {
                    return (
                        <div className="mooning-preview coin-preview ml-20">
                            {/* <img src={require('../../../images/coinLogos/' + coin.symbol.toLowerCase() + '.png').default} width="80" height="80" /> */}
                        </div>

                    );

                })}
            </div>
            <div className="bucket-preview mb-20 mt-10">
                {/* <span className="font-size-20 mr-20">Rekt</span> */}
                {rekt.map((coin, index) => {
                    return (
                        <div className="rekt-preview coin-preview ml-20">
                            {/* <img src={require('../../../images/coinLogos/' + coin.symbol.toLowerCase() + '.png').default} width="80" height="80" /> */}
                        </div>

                    );
                })}
            </div>
        </div>
    );
}