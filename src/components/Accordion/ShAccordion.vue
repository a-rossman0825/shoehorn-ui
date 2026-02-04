<script setup lang="ts">
import { computed, provide, ref } from "vue";

interface AccordionItem {
  id: string;
  title: string;
  disabled?: boolean;
}

const props = withDefaults(
  defineProps<{
    modelValue?: string[];
    items?: AccordionItem[];
    multiple?: boolean;
  }>(),
  {
    modelValue: () => [],
    multiple: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string[]];
}>();

const openItems = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

function toggle(itemId: string, disabled?: boolean) {
  if (disabled) return;

  if (props.multiple) {
    if (openItems.value.includes(itemId)) {
      openItems.value = openItems.value.filter((id) => id !== itemId);
    } else {
      openItems.value = [...openItems.value, itemId];
    }
  } else {
    openItems.value = openItems.value.includes(itemId) ? [] : [itemId];
  }
}

function isOpen(itemId: string) {
  return openItems.value.includes(itemId);
}
</script>

<template>
  <div class="sh-accordion">
    <div
      v-for="item in items"
      :key="item.id"
      class="sh-accordion__item"
      :data-state="isOpen(item.id) ? 'open' : 'closed'"
    >
      <h3 class="sh-accordion__header">
        <button
          :id="`${item.id}-trigger`"
          class="sh-accordion__trigger"
          :aria-expanded="isOpen(item.id)"
          :aria-controls="`${item.id}-content`"
          :disabled="item.disabled"
          @click="toggle(item.id, item.disabled)"
        >
          <span>{{ item.title }}</span>
          <span class="sh-accordion__icon" aria-hidden="true">
            {{ isOpen(item.id) ? "−" : "+" }}
          </span>
        </button>
      </h3>

      <div
        :id="`${item.id}-content`"
        role="region"
        class="sh-accordion__content"
        :aria-labelledby="`${item.id}-trigger`"
        :hidden="!isOpen(item.id)"
      >
        <div class="sh-accordion__body">
          <slot :name="item.id" />
        </div>
      </div>
    </div>
  </div>
</template>
