import { Handler, HandlerContext, HandlerEvent } from "@netlify/functions";
import { headers } from "./utils/http";
import { OPENSEA, getAssetsOwnedByAddress_Mock } from "./utils/opensea";
import { CONFIG, isDevelopment } from "./utils/config";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const { address } = event.queryStringParameters as any;

  return {
    statusCode: 200,
    body: JSON.stringify(
      isDevelopment
        ? await getAssetsOwnedByAddress_Mock(address)
        : await OPENSEA.getAssetsOwnedByAddress(address)
    ),
    headers,
  };
};

export { handler };
