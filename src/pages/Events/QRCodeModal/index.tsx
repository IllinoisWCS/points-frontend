import React, { useState } from 'react';
import {
  Modal,
  ModalCloseButton,
  ModalHeader,
  HStack,
  ModalOverlay,
  ModalBody,
  ModalContent,
  Box,
  Switch
} from '@chakra-ui/react';
import { QRCodeModalProps } from './types';
import EventQRCode from '../EventQRCode';

const QRCodeModal = (props: QRCodeModalProps): React.ReactElement => {
  const [isToggled, toggleIsToggled] = useState(true);
  const { open, event, toggleModal } = props;

  const handleToggleColor = (): void => {
    toggleIsToggled(!isToggled);
  };

  const clearAndToggle = (): void => {
    toggleModal();
  };

  return (
    <Modal isOpen={open} onClose={clearAndToggle} isCentered>
      <ModalOverlay />
      <ModalContent p="10">
        <ModalCloseButton />
        <ModalHeader>
          <Box>{event?.name} QR Code</Box>
        </ModalHeader>
        <ModalBody>
          <HStack justifyContent="space-between" mb={4}>
            <Box>Event Key: {event?.key}</Box>
            <Box>
              <Switch
                size="md"
                onChange={() => {
                  handleToggleColor();
                }}
                defaultChecked
                sx={{
                  '.chakra-switch__track': {
                    bg: isToggled ? '#d4696a' : '#000000'
                  }
                }}
              />
            </Box>
          </HStack>
          {event?.key ? (
            <Box>
              <EventQRCode
                eventKey={event?.key}
                size={320}
                color={isToggled ? '#d4696a' : '#000000'}
              />
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
