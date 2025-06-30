export interface PrivyUser {
  id: string;
  email?: {
    address: string;
    verified: boolean;
  };
  wallet?: {
    address: string;
    type: 'metamask' | 'coinbase_wallet' | 'wallet_connect' | 'embedded' | 'smart_wallet';
  };
  linkedAccounts: Array<{
    type: 'email' | 'wallet' | 'discord' | 'github' | 'google' | 'twitter' | 'telegram' | 'smart_wallet';
    address?: string;
    verifiedAt?: string;
    telegram?: {
      id: number;
      username?: string;
    };
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface SmartWalletInfo {
  address: string;
  type: 'safe' | 'kernel' | 'light_account' | 'biconomy' | 'thirdweb' | 'coinbase_smart_wallet';
  chainId: number;
}

export interface TransactionRequest {
  to: string;
  value?: bigint;
  data?: string;
}

export interface BatchTransactionRequest {
  calls: Array<{
    to: string;
    value?: bigint;
    data?: string;
  }>;
}

export interface GasPriceInfo {
  maxFeePerGas: bigint;
  maxPriorityFeePerGas: bigint;
}

export interface PimlicoGasPriceResponse {
  slow: GasPriceInfo;
  standard: GasPriceInfo;
  fast: GasPriceInfo;
} 