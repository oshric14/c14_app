const PRODUCTION_ORIGIN = "https://www.c14.co.il";
const LOCAL_DEVELOPMENT_ORIGIN = "http://localhost:8081";

export function getClientOrigin() {
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }

  return LOCAL_DEVELOPMENT_ORIGIN;
}

export function appendClientOrigin(search: URLSearchParams) {
  const origin = getClientOrigin();

  if (origin !== PRODUCTION_ORIGIN) {
    search.set("origin", origin);
  }

  return search;
}
