import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as applicationWrapperActions from "./redux/walletApplicationWrapperActions";
import FerrumJson from "../../../utils/FerrumToken.json";
// import { Networks } from "ferrum-plumbing";
// import { FRM } from "../../helper/bridgeHelpers";
import { RootState } from "../../../redux/rootReducer";
import Web3 from "web3";
import { Big } from "big.js";
import { AbiItem } from "web3-utils";
import { Web3ReactProvider } from "@web3-react/core";

const getLibrary = (provider: any) => {
  return new Web3(provider); // this will vary according to whether you use e.g. ethers or web3.js
};

export const ApplicationWrapper = ({ children }: any) => {
  const dispatch = useDispatch();

  const {
    isConnected,
    walletAddress,
    currentWalletNetwork,
    // walletBalance,
    networkClient,
    isWeb3Initialized,
  } = useSelector((state: RootState) => state.casper.walletConnector);

  const {
    tokenList,
    walletWrapperInitialized,
    // supportedCurrencies,
    groupInfo,
  } = useSelector((state: RootState) => state.casper.walletApplicationWrapper);

  useEffect(() => {
    // console.log("Attempt to intialize app");
    // dispatch(applicationWrapperActions.loadWalletDefaults("frm", tokenList));
  }, []);

  useEffect(() => {
    if (
      isConnected &&
      isWeb3Initialized &&
      networkClient &&
      walletWrapperInitialized
    ) { 
      signIntoServer();
    } else if (
      !isConnected ||
      !isWeb3Initialized ||
      !networkClient ||
      !walletWrapperInitialized
    ) { 
      dispatch(applicationWrapperActions.resetUserProfile());
    }
    // eslint-disable-next-line
  }, [isConnected, walletWrapperInitialized]);

  const signIntoServer = async () => { 
     await getUserProfile(); 
    // dispatch(applicationWrapperActions.getUserProfile(user));
  };

  const getUserProfile = async () => {
    if (networkClient !== undefined) {
      const userTokens = tokenList.filter((item: any) => {
        return item.chainId === currentWalletNetwork;
      });
      const currentNetwork = userTokens[0]?.currency.split(":")[0];
      const currencies = groupInfo.bridgeCurrencies.filter(
        (currency: any) => currency.split(":")[0] === currentNetwork
      );
      const addressesF = currencies.map(async (c: any) => {
        const [network, tokenAddr] = c.split(":");
        let symbol: string = "";
        let decimals: string = "";
        let name: string = "";
        let amount: number | string = 0;
        let balance: number | string = 0;
        // let decimalFactor;
        // const netObj = Networks.for(network);
        if (network === currentNetwork) {
          // if (netObj.baseSymbol === tokenAddr) {
          //   symbol = "";
          //   if (!!networkClient) {
          //     balance = Web3.utils.fromWei(
          //       await networkClient!.eth.getBalance(walletAddress as string)
          //     );
          //     // (balance, "==================");
          //   } else {
          //     balance = "0";
          //   }
          // } else {
          // const token = TokenInfo[c];
          // symbol = token.tokenSymbol;
          const tokenContract = new networkClient.eth.Contract(
            FerrumJson.abi as AbiItem[],
            tokenAddr
          );
          symbol = await tokenContract.methods.symbol().call();
          decimals = (await tokenContract.methods.decimals().call()) as any;
          name = await tokenContract.methods.name().call();
          balance = await tokenContract.methods.balanceOf(walletAddress).call();
          const decimalFactor = 10 ** Number(decimals);
          balance = new Big(balance).div(decimalFactor).toFixed();  
          // }
        }

        return {
          address: walletAddress.toLocaleLowerCase(),
          addressType: "ADDRESS",
          balance: balance,
          currency: c,
          amount,
          humanReadableAddress: walletAddress,
          network: currentNetwork || undefined,
          pendingForDeposit: "0",
          pendingForWithdrawal: "0",
          symbol,
          decimals,
          name,
          addressWithChecksum: walletAddress,
        };
      });
      const addresses = await Promise.all(addressesF);
      const accountGroups = {
        id: "ag1",
        addresses,
      };
      const up = {
        appId: "base",
        displayName: "",
        userId: walletAddress,
        accountGroups: [accountGroups],
        currentNetwork,
      };
      return up;
    }
  };

  return (
    <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>
  );
};
