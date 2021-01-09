<template>
  <v-app>
    <slot />

    <v-main>
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </v-main>

    <pwa-install-dialog />
    <pwa-snackbar />
  </v-app>
</template>

<script>
import PwaInstallDialog from '@/components/pwa/install-dialog/pwa-install-dialog.vue';
import PwaSnackbar from '@/components/pwa/snackbar/pwa-snackbar.vue';

export default {
  name: 'LayoutBase',

  components: {
    PwaInstallDialog,
    PwaSnackbar,
  },
};
</script>
