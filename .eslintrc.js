module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  parser: 'babel-eslint',
  rules: {
    'react/prop-types': [1],
    'comma-dangle': ['warn', 'always-multiline'],
    indent: ['warn', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': ['warn'],
    'array-bracket-newline': ['error', { minItems: 3 }],
    'array-element-newline': ['error', { minItems: 3 }],
    'no-unused-vars': ['warn'],
    'react/jsx-first-prop-new-line': [1, 'multiline'],
    'react/jsx-max-props-per-line': [
      1,
      {
        maximum: 1,
      },
    ],
    'react/jsx-closing-bracket-location': 1,
  },
};
