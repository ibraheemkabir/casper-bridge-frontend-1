# Ferrum Network Staking Casper Network Frontend
After you have forked and cloned the Ferrum Gateway monorepo](https://github.com/ferrumnet/ferrum-gateway) on your machine navigate to the ferrum-gateway directory and set upstream link, then starting installing dependecies and building in the following order.

```
cd ferrum-gateway
```

**Installation Requirements**

- Node version: ^v15.5.0
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

**Capser browser client extension**: `https://chrome.google.com/webstore/detail/casper-signer/djhndpllfiibmcdbnmaaahkhchcoijce?hl=en-GB`

**Metamask browser extension**: `https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en-GB`

**To Run Via npm**

Clone casper bridge frontend repository

Install project dependencies by running `npm install`

Start project by running `npm start`

**To Run Via Docker**

docker build .

docker-compose up --build casper-bridge-frontend

<br />

# Steps to conduct swaps

On starting application, the dashboard contains two cards, the first card is for swapping tokens from EVM to Non-EVM network and the second card allows for swapping from a non-evm to an evm destination. 

<br />

**EVM TO NON-EVM SWAP**

On the first card, enter amount to be swapped from BSC to Casper blockchain.

Ensure wallet Approval as been established by calling approval method from contract

Click on swap button to execute swap.

This triggers a wallet transaction on metamask and on approving transaction request will pop up transaction modal with details of the executed transaction.

On completion of the swap results on chain, click on withdrawal screen and execute corresponding withdrawal on destination chain by clicking withdrawal button.

<br />

**NON-EVM TO EVM SWAP**

On dashboard, the second card allows swap from NON-EVM TO EVM sources, to execute this transaction, enter amount to 

be swapped in required field and execute swap transaction by click on swap button. Casper signer transaction is triggered and 

user can execute the transaction on pop up and confirmation modal monitors trasaction progress.

On swap transaction completion, user can then go on to active withdrawals (link in dashboard header)

Withdrawal can be executed as detailed above in previous step.
<br />

**Steps to carry out withdrawals**
<br />

All withdrawals are listed chronologically on the withdrawal page. Users can execute withdrawals on the withdrawal page. The withdraw page contains all the executable withdrawals on the two chains supported in this shell application.
To execute a swap, users need to 

Connect to source and destination wallet

Select transaction to withdraw and accept transaction prompt on corresponding wallet.
<br />

# Contributing

If you would like to contribute to this repository, please fork the repository and create a new branch for your changes. Once you have made your changes, submit a 

pull request and we will review your changes.

Please ensure that your code follows the style and conventions used in the existing codebase, and that it passes all tests before submitting a pull request.
<br />

# License
The smart contracts in this repository are licensed under the MIT License.
