module.exports = {
  root: true,
  extends: [
    'plugin:jest-formatting/strict',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:prettier/recommended',
  ],
  plugins: ['jest', 'jest-formatting', 'prettier'],
  ignorePatterns: ['templates/**/*', '**/dist/'],
  env: {
    node: true,
    es2020: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig-lint.json',
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
  reportUnusedDisableDirectives: true,
  rules: {
    'max-len': ['error', { code: 120 }],
    'max-classes-per-file': 'off',
    'import/prefer-default-export': 'off',
    curly: 'error',
    'no-continue': 'off',
    'no-console': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type', 'unknown'],
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-use-before-define': ['error', { variables: false }],
    'no-restricted-syntax': 'off',
    '@typescript-eslint/no-loop-func': 'off',
    'jest/no-disabled-tests': 'off',
  },
};
