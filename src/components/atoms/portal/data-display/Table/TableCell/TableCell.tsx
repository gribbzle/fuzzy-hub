import { DetailedHTMLProps, TdHTMLAttributes } from "react";

type TableCellProps = DetailedHTMLProps<
  TdHTMLAttributes<HTMLTableDataCellElement>,
  HTMLTableDataCellElement
>;

export const TableCell = ({ children, ...rest }: TableCellProps) => (
  <td {...rest}>{children}</td>
);
