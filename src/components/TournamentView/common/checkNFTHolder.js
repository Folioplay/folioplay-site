import getCurrentWalletProvider from "./getCurrentWalletProvider";
import { ethers } from "ethers";
import NFTMarketPlace from "../../../contracts/NFTMarketplace.json";

export default async function checkNFTHolder() {
  let providerWallet = await getCurrentWalletProvider();
  console.log(providerWallet);
  const signer = providerWallet.getSigner();
  console.log(signer);
  const contract = new ethers.Contract(
    "0x99Dc6574e41B4c76e747BaDfe61aDec906e92624",
    NFTMarketPlace.abi,
    signer
  );

  return await contract.checkNFTowner(
    "0xead495ad5324219A0a6384E6a0924335baE8cfFf",
    "0x79650abEA193B0a6b8Ae25e2b95ee880C6Ba5b9e"
  );
}
