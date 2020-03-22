import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import localResolve from 'rollup-plugin-local-resolve';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import Terser from 'terser';
import filesize from 'rollup-plugin-filesize';

const plugins = [
    globals(),
    builtins(),
    localResolve(),
    resolve({
      module: true,
      jsnext: true,
      main: true,
      preferBuiltins: true,
      browser: true,
      modulesOnly: true
    }),
    commonjs(),
    babel({
      // runtimeHelpers: true,
      exclude: 'node_modules/**'
    }), 
    (process.env.NODE_ENV === 'production' && Terser()),
    filesize()
];

export default [
    // 1. 生成umd、iife、cjs
    {
      input: `./src/main.js`,
      output: [{
          file: `./dist/main.min.js`,
          format: 'umd',
          name: 'agonifex'
        },
        {
          file: `./dist/main.fe.js`,
          format: 'iife',
          name: 'agonifex'
        },
        {
          file: `./dist/main.cjs.js`,
          format: 'cjs',
          name: 'agonifex'
        }
      ],
      plugins,
    },
    // 2. 生成 es6 module的es5语法的文件
    // {
    //   input: `tmp/zollty-util.esm.js`,
    //   output: [{
    //     file: `tmp/zollty-util.es.js`,
    //     format: 'es',
    //     name: 'ztu'
    //   }],
    //   plugins,
    // },
    // {
    //   input: `tmp/bom.js`,
    //   output: [{
    //       file: `tmp/bom.js`,
    //       format: 'umd',
    //       name: 'bom'
    //     },
    //     {
    //       file: `tmp/bom.fe.js`,
    //       format: 'iife',
    //       name: 'bom'
    //     }
    //   ],
    //   plugins,
    // }
  ];