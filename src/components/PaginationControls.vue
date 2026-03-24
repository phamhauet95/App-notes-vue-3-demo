<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  (e: 'change-page', page: number): void
}>()

const pages = computed(() =>
  Array.from({ length: props.totalPages }, (_, index) => index + 1),
)
</script>

<template>
  <nav class="mt-7 flex flex-wrap items-center justify-center gap-2">
    <button
      class="inline-flex h-10 min-w-[42px] items-center justify-center rounded-xl border border-slate-300 bg-white/80 px-3 text-slate-800 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
      :disabled="currentPage === 1"
      @click="emit('change-page', currentPage - 1)"
    >
      Prev
    </button>

    <button
      v-for="page in pages"
      :key="page"
      class="inline-flex h-10 min-w-[42px] items-center justify-center rounded-xl border px-3 transition"
      :class="
        page === currentPage
          ? 'border-slate-900 bg-slate-900 text-white'
          : 'border-slate-300 bg-white/80 text-slate-800 hover:bg-white'
      "
      @click="emit('change-page', page)"
    >
      {{ page }}
    </button>

    <button
      class="inline-flex h-10 min-w-[42px] items-center justify-center rounded-xl border border-slate-300 bg-white/80 px-3 text-slate-800 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
      :disabled="currentPage === totalPages"
      @click="emit('change-page', currentPage + 1)"
    >
      Next
    </button>
  </nav>
</template>