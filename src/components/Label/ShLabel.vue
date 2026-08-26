<script setup lang="ts">
import { computed, onMounted, onUpdated, ref } from "vue";

const props = withDefaults(
  defineProps<{
    for?: string;
    htmlFor?: string;
    required?: boolean;
    srOnly?: boolean;
  }>(),
  { required: false, srOnly: false },
);
const labelRef = ref<HTMLLabelElement>();
const resolvedFor = computed(() => props.for ?? props.htmlFor);
function validateLabel() {
  if (process.env.NODE_ENV !== "production") {
    if (!resolvedFor.value)
      console.warn(
        "[ShLabel] Label requires `for` to associate it with a form control.",
      );
    if (!labelRef.value?.textContent?.trim())
      console.warn("[ShLabel] Label requires meaningful text content.");
  }
}
onMounted(validateLabel);
onUpdated(validateLabel);
</script>

<template>
  <label
    ref="labelRef"
    class="sh-label"
    :for="resolvedFor"
    :data-required="required || undefined"
    :class="{ 'sh-label--sr-only': srOnly }"
  >
    <slot />
    <template v-if="required">
      <span class="sh-label__required" aria-hidden="true">*</span>
      <span class="sh-sr-only"> required</span>
    </template>
  </label>
</template>
