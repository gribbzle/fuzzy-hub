import { proxyAuthRequest } from "../_shared";

export const dynamic = "force-dynamic";

export async function GET() {
  return proxyAuthRequest({
    path: "/sanctum/csrf-cookie",
    method: "GET",
    includeApiVersion: false,
  });
}
