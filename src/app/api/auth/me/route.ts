import { proxyAuthRequest } from "../_shared";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return proxyAuthRequest({
    path: "/portal/profile",
    method: "GET",
    request,
  });
}
