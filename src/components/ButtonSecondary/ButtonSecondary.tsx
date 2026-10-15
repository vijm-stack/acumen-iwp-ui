import type { ButtonHTMLAttributes } from 'react'
import './ButtonSecondary.css'

export interface ButtonSecondaryProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
}

export function ButtonSecondary({ label, className, type = 'button', ...props }: ButtonSecondaryProps) {
  return (
    <button type={type} className={['ButtonSecondary', className].filter(Boolean).join(' ')} {...props}>
      {label}
    </button>
  )
}
