import { useSlots } from "vue";

/**
 * Composable that detects if the default slot contains non-whitespace text content.
 * @returns A function that checks if slot has text
 * @example
 * const hasSlotText = useHasSlotText();
 * if (hasSlotText()) {
 *   console.log("Slot has meaningful content");
 * };
 */
export function useHasSlotText() {
  const slots = useSlots();

  return function hasSlotText(): boolean {
    if (!slots.default) return false;
    const result = slots.default();
    if (!result) return false;
    return result.some((vnode) => {
      if (typeof vnode.children === "string") {
        return vnode.children.trim().length > 0;
      }
      return vnode.children !== null;
    });
  };
}
