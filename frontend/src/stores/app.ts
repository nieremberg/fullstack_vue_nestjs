import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
  persistent?: boolean
  actions?: Array<{
    label: string
    action: () => void
    primary?: boolean
  }>
}

export const useAppStore = defineStore('app', () => {
  // State
  const loading = ref(false)
  const sidebarOpen = ref(false)
  const theme = ref<'light' | 'dark' | 'system'>('system')
  const notifications = ref<Notification[]>([])
  const breadcrumbs = ref<Array<{ label: string; to?: string }>>([])

  // Getters
  const isLoading = computed(() => loading.value)
  const isSidebarOpen = computed(() => sidebarOpen.value)
  const currentTheme = computed(() => {
    if (theme.value === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return theme.value
  })
  const isDarkMode = computed(() => currentTheme.value === 'dark')

  // Actions
  function setLoading(value: boolean) {
    loading.value = value
  }

  function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value
  }

  function setSidebarOpen(value: boolean) {
    sidebarOpen.value = value
  }

  function setTheme(newTheme: 'light' | 'dark' | 'system') {
    theme.value = newTheme

    // Update document class
    const root = document.documentElement
    root.classList.remove('light', 'dark')

    if (newTheme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.classList.add(prefersDark ? 'dark' : 'light')
    } else {
      root.classList.add(newTheme)
    }

    // Store preference
    localStorage.setItem('theme', newTheme)
  }

  function addNotification(notification: Omit<Notification, 'id'>) {
    const id = Math.random().toString(36).substr(2, 9)
    const newNotification: Notification = {
      id,
      duration: 5000,
      ...notification
    }

    notifications.value.push(newNotification)

    // Auto remove if not persistent
    if (!newNotification.persistent && newNotification.duration) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.duration)
    }

    return id
  }

  function removeNotification(id: string) {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  function clearNotifications() {
    notifications.value = []
  }

  function showSuccess(title: string, message: string, duration?: number) {
    return addNotification({
      type: 'success',
      title,
      message,
      duration
    })
  }

  function showError(title: string, message: string, persistent = false) {
    return addNotification({
      type: 'error',
      title,
      message,
      persistent,
      duration: persistent ? undefined : 8000
    })
  }

  function showWarning(title: string, message: string, duration?: number) {
    return addNotification({
      type: 'warning',
      title,
      message,
      duration
    })
  }

  function showInfo(title: string, message: string, duration?: number) {
    return addNotification({
      type: 'info',
      title,
      message,
      duration
    })
  }

  function setBreadcrumbs(items: Array<{ label: string; to?: string }>) {
    breadcrumbs.value = items
  }

  function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      setTheme('system')
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (theme.value === 'system') {
        const root = document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(e.matches ? 'dark' : 'light')
      }
    })
  }

  return {
    // State
    loading: readonly(loading),
    sidebarOpen: readonly(sidebarOpen),
    theme: readonly(theme),
    notifications: readonly(notifications),
    breadcrumbs: readonly(breadcrumbs),

    // Getters
    isLoading,
    isSidebarOpen,
    currentTheme,
    isDarkMode,

    // Actions
    setLoading,
    toggleSidebar,
    setSidebarOpen,
    setTheme,
    addNotification,
    removeNotification,
    clearNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    setBreadcrumbs,
    initializeTheme
  }
})
