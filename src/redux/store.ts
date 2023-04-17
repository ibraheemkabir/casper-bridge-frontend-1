import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reduxBatch } from "@manaflair/redux-batch";
import { casperSlice } from './casper/casperSlice';
import {
    MetaMaskConnector,
    WalletApplicationWrapper 
  } from "../components/connector";
import { walletConnectorSlice } from "../components/connector/wallet-connector/walletAuthenticationSlice";

const store = configureStore({
    reducer: {
        casper: combineReducers({
            "connect": casperSlice.reducer,
            walletConnector:  MetaMaskConnector.walletConnectorSlice.reducer,
            walletApplicationWrapper: WalletApplicationWrapper.applicationWrapperSlice.reducer,
            walletAuthenticator: walletConnectorSlice.reducer
        }),

    },
    middleware: (getDefaultMiddleware) => 
     getDefaultMiddleware({

     }).concat(),
    devTools: process.env.NODE_ENV !== "production",
    enhancers: [reduxBatch],
})

export default store;