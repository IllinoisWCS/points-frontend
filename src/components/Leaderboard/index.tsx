import * as React from 'react';
import { Profile } from '../../types/profile';
import {
  Box,
  Heading,
  Skeleton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';

import { useQuery } from 'react-query';
import axiosInstance from '../../api';

export interface LeaderboardProfile extends Profile {
  rank: number;
}

const columnHelper = createColumnHelper<LeaderboardProfile>();

const columns = [
  columnHelper.accessor('rank', {
    header: () => 'Rank',
    cell: (props) => props.row.index + 1
  }),
  columnHelper.accessor('name', {
    header: () => 'Name',
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('points', {
    header: () => 'Points',
    cell: (info) => info.renderValue()
  }),
  columnHelper.accessor('events', {
    header: () => 'Events Attended',
    cell: (info) => info.getValue().length
  }),
  columnHelper.accessor('netId', {
    header: () => 'Net-Id',
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

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <Box>
      <Skeleton startColor="gray.100" endColor="gray.200" isLoaded={!isLoading}>
        <Table>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Skeleton>
    </Box>
  );
};

export default ReTable;
