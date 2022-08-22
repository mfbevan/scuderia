import { IScuderiaNFT } from "@scuderia/lib";
import { createContext } from "react";

interface StakingContextProps {
  /**
   * Select tokens
   */
  select(token: IScuderiaNFT): void;
  /**
   * Currently selected tokens
   */
  selected: IScuderiaNFT[];
  /**
   * Is there a staking transaction currently loading
   */
  loading: boolean;
  /**
   * Handle staking transaction for currently selected tokens
   */
  stake(): Promise<void>;
  /**
   * Handle unstaking transaction for currently selected tokens
   */
  unstake(): Promise<void>;
}

const defaultContext: StakingContextProps = {
  select: () => {},
  stake: async () => {},
  unstake: async () => {},
  selected: [],
  loading: false,
};

const StakingContext = createContext<StakingContextProps>(defaultContext);

export default StakingContext;
