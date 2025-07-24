import {
  useTonAddress,
  useTonConnectModal,
  useTonWallet,
} from "@tonconnect/ui-react";

export const useTonConnect = () => {
  const address = useTonAddress();
  const wallet = useTonWallet();
  const { open } = useTonConnectModal();

  const isConnected = !!address && !!wallet;

  const connectTonWallet = async () => {
    open();
  };

  return {
    address,
    isConnected,
    connectTonWallet,
  };
};
