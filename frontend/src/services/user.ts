import { apiService } from './api'
import type { User, UpdateProfileRequest } from '@/types/auth'
import type { PaginatedResponse, QueryParams } from '@/types/api'
import { API_ENDPOINTS } from '@/types/api'

class UserService {
  async getCurrentUser(): Promise<User> {
    const response = await apiService.get<User>(API_ENDPOINTS.AUTH.PROFILE)
    return response.data.data
  }

  async getUserById(id: string): Promise<User> {
    const response = await apiService.get<User>(API_ENDPOINTS.USERS.GET(id))
    return response.data.data
  }

  async getUsers(params?: QueryParams): Promise<PaginatedResponse<User>> {
    const response = await apiService.get<PaginatedResponse<User>>(
      API_ENDPOINTS.USERS.LIST,
      { params }
    )
    return response.data.data
  }

  async updateProfile(data: UpdateProfileRequest): Promise<User> {
    const response = await apiService.patch<User>(
      API_ENDPOINTS.AUTH.PROFILE,
      data
    )
    return response.data.data
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const response = await apiService.patch<User>(
      API_ENDPOINTS.USERS.UPDATE(id),
      data
    )
    return response.data.data
  }

  async deleteUser(id: string): Promise<void> {
    await apiService.delete(API_ENDPOINTS.USERS.DELETE(id))
  }

  async uploadAvatar(file: File, onProgress?: (progress: number) => void): Promise<User> {
    const formData = new FormData()
    formData.append('avatar', file)

    const response = await apiService.api.patch<{ data: User }>(
      API_ENDPOINTS.AUTH.PROFILE + '/avatar',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            onProgress(progress)
          }
        }
      }
    )

    return response.data.data
  }

  async deleteAvatar(): Promise<User> {
    const response = await apiService.delete<User>(
      API_ENDPOINTS.AUTH.PROFILE + '/avatar'
    )
    return response.data.data
  }

  async searchUsers(query: string, limit = 10): Promise<User[]> {
    const response = await apiService.get<User[]>('/users/search', {
      params: { q: query, limit }
    })
    return response.data.data
  }

  async getUserStats(id: string): Promise<{
    posts: number
    followers: number
    following: number
    joinedAt: string
  }> {
    const response = await apiService.get(`/users/${id}/stats`)
    return response.data.data
  }

  async followUser(id: string): Promise<void> {
    await apiService.post(`/users/${id}/follow`)
  }

  async unfollowUser(id: string): Promise<void> {
    await apiService.delete(`/users/${id}/follow`)
  }

  async getFollowers(id: string, params?: QueryParams): Promise<PaginatedResponse<User>> {
    const response = await apiService.get<PaginatedResponse<User>>(
      `/users/${id}/followers`,
      { params }
    )
    return response.data.data
  }

  async getFollowing(id: string, params?: QueryParams): Promise<PaginatedResponse<User>> {
    const response = await apiService.get<PaginatedResponse<User>>(
      `/users/${id}/following`,
      { params }
    )
    return response.data.data
  }

  async blockUser(id: string): Promise<void> {
    await apiService.post(`/users/${id}/block`)
  }

  async unblockUser(id: string): Promise<void> {
    await apiService.delete(`/users/${id}/block`)
  }

  async reportUser(id: string, reason: string, description?: string): Promise<void> {
    await apiService.post(`/users/${id}/report`, {
      reason,
      description
    })
  }

  async validateEmail(email: string): Promise<{ available: boolean }> {
    const response = await apiService.post('/users/validate-email', { email })
    return response.data.data
  }

  async validateUsername(username: string): Promise<{ available: boolean }> {
    const response = await apiService.post('/users/validate-username', { username })
    return response.data.data
  }

  async exportUserData(): Promise<void> {
    await apiService.downloadFile('/users/export', 'user-data.json')
  }

  async deleteAccount(password: string): Promise<void> {
    await apiService.post('/users/delete-account', { password })
  }

  async deactivateAccount(): Promise<void> {
    await apiService.post('/users/deactivate')
  }

  async reactivateAccount(): Promise<void> {
    await apiService.post('/users/reactivate')
  }
}

// Create and export singleton instance
export const userService = new UserService()

// Export class for testing
export { UserService }
