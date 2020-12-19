import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import i18n from './i18n';

import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    t: (key, ...params) => i18n.t(key, params),
  },

  theme: {
    options: {
      customProperties: true,
    },

    themes: {
      light: {
        primary: process.env.VUE_APP_THEME_COLOR_PRIMARY,
        secondary: process.env.VUE_APP_THEME_COLOR_SECONDARY,
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
});
