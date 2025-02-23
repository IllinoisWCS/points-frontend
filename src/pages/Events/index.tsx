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

import { Event } from '../../types/event';
import EventModal from './EventModal';
import QRModal from './QRCodeModal';
import { getEventDate } from '../../utils/eventDate';
import { useEventQuery } from './useEventQuery';
import { useProfileQuery } from './useProfileQuery';
import { FiEdit2 } from 'react-icons/fi';

const Events = (): React.ReactElement => {
  const [event, setEvent] = useState<Event>();
  const [eventModal, setEventModal] = useState(false);
  const [qRModal, setQRModal] = useState(false);
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

  const handleToggleEventModal = (): void => {
    setEvent(undefined);
    setEventModal(!eventModal);
    if (reloadOnClose) {
      window.location.reload();
    }
  };

  const handleEditModal = (event: Event): void => {
    setEvent(event);
    setEventModal(!eventModal);
    if (reloadOnClose) {
      window.location.reload();
    }
  };

  const handleToggleQR = (event?: Event): void => {
    setEvent(event);
    setQRModal(!qRModal);
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
        open={eventModal}
        event={event}
        toggleModal={handleToggleEventModal}
        reloadOnClose={handleReloadOnClose}
      />

      <QRModal
        open={qRModal}
        event={event}
        toggleModal={() => {
          handleToggleQR(event);
        }}
      />

      {profileData?.role === 'officer' ? (
        <Button onClick={handleToggleEventModal} mb="5">
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
            <Box key={idx} p="5" position="relative">
              <Box>
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
              {event.key && (
                <Box
                  position="absolute"
                  top="50%"
                  right="5"
                  transform="translateY(-50%)"
                >
                  <Button
                    onClick={() => {
                      handleToggleQR(event);
                    }}
                    mb="5"
                  >
                    Show QR code
                  </Button>
                </Box>
              )}
            </Box>
          ))}
        </Stack>
      </Skeleton>
    </Box>
  );
};

export default Events;
