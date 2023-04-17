import Web3 from "web3";

export enum WALLET_TYPES {
  NONE,
  META_MASK,
}

export interface WALLET_CONNECTOR_STATE {
  isConnected: Boolean;
  isConnecting: Boolean;
  currentWallet: WALLET_TYPES;
  walletAddress: String;
  currentWalletNetwork: number;
  walletBalance: String;
  error: String;
  networkClient: Web3 | undefined;
  isWeb3Initialized: Boolean;
}

export const defaultWalletState: WALLET_CONNECTOR_STATE = {
  isConnected: false,
  isConnecting: false,
  currentWallet: WALLET_TYPES.NONE,
  walletAddress: "",
  currentWalletNetwork: 0,
  walletBalance: "",
  error: "",
  networkClient: undefined,
  isWeb3Initialized: false,
};

export interface WalletConnectorProps {
  WalletConnectView: any;
  WalletConnectModal: any;
  WalletConnectViewProps?: any;
  isAuthenticationNeeded?: boolean;
}
