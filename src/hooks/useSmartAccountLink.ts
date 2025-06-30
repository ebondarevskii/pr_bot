import { useCallback, useState } from 'react';
import { useLinkWithSiwe } from '@privy-io/react-auth';
import { polygon } from 'viem/chains';
import { type PimlicoSmartAccount } from '@/services/pimlico';

export const useSmartAccountLink = () => {
  const { generateSiweMessage, linkWithSiwe } = useLinkWithSiwe();
  const [isLinking, setIsLinking] = useState(false);
  const [linkError, setLinkError] = useState<string | null>(null);
  const [isLinked, setIsLinked] = useState(false);

  const linkSmartAccount = useCallback(async (smartAccount: PimlicoSmartAccount) => {
    if (!smartAccount) {
      setLinkError('Smart account not available');
      return false;
    }

    try {
      setIsLinking(true);
      setLinkError(null);

      // Step 1: Generate SIWE message for the smart account
      const message = await generateSiweMessage({
        address: smartAccount.address,
        chainId: `eip155:${polygon.id}` // CAIP-2 formatted chain ID
      });

      // Step 2: Request a personal_sign signature from the smart account
      const signature = await smartAccount.client.signMessage({
        message
      });

      // Step 3: Pass the signature to Privy for verification
      await linkWithSiwe({
        message,
        chainId: `eip155:${polygon.id}`,
        signature,
        walletClientType: 'privy_smart_account',
        connectorType: 'pimlico'
      });

      setIsLinked(true);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to link smart account';
      setLinkError(errorMessage);
      return false;
    } finally {
      setIsLinking(false);
    }
  }, [generateSiweMessage, linkWithSiwe]);

  return {
    linkSmartAccount,
    isLinking,
    linkError,
    isLinked,
    resetLinkState: () => {
      setLinkError(null);
      setIsLinked(false);
    }
  };
}; 