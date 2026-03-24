<script setup lang="ts">
import { computed } from 'vue'
import type { NoteItem } from '../stores/notes'
import IconClose from './icons/IconClose.vue';

const props = defineProps<{
  note: NoteItem
}>()

const emit = defineEmits<{
  (e: 'remove', id: string): void
}>()

const formattedDate = computed(() => {
  return new Date(props.note.createdAt).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
})
</script>

<template>
  <article
    class="flex min-h-[220px] flex-col rounded-3xl p-4 shadow-xl"
    :style="{ background: note.background }"
  >
    <div class="mb-2 flex justify-end">
      <button
        class="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-xl text-red-500 hover:bg-white"
        aria-label="Delete note"
        @click="emit('remove', note.id)"
      >
        <IconClose />
      </button>
    </div>

    <p class="flex-1 whitespace-pre-wrap break-words text-slate-800">
      {{ note.content }}
    </p>

    <footer class="mt-4 text-base font-medium text-slate-600 flex font=semibold justify-end">
      {{ formattedDate }}
    </footer>
  </article>
</template>