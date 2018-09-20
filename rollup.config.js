import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';
import sourcemaps from 'rollup-plugin-sourcemaps';
//import inject from 'rollup-plugin-inject';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

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
  `
  },
  plugins: [
    builtins(),
    /*  inject({
  // control which files this plugin applies to
  // with include/exclude
  include: [
    'src/**',
  ],
  exclude: 'node_modules/**',
  modules: {
    axios : 'axios',
//    punycode: 'punycode'
    //    Promise: [ 'es6-promise', 'Promise' ],
  }
}),*/

    json(),
    nodeResolve({
      // use "module" field for ES6 module if possible
      module: true, // Default: true

      // use "jsnext:main" if possible
      // – see https://github.com/rollup/rollup/wiki/jsnext:main
      jsnext: true, // Default: false

      // use "main" field or index.js, even if it's not an ES6 module
      // (needs to be converted from CommonJS to ES6
      // – see https://github.com/rollup/rollup-plugin-commonjs
      main: true, // Default: true

      // some package.json files have a `browser` field which
      // specifies alternative files to load for people bundling
      // for the browser. If that's you, use this option, otherwise
      // pkg.browser will be ignored
      browser: true // Default: false

      // not all files you want to resolve are .js files
      //      extensions: [ '.js' ],  // Default: ['.js']
      //      preferBuiltins: false,
      // modulesOnly: false,
    }),
    commonjs({
      //sourceMap: true, // Default: true
      include: 'node_modules/**'
      //exclude: [ 'node_modules/axios/index.js' ],
      /* include: [
   'node_modules/punycode/punycode.js',
   'node_modules/minimatch/*.js',
   'node_modules/axios/dist/axios.js',
   'node_modules/tough-cookie/lib/cookie.js',
   'node_modules/tough-cookie/lib/pubsuffix.js',
   'node_modules/axios-cookiejar-support/noop.js'
 ],*/
      //namedExports: {
      //'node_modules/axios/dist/axios.js': ['axios']//
      //}
      //  ignore: [ 'net' ]
    }),
    // The order is very important. If you put globals earlier, axios does not compile correctly
    globals(),

    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    }),
    sourcemaps(),
    filesize()
  ]
};
