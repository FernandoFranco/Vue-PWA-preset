import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const locale = process.env.VUE_APP_I18N_LOCALE;
const fallbackLocale = process.env.VUE_APP_I18N_FALLBACK_LOCALE;

function pluralizationModifier(str, num) {
  const strs = str.split('|').map((s) => s.trim());
  return strs.length === 3 ? strs[num] : strs[num - 1];
}

const i18n = new VueI18n({
  locale,
  fallbackLocale,
  messages: {
    [locale]: require(`../locales/${locale}`).default, // eslint-disable-line
    [fallbackLocale]: require(`../locales/${fallbackLocale}`).default, // eslint-disable-line
  },
  modifiers: {
    none: (str) => pluralizationModifier(str, 0),
    single: (str) => pluralizationModifier(str, 1),
    many: (str) => pluralizationModifier(str, 2),
  },
});

export default i18n;

const loadedLanguages = [
  process.env.VUE_APP_I18N_FALLBACK_LOCALE,
];

function setI18nLanguage(lang) {
  document.documentElement.lang = lang;
  i18n.locale = lang;
  return lang;
}

export function loadLanguageAsync(lang) {
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  return import(
    /* webpackChunkName: "lang-[request]" */
    '@/locales/' + lang + '.js' // eslint-disable-line
  )
    .then((messages) => {
      i18n.setLocaleMessage(lang, messages.default);
      loadedLanguages.push(lang);

      return setI18nLanguage(lang);
    });
}

export async function setupLanguage(languages) {
  if (languages?.length === 0) return;

  const language = languages.shift();

  try {
    await loadLanguageAsync(language);
  } catch (err) {
    await setupLanguage(languages);
  }
}
