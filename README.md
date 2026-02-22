<div align="center">

# react-material-3-pure

Pure React implementation of Material Design 3 components.\
No web-component wrappers. CSS Modules + design tokens. Tree-shakeable.

[![npm](https://img.shields.io/npm/v/react-material-3-pure)](https://www.npmjs.com/package/react-material-3-pure)
[![license](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

https://github.com/user-attachments/assets/be7caf9d-938a-47d0-8ec8-53ea162e618a

</div>

## Install

```bash
npm install react-material-3-pure
```

**Peer dependencies**: `react` ≥18, `react-dom` ≥18

## Quick Start

```tsx
import { Button, Switch, ThemeProvider } from "react-material-3-pure";
import "react-material-3-pure/styles";

function App() {
    return (
        <ThemeProvider>
            <Button variant="filled">Click me</Button>
            <Switch />
        </ThemeProvider>
    );
}
```

## Components

| Component         | Variants                                              |
| ----------------- | ----------------------------------------------------- |
| **Button**        | `filled` · `outlined` · `text` · `elevated` · `tonal` |
| **Checkbox**      | Standard · Indeterminate                              |
| **Chip**          | `assist` · `filter` · `input` · `suggestion`          |
| **Dialog**        | Modal with actions                                    |
| **Divider**       | Horizontal · Vertical                                 |
| **Radio**         | Standalone + Group                                    |
| **Switch**        | With/without icons                                    |
| **TextField**     | `filled` · `outlined`                                 |
| **ThemeProvider** | Light/Dark mode + custom seed colors                  |

## Hooks

| Hook        | Description                     |
| ----------- | ------------------------------- |
| `useRipple` | M3 ripple effect on any element |

## Styles

Import the full theme (tokens + reset):

```tsx
import "react-material-3-pure/styles";
```

Or use the component CSS that's auto-included with each component via CSS
Modules.

## Package Exports

```jsonc
{
    ".": { "import": "./dist/index.js", "require": "./dist/index.cjs" },
    "./styles": "./dist/styles.css"
}
```

- ESM + CJS dual output
- TypeScript declarations included
- `sideEffects: ["*.css"]` for proper tree-shaking

## Project Structure

```
react-material-3-pure/
├── src/              # Component source (shared)
│   ├── components/   # Button, Checkbox, Chip, Dialog, ...
│   ├── hooks/        # useRipple
│   └── styles/       # Theme tokens, global CSS
├── packages/lib/     # Publishable NPM package (tsup build)
├── cli/              # CLI tool (separate workspace)
└── www/              # Documentation site
```

## Development

```bash
# Install deps
npm install

# Build the library
npm run build -w react-material-3-pure

# Run Storybook
npm run storybook

# Run docs site
cd www && npm run dev
```

## Roadmap

- [x] Core component set (Button, Checkbox, Chip, Dialog, Divider, Radio,
      Switch, TextField)
- [x] ThemeProvider with light/dark mode
- [x] Publishable NPM package
- [ ] FAB (Floating Action Button)
- [ ] Navigation (Rail, Bar, Drawer)
- [ ] Tabs
- [ ] Snackbar / Toast
- [ ] Menu / Select
- [ ] Card
- [ ] Slider

## License

MIT © 2026
