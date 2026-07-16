/**
 * Must stay in sync with `basePath` in next.config.ts.
 * Plain <a> tags and raw asset URLs do not get Next's basePath prefix.
 */
export const BASE_PATH = "/portfolio";

/** Prefix an app path or public asset for GitHub Pages (or any basePath host). */
export function withBasePath(path: string): string {
  if (!path || path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  if (path.startsWith(BASE_PATH)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `${BASE_PATH}/`;
  return `${BASE_PATH}${normalized}`;
}
