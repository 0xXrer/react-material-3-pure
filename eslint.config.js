import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import storybook from 'eslint-plugin-storybook'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores([
    '**/dist/**',
    '**/coverage/**',
    '**/extracted/**',
    '**/.storybook/**/storybook-static/**',
    '**/storybook-static/**',
    '**/.vite/**',
  ]),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      ...storybook.configs['flat/recommended'],
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    files: ['src/**/*.stories.{ts,tsx,js,jsx}', '.storybook/**/*.{ts,tsx,js,jsx}'],
    rules: {
      'storybook/no-renderer-packages': 'off',
      'storybook/no-redundant-story-name': 'off',
    },
  },
])
