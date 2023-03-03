module.exports = {
    presets: [
      'babel-plugin-transform-typescript-metadata',
      ['@babel/preset-env', {targets: {node: 'current'}}],
      '@babel/preset-typescript',
    ],
  }
