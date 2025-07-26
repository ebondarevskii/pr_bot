import { useState } from "react";

// import { useTonConnectUI } from "@tonconnect/ui-react";

// import { getTonToPolygonBridgeTx } from "@/api";

export type UseBridgeTonToPolygonReturn = {
  sendTransaction: (params: SendTransactionParams) => void;
  clearState: () => void;
  isLoading: boolean;
  isSuccess: boolean;
};

export type SendTransactionParams = {
  tonAddressFrom: string;
  polygonAddressTo: string;
  amountIn: string;
};
// @ts-ignore
function delay(t, val) {
  return new Promise((resolve) => setTimeout(resolve, t, val));
}

export const useDepositToPrediction = (): UseBridgeTonToPolygonReturn => {
  // const [tonConnectUI] = useTonConnectUI();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const sendTransaction = async ({
    tonAddressFrom,
    polygonAddressTo,
    amountIn,
  }: SendTransactionParams) => {
    setIsLoading(true);
    console.log(tonAddressFrom, polygonAddressTo, amountIn);
    try {
      //   const txTesponse = await getTonToPolygonBridgeTx({
      //     tonAddressFrom,
      //     polygonAddressTo,
      //     amountIn,
      //   });

      await delay(4000, 1);

      //   await tonConnectUI.sendTransaction(txTesponse.tx);
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const clearState = () => {
    setIsLoading(false);
    setIsSuccess(false);
  };

  return { sendTransaction, clearState, isLoading, isSuccess };
};
