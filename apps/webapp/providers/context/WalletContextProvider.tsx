import { ReactNode, useCallback, useEffect, useState } from "react";
import { useSigner } from "wagmi";
import { Signer } from "ethers";
import WalletContext from "./WalletContext";
import { IScuderiaNFT } from "@scuderia/lib/types";
import { walletOf, getTokenData, getScuderiaTokens } from "@scuderia/lib";
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

  /**
   * Fetch all token data, can be called from anywhere consuming the context
   */
  const fetchData = useCallback(async () => {
    await Promise.allSettled([_fetchScuderia()]);
  }, [_fetchScuderia]);

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
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContextProvider;
