<script setup lang="ts">
import { computed, onMounted, useAttrs, watch } from "vue";
import { useFocus } from "../../composables";

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
    id?: string;
    label?: string;
  }>(),
  {
    modelValue: false,
    indeterminate: false,
    disabled: false,
    required: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  "update:indeterminate": [value: boolean];
  change: [event: Event];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();

const attrs = useAttrs();
const { elementRef, focus, blur, onFocus, onBlur } =
  useFocus<HTMLInputElement>();

const checkboxId = computed(() => {
  return props.id ?? `sh-checkbox-${Math.random().toString(36).slice(2)}`;
});

const dataState = computed(() => {
  if (props.disabled) return "disabled";
  if (props.indeterminate) return "indeterminate";
  if (props.modelValue) return "checked";
  return "unchecked";
});

function onChange(event: Event) {
  if (props.disabled) return;

  const target = event.target as HTMLInputElement;

  // NOTE: Once the user checks it, we clear the mixed state.
  if (props.indeterminate) {
    emit("update:indeterminate", false);
  }

  emit("update:modelValue", target.checked);
  emit("change", event);
}

function onKeydown(event: KeyboardEvent) {
  // NOTE: Match native checkbox keyboard behavior.
  if (event.key === " ") {
    event.preventDefault();
    if (!props.disabled) {
      elementRef.value?.click();
    }
  }
}

defineExpose({
  focus,
  blur,
});

function handleFocus(event: FocusEvent) {
  onFocus();
  emit("focus", event);
}

function handleBlur(event: FocusEvent) {
  onBlur();
  emit("blur", event);
}

onMounted(() => {
  if (process.env.NODE_ENV !== "production") {
    const hasLabel =
      !!props.label ||
      attrs["aria-label"] !== undefined ||
      attrs["aria-labelledby"] !== undefined;

    if (!hasLabel) {
      console.warn(
        "[ShCheckbox] Checkbox has no accessible label. " +
          "Provide `label`, `aria-label`, or `aria-labelledby`.",
      );
    }

    if (
      props.required &&
      props.label &&
      !props.label.includes("*") &&
      !props.label.toLowerCase().includes("required")
    ) {
      console.warn(
        "[ShCheckbox] Checkbox is required but label doesn't indicate this visually. " +
          "Consider adding an asterisk (*) or '(required)' to the label text.",
      );
    }
  }

  // NOTE: Keep DOM `indeterminate` in sync on first render.
  if (elementRef.value) {
    elementRef.value.indeterminate = props.indeterminate;
  }
});

// NOTE: Keep DOM `indeterminate` in sync when prop changes later.
watch(
  () => props.indeterminate,
  (value) => {
    if (elementRef.value) {
      elementRef.value.indeterminate = value;
    }
  },
);
</script>

<template>
  <div class="sh-checkbox">
    <input
      :id="checkboxId"
      ref="elementRef"
      type="checkbox"
      class="sh-checkbox__input"
      :name="name"
      :value="value"
      :checked="modelValue"
      :disabled="disabled"
      :required="required"
      :aria-label="attrs['aria-label'] as string | undefined"
      :aria-labelledby="attrs['aria-labelledby'] as string | undefined"
      :aria-describedby="attrs['aria-describedby'] as string | undefined"
      :aria-checked="indeterminate ? 'mixed' : modelValue ? 'true' : 'false'"
      :data-state="dataState"
      @change="onChange"
      @keydown="onKeydown"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <label v-if="label" :for="checkboxId" class="sh-checkbox__label">
      {{ label }}
    </label>
  </div>
</template>
