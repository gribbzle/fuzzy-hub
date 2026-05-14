import { formatAdminTableOptionalString } from "../adminTableUtils";

interface AdminTableOptionalTextProps {
  value: string | null | undefined;
  className?: string;
}

export function AdminTableOptionalText({
  value,
  className,
}: AdminTableOptionalTextProps) {
  return (
    <span className={className}>{formatAdminTableOptionalString(value)}</span>
  );
}
