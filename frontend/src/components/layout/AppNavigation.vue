<template>
  <nav class="bg-white dark:bg-gray-800 shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex justify-between h-16">
        <!-- Logo e Navigation Links -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center">
            <span class="text-2xl font-bold text-primary-600">🚀</span>
            <span class="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
              Fullstack App
            </span>
          </router-link>

          <div class="hidden md:ml-10 md:flex md:space-x-8">
            <router-link
              to="/"
              class="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              active-class="text-primary-600 dark:text-primary-400"
            >
              Início
            </router-link>
            <router-link
              to="/about"
              class="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              active-class="text-primary-600 dark:text-primary-400"
            >
              Sobre
            </router-link>
            <router-link
              v-if="authStore.isAuthenticated"
              to="/dashboard"
              class="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              active-class="text-primary-600 dark:text-primary-400"
            >
              Dashboard
            </router-link>
          </div>
        </div>

        <!-- Botões de ação -->
        <div class="flex items-center space-x-4">
          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="p-2 rounded-md text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <svg v-if="appStore.isDarkMode" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>

          <!-- Auth Buttons -->
          <div v-if="!authStore.isAuthenticated" class="flex space-x-2">
            <router-link to="/auth/login" class="btn btn-outline btn-sm">
              Login
            </router-link>
            <router-link to="/auth/register" class="btn btn-primary btn-sm">
              Cadastro
            </router-link>
          </div>

          <!-- User Menu -->
          <div v-else class="relative">
            <button
              @click="showUserMenu = !showUserMenu"
              class="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <img
                v-if="authStore.currentUser?.avatar"
                :src="authStore.currentUser.avatar"
                :alt="authStore.currentUser.name"
                class="w-8 h-8 rounded-full"
              />
              <div v-else class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-medium">
                {{ authStore.currentUser?.name?.charAt(0).toUpperCase() }}
              </div>
              <span class="text-sm font-medium">{{ authStore.currentUser?.name }}</span>
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50"
              @click="showUserMenu = false"
            >
              <router-link
                to="/profile"
                class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Meu Perfil
              </router-link>
              <button
                @click="handleLogout"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'

const router = useRouter()
const authStore = useAuthStore()
const appStore = useAppStore()

const showUserMenu = ref(false)

const toggleTheme = () => {
  const newTheme = appStore.isDarkMode ? 'light' : 'dark'
  appStore.setTheme(newTheme)
}

const handleLogout = async () => {
  try {
    await authStore.logout()
    appStore.showSuccess('Sucesso', 'Logout realizado com sucesso!')
    router.push('/')
  } catch (error: any) {
    appStore.showError('Erro', 'Falha ao fazer logout')
  }
}
</script>
