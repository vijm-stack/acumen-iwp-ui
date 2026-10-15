import { useState } from 'react'
import { Modal, ModalFooter, ModalHeader } from '../Modal'
import './DialogEditJobDescription.css'

export interface DialogEditJobDescriptionProps {
  open: boolean
  /** Text the draft starts from each time the dialog opens */
  initialValue: string
  /** True while the match is being re-run after saving */
  rerunning: boolean
  /** Words needed before the description can be classified */
  minWords: number
  onClose: () => void
  onSave: (description: string) => void
}

const TITLE_ID = 'edit-job-description-title'

function countWords(text: string) {
  const trimmed = text.trim()
  return trimmed ? trimmed.split(/\s+/).length : 0
}

export function DialogEditJobDescription(props: DialogEditJobDescriptionProps) {
  // The body only mounts while open, so the draft resets every time
  return (
    <Modal open={props.open} onClose={props.onClose} labelledBy={TITLE_ID} maxWidth={720}>
      <Body {...props} />
    </Modal>
  )
}

function Body({ initialValue, rerunning, minWords, onClose, onSave }: DialogEditJobDescriptionProps) {
  const [draft, setDraft] = useState(initialValue)
  const words = countWords(draft)
  const canSave = words >= minWords && !rerunning

  return (
    <>
      <ModalHeader
        titleId={TITLE_ID}
        title="Edit job description"
        subtitle={words ? `${words} words · classifier re-runs on save` : 'Nothing to classify yet'}
        onClose={onClose}
      />
      <div className="DialogEditJobDescription__body">
        <textarea
          className="DialogEditJobDescription__textarea"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Paste the job description…"
          aria-label="Job description"
        />
        <div className="DialogEditJobDescription__note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span>Saving these changes re-runs the match. Your Specialized Occupation and alternatives may change.</span>
        </div>
      </div>
      <ModalFooter>
        <button type="button" className="DialogEditJobDescription__cancel" onClick={onClose}>
          Cancel
        </button>
        <button
          type="button"
          className="DialogEditJobDescription__save"
          disabled={!canSave}
          onClick={() => onSave(draft.trim())}
        >
          {rerunning ? 'Re-running the match…' : 'Save and re-run match'}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.5 15a9 9 0 1 1-2.1-9.4L23 10" />
          </svg>
        </button>
      </ModalFooter>
    </>
  )
}
