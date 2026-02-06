<script setup lang="ts">
import { computed, onMounted, useAttrs } from "vue";

type SpinnerSize = "sm" | "md" | "lg";

const props = withDefaults(
  defineProps<{
    size?: SpinnerSize;
    label?: string;
  }>(),
  {
    size: "md",
  },
);

const attrs = useAttrs();

onMounted(() => {
  if (process.env.NODE_ENV !== "production") {
    const hasLabel =
      !!props.label ||
      attrs["aria-label"] !== undefined ||
      attrs["aria-labelledby"] !== undefined;

    if (!hasLabel) {
      console.warn(
        "[ShSpinner] Spinner has no accessible label. " +
          "Provide `label`, `aria-label`, or `aria-labelledby` to describe what is loading.",
      );
    }
  }
});
</script>

<template>
  <div
    class="sh-spinner"
    role="status"
    :aria-label="label || (attrs['aria-label'] as string | undefined)"
    :aria-labelledby="attrs['aria-labelledby'] as string | undefined"
    :aria-live="
      (attrs['aria-live'] as 'off' | 'polite' | 'assertive' | undefined) ||
      'polite'
    "
    :data-size="size"
  >
    <svg
      class="sh-spinner__svg"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="sh-spinner__circle"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="5"
      />
    </svg>
    <span v-if="label" class="sh-spinner__label">{{ label }}</span>
    <span v-else class="sh-spinner__sr-only">Loading...</span>
  </div>
</template>
