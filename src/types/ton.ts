export interface TONWalletInfo {
  address: string;
  publicKey: string;
  walletType: 'tonkeeper' | 'tonhub' | 'mytonwallet' | 'tonflow' | 'tonspace' | 'unknown';
  chainId: number;
  connectedAt: string;
}

export interface TONTransaction {
  to: string;
  amount: string; // in nano TON (1 TON = 1,000,000,000 nano TON)
  payload?: string;
  comment?: string;
}

export interface TONBalance {
  balance: string; // in nano TON
  usdValue?: number;
}

export interface TONConnectionStatus {
  isConnected: boolean;
  wallet: TONWalletInfo | null;
  error: string | null;
}

export interface TONWalletConfig {
  manifestUrl: string;
  items: Array<{
    name: string;
    description: string;
    url: string;
    iconUrl: string;
  }>;
} 