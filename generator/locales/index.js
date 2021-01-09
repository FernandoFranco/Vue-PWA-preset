const fs = require('fs');

const en = require('./en');
const pt = require('./pt');

const locales = { en, pt };

function createI18nContent(locale) {
  return `import $vuetify from 'vuetify/es5/locale/${locale}';

export default {
  $vuetify,
  ${locales[locale] || en}
};
`;
}

module.exports = (api, options) => {
  const localePath = api.resolve('src', 'locales', `${options.i18nLocale}.js`);
  if (fs.existsSync(localePath)) {
    fs.unlinkSync(localePath);
  }

  try {
    fs.writeFileSync(localePath, createI18nContent(options.i18nLocale), { encoding: 'utf8' });
  } catch (error) {
    api.exitLog(`cannot write to ${localePath}`, 'error');
  }

  if (options.i18nLocale === options.i18nFallbackLocale) {
    return;
  }

  const fallbackPath = api.resolve('src', 'locales', `${options.i18nFallbackLocale}.js`);
  if (fs.existsSync(fallbackPath)) {
    fs.unlinkSync(fallbackPath);
  }

  try {
    fs.writeFileSync(fallbackPath, createI18nContent(options.i18nFallbackLocale), { encoding: 'utf8' });
  } catch (error) {
    api.exitLog(`cannot write to ${fallbackPath}`, 'error');
  }
};
