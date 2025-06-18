<template>
  <footer class="bg-gray-800 text-white">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-lg font-semibold mb-4">Fullstack App</h3>
          <p class="text-gray-300 text-sm">
            Uma aplicação moderna construída com Vue 3 e NestJS para demonstrar as melhores práticas de desenvolvimento fullstack.
          </p>
        </div>

        <div>
          <h4 class="text-md font-semibold mb-4">Links</h4>
          <ul class="space-y-2 text-sm">
            <li><router-link to="/" class="text-gray-300 hover:text-white">Início</router-link></li>
            <li><router-link to="/about" class="text-gray-300 hover:text-white">Sobre</router-link></li>
            <li><router-link to="/dashboard" class="text-gray-300 hover:text-white">Dashboard</router-link></li>
          </ul>
        </div>

        <div>
          <h4 class="text-md font-semibold mb-4">Tecnologias</h4>
          <ul class="space-y-2 text-sm text-gray-300">
            <li>Vue 3 + TypeScript</li>
            <li>NestJS + Prisma</li>
            <li>PostgreSQL</li>
            <li>Docker</li>
          </ul>
        </div>

        <div>
          <h4 class="text-md font-semibold mb-4">Recursos</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="http://localhost:3001/api" target="_blank" class="text-gray-300 hover:text-white">API Docs</a></li>
            <li><a href="http://localhost:6006" target="_blank" class="text-gray-300 hover:text-white">Storybook</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white">GitHub</a></li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
        <p>&copy; 2025 Fullstack App. Desenvolvido com ❤️ para demonstrar tecnologias modernas.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer component - no logic needed
</script>
