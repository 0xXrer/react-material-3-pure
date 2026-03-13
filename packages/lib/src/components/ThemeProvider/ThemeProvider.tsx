'use client';

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react';

/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Material Design 3 Theme Provider
 *
 * Provides theme context for managing light/dark mode and color schemes.
 * Supports system preference detection and localStorage persistence.
 */

export type ThemeMode = 'light' | 'dark' | 'system';
export type ColorScheme = 'default' | 'teal' | 'blue' | 'green' | 'orange' | 'pink';

export interface ThemeContextValue {
  /**
   * Current theme mode setting.
   * 'system' follows the user's OS preference.
   */
  mode: ThemeMode;

  /**
   * The actual resolved theme (always 'light' or 'dark').
   * When mode is 'system', this reflects the OS preference.
   */
  resolvedMode: 'light' | 'dark';

  /**
   * Current color scheme.
   */
  colorScheme: ColorScheme;

  /**
   * Set the theme mode.
   */
  setMode: (mode: ThemeMode) => void;

  /**
   * Set the color scheme.
   */
  setColorScheme: (scheme: ColorScheme) => void;

  /**
   * Toggle between light and dark modes.
   * If current mode is 'system', switches to the opposite of the current resolved mode.
   */
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  /**
   * Initial theme mode.
   * @default 'system'
   */
  defaultMode?: ThemeMode;

  /**
   * Initial color scheme.
   * @default 'default'
   */
  defaultColorScheme?: ColorScheme;

  /**
   * Whether to persist theme settings to localStorage.
   * @default true
   */
  persist?: boolean;

  /**
   * Storage key prefix for localStorage.
   * @default 'md'
   */
  storageKeyPrefix?: string;

  /**
   * Children to render.
   */
  children: React.ReactNode;
}

/**
 * Get the system's preferred color scheme.
 */
function getSystemPreference(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Get stored value from localStorage.
 */
function getStoredValue<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return fallback;
    return JSON.parse(stored) as T;
  } catch {
    try {
      localStorage.removeItem(key);
    } catch {
      // localStorage not available
    }
    return fallback;
  }
}

/**
 * Theme Provider Component
 *
 * Wraps your application to provide theme context.
 * Automatically applies theme attributes to the document root.
 *
 * @example
 * ```tsx
 * import { ThemeProvider } from './components/ThemeProvider';
 *
 * function App() {
 *   return (
 *     <ThemeProvider defaultMode="system" defaultColorScheme="default">
 *       <YourApp />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */
export function ThemeProvider({
  defaultMode = 'system',
  defaultColorScheme = 'default',
  persist = true,
  storageKeyPrefix = 'md',
  children,
}: ThemeProviderProps) {
  const modeKey = `${storageKeyPrefix}-theme-mode`;
  const schemeKey = `${storageKeyPrefix}-color-scheme`;

  // Initialize from localStorage or defaults
  const [mode, setModeState] = useState<ThemeMode>(() =>
    persist ? getStoredValue(modeKey, defaultMode) : defaultMode
  );
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>(() =>
    persist ? getStoredValue(schemeKey, defaultColorScheme) : defaultColorScheme
  );
  const [systemPreference, setSystemPreference] = useState<'light' | 'dark'>(getSystemPreference);

  // Resolve the actual theme mode
  const resolvedMode = mode === 'system' ? systemPreference : mode;

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPreference(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;

    // Set data-theme attribute
    if (mode === 'system') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', mode);
    }

    // Set data-scheme attribute
    if (colorScheme === 'default') {
      root.removeAttribute('data-scheme');
    } else {
      root.setAttribute('data-scheme', colorScheme);
    }
  }, [mode, colorScheme]);

  // Persist to localStorage
  useEffect(() => {
    if (persist) {
      localStorage.setItem(modeKey, JSON.stringify(mode));
    }
  }, [mode, persist, modeKey]);

  useEffect(() => {
    if (persist) {
      localStorage.setItem(schemeKey, JSON.stringify(colorScheme));
    }
  }, [colorScheme, persist, schemeKey]);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
  }, []);

  const setColorScheme = useCallback((scheme: ColorScheme) => {
    setColorSchemeState(scheme);
  }, []);

  const toggleMode = useCallback(() => {
    setModeState((current) => {
      if (current === 'system') {
        // If system, toggle to opposite of current resolved mode
        return systemPreference === 'dark' ? 'light' : 'dark';
      }
      return current === 'dark' ? 'light' : 'dark';
    });
  }, [systemPreference]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      resolvedMode,
      colorScheme,
      setMode,
      setColorScheme,
      toggleMode,
    }),
    [mode, resolvedMode, colorScheme, setMode, setColorScheme, toggleMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Hook to access theme context.
 *
 * @example
 * ```tsx
 * function ThemeToggle() {
 *   const { mode, toggleMode, setColorScheme } = useTheme();
 *
 *   return (
 *     <div>
 *       <button onClick={toggleMode}>
 *         Current: {mode}
 *       </button>
 *       <select onChange={(e) => setColorScheme(e.target.value as ColorScheme)}>
 *         <option value="default">Default</option>
 *         <option value="teal">Teal</option>
 *         <option value="blue">Blue</option>
 *       </select>
 *     </div>
 *   );
 * }
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

/**
 * Hook to access theme context with optional fallback.
 * Returns null if not within a ThemeProvider.
 */
export function useThemeOptional(): ThemeContextValue | null {
  return useContext(ThemeContext);
}

ThemeProvider.displayName = 'ThemeProvider';
