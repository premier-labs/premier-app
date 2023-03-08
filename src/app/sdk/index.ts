import { BigNumber, ethers, Signer } from "ethers";
import { TestERC721__factory, Drop__factory } from "@premier-labs/typechain";
import { isDevelopment } from "@common/config";

import { NFT } from "@premier-labs/types";
import * as system from "@premier-labs/system";
import { disconnect, login } from "../store/services/web3";

class SDK {
  private provider!: ethers.providers.Web3Provider;
  private _signer!: Signer;
  private _address: string;
  private _name: string | null;

  constructor() {
    this._address = "";
    this._name = "";
  }

  // getters
  getInfo = () => {
    return {
      address: this._address,
      name: this._name,
    };
  };

  _setSigner = async (newSigner: Signer) => {
    this._signer = newSigner;
    this._address = await newSigner.getAddress();

    if (isDevelopment) {
      this._name = "tester.eth";
    } else {
      this._name = (await this.provider.lookupAddress(this._address)) || "cool human";
    }
  };

  web3Listeners = async (dispatch: Function) => {
    window.ethereum.on("chainChanged", () => {
      dispatch(login());
    });

    window.ethereum.on("accountsChanged", async () => {
      dispatch(login());
    });
  };

  init = async (dispatch: Function) => {
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
    const chainId = (await this.provider.getNetwork()).chainId;

    const storeAddress = system.ChainIdToStoreContract[chainId];
    if (!storeAddress) {
      console.log("Wrong network.");
      dispatch(disconnect({ error: "Wrong Network" }));
      return false;
    }

    await this.provider.send("eth_requestAccounts", []);
    await this._setSigner(this.provider.getSigner() as Signer);

    return true;
  };

  mintDefault = async (contractAddress: string, value: string) => {
    const contract = TestERC721__factory.connect(contractAddress, this._signer);
    const tx = await contract.mint({ value: value });
    return tx;
  };

  mint = async (contractAddress: string, versionId: number, value: string) => {
    const contract = Drop__factory.connect(contractAddress, this._signer);
    const tx = await contract.mint(versionId, { value: value });
    return tx;
  };

  mutate = async (
    contractAddress: string,
    tokenId: number,
    contractMutator: string,
    tokenIdMutator: number
  ) => {
    const contract = Drop__factory.connect(contractAddress, this._signer);
    const tx = await contract.mutate(tokenId, contractMutator, tokenIdMutator);
    return tx;
  };
}

export const sdk = new SDK();
