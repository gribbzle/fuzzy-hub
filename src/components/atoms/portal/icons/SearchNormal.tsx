import { SVGProps } from "react";

export const SearchNormal = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" width="24" height="24" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.5 21a9.5 9.5 0 1 1 0-19 9.5 9.5 0 0 1 0 19Z"
      clipRule="evenodd"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m22 22-2-2"
    />
  </svg>
);
