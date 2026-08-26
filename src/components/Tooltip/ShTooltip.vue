<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useId } from "vue";

const props = withDefaults(
  defineProps<{
    text: string;
    placement?: "top" | "right" | "bottom" | "left";
    openDelay?: number;
    closeDelay?: number;
  }>(),
  { placement: "top", openDelay: 300, closeDelay: 100 },
);
const instanceId = useId();
const tooltipId = `sh-tooltip-${instanceId}`;
const isOpen = ref(false);
let openTimer: ReturnType<typeof setTimeout> | undefined;
let closeTimer: ReturnType<typeof setTimeout> | undefined;
const triggerProps = computed(() => ({
  "aria-describedby": isOpen.value ? tooltipId : undefined,
  onFocus: open,
  onBlur: close,
  onMouseenter: open,
  onMouseleave: close,
}));
function clearTimers() {
  clearTimeout(openTimer);
  clearTimeout(closeTimer);
}
function open() {
  clearTimers();
  openTimer = setTimeout(() => {
    isOpen.value = true;
  }, props.openDelay);
}
function close() {
  clearTimers();
  closeTimer = setTimeout(() => {
    isOpen.value = false;
  }, props.closeDelay);
}
function dismiss() {
  clearTimers();
  isOpen.value = false;
}
onBeforeUnmount(clearTimers);
</script>

<template>
  <span class="sh-tooltip" @keydown.esc="dismiss">
    <slot :trigger-props="triggerProps" />
    <span
      v-show="isOpen"
      :id="tooltipId"
      role="tooltip"
      class="sh-tooltip__content"
      :data-placement="placement"
      @mouseenter="clearTimers"
      @mouseleave="close"
      >{{ text }}</span
    >
  </span>
</template>
