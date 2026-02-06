<script setup lang="ts">
import { onMounted } from "vue";

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

const props = withDefaults(
  defineProps<{
    items?: BreadcrumbItem[];
    separator?: string;
  }>(),
  {
    separator: "/",
  },
);

onMounted(() => {
  if (process.env.NODE_ENV !== 'production') {
    if (!props.items || props.items.length === 0) {
      console.warn(
        "[ShBreadcrumbs] Breadcrumbs has no items. " +
          "Provide the `items` prop with at least one breadcrumb.",
      );
    }
  }
});
</script>

<template>
  <nav aria-label="Breadcrumb" class="sh-breadcrumbs">
    <ol class="sh-breadcrumbs__list">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="sh-breadcrumbs__item"
      >
        <a
          v-if="item.href && !item.current"
          :href="item.href"
          class="sh-breadcrumbs__link"
        >
          {{ item.label }}
        </a>
        <span
          v-else
          class="sh-breadcrumbs__current"
          :aria-current="item.current ? 'page' : undefined"
        >
          {{ item.label }}
        </span>

        <span
          v-if="index < items!.length - 1"
          class="sh-breadcrumbs__separator"
          aria-hidden="true"
        >
          {{ separator }}
        </span>
      </li>
    </ol>
  </nav>
</template>
