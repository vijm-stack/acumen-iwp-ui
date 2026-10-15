import { useEffect, useState } from 'react'
import { Icon } from '../Icon'
import { NotificationsPanel } from './NotificationsPanel'
import { SearchDialog, type SearchItem } from './SearchDialog'
import { INITIAL_NOTIFICATIONS, type NotificationData } from './notifications'
import searchLg from '../../assets/icons/search-lg.svg'
import bell01 from '../../assets/icons/bell-01.svg'
import './TopBar.css'

export interface TopBarProps {
  /** Page has scrolled: the bar becomes translucent and blurred */
  scrolled: boolean
  /** Entries the search dialog can open */
  searchItems: SearchItem[]
  /** Called with the label of a search result or notification action the user picks */
  onNavigate: (label: string) => void
}

type Panel = 'none' | 'search' | 'notifications'

export function TopBar({ scrolled, searchItems, onNavigate }: TopBarProps) {
  const [panel, setPanel] = useState<Panel>('none')
  const [notifications, setNotifications] = useState<NotificationData[]>(INITIAL_NOTIFICATIONS)
  const unreadCount = notifications.filter((notification) => notification.unread).length

  // Escape closes whichever panel is open
  useEffect(() => {
    if (panel === 'none') return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPanel('none')
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [panel])

  const close = () => setPanel('none')

  return (
    <>
      <header className={['TopBar', scrolled && 'TopBar--scrolled'].filter(Boolean).join(' ')}>
        <div className="TopBar__actions">
          <button
            type="button"
            className={['TopBar__button', panel === 'search' && 'TopBar__button--open'].filter(Boolean).join(' ')}
            aria-label="Search"
            aria-haspopup="dialog"
            onClick={() => setPanel(panel === 'search' ? 'none' : 'search')}
          >
            <Icon src={searchLg} size={20} />
          </button>
          <button
            type="button"
            className="TopBar__button TopBar__button--bell"
            aria-label={unreadCount ? `Notifications, ${unreadCount} unread` : 'Notifications'}
            aria-expanded={panel === 'notifications'}
            onClick={() => setPanel(panel === 'notifications' ? 'none' : 'notifications')}
          >
            <Icon src={bell01} size={20} />
            {unreadCount > 0 && <span className="TopBar__badge">{unreadCount}</span>}
          </button>
        </div>
      </header>

      {/* Panels sit outside the header so its blur never clips their fixed positioning */}
      {panel === 'notifications' && (
        <NotificationsPanel
          notifications={notifications}
          unreadCount={unreadCount}
          onMarkAllRead={() => setNotifications((list) => list.map((item) => ({ ...item, unread: false })))}
          onDismiss={(id) => setNotifications((list) => list.filter((item) => item.id !== id))}
          onAction={(label) => {
            close()
            onNavigate(label)
          }}
          onClose={close}
        />
      )}
      {panel === 'search' && (
        <SearchDialog
          items={searchItems}
          onClose={close}
          onSelect={(item) => {
            close()
            onNavigate(item.label)
          }}
        />
      )}
    </>
  )
}
