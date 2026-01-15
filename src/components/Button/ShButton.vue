<script setup lang="ts">
import { computed, onMounted, useAttrs } from 'vue';

type ButtonAs = 'button' | 'a';
type ButtonType = 'button' | 'submit' | 'reset';
type ButtonVariant = 'default' | 'primary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

const props = withDefaults(defineProps<{
  as?: ButtonAs
  disabled?: boolean
  variant?: ButtonVariant
  size?: ButtonSize
  type?: ButtonType
}>(), {
  as: 'button',
  disabled: false,
  variant: 'default',
  size: 'md',
  type: 'button',
});

const emit = defineEmits<{
  (event: 'click', mouseEvent: MouseEvent): void
}>();

const isButton = computed(() => props.as === 'button');

function onClick(mouseEvent: MouseEvent) {
  if (props.disabled) {
    mouseEvent.preventDefault();
    mouseEvent.stopImmediatePropagation();
    return;
  }
  emit('click', mouseEvent);
};

function onKeydown(event: KeyboardEvent) {
  if (props.disabled) return;

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    // Keyboard activation should behave like click for users.
    emit('click', event as unknown as MouseEvent);
  }
};

onMounted(() => {
  if (import.meta.env.DEV){
    if (props.as === 'a') {
      const hasHref = 'href' in (useAttrs() as Record<string, unknown>);
      if (!hasHref) {
        console.warn(
          '[ShButton] as="a" was used without an href.' + 
          'Anchors without href are not accessible.' + 
          'Add an href or use the default button.'
        )
      }
    }
  }
});

</script>

<template>
  <component 
    :is="as"
    class="sh-button"
    :data-disabled="disabled || undefined"
    :data-variant="variant"
    :data-size="size"
    :type="isButton ? type : undefined"
    :disabled="isButton ? disabled : undefined"
    :aria-disabled="!isButton && disabled ? 'true' : undefined"
    :tabindex="!isButton ? (disabled ? -1 : 0) : undefined"
    role="!isButton ? 'button' : undefined"
    @click="onClick"
    @keydown="!isButton ? onKeydown : undefined"
  >
    <slot />
  </component>
</template>
