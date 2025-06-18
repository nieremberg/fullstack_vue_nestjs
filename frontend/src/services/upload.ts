import { apiService } from './api'
import type { UploadResponse } from '@/types/api'

class UploadService {
  async uploadSingle(
    file: File, 
    folder?: string,
    onProgress?: (progress: number) => void
  ): Promise<UploadResponse> {
    const formData = new FormData()
    formData.append('file', file)

    if (folder) {
      formData.append('folder', folder)
    }

    const response = await apiService.api.post<{ data: UploadResponse }>(
      '/upload/single',
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

  async uploadMultiple(
    files: File[], 
    folder?: string,
    onProgress?: (progress: number) => void
  ): Promise<UploadResponse[]> {
    const formData = new FormData()
    files.forEach(file => {
      formData.append('files', file)
    })

    if (folder) {
      formData.append('folder', folder)
    }

    const response = await apiService.api.post<{ data: UploadResponse[] }>(
      '/upload/multiple',
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

  async deleteFile(filename: string): Promise<void> {
    await apiService.delete(`/upload/${filename}`)
  }

  async getFileInfo(filename: string): Promise<UploadResponse> {
    const response = await apiService.get<UploadResponse>(`/upload/${filename}`)
    return response.data.data
  }

  // Utility methods
  validateFile(file: File, options?: {
    maxSize?: number // in bytes
    allowedTypes?: string[]
    minWidth?: number
    minHeight?: number
    maxWidth?: number
    maxHeight?: number
  }): Promise<{ valid: boolean; error?: string }> {
    return new Promise((resolve) => {
      const { maxSize, allowedTypes, minWidth, minHeight, maxWidth, maxHeight } = options || {}

      // Check file size
      if (maxSize && file.size > maxSize) {
        resolve({
          valid: false,
          error: `Arquivo muito grande. Tamanho máximo: ${this.formatBytes(maxSize)}`
        })
        return
      }

      // Check file type
      if (allowedTypes && !allowedTypes.includes(file.type)) {
        resolve({
          valid: false,
          error: `Tipo de arquivo não permitido. Tipos aceitos: ${allowedTypes.join(', ')}`
        })
        return
      }

      // Check image dimensions if it's an image
      if (file.type.startsWith('image/') && (minWidth || minHeight || maxWidth || maxHeight)) {
        const img = new Image()
        img.onload = () => {
          if (minWidth && img.width < minWidth) {
            resolve({
              valid: false,
              error: `Largura mínima: ${minWidth}px`
            })
            return
          }

          if (minHeight && img.height < minHeight) {
            resolve({
              valid: false,
              error: `Altura mínima: ${minHeight}px`
            })
            return
          }

          if (maxWidth && img.width > maxWidth) {
            resolve({
              valid: false,
              error: `Largura máxima: ${maxWidth}px`
            })
            return
          }

          if (maxHeight && img.height > maxHeight) {
            resolve({
              valid: false,
              error: `Altura máxima: ${maxHeight}px`
            })
            return
          }

          resolve({ valid: true })
        }

        img.onerror = () => {
          resolve({
            valid: false,
            error: 'Não foi possível carregar a imagem'
          })
        }

        img.src = URL.createObjectURL(file)
      } else {
        resolve({ valid: true })
      }
    })
  }

  formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  }

  getFileIcon(mimeType: string): string {
    if (mimeType.startsWith('image/')) return '🖼️'
    if (mimeType.startsWith('video/')) return '🎥'
    if (mimeType.startsWith('audio/')) return '🎵'
    if (mimeType.includes('pdf')) return '📄'
    if (mimeType.includes('word')) return '📝'
    if (mimeType.includes('sheet') || mimeType.includes('excel')) return '📊'
    if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return '📈'
    if (mimeType.includes('zip') || mimeType.includes('rar')) return '📦'
    return '📁'
  }

  createThumbnail(file: File, maxWidth = 150, maxHeight = 150, quality = 0.8): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('File is not an image'))
        return
      }

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img

        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height
            height = maxHeight
          }
        }

        canvas.width = width
        canvas.height = height

        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error('Failed to create thumbnail'))
            }
          },
          file.type,
          quality
        )
      }

      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = URL.createObjectURL(file)
    })
  }
}

// Create and export singleton instance
export const uploadService = new UploadService()

// Export class for testing
export { UploadService }
