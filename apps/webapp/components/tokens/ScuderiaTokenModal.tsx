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
} from "@chakra-ui/react";
import { IScuderiaNFT } from "@scuderia/lib";

const ScuderiaTokenModal = ({
  token,
  isOpen,
  onClose,
}: {
  token: IScuderiaNFT;
  isOpen: boolean;
  onClose(): void;
}) => {
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent textAlign="center" minW={{ base: 350, md: 550 }}>
          <ModalHeader>Scuderia NFT #{token.tokenId}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
              rounded={"lg"}
              height={{ base: 300, md: 500 }}
              width={{ base: 300, md: 500 }}
              objectFit={"cover"}
              src={token.image}
              alt={token.name}
              mx="auto"
              px={3}
            />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ScuderiaTokenModal;
