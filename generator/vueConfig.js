const readWriteFile = require('./utils/readWriteFile');

const chainWebpack = `],  chainWebpack(config) {
    config.plugins.delete('prefetch');
  },
};`;

module.exports = (api) => {
  const filePath = api.resolve('vue.config.js');

  readWriteFile(api, filePath, (content) => content
    .replace(/['"]#{{(.*)}}['"]/gm, '$1')
    .replace(/]\n}$/, chainWebpack));
};
