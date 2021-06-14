module.exports = {
  hooks: {
    'commit-msg': 'yarn commitlint -E HUSKY_GIT_PARAMS',
    'pre-commit': 'yarn lint:ci'
  }
}
