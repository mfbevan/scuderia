import { Contract, Signer } from "ethers";
import { Network } from "@scuderia/lib/types";

import { Scuderia, Scoot } from "../typechain";
import ScuderiaLocalhost from "../deployments/localhost/Scuderia.json";
import ScootLocalhost from "../deployments/localhost/Scoot.json";
import ScuderiaMumbai from "../deployments/mumbai/Scuderia.json";
import ScootMumbai from "../deployments/mumbai/Scoot.json";

const network = process.env.NEXT_PUBLIC_NETWORK as Network;
if (!network) {
  throw Error("Specify network in config");
}

interface NetworkContracts {
  scuderia: any;
  scoot: any;
}

const getContracts: Record<Network, NetworkContracts> = {
  [Network.Polygon]: { scuderia: ScuderiaLocalhost, scoot: ScootLocalhost },
  [Network.Mumbai]: { scuderia: ScuderiaMumbai, scoot: ScootMumbai },
  [Network.Localhost]: { scuderia: ScuderiaLocalhost, scoot: ScootLocalhost },
};

export const ScuderiaContract = (signer?: Signer) => {
  const { scuderia } = getContracts[network];
  const { address, abi } = scuderia;
  return new Contract(address, abi, signer) as Scuderia;
};

export const ScootContract = (signer?: Signer) => {
  const { scoot } = getContracts[network];
  const { address, abi } = scoot;
  return new Contract(address, abi, signer) as Scoot;
};