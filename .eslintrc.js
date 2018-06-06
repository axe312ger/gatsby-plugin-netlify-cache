module.exports = {
  extends: ['standard', 'plugin:prettier/recommended'],
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    }
  }
}
