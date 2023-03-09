module.exports = {
  plugins: [
    // required for tsyringe (dependency injection lib)
    'babel-plugin-transform-typescript-metadata'
  ],
  presets: [
    [
      // allows the use the latest JS without needing to micromanage which syntax transforms are needed by your target environment
      '@babel/preset-env',
      { targets: { node: 'current' } }
    ],
    // recommended if you use TypeScript, includes the @babel/plugin-transform-typescript plugin
    '@babel/preset-typescript'
  ]
}
