import React from 'react';
import {
  Button,
  Modal,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  ModalContent,
  Center,
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
        <ModalHeader>{event?.name} QR Code</ModalHeader>
        <ModalBody>
          {event?.key ? (
            <Box>
              Event key: {event?.key}
              <Center>
                <Box>
                  <EventQRCode eventKey={event?.key} size={256} />
                  <Button mr={3} mt={5}>
                    Download as PNG
                  </Button>
                  <Button mt={5}>Download as SVG</Button>
                </Box>
              </Center>
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
