// Export all types for easy importing
export * from './auth'
export * from './api'
export * from './common'

// Global type declarations
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type RequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P]
}

export type ValueOf<T> = T[keyof T]

export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never
}[keyof T]

export type Nullable<T> = T | null

export type Optional<T> = T | undefined

export type EmptyObject = Record<string, never>

export type Dictionary<T = any> = Record<string, T>

export type Timestamp = string | Date

export type ID = string | number

export type Status = 'active' | 'inactive' | 'pending' | 'archived'

export type Priority = 'low' | 'medium' | 'high' | 'urgent'

export type Environment = 'development' | 'staging' | 'production'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS'

export type MimeType = 
  | 'image/jpeg'
  | 'image/png'
  | 'image/gif'
  | 'image/webp'
  | 'image/svg+xml'
  | 'application/pdf'
  | 'application/json'
  | 'text/plain'
  | 'text/html'
  | 'text/css'
  | 'text/javascript'
  | 'application/javascript'

export type FileType = 'image' | 'video' | 'audio' | 'document' | 'archive' | 'other'

export type ColorScheme = 'light' | 'dark' | 'auto'

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type Direction = 'ltr' | 'rtl'

export type Placement = 
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'

export type Alignment = 'start' | 'center' | 'end' | 'stretch'

export type Justification = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
