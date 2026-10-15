import { Icon } from '../Icon'
import './SidebarSubItem.css'

export interface SidebarSubItemProps {
  label: string
  /** Imported SVG asset (use the orange variant when active) */
  icon: string
  active?: boolean
  /** mid draws the connector line down to the next item; last stops at the elbow */
  position?: 'mid' | 'last'
  onClick?: () => void
}

export function SidebarSubItem({ label, icon, active = false, position = 'mid', onClick }: SidebarSubItemProps) {
  return (
    <button
      type="button"
      className={['SidebarSubItem', active && 'SidebarSubItem--active'].filter(Boolean).join(' ')}
      aria-current={active ? 'page' : undefined}
      onClick={onClick}
    >
      <span className="SidebarSubItem__elbow" />
      {position === 'mid' && <span className="SidebarSubItem__line" />}
      <Icon src={icon} size={16} />
      <span className="SidebarSubItem__label">{label}</span>
    </button>
  )
}
