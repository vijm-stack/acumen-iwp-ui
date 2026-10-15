import type { ButtonHTMLAttributes } from 'react'
import './SidebarNavLink.css'

export interface SidebarNavLinkProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
}

export function SidebarNavLink({ label, className, type = 'button', ...props }: SidebarNavLinkProps) {
  return (
    <button type={type} className={['SidebarNavLink', className].filter(Boolean).join(' ')} {...props}>
      {label}
    </button>
  )
}
