import getCurrentWalletProvider from "./getCurrentWalletProvider";
import { ethers } from "ethers";
import NFTMarketPlace from "../../../contracts/NFTMarketplace.json";

export default async function checkNFTHolder(nft_list, account) {
  let providerWallet = await getCurrentWalletProvider();
  console.log(providerWallet);
  const signer = providerWallet.getSigner();
  const contract = new ethers.Contract(
    "0x99Dc6574e41B4c76e747BaDfe61aDec906e92624",
    NFTMarketPlace.abi,
    signer
  );
  let returnValue = false;
  for (let i=0; i< nft_list.length; i++){
    if(await contract.checkNFTowner(
        nft_list[i],
        account
    )){
     returnValue = true;
     break;
    }
  }
  return returnValue;
}
