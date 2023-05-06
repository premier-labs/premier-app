enum ENV {
  DEVELOPMENT,
  STAGING,
  PRODUCTION,
}

const nodeEnv = (() => {
  const env = import.meta.env?.VITE__NODE_ENV ?? process.env.VITE__NODE_ENV;

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
  server_provider_url:
    import.meta.env?.VITE__SERVER_PROVIDER_URL! ?? process.env.VITE__SERVER_PROVIDER_URL,
  web3_provider_url:
    import.meta.env?.VITE__WEB3_PROVIDER_URL! ?? process.env.VITE__WEB3_PROVIDER_URL,
  ipfs_provider_url:
    import.meta.env?.VITE__IPFS_PROVIDER_URL! ?? process.env.VITE__IPFS_PROVIDER_URL,
  //
  blockExplorerUrl: import.meta.env?.VITE__BLOCKEXPLORER! ?? process.env.VITE__BLOCKEXPLORER,
  openseaUrl: import.meta.env?.VITE__OPENSEA_URL! ?? process.env.VITE__OPENSEA_URL,
};

export const isDevelopment = (() => CONFIG.env === ENV.DEVELOPMENT)();
export const isStaging = (() => CONFIG.env === ENV.STAGING)();
export const isProduction = (() => CONFIG.env === ENV.PRODUCTION)();
