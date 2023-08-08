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
import { CasperClient, CasperServiceByJsonRPC, CLPublicKey } from "casper-js-sdk";
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

const RPC_API = "https://casper-proxy-app-03c23ef9f855.herokuapp.com?url=http://44.208.234.65:7777/rpc";
const STATUS_API = "https://4211-2a01-4b00-832a-3100-f467-7086-4cda-bb21.eu.ngrok.io/http://159.65.203.12:8888";

const casperService = new CasperServiceByJsonRPC(RPC_API);
const casperClient = new CasperClient(RPC_API);

const Header = () => {
  const dispatch = useDispatch();
  const par = useParams();
  const { bridgePoolAddress }: any = useParams();
  const navigate = useHistory();
  const connection = useSelector((state: any) => state.casper.connect)
  const [loading, setLoading] = useState(false);


  const [showAddressSelectorDlg, setShowAddressSelectorDlg] =  useState<boolean>(false);

  const selectedAccount: { address?: string } = {};

  const connectWallet = async () => {
    //@ts-ignore
    const casperWalletProvider = await window.CasperWalletProvider;    
    const provider = casperWalletProvider();
    await provider?.requestConnection()

    const isConnected = await provider.isConnected();

    if (isConnected) {
      setLoading(true)
      await AccountInformation();
      setLoading(false)
    }
 
    return;
  };

  const disconnectWallet = async () => {
    //@ts-ignore
    const casperWalletProvider = await window.CasperWalletProvider;    
    const provider = casperWalletProvider();
    provider.disconnectFromSite();
    //@ts-ignore
    await resetWallet()(dispatch)
  };

  async function AccountInformation() {
    //@ts-ignore
    const casperWalletProvider = await window.CasperWalletProvider;    
    const provider = casperWalletProvider();
    const isConnected = await provider.isConnected();

    if (isConnected) {
      try {
        const publicKey = await provider.getActivePublicKey();
        //textAddress.textContent += publicKey;

        const latestBlock = await casperService.getLatestBlockInfo();

        // const root = await casperService.getStateRootHash(latestBlock?.block?.header?.state_root_hash);

        await connectWalletDispatch([{
          "address": publicKey
        }])(dispatch)
        const balanceUref = await casperService.getAccountBalanceUrefByPublicKey(latestBlock?.block?.header?.state_root_hash || '', CLPublicKey.fromHex(publicKey));
        
        // @ts-ignore
        const balance = await casperService.getAccountBalance(latestBlock?.block?.header?.state_root_hash, balanceUref);

        const info = await casperService.getDeployInfo(
          bridgePoolAddress
        )

        // @ts-ignore
        const infoArguments = (info.deploy.session.ModuleBytes.args || []).find(
          (e: any) => e[0] === 'erc20_contract_hash'
        )

        if (infoArguments) {
          const token = infoArguments[1].parsed.split('-')[1]


          const tokenName = await casperService.getBlockState(
            //@ts-ignore
            latestBlock?.block?.header?.state_root_hash,
            `hash-${token}`,
            ['name']
          )
  
          const tokenSymbol = await casperService.getBlockState(
             //@ts-ignore
             latestBlock?.block?.header?.state_root_hash,
             `hash-${token}`,
             ['symbol']
          )
  

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
          }
        }
        
      } catch (error) {
        toast.error(`An error occured Error: ${error}`);
      }
    }
  }

  return (
    <div>
      <FHeader showLogo={true} headerLogo={logo} className="bg-none">
        <FItem display={"flex"} align="right" alignY={"center"}>
          <FItem display={"flex"} align="right" alignY={"center"}>
            <span style={{"cursor": "pointer"}} onClick={() => navigate.push(`/withdraw`)}>My Withdrawals</span>
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
                    { IconNetwork && <IconNetwork width={20} /> }{" "} 
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
