<script setup lang="ts">
import {
  nextTick,
  onBeforeUnmount,
  ref,
  useAttrs,
  useId,
  watch,
  watchEffect,
} from "vue";
import ShButton from "../Button/ShButton.vue";
import { getAttrString } from "../../utils";

defineOptions({ inheritAttrs: false });
const props = withDefaults(
  defineProps<{
    open?: boolean;
    modal?: boolean;
    closeOnEsc?: boolean;
    closeOnOverlayClick?: boolean;
    title?: string;
    description?: string;
    initialFocus?: string;
  }>(),
  { open: false, modal: true, closeOnEsc: true, closeOnOverlayClick: true },
);
const emit = defineEmits<{ "update:open": [value: boolean]; close: [] }>();
const attrs = useAttrs();
const instanceId = useId();
const dialogRef = ref<HTMLDialogElement>();
const titleId = `sh-dialog-${instanceId}-title`;
const descriptionId = `sh-dialog-${instanceId}-description`;
const previouslyFocused = ref<HTMLElement | null>(null);

function requestClose() {
  emit("update:open", false);
  emit("close");
}
function handleCancel(event: Event) {
  event.preventDefault();
  if (props.closeOnEsc) requestClose();
}
function handleClick(event: MouseEvent) {
  if (!props.closeOnOverlayClick || event.target !== dialogRef.value) return;
  const rect = dialogRef.value.getBoundingClientRect();
  const inside =
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom;
  if (!inside) requestClose();
}
async function focusInitialTarget() {
  await nextTick();
  const target = props.initialFocus
    ? dialogRef.value?.querySelector<HTMLElement>(props.initialFocus)
    : dialogRef.value?.querySelector<HTMLElement>(
        "[autofocus], button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex='-1'])",
      );
  (target ?? dialogRef.value)?.focus();
}
watch(
  () => props.open,
  async (open) => {
    const dialog = dialogRef.value;
    if (!dialog) return;
    if (open) {
      previouslyFocused.value =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      if (!dialog.open) {
        if (props.modal && typeof dialog.showModal === "function")
          dialog.showModal();
        else if (typeof dialog.show === "function") dialog.show();
        else dialog.setAttribute("open", "");
      }
      await focusInitialTarget();
    } else if (dialog.open || dialog.hasAttribute("open")) {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
      if (previouslyFocused.value?.isConnected) previouslyFocused.value.focus();
    }
  },
  { immediate: true, flush: "post" },
);
if (process.env.NODE_ENV !== "production") {
  watchEffect(() => {
    if (
      !props.title &&
      !getAttrString(attrs, "aria-label") &&
      !getAttrString(attrs, "aria-labelledby")
    ) {
      console.warn(
        "[ShDialog] Dialog requires an accessible name. Provide `title`, `aria-label`, or `aria-labelledby`.",
      );
    }
  });
}
onBeforeUnmount(() => {
  if (dialogRef.value?.open) dialogRef.value.close();
});
defineExpose({ focus: () => dialogRef.value?.focus(), close: requestClose });
</script>

<template>
  <Teleport to="body">
    <dialog
      v-bind="attrs"
      ref="dialogRef"
      class="sh-dialog-overlay"
      :aria-labelledby="title ? titleId : undefined"
      :aria-describedby="description ? descriptionId : undefined"
      @cancel="handleCancel"
      @click="handleClick"
    >
      <div class="sh-dialog">
        <div class="sh-dialog__header">
          <h2 v-if="title" :id="titleId" class="sh-dialog__title">
            {{ title }}
          </h2>
          <ShButton
            variant="ghost"
            icon-only
            label="Close dialog"
            @click="requestClose"
            >✕</ShButton
          >
        </div>
        <p
          v-if="description"
          :id="descriptionId"
          class="sh-dialog__description"
        >
          {{ description }}
        </p>
        <div class="sh-dialog__content"><slot /></div>
        <div v-if="$slots.footer" class="sh-dialog__footer">
          <slot name="footer" />
        </div>
      </div>
    </dialog>
  </Teleport>
</template>
