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

const ariaDescribedBy = computed(() => {
  if (props.error) {
    return "input-error";
  } else if (props.description){
    return "input-description";
  } else {
    return undefined;
  }
});

const attrs = useAttrs() as Record<string, unknown>;

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
      :id="id"
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
    <p v-if="error" id="input-error" data-testid="sh-input-error">{{ error }}</p>
    <p v-if="description" id="input-description" data-testid="sh-input-description">{{ description }}</p>
  </div>
</template>
