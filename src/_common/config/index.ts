import { mainnet, sepolia, localhost } from "wagmi/chains";

const supportedChains = {
  [mainnet.id]: mainnet,
  [sepolia.id]: sepolia,
  [localhost.id]: localhost,
};

interface EnvOptions {
  VITE__CHAIN_ID: string;
  VITE__SERVER_URL: string;
}

const { VITE__CHAIN_ID, VITE__SERVER_URL }: EnvOptions = import.meta.env as any as EnvOptions;

export const CONFIG = (() => {
  const chainId = Number(VITE__CHAIN_ID);

  if (isNaN(chainId)) throw "ChainId shouldn't be NaN";

  if (chainId !== mainnet.id && chainId !== sepolia.id && chainId !== localhost.id)
    throw `ChainId ${chainId} is not supported`;

  return {
    chain: supportedChains[chainId],
    server_url: VITE__SERVER_URL,
  };
})();

export const isDevelopment = (() => CONFIG.chain.id === localhost.id)();
export const isStaging = (() => CONFIG.chain.id === sepolia.id)();
export const isProduction = (() => CONFIG.chain.id === mainnet.id)();

export const blockExplorerUrl = isProduction
  ? mainnet.blockExplorers.default.url
  : isStaging
  ? sepolia.blockExplorers.default.url
  : "";

export const openseaUrl = isProduction
  ? "https://opensea.io/assets/ethereum"
  : isStaging
  ? "https://opensea.io/assets/ethereum" // waiting for sepolia opensea
  : "";
