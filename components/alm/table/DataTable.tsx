"use client";

import {
  ColumnDef,
  RowData,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./DataTablePagination";
import { DataTableViewOptions } from "./DataTableViewOptions";
import React from "react";
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [hoveredRowId, setHoveredRowId] = React.useState<string | null>(null);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="rounded-md border w-full">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="relative"
                data-state={row.getIsSelected() && "selected"}
                onMouseEnter={() => setHoveredRowId(row.id)}
                onMouseLeave={() => setHoveredRowId(null)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-[10px]">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                {hoveredRowId === row.id && (
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm bg-background/15 z-10">
                    <Button size="sm"
                      onClick={() => alert(JSON.stringify(row.original))}
                    >Accept</Button>
                  </div>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-xs">
                No Spread Propositions
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="w-full flex items-center justify-between">
        <DataTablePagination table={table} />
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
