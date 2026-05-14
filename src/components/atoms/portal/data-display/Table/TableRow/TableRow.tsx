import { DetailedHTMLProps, HTMLAttributes } from "react";

type TableRowProps = DetailedHTMLProps<
  HTMLAttributes<HTMLTableRowElement>,
  HTMLTableRowElement
>;

export const TableRow = ({ children, ...rest }: TableRowProps) => (
  <tr {...rest}>{children}</tr>
);
