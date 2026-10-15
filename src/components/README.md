# Components

One folder per Figma component, named **exactly** like the Figma component (PascalCase), e.g. `Button/`, `TextField/`.

Each folder contains:

- `<Name>.tsx` - the component
- `<Name>.css` - its styles, using only `var(--token)` values from `src/styles/tokens.css`
- `index.ts` - re-exports the component

Never hard-code colors, sizes or fonts in a component; add a token instead.
Screens live in `src/screens/` and are built by composing these components.

## Components that exist in Figma

Icon, IconInfo, ButtonPrimary, ButtonSecondary, ButtonText, TagReason, ProgressBar, CardBestMatch,
CardAlternativeMatch, CardHowWeMatchedThis, CardYourJobDescription, Country, CountryBanner, CountrySelector,
BackButton, StepTracker, Sidebar, SidebarNavItem, SidebarSectionHeader, SidebarNavLink, SidebarNavGroup,
SidebarSubItem, SidebarUserMenu.

## Components taken from the Claude Design prototype (no Figma component yet)

These carry the prototype's behaviour. Give them a Figma component (or rename to match one) when they are designed:

- `AppShell` - sidebar + top bar + page area; collapses to a rail, becomes an overlay drawer at 860px
- `TopBar` - search dialog and notifications panel
- `Modal` (`ModalHeader`, `ModalFooter`) - shared dialog frame with Esc, overlay click and focus handling
- `Toast`
- `DialogEditJobDescription`, `DialogSwitchCountry`, `OccupationCatalogue`

State and component variants beyond the Figma frame (hover, focus, collapsed, done, highlighted) use the same tokens.
