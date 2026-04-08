<script setup lang="ts">
import { computed, onMounted, useAttrs } from "vue";
import { useFocus } from "../../composables";

type InputType = "text" | "email" | "password" | "search" | "url" | "tel";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    type?: InputType;
    id?: string;
    name?: string;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    placeholder?: string;
    minlength?: number;
    maxlength?: number;
    pattern?: string;
    autocomplete?: string;
    label?: string;
    error?: string;
    description?: string;
  }>(),
  {
    type: "text",
    disabled: false,
    readonly: false,
    required: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();

const attrs = useAttrs();
const { isFocused, elementRef, focus, blur, onFocus, onBlur } =
  useFocus<HTMLInputElement>();

defineExpose({
  focus,
  blur,
  select: () => elementRef.value?.select(),
});

function getAriaAttrs() {
  return {
    "aria-label": attrs["aria-label"],
    "aria-labelledby": attrs["aria-labelledby"],
    "aria-describedby": attrs["aria-describedby"],
  };
}

const inputId = computed(() => {
  return props.id ?? `sh-input-${Math.random().toString(36).slice(2)}`;
});

const errorId = computed(() => {
  return props.error ? `${inputId.value}-error` : undefined;
});

const descriptionId = computed(() => {
  return props.description ? `${inputId.value}-description` : undefined;
});

const ariaDescribedby = computed(() => {
  const ids = [errorId.value, descriptionId.value].filter(Boolean);
  const customDescribedby = getAriaAttrs()["aria-describedby"];
  if (customDescribedby) {
    ids.push(customDescribedby as string);
  }
  return ids.length > 0 ? ids.join(" ") : undefined;
});

const dataState = computed(() => {
  if (props.disabled) return "disabled";
  if (props.error) return "invalid";
  if (isFocused.value) return "focused";
  return "idle";
});

function onInput(event: Event) {
  if (props.disabled) return;
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}

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
    const aria = getAriaAttrs();
    const hasLabel =
      !!props.label ||
      aria["aria-label"] !== undefined ||
      aria["aria-labelledby"] !== undefined;

    if (!hasLabel) {
      console.warn(
        "[ShInput] Input has no accessible label. " +
          "Provide `label`, `aria-label`, or `aria-labelledby`.",
      );
    }

    // NOTE: Required fields should look required, not just be required in code.
    if (
      props.required &&
      props.label &&
      !props.label.includes("*") &&
      !props.label.toLowerCase().includes("required")
    ) {
      console.warn(
        "[ShInput] Input is required but label doesn't indicate this visually. " +
          "Consider adding an asterisk (*) or '(required)' to the label text.",
      );
    }

    // NOTE: These input types usually benefit from autocomplete hints.
    const shouldHaveAutocomplete = ["email", "tel", "url"].includes(props.type);
    if (
      shouldHaveAutocomplete &&
      !props.autocomplete &&
      !attrs["autocomplete"]
    ) {
      console.warn(
        `[ShInput] Input type="${props.type}" should typically have an autocomplete attribute. ` +
          `Consider adding autocomplete="${props.type}" for better UX.`,
      );
    }
  }
});
</script>

<template>
  <div class="sh-input">
    <label v-if="label" :for="inputId" class="sh-input__label">
      {{ label }}
    </label>

    <input
      :id="inputId"
      ref="elementRef"
      class="sh-input__control"
      :type="type"
      :name="name"
      :value="modelValue"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :placeholder="placeholder"
      :minlength="minlength"
      :maxlength="maxlength"
      :pattern="pattern"
      :autocomplete="autocomplete"
      :aria-invalid="error ? 'true' : undefined"
      :aria-label="getAriaAttrs()['aria-label'] as string | undefined"
      :aria-labelledby="getAriaAttrs()['aria-labelledby'] as string | undefined"
      :aria-describedby="ariaDescribedby"
      :data-state="dataState"
      @input="onInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <p v-if="description" :id="descriptionId" class="sh-input__description">
      {{ description }}
    </p>

    <p v-if="error" :id="errorId" class="sh-input__error" role="alert">
      {{ error }}
    </p>
  </div>
</template>
