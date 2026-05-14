import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const xsrf = request.cookies.get("XSRF-TOKEN")?.value;
  const session = request.cookies.get("fuzzy-hub-session")?.value;

  const requestHeaders = new Headers(request.headers);

  if (xsrf && ["POST", "PUT", "PATCH", "DELETE"].includes(request.method)) {
    requestHeaders.set("X-XSRF-TOKEN", xsrf);
  }

  if (xsrf && session) {
    requestHeaders.set(
      "Cookie",
      `XSRF-TOKEN=${xsrf}; fuzzy-hub-session=${session}`,
    );
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/:path*"],
};
