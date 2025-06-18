<template>
  <div class="fixed top-4 right-4 z-50 space-y-4">
    <TransitionGroup name="notification" tag="div">
      <div
        v-for="notification in appStore.notifications"
        :key="notification.id"
        :class="[
          'max-w-sm w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden',
          {
            'border-l-4 border-green-400': notification.type === 'success',
            'border-l-4 border-red-400': notification.type === 'error',
            'border-l-4 border-yellow-400': notification.type === 'warning',
            'border-l-4 border-blue-400': notification.type === 'info',
          }
        ]"
      >
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <!-- Success Icon -->
              <CheckCircleIcon
                v-if="notification.type === 'success'"
                class="h-6 w-6 text-green-400"
                aria-hidden="true"
              />
              <!-- Error Icon -->
              <XCircleIcon
                v-else-if="notification.type === 'error'"
                class="h-6 w-6 text-red-400"
                aria-hidden="true"
              />
              <!-- Warning Icon -->
              <ExclamationTriangleIcon
                v-else-if="notification.type === 'warning'"
                class="h-6 w-6 text-yellow-400"
                aria-hidden="true"
              />
              <!-- Info Icon -->
              <InformationCircleIcon
                v-else
                class="h-6 w-6 text-blue-400"
                aria-hidden="true"
              />
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                {{ notification.title }}
              </p>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {{ notification.message }}
              </p>
              <!-- Actions -->
              <div v-if="notification.actions" class="mt-3 flex space-x-2">
                <button
                  v-for="action in notification.actions"
                  :key="action.label"
                  @click="action.action"
                  :class="[
                    'text-sm font-medium rounded-md px-3 py-2',
                    action.primary
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
                  ]"
                >
                  {{ action.label }}
                </button>
              </div>
            </div>
            <div class="ml-4 flex-shrink-0 flex">
              <button
                @click="appStore.removeNotification(notification.id)"
                class="bg-white dark:bg-gray-800 rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <span class="sr-only">Fechar</span>
                <XMarkIcon class="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon,
  XMarkIcon 
} from '@heroicons/vue/24/outline'

const appStore = useAppStore()
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.notification-move {
  transition: transform 0.3s ease;
}
</style>
