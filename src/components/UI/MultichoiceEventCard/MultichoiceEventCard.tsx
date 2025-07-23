import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Choice } from "@/types/event";
import { ChoiceItem } from "./ChoiceItem";
import { Button } from "../CustomButton";

interface Props {
  name: string;
  volume: string;
  imageUrl: string;
  choices: Choice[];
  id: string;
}

export const MultichoiceEventCard: React.FC<Props> = ({
  name,
  volume,
  imageUrl,
  choices,
  id,
}) => {
  const navigate = useNavigate();

  const [isViewAll, setIsViewAll] = useState(false);

  const onClickViewAll = () => {
    setIsViewAll((prev) => !prev);
  };

  const goToPrediction = () => {
    navigate(`/prediction/${id}`);
  };

  const isMoreThan3Choices = choices.length > 3;

  const formattedChoices = useMemo(() => {
    if (isMoreThan3Choices && isViewAll) {
      return choices;
    }
    if (isMoreThan3Choices) {
      return choices.slice(0, 3);
    }

    return choices;
  }, [isViewAll, choices]);

  return (
    <div
      data-card-content="true"
      data-card-footer="true"
      data-card-header="true"
      data-variants="Default"
      className="w-full mb-1.5 self-stretch py-6 px-6 bg-base-card rounded-2xl border border-[#E5E5E5] inline-flex flex-col justify-start items-start gap-6 overflow-hidden"
      onClick={goToPrediction}
    >
      <div className="self-stretch inline-flex justify-start items-start gap-2">
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-1.5">
          <div className="self-stretch justify-start text-base-card-foreground text-base font-semibold font-['Geist'] leading-none">
            {name}
          </div>
          <div className="inline-flex justify-center items-center gap-1">
            <div className="justify-start text-base-muted-foreground text-sm font-normal font-['Geist'] leading-tight">
              {`$${volume} vol`}
            </div>
            <div className="justify-start"></div>
          </div>
        </div>
        <img className="w-11 h-11 rounded-lg" src={imageUrl} />
      </div>
      <div className="self-stretch  flex flex-col justify-start items-start gap-2">
        <div className="self-stretch flex flex-col justify-start items-start gap-1">
          {formattedChoices.map((item) => (
            <ChoiceItem item={item} />
          ))}
        </div>
      </div>
      {isMoreThan3Choices && (
        <Button
          variant="secondary"
          onClick={onClickViewAll}
          className="w-full"
        >{`View All (${choices.length})`}</Button>
      )}
    </div>
  );
};
