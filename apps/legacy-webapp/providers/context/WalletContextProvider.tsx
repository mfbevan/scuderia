import { ReactNode, useCallback, useEffect, useState } from "react";
import { useSigner } from "wagmi";
import { Signer } from "ethers";
import WalletContext from "./WalletContext";
import { IScuderiaNFT } from "@scuderia/lib/types";
import {
  getScuderiaTokens,
  getBalance,
  getUnclaimedBalance,
} from "@scuderia/lib";
import { useToast } from "@chakra-ui/react";
import { failureToast } from "../../constants";

const WalletContextProvider = ({ children }: { children: ReactNode }) => {
  const toast = useToast();
  const { data: signer } = useSigner();

  const [scuderia, setScuderia] = useState<IScuderiaNFT[]>([]);
  const [loadingScuderia, setLoadingScuderia] = useState(false);

  /**
   * Fetch Scuderia NFT tokens and their metadata
   */
  const _fetchScuderia = useCallback(async () => {
    if (!signer) return;
    setLoadingScuderia(true);
    setScuderia(await getScuderiaTokens({ signer }));
    setLoadingScuderia(false);
  }, [signer]);

  const [scootBalance, setScootBalance] = useState<number>(0);
  const [scootBalanceUnclaimed, setScootBalanceUnclaimed] = useState<number>(0);
  const [loadingBalance, setLoadingBalance] = useState<boolean>(false);

  const _fetchBalance = useCallback(async () => {
    if (!signer) return;
    setLoadingBalance(true);
    setScootBalance(await getBalance({ signer }));
    setScootBalanceUnclaimed(await getUnclaimedBalance({ signer }));
    setLoadingBalance(false);
  }, [signer]);

  /**
   * Fetch all token data, can be called from anywhere consuming the context
   */
  const fetchData = useCallback(async () => {
    await Promise.allSettled([_fetchScuderia(), _fetchBalance()]);
  }, [_fetchScuderia, _fetchBalance]);

  useEffect(() => {
    if (!signer) return;
    fetchData();
  }, [signer, fetchData]);

  return (
    <WalletContext.Provider
      value={{
        signer: signer as Signer,
        connected: !!signer,
        fetchData,
        scuderia,
        loadingScuderia,
        scootBalance,
        scootBalanceUnclaimed,
        loadingBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContextProvider;
