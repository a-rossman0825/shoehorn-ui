<script setup lang="ts">
import { computed, provide, ref } from "vue";

interface Tab {
  id: string;
  label: string;
  disabled?: boolean;
}

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    tabs?: Tab[];
    orientation?: "horizontal" | "vertical";
  }>(),
  {
    orientation: "horizontal",
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
  change: [value: string];
}>();

const activeTab = computed({
  get: () => props.modelValue || props.tabs?.[0]?.id || "",
  set: (value) => {
    emit("update:modelValue", value);
    emit("change", value);
  },
});

function selectTab(tabId: string, disabled?: boolean) {
  if (!disabled) {
    activeTab.value = tabId;
  }
}

function onKeydown(event: KeyboardEvent, index: number) {
  if (!props.tabs) return;

  const enabledTabs = props.tabs.filter((t) => !t.disabled);
  const currentIndex = enabledTabs.findIndex((t) => t.id === activeTab.value);

  let nextIndex = currentIndex;

  if (
    (event.key === "ArrowRight" && props.orientation === "horizontal") ||
    (event.key === "ArrowDown" && props.orientation === "vertical")
  ) {
    event.preventDefault();
    nextIndex = (currentIndex + 1) % enabledTabs.length;
  } else if (
    (event.key === "ArrowLeft" && props.orientation === "horizontal") ||
    (event.key === "ArrowUp" && props.orientation === "vertical")
  ) {
    event.preventDefault();
    nextIndex = currentIndex <= 0 ? enabledTabs.length - 1 : currentIndex - 1;
  } else if (event.key === "Home") {
    event.preventDefault();
    nextIndex = 0;
  } else if (event.key === "End") {
    event.preventDefault();
    nextIndex = enabledTabs.length - 1;
  }

  if (nextIndex !== currentIndex) {
    activeTab.value = enabledTabs[nextIndex].id;
  }
}

provide("tabs", {
  activeTab,
  selectTab,
});
</script>

<template>
  <div class="sh-tabs" :data-orientation="orientation">
    <div
      role="tablist"
      class="sh-tabs__list"
      :aria-orientation="orientation"
      :data-orientation="orientation"
    >
      <button
        v-for="(tab, index) in tabs"
        :key="tab.id"
        role="tab"
        class="sh-tabs__tab"
        :aria-selected="activeTab === tab.id"
        :aria-controls="`${tab.id}-panel`"
        :tabindex="activeTab === tab.id ? 0 : -1"
        :disabled="tab.disabled"
        :data-state="activeTab === tab.id ? 'active' : 'inactive'"
        @click="selectTab(tab.id, tab.disabled)"
        @keydown="onKeydown($event, index)"
      >
        {{ tab.label }}
      </button>
    </div>

    <div
      v-for="tab in tabs"
      :key="`${tab.id}-panel`"
      :id="`${tab.id}-panel`"
      role="tabpanel"
      class="sh-tabs__panel"
      :aria-labelledby="tab.id"
      :hidden="activeTab !== tab.id"
      :tabindex="0"
    >
      <slot :name="tab.id" />
    </div>
  </div>
</template>
