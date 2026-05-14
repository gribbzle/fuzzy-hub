import { SVGProps } from "react";

export const FilterSquare = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" width="24" height="24" {...props}>
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18.142 4C19.167 4 20 4.768 20 5.714v1.892c0 .694-.465 1.551-.929 1.98l-4.004 3.265c-.56.429-.929 1.286-.929 1.98v3.695c0 .517-.368 1.197-.833 1.463l-1.297.753c-1.217.695-2.883-.088-2.883-1.463v-4.551c0-.606-.368-1.374-.753-1.803l-3.54-3.443C4.369 9.068 4 8.285 4 7.768V5.803C4 4.768 4.833 4 5.858 4h12.284Z"
    />
  </svg>
);
