import React, { useState } from 'react';
import {
  Modal,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  ModalContent,
  Box,
  Button,
  FormLabel,
  ModalFooter
} from '@chakra-ui/react';
import { ConfirmationModalProps } from './types';
import { useMutation } from 'react-query';
import axiosInstance from '../../../api/api';
import { Event } from '../../../types/event';

const ConfirmationModal = (
  props: ConfirmationModalProps
): React.ReactElement => {
  const [hasDeleted, setHasDeleted] = useState(false);
  const { open, event, toggleConfirmationModal } = props;

  const deleteEvent = useMutation({
    mutationFn: async (event: Event): Promise<void> => {
      await axiosInstance.delete(`/events/${event._id}`);
    }
  });

  const handleEventDeletion = async (): Promise<void> => {
    if (!event) return;

    await deleteEvent.mutateAsync(event);
    if (!hasDeleted) {
      setHasDeleted(true);
    }

    window.location.reload();
  };

  const clearAndToggleOnNo = (): void => {
    toggleConfirmationModal();
  };

  return (
    <Modal isOpen={open} onClose={clearAndToggleOnNo} isCentered>
      <ModalOverlay />
      <ModalContent p="10">
        <ModalCloseButton />
        <ModalHeader>
          <Box>{event?.name} Event Deletion</Box>
        </ModalHeader>
        <ModalBody>
          <FormLabel>Do you really want to delete this event?</FormLabel>
          <ModalFooter>
            <Button
              onClick={() => {
                handleEventDeletion().catch(console.error);
              }}
              style={{ marginRight: '10px' }}
            >
              Yes
            </Button>
            <Button onClick={clearAndToggleOnNo}>No</Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
