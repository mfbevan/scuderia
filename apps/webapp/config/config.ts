import { Network } from "../types/environment";

interface IConfig {
  network: string;
  chainId: number;
}

const polygonMainnet: IConfig = {
  network: Network.PolygonMainnet,
  chainId: 137,
};

const polygonMumbai: IConfig = {
  network: Network.PolygonMumbai,
  chainId: 80001,
};

const ConfigRecord: Record<Network, IConfig> = {
  [Network.PolygonMainnet]: polygonMainnet,
  [Network.PolygonMumbai]: polygonMumbai,
};

export const config = ConfigRecord[process.env.NEXT_PUBLIC_NETWORK];
