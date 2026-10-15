import type { ButtonHTMLAttributes } from 'react'
import { Icon } from '../Icon'
import arrowRight from '../../assets/icons/arrow-right-white.svg'
import './ButtonPrimary.css'

export interface ButtonPrimaryProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  showIcon?: boolean
}

export function ButtonPrimary({ label, showIcon = false, className, type = 'button', ...props }: ButtonPrimaryProps) {
  return (
    <button type={type} className={['ButtonPrimary', className].filter(Boolean).join(' ')} {...props}>
      <span className="ButtonPrimary__label">{label}</span>
      {showIcon && <Icon src={arrowRight} size={16} />}
    </button>
  )
}
