# React Material 3 Pure

A production-ready, pixel-perfect implementation of Google's **Material Design 3 (M3)** component library for React — built from scratch with zero external UI dependencies.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![Storybook](https://img.shields.io/badge/Storybook-10-ff4785.svg)](https://storybook.js.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)]()

## ✨ Features

- 🎨 **Pixel-perfect M3 implementation** — Follows the official [Material Design 3 specification](https://m3.material.io/)
- 🚫 **Zero dependencies** — Pure React + CSS Modules, no external UI libraries
- ⚡ **SSR-safe** — Works with Next.js App Router out of the box
- 🎭 **State Layer system** — Authentic M3 interaction states
- 💧 **Ripple effects** — Hardware-accelerated ink ripples
- ♿ **Accessible** — Full ARIA support, keyboard navigation
- 🎯 **Type-safe** — Complete TypeScript definitions
- 🎨 **Themeable** — CSS custom properties for easy customization

## 📦 Installation

```bash
npm install react-material-3-pure
```

## 🚀 Quick Start

```tsx
import { Button, Dialog, Checkbox, ThemeProvider } from 'react-material-3-pure';
import 'react-material-3-pure/styles.css';

function App() {
  return (
    <ThemeProvider>
      <Button onClick={() => console.log('Clicked!')}>
        Click Me
      </Button>
    </ThemeProvider>
  );
}
```

## 🎛️ Components

### Button

Simple shadcn-style API — icons and text are just children.

```tsx
import { Button } from 'react-material-3-pure';

// Variants
<Button variant="filled">Filled</Button>     // High emphasis (default)
<Button variant="tonal">Tonal</Button>       // Medium emphasis
<Button variant="elevated">Elevated</Button> // Medium emphasis with shadow
<Button variant="outlined">Outlined</Button> // Medium emphasis
<Button variant="text">Text</Button>         // Low emphasis

// With icons — just add as children!
<Button>
  <PlusIcon />
  Add Item
</Button>

<Button>
  Continue
  <ArrowIcon />
</Button>

// Icon only
<Button size="icon" aria-label="Settings">
  <SettingsIcon />
</Button>

// As link
<Button as="a" href="/about" variant="text">
  Learn More
</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Disabled
<Button disabled>Disabled</Button>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'filled' \| 'outlined' \| 'text' \| 'elevated' \| 'tonal'` | `'filled'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg' \| 'icon'` | `'md'` | Button size |
| `as` | `'button' \| 'a'` | `'button'` | Render as button or anchor |
| `disabled` | `boolean` | `false` | Disable the button |
| `children` | `ReactNode` | — | Content (text, icons, etc.) |

### Dialog

Modal dialog with M3 animations.

```tsx
import { Dialog, Button } from 'react-material-3-pure';

function MyDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      
      <Dialog
        open={open}
        headline="Confirm Action"
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        actions={
          <>
            <Button variant="text" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>
              Confirm
            </Button>
          </>
        }
      >
        <p>Are you sure you want to proceed?</p>
      </Dialog>
    </>
  );
}
```

### Checkbox

M3 checkbox with indeterminate state support.

```tsx
import { Checkbox } from 'react-material-3-pure';

<Checkbox />
<Checkbox checked />
<Checkbox indeterminate />
<Checkbox disabled />
```

### Chips

Filter, assist, input, and suggestion chips.

```tsx
import { FilterChip, AssistChip, InputChip, SuggestionChip } from 'react-material-3-pure';

<FilterChip selected>Selected</FilterChip>
<AssistChip icon={<CalendarIcon />}>Schedule</AssistChip>
<InputChip onRemove={() => {}}>Tag</InputChip>
<SuggestionChip>Try this</SuggestionChip>
```

### Divider

Visual separator for content.

```tsx
import { Divider } from 'react-material-3-pure';

<Divider />
<Divider inset />
<Divider insetStart />
<Divider insetEnd />
```

### ThemeProvider

Theme context for light/dark mode.

```tsx
import { ThemeProvider, useTheme } from 'react-material-3-pure';

function App() {
  return (
    <ThemeProvider defaultMode="system">
      <MyApp />
    </ThemeProvider>
  );
}

function ThemeToggle() {
  const { mode, toggleMode, resolvedMode } = useTheme();
  return <Button onClick={toggleMode}>{resolvedMode}</Button>;
}
```

## 🎨 Theming

Override M3 tokens with CSS custom properties:

```css
:root {
  --md-sys-color-primary: #6750A4;
  --md-sys-color-on-primary: #FFFFFF;
  --md-sys-color-secondary-container: #E8DEF8;
  --md-sys-color-on-secondary-container: #1D192B;
  --md-sys-color-surface-container-low: #F7F2FA;
  --md-sys-color-outline: #79747E;
}

/* Dark mode */
[data-theme="dark"] {
  --md-sys-color-primary: #D0BCFF;
  --md-sys-color-on-primary: #381E72;
  --md-sys-color-surface-container-low: #1D1B20;
}
```

## 🧪 Development

```bash
npm install          # Install dependencies
npm run storybook    # Start Storybook
npm run build        # Build library
npm run lint         # Lint
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Button/
│   ├── Checkbox/
│   ├── Chip/
│   ├── Dialog/
│   ├── Divider/
│   └── ThemeProvider/
├── hooks/
│   └── useRipple.ts
└── index.ts
```

## 📄 License

MIT © 2026