<script setup lang="ts">
import { computed, onMounted, useAttrs } from "vue";
import { getAttrString } from "../../utils";
import { hasAccessibleName } from "../../utils/hasAccessibleName";
import { useFocus } from "../../composables";

type inputType = "text" | "email" | "password" | "search" | "url" | "tel";

const props = withDefaults(
  defineProps<{
    type?: inputType;
    id?: string;
    name?: string;
    modelValue?: string;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    error?: string;
    description?: string;
    minlength?: number;
    maxlength?: number;
    pattern?: string;
    required?: boolean;
    autocomplete?: string;
  }>(),
  {
    type: "text",
    id: undefined,
    name: undefined,
    modelValue: undefined,
    placeholder: undefined,
    disabled: false,
    readonly: false,
    error: undefined,
    description: undefined,
    minlength: 0,
    maxlength: undefined,
    pattern: undefined,
    required: false,
    autocomplete: undefined,
  },
);

const { isFocused, elementRef, focus, blur, onFocus, onBlur } = useFocus<HTMLInputElement>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();

const handleInput = (event: Event) => {
  if (props.disabled) return;

  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};

const handleFocus = (event: FocusEvent) => {
  onFocus();
  emit("focus", event);
};

const handleBlur = (event: FocusEvent) => {
  onBlur();
  emit("blur", event);
};


const ariaInvalid = computed(() => Boolean(props.error));

const ariaDescribedBy = computed((): string | undefined => {
  if (props.error) {
    return errorId.value;
  } else if (props.description) {
    return descriptionId.value;
  } else {
    return undefined;
  }
});

const attrs = useAttrs() as Record<string, unknown>;

//NOTE - auto-generated fallback IDs
const inputId = computed((): string => {
  if (props.id) return props.id;
  const generatedId = Math.random().toString(36).slice(2);
  return `Sh-Input-${generatedId}`;
});

const errorId = computed((): string | undefined => {
  return props.error ? `${inputId.value}-error` : undefined;
});

const descriptionId = computed((): string | undefined => {
  return props.description ? `${inputId.value}-description` : undefined;
});

//NOTE - checks current state and returns a string
const dataState = computed((): string => {
  if (props.disabled) return "disabled";
  if (props.error) return "invalid";
  if (isFocused.value) return "focused";
  return "idle";
});


onMounted(() => {
  if (process.env.NODE_ENV !== "production") {
    const ariaLabel = getAttrString(attrs, "aria-label");
    const ariaLabelledBy = getAttrString(attrs, "aria-labelledby");

    const accessible = hasAccessibleName(ariaLabel, ariaLabelledBy, false);

    if (!props.id && !accessible) {
      console.warn(
        "[ShInput] should have one of: `id` to (associate with external label), " +
          "`aria-label`, or `aria-labelledby",
      );
    };
  }
});

defineExpose({
  focus,
  blur,
  select: () => elementRef.value?.select()
});

</script>

<template>
  <div class="sh-input">
    <input
      :id="inputId"
      ref="elementRef"
      class="sh-input__control"
      :name="name"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :data-error="error || undefined"
      :aria-invalid="ariaInvalid"
      :aria-describedby="ariaDescribedBy"
      data-testid="sh-input-test-id"
      :minlength="minlength"
      :maxlength="maxlength"
      :pattern="pattern"
      :required="required"
      :autocomplete="autocomplete"
      :data-state="dataState"
      @input="handleInput"
      @focus="handleFocus"
      @blur = "handleBlur"
    />
    <p
      v-if="error"
      :id="errorId"
      class="sh-input__error"
      data-testid="sh-input-error"
      role="alert"
    >
      {{ error }}
    </p>
    <p
      v-if="description"
      :id="descriptionId"
      class="sh-input__description"
      data-testid="sh-input-description"
    >
      {{ description }}
    </p>
  </div>
</template>
