const fs = require('fs');
const dotenv = require('dotenv');

module.exports = (api, options) => {
  api.render('./template', options);

  api.extendPackage({
    devDependencies: {
      '@commitlint/cli': '^11.0.0',
      '@commitlint/config-conventional': '^11.0.0',
    },
    gitHooks: {
      'commit-msg': 'commitlint -e -V',
    },
  });

  api.onCreateComplete(() => {
    const envPath = api.resolve('.env');

    if (!fs.existsSync(envPath)) {
      return;
    }

    let envVars = {};

    try {
      envVars = dotenv.parse(Buffer.from(fs.readFileSync(envPath))) || {};
    } catch (error) {
      console.warn('read env error:', error.message); // eslint-disable-line
      return;
    }

    let content = '';

    content += `VUE_APP_PROJECT_NAME=${options.projectName}\n\n`;
    if (envVars.VUE_APP_PROJECT_NAME) {
      delete envVars.VUE_APP_PROJECT_NAME;
    }

    content += `VUE_APP_THEME_COLOR_PRIMARY=${options.primaryColor}\n`;
    content += `VUE_APP_THEME_COLOR_SECONDARY=${options.secondaryColor}\n`;
    content += `VUE_APP_THEME_COLOR_ACCENT=${options.accentColor}\n\n`;
    if (envVars.VUE_APP_THEME_COLOR_PRIMARY) {
      delete envVars.VUE_APP_THEME_COLOR_PRIMARY;
    }
    if (envVars.VUE_APP_THEME_COLOR_SECONDARY) {
      delete envVars.VUE_APP_THEME_COLOR_SECONDARY;
    }
    if (envVars.VUE_APP_THEME_COLOR_ACCENT) {
      delete envVars.VUE_APP_THEME_COLOR_ACCENT;
    }

    content += `VUE_APP_I18N_LOCALE=${options.i18nLocale}\n`;
    content += `VUE_APP_I18N_FALLBACK_LOCALE=${options.i18nFallbackLocale}\n\n`;
    if (envVars.VUE_APP_I18N_LOCALE) {
      delete envVars.VUE_APP_I18N_LOCALE;
    }
    if (envVars.VUE_APP_I18N_FALLBACK_LOCALE) {
      delete envVars.VUE_APP_I18N_FALLBACK_LOCALE;
    }

    content = Object.entries(envVars)
      .reduce((c, [key, value]) => `${c}${key}=${value}\n`, content);

    try {
      fs.writeFileSync(envPath, content, { encoding: 'utf8' });
    } catch (error) {
      api.exitLog(`cannot write to ${envPath}`, 'error');
    }
  });
};
