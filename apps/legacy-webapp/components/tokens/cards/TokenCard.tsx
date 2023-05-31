import {
  Box,
  useColorModeValue,
  Text,
  Heading,
  Stack,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { IScuderiaNFT } from "@scuderia/lib";
import { useContext } from "react";
import StakingContext from "../../../providers/context/StakingContext";
import { StakedIcon, UnstakedIcon } from "../../icons/StakeIcons";
import ScuderiaTokenModal from "../ScuderiaTokenModal";

export const TokenCard = ({ token }: { token: IScuderiaNFT }) => {
  const {stakeStatus} = token;
  const { select, selected } = useContext(StakingContext);
  const isSelected = selected.includes(token);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSelect = () => select(token);

  const stakeColor = stakeStatus?.staked ? "red.500" : "gray.900";

  return (
    <Box
      onClick={handleSelect}
      p={6}
      maxW={"220px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={isSelected ? "0 0 8px 4px #f59090" : "lg"}
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
          filter: "blur(5px)",
          zIndex: -1,
        }}
      >
        <Image
          // onClick={onOpen}
          rounded={"lg"}
          height={180}
          width={180}
          objectFit={"cover"}
          src={token.image}
          alt={token.name}
        />
      </Box>
      <Stack pt={8} align={"center"} color={stakeColor} spacing={2}>
        <Text fontSize={"sm"} textTransform={"uppercase"} fontWeight={500}>
          Scuderia NFT #{token.tokenId}
        </Text>
        {
          stakeStatus?.staked ? <StakedIcon stake={stakeStatus} /> : <UnstakedIcon />
        }
        <Stack direction={"row"} align={"center"}></Stack>
      </Stack>
      <ScuderiaTokenModal token={token} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
