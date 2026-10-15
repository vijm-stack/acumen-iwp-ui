import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { COUNTRIES, type MarketCountry } from './data/countries'
import { deriveMatch, type PickedOccupation } from './matchModel'

export interface ToastMessage {
  title: string
  text: string
}

const TOAST_MS = 6000
const RERUN_MS = 900

const findCountry = (code: string): MarketCountry => COUNTRIES.find((country) => country.code === code) ?? COUNTRIES[0]

/**
 * State and rules for the Occupation Match screen, ported from the Claude Design prototype:
 * the market country (with a confirm step once a market is set), the best match and
 * "use this instead" swaps, the job description edit that re-runs the match, and toasts.
 */
export function useOccupationMatch() {
  const [countryCode, setCountryCode] = useState<MarketCountry['code']>('UK')
  const [defaultCode, setDefaultCode] = useState('')
  /** True once the user has chosen (or dismissed choosing) a market */
  const [marketSet, setMarketSet] = useState(false)
  const [pendingCode, setPendingCode] = useState('')

  const [jd, setJd] = useState('')
  const [picked, setPicked] = useState<PickedOccupation | null>(null)
  const [confirmed, setConfirmed] = useState(false)

  const [catalogueOpen, setCatalogueOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [rerunning, setRerunning] = useState(false)
  const [toast, setToast] = useState<ToastMessage | null>(null)

  const toastTimer = useRef<number | undefined>(undefined)
  const rerunTimer = useRef<number | undefined>(undefined)

  useEffect(
    () => () => {
      window.clearTimeout(toastTimer.current)
      window.clearTimeout(rerunTimer.current)
    },
    [],
  )

  const showToast = useCallback((message: ToastMessage) => {
    window.clearTimeout(toastTimer.current)
    setToast(message)
    toastTimer.current = window.setTimeout(() => setToast(null), TOAST_MS)
  }, [])

  const closeToast = useCallback(() => {
    window.clearTimeout(toastTimer.current)
    setToast(null)
  }, [])

  const country = findCountry(countryCode)
  const pendingCountry = pendingCode ? findCountry(pendingCode) : null
  const match = useMemo(() => deriveMatch(jd, picked), [jd, picked])

  // Choosing an occupation (by swap or catalogue) counts as finishing step 1
  const currentStep = confirmed || picked ? 1 : 0

  /** Country menu: once a market is set, switching asks first */
  const selectCountry = (code: string) => {
    if (code === countryCode) return
    if (marketSet) {
      setPendingCode(code)
      return
    }
    setCountryCode(findCountry(code).code)
    setMarketSet(true)
    setDefaultCode(code)
  }

  /** Banner buttons: pick the market and make it the default */
  const chooseFromBanner = (code: string) => {
    setCountryCode(findCountry(code).code)
    setMarketSet(true)
    setDefaultCode(code)
  }

  const dismissBanner = () => {
    setMarketSet(true)
    setDefaultCode((current) => current || countryCode)
  }

  const toggleDefault = () => setDefaultCode((current) => (current === countryCode ? '' : countryCode))

  const cancelCountrySwitch = () => setPendingCode('')

  const applyCountrySwitch = () => {
    if (!pendingCountry) return
    setCountryCode(pendingCountry.code)
    setPendingCode('')
    window.scrollTo({ top: 0 })
    showToast({
      title: 'Country switched',
      text: `Switched to ${pendingCountry.name}. Locations and pinned markets were cleared — your Specialized Occupation is kept.`,
    })
  }

  const pickOccupation = (occupation: PickedOccupation) => {
    setPicked(occupation)
    setConfirmed(false)
  }

  const useAlternative = (name: string, family: string) => pickOccupation({ name, family, group: family })

  const selectFromCatalogue = (occupation: PickedOccupation) => {
    pickOccupation(occupation)
    setCatalogueOpen(false)
  }

  const saveDescription = (description: string) => {
    if (rerunning) return
    setRerunning(true)
    rerunTimer.current = window.setTimeout(() => {
      setJd(description)
      setPicked(null)
      setConfirmed(false)
      setEditOpen(false)
      setRerunning(false)
      showToast({
        title: 'Match re-run',
        text: 'Match re-run. Confirm your Specialized Occupation to refresh market data — current figures are stale until you do.',
      })
    }, RERUN_MS)
  }

  const confirmOccupation = () => {
    setConfirmed(true)
    showToast({
      title: 'Occupation confirmed',
      text: `${match.best.name} is set for ${country.name}. “Choose a location” is the next step and isn't part of this build yet.`,
    })
  }

  /** Sidebar, search and notification entries that have no page in this build yet */
  const navigate = (label: string) => {
    if (label === 'New analysis' || label === 'Market Intelligence') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    showToast({ title: 'Not available yet', text: `${label} isn't part of this build yet.` })
  }

  return {
    country,
    pendingCountry,
    defaultCode,
    marketSet,
    match,
    currentStep,
    jd,
    catalogueOpen,
    editOpen,
    rerunning,
    toast,
    selectCountry,
    chooseFromBanner,
    dismissBanner,
    toggleDefault,
    cancelCountrySwitch,
    applyCountrySwitch,
    useAlternative,
    selectFromCatalogue,
    saveDescription,
    confirmOccupation,
    navigate,
    closeToast,
    openCatalogue: () => setCatalogueOpen(true),
    closeCatalogue: () => setCatalogueOpen(false),
    openEditor: () => setEditOpen(true),
    closeEditor: () => setEditOpen(false),
  }
}
