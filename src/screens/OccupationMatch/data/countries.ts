import flagCanada from '../../../assets/flags/canada.png'
import flagUs from '../../../assets/flags/us.png'
import flagUk from '../../../assets/flags/uk.png'
import flagIndia from '../../../assets/flags/india.png'

export interface MarketCountry {
  code: 'CA' | 'US' | 'UK' | 'IN'
  name: string
  currency: string
  /** Coverage line shown in the country menu */
  stats: string
  flagSrc: string
}

/** Same order as the Figma banner */
export const COUNTRIES: MarketCountry[] = [
  { code: 'CA', name: 'Canada', currency: 'CAD', stats: '1.4K postings · 11.2K profiles', flagSrc: flagCanada },
  { code: 'US', name: 'United States', currency: 'USD', stats: '12.8K postings · 96.4K profiles', flagSrc: flagUs },
  { code: 'UK', name: 'United Kingdom', currency: 'GBP', stats: '2.1K postings · 18.7K profiles', flagSrc: flagUk },
  { code: 'IN', name: 'India', currency: 'INR', stats: '9.6K postings · 143K profiles', flagSrc: flagIndia },
]

/** Currency symbol used in the "switch country" confirmation */
export const CURRENCY_SYMBOL: Record<MarketCountry['code'], string> = {
  CA: 'C$',
  US: '$',
  UK: '£',
  IN: '₹',
}
