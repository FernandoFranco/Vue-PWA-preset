module.exports = (api) => {
  api.extendPackage({
    devDependencies: {
      '@commitlint/cli': '^11.0.0',
      '@commitlint/config-conventional': '^11.0.0',
    },
    gitHooks: {
      'commit-msg': 'commitlint -e -V',
    },
  });
};
