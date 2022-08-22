import { Box } from "@chakra-ui/react";

export const StakingBar = () => (
<Box
      onClick={handleSelect}
      p={6}
      maxW={"220px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"lg"}
      rounded={"lg"}
      pos={"relative"}
      zIndex={1}
      pt="60px"
    >
      Some text
      </Box>
)

