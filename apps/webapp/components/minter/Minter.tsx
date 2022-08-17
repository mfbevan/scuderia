import { useState } from "react";
import {
  Button,
  useToast,
  Box,
  useColorModeValue,
  Text,
  Center,
  HStack,
  Stack,
  Image,
} from "@chakra-ui/react";
import { mint } from "@scuderia/lib";
import { useSigner } from "wagmi";
import { Signer } from "ethers";
import { failureToast, successToast } from "../../constants";

const NFT_IMAGE =
  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDQwMCA0MDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbdGV4dCB7IGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7IGZvbnQtc2l6ZTogMjFweDt9IC5oMSB7Zm9udC1zaXplOiA0MHB4OyBmb250LXdlaWdodDogNjAwO31dXT48L3N0eWxlPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjZmZjZmNmIiAvPjx0ZXh0IGNsYXNzPSJoMSIgeD0iNTAiIHk9IjcwIj5TY3VkZXJpYSBORlQ8L3RleHQ+PHRleHQgeD0iMTAwIiB5PSIyNDAiIHN0eWxlPSJmb250LXNpemU6MTAwcHg7Ij7wn4+O77iP8J+SqDwvdGV4dD48dGV4dCB4PSIyMCIgeT0iMzUwIiBzdHlsZT0iZm9udC1zaXplOjI4cHg7Ij4gPC90ZXh0Pjx0ZXh0IHg9IjIwIiB5PSIzODAiIHN0eWxlPSJmb250LXNpemU6MTRweDsiPjB4PC90ZXh0Pjwvc3ZnPg==";

export const Minter = () => {
  const [loading, setLoading] = useState(false);
  const { data } = useSigner();
  const signer = data as Signer;
  const toast = useToast();

  const [qty, setQty] = useState(1);

  const handleMint = async () => {
    setLoading(true);
    try {
      await mint({ signer, quantity: qty });
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
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"280px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${NFT_IMAGE})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
        >
          <Image
            rounded={"lg"}
            height={280}
            width={280}
            objectFit={"cover"}
            src={NFT_IMAGE}
            alt="nft-sample"
          />
        </Box>
        <Stack pt={10} align={"center"}>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            Scuderia NFT
          </Text>
          <HStack>
            <Button onClick={handleDecQty}>-</Button>
            <Text fontSize="md" px={4}>
              {qty}
            </Text>
            <Button onClick={handleIncQty}>+</Button>
          </HStack>
          <Button
            onClick={handleMint}
            isLoading={loading}
            minW={140}
            colorScheme="red"
          >
            Mint
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};
