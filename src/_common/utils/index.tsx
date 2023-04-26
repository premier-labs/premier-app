import { NFT } from "@premier-labs/contracts/dist/types";
import { ethers } from "ethers";

const { AddressZero } = ethers.constants;

export const placeholderItem: NFT = {
  address: AddressZero,
  img: "/placeholder.png",
  id: 0,
  name: "",
  symbol: "",
};
