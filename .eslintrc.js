module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    tsconfigRootDir: __dirname,
    sourceType: 'module', // allows for the use of imports
    project: './tsconfig.json',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:@aws-appsync/recommended'
  ],
  plugins: ['@typescript-eslint', 'tsc', 'prettier'],
  env: {
    es6: true,
    node: true,
  },
  rules: {
    'no-console': 2,
    '@typescript-eslint/no-use-before-define': [0],
    '@typescript-eslint/explicit-function-return-type': [0],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-floating-promises': 2,
    '@typescript-eslint/ban-ts-comment': [1],
  },
};
