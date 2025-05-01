module.exports = {
    root: true,
    env: {
      browser: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-recommended',
      'plugin:prettier/recommended'
    ],
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module'
    },
    rules: {
      // tus ajustes, por ejemplo:
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'vue/max-attributes-per-line': ['error', {
        singleline: 3,
        multiline: { max: 1 }
      }],
    }
  }
  