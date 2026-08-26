<script setup lang="ts">
import { computed, useId, watchEffect } from "vue";
import type { AccordionItem } from "./types";

const props = withDefaults(
  defineProps<{
    modelValue?: string[];
    items?: AccordionItem[];
    multiple?: boolean;
    headingLevel?: 2 | 3 | 4 | 5 | 6;
    region?: boolean;
  }>(),
  {
    modelValue: () => [],
    items: () => [],
    multiple: false,
    headingLevel: 3,
    region: true,
  },
);
const emit = defineEmits<{ "update:modelValue": [value: string[]] }>();
const instanceId = useId();
const headingTag = computed(() => `h${props.headingLevel}`);
const triggerId = (id: string) => `sh-accordion-${instanceId}-trigger-${id}`;
const panelId = (id: string) => `sh-accordion-${instanceId}-panel-${id}`;
const isOpen = (id: string) => props.modelValue.includes(id);
function toggle(item: AccordionItem) {
  if (item.disabled) return;
  if (props.multiple)
    emit(
      "update:modelValue",
      isOpen(item.id)
        ? props.modelValue.filter((id) => id !== item.id)
        : [...props.modelValue, item.id],
    );
  else emit("update:modelValue", isOpen(item.id) ? [] : [item.id]);
}
if (process.env.NODE_ENV !== "production") {
  watchEffect(() => {
    const ids = props.items.map((item) => item.id);
    if (new Set(ids).size !== ids.length)
      console.warn(
        "[ShAccordion] Item IDs must be unique within an accordion.",
      );
  });
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
      <component :is="headingTag" class="sh-accordion__header">
        <button
          :id="triggerId(item.id)"
          type="button"
          class="sh-accordion__trigger"
          :aria-expanded="isOpen(item.id)"
          :aria-controls="panelId(item.id)"
          :disabled="item.disabled"
          @click="toggle(item)"
        >
          <span>{{ item.title }}</span
          ><span class="sh-accordion__icon" aria-hidden="true">{{
            isOpen(item.id) ? "−" : "+"
          }}</span>
        </button>
      </component>
      <div
        :id="panelId(item.id)"
        :role="region ? 'region' : undefined"
        class="sh-accordion__content"
        :aria-labelledby="region ? triggerId(item.id) : undefined"
        :hidden="!isOpen(item.id)"
      >
        <div class="sh-accordion__body"><slot :name="item.id" /></div>
      </div>
    </div>
  </div>
</template>
