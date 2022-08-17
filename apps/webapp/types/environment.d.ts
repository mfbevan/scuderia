import { Network } from "../config/config";

export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_NETWORK: Network;
    }
  }
}
