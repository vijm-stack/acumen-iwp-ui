import { ProgressBar } from '../ProgressBar'
import { ButtonSecondary } from '../ButtonSecondary'
import './CardAlternativeMatch.css'

export interface CardAlternativeMatchProps {
  title: string
  subtitle: string
  /** Match score, 0 to 100 */
  score: number
  /** Marks the original top match once the user has swapped it out */
  highlighted?: boolean
  onSelect?: () => void
}

export function CardAlternativeMatch({ title, subtitle, score, highlighted = false, onSelect }: CardAlternativeMatchProps) {
  return (
    <article className={['CardAlternativeMatch', highlighted && 'CardAlternativeMatch--highlighted'].filter(Boolean).join(' ')}>
      {highlighted && <p className="CardAlternativeMatch__eyebrow">HIGHEST SCORE</p>}
      <div className="CardAlternativeMatch__titles">
        <p className="CardAlternativeMatch__title">{title}</p>
        <p className="CardAlternativeMatch__subtitle">{subtitle}</p>
      </div>
      <div className="CardAlternativeMatch__scoreRow">
        <span className="CardAlternativeMatch__score">{score}%</span>
        <ProgressBar className="CardAlternativeMatch__bar" value={score} />
      </div>
      <ButtonSecondary label="Use this instead" onClick={onSelect} />
    </article>
  )
}
