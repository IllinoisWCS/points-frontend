import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Text
} from '@chakra-ui/react';
// import { useNavigate } from 'react-router-dom';
import CheckpointQRCode from '../../pages/Points/CheckpointQRCode';

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
  netId,
  checkpointKey
}: PinPointModalProps): JSX.Element => {
  // const navigate = useNavigate();

  /* const handleImageClick = (): void => {
    onClose();
    navigate('/not-authorized');
  }; */
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody textAlign="center" py={6}>
          <Text fontSize="md">{message}</Text>
          {netId && (
            <CheckpointQRCode
              netId={netId}
              checkpointKey={checkpointKey}
              size={160}
              inNotification={true}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PinPointModal;
