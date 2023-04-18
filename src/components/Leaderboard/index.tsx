import * as React from 'react'
import ReactDOM from 'react-dom/client'
import { Profile } from '../../types/profile'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { useQuery } from 'react-query'
import axiosInstance from '../../api'

const { isLoading, isError, error, data } = useQuery<Profile[], Error>(
    ['get-Users'],
    async () => {
      const res = await axiosInstance.get('/Users');
      return res.data;
    }
  );

const columnHelper = createColumnHelper<Profile>()

const columns = [
  columnHelper.accessor('name', {
    header: () => 'Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('points', {
    header: () => 'Points',
    cell: info => info.renderValue(),
  }),
]

export const ReTable = () => {

  const table = useReactTable({
    // @ts-ignore
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        
      </table>
    </div>
  )
}