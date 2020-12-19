<template>
  <v-app-bar app>
    <v-btn :to="routeHome.path" icon>
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { ROUTE_HOME } from '@/constants/ROUTES';

export default {
  name: 'ViewAboutAppBar',

  data() {
    return {
      routeHome: ROUTE_HOME,
    };
  },
};
</script>
