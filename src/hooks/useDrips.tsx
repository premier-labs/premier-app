import { CONFIG, isDevelopment } from "@common/config";
import { ListMockTokens } from "@premier-labs/contracts/dist/mock";
import { ChainIdToStoreContract } from "@premier-labs/contracts/dist/system";
import { Drop__factory, ERC721__factory, Store__factory } from "@premier-typechain";
import { Drip, Drips, dripStatus, DripStatus, Drop, DropMetadata, NFT } from "@premier-types";
import { readContract, readContracts } from "@wagmi/core";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Address, useContractEvent, useNetwork } from "wagmi";
import { useContractRead } from "wagmi";

const getNFT = async (
  dripStatus: DripStatus,
  mutation: {
    tokenContract: `0x${string}`;
    tokenId: BigNumber;
  }
) => {
  if (dripStatus === DripStatus.MUTATED) {
    if (!isDevelopment) {
      for (const listName in ListMockTokens) {
        const list = ListMockTokens[listName];

        if (list.contract === mutation.tokenContract) {
          const a = await readContracts({
            contracts: [
              {
                address: mutation.tokenContract,
                abi: ERC721__factory.abi,
                functionName: "name",
              },
              {
                address: mutation.tokenContract,
                abi: ERC721__factory.abi,
                functionName: "symbol",
              },
            ],
          });

          return {
            address: list.contract,
            img: list.tokens[mutation.tokenId.toNumber()],
            id: mutation.tokenId.toNumber(),
            name: a[0],
            symbol: a[1],
          };
        }
      }
    } else {
      const req = await fetch(
        `${CONFIG.network.server_url}/nft/${mutation.tokenContract}/${mutation.tokenId}`
      );
      const res = await req.json();
      return res as NFT;
    }
  } else {
    return undefined;
  }
};

export default function useDrips(address: string, options: { skip?: boolean }) {
  const { chain } = useNetwork();
  const chainId = chain?.id as number;

  const [isDripsLoading, setLoading] = useState(true);
  const [isDripsError, setError] = useState(false);
  const [isDripsDone, setDone] = useState(false);
  const [dripsData, setData] = useState<Drips>();

  useEffect(() => {
    (async () => {
      if (options.skip) return;

      const drips: Drips = [];

      const storeContract = ChainIdToStoreContract[chainId] as Address;

      const dropTotalSupply = await readContract({
        address: storeContract,
        abi: Store__factory.abi,
        functionName: "DROP_SUPPLY",
      });

      for (let y = BigNumber.from(0); y < dropTotalSupply; y = y.add(1)) {
        const dropContract = await readContract({
          address: storeContract,
          abi: Store__factory.abi,
          functionName: "drop",
          args: [y],
        });

        const dripOwnedByAddress = await readContract({
          address: dropContract,
          abi: Drop__factory.abi,
          functionName: "balanceOf",
          args: [address as Address],
        });

        for (let x = BigNumber.from(0); x < dripOwnedByAddress; x = x.add(1)) {
          const tokenOfOwnerByIndex = await readContract({
            address: dropContract,
            abi: Drop__factory.abi,
            functionName: "tokenOfOwnerByIndex",
            args: [address as Address, x],
          });

          const _drip = await readContract({
            address: dropContract,
            abi: Drop__factory.abi,
            functionName: "dripInfo",
            args: [tokenOfOwnerByIndex],
          });

          const drip: Drip = {
            drop: {
              id: y.toNumber(),
            } as any,
            id: _drip.id.toNumber(),
            version: _drip.drip.version,
            img: "", // todo
            status: _drip.drip.status,
            owner: _drip.owner,
            nft: await getNFT(_drip.drip.status, _drip.drip.mutation),
          };

          drips.push(drip);
        }
      }

      setData(drips);
      setLoading(false);
      setDone(true);
    })();
  }, []);

  return {
    isDripsLoading,
    isDripsDone,
    isDripsError,
    dripsData,
  };
}
