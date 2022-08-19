import type { NextPage } from "next";
import { Heading, Center, VStack } from "@chakra-ui/react";
import ScuderiaTokenGrid from "../../components/tokens/ScuderiaTokenGrid";

const Stake: NextPage = () => (
  <Center py={4}>
    <VStack maxW="4xl">
      <Heading fontSize="2xl" fontWeight={500} fontFamily="body" mb={8}>
        Tokens
      </Heading>
      <Center>
        <ScuderiaTokenGrid />
      </Center>
    </VStack>
  </Center>
);

export default Stake;
