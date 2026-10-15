import { SAMPLE_JD } from './data/sampleJobDescription'

/** Occupation the user picked by hand (catalogue, or "Use this instead") */
export interface PickedOccupation {
  name: string
  family: string
  group: string
}

export interface BestMatch {
  name: string
  family: string
  soc: string
  score: number
}

export interface OtherMatch {
  name: string
  family: string
  score: number
  /** The original top match, shown again once the user has swapped it out */
  highest: boolean
}

export interface MatchView {
  best: BestMatch
  kicker: 'BEST MATCH' | 'YOUR SELECTION'
  evidence: string[]
  highConfidence: boolean
  confidenceLabel: string
  otherMatches: OtherMatch[]
  jdLines: string[]
}

interface Candidate {
  name: string
  family: string
  score: number
}

/** A description that reads like programme / service-transformation work */
const SUPPORT_PATTERN = /programme|transformation|service redesign|support|help ?desk|service desk|escalation|csat|itil|ticket/i

const SUPPORT_BEST: BestMatch = {
  name: 'Program Manager (General)',
  family: 'Project and Program Managers · Business Management and Operations',
  soc: 'ONS SOC 2440',
  score: 100,
}

const DATA_BEST: BestMatch = {
  name: 'Data Engineers',
  family: 'Technology · Data',
  soc: 'SOC 15-2051',
  score: 94,
}

const SUPPORT_EVIDENCE = [
  'End-to-end service redesign',
  'Public-sector transformation',
  'GDS methodologies',
  'Multidisciplinary team leadership',
  'Programme governance and benefits realisation',
]

const DATA_EVIDENCE = [
  'Snowflake · dbt · Airflow',
  'Python and advanced SQL',
  'Pipeline ownership',
  '6+ years seniority',
  'AWS infrastructure',
]

const SUPPORT_ALTERNATIVES: Candidate[] = [
  { name: 'Technical Support Engineer / Systems Administrator', family: 'Customer and Client Support · Technical Support', score: 55 },
  { name: 'Project Manager (General)', family: 'Computer Support Specialist', score: 80 },
  { name: 'Operations Project Manager', family: 'Computer Support Specialist', score: 75 },
  { name: 'Systems Administrator', family: 'Network / Systems Administrator', score: 68 },
]

const DATA_ALTERNATIVES: Candidate[] = [
  { name: 'Data Architects', family: 'Technology · Data', score: 81 },
  { name: 'Analytics Engineers', family: 'Technology · Data', score: 76 },
  { name: 'ETL Developers', family: 'Technology · Data', score: 72 },
  { name: 'Cloud Data Platform Engineers', family: 'Technology · Infrastructure', score: 68 },
]

/** Score at or above which the match is shown as high confidence */
export const CONFIDENT_SCORE = 85

/** Minimum words before a description can be (re-)classified */
export const MIN_DESCRIPTION_WORDS = 20

export function wordCount(text: string): number {
  const trimmed = text.trim()
  return trimmed ? trimmed.split(/\s+/).length : 0
}

export function deriveMatch(jd: string, picked: PickedOccupation | null): MatchView {
  const jdText = jd.trim() || SAMPLE_JD
  const isSupport = SUPPORT_PATTERN.test(jdText)
  const baseBest = isSupport ? SUPPORT_BEST : DATA_BEST

  const best: BestMatch = picked
    ? { name: picked.name, family: picked.family, soc: 'You selected this occupation', score: 100 }
    : baseBest

  const evidence = picked
    ? ['Selected from catalogue', picked.group, 'Market read available', 'Cost data current to Q2 2026']
    : isSupport
      ? SUPPORT_EVIDENCE
      : DATA_EVIDENCE

  const pool = isSupport ? SUPPORT_ALTERNATIVES : DATA_ALTERNATIVES
  const otherMatches = [{ name: baseBest.name, family: baseBest.family, score: baseBest.score }, ...pool]
    .filter((candidate) => candidate.name !== best.name)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((candidate) => ({ ...candidate, highest: candidate.name === baseBest.name }))

  const jdLines = picked
    ? ['Occupation chosen from the catalogue rather than a description.']
    : jdText
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .slice(0, 5)

  return {
    best,
    kicker: picked ? 'YOUR SELECTION' : 'BEST MATCH',
    evidence,
    highConfidence: best.score >= CONFIDENT_SCORE,
    confidenceLabel: best.score >= CONFIDENT_SCORE ? 'high confidence' : 'confidence',
    otherMatches,
    jdLines,
  }
}

/** The text shown in the edit dialog: the user's description, or the sample */
export function descriptionText(jd: string): string {
  return jd.trim() || SAMPLE_JD
}
