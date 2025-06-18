import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

// CSS imports
import './assets/css/main.css'

// Create Vue app
const app = createApp(App)

// Install plugins
app.use(createPinia())
app.use(router)

// Global properties
app.config.globalProperties.$appName = import.meta.env.VITE_APP_NAME || 'Fullstack App'
app.config.globalProperties.$apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'

// Error handling
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue Error:', err)
  console.error('Component:', vm)
  console.error('Info:', info)
}

// Mount app
app.mount('#app')
