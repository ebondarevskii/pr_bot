import { createPublicClient, http, type PublicClient } from 'viem';
import { polygon } from 'viem/chains';
import { createPimlicoClient } from 'permissionless/clients/pimlico';
import { entryPoint07Address } from 'viem/account-abstraction';
import { PIMLICO_CONFIG } from '@/utils/constants';

export interface PimlicoSmartAccount {
  address: string;
  client: any; // SmartAccountClient
  publicClient: PublicClient;
  pimlicoClient?: any; // Store Pimlico client separately
}

class PimlicoService {
  private publicClient: PublicClient;

  constructor() {
    this.publicClient = createPublicClient({
      chain: polygon,
      transport: http(polygon.rpcUrls.default.http[0]),
    });
  }

  getPublicClient(): PublicClient {
    return this.publicClient;
  }

  createPimlicoClient() {
    return createPimlicoClient({
      chain: polygon,
      transport: http(this.getPimlicoRpcUrl()),
      entryPoint: {
        address: entryPoint07Address,
        version: "0.7",
      }
    });
  }

  validateConfiguration(): { isValid: boolean; message: string } {
    if (!PIMLICO_CONFIG.API_KEY) {
      return {
        isValid: false,
        message: 'Pimlico API key is not configured. Please set VITE_PIMLICO_API_KEY in your environment variables.',
      };
    }

    return {
      isValid: true,
      message: 'Pimlico configuration is valid.',
    };
  }

  getEnvironmentInfo() {
    return {
      apiKey: PIMLICO_CONFIG.API_KEY ? 'Set' : 'Not set',
      bundlerUrl: PIMLICO_CONFIG.BUNDLER_URL,
      paymasterUrl: PIMLICO_CONFIG.PAYMASTER_URL,
    };
  }

  // Helper method to get the correct RPC URLs for Pimlico
  getPimlicoRpcUrl(): string {
    return `https://api.pimlico.io/v2/137/rpc?apikey=${PIMLICO_CONFIG.API_KEY}`;
  }
}

export const pimlicoService = new PimlicoService(); 