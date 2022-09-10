import {
  Box,
  Button,
  Heading,
  HStack,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import { Wallet } from "ethers";
import { useContext } from "react";
import StakingContext from "../../providers/context/StakingContext";
import { StakePeriodDropdown } from "./StakingPeriodDropdown";

export const StakingBar = () => {
  const { selected, loading, stake, unstake } = useContext(StakingContext);

  return (
    <Box
      p={2}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"lg"}
      rounded={"lg"}
      pos={"relative"}
      zIndex={1}
    >
      <HStack w={600}>
        <Heading size="sm" pl={4} minW={200}>
          {selected.length} tokens selected
        </Heading>
        <StakePeriodDropdown />
        <Spacer />
        <Button
          isLoading={loading}
          minW={100}
          colorScheme="red"
          onClick={stake}
        >
          Stake
        </Button>
        <Button
          isLoading={loading}
          minW={100}
          colorScheme="red"
          onClick={unstake}
        >
          Unstake
        </Button>
      </HStack>
    </Box>
  );
};
