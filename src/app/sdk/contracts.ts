import { buildContracts } from "ethers-deploy-or-attach";

import { provider } from "./provider";

import { contracts as premierContracts } from "@premier-contracts";

const contracts = buildContracts(premierContracts, provider);

export default contracts;
