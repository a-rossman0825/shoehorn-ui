<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";

export interface ComboboxOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

const props = withDefaults(
  defineProps<{
    modelValue?: string | number;
    options?: ComboboxOption[];
    placeholder?: string;
    disabled?: boolean;
    autocomplete?: "list" | "both" | "none";
    filterFn?: (option: ComboboxOption, query: string) => boolean;
  }>(),
  {
    options: () => [],
    autocomplete: "list",
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string | number | undefined];
}>();

const inputRef = ref<HTMLInputElement>();
const listboxRef = ref<HTMLElement>();
const isOpen = ref(false);
const activeIndex = ref(-1);
const searchQuery = ref("");

const selectedOption = computed(() =>
  props.options.find((opt) => opt.value === props.modelValue),
);

const displayValue = computed(() => selectedOption.value?.label || "");

const defaultFilter = (option: ComboboxOption, query: string) => {
  return option.label.toLowerCase().includes(query.toLowerCase());
};

const filteredOptions = computed(() => {
  if (!searchQuery.value) return props.options;

  const filterFunction = props.filterFn || defaultFilter;
  return props.options.filter((opt) => filterFunction(opt, searchQuery.value));
});

const visibleOptions = computed(() =>
  filteredOptions.value.filter((opt) => !opt.disabled),
);

watch(isOpen, (open) => {
  if (open) {
    searchQuery.value = "";
    activeIndex.value = -1;
  }
});

const openListbox = () => {
  if (!props.disabled) {
    isOpen.value = true;
  }
};

const closeListbox = () => {
  isOpen.value = false;
  searchQuery.value = "";
  inputRef.value?.blur();
};

const selectOption = (option: ComboboxOption) => {
  if (!option.disabled) {
    emit("update:modelValue", option.value);
    closeListbox();
  }
};

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  searchQuery.value = target.value;
  isOpen.value = true;
};

const handleKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      if (!isOpen.value) {
        openListbox();
      } else if (activeIndex.value < visibleOptions.value.length - 1) {
        activeIndex.value++;
      }
      break;

    case "ArrowUp":
      event.preventDefault();
      if (activeIndex.value > 0) {
        activeIndex.value--;
      }
      break;

    case "Enter":
      event.preventDefault();
      if (isOpen.value && activeIndex.value >= 0) {
        selectOption(visibleOptions.value[activeIndex.value]);
      }
      break;

    case "Escape":
      event.preventDefault();
      closeListbox();
      break;

    case "Home":
      if (isOpen.value) {
        event.preventDefault();
        activeIndex.value = 0;
      }
      break;

    case "End":
      if (isOpen.value) {
        event.preventDefault();
        activeIndex.value = visibleOptions.value.length - 1;
      }
      break;
  }
};

const handleBlur = (event: FocusEvent) => {
  // Close listbox if focus moves outside component
  const relatedTarget = event.relatedTarget as Node;
  if (!listboxRef.value?.contains(relatedTarget)) {
    closeListbox();
  }
};

const focus = () => inputRef.value?.focus();
const blur = () => inputRef.value?.blur();

defineExpose({ focus, blur });

onMounted(() => {
  if (process.env.NODE_ENV !== 'production') {
    if (props.options.length === 0) {
      console.warn(
        "[ShCombobox] Combobox has no options. " +
          "Provide the `options` prop with at least one option.",
      );
    }

    if (props.modelValue && !selectedOption.value) {
      console.warn(
        `[ShCombobox] modelValue "${props.modelValue}" does not match any option. ` +
          "Ensure modelValue corresponds to a valid option.value.",
      );
    }
  }
});
</script>

<template>
  <div class="sh-combobox">
    <div class="sh-combobox__wrapper">
      <input
        ref="inputRef"
        type="text"
        role="combobox"
        class="sh-combobox__input"
        :value="searchQuery || displayValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :aria-expanded="isOpen"
        :aria-autocomplete="autocomplete"
        :aria-controls="isOpen ? 'combobox-listbox' : undefined"
        :aria-activedescendant="
          activeIndex >= 0 ? `option-${activeIndex}` : undefined
        "
        @input="handleInput"
        @keydown="handleKeydown"
        @focus="openListbox"
        @blur="handleBlur"
      />

      <svg
        class="sh-combobox__icon"
        :class="{ 'sh-combobox__icon--open': isOpen }"
        aria-hidden="true"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </div>

    <ul
      v-show="isOpen"
      ref="listboxRef"
      id="combobox-listbox"
      role="listbox"
      class="sh-combobox__listbox"
    >
      <li
        v-if="filteredOptions.length === 0"
        class="sh-combobox__option sh-combobox__option--empty"
        role="option"
        aria-disabled="true"
      >
        No results found
      </li>

      <li
        v-for="(option, index) in filteredOptions"
        v-else
        :key="option.value"
        :id="`option-${index}`"
        role="option"
        class="sh-combobox__option"
        :class="{
          'sh-combobox__option--active': index === activeIndex,
          'sh-combobox__option--selected': option.value === modelValue,
          'sh-combobox__option--disabled': option.disabled,
        }"
        :aria-selected="option.value === modelValue"
        :aria-disabled="option.disabled"
        @click="selectOption(option)"
        @mouseenter="activeIndex = index"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>
