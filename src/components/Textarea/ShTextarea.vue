<script setup lang="ts">
import { computed, onMounted, ref, useAttrs } from "vue";

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
const isFocused = ref(false);
const textareaRef = ref<HTMLTextAreaElement>();

const textareaId = computed(() => {
  return props.id ?? `sh-textarea-${Math.random().toString(36).slice(2)}`;
});

const errorId = computed(() => {
  return props.error ? `${textareaId.value}-error` : undefined;
});

const descriptionId = computed(() => {
  return props.description ? `${textareaId.value}-description` : undefined;
});

const ariaDescribedby = computed(() => {
  const ids = [errorId.value, descriptionId.value].filter(Boolean);
  const customDescribedby = attrs["aria-describedby"];
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
  const target = event.target as HTMLTextAreaElement;
  emit("update:modelValue", target.value);
}

function onFocus(event: FocusEvent) {
  isFocused.value = true;
  emit("focus", event);
}

function onBlur(event: FocusEvent) {
  isFocused.value = false;
  emit("blur", event);
}

defineExpose({
  focus: () => textareaRef.value?.focus(),
  blur: () => textareaRef.value?.blur(),
  select: () => textareaRef.value?.select(),
});

onMounted(() => {
  if (process.env.NODE_ENV !== 'production') {
    const hasLabel =
      !!props.label ||
      attrs["aria-label"] !== undefined ||
      attrs["aria-labelledby"] !== undefined;

    if (!hasLabel) {
      console.warn(
        "[ShTextarea] Textarea has no accessible label. " +
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
        "[ShTextarea] Textarea is required but label doesn't indicate this visually. " +
          "Consider adding an asterisk (*) or '(required)' to the label text.",
      );
    }
  }
});
</script>

<template>
  <div class="sh-textarea">
    <label v-if="label" :for="textareaId" class="sh-textarea__label">
      {{ label }}
    </label>

    <textarea
      :id="textareaId"
      ref="textareaRef"
      class="sh-textarea__control"
      :name="name"
      :value="modelValue"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :placeholder="placeholder"
      :minlength="minlength"
      :maxlength="maxlength"
      :rows="rows"
      :cols="cols"
      :aria-invalid="error ? 'true' : undefined"
      :aria-label="attrs['aria-label'] as string | undefined"
      :aria-labelledby="attrs['aria-labelledby'] as string | undefined"
      :aria-describedby="ariaDescribedby"
      :data-state="dataState"
      :data-resize="resize"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />

    <p v-if="description" :id="descriptionId" class="sh-textarea__description">
      {{ description }}
    </p>

    <p v-if="error" :id="errorId" class="sh-textarea__error" role="alert">
      {{ error }}
    </p>
  </div>
</template>
