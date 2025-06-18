import axios, { 
  AxiosInstance, 
  AxiosRequestConfig, 
  AxiosResponse, 
  AxiosError 
} from 'axios'
import type { ApiResponse, ApiError } from '@/types/api'

class ApiService {
  private api: AxiosInstance
  private baseURL: string

  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor - Add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        // Add request timestamp
        config.metadata = { startTime: new Date() }

        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor - Handle responses and errors
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log response time in development
        if (import.meta.env.DEV) {
          const startTime = response.config.metadata?.startTime
          if (startTime) {
            const duration = new Date().getTime() - startTime.getTime()
            console.log(`API ${response.config.method?.toUpperCase()} ${response.config.url}: ${duration}ms`)
          }
        }

        return response
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

        // Handle 401 errors - Token expired
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true

          try {
            const refreshToken = localStorage.getItem('refreshToken')
            if (refreshToken) {
              const response = await this.post('/auth/refresh', { refreshToken })
              const { accessToken } = response.data

              localStorage.setItem('accessToken', accessToken)

              // Retry original request with new token
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${accessToken}`
              }

              return this.api(originalRequest)
            }
          } catch (refreshError) {
            // Refresh failed - redirect to login
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('user')

            // Only redirect if not already on login page
            if (window.location.pathname !== '/auth/login') {
              window.location.href = '/auth/login'
            }
          }
        }

        // Handle other errors
        const apiError: ApiError = {
          message: error.response?.data?.message || error.message || 'Ocorreu um erro',
          statusCode: error.response?.status || 500,
          error: error.response?.data?.error || 'Internal Server Error',
          timestamp: new Date().toISOString(),
          path: error.config?.url || ''
        }

        return Promise.reject(apiError)
      }
    )
  }

  // Generic HTTP methods
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.api.get(url, config)
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.api.post(url, data, config)
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.api.put(url, data, config)
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.api.patch(url, data, config)
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.api.delete(url, config)
  }

  // File upload methods
  async uploadFile(url: string, file: File, onProgress?: (progress: number) => void): Promise<AxiosResponse> {
    const formData = new FormData()
    formData.append('file', file)

    return this.api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(progress)
        }
      }
    })
  }

  async uploadFiles(url: string, files: File[], onProgress?: (progress: number) => void): Promise<AxiosResponse> {
    const formData = new FormData()
    files.forEach((file, index) => {
      formData.append(`files`, file)
    })

    return this.api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(progress)
        }
      }
    })
  }

  // Download file
  async downloadFile(url: string, filename?: string): Promise<void> {
    const response = await this.api.get(url, {
      responseType: 'blob'
    })

    const blob = new Blob([response.data])
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = filename || 'download'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(downloadUrl)
  }

  // Set auth token
  setAuthToken(token: string) {
    this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  // Remove auth token
  removeAuthToken() {
    delete this.api.defaults.headers.common['Authorization']
  }

  // Get base URL
  getBaseURL(): string {
    return this.baseURL
  }

  // Create cancel token
  createCancelToken() {
    return axios.CancelToken.source()
  }

  // Check if error is cancel
  isCancel(error: any): boolean {
    return axios.isCancel(error)
  }
}

// Create and export singleton instance
export const apiService = new ApiService()

// Export class for testing
export { ApiService }

// Axios instance for direct access if needed
export const axiosInstance = axios
