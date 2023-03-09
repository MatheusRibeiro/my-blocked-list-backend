module.exports = {
  plugins: [
    //required for tsyringe (dependency injection lib)
    'babel-plugin-transform-typescript-metadata'
  ],
  presets: [
    [
      '@babel/preset-env',
      { targets: { node: 'current' } }
    ],
    '@babel/preset-typescript'
  ]
}