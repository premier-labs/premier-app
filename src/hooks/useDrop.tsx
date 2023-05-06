import { CONFIG } from "@common/config";
import { Drop } from "@premier-labs/contracts/dist/types";
import axios from "axios";
import { useQuery } from "react-query";

export default function useDrop(dropId: number, options = { enabled: true }) {
  const queryKey = `drop_${dropId}`;

  const {
    isLoading: isDropLoading,
    error: isDropError,
    data: drop,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: () =>
      axios.get(CONFIG.server_provider_url + `/drop?dropId=${dropId}`).then((res) => res.data),
    enabled: options.enabled,
  });

  return {
    isDropLoading,
    isDropError,
    drop: drop as Drop,
  };
}
