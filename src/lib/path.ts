/** Compare paths regardless of a trailing slash ("/about-us/" === "/about-us"). */
export function normPath(path: string) {
  const p = path.split("#")[0].split("?")[0];
  return p.length > 1 ? p.replace(/\/+$/, "") : p;
}
