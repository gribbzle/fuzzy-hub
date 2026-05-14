import { proxyAuthRequest } from "../../_shared";

export const dynamic = "force-dynamic";

interface OAuthRouteParams {
  params: Promise<{
    provider: string;
  }>;
}

export async function POST(request: Request, { params }: OAuthRouteParams) {
  const { provider } = await params;

  return proxyAuthRequest({
    path: `/portal/auth/oauth/${provider}`,
    method: "POST",
    request,
  });
}
