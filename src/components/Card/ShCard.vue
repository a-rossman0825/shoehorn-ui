<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    as?: "div" | "article" | "section";
  }>(),
  {
    as: "div",
  },
);
</script>

<template>
  <component :is="props.as" class="sh-card">
    <slot />
  </component>
</template>
