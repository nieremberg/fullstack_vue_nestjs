export interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
}

export interface TableColumn {
  key: string
  label: string
  sortable?: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
  render?: (value: any, row: any) => string
}

export interface BreadcrumbItem {
  label: string
  to?: string
  exact?: boolean
}

export interface MenuItem {
  id: string
  label: string
  icon?: string
  to?: string
  children?: MenuItem[]
  disabled?: boolean
  badge?: string | number
  separator?: boolean
}

export interface Theme {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
}

export interface AppConfig {
  name: string
  version: string
  apiUrl: string
  theme: Theme
  features: {
    darkMode: boolean
    notifications: boolean
    analytics: boolean
  }
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface AsyncState<T = any> {
  data: T | null
  loading: boolean
  error: string | null
  lastUpdated: Date | null
}

export interface FileUpload {
  file: File
  progress: number
  status: 'pending' | 'uploading' | 'success' | 'error'
  error?: string
  url?: string
}

export interface Coordinate {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface Rect extends Coordinate, Size {}

export interface DateRange {
  start: Date
  end: Date
}

export interface TimeRange {
  start: string
  end: string
}

export type SortDirection = 'asc' | 'desc'

export interface SortConfig {
  field: string
  direction: SortDirection
}

export interface FilterConfig {
  field: string
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | 'contains' | 'startsWith' | 'endsWith'
  value: any
}

export interface SearchConfig {
  query: string
  fields: string[]
}

export interface ExportConfig {
  format: 'csv' | 'xlsx' | 'pdf' | 'json'
  filename?: string
  fields?: string[]
}

export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type ComponentVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

export type ComponentState = 'default' | 'hover' | 'focus' | 'active' | 'disabled'
