import { Country } from '../Country'
import { Icon } from '../Icon'
import globe from '../../assets/icons/globe-01-white.svg'
import xClose from '../../assets/icons/x-close.svg'
import './CountryBanner.css'

export interface CountryBannerOption {
  code: string
  name: string
  flagSrc: string
}

export interface CountryBannerProps {
  countries: CountryBannerOption[]
  selectedCode?: string
  onSelect?: (code: string) => void
  onDismiss?: () => void
}

export function CountryBanner({ countries, selectedCode, onSelect, onDismiss }: CountryBannerProps) {
  return (
    <section className="CountryBanner">
      <div className="CountryBanner__intro">
        <div className="CountryBanner__iconWrap">
          <span className="CountryBanner__glow" />
          <span className="CountryBanner__iconTile">
            <Icon src={globe} size={16} />
          </span>
        </div>
        <div className="CountryBanner__text">
          <p className="CountryBanner__eyebrow">START HERE</p>
          <h2 className="CountryBanner__title">Which country do you need market data for?</h2>
          <p className="CountryBanner__hint">You can change it any time from the country selector in the header.</p>
        </div>
      </div>

      <div className="CountryBanner__countries">
        {countries.map((country) => (
          <Country
            key={country.code}
            name={country.name}
            flagSrc={country.flagSrc}
            selected={country.code === selectedCode}
            onClick={() => onSelect?.(country.code)}
          />
        ))}
      </div>

      <button type="button" className="CountryBanner__close" aria-label="Dismiss" onClick={onDismiss}>
        <Icon src={xClose} size={12} />
      </button>
    </section>
  )
}
