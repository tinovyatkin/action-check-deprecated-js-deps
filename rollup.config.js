import commonjs from "rollup-plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

import builtins from "builtins";

export default {
  input: "index.js",
  output: {
    file: "dist/index.js",
    format: "cjs",
    interop: false,
    esModule: false,
    exports: "none",
    preferConst: true
  },
  plugins: [
    resolve({ browser: false }),
    commonjs({ ignoreGlobal: true }),
    terser()
  ],
  external: builtins()
};
