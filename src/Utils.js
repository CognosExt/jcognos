var Utils = {
  /**
   * Determine if we're running in a standard browser environment
   * returns {boolean}
   */
  isStandardBrowserEnv() {
    if (
      typeof navigator !== 'undefined' &&
      navigator.product === 'ReactNative'
    ) {
      return false;
    }
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  },

  /**
   * Determine if we're running in node
   * returns {boolean}
   */
  isNode() {
    return !Utils.isStandardBrowserEnv();
  }
};

export { Utils };
