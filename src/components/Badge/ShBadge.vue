<script setup lang="ts">
import { computed, onMounted, useAttrs } from "vue";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info";

const props = withDefaults(
  defineProps<{
    variant?: BadgeVariant;
    count?: number;
  }>(),
  {
    variant: "default",
  },
);

const attrs = useAttrs();

const displayCount = computed(() => {
  if (props.count === undefined) return null;
  return props.count > 99 ? "99+" : props.count.toString();
});

onMounted(() => {
  if (process.env.NODE_ENV !== "production") {
    const hasLabel = attrs["aria-label"] || attrs["aria-labelledby"];
    const hasCount = props.count !== undefined;

    if (hasCount && !hasLabel) {
      console.warn(
        "[ShBadge] Badge with count should have an accessible label. " +
          'Provide `aria-label` (e.g., "3 notifications") for screen readers.',
      );
    }
  }
});
</script>

<template>
  <span
    class="sh-badge"
    :data-variant="variant"
    :aria-label="attrs['aria-label'] as string | undefined"
    :aria-labelledby="attrs['aria-labelledby'] as string | undefined"
  >
    <slot>{{ displayCount }}</slot>
  </span>
</template>
