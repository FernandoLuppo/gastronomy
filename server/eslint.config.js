// eslint.config.js
import eslint from '@eslint/js'
import typescriptParser from '@typescript-eslint/parser'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import importHelpers from 'eslint-plugin-import-helpers'
import standardWithTypescript from 'eslint-config-standard-with-typescript'
import prettierConfig from 'eslint-config-prettier'

export default [
  eslint.configs.recommended,
  standardWithTypescript,
  prettierConfig,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        sourceType: 'module',
        project: './tsconfig.json'
      }
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      'import-helpers': importHelpers
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/dot-notation': 'off',
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: ['module', '/^@shared/', ['parent', 'sibling', 'index']],
          alphabetize: {
            order: 'asc',
            ignoreCase: true
          }
        }
      ]
    }
  },
  {
    ignores: ['**/node_modules/', '**/dist/', '**/*.js', '.eslintrc.js']
  }
]
