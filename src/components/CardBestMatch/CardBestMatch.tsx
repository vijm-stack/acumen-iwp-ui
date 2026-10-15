import { Icon } from '../Icon'
import { TagReason } from '../TagReason'
import { ButtonPrimary } from '../ButtonPrimary'
import { ButtonText } from '../ButtonText'
import stars from '../../assets/icons/stars-01.svg'
import check from '../../assets/icons/check.svg'
import './CardBestMatch.css'

export interface CardBestMatchProps {
  title: string
  subtitle: string
  score: string
  confidence: string
  reasons: string[]
  /** Small heading above the title; "YOUR SELECTION" once the user has picked one */
  kicker?: string
  /** Shows the green tick next to the score */
  highConfidence?: boolean
  onConfirm?: () => void
  onBrowseCatalogue?: () => void
}

export function CardBestMatch({
  title,
  subtitle,
  score,
  confidence,
  reasons,
  kicker = 'BEST MATCH',
  highConfidence = true,
  onConfirm,
  onBrowseCatalogue,
}: CardBestMatchProps) {
  return (
    <section className="CardBestMatch">
      <div className="CardBestMatch__top">
        <div className="CardBestMatch__identity">
          <div className="CardBestMatch__iconTile">
            <Icon src={stars} size={20} />
          </div>
          <div className="CardBestMatch__titles">
            <p className="CardBestMatch__eyebrow">{kicker}</p>
            <h2 className="CardBestMatch__title">{title}</h2>
            <p className="CardBestMatch__subtitle">{subtitle}</p>
          </div>
        </div>
        <div className="CardBestMatch__score">
          <div className="CardBestMatch__scoreRow">
            {highConfidence && (
              <span className="CardBestMatch__check" title="High-confidence match">
                <Icon src={check} size={12} />
              </span>
            )}
            <span className="CardBestMatch__scoreValue">{score}</span>
          </div>
          <p className="CardBestMatch__confidence">{confidence}</p>
        </div>
      </div>

      <div className="CardBestMatch__reasons">
        <p className="CardBestMatch__reasonsLabel">WHY THIS MATCH</p>
        <div className="CardBestMatch__tags">
          {reasons.map((reason) => (
            <TagReason key={reason} label={reason} />
          ))}
        </div>
      </div>

      <div className="CardBestMatch__actions">
        <ButtonPrimary label="Confirm occupation" showIcon onClick={onConfirm} />
        <ButtonText label="Browse the full catalogue" tone="muted" onClick={onBrowseCatalogue} />
      </div>
    </section>
  )
}
