import { SVGProps } from "react";

export const Facebook = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#39394C"
        d="M12 0c6.627 0 12 5.373 12 12 0 6.135-4.605 11.194-10.546 11.912v-8.245H16.7L17.373 12h-3.92v-1.297c0-.969.19-1.64.627-2.068.436-.429 1.118-.615 2.102-.615.249 0 .478.002.681.007.296.008.537.02.705.038V4.74a3.663 3.663 0 0 0-.235-.055 14.114 14.114 0 0 0-2.374-.243c-1.817 0-3.19.389-4.148 1.194-1.157.972-1.71 2.55-1.71 4.784V12H6.627v3.667H9.1v7.98C3.874 22.35 0 17.627 0 12 0 5.373 5.373 0 12 0Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
