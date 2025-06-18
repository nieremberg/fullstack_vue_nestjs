import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '@/services/auth'
import { userService } from '@/services/user'
import type { User, LoginCredentials, RegisterCredentials } from '@/types/auth'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isLoading = computed(() => loading.value)
  const currentUser = computed(() => user.value)
  const authError = computed(() => error.value)

  // Actions
  async function login(credentials: LoginCredentials) {
    try {
      loading.value = true
      error.value = null

      const response = await authService.login(credentials)

      // Set tokens and user data
      token.value = response.accessToken
      refreshToken.value = response.refreshToken
      user.value = response.user

      // Store in localStorage for persistence
      localStorage.setItem('accessToken', response.accessToken)
      localStorage.setItem('refreshToken', response.refreshToken)
      localStorage.setItem('user', JSON.stringify(response.user))

      return response
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erro ao fazer login'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function register(credentials: RegisterCredentials) {
    try {
      loading.value = true
      error.value = null

      const response = await authService.register(credentials)

      // Auto login after registration
      token.value = response.accessToken
      refreshToken.value = response.refreshToken
      user.value = response.user

      // Store in localStorage
      localStorage.setItem('accessToken', response.accessToken)
      localStorage.setItem('refreshToken', response.refreshToken)
      localStorage.setItem('user', JSON.stringify(response.user))

      return response
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erro ao criar conta'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    try {
      loading.value = true

      // Call logout API if token exists
      if (token.value) {
        await authService.logout()
      }
    } catch (err) {
      console.error('Error during logout:', err)
    } finally {
      // Clear state regardless of API call success
      clearAuth()
      loading.value = false
    }
  }

  async function refreshAccessToken() {
    try {
      if (!refreshToken.value) {
        throw new Error('No refresh token available')
      }

      const response = await authService.refreshToken(refreshToken.value)

      token.value = response.accessToken
      if (response.refreshToken) {
        refreshToken.value = response.refreshToken
      }

      // Update localStorage
      localStorage.setItem('accessToken', response.accessToken)
      if (response.refreshToken) {
        localStorage.setItem('refreshToken', response.refreshToken)
      }

      return response.accessToken
    } catch (err) {
      // If refresh fails, logout completely
      clearAuth()
      throw err
    }
  }

  async function updateProfile(userData: Partial<User>) {
    try {
      loading.value = true
      error.value = null

      const updatedUser = await userService.updateProfile(userData)
      user.value = updatedUser

      // Update localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser))

      return updatedUser
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erro ao atualizar perfil'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function initializeAuth() {
    try {
      // Try to get auth data from localStorage
      const storedToken = localStorage.getItem('accessToken')
      const storedRefreshToken = localStorage.getItem('refreshToken')
      const storedUser = localStorage.getItem('user')

      if (storedToken && storedUser) {
        token.value = storedToken
        refreshToken.value = storedRefreshToken
        user.value = JSON.parse(storedUser)

        // Verify token is still valid by fetching current user
        try {
          const currentUser = await userService.getCurrentUser()
          user.value = currentUser
          localStorage.setItem('user', JSON.stringify(currentUser))
        } catch (err) {
          // Token might be expired, try to refresh
          if (storedRefreshToken) {
            await refreshAccessToken()
          } else {
            clearAuth()
          }
        }
      }
    } catch (err) {
      console.error('Failed to initialize auth:', err)
      clearAuth()
    }
  }

  function clearAuth() {
    user.value = null
    token.value = null
    refreshToken.value = null
    error.value = null

    // Clear localStorage
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
  }

  function clearError() {
    error.value = null
  }

  return {
    // State
    user: readonly(user),
    token: readonly(token),
    loading: readonly(loading),
    error: readonly(error),

    // Getters
    isAuthenticated,
    isLoading,
    currentUser,
    authError,

    // Actions
    login,
    register,
    logout,
    refreshAccessToken,
    updateProfile,
    initializeAuth,
    clearAuth,
    clearError
  }
}, {
  persist: {
    key: 'auth-store',
    storage: localStorage,
    paths: ['user', 'token', 'refreshToken']
  }
})
