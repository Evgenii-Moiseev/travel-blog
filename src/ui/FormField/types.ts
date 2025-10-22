import type { ReactNode } from 'react'

export interface IFormFieldProps {
  children: ReactNode
  label: string
  errorMessage?: string
  required?: boolean
}