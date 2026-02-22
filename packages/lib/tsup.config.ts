import { defineConfig } from 'tsup';
import CssModulesPlugin from 'esbuild-css-modules-plugin';

export default defineConfig([
  {
    entry: {
      index: 'src/index.ts',
    },
    format: ['esm', 'cjs'],
    dts: false,
    splitting: false,
    treeshake: true,
    clean: true,
    external: ['react', 'react-dom', 'react/jsx-runtime'],
    esbuildPlugins: [
      CssModulesPlugin({
        inject: false,
        localsConvention: 'camelCase',
      }),
    ],
  },
  {
    entry: {
      styles: 'src/styles.css',
    },
    outDir: 'dist',
  },
]);
