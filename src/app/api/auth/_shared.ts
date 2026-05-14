import { API_BASE_URL, API_HOSTNAME, API_PROTOCOL } from "@constants";

const API_ORIGIN = `${API_PROTOCOL}://${API_HOSTNAME}`;

const getPassthroughHeaders = (request: Request): Headers => {
  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  const cookie = request.headers.get("cookie");
  const xsrfToken = request.headers.get("x-xsrf-token");
  const authorization = request.headers.get("authorization");

  headers.set("Accept", "application/json");
  headers.set("X-Requested-With", "XMLHttpRequest");

  if (contentType) {
    headers.set("Content-Type", contentType);
  }

  if (cookie) {
    headers.set("Cookie", cookie);
  }

  if (xsrfToken) {
    headers.set("X-XSRF-TOKEN", xsrfToken);
  }

  if (authorization) {
    headers.set("Authorization", authorization);
  }

  return headers;
};

interface ProxyRequestOptions {
  path: string;
  method: "GET" | "POST";
  includeApiVersion?: boolean;
  request?: Request;
}

export const proxyAuthRequest = async ({
  path,
  method,
  includeApiVersion = true,
  request,
}: ProxyRequestOptions): Promise<Response> => {
  const urlBase = includeApiVersion ? API_BASE_URL : API_ORIGIN;
  const url = `${urlBase}${path}`;
  const body =
    method === "GET" || !request ? undefined : await request.text();

  const upstream = await fetch(url, {
    method,
    cache: "no-store",
    headers: request ? getPassthroughHeaders(request) : undefined,
    body,
  });

  return new Response(upstream.body, {
    status: upstream.status,
    headers: upstream.headers,
  });
};
