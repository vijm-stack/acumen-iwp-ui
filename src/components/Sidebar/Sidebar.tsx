import { useState } from 'react'
import { SidebarNavItem } from '../SidebarNavItem'
import { SidebarSectionHeader } from '../SidebarSectionHeader'
import { SidebarNavLink } from '../SidebarNavLink'
import { SidebarNavGroup } from '../SidebarNavGroup'
import { SidebarUserMenu } from '../SidebarUserMenu'
import logo from '../../assets/brand/acumen-logo.png'
import mark from '../../assets/brand/acumen-mark.png'
import homeLine from '../../assets/icons/home-line.svg'
import file05 from '../../assets/icons/file-05.svg'
import globeGrey from '../../assets/icons/globe-01-grey.svg'
import globeOrange from '../../assets/icons/globe-01-orange.svg'
import plusGrey from '../../assets/icons/plus-grey.svg'
import plusOrange from '../../assets/icons/plus-orange.svg'
import bookmark from '../../assets/icons/bookmark.svg'
import bookmarkOrange from '../../assets/icons/bookmark-orange.svg'
import messageSquare from '../../assets/icons/message-square-01.svg'
import flag03 from '../../assets/icons/flag-03.svg'
import './Sidebar.css'

export interface SidebarUser {
  name: string
  role: string
  initial: string
}

export interface SidebarProps {
  projects: string[]
  user: SidebarUser
  /** Icon rail (80px) instead of the full 248px sidebar */
  collapsed?: boolean
  /** Which Market Intelligence page is open */
  activePage?: 'new-analysis' | 'saved-analyses'
  /** Called with the label of any navigation entry the user picks */
  onNavigate?: (label: string) => void
}

export function Sidebar({ projects, user, collapsed = false, activePage = 'new-analysis', onNavigate }: SidebarProps) {
  const [projectsOpen, setProjectsOpen] = useState(true)
  const [resourcesOpen, setResourcesOpen] = useState(true)
  const [groupOpen, setGroupOpen] = useState(true)
  const go = (label: string) => () => onNavigate?.(label)

  return (
    <aside className="Sidebar" data-collapsed={collapsed}>
      <div className="Sidebar__logo">
        {collapsed ? (
          <img className="Sidebar__mark" src={mark} width={26} alt="Acumen" />
        ) : (
          <img src={logo} width={136.62} height={37.79} alt="Acumen Intelligent Workforce Platform" />
        )}
      </div>

      <nav className="Sidebar__nav" aria-label="Main">
        <div className="Sidebar__primary">
          <SidebarNavItem label="Home" icon={homeLine} collapsed={collapsed} onClick={go('Home')} />
        </div>

        {!collapsed && (
          <div className="Sidebar__section">
            <SidebarSectionHeader label="PROJECTS" open={projectsOpen} onToggle={() => setProjectsOpen((v) => !v)} />
            {projectsOpen && (
              <div className="Sidebar__list">
                {projects.map((project) => (
                  <SidebarNavItem key={project} label={project} size="sm" onClick={go(project)} />
                ))}
                <SidebarNavLink label="View all projects" onClick={go('All projects')} />
              </div>
            )}
          </div>
        )}

        <div className={collapsed ? 'Sidebar__primary' : 'Sidebar__section'}>
          {!collapsed && (
            <SidebarSectionHeader label="RESOURCES" open={resourcesOpen} onToggle={() => setResourcesOpen((v) => !v)} />
          )}
          {(resourcesOpen || collapsed) && (
            <div className="Sidebar__list">
              <SidebarNavItem label="Job Analysis" icon={file05} collapsed={collapsed} onClick={go('Job Analysis')} />
              <SidebarNavGroup
                label="Market Intelligence"
                icon={globeGrey}
                activeIcon={globeOrange}
                collapsed={collapsed}
                expanded={groupOpen}
                onToggle={() => setGroupOpen((v) => !v)}
                activeKey={activePage}
                items={[
                  { key: 'new-analysis', label: 'New analysis', icon: plusGrey, activeIcon: plusOrange, onClick: go('New analysis') },
                  { key: 'saved-analyses', label: 'Saved analyses', icon: bookmark, activeIcon: bookmarkOrange, onClick: go('Saved analyses') },
                ]}
              />
            </div>
          )}
        </div>
      </nav>

      <div className="Sidebar__bottom">
        <div className="Sidebar__footerLinks">
          <SidebarNavItem label="Feedback" icon={messageSquare} size="sm" collapsed={collapsed} onClick={go('Feedback')} />
          <SidebarNavItem label="Acumen Roadmap" icon={flag03} size="sm" collapsed={collapsed} onClick={go('Acumen Roadmap')} />
        </div>
        <SidebarUserMenu name={user.name} role={user.role} initial={user.initial} collapsed={collapsed} onSelect={onNavigate} />
      </div>
    </aside>
  )
}
