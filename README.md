# Vue PWA preset
> A Vue CLI preset for generating pre-scaffolded PWA applications

This preset use the plugins:
* [@vue/cli-plugin-babel](https://cli.vuejs.org/core-plugins/babel.html)
* [@vue/cli-plugin-pwa](https://cli.vuejs.org/core-plugins/pwa.html)
* [@vue/cli-plugin-router](https://router.vuejs.org/)
  * [historyMode](https://router.vuejs.org/guide/essentials/history-mode.html)
* [@vue/cli-plugin-vuex](https://vuex.vuejs.org/)
* [@vue/cli-plugin-eslint](https://eslint.vuejs.org/)
  * [airbnb](https://github.com/airbnb/javascript) config
* [vue-cli-plugin-i18n](https://kazupon.github.io/vue-i18n/)
* [vue-cli-plugin-vuetify](https://vuetifyjs.com/)
  * [mdi](https://materialdesignicons.com/) icons

## Installing / Getting started

Run the following command in your terminal:

```bash
vue create my-project --preset FernandoFranco/vue-pwa-preset
```

## Contributing

This project use [commitlint](https://commitlint.js.org/) with types:

* `build`: changes affecting the build system or external dependencies
* `ci`: changes to CI configuration files and scripts
* `chore`: other changes that do not modify src or test files
* `docs`: changes to documentation only
* `feat`: a new feature
* `fix`: a bug fix
* `perf`: a code change that improves performance
* `refactory`: a code change that doesn't fix a bug or add a feature
* `style`: changes that do not affect the meaning of the code
* `test`: add missing tests or correct existing tests
