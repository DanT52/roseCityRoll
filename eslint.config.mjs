// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';

// Official @typescript-eslint parser + plugin
import * as tsParser from '@typescript-eslint/parser';
import * as tsPlugin from '@typescript-eslint/eslint-plugin';

// React + Hooks plugin
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  // 1) Ignore patterns (no other fields in this object)
  {
    ignores: ['dist', 'node_modules'],
  },

  // 2) Base config from ESLint’s own “recommended” set
  js.configs.recommended,

  // 3) Now add a config specifically for TypeScript + React
  {
    files: ['**/*.{ts,tsx}'],

    // Language options
    languageOptions: {
      parser: tsParser,         // The official TS parser
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,     // e.g. window, document
      },
    },

    // Plugins must be objects in flat config
    plugins: {
      '@typescript-eslint': tsPlugin,
      react,
      'react-hooks': reactHooks,
    },

    // Extends if you want more built-in TS rules
    // You can either do “extends” or spread rules from the plugin config—both ways work.
    // (Here's an example that merges TS recommended + React recommended.)
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // Common overrides:
      'react/prop-types': 'off',             // Not needed in TS
      'react/react-in-jsx-scope': 'off',     // React 17+ new JSX transform
    },
    settings: {
      react: {
        version: '18.3.1',
      },
    },
  },
];
