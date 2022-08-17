import { useState } from "react";
import {
  Button,
  useToast,
  Box,
  useColorModeValue,
  Text,
  Center,
  HStack,
  VStack,
  Heading,
  Stack,
  Image,
} from "@chakra-ui/react";
import { IScuderiaNFT } from "@scuderia/lib";

export const TokenCard = ({ token }: { token: IScuderiaNFT }) => (
  <Box
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
    <Box
      rounded={"lg"}
      mt={-12}
      pos={"relative"}
      height={"170px"}
      _after={{
        transition: "all .3s ease",
        content: '""',
        w: "full",
        h: "full",
        pos: "absolute",
        top: 5,
        left: 0,
        backgroundImage: `url(${token.image})`,
        filter: "blur(15px)",
        zIndex: -1,
      }}
    >
      <Image
        rounded={"lg"}
        height={180}
        width={180}
        objectFit={"cover"}
        src={token.image}
        alt={token.name}
      />
    </Box>
    <Stack pt={5} align={"center"}>
      <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
        Scuderia NFT
      </Text>
      <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
         #{token.tokenId}
      </Heading>
      <Stack direction={"row"} align={"center"}>
      </Stack>
    </Stack>
  </Box>
);
