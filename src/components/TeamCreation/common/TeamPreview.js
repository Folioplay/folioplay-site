import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoinsAsync,toggleSelected } from "../../../Redux/Coins/CoinsSlice";

export default function TeamPreview() {
  const dispatch = useDispatch();
  const coinsRedux = useSelector((state) => state.coinsSlice.coins);
  const mooningfilter = coinsRedux.filter((coinn) => coinn.category === "Mooning");
const rektfilter = coinsRedux.filter((coinn) => coinn.category === "Defi");
const superstarfilter = coinsRedux.filter((coinn) => coinn.category === "Superstar");

  // superstars = [{ "name": "Bitcoin", "symbol": "btc", "isSelected": true }, { "name": "Ethereum", "symbol": "eth", "isSelected": true }];
  // mooning = [{ "name": "Bitcoin", "symbol": "btc", "isSelected": true }, { "name": "Ethereum", "symbol": "eth", "isSelected": true }];
  // rekt = [{ "name": "Bitcoin", "symbol": "btc", "isSelected": true }, { "name": "Ethereum", "symbol": "eth", "isSelected": true }];
  var superstars = [{ name: "default" }];
  var mooning = [{ name: "default" }, { name: "default" }, { name: "default" }];
  var rekt = [{ name: "default" }, { name: "default" }, { name: "default" }];
  return (
    <div className="team-preview">
      <div className="bucket-preview mb-20">
        <span className="font-size-20" style={{ display: "inline" }}>
          Superstar
        </span>
        <div className="superstars-cover bucket-cover">
          
        {superstarfilter?.filter(coin => coin.selected).map((coin, index) => {
          return (
            <div className="superstars-preview coin-preview mt-20">
              <img src={coin.imageUrl} width="80" height="80" />
            </div>
          );
        })}
        </div>
      </div>
      <div className="bucket-preview mb-20 mt-10">
        <span className="font-size-20" style={{ display: "inline" }}>
          Mooning
        </span>
        <div className="mooning-cover bucket-cover">
        {mooningfilter?.filter(coin => coin.selected).map((coin, index) => {
          return (
            <div className="mooning-preview coin-preview mt-20 ml-20">
              <img src={coin.imageUrl} width="80" height="80" />
            </div>
          );
        })}
        </div>
      </div>
      <div className="bucket-preview mb-20 mt-10">
        <span className="font-size-20" style={{ display: "inline" }}>
          Rekt
        </span>
        <div className="rekt-cover bucket-cover">
        {rektfilter?.filter(coin => coin.selected).map((coin, index) => {
          return (
            <div className="rekt-preview coin-preview mt-20 ml-20">
              <img src={coin.imageUrl} width="80" height="80" />
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
