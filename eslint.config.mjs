import pluginJs from '@eslint/js'
import pluginCypress from 'eslint-plugin-cypress/flat'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  pluginJs.configs.recommended,
  pluginCypress.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      'prefer-const': 'error',
      'no-console': 'warn',
      'cypress/no-unnecessary-waiting': 'error',
      'cypress/unsafe-to-chain-command': 'off',
      'cypress/no-pause': 'error'
    }
  }
]
