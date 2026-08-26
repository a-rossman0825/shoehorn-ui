<script setup lang="ts">
withDefaults(defineProps<{ label?: string; decorative?: boolean }>(), {
  label: "Loading",
  decorative: false,
});
</script>

<template>
  <span
    class="sh-spinner"
    :role="decorative ? undefined : 'status'"
    :aria-label="decorative ? undefined : label"
    :aria-hidden="decorative || undefined"
    ><span class="sh-spinner__indicator" aria-hidden="true"
  /></span>
</template>
