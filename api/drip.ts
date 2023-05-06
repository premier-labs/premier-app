import { Handler, HandlerContext, HandlerEvent } from "@netlify/functions";
import { ChainIdToStoreContract } from "@premier-labs/contracts/dist/system";
import { Store__factory } from "@premier-labs/contracts/dist/typechain";
import { Drip, DripStatus } from "@premier-labs/contracts/dist/types";
import { ethers } from "ethers";

import { DripInfoStructOutput } from "@premier-labs/contracts/dist/typechain/contracts/system/Drop";
import { getAsset } from "./utils/opensea";
import { provider } from "./utils/provider";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
};

const Store = Store__factory.connect(ChainIdToStoreContract[1337], provider);

export const getDrip = async (dropId: number, dripId: number): Promise<Drip | undefined> => {
  let dripInfo: DripInfoStructOutput;
  try {
    dripInfo = await Store.dripInfo(dropId, dripId);
  } catch {
    return undefined;
  }
  const drop = undefined;

  const nft = (async () => {
    if (dripInfo.drip.status === DripStatus.MUTATED) {
      return await getAsset(
        dripInfo.drip.mutation.tokenContract,
        dripInfo.drip.mutation.tokenId.toNumber()
      );
    }
    return undefined;
  })();

  return {
    drop: drop as any,
    id: dripId,
    version: dripInfo.drip.version,
    img: "", // TODO
    status: dripInfo.drip.status,
    owner: dripInfo.owner,
    nft: await nft,
  };
};

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const { dropId } = event.queryStringParameters as any;
  const { dripId } = event.queryStringParameters as any;

  return {
    statusCode: 200,
    body: JSON.stringify(await getDrip(dropId, dripId)),
    headers,
  };
};

export { handler };
