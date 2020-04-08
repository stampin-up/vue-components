const path = require('path')

module.exports = async ({ config }) => {
  config.resolve.alias['~storybook'] = path.resolve(__dirname)

  config.module.rules.push({
    resourceQuery: /blockType=story/,
    loader: 'vue-storybook',
  })

  config.module.rules.push({
    test: /\.s(a|c)ss$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          prependData: context => context.resourcePath.endsWith('.vue') ? `@import "~vuetify/src/styles/styles.sass";\n` : ''
        }
      }
    ],
    include: path.resolve(__dirname, '../'),
  })

  config.module.rules.push({
    test: /\.tsx?$/,
    exclude: [
      /node_modules/
    ],
    use: {
      loader: 'ts-loader',
      options: {
        appendTsSuffixTo: [/\.vue$/]
      }
    }
  })

  return config
}
