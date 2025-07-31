import { Drawer, DrawerContent, DrawerTrigger } from "../drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../UI/tabs";

import { useEffect, useState } from "react";
import { Button, buttonVariants } from "../../UI/Button";
import { Minus as MinusIcon } from "@/components/icons/Minus";
import { Plus as PlusIcon } from "@/components/icons/Plus";
import { getFiatAmountCorrect } from "@/lib/number";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { useDepositToPrediction } from "@/hooks/useDepositToPrediction";
import { Loader } from "@/components/icons/Loader";
import { SuccessCircle } from "@/components/icons/SuccessCircle";
// import { usePimlicoSmartAccount } from "@/hooks/usePimlicoSmartAccount";
// import { useTonAddress } from "@tonconnect/ui-react";
// import { parseUnits } from "viem";

import { useOrder } from "@/hooks/useOrder";
import { TPrediction } from "@/types/prediction";

interface Props {
  defaultType: "yes" | "no";
  prediction: TPrediction;
  buttonTitle?: string;
  className?: string;
}

export const BuyPrediction: React.FC<
  Props & VariantProps<typeof buttonVariants>
> = ({
  defaultType,
  prediction,
  buttonTitle = "Buy",
  variant = "default",
  className,
}) => {
  const [amount, setAmount] = useState<number>(0);

  const [open, setOpen] = useState<boolean>(false);

  const [prices, setPrices] = useState<{ yes: number; no: number }>();
  const [clobTokens, setClobTokens] = useState<{ yes: string; no: string }>();

  // const { smartAccount } = usePimlicoSmartAccount();

  const { getOrder } = useOrder();

  // const tonAddress = useTonAddress();

  // const polygonAddress = smartAccount?.address || "";

  const {
    // sendTransaction,
    isLoading: isTxLoading,
    isSuccess: isTxSuccess,
    clearState,
  } = useDepositToPrediction();

  const onClickMinus = () => {
    setAmount((prev) => {
      if (prev === 0) {
        return 0;
      }

      return prev - 1;
    });
  };

  const onClickPlus = () => {
    setAmount((prev) => {
      return prev + 1;
    });
  };

  const buyNo = async () => {
    // @ts-ignore
    getOrder({ tokenId: clobTokens?.no, price: prices?.no, side: "BUY" });
  };

  const buyYes = async () => {
    // @ts-ignore
    getOrder({ tokenId: clobTokens?.yes, price: prices?.yes, side: "BUY" });
  };

  useEffect(() => {
    if (prediction) {
      const tokens = JSON.parse(prediction.clobTokenIds);
      const tokenPrices = JSON.parse(prediction.outcomePrices);

      setClobTokens({ yes: tokens?.[0], no: tokens?.[1] });

      setPrices({ yes: tokenPrices?.[0], no: tokenPrices?.[1] });
    }
  }, [prediction]);

  useEffect(() => {
    if (open) {
      clearState();
    }
  }, [open]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant={variant} className={cn("w-full mb-2", className)}>
          {buttonTitle}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        {!isTxLoading && !isTxSuccess && (
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
                  <p className="text-[#737373] text-[14px] font-normal">
                    To win
                  </p>
                  <p className="text-[#0A0A0A] text-[14px] font-medium">-</p>
                </div>
                <div className="flex justify-between mb-[4px]">
                  <p className="text-[#737373] text-[14px] font-normal">Fees</p>
                  <p className="text-[#0A0A0A] text-[14px] font-medium">-</p>
                </div>
                <Button className="w-full mt-[85px]" onClick={buyYes}>
                  Buy yes
                </Button>
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
                  <p className="text-[#737373] text-[14px] font-normal">
                    To win
                  </p>
                  <p className="text-[#0A0A0A] text-[14px] font-medium">-</p>
                </div>
                <div className="flex justify-between mb-[4px]">
                  <p className="text-[#737373] text-[14px] font-normal">Fees</p>
                  <p className="text-[#0A0A0A] text-[14px] font-medium">-</p>
                </div>

                <Button className="w-full mt-[85px]" onClick={buyNo}>
                  Buy no
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {(isTxLoading || isTxSuccess) && (
          <div className="bg-white rounded-t-[10px] pt-[16px] px-[15px] pb-[50px]">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: 64, height: 64 }}>
                {isTxSuccess ? <SuccessCircle /> : <Loader />}
              </div>
            </div>
            <h4 className="mb-[96px] mt-[16px] self-stretch text-center justify-start text-[#0a0a0a] text-lg font-semibold font-['Geist'] leading-none">
              {isTxSuccess ? "Buy is ready" : "Buy is in progress"}
            </h4>

            <div className="flex-col items-center gap-[8px]">
              <p
                className={cn(
                  "text-[#F5F5F5] text-center text-5xl font-bold leading-12 font-['Geist']",
                  !!amount && "text-[#0A0A0A]"
                )}
              >
                {`$${getFiatAmountCorrect(`${amount}`)}`}
              </p>
            </div>

            <p className="mt-[8px] self-stretch text-center justify-start text-sm font-normal font-['Geist'] leading-tight text-[#737373]">
              It can take up to 10 minutes to top up your funds. We will send
              you notification when its ready.
            </p>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};
