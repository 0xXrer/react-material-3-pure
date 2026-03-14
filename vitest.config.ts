import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'unit',
    include: ['src/**/*.test.{ts,tsx}'],
    environment: 'node',
  },
});
