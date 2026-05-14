import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

import { twMerge } from "@utils";

export type TextAreaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  error?: boolean;
};

export const TextArea = ({
  className,
  error = false,
  disabled,
  ...rest
}: TextAreaProps) => (
  <textarea
    className={twMerge(
      "font-16 text-text-default ring-border-gray placeholder-text-secondary w-full resize-none rounded-xl bg-white px-3 py-3 font-semibold ring outline-none",
      !error && "hover:ring-aqua-green focus:ring-aqua-green",
      disabled &&
        "ring-border-light text-text-light bg-bg-light pointer-events-none",
      error && "ring-red",
      className,
    )}
    disabled={disabled}
    {...rest}
  />
);
