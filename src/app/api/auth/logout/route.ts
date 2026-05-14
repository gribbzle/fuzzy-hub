import { proxyAuthRequest } from "../_shared";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return proxyAuthRequest({
    path: "/portal/auth/logout",
    method: "POST",
    request,
  });
}
