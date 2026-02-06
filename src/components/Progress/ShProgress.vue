<script setup lang="ts">
import { computed, onMounted, useAttrs } from "vue";

const props = withDefaults(
  defineProps<{
    value?: number;
    max?: number;
    label?: string;
    showValue?: boolean;
  }>(),
  {
    value: 0,
    max: 100,
    showValue: false,
  },
);

const attrs = useAttrs();

const percentage = computed(() => {
  return Math.min(100, Math.max(0, (props.value / props.max) * 100));
});

const valueText = computed(() => {
  return `${Math.round(percentage.value)}%`;
});

onMounted(() => {
  if (process.env.NODE_ENV !== "production") {
    const hasLabel =
      !!props.label ||
      attrs["aria-label"] !== undefined ||
      attrs["aria-labelledby"] !== undefined;

    if (!hasLabel) {
      console.warn(
        "[ShProgress] Progress bar has no accessible label. " +
          "Provide `label`, `aria-label`, or `aria-labelledby` to describe what is progressing.",
      );
    }

    if (props.value < 0 || props.value > props.max) {
      console.warn(
        `[ShProgress] Progress value (${props.value}) should be between 0 and max (${props.max}).`,
      );
    }
  }
});
</script>

<template>
  <div class="sh-progress">
    <div v-if="label || showValue" class="sh-progress__header">
      <span v-if="label" class="sh-progress__label">{{ label }}</span>
      <span v-if="showValue" class="sh-progress__value" aria-hidden="true">
        {{ valueText }}
      </span>
    </div>

    <div
      class="sh-progress__track"
      role="progressbar"
      :aria-valuenow="value"
      :aria-valuemin="0"
      :aria-valuemax="max"
      :aria-valuetext="valueText"
      :aria-label="
        !label ? (attrs['aria-label'] as string | undefined) : undefined
      "
      :aria-labelledby="attrs['aria-labelledby'] as string | undefined"
    >
      <div
        class="sh-progress__indicator"
        :style="{ width: `${percentage}%` }"
      />
    </div>
  </div>
</template>
