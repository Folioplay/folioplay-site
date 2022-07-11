import getCurrentWalletProvider from "./getCurrentWalletProvider";
import { ethers } from "ethers";
import NFTMarketPlace from "../../../contracts/NFTMarketplace.json";

export default async function  checkNFTHolder(nft_list, account) {
  let providerWallet = await getCurrentWalletProvider();
  // console.log(providerWallet);
  // let providerWallet = "https://rpc-mumbai.matic.today";
  // const signer = providerWallet.getSigner();
  const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com")
  const contract = new ethers.Contract(
    "0x635FA71793EB8d6f2f71D88560096805448a8E4C",
    NFTMarketPlace.abi,
    provider
    // signer
  );

  console.log(account);
  let returnValue = false;
  // let val = await contract.checkNFTowner("0x635FA71793EB8d6f2f71D88560096805448a8E4C",account);
  // console.log(val);
  // return val;
  //       nft_list[i],
  //       account
  //   ))
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
