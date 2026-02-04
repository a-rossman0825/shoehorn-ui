<script setup lang="ts">
import { computed, onMounted, ref, useAttrs } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
    id?: string;
    label?: string;
  }>(),
  {
    modelValue: false,
    disabled: false,
    required: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  change: [checked: boolean, event: Event];
}>();

const attrs = useAttrs();
const switchRef = ref<HTMLButtonElement>();

const switchId = computed(() => {
  return props.id ?? `sh-switch-${Math.random().toString(36).slice(2)}`;
});

const dataState = computed(() => {
  if (props.disabled) return "disabled";
  return props.modelValue ? "checked" : "unchecked";
});

function toggle(event: MouseEvent | KeyboardEvent) {
  if (props.disabled) {
    event.preventDefault();
    return;
  }

  const newValue = !props.modelValue;
  emit("update:modelValue", newValue);
  emit("change", newValue, event as Event);
}

function onKeydown(event: KeyboardEvent) {
  if (props.disabled) return;

  if (event.key === " " || event.key === "Enter") {
    event.preventDefault();
    toggle(event);
  }
}

defineExpose({
  focus: () => switchRef.value?.focus(),
  blur: () => switchRef.value?.blur(),
});

onMounted(() => {
  if (import.meta.env.DEV) {
    const hasLabel =
      !!props.label ||
      attrs["aria-label"] !== undefined ||
      attrs["aria-labelledby"] !== undefined;

    if (!hasLabel) {
      console.warn(
        "[ShSwitch] Switch has no accessible label. " +
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
        "[ShSwitch] Switch is required but label doesn't indicate this visually. " +
          "Consider adding an asterisk (*) or '(required)' to the label text.",
      );
    }
  }
});
</script>

<template>
  <div class="sh-switch">
    <button
      :id="switchId"
      ref="switchRef"
      type="button"
      role="switch"
      class="sh-switch__control"
      :aria-checked="modelValue"
      :aria-label="attrs['aria-label'] as string | undefined"
      :aria-labelledby="
        label
          ? `${switchId}-label`
          : (attrs['aria-labelledby'] as string | undefined)
      "
      :aria-describedby="attrs['aria-describedby'] as string | undefined"
      :aria-required="required ? 'true' : undefined"
      :disabled="disabled"
      :data-state="dataState"
      @click="toggle"
      @keydown="onKeydown"
    >
      <span class="sh-switch__thumb" :data-state="dataState" />
    </button>

    <!-- Hidden input for form submission -->
    <input
      v-if="name"
      type="checkbox"
      :name="name"
      :value="value"
      :checked="modelValue"
      :required="required"
      :disabled="disabled"
      style="position: absolute; opacity: 0; pointer-events: none"
      tabindex="-1"
      aria-hidden="true"
    />

    <label
      v-if="label"
      :id="`${switchId}-label`"
      :for="switchId"
      class="sh-switch__label"
      @click="switchRef?.focus()"
    >
      {{ label }}
    </label>
  </div>
</template>
