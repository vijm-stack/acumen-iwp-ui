import './Toast.css'

export interface ToastProps {
  title: string
  text: string
  onClose: () => void
}

export function Toast({ title, text, onClose }: ToastProps) {
  return (
    <div className="Toast" role="status" aria-live="polite">
      <span className="Toast__badge">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      <div className="Toast__body">
        <span className="Toast__title">{title}</span>
        <span className="Toast__text">{text}</span>
      </div>
      <button type="button" className="Toast__close" aria-label="Dismiss notification" onClick={onClose}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      </button>
    </div>
  )
}
