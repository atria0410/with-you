import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'prefer-arrow-callback': 'error',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  })
]

export default eslintConfig
