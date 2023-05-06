import { Handler } from "@netlify/functions";
import { ChainIdToStoreContract } from "@premier-labs/contracts/dist/system";
import { Store__factory } from "@premier-labs/contracts/dist/typechain";
import { Drop, DropMetadata } from "@premier-labs/contracts/dist/types";
import axios from "axios";
import { BigNumber } from "ethers";
import { CONFIG } from "./utils/config";
import { headers } from "./utils/http";
import { normalizeIPFSUrl } from "./utils/ipfs";
import { provider } from "./utils/provider";

const Store = Store__factory.connect(ChainIdToStoreContract[CONFIG.chain.id], provider);

export const getDrop = async (dropId: BigNumber | number): Promise<Drop> => {
  const dropInfo = await Store.dropInfo(dropId);

  const metadataUrl = normalizeIPFSUrl(dropInfo.dropURI);

  console.log("Fetching data from IPFS");
  const metadata = (await axios.get(metadataUrl)).data as DropMetadata;
  console.log("Done fetching data from IPFS");

  for (const version of metadata.versions) {
    version.texture = normalizeIPFSUrl(version.texture);
  }

  metadata.model = normalizeIPFSUrl(metadata.model);

  return {
    address: dropInfo._contract,
    id: dropInfo.id.toNumber(),
    symbol: dropInfo.symbol,
    price: dropInfo.price.toString(),
    maxSupply: dropInfo.maxSupply.toNumber(),
    currentSupply: dropInfo.currentSupply.toNumber(),
    metadata: metadata,
  };
};

const handler: Handler = async (event, context) => {
  const { dropId } = event.queryStringParameters as any;

  return {
    statusCode: 200,
    body: JSON.stringify(await getDrop(dropId)),
    headers,
  };
};

export { handler };
