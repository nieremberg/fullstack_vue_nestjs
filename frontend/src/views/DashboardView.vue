<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Bem-vindo de volta, {{ authStore.currentUser?.name }}!
        </p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="card">
          <div class="card-body">
            <div class="flex items-center">
              <div class="p-2 bg-blue-100 rounded-lg">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Usuários</p>
                <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ stats.users }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <div class="flex items-center">
              <div class="p-2 bg-green-100 rounded-lg">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Projetos</p>
                <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ stats.projects }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <div class="flex items-center">
              <div class="p-2 bg-yellow-100 rounded-lg">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Pendentes</p>
                <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ stats.pending }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <div class="flex items-center">
              <div class="p-2 bg-purple-100 rounded-lg">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Performance</p>
                <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ stats.performance }}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="card">
          <div class="card-header">
            <h3 class="text-lg font-medium">Atividade Recente</h3>
          </div>
          <div class="card-body">
            <div class="space-y-4">
              <div v-for="activity in recentActivity" :key="activity.id" class="flex items-center">
                <div class="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                <div class="flex-1">
                  <p class="text-sm text-gray-900 dark:text-white">{{ activity.message }}</p>
                  <p class="text-xs text-gray-500">{{ activity.time }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="text-lg font-medium">Links Rápidos</h3>
          </div>
          <div class="card-body">
            <div class="grid grid-cols-2 gap-4">
              <router-link to="/profile" class="btn btn-outline">
                Meu Perfil
              </router-link>
              <button class="btn btn-outline" @click="appStore.toggleSidebar">
                Configurações
              </button>
              <button class="btn btn-outline">
                Relatórios
              </button>
              <button class="btn btn-outline">
                Ajuda
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'

const authStore = useAuthStore()
const appStore = useAppStore()

const stats = ref({
  users: 1247,
  projects: 23,
  pending: 8,
  performance: 94
})

const recentActivity = ref([
  { id: 1, message: 'Novo usuário registrado', time: '2 minutos atrás' },
  { id: 2, message: 'Projeto atualizado', time: '1 hora atrás' },
  { id: 3, message: 'Sistema de backup executado', time: '3 horas atrás' },
  { id: 4, message: 'Relatório mensal gerado', time: '1 dia atrás' }
])

onMounted(() => {
  appStore.setBreadcrumbs([
    { label: 'Dashboard' }
  ])
})
</script>
