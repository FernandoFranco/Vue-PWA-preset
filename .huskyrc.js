module.exports = {
  hooks: {
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
    'pre-commit': 'yarn lint --fix --no-error-on-unmatched-pattern',
  }
};
