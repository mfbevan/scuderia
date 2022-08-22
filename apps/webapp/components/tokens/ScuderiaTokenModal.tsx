import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Image,
  HStack,
} from "@chakra-ui/react";
import { IScuderiaNFT } from "@scuderia/lib";
import { useState } from "react";
import { TokenAttribute } from "./TokenAttribute";

const ScuderiaTokenModal = ({
  token,
  isOpen,
  onClose,
}: {
  token: IScuderiaNFT;
  isOpen: boolean;
  onClose(): void;
}) => {
  const [loading, setLoading] = useState(false);

  const handleStake = async () => {
    setLoading(true);

    setLoading(false);
  }


  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent textAlign="center" minW={350}>
          <ModalHeader>Scuderia NFT #{token.tokenId}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
              rounded={"lg"}
              height={300}
              width={300}
              mx="auto"
              objectFit={"cover"}
              src={token.image}
              alt={token.name}
            />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ScuderiaTokenModal;
