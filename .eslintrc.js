/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'plugin:unicorn/recommended', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module',
    parserOptions: { project: './tsconfig.json' },
  },
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
  ignorePatterns: [
    'dist',
    'node_modules',
    '.eslintrc.js',
    '**/*.d.ts',
    'coverage',
    '*.json',
    'yarn.lock',
    '*.yaml',
    '*.md',
  ],
  plugins: ['@typescript-eslint', 'import', 'simple-import-sort', 'prettier', 'no-secrets', 'jest'],
  rules: {
    // prettier
    'prettier/prettier': [
      'error',
      {
        semi: true,
        singleQuote: true,
        printWidth: 120,
        tabWidth: 2,
        endOfLine: 'auto',
      },
    ],

    // import
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        '': 'never',
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],

    // simple import sort
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    // unicorn
    'unicorn/prevent-abbreviations': [
      'error',
      {
        replacements: {
          db: {
            database: false,
          },
          env: {
            environment: false,
          },
          args: {
            arguments: false,
          },
        },
        ignore: [/[a-z].d.ts/],
      },
    ],
    'unicorn/no-null': 'off',
    'unicorn/prefer-node-protocol': 'off',

    'no-console': ['error', { allow: ['error', 'log'] }],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-use-before-define': 'off',
    'class-methods-use-this': 'off',

    // jest
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',

    'consistent-return': 'off',
  },
  overrides: [
    {
      files: ['*.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      plugins: ['@graphql-eslint', 'prettier'],
      rules: {
        // prettier
        'prettier/prettier': [
          'error',
          {
            semi: true,
            singleQuote: true,
            printWidth: 120,
            tabWidth: 2,
          },
        ],

        '@graphql-eslint/no-operation-name-suffix': 'off',
      },
    },
  ],
  env: {
    'jest/globals': true,
  },
};
