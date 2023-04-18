import React, { useMemo, useState, BaseSyntheticEvent } from 'react';
import {
  TableContainer,
  VStack,
  Heading,
  Text,
  Button,
  Input,
  Box,
  Center,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';

import { Table, Thead, Tbody, Tr, Th, Td, chakra } from '@chakra-ui/react'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy } from 'react-table'

import axiosInstance from '../../api';
import axios from 'axios';
import { toastError, toastSuccess } from '../../utils/toast';
import { Profile } from '../../types/profile';
import { FiColumns } from 'react-icons/fi';
import { ColumnDef } from '@tanstack/react-table';
import { ReTable } from '../../components/Leaderboard';
// import { COLUMNS } from '../../components/Leaderboard/columns';


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

  const cols = useMemo<ColumnDef<Profile>[]>(
    () => [
        {
            header: 'Rank',
            cell: (row) => row.renderValue(),
            accessorKey: 'rank',
        },
        {
            header: 'Name',
            cell: (row) => row.renderValue(),
            accessorKey: 'name',
        },
        {
            header: 'Points',
            cell: (row) => row.renderValue(),
            accessorKey: 'points',
        },
        {
            header: 'Events Attended',
            cell: (row) => row.renderValue(),
            accessorKey: 'events',
        },
    ],
    []
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
      <ReTable />

      </VStack>

    </Box>
  );
};

export default CheckIn;
