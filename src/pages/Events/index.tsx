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
import { useMutation } from 'react-query';

import axiosInstance from '../../api';
import { Event, NewEvent } from '../../types/event';
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
  const createOfficeHourEvent = useMutation({
    mutationFn: async (event: NewEvent): Promise<void> => {
      await axiosInstance.post('/events', event);
    }
  });

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

  const handleCreateOfficeHourEvent = async (): Promise<void> => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    // Name: "M/D Open Office" (e.g. "4/3 Open Office")
    const displayMonth = now.getMonth() + 1;
    const displayDay = now.getDate();
    const name = `${displayMonth}/${displayDay} Open Office`;

    const start = new Date(`${year}-${month}-${day}T14:00:00`);
    const end = new Date(`${year}-${month}-${day}T17:30:00`);
    const officeHourEvent: NewEvent = {
      name,
      category: 'other',
      points: 0.5,
      start,
      end,
      private: false
    };
    await createOfficeHourEvent.mutateAsync(officeHourEvent);
    window.location.reload();
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
        <>
          <Button onClick={handleToggleEventModal} mb="5" mr="2">
            Create New Event
          </Button>
          <Button
            onClick={() => {
              void handleCreateOfficeHourEvent();
            }}
            mb="5"
          >
            Create Open Office Event
          </Button>
        </>
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
              <Flex
                direction={{ base: 'column', md: 'row' }}
                justify="space-between"
                align={{ base: 'flex-start', md: 'center' }}
                gap={2}
              >
                <Box>
                  <Flex align="center" gap="2">
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
                  <Button
                    onClick={() => {
                      handleToggleQR(event);
                    }}
                  >
                    Show QR Code
                  </Button>
                )}
              </Flex>
            </Box>
          ))}
        </Stack>
      </Skeleton>
    </Box>
  );
};

export default Events;
