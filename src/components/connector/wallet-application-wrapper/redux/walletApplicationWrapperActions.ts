import { applicationWrapperSlice } from "./walletApplicationWrapperSlice";
// import * as serverRequest from "../../../common-client/axiosApiClient";
// import { getFilteredAssets } from "../walletApplicationWrapperHelper";
const { actions } = applicationWrapperSlice;

// export const loadWalletDefaults =
//   (groupId: any, existingTokenList: Array<any>) => async (dispatch: any) => {
//     //load bridge group info
//     const groupInfo = await serverRequest.loadGroupInfo(groupId);

//     //load bridge global token listing
//     const tokenList = existingTokenList?.length
//       ? existingTokenList
//       : await serverRequest.getTokenList();

//     //load bridge group currencies token configuration
//     const currencyPairs = await serverRequest.getTokenConfigsForGroup(
//       groupInfo?.bridgeCurrencies
//     );

//     //calculate filtered listing
//     const filteredAssets = getFilteredAssets(
//       tokenList,
//       groupInfo?.bridgeCurrencies
//     );

//     const supportedNetworks = groupInfo?.bridgeCurrencies.map(
//       (c: any) => c.split(":")[0]
//     );

//     const supportedCurrencies = groupInfo.bridgeCurrencies.map(
//       (c: any) => c.split(":")[1]
//     );

//     dispatch(
//       actions.walletApplicationDefaultsLoaded({
//         groupInfo,
//         tokenList,
//         currencyPairs,
//         filteredAssets,
//         supportedNetworks,
//         supportedCurrencies,
//       })
//     );
//   };

export const loadUserProfileDetails = () => async (dispatch: any) => {
  // const [client, connect, currencyList, api, provider] =
  //       inject5<UnifyreExtensionWeb3Client, Connect, CurrencyList, ApiClient, Web3ModalProvider>(
  //           UnifyreExtensionWeb3Client, Connect, CurrencyList, ApiClient, 'Web3ModalProvider');
  // connect.setProvider(provider);
  // const net = await connect.getProvider()!.netId();
  // console.log(net);
};

// export const getUserProfile = (userProfile: any) => async (dispatch: any) => {
//   const authToken = await serverRequest.signInToServer(userProfile.userId);
//   console.log("sign to server successfull user token authToken : ", authToken);
//   // console.log({ userProfile, authToken });
//   dispatch(actions.walletApplicationUser({ userProfile, authToken }));
// };

export const resetUserProfile = () => async (dispatch: any) => {
  dispatch(actions.resetWalletApplicationUser());
};

export const swapToAndFromToken = (toAndFromTokens: any) => async (dispatch: any) => {
  dispatch(actions.swapToAndFromToken(toAndFromTokens));
};

export const updateToInfo = (toInfo: any) => async (dispatch: any) => {
  dispatch(actions.updateToInfo(toInfo));
};

export const updateFromInfo = (fromInfo: any) => async (dispatch: any) => {
  dispatch(actions.updateFromInfo(fromInfo));
};

// export const getAvailableLiquidity =
//   (targetNetwork: string, targetCurrency: string, authToken: string) =>
//   async (dispatch: any) => {
//     await serverRequest
//       .getAvailableLiquidity(targetNetwork, targetCurrency, authToken)
//       .then((response: any) => {
//         dispatch(actions.availableLiquidity({ availableLiquidity: response }));
//       })
//       .catch((err: any) => {
//         console.log(err);
//       });
//   };

export const updateAmount = (amount: any) => async (dispatch: any) => {
  dispatch(actions.updateAmount({ amount }));
};

export const updateFee = (fee: any) => async (dispatch: any) => {
  dispatch(actions.updateFee({ fee }));
};

export const updateMaxBalance = (maxBalance: any) => async (dispatch: any) => {
  dispatch(actions.updateMaxBalance({ maxBalance }));
};

// export const getNetworkTransactions = () => async (dispatch: any) => {
//   const transactionResponse = await serverRequest.getNetworkTransactions();
//   dispatch(
//     actions.getNetworkTransactions({
//       networkTransactions: transactionResponse.data,
//     })
//   );
// };
