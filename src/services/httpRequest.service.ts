// Single base URL for the c14 API (override via .env if needed).
const BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ??
  "https://www.c14.co.il/wp-json/now14-api/v1";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const url = path.startsWith("http")
    ? path
    : `${BASE_URL}/${path.replace(/^\/+/, "")}`;

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error(`Request failed (${res.status}): ${url}`);
  }

  return res.json();
}

/** Simple HTTP service: give it a route, get back the data. */
export const httpRequestService = {
  get: <T = unknown>(path: string) => request<T>(path),

  post: <T = unknown>(path: string, body?: unknown) =>
    request<T>(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),
};
