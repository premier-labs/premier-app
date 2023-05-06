import { Store__factory } from "@premier-labs/contracts/dist/typechain";
import { prepareWriteContract, waitForTransaction, writeContract } from "@wagmi/core";
import { BigNumber } from "ethers";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { Address } from "wagmi";
import { useStore } from "./useStore";

export function useMutate() {
  const queryClient = useQueryClient();

  const [isMutateLoading, setLoading] = useState(false);
  const [isMutateError, setError] = useState(false);
  const [isMutateDone, setDone] = useState(false);
  const [mutateData, setData] = useState<{ hash?: string }>();

  const { storeContract } = useStore();

  const mutateReset = () => {
    setLoading(false);
    setError(false);
    setDone(false);
    setData({});
  };

  const mutate = async (dropId: number, dripId: number, tokenContract: string, tokenId: number) => {
    const config = await prepareWriteContract({
      address: storeContract,
      abi: Store__factory.abi,
      functionName: "mutate",
      args: [
        BigNumber.from(dropId),
        BigNumber.from(dripId),
        tokenContract as Address,
        BigNumber.from(tokenId),
      ],
    });

    const { hash } = await writeContract(config);

    setLoading(true);
    setData({ hash });

    await waitForTransaction({
      hash: hash,
    });

    setData({ hash });
    setLoading(false);
    setDone(true);
  };

  return {
    mutate,
    mutateReset,
    isMutateLoading,
    isMutateDone,
    isMutateError,
    mutateData,
  };
}
