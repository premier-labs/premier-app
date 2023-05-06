import { Store__factory } from "@premier-labs/contracts/dist/typechain";
import { prepareWriteContract, waitForTransaction, writeContract } from "@wagmi/core";
import { BigNumber } from "ethers";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useStore } from "./useStore";

export function useMint() {
  const queryClient = useQueryClient();

  const [isMintLoading, setLoading] = useState(false);
  const [isMintError, setError] = useState(false);
  const [isMintDone, setDone] = useState(false);
  const [mintData, setData] = useState<{ dripId?: number; hash?: string }>();

  const { storeContract } = useStore();

  const mintReset = () => {
    setLoading(false);
    setError(false);
    setDone(false);
    setData({});
  };

  const mint = async (dropId: number, versionId: number, value: string) => {
    const config = await prepareWriteContract({
      address: storeContract,
      abi: Store__factory.abi,
      functionName: "mint",
      args: [BigNumber.from(dropId), versionId],
      overrides: {
        value: BigNumber.from(value),
      },
    });

    const { hash } = await writeContract(config);

    setLoading(true);
    setData({ hash });

    const receipt = await waitForTransaction({
      hash: hash,
    });

    if (receipt.logs) {
      const dripId = BigNumber.from(receipt.logs[1].topics[2]).toNumber();
      setData({ hash, dripId });
      setLoading(false);
      setDone(true);
    } else {
      setError(true);
    }
  };

  return {
    mint,
    mintReset,
    isMintLoading,
    isMintDone,
    isMintError,
    mintData,
  };
}
