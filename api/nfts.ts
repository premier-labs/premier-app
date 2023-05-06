import { Handler, HandlerContext, HandlerEvent } from "@netlify/functions";
import { headers } from "./utils/http";
import { OPENSEA } from "./utils/opensea";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const { address } = event.queryStringParameters as any;

  return {
    statusCode: 200,
    body: JSON.stringify(await OPENSEA.getAssetsOwnedByAddress(address)),
    headers,
  };
};

export { handler };
