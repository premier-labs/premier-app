import { Store__factory } from "@premier-labs/contracts/dist/typechain";
import { prepareWriteContract, waitForTransaction, writeContract } from "@wagmi/core";
import { BigNumber } from "ethers";
import { useState } from "react";
import { Address } from "wagmi";
import { useStore } from "./useStore";

export function useMutate() {
  const [isMutateLoading, setLoading] = useState(false);
  const [isMutateError, setError] = useState(false);
  const [isMutateDone, setDone] = useState(false);
  const [mutateData, setData] = useState<{ dripId?: number; hash?: string }>();

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

    const receipt = await waitForTransaction({
      hash: hash,
    });

    if (receipt.logs) {
      const dripId = BigNumber.from(receipt.logs[0].topics[2]).toNumber();
      setData({ hash, dripId });
      setLoading(false);
      setDone(true);
    } else {
      setError(true);
    }
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
