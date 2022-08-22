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
}

const defaultContext: StakingContextProps = {
  select: () => {},
  selected: [],
};

const StakingContext = createContext<StakingContextProps>(defaultContext);

export default StakingContext;
