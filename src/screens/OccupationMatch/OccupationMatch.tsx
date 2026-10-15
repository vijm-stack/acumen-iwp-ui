import { AppShell } from '../../components/AppShell'
import { CountryBanner } from '../../components/CountryBanner'
import { CountrySelector } from '../../components/CountrySelector'
import { BackButton } from '../../components/BackButton'
import { StepTracker } from '../../components/StepTracker'
import { CardBestMatch } from '../../components/CardBestMatch'
import { CardAlternativeMatch } from '../../components/CardAlternativeMatch'
import { CardHowWeMatchedThis } from '../../components/CardHowWeMatchedThis'
import { CardYourJobDescription } from '../../components/CardYourJobDescription'
import { ButtonText } from '../../components/ButtonText'
import { IconInfo } from '../../components/IconInfo'
import { Toast } from '../../components/Toast'
import { DialogSwitchCountry } from '../../components/DialogSwitchCountry'
import { DialogEditJobDescription } from '../../components/DialogEditJobDescription'
import { OccupationCatalogue } from '../../components/OccupationCatalogue'
import { CAREER_AREAS, LOT } from './data/occupationCatalogue'
import { COUNTRIES, CURRENCY_SYMBOL } from './data/countries'
import { MIN_DESCRIPTION_WORDS, descriptionText } from './matchModel'
import { useOccupationMatch } from './useOccupationMatch'
import './OccupationMatch.css'

const PROJECTS = ['Contract Data Engineer - Dallas', 'Product Manager - Remote', 'Cloud Security Engineer - Charlotte']

const CLASSIFIER_SIGNALS = [
  'Skills and tooling',
  'Responsibilities and duties',
  'Seniority and scope',
  'Title and role language',
]

export function OccupationMatch() {
  const state = useOccupationMatch()
  const { country, match } = state

  const steps = [
    { title: 'Select an occupation', description: match.best.name },
    { title: 'Choose a location', description: 'Select one or compare multiple' },
    { title: 'View Market Intelligence', description: 'Not yet opened' },
  ]

  return (
    <AppShell
      projects={PROJECTS}
      user={{ name: 'John Smith', role: 'Recruiter · WBD', initial: 'J' }}
      onNavigate={state.navigate}
    >
      <div className="OccupationMatch">
        {!state.marketSet && (
          <CountryBanner
            countries={COUNTRIES}
            selectedCode={country.code}
            onSelect={state.chooseFromBanner}
            onDismiss={state.dismissBanner}
          />
        )}

        <div className="OccupationMatch__heading">
          <div className="OccupationMatch__headingText">
            <BackButton label="Back to the description" onClick={state.openEditor} />
            <div className="OccupationMatch__titles">
              <h1 className="OccupationMatch__title">Market Intelligence</h1>
              <p className="OccupationMatch__subtitle">
                Discover talent supply, demand and cost for any role, plus the best locations to fill it.
              </p>
            </div>
          </div>
          <CountrySelector
            countries={COUNTRIES}
            selectedCode={country.code}
            defaultCode={state.defaultCode}
            attention={!state.marketSet}
            onSelect={state.selectCountry}
            onToggleDefault={state.toggleDefault}
          />
        </div>

        <StepTracker steps={steps} currentStep={state.currentStep} />

        <div className="OccupationMatch__panel">
          <div className="OccupationMatch__primaryColumn">
            <CardBestMatch
              title={match.best.name}
              subtitle={`${match.best.family} · ${match.best.soc}`}
              score={`${match.best.score}%`}
              confidence={match.confidenceLabel}
              kicker={match.kicker}
              highConfidence={match.highConfidence}
              reasons={match.evidence}
              onConfirm={state.confirmOccupation}
              onBrowseCatalogue={state.openCatalogue}
            />

            <section className="OccupationMatch__others">
              <div className="OccupationMatch__othersHeader">
                <h2 className="OccupationMatch__othersTitle">Other matches</h2>
                <ButtonText label="Browse all 808 →" tone="link" onClick={state.openCatalogue} />
              </div>
              <div className="OccupationMatch__alternatives">
                {match.otherMatches.map((other) => (
                  <CardAlternativeMatch
                    key={other.name}
                    title={other.name}
                    subtitle={other.family}
                    score={other.score}
                    highlighted={other.highest}
                    onSelect={() => state.useAlternative(other.name, other.family)}
                  />
                ))}
              </div>
            </section>

            <div className="OccupationMatch__footnote">
              <IconInfo />
              <p>
                Fit is scored on skill, tooling and seniority overlap with your description. Switching re-scopes the
                market read — it never changes the description you pasted.
              </p>
            </div>
          </div>

          <aside className="OccupationMatch__sidePanel">
            <CardHowWeMatchedThis
              summary="Lightcast's occupation classifier read your description and scored it against 1,834 specialized occupations."
              threshold="We treat a score above 85% as a confident match."
              signals={CLASSIFIER_SIGNALS}
            />
            <CardYourJobDescription lines={match.jdLines} onEdit={state.openEditor} />
          </aside>
        </div>
      </div>

      <DialogSwitchCountry
        open={state.pendingCountry !== null}
        countryName={state.pendingCountry?.name ?? ''}
        currencyChange={
          state.pendingCountry
            ? `${CURRENCY_SYMBOL[country.code]}  →  ${CURRENCY_SYMBOL[state.pendingCountry.code]}`
            : ''
        }
        pinnedSummary="No pins yet"
        onCancel={state.cancelCountrySwitch}
        onConfirm={state.applyCountrySwitch}
      />

      <DialogEditJobDescription
        open={state.editOpen}
        initialValue={descriptionText(state.jd)}
        rerunning={state.rerunning}
        minWords={MIN_DESCRIPTION_WORDS}
        onClose={state.closeEditor}
        onSave={state.saveDescription}
      />

      <OccupationCatalogue
        open={state.catalogueOpen}
        careerAreas={CAREER_AREAS}
        taxonomy={LOT}
        onClose={state.closeCatalogue}
        onSelect={state.selectFromCatalogue}
      />

      {state.toast && <Toast title={state.toast.title} text={state.toast.text} onClose={state.closeToast} />}
    </AppShell>
  )
}
