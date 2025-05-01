// eslint.config.cjs
// Flat configuration for ESLint v9+ in a Vue 3 + Vite project

// 1) Core ESLint recommended ruleset
const js = require('@eslint/js')
// 2) Vue plugin flat config
const pluginVue = require('eslint-plugin-vue')
// 3) Prettier compatibility
const eslintPrettier = require('eslint-config-prettier')
// 4) Standard globals for browser environment
const globals = require('globals')

module.exports = [
// Base JavaScript recommended rules
js.configs.recommended,

// Vue 3: flat config recommended rules
...pluginVue.configs['flat/recommended'],

// Custom overrides and project-specific rules
{
files: ['**/*.{js,vue}'],
languageOptions: {
// ECMAScript version and module settings
ecmaVersion: 'latest',
sourceType: 'module',
// Global variables: browser globals plus fetch & IntersectionObserver
globals: {
...globals.browser,
fetch: 'readonly',
IntersectionObserver: 'readonly'
}
},
rules: {
// Allow single-word component names
'vue/multi-word-component-names': 'off',
// Conditional console warnings
'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
// Limit attributes per line in Vue templates
'vue/max-attributes-per-line': ['error', { singleline: 3, multiline: { max: 1 } }],
'no-unused-vars': 'off',
}
},

// Disable ESLint rules that conflict with Prettier formatting
eslintPrettier
]