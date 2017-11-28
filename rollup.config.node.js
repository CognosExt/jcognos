import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import filesize from 'rollup-plugin-filesize';

export default {
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
  input: 'src/index.js',
  output: {
    file: 'dist/jcognos.esm.js', // equivalent to --output
    format: 'es'
  },
  name: 'jcognos',
  plugins: [
    json(),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    }),
    filesize()
  ]
};
