import { ethers } from "./ethers-5.6.esm.min.js";

const connectButton = document.getElementById("connectButton");
connectButton.onclick = connect;
const fetchButton = document.getElementById("fetchButton");
fetchButton.onclick = fetch;
const sendButton = document.getElementById("sendButton");
sendButton.onclick = send;

async function connect() {
  if (typeof window.BinanceChain !== "undefined") {
    try {
      await BinanceChain.request({ method: "eth_accounts" });
    } catch (error) {
      console.log(error);
    }
    connectButton.innerHTML = "Connected";
    const accounts = await BinanceChain.request({ method: "eth_accounts" });
    console.log(accounts);
  } else {
    connectButton.innerHTML = "Please install BNB wallet";
  }
}

async function fetch() {
  let currentChainId = BinanceChain.chainId;
  let currentAccount = null;
  const accounts = await BinanceChain.request({ method: "eth_accounts" });
  if (accounts.length === 0) {
    console.log("Please connect to binance extension Wallet");
  } else {
    currentAccount = accounts[0];
    document.getElementsByName("tokenName")[0].value = "BSC Testnet";
    document.getElementsByName("tokenAddress")[0].value = currentAccount;
    document.getElementsByName("tokenSymbol")[0].value = "BNB";
    document.getElementsByName("tokenDecimal")[0].value = "18";
    document.getElementsByName("tokenSupply")[0].value = "4586638";
    if (typeof window.BinanceChain !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.BinanceChain);
      try {
        const balance = await provider.getBalance(currentAccount);
        document.getElementsByName("tokenBalance")[0].value = balance;
      } catch (error) {
        console.log(error);
      }
    } else {
      balanceButton.innerHTML = "Please install binance extension Wallet";
    }
  }
}

async function send() {
  if (window.BinanceChain !== "undefined") {
    const accounts = await BinanceChain.request({ method: "eth_accounts" });
    const toacc = document.getElementsByName("sendAddress");
    const accid = BinanceChain.requestAccounts();
    BinanceChain.transfer({
      fromAddress: accounts[0],
      toAddress: toacc[0],
      asset: "BNB",
      amount: 0.02,
      accountId: accid[0],
      networkId: "bbc-testnet",
    });
  } else {
    console.log("Please connect to BNB Wallet");
  }
}
