<script setup lang="ts">
import { computed, onMounted, useAttrs, useSlots } from "vue";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info";

const props = withDefaults(
  defineProps<{
    variant?: BadgeVariant;
    count?: number;
    label?: string;
    labelledBy?: string;
  }>(),
  {
    variant: "default",
  },
);

const attrs = useAttrs();
const slots = useSlots();

function getDisplayCount() {
  if (props.count === undefined) return null;
  return props.count > 99 ? "99+" : props.count.toString();
}

const displayCount = computed(getDisplayCount);

function getAttrString(name: string) {
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

function getFallbackCountLabel() {
  if (props.count === undefined) return undefined;
  if (props.count > 99) return "Notification count: 99 or more";
  return `Notification count: ${props.count}`;
}

const resolvedAriaLabel = computed(() => {
  const attrLabel = getAttrString("aria-label");
  if (attrLabel) return attrLabel;
  if (resolvedAriaLabelledBy.value) return undefined;
  if (props.label) return props.label;
  return getFallbackCountLabel();
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
        "[ShBadge] Badge has no accessible name. " +
          "Provide text content, `label`, `labelledBy`, `aria-label`, or `aria-labelledby`.",
      );
    }
  }
});
</script>

<template>
  <span
    class="sh-badge"
    :data-variant="variant"
    :aria-label="resolvedAriaLabel"
    :aria-labelledby="resolvedAriaLabelledBy"
  >
    <slot>{{ displayCount }}</slot>
  </span>
</template>
