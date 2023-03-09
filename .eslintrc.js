module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: ['standard-with-typescript'],
  ignorePatterns: ['dist/*'],
  overrides: [
    {
      files: ["src/**/*.test.ts"],
      env: { jest: true }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  rules: {
  }
}
