import { Onboarding } from "@/components/UI/Onboarding";
import { Header } from "@/components/UI/Header";
import { EventCard } from "@/components/UI/EventCard";
import { MultichoiceEventCard } from "@/components/UI/MultichoiceEventCard";
import { useAppStore } from "@/store/useAppStore";

export const Market = () => {
  const predictions = useAppStore((state) => state.predictions);

  return (
    <div className="pt-[25px] px-2.5 pb-16">
      <Header>Market</Header>

      <Onboarding />

      {predictions.map((item) => {
        if (item.isMultiChoice) {
          return (
            <MultichoiceEventCard
              name={item.title}
              volume={item.volume}
              imageUrl={item.logo}
              choices={item.choises!}
              id={item.id}
              key={item.id}
            />
          );
        }
        return (
          <EventCard
            name={item.title}
            volume={item.volume}
            imageUrl={item.logo}
            id={item.id}
            key={item.id}
          />
        );
      })}
    </div>
  );
};
