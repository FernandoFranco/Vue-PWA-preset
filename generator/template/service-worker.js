/* global workbox */
/* eslint-disable no-restricted-globals */
/* eslint no-underscore-dangle: ["error", { "allow": ["self", "__precacheManifest"] }] */

workbox.core.setCacheNameDetails({ prefix: '<%= projectName %>' });

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
