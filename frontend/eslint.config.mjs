import globals from "globals"; 
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 2020, // Hoặc phiên bản ECMAScript bạn đang sử dụng
        sourceType: "module",
      },
    },
    settings: {
      react: {
        version: "detect", // Hoặc chỉ định phiên bản cụ thể nếu cần
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
