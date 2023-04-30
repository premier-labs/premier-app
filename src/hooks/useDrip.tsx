import { CONFIG } from "@common/config";
import { Drip } from "@premier-labs/contracts/dist/types";
import axios from "axios";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import useSocketIo from "./useSocketIo";

export default function useDrip(dropId: number, dripId: number, options = { enabled: true }) {
  const { socket } = useSocketIo();
  const queryClient = useQueryClient();

  const queryKey = `drop_${dropId}_drip_${dripId}`;

  const {
    isLoading: isDripLoading,
    error: isDripError,
    data: drip,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: () =>
      axios.get(CONFIG.network.server_url + `/drip/${dropId}/${dripId}`).then((res) => res.data),
    enabled: options.enabled,
  });

  useEffect(() => {
    socket.on(queryKey, (event: { data: Drip }) => {
      const data = event.data;
      queryClient.setQueriesData(queryKey, (oldData: Drip | undefined) => data);
    });
  }, []);

  return {
    isDripLoading,
    isDripError,
    drip: drip as Drip,
  };
}
