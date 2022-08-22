import { ReactNode, useCallback, useEffect, useState } from "react";
import { useSigner } from "wagmi";
import { Signer } from "ethers";
import WalletContext from "./WalletContext";
import { IScuderiaNFT } from "@scuderia/lib/types";
import { walletOf, getTokenData, getScuderiaTokens } from "@scuderia/lib";
import { useToast } from "@chakra-ui/react";
import { failureToast } from "../../constants";
import StakingContext from "./StakingContext";

const StakingContextProvider = ({ children }: { children: ReactNode }) => {
  const toast = useToast();

  const [selected, setSelected] = useState<IScuderiaNFT[]>([]);

  const select = (token: IScuderiaNFT) => {
    console.log("b4", selected)
    if (selected.includes(token)) {
      setSelected(selected.filter((_tkn) => _tkn !== token));
    } else {
      setSelected([...selected, token]);
    }

    console.log("after", selected)
  };

  const stake = async () => {
    // ...
  };

  const unstake = async () => {
    // ...
  };

  return (
    <StakingContext.Provider
      value={{
        select,
        selected,
      }}
    >
      {children}
    </StakingContext.Provider>
  );
};

export default StakingContextProvider;
