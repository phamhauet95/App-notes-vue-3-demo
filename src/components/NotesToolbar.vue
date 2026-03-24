<script setup lang="ts">
import type { SortOrder } from '../stores/notes'

defineProps<{
  searchQuery: string
  sortOrder: SortOrder
}>()

const emit = defineEmits<{
  (e: 'update:search-query', value: string): void
  (e: 'update:sort-order', value: SortOrder): void
  (e: 'add'): void
}>()
</script>

<template>
  <section
     class="mb-6 flex flex-col gap-4 rounded-3xl border border-white/60 bg-white/70 shadow-sm backdrop-blur md:mb-8 md:flex-row md:items-center md:justify-between"
  >
    <div class="flex flex-1 flex-col gap-3 md:flex-row">
      <input
        class="h-12 flex-1 rounded-2xl border border-slate-300 bg-white px-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
        type="text"
        placeholder="Search notes..."
        :value="searchQuery"
        @input="
          emit(
            'update:search-query',
            ($event.target as HTMLInputElement).value,
          )
        "
      />

      <select
        class="h-12 rounded-2xl border border-slate-300 bg-white px-4 text-slate-900 outline-none transition cursor-pointer focus:border-slate-500 focus:ring-2 focus:ring-slate-200 md:w-48"
        :value="sortOrder"
        @change="
          emit(
            'update:sort-order',
            ($event.target as HTMLSelectElement).value as SortOrder,
          )
        "
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
      </select>
    </div>

    <button
      class="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-900 px-5 font-medium text-white shadow-lg"
      @click="emit('add')"
    >
      Add Note
    </button>
  </section>
</template>