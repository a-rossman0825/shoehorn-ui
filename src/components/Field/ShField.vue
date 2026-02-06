<script setup lang="ts">
import { computed, inject, useSlots, onMounted } from "vue";

const props = withDefaults(
  defineProps<{
    label?: string;
    for?: string;
    error?: string;
    description?: string;
    required?: boolean;
    optional?: boolean;
  }>(),
  {},
);

const slots = useSlots();
const formName = inject("formName", null);

const fieldId = computed(() => {
  if (props.for) return props.for;
  // Generate a unique ID based on label
  if (props.label) {
    return `field-${props.label.toLowerCase().replace(/\s+/g, "-")}`;
  }
  return undefined;
});

const describedById = computed(() => {
  const ids: string[] = [];
  if (props.description) ids.push(`${fieldId.value}-description`);
  if (props.error) ids.push(`${fieldId.value}-error`);
  return ids.length > 0 ? ids.join(" ") : undefined;
});

onMounted(() => {
  if (process.env.NODE_ENV !== 'production') {
    if (!props.label && !('label' in slots)) {
      console.warn(
        "[ShField] Field has no label. " +
          "Provide the `label` prop or use the label slot for accessibility.",
      );
    }

    if (props.required && props.optional) {
      console.warn(
        "[ShField] Field has both `required` and `optional` props set. " +
          "Only one should be used.",
      );
    }
  }
});
</script>
