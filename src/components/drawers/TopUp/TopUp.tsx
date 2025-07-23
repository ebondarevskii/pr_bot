import { Drawer, DrawerContent, DrawerTrigger } from "../drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../UI/tabs";

import { useState } from "react";
import { toNano } from "@ton/core";

import { Button } from "@/components/UI/Button";
import { Minus as MinusIcon } from "@/components/icons/Minus";
import { Plus as PlusIcon } from "@/components/icons/Plus";
import { getFiatAmountCorrect } from "@/lib/number";
import { cn } from "@/lib/utils";
import { Lock as LockIcon } from "@/components/icons/Lock";
import { useBridgeTonToPolygon } from "@/hooks/useBridgeTonToPolygon";
import { useAppStore } from "@/store/useAppStore";

export const TopUp = () => {
  const [open, setOpen] = useState<boolean>(false);

  const polygonAddress = useAppStore((state) => state.polygonAddress);
  const tonAddress = useAppStore((state) => state.tonAddress);

  const [amount, setAmount] = useState<number>(0);

  const { sendTransaction, isLoading: isTxLoading } = useBridgeTonToPolygon();

  const onClickMinus = () => {
    setAmount((prev) => {
      if (prev === 0) {
        return 0;
      }

      return prev - 10;
    });
  };

  const onClickPlus = () => {
    setAmount((prev) => {
      return prev + 10;
    });
  };

  const sendTopupTransaction = async () => {
    sendTransaction({
      tonAddressFrom: tonAddress,
      polygonAddressTo: polygonAddress,
      amountIn: toNano(amount),
    });

    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="default" className="w-full mb-2">
          Add funds
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="bg-white rounded-t-[10px] pt-[16px] px-[15px] pb-[15px]">
          <h4 className="mb-[4px] self-stretch text-center justify-start text-[#0a0a0a] text-lg font-semibold font-['Geist'] leading-none">
            Top up your Predicton balance
          </h4>
          <p className="mb-[66px] self-stretch text-center justify-start text-sm font-normal font-['Geist'] leading-tight text-[#737373]">
            Minimum deposit is $2
          </p>

          <div className="flex justify-between items-center mb-[12px]">
            <div onClick={onClickMinus}>
              <MinusIcon />
            </div>

            <div className="flex-col items-center gap-[8px]">
              <p
                className={cn(
                  "text-[#F5F5F5] text-center text-5xl font-bold leading-12 font-['Geist']",
                  !!amount && "text-[#0A0A0A]"
                )}
              >
                {`$${getFiatAmountCorrect(`${amount}`)}`}
              </p>
              <p className="text-[#737373] text-[12px] font-normal leading-5">
                Available: $1,200 USDT
              </p>
            </div>
            <div onClick={onClickPlus}>
              <PlusIcon />
            </div>
          </div>
          <div className="flex justify-between mb-[4px]">
            <p className="text-[#737373] text-[14px] font-normal">
              Predicton fees
            </p>
            <p className="text-[#0A0A0A] text-[14px] font-medium">0%</p>
          </div>
          <div className="flex justify-between mb-[4px]">
            <p className="text-[#737373] text-[14px] font-normal">
              Network fees
            </p>
            <p className="text-[#0A0A0A] text-[14px] font-medium">$0.5</p>
          </div>
          <div className="flex justify-between mb-[50px]">
            <p className="text-[#737373] text-[14px] font-normal">
              Min. arrive
            </p>
            <p className="text-[#0A0A0A] text-[14px] font-medium">$999.09</p>
          </div>
          <Tabs className="w-full" defaultValue="ton_space">
            <TabsList className="w-full">
              <TabsTrigger value="ton_space">TON Space</TabsTrigger>
              <TabsTrigger value="stars">Stars</TabsTrigger>
              <TabsTrigger value="credit_card">Credit card</TabsTrigger>
            </TabsList>
            <TabsContent value="ton_space">
              <Button
                className="w-full"
                onClick={sendTopupTransaction}
                disabled={isTxLoading}
              >
                Top up
              </Button>
            </TabsContent>
            <TabsContent value="stars">
              <Button className="w-full flex gap-[8px] justify-center">
                <LockIcon />
                Coming soon
              </Button>
            </TabsContent>
            <TabsContent value="credit_card">
              <Button className="w-full flex gap-[8px] justify-center">
                <LockIcon />
                Coming soon
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
