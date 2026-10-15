import { Icon } from '../Icon'
import chevronDown from '../../assets/icons/chevron-down-12.svg'
import './SidebarSectionHeader.css'

export interface SidebarSectionHeaderProps {
  label: string
  open?: boolean
  onToggle?: () => void
}

export function SidebarSectionHeader({ label, open = true, onToggle }: SidebarSectionHeaderProps) {
  return (
    <button type="button" className="SidebarSectionHeader" aria-expanded={open} onClick={onToggle}>
      <span className="SidebarSectionHeader__label">{label}</span>
      <Icon src={chevronDown} size={12} className={open ? undefined : 'SidebarSectionHeader__chevron--closed'} />
    </button>
  )
}
