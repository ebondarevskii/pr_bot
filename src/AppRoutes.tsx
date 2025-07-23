import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Market } from "./pages/Market";
import { Navbar } from "./components/UI/Navbar";
import { Portfolio } from "./pages/Portfolio";
import { Rewards } from "./pages/Rewards";
import { Prediction } from "./pages/Prediction";
import { useInit } from "./hooks/useInit";

export const AppRoutes = () => {
  useInit(); // load balances and addresses

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
