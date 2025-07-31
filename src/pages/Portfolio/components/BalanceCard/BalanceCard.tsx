// import { Banknote as BanknoteIcon } from "@/components/icons/Banknote";
import { TrendingArrow as TrendingArrowIcon } from "@/components/icons/TrendingArrow";

import { Badge } from "@/components/UI/badge";
import { Button } from "@/components/UI/Button";
import { TopUp } from "@/components/drawers/TopUp";
import { useBalanceStore } from "@/store/useBalanceStore";
import { getFiatAmountCorrect } from "@/lib/number";
import { Withdraw } from "@/components/drawers/Withdraw";

export const BalanceCard = () => {
  const userAppUsdtBalance = useBalanceStore((state) => state.polygonBalance);

  return (
    <div className="mb-10 flex-col p-6 rounded-[14px] border border-[#E5E5E5] bg-linear-[180deg, rgba(23, 23, 23, 0.00) 0%, rgba(23, 23, 23, 0.05) 100%), #FFF]">
      <div className="flex justify-between mb-1.5">
        <h4 className="text-sm font-normal font-['Geist'] text-[#737373]">
          Total Balance
        </h4>
        <Badge variant="outline">
          {/* <div className="flex gap-1 items-center">
            <BanknoteIcon />
            <p className="font-['Geist'] text-xs font-semibold text-[#0A0A0A]">
              {`$1,000.00 Cash`}
            </p>
          </div> */}
        </Badge>
      </div>
      <p className="text-[#0A0A0A] font-['Geist'] font-semibold text-3xl mb-6">
        {`$${getFiatAmountCorrect(userAppUsdtBalance)}`}
      </p>
      <div className="flex justify-between mb-5">
        <p className="text-[#737373] font-['Geist'] text-sm font-normal"></p>
        <div className="flex gap-2">
          <p className="text-[#22C55E] text-sm font-['Geist'] font-normal">
            $0
          </p>
          <TrendingArrowIcon />
        </div>
      </div>
      <div className="flex justify-between gap-2">
        <div className="flex-1">
          <TopUp />
        </div>
        <div className="flex-1">
          <Withdraw />
        </div>
      </div>
    </div>
  );
};
