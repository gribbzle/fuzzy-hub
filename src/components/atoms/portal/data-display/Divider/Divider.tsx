import { twMerge } from "@utils";

interface DividerProps {
  className?: string;
}

export const Divider = ({ className }: DividerProps) => (
  <hr className={twMerge("border-border-light -mb-px", className)} />
);
