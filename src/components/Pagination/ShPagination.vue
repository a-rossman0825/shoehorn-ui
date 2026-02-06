<script setup lang="ts">
import { computed, onMounted } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: number;
    total: number;
    perPage?: number;
    showFirstLast?: boolean;
    maxVisible?: number;
  }>(),
  {
    perPage: 10,
    showFirstLast: true,
    maxVisible: 7,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: number];
}>();

const totalPages = computed(() => Math.ceil(props.total / props.perPage));

const pages = computed(() => {
  const current = props.modelValue;
  const max = Math.min(props.maxVisible, totalPages.value);
  const half = Math.floor(max / 2);

  let start = Math.max(1, current - half);
  let end = Math.min(totalPages.value, start + max - 1);

  if (end - start + 1 < max) {
    start = Math.max(1, end - max + 1);
  }

  const pageNumbers: Array<number | "ellipsis"> = [];

  if (start > 1) {
    pageNumbers.push(1);
    if (start > 2) pageNumbers.push("ellipsis");
  }

  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  if (end < totalPages.value) {
    if (end < totalPages.value - 1) pageNumbers.push("ellipsis");
    pageNumbers.push(totalPages.value);
  }

  return pageNumbers;
});

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value && page !== props.modelValue) {
    emit("update:modelValue", page);
  }
};

onMounted(() => {
  if (process.env.NODE_ENV !== "production") {
    if (props.modelValue < 1 || props.modelValue > totalPages.value) {
      console.warn(
        "[ShPagination] Current page is out of bounds. " +
          `Expected between 1 and ${totalPages.value}, received ${props.modelValue}.`,
      );
    }
  }
});
</script>

<template>
  <nav aria-label="Pagination" class="sh-pagination">
    <ul class="sh-pagination__list">
      <!-- First page -->
      <li v-if="showFirstLast" class="sh-pagination__item">
        <button
          type="button"
          class="sh-pagination__button"
          :disabled="modelValue === 1"
          :aria-label="`Go to first page`"
          @click="goToPage(1)"
        >
          ««
        </button>
      </li>

      <!-- Previous page -->
      <li class="sh-pagination__item">
        <button
          type="button"
          class="sh-pagination__button"
          :disabled="modelValue === 1"
          :aria-label="`Go to previous page`"
          @click="goToPage(modelValue - 1)"
        >
          «
        </button>
      </li>

      <!-- Page numbers -->
      <li
        v-for="(page, index) in pages"
        :key="index"
        class="sh-pagination__item"
      >
        <span
          v-if="page === 'ellipsis'"
          class="sh-pagination__ellipsis"
          aria-hidden="true"
        >
          …
        </span>
        <button
          v-else
          type="button"
          class="sh-pagination__button"
          :class="{ 'sh-pagination__button--current': page === modelValue }"
          :aria-label="`Go to page ${page}`"
          :aria-current="page === modelValue ? 'page' : undefined"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
      </li>

      <!-- Next page -->
      <li class="sh-pagination__item">
        <button
          type="button"
          class="sh-pagination__button"
          :disabled="modelValue === totalPages"
          :aria-label="`Go to next page`"
          @click="goToPage(modelValue + 1)"
        >
          »
        </button>
      </li>

      <!-- Last page -->
      <li v-if="showFirstLast" class="sh-pagination__item">
        <button
          type="button"
          class="sh-pagination__button"
          :disabled="modelValue === totalPages"
          :aria-label="`Go to last page`"
          @click="goToPage(totalPages)"
        >
          »»
        </button>
      </li>
    </ul>
  </nav>
</template>
