import { create } from "zustand";

interface BalanceState {
  isLoading: boolean;
  balance: number;
  tonBalance: number;
  setBalance: (balance: number) => void;
  setIsLoading: (bool: boolean) => void;
}

export const useBalanceStore = create<BalanceState>()((set) => ({
  isLoading: false,
  balance: 1000,
  tonBalance: 100,
  setBalance: (balance: number) => set({ balance }),
  setIsLoading: (bool: boolean) => set({ isLoading: bool }),
}));
