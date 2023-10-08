import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
export default async function getCurrentWalletProvider() {
  let providerWallet;
  // eslint-disable-next-line default-case
  switch (localStorage.getItem("walletType")) {
    case "metamask":
      providerWallet = new ethers.providers.Web3Provider(window.ethereum);
      break;
    case "walletConnect":
      const providerWC = new WalletConnectProvider({
        rpc: {
          137: "https://polygon-rpc.com/",
        },
      });
      await providerWC.enable();
      providerWallet = new providers.Web3Provider(providerWC);
      break;
  }
  return providerWallet;
}
