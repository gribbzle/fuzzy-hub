"use server";

import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export async function getCookie(
  param: string,
): Promise<RequestCookie | undefined> {
  const cookieStore = await cookies();

  return cookieStore.get(param);
}
