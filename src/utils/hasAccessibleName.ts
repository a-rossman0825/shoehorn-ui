
/**
 * 
 * @param ariaLabel - The aria-label value (if present)
 * @param ariaLabelledBy - The aria-labelledby value (if present)
 * @param hasSlotText - wWhether slot contains text (boolean)
 * @returns - true if any accessible name source is present
 * @example
 * const accessible = hasAccessibleName(label, labelledBy, hasText);
 */
export function hasAccessibleName(
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
  hasSlotText: boolean,
): boolean {
  return Boolean(ariaLabel) || Boolean(ariaLabelledBy) || Boolean(hasSlotText);
}
