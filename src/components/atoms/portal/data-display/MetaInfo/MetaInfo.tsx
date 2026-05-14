import type { ReactNode } from "react";

interface MetaInfoProps {
  icon: ReactNode;
  text: string;
}

export const MetaInfo = ({ icon, text }: MetaInfoProps) => (
  <div className="flex items-center gap-2">
    <div className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden">
      {icon}
    </div>
    <span className="text-16 text-text-default font-semibold">{text}</span>
  </div>
);
