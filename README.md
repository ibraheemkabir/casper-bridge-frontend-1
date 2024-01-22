# Ferrum Network Staking Casper Network Frontend
After you have forked and cloned the Ferrum Gateway monorepo](https://github.com/ferrumnet/ferrum-gateway) on your machine navigate to the ferrum-gateway directory and set upstream link, then starting installing dependecies and building in the following order.

```
cd ferrum-gateway
```

**Installation Requirements**

- Node version: v15.5.0
- Npm version: ^8.19.2


This repository contains the frontend implementation for the shell application for completing EVM to NON EVM token swaps between casper and bsc networks mainly. 

The application is geared towards showcasing the swap functionality interacting with the ferrum network bridging/swap contract.

The frontend implementation utlises the casper client and casper-sdk packages to interact and send rpc requests and updates to the casper network, it also utilises 

metamask to send and accepts requests to the intended EVM networks for the swaps.

<br />

**Architecture**

The shell application utlises casper sdk functions to send RPC requests to the casper client and get transaction updates to and from the casper blockchain. The most casper sdk methods being used for deploys specifially in the shell app are :

storedcontractbyhash - https://docs.casper.network/developers/json-rpc/types_chain/#storedcontractbyhash

signedMessage: https://casper-ecosystem.github.io/casper-js-sdk/

Arguments and necessary params are used to create a corresponding session for execution and deploy on the corresponding chain.


This approach is used for sending deploys for the swap, withdraw and contract informagtion with the shell application.

```
const args = RuntimeArgs.fromMap({
    "amount": CLValueBuilder.u256(amount),
    "token_address": CLValueBuilder.string(
        'contract-package-wasmexxxx'
    ),
    "target_network": CLValueBuilder.u256(targetNetwork),
    "target_token": CLValueBuilder.string(targetToken),
});


const session = DeployUtil.ExecutableDeployItem.newStoredContractByHash(
    decodeBase16('0axxxxxxxxxx'),
    'swap',
    args
);
```

# Instructions to Run

Install required browser/chrome extensions (compatible with chrome , consider equivaluents on other browsers) :

**Capser browser client extension**: `https://chrome.google.com/webstore/detail/casper-wallet/abkahkcbhngaebpcgfmhkoioedceoigp?hl=en-GB`

**Metamask browser extension**: `https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en-GB`

**To Run Via npm**

Clone casper bridge frontend repository

Install project dependencies by running `npm install` or `yarn install`

Start project by running `npm start` or `yarn start`

`yarn` is preferred in this case to ensure correct depencency modes are installed.

As a result of Cors errors from the casper RPC url, it is important to download a cors unblocking extension to ease connection e.g https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino?hl=en-GB or its equivalent on respective browsers

**To Run Backend locally**

- Open src/client.ts file on an editor

- replace backend url with local backend url e.g `http://localhost:8080`

- restart frontend app based on above instructions

**To Run Via Docker**

docker build .

docker-compose up --build casper-bridge-frontend

<br />

Bridge shell app can access from the url - https://casper-swap.netlify.app/ subject to cors issues with fix stated above.

# Steps to conduct swaps

On starting application, the dashboard contains two cards, the first card is for swapping tokens from EVM to Non-EVM network and the second card allows for swapping from a non-evm to an evm destination. 

<br />

**EVM TO NON-EVM SWAP**

The bridge application allows users to swap from three EVM networks to casper network. The allowed networks withing the application are :

1) BSC <> CASPER
2) ETHEREUM <> CASPER
3) POLYGON <> CASPER

To conduct a swap between these networks and the casper network. The following steps are taken to carry this out.

On opening the app, the home page presents users with two swap cards.

The first card is for swapping from the connected EVM chain to the capser chain.

If browser EVM wallet is not connected, click the connect button on the first card.

This should trigger connect flow on EVM wallet, on connecting to the wallet.

The card should display the connected chain to capser chain, kindly ensure the wallet is connected to one of the allowed chains  i.e BSC, POLYGON and ETHEREUM.

After connecting EVM wallet, there is also need to connect CASPER wallet.

To connect casper wallet, click on the `connect to casper wallet` button on the header.

This should also trigger the casper wallet connect sequence and should display the connected wallet address on the header on successful connection.

On the first card, enter amount to be swapped from the connected EVM network to the Casper blockchain.

Ensure wallet Approval as been established by allowing approval from contract, if it is the first time executing swaps.

Click on swap button to execute swap.

This triggers a wallet transaction on metamask and on approving transaction request will pop up transaction modal with details of the executed transaction.

On completion of the swap on chain.

click on withdrawals label on the header. This will display a list of withdrawal items based on executed swaps of current user.

For every executed swap on the EVM chain, there is a conttesponding withdrawal item to be withdrawn on the casper chain.

The just executed swap will have a withdraw item, which is likely the last on the list of withdraw items.

On clicking `withdraw now` on the item will trigger the transfer of funds to the casper wallet.

<br />

**NON-EVM TO EVM SWAP**

The bridge application allows users to swap from three EVM networks to casper network. The allowed networks withing the application are :

1) CASPER <> BSC
2) CASPER <> ETHEREUM
3) CASPER <> POLYGON

To conduct a swap between the casper network and these networks. The following steps are taken to carry this out.

On opening the app, the home page presents users with two swap cards.

The second card is for swapping from the capser chain to the connected EVM chain.

If browser EVM wallet is not connected, click the connect button on the first card.

This should trigger connect flow on EVM wallet, on connecting to the wallet.

On the second card, if casper wallet is not connected, click on the connect casper wallet button on the second card to trigger casper wallet connection.

After connecting both wallets, the second card allows swap from casper chain TO EVM sources.

To execute this transaction, enter amount to be swapped in required field and execute swap transaction by click on swap button.

Casper signer transaction is triggered and users can execute the transaction on pop up. 

A confirmation modal pops up which will monitor trasaction progress.

On swap transaction completion, users can then go on to active withdrawals (link in dashboard header)

click on withdrawals label on the header. This will display a list of withdrawal items based on executed swaps of current user.

Withdrawal can be executed as detailed above in previous step.

<br />

**Steps to carry out withdrawals**
<br />

All withdrawals are listed chronologically on the withdrawal page. Users can execute withdrawals on the withdrawal page. The withdraw page contains all the executable withdrawals on the two chains supported in this shell application.

To execute a swap, users need to Connect to source and destination wallet

Select transaction to withdraw and accept transaction prompt on corresponding wallet.

<br />

# Contributing

If you would like to contribute to this repository, please fork the repository and create a new branch for your changes. Once you have made your changes, submit a 

pull request and we will review your changes.

Please ensure that your code follows the style and conventions used in the existing codebase, and that it passes all tests before submitting a pull request.
<br />

# License
The smart contracts in this repository are licensed under the MIT License.
