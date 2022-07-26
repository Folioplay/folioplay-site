import getCurrentWalletProvider from "./getCurrentWalletProvider";
import { ethers } from "ethers";
import NFTMarketPlace from "../../../contracts/NFTMarketplace.json";

export default async function  checkNFTHolder(nft_list, account) {
  if(nft_list[0].name === '') {
    let providerWallet = "https://polygon-mumbai.g.alchemy.com/v2/0fxK7G9YegGNIVwnav0XwkoMV9bb7qf1";
    const provider = new ethers.providers.JsonRpcProvider(providerWallet);
    const contract = new ethers.Contract(
        "0x635FA71793EB8d6f2f71D88560096805448a8E4C",
        NFTMarketPlace.abi,
        provider
    );
    console.log(nft_list);
    console.log(account);
    let returnValue = false;
    for (let i = 0; i < nft_list.length; i++) {
      console.log(nft_list[i].address);
      if (await contract.checkNFTowner(
          nft_list[i].address,
          account
      )) {
        returnValue = true;
        break;
      }
    }
    return returnValue;
  }
  return false;
}
