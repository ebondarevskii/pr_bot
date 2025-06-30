import { User } from '@privy-io/react-auth';
import { SmartWalletInfo } from '@/types/privy';

class PrivyService {
  private privyAppId: string;

  constructor() {
    this.privyAppId = import.meta.env.VITE_PRIVY_APP_ID || '';
    
    if (!this.privyAppId) {
      console.warn('VITE_PRIVY_APP_ID is not set in environment variables');
    }

    // Log environment info for debugging
    if (import.meta.env.DEV) {
      console.log('Privy Service initialized with:', {
        appId: this.privyAppId ? 'Set' : 'Not set',
        origin: window.location.origin,
        hostname: window.location.hostname,
        protocol: window.location.protocol,
      });
    }
  }

  getAppId(): string {
    return this.privyAppId;
  }

  getSmartWallet(user: User): SmartWalletInfo | null {
    const smartWalletAccount = user.linkedAccounts?.find(
      (account) => account.type === 'smart_wallet'
    );

    if (!smartWalletAccount || !smartWalletAccount.address) {
      return null;
    }

    return {
      address: smartWalletAccount.address,
      type: smartWalletAccount.type as SmartWalletInfo['type'],
      chainId: 1, // Default to mainnet, should be configurable
    };
  }

  getTelegramAccount(user: User) {
    return user.linkedAccounts?.find(
      (account) => account.type === 'telegram'
    );
  }

  formatAddress(address: string): string {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  validateEnvironment(): boolean {
    return !!this.privyAppId;
  }

  getEnvironmentInfo() {
    return {
      appId: this.privyAppId ? 'Set' : 'Not set',
      origin: window.location.origin,
      hostname: window.location.hostname,
      protocol: window.location.protocol,
      isLocalhost: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
      isDev: import.meta.env.DEV,
    };
  }

  checkDomainConfiguration(): { isValid: boolean; message: string } {
    const envInfo = this.getEnvironmentInfo();
    
    if (!this.privyAppId) {
      return {
        isValid: false,
        message: 'Privy App ID is not configured. Please set VITE_PRIVY_APP_ID in your environment variables.',
      };
    }

    if (envInfo.isLocalhost && envInfo.isDev) {
      return {
        isValid: true,
        message: 'Development mode detected. Make sure to add localhost to your Privy app\'s allowed domains.',
      };
    }

    return {
      isValid: true,
      message: 'Environment appears to be properly configured.',
    };
  }
}

export const privyService = new PrivyService(); 