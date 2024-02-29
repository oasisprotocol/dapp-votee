// @ts-check

/** @type { import("prettier").ConfigType } */
module.exports = {
  printWidth: 110,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  arrowParens: 'avoid',
  overrides: [
    {
      files: ['**/*.json'],
      options: {
        trailingComma: 'none',
      },
    },
  ],
}
