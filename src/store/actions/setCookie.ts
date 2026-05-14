"use server";

import { cookies } from "next/headers";

export async function setCookie(param: string, value: string): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(param, value, {
    httpOnly: true,
    secure: true,
  });
}
