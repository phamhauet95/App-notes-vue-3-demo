<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

const textareaRef = ref<HTMLTextAreaElement | null>(null)

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', value: string): void
}>()

const content = ref('')

watch(
  () => props.open,
  (isOpen) => {
    if (!isOpen) {
      content.value = ''
    }
  },
)

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      await nextTick()
      textareaRef.value?.focus()
    } else {
      content.value = ''
    }
  }
)

function submitForm(): void {
  const trimmed = content.value.trim()
  if (!trimmed) return

  emit('submit', trimmed)
  content.value = ''
}
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
    @click.self="emit('close')"
  >
    <div class="w-full max-w-xl rounded-3xl bg-white p-5 shadow-2xl">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-xl font-semibold text-slate-900">Add a note</h2>
      </div>

      <textarea
        ref="textareaRef"
        v-model="content"
        rows="6"
        placeholder="Write your note here..."
        class="min-h-[180px] w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
      />

      <div class="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          class="inline-flex h-11 items-center justify-center rounded-2xl bg-slate-200 px-5 font-medium text-slate-900 hover:bg-slate-300"
          @click="emit('close')"
        >
          Cancel
        </button>
        <button
          class="inline-flex h-11 items-center justify-center rounded-2xl bg-slate-900 px-5 font-medium text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="!content.trim()"
          @click="submitForm"
        >
          Save Note
        </button>
      </div>
    </div>
  </div>
</template>