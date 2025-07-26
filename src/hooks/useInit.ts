import { useTonAddress } from "@tonconnect/ui-react";

import { useAppStore } from "@/store/useAppStore";
import { useBalanceStore } from "@/store/useBalanceStore";
import { useEffect } from "react";
import { usePimlicoSmartAccount } from "./usePimlicoSmartAccount";
import {
  getMarketPridictions,
  getUserBalances,
  getUserMarketPositions,
} from "@/api";
import { usePredictionStore } from "@/store/usePredictionStore";

export const useInit = () => {
  const { smartAccount } = usePimlicoSmartAccount();

  const tonAddress = useTonAddress();

  const setPolygonBalance = useBalanceStore((state) => state.setPolygonBalance);
  const setTonBalance = useBalanceStore((state) => state.setTonBalance);
  const setIsLoading = useBalanceStore((state) => state.setIsLoading);

  const setPredictions = usePredictionStore((state) => state.setPredictions);
  const setIsLoadingPredictions = usePredictionStore(
    (state) => state.setIsLoading
  );

  const setUserPredictions = usePredictionStore(
    (state) => state.setUserPredictions
  );

  const setAddresses = useAppStore((state) => state.setAddresses);

  const fetchBalances = async () => {
    if (!smartAccount?.address || !tonAddress) {
      return;
    }
    setIsLoading(true);
    try {
      const balances = await getUserBalances({
        tonAddress,
        polygonAddress: smartAccount?.address,
      });

      setPolygonBalance(
        balances?.tonpolygon?.usdt || "0",
        balances?.tonpolygon?.native || "0"
      );

      setTonBalance(balances?.ton?.usdt || "0", balances?.ton?.native || "0");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPredictions = async (address: string) => {
    setIsLoadingPredictions(true);
    try {
      const market = await getMarketPridictions();

      if (address) {
        const userPredictions = await getUserMarketPositions(address);

        userPredictions && setUserPredictions(userPredictions);
      }

      if (market) {
        setPredictions(market);
      }
    } finally {
      setIsLoadingPredictions(false);
    }
  };

  console.log("test: ", tonAddress, smartAccount?.address);

  const changeAddresses = () => {
    if (!smartAccount?.address || !tonAddress) {
      return;
    }

    setAddresses(tonAddress, smartAccount?.address);
  };

  useEffect(() => {
    fetchBalances();
    changeAddresses();
    fetchPredictions(smartAccount?.address || "");
  }, [smartAccount?.address, tonAddress]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchBalances();
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);
};
