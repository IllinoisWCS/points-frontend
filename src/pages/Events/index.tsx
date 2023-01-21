import React, { useEffect, useState } from 'react';
import { Button, Box, Text, StackDivider, Stack } from '@chakra-ui/react';

import EventModal from './EventModal';
import axiosInstance from '../../api';
import { getEventDate } from '../../utils/eventDate';
import { Event } from '../../types/event';

import './style.css';

const Events = (): React.ReactElement => {
  const [events, setEvents] = useState<Event[]>([]);
  const [modal, setModal] = useState(false);
  const [reloadOnClose, setReloadOnClose] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    axiosInstance.get('/events').then((res) => {
      setEvents(res.data);
    });
  }, []);

  const handleToggleModal = (): void => {
    setModal(!modal);
    if (reloadOnClose) {
      window.location.reload();
    }
  };

  const handleReloadOnClose = (): void => {
    setReloadOnClose(!reloadOnClose);
  };

  return (
    <Box>
      <EventModal
        open={modal}
        toggleModal={handleToggleModal}
        reloadOnClose={handleReloadOnClose}
      />
      <Button onClick={handleToggleModal} mb="5">
        Create New Event
      </Button>
      <Stack
        divider={<StackDivider />}
        bg="white"
        border="1px"
        borderColor="gray.100"
        borderRadius="10"
      >
        {events.map((event, idx) => (
          <Box key={idx} p="5">
            <Text fontSize="xl" fontWeight="medium">
              {event.name}
            </Text>
            <Text className="muted">{getEventDate(event)}</Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Events;
