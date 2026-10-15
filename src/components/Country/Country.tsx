import './Country.css'

export interface CountryProps {
  name: string
  flagSrc: string
  selected?: boolean
  onClick?: () => void
}

export function Country({ name, flagSrc, selected = false, onClick }: CountryProps) {
  return (
    <button
      type="button"
      className={['Country', selected && 'Country--selected'].filter(Boolean).join(' ')}
      aria-pressed={selected}
      onClick={onClick}
    >
      <img className="Country__flag" src={flagSrc} alt="" />
      <span className="Country__name">{name}</span>
    </button>
  )
}
