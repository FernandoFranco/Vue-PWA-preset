class SnackbarEvent extends CustomEvent {
  /**
   * @param {object} options
   * @param {string} options.message
   * @param {object} options.action
   * @param {Function} options.action.handler
   * @param {string} options.action.text
   * @param {string} options.action.icon
   * @param {string} options.action.color
   * @param {boolean} options.closeable
   * @param {string} options.icon
   * @param {nunber} options.timeout default 6000
   */
  constructor(options) {
    super(SnackbarEvent.EVENT, { detail: options });
  }
}

SnackbarEvent.EVENT = 'app:snackbar';

export default SnackbarEvent;
