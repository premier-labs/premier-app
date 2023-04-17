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

  const {
    data: _dripsData,
    isError: isStoreDropError,
    isLoading: isStoreDropLoading,
    isSuccess: isStoreDropSucess,
  } = useContractRead({
    address: ChainIdToStoreContract[chainId] as Address,
    abi: Store__factory.abi,
    functionName: "getDrips",
    args: [address as Address],
  });

  useEffect(() => {
    const fct = async () => {
      if (_dripsData && isStoreDropSucess) {
        const drips: Drips = [];

        for (const x of _dripsData) {
          for (const y of x) {
            const drip: Drip = {
              drop: {
                address: y.drop._contract as string,
                symbol: y.drop.symbol as string,
                id: y.drop.id.toNumber() as number,
                maxSupply: y.drop.maxSupply.toNumber() as number,
                price: y.drop.price.toString() as string,
                currentSupply: y.drop.currentSupply.toNumber() as number,
                metadata: undefined as any,
              },
              id: y.id.toNumber(),
              version: y.drip.version,
              img: "", // todo
              status: y.drip.status,
              owner: y.owner,
              // nft: await getNFT(y.drip.status, y.drip.mutation),
            };

            drips.push(drip);
          }
        }

        setData(drips);
        setLoading(false);
        setDone(true);
      }
    };

    fct();
  }, [_dripsData]);

  return {
    isDripsLoading,
    isDripsDone,
    isDripsError,
    dripsData,
  };
}
