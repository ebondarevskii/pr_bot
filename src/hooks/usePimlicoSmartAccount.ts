import { useCallback, useEffect, useState } from "react";
import { useWallets } from "@privy-io/react-auth";
import { createWalletClient, custom, http } from "viem";
import { polygon } from "viem/chains";
import { createPublicClient } from "viem";
import { createSmartAccountClient } from "permissionless";
import { toKernelSmartAccount } from "permissionless/accounts";
import { entryPoint07Address } from "viem/account-abstraction";
import { pimlicoService, type PimlicoSmartAccount } from "@/services/pimlico";
import { USDC_CONTRACT_ADDRESS } from "@/utils/constants";
import { parseAbi } from "viem";
import { prepareUserOperationForErc20Paymaster } from "permissionless/experimental/pimlico";

export const usePimlicoSmartAccount = () => {
  const { wallets } = useWallets();
  const [smartAccount, setSmartAccount] = useState<PimlicoSmartAccount | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const createSmartAccount =
    useCallback(async (): Promise<PimlicoSmartAccount | null> => {
      try {
        setIsLoading(true);
        setError(null);

        // Validate Pimlico configuration
        const configValidation = pimlicoService.validateConfiguration();
        if (!configValidation.isValid) {
          throw new Error(configValidation.message);
        }

        // Find the embedded wallet from Privy
        const embeddedWallet = wallets.find(
          (wallet) => wallet.walletClientType === "privy"
        );
        if (!embeddedWallet) {
          throw new Error("No embedded wallet found");
        }

        // Get the EIP1193 provider from the embedded wallet
        const eip1193provider = await embeddedWallet.getEthereumProvider();

        // ethers.providers.Web3Provider

        // Create a viem WalletClient from the embedded wallet's EIP1193 provider
        const privyClient = createWalletClient({
          account: embeddedWallet.address as `0x${string}`,
          chain: polygon,
          transport: custom(eip1193provider),
        });

        // Create a viem public client for RPC calls
        const publicClient = createPublicClient({
          chain: polygon,
          transport: http(),
        });

        const pimlicoClient = pimlicoService.createPimlicoClient();

        const kernelAccount = await toKernelSmartAccount({
          client: publicClient,
          entryPoint: {
            address: entryPoint07Address,
            version: "0.7",
          },
          owners: [privyClient],
        });

        kernelAccount.client.account;

        // Create Smart Account Client without paymaster initially
        const smartAccountClient = createSmartAccountClient({
          account: kernelAccount,
          chain: polygon,
          bundlerTransport: http(pimlicoService.getPimlicoRpcUrl()),
        });

        const accountAddress = await smartAccountClient.account.address;

        const pimlicoAccount: PimlicoSmartAccount = {
          address: accountAddress,
          client: smartAccountClient,
          publicClient,
          pimlicoClient,
        };

        setSmartAccount(pimlicoAccount);
        return pimlicoAccount;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create smart account";
        setError(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    }, [wallets]);

  const sendTransaction = useCallback(
    async (
      transaction: { to: string; value?: bigint; data?: string },
      options?: { useSponsoredTx?: boolean; tokenAddress?: string }
    ): Promise<string | null> => {
      if (!smartAccount) {
        setError("Smart account not available");
        return null;
      }

      try {
        if (options?.useSponsoredTx) {
          // For sponsored transactions, create a temporary client with paymaster
          const tempClient = createSmartAccountClient({
            account: smartAccount.client.account,
            chain: polygon,
            paymaster: smartAccount.pimlicoClient,
            bundlerTransport: http(pimlicoService.getPimlicoRpcUrl()),
            userOperation: {
              estimateFeesPerGas: async () => {
                return (
                  await smartAccount.pimlicoClient.getUserOperationGasPrice()
                ).fast;
              },
              prepareUserOperation: prepareUserOperationForErc20Paymaster(
                smartAccount.pimlicoClient
              ),
            },
          });

          const hash = await tempClient.sendTransaction({
            calls: [
              {
                to: transaction.to as `0x${string}`,
                data: (transaction.data as `0x${string}`) || "0x",
                value: transaction.value || BigInt(0),
              },
            ],
            paymasterContext: {
              token: USDC_CONTRACT_ADDRESS,
            },
          });
          console.log("hash", hash);

          // const hash = await tempClient.sendUserOperation({
          //   paymasterContext: {
          //     token: USDC_CONTRACT_ADDRESS,
          //   },
          //   calls: [
          //     {
          //       abi: parseAbi(["function approve(address,uint)"]),
          //       functionName: "approve",
          //       args: [paymaster, maxCostInToken],
          //       to: USDC_CONTRACT_ADDRESS,
          //     },
          //     {
          //       to: transaction.to as `0x${string}`,
          //       data: transaction.data as `0x${string}` || '0x',
          //       value: transaction.value || BigInt(0),
          //     },
          //   ],
          // })

          return hash;
        } else {
          // Regular transaction without sponsorship
          const txHash = await smartAccount.client.sendTransaction({
            account: smartAccount.client.account,
            to: transaction.to as `0x${string}`,
            data: (transaction.data as `0x${string}`) || "0x",
            value: transaction.value || BigInt(0),
          });
          return txHash;
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to send transaction";
        setError(errorMessage);
        return null;
      }
    },
    [smartAccount]
  );

  const signMessage = useCallback(
    async (message: string): Promise<string | null> => {
      if (!smartAccount) {
        setError("Smart account not available");
        return null;
      }

      try {
        const signature = await smartAccount.client.signMessage({
          chain: polygon,
          message,
        });
        return signature;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to sign message";
        setError(errorMessage);
        return null;
      }
    },
    [smartAccount]
  );

  // Add Pimlico-specific methods
  const getUserOperationGasPrice = useCallback(async () => {
    if (!smartAccount?.pimlicoClient) {
      setError("Pimlico client not available");
      return null;
    }

    try {
      return await smartAccount.pimlicoClient.getUserOperationGasPrice();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to get gas price";
      setError(errorMessage);
      return null;
    }
  }, [smartAccount]);

  const getUserOperationStatus = useCallback(
    async (userOperationHash: string) => {
      if (!smartAccount?.client) {
        setError("Smart account client not available");
        return null;
      }

      try {
        // Access Pimlico client through the smart account client's paymaster
        const pimlicoClient = (smartAccount.client as any).paymaster;
        if (!pimlicoClient) {
          throw new Error("Pimlico paymaster not available");
        }
        return await pimlicoClient.getUserOperationStatus({
          userOperationHash,
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to get user operation status";
        setError(errorMessage);
        return null;
      }
    },
    [smartAccount]
  );

  const waitForUserOperationReceipt = useCallback(
    async (userOperationHash: string) => {
      if (!smartAccount?.client) {
        setError("Smart account client not available");
        return null;
      }

      try {
        return await smartAccount.client.waitForUserOperationReceipt({
          hash: userOperationHash,
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to wait for user operation receipt";
        setError(errorMessage);
        return null;
      }
    },
    [smartAccount]
  );

  const getUSDCBalance = useCallback(async (): Promise<bigint | null> => {
    if (!smartAccount?.publicClient || !smartAccount?.address) {
      setError("Smart account not available");
      return null;
    }

    try {
      const balance = await smartAccount.publicClient.readContract({
        address: USDC_CONTRACT_ADDRESS as `0x${string}`,
        abi: parseAbi([
          "function balanceOf(address account) returns (uint256)",
        ]),
        functionName: "balanceOf",
        args: [smartAccount.address as `0x${string}`],
      });
      return balance as bigint;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to get USDC balance";
      setError(errorMessage);
      return null;
    }
  }, [smartAccount]);

  const estimateTransactionCost = useCallback(async (): Promise<{
    estimatedGas: bigint;
    gasPrice: bigint;
    totalCost: bigint;
  } | null> => {
    if (!smartAccount?.client) {
      setError("Smart account not available");
      return null;
    }

    try {
      // Get gas price from Pimlico
      const gasPrice = await getUserOperationGasPrice();

      if (!gasPrice) {
        throw new Error("Failed to get gas price");
      }

      const maxFeePerGas = gasPrice.fast.maxFeePerGas;

      // Use a conservative gas estimate for the transaction
      const estimatedGas = 200000n; // This can be adjusted based on your needs
      const totalCost = estimatedGas * maxFeePerGas;

      return {
        estimatedGas,
        gasPrice: maxFeePerGas,
        totalCost,
      };
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to estimate transaction cost";
      setError(errorMessage);
      return null;
    }
  }, [smartAccount, getUserOperationGasPrice]);

  useEffect(() => {
    if (wallets.length > 0) {
      createSmartAccount();
    }
  }, [wallets, createSmartAccount]);

  return {
    smartAccount,
    isLoading,
    error,
    createSmartAccount,
    sendTransaction,
    signMessage,
    getUserOperationGasPrice,
    getUserOperationStatus,
    waitForUserOperationReceipt,
    getUSDCBalance,
    estimateTransactionCost,
  };
};
