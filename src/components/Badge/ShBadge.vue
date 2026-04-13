<script setup lang="ts">
import { computed, onMounted, useAttrs, useSlots } from "vue";

type badgeVariant = "default" | "success" | "warning" | "error" | "info";

const props = withDefaults(
  defineProps<{
    variant?: badgeVariant;
    count?: number;
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
const slots = useSlots();

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

function getAttrString(name: string): string | undefined {
  const value = attrs[name];
  return typeof value === "string" && value.trim().length > 0
    ? value
    : undefined;
}

const resolvedAriaLabelledBy = computed(() => {
  const attrLabelledBy = getAttrString("aria-labelledby");
  if (attrLabelledBy) return attrLabelledBy;
  return props.labelledBy;
});

const resolvedAriaLabel = computed(() => {
  const attrLabel = getAttrString("aria-label");
  if (attrLabel) return attrLabel;
  if (resolvedAriaLabelledBy.value) return undefined;
  if (props.label) return props.label;
  return getFallbackDisplayCount();
});

onMounted(() => {
  if (process.env.NODE_ENV !== "production") {
    const hasTextSlot =
      slots.default &&
      slots.default().some((vnode) => {
        if (typeof vnode.children === "string") {
          return vnode.children.trim().length > 0;
        }
        return vnode.children !== null;
      });

    const hasAccessibleName =
      Boolean(resolvedAriaLabel.value) ||
      Boolean(resolvedAriaLabelledBy.value) ||
      Boolean(hasTextSlot);

    if (!hasAccessibleName) {
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
