import React, { useState } from "react";
import { Button } from "@/components/UI/CustomButton";
import { Card } from "@/components/UI/Card";
import { TONWalletSelector } from "@/components/Auth/TONWalletSelector";
import {
  useTonAddress,
  useTonWallet,
  useTonConnectModal,
  useTonConnectUI,
} from "@tonconnect/ui-react";

interface ClickableAddressProps {
  address: string;
  className?: string;
  showFull?: boolean;
}

const ClickableAddress: React.FC<ClickableAddressProps> = ({
  address,
  className = "text-sm text-gray-500 font-mono",
  showFull = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy address:", err);
    }
  };

  const displayAddress = showFull
    ? address
    : `${address.slice(0, 4)}...${address.slice(-4)}`;

  return (
    <button
      onClick={handleCopy}
      className={`${className} hover:text-blue-600 transition-colors duration-200 cursor-pointer group relative`}
      title="Click to copy address"
    >
      {displayAddress}
      <span className="ml-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {copied ? "✅ Copied!" : "📋 Copy"}
      </span>
    </button>
  );
};

export const TONWalletConnect: React.FC = () => {
  const address = useTonAddress();
  const wallet = useTonWallet();
  const { open } = useTonConnectModal();
  const [tonConnectUI] = useTonConnectUI();

  const [selectedWallet, setSelectedWallet] = useState<string>("");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState<string | null>(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);

  const isConnected = !!address && !!wallet;

  const handleSelectWallet = (walletId: string) => {
    setSelectedWallet(walletId);
    open();
  };

  const handleDisconnect = () => {
    tonConnectUI.disconnect();
    setSelectedWallet("");
    setBalance(null);
  };

  const handleSendTransaction = async () => {
    if (!recipientAddress || !amount) {
      return;
    }

    setIsSending(true);
    try {
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 600, // 10 minutes
        messages: [
          {
            address: recipientAddress,
            amount: (parseFloat(amount) * 1_000_000_000).toString(), // Convert to nano TON
            payload: "Sent from TON Mini App",
          },
        ],
      };

      const result = await tonConnectUI.sendTransaction(transaction);

      setTxHash(result.boc || "Transaction sent successfully");
      setRecipientAddress("");
      setAmount("");
    } catch (error) {
      console.error("Failed to send transaction:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleCheckBalance = async () => {
    if (!address) return;

    setIsLoadingBalance(true);
    try {
      const response = await fetch(
        `https://toncenter.com/api/v2/getAddressBalance?address=${address}`
      );
      const data = await response.json();

      if (data.ok) {
        const tonBalance = (parseInt(data.result) / 1_000_000_000).toFixed(4);
        setBalance(tonBalance);
      }
    } catch (error) {
      console.error("Failed to get balance:", error);
    } finally {
      setIsLoadingBalance(false);
    }
  };

  const getWalletIcon = (walletType: string) => {
    switch (walletType) {
      case "tonspace":
        return "🟠";
      default:
        return "💎";
    }
  };

  // Show wallet selector if not connected
  if (!isConnected) {
    return (
      <Card>
        <TONWalletSelector
          onSelectWallet={handleSelectWallet}
          selectedWallet={selectedWallet}
        />
      </Card>
    );
  }

  // Show connected wallet interface
  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center justify-center space-x-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">
              {getWalletIcon(wallet?.device.appName.toLowerCase() || "unknown")}
            </span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">
              {wallet?.device.appName || "TON Wallet"}
            </h2>
            <p className="text-gray-600">Connected</p>
            {address && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1">Address:</p>
                <ClickableAddress
                  address={address}
                  className="text-sm text-gray-500 font-mono"
                />
              </div>
            )}
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-medium mb-4">TON Balance</h3>
        {balance ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <span className="text-blue-600 text-sm font-medium">
                Balance:
              </span>
              <span className="text-blue-600 text-sm">{balance} TON</span>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-600 text-sm mb-3">Balance not loaded</p>
            <Button
              onClick={handleCheckBalance}
              loading={isLoadingBalance}
              className="w-full"
              variant="secondary"
            >
              Check Balance
            </Button>
          </div>
        )}
        {balance && (
          <Button
            onClick={handleCheckBalance}
            loading={isLoadingBalance}
            className="w-full mt-3"
            variant="secondary"
          >
            Refresh Balance
          </Button>
        )}
      </Card>

      <Card>
        <h3 className="text-lg font-medium mb-4">Send TON</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recipient Address
            </label>
            <input
              type="text"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              placeholder="EQD... (TON address)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (TON)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.1"
              step="0.001"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <Button
            onClick={handleSendTransaction}
            loading={isSending}
            disabled={!recipientAddress || !amount}
            className="w-full"
            variant="primary"
          >
            {isSending ? "Sending..." : "Send TON"}
          </Button>

          {txHash && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-green-600 text-sm font-medium">
                Transaction Sent!
              </p>
              <ClickableAddress
                address={txHash}
                className="text-green-600 text-xs font-mono break-all"
                showFull={true}
              />
            </div>
          )}
        </div>
      </Card>

      <Card>
        <Button
          onClick={handleDisconnect}
          className="w-full"
          variant="secondary"
        >
          Disconnect TON Wallet
        </Button>
      </Card>
    </div>
  );
};
