<template>
  <core-view>
    <v-btn color="primary" :to="routeAbout.path">
      About
    </v-btn>
  </core-view>
</template>

<script>
import { ROUTE_ABOUT } from '@/constants/ROUTES';

import CoreView from '@/components/core/view/Index.vue';

export default {
  name: 'ViewHome',

  components: {
    CoreView,
  },

  data() {
    return {
      routeAbout: ROUTE_ABOUT,
    };
  },
};
</script>
