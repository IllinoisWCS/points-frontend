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

  const handleDownloadPNG = (): void => {};

  const handleDownloadSVG = (): void => {};

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
            <Center>
              <Box>
                <EventQRCode eventKey={event?.key} size={256} />
                <Button onClick={handleDownloadPNG} mr={3} mt={5}>
                  Download as PNG
                </Button>
                <Button onClick={handleDownloadSVG} mt={5}>
                  Download as SVG
                </Button>
              </Box>
            </Center>
          ) : (
            'Event key not found'
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default QRCodeModal;
