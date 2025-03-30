import React from 'react';
import { Heading, VStack } from '@chakra-ui/react';
import ReTable from '../../components/Leaderboard';

const LeaderBoard = (): React.ReactElement => {
  // this was previously uncommented for the leaderboard in checkin
  // const cols = useMemo<ColumnDef<Profile>[]>(
  //   () => [
  //       {
  //           header: 'Rank',
  //           cell: (row) => row.renderValue(),
  //           accessorKey: 'rank',
  //       },
  //       {
  //           header: 'Name',
  //           cell: (row) => row.renderValue(),
  //           accessorKey: 'name',
  //       },
  //       {
  //           header: 'Points',
  //           cell: (row) => row.renderValue(),
  //           accessorKey: 'points',
  //       },
  //       {
  //           header: 'Events Attended',
  //           cell: (row) => row.renderValue(),
  //           accessorKey: 'events',
  //       },
  //   ],
  //   []
  //  );

  return (
    <div>
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
          LeaderBoard
        </Heading>
        <ReTable />
      </VStack>
    </div>
  );
};

export default LeaderBoard;
