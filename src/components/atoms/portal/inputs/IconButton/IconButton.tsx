import { JSX, SVGProps } from "react";

interface IconButtonProps extends SVGProps<SVGSVGElement> {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}

export const IconButton = ({ Icon, ...rest }: IconButtonProps) => (
  <button className="cursor-pointer text-text-default hover:text-primary active:text-[#FF8D2F]">
    <Icon {...rest} />
  </button>
);
