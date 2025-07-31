export interface BridgeTx {
  fee: Fee;
  route: Route[];
  inTradeType: string;
  outTradeType: string;
  fees: Fee2[];
  routes: Route2[];
  kind: string;
  priceImpact: string;
  tokenAmountOut: TokenAmountOut;
  tokenAmountOutMin: TokenAmountOutMin;
  amountInUsd: AmountInUsd;
  approveTo: string;
  type: string;
  rewards: any[];
  estimatedTime: number;
  tx: Tx;
}

export interface Fee {
  symbol: string;
  icon: string;
  address: string;
  amount: string;
  chainId: number;
  decimals: number;
}

export interface Route {
  symbol: string;
  name: string;
  icon: string;
  address: string;
  chainId: number;
  decimals: number;
}

export interface Fee2 {
  provider: string;
  value: Value;
  save: Save;
  description: string;
}

export interface Value {
  symbol: string;
  icon: string;
  address: string;
  amount: string;
  chainId: number;
  decimals: number;
  attributes?: Attributes;
}

export interface Attributes {
  ton: string;
}

export interface Save {
  symbol: string;
  icon: string;
  address: string;
  amount: string;
  chainId: number;
  decimals: number;
  attributes?: Attributes2;
}

export interface Attributes2 {
  ton: string;
}

export interface Route2 {
  provider: string;
  tokens: Token[];
}

export interface Token {
  symbol: string;
  name?: string;
  icon?: string;
  address: string;
  chainId: number;
  decimals: number;
}

export interface TokenAmountOut {
  symbol: string;
  address: string;
  amount: string;
  chainId: number;
  decimals: number;
}

export interface TokenAmountOutMin {
  symbol: string;
  address: string;
  amount: string;
  chainId: number;
  decimals: number;
}

export interface AmountInUsd {
  symbol: string;
  address: string;
  amount: string;
  chainId: number;
  decimals: number;
  attributes: Attributes3;
}

export interface Attributes3 {
  ton: string;
}

export interface Tx {
  validUntil: number;
  messages: Message[];
}

export interface Message {
  address: string;
  amount: string;
  payload: string;
}
