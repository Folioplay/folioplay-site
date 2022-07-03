import { coinTosymbol } from "../../../CoinAndSymbols/symbols";
export default function selectRank(event,coins,finalRanks) {
  const rank = event.target.innerText;
  var coinClicked = event.target.parentElement.id;
  var coinClickedName = coinClicked.split("-")[1];
  var allChoicesClickedCoin = document.querySelectorAll(
    "#" + coinClicked + " .rank-choices"
  );
  var allChoices = document.getElementsByClassName("rank-choices");
  for (var i = 0; i < allChoices.length; i++) {
    if (allChoices[i].innerText === rank) {
      allChoices[i].classList.remove("isselected");
    }
  }
  for (var i = 0; i < allChoicesClickedCoin.length; i++) {
    if ([...allChoicesClickedCoin[i].classList].includes("isselected")) {
      document.getElementById(
        "coin-rank-" + allChoicesClickedCoin[i].innerText
      ).src = require("../../../images/default.png").default;
      allChoicesClickedCoin[i].classList.remove("isselected");
    }
  }

  finalRanks[coinClickedName] = parseInt(rank);

  event.target.classList.toggle("isselected");
  for (var i = 0; i < coins.length; i++) {
    if (
      coinClickedName !== coins[i].name.toLowerCase() &&
      finalRanks[coins[i].name.toLowerCase()] === parseInt(rank)
    ) {
      finalRanks[coins[i].name.toLowerCase()] = -1;
      document.getElementById(
        "coin-" + coins[i].name.toLowerCase()
      ).childNodes[1].childNodes[2].innerText = "10000";
    }
    if (finalRanks[coins[i].name.toLowerCase()] === 1) {
      document.getElementById("coin-rank-1").src =
        require("../../../images/coinLogos/" +
          coinTosymbol[coins[i].name.toLowerCase()].toLowerCase() +
          ".png").default;
      document.getElementById(
        "coin-" + coins[i].name.toLowerCase()
      ).childNodes[1].childNodes[2].innerText = "20000";
    }
    if (finalRanks[coins[i].name.toLowerCase()] === 2) {
      document.getElementById("coin-rank-2").src =
        require("../../../images/coinLogos/" +
          coinTosymbol[coins[i].name.toLowerCase()].toLowerCase() +
          ".png").default;
      document.getElementById(
        "coin-" + coins[i].name.toLowerCase()
      ).childNodes[1].childNodes[2].innerText = "17500";
    }
    if (finalRanks[coins[i].name.toLowerCase()] === 3) {
      document.getElementById("coin-rank-3").src =
        require("../../../images/coinLogos/" +
          coinTosymbol[coins[i].name.toLowerCase()].toLowerCase() +
          ".png").default;
      document.getElementById(
        "coin-" + coins[i].name.toLowerCase()
      ).childNodes[1].childNodes[2].innerText = "15000";
    }
  }
}
