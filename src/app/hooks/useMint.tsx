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

export function useMint() {
  const [isMintLoading, setLoading] = useState(false);
  const [isMintError, setError] = useState(false);
  const [isMintDone, setDone] = useState(false);
  const [mintData, setData] = useState<{ tokenId?: number; hash?: string }>({});

  const mintReset = () => {
    setLoading(false);
    setError(false);
    setDone(false);
    setData({});
  };

  const mint = async (dropContract: string, versionId: number, value: string, nft: NFT) => {
    const config = await prepareWriteContract({
      address: dropContract as Address,
      abi: Drop__factory.abi,
      functionName: "mint",
      args: [versionId],
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
      const tokenId = BigNumber.from(receipt.logs[1].topics[1]).toNumber();
      setData({ hash, tokenId });
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
