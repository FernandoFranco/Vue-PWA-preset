const fs = require('fs');

const envsGenerator = require('./envs');
const overrideGenerator = require('./override');
const localesGenerator = require('./locales');
const mainGenerator = require('./main');

module.exports = (api, options) => {
  api.render('./template');

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
  });
};
