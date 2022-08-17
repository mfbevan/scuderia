import { chain, Chain } from "wagmi";
import { Network } from "@scuderia/lib/types";

const network = process.env.NEXT_PUBLIC_NETWORK as Network;
if (!network) {
  throw Error("Specify network in config");
}

interface IConfig {
  chain: Chain;
}

const polygonMainnet: IConfig = {
  chain: chain.polygon,
};

const polygonMumbai: IConfig = {
  chain: chain.polygonMumbai,
};

const localhost: IConfig = {
  chain: chain.localhost,
};

const ConfigRecord: Record<Network, IConfig> = {
  [Network.Polygon]: polygonMainnet,
  [Network.Mumbai]: polygonMumbai,
  [Network.Localhost]: localhost,
};

export const config = ConfigRecord[network];
