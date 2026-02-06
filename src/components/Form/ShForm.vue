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

// Form context for child components
const formName = ref(props.name);
provide("formName", formName);

const handleSubmit = (event: Event) => {
  emit("submit", event);
};

onMounted(() => {
  if (process.env.NODE_ENV !== "production") {
    const form = event?.target as HTMLFormElement;
    if (form) {
      const inputs = form.querySelectorAll("[required]");
      const hasRequiredInputs = inputs.length > 0;
      const hasSubmitButton = form.querySelector('[type="submit"]');

      if (hasRequiredInputs && !hasSubmitButton) {
        console.warn(
          "[ShForm] Form has required fields but no submit button. " +
            'Add a button with type="submit" for proper form submission.',
        );
      }
    }
  }
});
</script>

<template>
  <component :is="as" class="sh-form" @submit.prevent="handleSubmit">
    <slot />
  </component>
</template>
