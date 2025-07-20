import React, { useState, useEffect } from 'react';
import {
  Dialog,
  HStack,
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

  const useWindowDimensions = (): { /* height: number; */ width: number; } => {
    const [dimensions, setDimensions] = useState({
      width: window.innerWidth
      // height: window.innerHeight,
    });

    useEffect(() => {
      const handleResize = (): void => {
        setDimensions({
          width: window.innerWidth /* height: window.innerHeight */
        });
      };
      window.addEventListener('resize', handleResize);
      return () => { window.removeEventListener('resize', handleResize); };
    }, []);

    return dimensions;
  };

  const { /* height, */ width } = useWindowDimensions();

  return (
    <Dialog.Root open={open} onClose={clearAndToggle} isCentered>
      <Dialog.Backdrop />
      <Dialog.Content p="10">
        <Dialog.CloseTrigger />
        <Dialog.Header>
          <Box>{event?.name} QR Code</Box>
        </Dialog.Header>
        <Dialog.Body>
          <HStack justifyContent="space-between" mb={4}>
            <Box>Event Key: {event?.key}</Box>
            <Box>
              <Switch.Root
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
                size={width < 448 ? width - 128 : 320}
                color={isToggled ? '#d4696a' : '#000000'}
              />
            </Box>
          ) : (
            'Event key not found'
          )}
        </Dialog.Body>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default QRCodeModal;
