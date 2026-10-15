import { ButtonText } from '../ButtonText'
import './CardYourJobDescription.css'

export interface CardYourJobDescriptionProps {
  /** Preview lines; each is truncated with an ellipsis */
  lines: string[]
  onEdit?: () => void
}

export function CardYourJobDescription({ lines, onEdit }: CardYourJobDescriptionProps) {
  return (
    <section className="CardYourJobDescription">
      <p className="CardYourJobDescription__title">Your job description</p>
      <div className="CardYourJobDescription__preview">
        {lines.map((line) => (
          <p key={line} className="CardYourJobDescription__line">
            {line}
          </p>
        ))}
      </div>
      <ButtonText label="Edit description" tone="link" onClick={onEdit} />
    </section>
  )
}
