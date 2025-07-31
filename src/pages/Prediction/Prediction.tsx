import { useParams } from "react-router-dom";

import { Link as LinkIcon } from "@/components/icons/Link";
import { BuyPrediction } from "@/components/drawers/BuyPrediction";
import { shortAddress } from "@/lib/address";
import { usePredictionStore } from "@/store/usePredictionStore";
import { getFiatAmountCorrect } from "@/lib/number";

export const Prediction = () => {
  const { predictionId } = useParams();

  const prediction = usePredictionStore((state) =>
    state.predictions.find((item) => item.id === predictionId)
  );

  return (
    <div className="overflow-scroll relative pt-[45px] w-full h-full px-2 mb-30">
      <img
        className="w-[36px] h-[36px] rounded-[8px] mb-3"
        src={prediction?.image}
      />
      <h4 className="text-black text-xl font-semibold font-['Geist'] leading-7 mb-3">
        {prediction?.question}
      </h4>

      <div className="mb-[26px] flex justify-between px-4 py-3 border border-[#E5E5E5] rounded-[10px] bg-[linear-gradient(180deg, rgba(23, 23, 23, 0.00) 0%,  rgba(23, 23, 23, 0.05) 100%), #FFF]">
        <div className="flex-col gap-4">
          <p className="text-xs font-normal font-['Geist'] leading-none text-[#737373]">
            Chances
          </p>
          <p className="text-lg font-semibold font-['Geist'] leading-7 text-[#22c55e]">
            {`${12}%`}
          </p>
        </div>

        <div className="flex gap-4">
          <div className="h-full w-px bg-[#e5e5e5]" />

          <div className="flex-col gap-1">
            <p className="text-xs font-normal font-['Geist'] leading-none text-[#737373]">
              Volume
            </p>
            <p className="text-lg font-semibold font-['Geist'] leading-7 text-[#737373]">
              {`$${getFiatAmountCorrect(`${prediction?.volumeNum || 0}`)}`}
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
              {`${1216}`}
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
              {`${14}`}
            </p>
          </div>
        </div>
      </div>

      <img
        src="/assets/Chart.png"
        style={{ width: "100%", height: 188, marginBottom: 45, marginTop: 25 }}
      />

      <p className="text-base font-semibold font-['Geist'] leading-none mb-3">
        About
      </p>

      <p className="text-base font-normal font-['Geist'] leading-normal text-[#737373] mb-[18px]">
        {prediction?.description}
      </p>

      {prediction?.marketMakerAddress && (
        <div className="flex w-full items-start rounded-[10px] border border-[#E5E5E5] px-4 py-3 mb-2.5 gap-3">
          <LinkIcon />
          <div className="flex-col justify-between">
            <p className="text-sm font-medium font-['Geist'] leading-tight text-[#0a0a0a]">
              Contract
            </p>
            <p className="text-sm font-normal font-['Geist'] leading-tight text-[#737373]">
              {shortAddress(prediction?.marketMakerAddress)}
            </p>
          </div>
        </div>
      )}

      {prediction?.marketMakerAddress && (
        <div className="flex w-full items-start rounded-[10px] border border-[#E5E5E5] px-4 py-3 gap-3">
          <LinkIcon />
          <div className="flex-col justify-between">
            <p className="text-sm font-medium font-['Geist'] leading-tight text-[#0a0a0a]">
              Resolver
            </p>
            <p className="text-sm font-normal font-['Geist'] leading-tight text-[#737373]">
              {shortAddress(prediction?.marketMakerAddress)}
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
