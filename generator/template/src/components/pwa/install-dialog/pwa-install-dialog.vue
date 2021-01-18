<template>
  <v-dialog :value="showing" max-width="350">
    <v-card>
      <v-card-title class="flex-column text-center">
        <v-img contain
          :src="$_icon"
          :class="{ isIos }"
          class="elecation-2"
          width="64"
          height="64"
        />
        <div>{{ $t('pwa.install.title') }}</div>
      </v-card-title>

      <v-card-text>
        {{ $t('pwa.install.message') }}
      </v-card-text>

      <component
        :is="$_actions"
        @click:cancel="$_onCancel"
        @click:install="$_onInstall"
      />
    </v-card>
  </v-dialog>
</template>

<script>
import PwaInstallDialogActions from './pwa-install-dialog-actions.vue';
import PwaInstallDialogActionsIos from './pwa-install-dialog-actions-ios.vue';

const LAST_SEEN_PROMPT_KEY = 'last-seen-prompt';

function isStandalone($route) {
  if (window.navigator.standalone) return true;
  return $route.query.standalone === 'true';
}

function shouldDisplayPrompt() {
  const lastPrompt = Number(localStorage.getItem(LAST_SEEN_PROMPT_KEY));
  localStorage.setItem(LAST_SEEN_PROMPT_KEY, Date.now());

  if (!lastPrompt) return true;

  const diffTime = Math.abs(lastPrompt - Date.now());
  const diffDays = Math.trunc(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= Number(process.env.VUE_APP_PWA_INSTALL_PROMPT_EVERY);
}

export default {
  name: 'pwa-install-dialog',

  data() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIos = /iphone|ipad|ipod/.test(userAgent);

    return {
      isIos,
      showing: false,
    };
  },

  computed: {
    $_icon() {
      if (this.isIos) return '/img/icons/apple-touch-icon-76x76.png';

      return '/img/icons/android-chrome-192x192.png';
    },

    $_actions() {
      if (this.isIos) return PwaInstallDialogActionsIos;

      return PwaInstallDialogActions;
    },
  },

  methods: {
    $_show() {
      if (!shouldDisplayPrompt()) return;

      this.$nextTick(() => {
        this.showing = true;
      });
    },

    $_onCancel() {
      this.showing = false;
    },

    async $_onInstall() {
      this.showing = false;

      if (!this.$_deferredPrompt) return;

      this.$_deferredPrompt.prompt();

      const result = await this.$_deferredPrompt.userChoice;
      if (result.outcome === 'accepted') {
        console.log('User accepted the install prompt'); // eslint-disable-line
      } else {
        console.log('User dismissed the install prompt'); // eslint-disable-line
      }
    },
  },

  created() {
    window.addEventListener('beforeinstallprompt', ($event) => {
      $event.preventDefault();

      this.$_deferredPrompt = $event;
      this.$_show();
    });

    if (this.isIos && !isStandalone(this.$route)) {
      this.$_show();
    }
  },
};
</script>

<style lang="scss">
.isIos {
  border-radius: 11.23px;
}
</style>
