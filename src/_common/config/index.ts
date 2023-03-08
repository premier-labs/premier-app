enum ENV {
  DEVELOPMENT,
  STAGING,
  PRODUCTION,
}

const nodeEnv = (() => {
  const env = import.meta.env.VITE__NODE_ENV;

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
  network: {
    server_url: import.meta.env.VITE__SERVER_URL!,
    websocket_server_url: import.meta.env.VITE__WEBSOCKET_SERVER_URL!,
  },
  blockExplorerUrl: import.meta.env.VITE__BLOCKEXPLORER!,
  openseaUrl: import.meta.env.VITE__OPENSEA_URL!,
};

export const isDevelopment = (() => CONFIG.env === ENV.DEVELOPMENT)();
export const isStaging = (() => CONFIG.env === ENV.STAGING)();
export const isProduction = (() => CONFIG.env === ENV.PRODUCTION)();
