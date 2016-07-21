module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      jsx: true
    }
  },
  environments: {
    es6: true,
    jest: true
  },
  extends: [
    'eslint-config-airbnb-base',
    'plugin:react/recommended'
  ],
  plugins: [
    'react'
  ],
  rules: {
    'arrow-body-style': 0,
    'comma-dangle': [2, 'never'],
    'func-names': 0,
    'max-len': [2, 120, 2],
    'react/jsx-curly-spacing': [2, 'always'],
    'react/prefer-stateless-function': 0,
    'react/prop-types': 0
  }
};
