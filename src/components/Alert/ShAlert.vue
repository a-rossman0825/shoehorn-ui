<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: "info" | "success" | "warning" | "error";
    live?: "off" | "polite" | "assertive";
    atomic?: boolean;
  }>(),
  { variant: "info", live: "polite", atomic: true },
);
</script>

<template>
  <div
    class="sh-alert"
    :data-variant="props.variant"
    :role="
      live === 'assertive' ? 'alert' : live === 'polite' ? 'status' : undefined
    "
    :aria-live="live !== 'off' ? live : undefined"
    :aria-atomic="live !== 'off' ? atomic : undefined"
  >
    <slot />
  </div>
</template>
