import { coinTosymbol } from "../../../CoinAndSymbols/symbols";
export default function preservedView(wasActiveTab, superstars, mooning, rekt) {
  var allButtons = document.getElementsByClassName('coin-add-button');
  var maxSelected = 0;
  var coinsLimit = 2;
  document.getElementById('superstars' + '-selected-number').innerText = document.querySelectorAll("#" + 'superstars' + " .coin-added-button").length;
  document.getElementById('mooning' + '-selected-number').innerText = document.querySelectorAll("#" + 'mooning' + " .coin-added-button").length;
  document.getElementById('rekt' + '-selected-number').innerText = document.querySelectorAll("#" + 'rekt' + " .coin-added-button").length;
  if (wasActiveTab !== undefined && wasActiveTab.length > 0) {
    // console.log("here baby", document.getElementsByClassName('coin-class-selected'));
    var allClasses = document.getElementsByClassName("coinClass");
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
    for (var i = 0; i < allClasses.length; i++) {
      allClasses[i].classList.remove("coin-class-selected");
    }
    document
      .getElementById(wasActiveTab + "-tab")
      .classList.add("coin-class-selected");
    if (wasActiveTab === "superstars") {
      document.getElementById("superstars").classList.remove("display-none");
      document.getElementById("mooning").classList.add("display-none");
      document.getElementById("rekt").classList.add("display-none");
    } else {
      if (wasActiveTab === "mooning") {
        document.getElementById("mooning").classList.remove("display-none");
        document.getElementById("superstars").classList.add("display-none");
        document.getElementById("rekt").classList.add("display-none");
      } else {
        document.getElementById("rekt").classList.remove("display-none");
        document.getElementById("mooning").classList.add("display-none");
        document.getElementById("superstars").classList.add("display-none");
      }
    }
  } else {
    document.getElementById("mooning").classList.add("display-none");
    document.getElementById("rekt").classList.add("display-none");
    document
      .getElementById("superstars-tab")
      .classList.add("coin-class-selected");
  }
}
