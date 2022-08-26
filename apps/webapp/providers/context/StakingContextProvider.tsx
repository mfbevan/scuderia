import { ReactNode, useContext, useState } from "react";
import { IScuderiaNFT } from "@scuderia/lib/types";
import { stake as submitStake, unstake as submitUnstake } from "@scuderia/lib";
import { useToast } from "@chakra-ui/react";
import { failureToast } from "../../constants";
import StakingContext from "./StakingContext";
import { StakingLockinOption } from "@scuderia/lib/constants";
import WalletContext from "./WalletContext";

const StakingContextProvider = ({ children }: { children: ReactNode }) => {
  const toast = useToast();
  const { signer, connected, fetchData } = useContext(WalletContext);

  const [selected, setSelected] = useState<IScuderiaNFT[]>([]);
  const select = (token: IScuderiaNFT) => {
    if (selected.includes(token)) {
      setSelected(selected.filter((_tkn) => _tkn !== token));
    } else {
      setSelected([...selected, token]);
    }
  };

  const [lockinPeriod, setLockinPeriod] = useState<StakingLockinOption>(StakingLockinOption.STAKE_30_DAYS);
  const setStakeLockin = (lockin: number) => setLockinPeriod(lockin);

  const [loading, setLoading] = useState(false);

  const stake = async () => {
    setLoading(true);
    if (isNaN(lockinPeriod) || lockinPeriod < 0) {
      toast({
        title: "Selection Error",
        description: "Select a valid staking period",
        ...failureToast,
      });
      return;
    }
    if (!selected.length) {
      toast({
        title: "Selection Error",
        description: "Select at least one unstaked token, and no staked tokens",
        ...failureToast,
      });
      return;
    }
    await submitStake({
      signer,
      tokens: selected,
      stakingPeriod: lockinPeriod,
    });
    setLoading(false);
    await fetchData();
  };

  const unstake = async () => {
    if (!selected.length) {
      toast({
        title: "Selection Error",
        description: "Select at least one staked token, and no unstaked tokens",
        ...failureToast,
      });
      return;
    }
    await submitUnstake({
      signer,
      tokens: selected
    });
  };

  return (
    <StakingContext.Provider
      value={{
        select,
        selected,
        stake,
        unstake,
        loading,
        lockinPeriod,
        setStakeLockin,
      }}
    >
      {children}
    </StakingContext.Provider>
  );
};

export default StakingContextProvider;
