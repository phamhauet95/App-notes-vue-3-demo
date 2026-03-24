<script setup lang="ts">
import { useNotificationStore } from '@/stores/notification';

const store = useNotificationStore()
</script>

<template>
  <transition name="fade">
    <div
      v-if="store.visible"
      class="fixed top-6 left-1/2 z-50 -translate-x-1/2 rounded-xl px-6 py-3 text-white shadow-xl"
      :class="
        store.type === 'success'
          ? 'bg-green-500'
          : 'bg-red-500'
      "
    >
      {{ store.message }}
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>