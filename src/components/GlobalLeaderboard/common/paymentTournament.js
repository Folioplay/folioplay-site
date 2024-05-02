import { ethers } from "ethers";
import getCurrentWalletProvider from "./getCurrentWalletProvider";
const provider = new ethers.providers.JsonRpcProvider(
  `https://polygon-rpc.com/`
);
export default async function paymentTournament(user,tournament) {
  const bal = await provider.getBalance(user.get("ethAddress"));

  if(localStorage.getItem("walletType") === "metamask" && window.ethereum.networkVersion!=="137"){
      alert("Please Connect to Polygon Mainnet through metamask");
      return false;
  }
  else{
    if (Number(tournament.entryFee)-0.99 <=  Number(ethers.utils.formatEther(bal))) {
      let providerWallet = await getCurrentWalletProvider();
      const signer = providerWallet.getSigner();
      const gas = await providerWallet.getGasPrice();
      const tx = {
        from: signer._address,
        to: `0xD5f3758458b985106A6AaDB0F5595f4deB7242Db`,
        value: ethers.utils.parseEther(String(tournament.entryFee-0.99)),
        maxFeePerGas: gas,
        maxPriorityFeePerGas: gas,
      };
      const txn = await signer.sendTransaction(tx);
      await txn.wait();
      return true;
    }
    else{
      alert("Your wallet balance is less than the tournament fees");
    }
  }


}
