import { CONFIG } from "@common/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NFTsByCollection, Drip, Drips, Drop } from "@premier-types";

export const dropApi = createApi({
  reducerPath: "dropApi",
  baseQuery: fetchBaseQuery({ baseUrl: CONFIG.network.server_url }),
  endpoints: (builder) => ({
    //
    getAssets: builder.query<NFTsByCollection, { address: string }>({
      query: ({ address }) => `assets/${address}`,
    }),
  }),
});

export const { useGetAssetsQuery } = dropApi;
