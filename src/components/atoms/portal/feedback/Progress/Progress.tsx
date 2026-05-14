import { twMerge } from "@utils";

export interface ProgressProps {
  /**
   * Progress percentage (0-100)
   */
  value: number;
  /**
   * Additional styles for the container
   */
  className?: string;
}

/**
 * Progress component displays a progress indicator.
 */
export const Progress = ({ value, className }: ProgressProps) => {
  const normalizedValue = Math.min(Math.max(value, 0), 100);

  return (
    <div
      className={twMerge(
        "flex w-full flex-row items-center tablet:gap-3 max-tablet:gap-2",
        className,
      )}
    >
      <div className="bg-border-light w-full overflow-hidden rounded-4xl tablet:h-2 max-tablet:h-1.5">
        <div
          className="bg-aqua-green h-full rounded-4xl transition-all duration-300"
          style={{ width: `${normalizedValue}%` }}
        />
      </div>
      <span className="text-text-default shrink-0 font-bold tablet:text-20 max-tablet:text-16 max-tablet:-translate-y-px">
        {normalizedValue}%
      </span>
    </div>
  );
};
