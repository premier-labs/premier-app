import { CONFIG, isDevelopment } from "@common/config";
import { ListMockTokens } from "@premier-labs/contracts/dist/mock";
import { ERC721__factory } from "@premier-labs/contracts/dist/typechain";
import { Drip, DripStatus, DropMetadata, NFT } from "@premier-types";
import { BigNumber } from "ethers";
import { readContracts } from "wagmi";

export const IPFS_GATEWAY = CONFIG.ipfs_provider_url + "/ipfs/";
const IPFS_EXP = "ipfs://";

const normalizeIPFSUrl = (address: string) => {
  address = address.replace(IPFS_EXP, IPFS_GATEWAY);
  return address;
};

export const fetchMetadata = async (ipfsCID: string) => {
  const ipfsUrl = normalizeIPFSUrl(ipfsCID);

  const data = await (await fetch(ipfsUrl)).json();

  const metadata = data as DropMetadata;

  for (const version of metadata.versions) {
    version.texture = normalizeIPFSUrl(version.texture);
  }
  metadata.model = normalizeIPFSUrl(metadata.model);

  return metadata;
};

export const getNFT = async (
  dripStatus: DripStatus,
  mutation: {
    tokenContract: string;
    tokenId: BigNumber;
  }
): Promise<NFT | undefined> => {
  if (dripStatus === DripStatus.MUTATED) {
    if (!isDevelopment) {
      for (const listName in ListMockTokens) {
        const list = ListMockTokens[listName];

        if (list.contract === mutation.tokenContract) {
          const a = await readContracts({
            contracts: [
              {
                address: mutation.tokenContract as any,
                abi: ERC721__factory.abi,
                functionName: "name",
              },
              {
                address: mutation.tokenContract as any,
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
  return undefined;
};
