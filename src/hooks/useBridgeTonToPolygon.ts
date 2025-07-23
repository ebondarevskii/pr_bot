import { useState } from "react";

import { useTonConnectUI } from "@tonconnect/ui-react";

import { getTonToPolygonBridgeTx } from "@/api";

export type UseBridgeTonToPolygonReturn = {
  sendTransaction: (params: SendTransactionParams) => void;
  isLoading: boolean;
};

export type SendTransactionParams = {
  tonAddressFrom: string;
  polygonAddressTo: string;
  amountIn: bigint;
};

export const useBridgeTonToPolygon = (): UseBridgeTonToPolygonReturn => {
  const [tonConnectUI] = useTonConnectUI();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendTransaction = async ({
    tonAddressFrom,
    polygonAddressTo,
    amountIn,
  }: SendTransactionParams) => {
    setIsLoading(true);

    const txTesponse = await getTonToPolygonBridgeTx({
      tonAddressFrom,
      polygonAddressTo,
      amountIn,
    });

    await tonConnectUI.sendTransaction(txTesponse.tx);

    setIsLoading(false);
  };

  return { sendTransaction, isLoading };
};
