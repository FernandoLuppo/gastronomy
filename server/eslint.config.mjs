// eslint.config.mjs
import eslintJs from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import prettierPlugin from 'eslint-plugin-prettier'
import importHelpers from 'eslint-plugin-import-helpers'
import globals from 'globals'

export default [
  eslintJs.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
        ecmaVersion: 'latest'
      },
      globals: {
        ...globals.node
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'import-helpers': importHelpers,
      prettier: prettierPlugin
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      'no-undef': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/dot-notation': 'off',
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: ['module', '/^@shared/', ['parent', 'sibling', 'index']],
          alphabetize: { order: 'asc', ignoreCase: true }
        }
      ],
      'prettier/prettier': 'error'
    }
  },
  {
    ignores: [
      'node_modules',
      'dist',
      'coverage',
      '__test__',
      '**/*.js',
      '/*.json'
    ]
  }
]
