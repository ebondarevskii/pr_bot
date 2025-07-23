import { Prediction } from "@/types/prediction";
import { create } from "zustand";

interface AppState {
  isLoading: boolean;
  predictions: Prediction[];
  userPredictions: Prediction[];
  setPredictions: (data: Prediction[]) => void;
}

const predictionsMock: Prediction[] = [
  {
    id: "1",
    title: "New York City Mayoral election or it will be not so good?",
    volume: "14M",
    logo: "https://picsum.photos/200/300",
    chances: 28,
    participants: 300,
    description:
      "Predictions is like a betting on the outcome of the event. Each outcome odds shift in real time as other traders bet.",
    contract: "0x30713a9895E150D73fB7676D054814d30266F8F1",
    resolver: "0x30713a9895E150D73fB7676D054814d30266F8F1",
    daysLeft: 13,
  },
  {
    id: "2",
    title: "New York City Mayoral election or it will be not so good?",
    volume: "14M",
    logo: "https://picsum.photos/200/300",
    chances: 28,
    participants: 300,
    description:
      "Predictions is like a betting on the outcome of the event. Each outcome odds shift in real time as other traders bet.",
    contract: "0x30713a9895E150D73fB7676D054814d30266F8F1",
    resolver: "0x30713a9895E150D73fB7676D054814d30266F8F1",
    daysLeft: 13,
    isMultiChoice: true,
    choises: [
      { title: "Zohran Mamdani", price: "71¢" },
      { title: "Zohran Mamdani", price: "71¢" },
      { title: "Zohran Mamdani", price: "71¢" },
      { title: "Zohran Mamdani", price: "71¢" },
    ],
  },
];

export const useAppStore = create<AppState>()((set) => ({
  isLoading: true,
  predictions: predictionsMock,
  userPredictions: [],
  setPredictions: (data: Prediction[]) => set({ predictions: data }),
}));
