import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Text
} from '@chakra-ui/react';
import CheckpointQRCode from '../../pages/Points/CheckpointQRCode';
import checkmark from '../../assets/checkmark.png';

interface PinPointModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  message: string;
  netId?: string;
  checkpointKey?: string;
}

const PinPointModal = ({
  isOpen,
  onClose,
  message,
  netId
}: PinPointModalProps): JSX.Element => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody textAlign="center" py={6}>
          <Text fontSize="md" mb={4}>
            {message}
          </Text>
          {netId ? (
            <CheckpointQRCode netId={netId} size={160} inNotification={true} />
          ) : (
            <img
              src={checkmark}
              alt="Redeemed"
              style={{ width: '100px', margin: '0 auto' }}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PinPointModal;
