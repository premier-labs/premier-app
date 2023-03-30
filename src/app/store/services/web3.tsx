import { sdk } from "@app/sdk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NFT } from "@premier-types";
import { BigNumber, ethers } from "ethers";

export interface Web3 {
  auth: boolean;
  authError: string;
  address: string;
  name: string | null;

  txProcess: {
    mintingDrip: {
      loading: boolean;
      done: boolean;
      tx?: string;
      id?: number;
    };
    mintingDefault: {
      loading: boolean;
      done: boolean;
      tx?: string;
      id?: number;
    };
    mutating: {
      loading: boolean;
      done: boolean;
      tx?: string;
    };
  };
}

const initialState: Web3 = {
  auth: false,
  authError: "",
  address: "",
  name: "",
  txProcess: {
    mintingDrip: {
      loading: false,
      done: false,
    },
    mintingDefault: {
      loading: false,
      done: false,
    },
    mutating: {
      loading: false,
      done: false,
    },
  },
};

export const init = createAsyncThunk("web3/init", async (_, { dispatch }) => {
  await sdk.web3Listeners(dispatch);
});

export const disconnect = createAsyncThunk(
  "web3/disconnect",
  async (obj: { error: string }, { dispatch }) => {
    return obj.error;
  }
);

export const login = createAsyncThunk("web3/login", async (_, { dispatch }) => {
  const loginResult = await sdk.init(dispatch);
  const { address, name } = sdk.getInfo();

  return { address, name, loginResult };
});

// MINT DEFAULT
export const mintDefault = createAsyncThunk(
  "web3/mintDefault",
  async (obj: { address: string; value: string }, { dispatch }) => {
    const tx = await sdk.mintDefault(obj.address, obj.value);
    dispatch(waitMintDefault(tx));
    return tx.hash;
  }
);
export const waitMintDefault = createAsyncThunk(
  "web3/wait_mintDefault",
  async (tx: ethers.ContractTransaction) => {
    const receipt = await tx.wait();
    if (receipt.events) {
      const mintedEvent = receipt.events[0];
      const mintedTokenId = ((mintedEvent.args as any).tokenId as BigNumber).toNumber();
      return mintedTokenId;
    }
    return -100;
  }
);

// MINT
export const mint = createAsyncThunk(
  "web3/mint",
  async (obj: { address: string; versionId: number; value: string; nft: NFT }, { dispatch }) => {
    const tx = await sdk.mint(obj.address, obj.versionId, obj.value);
    dispatch(waitMint(tx));
    return tx.hash;
  }
);
export const waitMint = createAsyncThunk(
  "web3/wait_mint",
  async (tx: ethers.ContractTransaction) => {
    const receipt = await tx.wait();
    if (receipt.events) {
      const mintedEvent = receipt.events[0];
      const mintedTokenId = ((mintedEvent.args as any).tokenId as BigNumber).toNumber();
      return mintedTokenId;
    }
    return -100;
  }
);

// MUTATE
export const mutate = createAsyncThunk(
  "web3/mutate",
  async (
    obj: {
      address: string;
      tokenId: number;
      contractMutator: string;
      tokenIdMutator: number;
    },
    { dispatch }
  ) => {
    const tx = await sdk.mutate(obj.address, obj.tokenId, obj.contractMutator, obj.tokenIdMutator);
    dispatch(waitMutate(tx));
    return tx.hash;
  }
);
export const waitMutate = createAsyncThunk(
  "web3/wait_mutate",
  async (tx: ethers.ContractTransaction) => {
    await tx.wait();
  }
);

export const resetMintingProcess = createAsyncThunk("web3/resetMintingProcess", async () => {});

const web3 = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // login
    builder.addCase(login.fulfilled, (state, action) => {
      state.auth = action.payload.loginResult;
      state.address = action.payload.loginResult ? action.payload.address : "";
      state.name = action.payload.loginResult ? action.payload.name : "";
    });
    // disconnect
    builder.addCase(disconnect.fulfilled, (state, action) => {
      state.auth = false;
      state.address = "";
      state.name = "";
      state.authError = action.payload;
    });
    // resetMintingProcess
    builder.addCase(resetMintingProcess.fulfilled, (state, action) => {
      state.txProcess = {
        mintingDrip: {
          loading: false,
          done: false,
        },
        mintingDefault: {
          loading: false,
          done: false,
        },
        mutating: {
          loading: false,
          done: false,
        },
      };
    });
    //
    // mint
    //
    builder.addCase(mint.pending, (state, action) => {});
    builder.addCase(mint.fulfilled, (state, action) => {
      state.txProcess.mintingDrip.loading = true;
      state.txProcess.mintingDrip.tx = action.payload;
    });
    builder.addCase(waitMint.pending, (state, action) => {});
    builder.addCase(waitMint.fulfilled, (state, action) => {
      state.txProcess.mintingDrip.loading = false;
      state.txProcess.mintingDrip.done = true;
      state.txProcess.mintingDrip.id = action.payload;
    });
    //
    // mintDefault
    //
    builder.addCase(mintDefault.pending, (state, action) => {});
    builder.addCase(mintDefault.fulfilled, (state, action) => {
      state.txProcess.mintingDefault.loading = true;
      state.txProcess.mintingDefault.tx = action.payload;
    });
    builder.addCase(waitMintDefault.pending, (state, action) => {});
    builder.addCase(waitMintDefault.fulfilled, (state, action) => {
      state.txProcess.mintingDefault.loading = false;
      state.txProcess.mintingDefault.done = true;
      state.txProcess.mintingDefault.id = action.payload;
    });
    //
    // mutate
    //
    builder.addCase(mutate.pending, (state, action) => {});
    builder.addCase(mutate.fulfilled, (state, action) => {
      state.txProcess.mutating.loading = true;
      state.txProcess.mutating.tx = action.payload;
    });
    builder.addCase(waitMutate.pending, (state, action) => {});
    builder.addCase(waitMutate.fulfilled, (state, action) => {
      state.txProcess.mutating.loading = false;
      state.txProcess.mutating.done = true;
    });
  },
});

export default web3.reducer;
