<script setup lang="ts">
import { computed, onMounted, useAttrs } from "vue";
import { useHasSlotText } from "../../composables/useSlotText";
import { getAttrString } from "../../utils";
import { hasAccessibleName } from "../../utils/hasAccessibleName";

const props = withDefaults(
  defineProps<{
    for?: string;
    htmlFor?: string;
    required?: boolean;
    srOnly?: boolean;
  }>(),
  {
    for: undefined,
    htmlFor: undefined,
    required: false,
    srOnly: false,
  },
);

const resolvedFor = computed((): string | undefined => {
  return props.for || props.htmlFor;
});

const attrs = useAttrs();

/* NOTE - refactor: use "useHasSlotText() instead"
  function hasSlotText() {
    if (!slots.default) return false;
    const result = slots.default();
    if (!result) return false;
    return result.some((vnode) => {
      if (typeof vnode.children === "string"){
        return vnode.children.trim().length > 0;
      }
      return vnode.children !== null;
    })
  }
*/

const hasSlotText = useHasSlotText();

onMounted(() => {
  if (process.env.NODE_ENV !== "production") {
    const ariaLabel = getAttrString(attrs, "aria-label");
    const accessible = hasAccessibleName(ariaLabel, undefined, hasSlotText());

    if (!resolvedFor.value && !ariaLabel) {
      console.warn(
        "[ShLabel] should have a `for` attribute to associate it with a form control" +
          " Provide the `for` attribute with the ID of the associated form control",
      );
    }
    if (!accessible) {
      console.warn("[ShLabel] requires text content or aria-label...");
    }
  }
});
</script>

<template>
  <label
    :for="resolvedFor"
    :data-required="required || undefined"
    :class="{ 'sr-only': srOnly }"
  >
    <slot></slot>
  </label>
</template>
