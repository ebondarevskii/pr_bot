import { Header } from "@/components/UI/Header";
import { BalanceCard } from "./components/BalanceCard";
import { PositionsCard } from "./components/PositionsCard/PositionsCard";

export const Portfolio = () => {
  return (
    <div className="pt-[25px] px-2.5 pb-16">
      <Header>Portfolio</Header>

      <BalanceCard />

      <PositionsCard />
    </div>
  );
};
