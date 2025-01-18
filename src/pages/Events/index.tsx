import React, { useState } from 'react';
import {
  Button,
  Box,
  Text,
  StackDivider,
  Stack,
  Heading,
  Skeleton,
  IconButton,
  Flex
} from '@chakra-ui/react';

import EventModal from './EventModal';
import { Event } from '../../types/event';
import { getEventDate } from '../../utils/eventDate';
import { useEventQuery } from './useEventQuery';
import { useProfileQuery } from './useProfileQuery';
import { FiEdit2 } from 'react-icons/fi';

const Events = (): React.ReactElement => {
  const [modal, setModal] = useState(false);
  const [event, setEvent] = useState<Event>();
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
    setEvent(undefined);
    setModal(!modal);
    if (reloadOnClose) {
      window.location.reload();
    }
  };

  const handleEditModal = (event: Event): void => {
    setEvent(event);
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
        event={event}
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
              <Flex alignItems="center" gap="5">
                <Text fontSize="lg" fontWeight="medium">
                  {event.name}
                </Text>
                {profileData?.role === 'officer' && (
                  <IconButton
                    aria-label="Edit event"
                    icon={<FiEdit2 />}
                    onClick={() => {
                      handleEditModal(event);
                    }}
                    size="sm"
                    variant="ghost"
                  />
                )}
              </Flex>
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
