import { Drawer, DrawerContent, DrawerTrigger } from "../drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../UI/tabs";

import { useState } from "react";
import { Button, buttonVariants } from "../../UI/Button";
import { Minus as MinusIcon } from "@/components/icons/Minus";
import { Plus as PlusIcon } from "@/components/icons/Plus";
import { getFiatAmountCorrect } from "@/lib/number";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";

interface Props {
  defaultType: "yes" | "no";
  buttonTitle?: string;
  className?: string;
}

export const BuyPrediction: React.FC<
  Props & VariantProps<typeof buttonVariants>
> = ({ defaultType, buttonTitle = "Buy", variant = "default", className }) => {
  const [amount, setAmount] = useState<number>(0);

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

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant={variant} className={cn("w-full mb-2", className)}>
          {buttonTitle}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="bg-white rounded-t-[10px] pt-[16px] px-[15px] pb-[15px]">
          <Tabs
            className="w-full"
            defaultValue={defaultType === "yes" ? "buy_yes" : "buy_no"}
          >
            <TabsList className="w-full">
              <TabsTrigger value="buy_yes">Buy Yes</TabsTrigger>
              <TabsTrigger value="buy_no">Buy No</TabsTrigger>
            </TabsList>
            <TabsContent value="buy_yes">
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
                <p className="text-[#737373] text-[14px] font-normal">To win</p>
                <p className="text-[#0A0A0A] text-[14px] font-medium">-</p>
              </div>
              <div className="flex justify-between mb-[4px]">
                <p className="text-[#737373] text-[14px] font-normal">Fees</p>
                <p className="text-[#0A0A0A] text-[14px] font-medium">-</p>
              </div>
              <Button className="w-full mt-[85px]">Buy yes</Button>
            </TabsContent>
            <TabsContent value="buy_no">
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
                <p className="text-[#737373] text-[14px] font-normal">To win</p>
                <p className="text-[#0A0A0A] text-[14px] font-medium">-</p>
              </div>
              <div className="flex justify-between mb-[4px]">
                <p className="text-[#737373] text-[14px] font-normal">Fees</p>
                <p className="text-[#0A0A0A] text-[14px] font-medium">-</p>
              </div>

              <Button className="w-full mt-[85px]">Buy no</Button>
            </TabsContent>
          </Tabs>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
