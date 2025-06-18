import { apiService } from './api'
import type { 
  LoginCredentials, 
  RegisterCredentials, 
  AuthResponse, 
  RefreshTokenResponse,
  PasswordResetRequest,
  PasswordReset,
  UpdatePasswordRequest
} from '@/types/auth'
import { API_ENDPOINTS } from '@/types/api'

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN, 
      credentials
    )
    return response.data.data
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER, 
      credentials
    )
    return response.data.data
  }

  async logout(): Promise<void> {
    try {
      await apiService.post(API_ENDPOINTS.AUTH.LOGOUT)
    } catch (error) {
      // Continue with logout even if API call fails
      console.warn('Logout API call failed:', error)
    } finally {
      // Always clear local storage
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      apiService.removeAuthToken()
    }
  }

  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    const response = await apiService.post<RefreshTokenResponse>(
      API_ENDPOINTS.AUTH.REFRESH,
      { refreshToken }
    )
    return response.data.data
  }

  async forgotPassword(data: PasswordResetRequest): Promise<{ message: string }> {
    const response = await apiService.post(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      data
    )
    return response.data.data
  }

  async resetPassword(data: PasswordReset): Promise<{ message: string }> {
    const response = await apiService.post(
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
      data
    )
    return response.data.data
  }

  async changePassword(data: UpdatePasswordRequest): Promise<{ message: string }> {
    const response = await apiService.post(
      API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
      data
    )
    return response.data.data
  }

  async verifyEmail(token: string): Promise<{ message: string }> {
    const response = await apiService.post('/auth/verify-email', { token })
    return response.data.data
  }

  async resendVerificationEmail(): Promise<{ message: string }> {
    const response = await apiService.post('/auth/resend-verification')
    return response.data.data
  }

  // Helper methods
  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const currentTime = Math.floor(Date.now() / 1000)
      return payload.exp < currentTime
    } catch (error) {
      return true
    }
  }

  getTokenPayload(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]))
    } catch (error) {
      return null
    }
  }

  hasValidToken(): boolean {
    const token = localStorage.getItem('accessToken')
    if (!token) return false
    return !this.isTokenExpired(token)
  }

  getUserFromToken(token: string): any {
    const payload = this.getTokenPayload(token)
    return payload ? payload.user : null
  }

  getRoleFromToken(token: string): string | null {
    const payload = this.getTokenPayload(token)
    return payload ? payload.role : null
  }

  canRefreshToken(): boolean {
    const refreshToken = localStorage.getItem('refreshToken')
    if (!refreshToken) return false
    return !this.isTokenExpired(refreshToken)
  }
}

// Create and export singleton instance
export const authService = new AuthService()

// Export class for testing
export { AuthService }
