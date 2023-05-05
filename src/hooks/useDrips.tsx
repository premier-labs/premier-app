import { CONFIG } from "@common/config";
import { Drips, Drip } from "@premier-labs/contracts/dist/types";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import useSocketIo from "./useSocketIo";
import { useEffect } from "react";

export default function useDrips(address: string, options: { enabled: boolean }) {
  const { socket } = useSocketIo();
  const queryClient = useQueryClient();

  const queryKey = `drips_${address}`;

  const {
    isLoading: isDripsLoading,
    error: isDripsError,
    data: drips,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: () =>
      axios.get(CONFIG.network.server_url + `/drips/${address}`).then((res) => res.data),
    enabled: options.enabled,
  });

  useEffect(() => {
    socket.on(queryKey, (event: { data: Drip }) => {
      const data = event.data as Drip;
      queryClient.setQueriesData(queryKey, (oldData: Drips | undefined) => {
        if (!oldData) return [data];

        const newDrips = oldData;

        for (let index = 0; index < newDrips.length; index++) {
          if (newDrips[index].drop.id === data.drop.id && newDrips[index].id === data.id) {
            newDrips[index] = data;

            return newDrips;
          }
        }

        newDrips.push(data);
        return newDrips;
      });
    });
  }, []);

  return {
    isDripsLoading,
    isDripsError,
    drips: drips as Drips,
  };
}
