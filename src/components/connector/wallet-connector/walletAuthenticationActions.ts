import { walletConnectorSlice } from "./walletAuthenticationSlice";
const { actions } = walletConnectorSlice;

export const saveSignature = (walletAuthenticator: any) => (dispatch: any) => {

    dispatch(actions.saveSignature({ walletAuthenticator }));
};

export const saveNetworkInformation = (networkInformation: any) => (dispatch: any) => {
    dispatch(actions.saveNetworkInformation({ networkInformation }));
};

export const saveNonce = (walletAuthenticator: any) => (dispatch: any) => {
    dispatch(actions.saveNonce({ walletAuthenticator }));
};

export const saveApplicationUserToken = (walletAuthenticator: any) => (dispatch: any) => {
    dispatch(actions.saveApplicationUserToken({ walletAuthenticator }));
};

export const isAllowedOnGateway = (walletAuthenticator: any) => (dispatch: any) => {

    dispatch(actions.isAllowedOnGateway({ walletAuthenticator }));
};

export const allowedNetworksonGateway = (walletAuthenticator: any) => (dispatch: any) => {

    dispatch(actions.allowedNetworksonGateway({ walletAuthenticator }));
};

export const error = (walletAuthenticator: any) => (dispatch: any) => {
    dispatch(actions.error({ walletAuthenticator }));
};

export const resetWalletAuthentication = (walletAuthenticator: any) => (dispatch: any) => {

    dispatch(actions.resetWalletAuthentication({ walletAuthenticator }));
};

export const removeSession = (walletAuthenticator: any) => (dispatch: any) => {

    dispatch(actions.removeSession({ walletAuthenticator }));
};

export const getSignatureFromMetamask = (walletAuthenticator: any) => (dispatch: any) => {

    dispatch(actions.getSignatureFromMetamask({ walletAuthenticator }));
};

export const saveME = (walletAuthenticator: any) => (dispatch: any) => {
    dispatch(actions.saveME({ walletAuthenticator }));
};

export const saveToken = (walletAuthenticator: any) => (dispatch: any) => {
    dispatch(actions.saveToken({ walletAuthenticator }));
};

export const saveCommunityMemberProfileToken = (walletAuthenticator: any) => (dispatch: any) => {

    dispatch(actions.saveCommunityMemberProfileToken({ walletAuthenticator }));
};

