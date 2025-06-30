import React, { useState, useEffect } from 'react';
import { User } from '@privy-io/react-auth';
import { Button } from '@/components/UI/Button';
import { Card } from '@/components/UI/Card';
import { usePimlicoSmartAccount } from '@/hooks/usePimlicoSmartAccount';
import { useSmartAccountLink } from '@/hooks/useSmartAccountLink';
import { privyService } from '@/services/privy';
import { USDC_CONTRACT_ADDRESS } from '@/utils/constants';
import { generateERC20TransferData } from '@/utils/security';
import { isSmartAccountLinked, getLinkedSmartAccount } from '@/utils/smartAccount';

interface UserProfileProps {
  user: User;
  onLogout: () => void;
  isLoading?: boolean;
}

interface ClickableAddressProps {
  address: string;
  className?: string;
  showFull?: boolean;
}

const ClickableAddress: React.FC<ClickableAddressProps> = ({ 
  address, 
  className = "text-sm text-gray-500 font-mono",
  showFull = false 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  const displayAddress = showFull ? address : privyService.formatAddress(address);

  return (
    <button
      onClick={handleCopy}
      className={`${className} hover:text-blue-600 transition-colors duration-200 cursor-pointer group relative`}
      title="Click to copy address"
    >
      {displayAddress}
      <span className="ml-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {copied ? '✅ Copied!' : '📋 Copy'}
      </span>
    </button>
  );
};

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
}) => {
  const { 
    smartAccount, 
    sendTransaction, 
    signMessage, 
    getUserOperationGasPrice,
    getUSDCBalance,
    isLoading: smartAccountLoading, 
    error: smartAccountError 
  } = usePimlicoSmartAccount();
  
  const {
    linkSmartAccount,
    isLinking,
    linkError,
    resetLinkState
  } = useSmartAccountLink();

  const [signature, setSignature] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [gasPrice, setGasPrice] = useState<any>(null);
  const [usdcBalance, setUsdcBalance] = useState<bigint | null>(null);
  const [isSigning, setIsSigning] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isCheckingGas, setIsCheckingGas] = useState(false);
  const [isCheckingBalance, setIsCheckingBalance] = useState(false);

  // Check if smart account is already linked
  const linkedSmartAccount = getLinkedSmartAccount(user);
  const isAccountLinked = isSmartAccountLinked(user, smartAccount?.address);

  // Reset link state when smart account changes
  useEffect(() => {
    if (smartAccount) {
      resetLinkState();
    }
  }, [smartAccount, resetLinkState]);

  // Check USDC balance when smart account is available
  useEffect(() => {
    if (smartAccount && !usdcBalance) {
      handleCheckUSDCBalance();
    }
  }, [smartAccount, usdcBalance]);

  const handleLinkSmartAccount = async () => {
    if (!smartAccount) return;
    
    const success = await linkSmartAccount(smartAccount);
    if (success) {
      // Optionally refresh the page or update user state
      window.location.reload();
    }
  };

  const handleSignMessage = async () => {
    setIsSigning(true);
    try {
      const sig = await signMessage('Hello from Pimlico Smart Account!');
      setSignature(sig);
    } finally {
      setIsSigning(false);
    }
  };

  const handleCheckGasPrice = async () => {
    setIsCheckingGas(true);
    try {
      const gasPriceData = await getUserOperationGasPrice();
      setGasPrice(gasPriceData);
    } finally {
      setIsCheckingGas(false);
    }
  };

  const handleCheckUSDCBalance = async () => {
    setIsCheckingBalance(true);
    try {
      const balance = await getUSDCBalance();
      setUsdcBalance(balance);
    } finally {
      setIsCheckingBalance(false);
    }
  };

  const handleSendTransaction = async () => {
    setIsSending(true);
    try {
      // Check USDC balance first
      const balance = await getUSDCBalance();
      if (!balance || balance < BigInt(100000)) {
        throw new Error('Insufficient USDC balance. Need at least 0.01 USDC for transfer and gas fees.');
      }

      // 0.01 USDC = 10000 (USDC has 6 decimals)
      const usdcAmount = BigInt(10000);
      const recipientAddress = '0xb6dd6a7c56c157f206c6cf9ec5c10ba93f4262da';
      
      // Generate ERC-20 transfer data
      const transferData = generateERC20TransferData(recipientAddress, usdcAmount);
      console.log('transferData', transferData)
      
      // Send as sponsored transaction using USDC for gas fees
      const hash = await sendTransaction({
        to: USDC_CONTRACT_ADDRESS,
        data: transferData,
      }, {
        useSponsoredTx: true,
        tokenAddress: USDC_CONTRACT_ADDRESS
      });
      setTxHash(hash);
      
      setTimeout(() => {
        handleCheckUSDCBalance();
      }, 2000);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center justify-center space-x-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">👤</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">
              {user.email?.address || 'Anonymous User'}
            </h2>
            <p className="text-gray-600">Privy User</p>
            {smartAccount && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1">Pimlico Smart Account:</p>
                <ClickableAddress 
                  address={smartAccount.address} 
                  className="text-sm text-gray-500 font-mono"
                />
              </div>
            )}
            {linkedSmartAccount && (
              <div className="mt-2">
                <p className="text-sm text-green-600 mb-1">✅ Linked Smart Account:</p>
                <ClickableAddress 
                  address={'address' in linkedSmartAccount && linkedSmartAccount.address 
                    ? linkedSmartAccount.address 
                    : ''
                  }
                  className="text-sm text-green-600 font-mono"
                />
              </div>
            )}
          </div>
        </div>
      </Card>

      {smartAccountLoading && (
        <Card>
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Creating Pimlico Smart Account...</p>
          </div>
        </Card>
      )}

      {smartAccountError && (
        <Card>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm font-medium">Smart Account Error</p>
            <p className="text-red-600 text-xs">{smartAccountError}</p>
          </div>
        </Card>
      )}

      {smartAccount && !isAccountLinked && (
        <Card>
          <h3 className="text-lg font-medium mb-4">Link Smart Account</h3>
          <p className="text-gray-600 text-sm mb-4">
            Link your smart account to your Privy profile to make it available across sessions.
          </p>
          <Button
            onClick={handleLinkSmartAccount}
            loading={isLinking}
            className="w-full"
            variant="primary"
          >
            {isLinking ? 'Linking...' : 'Link Smart Account'}
          </Button>
          {linkError && (
            <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm font-medium">Linking Error</p>
              <p className="text-red-600 text-xs">{linkError}</p>
            </div>
          )}
        </Card>
      )}

      {smartAccount && (
        <Card>
          <h3 className="text-lg font-medium mb-4">Pimlico Smart Account Actions</h3>
          <div className="space-y-3">
            <Button
              onClick={handleSignMessage}
              loading={isSigning}
              className="w-full"
              variant="secondary"
            >
              Sign Message
            </Button>
            
            <Button
              onClick={handleSendTransaction}
              loading={isSending}
              className="w-full"
              variant="secondary"
            >
              Transfer 0.01 USDC (Sponsored)
            </Button>

            <Button
              onClick={handleCheckGasPrice}
              loading={isCheckingGas}
              className="w-full"
              variant="secondary"
            >
              Check Pimlico Gas Price
            </Button>

            <Button
              onClick={handleCheckUSDCBalance}
              loading={isCheckingBalance}
              className="w-full"
              variant="secondary"
            >
              Check USDC Balance
            </Button>

            {signature && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-green-600 text-sm font-medium">Message Signed!</p>
                <ClickableAddress 
                  address={signature} 
                  className="text-green-600 text-xs font-mono break-all"
                  showFull={true}
                />
              </div>
            )}

            {txHash && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-green-600 text-sm font-medium">Sponsored USDC Transfer Sent!</p>
                <p className="text-green-600 text-xs mb-2">Gas fees paid with USDC</p>
                <ClickableAddress 
                  address={txHash} 
                  className="text-green-600 text-xs font-mono break-all"
                  showFull={true}
                />
              </div>
            )}

            {gasPrice && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-blue-600 text-sm font-medium mb-2">Pimlico Gas Prices</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 text-xs font-medium">Slow:</span>
                    <span className="text-blue-600 text-xs">
                      {Number(gasPrice.slow.maxFeePerGas) / 1e9} Gwei
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 text-xs font-medium">Standard:</span>
                    <span className="text-blue-600 text-xs">
                      {Number(gasPrice.standard.maxFeePerGas) / 1e9} Gwei
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 text-xs font-medium">Fast:</span>
                    <span className="text-blue-600 text-xs">
                      {Number(gasPrice.fast.maxFeePerGas) / 1e9} Gwei
                    </span>
                  </div>
                </div>
              </div>
            )}

            {usdcBalance !== null && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-blue-600 text-sm font-medium mb-2">USDC Balance</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 text-xs font-medium">Smart Account:</span>
                  <span className="text-blue-600 text-xs">
                    {Number(usdcBalance) / 1_000_000} USDC
                  </span>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {user.linkedAccounts && user.linkedAccounts.length > 0 && (
        <Card>
          <h3 className="text-lg font-medium mb-4">Connected Accounts</h3>
          <div className="space-y-2">
            {user.linkedAccounts.map((account, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-700 capitalize">
                  {account.type.replace('_', ' ')}
                  {'walletClientType' in account && account.walletClientType && (
                    <span className="text-xs text-gray-500 ml-2">
                      ({account.walletClientType})
                    </span>
                  )}
                </span>
                <span className="text-sm text-gray-500">
                  {account.type === 'telegram' && (
                    <span>
                      {account.username || `ID: ${account.telegramUserId}`}
                    </span>
                  )}
                  {account.type === 'email' && user.email?.address && (
                    <span>{user.email.address}</span>
                  )}
                  {account.type === 'wallet' && 'address' in account && account.address && (
                    <ClickableAddress address={account.address} />
                  )}
                  {account.type === 'smart_wallet' && 'address' in account && account.address && (
                    <ClickableAddress address={account.address} />
                  )}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};