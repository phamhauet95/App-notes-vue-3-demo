<script setup lang="ts">
defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm'): void
}>()
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
    @click.self="emit('close')"
  >
    <div class="w-full max-w-md rounded-3xl bg-white p-5 shadow-2xl">
      <div class="mb-3 flex items-center justify-between">
        <h2 class="text-xl font-semibold text-slate-900">Delete note?</h2>
        <button
          class="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-xl text-slate-700 transition hover:bg-slate-200"
          aria-label="Close delete modal"
          @click="emit('close')"
        >
          ×
        </button>
      </div>

      <p class="text-sm text-slate-600">
        Are you sure you want to delete this note?
      </p>

      <div class="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          class="inline-flex h-11 items-center justify-center rounded-2xl bg-slate-200 px-5 font-medium text-slate-900 hover:bg-slate-300"
          @click="emit('close')"
        >
          Cancel
        </button>

        <button
          class="inline-flex h-11 items-center justify-center rounded-2xl bg-red-500 px-5 font-medium text-white shadow-lg hover:bg-red-600"
          @click="emit('confirm')"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>