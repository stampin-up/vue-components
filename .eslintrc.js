module.exports = {
  extends: [
    '@nuxtjs/eslint-config-typescript'
  ],
  rules: {
    'func-call-spacing': 'off',
    'import/first': 'off',
    // todo vue3 remove
    'vue/no-deprecated-dollar-listeners-api': 'off'
  }
}
