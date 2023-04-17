import { createSlice } from "@reduxjs/toolkit";
import {
  defaultWalletState,
  WALLET_CONNECTOR_STATE,
} from "../walletConnectorInterfaces";

const initialWalletConnectorState: WALLET_CONNECTOR_STATE = {
  ...defaultWalletState,
};

export const walletConnectorSlice = createSlice({
  name: "walletConnector",
  initialState: initialWalletConnectorState,
  reducers: {
    //error occured while connecting
    catchWalletConnectError: (state, action) => {
      state = {
        ...defaultWalletState,
        error: `${action.type}: ${action.payload.error}`,
      };
    },
    connectWallet: (state) => {
      state.isConnected = false;
      state.isConnecting = true;
      state.walletAddress = "";
      state.walletBalance = "";
      state.currentWallet = defaultWalletState.currentWallet;
      state.currentWalletNetwork = 0;
      state.error = "";
      state.networkClient = undefined;
      state.isWeb3Initialized = false;
    },
    reconnectWallet: (state) => {
      state.isConnected = false;
      state.isConnecting = true;
      state.walletAddress = "";
      state.walletBalance = "";
      state.currentWallet = defaultWalletState.currentWallet;
      state.currentWalletNetwork = 0;
      state.error = "";
      state.networkClient = undefined;
      state.isWeb3Initialized = false;
    },
    // getCustomerById
    walletConnected: (state, action) => {
      state.isConnected = true;
      state.isConnecting = false;
      state.walletAddress = action.payload.userAccount.account;
      state.walletBalance = action.payload.userAccount.balance;
      state.currentWallet = action.payload.currentWallet;
      state.currentWalletNetwork = action.payload.userAccount.chainId;
      state.error = "";
      state.networkClient = action.payload.userAccount.networkClient;
      state.isWeb3Initialized = true;
    },
    disconnectWallet: (state, action) => {
      state.isConnected = false;
      state.isConnecting = false;
      state.walletAddress = "";
      state.walletBalance = "";
      state.currentWallet = defaultWalletState.currentWallet;
      state.currentWalletNetwork = 0;
      state.error = "";
      state.networkClient = undefined;
      state.isWeb3Initialized = false;
    },
  },
});
