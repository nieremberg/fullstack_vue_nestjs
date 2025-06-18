import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { RouteRecordRaw } from 'vue-router'

// Lazy load components
const Home = () => import('@/views/HomeView.vue')
const About = () => import('@/views/AboutView.vue')
const Login = () => import('@/views/auth/LoginView.vue')
const Register = () => import('@/views/auth/RegisterView.vue')
const Dashboard = () => import('@/views/DashboardView.vue')
const Profile = () => import('@/views/ProfileView.vue')
const NotFound = () => import('@/views/NotFoundView.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Início',
      requiresAuth: false
    }
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      title: 'Sobre',
      requiresAuth: false
    }
  },
  {
    path: '/auth',
    redirect: '/auth/login',
    children: [
      {
        path: 'login',
        name: 'login',
        component: Login,
        meta: {
          title: 'Login',
          requiresAuth: false,
          requiresGuest: true
        }
      },
      {
        path: 'register',
        name: 'register',
        component: Register,
        meta: {
          title: 'Cadastro',
          requiresAuth: false,
          requiresGuest: true
        }
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard',
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      title: 'Perfil',
      requiresAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
    meta: {
      title: 'Página não encontrada',
      requiresAuth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else {
      return { top: 0 }
    }
  }
})

// Global navigation guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Set page title
  const appName = import.meta.env.VITE_APP_NAME || 'Fullstack App'
  document.title = to.meta.title ? `${to.meta.title} | ${appName}` : appName

  // Check authentication requirements
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    })
    return
  }

  // Check guest requirements (redirect authenticated users)
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next({ name: 'dashboard' })
    return
  }

  next()
})

export default router
