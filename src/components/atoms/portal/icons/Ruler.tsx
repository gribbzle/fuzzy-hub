import { SVGProps } from "react";

export const Ruler = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="none" width="24" height="24" viewBox="0 0 24 24" {...props}>
    <mask
      id="a"
      width={24}
      height={24}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h24v24H0z" />
    </mask>
    <g stroke="#000" strokeLinecap="round" strokeWidth={1.5} mask="url(#a)">
      <path d="M19 17c2 0 3-1 3-3v-4c0-2-1-3-3-3H5c-2 0-3 1-3 3v4c0 2 1 3 3 3h14ZM18 7v5M6 7v4M10.05 7 10 12M14 7v3" />
    </g>
  </svg>
);
