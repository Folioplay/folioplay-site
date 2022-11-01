import { coinTosymbol } from "../../../CoinAndSymbols/symbols";
export default function teamPreview({ superstars, mooning, rekt }) {
  console.log(superstars);
  for (var j = 0; j < superstars.length; j++) {
    var bucketPreview = document.getElementsByClassName("superstars-preview");
    if (superstars[j].selected) {
      var emptySpot = false;
      for (var i = 0; i < bucketPreview.length; i++) {
        if (bucketPreview[i].childElementCount === 0) {
          var coinImage = document.createElement("img");
          coinImage.src = require("../../../images/coinLogos/" +
            coinTosymbol[superstars[j].name.toLowerCase()].toLowerCase() +
            ".png").default;
          coinImage.width = "75";
          coinImage.height = "75";
          coinImage.id = superstars[j].name + "-preview";
          bucketPreview[i].appendChild(coinImage);
          emptySpot = true;
          break;
        }
      }
      if (!emptySpot) {
        var newSpot = document.createElement("div");
        var buckets = document.getElementsByClassName("superstars-cover");
        newSpot.classList.add("superstars-preview", "coin-preview", "ml-20");
        var coinImage = document.createElement("img");
        coinImage.src = require("../../../images/coinLogos/" +
          coinTosymbol[superstars[j].name.toLowerCase()].toLowerCase() +
          ".png").default;
        coinImage.width = "75";
        coinImage.height = "75";
        coinImage.id = superstars[j].name + "-preview";
        newSpot.appendChild(coinImage);
        newSpot.classList.add("mt-20");
        buckets[0].appendChild(newSpot);
      }
    }
  }
  for (var j = 0; j < mooning.length; j++) {
    var bucketPreview = document.getElementsByClassName("mooning-preview");
    if (mooning[j].selected) {
      var emptySpot = false;
      for (var i = 0; i < bucketPreview.length; i++) {
        if (bucketPreview[i].childElementCount === 0) {
          var coinImage = document.createElement("img");
          coinImage.src = require("../../../images/coinLogos/" +
            coinTosymbol[mooning[j].name.toLowerCase()].toLowerCase() +
            ".png").default;
          coinImage.width = "75";
          coinImage.height = "75";
          coinImage.id = mooning[j].name + "-preview";
          bucketPreview[i].appendChild(coinImage);
          emptySpot = true;
          break;
        }
      }
      if (!emptySpot) {
        var newSpot = document.createElement("div");
        var buckets = document.getElementsByClassName("mooning-cover");
        newSpot.classList.add("mooning-preview", "coin-preview", "ml-20");
        var coinImage = document.createElement("img");
        coinImage.src = require("../../../images/coinLogos/" +
          coinTosymbol[mooning[j].name.toLowerCase()].toLowerCase() +
          ".png").default;
        coinImage.width = "75";
        coinImage.height = "75";
        coinImage.id = mooning[j].name + "-preview";
        newSpot.appendChild(coinImage);
        newSpot.classList.add("mt-20");
        buckets[0].appendChild(newSpot);
      }
    }
  }
  for (var j = 0; j < rekt.length; j++) {
    var bucketPreview = document.getElementsByClassName("rekt-preview");
    if (rekt[j].selected) {
      var emptySpot = false;
      for (var i = 0; i < bucketPreview.length; i++) {
        if (bucketPreview[i].childElementCount === 0) {
          var coinImage = document.createElement("img");
          coinImage.src = require("../../../images/coinLogos/" +
            coinTosymbol[rekt[j].name.toLowerCase()].toLowerCase() +
            ".png").default;
          coinImage.width = "75";
          coinImage.height = "75";
          coinImage.id = rekt[j].name + "-preview";
          bucketPreview[i].appendChild(coinImage);
          emptySpot = true;
          break;
        }
      }
      if (!emptySpot) {
        var newSpot = document.createElement("div");
        var buckets = document.getElementsByClassName("rekt-cover");
        newSpot.classList.add("rekt-preview", "coin-preview", "ml-20");
        var coinImage = document.createElement("img");
        coinImage.src = require("../../../images/coinLogos/" +
          coinTosymbol[rekt[j].name.toLowerCase()].toLowerCase() +
          ".png").default;
        coinImage.width = "75";
        coinImage.height = "75";
        coinImage.id = rekt[j].name + "-preview";
        newSpot.appendChild(coinImage);
        newSpot.classList.add("mt-20");
        buckets[0].appendChild(newSpot);
      }
    }
  }
}