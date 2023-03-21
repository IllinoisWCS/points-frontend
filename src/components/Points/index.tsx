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

import { getEventDate } from '../../utils/eventDate';

import { PointsProps } from './types';

const Points = (props: PointsProps): React.ReactElement => {
  const { isLoading, isError, error, data } = props;

  if (isError) {
    console.log(error);
    return (
      <Box>
        <Heading size="lg">Temporary Error</Heading>
      </Box>
    );
  }
  // scroll bar component is the maxHeight stuff
  return (
    <Box>
      <Heading size="lg">Points</Heading>
      <Box maxHeight="380px" overflowY="scroll" paddingTop="5px">
        <Center mb="5">
          <Text fontSize="xl">
            {`You have ${data?.points ?? 0} ${
              data?.points === 1 ? 'point' : 'points'
            }.`}
          </Text>
        </Center>
        <Skeleton
          startColor="gray.100"
          endColor="gray.200"
          isLoaded={!isLoading}
        >
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
    </Box>
  );
};

export default Points;
