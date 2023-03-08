import { CONFIG } from "@common/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NFTsByCollection, Drip, Drips, Drop } from "@premier-labs/types";

import { io } from "socket.io-client";

export const socket = io(CONFIG.network.websocket_server_url);

export const dropApi = createApi({
  reducerPath: "dropApi",
  baseQuery: fetchBaseQuery({ baseUrl: CONFIG.network.server_url }),
  endpoints: (builder) => ({
    //
    getDrop: builder.query<Drop, { dropId: number }>({
      query: ({ dropId }) => `drop/${dropId}`,
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        try {
          await cacheDataLoaded;

          socket.on(`update_drop_${arg.dropId}`, (event: { data: Drop }) => {
            const data = event.data;
            updateCachedData((draft) => {
              return data;
            });
          });
        } catch {}
        await cacheEntryRemoved;
      },
    }),
    //
    getDrip: builder.query<Drip, { dropId: number; dripId: number }>({
      query: ({ dropId, dripId }) => `drip/${dropId}/${dripId}`,
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        try {
          await cacheDataLoaded;

          socket.on(`update_drop_${arg.dropId}_drip_${arg.dripId}`, (event: { data: Drip }) => {
            const data = event.data;
            updateCachedData((draft) => {
              return data;
            });
          });
        } catch {}
        await cacheEntryRemoved;
      },
    }),
    //
    getAssets: builder.query<NFTsByCollection, { address: string }>({
      query: ({ address }) => `assets/${address}`,
    }),
    //
    getDrips: builder.query<Drips, { address: string }>({
      query: ({ address }) => `drip/${address}`,
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        try {
          await cacheDataLoaded;

          socket.on(`update_drips_${arg.address}`, (event: { data: Drip }) => {
            const data = event.data;

            updateCachedData((draft) => {
              let hasBeenFound = false;
              for (let [index, drip] of draft.entries()) {
                if (drip.id === data.id && drip.drop.id === data.drop.id) {
                  hasBeenFound = true;
                  draft[index] = data;
                  break;
                }
              }
              if (!hasBeenFound) {
                draft.push(data);
              }
            });
          });
        } catch {}
        await cacheEntryRemoved;
      },
    }),
  }),
});

export const { useGetAssetsQuery, useGetDripQuery, useGetDripsQuery, useGetDropQuery } = dropApi;
