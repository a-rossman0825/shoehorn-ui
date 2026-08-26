<script setup lang="ts">
import { computed, inject, useAttrs, useId, watchEffect } from "vue";
import { useFocus } from "../../composables";
import { getAttrString, mergeIds } from "../../utils";
import { shFieldKey } from "../Field/fieldContext";
import type { SelectOption } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    options?: SelectOption[];
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    id?: string;
    label?: string;
    error?: string;
    description?: string;
  }>(),
  { options: () => [], disabled: false, required: false },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
  change: [value: string, event: Event];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();

const attrs = useAttrs();
const field = inject(shFieldKey, null);
const generatedId = useId();
const { isFocused, elementRef, focus, blur, onFocus, onBlur } =
  useFocus<HTMLSelectElement>();
const selectId = computed(
  () => props.id ?? field?.controlId.value ?? `sh-select-${generatedId}`,
);
const labelId = computed(() =>
  props.label ? `${selectId.value}-label` : undefined,
);
const errorId = computed(() =>
  props.error ? `${selectId.value}-error` : undefined,
);
const descriptionId = computed(() =>
  props.description ? `${selectId.value}-description` : undefined,
);
const resolvedLabelledBy = computed(() =>
  mergeIds(
    getAttrString(attrs, "aria-labelledby"),
    labelId.value,
    field?.labelId.value,
  ),
);
const resolvedDescribedBy = computed(() =>
  mergeIds(
    getAttrString(attrs, "aria-describedby"),
    field?.describedBy.value,
    descriptionId.value,
    errorId.value,
  ),
);
const isDisabled = computed(
  () => props.disabled || field?.disabled.value || false,
);
const isRequired = computed(
  () => props.required || field?.required.value || false,
);
const isInvalid = computed(
  () => Boolean(props.error) || field?.invalid.value || false,
);
const dataState = computed(() =>
  isDisabled.value
    ? "disabled"
    : isInvalid.value
      ? "invalid"
      : isFocused.value
        ? "focused"
        : "idle",
);

function handleChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value;
  emit("update:modelValue", value);
  emit("change", value, event);
}
function handleFocus(event: FocusEvent) {
  onFocus();
  emit("focus", event);
}
function handleBlur(event: FocusEvent) {
  onBlur();
  emit("blur", event);
}

if (process.env.NODE_ENV !== "production") {
  watchEffect(() => {
    if (
      !props.label &&
      !getAttrString(attrs, "aria-label") &&
      !resolvedLabelledBy.value
    ) {
      console.warn(
        "[ShSelect] Select requires an accessible name. Provide `label`, `aria-label`, or `aria-labelledby`.",
      );
    }
  });
}

defineExpose({ focus, blur });
</script>

<template>
  <div class="sh-select" :data-state="dataState">
    <label
      v-if="label"
      :id="labelId"
      :for="selectId"
      class="sh-select__label"
      >{{ label }}</label
    >
    <select
      v-bind="attrs"
      :id="selectId"
      ref="elementRef"
      class="sh-select__control"
      :name="name"
      :value="modelValue"
      :disabled="isDisabled"
      :required="isRequired"
      :aria-invalid="isInvalid || undefined"
      :aria-labelledby="resolvedLabelledBy"
      :aria-describedby="resolvedDescribedBy"
      :data-state="dataState"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <option v-if="placeholder" value="" :disabled="isRequired">
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>
    <p v-if="description" :id="descriptionId" class="sh-select__description">
      {{ description }}
    </p>
    <p v-if="error" :id="errorId" class="sh-select__error">{{ error }}</p>
  </div>
</template>
