import { useEffect, useState, type ReactNode } from 'react'
import { Sidebar, type SidebarUser } from '../Sidebar'
import { TopBar, type SearchItem } from '../TopBar'
import { Icon } from '../Icon'
import chevronDown from '../../assets/icons/chevron-down-12.svg'
import './AppShell.css'

export interface AppShellProps {
  projects: string[]
  user: SidebarUser
  activePage?: 'new-analysis' | 'saved-analyses'
  /** Called with the label of any sidebar, search or notification entry the user picks */
  onNavigate: (label: string) => void
  children: ReactNode
}

/** At or below this width the sidebar starts as an icon rail and expands over the page */
const COMPACT_QUERY = '(max-width: 860px)'

export function AppShell({ projects, user, activePage, onNavigate, children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(() => window.matchMedia(COMPACT_QUERY).matches)
  const [scrolled, setScrolled] = useState(false)

  // Fold the sidebar into the rail whenever the window shrinks to a compact width
  useEffect(() => {
    const query = window.matchMedia(COMPACT_QUERY)
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setCollapsed(true)
    }
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 4)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const searchItems: SearchItem[] = [
    { label: 'Home', path: '/home', group: 'Navigation' },
    { label: 'Market Intelligence', path: '/market-intelligence', group: 'Navigation' },
    { label: 'All Projects', path: '/projects', group: 'Navigation' },
    { label: 'Job Analysis', path: '/resources/job-analysis', group: 'Resources' },
    { label: 'Acumen Roadmap', path: '/roadmap', group: 'Navigation' },
    ...projects.map((project) => ({
      label: project,
      path: `/projects/${project.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      group: 'Project',
    })),
  ]

  return (
    <div className="AppShell" data-collapsed={collapsed}>
      <div className="AppShell__sidebar">
        <Sidebar projects={projects} user={user} collapsed={collapsed} activePage={activePage} onNavigate={onNavigate} />
      </div>

      {/* Compact widths only: tapping outside the open sidebar closes it */}
      {!collapsed && (
        <button type="button" className="AppShell__backdrop" aria-label="Close sidebar" onClick={() => setCollapsed(true)} />
      )}

      <button
        type="button"
        className="AppShell__collapse"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        aria-expanded={!collapsed}
        onClick={() => setCollapsed((value) => !value)}
      >
        <Icon src={chevronDown} size={12} className="AppShell__collapseIcon" />
      </button>

      <TopBar scrolled={scrolled} searchItems={searchItems} onNavigate={onNavigate} />

      <div className="AppShell__main">{children}</div>
    </div>
  )
}
