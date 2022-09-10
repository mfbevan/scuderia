import type { NextPage } from "next";
import { Heading, Center, VStack, Text } from "@chakra-ui/react";
import { Minter } from "../../components/minter/Minter";
import { useContext } from "react";
import WalletContext from "../../providers/context/WalletContext";

const Mint: NextPage = () => {
  const { signer } = useContext(WalletContext);
  if (!signer) {
    return (
      <Text align="center" mt={4}>
        Connect your wallet
      </Text>
    );
  }

  return (
    <>
      <Center py={4}>
        <VStack>
          <Heading fontSize="2xl" fontWeight={500} fontFamily="body">
            Mint
          </Heading>
          <Text fontWeight={500} fontFamily="body">
            Mint your Scuderia NFTs for 0.1 Ξ each. Max 10 per mint.
          </Text>
          <Minter />
        </VStack>
      </Center>
    </>
  );
};

export default Mint;
