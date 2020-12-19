import Vue from 'vue';
import VueRouter from 'vue-router';

import vuetify from '@/plugins/vuetify';

import * as ROUTES from '../constants/ROUTES';

import { layoutRoute, viewRoute, redirectRoute } from '../utils/router';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,

  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0;

    if (to.hash) {
      scrollTo = to.hash;
    } else if (savedPosition) {
      scrollTo = savedPosition.y;
    }

    return vuetify.framework.goTo(scrollTo);
  },

  routes: [
    layoutRoute({
      path: ROUTES.ROUTE_HOME.path,
      layout: 'base',
      children: [
        viewRoute({
          name: ROUTES.ROUTE_HOME.name,
          view: 'home',
        }),
      ],
    }),

    layoutRoute({
      path: ROUTES.ROUTE_ABOUT.path,
      layout: 'default',
      children: [
        viewRoute({
          name: ROUTES.ROUTE_ABOUT.name,
          view: 'about',
          appBar: 'AppBar',
        }),
      ],
    }),

    redirectRoute(ROUTES.ROUTE_HOME),
  ],
});

export default router;
