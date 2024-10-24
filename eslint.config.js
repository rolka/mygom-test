import react from 'eslint-plugin-react';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
export default [
  {
    ignores: ['node_modules/**'], // Ignore node_modules
  },
  {
    languageOptions: {
      parser: typescriptParser, // Use TypeScript parser
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
    plugins: {
      react,
      '@typescript-eslint': typescript,
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // React 17+ doesn't require React in scope
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error'],
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
  },
];