import { SVGProps } from "react";

export const InfoCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="12" cy="12" r="9" stroke="#000" strokeWidth={1.5} />
    <path d="M12 11v5" stroke="#000" strokeWidth={1.5} strokeLinecap="round" />
    <path d="M12 8.5v.01" stroke="#000" strokeWidth={2} strokeLinecap="round" />
  </svg>
);
