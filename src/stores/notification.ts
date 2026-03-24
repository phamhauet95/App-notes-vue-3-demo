import { ref } from 'vue'
import { defineStore } from 'pinia'

export type AlertType = 'success' | 'error'

export const useNotificationStore = defineStore('notification', () => {
  const message = ref('')
  const type = ref<AlertType>('success')
  const visible = ref(false)

  function show(msg: string, alertType: AlertType = 'success') {
    message.value = msg
    type.value = alertType
    visible.value = true

    setTimeout(() => {
      visible.value = false
    }, 2000)
  }

  function hide() {
    visible.value = false
  }

  return {
    message,
    type,
    visible,
    show,
    hide,
  }
})