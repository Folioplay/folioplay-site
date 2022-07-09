import getCurrentWalletProvider from "./getCurrentWalletProvider";
import { ethers } from "ethers";
import NFTMarketPlace from "../../../contracts/NFTMarketplace.json";

export default async function checkNFTHolder(nft_list, account) {
  let providerWallet = await getCurrentWalletProvider();
  // console.log(providerWallet);
  const signer = providerWallet.getSigner();
  const contract = new ethers.Contract(
    "0x635FA71793EB8d6f2f71D88560096805448a8E4C",
    NFTMarketPlace.abi,
    signer
  );
  console.log(contract);
  let returnValue = false;
  return await contract.checkNFTowner("0x635FA71793EB8d6f2f71D88560096805448a8E4C",account);
  //       nft_list[i],
  //       account
  //   ))
  // for (let i=0; i< nft_list.length; i++){
  //   if(await contract.checkNFTowner(
  //       nft_list[i],
  //       account
  //   )){
  //    returnValue = true;
  //    break;
  //   }
  // }
  // return returnValue;
}
