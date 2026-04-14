
/**
 * Extracts a string attribute value from attrs.
 * Returns undefined if missing, not a string, or empty after trimming/white-space check
 * @param attrs - The attrs object from useAttrs()
 * @param name - The attribute name to extract (e.g., "aria-label")
 * @returns - The trimmed attribute value, or undefined
 * @example
 * const label = getAttrString(attrs, "aria-label");
 */
export function getAttrString(
  attrs: Record<string, unknown>,
  name: string,
): string | undefined {
  const value = attrs[name];
  return typeof value === "string" && value.trim().length > 0
    ? value
    : undefined;
}
