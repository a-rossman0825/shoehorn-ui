<script setup lang="ts">
import { computed, useId, watchEffect } from "vue";

const props = withDefaults(
  defineProps<{
    value?: number;
    max?: number;
    label: string;
    showValue?: boolean;
    valueText?: string;
  }>(),
  { max: 100, showValue: false },
);
const id = useId();
const safeMax = computed(() => (props.max > 0 ? props.max : 100));
const normalizedValue = computed(() =>
  props.value === undefined
    ? undefined
    : Math.min(Math.max(props.value, 0), safeMax.value),
);
const percent = computed(() =>
  normalizedValue.value === undefined
    ? undefined
    : Math.round((normalizedValue.value / safeMax.value) * 100),
);
if (process.env.NODE_ENV !== "production") {
  watchEffect(() => {
    if (props.max <= 0) {
      console.warn("[ShProgress] `max` must be greater than zero.");
    }
  });
}
</script>

<template>
  <div
    class="sh-progress"
    :data-state="value === undefined ? 'indeterminate' : 'determinate'"
  >
    <label :for="`sh-progress-${id}`" class="sh-progress__label">{{
      label
    }}</label>
    <progress
      :id="`sh-progress-${id}`"
      class="sh-progress__control"
      :value="normalizedValue"
      :max="safeMax"
      :aria-valuetext="valueText"
    >
      {{ percent }}%
    </progress>
    <span
      v-if="showValue && percent !== undefined"
      class="sh-progress__value"
      aria-hidden="true"
      >{{ percent }}%</span
    >
  </div>
</template>
