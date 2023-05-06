import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { OPENSEA } from "./utils/opensea";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
};

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const { address } = event.queryStringParameters as any;

  return {
    statusCode: 200,
    body: JSON.stringify(await OPENSEA.getAssetsOwnedByAddress(address)),
    headers,
  };
};

export { handler };
