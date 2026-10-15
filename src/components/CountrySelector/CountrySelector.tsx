import { useEffect, useRef, useState } from 'react'
import { Icon } from '../Icon'
import chevronDown from '../../assets/icons/chevron-down-16.svg'
import './CountrySelector.css'

export interface CountryOption {
  code: string
  name: string
  currency: string
  /** Coverage line shown under the name in the menu */
  stats: string
  flagSrc: string
}

export interface CountrySelectorProps {
  countries: CountryOption[]
  selectedCode: string
  /** Code of the user's default market, or '' when none is set */
  defaultCode: string
  /** Keeps the orange ring on until the user has chosen a market */
  attention?: boolean
  onSelect: (code: string) => void
  onToggleDefault: () => void
}

export function CountrySelector({
  countries,
  selectedCode,
  defaultCode,
  attention = false,
  onSelect,
  onToggleDefault,
}: CountrySelectorProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const selected = countries.find((country) => country.code === selectedCode) ?? countries[0]
  const isDefault = defaultCode === selected.code

  // Close on outside press or Escape
  useEffect(() => {
    if (!open) return
    const handlePointer = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false)
    }
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', handlePointer, true)
    document.addEventListener('keydown', handleKey, true)
    return () => {
      document.removeEventListener('pointerdown', handlePointer, true)
      document.removeEventListener('keydown', handleKey, true)
    }
  }, [open])

  return (
    <div className="CountrySelector" ref={rootRef}>
      <button
        type="button"
        className={['CountrySelector__chip', (open || attention) && 'CountrySelector__chip--ring']
          .filter(Boolean)
          .join(' ')}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <img className="CountrySelector__flag" src={selected.flagSrc} alt="" />
        <span className="CountrySelector__name">{selected.name}</span>
        <span className="CountrySelector__currency">· {selected.currency}</span>
        <Icon src={chevronDown} size={16} className={open ? 'CountrySelector__chevron--open' : undefined} />
      </button>

      {open && (
        <div className="CountrySelector__menu" role="menu" aria-label="Market data country">
          <p className="CountrySelector__menuLabel">MARKET DATA SOURCED FROM</p>
          {countries.map((country) => {
            const active = country.code === selected.code
            return (
              <button
                key={country.code}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                className={['CountrySelector__row', active && 'CountrySelector__row--active'].filter(Boolean).join(' ')}
                onClick={() => {
                  setOpen(false)
                  onSelect(country.code)
                }}
              >
                <img className="CountrySelector__rowFlag" src={country.flagSrc} alt="" />
                <span className="CountrySelector__rowText">
                  <span className="CountrySelector__rowName">{country.name}</span>
                  <span className="CountrySelector__rowStats">{country.stats}</span>
                </span>
                {active && (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-orange-500)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            )
          })}

          <button
            type="button"
            role="menuitemcheckbox"
            aria-checked={isDefault}
            className="CountrySelector__default"
            onClick={onToggleDefault}
          >
            <span className={['CountrySelector__box', isDefault && 'CountrySelector__box--on'].filter(Boolean).join(' ')}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span className="CountrySelector__rowText">
              <span className="CountrySelector__defaultLabel">
                {isDefault ? `${selected.name} is your default market` : `Make ${selected.name} my default`}
              </span>
              <span className="CountrySelector__rowStats">Every market read opens here until you change it.</span>
            </span>
          </button>
        </div>
      )}
    </div>
  )
}
