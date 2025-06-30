import React from 'react';
import { Card } from '@/components/UI/Card';

interface TONWalletOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
  website: string;
  type: 'extension' | 'mobile' | 'web';
}

const walletOptions: TONWalletOption[] = [
  {
    id: 'tonspace',
    name: 'TonSpace',
    description: 'TON wallet with browser extension and advanced features',
    icon: '🟠',
    features: ['Browser Extension', 'Advanced Features', 'Custom Networks', 'Developer Tools'],
    website: 'https://tonspace.com',
    type: 'extension'
  }
];

interface TONWalletSelectorProps {
  onSelectWallet: (walletId: string) => void;
  selectedWallet?: string;
}

export const TONWalletSelector: React.FC<TONWalletSelectorProps> = ({
  onSelectWallet,
  selectedWallet
}) => {
  const getTypeBadge = (type: string) => {
    const badges = {
      extension: { label: 'Extension', color: 'bg-blue-100 text-blue-800' },
      mobile: { label: 'Mobile', color: 'bg-green-100 text-green-800' },
      web: { label: 'Web', color: 'bg-purple-100 text-purple-800' }
    };
    const badge = badges[type as keyof typeof badges];
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium mb-2">Choose Your TON Wallet</h3>
        <p className="text-gray-600 text-sm">
          Select a TON wallet to connect to this application
        </p>
      </div>

      <div className="grid gap-4">
        {walletOptions.map((wallet) => (
          <Card
            key={wallet.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedWallet === wallet.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
            }`}
            onClick={() => onSelectWallet(wallet.id)}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                  {wallet.icon}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-medium text-gray-900">{wallet.name}</h4>
                  {getTypeBadge(wallet.type)}
                </div>
                
                <p className="text-gray-600 text-sm mb-3">{wallet.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {wallet.features.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                <a
                  href={wallet.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  Visit Website →
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-blue-900 font-medium mb-2">💡 Tips for choosing a wallet:</h4>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• <strong>TonSpace</strong> - Best for developers and advanced features</li>
        </ul>
      </div>
    </div>
  );
}; 