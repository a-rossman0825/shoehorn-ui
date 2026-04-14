<script setup lang="ts">
import { computed, onMounted, useAttrs } from "vue";
import { useHasSlotText } from "../../composables/useHasSlotText";
import { getAttrString } from "../../utils";
import { hasAccessibleName } from "../../utils/hasAccessibleName";

type badgeVariant = "default" | "success" | "warning" | "error" | "info";

const props = withDefaults(
  defineProps<{
    variant?: badgeVariant;
    count?: number;
    /**
     * Maximum count to display before showing overflow indicator.
     * Set to -1 to disable the cap and display the full count.
     * @default 99
     * @example
     * // Shows "99+" for counts > 99:
     * <ShBadge :count="150" :countCap="99" />
     *
     * // Shows full count:
     * <ShBadge :count="150" :countCap="-1" />
     */
    countCap?: number;
    labelledBy?: string;
    label?: string;
  }>(),
  {
    variant: "default",
    count: 0,
    countCap: 99,
    labelledBy: undefined,
    label: undefined,
  },
);

const attrs = useAttrs();

const displayCount = computed(() => {
  if (props.count === undefined) return 0;
  if (props.countCap !== -1 && props.count > props.countCap) {
    return `${props.countCap}+`;
  }
  return props.count.toString();
});

function getFallbackDisplayCount(): string | undefined {
  if (props.count === undefined) return undefined;
  if (props.count > 99) return `notification count: 99 or more`;
  return `notification count: ${props.count}`;
}

/* NOTE - refactor: use getAttrString() util instead.
  function getAttrString(name: string): string | undefined {
    const value = attrs[name];
    return typeof value === "string" && value.trim().length > 0
      ? value
      : undefined;
  }
*/

const resolvedAriaLabelledBy = computed(() => {
  const attrLabelledBy = getAttrString(attrs, "aria-labelledby");
  if (attrLabelledBy) return attrLabelledBy;
  return props.labelledBy;
});

const resolvedAriaLabel = computed(() => {
  const attrLabel = getAttrString(attrs, "aria-label");
  if (attrLabel) return attrLabel;
  if (resolvedAriaLabelledBy.value) return undefined;
  if (props.label) return props.label;
  return getFallbackDisplayCount();
});

/* NOTE - refactor: use "useHasSlotText()" composable instead.
function hasSlotText() {
  if (!slots.default) return false;
  const result = slots.default();
  if (!result) return false;
  return result.some((vnode) => {
    if (typeof vnode.children === "string") {
      return vnode.children.trim().length > 0;
    }
    return vnode.children !== null;
  })
 } */

const hasSlotText = useHasSlotText();

onMounted(() => {
  if (process.env.NODE_ENV !== "production") {
    const slotHasText = hasSlotText();
    /* NOTE - refactor: use "hasAccessibleName()" util instead.
    const hasAccessibleName =
      Boolean(resolvedAriaLabel.value) ||
      Boolean(resolvedAriaLabelledBy.value) ||
      Boolean(hasSlotText);
      */
    const accessible = hasAccessibleName(
      resolvedAriaLabel.value,
      resolvedAriaLabelledBy.value,
      slotHasText,
    );

    if (!accessible) {
      console.warn(
        "[ShBadge] has no accessible name" +
          "Provide text content, `label`, `labelledBy`, `aria-label`, or `aria-labelledby`.",
      );
    }
  }
});
</script>

<template>
  <span
    class="sh-badge"
    :data-variant="props.variant"
    :aria-labelledby="resolvedAriaLabelledBy"
    :aria-label="resolvedAriaLabel"
    ><slot>{{ displayCount }}</slot>
  </span>
</template>
