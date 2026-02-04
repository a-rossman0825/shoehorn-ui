<script setup lang="ts">
(defineProps<{
  as?: "div" | "article" | "section";
}>(),
  {
    as: "div",
  });
</script>

<template>
  <component :is="as" class="sh-card">
    <slot />
  </component>
</template>
