# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] — 2026-02-22

### Added

- **Publishable NPM package** (`packages/lib/`)
  - ESM + CJS dual output via tsup
  - TypeScript declarations via tsc
  - CSS Modules support via `esbuild-css-modules-plugin`
  - `./styles` export for theme tokens + global reset
  - Proper `sideEffects` config for tree-shaking
  - `peerDependencies`: react ≥18, react-dom ≥18

- **Monorepo workspace setup**
  - npm workspaces: `packages/*`, `cli`
  - Root renamed to `react-material-3-pure-monorepo`

- **Components** (initial release)
  - Button — `filled`, `outlined`, `text`, `elevated`, `tonal`
  - Checkbox — standard + indeterminate
  - Chip — `assist`, `filter`, `input`, `suggestion`
  - Dialog — modal with actions
  - Divider — horizontal + vertical
  - Radio — standalone + group
  - Switch — with/without icons
  - TextField — `filled`, `outlined`
  - ThemeProvider — light/dark mode, seed color customization

- **Hooks**
  - `useRipple` — M3 ripple effect

### Fixed

- Missing `Switch` export in `src/index.ts` barrel
