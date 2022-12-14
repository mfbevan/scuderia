import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { RainbowProvider } from "../providers/RainbowProvider";
import { Metadata } from "../providers/Metadata";
import { Navbar } from "../components/navigation";
import WalletContextProvider from "../providers/context/WalletContextProvider";
import { ScootBalance } from "../components/tokens/ScootBalance";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <RainbowProvider>
        <Metadata />
        <WalletContextProvider>
          <Navbar />
          <ScootBalance />

          <Component {...pageProps} />
        </WalletContextProvider>
      </RainbowProvider>
    </ChakraProvider>
  );
}

export default MyApp;
