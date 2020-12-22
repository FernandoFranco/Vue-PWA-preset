const readWriteFile = require('./utils/readWriteFile');

module.exports = (api) => {
  const filePath = api.resolve('src', 'main.js');

  readWriteFile(api, filePath, (content) => {
    let inNewVue = false;

    return content.split('\n')
      .reduce((lines, line) => {
        if (/registerServiceWorker/.test(line)) {
          return lines.concat(`\n${line}\n`);
        }

        if (/import i18n/.test(line)) {
          return lines.concat('\nimport i18n, { setupLanguage } from \'./plugins/i18n\';');
        }

        if (/(roboto)|(@mdi)/.test(line)) {
          return lines;
        }

        if (/new Vue/.test(line)) {
          inNewVue = true;

          return lines.concat([
            'Promise.resolve()',
            '  .then(async () => {',
            '    await setupLanguage(Array.from(navigator.languages));',
            '  })',
            '  .then(() => {',
            `    ${line}`,
          ]);
        }

        if (inNewVue) {
          if (/\$mount/.test(line)) {
            inNewVue = false;
            return lines.concat([
              `    ${line}`,
              '  });',
            ]);
          }

          return lines.concat(`    ${line}`);
        }

        return lines.concat(line);
      }, [])
      .join('\n');
  });
};
