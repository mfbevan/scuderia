export {};

export enum Network {
  PolygonMainnet = "polygon",
  PolygonMumbai = "mumbai",
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_NETWORK: Network.PolygonMainnet | Network.PolygonMumbai;
    }
  }
}
