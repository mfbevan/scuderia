import type { NextPage } from "next";
import { Heading, Center, VStack } from "@chakra-ui/react";
import ScuderiaTokenGrid from "../../components/tokens/ScuderiaTokenGrid";
import StakingContextProvider from "../../providers/context/StakingContextProvider";
import { StakingBar } from "../../components/staking/StakingBar";

const Stake: NextPage = () => (
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

export default Stake;
