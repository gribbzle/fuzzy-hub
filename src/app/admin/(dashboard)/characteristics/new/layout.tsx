import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New characteristic",
};

export default function NewCharacteristicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
