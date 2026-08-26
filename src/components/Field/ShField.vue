<script setup lang="ts">
import { computed, provide, useId, useSlots, watchEffect } from "vue";
import { mergeIds } from "../../utils";
import { shFieldKey } from "./fieldContext";

const props = withDefaults(
  defineProps<{
    id?: string;
    label?: string;
    error?: string;
    description?: string;
    required?: boolean;
    optional?: boolean;
    disabled?: boolean;
  }>(),
  {
    required: false,
    optional: false,
    disabled: false,
  },
);

const slots = useSlots();
const generatedId = useId();
const controlId = computed(() => props.id ?? `sh-field-${generatedId}`);
const labelId = computed(() => `${controlId.value}-label`);
const descriptionId = computed(() =>
  props.description || slots.description
    ? `${controlId.value}-description`
    : undefined,
);
const errorId = computed(() =>
  props.error || slots.error ? `${controlId.value}-error` : undefined,
);
const describedBy = computed(() =>
  mergeIds(descriptionId.value, errorId.value),
);
const invalid = computed(() => Boolean(props.error || slots.error));

provide(shFieldKey, {
  controlId,
  labelId,
  descriptionId,
  errorId,
  describedBy,
  required: computed(() => props.required),
  disabled: computed(() => props.disabled),
  invalid,
});

if (process.env.NODE_ENV !== "production") {
  watchEffect(() => {
    if (!props.label && !slots.label) {
      console.warn(
        "[ShField] Field has no visible label. Provide `label` or a `label` slot.",
      );
    }
    if (props.required && props.optional) {
      console.warn("[ShField] `required` and `optional` cannot both be true.");
    }
  });
}
</script>

<template>
  <div
    class="sh-field"
    :data-disabled="disabled || undefined"
    :data-invalid="invalid || undefined"
  >
    <div class="sh-field__label-wrapper">
      <label :id="labelId" :for="controlId" class="sh-field__label">
        <slot name="label">{{ label }}</slot>
      </label>
      <span v-if="required" class="sh-field__required">
        <span aria-hidden="true">*</span>
        <span class="sh-sr-only"> required</span>
      </span>
      <span v-else-if="optional" class="sh-field__optional">(optional)</span>
    </div>

    <slot
      :id="controlId"
      :aria-labelledby="labelId"
      :aria-describedby="describedBy"
      :aria-invalid="invalid || undefined"
      :required="required"
      :disabled="disabled"
    />

    <p
      v-if="description || $slots.description"
      :id="descriptionId"
      class="sh-field__description"
    >
      <slot name="description">{{ description }}</slot>
    </p>
    <p v-if="error || $slots.error" :id="errorId" class="sh-field__error">
      <slot name="error">{{ error }}</slot>
    </p>
  </div>
</template>
