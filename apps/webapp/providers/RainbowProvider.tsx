import "@rainbow-me/rainbowkit/styles.css";
import { ReactNode } from "react";
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig, allChains } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { config } from "../config/config";

const RainbowProvider = ({ children }: { children: ReactNode }) => {
  console.log(allChains);
  const { chains, provider } = configureChains(
    [config.chain],
    [
      // alchemyProvider({ alchemyId: process.env.ALCHEMY_ID! }),
      publicProvider(),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: "Scuderia Racing NFT",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  const theme = lightTheme({ ...lightTheme.accentColors.red });

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={theme}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export { RainbowProvider };
