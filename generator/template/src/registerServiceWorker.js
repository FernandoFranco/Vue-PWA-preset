/* eslint-disable no-console */
import { register } from 'register-service-worker';

import SnackbarEvent from '@/events/SnackbarEvent';
import i18n from '@/plugins/i18n';

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n'
        + 'For more details, visit https://goo.gl/AFskqB',
      );
    },
    registered(registration) {
      console.log('Service worker has been registered.');

      setInterval(() => {
        registration.update();
      }, 1000 * 60 * 60);
    },
    cached() {
      console.log('Content has been cached for offline use.');
    },
    updatefound() {
      console.log('New content is downloading.');
    },
    updated(registration) {
      console.log('New content is available; please refresh.');

      const { waiting } = registration;
      if (!waiting) return;

      document.dispatchEvent(new SnackbarEvent({
        message: i18n.t('pwa.newAvailable'),
        action: {
          text: i18n.t('pwa.update'),
          handler: () => {
            waiting.postMessage({
              type: 'SKIP_WAITING',
            });
          },
        },
      }));
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.');
    },
    error(error) {
      console.error('Error during service worker registration:', error);
    },
  });

  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;

    refreshing = true;
    window.location.reload();
  });
}
