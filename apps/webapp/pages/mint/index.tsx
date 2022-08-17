import type { NextPage } from "next";
import { useState } from "react";
import { Heading, Center, Button, VStack, useToast } from "@chakra-ui/react";
import { mint } from "@scuderia/lib";
import { useSigner } from "wagmi";
import { Signer } from "ethers";

const Mint: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const { data: signer } = useSigner();
  const toast = useToast();
  const handleMint = async () => {
    setLoading(true);
    try {
      await mint({ signer: signer as Signer, quantity: 1 });

    } catch (err: any) {
      console.error(err);
      toast({status: "error", title: "Error Minting Tokens"})
    }
    setLoading(false);
  };
  return (
    <>
      <Center py={4}>
        <VStack>
          <Heading fontSize="2xl" fontWeight={500} fontFamily="body">
            Mint
          </Heading>
          <Button onClick={handleMint} isLoading={loading}>
            Mint
          </Button>
        </VStack>
      </Center>
    </>
  );
};

export default Mint;
