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

import EventModal from './EventModal';
import { getEventDate } from '../../utils/eventDate';
import { useEventQuery } from './useEventQuery';
import { useProfileQuery } from './useProfileQuery';

const Events = (): React.ReactElement => {
  const [modal, setModal] = useState(false);
  const [reloadOnClose, setReloadOnClose] = useState(false);

  const {
    data: eventData,
    error: eventError,
    isLoading: eventIsLoading,
    isError: eventIsError
  } = useEventQuery();
  const {
    data: profileData,
    error: profileError,
    isError: profileIsError
  } = useProfileQuery();

  if (eventIsError) {
    console.log(eventError);
    return (
      <Box>
        <Heading size="lg">Temporary Error</Heading>
      </Box>
    );
  }

  if (profileIsError) {
    console.log(profileError);
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

      {profileData?.role === 'officer' ? (
        <Button onClick={handleToggleModal} mb="5">
          Create New Event
        </Button>
      ) : (
        <div></div>
      )}

      <Skeleton
        startColor="gray.100"
        endColor="gray.200"
        isLoaded={!eventIsLoading}
      >
        <Stack
          divider={<StackDivider />}
          border="1px"
          borderColor="gray.100"
          borderRadius="10"
        >
          {eventData?.map((event, idx) => (
            <Box key={idx} p="5">
              <Text fontSize="lg" fontWeight="medium">
                {event.name}
              </Text>
              <Text className="muted">{getEventDate(event)}</Text>
              <Text className="muted" fontSize="sm">
                {event.key ?? ' '}
              </Text>
            </Box>
          ))}
        </Stack>
      </Skeleton>
    </Box>
  );
};

export default Events;
