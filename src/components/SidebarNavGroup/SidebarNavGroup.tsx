import { useEffect, useRef, useState } from 'react'
import { Icon } from '../Icon'
import { SidebarSubItem } from '../SidebarSubItem'
import chevronDown from '../../assets/icons/chevron-down-12.svg'
import './SidebarNavGroup.css'

export interface SidebarNavGroupItem {
  key: string
  label: string
  /** Imported SVG asset, grey */
  icon: string
  /** Same icon in orange, used while this item is the current page */
  activeIcon: string
  onClick?: () => void
}

export interface SidebarNavGroupProps {
  label: string
  /** Imported SVG asset, grey */
  icon: string
  /** Same icon in orange, used while a child is the current page */
  activeIcon: string
  items: SidebarNavGroupItem[]
  /** Key of the current page inside this group, if any */
  activeKey?: string
  expanded?: boolean
  /** Icon rail: show a single tile and open the items in a flyout on hover */
  collapsed?: boolean
  onToggle?: () => void
}

export function SidebarNavGroup({
  label,
  icon,
  activeIcon,
  items,
  activeKey,
  expanded = true,
  collapsed = false,
  onToggle,
}: SidebarNavGroupProps) {
  const childActive = activeKey !== undefined
  const [flyout, setFlyout] = useState<{ top: number; left: number } | null>(null)
  const closeTimer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(closeTimer.current), [])

  const openFlyout = (element: HTMLElement) => {
    window.clearTimeout(closeTimer.current)
    const rect = element.getBoundingClientRect()
    setFlyout({ top: rect.top, left: rect.right + 6 })
  }
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setFlyout(null), 150)
  }

  if (collapsed) {
    return (
      <div
        className="SidebarNavGroup__rail"
        onMouseEnter={(event) => openFlyout(event.currentTarget)}
        onMouseLeave={scheduleClose}
        onFocus={(event) => openFlyout(event.currentTarget)}
        onBlur={scheduleClose}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setFlyout(null)
        }}
      >
        <button
          type="button"
          className={['SidebarNavGroup__tile', childActive && 'SidebarNavGroup__tile--active'].filter(Boolean).join(' ')}
          aria-haspopup="menu"
          aria-expanded={flyout !== null}
          onClick={() => items[0]?.onClick?.()}
        >
          <Icon src={childActive ? activeIcon : icon} size={20} />
          <span className="SidebarNavGroup__tileLabel">{label}</span>
        </button>
        {flyout && (
          <div
            className="SidebarNavGroup__flyout"
            role="menu"
            style={{ top: flyout.top, left: flyout.left }}
            onMouseEnter={() => window.clearTimeout(closeTimer.current)}
            onMouseLeave={scheduleClose}
          >
            <p className="SidebarNavGroup__flyoutLabel">{label.toUpperCase()}</p>
            {items.map((item) => {
              const active = item.key === activeKey
              return (
                <button
                  key={item.key}
                  type="button"
                  role="menuitem"
                  className={['SidebarNavGroup__flyoutItem', active && 'SidebarNavGroup__flyoutItem--active']
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => {
                    setFlyout(null)
                    item.onClick?.()
                  }}
                >
                  <Icon src={active ? item.activeIcon : item.icon} size={16} />
                  {item.label}
                </button>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  const parentActive = childActive && !expanded

  return (
    <div className="SidebarNavGroup">
      <button
        type="button"
        className={[
          'SidebarNavGroup__parent',
          childActive && 'SidebarNavGroup__parent--childActive',
          parentActive && 'SidebarNavGroup__parent--collapsedActive',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-expanded={expanded}
        onClick={onToggle}
      >
        {childActive && expanded && <span className="SidebarNavGroup__indicator" />}
        <Icon src={childActive ? activeIcon : icon} size={16} />
        <span className="SidebarNavGroup__label">{label}</span>
        <Icon src={chevronDown} size={12} className={expanded ? undefined : 'SidebarNavGroup__chevron--closed'} />
      </button>

      {expanded && (
        <div className="SidebarNavGroup__submenu">
          {items.map((item, index) => {
            const active = item.key === activeKey
            return (
              <SidebarSubItem
                key={item.key}
                label={item.label}
                icon={active ? item.activeIcon : item.icon}
                active={active}
                position={index === items.length - 1 ? 'last' : 'mid'}
                onClick={item.onClick}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
