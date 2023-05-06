import { CONFIG } from "./config";

const IPFS_GATEWAY = CONFIG.ipfs_provider_url + "/ipfs/";
const IPFS_EXP = "ipfs://";

export const normalizeIPFSUrl = (address: string) => {
  address = address.replace(IPFS_EXP, IPFS_GATEWAY);
  return address;
};
