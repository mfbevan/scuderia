import { createContext } from "react";
import { Signer } from "ethers";
import { IScuderiaNFT } from "@scuderia/lib";

interface WalletContextProps {
  /**
   * Currently connect ethers signer
   */
  signer?: Signer;
  /**
   * Is there a currently connected wallet
   */
  connected: boolean;
  /**
   * Scuderia NFT tokens owned by the connected account 
   */
  scuderia: IScuderiaNFT[]
  /**
   * Is the app currently fetching scuderia data
   */
  loadingScuderia: boolean;
  /**
   * Refetch all tokens and metadata
   */
  fetchData(): Promise<void>;
  /**
   * Balance of Scoot tokens
   */
  scootBalance: number;
  /**
   * Unclaimed balance of Scoot tokens
   */
  scootBalanceUnclaimed: number;
  /**
   * Is the app currently fetching balances
   */
  loadingBalance: boolean;
}

const defaultContext: WalletContextProps = {
  signer: undefined,
  connected: false,
  scuderia: [],
  loadingScuderia: true,
  fetchData: async () => {},
  scootBalance: 0,
  scootBalanceUnclaimed: 0,
  loadingBalance: false,
};

const WalletContext = createContext<WalletContextProps>(defaultContext);

export default WalletContext;
