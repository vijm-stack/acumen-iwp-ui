import type { ReactNode } from 'react'

export interface NotificationData {
  id: string
  subject: string
  text: string
  meta: string
  unread: boolean
  /** Label of the primary action, if the notification has one */
  action?: string
  glyph: ReactNode
}

const svgProps = {
  width: 17,
  height: 17,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const

const GlobeGlyph = (
  <svg {...svgProps}>
    <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
    <path d="M3 12h18" />
    <path d="M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9z" />
  </svg>
)

const SparkGlyph = (
  <svg {...svgProps}>
    <path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    <circle cx="12" cy="12" r="3.2" />
  </svg>
)

const BriefcaseGlyph = (
  <svg {...svgProps}>
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
)

const DocumentGlyph = (
  <svg {...svgProps}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M8 13h8M8 17h5" />
  </svg>
)

export const INITIAL_NOTIFICATIONS: NotificationData[] = [
  {
    id: 'match',
    subject: 'Account Executive (Entry)',
    text: 'matched to a specialised occupation with 85% confidence.',
    meta: '2 hours ago · Market Intelligence',
    unread: true,
    action: 'View landscape',
    glyph: GlobeGlyph,
  },
  {
    id: 'update',
    subject: 'Market Intelligence',
    text: 'location insights expanded — 6 new US markets added for your saved roles.',
    meta: '18 hours ago · Product update',
    unread: true,
    action: 'Explore updates',
    glyph: SparkGlyph,
  },
  {
    id: 'draft',
    subject: 'HR Specialist - UK',
    text: 'is still a draft. Finish it to unlock supply and cost guidance.',
    meta: '2 days ago · Projects',
    unread: true,
    action: 'Resume project',
    glyph: BriefcaseGlyph,
  },
  {
    id: 'refresh',
    subject: 'Data Engineer (Senior) - Austin, TX',
    text: "report refreshed with this week's posting data.",
    meta: '4 days ago · Market Intelligence',
    unread: false,
    glyph: GlobeGlyph,
  },
  {
    id: 'analysis',
    subject: 'Job Analysis',
    text: 'completed for Product Manager – Remote. 12 specialised skills identified.',
    meta: '6 days ago · Resources',
    unread: false,
    glyph: DocumentGlyph,
  },
]
