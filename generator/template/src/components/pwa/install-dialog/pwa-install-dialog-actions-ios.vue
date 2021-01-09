<template>
  <v-card-actions class="pwa-install-dialog-actions-ios">
    <div class="pa-0">
      <span>{{ $t('pwa.install.ios.justTap') }}</span>

      <v-icon class="mx-2" color="primary">mdi-upload</v-icon>
    </div>

    <div class="pa-0">
      <span class="mr-2">{{ $t('pwa.install.ios.then') }}</span>

      <span class="primary--text">'{{ $t('pwa.install.ios.homeScreen') }}'</span>
    </div>
  </v-card-actions>
</template>

<script>
export default {
  name: 'pwa-install-dialog-actions-ios',
};
</script>

<style lang="scss">
.pwa-install-dialog-actions-ios {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  > div {
    white-space: nowrap;

    display: flex;
    align-items: center;
  }
}
</style>
