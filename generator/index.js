const fs = require('fs');

const envsGenerator = require('./envs');
const overrideGenerator = require('./utils/override');
const localesGenerator = require('./locales');
const mainGenerator = require('./main');
const vueConfigGenerator = require('./vueConfig');
const vuetify = require('./vuetify');

module.exports = (api, options, { projectName }) => {
  api.render('./template', { projectName });

  api.extendPackage({
    devDependencies: {
      '@commitlint/cli': '^11.0.0',
      '@commitlint/config-conventional': '^11.0.0',
    },
    gitHooks: {
      'commit-msg': 'commitlint -e -V',
    },
    vue: {
      pluginOptions: {
        i18n: {
          localeDir: 'locales',
          enableInSFC: false,
          locale: '#{{process.env.VUE_APP_I18N_LOCALE}}',
          fallbackLocale: '#{{process.env.VUE_APP_I18N_FALLBACK_LOCALE}}',
        },
      },

      pwa: {
        name: '#{{process.env.VUE_APP_PROJECT_NAME}}',
        themeColor: '#{{process.env.VUE_APP_THEME_COLOR_PRIMARY}}',
        msTileColor: '#{{process.env.VUE_APP_THEME_COLOR_SECONDARY}}',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black-translucent',

        manifestOptions: {
          start_url: './?standalone=true',
          background_color: '#{{process.env.VUE_APP_THEME_COLOR_PRIMARY}}',
        },

        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
          swSrc: 'service-worker.js',
        },
      },
    },
  });

  api.onCreateComplete(() => {
    try {
      fs.unlinkSync(api.resolve('src', 'assets', 'logo.png'));
      fs.unlinkSync(api.resolve('src', 'assets', 'logo.svg'));
      fs.unlinkSync(api.resolve('src', 'components', 'HelloWorld.vue'));
      fs.unlinkSync(api.resolve('src', 'views', 'About.vue'));
      fs.unlinkSync(api.resolve('src', 'views', 'Home.vue'));
      fs.unlinkSync(api.resolve('src', 'locales', 'en.json'));
      fs.unlinkSync(api.resolve('src', 'i18n.js'));
    } catch (error) {
      console.warn('unlink files error:', error.message); // eslint-disable-line
      return;
    }

    envsGenerator(api, options);
    overrideGenerator(api, 'src', 'App.vue');
    localesGenerator(api, options);
    mainGenerator(api);
    vueConfigGenerator(api);
    vuetify(api);
  });
};
