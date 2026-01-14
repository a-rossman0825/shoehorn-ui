<script setup lang="ts">
import { computed } from 'vue';

type ButtonAs = 'button' | 'a';

const props = withDefaults(defineProps<{
  as?: ButtonAs
  disabled?: boolean
}>(), {
  as: 'button',
  disabled: false,
});

const emit = defineEmits<{
  (event: 'click', mouseEvent: MouseEvent): void
}>();

const isButton = computed(() => props.as === 'button');

function onClick(ev: MouseEvent) {
  if (props.disabled) {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    return;
  }
  emit('click', ev);
}
</script>

<template>
  <component 
    :is="as"
    class="sh-button"
    :disabled="isButton ? disabled : undefined"
    :aria-disabled="!isButton && disabled ? 'true' : undefined"
    @click="onClick"
  >
    <slot />
  </component>
</template>
