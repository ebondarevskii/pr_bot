import React, { useState } from 'react';
import { User } from '@privy-io/react-auth';
import { UserProfile } from '@/components/Auth/UserProfile';
import { TONWalletConnect } from '@/components/Auth/TONWalletConnect';
import { Button } from '@/components/UI/Button';

interface MainLayoutProps {
  user: User;
  onLogout: () => void;
}

type TabType = 'profile' | 'ton';

export const MainLayout: React.FC<MainLayoutProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  const tabs = [
    { id: 'profile' as TabType, label: 'Profile', icon: '👤' },
    { id: 'ton' as TabType, label: 'TON Wallet', icon: '💎' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Mini App</h1>
            <Button
              onClick={onLogout}
              variant="secondary"
              className="text-sm"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-1 mb-6">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'profile' && (
            <UserProfile user={user} onLogout={onLogout} />
          )}
          {activeTab === 'ton' && (
            <TONWalletConnect />
          )}
        </div>
      </div>
    </div>
  );
};