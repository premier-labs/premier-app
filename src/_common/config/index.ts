import { mainnet, sepolia, localhost } from "wagmi/chains";

enum ENV {
  DEVELOPMENT,
  STAGING,
  PRODUCTION,
}

const nodeEnv = (() => {
  const env = import.meta.env?.VITE__NODE_ENV;

  switch (env) {
    case "development":
      return ENV.DEVELOPMENT;
    case "staging":
      return ENV.STAGING;
    case "production":
      return ENV.PRODUCTION;
    default:
      throw new Error();
  }
})();

export const isDevelopment = (() => nodeEnv === ENV.DEVELOPMENT)();
export const isStaging = (() => nodeEnv === ENV.STAGING)();
export const isProduction = (() => nodeEnv === ENV.PRODUCTION)();

export const chainSupported = {
  [mainnet.id]: mainnet,
  [sepolia.id]: sepolia,
  [localhost.id]: localhost,
};

export const CONFIG = (() => {
  return {
    chain: (chainSupported as any)[import.meta.env?.VITE__CHAIN_ID! as string],
    server_url: import.meta.env?.VITE__SERVER_URL! as string,
  };
})();

console.log(CONFIG);
