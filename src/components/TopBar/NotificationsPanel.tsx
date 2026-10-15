import type { NotificationData } from './notifications'

export interface NotificationsPanelProps {
  notifications: NotificationData[]
  unreadCount: number
  onMarkAllRead: () => void
  onDismiss: (id: string) => void
  /** Called with the action label when the user presses a notification's primary action */
  onAction: (label: string) => void
  onClose: () => void
}

export function NotificationsPanel({
  notifications,
  unreadCount,
  onMarkAllRead,
  onDismiss,
  onAction,
  onClose,
}: NotificationsPanelProps) {
  return (
    <>
      <div className="TopBar__scrim" onClick={onClose} />
      <section className="NotificationsPanel" aria-label="Notifications">
        <div className="NotificationsPanel__head">
          <div className="NotificationsPanel__heading">
            <h2 className="NotificationsPanel__title">Notifications</h2>
            {unreadCount > 0 && <span className="NotificationsPanel__count">{unreadCount} new</span>}
          </div>
          <button type="button" className="NotificationsPanel__markRead" onClick={onMarkAllRead}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Mark all read
          </button>
        </div>

        <ul className="NotificationsPanel__list">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={['NotificationsPanel__item', notification.unread && 'NotificationsPanel__item--unread']
                .filter(Boolean)
                .join(' ')}
            >
              <span className="NotificationsPanel__iconWrap">
                <span className="NotificationsPanel__halo" />
                <span className="NotificationsPanel__icon">{notification.glyph}</span>
              </span>
              <div className="NotificationsPanel__content">
                <p className="NotificationsPanel__text">
                  <strong>{notification.subject}</strong> {notification.text}
                </p>
                <p className="NotificationsPanel__meta">{notification.meta}</p>
                {notification.action && (
                  <div className="NotificationsPanel__actions">
                    <button
                      type="button"
                      className="NotificationsPanel__primary"
                      onClick={() => onAction(notification.action as string)}
                    >
                      {notification.action}
                    </button>
                    <button type="button" className="NotificationsPanel__secondary" onClick={() => onDismiss(notification.id)}>
                      Dismiss
                    </button>
                  </div>
                )}
              </div>
              {notification.unread && <span className="NotificationsPanel__dot" aria-label="Unread" />}
            </li>
          ))}
          {notifications.length === 0 && <li className="NotificationsPanel__empty">You're all caught up.</li>}
        </ul>

        <button type="button" className="NotificationsPanel__viewAll" onClick={onClose}>
          View all
        </button>
      </section>
    </>
  )
}
