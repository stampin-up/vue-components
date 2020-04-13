module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true
        }
      },
      '@babel/preset-react'
    ]
  ]
}
