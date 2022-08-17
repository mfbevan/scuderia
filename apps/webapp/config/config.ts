import { chain, Chain } from "wagmi";

export enum Network {
  PolygonMainnet = "polygon",
  PolygonMumbai = "mumbai",
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

const ConfigRecord: Record<Network, IConfig> = {
  [Network.PolygonMainnet]: polygonMainnet,
  [Network.PolygonMumbai]: polygonMumbai,
};

export const config =
  ConfigRecord[process.env.NEXT_PUBLIC_NETWORK ?? Network.PolygonMainnet];
