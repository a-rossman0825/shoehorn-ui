/** Merge space-separated ID references while preserving order and uniqueness. */
export function mergeIds(
  ...values: Array<string | null | undefined | false>
): string | undefined {
  const ids = values
    .flatMap((value) =>
      typeof value === "string" ? value.trim().split(/\s+/) : [],
    )
    .filter(Boolean);

  return ids.length > 0 ? [...new Set(ids)].join(" ") : undefined;
}
