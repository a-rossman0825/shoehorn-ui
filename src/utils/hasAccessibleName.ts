export function hasAccessibleName(
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
  hasSlotText: boolean,
): boolean {
  return Boolean(ariaLabel) || Boolean(ariaLabelledBy) || Boolean(hasSlotText);
}
