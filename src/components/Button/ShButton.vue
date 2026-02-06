<script setup lang="ts">
import { computed, onMounted, useAttrs, useSlots } from "vue";

type ButtonAs = "button" | "a";
type ButtonType = "button" | "submit" | "reset";
type ButtonVariant = "default" | "primary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const props = withDefaults(
  defineProps<{
    as?: ButtonAs;
    disabled?: boolean;
    variant?: ButtonVariant;
    size?: ButtonSize;
    type?: ButtonType;
  }>(),
  {
    as: "button",
    disabled: false,
    variant: "default",
    size: "md",
    type: "button",
  },
);

const emit = defineEmits<{
  (event: "click", mouseEvent: MouseEvent): void;
}>();

const isButton = computed(() => props.as === "button");

function onClick(mouseEvent: MouseEvent) {
  if (props.disabled) {
    mouseEvent.preventDefault();
    mouseEvent.stopImmediatePropagation();
    return;
  }
  emit("click", mouseEvent);
}

function onKeydown(event: KeyboardEvent) {
  if (props.disabled) return;

  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    // Create a synthetic MouseEvent for consistency
    const syntheticEvent = new MouseEvent("click", {
      bubbles: event.bubbles,
      cancelable: event.cancelable,
      view: window,
    });
    emit("click", syntheticEvent);
  }
}

onMounted(() => {
  if (process.env.NODE_ENV !== 'production') {
    const attrs = useAttrs() as Record<string, unknown>;
    const slots = useSlots();

    if (props.as === "a") {
      const hasHref = "href" in attrs;
      if (!hasHref) {
        console.warn(
          '[ShButton] as="a" was used without an href. ' +
            "Anchors without href are not accessible. " +
            "Add an href or use the default button.",
        );
      }
    }

    // Check for accessible text content
    const hasAriaLabel = "aria-label" in attrs;
    const hasAriaLabelledBy = "aria-labelledby" in attrs;
    const hasSlotContent =
      slots.default &&
      slots.default().some((vnode) => {
        // Check if slot has text content
        if (typeof vnode.children === "string") {
          return vnode.children.trim().length > 0;
        }
        // For more complex slot content, assume it's okay
        return vnode.children !== null;
      });

    if (!hasAriaLabel && !hasAriaLabelledBy && !hasSlotContent) {
      console.warn(
        "[ShButton] Button has no accessible text. " +
          "Provide slot content, aria-label, or aria-labelledby for icon-only buttons.",
      );
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
    :role="!isButton ? 'button' : undefined"
    @click="onClick"
    @keydown="!isButton ? onKeydown($event) : undefined"
  >
    <slot />
  </component>
</template>
