import type { ButtonHTMLAttributes } from 'react'
import './ButtonText.css'

export interface ButtonTextProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  tone?: 'muted' | 'link'
}

export function ButtonText({ label, tone = 'muted', className, type = 'button', ...props }: ButtonTextProps) {
  return (
    <button
      type={type}
      className={['ButtonText', `ButtonText--${tone}`, className].filter(Boolean).join(' ')}
      {...props}
    >
      {label}
    </button>
  )
}
