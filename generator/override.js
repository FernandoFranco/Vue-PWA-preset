const fs = require('fs');
const path = require('path');

module.exports = (api, ...paths) => {
  const templateFilePath = path.resolve(__dirname, 'template', ...paths);

  if (!fs.existsSync(templateFilePath)) {
    api.exitLog(`cannot find file ${templateFilePath}`, 'error');
    return;
  }

  let content = null;

  try {
    content = fs.readFileSync(templateFilePath, { encoding: 'utf8' });
  } catch (error) {
    api.exitLog(`cannot read from ${templateFilePath}`, 'error');
  }

  const appFilePath = api.resolve(...paths);

  if (fs.existsSync(appFilePath)) {
    fs.unlinkSync(appFilePath);
  }

  try {
    fs.writeFileSync(appFilePath, content, { encoding: 'utf8' });
  } catch (error) {
    api.exitLog(`cannot write to ${appFilePath}`, 'error');
  }

  api.exitLog(`overwrite ${paths.join('/')}`, 'info');
};
