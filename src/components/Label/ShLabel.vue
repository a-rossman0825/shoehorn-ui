<script setup lang="ts">
import { computed, onMounted, useAttrs } from "vue";

const props = withDefaults(
  defineProps<{
    for?: string;
    htmlFor?: string;
    required?: boolean;
  }>(),
  {
    required: false,
  },
);

const forValue = computed(() => props.htmlFor || props.for);

const attrs = useAttrs();

onMounted(() => {
  if (process.env.NODE_ENV !== "production") {
    if (!forValue.value && !attrs["aria-label"]) {
      console.warn(
        "[ShLabel] Label should have a `for` attribute to associate with a form control. " +
          "Provide the `for` prop with the ID of the associated element.",
      );
    }
  }
});
</script>

<template>
  <label
    class="sh-label"
    :for="forValue"
    :data-required="required || undefined"
  >
    <slot />
    <span v-if="required" class="sh-label__required" aria-label="required"
      >*</span
    >
  </label>
</template>
