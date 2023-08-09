import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";


const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          1: "https://mainnet.infura.io/v3/498f412c002d42d8ba75293910cae6f8",
          4: "https://rinkeby.infura.io/v3/498f412c002d42d8ba75293910cae6f8",
          56: "https://bsc-dataseed.binance.org/",
          97: "https://bsc-dataseed.binance.org/",
          42161: "https://nd-829-997-700.p2pify.com/790712c620e64556719c7c9f19ef56e3"
        },
      },
    },
  };
  
  const web3Modal = () =>
    new Web3Modal({
      cacheProvider: true,
      providerOptions, // required
    });
  
  function initWeb3(provider) {
    const web3 = new Web3(provider);
  
    web3.eth.extend({
      methods: [
        {
          name: "chainId",
          call: "eth_chainId",
          outputFormatter: web3.utils.hexToNumber,
        },
      ],
    });
  
    return web3;
  }
  
  export const disconnectWeb3 = async () => {
    const modal = web3Modal();
    await modal.clearCachedProvider();
  };
  
  const subscribeProvider = async (provider, web3, setAddress, setConnected, setNetwork) => {
    if (!provider.on) {
      return;
    }
    provider.on("close", () => disconnectWeb3());
    provider.on("onConnect", async (accounts) => { 
      setAddress(accounts[0]);
    });
  
    provider.on("accountsChanged", async (accounts) => { 
      setAddress(accounts[0]); 
      setConnected(false); 
    });
    provider.on("chainChanged", async (chainId) => {
      const networkId = await web3.eth.net.getId(); 
      setNetwork(networkId);  //chnaged from chain id
      setConnected(false);
    });
  
    provider.on("networkChanged", async (networkId) => {
      const chainId = await web3.eth.chainId(); 
      setNetwork(chainId);
      setConnected(false);
    });
  };

 export const connectWeb3 = async (setAddress, setConnected, setWeb3, setNetwork, toast) => { 
    try {
      const modal = web3Modal();
      const provider = await modal.connect();
      const web3 = await initWeb3(provider);
      const accounts = await web3.eth.getAccounts();
      const network = await web3.eth.chainId();
      const address = accounts[0];
      setWeb3(web3);
      setNetwork(network);
      setConnected(true);
      setAddress(address); 
      const walletInformation = {address: address, network: network}; 
      await subscribeProvider(provider, web3, setAddress, setConnected, setNetwork);
      return walletInformation; 
    } catch (e) {
      // toast.error(`Error Occured ${e}`); 
    }
  };
