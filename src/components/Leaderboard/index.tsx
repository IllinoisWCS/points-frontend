import * as React from 'react';
import { Profile } from '../../types/profile';
import { Table, createColumn } from 'react-chakra-pagination';
import {
  Box,
  Heading,
  Skeleton,
  Input,
  HStack,
  Center
} from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';

import { useQuery } from 'react-query';
import axiosInstance from '../../api';

export interface LeaderboardProfile extends Profile {
  rank: number;
}

const columnHelper = createColumn<LeaderboardProfile>();

const columns = [
  columnHelper.accessor('rank', {
    header: () => 'Rank',
    cell: (props) => props.getValue()
  }),
  columnHelper.accessor('name', {
    header: () => 'Name',
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('points', {
    header: () => 'Points',
    cell: (info) => info.renderValue()
  })
];

const ReTable = (): React.ReactElement => {
  const { isLoading, isError, error, data } = useQuery<
    LeaderboardProfile[],
    Error
  >(['get-users'], async () => {
    const res = await axiosInstance.get('/users');
    return res.data;
  });

  if (isError) {
    console.log(error);
    return (
      <Box>
        <Heading size="lg">Temporary Error</Heading>
      </Box>
    );
  }

  const [page, setPage] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredData = data?.filter((profile) => profile.role !== 'officer');

  const tableData = filteredData?.map((profile, index) =>
    profile.name
      ? {
          rank: index + 1,
          name:
            profile.name.split(' ')[0] +
              ' ' +
              String(profile?.name?.split(' ').at(-1)?.[0]) ?? '',
          events: profile.events,
          points: profile.points,
          role: profile.role
        }
      : null
  );
  return (
    <Box>
      <HStack>
        <Center w="40px" h="40px">
          <LuSearch size={25} />
        </Center>
        <Input
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </HStack>
      <Skeleton startColor="gray.100" endColor="gray.200" isLoaded={!isLoading}>
        <Table
          colorScheme="blue"
          // Fallback component when list is empty
          emptyData={{
            text: 'No users found'
          }}
          totalRegisters={data?.length}
          page={page}
          // Listen change page event and control the current page using state
          onPageChange={(page) => {
            setPage(page);
          }}
          columns={columns}
          data={
            tableData?.filter((profile) =>
              profile?.name.toLowerCase().includes(searchQuery.toLowerCase())
            ) ?? []
          }
        />
      </Skeleton>
    </Box>
  );
};

export default ReTable;
