<script setup lang="ts">
import { computed, inject, useAttrs, useId, watchEffect } from "vue";
import { useFocus } from "../../composables";
import { getAttrString, mergeIds } from "../../utils";
import { shFieldKey } from "../Field/fieldContext";

defineOptions({ inheritAttrs: false });

type InputType = "text" | "email" | "password" | "search" | "url" | "tel";

const props = withDefaults(
  defineProps<{
    type?: InputType;
    id?: string;
    name?: string;
    modelValue?: string;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    error?: string;
    description?: string;
    minlength?: number;
    maxlength?: number;
    pattern?: string;
    required?: boolean;
    autocomplete?: string;
  }>(),
  { type: "text", disabled: false, readonly: false, required: false },
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
  useFocus<HTMLInputElement>();

const inputId = computed(
  () => props.id ?? field?.controlId.value ?? `sh-input-${generatedId}`,
);
const errorId = computed(() =>
  props.error ? `${inputId.value}-error` : undefined,
);
const descriptionId = computed(() =>
  props.description ? `${inputId.value}-description` : undefined,
);
const resolvedDescribedBy = computed(() =>
  mergeIds(
    getAttrString(attrs, "aria-describedby"),
    field?.describedBy.value,
    descriptionId.value,
    errorId.value,
  ),
);
const resolvedLabelledBy = computed(
  () => getAttrString(attrs, "aria-labelledby") ?? field?.labelId.value,
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
const dataState = computed(() => {
  if (isDisabled.value) return "disabled";
  if (isInvalid.value) return "invalid";
  if (isFocused.value) return "focused";
  return "idle";
});

function handleInput(event: Event) {
  if (!isDisabled.value) {
    emit("update:modelValue", (event.target as HTMLInputElement).value);
  }
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
    const hasName = Boolean(
      getAttrString(attrs, "aria-label") || resolvedLabelledBy.value || field,
    );
    if (!hasName && !props.id) {
      console.warn(
        "[ShInput] Input requires an accessible name. Provide an associated label, `aria-label`, or `aria-labelledby`.",
      );
    }
  });
}

defineExpose({ focus, blur, select: () => elementRef.value?.select() });
</script>

<template>
  <div class="sh-input" :data-state="dataState">
    <input
      v-bind="attrs"
      :id="inputId"
      ref="elementRef"
      class="sh-input__control"
      :name="name"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="isDisabled"
      :readonly="readonly"
      :minlength="minlength"
      :maxlength="maxlength"
      :pattern="pattern"
      :required="isRequired"
      :autocomplete="autocomplete"
      :aria-invalid="isInvalid || undefined"
      :aria-labelledby="resolvedLabelledBy"
      :aria-describedby="resolvedDescribedBy"
      :data-state="dataState"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <p v-if="description" :id="descriptionId" class="sh-input__description">
      {{ description }}
    </p>
    <p v-if="error" :id="errorId" class="sh-input__error">
      {{ error }}
    </p>
  </div>
</template>
