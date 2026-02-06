<script setup lang="ts">
import { computed, onMounted, ref, useAttrs } from "vue";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

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
  {
    disabled: false,
    required: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
  change: [value: string, event: Event];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();

const attrs = useAttrs();
const selectRef = ref<HTMLSelectElement>();

const selectId = computed(() => {
  return props.id ?? `sh-select-${Math.random().toString(36).slice(2)}`;
});

const errorId = computed(() => {
  return props.error ? `${selectId.value}-error` : undefined;
});

const descriptionId = computed(() => {
  return props.description ? `${selectId.value}-description` : undefined;
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
  return "idle";
});

function onChange(event: Event) {
  if (props.disabled) return;

  const target = event.target as HTMLSelectElement;
  emit("update:modelValue", target.value);
  emit("change", target.value, event);
}

function onFocus(event: FocusEvent) {
  emit("focus", event);
}

function onBlur(event: FocusEvent) {
  emit("blur", event);
}

defineExpose({
  focus: () => selectRef.value?.focus(),
  blur: () => selectRef.value?.blur(),
});

onMounted(() => {
  if (process.env.NODE_ENV !== 'production') {
    const hasLabel =
      !!props.label ||
      attrs["aria-label"] !== undefined ||
      attrs["aria-labelledby"] !== undefined;

    if (!hasLabel) {
      console.warn(
        "[ShSelect] Select has no accessible label. " +
          "Provide `label`, `aria-label`, or `aria-labelledby`.",
      );
    }

    if (!props.options || props.options.length === 0) {
      console.warn(
        "[ShSelect] Select has no options. " +
          "Provide the `options` prop with at least one option.",
      );
    }

    if (
      props.required &&
      props.label &&
      !props.label.includes("*") &&
      !props.label.toLowerCase().includes("required")
    ) {
      console.warn(
        "[ShSelect] Select is required but label doesn't indicate this visually. " +
          "Consider adding an asterisk (*) or '(required)' to the label text.",
      );
    }
  }
});
</script>

<template>
  <div class="sh-select">
    <label v-if="label" :for="selectId" class="sh-select__label">
      {{ label }}
    </label>

    <select
      :id="selectId"
      ref="selectRef"
      class="sh-select__control"
      :name="name"
      :value="modelValue"
      :disabled="disabled"
      :required="required"
      :aria-invalid="error ? 'true' : undefined"
      :aria-label="attrs['aria-label'] as string | undefined"
      :aria-labelledby="attrs['aria-labelledby'] as string | undefined"
      :aria-describedby="ariaDescribedby"
      :data-state="dataState"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
    >
      <option v-if="placeholder" value="" disabled :selected="!modelValue">
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

    <p v-if="error" :id="errorId" class="sh-select__error" role="alert">
      {{ error }}
    </p>
  </div>
</template>
