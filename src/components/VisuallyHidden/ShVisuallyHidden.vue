<script setup lang="ts">
withDefaults(defineProps<{ as?: string; focusable?: boolean }>(), {
  as: "span",
  focusable: false,
});
</script>

<template>
  <component
    :is="as"
    :class="focusable ? 'sh-visually-hidden--focusable' : 'sh-sr-only'"
  >
    <slot />
  </component>
</template>
