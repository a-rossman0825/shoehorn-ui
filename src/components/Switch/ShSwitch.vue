<script setup lang="ts">
import { computed, inject, useAttrs, useId, watchEffect } from "vue";
import { useFocus } from "../../composables";
import { getAttrString, mergeIds } from "../../utils";
import { shFieldKey } from "../Field/fieldContext";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
    id?: string;
    label?: string;
  }>(),
  { modelValue: false, disabled: false, required: false, value: "on" },
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  change: [checked: boolean, event: Event];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();
const attrs = useAttrs();
const field = inject(shFieldKey, null);
const generatedId = useId();
const { elementRef, focus, blur, onFocus, onBlur } =
  useFocus<HTMLInputElement>();
const switchId = computed(
  () => props.id ?? field?.controlId.value ?? `sh-switch-${generatedId}`,
);
const labelId = computed(() =>
  props.label ? `${switchId.value}-label` : undefined,
);
const resolvedLabelledBy = computed(() =>
  mergeIds(
    getAttrString(attrs, "aria-labelledby"),
    labelId.value,
    field?.labelId.value,
  ),
);
const resolvedDescribedBy = computed(() =>
  mergeIds(getAttrString(attrs, "aria-describedby"), field?.describedBy.value),
);
const isDisabled = computed(
  () => props.disabled || field?.disabled.value || false,
);
const isRequired = computed(
  () => props.required || field?.required.value || false,
);
const dataState = computed(() =>
  isDisabled.value ? "disabled" : props.modelValue ? "checked" : "unchecked",
);

function handleChange(event: Event) {
  const checked = (event.target as HTMLInputElement).checked;
  emit("update:modelValue", checked);
  emit("change", checked, event);
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
        "[ShSwitch] Switch requires an accessible name. Provide `label`, `aria-label`, or `aria-labelledby`.",
      );
    }
  });
}
defineExpose({ focus, blur });
</script>

<template>
  <label class="sh-switch" :for="switchId" :data-state="dataState">
    <input
      v-bind="attrs"
      :id="switchId"
      ref="elementRef"
      type="checkbox"
      role="switch"
      class="sh-switch__input"
      :name="name"
      :value="value"
      :checked="modelValue"
      :disabled="isDisabled"
      :required="isRequired"
      :aria-labelledby="resolvedLabelledBy"
      :aria-describedby="resolvedDescribedBy"
      :data-state="dataState"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <span class="sh-switch__control" aria-hidden="true" :data-state="dataState">
      <span class="sh-switch__thumb" :data-state="dataState" />
    </span>
    <span v-if="label" :id="labelId" class="sh-switch__label">{{ label }}</span>
  </label>
</template>
