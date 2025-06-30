import { usePrivy, User } from '@privy-io/react-auth';
import { useSmartWallets } from '@privy-io/react-auth/smart-wallets';
import { useCallback, useEffect, useState } from 'react';
import { SmartWalletInfo } from '@/types/privy';
import { privyService } from '@/services/privy';
import { useTelegram } from '@/hooks/useTelegram';

export const usePrivyAuth = () => {
  const { user, authenticated, login, logout, ready } = usePrivy();
  const { client: smartWalletClient } = useSmartWallets();
  const { user: telegramUser, isValid: telegramValid } = useTelegram();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (ready) {
      setIsLoading(false);
    }
  }, [ready]);

  const handleLogin = useCallback(async (): Promise<User | null> => {
    setIsLoading(true);
    setError(null);

    try {
      if (telegramUser && telegramValid) {
        await login();
        return user;
      } else {
        throw new Error('Telegram user not available or invalid');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [telegramUser, telegramValid, login, user]);

  const handleLogout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      await logout();
      setError(null);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  const getSmartWallet = useCallback((): SmartWalletInfo | null => {
    if (!user) return null;
    return privyService.getSmartWallet(user);
  }, [user]);

  const signMessage = useCallback(async (message: string): Promise<string | null> => {
    if (!smartWalletClient) {
      setError('Smart wallet client not available');
      return null;
    }

    try {
      const signature = await smartWalletClient.signMessage({ message });
      return signature;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign message';
      setError(errorMessage);
      return null;
    }
  }, [smartWalletClient]);

  const sendTransaction = useCallback(async (
    transaction: { to: string; value?: bigint; data?: string }
  ): Promise<string | null> => {
    if (!smartWalletClient) {
      setError('Smart wallet client not available');
      return null;
    }

    try {
      const txHash = await smartWalletClient.sendTransaction({
        to: transaction.to as `0x${string}`,
        value: transaction.value,
        data: transaction.data as `0x${string}` | undefined,
      });
      return txHash;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send transaction';
      setError(errorMessage);
      return null;
    }
  }, [smartWalletClient]);

  const sendBatchTransaction = useCallback(async (
    calls: Array<{ to: string; value?: bigint; data?: string }>
  ): Promise<string | null> => {
    if (!smartWalletClient) {
      setError('Smart wallet client not available');
      return null;
    }

    try {
      const txHash = await smartWalletClient.sendTransaction({
        calls: calls.map(call => ({
          to: call.to as `0x${string}`,
          value: call.value,
          data: call.data as `0x${string}` | undefined,
        })),
      });
      return txHash;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send batch transaction';
      setError(errorMessage);
      return null;
    }
  }, [smartWalletClient]);

  return {
    user,
    authenticated,
    isLoading,
    error,
    login: handleLogin,
    logout: handleLogout,
    getSmartWallet,
    signMessage,
    sendTransaction,
    sendBatchTransaction,
    smartWalletClient,
    telegramUser,
    telegramValid,
  };
}; 