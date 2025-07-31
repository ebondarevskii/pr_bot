import { useNavigate } from "react-router-dom";
import { Button } from "../CustomButton";
import { getFiatAmountCorrect } from "@/lib/number";

interface Props {
  name: string;
  volume: string;
  imageUrl: string;
  id: string;
}

export const EventCard: React.FC<Props> = ({ name, volume, imageUrl, id }) => {
  const navigate = useNavigate();

  const goToPrediction = () => {
    navigate(`/prediction/${id}`);
  };

  return (
    <div
      data-card-content="true"
      data-card-footer="true"
      data-card-header="true"
      data-variants="Variant2"
      className="w-full mb-1.5 self-stretch h-40 py-6 bg-base-card rounded-2xl border border-[#E5E5E5] inline-flex flex-col justify-start items-start gap-6 overflow-hidden"
      onClick={goToPrediction}
    >
      <div className="self-stretch px-6 inline-flex justify-start items-start gap-2">
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-1.5">
          <div className="self-stretch justify-start text-base-card-foreground text-base font-semibold font-['Geist'] leading-none">
            {name}
          </div>
          <div className="self-stretch justify-start text-base-muted-foreground text-sm font-normal font-['Geist'] leading-tight">
            {`$${getFiatAmountCorrect(volume)} vol`}
          </div>
        </div>
        <img className="w-11 h-11 rounded-lg" src={imageUrl} />
      </div>
      <div className="self-stretch px-6 inline-flex justify-start items-start gap-2">
        <Button variant="primary">
          <div className="justify-center text-tailwind-colors-green-500 text-sm font-medium font-['Geist'] leading-tight">
            Buy Yes 42¢
          </div>
        </Button>
        <Button variant="danger">
          <div className="justify-center text-tailwind-colors-red-600 text-sm font-medium font-['Geist'] leading-tight">
            Buy No 36¢
          </div>
        </Button>
      </div>
    </div>
  );
};
