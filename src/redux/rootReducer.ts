import { combineReducers } from "@reduxjs/toolkit";
import { casperSlice } from "./casper/casperSlice";
import {
  MetaMaskConnector,
  WalletApplicationWrapper 
} from "../components/connector";
import { walletConnectorSlice } from "../components/connector/wallet-connector/walletAuthenticationSlice";

// const walletConnectorPersistConfig = {
//   key: "walletConnector",
//   storage: storageSession,
//   blacklist: ["error", "isConnecting",   "networkClient", "isWeb3Initialized"],
// };

// const walletAutheticatorPersistConfig = {
//     key: "walletAutheticator",
//     storage: storageSession,
//     whitelist: [ "meV2", "tokenV2"] 
// };


const rootReducer = combineReducers({
  walletConnector: MetaMaskConnector.walletConnectorSlice.reducer,
  // walletApplicationWrapper: persistReducer(
  //   walletApplicationWrapperPersistConfig,
  //   WalletApplicationWrapper.applicationWrapperSlice.reducer
  // ),
  walletApplicationWrapper: WalletApplicationWrapper.applicationWrapperSlice.reducer,
  // walletAuthenticator: walletConnectorSlice.reducer,
  walletAuthenticator: walletConnectorSlice.reducer
});

export type RootState = any;
export default rootReducer;