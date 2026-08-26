<script setup lang="ts">
import { ref } from "vue";

const props = withDefaults(
  defineProps<{
    as?: "form" | "div";
    preventDefault?: boolean;
  }>(),
  { as: "form", preventDefault: false },
);
const emit = defineEmits<{ submit: [event: SubmitEvent] }>();
const formRef = ref<HTMLFormElement | HTMLDivElement>();
function handleSubmit(event: SubmitEvent) {
  if (props.preventDefault) event.preventDefault();
  emit("submit", event);
}
defineExpose({ element: formRef });
</script>

<template>
  <component :is="as" ref="formRef" class="sh-form" @submit="handleSubmit">
    <slot />
  </component>
</template>
