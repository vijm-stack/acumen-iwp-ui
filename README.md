# acumen-iwp-ui

React + Vite + TypeScript project for building screens from Figma.

## Run

```
npm install
npm run dev      # live preview, usually http://localhost:5173
npm run build    # type-check and production build
```

## How the Occupation Match screen behaves

Looks come from Figma (tokens, colours, shadows); behaviour and responsiveness come from the Claude Design
prototype (https://vijm-stack.github.io/Acumen-Agent/). Rules live in `src/screens/OccupationMatch/`:

- `matchModel.ts` - best match, "Use this instead" swap, alternatives and confidence rules
- `useOccupationMatch.ts` - country (confirm before switching once a market is set), description re-run, toasts
- `data/` - sample job description, occupation catalogue, countries

Breakpoints: 1000px (side panel stacks), 900px (steps wrap), 860px (sidebar becomes a rail + drawer), 560px (drawer 88vw).

## Conventions

- **Tokens:** all design tokens are CSS variables in `src/styles/tokens.css` (the only place values are defined).
- **Components:** `src/components/<FigmaComponentName>/`, named exactly like the Figma component. See `src/components/README.md`.
- **Screens:** `src/screens/<ScreenName>/` (currently `OccupationMatch`, from Figma node 4433:5109).
- **Assets:** icons, flags and logo downloaded from Figma live in `src/assets/` (never link to temporary Figma URLs).
- **Font:** Inter, loaded with `@fontsource/inter` in `src/main.tsx`.
- **Portability:** to merge into another React repo, copy `src/components/`, `src/screens/`, `src/assets/` and `src/styles/tokens.css`, install `@fontsource/inter`, and import `tokens.css` and the font once at the app entry.
