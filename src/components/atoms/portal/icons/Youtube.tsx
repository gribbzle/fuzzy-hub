import { SVGProps } from "react";

export const Youtube = (props: SVGProps<SVGSVGElement>) => (
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
        fillRule="evenodd"
        d="M22.746 4.834c.373.375.64.84.776 1.351.501 1.885.501 5.815.501 5.815s0 3.93-.501 5.814A3.016 3.016 0 0 1 21.4 19.95c-1.877.505-9.377.505-9.377.505s-7.5 0-9.376-.505a3.017 3.017 0 0 1-2.122-2.136C.023 15.93.023 12 .023 12s0-3.93.502-5.815A3.016 3.016 0 0 1 2.647 4.05c1.876-.505 9.376-.505 9.376-.505s7.5 0 9.377.505c.51.139.974.41 1.346.784ZM15.842 12 9.569 8.431v7.138L15.842 12Z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
