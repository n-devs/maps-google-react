import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import pkg from './package.json';
import postcss from 'rollup-plugin-postcss';
import postcssModules from 'postcss-modules';
// import eslint from 'rollup-plugin-eslint';

const cssExportMap = {};

const config = {
  input: 'src/index.js',
  output: {
    name: 'maps-google-react',
    exports: 'named',
    format: 'umd',
    file: './index.js',
    globals: {
      'crypto': 'crypto',
      'react': 'React',
      'react-dom': 'ReactDOM',
    },
    banner: `/*! ${pkg.name} v${pkg.version} | (c) ${new Date().getFullYear()} Ryan Hefner | ${pkg.license} License | https://github.com/${pkg.repository} !*/`,
    footer: '/* follow me on Facebook n.psk26 */',
  },
  external: [
    'crypto',
    'react',
    'react-dom',
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      externalHelpers: process.env.BABEL_ENV === 'umd',
    }),
    resolve(),
    commonjs({
      include: /node_modules/,
    }),
    postcss({
      modules: true,
      plugins: [
        postcssModules({
          getJSON (id, exportTokens) {
            cssExportMap[id] = exportTokens;
          }
        })
      ],
      getExportNamed: false,
      getExport (id) {
        return cssExportMap[id];
      },
      extract: true
    }),
    json(),
  ],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(uglify());
}

export default config;