import { DetailedHTMLProps, HTMLAttributes } from "react";

type TableBodyProps = DetailedHTMLProps<
  HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>;

export const TableBody = ({ children, ...rest }: TableBodyProps) => (
  <tbody {...rest}>{children}</tbody>
);
