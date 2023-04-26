import { CONFIG, isDevelopment } from "@common/config";
import { ListMockTokens } from "@premier-labs/contracts/dist/mock";
import { ChainIdToStoreContract } from "@premier-labs/contracts/dist/system";
import { Drop__factory, ERC721__factory, Store__factory } from "@premier-typechain";
import { Drip, DripStatus, Drop, DropMetadata, NFT } from "@premier-types";
import { readContract, readContracts } from "@wagmi/core";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Address, useContractEvent, useNetwork } from "wagmi";
import { useContractRead } from "wagmi";
import { fetchMetadata, getNFT } from "./utils";
import { useChain } from "./useChain";
import useDrop from "./useDrop";

// TODO
//   useContractEvent({
//     address: dropContract as Address,
//     abi: Drop__factory.abi,
//     eventName: "Mutated",

//     listener(dripId) {
//       const fct = async ()=> {}
//       if (dripData && dripId === dripId) {
//         setData({ ...dripData, status: DripStatus.MUTATED });
//       }
//     },
//   });

export default function useDrip(dropId: number, dripId: number, options = { skip: false }) {
  const [isDripLoading, setLoading] = useState(true);
  const [isDripError, setError] = useState(false);
  const [isDripDone, setDone] = useState(false);
  const [dripData, setData] = useState<Drip>();

  const { chainId } = useChain();

  const { dropData, isDropDone } = useDrop(dropId);

  useEffect(() => {
    (async function () {
      try {
        if (options.skip) return;
        if (dropData === undefined || !isDropDone) throw "drop not found";

        const dropContract = await readContract({
          address: ChainIdToStoreContract[chainId] as Address,
          abi: Store__factory.abi,
          functionName: "drop",
          args: [BigNumber.from(dropId)],
        });

        const _dripData = await readContract({
          address: dropContract as Address,
          abi: Drop__factory.abi,
          functionName: "drip",
          args: [BigNumber.from(dripId)],
        });

        setData({
          drop: dropData,
          id: dripId,
          version: _dripData.drip.version,
          img: "", // todo
          status: _dripData.drip.status,
          owner: _dripData.owner,
          nft: await getNFT(_dripData.drip.status, _dripData.drip.mutation),
        });

        setLoading(false);
        setError(false);
        setDone(true);
      } catch (e) {
        console.log("Error: useDrip: ", e);

        setLoading(false);
        setError(true);
        setDone(true);
      }
    })();
  }, [dropId, dripId, isDropDone]);

  return {
    isDripLoading,
    isDripDone,
    isDripError,
    dripData,
  };
}
