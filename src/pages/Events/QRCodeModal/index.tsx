import React from 'react';
import {
  Modal,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  ModalContent,
  Box
} from '@chakra-ui/react';
import { QRCodeModalProps } from './types';
import EventQRCode from '../EventQRCode';

const QRCodeModal = (props: QRCodeModalProps): React.ReactElement => {
  const { open, event, toggleModal } = props;

  const clearAndToggle = (): void => {
    toggleModal();
  };

  return (
    <Modal isOpen={open} onClose={clearAndToggle} isCentered>
      <ModalOverlay />
      <ModalContent p="10" minW="30%">
        <ModalCloseButton />
        <ModalHeader>
          {event?.name} QR Code | {event?.key}
        </ModalHeader>
        <ModalBody>
          {event?.key ? (
            <Box>
              <EventQRCode eventKey={event?.key} size={256} />
            </Box>
          ) : (
            'Event key not found'
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default QRCodeModal;
