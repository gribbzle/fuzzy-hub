import { twMerge } from "./twMerge";

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(...(inputs.filter(Boolean) as string[]));
}
