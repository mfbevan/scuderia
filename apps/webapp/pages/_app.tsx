import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { RainbowProvider } from "../providers/RainbowProvider";
import { Metadata } from "../providers/Metadata";
import { Navbar } from "../components/navigation";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <RainbowProvider>
        <Metadata />
        <Navbar />
        <Component {...pageProps} />
      </RainbowProvider>
    </ChakraProvider>
  );
}

export default MyApp;
