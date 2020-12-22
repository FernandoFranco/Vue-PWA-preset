const fs = require('fs');

module.exports = (api, filePath, contentMiddleware) => {
  if (!fs.existsSync(filePath)) {
    api.exitLog(`cannot read from ${filePath}`, 'error');
    return;
  }

  let content = null;

  try {
    content = fs.readFileSync(filePath, { encoding: 'utf8' });
  } catch (error) {
    api.exitLog(`cannot read from ${filePath}`, 'error');
  }

  content = contentMiddleware(content);

  try {
    fs.writeFileSync(filePath, content, { encoding: 'utf8' });
  } catch (error) {
    api.exitLog(`cannot write to ${filePath}`, 'error');
  }
};
