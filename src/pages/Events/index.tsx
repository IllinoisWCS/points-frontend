import React, { useState } from 'react';
import {
  Button,
  Box,
  Text,
  StackDivider,
  Stack,
  Heading,
  Skeleton
} from '@chakra-ui/react';
import { useQuery } from 'react-query';

import EventModal from './EventModal';
import axiosInstance from '../../api';
import { getEventDate } from '../../utils/eventDate';
import { Event } from '../../types/event';

const Events = (): React.ReactElement => {
  const [modal, setModal] = useState(false);
  const [reloadOnClose, setReloadOnClose] = useState(false);

  const { isLoading, isError, error, data } = useQuery<Event[], Error>(
    ['get-events'],
    async () => {
      const res = await axiosInstance.get('/events');
      return res.data;
    }
  );

  if (isError) {
    console.log(error);
    return (
      <Box>
        <Heading size="lg">Temporary Error</Heading>
      </Box>
    );
  }

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
      <Skeleton startColor="gray.100" endColor="gray.200" isLoaded={!isLoading}>
        <Stack
          divider={<StackDivider />}
          border="1px"
          borderColor="gray.100"
          borderRadius="10"
        >
          {data?.map((event, idx) => (
            <Box key={idx} p="5">
              <Text fontSize="lg" fontWeight="medium">
                {event.name}
              </Text>
              <Text className="muted">{getEventDate(event)}</Text>
            </Box>
          ))}
        </Stack>
      </Skeleton>
    </Box>
  );
};

export default Events;
