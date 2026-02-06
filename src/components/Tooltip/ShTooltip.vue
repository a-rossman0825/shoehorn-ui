<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";

const props = withDefaults(
  defineProps<{
    content?: string;
    placement?: "top" | "bottom" | "left" | "right";
    delay?: number;
  }>(),
  {
    placement: "top",
    delay: 300,
  },
);

const triggerRef = ref<HTMLElement>();
const tooltipRef = ref<HTMLElement>();
const isVisible = ref(false);
const timeoutId = ref<number>();

function show() {
  clearTimeout(timeoutId.value);
  timeoutId.value = window.setTimeout(() => {
    isVisible.value = true;
  }, props.delay);
}

function hide() {
  clearTimeout(timeoutId.value);
  isVisible.value = false;
}

const tooltipId = computed(
  () => `sh-tooltip-${Math.random().toString(36).slice(2)}`,
);

onUnmounted(() => {
  clearTimeout(timeoutId.value);
});

onMounted(() => {
  if (process.env.NODE_ENV !== 'production' && !props.content) {
    console.warn(
      "[ShTooltip] Tooltip has no content. Provide the `content` prop.",
    );
  }
});
</script>

<template>
  <span class="sh-tooltip-wrapper">
    <span
      ref="triggerRef"
      class="sh-tooltip-trigger"
      :aria-describedby="isVisible ? tooltipId : undefined"
      @mouseenter="show"
      @mouseleave="hide"
      @focus="show"
      @blur="hide"
    >
      <slot />
    </span>

    <Teleport to="body">
      <span
        v-if="isVisible"
        :id="tooltipId"
        ref="tooltipRef"
        role="tooltip"
        class="sh-tooltip"
        :data-placement="placement"
      >
        {{ content }}
        <slot name="content" />
      </span>
    </Teleport>
  </span>
</template>
