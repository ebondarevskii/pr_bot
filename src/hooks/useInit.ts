import { useTonAddress } from "@tonconnect/ui-react";

import { useAppStore } from "@/store/useAppStore";
import { useBalanceStore } from "@/store/useBalanceStore";
import { useEffect } from "react";
import { usePimlicoSmartAccount } from "./usePimlicoSmartAccount";
import { getUserBalances } from "@/api";

export const useInit = () => {
  const { smartAccount } = usePimlicoSmartAccount();

  const tonAddress = useTonAddress();

  const setPolygonBalance = useBalanceStore((state) => state.setPolygonBalance);
  const setTonBalance = useBalanceStore((state) => state.setTonBalance);
  const setIsLoading = useBalanceStore((state) => state.setIsLoading);

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

      if (balances.tonpolygon.native && balances.tonpolygon.usdt) {
        setPolygonBalance(balances.tonpolygon.usdt, balances.tonpolygon.native);
      }

      if (balances.ton.native && balances.ton.usdt) {
        setTonBalance(balances.ton.usdt, balances.ton.native);
      }
    } finally {
      setIsLoading(false);
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
    changeAddresses;
  }, [smartAccount?.address, tonAddress]);
};
