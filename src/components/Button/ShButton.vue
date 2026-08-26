<script setup lang="ts">
/* eslint-disable vue/no-required-prop-with-default */
import { computed, onMounted, onUpdated, ref, useAttrs } from "vue";
import { getAttrString } from "../../utils";
import { useResolvedAriaAttr } from "../../composables";

defineOptions({ inheritAttrs: false });

type ButtonType = "button" | "submit" | "reset";
type ButtonVariant = "default" | "primary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";
type ButtonElementProps =
  | { as?: "button"; href?: never; target?: never; rel?: never }
  | { as: "a"; href: string; target?: string; rel?: string };
type ButtonAccessibilityProps =
  | { iconOnly: true; label: string }
  | { iconOnly?: false; label?: string };
type ButtonProps = ButtonElementProps &
  ButtonAccessibilityProps & {
    disabled?: boolean;
    variant?: ButtonVariant;
    size?: ButtonSize;
    type?: ButtonType;
    labelledBy?: string;
  };

const props = withDefaults(defineProps<ButtonProps>(), {
  as: "button",
  disabled: false,
  variant: "default",
  size: "md",
  type: "button",
  iconOnly: false,
});
const emit = defineEmits<{ click: [event: MouseEvent] }>();
const attrs = useAttrs() as Record<string, unknown>;
const isButton = computed(() => props.as === "button");
const resolvedAriaLabelledBy = useResolvedAriaAttr(
  attrs,
  "aria-labelledby",
  props.labelledBy,
);
const resolvedAriaLabel = computed(() => {
  const attrLabel = getAttrString(attrs, "aria-label");
  return attrLabel || (resolvedAriaLabelledBy.value ? undefined : props.label);
});
const elementRef = ref<HTMLElement>();

function handleClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault();
    event.stopImmediatePropagation();
    return;
  }
  emit("click", event);
}

function validateAccessibleName() {
  if (process.env.NODE_ENV !== "production") {
    const accessible = Boolean(
      resolvedAriaLabel.value ||
      resolvedAriaLabelledBy.value ||
      elementRef.value?.textContent?.trim(),
    );
    if (!accessible) {
      console.warn(
        "[ShButton] Button or link requires an accessible name. Provide visible text, `label`, or `labelledBy`.",
      );
    }
  }
}
onMounted(validateAccessibleName);
onUpdated(validateAccessibleName);
</script>

<template>
  <component
    :is="as"
    ref="elementRef"
    v-bind="attrs"
    class="sh-button"
    :data-disabled="disabled || undefined"
    :data-variant="variant"
    :data-size="size"
    :href="!isButton && !disabled ? href : undefined"
    :target="!isButton ? target : undefined"
    :rel="!isButton ? rel : undefined"
    :type="isButton ? type : undefined"
    :disabled="isButton ? disabled : undefined"
    :aria-disabled="!isButton && disabled ? 'true' : undefined"
    :aria-label="resolvedAriaLabel"
    :aria-labelledby="resolvedAriaLabelledBy"
    :tabindex="!isButton && disabled ? -1 : undefined"
    @click="handleClick"
  >
    <slot />
  </component>
</template>
