import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';
import sourcemaps from 'rollup-plugin-sourcemaps';
//import inject from 'rollup-plugin-inject';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/jcognos.js', // equivalent to --output
    format: 'umd',
    name: 'jcognos',
    banner: `/**
   * Copyright (c) 2017, Reinier Battenberg
   * All rights reserved.
   *
   * Source code can be found at:
   * https://github.com/CognosExt/jcognos
   *
   * @license GPL 3.0
   */
  `,
  },
  plugins: [
    builtins(),
    json(),
    nodeResolve({
      // use "module" field for ES6 module if possible
      mainFields: ['browser', 'module', 'main'],

      // some package.json files have a `browser` field which
      // specifies alternative files to load for people bundling
      // for the browser. If that's you, use this option, otherwise
      // pkg.browser will be ignored
      browser: true, // Default: false

      // not all files you want to resolve are .js files
      //      extensions: [ '.js' ],  // Default: ['.js']
      //      preferBuiltins: false,
      // modulesOnly: false,
      //
      preferBuiltins: true,
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    // The order is very important. If you put globals earlier, axios does not compile correctly
    globals(),

    babel({
      babelHelpers: 'bundled',
      plugins: [
        '@babel/plugin-transform-shorthand-properties',
        '@babel/plugin-transform-template-literals',
        '@babel/plugin-transform-unicode-regex',
        '@babel/plugin-transform-arrow-functions',
      ],
    }),
    terser(),
    sourcemaps(),
    filesize(),
  ],
};
