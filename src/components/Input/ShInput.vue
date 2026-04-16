<script setup lang="ts">
import { computed, onMounted, useAttrs } from 'vue';
import { getAttrString } from '../../utils';
import { hasAccessibleName } from '../../utils/hasAccessibleName';

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
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const handleInput = (event: Event) => {
  if (props.disabled) return;

  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};

const ariaInvalid = computed(() => Boolean(props.error));

const ariaDescribedBy = computed(():string | undefined => {
  if (props.error) {
    return errorId.value;
  } else if (props.description){
    return descriptionId.value;
  } else {
    return undefined;
  }
});

const attrs = useAttrs() as Record<string, unknown>;

//NOTE - auto-generated fallback IDs
const inputId = computed(():string => {
  if (props.id) return props.id;
  const generatedId = Math.random().toString(36).slice(2);
  return `Sh-Input-${generatedId}`;
});

const errorId = computed((): string | undefined => {
  return props.error ? `${inputId.value}-error` : undefined;
});

const descriptionId = computed((): string | undefined => {
  return props.description ? `${inputId.value}-description` : undefined;
})

onMounted(() => {
  if (process.env.NODE_ENV !== "production"){
    const ariaLabel = getAttrString(attrs, 'aria-label');
    const ariaLabelledBy = getAttrString(attrs, 'aria-labelledby');

    const accessible = hasAccessibleName(ariaLabel, ariaLabelledBy, false)

    if (!props.id && !accessible) {
      console.warn(
        "[ShInput] should have one of: `id` to (associate with external label), " +
        "`aria-label`, or `aria-labelledby"
      )
    }
  }
})


</script>

<template>
  <div class="input-wrapper">
    <input
      :id="inputId"
      class="sh-input"
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
      @input="handleInput"
    />
    <p v-if="error" :id="errorId" data-testid="sh-input-error">{{ error }}</p>
    <p v-if="description" :id="descriptionId" data-testid="sh-input-description">{{ description }}</p>
  </div>
</template>
