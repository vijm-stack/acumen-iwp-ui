import { useEffect, useRef, useState } from 'react'
import { Icon } from '../Icon'
import chevronDown from '../../assets/icons/chevron-down-12.svg'
import './SidebarUserMenu.css'

export interface SidebarUserMenuProps {
  name: string
  role: string
  initial: string
  showDetails?: boolean
  /** Icon rail: avatar only, no menu */
  collapsed?: boolean
  /** Called with the label of a menu entry the user picks */
  onSelect?: (label: string) => void
}

const MENU_ITEMS = ['Edit profile', 'Settings', 'Log out']

export function SidebarUserMenu({
  name,
  role,
  initial,
  showDetails = true,
  collapsed = false,
  onSelect,
}: SidebarUserMenuProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuOpen = open && !collapsed

  useEffect(() => {
    if (!menuOpen) return
    const handlePointer = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false)
    }
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', handlePointer, true)
    document.addEventListener('keydown', handleKey, true)
    return () => {
      document.removeEventListener('pointerdown', handlePointer, true)
      document.removeEventListener('keydown', handleKey, true)
    }
  }, [menuOpen])

  const showText = showDetails && !collapsed

  return (
    <div className={['SidebarUserMenu', collapsed && 'SidebarUserMenu--collapsed'].filter(Boolean).join(' ')} ref={rootRef}>
      <button
        type="button"
        className="SidebarUserMenu__row"
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        aria-label={collapsed ? `${name}, ${role}` : undefined}
        title={collapsed ? `${name} · ${role}` : undefined}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="SidebarUserMenu__avatar">{initial}</span>
        {showText && (
          <>
            <span className="SidebarUserMenu__details">
              <span className="SidebarUserMenu__name">{name}</span>
              <span className="SidebarUserMenu__role">{role}</span>
            </span>
            <Icon src={chevronDown} size={12} className={menuOpen ? 'SidebarUserMenu__chevron--open' : undefined} />
          </>
        )}
      </button>

      {menuOpen && (
        <div className="SidebarUserMenu__menu" role="menu">
          {MENU_ITEMS.map((item) => (
            <button
              key={item}
              type="button"
              role="menuitem"
              className={['SidebarUserMenu__item', item === 'Log out' && 'SidebarUserMenu__item--danger']
                .filter(Boolean)
                .join(' ')}
              onClick={() => {
                setOpen(false)
                onSelect?.(item)
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
