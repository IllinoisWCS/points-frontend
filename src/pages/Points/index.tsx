import React, { useState } from 'react';
import {
  Heading,
  Box,
  Text,
  StackDivider,
  Center,
  Stack,
  VStack,
  HStack,
  Skeleton
} from '@chakra-ui/react';
import { useQuery } from 'react-query';

import axiosInstance from '../../api';
import { Event } from '../../types/event';
import { getEventDate } from '../../utils/eventDate';

const Points = (): React.ReactElement => {
  const [events, setEvents] = useState<Event[]>([]);
  const [points, setPoints] = useState(0);

  const { isLoading, isError, error } = useQuery<Promise<void>, Error>(
    ['get-profile'],
    async () => {
      await axiosInstance.get('/profile').then((res) => {
        setEvents(res.data.events);
        setPoints(res.data.points);
      });
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

  return (
    <Box>
      <Heading size="lg">Points</Heading>
      <Center mb="5">
        <Text fontSize="xl">
          {`You have ${points} ${points === 1 ? 'point' : 'points'}.`}
        </Text>
      </Center>
      <Skeleton startColor="gray.100" endColor="gray.200" isLoaded={!isLoading}>
        <Stack
          bg="white"
          divider={<StackDivider />}
          borderRadius="10"
          border="1px"
          borderColor="gray.100"
        >
          {events.map((event, id) => (
            <HStack justify="space-between" key={id} p="5">
              <Stack>
                <Text fontSize="lg" fontWeight="medium">
                  {event.name}
                </Text>
                <Text className="muted">{getEventDate(event)}</Text>
              </Stack>
              <VStack>
                <Text fontSize="l" fontWeight="medium">
                  {event.points}
                </Text>
                <Text className="muted">
                  {event.points === 1 ? 'point' : 'points'}
                </Text>
              </VStack>
            </HStack>
          ))}
        </Stack>
      </Skeleton>
    </Box>
  );
};

export default Points;
