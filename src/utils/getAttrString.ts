export function getAttrString(
  attrs: Record<string, unknown>,
  name: string,
): string | undefined {
  const value = attrs[name];
  return typeof value === "string" && value.trim().length > 0
    ? value
    : undefined;
}
