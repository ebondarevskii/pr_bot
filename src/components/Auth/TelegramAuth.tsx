import React, { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { retrieveLaunchParams, isTMA } from "@telegram-apps/bridge";

interface TelegramAuthProps {
  children: React.ReactNode;
}

export const TelegramAuth: React.FC<TelegramAuthProps> = ({ children }) => {
  const { authenticated, ready, linkTelegram, login, logout } = usePrivy();
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
    logout();
    if (ready && isMiniApp && !authenticated && !hasLinked) {
      setHasLinked(true);
      try {
        const launchParams = retrieveLaunchParams();
        if (launchParams && launchParams.initDataRaw) {
          linkTelegram({ launchParams: launchParams.initDataRaw });
        }
      } catch (error) {
        // Fallback to manual login if launch params fail
      }
    }
  }, [ready, isMiniApp, authenticated, hasLinked, linkTelegram]);

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
          {!isMiniApp && (
            <button
              onClick={login}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Login with Telegram
            </button>
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
