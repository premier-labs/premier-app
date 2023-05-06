import { CONFIG } from "@common/config";
import { Drip } from "@premier-labs/contracts/dist/types";
import axios from "axios";
import { useQuery } from "react-query";

export default function useDrip(dropId: number, dripId: number, options = { enabled: true }) {
  const queryKey = `drop_${dropId}_drip_${dripId}`;

  const {
    isLoading: isDripLoading,
    error: isDripError,
    data: drip,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: () =>
      axios
        .get(CONFIG.server_provider_url + `/drip?dropId=${dropId}&dripId=${dripId}`)
        .then((res) => res.data),
    enabled: options.enabled,
  });

  return {
    isDripLoading,
    isDripError,
    drip: drip as Drip,
  };
}
