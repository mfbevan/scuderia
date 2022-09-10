import {
  VStack,
  Spinner,
  Button,
  Text,
  Box,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";
import { claimToken } from "@scuderia/lib";
import { useContext } from "react";
import { useSigner } from "wagmi";
import WalletContext from "../../providers/context/WalletContext";

export const ScootBalance = () => {
  const {
    signer,
    scootBalance,
    scootBalanceUnclaimed,
    loadingBalance,
    fetchData,
  } = useContext(WalletContext);

  if (!signer) {
    return <></>;
  }
  if (loadingBalance) {
    return <Spinner />;
  }

  const handleClaim = async () => {
    await claimToken({ signer });
    await fetchData();
  };

  return (
    <Box
      p={2}
      w={240}
      bg={"white"}
      rounded={"lg"}
      pos={"fixed"}
      right={30}
      top={100}
      zIndex={1}
      boxShadow="lg"
    >
      <Center>
        <VStack spacing={3}>
          <Text size="md">{scootBalance.toFixed(6)} $SCT</Text>
          <Text size="md">{scootBalanceUnclaimed.toFixed(6)} UNCLAIMED</Text>
          <Button mt={4} onClick={handleClaim}>Claim</Button>
        </VStack>
      </Center>
    </Box>
  );
};
