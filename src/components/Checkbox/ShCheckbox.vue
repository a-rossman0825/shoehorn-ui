<script setup lang="ts">
import { computed, onMounted, ref, useAttrs } from "vue";

type CheckedState = boolean | "indeterminate";

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
}>();

const attrs = useAttrs();
const checkboxRef = ref<HTMLInputElement>();

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

  // If going from indeterminate to checked, clear indeterminate
  if (props.indeterminate) {
    emit("update:indeterminate", false);
  }

  emit("update:modelValue", target.checked);
  emit("change", event);
}

function onKeydown(event: KeyboardEvent) {
  // Space should toggle checkbox
  if (event.key === " ") {
    event.preventDefault();
    if (!props.disabled) {
      checkboxRef.value?.click();
    }
  }
}

defineExpose({
  focus: () => checkboxRef.value?.focus(),
  blur: () => checkboxRef.value?.blur(),
});

onMounted(() => {
  if (process.env.NODE_ENV !== 'production') {
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

  // Sync indeterminate state with DOM
  if (checkboxRef.value) {
    checkboxRef.value.indeterminate = props.indeterminate;
  }
});

// Watch for indeterminate changes
import { watch } from "vue";
watch(
  () => props.indeterminate,
  (value) => {
    if (checkboxRef.value) {
      checkboxRef.value.indeterminate = value;
    }
  },
);
</script>

<template>
  <div class="sh-checkbox">
    <input
      :id="checkboxId"
      ref="checkboxRef"
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
    />
    <label v-if="label" :for="checkboxId" class="sh-checkbox__label">
      {{ label }}
    </label>
  </div>
</template>
