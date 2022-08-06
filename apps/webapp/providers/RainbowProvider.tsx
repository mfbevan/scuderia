import "@rainbow-me/rainbowkit/styles.css";
import { ReactNode } from "react";
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const RainbowProvider = ({ children }: { children: ReactNode }) => {
  const { chains, provider } = configureChains(
    [chain.polygonMumbai, chain.polygon],
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
