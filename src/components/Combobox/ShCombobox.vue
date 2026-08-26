<script setup lang="ts">
import {
  computed,
  inject,
  nextTick,
  ref,
  useAttrs,
  useId,
  watch,
  watchEffect,
} from "vue";
import { useFocus } from "../../composables";
import { getAttrString, mergeIds } from "../../utils";
import { shFieldKey } from "../Field/fieldContext";
import type { ComboboxOption } from "./types";

defineOptions({ inheritAttrs: false });
const props = withDefaults(
  defineProps<{
    modelValue?: string | number;
    options?: ComboboxOption[];
    id?: string;
    name?: string;
    label?: string;
    description?: string;
    error?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    autocomplete?: "list" | "both" | "none";
    filterFn?: (option: ComboboxOption, query: string) => boolean;
    noResultsText?: string;
  }>(),
  {
    options: () => [],
    disabled: false,
    required: false,
    autocomplete: "list",
    noResultsText: "No results found",
  },
);
const emit = defineEmits<{
  "update:modelValue": [value: string | number | undefined];
  change: [value: string | number | undefined];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();
const attrs = useAttrs();
const field = inject(shFieldKey, null);
const generatedId = useId();
const { elementRef, focus, blur, onFocus, onBlur } =
  useFocus<HTMLInputElement>();
const rootRef = ref<HTMLElement>();
const isOpen = ref(false);
const query = ref("");
const activeValue = ref<string | number>();
const comboboxId = computed(
  () => props.id ?? field?.controlId.value ?? `sh-combobox-${generatedId}`,
);
const listboxId = computed(() => `${comboboxId.value}-listbox`);
const labelId = computed(() =>
  props.label ? `${comboboxId.value}-label` : undefined,
);
const descriptionId = computed(() =>
  props.description ? `${comboboxId.value}-description` : undefined,
);
const errorId = computed(() =>
  props.error ? `${comboboxId.value}-error` : undefined,
);
const selectedOption = computed(() =>
  props.options.find((option) => option.value === props.modelValue),
);
const defaultFilter = (option: ComboboxOption, value: string) =>
  option.label.toLocaleLowerCase().includes(value.toLocaleLowerCase());
const filteredOptions = computed(() =>
  query.value
    ? props.options.filter((option) =>
        (props.filterFn ?? defaultFilter)(option, query.value),
      )
    : props.options,
);
const enabledOptions = computed(() =>
  filteredOptions.value.filter((option) => !option.disabled),
);
const optionId = (option: ComboboxOption) =>
  `${comboboxId.value}-option-${props.options.indexOf(option)}`;
const activeOption = computed(() =>
  enabledOptions.value.find((option) => option.value === activeValue.value),
);
const displayValue = computed(
  () => query.value || selectedOption.value?.label || "",
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

function openListbox() {
  if (isDisabled.value) return;
  isOpen.value = true;
  activeValue.value =
    selectedOption.value && !selectedOption.value.disabled
      ? selectedOption.value.value
      : enabledOptions.value[0]?.value;
}
function closeListbox() {
  isOpen.value = false;
  activeValue.value = undefined;
}
function selectOption(option: ComboboxOption) {
  if (option.disabled) return;
  emit("update:modelValue", option.value);
  emit("change", option.value);
  query.value = "";
  closeListbox();
  void nextTick(() => elementRef.value?.focus());
}
function handleInput(event: Event) {
  query.value = (event.target as HTMLInputElement).value;
  isOpen.value = true;
  activeValue.value = enabledOptions.value[0]?.value;
}
function moveActive(offset: number) {
  const options = enabledOptions.value;
  if (!options.length) return;
  const current = options.findIndex(
    (option) => option.value === activeValue.value,
  );
  const next =
    current < 0
      ? offset > 0
        ? 0
        : options.length - 1
      : (current + offset + options.length) % options.length;
  activeValue.value = options[next].value;
  void nextTick(() =>
    document
      .getElementById(optionId(options[next]))
      ?.scrollIntoView({ block: "nearest" }),
  );
}
function handleKeydown(event: KeyboardEvent) {
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    if (!isOpen.value) openListbox();
    else moveActive(event.key === "ArrowDown" ? 1 : -1);
  } else if (event.key === "Enter" && isOpen.value && activeOption.value) {
    event.preventDefault();
    selectOption(activeOption.value);
  } else if (event.key === "Escape" && isOpen.value) {
    event.preventDefault();
    query.value = "";
    closeListbox();
  } else if (event.key === "Home" && isOpen.value) {
    event.preventDefault();
    activeValue.value = enabledOptions.value[0]?.value;
  } else if (event.key === "End" && isOpen.value) {
    event.preventDefault();
    activeValue.value =
      enabledOptions.value[enabledOptions.value.length - 1]?.value;
  } else if (event.key === "Tab") closeListbox();
}
function handleFocus(event: FocusEvent) {
  onFocus();
  emit("focus", event);
}
function handleBlur(event: FocusEvent) {
  onBlur();
  emit("blur", event);
  if (!rootRef.value?.contains(event.relatedTarget as Node | null)) {
    query.value = "";
    closeListbox();
  }
}
watch(filteredOptions, () => {
  if (
    activeValue.value !== undefined &&
    !enabledOptions.value.some((option) => option.value === activeValue.value)
  )
    activeValue.value = enabledOptions.value[0]?.value;
});
if (process.env.NODE_ENV !== "production") {
  watchEffect(() => {
    if (
      !props.label &&
      !getAttrString(attrs, "aria-label") &&
      !resolvedLabelledBy.value
    )
      console.warn(
        "[ShCombobox] Combobox requires an accessible name. Provide `label`, `aria-label`, or `aria-labelledby`.",
      );
    if (props.modelValue !== undefined && !selectedOption.value)
      console.warn(
        `[ShCombobox] modelValue "${props.modelValue}" does not match an option.`,
      );
  });
}
defineExpose({ focus, blur, open: openListbox, close: closeListbox });
</script>

<template>
  <div
    ref="rootRef"
    class="sh-combobox"
    :data-state="isOpen ? 'open' : 'closed'"
  >
    <label
      v-if="label"
      :id="labelId"
      :for="comboboxId"
      class="sh-combobox__label"
      >{{ label }}</label
    >
    <div class="sh-combobox__wrapper">
      <input
        v-bind="attrs"
        :id="comboboxId"
        ref="elementRef"
        type="text"
        role="combobox"
        class="sh-combobox__input"
        :value="displayValue"
        :placeholder="placeholder"
        :disabled="isDisabled"
        :required="isRequired"
        :aria-invalid="isInvalid || undefined"
        :aria-required="isRequired || undefined"
        :aria-expanded="isOpen"
        :aria-autocomplete="autocomplete"
        :aria-controls="listboxId"
        :aria-activedescendant="
          isOpen && activeOption ? optionId(activeOption) : undefined
        "
        :aria-labelledby="resolvedLabelledBy"
        :aria-describedby="resolvedDescribedBy"
        @input="handleInput"
        @keydown="handleKeydown"
        @focus="handleFocus"
        @blur="handleBlur"
        @click="openListbox"
      />
      <span
        class="sh-combobox__icon"
        :class="{ 'sh-combobox__icon--open': isOpen }"
        aria-hidden="true"
        >▾</span
      >
    </div>
    <input
      v-if="name"
      type="hidden"
      :name="name"
      :value="modelValue"
      :disabled="isDisabled"
    />
    <ul
      v-show="isOpen"
      :id="listboxId"
      role="listbox"
      class="sh-combobox__listbox"
      @mousedown.prevent
    >
      <li
        v-if="filteredOptions.length === 0"
        class="sh-combobox__option sh-combobox__option--empty"
        aria-live="polite"
      >
        {{ noResultsText }}
      </li>
      <li
        v-for="option in filteredOptions"
        v-else
        :id="optionId(option)"
        :key="option.value"
        role="option"
        class="sh-combobox__option"
        :class="{
          'sh-combobox__option--active': option.value === activeValue,
          'sh-combobox__option--selected': option.value === modelValue,
          'sh-combobox__option--disabled': option.disabled,
        }"
        :aria-selected="option.value === modelValue"
        :aria-disabled="option.disabled || undefined"
        @click="selectOption(option)"
        @mousemove="!option.disabled && (activeValue = option.value)"
      >
        {{ option.label }}
      </li>
    </ul>
    <p v-if="description" :id="descriptionId" class="sh-combobox__description">
      {{ description }}
    </p>
    <p v-if="error" :id="errorId" class="sh-combobox__error">{{ error }}</p>
  </div>
</template>
