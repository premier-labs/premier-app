import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { withPlanetscale } from "@netlify/planetscale";
import { ChainIdToStoreContract } from "@premier-labs/contracts/dist/system";
import { Store__factory } from "@premier-labs/contracts/dist/typechain";
import { Drop, DropMetadata } from "@premier-labs/contracts/dist/types";
import { BigNumber, ethers } from "ethers";

import axios from "axios";
import { normalizeIPFSUrl } from "./utils/ipfs";
import { provider } from "./utils/provider";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
};

const Store = Store__factory.connect(ChainIdToStoreContract[1337], provider);

const snapshotDrop = async (dropId: BigNumber | number): Promise<Drop> => {
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
    body: JSON.stringify(await snapshotDrop(dropId)),
    headers,
  };
};

export { handler };
