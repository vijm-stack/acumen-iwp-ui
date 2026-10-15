import { Modal } from '../Modal'
import { Icon } from '../Icon'
import globe from '../../assets/icons/globe-01-orange.svg'
import './DialogSwitchCountry.css'

export interface DialogSwitchCountryProps {
  open: boolean
  /** Country being switched to */
  countryName: string
  /** e.g. "£  →  $" */
  currencyChange: string
  /** e.g. "No pins yet" or "2 pinned markets" */
  pinnedSummary: string
  onCancel: () => void
  onConfirm: () => void
}

const TITLE_ID = 'switch-country-title'

export function DialogSwitchCountry({
  open,
  countryName,
  currencyChange,
  pinnedSummary,
  onCancel,
  onConfirm,
}: DialogSwitchCountryProps) {
  return (
    <Modal open={open} onClose={onCancel} labelledBy={TITLE_ID} maxWidth={480}>
      <div className="DialogSwitchCountry__body">
        <span className="DialogSwitchCountry__icon">
          <Icon src={globe} size={20} />
        </span>
        <div className="DialogSwitchCountry__text">
          <h2 id={TITLE_ID} className="DialogSwitchCountry__title">
            Switch to {countryName}?
          </h2>
          <p className="DialogSwitchCountry__description">
            Switching to {countryName} clears your locations and pinned markets. Your Specialized Occupation is kept.
          </p>
        </div>
        <dl className="DialogSwitchCountry__summary">
          <dt className="DialogSwitchCountry__heading">CLEARED</dt>
          <div className="DialogSwitchCountry__row">
            <dd>Locations and filters</dd>
            <dd className="DialogSwitchCountry__change">Reset</dd>
          </div>
          <div className="DialogSwitchCountry__row">
            <dd>Pinned markets</dd>
            <dd className="DialogSwitchCountry__change">{pinnedSummary}</dd>
          </div>
          <div className="DialogSwitchCountry__row">
            <dd>Currency and market data</dd>
            <dd className="DialogSwitchCountry__change">{currencyChange}</dd>
          </div>
          <hr className="DialogSwitchCountry__divider" />
          <dt className="DialogSwitchCountry__heading">KEPT</dt>
          <div className="DialogSwitchCountry__row">
            <dd>Specialized Occupation</dd>
            <dd className="DialogSwitchCountry__kept">Kept</dd>
          </div>
        </dl>
      </div>
      <div className="DialogSwitchCountry__footer">
        <button type="button" className="DialogSwitchCountry__cancel" onClick={onCancel}>
          Keep current country
        </button>
        <button type="button" className="DialogSwitchCountry__confirm" onClick={onConfirm}>
          Switch to {countryName}
        </button>
      </div>
    </Modal>
  )
}
