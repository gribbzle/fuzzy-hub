import { DetailedHTMLProps, HTMLAttributes } from "react";

type TableHeadProps = DetailedHTMLProps<
  HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>;

export const TableHead = ({ children, ...rest }: TableHeadProps) => (
  <thead {...rest}>{children}</thead>
);
