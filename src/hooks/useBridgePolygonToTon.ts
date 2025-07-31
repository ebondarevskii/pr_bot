import { useState } from "react";

import { useTonConnectUI } from "@tonconnect/ui-react";

import { getPolygonToTonBridgeTx } from "@/api";

export type UseBridgeTonToPolygonReturn = {
  sendTransaction: (params: SendTransactionParams) => void;
  isLoading: boolean;
  isSuccess: boolean;
};

export type SendTransactionParams = {
  polygonAddressFrom: string;
  tonAddressTo: string;
  amount: string;
};

export const useBridgePolygonToTon = (): UseBridgeTonToPolygonReturn => {
  const [tonConnectUI] = useTonConnectUI();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const sendTransaction = async ({
    polygonAddressFrom,
    tonAddressTo,
    amount,
  }: SendTransactionParams) => {
    setIsLoading(true);

    try {
      const txTesponse = await getPolygonToTonBridgeTx({
        polygonAddressFrom,
        tonAddressTo,
        amount,
      });

      console.log("txTesponse: ", txTesponse);

      await tonConnectUI.sendTransaction(txTesponse.tx);
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendTransaction, isLoading, isSuccess };
};
