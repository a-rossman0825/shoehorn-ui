<script setup lang="ts">
import { computed, watchEffect } from "vue";
import type { BreadcrumbItem } from "./types";

const props = withDefaults(
  defineProps<{
    items?: BreadcrumbItem[];
    separator?: string;
    label?: string;
  }>(),
  { items: () => [], separator: "/", label: "Breadcrumb" },
);
const normalizedItems = computed(() =>
  props.items.map((item, index) => ({
    ...item,
    current: item.current ?? index === props.items.length - 1,
  })),
);
if (process.env.NODE_ENV !== "production") {
  watchEffect(() => {
    if (!props.items.length)
      console.warn("[ShBreadcrumbs] Provide at least one breadcrumb item.");
    if (normalizedItems.value.filter((item) => item.current).length !== 1)
      console.warn(
        "[ShBreadcrumbs] Exactly one breadcrumb item should be current.",
      );
  });
}
</script>

<template>
  <nav :aria-label="label" class="sh-breadcrumbs">
    <ol class="sh-breadcrumbs__list">
      <li
        v-for="(item, index) in normalizedItems"
        :key="item.id ?? `${item.label}-${index}`"
        class="sh-breadcrumbs__item"
      >
        <a
          v-if="item.href && !item.current"
          :href="item.href"
          class="sh-breadcrumbs__link"
          >{{ item.label }}</a
        >
        <span
          v-else
          class="sh-breadcrumbs__current"
          :aria-current="item.current ? 'page' : undefined"
          >{{ item.label }}</span
        >
        <span
          v-if="index < normalizedItems.length - 1"
          class="sh-breadcrumbs__separator"
          aria-hidden="true"
          >{{ separator }}</span
        >
      </li>
    </ol>
  </nav>
</template>
