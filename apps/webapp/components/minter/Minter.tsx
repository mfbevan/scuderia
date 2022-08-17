import { useState } from "react";
import {
  Button,
  useToast,
  Box,
  useColorModeValue,
  Text,
  Center,
  HStack,
  VStack
} from "@chakra-ui/react";
import { mint } from "@scuderia/lib";
import { useSigner } from "wagmi";
import { Signer } from "ethers";
import { failureToast, successToast } from "../../constants";

export const Minter = () => {
  const [loading, setLoading] = useState(false);
  const { data } = useSigner();
  const signer = data as Signer;
  const toast = useToast();

  const [qty, setQty] = useState(0);

  const handleMint = async () => {
    setLoading(true);
    try {
      await mint({ signer, quantity: 1 });
      toast({
        title: "Tokens Minted",
        description: "Successfully minted tokens to your wallet",
        ...successToast,
      });
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Error Minting Tokens",
        description: err.message,
        ...failureToast,
      });
    }
    setLoading(false);
  };

  const handleIncQty = () => {
    if (qty < 10) {
      setQty(qty + 1);
    }
  };
  const handleDecQty = () => {
    if (qty > 0) {
      setQty(qty - 1);
    }
  };

  return (
    <Box
      maxW="2xl"
      bg={useColorModeValue("gray.300", "gray.700")}
      boxShadow="xl"
      rounded="md"
      textAlign="left"
      mx={2}
      p={4}
    >
      <VStack spacing={8}>
      <Text fontSize="md">Mint Scuderia NFTs for 50 MATIC each</Text>
        <HStack>
          <Button onClick={handleDecQty}>-</Button>
          <Text fontSize="md" px={4}>
            {qty}
          </Text>
          <Button onClick={handleIncQty}>+</Button>
        </HStack>
        <Button onClick={handleMint} isLoading={loading} minW={100}>
          Mint
        </Button>
      </VStack>
    </Box>
  );
};
