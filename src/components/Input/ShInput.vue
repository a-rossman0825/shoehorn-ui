<script setup lang="ts">
type inputType = "text" | "email" | "password" | "search" | "url" | "tel";

const props = withDefaults(
  defineProps<{
    type?: inputType;
    id?: string;
    modelValue?: string;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    error?: string;
  }>(),
  {
    type: "text",
    id: undefined,
    modelValue: undefined,
    placeholder: undefined,
    disabled: false,
    readonly: false,
    error: undefined,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const handleInput = (event: Event) => {
  if (props.disabled) return;

  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <input
    :id="id"
    :value="modelValue"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    @input="handleInput"
  />
</template>
