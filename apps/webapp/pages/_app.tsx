import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { RainbowProvider } from "./providers/RainbowProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <RainbowProvider>
        <Component {...pageProps} />
      </RainbowProvider>
    </ChakraProvider>
  );
}

export default MyApp;
