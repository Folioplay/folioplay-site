import { coinTosymbol } from "../../../CoinAndSymbols/symbols";
export default function teamPreview({ superstars, mooning, rekt }) {
    console.log(superstars);
    for (var j = 0; j < superstars.length; j++) {
        var bucketPreview = document.getElementsByClassName("superstars-preview");
        if (superstars[j].selected) {
            for (var i = 0; i < bucketPreview.length; i++) {
                if (bucketPreview[i].childElementCount === 0) {
                    var coinImage = document.createElement('img');
                    coinImage.src = require('../../../images/coinLogos/' + coinTosymbol[superstars[j].name.toLowerCase()].toLowerCase() + ".png").default;
                    coinImage.width = "80";
                    coinImage.height = "80";
                    coinImage.id = superstars[j].name + "-preview";
                    bucketPreview[i].appendChild(coinImage);
                    break;
                }
            }
        }
    }
    for (var j = 0; j < mooning.length; j++) {
        var bucketPreview = document.getElementsByClassName("mooning-preview");
        if (mooning[j].selected) {
            for (var i = 0; i < bucketPreview.length; i++) {
                if (bucketPreview[i].childElementCount === 0) {
                    var coinImage = document.createElement('img');
                    coinImage.src = require('../../../images/coinLogos/' + coinTosymbol[mooning[j].name.toLowerCase()].toLowerCase() + ".png").default;
                    coinImage.width = "80";
                    coinImage.height = "80";
                    coinImage.id = mooning[j].name + "-preview";
                    bucketPreview[i].appendChild(coinImage);
                    break;
                }
            }
        }
    }
    for (var j = 0; j < rekt.length; j++) {
        var bucketPreview = document.getElementsByClassName("rekt-preview");
        if (rekt[j].selected) {
            for (var i = 0; i < bucketPreview.length; i++) {
                if (bucketPreview[i].childElementCount === 0) {
                    var coinImage = document.createElement('img');
                    coinImage.src = require('../../../images/coinLogos/' + coinTosymbol[rekt[j].name.toLowerCase()].toLowerCase() + ".png").default;
                    coinImage.width = "80";
                    coinImage.height = "80";
                    coinImage.id = rekt[j].name + "-preview";
                    bucketPreview[i].appendChild(coinImage);
                    break;
                }
            }
        }
    }
} 