import { Link as LinkIcon } from "@/components/icons/Link";
import { BuyPrediction } from "@/components/UI/BuyPrediction";
import { shortAddress } from "@/lib/address";
import { useAppStore } from "@/store/useAppStore";
import { useParams } from "react-router-dom";

export const Prediction = () => {
  const { predictionId } = useParams();

  const prediction = useAppStore((state) =>
    state.predictions.find((item) => item.id === predictionId)
  );

  return (
    <div className="relative pt-[45px] w-full h-full px-2">
      <img
        className="w-[36px] h-[36px] rounded-[8px] mb-3"
        src={prediction?.logo}
      />
      <h4 className="text-black text-xl font-semibold font-['Geist'] leading-7 mb-3">
        {prediction?.title}
      </h4>

      <div className="mb-[26px] flex justify-between px-4 py-3 border border-[#E5E5E5] rounded-[10px] bg-[linear-gradient(180deg, rgba(23, 23, 23, 0.00) 0%,  rgba(23, 23, 23, 0.05) 100%), #FFF]">
        <div className="flex-col gap-4">
          <p className="text-xs font-normal font-['Geist'] leading-none text-[#737373]">
            Chances
          </p>
          <p className="text-lg font-semibold font-['Geist'] leading-7 text-[#22c55e]">
            {`${prediction?.chances}%`}
          </p>
        </div>

        <div className="flex gap-4">
          <div className="h-full w-px bg-[#e5e5e5]" />

          <div className="flex-col gap-1">
            <p className="text-xs font-normal font-['Geist'] leading-none text-[#737373]">
              Volume
            </p>
            <p className="text-lg font-semibold font-['Geist'] leading-7 text-[#737373]">
              {`$${prediction?.volume}`}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="h-full w-px bg-[#e5e5e5]" />

          <div className="flex-col gap-1">
            <p className="text-xs font-normal font-['Geist'] leading-none text-[#737373]">
              Participants
            </p>
            <p className="text-lg font-semibold font-['Geist'] leading-7 text-[#737373]">
              {`${prediction?.participants}`}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="h-full w-px bg-[#e5e5e5]" />

          <div className="flex-col gap-1">
            <p className="text-xs font-normal font-['Geist'] leading-none text-[#737373]">
              Days left
            </p>
            <p className="text-lg font-semibold font-['Geist'] leading-7 text-[#737373]">
              {`${prediction?.daysLeft}`}
            </p>
          </div>
        </div>
      </div>

      <p className="text-base font-semibold font-['Geist'] leading-none mb-3">
        About
      </p>

      <p className="text-base font-normal font-['Geist'] leading-normal text-[#737373] mb-[18px]">
        {prediction?.description}
      </p>

      {prediction?.contract && (
        <div className="flex w-full items-start rounded-[10px] border border-[#E5E5E5] px-4 py-3 mb-2.5 gap-3">
          <LinkIcon />
          <div className="flex-col justify-between">
            <p className="text-sm font-medium font-['Geist'] leading-tight text-[#0a0a0a]">
              Contract
            </p>
            <p className="text-sm font-normal font-['Geist'] leading-tight text-[#737373]">
              {shortAddress(prediction?.contract)}
            </p>
          </div>
        </div>
      )}

      {prediction?.resolver && (
        <div className="flex w-full items-start rounded-[10px] border border-[#E5E5E5] px-4 py-3 gap-3">
          <LinkIcon />
          <div className="flex-col justify-between">
            <p className="text-sm font-medium font-['Geist'] leading-tight text-[#0a0a0a]">
              Resolver
            </p>
            <p className="text-sm font-normal font-['Geist'] leading-tight text-[#737373]">
              {shortAddress(prediction?.resolver)}
            </p>
          </div>
        </div>
      )}

      <div className="fixed bottom-[64px] w-[calc(100dvw-16px)] px-2 py-2.5 flex justify-between gap-2.5">
        <BuyPrediction
          buttonTitle="Buy Yes 42¢"
          defaultType="yes"
          variant="green"
          className="flex-1"
        />

        <BuyPrediction
          buttonTitle="Buy No 36¢"
          defaultType="no"
          variant="red"
          className="flex-1"
        />
      </div>
    </div>
  );
};
