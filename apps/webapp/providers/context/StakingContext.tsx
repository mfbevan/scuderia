import { IScuderiaNFT, StakingLockinOption } from "@scuderia/lib";
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
   * The currently selected staking lockin period
   */
  lockinPeriod: StakingLockinOption;
  /**
   * Handle staking transaction for currently selected tokens
   */
  stake(): Promise<void>;
  /**
   * Handle unstaking transaction for currently selected tokens
   */
  unstake(): Promise<void>;
  /**
   * Set the current staking lockin period
   */
  setStakeLockin(lockin: StakingLockinOption): void;
}

const defaultContext: StakingContextProps = {
  select: () => {},
  stake: async () => {},
  unstake: async () => {},
  setStakeLockin: () => {},
  selected: [],
  loading: false,
  lockinPeriod: StakingLockinOption.STAKE_30_DAYS,
};

const StakingContext = createContext<StakingContextProps>(defaultContext);

export default StakingContext;
