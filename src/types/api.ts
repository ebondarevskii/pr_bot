export type GetUserBalancesReturn = {
  ton: {
    native: string | null;
    usdt: string | null;
    nativeRaw: string | null;
    usdtRaw: string | null;
  };
  polygon: {
    native: string | null;
    usdt: string | null;
    nativeRaw: string | null;
    usdtRaw: string | null;
  };
};
