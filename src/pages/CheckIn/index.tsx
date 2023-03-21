import React, { useState, BaseSyntheticEvent } from 'react';
import {
  Table,
  TableContainer,
  VStack,
  Heading,
  Text,
  Button,
  Input,
  Box,
  Center,
  Thead,
  Tr,
  Th,
  Tbody,
  Td
} from '@chakra-ui/react';
import { useQuery } from 'react-query';

import axiosInstance from '../../api';
import { toastError, toastSuccess } from '../../utils/toast';
import { Profile } from '../../types/profile';
import { FiColumns } from 'react-icons/fi';

const CheckIn = (): React.ReactElement => {
  const [eventKey, setEventKey] = useState('');
  const [eventKeyError, setEventKeyError] = useState(false);

  const handleChangeKey = (event: BaseSyntheticEvent): void => {
    setEventKey(event.target.value);
  };

  const handleSubmit = (): void => {
    const isEventKeyError = eventKey === '';
    setEventKeyError(isEventKeyError);
    if (isEventKeyError) return;

    axiosInstance
      .patch('/profile', { eventKey })
      .then((res) => {
        toastSuccess(res.data.message);
      })
      .catch((err) => {
        toastError(err.response.data.message);
        console.log(err);
      });
  };

  // const { isError, error } = useQuery<Promise<void>, Error>(
  //   ['get-profile'],
  //   async () => {
  //     await axiosInstance.get('/profile');
  //   }
  // );
  const { isLoading, isError, error, data } = useQuery<Profile[], Error>(
    ['get-Users'],
    async () => {
      const res = await axiosInstance.get('/Users');
      return res.data;
    }
  );

  // if (isError) {
  //   console.log(error);
  //   return (
  //     <Box>
  //       <Heading size="lg">Temporary Error</Heading>
  //     </Box>
  //   );
  // }

  return (
    <Box>
      <Box>
        <Heading size="lg" pb="25px">
          Check-in
        </Heading>
        <VStack
          align="unset"
          spacing="5"
          bg="white"
          p="5"
          borderRadius="10"
          border="1px"
          borderColor="gray.100"
        >
          <Text fontSize="lg" fontWeight="medium">
            Event Key
          </Text>
          <Input
            isInvalid={eventKeyError}
            placeholder="Enter the event key..."
            value={eventKey}
            onChange={handleChangeKey}
          />
          <Button onClick={handleSubmit}>Check-in</Button>
        </VStack>
      </Box>
      <VStack
          align="unset"
          spacing="5"
          bg="white"
          p="5"
          borderRadius="10"
          border="1px"
          borderColor="gray.100"
        >
      <Heading size="lg" pb="25px">
        <Center>Leaderboard</Center>
      </Heading>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Rank</Th>
              <Th>Name</Th>
              <Th isNumeric>Points</Th>
              <Th isNumeric>Events Attended</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((user, idx) => (
            <Tr>
              <Td>{idx + 1}</Td>
              <Td>{user.name}</Td>
              <Td isNumeric>{user.points}</Td>
              <Td isNumeric>{user.events.length}</Td>
            </Tr>
          ))}
          </Tbody>
          {/* <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot> */}
        </Table>
      </TableContainer>
      </VStack>
    </Box>
  );
};

export default CheckIn;
