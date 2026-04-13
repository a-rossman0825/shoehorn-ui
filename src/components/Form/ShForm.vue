<script setup lang="ts">
import { provide, ref, onMounted } from "vue";

const props = withDefaults(
  defineProps<{
    as?: string;
    name?: string;
  }>(),
  {
    as: "form",
  },
);

const emit = defineEmits<{
  submit: [event: Event];
}>();

// NOTE: Share form metadata with child components.
const formName = ref(props.name);
provide("formName", formName);
const formRef = ref<HTMLElement>();

function handleSubmit(event: Event) {
  emit("submit", event);
}

onMounted(() => {
  if (process.env.NODE_ENV !== "production") {
    if (!(formRef.value instanceof HTMLFormElement)) return;

    const inputs = formRef.value.querySelectorAll("[required]");
    const hasRequiredInputs = inputs.length > 0;
    const hasSubmitButton = formRef.value.querySelector('[type="submit"]');

    if (hasRequiredInputs && !hasSubmitButton) {
      console.warn(
        "[ShForm] Form has required fields but no submit button. " +
          'Add a button with type="submit" for proper form submission.',
      );
    }
  }
});
</script>

<template>
  <component
    :is="as"
    ref="formRef"
    class="sh-form"
    @submit.prevent="handleSubmit"
  >
    <slot />
  </component>
</template>
