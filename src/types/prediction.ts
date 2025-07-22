export type Prediction = {
  logo: string;
  title: string;
  chances: number;
  volume: string;
  participants: number;
  daysLeft: number;
  description: string;
  contract: string;
  resolver: string;
  choises?: { title: string; price: string }[];
  isMultiChoice?: boolean;
};
