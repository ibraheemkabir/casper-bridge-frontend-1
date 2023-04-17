import React from "react";
import IconMetaMask from "../../assets/images/icon-metamask.svg";
// import IconCoinbase from "../../assets/img/icon-coinbase.png";
// import IconWalletConnect from "../../assets/img/icon-wallet-connect.svg";
// import { useApplicationUIContext } from "../../ApplicationUiContext";
import { FDialog, FList, FListItem } from "ferrum-design-system";
import "./ConnectWalletDialog-styles.scss";

export const ConnectWalletDialog = ({
  show,
  onHide,
  metaMaskClickEvent,
}: any) => {
  return (
    <FDialog
      show={show}
      onHide={onHide}
      size="small"
      title="Connect Wallet"
      className="connect-wallet-dialog  f-mb-2"
    >
      <FList
        display="block"
        type="number"
        className={"f-mt-2"}
        variant="connect-wallet"
      >
        <FListItem display="flex" onClick={metaMaskClickEvent}>
          <strong>MetaMask</strong>
          <span className="icon-wrap">
            <img src={IconMetaMask} alt={IconMetaMask}></img>
          </span>
        </FListItem>
        {/* <FListItem display="flex">
          <strong>Coinbase wallet</strong>
          <span className="icon-wrap">
            <img src={IconCoinbase} alt={IconCoinbase}></img>
          </span>
        </FListItem>
        <FListItem display="flex">
          <strong>WalletConnect</strong>
          <span className="icon-wrap">
            <img src={IconWalletConnect} alt={IconWalletConnect}></img>
          </span>
        </FListItem> */}
      </FList>
    </FDialog>
  );
};
