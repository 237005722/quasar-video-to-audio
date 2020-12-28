
module.exports = {
  presets: [
    '@quasar/babel-preset-app'
  ],
  'env': {
    'development': {
      'plugins': ['transform-remove-console']
    },
    'production': {
      'plugins': ['transform-remove-console']
    }
  }
}
