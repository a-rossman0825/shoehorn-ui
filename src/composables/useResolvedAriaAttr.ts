import { computed, ComputedRef } from "vue";
import { getAttrString } from "../utils";


/** 
 * Resolve ARIA attrs with fallback to props.
 * Attrs takes precedence, then falls back to provided value.
 * 
 * @example
 * const resolvedLabel = useResolvedAriaAttr(attrs, "aria-label", props.label);
 */
export function useResolvedAriaAttr(
  attrs: Record<string, unknown>,
  attrName: string,
  fallbackValue?: string,
): ComputedRef<string | undefined> {
  return computed(() => {
    const attrValue = getAttrString(attrs, attrName);
    return attrValue || fallbackValue;
  })
}