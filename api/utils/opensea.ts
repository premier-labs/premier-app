import { NFT, NFTs, NFTsByCollection } from "@premier-labs/contracts/dist/types";
import axios from "axios";

import axiosRetry from "axios-retry";
import { CONFIG } from "./config";
import { ListMockTokens } from "@premier-labs/contracts/dist/mock";
import { provider } from "./provider";
import { ERC721Enumerable__factory } from "@premier-labs/contracts/dist/typechain";

axios.defaults.headers.common["X-API-KEY"] = CONFIG.opensea_api_key;

axiosRetry(axios, { retries: 10 });
axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay });

const cacheNft: { [hash: string]: NFT } = {};

const endpoint = "https://api.opensea.io/api/v1";

const setInCache = (contractAddress: string, tokenId: number, nft: NFT) => {
  const key = (contractAddress + tokenId).toLowerCase();
  const cachedValue = cacheNft[key];

  if (cachedValue) {
    console.log("CACHE: Replacing cached value: [", key, "]");
  } else {
    console.log("CACHE: Setting cached value: [", key, "]");
  }
  cacheNft[contractAddress + tokenId] = nft;
};

const getInCache = (contractAddress: string, tokenId: number) => {
  const key = (contractAddress + tokenId).toLowerCase();
  const cachedValue = cacheNft[key];

  if (cachedValue) {
    console.log("CACHE: Successfully loaded cached for: [", key, "]");
  } else {
    console.log("CACHE: No cache found for key: [", key, "]");
  }

  return cachedValue;
};

export const getAssetsOwnedByAddress_Mock = async (address: string) => {
  const NFTs: NFTs = [];
  const dataToReturn: NFTsByCollection = [];

  for (const listName in ListMockTokens) {
    const list = ListMockTokens[listName];

    const contract = ERC721Enumerable__factory.connect(list.contract, provider);
    const nbAssets = (await contract.balanceOf(address)).toNumber();

    for (let nb = 0; nb < nbAssets; nb++) {
      const tokenId = (await contract.tokenOfOwnerByIndex(address, nb)).toNumber();

      NFTs.push({
        address: list.contract,
        img: list.tokens[tokenId],
        id: tokenId,
        name: await contract.name(),
        symbol: await contract.symbol(),
      });
    }
  }

  if (!NFTs.length) return [];

  dataToReturn.push({
    collectionName: NFTs[0].name,
    collectionSymbol: NFTs[0].symbol,
    assets: NFTs,
  });

  return dataToReturn;
};

export const getAsset = async (contractAddress: string, tokenId: number) => {
  const cachedValue = getInCache(contractAddress, tokenId);
  if (cachedValue) return cachedValue;

  console.log(
    "Log: OPENSEA: getAsset contractAddress: [",
    contractAddress,
    "], tokenId: [",
    tokenId,
    "]"
  );

  const asset = (await axios.get(`${endpoint}/asset/${contractAddress}/${tokenId}`)).data;

  const nft: NFT = {
    address: asset.asset_contract.address,
    img: asset.image_url,
    id: asset.token_id,
    name: asset.asset_contract.name,
    symbol: asset.asset_contract.symbol,
  };

  setInCache(contractAddress, tokenId, nft);

  console.log("getAsset -> Done");
  return nft;
};

const getAssetsOwnedByAddress = async (address: string) => {
  console.log("Log: OPENSEA: getAssetsOwnedByAddress address: [", address, "]");
  const dataToReturn: NFTsByCollection = [];
  const preData: { [contractAddress: string]: NFTs } = {};

  let isRequestDone = false;
  const limit = 100;
  let offset = 0;

  while (!isRequestDone) {
    const resq = await axios.get(
      `${endpoint}/assets?owner=${address}&offset=${offset}&limit=${limit}`
    );

    for (let asset of resq.data.assets) {
      const contractAddress = asset.asset_contract.address;
      if (!preData[contractAddress]) preData[contractAddress] = [];

      const tokenId = asset.token_id;
      const nft = {
        address: contractAddress,
        img: asset.image_url,
        id: tokenId,
        name: asset.asset_contract.name,
        symbol: asset.asset_contract.symbol,
      };

      setInCache(contractAddress, tokenId, nft);

      preData[contractAddress].push(nft);
    }

    if (resq.data.assets.length !== limit) {
      isRequestDone = true;
    } else {
      offset += limit;
    }
  }

  for (const data in preData) {
    dataToReturn.push({
      collectionName: preData[data][0].name,
      collectionSymbol: preData[data][0].symbol,
      assets: preData[data],
    });
  }

  console.log("getAssetsOwnedByAddress -> Done");
  return dataToReturn;
};

const OPENSEA = {
  getAsset,
  getAssetsOwnedByAddress,
};

export { OPENSEA };
