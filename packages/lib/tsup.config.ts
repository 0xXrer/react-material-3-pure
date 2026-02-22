import { defineConfig } from 'tsup';
import cssModulesPlugin from 'esbuild-plugin-css-modules';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    styles: 'src/styles.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  treeshake: true,
  clean: true,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  esbuildPlugins: [
    cssModulesPlugin({
      inject: false,
      localsConvention: 'camelCase',
    }),
  ],
});
