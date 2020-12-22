const readWriteFile = require('./utils/readWriteFile');

module.exports = (api) => {
  const filePath = api.resolve('src', 'plugins', 'vuetify.js');

  readWriteFile(api, filePath, (content) => content.split('\n')
    .reduce((lines, line) => {
      if (/^Vue.use/.test(line)) {
        return lines.concat([
          'import i18n from \'./i18n\';',
          '',
          'import \'roboto-fontface/css/roboto/roboto-fontface.css\';',
          'import \'@mdi/font/css/materialdesignicons.css\';',
          '',
          line,
        ]);
      }

      if (/new Vuetify/.test(line)) {
        return lines.concat([
          line,
          '  lang: {',
          '    t: (key, ...params) => i18n.t(key, params),',
          '  },',
        ]);
      }

      if (/primary:/.test(line)) {
        return lines.concat(line.replace(/'.*'/, 'process.env.VUE_APP_THEME_COLOR_PRIMARY'));
      }

      if (/secondary:/.test(line)) {
        return lines.concat(line.replace(/'.*'/, 'process.env.VUE_APP_THEME_COLOR_SECONDARY'));
      }

      return lines.concat(line);
    }, [])
    .join('\n'));
};
