import { CONFIG } from "@common/config";
import { Drips } from "@premier-labs/contracts/dist/types";
import axios from "axios";
import { useQuery } from "react-query";

export default function useDrips(address: string, options: { enabled: boolean }) {
  const queryKey = `drips_${address}`;

  const {
    isLoading: isDripsLoading,
    error: isDripsError,
    data: drips,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: () =>
      axios.get(CONFIG.server_provider_url + `/drips?address=${address}`).then((res) => res.data),
    enabled: options.enabled,
  });

  return {
    isDripsLoading,
    isDripsError,
    drips: drips as Drips,
  };
}
