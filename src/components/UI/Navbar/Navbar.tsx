import { useLocation, useNavigate } from "react-router-dom";

import { Coin as CoinIcon } from "@/components/icons/Coin";
import { Market as MarketIcon } from "@/components/icons/Market";
import { Wallet as WalletIcon } from "@/components/icons/Wallet";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const goTo = (path: string) => {
    navigate(path);
  };

  const isPortfolioPage = location.pathname === "/portfolio";
  const isMarketPage = location.pathname === "/";
  const isRewardsPage = location.pathname === "/rewards";

  return (
    <div className="fixed bottom-0 w-full px-11 py-2.5 bg-neutral-50/70 backdrop-blur-[10px] inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden border-t-1">
      <div className="w-full flex justify-between items-center gap-5">
        <div
          className={cn(
            "w-20 inline-flex flex-col justify-start items-center gap-1.5",
            isPortfolioPage ? "" : "opacity-40"
          )}
          onClick={() => goTo("/portfolio")}
        >
          <div className="w-6 h-6 relative overflow-hidden">
            <WalletIcon />
          </div>
          <div
            className={
              "self-stretch text-center justify-start text-xs font-medium font-['Geist'] leading-3"
            }
          >
            Portfolio
          </div>
        </div>
        <div
          className={cn(
            "w-20 inline-flex flex-col justify-start items-center gap-1.5",
            isMarketPage ? "" : "opacity-40"
          )}
          onClick={() => goTo("/")}
        >
          <div className="w-6 h-6 relative overflow-hidden">
            <MarketIcon />
          </div>
          <div
            className={
              "self-stretch text-center justify-start text-xs font-medium font-['Geist'] leading-3"
            }
          >
            Market
          </div>
        </div>
        <div
          className={cn(
            "w-20 inline-flex flex-col justify-start items-center gap-1.5",
            isRewardsPage ? "" : "opacity-40"
          )}
          onClick={() => goTo("/rewards")}
        >
          <div className="w-6 h-6 relative overflow-hidden">
            <CoinIcon />
          </div>
          <div
            className={cn(
              "self-stretch text-center justify-start  text-xs font-medium font-['Geist'] leading-3"
            )}
          >
            Rewards
          </div>
        </div>
      </div>
      {/* <div
        data-orientation="Horizontal"
        className="w-96 left-0 top-[1px] absolute flex flex-col justify-start items-start gap-2.5"
      >
        <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-base-border"></div>
      </div> */}
    </div>
  );
};
