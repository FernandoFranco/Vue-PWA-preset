<template>
  <v-btn :color="color" :icon="$_isIcon" text>
    {{ text }}

    <component
      :is="$_icon.component"
      v-bind="$_icon.bind"
    />
  </v-btn>
</template>

<script>
import AppSnackbarIcon from './pwa-snackbar-icon.vue';

const DEFAULT_ICON = {
  component: null,
};

export default {
  name: 'pwa-snackbar-action',

  props: {
    icon: String,
    color: String,
    text: String,
  },

  computed: {
    $_isIcon() {
      return !!this.icon;
    },

    $_icon() {
      if (!this.$_isIcon) return DEFAULT_ICON;

      return {
        component: AppSnackbarIcon,
        bind: {
          icon: this.icon,
          color: this.color,
        },
      };
    },
  },
};
</script>
