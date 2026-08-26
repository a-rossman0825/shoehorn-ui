<script setup lang="ts">
import { computed, onMounted, onUpdated, ref, useAttrs, useSlots } from "vue";
import { getAttrString } from "../../utils";
import { useResolvedAriaAttr } from "../../composables";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info";

const props = withDefaults(
  defineProps<{
    variant?: BadgeVariant;
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
    decorative?: boolean;
    live?: "off" | "polite" | "assertive";
  }>(),
  {
    variant: "default",
    countCap: 99,
    labelledBy: undefined,
    label: undefined,
    decorative: false,
    live: "off",
  },
);

const attrs = useAttrs();
const slots = useSlots();
const badgeRef = ref<HTMLSpanElement>();

const displayCount = computed(() => {
  if (props.count === undefined) return "";
  if (props.countCap !== -1 && props.count > props.countCap) {
    return `${props.countCap}+`;
  }
  return props.count.toString();
});

function getFallbackDisplayCount(): string | undefined {
  if (props.count === undefined) return undefined;
  if (props.countCap !== -1 && props.count > props.countCap) {
    return `notification count: ${props.countCap} or more`;
  }
  return `notification count: ${props.count}`;
}

const resolvedAriaLabelledBy = useResolvedAriaAttr(
  attrs,
  "aria-labelledby",
  props.labelledBy,
);

const resolvedAriaLabel = computed(() => {
  if (props.decorative) return undefined;
  const attrLabel = getAttrString(attrs, "aria-label");
  if (attrLabel) return attrLabel;
  if (resolvedAriaLabelledBy.value) return undefined;
  if (props.label) return props.label;
  if (slots.default) return undefined;
  return getFallbackDisplayCount();
});

function validateBadge() {
  if (process.env.NODE_ENV !== "production") {
    const accessible =
      Boolean(resolvedAriaLabel.value) ||
      Boolean(resolvedAriaLabelledBy.value) ||
      Boolean(badgeRef.value?.textContent?.trim());

    if (!accessible && !props.decorative) {
      console.warn(
        "[ShBadge] has no accessible name. " +
          "Provide text content, `label`, `labelledBy`, `aria-label`, or `aria-labelledby`.",
      );
    }
    if (props.decorative && (props.label || resolvedAriaLabelledBy.value)) {
      console.warn(
        "[ShBadge] A decorative badge cannot also have an accessible label.",
      );
    }
  }
}
onMounted(validateBadge);
onUpdated(validateBadge);
</script>

<template>
  <span
    ref="badgeRef"
    class="sh-badge"
    :data-variant="props.variant"
    :aria-labelledby="decorative ? undefined : resolvedAriaLabelledBy"
    :aria-label="resolvedAriaLabel"
    :aria-hidden="decorative || undefined"
    :role="live !== 'off' && !decorative ? 'status' : undefined"
    :aria-live="live !== 'off' && !decorative ? live : undefined"
    ><slot>{{ displayCount }}</slot>
  </span>
</template>
