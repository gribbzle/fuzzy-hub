import { DetailedHTMLProps, InputHTMLAttributes, JSX, SVGProps } from "react";

import { twMerge } from "@utils";

export type TextInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  error?: boolean;
  EndIcon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  onEndIconClick?: () => void;
};

export const TextInput = ({
  EndIcon,
  className,
  error = false,
  onEndIconClick,
  disabled,
  ...rest
}: TextInputProps) => {
  const hasEndIcon = !!EndIcon;

  return (
    <div className="relative flex items-center">
      <input
        type="text"
        className={twMerge(
          "text-16 text-text-default border-border-gray placeholder-text-secondary box-border h-12 w-full rounded-xl border bg-white px-2.75 font-semibold outline-none pb-px",
          !error && "hover:border-aqua-green focus:border-aqua-green",
          hasEndIcon && "pr-11",
          disabled &&
            "border-border-light text-text-light bg-bg-light pointer-events-none",
          error && "border-red",
          className,
        )}
        disabled={disabled}
        {...rest}
      />
      {hasEndIcon && (
        <button
          type="button"
          className="absolute right-3 flex items-center justify-center"
          onClick={onEndIconClick}
          onMouseDown={(e) => e.preventDefault()}
          aria-label="End icon button"
        >
          <EndIcon width={20} height={20} className="text-text-default" />
        </button>
      )}
    </div>
  );
};
