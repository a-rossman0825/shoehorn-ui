<script setup lang="ts">
import { computed, onMounted, provide, ref, useAttrs } from "vue";

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    name?: string;
    options?: RadioOption[];
    disabled?: boolean;
    required?: boolean;
    orientation?: "horizontal" | "vertical";
    label?: string;
  }>(),
  {
    orientation: "vertical",
    disabled: false,
    required: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
  change: [value: string, event: Event];
}>();

const attrs = useAttrs();
const groupId = computed(
  () => `sh-radio-group-${Math.random().toString(36).slice(2)}`,
);
const activeIndex = ref(0);

// Provide group context to child radios
provide("radioGroup", {
  name: props.name || groupId.value,
  modelValue: computed(() => props.modelValue),
  disabled: computed(() => props.disabled),
  updateValue: (value: string, event: Event) => {
    if (!props.disabled) {
      emit("update:modelValue", value);
      emit("change", value, event);
    }
  },
});

function onChange(value: string, event: Event) {
  if (!props.disabled) {
    emit("update:modelValue", value);
    emit("change", value, event);
  }
}

function onKeydown(event: KeyboardEvent) {
  if (props.disabled || !props.options) return;

  const enabledOptions = props.options.filter((opt) => !opt.disabled);
  if (enabledOptions.length === 0) return;

  let handled = false;
  const currentIndex = enabledOptions.findIndex(
    (opt) => opt.value === props.modelValue,
  );

  if (event.key === "ArrowDown" || event.key === "ArrowRight") {
    event.preventDefault();
    const nextIndex = (currentIndex + 1) % enabledOptions.length;
    onChange(enabledOptions[nextIndex].value, event as unknown as Event);
    handled = true;
  } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
    event.preventDefault();
    const prevIndex =
      currentIndex <= 0 ? enabledOptions.length - 1 : currentIndex - 1;
    onChange(enabledOptions[prevIndex].value, event as unknown as Event);
    handled = true;
  }

  if (handled) {
    // Focus the newly selected radio
    setTimeout(() => {
      const selectedRadio = document.querySelector(
        `input[name="${props.name || groupId.value}"][value="${props.modelValue}"]`,
      ) as HTMLInputElement;
      selectedRadio?.focus();
    }, 0);
  }
}

onMounted(() => {
  if (import.meta.env.DEV) {
    const hasLabel =
      !!props.label ||
      attrs["aria-label"] !== undefined ||
      attrs["aria-labelledby"] !== undefined;

    if (!hasLabel) {
      console.warn(
        "[ShRadioGroup] Radio group has no accessible label. " +
          "Provide `label`, `aria-label`, or `aria-labelledby`.",
      );
    }

    if (!props.options || props.options.length === 0) {
      console.warn(
        "[ShRadioGroup] Radio group has no options. " +
          "Provide the `options` prop with at least one radio option.",
      );
    }

    if (
      props.required &&
      props.label &&
      !props.label.includes("*") &&
      !props.label.toLowerCase().includes("required")
    ) {
      console.warn(
        "[ShRadioGroup] Radio group is required but label doesn't indicate this visually. " +
          "Consider adding an asterisk (*) or '(required)' to the label text.",
      );
    }

    if (props.options && props.options.length > 0 && !props.modelValue) {
      console.warn(
        "[ShRadioGroup] Radio group has options but no default value selected. " +
          "Consider setting a default modelValue for better UX.",
      );
    }
  }
});
</script>

<template>
  <div
    class="sh-radio-group"
    role="radiogroup"
    :aria-label="attrs['aria-label'] as string | undefined"
    :aria-labelledby="
      label
        ? `${groupId}-label`
        : (attrs['aria-labelledby'] as string | undefined)
    "
    :aria-describedby="attrs['aria-describedby'] as string | undefined"
    :aria-required="required ? 'true' : undefined"
    :aria-disabled="disabled ? 'true' : undefined"
    :data-orientation="orientation"
    @keydown="onKeydown"
  >
    <legend v-if="label" :id="`${groupId}-label`" class="sh-radio-group__label">
      {{ label }}
    </legend>

    <div class="sh-radio-group__options" :data-orientation="orientation">
      <div
        v-for="option in options"
        :key="option.value"
        class="sh-radio-group__option"
      >
        <input
          :id="`${groupId}-${option.value}`"
          type="radio"
          class="sh-radio-group__input"
          :name="name || groupId"
          :value="option.value"
          :checked="modelValue === option.value"
          :disabled="disabled || option.disabled"
          :required="required"
          :tabindex="modelValue === option.value ? 0 : -1"
          @change="onChange(option.value, $event)"
        />
        <label
          :for="`${groupId}-${option.value}`"
          class="sh-radio-group__option-label"
        >
          {{ option.label }}
        </label>
      </div>
    </div>

    <slot />
  </div>
</template>
