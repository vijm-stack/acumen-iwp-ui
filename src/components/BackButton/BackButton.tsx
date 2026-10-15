import type { ButtonHTMLAttributes } from 'react'
import { Icon } from '../Icon'
import arrowLeft from '../../assets/icons/arrow-left.svg'
import './BackButton.css'

export interface BackButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
}

export function BackButton({ label, className, type = 'button', ...props }: BackButtonProps) {
  return (
    <button type={type} className={['BackButton', className].filter(Boolean).join(' ')} {...props}>
      <Icon src={arrowLeft} size={16} />
      <span>{label}</span>
    </button>
  )
}
