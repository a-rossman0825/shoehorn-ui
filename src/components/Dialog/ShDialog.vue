<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, nextTick } from "vue";

const props = withDefaults(
  defineProps<{
    open?: boolean;
    modal?: boolean;
    closeOnEsc?: boolean;
    closeOnOverlayClick?: boolean;
    title?: string;
    description?: string;
  }>(),
  {
    open: false,
    modal: true,
    closeOnEsc: true,
    closeOnOverlayClick: true,
  },
);

const emit = defineEmits<{
  "update:open": [value: boolean];
  close: [];
}>();

const dialogRef = ref<HTMLDialogElement>();
const previouslyFocused = ref<HTMLElement | null>(null);

function close() {
  emit("update:open", false);
  emit("close");
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape" && props.closeOnEsc) {
    event.preventDefault();
    close();
  }
}

function onOverlayClick(event: MouseEvent) {
  if (props.closeOnOverlayClick && event.target === dialogRef.value) {
    close();
  }
}

function trapFocus(event: KeyboardEvent) {
  if (!dialogRef.value || event.key !== "Tab") return;

  const focusable = dialogRef.value.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );

  if (focusable.length === 0) return;

  const first = focusable[0] as HTMLElement;
  const last = focusable[focusable.length - 1] as HTMLElement;

  if (event.shiftKey) {
    if (document.activeElement === first) {
      event.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      previouslyFocused.value = document.activeElement as HTMLElement;

      await nextTick();

      // NOTE: Put focus inside the dialog as soon as it opens.
      const focusable = dialogRef.value?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ) as HTMLElement;

      if (focusable) {
        focusable.focus();
      } else {
        dialogRef.value?.focus();
      }

      // NOTE: Prevent background scroll while modal is open.
      document.body.style.overflow = "hidden";
    } else {
      // NOTE: Re-enable background scroll on close.
      document.body.style.overflow = "";

      // NOTE: Return focus to whatever had focus before open.
      previouslyFocused.value?.focus();
    }
  },
);

onMounted(() => {
  if (process.env.NODE_ENV !== "production") {
    if (!props.title) {
      console.warn(
        "[ShDialog] Dialog has no title. " +
          "Provide the `title` prop for proper labeling.",
      );
    }
  }
});

onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>

<template>
  <Teleport to="body">
    <Transition name="sh-dialog">
      <div
        v-if="open"
        ref="dialogRef"
        class="sh-dialog-overlay"
        :aria-modal="modal"
        role="dialog"
        :aria-labelledby="title ? 'sh-dialog-title' : undefined"
        :aria-describedby="description ? 'sh-dialog-description' : undefined"
        tabindex="-1"
        @click="onOverlayClick"
        @keydown="onKeydown"
        @keydown.tab="trapFocus"
      >
        <div class="sh-dialog" @click.stop>
          <div class="sh-dialog__header">
            <h2 v-if="title" id="sh-dialog-title" class="sh-dialog__title">
              {{ title }}
            </h2>
            <ShButton variant="ghost" aria-label="Close dialog" @click="close">
              ✕
            </ShButton>
          </div>

          <p
            v-if="description"
            id="sh-dialog-description"
            class="sh-dialog__description"
          >
            {{ description }}
          </p>

          <div class="sh-dialog__content">
            <slot />
          </div>

          <div v-if="$slots.footer" class="sh-dialog__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
