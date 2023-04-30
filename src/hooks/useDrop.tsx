import { CONFIG } from "@common/config";
import { Drop } from "@premier-labs/contracts/dist/types";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import useSocketIo from "./useSocketIo";
import { useEffect } from "react";

export default function useDrop(dropId: number, options = { enabled: true }) {
  const { socket } = useSocketIo();
  const queryClient = useQueryClient();

  const queryKey = `drop_${dropId}`;

  const {
    isLoading: isDropLoading,
    error: isDropError,
    data: drop,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: () => axios.get(CONFIG.network.server_url + `/drop/${dropId}`).then((res) => res.data),
    enabled: options.enabled,
  });

  useEffect(() => {
    socket.on(queryKey, (event: { data: Drop }) => {
      const data = event.data;
      queryClient.setQueriesData(queryKey, (oldData: any) => data);
    });
  }, []);

  return {
    isDropLoading,
    isDropError,
    drop: drop as Drop,
  };
}
