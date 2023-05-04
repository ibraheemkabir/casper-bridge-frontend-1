import React, { useEffect, useState } from "react";
import {
  FHeader,
  // FHeaderCollapse,
  FButton,
  FItem,
  FTruncateText,
  // FHeaderMenuItem,
} from "ferrum-design-system";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as IconNetwork } from "../assets/images/casper.svg";

import logo from "../assets/images/logo-light.svg";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import { CasperClient, CasperServiceByJsonRPC, CLAccountHash, CLByteArray, CLKey, CLPublicKey, CLValueBuilder, decodeBase16, DeployUtil, RuntimeArgs, Signer } from "casper-js-sdk";
import { 
  connectWallet as connectWalletDispatch,
  resetWallet,
  configLoaded,
  signed
} from '../redux/casper/casperActions';
import toast from "react-hot-toast";
import AddressSelector from "../dialogs/AddressSelector";
import { useHistory, useParams } from "react-router";
import TxProcessingDialog from "../dialogs/TxProcessingDialog";
import { byteHash } from "casper-js-sdk/dist/lib/Contracts";
import { setContractHash } from "../utils/stringParser";

const RPC_API = "https://rpc.testnet.casperlabs.io/rpc";
const STATUS_API = "https://4211-2a01-4b00-832a-3100-f467-7086-4cda-bb21.eu.ngrok.io/http://159.65.203.12:8888";

const casperService = new CasperServiceByJsonRPC(RPC_API);
const casperClient = new CasperClient(RPC_API);

const Header = () => {
  const dispatch = useDispatch();
  const par = useParams();
  const { bridgePoolAddress }: any = useParams();
  console.log(bridgePoolAddress, par, 'bridgePoolAddress');
  const navigate = useHistory();
  const { stakingId }: any = useParams();
  console.log(stakingId);
  const { connect: { config, signedAddresses, selectedAccount } } = useSelector((state: any) => state.casper);
  const connection = useSelector((state: any) => state.casper.connect)
  const [loading, setLoading] = useState(false);

  console.log(connection)

  const [showAddressSelectorDlg, setShowAddressSelectorDlg] =  useState<boolean>(false);


  const connectWallet = async () => {
    await window.casperlabsHelper?.requestConnection()

    const isConnected = await window.casperlabsHelper.isConnected();

    if (isConnected) {
      setLoading(true)
      await AccountInformation();
      setLoading(false)
    }
 
    return;
  };

  const disconnectWallet = async () => {
    window.casperlabsHelper.disconnectFromSite();
    await resetWallet()(dispatch)
  };


  const getUserStake = async (
  ) => {
    try {

        const staker = await window.casperlabsHelper.getActivePublicKey();

        const senderPublicKey = CLPublicKey.fromHex(staker);

        const deployParams = new DeployUtil.DeployParams(
          senderPublicKey,
          'casper-test'
        );
  
        const args = RuntimeArgs.fromMap({
          "staker": setContractHash(`hash-8c07f894322d86705f9804d682a9ed6c9cd4be7a8fc6889d20b446e1d852fa8c`),
        });

        const session = DeployUtil.ExecutableDeployItem.newStoredContractByHash(
          decodeBase16('5eba0235bbd34613c19163a65ee16ea6c4019fbf5f5e7c8e07fbebd52d92eef4'),
          'amount_staked',
          args
        );

        const payment = DeployUtil.standardPayment(50000000000);

        const deploy = DeployUtil.makeDeploy(deployParams, session, payment);

        const deployJson: any = DeployUtil.deployToJson(deploy);
      
        console.log(senderPublicKey, deployParams, session, args, deployJson, 'senderPublicKeysenderPublicKey')

        //@ts-ignore
        Signer.sign(deployJson, staker).then(async (signedDeployJson) => {
          const signedDeploy = DeployUtil.deployFromJson(signedDeployJson);
          console.log(signedDeploy)
          if (signedDeploy.ok) {
            const res = await casperClient.putDeploy(signedDeploy.val);
            console.log(res, 'resres');
          }
          
        });
        // navigate.push(`/${config._id}`);
        //toast.success(`${amount} tokens are staked successfully`);
    } catch (e) {
      console.log("ERROR : ", e);
      //toast.error("An error occured please see console for details");
      //navigate.push(`/${config._id}`);
    } finally {
      //setLoading(false)
    }
  };

  async function AccountInformation() {
    const isConnected = await window.casperlabsHelper.isConnected();

    if (isConnected) {
      try {
        const publicKey = await window.casperlabsHelper.getActivePublicKey();
        console.log(publicKey, bridgePoolAddress, 'stakingIdstakingId');
        //textAddress.textContent += publicKey;

        const latestBlock = await casperService.getLatestBlockInfo();
        console.log(latestBlock);

        const root = await casperService.getStateRootHash(latestBlock?.block?.hash);
        console.log(latestBlock, root)

        await connectWalletDispatch([ { "address": publicKey } ])(dispatch)

        const balanceUref = await casperService.getAccountBalanceUrefByPublicKey(root, CLPublicKey.fromHex(publicKey));
        
        // @ts-ignore
        const balance = await casperService.getAccountBalance(latestBlock?.block?.header?.state_root_hash, balanceUref);
        console.log(balance.toString())

        const info = await casperService.getDeployInfo(
          bridgePoolAddress
        )
        console.log(info, 'infoinfo')

        // @ts-ignore
        const infoArguments = (info.deploy.session.ModuleBytes.args || []).find(
          (e: any) => e[0] === 'erc20_contract_package_hash'
        )

        if (infoArguments) {
          console.log(infoArguments, 'infoArguments', infoArguments[1].parsed)
          const token = infoArguments[1].parsed.Hash.split('-')[1]

          console.log(token, latestBlock?.block?.header?.state_root_hash, 'latestBlock?.block?.header?.state_root_hash,latestBlock?.block?.header?.state_root_hash,');
          
          const tokenName = await casperService.getBlockState(
            //@ts-ignore
            latestBlock?.block?.header?.state_root_hash,
            `hash-ba950993182bbc4a73fbcc0183c43534bdf7fa9a862db5a847cc7d726e274d9e`,
            ['name']
          )

          console.log(tokenName)
  
          const tokenSymbol = await casperService.getBlockState(
             //@ts-ignore
             latestBlock?.block?.header?.state_root_hash,
             `hash-ba950993182bbc4a73fbcc0183c43534bdf7fa9a862db5a847cc7d726e274d9e`,
             ['symbol']
          )
          
  
          console.log(tokenName.CLValue?.data, tokenSymbol.CLValue?.data, 'info2info2')

          if(info.deploy.session) {
            // @ts-ignore
            configLoaded({
              // @ts-ignore
              config: info.deploy.session.ModuleBytes.args,
              tokenInfo: {
                tokenSymbol: tokenSymbol.CLValue?.data,
                tokenName: tokenName.CLValue?.data
              }
            })(dispatch);
            //@ts-ignore
            signed(info.deploy.approvals)(dispatch)
            //@ts-ignore
            console.log(info.deploy, 'infoooo');
          }
        }
        
      } catch (error) {
        toast.error(`An error occured Error: ${error}`);
        console.log(error, 'Error occured')
      }
    }
  }

  return (
    <div>
      <FHeader showLogo={true} headerLogo={logo} className="bg-none">
        <FItem display={"flex"} align="right" alignY={"center"}>
          <FItem display={"flex"} align="right" alignY={"center"}>
            <span onClick={() => navigate.push(`/withdraw`)}>My Withdrawals</span>
          </FItem>
          {connection?.isWalletConnected ? (
            <>
              <FButton
                prefix={<CgArrowsExchangeAlt />}
                onClick={() => {
                  setShowAddressSelectorDlg(true);
                }}
              ></FButton>
              <FButton
                className="f-mr-1"
                title={"Disconnect Wallet"}
                onClick={disconnectWallet}
                btnInfo={
                  <FItem display={"flex"}>
                    <IconNetwork width={20} />{" "}
                    <FTruncateText
                      className="f-ml-1"
                      text={connection?.selectedAccount?.address || ''}
                    />
                  </FItem>
                }
              />
            </>
          ) : (
            <FButton
              className="f-mr-1"
              title={"Connect Wallet"}
              onClick={connectWallet}
            ></FButton>
          )}
          {/* <FHeaderCollapse>
            <FHeaderMenuItem to="/status-page" title="Status Page" />
          </FHeaderCollapse> */}
        </FItem>
      </FHeader>
      <TxProcessingDialog showClose={false} message={"Loading Configuration"} show={loading}/>
      {showAddressSelectorDlg && (
        <AddressSelector
          show={showAddressSelectorDlg}
          onHide={() => setShowAddressSelectorDlg(false)}
          connectedAccounts={connection?.connectedAccounts || []}
          onAccountSelect={(account: any) => {
           // onAccountSelect(account);
          }}
        />
      )}
    </div>
  );
};

export default Header;
