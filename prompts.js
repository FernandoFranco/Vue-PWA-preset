module.exports = (pkg) => [
  {
    type: 'input',
    name: 'projectName',
    message: 'The project name to show in APP (min 2 characters)',
    validate: (input) => /\w{2,}/.test(input),
    default: pkg.name.split('-')
      .map((x) => x[0].toUpperCase() + x.substr(1)).join(' '),
  },
  {
    type: 'input',
    name: 'primaryColor',
    message: 'The primary color in HEX (#xxx or #xxxxxx)',
    validate: (input) => /^#[\da-zA-Z]{3}([\da-zA-Z]{3})?$/.test(input),
    default: '#000000',
  },
  {
    type: 'input',
    name: 'secondaryColor',
    message: 'The secondary color in HEX (#xxx or #xxxxxx)',
    validate: (input) => /^#[\da-zA-Z]{3}([\da-zA-Z]{3})?$/.test(input),
    default: '#000000',
  },
  {
    type: 'input',
    name: 'accentColor',
    message: 'The accent color in HEX (#xxx or #xxxxxx)',
    validate: (input) => /^#[\da-zA-Z]{3}([\da-zA-Z]{3})?$/.test(input),
    default: '#000000',
  },
  {
    type: 'input',
    name: 'i18nLocale',
    message: 'The locale of project localization',
    validate: (input) => !!input,
    default: 'en',
  },
  {
    type: 'input',
    name: 'i18nFallbackLocale',
    message: 'The fallback locale of project localization',
    validate: (input) => !!input,
    default: 'en',
  },
];
