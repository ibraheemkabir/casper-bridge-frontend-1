import { walletConnectorSlice } from "./walletConnectorSlice";
const { actions } = walletConnectorSlice;


export const reconnectWallet = () => (dispatch: any) => {
  dispatch(actions.reconnectWallet());
};

export const connectWallet = () => (dispatch: any) => {
  dispatch(actions.connectWallet());
};

export const walletConnected = (userAccount: any) => (dispatch: any) => {
  dispatch(actions.walletConnected({ userAccount }));
};

export const catchWalletConnectError = () => (dispatch: any) => {
  dispatch(actions.catchWalletConnectError({ payload: {} }));
};

export const resetWalletConnector = () => (dispatch: any) => {
  console.log('reset wallet connector')
  dispatch(actions.disconnectWallet({ payload: {} }));
};
