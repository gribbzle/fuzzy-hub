import { DetailedHTMLProps, TableHTMLAttributes } from "react";

type TableProps = DetailedHTMLProps<
  TableHTMLAttributes<HTMLTableElement>,
  HTMLTableElement
>;

export const Table = ({ children, ...rest }: TableProps) => (
  <table {...rest}>{children}</table>
);
