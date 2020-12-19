const fs = require('fs');

module.exports = (api) => {
  const mainPath = api.resolve('src', 'main.js');

  if (!fs.existsSync(mainPath)) {
    api.exitLog(`cannot read from ${mainPath}`, 'error');
    return;
  }

  let content = null;

  try {
    content = fs.readFileSync(mainPath, { encoding: 'utf8' });
  } catch (error) {
    api.exitLog(`cannot read from ${mainPath}`, 'error');
  }

  let inNewVue = false;
  content = content.split('\n')
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
    }, []);

  try {
    fs.writeFileSync(mainPath, content.join('\n'), { encoding: 'utf8' });
  } catch (error) {
    api.exitLog(`cannot write to ${mainPath}`, 'error');
  }
};
