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

export default function useDrip(dropContract: string, dripId: number, options: { skip?: boolean }) {
  const [isDripLoading, setLoading] = useState(true);
  const [isDripError, setError] = useState(false);
  const [isDripDone, setDone] = useState(false);
  const [dripData, setData] = useState<Drip>();

  const {
    data: _dripData,
    isError: isDripDataError,
    isLoading: isDripDataLoading,
    isSuccess: isDripDataSucess,
  } = useContractRead({
    address: dropContract as Address,
    abi: Drop__factory.abi,
    functionName: "drip",
    args: [BigNumber.from(dripId)],
  });

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

  useEffect(() => {
    const fct = async (
      drip: Drip,
      mutation: {
        tokenContract: `0x${string}`;
        tokenId: BigNumber;
      }
    ) => {
      const getNFT = async () => {
        if (drip.status === DripStatus.MUTATED) {
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
        }
      };

      setData({
        ...drip,
        nft: await getNFT(),
      });

      setLoading(false);
      setDone(true);
    };

    if (isDripDataSucess && _dripData) {
      fct(
        {
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
          nft: undefined,
        },
        _dripData.drip.mutation
      );
    }
  }, [_dripData]);

  return {
    isDripLoading,
    isDripDone,
    isDripError,
    dripData,
  };
}
