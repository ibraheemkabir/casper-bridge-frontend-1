// import { Network } from "ferrum-plumbing";

export interface WALLET_APPLICATION_WRAPPER_STATE {
  groupInfo: any;
  supportedCurrencies: Array<any>;
  tokenList: Array<any>;
  supportedNetworks: Array<any>;
  currencyPairs: Array<any>;
  filteredAssets: Array<any>;
  userProfile: any;
  authToken: string;
  walletWrapperInitialized: boolean;
  fromInfo: any;
  toInfo: any;
  availableLiquidity: string;
  amount: number;
  fee: number;
  maxBalance: number;
  networkTransactions: Array<any>;
}
export const defaultWalletApplicationWrapper: WALLET_APPLICATION_WRAPPER_STATE =
  {
    groupInfo: {},
    supportedCurrencies: [],
    tokenList: [],
    supportedNetworks: [],
    currencyPairs: [],
    filteredAssets: [],
    userProfile: {},
    authToken: "",
    walletWrapperInitialized: false,
    fromInfo: undefined,
    toInfo: undefined,
    availableLiquidity: "",
    amount: 0,
    fee: 0,
    maxBalance: 0,
    networkTransactions: [],
  };

export interface AddressDetails {
  // network: Network;
  currency: string;
  symbol: string;
  address: string;
  addressWithChecksum?: string;
  humanReadableAddress: string;
  addressType: string;
  balance: string;
  pendingForWithdrawal: string;
  pendingForDeposit: string;
}

export interface UserAccountGroup {
  id: string;
  addresses: AddressDetails[];
}

export interface AppUserProfile {
  userId: string;
  displayName: string;
  appId: string;
  email?: string;
  accountGroups: UserAccountGroup[];
}
export type ChainEventStatus = "" | "pending" | "failed" | "completed";

export interface ChainEventBase {
  id: string;
  userAddress: string;
  // network: Network;
  application: string;
  status: ChainEventStatus;
  callback?: any;
  eventType: string;
  transactionType: string;
  createdAt: number;
  lastUpdate: number;
  reason?: string;
  retry: number;
}

export interface AllocationSignature extends MultiSignable {
  actor: MultiSigActor;
  salt: string;
  expirySeconds: number;
  from: string;
  to: string;
}

export interface UserContractAllocation {
  signature?: AllocationSignature;
  network: string;
  contractAddress: string;
  method: string;
  userAddress: string;
  currency: string;
  allocation: string;
  expirySeconds: number;
}

export interface TokenDetails {
  currency: string;
  address: string;
  chainId: number;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
}

export interface StoredAllocationCsv {
  network: string;
  contract: string;
  csv: string;
}

export interface CurrencyValue {
  currency: string;
  value: string;
}

export interface MultiSigSignature {
  creationTime: number;
  creator: string;
  signature: string;
}

export interface MultiSigActor {
  groupId: number;
  quorum: string;
  address: string;
  contractAddress: string;
}

export interface MultiSignable {
  signatures: MultiSigSignature[];
}

export interface TransactionTrackableItem {
  network: string;
  transactionId: string;
  timestamp: number;
  status: "pending" | "failed" | "timedout" | "sucess";
  message?: string;
}

export interface TransactionTrackable {
  status: "" | "pending" | "failed" | "timedout" | "sucess";
  transactions: TransactionTrackableItem[];
}

export interface UserStakeSummary {
  name: string;
  network: string;
  currency: string;
  rewardCurrencies: string[];
  stakeContractAddress: string;
  lastUpdate: number;
  stake: string;
  rewards: string[];
}

// export interface DEFAULT_CURRENCIES {
//   currencies: Array<any>;
// }
// export const defaultCurrencies: DEFAULT_CURRENCIES = {
//   currencies: [],
// };

// export interface DEFAULT_TOKENS {
//   tokens: Array<any>;
// }
// export const defaultTokens: DEFAULT_TOKENS = {
//   tokens: [],
// };
