<template>
  <v-snackbar class="pwa-snackbar" v-model="showing" :timeout="timeout">
    <component :is="icon" class="mr-2" v-bind="iconBind" />

    <span class="pwa-snackbar__message">
      {{ (message || '').trim() }}
    </span>

    <template #action>
      <component
        :is="action"
        v-bind="actionBind"
        @click.native="$_hide"
      />
    </template>
  </v-snackbar>
</template>

<script>
import SnackbarEvent from '@/events/SnackbarEvent';

import AppSnackbarIcon from './pwa-snackbar-icon.vue';
import AppSnackbarAction from './pwa-snackbar-action.vue';

export default {
  name: 'pwa-snackbar',

  data() {
    return {
      showing: false,

      message: null,
      timeout: 6000,

      icon: null,
      iconBind: null,

      action: null,
      actionBind: null,
      actionHandler: null,
    };
  },

  methods: {
    $_setIcon(icon) {
      this.icon = null;
      this.iconBind = null;

      if (!icon) return;

      this.icon = AppSnackbarIcon;
      this.iconBind = { icon };
    },

    $_setActions(action = null, closeable = true) {
      if (!action && !closeable) {
        this.action = null;
        return;
      }

      this.action = AppSnackbarAction;
      this.actionHandler = action?.handler ?? null;

      this.actionBind = {
        icon: action?.text ? null : action?.icon ?? 'mdi-close',
        text: action?.text ?? null,
        color: action?.color ?? null,
      };
    },

    $_show(options) {
      this.message = options.message;
      this.timeout = options.timeout ?? 6000;

      this.$_setIcon(options.icon);
      this.$_setActions(options.action, options.closeable);

      this.showing = true;
    },

    $_hide() {
      this.showing = false;

      if (this.actionHandler) {
        this.actionHandler();
        this.actionHandler = null;
      }
    },

    $_handler($event) {
      if (!$event?.detail?.message) {
        throw new Error('app:snackbar requires an options object with at least one message attribute');
      }

      if (!this.showing) {
        this.$_show($event?.detail);
        return;
      }

      this.$_hide();
      setTimeout(() => {
        this.$_show($event?.detail);
      }, 128);
    },
  },

  created() {
    document.addEventListener(SnackbarEvent.EVENT, this.$_handler);
  },

  beforeDestroy() {
    document.removeEventListener(SnackbarEvent.EVENT, this.$_handler);
  },
};
</script>

<style lang="scss">
.pwa-snackbar {
  & > div {
    min-width: 300px;
  }

  &__message {
    display: inline-block;

    &::first-letter {
      text-transform: uppercase !important;
    }
  }
}
</style>
