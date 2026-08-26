<script setup lang="ts">
import { computed, inject, useAttrs, useId, watchEffect } from "vue";
import { getAttrString, mergeIds } from "../../utils";
import { shFieldKey } from "../Field/fieldContext";
import type { RadioOption } from "./types";

defineOptions({ inheritAttrs: false });

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
    options: () => [],
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
const field = inject(shFieldKey, null);
const generatedId = useId();
const groupId = computed(() => `sh-radio-group-${generatedId}`);
const legendId = computed(() =>
  props.label ? `${groupId.value}-legend` : undefined,
);
const groupName = computed(() => props.name ?? groupId.value);
const isDisabled = computed(
  () => props.disabled || field?.disabled.value || false,
);
const isRequired = computed(
  () => props.required || field?.required.value || false,
);
const resolvedLabelledBy = computed(() =>
  mergeIds(
    getAttrString(attrs, "aria-labelledby"),
    legendId.value,
    field?.labelId.value,
  ),
);
const resolvedDescribedBy = computed(() =>
  mergeIds(getAttrString(attrs, "aria-describedby"), field?.describedBy.value),
);
function handleChange(option: RadioOption, event: Event) {
  if (isDisabled.value || option.disabled) return;
  emit("update:modelValue", option.value);
  emit("change", option.value, event);
}
if (process.env.NODE_ENV !== "production") {
  watchEffect(() => {
    if (
      !props.label &&
      !getAttrString(attrs, "aria-label") &&
      !resolvedLabelledBy.value
    ) {
      console.warn(
        "[ShRadioGroup] Radio group requires an accessible name. Provide `label`, `aria-label`, or `aria-labelledby`.",
      );
    }
    if (props.options.length === 0)
      console.warn("[ShRadioGroup] Provide at least one radio option.");
  });
}
</script>

<template>
  <fieldset
    v-bind="attrs"
    class="sh-radio-group"
    :disabled="isDisabled"
    :aria-labelledby="resolvedLabelledBy"
    :aria-describedby="resolvedDescribedBy"
    :data-orientation="orientation"
  >
    <legend v-if="label" :id="legendId" class="sh-radio-group__label">
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
          :name="groupName"
          :value="option.value"
          :checked="modelValue === option.value"
          :disabled="option.disabled"
          :required="isRequired"
          @change="handleChange(option, $event)"
        />
        <label
          :for="`${groupId}-${option.value}`"
          class="sh-radio-group__option-label"
          >{{ option.label }}</label
        >
      </div>
    </div>
    <slot />
  </fieldset>
</template>
