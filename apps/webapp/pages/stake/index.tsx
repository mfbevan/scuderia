import type { NextPage } from "next";
import { Heading, Center, Wrap, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { walletOf, getTokenData, getTokenSeed } from "@scuderia/lib";
import { IScuderiaNFT } from "@scuderia/lib/types";
import { Signer } from "ethers";
import { useSigner } from "wagmi";
import { TokenCard } from "../../components/cards/TokenCard";

const Stake: NextPage = () => {
  const [tokens, setTokens] = useState<IScuderiaNFT[]>([]);
  const { data } = useSigner();
  const signer = data as Signer;

  useEffect(() => {
    if (!signer) return;
    const getTokens = async () => {
      const tokenIds = await walletOf({
        signer,
        address: await signer.getAddress(),
      });
      const tokenData = await Promise.all(
        tokenIds.map(async (tokenId: number) =>
          getTokenData({ signer, tokenId })
        )
      );
      const seeds = await Promise.all(
        tokenIds.map(async (tokenId: number) =>
          getTokenSeed({ signer, tokenId })
        )
      );

      console.log(seeds);
      setTokens(tokenData);
      console.log(tokenData)
    };
    getTokens();
  }, [signer]);

  return (
    <Center py={4}>
      <VStack maxW="4xl">
      <Heading fontSize="2xl" fontWeight={500} fontFamily="body">
        Tokens
      </Heading>
      <Center>
      <Wrap spacing={10} justify="center" pb={10} px={10}>
        {tokens.map((_tkn, index) => (
          <TokenCard key={`token-${index}`} token={_tkn} />
        ))}
      </Wrap>
      </Center>
      </VStack>
    </Center>
  );
};

export default Stake;
