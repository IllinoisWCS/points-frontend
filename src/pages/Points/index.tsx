import React from 'react';
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
import { getEventDate } from '../../utils/eventDate';
import { Profile } from '../../types/profile';

const Points = (): React.ReactElement => {
  const { isLoading, isError, error, data } = useQuery<Profile, Error>(
    ['get-profile'],
    async () => {
      const res = await axiosInstance.get('/profile');
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

  return (
    <Box>
      <Heading size="lg">Points</Heading>
      <Center mb="5">
        <Text fontSize="xl">
          {`You have ${data?.points ?? 0} ${
            data?.points === 1 ? 'point' : 'points'
          }.`}
        </Text>
      </Center>
      <Skeleton startColor="gray.100" endColor="gray.200" isLoaded={!isLoading}>
        <Stack
          divider={<StackDivider />}
          borderRadius="10"
          border="1px"
          borderColor="gray.100"
        >
          {data?.events?.map((event, id) => (
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
