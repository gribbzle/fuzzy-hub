import { ReactNode } from "react";

import { twMerge } from "@utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@portal/ui/atoms";

interface Column {
  field: string;
  headerName: string;
  width?: number;
  renderCell?: (rowElement: string) => ReactNode;
}

type RowData<T extends Column[]> = {
  [K in T[number]["field"]]: string;
};

export interface DataGridProps {
  columns: Column[];
  rows: RowData<Column[]>[];
  className?: string;
  caption?: string;
}

export const DataGrid = ({ columns, rows, className }: DataGridProps) => (
  <Table
    className={twMerge("table-fixed overflow-hidden rounded-2xl", className)}
  >
    <colgroup>
      {columns.map((column) => (
        <col
          key={column.field}
          style={{ width: column.width ? `${column.width}px` : "auto" }}
        />
      ))}
    </colgroup>
    <TableHead>
      <TableRow className="bg-bg-default">
        {columns.map((column) => (
          <TableCell
            key={column.field}
            className="text-14 px-4 py-2.5 font-medium whitespace-normal text-[#2B2B2E]/65 uppercase first:pl-6 last:pr-6"
          >
            {column.headerName}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row, rowIndex) => (
        <TableRow
          key={rowIndex}
          className="bg-bg-light not-last:border-border-light not-last:border-b"
        >
          {columns.map((column, colIndex) => (
            <TableCell
              key={colIndex}
              className="text-16 px-4 py-4.5 font-medium whitespace-normal text-[#2B2B2E] first:pl-6 last:pr-6"
            >
              {column.renderCell !== undefined
                ? column.renderCell(row[column.field])
                : row[column.field]}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
