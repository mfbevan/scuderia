import type { NextPage } from "next";
import { Heading, Center, VStack } from "@chakra-ui/react";
import { Minter } from "../../components/minter/Minter";

const Mint: NextPage = () => {
  
  return (
    <>
      <Center py={4}>
        <VStack>
          <Heading fontSize="2xl" fontWeight={500} fontFamily="body">
            Mint
          </Heading>
          <Minter />
        </VStack>
      </Center>
    </>
  );
};

export default Mint;
