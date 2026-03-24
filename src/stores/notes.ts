import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

export type SortOrder = 'newest' | 'oldest'

export interface NoteItem {
  id: string
  content: string
  createdAt: string
  background: string
}

const STORAGE_KEY = 'rwazi-vue-notes'

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function getRandomGradient(): string {
  const hue1 = Math.floor(Math.random() * 360)
  const hue2 = (hue1 + 40 + Math.floor(Math.random() * 60)) % 360

  return `linear-gradient(135deg, hsl(${hue1} 80% 92%), hsl(${hue2} 75% 85%))`
}

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<NoteItem[]>([])
  const searchQuery = ref('')
  const sortOrder = ref<SortOrder>('newest')
  const currentPage = ref(1)
  const pageSize = ref(8)

  function loadNotes(): void {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return

    try {
      const parsed = JSON.parse(raw) as NoteItem[]
      notes.value = Array.isArray(parsed) ? parsed : []
    } catch {
      notes.value = []
    }
  }

  function persistNotes(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes.value))
  }

  function addNote(content: string): void {
    const trimmed = content.trim()
    if (!trimmed) return

    notes.value.unshift({
      id: generateId(),
      content: trimmed,
      createdAt: new Date().toISOString(),
      background: getRandomGradient(),
    })

    currentPage.value = 1
  }

  function removeNote(id: string): void {
    notes.value = notes.value.filter((note) => note.id !== id)

    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value
    }
  }

  function setSearchQuery(query: string): void {
    searchQuery.value = query
    currentPage.value = 1
  }

  function setSortOrder(order: SortOrder): void {
    sortOrder.value = order
    currentPage.value = 1
  }

  function setPage(page: number): void {
    if (page < 1 || page > totalPages.value) return
    currentPage.value = page
  }

  const filteredNotes = computed(() => {
    const keyword = searchQuery.value.trim().toLowerCase()
    if (!keyword) return notes.value

    return notes.value.filter((note) =>
      note.content.toLowerCase().includes(keyword),
    )
  })

  const sortedNotes = computed(() => {
    return [...filteredNotes.value].sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime()
      const timeB = new Date(b.createdAt).getTime()

      return sortOrder.value === 'newest' ? timeB - timeA : timeA - timeB
    })
  })

  const totalPages = computed(() => {
    return Math.max(1, Math.ceil(sortedNotes.value.length / pageSize.value))
  })

  const paginatedNotes = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    return sortedNotes.value.slice(start, start + pageSize.value)
  })

  watch(
    notes,
    () => {
      persistNotes()
    },
    { deep: true },
  )

  return {
    notes,
    searchQuery,
    sortOrder,
    currentPage,
    pageSize,
    filteredNotes,
    sortedNotes,
    totalPages,
    paginatedNotes,
    loadNotes,
    addNote,
    removeNote,
    setSearchQuery,
    setSortOrder,
    setPage,
  }
})