import { useMemo, useState } from 'react'
import { Modal, ModalHeader } from '../Modal'
import './OccupationCatalogue.css'

/** [career area name, number of occupations] */
export type CareerArea = readonly [string, number]
/** career area -> [occupation group name, occupations][] */
export type OccupationTaxonomy = Record<string, ReadonlyArray<readonly [string, readonly string[]]>>

export interface CataloguePick {
  name: string
  /** "Career area · Occupation group" */
  family: string
  group: string
}

export interface OccupationCatalogueProps {
  open: boolean
  careerAreas: ReadonlyArray<CareerArea>
  taxonomy: OccupationTaxonomy
  onClose: () => void
  onSelect: (pick: CataloguePick) => void
}

const TITLE_ID = 'occupation-catalogue-title'
const DEFAULT_AREA = 'Healthcare'

export function OccupationCatalogue(props: OccupationCatalogueProps) {
  // The body only mounts while open, so the browsing state resets every time
  return (
    <Modal open={props.open} onClose={props.onClose} labelledBy={TITLE_ID} maxWidth={1160} height="min(720px, 100%)">
      <Body {...props} />
    </Modal>
  )
}

function Body({ careerAreas, taxonomy, onClose, onSelect }: OccupationCatalogueProps) {
  const [area, setArea] = useState(DEFAULT_AREA)
  const [group, setGroup] = useState('')
  const [query, setQuery] = useState('')

  const needle = query.trim().toLowerCase()
  const areaCovered = Boolean(taxonomy[area])
  const areaName = areaCovered ? area : DEFAULT_AREA

  const groups = useMemo(
    () =>
      (taxonomy[areaName] ?? [])
        .map(([name, occupations]) => ({
          name,
          occupations: occupations.filter(
            (occupation) => !needle || occupation.toLowerCase().includes(needle) || name.toLowerCase().includes(needle),
          ),
        }))
        .filter((entry) => entry.occupations.length > 0),
    [taxonomy, areaName, needle],
  )

  const activeGroup = groups.find((entry) => entry.name === group) ?? groups[0] ?? { name: '', occupations: [] }

  const emptyTitle = areaCovered ? 'Nothing matches that search' : 'This career area is not in the demo pull'
  const emptyNote = areaCovered
    ? 'Try a skill, a tool, or a broader title.'
    : 'Healthcare and four more areas are loaded from the LOT taxonomy for this demo.'

  return (
    <>
      <div className="OccupationCatalogue__head">
        <ModalHeader
          titleId={TITLE_ID}
          title="Browse occupations"
          subtitle="28 career areas · 1,834 occupations in the LOT taxonomy"
          onClose={onClose}
        />
        <div className="OccupationCatalogue__search">
          <input
            className="OccupationCatalogue__input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search occupations, skills…"
            aria-label="Search occupations"
          />
        </div>
      </div>

      <div className="OccupationCatalogue__columns">
        <div className="OccupationCatalogue__column OccupationCatalogue__column--areas">
          <p className="OccupationCatalogue__label">CAREER AREA NAME</p>
          {careerAreas.map(([name, count]) => {
            const active = (area || DEFAULT_AREA) === name
            return (
              <button
                key={name}
                type="button"
                className={['OccupationCatalogue__item', active && 'OccupationCatalogue__item--area-active']
                  .filter(Boolean)
                  .join(' ')}
                aria-pressed={active}
                onClick={() => {
                  setArea(name)
                  setGroup('')
                }}
              >
                <span className="OccupationCatalogue__itemName">{name}</span>
                <span className="OccupationCatalogue__count">{count}</span>
              </button>
            )
          })}
        </div>

        <div className="OccupationCatalogue__column">
          <p className="OccupationCatalogue__label">OCCUPATION GROUP NAME</p>
          {groups.map((entry) => {
            const active = entry.name === activeGroup.name
            return (
              <button
                key={entry.name}
                type="button"
                className={['OccupationCatalogue__item', active && 'OccupationCatalogue__item--group-active']
                  .filter(Boolean)
                  .join(' ')}
                aria-pressed={active}
                onClick={() => setGroup(entry.name)}
              >
                <span className="OccupationCatalogue__itemName">{entry.name}</span>
                <span className="OccupationCatalogue__count">{entry.occupations.length}</span>
              </button>
            )
          })}
          {groups.length === 0 && (
            <div className="OccupationCatalogue__empty">
              <p className="OccupationCatalogue__emptyTitle">{emptyTitle}</p>
              <p className="OccupationCatalogue__emptyNote">{emptyNote}</p>
            </div>
          )}
        </div>

        <div className="OccupationCatalogue__column OccupationCatalogue__column--occupations">
          <div className="OccupationCatalogue__listHead">
            <p className="OccupationCatalogue__label OccupationCatalogue__label--flush">SPECIALIZED OCCUPATION</p>
            <p className="OccupationCatalogue__groupName">
              {activeGroup.name}{' '}
              <span className="OccupationCatalogue__groupCount">
                · {activeGroup.occupations.length} {activeGroup.occupations.length === 1 ? 'occupation' : 'occupations'}
              </span>
            </p>
          </div>
          {activeGroup.occupations.map((occupation) => (
            <button
              key={occupation}
              type="button"
              className="OccupationCatalogue__occupation"
              onClick={() =>
                onSelect({
                  name: occupation,
                  family: `${areaName} · ${activeGroup.name}`,
                  group: activeGroup.name,
                })
              }
            >
              <span className="OccupationCatalogue__occupationName">{occupation}</span>
              <span className="OccupationCatalogue__select">Select</span>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
