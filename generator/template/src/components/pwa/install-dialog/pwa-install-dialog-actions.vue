<template>
  <v-card-actions>
    <v-spacer />

    <v-btn text
      @click="$_onClickCancel"
    >{{ $t('pwa.install.cancell') }}</v-btn>

    <v-btn text
      color="primary"
      @click="$_onClickInstall"
    >{{ $t('pwa.install.install') }}</v-btn>
  </v-card-actions>
</template>

<script>
export default {
  name: 'pwa-install-dialog-actions-ios',

  methods: {
    $_onClickCancel($event) {
      this.$emit('click:cancel', $event);
    },

    $_onClickInstall($event) {
      this.$emit('click:install', $event);
    },
  },
};
</script>
