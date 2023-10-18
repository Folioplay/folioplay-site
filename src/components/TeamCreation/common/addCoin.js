import { coinTosymbol } from "../../../CoinAndSymbols/symbols";
import updateSelectedCoins from "./updateSelectedCoins";
import { S3_URL } from "../../../APIS/apis";
export default function addCoin(
  event,
  wasActiveTab,
  superstars,
  mooning,
  rekt
) {
  var checkArray =
    wasActiveTab === "superstars"
      ? superstars
      : wasActiveTab === "mooning"
      ? mooning
      : rekt;
  var coinsLimit = wasActiveTab === "superstars" ? 2 : 6;
  const prevVal = event.target.innerText.replace("\n","");
  const clickedCoin = event.target.previousSibling.innerText;
  const updateCoin = prevVal === "ADD" ? true : false;
  var allButtons = document.getElementsByClassName("coin-add-button");
  var totalAddedCoins = document.getElementsByClassName('coin-added-button').length;
  var maxSelected = 0;
  for (var i = 0; i < checkArray.length; i++) {
    if (checkArray[i].selected) maxSelected++;
  }
  totalAddedCoins = updateCoin ? totalAddedCoins + 1 :totalAddedCoins-1;
  
  // else{
  if ((maxSelected >= coinsLimit || totalAddedCoins > 11) && updateCoin) {
    document
      .getElementsByClassName("error-cannot-add-coin")[0]
      .classList.remove("show");
    document
      .getElementsByClassName("error-cannot-add-coin")[0]
      .classList.add("show");
    setTimeout(() => {
      var selectedClass = document.getElementsByClassName(
        "error-cannot-add-coin"
      );
      if (selectedClass.length > 0) selectedClass[0].classList.remove("show");
    }, 2000);
    // for (var i = 0; i < allButtons.length; i++) {
    //   if (allButtons[i].innerText === "ADD") {
    //     allButtons[i].classList.add("disabled-button");
    //   }
    // }
  } else {
    updateSelectedCoins({ wasActiveTab, add: updateCoin });
    event.target.classList.toggle("coin-add-button");
    event.target.classList.toggle("coin-added-button");
    maxSelected = 0;
    for (var i = 0; i < checkArray.length; i++) {
      if (checkArray[i].name === clickedCoin) {
        checkArray[i].selected = updateCoin;
      }
      if (checkArray[i].selected) maxSelected++;
    }
    if(totalAddedCoins == 11){
      for (var i = 0; i < allButtons.length; i++) {
        if (allButtons[i].innerText === "ADD") {
          allButtons[i].classList.add("disabled-button");
        }
      }
    }else{
      if (maxSelected === coinsLimit) {
        for (var i = 0; i < allButtons.length; i++) {
          if (allButtons[i].innerText === "ADD") {
            allButtons[i].classList.add("disabled-button");
          }
        }
      }else{
        if (maxSelected == coinsLimit - 1 || totalAddedCoins < 11) {
          for (var i = 0; i < allButtons.length; i++) {
            if (allButtons[i].innerText === "ADD") {
              allButtons[i].classList.remove("disabled-button");
            }
          }
        }
      }
    }
    
    
    if (updateCoin === true) {
      var bucketPreview = document.getElementsByClassName(
        wasActiveTab + "-preview"
      );
      var emptySpot = false;
      for (var i = 0; i < bucketPreview.length; i++) {
        if (bucketPreview[i].childElementCount === 0) {
          var coinImage = document.createElement("img");
          coinImage.src = S3_URL +
            coinTosymbol[clickedCoin.toLowerCase()].toLowerCase() +
            ".png";
          coinImage.width = "75";
          coinImage.height = "75";
          coinImage.id = clickedCoin + "-preview";
          bucketPreview[i].appendChild(coinImage);
          emptySpot = true;
          break;
        }
      }
      if (!emptySpot) {
        var newSpot = document.createElement("div");
        var buckets = document.getElementsByClassName(wasActiveTab + "-cover");
        newSpot.classList.add(
          wasActiveTab + "-preview",
          "coin-preview",
          "ml-20"
        );
        var coinImage = document.createElement("img");
        coinImage.src = S3_URL +
          coinTosymbol[clickedCoin.toLowerCase()].toLowerCase() +
          ".png";
        coinImage.width = "75";
        coinImage.height = "75";
        coinImage.id = clickedCoin + "-preview";
        newSpot.appendChild(coinImage);
        newSpot.classList.add("mt-20");
        buckets[0].appendChild(newSpot);
        // if (wasActiveTab === "superstars") {
        //   newSpot.classList.add("mt-10");
        //   buckets[0].appendChild(newSpot);
        // }
        // if (wasActiveTab === "mooning") {
        //   buckets[1].appendChild(newSpot);
        // }
        // if (wasActiveTab === "rekt") {
        //   buckets[2].appendChild(newSpot);
        // }
      }
    } else {
      var bucketPreview = document.getElementsByClassName(
        wasActiveTab + "-preview"
      );
      if (wasActiveTab === "superstars" && bucketPreview.length > 1) {
        document
          .getElementById(clickedCoin + "-preview")
          .parentElement.remove();
      } else {
        if (
          (wasActiveTab === "mooning" || wasActiveTab === "rekt") &&
          bucketPreview.length > 3
        ) {
          document
            .getElementById(clickedCoin + "-preview")
            .parentElement.remove();
        } else {
          document.getElementById(clickedCoin + "-preview").remove();
        }
      }
    }
    window.localStorage.setItem(wasActiveTab, JSON.stringify(checkArray));
    event.target.innerText = prevVal === "ADD" ? "ADDED" : "ADD";
  }

  localStorage.removeItem("allCoins");
  var ac = [...rekt,...mooning,...superstars];
  localStorage.setItem("allCoins", JSON.stringify(ac));
  

// }
}
