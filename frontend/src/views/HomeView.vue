<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
    <div class="container mx-auto px-4 py-16">
      <!-- Hero Section -->
      <div class="text-center mb-16">
        <h1 class="text-5xl font-bold text-gradient mb-6">
          🚀 Fullstack Vue + NestJS
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Uma aplicação moderna construída com as melhores tecnologias: 
          Vue 3, NestJS, TypeScript, Prisma e PostgreSQL.
        </p>
        <div class="flex gap-4 justify-center flex-wrap">
          <router-link to="/auth/login" class="btn btn-primary btn-lg">
            Fazer Login
          </router-link>
          <router-link to="/auth/register" class="btn btn-outline btn-lg">
            Criar Conta
          </router-link>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div class="card">
          <div class="card-body text-center">
            <div class="text-4xl mb-4">⚡</div>
            <h3 class="text-xl font-semibold mb-2">Performance</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Construído com Vite para desenvolvimento ultra-rápido
            </p>
          </div>
        </div>

        <div class="card">
          <div class="card-body text-center">
            <div class="text-4xl mb-4">🔐</div>
            <h3 class="text-xl font-semibold mb-2">Segurança</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Autenticação JWT robusta e práticas de segurança modernas
            </p>
          </div>
        </div>

        <div class="card">
          <div class="card-body text-center">
            <div class="text-4xl mb-4">📱</div>
            <h3 class="text-xl font-semibold mb-2">Responsivo</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Interface adaptável para todos os dispositivos
            </p>
          </div>
        </div>

        <div class="card">
          <div class="card-body text-center">
            <div class="text-4xl mb-4">🧪</div>
            <h3 class="text-xl font-semibold mb-2">Testado</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Cobertura completa de testes unitários e E2E
            </p>
          </div>
        </div>

        <div class="card">
          <div class="card-body text-center">
            <div class="text-4xl mb-4">🐳</div>
            <h3 class="text-xl font-semibold mb-2">Docker Ready</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Containerização completa para deploy fácil
            </p>
          </div>
        </div>

        <div class="card">
          <div class="card-body text-center">
            <div class="text-4xl mb-4">📚</div>
            <h3 class="text-xl font-semibold mb-2">Documentado</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Documentação completa e API com Swagger
            </p>
          </div>
        </div>
      </div>

      <!-- Tech Stack -->
      <div class="text-center">
        <h2 class="text-3xl font-bold mb-8">Stack Tecnológica</h2>
        <div class="flex flex-wrap justify-center gap-4">
          <span class="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
            Vue 3
          </span>
          <span class="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full">
            NestJS
          </span>
          <span class="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full">
            TypeScript
          </span>
          <span class="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full">
            Prisma
          </span>
          <span class="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full">
            PostgreSQL
          </span>
          <span class="inline-flex items-center px-4 py-2 bg-cyan-100 text-cyan-800 rounded-full">
            TailwindCSS
          </span>
          <span class="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full">
            Vite
          </span>
          <span class="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-full">
            Docker
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

onMounted(() => {
  appStore.setBreadcrumbs([
    { label: 'Início' }
  ])
})
</script>
