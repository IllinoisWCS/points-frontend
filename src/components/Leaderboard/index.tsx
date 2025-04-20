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

const ReTable = (): React.ReactElement => {
  const { isLoading, isError, error, data } = useQuery<
    LeaderboardProfile[],
    Error
  >(['get-users'], async () => {
    const res = await axiosInstance.get('/users');

    console.log('data length', res.data?.length);
    console.log('data', res.data);
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

  // pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const [startIdx, setStartIdx] = React.useState(0);
  const [endIdx, setEndIdx] = React.useState(20);

  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredData = data?.filter(
    (profile) => profile.name && profile.role !== 'officer'
  );

  console.log('fltered data length', filteredData?.length);
  const tableData = filteredData?.map((profile, index) => ({
    rank: index + 1,
    name:
      profile.name.split(' ')[0] +
        ' ' +
        String(profile?.name?.split(' ').at(-1)?.[0]) ?? '',
    events: profile.events,
    points: profile.points,
    role: profile.role
  }));

  console.log('table data length', tableData?.length);
  console.log(tableData);

  const [numPages, setNumPages] = React.useState(
    Math.trunc(
      tableData
        ? tableData?.length / 20 + (tableData?.length % 20 !== 0 ? 1 : 0)
        : 1
    )
  );

  // fix num pages on reset
  if (tableData?.length) {
    if (
      numPages !==
        Math.trunc(
          tableData?.length / 20 + (tableData?.length % 20 !== 0 ? 1 : 0)
        ) &&
      searchQuery === ''
    ) {
      setNumPages(
        Math.trunc(
          tableData?.length / 20 + (tableData?.length % 20 !== 0 ? 1 : 0)
        )
      );
    }
  }

  // update search value and num pages when search value changed
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const updateSearch = (searchValue: string) => {
    console.log('Searching!', searchValue);
    setSearchQuery(searchValue);
    const tableDataFiltered = searchValue
      ? tableData?.filter((profile) =>
          profile?.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      : tableData;
    console.log('c', numPages, tableDataFiltered?.length);
    if (tableDataFiltered?.length === 0) {
      setNumPages(1);
    } else {
      setNumPages(
        Math.trunc(
          tableDataFiltered
            ? tableDataFiltered?.length / 20 +
                (tableDataFiltered?.length % 20 !== 0 ? 1 : 0)
            : 1
        )
      );
    }
    setCurrentPage(1);
    setStartIdx(0);
    setEndIdx(20);
  };

  // page updates

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onPressLeft = () => {
    if (!(currentPage <= 1)) {
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
    if (!(currentPage >= numPages)) {
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
      </Skeleton>
      <Flex justify="flex-end">
        {numPages === 1 ? (
          <HStack>
            <Button onClick={onPressLast}>{numPages}</Button>
          </HStack>
        ) : (
          <HStack>
            {currentPage !== 1 && (
              <Button onClick={onPressLeft}>
                <LuChevronLeft />
              </Button>
            )}
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
            {currentPage !== numPages && (
              <Button onClick={onPressRight}>
                <LuChevronRight />
              </Button>
            )}
          </HStack>
        )}
      </Flex>
    </Box>
  );
};

export default ReTable;
