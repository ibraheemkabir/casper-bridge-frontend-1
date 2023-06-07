import { createSlice } from "@reduxjs/toolkit";
import {
  defaultWalletApplicationWrapper,
  WALLET_APPLICATION_WRAPPER_STATE,
} from "../walletApplicationWrapperInterfaces";

const defaultWalletApplicationWrapperstate: WALLET_APPLICATION_WRAPPER_STATE = {
  ...defaultWalletApplicationWrapper,
};

export const applicationWrapperSlice = createSlice({
  name: "applicationWrapper",
  initialState: defaultWalletApplicationWrapperstate,
  reducers: {
    walletApplicationDefaultsLoaded: (state, action) => {
      state.groupInfo = action.payload.groupInfo;
      state.supportedCurrencies = action.payload.supportedCurrencies;
      state.tokenList = action.payload.tokenList;
      state.supportedNetworks = action.payload.supportedNetworks;
      state.filteredAssets = action.payload.filteredAssets;
      state.currencyPairs = action.payload.currencyPairs;
      state.walletWrapperInitialized = true;
    },
    walletApplicationUser: (state, action) => {
      state.userProfile = action.payload.userProfile;
      state.authToken = action.payload.authToken;
    },
    resetWalletApplicationUser: (state) => {
      state.userProfile = defaultWalletApplicationWrapper.userProfile;
      state.authToken = defaultWalletApplicationWrapper.authToken;
    },
    swapToAndFromToken: (state, action) => {
      state.fromInfo = action.payload.fromInfo;
      state.toInfo = action.payload.toInfo;
    },
    updateToInfo: (state, action) => {
      state.toInfo = action.payload.toInfo;
    },
    updateFromInfo: (state, action) => {
      state.fromInfo = action.payload.fromInfo;
    },
    availableLiquidity: (state, action) => {
      state.availableLiquidity = action.payload.availableLiquidity;
    },
    updateAmount: (state, action) => {
      state.amount = action.payload.amount;
    },
    updateFee: (state, action) => {
      state.fee = action.payload.fee;
    },
    updateMaxBalance: (state, action) => {
      state.maxBalance = action.payload.maxBalance;
    },
    getNetworkTransactions: (state, action) => {
      state.networkTransactions = action.payload.networkTransactions;
    },
  },
});
