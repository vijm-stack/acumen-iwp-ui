import './CardHowWeMatchedThis.css'

export interface CardHowWeMatchedThisProps {
  summary: string
  threshold: string
  signals: string[]
}

export function CardHowWeMatchedThis({ summary, threshold, signals }: CardHowWeMatchedThisProps) {
  return (
    <section className="CardHowWeMatchedThis">
      <p className="CardHowWeMatchedThis__eyebrow">HOW WE MATCHED THIS</p>
      <p className="CardHowWeMatchedThis__summary">{summary}</p>
      <p className="CardHowWeMatchedThis__threshold">{threshold}</p>
      <hr className="CardHowWeMatchedThis__divider" />
      <p className="CardHowWeMatchedThis__eyebrow">WHAT THE CLASSIFIER READ</p>
      <ul className="CardHowWeMatchedThis__signals">
        {signals.map((signal) => (
          <li key={signal}>{signal}</li>
        ))}
      </ul>
    </section>
  )
}
