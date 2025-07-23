import { create } from "zustand";

interface AppState {
  tonAddress: string;
  polygonAddress: string;
  setAddresses: (ton: string, polygon: string) => void;
}

export const useAppStore = create<AppState>()((set) => ({
  tonAddress: "",
  polygonAddress: "",
  setAddresses: (ton: string, polygon: string) =>
    set({ tonAddress: ton, polygonAddress: polygon }),
}));
