import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Image,
  Text
} from '@chakra-ui/react';

interface PinPointModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  message: string;
}

const PinPointModal = ({
  isOpen,
  onClose,
  image,
  message
}: PinPointModalProps): JSX.Element => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody textAlign="center" py={6}>
          <Image src={image} alt="PinPoint" mx="auto" mb={4} />
          <Text fontSize="md">{message}</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PinPointModal;
