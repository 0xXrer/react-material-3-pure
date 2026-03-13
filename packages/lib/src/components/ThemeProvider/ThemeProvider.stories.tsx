import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, useTheme } from './ThemeProvider';
import type { ColorScheme, ThemeMode } from './ThemeProvider';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { useState } from 'react';

/**
 * Material Design 3 Theme Provider
 *
 * Provides theme context for managing light/dark mode and color schemes.
 * Supports system preference detection and localStorage persistence.
 *
 * @see https://m3.material.io/styles/color/the-color-system
 */
const meta: Meta<typeof ThemeProvider> = {
  title: 'Theme/ThemeProvider',
  component: ThemeProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    defaultMode: {
      control: { type: 'select' },
      options: ['light', 'dark', 'system'],
      description: 'Initial theme mode',
      table: {
        defaultValue: { summary: 'system' },
      },
    },
    defaultColorScheme: {
      control: { type: 'select' },
      options: ['default', 'teal', 'blue', 'green', 'orange', 'pink'],
      description: 'Initial color scheme',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    persist: {
      control: 'boolean',
      description: 'Whether to persist settings to localStorage',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeProvider>;

/* ==========================================================================
   THEME CONTROLS COMPONENT
   ========================================================================== */

function ThemeControls() {
  const { mode, resolvedMode, colorScheme, setMode, setColorScheme, toggleMode } = useTheme();

  const colorSchemes: ColorScheme[] = ['default', 'teal', 'blue', 'green', 'orange', 'pink'];
  const themeModes: ThemeMode[] = ['light', 'dark', 'system'];

  return (
    <div
      style={{
        padding: '24px',
        borderRadius: '16px',
        backgroundColor: 'var(--md-sys-color-surface-container)',
        color: 'var(--md-sys-color-on-surface)',
        fontFamily: 'Roboto, sans-serif',
        minWidth: '320px',
      }}
    >
      <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 500 }}>Theme Settings</h3>

      {/* Mode Selection */}
      <div style={{ marginBottom: '16px' }}>
        <label
          style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '12px',
            color: 'var(--md-sys-color-on-surface-variant)',
          }}
        >
          Mode ({resolvedMode})
        </label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {themeModes.map((m) => (
            <Button
              key={m}
              variant={mode === m ? 'filled' : 'outlined'}
              onClick={() => setMode(m)}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Toggle Button */}
      <div style={{ marginBottom: '16px' }}>
        <Button variant="tonal" onClick={toggleMode}>
          Toggle Mode
        </Button>
      </div>

      {/* Color Scheme Selection */}
      <div>
        <label
          style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '12px',
            color: 'var(--md-sys-color-on-surface-variant)',
          }}
        >
          Color Scheme
        </label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {colorSchemes.map((scheme) => (
            <Button
              key={scheme}
              variant={colorScheme === scheme ? 'filled' : 'outlined'}
              onClick={() => setColorScheme(scheme)}
            >
              {scheme.charAt(0).toUpperCase() + scheme.slice(1)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   COMPONENT SHOWCASE
   ========================================================================== */

function ComponentShowcase() {
  const [checked, setChecked] = useState(false);

  return (
    <div
      style={{
        padding: '24px',
        borderRadius: '16px',
        backgroundColor: 'var(--md-sys-color-surface)',
        color: 'var(--md-sys-color-on-surface)',
        fontFamily: 'Roboto, sans-serif',
        minWidth: '320px',
      }}
    >
      <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 500 }}>Components</h3>

      {/* Buttons */}
      <div style={{ marginBottom: '16px' }}>
        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '8px',
          }}
        >
          <Button variant="filled">Filled</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="text">Text</Button>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button variant="elevated">Elevated</Button>
          <Button variant="tonal">Tonal</Button>
        </div>
      </div>

      {/* Checkboxes */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />
          <span>Checkbox</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Checkbox checked indeterminate />
          <span>Indeterminate</span>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   STORIES
   ========================================================================== */

/**
 * Interactive Theme Switcher
 *
 * Demonstrates the ThemeProvider with controls to switch between
 * light/dark modes and different color schemes.
 */
export const Interactive: Story = {
  render: () => (
    <ThemeProvider defaultMode="system" persist={false}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          padding: '24px',
          backgroundColor: 'var(--md-sys-color-background)',
          borderRadius: '24px',
          minHeight: '400px',
        }}
      >
        <ThemeControls />
        <ComponentShowcase />
      </div>
    </ThemeProvider>
  ),
};

/**
 * Light Mode
 *
 * Components displayed in light mode.
 */
export const LightMode: Story = {
  render: () => (
    <ThemeProvider defaultMode="light" persist={false}>
      <div
        style={{
          padding: '24px',
          backgroundColor: 'var(--md-sys-color-background)',
          borderRadius: '16px',
        }}
      >
        <ComponentShowcase />
      </div>
    </ThemeProvider>
  ),
};

/**
 * Dark Mode
 *
 * Components displayed in dark mode.
 */
export const DarkMode: Story = {
  render: () => (
    <ThemeProvider defaultMode="dark" persist={false}>
      <div
        style={{
          padding: '24px',
          backgroundColor: 'var(--md-sys-color-background)',
          borderRadius: '16px',
        }}
      >
        <ComponentShowcase />
      </div>
    </ThemeProvider>
  ),
};

/**
 * All Color Schemes
 *
 * Shows components in each available color scheme.
 */
export const AllColorSchemes: Story = {
  render: () => {
    const schemes: ColorScheme[] = ['default', 'teal', 'blue', 'green', 'orange', 'pink'];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {schemes.map((scheme) => (
          <ThemeProvider key={scheme} defaultMode="light" defaultColorScheme={scheme} persist={false}>
            <div
              style={{
                padding: '16px',
                backgroundColor: 'var(--md-sys-color-surface)',
                borderRadius: '12px',
                fontFamily: 'Roboto, sans-serif',
              }}
            >
              <div
                style={{
                  marginBottom: '12px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--md-sys-color-on-surface)',
                }}
              >
                {scheme.charAt(0).toUpperCase() + scheme.slice(1)} Scheme
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <Button variant="filled">Filled</Button>
                <Button variant="outlined">Outlined</Button>
                <Button variant="tonal">Tonal</Button>
                <Checkbox checked />
              </div>
            </div>
          </ThemeProvider>
        ))}
      </div>
    );
  },
};

/**
 * Color Schemes Dark Mode
 *
 * Shows color schemes in dark mode.
 */
export const AllColorSchemesDark: Story = {
  render: () => {
    const schemes: ColorScheme[] = ['default', 'teal', 'blue', 'green', 'orange', 'pink'];

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '16px',
          backgroundColor: '#1C1B1F',
          borderRadius: '16px',
        }}
      >
        {schemes.map((scheme) => (
          <ThemeProvider key={scheme} defaultMode="dark" defaultColorScheme={scheme} persist={false}>
            <div
              style={{
                padding: '16px',
                backgroundColor: 'var(--md-sys-color-surface-container)',
                borderRadius: '12px',
                fontFamily: 'Roboto, sans-serif',
              }}
            >
              <div
                style={{
                  marginBottom: '12px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--md-sys-color-on-surface)',
                }}
              >
                {scheme.charAt(0).toUpperCase() + scheme.slice(1)} Scheme (Dark)
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <Button variant="filled">Filled</Button>
                <Button variant="outlined">Outlined</Button>
                <Button variant="tonal">Tonal</Button>
                <Checkbox checked />
              </div>
            </div>
          </ThemeProvider>
        ))}
      </div>
    );
  },
};

/**
 * System Preference
 *
 * Follows the user's operating system theme preference.
 */
export const SystemPreference: Story = {
  render: () => (
    <ThemeProvider defaultMode="system" persist={false}>
      <div
        style={{
          padding: '24px',
          backgroundColor: 'var(--md-sys-color-background)',
          borderRadius: '16px',
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        <div
          style={{
            marginBottom: '16px',
            padding: '12px',
            backgroundColor: 'var(--md-sys-color-surface-container)',
            borderRadius: '8px',
            fontSize: '14px',
            color: 'var(--md-sys-color-on-surface)',
          }}
        >
          This component follows your system's color scheme preference.
          Try changing your OS theme settings!
        </div>
        <ComponentShowcase />
      </div>
    </ThemeProvider>
  ),
};
