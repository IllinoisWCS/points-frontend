import * as React from 'react';
import { Profile } from '../../types/profile';
import { Table, createColumn } from 'react-chakra-pagination';
import { Box, Heading, Skeleton } from '@chakra-ui/react';

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
  }),
  columnHelper.accessor('num_events', {
    header: () => 'Events Attended',
    cell: (props) => props.getValue()
  }),
  columnHelper.accessor('netId', {
    header: () => 'NetId',
    cell: (info) => info.getValue()
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

  const tableData = data?.map((profile, index) => ({
    rank: index + 1,
    name: profile.name,
    events: profile.events,
    points: profile.points,
    num_events: profile.events.length,
    netId: profile.netId
  }));
  return (
    <Box>
      <Skeleton startColor="gray.100" endColor="gray.200" isLoaded={!isLoading}>
        <Table
          colorScheme="blue"
          // Fallback component when list is empty
          emptyData={{
            text: 'Nobody users found'
          }}
          totalRegisters={data?.length}
          page={page}
          // Listen change page event and control the current page using state
          onPageChange={(page) => {
            setPage(page);
          }}
          columns={columns}
          data={tableData ?? []}
        />
      </Skeleton>
    </Box>
  );
};

export default ReTable;
