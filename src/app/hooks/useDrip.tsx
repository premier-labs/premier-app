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
import { getNFT } from "./utils";

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

export default function useDrip(dropContract: string, dripId: number, options: { skip?: boolean }) {
  const [isDripLoading, setLoading] = useState(true);
  const [isDripError, setError] = useState(false);
  const [isDripDone, setDone] = useState(false);
  const [dripData, setData] = useState<Drip>();

  useEffect(() => {
    if (options.skip) return;

    (async function () {
      try {
        const _dripData = await readContract({
          address: dropContract as Address,
          abi: Drop__factory.abi,
          functionName: "drip",
          args: [BigNumber.from(dripId)],
        });

        setData({
          drop: {
            address: _dripData.drop._contract as string,
            symbol: _dripData.drop.symbol as string,
            id: _dripData.drop.id.toNumber() as number,
            maxSupply: _dripData.drop.maxSupply.toNumber() as number,
            price: _dripData.drop.price.toString() as string,
            currentSupply: _dripData.drop.currentSupply.toNumber() as number,
            metadata: undefined as any,
          },
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
  }, []);

  return {
    isDripLoading,
    isDripDone,
    isDripError,
    dripData,
  };
}
