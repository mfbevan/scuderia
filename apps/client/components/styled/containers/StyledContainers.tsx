import { chakra, Flex } from "@chakra-ui/react";

export const PageContainer = chakra(Flex, {
  baseStyle: {
    mx: "auto",
    flexDirection: "column",
    w: "100vw",
    h: "100vh",
    overflow: "hidden",
  },
});
