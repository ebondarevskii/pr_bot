import React from "react";
import { usePrivy } from "@privy-io/react-auth";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { LoginButton } from "@/components/Auth/LoginButton";
// import { MainLayout } from "@/components/Layout/MainLayout";
import { TelegramAuth } from "@/components/Auth/TelegramAuth";

import "./styles/global.css";
import { AppRoutes } from "./AppRoutes";

const App: React.FC = () => {
  const { authenticated, user, ready } = usePrivy();

  // const manifestUrl = `https://telegram-mini-app.vercel.app/tonconnect-manifest.json`;
  const manifestUrl = `https://gist.githubusercontent.com/z0rats/370cce01adcc582a1177ffbd058172bf/raw/c8f7089ed5fb1e7c7b024e0f8e2ef43bfa62bd9f/tonconnect-manifest.json`;

  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!authenticated || !user) {
    return (
      <TonConnectUIProvider
        manifestUrl={manifestUrl}
        actionsConfiguration={{
          twaReturnUrl: "https://t.me/mighty_hugely_bot", // важно для мини-аппов
        }}
      >
        <TelegramAuth>
          <LoginButton />
        </TelegramAuth>
      </TonConnectUIProvider>
    );
  }

  return (
    <TonConnectUIProvider
      manifestUrl={manifestUrl}
      actionsConfiguration={{
        twaReturnUrl: "https://t.me/mighty_hugely_bot", // важно для мини-аппов
      }}
    >
      {/* <MainLayout user={user!} onLogout={logout} /> */}
      <AppRoutes />
    </TonConnectUIProvider>
  );
};

export default App;
