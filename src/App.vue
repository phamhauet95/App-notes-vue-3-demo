<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useNotesStore } from './stores/notes'
import NotesToolbar from './components/NotesToolbar.vue'
import AddNoteModal from './components/AddNoteModal.vue'
import NoteCard from './components/NoteCard.vue'
import PaginationControls from './components/PaginationControls.vue'
import Notification from './components/common/Notification.vue'
import { useNotificationStore } from './stores/notification'
import ConfirmDeleteModal from './components/ConfirmDeleteModal.vue'
import IconPlus from './components/icons/IconPlus.vue'

const store = useNotesStore()
const notify = useNotificationStore()

const isModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const selectedNoteId = ref<string | null>(null)

function openModal(): void {
  isModalOpen.value = true
}

function closeModal(): void {
  isModalOpen.value = false
}

function handleAddNote(content: string): void {
  store.addNote(content)
  closeModal()
  notify.show('Note added successfully!')
}

function openDeleteModal(id: string): void {
  selectedNoteId.value = id
  isDeleteModalOpen.value = true
}

function closeDeleteModal(): void {
  isDeleteModalOpen.value = false
  selectedNoteId.value = null
}

function confirmDelete(): void {
  if (!selectedNoteId.value) return

  store.removeNote(selectedNoteId.value)
  notify.show('Note deleted successfully!')
  closeDeleteModal()
}

onMounted(() => {
  store.loadNotes()
})
</script>

<template>
  <div class="min-h-screen px-4 py-6 md:px-6 md:py-8">
    <Notification />
    <div class="mx-auto w-full max-w-7xl">
      <header class="mb-6 md:mb-8">
        <h1 class="text-5xl font-black leading-none text-slate-900 sm:text-6xl md:text-7xl">
          Notes
        </h1>
        <p class="mt-3 max-w-2xl text-sm text-slate-700 sm:text-base">
          Add, search, sort and manage your notes.
        </p>
      
      </header>

      <NotesToolbar
        :search-query="store.searchQuery"
        :sort-order="store.sortOrder"
        @update:search-query="store.setSearchQuery"
        @update:sort-order="store.setSortOrder"
        @add="openModal"
      />

      <section
        v-if="store.paginatedNotes.length"
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <NoteCard
          v-for="note in store.paginatedNotes"
          :key="note.id"
          :note="note"
          @remove="openDeleteModal"
        />
      </section>

      <section
        v-else
        class="rounded-3xl border border-white/70 bg-white/70 px-6 py-12 text-center shadow-sm backdrop-blur"
      >
        <h2 class="text-xl font-semibold text-slate-900">No notes found</h2>
        <p class="mt-2 text-slate-600">
          Try adding a new note or updating your search keyword.
        </p>
      </section>

      <PaginationControls
        v-if="store.sortedNotes.length > store.pageSize"
        :current-page="store.currentPage"
        :total-pages="store.totalPages"
        @change-page="store.setPage"
      />

      <AddNoteModal
        :open="isModalOpen"
        @close="closeModal"
        @submit="handleAddNote"
      />

      <ConfirmDeleteModal
        :open="isDeleteModalOpen"
        @close="closeDeleteModal"
        @confirm="confirmDelete"
      /><button
          class="fixed bottom-6 right-6 h-14 w-14 flex items-center justify-center rounded-full bg-slate-900 text-3xl text-white shadow-2xl leading-none"
          aria-label="Add note"
          @click="openModal"
        >
          <IconPlus />
        </button>
    </div>
  </div>
</template>