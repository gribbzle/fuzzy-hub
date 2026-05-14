import { JSX, PropsWithChildren, ReactNode, SVGProps, useMemo } from "react";

import { twMerge } from "@utils";

import {
  Check as CheckIcon,
  Close as CloseIcon,
  Danger as DangerIcon,
  InfoCircle,
} from "@portal/ui/icons";

type AlertSize = "small" | "medium" | "large";
type AlertSeverity = "error" | "attention" | "success" | "info";

interface AlertProps extends PropsWithChildren {
  size?: AlertSize;
  severity?: AlertSeverity;
  action?: ReactNode;
  icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title?: string;
  className?: string;
}

const severityClasses: Record<AlertSeverity, string> = {
  error: "alert-error",
  attention: "alert-attention",
  success: "alert-success",
  info: "alert-info",
};

const sizeClasses: Record<AlertSize, string> = {
  small: "alert-small",
  medium: "alert-medium",
  large: "alert-large",
};

const severityIcon: Record<
  AlertSeverity,
  (props: SVGProps<SVGSVGElement>) => JSX.Element
> = {
  error: CloseIcon,
  attention: DangerIcon,
  success: CheckIcon,
  info: InfoCircle,
};

export const Alert = ({
  size = "medium",
  severity = "info",
  action,
  icon,
  title,
  children,
  className,
}: AlertProps) => {
  const IconComponent = useMemo(() => {
    if (icon) {
      return icon;
    }

    return severityIcon[severity];
  }, [icon, severity]);

  return (
    <div
      className={twMerge(
        sizeClasses[size],
        severityClasses[severity],
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        {title && (
          <div className="flex flex-row items-center alert-header">
            <div className="shrink-0">
              <IconComponent className="alert-icon h-5 w-5" />
            </div>
            <span className="text-14 text-text-default font-bold">{title}</span>
          </div>
        )}
        <p className="alert-text text-text-secondary">{children}</p>
      </div>
      {action && <div className="flex flex-col gap-3">{action}</div>}
    </div>
  );
};
