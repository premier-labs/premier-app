import { localhost, mainnet, sepolia } from "wagmi/chains";

const supportedChains = {
  [mainnet.id]: mainnet,
  [sepolia.id]: sepolia,
  [localhost.id]: localhost,
};
interface EnvOptions {
  SERVER_CHAIN_ID: string;
  SERVER_WEB3_PROVIDER_URL: string;
  SERVER_IPFS_PROVIDER_URL: string;
  SERVER_OPENSEA_KEY: string;
}

const {
  SERVER_CHAIN_ID,
  SERVER_WEB3_PROVIDER_URL,
  SERVER_IPFS_PROVIDER_URL,
  SERVER_OPENSEA_KEY,
}: EnvOptions = process.env as any as EnvOptions;

export const CONFIG = (() => {
  const chainId = Number(SERVER_CHAIN_ID);

  if (isNaN(chainId)) throw "ChainId shouldn't be NaN";

  if (chainId !== mainnet.id && chainId !== sepolia.id && chainId !== localhost.id)
    throw `ChainId ${chainId} is not supported`;

  return {
    chain: supportedChains[chainId],
    web3_provider_url: SERVER_WEB3_PROVIDER_URL,
    ipfs_provider_url: SERVER_IPFS_PROVIDER_URL,
    opensea_api_key: SERVER_OPENSEA_KEY,
  };
})();

export const isDevelopment = (() => CONFIG.chain.id === localhost.id)();
export const isStaging = (() => CONFIG.chain.id === sepolia.id)();
export const isProduction = (() => CONFIG.chain.id === mainnet.id)();
