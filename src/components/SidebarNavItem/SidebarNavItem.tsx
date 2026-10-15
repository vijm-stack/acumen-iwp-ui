import type { ButtonHTMLAttributes } from 'react'
import { Icon } from '../Icon'
import './SidebarNavItem.css'

export interface SidebarNavItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  /** Imported SVG asset; omit for a text-only row */
  icon?: string
  /** md = main navigation, sm = projects and footer */
  size?: 'md' | 'sm'
  /** Highlights the row as the current page */
  active?: boolean
  /** Icon rail: md rows stack the icon over a small label, sm rows show the icon only */
  collapsed?: boolean
}

export function SidebarNavItem({
  label,
  icon,
  size = 'md',
  active = false,
  collapsed = false,
  className,
  type = 'button',
  ...props
}: SidebarNavItemProps) {
  const iconOnly = collapsed && size === 'sm'
  return (
    <button
      type={type}
      className={[
        'SidebarNavItem',
        `SidebarNavItem--${size}`,
        active && 'SidebarNavItem--active',
        collapsed && 'SidebarNavItem--collapsed',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-current={active ? 'page' : undefined}
      aria-label={iconOnly ? label : undefined}
      title={collapsed ? label : undefined}
      {...props}
    >
      {icon && <Icon src={icon} size={collapsed && size === 'md' ? 20 : 16} />}
      <span className="SidebarNavItem__label">{label}</span>
    </button>
  )
}
