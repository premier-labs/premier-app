import { Handler, HandlerContext, HandlerEvent } from "@netlify/functions";
import { ChainIdToStoreContract } from "@premier-labs/contracts/dist/system";
import { Drop__factory, Store__factory } from "@premier-labs/contracts/dist/typechain";
import { Drips } from "@premier-labs/contracts/dist/types";
import { getDrip } from "./drip";
import { CONFIG } from "./utils/config";
import { headers } from "./utils/http";
import { provider } from "./utils/provider";

const Store = Store__factory.connect(ChainIdToStoreContract[CONFIG.chain.id], provider);

const getDripsOwnedByAddress = async (address: string) => {
  const dropSupply = (await Store.dropSupply()).toNumber();

  const dripsByAddress: Drips = [];
  for (let dropId = 0; dropId < dropSupply; dropId++) {
    const dropContractAddress = await Store.drop(dropId);
    const dropContract = Drop__factory.connect(dropContractAddress, provider);

    const balanceDripOfAddress = (await dropContract.balanceOf(address)).toNumber();
    for (let dripIndex = 0; dripIndex < balanceDripOfAddress; dripIndex++) {
      const tokenId = (await dropContract.tokenOfOwnerByIndex(address, dripIndex)).toNumber();
      dripsByAddress.push((await getDrip(dropId, tokenId)) as any);
    }
  }

  return dripsByAddress;
};
const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const { address } = event.queryStringParameters as any;

  return {
    statusCode: 200,
    body: JSON.stringify(await getDripsOwnedByAddress(address)),
    headers,
  };
};

export { handler };
