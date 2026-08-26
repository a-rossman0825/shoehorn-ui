<script setup lang="ts">
import { computed, inject, useAttrs, useId, watchEffect } from "vue";
import { useFocus } from "../../composables";
import { getAttrString, mergeIds } from "../../utils";
import { shFieldKey } from "../Field/fieldContext";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    id?: string;
    name?: string;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    placeholder?: string;
    minlength?: number;
    maxlength?: number;
    rows?: number;
    cols?: number;
    resize?: "none" | "both" | "horizontal" | "vertical";
    label?: string;
    error?: string;
    description?: string;
  }>(),
  {
    disabled: false,
    readonly: false,
    required: false,
    rows: 4,
    resize: "vertical",
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();
const attrs = useAttrs();
const field = inject(shFieldKey, null);
const generatedId = useId();
const { isFocused, elementRef, focus, blur, onFocus, onBlur } =
  useFocus<HTMLTextAreaElement>();
const textareaId = computed(
  () => props.id ?? field?.controlId.value ?? `sh-textarea-${generatedId}`,
);
const labelId = computed(() =>
  props.label ? `${textareaId.value}-label` : undefined,
);
const errorId = computed(() =>
  props.error ? `${textareaId.value}-error` : undefined,
);
const descriptionId = computed(() =>
  props.description ? `${textareaId.value}-description` : undefined,
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

function handleInput(event: Event) {
  if (!isDisabled.value)
    emit("update:modelValue", (event.target as HTMLTextAreaElement).value);
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
        "[ShTextarea] Textarea requires an accessible name. Provide `label`, `aria-label`, or `aria-labelledby`.",
      );
    }
  });
}
defineExpose({ focus, blur, select: () => elementRef.value?.select() });
</script>

<template>
  <div class="sh-textarea" :data-state="dataState">
    <label
      v-if="label"
      :id="labelId"
      :for="textareaId"
      class="sh-textarea__label"
      >{{ label }}</label
    >
    <textarea
      v-bind="attrs"
      :id="textareaId"
      ref="elementRef"
      class="sh-textarea__control"
      :name="name"
      :value="modelValue"
      :disabled="isDisabled"
      :readonly="readonly"
      :required="isRequired"
      :placeholder="placeholder"
      :minlength="minlength"
      :maxlength="maxlength"
      :rows="rows"
      :cols="cols"
      :aria-invalid="isInvalid || undefined"
      :aria-labelledby="resolvedLabelledBy"
      :aria-describedby="resolvedDescribedBy"
      :data-state="dataState"
      :data-resize="resize"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <p v-if="description" :id="descriptionId" class="sh-textarea__description">
      {{ description }}
    </p>
    <p v-if="error" :id="errorId" class="sh-textarea__error">{{ error }}</p>
  </div>
</template>
