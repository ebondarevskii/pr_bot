import { Header } from "@/components/UI/Header";
import { BalanceCard } from "./components/BalanceCard";
import { PositionsCard } from "./components/PositionsCard/PositionsCard";
import { usePrivyAuth } from "@/hooks/usePrivyAuth";
import { Button } from "@/components/UI/Button";

export const Portfolio = () => {
  const { logout } = usePrivyAuth();

  return (
    <div className="pt-[25px] px-2.5 pb-16">
      <Header>Portfolio</Header>

      <Button onClick={logout}>logout</Button>

      <BalanceCard />

      <PositionsCard />
    </div>
  );
};
