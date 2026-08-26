<script setup lang="ts">
import { computed, nextTick, ref, useId, watchEffect } from "vue";
import type { TabItem } from "./types";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    tabs?: TabItem[];
    orientation?: "horizontal" | "vertical";
    activation?: "automatic" | "manual";
    label?: string;
  }>(),
  {
    tabs: () => [],
    orientation: "horizontal",
    activation: "automatic",
    label: "Tabs",
  },
);
const emit = defineEmits<{
  "update:modelValue": [value: string];
  change: [value: string];
}>();
const instanceId = useId();
const tabRefs = ref<HTMLButtonElement[]>([]);
const enabledTabs = computed(() => props.tabs.filter((tab) => !tab.disabled));
const fallbackTab = computed(() => enabledTabs.value[0]?.id ?? "");
const activeTab = computed(() =>
  enabledTabs.value.some((tab) => tab.id === props.modelValue)
    ? props.modelValue!
    : fallbackTab.value,
);
const focusedTab = ref("");
const tabId = (id: string) => `sh-tabs-${instanceId}-tab-${id}`;
const panelId = (id: string) => `sh-tabs-${instanceId}-panel-${id}`;

function selectTab(id: string) {
  const tab = props.tabs.find((item) => item.id === id);
  if (!tab || tab.disabled || id === props.modelValue) return;
  emit("update:modelValue", id);
  emit("change", id);
}
async function moveFocus(id: string) {
  focusedTab.value = id;
  await nextTick();
  tabRefs.value.find((element) => element.id === tabId(id))?.focus();
}
function handleKeydown(event: KeyboardEvent, currentId: string) {
  const items = enabledTabs.value;
  if (!items.length) return;
  const current = Math.max(
    0,
    items.findIndex((tab) => tab.id === currentId),
  );
  let next: number;
  const forward =
    props.orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
  const backward = props.orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";
  if (event.key === forward) next = (current + 1) % items.length;
  else if (event.key === backward)
    next = current === 0 ? items.length - 1 : current - 1;
  else if (event.key === "Home") next = 0;
  else if (event.key === "End") next = items.length - 1;
  else if (
    (event.key === "Enter" || event.key === " ") &&
    props.activation === "manual"
  ) {
    event.preventDefault();
    selectTab(currentId);
    return;
  } else return;
  event.preventDefault();
  const id = items[next].id;
  void moveFocus(id);
  if (props.activation === "automatic") selectTab(id);
}
watchEffect(() => {
  if (
    !focusedTab.value ||
    !enabledTabs.value.some((tab) => tab.id === focusedTab.value)
  )
    focusedTab.value = activeTab.value;
});
</script>

<template>
  <div class="sh-tabs" :data-orientation="orientation">
    <div
      role="tablist"
      class="sh-tabs__list"
      :aria-label="label"
      :aria-orientation="orientation"
      :data-orientation="orientation"
    >
      <button
        v-for="tab in tabs"
        :id="tabId(tab.id)"
        :key="tab.id"
        ref="tabRefs"
        type="button"
        role="tab"
        class="sh-tabs__tab"
        :aria-selected="activeTab === tab.id"
        :aria-controls="panelId(tab.id)"
        :tabindex="focusedTab === tab.id ? 0 : -1"
        :disabled="tab.disabled"
        :data-state="activeTab === tab.id ? 'active' : 'inactive'"
        @click="selectTab(tab.id)"
        @focus="focusedTab = tab.id"
        @keydown="handleKeydown($event, tab.id)"
      >
        {{ tab.label }}
      </button>
    </div>
    <div
      v-for="tab in tabs"
      v-show="activeTab === tab.id"
      :id="panelId(tab.id)"
      :key="`${tab.id}-panel`"
      role="tabpanel"
      class="sh-tabs__panel"
      :aria-labelledby="tabId(tab.id)"
    >
      <slot :name="tab.id" />
    </div>
  </div>
</template>
