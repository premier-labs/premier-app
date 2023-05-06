import { ethers } from "ethers";
import { CONFIG } from "./config";

export const provider = new ethers.providers.JsonRpcProvider(CONFIG.web3_provider_url);
