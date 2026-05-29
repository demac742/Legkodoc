const DEVELOPMENT_SITE_URL = "http://localhost:3021";

function normalizeSiteUrl(value: string) {
  const url = new URL(value);

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("NEXT_PUBLIC_SITE_URL must use http or https.");
  }

  return url.origin;
}

function isLocalhostUrl(value: string) {
  const hostname = new URL(value).hostname;

  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    hostname === "[::1]"
  );
}

function resolveSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!configuredUrl) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("NEXT_PUBLIC_SITE_URL is required in production.");
    }

    return DEVELOPMENT_SITE_URL;
  }

  const siteUrl = normalizeSiteUrl(configuredUrl);

  if (process.env.NODE_ENV === "production" && isLocalhostUrl(siteUrl)) {
    throw new Error("NEXT_PUBLIC_SITE_URL must not use localhost in production.");
  }

  return siteUrl;
}

export const SITE_URL = resolveSiteUrl();
