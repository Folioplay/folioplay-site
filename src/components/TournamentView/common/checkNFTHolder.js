import getCurrentWalletProvider from "./getCurrentWalletProvider";
import { ethers } from "ethers";
import NFTMarketPlace from "../../../contracts/NFTMarketplace.json";

export default async function  checkNFTHolder(nft_list, account) {
  // let providerWallet = await getCurrentWalletProvider();
  // console.log(providerWallet);
  let providerWallet = "https://rpc-mumbai.maticvigil.com";
  // const signer = providerWallet.getSigner();
  // "https://rpc-mumbai.maticvigil.com
  const provider = new ethers.providers.JsonRpcProvider(providerWallet);
  const contract = new ethers.Contract(
    "0x635FA71793EB8d6f2f71D88560096805448a8E4C",
    NFTMarketPlace.abi,
    provider
    // signer
  );
  console.log(nft_list);
  console.log(account);
  let returnValue = false;
  for (let i=0; i< nft_list.length; i++){
    console.log(nft_list[i].address);
    if(await contract.checkNFTowner(
        nft_list[i].address,
        account
    )){
     returnValue = true;
     break;
    }
  }
  return returnValue;
}
