import React from "react";
import { usePrivy } from "@privy-io/react-auth";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
// import { LoginButton } from "@/components/Auth/LoginButton";
// import { MainLayout } from "@/components/Layout/MainLayout";
// import { TelegramAuth } from "@/components/Auth/TelegramAuth";

import "./styles/global.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Market } from "./pages/Market";
import { Navbar } from "./components/UI/Navbar";
import { Portfolio } from "./pages/Portfolio";
import { Rewards } from "./pages/Rewards";

const App: React.FC = () => {
  const { authenticated, user, logout, ready } = usePrivy();

  const manifestUrl = `https://gist.githubusercontent.com/z0rats/370cce01adcc582a1177ffbd058172bf/raw/c8f7089ed5fb1e7c7b024e0f8e2ef43bfa62bd9f/tonconnect-manifest.json`;

  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // if (!authenticated || !user) {
  //   return (
  //     <TonConnectUIProvider manifestUrl={manifestUrl}>
  //       <TelegramAuth>
  //         <LoginButton />
  //       </TelegramAuth>
  //     </TonConnectUIProvider>
  //   );
  // }

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      {/* <MainLayout user={user!} onLogout={logout} /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Market />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/rewards" element={<Rewards />} />
        </Routes>
        <Navbar />
      </Router>
    </TonConnectUIProvider>
  );
};

export default App;
