import { HStack, Spinner, Button, Text } from "@chakra-ui/react";
import { claimToken } from "@scuderia/lib";
import { useContext } from "react";
import { useSigner } from "wagmi";
import WalletContext from "../../providers/context/WalletContext";

export const ScootBalance = () => {
  const { signer, scootBalance, scootBalanceUnclaimed, loadingBalance, fetchData } =
    useContext(WalletContext);

  if(!signer) {
    return <></>
  }
  if (loadingBalance) {
    return <Spinner />;
  }

  const handleClaim = async () => {
    await claimToken({ signer });
    await fetchData();
  };

  return (
    <HStack mr={20}>
      <Text size="md">{scootBalance.toFixed(6)} $SCT</Text>
      <Text size="md">({scootBalanceUnclaimed.toFixed(6)} UNCLAIMED)</Text>
      <Button onClick={handleClaim}>Claim</Button>
    </HStack>
  );
};
