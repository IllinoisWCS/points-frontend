import React, { useEffect, useState } from 'react';
import {
  Heading,
  Box,
  Text,
  StackDivider,
  Center,
  Stack,
  VStack,
  HStack
} from '@chakra-ui/react';

import axiosInstance from '../../api';
import { Event } from '../../types/event';
import { getEventDate } from '../../utils/eventDate';

// TOOD: migrate to react query
const Points = (): React.ReactElement => {
  const [events, setEvents] = useState<Event[]>([]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    axiosInstance.get('/profile').then((res) => {
      setEvents(res.data.events);
      setPoints(res.data.points);
    });
  }, []);

  return (
    <Box>
      <Heading size="lg">Points</Heading>
      <Center mb="5">
        <Text fontSize="xl">
          {`You have ${points} ${points === 1 ? 'point' : 'points'}.`}
        </Text>
      </Center>
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
    </Box>
  );
};

export default Points;
