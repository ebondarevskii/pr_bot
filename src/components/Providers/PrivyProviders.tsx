import React from 'react';
import { PrivyProvider } from '@privy-io/react-auth';
import { mainnet, polygon, optimism, base } from 'viem/chains';
import { privyService } from '@/services/privy';

interface PrivyProvidersProps {
  children: React.ReactNode;
}

export const PrivyProviders: React.FC<PrivyProvidersProps> = ({ children }) => {
  const appId = privyService.getAppId();

  if (!appId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-xl font-semibold mb-4">Configuration Error</h1>
          <p className="text-gray-600">
            Privy App ID is not configured. Please set VITE_PRIVY_APP_ID in your environment variables.
          </p>
        </div>
      </div>
    );
  }

  return (
    <PrivyProvider
      appId={appId}
      config={{
        loginMethods: ['telegram'],
        /* Replace this with your desired appearance configuration */
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: 'your-logo-url'
        },
        embeddedWallets: {
            createOnLogin: 'users-without-wallets',
            showWalletUIs: false
        },
        defaultChain: polygon,
        supportedChains: [mainnet, polygon, optimism, base],
      }}
    >
      {children}
    </PrivyProvider>
  );
}; 