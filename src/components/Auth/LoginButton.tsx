import React from "react";
import { Button } from "@/components/UI/CustomButton";
import { usePrivyAuth } from "@/hooks/usePrivyAuth";
import { useTelegram } from "@/hooks/useTelegram";

export const LoginButton: React.FC = () => {
  const { login, isLoading, error } = usePrivyAuth();
  const { user: telegramUser } = useTelegram();

  const handleLogin = async () => {
    const user = await login();
    if (user) {
      console.log("Successfully logged in with Privy:", user);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Welcome to Privy</h2>
        <p className="text-gray-600 mb-4">
          Connect your wallet and get a smart wallet to get started
        </p>
      </div>

      <Button onClick={handleLogin} loading={isLoading} className="w-full">
        {isLoading ? "Connecting..." : "Connect with Privy"}
      </Button>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {telegramUser && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-blue-600 text-sm">
            Telegram user detected: @{telegramUser.username}
          </p>
        </div>
      )}
    </div>
  );
};
