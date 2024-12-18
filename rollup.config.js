import { resolve } from 'path'
import ts from 'rollup-plugin-typescript2'
import dts from "rollup-plugin-dts";

export default [{
  input: "plugin.d.ts",
  plugins: [
    dts(),
    ts({
      check: process.env.NODE_ENV === 'production',
      tsconfig: resolve(__dirname, 'tsconfig.json'),
      cacheRoot: resolve(__dirname, 'node_modules/.rts2_cache'),
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: false,
          declaration: true,
          declarationMap: true
        },
        exclude: ['**/__tests__', 'test-dts']
      }
    }),
  ],
  output: [{
    file: `dist/index.d.ts`,
    format: "es"
  }],
}]
