import { SVGProps } from "react";

export const Check = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" width="24" height="24" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2.2}
      d="M4 12L9.33333 17L20 7"
    />
  </svg>
);
