import type { NextPage } from "next";
import { Text, Center, VStack, Spinner } from "@chakra-ui/react";
import ScuderiaTokenGrid from "../../components/tokens/ScuderiaTokenGrid";
import StakingContextProvider from "../../providers/context/StakingContextProvider";
import { StakingBar } from "../../components/staking/StakingBar";
import { useContext } from "react";
import WalletContext from "../../providers/context/WalletContext";

const Stake: NextPage = () => {
  const { loadingScuderia, signer } = useContext(WalletContext);
  if (!signer) {
    return (
      <Text align="center" mt={4}>
        Connect your wallet
      </Text>
    );
  }
  if (loadingScuderia)
    return (
      <Center pt={10}>
        <Spinner />
      </Center>
    );

  return (
    <StakingContextProvider>
      <Center py={4}>
        <VStack maxW="4xl">
          <StakingBar />
          <Center>
            <ScuderiaTokenGrid />
          </Center>
        </VStack>
      </Center>
    </StakingContextProvider>
  );
};

export default Stake;
