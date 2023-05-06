enum ENV {
  DEVELOPMENT,
  STAGING,
  PRODUCTION,
}

const nodeEnv = (() => {
  const env = process.env.VITE__NODE_ENV;

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

export const CONFIG = {
  env: nodeEnv,
  //
  web3_provider_url: process.env.SERVER_WEB3_PROVIDER_URL,
  ipfs_provider_url: process.env.SERVER_IPFS_PROVIDER_URL,
  opensea_api_key: process.env.SERVER_OPENSEA_KEY,
};

export const isDevelopment = (() => CONFIG.env === ENV.DEVELOPMENT)();
export const isStaging = (() => CONFIG.env === ENV.STAGING)();
export const isProduction = (() => CONFIG.env === ENV.PRODUCTION)();
