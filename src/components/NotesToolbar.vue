<script setup lang="ts">
import { ref } from 'vue'
import type { SortOrder } from '../stores/notes'
import IconKeyboardArrowDown from './icons/IconKeyboardArrowDown.vue';

defineProps<{
  searchQuery: string
  sortOrder: SortOrder
}>()

const emit = defineEmits<{
  (e: 'update:search-query', value: string): void
  (e: 'update:sort-order', value: SortOrder): void
  (e: 'add'): void
}>()

const isSelectActive = ref(false)

function handleSelectFocus() {
  isSelectActive.value = true
}

function handleSelectBlur() {
  isSelectActive.value = false
}

function handleSelectChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value as SortOrder
  emit('update:sort-order', value)

  // reset icon state ngay sau khi chọn xong
  isSelectActive.value = false
}
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
       <div class="relative md:w-56">
           <select
          class="h-12 w-full appearance-none rounded-2xl border border-slate-300 bg-white px-4 pr-11 text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          :value="sortOrder"
          @focus="handleSelectFocus"
          @blur="handleSelectBlur"
          @change="handleSelectChange"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>

        <span
          class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-500 transition-all duration-200"
          :class="isSelectActive ? 'rotate-180 text-slate-900' : 'rotate-0 text-slate-500'"
        >
          <IconKeyboardArrowDown />
        </span>
       </div>
    </div>

    <button
      class="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-900 px-5 font-medium text-white shadow-lg"
      @click="emit('add')"
    >
      Add Note
    </button>
  </section>
</template>