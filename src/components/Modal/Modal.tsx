import { useEffect, useRef, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react'
import './Modal.css'

export interface ModalProps {
  open: boolean
  onClose: () => void
  /** id of the element inside that titles the dialog */
  labelledBy: string
  /** Maximum dialog width in px */
  maxWidth?: number
  /** Fixed height (any CSS length) for dialogs that scroll inside, such as the catalogue */
  height?: string
  children: ReactNode
}

const FOCUSABLE = 'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'

export function Modal({ open, onClose, labelledBy, maxWidth = 720, height, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  })

  // Lock page scroll, close on Escape, and hand focus back when the dialog closes
  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current()
    }
    document.addEventListener('keydown', handleKey)

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus?.()
    }
  }, [open])

  if (!open) return null

  // Keep Tab inside the dialog
  const trapFocus = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab' || !dialogRef.current) return
    const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (el) => !el.hasAttribute('disabled'),
    )
    if (items.length === 0) return
    const first = items[0]
    const last = items[items.length - 1]
    if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <div
      className="Modal__overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        className="Modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        style={{ maxWidth, height }}
        onKeyDown={trapFocus}
      >
        {children}
      </div>
    </div>
  )
}

export interface ModalHeaderProps {
  /** Must match the Modal's labelledBy */
  titleId: string
  title: string
  subtitle?: string
  onClose: () => void
}

export function ModalHeader({ titleId, title, subtitle, onClose }: ModalHeaderProps) {
  return (
    <div className="ModalHeader">
      <div className="ModalHeader__text">
        <h2 id={titleId} className="ModalHeader__title">
          {title}
        </h2>
        {subtitle && <p className="ModalHeader__subtitle">{subtitle}</p>}
      </div>
      <button type="button" className="ModalHeader__close" aria-label="Close" onClick={onClose}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      </button>
    </div>
  )
}

/** Right-aligned action row at the bottom of a dialog */
export function ModalFooter({ children }: { children: ReactNode }) {
  return <div className="ModalFooter">{children}</div>
}
