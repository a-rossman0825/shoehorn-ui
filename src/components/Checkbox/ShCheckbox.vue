<script setup lang="ts">
import {
  computed,
  inject,
  onMounted,
  useAttrs,
  useId,
  watch,
  watchEffect,
} from "vue";
import { useFocus } from "../../composables";
import { getAttrString, mergeIds } from "../../utils";
import { shFieldKey } from "../Field/fieldContext";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
    id?: string;
    label?: string;
  }>(),
  {
    modelValue: false,
    indeterminate: false,
    disabled: false,
    required: false,
    value: "on",
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  "update:indeterminate": [value: boolean];
  change: [event: Event];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();
const attrs = useAttrs();
const field = inject(shFieldKey, null);
const generatedId = useId();
const { elementRef, focus, blur, onFocus, onBlur } =
  useFocus<HTMLInputElement>();
const checkboxId = computed(
  () => props.id ?? field?.controlId.value ?? `sh-checkbox-${generatedId}`,
);
const labelId = computed(() =>
  props.label ? `${checkboxId.value}-label` : undefined,
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
  isDisabled.value
    ? "disabled"
    : props.indeterminate
      ? "indeterminate"
      : props.modelValue
        ? "checked"
        : "unchecked",
);

function syncIndeterminate() {
  if (elementRef.value) elementRef.value.indeterminate = props.indeterminate;
}
function handleChange(event: Event) {
  if (props.indeterminate) emit("update:indeterminate", false);
  emit("update:modelValue", (event.target as HTMLInputElement).checked);
  emit("change", event);
}
function handleFocus(event: FocusEvent) {
  onFocus();
  emit("focus", event);
}
function handleBlur(event: FocusEvent) {
  onBlur();
  emit("blur", event);
}
onMounted(syncIndeterminate);
watch(() => props.indeterminate, syncIndeterminate);
if (process.env.NODE_ENV !== "production") {
  watchEffect(() => {
    if (
      !props.label &&
      !getAttrString(attrs, "aria-label") &&
      !resolvedLabelledBy.value
    ) {
      console.warn(
        "[ShCheckbox] Checkbox requires an accessible name. Provide `label`, `aria-label`, or `aria-labelledby`.",
      );
    }
  });
}
defineExpose({ focus, blur });
</script>

<template>
  <div class="sh-checkbox" :data-state="dataState">
    <input
      v-bind="attrs"
      :id="checkboxId"
      ref="elementRef"
      type="checkbox"
      class="sh-checkbox__input"
      :name="name"
      :value="value"
      :checked="modelValue"
      :disabled="isDisabled"
      :required="isRequired"
      :aria-labelledby="resolvedLabelledBy"
      :aria-describedby="resolvedDescribedBy"
      :aria-checked="indeterminate ? 'mixed' : undefined"
      :data-state="dataState"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <label
      v-if="label"
      :id="labelId"
      :for="checkboxId"
      class="sh-checkbox__label"
      >{{ label }}</label
    >
  </div>
</template>
