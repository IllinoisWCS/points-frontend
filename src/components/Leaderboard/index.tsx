import * as React from 'react';
import { Profile } from '../../types/profile';
// import { createColumn } from 'react-chakra-pagination';
import {
  Box,
  Heading,
  Skeleton,
  Input,
  HStack,
  Center,
  Table,
  Thead,
  Tbody,
  Button,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex
} from '@chakra-ui/react';
import { LuSearch, LuChevronLeft, LuChevronRight } from 'react-icons/lu';

import { useQuery } from 'react-query';
import axiosInstance from '../../api';

export interface LeaderboardProfile extends Profile {
  rank: number;
}

// const columnHelper = createColumn<LeaderboardProfile>();

// const columns = [
//   columnHelper.accessor('rank', {
//     header: () => 'Rank',
//     cell: (props) => props.getValue()
//   }),
//   columnHelper.accessor('name', {
//     header: () => 'Name',
//     cell: (info) => info.getValue()
//   }),
//   columnHelper.accessor('points', {
//     header: () => 'Points',
//     cell: (info) => info.renderValue()
//   })
// ];

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

  const [currentPage, setCurrentPage] = React.useState(1);
  const [startIdx, setStartIdx] = React.useState(0);
  const [endIdx, setEndIdx] = React.useState(20);
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

  const [numPages, setNumPages] = React.useState(
    Math.trunc(
      tableData
        ? tableData?.length / 20 + (tableData?.length % 20 !== 0 ? 1 : 0)
        : 7
    )
  );

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const updateSearch = (searchValue: string) => {
    console.log('Searching!', searchValue);
    setSearchQuery(searchValue);
    const tableDataFiltered = tableData?.filter((profile) =>
      profile?.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    console.log('c', numPages, tableDataFiltered?.length);
    if (tableDataFiltered?.length === 0) {
      setNumPages(1);
    } else {
      setNumPages(
        Math.trunc(
          tableDataFiltered
            ? tableDataFiltered?.length / 20 +
                (tableDataFiltered?.length % 20 !== 0 ? 1 : 0)
            : 7
        )
      );
    }
    setCurrentPage(1);
    setStartIdx(0);
    setEndIdx(20);
    
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onPressLeft = () => {
    if (!(currentPage === 1)) {
      const cp = currentPage - 1;
      setCurrentPage(currentPage - 1);
      setStartIdx((cp - 1) * 20);
      setEndIdx(cp * 20);
      console.log(currentPage);
      console.log(startIdx, endIdx);
    }
    
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onPressRight = () => {
    if (!(currentPage + 1 > numPages)) {
      const cp = currentPage + 1;
      setCurrentPage(currentPage + 1);
      setStartIdx((cp - 1) * 20);
      setEndIdx(cp * 20);
      console.log(currentPage);
      console.log(startIdx, endIdx);
    }
    
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onPressLast = () => {
    setCurrentPage(numPages);
    setStartIdx((numPages - 1) * 20);
    setEndIdx(numPages * 20);
    console.log(currentPage);
    console.log(startIdx, endIdx);
    
  };

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
            updateSearch(e.target.value);
          }}
        />
      </HStack>
      <Skeleton startColor="gray.100" endColor="gray.200" isLoaded={!isLoading}>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Rank</Th>
                <Th>Name</Th>
                <Th>Points</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tableData
                ?.filter((profile) =>
                  profile?.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                )
                ?.slice(startIdx, endIdx)
                .map((item) => (
                  <Tr key={item?.rank}>
                    <Td>{item?.rank}</Td>
                    <Td>{item?.name}</Td>
                    <Td>{item?.points}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
        {/* <Table
          colorScheme="blue"
          // Fallback component when list is empty
          emptyData={{
            text: 'No users found'
          }}
          totalRegisters={data?.length}
          // page={page}
          // Listen change page event and control the current page using state
          // onPageChange={(page) => {
          //   setPage(page);
          // }}
          columns={columns}
          data={
            tableData?.filter((profile) =>
              profile?.name.toLowerCase().includes(searchQuery.toLowerCase())
            ) ?? []
          }
        /> */}
      </Skeleton>
      <Flex justify="flex-end">
        <HStack>
          <Button onClick={onPressLeft}>
            <LuChevronLeft />
          </Button>
          {currentPage !== numPages ? (
            <Button>{currentPage}</Button>
          ) : (
            <div>
              <br />
            </div>
          )}
          {currentPage !== numPages - 1 ? (
            <div>
              <br />
              <> ... </>
            </div>
          ) : (
            <></>
          )}
          <Button onClick={onPressLast}>{numPages}</Button>
          <Button onClick={onPressRight}>
            <LuChevronRight />
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default ReTable;
