import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getCoinsAsync,toggleSelected } from "../../../Redux/Coins/CoinsSlice";

function SelectedTopCoins() {
    const coinsRedux = useSelector((state) => state.coinsSlice.coins);
    
  return (
  <>
  {coinsRedux?.filter((coin) => coin.selected)
                .map((coin, index) => (
                    <div style={{width:"27px",height:"26px",backgroundColor:"white",borderRadius:"50%",color:"black",textAlign:"center",fontSize:"0.9rem",alignItems:"center",overflow:"hidden"}} >
                      <img src={coin.imageUrl} key={index} style={{width:"21px",padding:"2.5px 0 0 0"}}/>           
                    </div>                
                  ))}
  </>
  )
}

export default SelectedTopCoins