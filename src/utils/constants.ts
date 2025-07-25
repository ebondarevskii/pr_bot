export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || "Privy Mini App",
  version: import.meta.env.VITE_APP_VERSION || "1.0.0",
} as const;

export const TELEGRAM_CONFIG = {
  botToken: import.meta.env.VITE_TELEGRAM_BOT_TOKEN,
  botUsername: import.meta.env.VITE_TELEGRAM_BOT_USERNAME,
} as const;

export const API_ENDPOINTS = {
  auth: {
    login: "/auth/telegram/login",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
  },
  user: {
    profile: "/user/profile",
    update: "/user/update",
  },
} as const;

export const PRIVY_APP_ID = import.meta.env.VITE_PRIVY_APP_ID;

export const SUPPORTED_CHAINS = {
  POLYGON: 137,
} as const;

export const DEFAULT_CHAIN = SUPPORTED_CHAINS.POLYGON;

export const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;

console.log("TELEGRAM_BOT_TOKEN: ", TELEGRAM_BOT_TOKEN);

// USDC contract address on Polygon
export const USDC_CONTRACT_ADDRESS =
  "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359";

// ERC-20 transfer function signature
export const ERC20_TRANSFER_SIGNATURE = "0xa9059cbb";

// Pimlico configuration
export const PIMLICO_CONFIG = {
  BUNDLER_URL:
    import.meta.env.VITE_PIMLICO_BUNDLER_URL ||
    "https://api.pimlico.io/v2/137/bundler",
  PAYMASTER_URL:
    import.meta.env.VITE_PIMLICO_BUNDLER_URL ||
    "https://api.pimlico.io/v2/137/rpc",
  API_KEY: import.meta.env.VITE_PIMLICO_API_KEY || "",
} as const;
