import { create } from "zustand";

interface BalanceState {
  isLoading: boolean;
  polygonBalance: string;
  polygonNativeBalance: string;
  tonBalance: string;
  tonNativeBalance: string;
  setIsLoading: (bool: boolean) => void;
  setPolygonBalance: (balance: string, native: string) => void;
  setTonBalance: (balance: string, native: string) => void;
}

export const useBalanceStore = create<BalanceState>()((set) => ({
  isLoading: false,
  polygonBalance: "0",
  polygonNativeBalance: "0",
  tonBalance: "0",
  tonNativeBalance: "0",
  setPolygonBalance: (balance: string, native: string) =>
    set({ polygonBalance: balance, polygonNativeBalance: native }),
  setTonBalance: (balance: string, native: string) =>
    set({ tonBalance: balance, tonNativeBalance: native }),
  setIsLoading: (bool: boolean) => set({ isLoading: bool }),
}));
