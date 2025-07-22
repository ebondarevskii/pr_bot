import { Choice } from "@/types/event";

interface Props {
  item: Choice;
}

export const ChoiceItem: React.FC<Props> = ({ item }) => {
  return (
    <div className="self-stretch inline-flex justify-between items-center">
      <div className="justify-start text-base-muted-foreground text-sm font-normal font-['Geist'] leading-tight">
        {item.title}
      </div>
      <div className="text-right justify-start text-base-foreground text-sm font-medium font-['Geist'] leading-tight">
        {item.price}
      </div>
    </div>
  );
};
