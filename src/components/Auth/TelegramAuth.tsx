import React, { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { retrieveLaunchParams, isTMA } from "@telegram-apps/bridge";

interface TelegramAuthProps {
  children: React.ReactNode;
}

export const TelegramAuth: React.FC<TelegramAuthProps> = ({ children }) => {
  const { authenticated, ready, linkTelegram, login } = usePrivy();
  const [hasLinked, setHasLinked] = useState(false);
  const [isMiniApp, setIsMiniApp] = useState(false);

  useEffect(() => {
    const checkTelegramEnvironment = async () => {
      try {
        const isCompleteTMA = await isTMA();
        setIsMiniApp(isCompleteTMA);
      } catch (error) {
        setIsMiniApp(false);
      }
    };

    checkTelegramEnvironment();
  }, []);

  useEffect(() => {
    const tryLoginWithTelegram = async () => {
      console.log("tet: ", authenticated);
      if (!ready || !isMiniApp || authenticated || hasLinked) return;

      setHasLinked(true);

      try {
        const params = await retrieveLaunchParams();

        const initDataRaw =
          params?.initDataRaw || window.Telegram?.WebApp?.initData;

        if (initDataRaw) {
          await linkTelegram({ launchParams: initDataRaw });
        }
      } catch (error) {
        console.error("Error during Telegram login", error);
      }
    };

    tryLoginWithTelegram();
  }, [ready, isMiniApp, authenticated, hasLinked]);

  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-xl font-semibold mb-4">Welcome</h1>

          <button
            onClick={login}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Login with Telegram
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
