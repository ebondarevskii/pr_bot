import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Market } from "./pages/Market";
import { Navbar } from "./components/UI/Navbar";
import { Portfolio } from "./pages/Portfolio";
import { Rewards } from "./pages/Rewards";
import { useBalanceStore } from "./store/useBalanceStore";
import { useEffect } from "react";
import { usePimlicoSmartAccount } from "./hooks/usePimlicoSmartAccount";
import { Prediction } from "./pages/Prediction";

export const AppRoutes = () => {
  const {
    // smartAccount,
    // sendTransaction,
    // signMessage,
    // getUserOperationGasPrice,
    getUSDCBalance,
    // isLoading: smartAccountLoading,
    // error: smartAccountError,
  } = usePimlicoSmartAccount();

  const setUserBalance = useBalanceStore((state) => state.setBalance);
  const setIsLoading = useBalanceStore((state) => state.setIsLoading);

  const handleCheckUSDCBalance = async () => {
    setIsLoading(true);
    try {
      const balance = await getUSDCBalance();
      setUserBalance(Number(balance) / 1_000_000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleCheckUSDCBalance();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Market />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/prediction/:predictionId" element={<Prediction />} />
      </Routes>
      <Navbar />
    </Router>
  );
};
