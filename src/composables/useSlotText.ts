import { useSlots } from "vue";

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
