import React from 'react';
import {
  Heading,
  Box,
  Text,
  StackSeparator,
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
      try {
        const res = await axiosInstance.get('/profile');
        return res.data;
      } catch (err: unknown) {
        if (
          err instanceof Error &&
          (err as any).response &&
          ((err as any).response.status === 401 ||
            (err as any).response.status === 403)
        ) {
          return null;
        }
        throw err;
      }
    },
    {
      retry: (failureCount, error: any) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          return false;
        }
        return failureCount < 3;
      }
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
      <Skeleton css={{
        "--start-color": "gray.100",
        "--end-color": "gray.200",
        }} loading={isLoading}>
        <Stack
          separator={<StackSeparator />}
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
