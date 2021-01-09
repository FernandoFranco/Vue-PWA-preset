<template>
  <v-icon>
    {{ icon }}
  </v-icon>
</template>

<script>
export default {
  name: 'pwa-snackbar-icon',

  props: {
    icon: String,
    color: String,
  },
};
</script>
