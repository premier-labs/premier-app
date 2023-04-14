import { ChainIdToStoreContract } from "@premier-labs/contracts/dist/system";
import { NFT } from "@premier-labs/contracts/dist/types";
import { useState } from "react";
import { usePrepareContractWrite, useWaitForTransaction, useNetwork, Address } from "wagmi";
import { readContract } from "@wagmi/core";
import { Drop__factory } from "@premier-labs/contracts/dist/typechain";
import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
  watchContractEvent,
} from "@wagmi/core";
import { BigNumber, ethers } from "ethers";

export function useMutate() {
  const [isMutateLoading, setLoading] = useState(false);
  const [isMutateError, setError] = useState(false);
  const [isMutateDone, setDone] = useState(false);
  const [mutateData, setData] = useState<{ tokenId?: number; hash?: string }>({});

  const mutateReset = () => {
    setLoading(false);
    setError(false);
    setDone(false);
    setData({});
  };

  const mutate = async (
    dropContract: string,
    dripId: number,
    tokenContract: string,
    tokenId: number
  ) => {
    const config = await prepareWriteContract({
      address: dropContract as Address,
      abi: Drop__factory.abi,
      functionName: "mutate",
      args: [BigNumber.from(dripId), tokenContract as Address, BigNumber.from(tokenId)],
    });

    const { hash } = await writeContract(config);

    setLoading(true);
    setData({ hash });

    const receipt = await waitForTransaction({
      hash: hash,
    });

    if (receipt.logs) {
      console.log(receipt.logs);
      const tokenId = BigNumber.from(receipt.logs[0].topics[1]).toNumber();
      setData({ hash, tokenId });
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
