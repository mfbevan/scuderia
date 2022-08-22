import {
  Box,
  Button,
  Heading,
  HStack,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext } from "react";
import StakingContext from "../../providers/context/StakingContext";

export const StakingBar = () => {
  const { selected, loading, stake, unstake } = useContext(StakingContext);
  return (
    <Box
      p={2}
      w={"60%"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"lg"}
      rounded={"lg"}
      pos={"relative"}
      zIndex={1}
    >
      <HStack>
        <Heading size="sm" pl={4}>
          {selected.length} tokens selected
        </Heading>
        <Spacer />
        <Button isLoading={loading} minW={100} colorScheme="red">
          Stake
        </Button>
        <Button isLoading={loading} minW={100} colorScheme="red">
          Unstake
        </Button>
      </HStack>
    </Box>
  );
};
