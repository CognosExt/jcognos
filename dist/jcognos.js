/**
 * Copyright (c) 2017, Reinier Battenberg
 * All rights reserved.
 *
 * Source code can be found at:
 * https://github.com/CognosExt/jcognos
 *
 * @license GPL 3.0
 */

(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
    ? define(['exports'], factory)
    : ((global = global || self), factory((global.jcognos = {})));
})(this, function(exports) {
  'use strict';

  function _typeof(obj) {
    if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
      _typeof = function(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function(obj) {
        return obj &&
          typeof Symbol === 'function' &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
          ? 'symbol'
          : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var bind = function bind(fn, thisArg) {
    return function wrap() {
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      return fn.apply(thisArg, args);
    };
  };

  /*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   */

  var isBuffer = function isBuffer(obj) {
    return (
      obj != null &&
      obj.constructor != null &&
      typeof obj.constructor.isBuffer === 'function' &&
      obj.constructor.isBuffer(obj)
    );
  };

  /*global toString:true*/

  // utils is a library of generic helper functions non-specific to axios

  var toString = Object.prototype.toString;

  /**
   * Determine if a value is an Array
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Array, otherwise false
   */
  function isArray(val) {
    return toString.call(val) === '[object Array]';
  }

  /**
   * Determine if a value is an ArrayBuffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an ArrayBuffer, otherwise false
   */
  function isArrayBuffer(val) {
    return toString.call(val) === '[object ArrayBuffer]';
  }

  /**
   * Determine if a value is a FormData
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an FormData, otherwise false
   */
  function isFormData(val) {
    return typeof FormData !== 'undefined' && val instanceof FormData;
  }

  /**
   * Determine if a value is a view on an ArrayBuffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
   */
  function isArrayBufferView(val) {
    var result;
    if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
      result = ArrayBuffer.isView(val);
    } else {
      result = val && val.buffer && val.buffer instanceof ArrayBuffer;
    }
    return result;
  }

  /**
   * Determine if a value is a String
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a String, otherwise false
   */
  function isString(val) {
    return typeof val === 'string';
  }

  /**
   * Determine if a value is a Number
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Number, otherwise false
   */
  function isNumber(val) {
    return typeof val === 'number';
  }

  /**
   * Determine if a value is undefined
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if the value is undefined, otherwise false
   */
  function isUndefined(val) {
    return typeof val === 'undefined';
  }

  /**
   * Determine if a value is an Object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Object, otherwise false
   */
  function isObject(val) {
    return val !== null && typeof val === 'object';
  }

  /**
   * Determine if a value is a Date
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Date, otherwise false
   */
  function isDate(val) {
    return toString.call(val) === '[object Date]';
  }

  /**
   * Determine if a value is a File
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a File, otherwise false
   */
  function isFile(val) {
    return toString.call(val) === '[object File]';
  }

  /**
   * Determine if a value is a Blob
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Blob, otherwise false
   */
  function isBlob(val) {
    return toString.call(val) === '[object Blob]';
  }

  /**
   * Determine if a value is a Function
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Function, otherwise false
   */
  function isFunction(val) {
    return toString.call(val) === '[object Function]';
  }

  /**
   * Determine if a value is a Stream
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Stream, otherwise false
   */
  function isStream(val) {
    return isObject(val) && isFunction(val.pipe);
  }

  /**
   * Determine if a value is a URLSearchParams object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */
  function isURLSearchParams(val) {
    return (
      typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams
    );
  }

  /**
   * Trim excess whitespace off the beginning and end of a string
   *
   * @param {String} str The String to trim
   * @returns {String} The String freed of excess whitespace
   */
  function trim(str) {
    return str.replace(/^\s*/, '').replace(/\s*$/, '');
  }

  /**
   * Determine if we're running in a standard browser environment
   *
   * This allows axios to run in a web worker, and react-native.
   * Both environments support XMLHttpRequest, but not fully standard globals.
   *
   * web workers:
   *  typeof window -> undefined
   *  typeof document -> undefined
   *
   * react-native:
   *  navigator.product -> 'ReactNative'
   */
  function isStandardBrowserEnv() {
    if (
      typeof navigator !== 'undefined' &&
      navigator.product === 'ReactNative'
    ) {
      return false;
    }
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }

  /**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   */
  function forEach(obj, fn) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
      return;
    }

    // Force an array if not already something iterable
    if (typeof obj !== 'object') {
      /*eslint no-param-reassign:0*/
      obj = [obj];
    }

    if (isArray(obj)) {
      // Iterate over array values
      for (var i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      // Iterate over object keys
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj);
        }
      }
    }
  }

  /**
   * Accepts varargs expecting each argument to be an object, then
   * immutably merges the properties of each object and returns result.
   *
   * When multiple objects contain the same key the later object in
   * the arguments list will take precedence.
   *
   * Example:
   *
   * ```js
   * var result = merge({foo: 123}, {foo: 456});
   * console.log(result.foo); // outputs 456
   * ```
   *
   * @param {Object} obj1 Object to merge
   * @returns {Object} Result of all merge properties
   */
  function merge(/* obj1, obj2, obj3, ... */) {
    var result = {};
    function assignValue(val, key) {
      if (typeof result[key] === 'object' && typeof val === 'object') {
        result[key] = merge(result[key], val);
      } else {
        result[key] = val;
      }
    }

    for (var i = 0, l = arguments.length; i < l; i++) {
      forEach(arguments[i], assignValue);
    }
    return result;
  }

  /**
   * Extends object a by mutably adding to it the properties of object b.
   *
   * @param {Object} a The object to be extended
   * @param {Object} b The object to copy properties from
   * @param {Object} thisArg The object to bind function to
   * @return {Object} The resulting value of object a
   */
  function extend(a, b, thisArg) {
    forEach(b, function assignValue(val, key) {
      if (thisArg && typeof val === 'function') {
        a[key] = bind(val, thisArg);
      } else {
        a[key] = val;
      }
    });
    return a;
  }

  var utils = {
    isArray: isArray,
    isArrayBuffer: isArrayBuffer,
    isBuffer: isBuffer,
    isFormData: isFormData,
    isArrayBufferView: isArrayBufferView,
    isString: isString,
    isNumber: isNumber,
    isObject: isObject,
    isUndefined: isUndefined,
    isDate: isDate,
    isFile: isFile,
    isBlob: isBlob,
    isFunction: isFunction,
    isStream: isStream,
    isURLSearchParams: isURLSearchParams,
    isStandardBrowserEnv: isStandardBrowserEnv,
    forEach: forEach,
    merge: merge,
    extend: extend,
    trim: trim
  };

  var global$1 =
    typeof global !== 'undefined'
      ? global
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : {};

  // shim for using process in browser
  // based off https://github.com/defunctzombie/node-process/blob/master/browser.js

  function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
  }
  function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
  }
  var cachedSetTimeout = defaultSetTimout;
  var cachedClearTimeout = defaultClearTimeout;
  if (typeof global$1.setTimeout === 'function') {
    cachedSetTimeout = setTimeout;
  }
  if (typeof global$1.clearTimeout === 'function') {
    cachedClearTimeout = clearTimeout;
  }

  function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
      //normal enviroments in sane situations
      return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if (
      (cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) &&
      setTimeout
    ) {
      cachedSetTimeout = setTimeout;
      return setTimeout(fun, 0);
    }
    try {
      // when when somebody has screwed with setTimeout but no I.E. maddness
      return cachedSetTimeout(fun, 0);
    } catch (e) {
      try {
        // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
        return cachedSetTimeout.call(null, fun, 0);
      } catch (e) {
        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
        return cachedSetTimeout.call(this, fun, 0);
      }
    }
  }
  function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
      //normal enviroments in sane situations
      return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if (
      (cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) &&
      clearTimeout
    ) {
      cachedClearTimeout = clearTimeout;
      return clearTimeout(marker);
    }
    try {
      // when when somebody has screwed with setTimeout but no I.E. maddness
      return cachedClearTimeout(marker);
    } catch (e) {
      try {
        // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
        return cachedClearTimeout.call(null, marker);
      } catch (e) {
        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
        // Some versions of I.E. have different rules for clearTimeout vs setTimeout
        return cachedClearTimeout.call(this, marker);
      }
    }
  }
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;

  function cleanUpNextTick() {
    if (!draining || !currentQueue) {
      return;
    }
    draining = false;
    if (currentQueue.length) {
      queue = currentQueue.concat(queue);
    } else {
      queueIndex = -1;
    }
    if (queue.length) {
      drainQueue();
    }
  }

  function drainQueue() {
    if (draining) {
      return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      while (++queueIndex < len) {
        if (currentQueue) {
          currentQueue[queueIndex].run();
        }
      }
      queueIndex = -1;
      len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
  }
  function nextTick(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
      runTimeout(drainQueue);
    }
  }
  // v8 likes predictible objects
  function Item(fun, array) {
    this.fun = fun;
    this.array = array;
  }
  Item.prototype.run = function() {
    this.fun.apply(null, this.array);
  };
  var title = 'browser';
  var platform = 'browser';
  var browser = true;
  var env = {};
  var argv = [];
  var version = ''; // empty string to avoid regexp issues
  var versions = {};
  var release = {};
  var config = {};

  function noop() {}

  var on = noop;
  var addListener = noop;
  var once = noop;
  var off = noop;
  var removeListener = noop;
  var removeAllListeners = noop;
  var emit = noop;

  function binding(name) {
    throw new Error('process.binding is not supported');
  }

  function cwd() {
    return '/';
  }
  function chdir(dir) {
    throw new Error('process.chdir is not supported');
  }
  function umask() {
    return 0;
  }

  // from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
  var performance = global$1.performance || {};
  var performanceNow =
    performance.now ||
    performance.mozNow ||
    performance.msNow ||
    performance.oNow ||
    performance.webkitNow ||
    function() {
      return new Date().getTime();
    };

  // generate timestamp or delta
  // see http://nodejs.org/api/process.html#process_process_hrtime
  function hrtime(previousTimestamp) {
    var clocktime = performanceNow.call(performance) * 1e-3;
    var seconds = Math.floor(clocktime);
    var nanoseconds = Math.floor((clocktime % 1) * 1e9);
    if (previousTimestamp) {
      seconds = seconds - previousTimestamp[0];
      nanoseconds = nanoseconds - previousTimestamp[1];
      if (nanoseconds < 0) {
        seconds--;
        nanoseconds += 1e9;
      }
    }
    return [seconds, nanoseconds];
  }

  var startTime = new Date();
  function uptime() {
    var currentTime = new Date();
    var dif = currentTime - startTime;
    return dif / 1000;
  }

  var process = {
    nextTick: nextTick,
    title: title,
    browser: browser,
    env: env,
    argv: argv,
    version: version,
    versions: versions,
    on: on,
    addListener: addListener,
    once: once,
    off: off,
    removeListener: removeListener,
    removeAllListeners: removeAllListeners,
    emit: emit,
    binding: binding,
    cwd: cwd,
    chdir: chdir,
    umask: umask,
    hrtime: hrtime,
    platform: platform,
    release: release,
    config: config,
    uptime: uptime
  };

  var normalizeHeaderName = function normalizeHeaderName(
    headers,
    normalizedName
  ) {
    utils.forEach(headers, function processHeader(value, name) {
      if (
        name !== normalizedName &&
        name.toUpperCase() === normalizedName.toUpperCase()
      ) {
        headers[normalizedName] = value;
        delete headers[name];
      }
    });
  };

  /**
   * Update an Error with the specified config, error code, and response.
   *
   * @param {Error} error The error to update.
   * @param {Object} config The config.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   * @returns {Error} The error.
   */
  var enhanceError = function enhanceError(
    error,
    config,
    code,
    request,
    response
  ) {
    error.config = config;
    if (code) {
      error.code = code;
    }
    error.request = request;
    error.response = response;
    return error;
  };

  /**
   * Create an Error with the specified message, config, error code, request and response.
   *
   * @param {string} message The error message.
   * @param {Object} config The config.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   * @returns {Error} The created error.
   */
  var createError = function createError(
    message,
    config,
    code,
    request,
    response
  ) {
    var error = new Error(message);
    return enhanceError(error, config, code, request, response);
  };

  /**
   * Resolve or reject a Promise based on response status.
   *
   * @param {Function} resolve A function that resolves the promise.
   * @param {Function} reject A function that rejects the promise.
   * @param {object} response The response.
   */
  var settle = function settle(resolve, reject, response) {
    var validateStatus = response.config.validateStatus;
    // Note: status is not exposed by XDomainRequest
    if (
      !response.status ||
      !validateStatus ||
      validateStatus(response.status)
    ) {
      resolve(response);
    } else {
      reject(
        createError(
          'Request failed with status code ' + response.status,
          response.config,
          null,
          response.request,
          response
        )
      );
    }
  };

  function encode(val) {
    return encodeURIComponent(val)
      .replace(/%40/gi, '@')
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      .replace(/%20/g, '+')
      .replace(/%5B/gi, '[')
      .replace(/%5D/gi, ']');
  }

  /**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @returns {string} The formatted url
   */
  var buildURL = function buildURL(url, params, paramsSerializer) {
    /*eslint no-param-reassign:0*/
    if (!params) {
      return url;
    }

    var serializedParams;
    if (paramsSerializer) {
      serializedParams = paramsSerializer(params);
    } else if (utils.isURLSearchParams(params)) {
      serializedParams = params.toString();
    } else {
      var parts = [];

      utils.forEach(params, function serialize(val, key) {
        if (val === null || typeof val === 'undefined') {
          return;
        }

        if (utils.isArray(val)) {
          key = key + '[]';
        } else {
          val = [val];
        }

        utils.forEach(val, function parseValue(v) {
          if (utils.isDate(v)) {
            v = v.toISOString();
          } else if (utils.isObject(v)) {
            v = JSON.stringify(v);
          }
          parts.push(encode(key) + '=' + encode(v));
        });
      });

      serializedParams = parts.join('&');
    }

    if (serializedParams) {
      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }

    return url;
  };

  // Headers whose duplicates are ignored by node
  // c.f. https://nodejs.org/api/http.html#http_message_headers
  var ignoreDuplicateOf = [
    'age',
    'authorization',
    'content-length',
    'content-type',
    'etag',
    'expires',
    'from',
    'host',
    'if-modified-since',
    'if-unmodified-since',
    'last-modified',
    'location',
    'max-forwards',
    'proxy-authorization',
    'referer',
    'retry-after',
    'user-agent'
  ];

  /**
   * Parse headers into an object
   *
   * ```
   * Date: Wed, 27 Aug 2014 08:58:49 GMT
   * Content-Type: application/json
   * Connection: keep-alive
   * Transfer-Encoding: chunked
   * ```
   *
   * @param {String} headers Headers needing to be parsed
   * @returns {Object} Headers parsed into an object
   */
  var parseHeaders = function parseHeaders(headers) {
    var parsed = {};
    var key;
    var val;
    var i;

    if (!headers) {
      return parsed;
    }

    utils.forEach(headers.split('\n'), function parser(line) {
      i = line.indexOf(':');
      key = utils.trim(line.substr(0, i)).toLowerCase();
      val = utils.trim(line.substr(i + 1));

      if (key) {
        if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
          return;
        }
        if (key === 'set-cookie') {
          parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
        } else {
          parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
        }
      }
    });

    return parsed;
  };

  var isURLSameOrigin = utils.isStandardBrowserEnv()
    ? // Standard browser envs have full support of the APIs needed to test
      // whether the request URL is of the same origin as current location.
      (function standardBrowserEnv() {
        var msie = /(msie|trident)/i.test(navigator.userAgent);
        var urlParsingNode = document.createElement('a');
        var originURL;

        /**
         * Parse a URL to discover it's components
         *
         * @param {String} url The URL to be parsed
         * @returns {Object}
         */
        function resolveURL(url) {
          var href = url;

          if (msie) {
            // IE needs attribute set twice to normalize properties
            urlParsingNode.setAttribute('href', href);
            href = urlParsingNode.href;
          }

          urlParsingNode.setAttribute('href', href);

          // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
          return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol
              ? urlParsingNode.protocol.replace(/:$/, '')
              : '',
            host: urlParsingNode.host,
            search: urlParsingNode.search
              ? urlParsingNode.search.replace(/^\?/, '')
              : '',
            hash: urlParsingNode.hash
              ? urlParsingNode.hash.replace(/^#/, '')
              : '',
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname:
              urlParsingNode.pathname.charAt(0) === '/'
                ? urlParsingNode.pathname
                : '/' + urlParsingNode.pathname
          };
        }

        originURL = resolveURL(window.location.href);

        /**
         * Determine if a URL shares the same origin as the current location
         *
         * @param {String} requestURL The URL to test
         * @returns {boolean} True if URL shares the same origin, otherwise false
         */
        return function isURLSameOrigin(requestURL) {
          var parsed = utils.isString(requestURL)
            ? resolveURL(requestURL)
            : requestURL;
          return (
            parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host
          );
        };
      })()
    : // Non standard browser envs (web workers, react-native) lack needed support.
      (function nonStandardBrowserEnv() {
        return function isURLSameOrigin() {
          return true;
        };
      })();

  var cookies = utils.isStandardBrowserEnv()
    ? // Standard browser envs support document.cookie
      (function standardBrowserEnv() {
        return {
          write: function write(name, value, expires, path, domain, secure) {
            var cookie = [];
            cookie.push(name + '=' + encodeURIComponent(value));

            if (utils.isNumber(expires)) {
              cookie.push('expires=' + new Date(expires).toGMTString());
            }

            if (utils.isString(path)) {
              cookie.push('path=' + path);
            }

            if (utils.isString(domain)) {
              cookie.push('domain=' + domain);
            }

            if (secure === true) {
              cookie.push('secure');
            }

            document.cookie = cookie.join('; ');
          },

          read: function read(name) {
            var match = document.cookie.match(
              new RegExp('(^|;\\s*)(' + name + ')=([^;]*)')
            );
            return match ? decodeURIComponent(match[3]) : null;
          },

          remove: function remove(name) {
            this.write(name, '', Date.now() - 86400000);
          }
        };
      })()
    : // Non standard browser env (web workers, react-native) lack needed support.
      (function nonStandardBrowserEnv() {
        return {
          write: function write() {},
          read: function read() {
            return null;
          },
          remove: function remove() {}
        };
      })();

  var xhr = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      var requestData = config.data;
      var requestHeaders = config.headers;

      if (utils.isFormData(requestData)) {
        delete requestHeaders['Content-Type']; // Let the browser set it
      }

      var request = new XMLHttpRequest();

      // HTTP basic authentication
      if (config.auth) {
        var username = config.auth.username || '';
        var password = config.auth.password || '';
        requestHeaders.Authorization =
          'Basic ' + btoa(username + ':' + password);
      }

      request.open(
        config.method.toUpperCase(),
        buildURL(config.url, config.params, config.paramsSerializer),
        true
      );

      // Set the request timeout in MS
      request.timeout = config.timeout;

      // Listen for ready state
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (
          request.status === 0 &&
          !(request.responseURL && request.responseURL.indexOf('file:') === 0)
        ) {
          return;
        }

        // Prepare the response
        var responseHeaders =
          'getAllResponseHeaders' in request
            ? parseHeaders(request.getAllResponseHeaders())
            : null;
        var responseData =
          !config.responseType || config.responseType === 'text'
            ? request.responseText
            : request.response;
        var response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config: config,
          request: request
        };

        settle(resolve, reject, response);

        // Clean up request
        request = null;
      };

      // Handle low level network errors
      request.onerror = function handleError() {
        // Real errors are hidden from us by the browser
        // onerror should only fire if it's a network error
        reject(createError('Network Error', config, null, request));

        // Clean up request
        request = null;
      };

      // Handle timeout
      request.ontimeout = function handleTimeout() {
        reject(
          createError(
            'timeout of ' + config.timeout + 'ms exceeded',
            config,
            'ECONNABORTED',
            request
          )
        );

        // Clean up request
        request = null;
      };

      // Add xsrf header
      // This is only done if running in a standard browser environment.
      // Specifically not if we're in a web worker, or react-native.
      if (utils.isStandardBrowserEnv()) {
        var cookies$1 = cookies;

        // Add xsrf header
        var xsrfValue =
          (config.withCredentials || isURLSameOrigin(config.url)) &&
          config.xsrfCookieName
            ? cookies$1.read(config.xsrfCookieName)
            : undefined;

        if (xsrfValue) {
          requestHeaders[config.xsrfHeaderName] = xsrfValue;
        }
      }

      // Add headers to the request
      if ('setRequestHeader' in request) {
        utils.forEach(requestHeaders, function setRequestHeader(val, key) {
          if (
            typeof requestData === 'undefined' &&
            key.toLowerCase() === 'content-type'
          ) {
            // Remove Content-Type if data is undefined
            delete requestHeaders[key];
          } else {
            // Otherwise add header to the request
            request.setRequestHeader(key, val);
          }
        });
      }

      // Add withCredentials to request if needed
      if (config.withCredentials) {
        request.withCredentials = true;
      }

      // Add responseType to request if needed
      if (config.responseType) {
        try {
          request.responseType = config.responseType;
        } catch (e) {
          // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
          // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
          if (config.responseType !== 'json') {
            throw e;
          }
        }
      }

      // Handle progress if needed
      if (typeof config.onDownloadProgress === 'function') {
        request.addEventListener('progress', config.onDownloadProgress);
      }

      // Not all browsers support upload events
      if (typeof config.onUploadProgress === 'function' && request.upload) {
        request.upload.addEventListener('progress', config.onUploadProgress);
      }

      if (config.cancelToken) {
        // Handle cancellation
        config.cancelToken.promise.then(function onCanceled(cancel) {
          if (!request) {
            return;
          }

          request.abort();
          reject(cancel);
          // Clean up request
          request = null;
        });
      }

      if (requestData === undefined) {
        requestData = null;
      }

      // Send the request
      request.send(requestData);
    });
  };

  var DEFAULT_CONTENT_TYPE = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  function setContentTypeIfUnset(headers, value) {
    if (
      !utils.isUndefined(headers) &&
      utils.isUndefined(headers['Content-Type'])
    ) {
      headers['Content-Type'] = value;
    }
  }

  function getDefaultAdapter() {
    var adapter;
    if (typeof XMLHttpRequest !== 'undefined') {
      // For browsers use XHR adapter
      adapter = xhr;
    } else if (typeof process !== 'undefined') {
      // For node use HTTP adapter
      adapter = xhr;
    }
    return adapter;
  }

  var defaults = {
    adapter: getDefaultAdapter(),

    transformRequest: [
      function transformRequest(data, headers) {
        normalizeHeaderName(headers, 'Content-Type');
        if (
          utils.isFormData(data) ||
          utils.isArrayBuffer(data) ||
          utils.isBuffer(data) ||
          utils.isStream(data) ||
          utils.isFile(data) ||
          utils.isBlob(data)
        ) {
          return data;
        }
        if (utils.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils.isURLSearchParams(data)) {
          setContentTypeIfUnset(
            headers,
            'application/x-www-form-urlencoded;charset=utf-8'
          );
          return data.toString();
        }
        if (utils.isObject(data)) {
          setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
          return JSON.stringify(data);
        }
        return data;
      }
    ],

    transformResponse: [
      function transformResponse(data) {
        /*eslint no-param-reassign:0*/
        if (typeof data === 'string') {
          try {
            data = JSON.parse(data);
          } catch (e) {
            /* Ignore */
          }
        }
        return data;
      }
    ],

    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,

    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',

    maxContentLength: -1,

    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    }
  };

  defaults.headers = {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  };

  utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(
    method
  ) {
    defaults.headers[method] = {};
  });

  utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(
    method
  ) {
    defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
  });

  var defaults_1 = defaults;

  function InterceptorManager() {
    this.handlers = [];
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  InterceptorManager.prototype.use = function use(fulfilled, rejected) {
    this.handlers.push({
      fulfilled: fulfilled,
      rejected: rejected
    });
    return this.handlers.length - 1;
  };

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   */
  InterceptorManager.prototype.eject = function eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  };

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   */
  InterceptorManager.prototype.forEach = function forEach(fn) {
    utils.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  };

  var InterceptorManager_1 = InterceptorManager;

  /**
   * Transform the data for a request or a response
   *
   * @param {Object|String} data The data to be transformed
   * @param {Array} headers The headers for the request or response
   * @param {Array|Function} fns A single function or Array of functions
   * @returns {*} The resulting transformed data
   */
  var transformData = function transformData(data, headers, fns) {
    /*eslint no-param-reassign:0*/
    utils.forEach(fns, function transform(fn) {
      data = fn(data, headers);
    });

    return data;
  };

  var isCancel = function isCancel(value) {
    return !!(value && value.__CANCEL__);
  };

  /**
   * Determines whether the specified URL is absolute
   *
   * @param {string} url The URL to test
   * @returns {boolean} True if the specified URL is absolute, otherwise false
   */
  var isAbsoluteURL = function isAbsoluteURL(url) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
  };

  /**
   * Creates a new URL by combining the specified URLs
   *
   * @param {string} baseURL The base URL
   * @param {string} relativeURL The relative URL
   * @returns {string} The combined URL
   */
  var combineURLs = function combineURLs(baseURL, relativeURL) {
    return relativeURL
      ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
      : baseURL;
  };

  /**
   * Throws a `Cancel` if cancellation has been requested.
   */
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
  }

  /**
   * Dispatch a request to the server using the configured adapter.
   *
   * @param {object} config The config that is to be used for the request
   * @returns {Promise} The Promise to be fulfilled
   */
  var dispatchRequest = function dispatchRequest(config) {
    throwIfCancellationRequested(config);

    // Support baseURL config
    if (config.baseURL && !isAbsoluteURL(config.url)) {
      config.url = combineURLs(config.baseURL, config.url);
    }

    // Ensure headers exist
    config.headers = config.headers || {};

    // Transform request data
    config.data = transformData(
      config.data,
      config.headers,
      config.transformRequest
    );

    // Flatten headers
    config.headers = utils.merge(
      config.headers.common || {},
      config.headers[config.method] || {},
      config.headers || {}
    );

    utils.forEach(
      ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
      function cleanHeaderConfig(method) {
        delete config.headers[method];
      }
    );

    var adapter = config.adapter || defaults_1.adapter;

    return adapter(config).then(
      function onAdapterResolution(response) {
        throwIfCancellationRequested(config);

        // Transform response data
        response.data = transformData(
          response.data,
          response.headers,
          config.transformResponse
        );

        return response;
      },
      function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);

          // Transform response data
          if (reason && reason.response) {
            reason.response.data = transformData(
              reason.response.data,
              reason.response.headers,
              config.transformResponse
            );
          }
        }

        return Promise.reject(reason);
      }
    );
  };

  /**
   * Create a new instance of Axios
   *
   * @param {Object} instanceConfig The default config for the instance
   */
  function Axios(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager_1(),
      response: new InterceptorManager_1()
    };
  }

  /**
   * Dispatch a request
   *
   * @param {Object} config The config specific for this request (merged with this.defaults)
   */
  Axios.prototype.request = function request(config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof config === 'string') {
      config = utils.merge(
        {
          url: arguments[0]
        },
        arguments[1]
      );
    }

    config = utils.merge(defaults_1, { method: 'get' }, this.defaults, config);
    config.method = config.method.toLowerCase();

    // Hook up interceptors middleware
    var chain = [dispatchRequest, undefined];
    var promise = Promise.resolve(config);

    this.interceptors.request.forEach(function unshiftRequestInterceptors(
      interceptor
    ) {
      chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    this.interceptors.response.forEach(function pushResponseInterceptors(
      interceptor
    ) {
      chain.push(interceptor.fulfilled, interceptor.rejected);
    });

    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  };

  // Provide aliases for supported request methods
  utils.forEach(
    ['delete', 'get', 'head', 'options'],
    function forEachMethodNoData(method) {
      /*eslint func-names:0*/
      Axios.prototype[method] = function(url, config) {
        return this.request(
          utils.merge(config || {}, {
            method: method,
            url: url
          })
        );
      };
    }
  );

  utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(
    method
  ) {
    /*eslint func-names:0*/
    Axios.prototype[method] = function(url, data, config) {
      return this.request(
        utils.merge(config || {}, {
          method: method,
          url: url,
          data: data
        })
      );
    };
  });

  var Axios_1 = Axios;

  /**
   * A `Cancel` is an object that is thrown when an operation is canceled.
   *
   * @class
   * @param {string=} message The message.
   */
  function Cancel(message) {
    this.message = message;
  }

  Cancel.prototype.toString = function toString() {
    return 'Cancel' + (this.message ? ': ' + this.message : '');
  };

  Cancel.prototype.__CANCEL__ = true;

  var Cancel_1 = Cancel;

  /**
   * A `CancelToken` is an object that can be used to request cancellation of an operation.
   *
   * @class
   * @param {Function} executor The executor function.
   */
  function CancelToken(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }

    var resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });

    var token = this;
    executor(function cancel(message) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }

      token.reason = new Cancel_1(message);
      resolvePromise(token.reason);
    });
  }

  /**
   * Throws a `Cancel` if cancellation has been requested.
   */
  CancelToken.prototype.throwIfRequested = function throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  };

  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  CancelToken.source = function source() {
    var cancel;
    var token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token: token,
      cancel: cancel
    };
  };

  var CancelToken_1 = CancelToken;

  /**
   * Syntactic sugar for invoking a function and expanding an array for arguments.
   *
   * Common use case would be to use `Function.prototype.apply`.
   *
   *  ```js
   *  function f(x, y, z) {}
   *  var args = [1, 2, 3];
   *  f.apply(null, args);
   *  ```
   *
   * With `spread` this example can be re-written.
   *
   *  ```js
   *  spread(function(x, y, z) {})([1, 2, 3]);
   *  ```
   *
   * @param {Function} callback
   * @returns {Function}
   */
  var spread = function spread(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  };

  /**
   * Create an instance of Axios
   *
   * @param {Object} defaultConfig The default config for the instance
   * @return {Axios} A new instance of Axios
   */
  function createInstance(defaultConfig) {
    var context = new Axios_1(defaultConfig);
    var instance = bind(Axios_1.prototype.request, context);

    // Copy axios.prototype to instance
    utils.extend(instance, Axios_1.prototype, context);

    // Copy context to instance
    utils.extend(instance, context);

    return instance;
  }

  // Create the default instance to be exported
  var axios = createInstance(defaults_1);

  // Expose Axios class to allow class inheritance
  axios.Axios = Axios_1;

  // Factory for creating new instances
  axios.create = function create(instanceConfig) {
    return createInstance(utils.merge(defaults_1, instanceConfig));
  };

  // Expose Cancel & CancelToken
  axios.Cancel = Cancel_1;
  axios.CancelToken = CancelToken_1;
  axios.isCancel = isCancel;

  // Expose all/spread
  axios.all = function all(promises) {
    return Promise.all(promises);
  };
  axios.spread = spread;

  var axios_1 = axios;

  // Allow use of default import syntax in TypeScript
  var default_1 = axios;
  axios_1.default = default_1;

  var axios$1 = axios_1;

  var lookup = [];
  var revLookup = [];
  var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
  var inited = false;
  function init() {
    inited = true;
    var code =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    for (var i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }

    revLookup['-'.charCodeAt(0)] = 62;
    revLookup['_'.charCodeAt(0)] = 63;
  }

  function toByteArray(b64) {
    if (!inited) {
      init();
    }
    var i, j, l, tmp, placeHolders, arr;
    var len = b64.length;

    if (len % 4 > 0) {
      throw new Error('Invalid string. Length must be a multiple of 4');
    }

    // the number of equal signs (place holders)
    // if there are two placeholders, than the two characters before it
    // represent one byte
    // if there is only one, then the three characters before it represent 2 bytes
    // this is just a cheap hack to not do indexOf twice
    placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

    // base64 is 4/3 + up to two characters of the original data
    arr = new Arr((len * 3) / 4 - placeHolders);

    // if there are placeholders, only get up to the last complete 4 chars
    l = placeHolders > 0 ? len - 4 : len;

    var L = 0;

    for (i = 0, j = 0; i < l; i += 4, j += 3) {
      tmp =
        (revLookup[b64.charCodeAt(i)] << 18) |
        (revLookup[b64.charCodeAt(i + 1)] << 12) |
        (revLookup[b64.charCodeAt(i + 2)] << 6) |
        revLookup[b64.charCodeAt(i + 3)];
      arr[L++] = (tmp >> 16) & 0xff;
      arr[L++] = (tmp >> 8) & 0xff;
      arr[L++] = tmp & 0xff;
    }

    if (placeHolders === 2) {
      tmp =
        (revLookup[b64.charCodeAt(i)] << 2) |
        (revLookup[b64.charCodeAt(i + 1)] >> 4);
      arr[L++] = tmp & 0xff;
    } else if (placeHolders === 1) {
      tmp =
        (revLookup[b64.charCodeAt(i)] << 10) |
        (revLookup[b64.charCodeAt(i + 1)] << 4) |
        (revLookup[b64.charCodeAt(i + 2)] >> 2);
      arr[L++] = (tmp >> 8) & 0xff;
      arr[L++] = tmp & 0xff;
    }

    return arr;
  }

  function tripletToBase64(num) {
    return (
      lookup[(num >> 18) & 0x3f] +
      lookup[(num >> 12) & 0x3f] +
      lookup[(num >> 6) & 0x3f] +
      lookup[num & 0x3f]
    );
  }

  function encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for (var i = start; i < end; i += 3) {
      tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
      output.push(tripletToBase64(tmp));
    }
    return output.join('');
  }

  function fromByteArray(uint8) {
    if (!inited) {
      init();
    }
    var tmp;
    var len = uint8.length;
    var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
    var output = '';
    var parts = [];
    var maxChunkLength = 16383; // must be multiple of 3

    // go through the array every three bytes, we'll deal with trailing stuff later
    for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
      parts.push(
        encodeChunk(
          uint8,
          i,
          i + maxChunkLength > len2 ? len2 : i + maxChunkLength
        )
      );
    }

    // pad the end with zeros, but make sure to not forget the extra bytes
    if (extraBytes === 1) {
      tmp = uint8[len - 1];
      output += lookup[tmp >> 2];
      output += lookup[(tmp << 4) & 0x3f];
      output += '==';
    } else if (extraBytes === 2) {
      tmp = (uint8[len - 2] << 8) + uint8[len - 1];
      output += lookup[tmp >> 10];
      output += lookup[(tmp >> 4) & 0x3f];
      output += lookup[(tmp << 2) & 0x3f];
      output += '=';
    }

    parts.push(output);

    return parts.join('');
  }

  function read(buffer, offset, isLE, mLen, nBytes) {
    var e, m;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i = isLE ? nBytes - 1 : 0;
    var d = isLE ? -1 : 1;
    var s = buffer[offset + i];

    i += d;

    e = s & ((1 << -nBits) - 1);
    s >>= -nBits;
    nBits += eLen;
    for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

    m = e & ((1 << -nBits) - 1);
    e >>= -nBits;
    nBits += mLen;
    for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

    if (e === 0) {
      e = 1 - eBias;
    } else if (e === eMax) {
      return m ? NaN : (s ? -1 : 1) * Infinity;
    } else {
      m = m + Math.pow(2, mLen);
      e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
  }

  function write(buffer, value, offset, isLE, mLen, nBytes) {
    var e, m, c;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
    var i = isLE ? 0 : nBytes - 1;
    var d = isLE ? 1 : -1;
    var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

    value = Math.abs(value);

    if (isNaN(value) || value === Infinity) {
      m = isNaN(value) ? 1 : 0;
      e = eMax;
    } else {
      e = Math.floor(Math.log(value) / Math.LN2);
      if (value * (c = Math.pow(2, -e)) < 1) {
        e--;
        c *= 2;
      }
      if (e + eBias >= 1) {
        value += rt / c;
      } else {
        value += rt * Math.pow(2, 1 - eBias);
      }
      if (value * c >= 2) {
        e++;
        c /= 2;
      }

      if (e + eBias >= eMax) {
        m = 0;
        e = eMax;
      } else if (e + eBias >= 1) {
        m = (value * c - 1) * Math.pow(2, mLen);
        e = e + eBias;
      } else {
        m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
        e = 0;
      }
    }

    for (
      ;
      mLen >= 8;
      buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8
    ) {}

    e = (e << mLen) | m;
    eLen += mLen;
    for (
      ;
      eLen > 0;
      buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8
    ) {}

    buffer[offset + i - d] |= s * 128;
  }

  var toString$1 = {}.toString;

  var isArray$1 =
    Array.isArray ||
    function(arr) {
      return toString$1.call(arr) == '[object Array]';
    };

  var INSPECT_MAX_BYTES = 50;

  /**
   * If `Buffer.TYPED_ARRAY_SUPPORT`:
   *   === true    Use Uint8Array implementation (fastest)
   *   === false   Use Object implementation (most compatible, even IE6)
   *
   * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
   * Opera 11.6+, iOS 4.2+.
   *
   * Due to various browser bugs, sometimes the Object implementation will be used even
   * when the browser supports typed arrays.
   *
   * Note:
   *
   *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
   *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
   *
   *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
   *
   *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
   *     incorrect length in some situations.

   * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
   * get the Object implementation, which is slower but behaves correctly.
   */
  Buffer.TYPED_ARRAY_SUPPORT =
    global$1.TYPED_ARRAY_SUPPORT !== undefined
      ? global$1.TYPED_ARRAY_SUPPORT
      : true;

  function kMaxLength() {
    return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
  }

  function createBuffer(that, length) {
    if (kMaxLength() < length) {
      throw new RangeError('Invalid typed array length');
    }
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      // Return an augmented `Uint8Array` instance, for best performance
      that = new Uint8Array(length);
      that.__proto__ = Buffer.prototype;
    } else {
      // Fallback: Return an object instance of the Buffer class
      if (that === null) {
        that = new Buffer(length);
      }
      that.length = length;
    }

    return that;
  }

  /**
   * The Buffer constructor returns instances of `Uint8Array` that have their
   * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
   * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
   * and the `Uint8Array` methods. Square bracket notation works as expected -- it
   * returns a single octet.
   *
   * The `Uint8Array` prototype remains unmodified.
   */

  function Buffer(arg, encodingOrOffset, length) {
    if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
      return new Buffer(arg, encodingOrOffset, length);
    }

    // Common case.
    if (typeof arg === 'number') {
      if (typeof encodingOrOffset === 'string') {
        throw new Error(
          'If encoding is specified then the first argument must be a string'
        );
      }
      return allocUnsafe(this, arg);
    }
    return from(this, arg, encodingOrOffset, length);
  }

  Buffer.poolSize = 8192; // not used by this implementation

  // TODO: Legacy, not needed anymore. Remove in next major version.
  Buffer._augment = function(arr) {
    arr.__proto__ = Buffer.prototype;
    return arr;
  };

  function from(that, value, encodingOrOffset, length) {
    if (typeof value === 'number') {
      throw new TypeError('"value" argument must not be a number');
    }

    if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
      return fromArrayBuffer(that, value, encodingOrOffset, length);
    }

    if (typeof value === 'string') {
      return fromString(that, value, encodingOrOffset);
    }

    return fromObject(that, value);
  }

  /**
   * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
   * if value is a number.
   * Buffer.from(str[, encoding])
   * Buffer.from(array)
   * Buffer.from(buffer)
   * Buffer.from(arrayBuffer[, byteOffset[, length]])
   **/
  Buffer.from = function(value, encodingOrOffset, length) {
    return from(null, value, encodingOrOffset, length);
  };

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    Buffer.prototype.__proto__ = Uint8Array.prototype;
    Buffer.__proto__ = Uint8Array;
  }

  function assertSize(size) {
    if (typeof size !== 'number') {
      throw new TypeError('"size" argument must be a number');
    } else if (size < 0) {
      throw new RangeError('"size" argument must not be negative');
    }
  }

  function alloc(that, size, fill, encoding) {
    assertSize(size);
    if (size <= 0) {
      return createBuffer(that, size);
    }
    if (fill !== undefined) {
      // Only pay attention to encoding if it's a string. This
      // prevents accidentally sending in a number that would
      // be interpretted as a start offset.
      return typeof encoding === 'string'
        ? createBuffer(that, size).fill(fill, encoding)
        : createBuffer(that, size).fill(fill);
    }
    return createBuffer(that, size);
  }

  /**
   * Creates a new filled Buffer instance.
   * alloc(size[, fill[, encoding]])
   **/
  Buffer.alloc = function(size, fill, encoding) {
    return alloc(null, size, fill, encoding);
  };

  function allocUnsafe(that, size) {
    assertSize(size);
    that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
    if (!Buffer.TYPED_ARRAY_SUPPORT) {
      for (var i = 0; i < size; ++i) {
        that[i] = 0;
      }
    }
    return that;
  }

  /**
   * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
   * */
  Buffer.allocUnsafe = function(size) {
    return allocUnsafe(null, size);
  };
  /**
   * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
   */
  Buffer.allocUnsafeSlow = function(size) {
    return allocUnsafe(null, size);
  };

  function fromString(that, string, encoding) {
    if (typeof encoding !== 'string' || encoding === '') {
      encoding = 'utf8';
    }

    if (!Buffer.isEncoding(encoding)) {
      throw new TypeError('"encoding" must be a valid string encoding');
    }

    var length = byteLength(string, encoding) | 0;
    that = createBuffer(that, length);

    var actual = that.write(string, encoding);

    if (actual !== length) {
      // Writing a hex string, for example, that contains invalid characters will
      // cause everything after the first invalid character to be ignored. (e.g.
      // 'abxxcd' will be treated as 'ab')
      that = that.slice(0, actual);
    }

    return that;
  }

  function fromArrayLike(that, array) {
    var length = array.length < 0 ? 0 : checked(array.length) | 0;
    that = createBuffer(that, length);
    for (var i = 0; i < length; i += 1) {
      that[i] = array[i] & 255;
    }
    return that;
  }

  function fromArrayBuffer(that, array, byteOffset, length) {
    array.byteLength; // this throws if `array` is not a valid ArrayBuffer

    if (byteOffset < 0 || array.byteLength < byteOffset) {
      throw new RangeError("'offset' is out of bounds");
    }

    if (array.byteLength < byteOffset + (length || 0)) {
      throw new RangeError("'length' is out of bounds");
    }

    if (byteOffset === undefined && length === undefined) {
      array = new Uint8Array(array);
    } else if (length === undefined) {
      array = new Uint8Array(array, byteOffset);
    } else {
      array = new Uint8Array(array, byteOffset, length);
    }

    if (Buffer.TYPED_ARRAY_SUPPORT) {
      // Return an augmented `Uint8Array` instance, for best performance
      that = array;
      that.__proto__ = Buffer.prototype;
    } else {
      // Fallback: Return an object instance of the Buffer class
      that = fromArrayLike(that, array);
    }
    return that;
  }

  function fromObject(that, obj) {
    if (internalIsBuffer(obj)) {
      var len = checked(obj.length) | 0;
      that = createBuffer(that, len);

      if (that.length === 0) {
        return that;
      }

      obj.copy(that, 0, 0, len);
      return that;
    }

    if (obj) {
      if (
        (typeof ArrayBuffer !== 'undefined' &&
          obj.buffer instanceof ArrayBuffer) ||
        'length' in obj
      ) {
        if (typeof obj.length !== 'number' || isnan(obj.length)) {
          return createBuffer(that, 0);
        }
        return fromArrayLike(that, obj);
      }

      if (obj.type === 'Buffer' && isArray$1(obj.data)) {
        return fromArrayLike(that, obj.data);
      }
    }

    throw new TypeError(
      'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.'
    );
  }

  function checked(length) {
    // Note: cannot use `length < kMaxLength()` here because that fails when
    // length is NaN (which is otherwise coerced to zero.)
    if (length >= kMaxLength()) {
      throw new RangeError(
        'Attempt to allocate Buffer larger than maximum ' +
          'size: 0x' +
          kMaxLength().toString(16) +
          ' bytes'
      );
    }
    return length | 0;
  }
  Buffer.isBuffer = isBuffer$1;
  function internalIsBuffer(b) {
    return !!(b != null && b._isBuffer);
  }

  Buffer.compare = function compare(a, b) {
    if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
      throw new TypeError('Arguments must be Buffers');
    }

    if (a === b) return 0;

    var x = a.length;
    var y = b.length;

    for (var i = 0, len = Math.min(x, y); i < len; ++i) {
      if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break;
      }
    }

    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
  };

  Buffer.isEncoding = function isEncoding(encoding) {
    switch (String(encoding).toLowerCase()) {
      case 'hex':
      case 'utf8':
      case 'utf-8':
      case 'ascii':
      case 'latin1':
      case 'binary':
      case 'base64':
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return true;
      default:
        return false;
    }
  };

  Buffer.concat = function concat(list, length) {
    if (!isArray$1(list)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }

    if (list.length === 0) {
      return Buffer.alloc(0);
    }

    var i;
    if (length === undefined) {
      length = 0;
      for (i = 0; i < list.length; ++i) {
        length += list[i].length;
      }
    }

    var buffer = Buffer.allocUnsafe(length);
    var pos = 0;
    for (i = 0; i < list.length; ++i) {
      var buf = list[i];
      if (!internalIsBuffer(buf)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      buf.copy(buffer, pos);
      pos += buf.length;
    }
    return buffer;
  };

  function byteLength(string, encoding) {
    if (internalIsBuffer(string)) {
      return string.length;
    }
    if (
      typeof ArrayBuffer !== 'undefined' &&
      typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)
    ) {
      return string.byteLength;
    }
    if (typeof string !== 'string') {
      string = '' + string;
    }

    var len = string.length;
    if (len === 0) return 0;

    // Use a for loop to avoid recursion
    var loweredCase = false;
    for (;;) {
      switch (encoding) {
        case 'ascii':
        case 'latin1':
        case 'binary':
          return len;
        case 'utf8':
        case 'utf-8':
        case undefined:
          return utf8ToBytes(string).length;
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return len * 2;
        case 'hex':
          return len >>> 1;
        case 'base64':
          return base64ToBytes(string).length;
        default:
          if (loweredCase) return utf8ToBytes(string).length; // assume utf8
          encoding = ('' + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer.byteLength = byteLength;

  function slowToString(encoding, start, end) {
    var loweredCase = false;

    // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
    // property of a typed array.

    // This behaves neither like String nor Uint8Array in that we set start/end
    // to their upper/lower bounds if the value passed is out of range.
    // undefined is handled specially as per ECMA-262 6th Edition,
    // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
    if (start === undefined || start < 0) {
      start = 0;
    }
    // Return early if start > this.length. Done here to prevent potential uint32
    // coercion fail below.
    if (start > this.length) {
      return '';
    }

    if (end === undefined || end > this.length) {
      end = this.length;
    }

    if (end <= 0) {
      return '';
    }

    // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
    end >>>= 0;
    start >>>= 0;

    if (end <= start) {
      return '';
    }

    if (!encoding) encoding = 'utf8';

    while (true) {
      switch (encoding) {
        case 'hex':
          return hexSlice(this, start, end);

        case 'utf8':
        case 'utf-8':
          return utf8Slice(this, start, end);

        case 'ascii':
          return asciiSlice(this, start, end);

        case 'latin1':
        case 'binary':
          return latin1Slice(this, start, end);

        case 'base64':
          return base64Slice(this, start, end);

        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return utf16leSlice(this, start, end);

        default:
          if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
          encoding = (encoding + '').toLowerCase();
          loweredCase = true;
      }
    }
  }

  // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
  // Buffer instances.
  Buffer.prototype._isBuffer = true;

  function swap(b, n, m) {
    var i = b[n];
    b[n] = b[m];
    b[m] = i;
  }

  Buffer.prototype.swap16 = function swap16() {
    var len = this.length;
    if (len % 2 !== 0) {
      throw new RangeError('Buffer size must be a multiple of 16-bits');
    }
    for (var i = 0; i < len; i += 2) {
      swap(this, i, i + 1);
    }
    return this;
  };

  Buffer.prototype.swap32 = function swap32() {
    var len = this.length;
    if (len % 4 !== 0) {
      throw new RangeError('Buffer size must be a multiple of 32-bits');
    }
    for (var i = 0; i < len; i += 4) {
      swap(this, i, i + 3);
      swap(this, i + 1, i + 2);
    }
    return this;
  };

  Buffer.prototype.swap64 = function swap64() {
    var len = this.length;
    if (len % 8 !== 0) {
      throw new RangeError('Buffer size must be a multiple of 64-bits');
    }
    for (var i = 0; i < len; i += 8) {
      swap(this, i, i + 7);
      swap(this, i + 1, i + 6);
      swap(this, i + 2, i + 5);
      swap(this, i + 3, i + 4);
    }
    return this;
  };

  Buffer.prototype.toString = function toString() {
    var length = this.length | 0;
    if (length === 0) return '';
    if (arguments.length === 0) return utf8Slice(this, 0, length);
    return slowToString.apply(this, arguments);
  };

  Buffer.prototype.equals = function equals(b) {
    if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer');
    if (this === b) return true;
    return Buffer.compare(this, b) === 0;
  };

  Buffer.prototype.inspect = function inspect() {
    var str = '';
    var max = INSPECT_MAX_BYTES;
    if (this.length > 0) {
      str = this.toString('hex', 0, max)
        .match(/.{2}/g)
        .join(' ');
      if (this.length > max) str += ' ... ';
    }
    return '<Buffer ' + str + '>';
  };

  Buffer.prototype.compare = function compare(
    target,
    start,
    end,
    thisStart,
    thisEnd
  ) {
    if (!internalIsBuffer(target)) {
      throw new TypeError('Argument must be a Buffer');
    }

    if (start === undefined) {
      start = 0;
    }
    if (end === undefined) {
      end = target ? target.length : 0;
    }
    if (thisStart === undefined) {
      thisStart = 0;
    }
    if (thisEnd === undefined) {
      thisEnd = this.length;
    }

    if (
      start < 0 ||
      end > target.length ||
      thisStart < 0 ||
      thisEnd > this.length
    ) {
      throw new RangeError('out of range index');
    }

    if (thisStart >= thisEnd && start >= end) {
      return 0;
    }
    if (thisStart >= thisEnd) {
      return -1;
    }
    if (start >= end) {
      return 1;
    }

    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;

    if (this === target) return 0;

    var x = thisEnd - thisStart;
    var y = end - start;
    var len = Math.min(x, y);

    var thisCopy = this.slice(thisStart, thisEnd);
    var targetCopy = target.slice(start, end);

    for (var i = 0; i < len; ++i) {
      if (thisCopy[i] !== targetCopy[i]) {
        x = thisCopy[i];
        y = targetCopy[i];
        break;
      }
    }

    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
  };

  // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
  // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
  //
  // Arguments:
  // - buffer - a Buffer to search
  // - val - a string, Buffer, or number
  // - byteOffset - an index into `buffer`; will be clamped to an int32
  // - encoding - an optional encoding, relevant is val is a string
  // - dir - true for indexOf, false for lastIndexOf
  function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
    // Empty buffer means no match
    if (buffer.length === 0) return -1;

    // Normalize byteOffset
    if (typeof byteOffset === 'string') {
      encoding = byteOffset;
      byteOffset = 0;
    } else if (byteOffset > 0x7fffffff) {
      byteOffset = 0x7fffffff;
    } else if (byteOffset < -0x80000000) {
      byteOffset = -0x80000000;
    }
    byteOffset = +byteOffset; // Coerce to Number.
    if (isNaN(byteOffset)) {
      // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
      byteOffset = dir ? 0 : buffer.length - 1;
    }

    // Normalize byteOffset: negative offsets start from the end of the buffer
    if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
    if (byteOffset >= buffer.length) {
      if (dir) return -1;
      else byteOffset = buffer.length - 1;
    } else if (byteOffset < 0) {
      if (dir) byteOffset = 0;
      else return -1;
    }

    // Normalize val
    if (typeof val === 'string') {
      val = Buffer.from(val, encoding);
    }

    // Finally, search either indexOf (if dir is true) or lastIndexOf
    if (internalIsBuffer(val)) {
      // Special case: looking for empty string/buffer always fails
      if (val.length === 0) {
        return -1;
      }
      return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
    } else if (typeof val === 'number') {
      val = val & 0xff; // Search for a byte value [0-255]
      if (
        Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function'
      ) {
        if (dir) {
          return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
        } else {
          return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
        }
      }
      return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
    }

    throw new TypeError('val must be string, number or Buffer');
  }

  function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
    var indexSize = 1;
    var arrLength = arr.length;
    var valLength = val.length;

    if (encoding !== undefined) {
      encoding = String(encoding).toLowerCase();
      if (
        encoding === 'ucs2' ||
        encoding === 'ucs-2' ||
        encoding === 'utf16le' ||
        encoding === 'utf-16le'
      ) {
        if (arr.length < 2 || val.length < 2) {
          return -1;
        }
        indexSize = 2;
        arrLength /= 2;
        valLength /= 2;
        byteOffset /= 2;
      }
    }

    function read(buf, i) {
      if (indexSize === 1) {
        return buf[i];
      } else {
        return buf.readUInt16BE(i * indexSize);
      }
    }

    var i;
    if (dir) {
      var foundIndex = -1;
      for (i = byteOffset; i < arrLength; i++) {
        if (
          read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)
        ) {
          if (foundIndex === -1) foundIndex = i;
          if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
        } else {
          if (foundIndex !== -1) i -= i - foundIndex;
          foundIndex = -1;
        }
      }
    } else {
      if (byteOffset + valLength > arrLength)
        byteOffset = arrLength - valLength;
      for (i = byteOffset; i >= 0; i--) {
        var found = true;
        for (var j = 0; j < valLength; j++) {
          if (read(arr, i + j) !== read(val, j)) {
            found = false;
            break;
          }
        }
        if (found) return i;
      }
    }

    return -1;
  }

  Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1;
  };

  Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
  };

  Buffer.prototype.lastIndexOf = function lastIndexOf(
    val,
    byteOffset,
    encoding
  ) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
  };

  function hexWrite(buf, string, offset, length) {
    offset = Number(offset) || 0;
    var remaining = buf.length - offset;
    if (!length) {
      length = remaining;
    } else {
      length = Number(length);
      if (length > remaining) {
        length = remaining;
      }
    }

    // must be an even number of digits
    var strLen = string.length;
    if (strLen % 2 !== 0) throw new TypeError('Invalid hex string');

    if (length > strLen / 2) {
      length = strLen / 2;
    }
    for (var i = 0; i < length; ++i) {
      var parsed = parseInt(string.substr(i * 2, 2), 16);
      if (isNaN(parsed)) return i;
      buf[offset + i] = parsed;
    }
    return i;
  }

  function utf8Write(buf, string, offset, length) {
    return blitBuffer(
      utf8ToBytes(string, buf.length - offset),
      buf,
      offset,
      length
    );
  }

  function asciiWrite(buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length);
  }

  function latin1Write(buf, string, offset, length) {
    return asciiWrite(buf, string, offset, length);
  }

  function base64Write(buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length);
  }

  function ucs2Write(buf, string, offset, length) {
    return blitBuffer(
      utf16leToBytes(string, buf.length - offset),
      buf,
      offset,
      length
    );
  }

  Buffer.prototype.write = function write(string, offset, length, encoding) {
    // Buffer#write(string)
    if (offset === undefined) {
      encoding = 'utf8';
      length = this.length;
      offset = 0;
      // Buffer#write(string, encoding)
    } else if (length === undefined && typeof offset === 'string') {
      encoding = offset;
      length = this.length;
      offset = 0;
      // Buffer#write(string, offset[, length][, encoding])
    } else if (isFinite(offset)) {
      offset = offset | 0;
      if (isFinite(length)) {
        length = length | 0;
        if (encoding === undefined) encoding = 'utf8';
      } else {
        encoding = length;
        length = undefined;
      }
      // legacy write(string, encoding, offset, length) - remove in v0.13
    } else {
      throw new Error(
        'Buffer.write(string, encoding, offset[, length]) is no longer supported'
      );
    }

    var remaining = this.length - offset;
    if (length === undefined || length > remaining) length = remaining;

    if (
      (string.length > 0 && (length < 0 || offset < 0)) ||
      offset > this.length
    ) {
      throw new RangeError('Attempt to write outside buffer bounds');
    }

    if (!encoding) encoding = 'utf8';

    var loweredCase = false;
    for (;;) {
      switch (encoding) {
        case 'hex':
          return hexWrite(this, string, offset, length);

        case 'utf8':
        case 'utf-8':
          return utf8Write(this, string, offset, length);

        case 'ascii':
          return asciiWrite(this, string, offset, length);

        case 'latin1':
        case 'binary':
          return latin1Write(this, string, offset, length);

        case 'base64':
          // Warning: maxLength not taken into account in base64Write
          return base64Write(this, string, offset, length);

        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return ucs2Write(this, string, offset, length);

        default:
          if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
          encoding = ('' + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  };

  Buffer.prototype.toJSON = function toJSON() {
    return {
      type: 'Buffer',
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };

  function base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) {
      return fromByteArray(buf);
    } else {
      return fromByteArray(buf.slice(start, end));
    }
  }

  function utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    var res = [];

    var i = start;
    while (i < end) {
      var firstByte = buf[i];
      var codePoint = null;
      var bytesPerSequence =
        firstByte > 0xef ? 4 : firstByte > 0xdf ? 3 : firstByte > 0xbf ? 2 : 1;

      if (i + bytesPerSequence <= end) {
        var secondByte, thirdByte, fourthByte, tempCodePoint;

        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 0x80) {
              codePoint = firstByte;
            }
            break;
          case 2:
            secondByte = buf[i + 1];
            if ((secondByte & 0xc0) === 0x80) {
              tempCodePoint = ((firstByte & 0x1f) << 0x6) | (secondByte & 0x3f);
              if (tempCodePoint > 0x7f) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 3:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            if ((secondByte & 0xc0) === 0x80 && (thirdByte & 0xc0) === 0x80) {
              tempCodePoint =
                ((firstByte & 0xf) << 0xc) |
                ((secondByte & 0x3f) << 0x6) |
                (thirdByte & 0x3f);
              if (
                tempCodePoint > 0x7ff &&
                (tempCodePoint < 0xd800 || tempCodePoint > 0xdfff)
              ) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 4:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            fourthByte = buf[i + 3];
            if (
              (secondByte & 0xc0) === 0x80 &&
              (thirdByte & 0xc0) === 0x80 &&
              (fourthByte & 0xc0) === 0x80
            ) {
              tempCodePoint =
                ((firstByte & 0xf) << 0x12) |
                ((secondByte & 0x3f) << 0xc) |
                ((thirdByte & 0x3f) << 0x6) |
                (fourthByte & 0x3f);
              if (tempCodePoint > 0xffff && tempCodePoint < 0x110000) {
                codePoint = tempCodePoint;
              }
            }
        }
      }

      if (codePoint === null) {
        // we did not generate a valid codePoint so insert a
        // replacement char (U+FFFD) and advance only 1 byte
        codePoint = 0xfffd;
        bytesPerSequence = 1;
      } else if (codePoint > 0xffff) {
        // encode to utf16 (surrogate pair dance)
        codePoint -= 0x10000;
        res.push(((codePoint >>> 10) & 0x3ff) | 0xd800);
        codePoint = 0xdc00 | (codePoint & 0x3ff);
      }

      res.push(codePoint);
      i += bytesPerSequence;
    }

    return decodeCodePointsArray(res);
  }

  // Based on http://stackoverflow.com/a/22747272/680742, the browser with
  // the lowest limit is Chrome, with 0x10000 args.
  // We go 1 magnitude less, for safety
  var MAX_ARGUMENTS_LENGTH = 0x1000;

  function decodeCodePointsArray(codePoints) {
    var len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) {
      return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
    }

    // Decode in chunks to avoid "call stack size exceeded".
    var res = '';
    var i = 0;
    while (i < len) {
      res += String.fromCharCode.apply(
        String,
        codePoints.slice(i, (i += MAX_ARGUMENTS_LENGTH))
      );
    }
    return res;
  }

  function asciiSlice(buf, start, end) {
    var ret = '';
    end = Math.min(buf.length, end);

    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i] & 0x7f);
    }
    return ret;
  }

  function latin1Slice(buf, start, end) {
    var ret = '';
    end = Math.min(buf.length, end);

    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i]);
    }
    return ret;
  }

  function hexSlice(buf, start, end) {
    var len = buf.length;

    if (!start || start < 0) start = 0;
    if (!end || end < 0 || end > len) end = len;

    var out = '';
    for (var i = start; i < end; ++i) {
      out += toHex(buf[i]);
    }
    return out;
  }

  function utf16leSlice(buf, start, end) {
    var bytes = buf.slice(start, end);
    var res = '';
    for (var i = 0; i < bytes.length; i += 2) {
      res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    }
    return res;
  }

  Buffer.prototype.slice = function slice(start, end) {
    var len = this.length;
    start = ~~start;
    end = end === undefined ? len : ~~end;

    if (start < 0) {
      start += len;
      if (start < 0) start = 0;
    } else if (start > len) {
      start = len;
    }

    if (end < 0) {
      end += len;
      if (end < 0) end = 0;
    } else if (end > len) {
      end = len;
    }

    if (end < start) end = start;

    var newBuf;
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      newBuf = this.subarray(start, end);
      newBuf.__proto__ = Buffer.prototype;
    } else {
      var sliceLen = end - start;
      newBuf = new Buffer(sliceLen, undefined);
      for (var i = 0; i < sliceLen; ++i) {
        newBuf[i] = this[i + start];
      }
    }

    return newBuf;
  };

  /*
   * Need to make sure that buffer isn't trying to write out of bounds.
   */
  function checkOffset(offset, ext, length) {
    if (offset % 1 !== 0 || offset < 0)
      throw new RangeError('offset is not uint');
    if (offset + ext > length)
      throw new RangeError('Trying to access beyond buffer length');
  }

  Buffer.prototype.readUIntLE = function readUIntLE(
    offset,
    byteLength,
    noAssert
  ) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);

    var val = this[offset];
    var mul = 1;
    var i = 0;
    while (++i < byteLength && (mul *= 0x100)) {
      val += this[offset + i] * mul;
    }

    return val;
  };

  Buffer.prototype.readUIntBE = function readUIntBE(
    offset,
    byteLength,
    noAssert
  ) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) {
      checkOffset(offset, byteLength, this.length);
    }

    var val = this[offset + --byteLength];
    var mul = 1;
    while (byteLength > 0 && (mul *= 0x100)) {
      val += this[offset + --byteLength] * mul;
    }

    return val;
  };

  Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 1, this.length);
    return this[offset];
  };

  Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] | (this[offset + 1] << 8);
  };

  Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    return (this[offset] << 8) | this[offset + 1];
  };

  Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);

    return (
      (this[offset] | (this[offset + 1] << 8) | (this[offset + 2] << 16)) +
      this[offset + 3] * 0x1000000
    );
  };

  Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);

    return (
      this[offset] * 0x1000000 +
      ((this[offset + 1] << 16) | (this[offset + 2] << 8) | this[offset + 3])
    );
  };

  Buffer.prototype.readIntLE = function readIntLE(
    offset,
    byteLength,
    noAssert
  ) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);

    var val = this[offset];
    var mul = 1;
    var i = 0;
    while (++i < byteLength && (mul *= 0x100)) {
      val += this[offset + i] * mul;
    }
    mul *= 0x80;

    if (val >= mul) val -= Math.pow(2, 8 * byteLength);

    return val;
  };

  Buffer.prototype.readIntBE = function readIntBE(
    offset,
    byteLength,
    noAssert
  ) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);

    var i = byteLength;
    var mul = 1;
    var val = this[offset + --i];
    while (i > 0 && (mul *= 0x100)) {
      val += this[offset + --i] * mul;
    }
    mul *= 0x80;

    if (val >= mul) val -= Math.pow(2, 8 * byteLength);

    return val;
  };

  Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 1, this.length);
    if (!(this[offset] & 0x80)) return this[offset];
    return (0xff - this[offset] + 1) * -1;
  };

  Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    var val = this[offset] | (this[offset + 1] << 8);
    return val & 0x8000 ? val | 0xffff0000 : val;
  };

  Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    var val = this[offset + 1] | (this[offset] << 8);
    return val & 0x8000 ? val | 0xffff0000 : val;
  };

  Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);

    return (
      this[offset] |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16) |
      (this[offset + 3] << 24)
    );
  };

  Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);

    return (
      (this[offset] << 24) |
      (this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      this[offset + 3]
    );
  };

  Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);
    return read(this, offset, true, 23, 4);
  };

  Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);
    return read(this, offset, false, 23, 4);
  };

  Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 8, this.length);
    return read(this, offset, true, 52, 8);
  };

  Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 8, this.length);
    return read(this, offset, false, 52, 8);
  };

  function checkInt(buf, value, offset, ext, max, min) {
    if (!internalIsBuffer(buf))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (value > max || value < min)
      throw new RangeError('"value" argument is out of bounds');
    if (offset + ext > buf.length) throw new RangeError('Index out of range');
  }

  Buffer.prototype.writeUIntLE = function writeUIntLE(
    value,
    offset,
    byteLength,
    noAssert
  ) {
    value = +value;
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) {
      var maxBytes = Math.pow(2, 8 * byteLength) - 1;
      checkInt(this, value, offset, byteLength, maxBytes, 0);
    }

    var mul = 1;
    var i = 0;
    this[offset] = value & 0xff;
    while (++i < byteLength && (mul *= 0x100)) {
      this[offset + i] = (value / mul) & 0xff;
    }

    return offset + byteLength;
  };

  Buffer.prototype.writeUIntBE = function writeUIntBE(
    value,
    offset,
    byteLength,
    noAssert
  ) {
    value = +value;
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) {
      var maxBytes = Math.pow(2, 8 * byteLength) - 1;
      checkInt(this, value, offset, byteLength, maxBytes, 0);
    }

    var i = byteLength - 1;
    var mul = 1;
    this[offset + i] = value & 0xff;
    while (--i >= 0 && (mul *= 0x100)) {
      this[offset + i] = (value / mul) & 0xff;
    }

    return offset + byteLength;
  };

  Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
    if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
    this[offset] = value & 0xff;
    return offset + 1;
  };

  function objectWriteUInt16(buf, value, offset, littleEndian) {
    if (value < 0) value = 0xffff + value + 1;
    for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
      buf[offset + i] =
        (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
        ((littleEndian ? i : 1 - i) * 8);
    }
  }

  Buffer.prototype.writeUInt16LE = function writeUInt16LE(
    value,
    offset,
    noAssert
  ) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = value & 0xff;
      this[offset + 1] = value >>> 8;
    } else {
      objectWriteUInt16(this, value, offset, true);
    }
    return offset + 2;
  };

  Buffer.prototype.writeUInt16BE = function writeUInt16BE(
    value,
    offset,
    noAssert
  ) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = value >>> 8;
      this[offset + 1] = value & 0xff;
    } else {
      objectWriteUInt16(this, value, offset, false);
    }
    return offset + 2;
  };

  function objectWriteUInt32(buf, value, offset, littleEndian) {
    if (value < 0) value = 0xffffffff + value + 1;
    for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
      buf[offset + i] = (value >>> ((littleEndian ? i : 3 - i) * 8)) & 0xff;
    }
  }

  Buffer.prototype.writeUInt32LE = function writeUInt32LE(
    value,
    offset,
    noAssert
  ) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 0xff;
    } else {
      objectWriteUInt32(this, value, offset, true);
    }
    return offset + 4;
  };

  Buffer.prototype.writeUInt32BE = function writeUInt32BE(
    value,
    offset,
    noAssert
  ) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 0xff;
    } else {
      objectWriteUInt32(this, value, offset, false);
    }
    return offset + 4;
  };

  Buffer.prototype.writeIntLE = function writeIntLE(
    value,
    offset,
    byteLength,
    noAssert
  ) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength - 1);

      checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }

    var i = 0;
    var mul = 1;
    var sub = 0;
    this[offset] = value & 0xff;
    while (++i < byteLength && (mul *= 0x100)) {
      if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = (((value / mul) >> 0) - sub) & 0xff;
    }

    return offset + byteLength;
  };

  Buffer.prototype.writeIntBE = function writeIntBE(
    value,
    offset,
    byteLength,
    noAssert
  ) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength - 1);

      checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }

    var i = byteLength - 1;
    var mul = 1;
    var sub = 0;
    this[offset + i] = value & 0xff;
    while (--i >= 0 && (mul *= 0x100)) {
      if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = (((value / mul) >> 0) - sub) & 0xff;
    }

    return offset + byteLength;
  };

  Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
    if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
    if (value < 0) value = 0xff + value + 1;
    this[offset] = value & 0xff;
    return offset + 1;
  };

  Buffer.prototype.writeInt16LE = function writeInt16LE(
    value,
    offset,
    noAssert
  ) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = value & 0xff;
      this[offset + 1] = value >>> 8;
    } else {
      objectWriteUInt16(this, value, offset, true);
    }
    return offset + 2;
  };

  Buffer.prototype.writeInt16BE = function writeInt16BE(
    value,
    offset,
    noAssert
  ) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = value >>> 8;
      this[offset + 1] = value & 0xff;
    } else {
      objectWriteUInt16(this, value, offset, false);
    }
    return offset + 2;
  };

  Buffer.prototype.writeInt32LE = function writeInt32LE(
    value,
    offset,
    noAssert
  ) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = value & 0xff;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
    } else {
      objectWriteUInt32(this, value, offset, true);
    }
    return offset + 4;
  };

  Buffer.prototype.writeInt32BE = function writeInt32BE(
    value,
    offset,
    noAssert
  ) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
    if (value < 0) value = 0xffffffff + value + 1;
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 0xff;
    } else {
      objectWriteUInt32(this, value, offset, false);
    }
    return offset + 4;
  };

  function checkIEEE754(buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length) throw new RangeError('Index out of range');
    if (offset < 0) throw new RangeError('Index out of range');
  }

  function writeFloat(buf, value, offset, littleEndian, noAssert) {
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 4);
    }
    write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
  }

  Buffer.prototype.writeFloatLE = function writeFloatLE(
    value,
    offset,
    noAssert
  ) {
    return writeFloat(this, value, offset, true, noAssert);
  };

  Buffer.prototype.writeFloatBE = function writeFloatBE(
    value,
    offset,
    noAssert
  ) {
    return writeFloat(this, value, offset, false, noAssert);
  };

  function writeDouble(buf, value, offset, littleEndian, noAssert) {
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 8);
    }
    write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
  }

  Buffer.prototype.writeDoubleLE = function writeDoubleLE(
    value,
    offset,
    noAssert
  ) {
    return writeDouble(this, value, offset, true, noAssert);
  };

  Buffer.prototype.writeDoubleBE = function writeDoubleBE(
    value,
    offset,
    noAssert
  ) {
    return writeDouble(this, value, offset, false, noAssert);
  };

  // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
  Buffer.prototype.copy = function copy(target, targetStart, start, end) {
    if (!start) start = 0;
    if (!end && end !== 0) end = this.length;
    if (targetStart >= target.length) targetStart = target.length;
    if (!targetStart) targetStart = 0;
    if (end > 0 && end < start) end = start;

    // Copy 0 bytes; we're done
    if (end === start) return 0;
    if (target.length === 0 || this.length === 0) return 0;

    // Fatal error conditions
    if (targetStart < 0) {
      throw new RangeError('targetStart out of bounds');
    }
    if (start < 0 || start >= this.length)
      throw new RangeError('sourceStart out of bounds');
    if (end < 0) throw new RangeError('sourceEnd out of bounds');

    // Are we oob?
    if (end > this.length) end = this.length;
    if (target.length - targetStart < end - start) {
      end = target.length - targetStart + start;
    }

    var len = end - start;
    var i;

    if (this === target && start < targetStart && targetStart < end) {
      // descending copy from end
      for (i = len - 1; i >= 0; --i) {
        target[i + targetStart] = this[i + start];
      }
    } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
      // ascending copy from start
      for (i = 0; i < len; ++i) {
        target[i + targetStart] = this[i + start];
      }
    } else {
      Uint8Array.prototype.set.call(
        target,
        this.subarray(start, start + len),
        targetStart
      );
    }

    return len;
  };

  // Usage:
  //    buffer.fill(number[, offset[, end]])
  //    buffer.fill(buffer[, offset[, end]])
  //    buffer.fill(string[, offset[, end]][, encoding])
  Buffer.prototype.fill = function fill(val, start, end, encoding) {
    // Handle string cases:
    if (typeof val === 'string') {
      if (typeof start === 'string') {
        encoding = start;
        start = 0;
        end = this.length;
      } else if (typeof end === 'string') {
        encoding = end;
        end = this.length;
      }
      if (val.length === 1) {
        var code = val.charCodeAt(0);
        if (code < 256) {
          val = code;
        }
      }
      if (encoding !== undefined && typeof encoding !== 'string') {
        throw new TypeError('encoding must be a string');
      }
      if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
        throw new TypeError('Unknown encoding: ' + encoding);
      }
    } else if (typeof val === 'number') {
      val = val & 255;
    }

    // Invalid ranges are not set to a default, so can range check early.
    if (start < 0 || this.length < start || this.length < end) {
      throw new RangeError('Out of range index');
    }

    if (end <= start) {
      return this;
    }

    start = start >>> 0;
    end = end === undefined ? this.length : end >>> 0;

    if (!val) val = 0;

    var i;
    if (typeof val === 'number') {
      for (i = start; i < end; ++i) {
        this[i] = val;
      }
    } else {
      var bytes = internalIsBuffer(val)
        ? val
        : utf8ToBytes(new Buffer(val, encoding).toString());
      var len = bytes.length;
      for (i = 0; i < end - start; ++i) {
        this[i + start] = bytes[i % len];
      }
    }

    return this;
  };

  // HELPER FUNCTIONS
  // ================

  var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

  function base64clean(str) {
    // Node strips out invalid characters like \n and \t from the string, base64-js does not
    str = stringtrim(str).replace(INVALID_BASE64_RE, '');
    // Node converts strings with length < 2 to ''
    if (str.length < 2) return '';
    // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
    while (str.length % 4 !== 0) {
      str = str + '=';
    }
    return str;
  }

  function stringtrim(str) {
    if (str.trim) return str.trim();
    return str.replace(/^\s+|\s+$/g, '');
  }

  function toHex(n) {
    if (n < 16) return '0' + n.toString(16);
    return n.toString(16);
  }

  function utf8ToBytes(string, units) {
    units = units || Infinity;
    var codePoint;
    var length = string.length;
    var leadSurrogate = null;
    var bytes = [];

    for (var i = 0; i < length; ++i) {
      codePoint = string.charCodeAt(i);

      // is surrogate component
      if (codePoint > 0xd7ff && codePoint < 0xe000) {
        // last char was a lead
        if (!leadSurrogate) {
          // no lead yet
          if (codePoint > 0xdbff) {
            // unexpected trail
            if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd);
            continue;
          } else if (i + 1 === length) {
            // unpaired lead
            if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd);
            continue;
          }

          // valid lead
          leadSurrogate = codePoint;

          continue;
        }

        // 2 leads in a row
        if (codePoint < 0xdc00) {
          if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd);
          leadSurrogate = codePoint;
          continue;
        }

        // valid surrogate pair
        codePoint =
          (((leadSurrogate - 0xd800) << 10) | (codePoint - 0xdc00)) + 0x10000;
      } else if (leadSurrogate) {
        // valid bmp char, but last char was a lead
        if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd);
      }

      leadSurrogate = null;

      // encode utf8
      if (codePoint < 0x80) {
        if ((units -= 1) < 0) break;
        bytes.push(codePoint);
      } else if (codePoint < 0x800) {
        if ((units -= 2) < 0) break;
        bytes.push((codePoint >> 0x6) | 0xc0, (codePoint & 0x3f) | 0x80);
      } else if (codePoint < 0x10000) {
        if ((units -= 3) < 0) break;
        bytes.push(
          (codePoint >> 0xc) | 0xe0,
          ((codePoint >> 0x6) & 0x3f) | 0x80,
          (codePoint & 0x3f) | 0x80
        );
      } else if (codePoint < 0x110000) {
        if ((units -= 4) < 0) break;
        bytes.push(
          (codePoint >> 0x12) | 0xf0,
          ((codePoint >> 0xc) & 0x3f) | 0x80,
          ((codePoint >> 0x6) & 0x3f) | 0x80,
          (codePoint & 0x3f) | 0x80
        );
      } else {
        throw new Error('Invalid code point');
      }
    }

    return bytes;
  }

  function asciiToBytes(str) {
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) {
      // Node's code seems to be doing this and not & 0x7F..
      byteArray.push(str.charCodeAt(i) & 0xff);
    }
    return byteArray;
  }

  function utf16leToBytes(str, units) {
    var c, hi, lo;
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) {
      if ((units -= 2) < 0) break;

      c = str.charCodeAt(i);
      hi = c >> 8;
      lo = c % 256;
      byteArray.push(lo);
      byteArray.push(hi);
    }

    return byteArray;
  }

  function base64ToBytes(str) {
    return toByteArray(base64clean(str));
  }

  function blitBuffer(src, dst, offset, length) {
    for (var i = 0; i < length; ++i) {
      if (i + offset >= dst.length || i >= src.length) break;
      dst[i + offset] = src[i];
    }
    return i;
  }

  function isnan(val) {
    return val !== val; // eslint-disable-line no-self-compare
  }

  // the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
  // The _isBuffer check is for Safari 5-7 support, because it's missing
  // Object.prototype.constructor. Remove this eventually
  function isBuffer$1(obj) {
    return (
      obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
    );
  }

  function isFastBuffer(obj) {
    return (
      !!obj.constructor &&
      typeof obj.constructor.isBuffer === 'function' &&
      obj.constructor.isBuffer(obj)
    );
  }

  // For Node v0.10 support. Remove this eventually.
  function isSlowBuffer(obj) {
    return (
      typeof obj.readFloatLE === 'function' &&
      typeof obj.slice === 'function' &&
      isFastBuffer(obj.slice(0, 0))
    );
  }

  var hasFetch =
    isFunction$1(global$1.fetch) && isFunction$1(global$1.ReadableStream);

  var _blobConstructor;
  function blobConstructor() {
    if (typeof _blobConstructor !== 'undefined') {
      return _blobConstructor;
    }
    try {
      new global$1.Blob([new ArrayBuffer(1)]);
      _blobConstructor = true;
    } catch (e) {
      _blobConstructor = false;
    }
    return _blobConstructor;
  }
  var xhr$1;

  function checkTypeSupport(type) {
    if (!xhr$1) {
      xhr$1 = new global$1.XMLHttpRequest();
      // If location.host is empty, e.g. if this page/worker was loaded
      // from a Blob, then use example.com to avoid an error
      xhr$1.open('GET', global$1.location.host ? '/' : 'https://example.com');
    }
    try {
      xhr$1.responseType = type;
      return xhr$1.responseType === type;
    } catch (e) {
      return false;
    }
  }

  // For some strange reason, Safari 7.0 reports typeof global.ArrayBuffer === 'object'.
  // Safari 7.1 appears to have fixed this bug.
  var haveArrayBuffer = typeof global$1.ArrayBuffer !== 'undefined';
  var haveSlice =
    haveArrayBuffer && isFunction$1(global$1.ArrayBuffer.prototype.slice);

  var arraybuffer = haveArrayBuffer && checkTypeSupport('arraybuffer');
  // These next two tests unavoidably show warnings in Chrome. Since fetch will always
  // be used if it's available, just return false for these to avoid the warnings.
  var msstream = !hasFetch && haveSlice && checkTypeSupport('ms-stream');
  var mozchunkedarraybuffer =
    !hasFetch && haveArrayBuffer && checkTypeSupport('moz-chunked-arraybuffer');
  var overrideMimeType = isFunction$1(xhr$1.overrideMimeType);
  var vbArray = isFunction$1(global$1.VBArray);

  function isFunction$1(value) {
    return typeof value === 'function';
  }

  xhr$1 = null; // Help gc

  var inherits;
  if (typeof Object.create === 'function') {
    inherits = function inherits(ctor, superCtor) {
      // implementation from standard node.js 'util' module
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    };
  } else {
    inherits = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function() {};
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    };
  }
  var inherits$1 = inherits;

  var formatRegExp = /%[sdj%]/g;
  function format(f) {
    if (!isString$1(f)) {
      var objects = [];
      for (var i = 0; i < arguments.length; i++) {
        objects.push(inspect(arguments[i]));
      }
      return objects.join(' ');
    }

    var i = 1;
    var args = arguments;
    var len = args.length;
    var str = String(f).replace(formatRegExp, function(x) {
      if (x === '%%') return '%';
      if (i >= len) return x;
      switch (x) {
        case '%s':
          return String(args[i++]);
        case '%d':
          return Number(args[i++]);
        case '%j':
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return '[Circular]';
          }
        default:
          return x;
      }
    });
    for (var x = args[i]; i < len; x = args[++i]) {
      if (isNull(x) || !isObject$1(x)) {
        str += ' ' + x;
      } else {
        str += ' ' + inspect(x);
      }
    }
    return str;
  }

  // Mark that a method should not be used.
  // Returns a modified function which warns once by default.
  // If --no-deprecation is set, then it is a no-op.
  function deprecate(fn, msg) {
    // Allow for deprecating things in the process of starting up.
    if (isUndefined$1(global$1.process)) {
      return function() {
        return deprecate(fn, msg).apply(this, arguments);
      };
    }

    var warned = false;
    function deprecated() {
      if (!warned) {
        {
          console.error(msg);
        }
        warned = true;
      }
      return fn.apply(this, arguments);
    }

    return deprecated;
  }

  var debugs = {};
  var debugEnviron;
  function debuglog(set) {
    if (isUndefined$1(debugEnviron)) debugEnviron = '';
    set = set.toUpperCase();
    if (!debugs[set]) {
      if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
        var pid = 0;
        debugs[set] = function() {
          var msg = format.apply(null, arguments);
          console.error('%s %d: %s', set, pid, msg);
        };
      } else {
        debugs[set] = function() {};
      }
    }
    return debugs[set];
  }

  /**
   * Echos the value of a value. Trys to print the value out
   * in the best way possible given the different types.
   *
   * @param {Object} obj The object to print out.
   * @param {Object} opts Optional options object that alters the output.
   */
  /* legacy: obj, showHidden, depth, colors*/
  function inspect(obj, opts) {
    // default options
    var ctx = {
      seen: [],
      stylize: stylizeNoColor
    };
    // legacy...
    if (arguments.length >= 3) ctx.depth = arguments[2];
    if (arguments.length >= 4) ctx.colors = arguments[3];
    if (isBoolean(opts)) {
      // legacy...
      ctx.showHidden = opts;
    } else if (opts) {
      // got an "options" object
      _extend(ctx, opts);
    }
    // set default options
    if (isUndefined$1(ctx.showHidden)) ctx.showHidden = false;
    if (isUndefined$1(ctx.depth)) ctx.depth = 2;
    if (isUndefined$1(ctx.colors)) ctx.colors = false;
    if (isUndefined$1(ctx.customInspect)) ctx.customInspect = true;
    if (ctx.colors) ctx.stylize = stylizeWithColor;
    return formatValue(ctx, obj, ctx.depth);
  }

  // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
  inspect.colors = {
    bold: [1, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    white: [37, 39],
    grey: [90, 39],
    black: [30, 39],
    blue: [34, 39],
    cyan: [36, 39],
    green: [32, 39],
    magenta: [35, 39],
    red: [31, 39],
    yellow: [33, 39]
  };

  // Don't use 'blue' not visible on cmd.exe
  inspect.styles = {
    special: 'cyan',
    number: 'yellow',
    boolean: 'yellow',
    undefined: 'grey',
    null: 'bold',
    string: 'green',
    date: 'magenta',
    // "name": intentionally not styling
    regexp: 'red'
  };

  function stylizeWithColor(str, styleType) {
    var style = inspect.styles[styleType];

    if (style) {
      return (
        '\u001b[' +
        inspect.colors[style][0] +
        'm' +
        str +
        '\u001b[' +
        inspect.colors[style][1] +
        'm'
      );
    } else {
      return str;
    }
  }

  function stylizeNoColor(str, styleType) {
    return str;
  }

  function arrayToHash(array) {
    var hash = {};

    array.forEach(function(val, idx) {
      hash[val] = true;
    });

    return hash;
  }

  function formatValue(ctx, value, recurseTimes) {
    // Provide a hook for user-specified inspect functions.
    // Check that value is an object with an inspect function on it
    if (
      ctx.customInspect &&
      value &&
      isFunction$2(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)
    ) {
      var ret = value.inspect(recurseTimes, ctx);
      if (!isString$1(ret)) {
        ret = formatValue(ctx, ret, recurseTimes);
      }
      return ret;
    }

    // Primitive types cannot have properties
    var primitive = formatPrimitive(ctx, value);
    if (primitive) {
      return primitive;
    }

    // Look up the keys of the object.
    var keys = Object.keys(value);
    var visibleKeys = arrayToHash(keys);

    if (ctx.showHidden) {
      keys = Object.getOwnPropertyNames(value);
    }

    // IE doesn't make error fields non-enumerable
    // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
    if (
      isError(value) &&
      (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)
    ) {
      return formatError(value);
    }

    // Some type of object without properties can be shortcutted.
    if (keys.length === 0) {
      if (isFunction$2(value)) {
        var name = value.name ? ': ' + value.name : '';
        return ctx.stylize('[Function' + name + ']', 'special');
      }
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
      }
      if (isDate$1(value)) {
        return ctx.stylize(Date.prototype.toString.call(value), 'date');
      }
      if (isError(value)) {
        return formatError(value);
      }
    }

    var base = '',
      array = false,
      braces = ['{', '}'];

    // Make Array say that they are Array
    if (isArray$2(value)) {
      array = true;
      braces = ['[', ']'];
    }

    // Make functions say that they are functions
    if (isFunction$2(value)) {
      var n = value.name ? ': ' + value.name : '';
      base = ' [Function' + n + ']';
    }

    // Make RegExps say that they are RegExps
    if (isRegExp(value)) {
      base = ' ' + RegExp.prototype.toString.call(value);
    }

    // Make dates with properties first say the date
    if (isDate$1(value)) {
      base = ' ' + Date.prototype.toUTCString.call(value);
    }

    // Make error with message first say the error
    if (isError(value)) {
      base = ' ' + formatError(value);
    }

    if (keys.length === 0 && (!array || value.length == 0)) {
      return braces[0] + base + braces[1];
    }

    if (recurseTimes < 0) {
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
      } else {
        return ctx.stylize('[Object]', 'special');
      }
    }

    ctx.seen.push(value);

    var output;
    if (array) {
      output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
    } else {
      output = keys.map(function(key) {
        return formatProperty(
          ctx,
          value,
          recurseTimes,
          visibleKeys,
          key,
          array
        );
      });
    }

    ctx.seen.pop();

    return reduceToSingleString(output, base, braces);
  }

  function formatPrimitive(ctx, value) {
    if (isUndefined$1(value)) return ctx.stylize('undefined', 'undefined');
    if (isString$1(value)) {
      var simple =
        "'" +
        JSON.stringify(value)
          .replace(/^"|"$/g, '')
          .replace(/'/g, "\\'")
          .replace(/\\"/g, '"') +
        "'";
      return ctx.stylize(simple, 'string');
    }
    if (isNumber$1(value)) return ctx.stylize('' + value, 'number');
    if (isBoolean(value)) return ctx.stylize('' + value, 'boolean');
    // For some reason typeof null is "object", so special case here.
    if (isNull(value)) return ctx.stylize('null', 'null');
  }

  function formatError(value) {
    return '[' + Error.prototype.toString.call(value) + ']';
  }

  function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
    var output = [];
    for (var i = 0, l = value.length; i < l; ++i) {
      if (hasOwnProperty(value, String(i))) {
        output.push(
          formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true)
        );
      } else {
        output.push('');
      }
    }
    keys.forEach(function(key) {
      if (!key.match(/^\d+$/)) {
        output.push(
          formatProperty(ctx, value, recurseTimes, visibleKeys, key, true)
        );
      }
    });
    return output;
  }

  function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
    var name, str, desc;
    desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
    if (desc.get) {
      if (desc.set) {
        str = ctx.stylize('[Getter/Setter]', 'special');
      } else {
        str = ctx.stylize('[Getter]', 'special');
      }
    } else {
      if (desc.set) {
        str = ctx.stylize('[Setter]', 'special');
      }
    }
    if (!hasOwnProperty(visibleKeys, key)) {
      name = '[' + key + ']';
    }
    if (!str) {
      if (ctx.seen.indexOf(desc.value) < 0) {
        if (isNull(recurseTimes)) {
          str = formatValue(ctx, desc.value, null);
        } else {
          str = formatValue(ctx, desc.value, recurseTimes - 1);
        }
        if (str.indexOf('\n') > -1) {
          if (array) {
            str = str
              .split('\n')
              .map(function(line) {
                return '  ' + line;
              })
              .join('\n')
              .substr(2);
          } else {
            str =
              '\n' +
              str
                .split('\n')
                .map(function(line) {
                  return '   ' + line;
                })
                .join('\n');
          }
        }
      } else {
        str = ctx.stylize('[Circular]', 'special');
      }
    }
    if (isUndefined$1(name)) {
      if (array && key.match(/^\d+$/)) {
        return str;
      }
      name = JSON.stringify('' + key);
      if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
        name = name.substr(1, name.length - 2);
        name = ctx.stylize(name, 'name');
      } else {
        name = name
          .replace(/'/g, "\\'")
          .replace(/\\"/g, '"')
          .replace(/(^"|"$)/g, "'");
        name = ctx.stylize(name, 'string');
      }
    }

    return name + ': ' + str;
  }

  function reduceToSingleString(output, base, braces) {
    var length = output.reduce(function(prev, cur) {
      if (cur.indexOf('\n') >= 0);
      return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
    }, 0);

    if (length > 60) {
      return (
        braces[0] +
        (base === '' ? '' : base + '\n ') +
        ' ' +
        output.join(',\n  ') +
        ' ' +
        braces[1]
      );
    }

    return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
  }

  // NOTE: These type checking functions intentionally don't use `instanceof`
  // because it is fragile and can be easily faked with `Object.create()`.
  function isArray$2(ar) {
    return Array.isArray(ar);
  }

  function isBoolean(arg) {
    return typeof arg === 'boolean';
  }

  function isNull(arg) {
    return arg === null;
  }

  function isNullOrUndefined(arg) {
    return arg == null;
  }

  function isNumber$1(arg) {
    return typeof arg === 'number';
  }

  function isString$1(arg) {
    return typeof arg === 'string';
  }

  function isSymbol(arg) {
    return typeof arg === 'symbol';
  }

  function isUndefined$1(arg) {
    return arg === void 0;
  }

  function isRegExp(re) {
    return isObject$1(re) && objectToString(re) === '[object RegExp]';
  }

  function isObject$1(arg) {
    return typeof arg === 'object' && arg !== null;
  }

  function isDate$1(d) {
    return isObject$1(d) && objectToString(d) === '[object Date]';
  }

  function isError(e) {
    return (
      isObject$1(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error)
    );
  }

  function isFunction$2(arg) {
    return typeof arg === 'function';
  }

  function isPrimitive(arg) {
    return (
      arg === null ||
      typeof arg === 'boolean' ||
      typeof arg === 'number' ||
      typeof arg === 'string' ||
      typeof arg === 'symbol' || // ES6 symbol
      typeof arg === 'undefined'
    );
  }

  function isBuffer$2(maybeBuf) {
    return isBuffer$1(maybeBuf);
  }

  function objectToString(o) {
    return Object.prototype.toString.call(o);
  }

  function pad(n) {
    return n < 10 ? '0' + n.toString(10) : n.toString(10);
  }

  var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  // 26 Feb 16:19:34
  function timestamp() {
    var d = new Date();
    var time = [
      pad(d.getHours()),
      pad(d.getMinutes()),
      pad(d.getSeconds())
    ].join(':');
    return [d.getDate(), months[d.getMonth()], time].join(' ');
  }

  // log is just a thin wrapper to console.log that prepends a timestamp
  function log() {
    console.log('%s - %s', timestamp(), format.apply(null, arguments));
  }

  function _extend(origin, add) {
    // Don't do anything if add isn't an object
    if (!add || !isObject$1(add)) return origin;

    var keys = Object.keys(add);
    var i = keys.length;
    while (i--) {
      origin[keys[i]] = add[keys[i]];
    }
    return origin;
  }
  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  var util = {
    inherits: inherits$1,
    _extend: _extend,
    log: log,
    isBuffer: isBuffer$2,
    isPrimitive: isPrimitive,
    isFunction: isFunction$2,
    isError: isError,
    isDate: isDate$1,
    isObject: isObject$1,
    isRegExp: isRegExp,
    isUndefined: isUndefined$1,
    isSymbol: isSymbol,
    isString: isString$1,
    isNumber: isNumber$1,
    isNullOrUndefined: isNullOrUndefined,
    isNull: isNull,
    isBoolean: isBoolean,
    isArray: isArray$2,
    inspect: inspect,
    deprecate: deprecate,
    format: format,
    debuglog: debuglog
  };

  var domain;

  // This constructor is used to store event handlers. Instantiating this is
  // faster than explicitly calling `Object.create(null)` to get a "clean" empty
  // object (tested with v8 v4.9).
  function EventHandlers() {}
  EventHandlers.prototype = Object.create(null);

  function EventEmitter() {
    EventEmitter.init.call(this);
  }

  // nodejs oddity
  // require('events') === require('events').EventEmitter
  EventEmitter.EventEmitter = EventEmitter;

  EventEmitter.usingDomains = false;

  EventEmitter.prototype.domain = undefined;
  EventEmitter.prototype._events = undefined;
  EventEmitter.prototype._maxListeners = undefined;

  // By default EventEmitters will print a warning if more than 10 listeners are
  // added to it. This is a useful default which helps finding memory leaks.
  EventEmitter.defaultMaxListeners = 10;

  EventEmitter.init = function() {
    this.domain = null;
    if (EventEmitter.usingDomains) {
      // if there is an active domain, then attach to it.
      if (domain.active && !(this instanceof domain.Domain));
    }

    if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
      this._events = new EventHandlers();
      this._eventsCount = 0;
    }

    this._maxListeners = this._maxListeners || undefined;
  };

  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.
  EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0 || isNaN(n))
      throw new TypeError('"n" argument must be a positive number');
    this._maxListeners = n;
    return this;
  };

  function $getMaxListeners(that) {
    if (that._maxListeners === undefined)
      return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
  }

  EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return $getMaxListeners(this);
  };

  // These standalone emit* functions are used to optimize calling of event
  // handlers for fast cases because emit() itself often has a variable number of
  // arguments and can be deoptimized because of that. These functions always have
  // the same number of arguments and thus do not get deoptimized, so the code
  // inside them can execute faster.
  function emitNone(handler, isFn, self) {
    if (isFn) handler.call(self);
    else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i) listeners[i].call(self);
    }
  }
  function emitOne(handler, isFn, self, arg1) {
    if (isFn) handler.call(self, arg1);
    else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i) listeners[i].call(self, arg1);
    }
  }
  function emitTwo(handler, isFn, self, arg1, arg2) {
    if (isFn) handler.call(self, arg1, arg2);
    else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i) listeners[i].call(self, arg1, arg2);
    }
  }
  function emitThree(handler, isFn, self, arg1, arg2, arg3) {
    if (isFn) handler.call(self, arg1, arg2, arg3);
    else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i) listeners[i].call(self, arg1, arg2, arg3);
    }
  }

  function emitMany(handler, isFn, self, args) {
    if (isFn) handler.apply(self, args);
    else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i) listeners[i].apply(self, args);
    }
  }

  EventEmitter.prototype.emit = function emit(type) {
    var er, handler, len, args, i, events, domain;
    var doError = type === 'error';

    events = this._events;
    if (events) doError = doError && events.error == null;
    else if (!doError) return false;

    domain = this.domain;

    // If there is no 'error' event listener then throw.
    if (doError) {
      er = arguments[1];
      if (domain) {
        if (!er) er = new Error('Uncaught, unspecified "error" event');
        er.domainEmitter = this;
        er.domain = domain;
        er.domainThrown = false;
        domain.emit('error', er);
      } else if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error(
          'Uncaught, unspecified "error" event. (' + er + ')'
        );
        err.context = er;
        throw err;
      }
      return false;
    }

    handler = events[type];

    if (!handler) return false;

    var isFn = typeof handler === 'function';
    len = arguments.length;
    switch (len) {
      // fast cases
      case 1:
        emitNone(handler, isFn, this);
        break;
      case 2:
        emitOne(handler, isFn, this, arguments[1]);
        break;
      case 3:
        emitTwo(handler, isFn, this, arguments[1], arguments[2]);
        break;
      case 4:
        emitThree(
          handler,
          isFn,
          this,
          arguments[1],
          arguments[2],
          arguments[3]
        );
        break;
      // slower
      default:
        args = new Array(len - 1);
        for (i = 1; i < len; i++) args[i - 1] = arguments[i];
        emitMany(handler, isFn, this, args);
    }

    return true;
  };

  function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;

    if (typeof listener !== 'function')
      throw new TypeError('"listener" argument must be a function');

    events = target._events;
    if (!events) {
      events = target._events = new EventHandlers();
      target._eventsCount = 0;
    } else {
      // To avoid recursion in the case that type === "newListener"! Before
      // adding it to the listeners, first emit "newListener".
      if (events.newListener) {
        target.emit(
          'newListener',
          type,
          listener.listener ? listener.listener : listener
        );

        // Re-assign `events` because a newListener handler could have caused the
        // this._events to be assigned to a new object
        events = target._events;
      }
      existing = events[type];
    }

    if (!existing) {
      // Optimize the case of one listener. Don't need the extra array object.
      existing = events[type] = listener;
      ++target._eventsCount;
    } else {
      if (typeof existing === 'function') {
        // Adding the second element, need to change to array.
        existing = events[type] = prepend
          ? [listener, existing]
          : [existing, listener];
      } else {
        // If we've already got an array, just append.
        if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
      }

      // Check for listener leak
      if (!existing.warned) {
        m = $getMaxListeners(target);
        if (m && m > 0 && existing.length > m) {
          existing.warned = true;
          var w = new Error(
            'Possible EventEmitter memory leak detected. ' +
              existing.length +
              ' ' +
              type +
              ' listeners added. ' +
              'Use emitter.setMaxListeners() to increase limit'
          );
          w.name = 'MaxListenersExceededWarning';
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          emitWarning(w);
        }
      }
    }

    return target;
  }
  function emitWarning(e) {
    typeof console.warn === 'function' ? console.warn(e) : console.log(e);
  }
  EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
  };

  EventEmitter.prototype.on = EventEmitter.prototype.addListener;

  EventEmitter.prototype.prependListener = function prependListener(
    type,
    listener
  ) {
    return _addListener(this, type, listener, true);
  };

  function _onceWrap(target, type, listener) {
    var fired = false;
    function g() {
      target.removeListener(type, g);
      if (!fired) {
        fired = true;
        listener.apply(target, arguments);
      }
    }
    g.listener = listener;
    return g;
  }

  EventEmitter.prototype.once = function once(type, listener) {
    if (typeof listener !== 'function')
      throw new TypeError('"listener" argument must be a function');
    this.on(type, _onceWrap(this, type, listener));
    return this;
  };

  EventEmitter.prototype.prependOnceListener = function prependOnceListener(
    type,
    listener
  ) {
    if (typeof listener !== 'function')
      throw new TypeError('"listener" argument must be a function');
    this.prependListener(type, _onceWrap(this, type, listener));
    return this;
  };

  // emits a 'removeListener' event iff the listener was removed
  EventEmitter.prototype.removeListener = function removeListener(
    type,
    listener
  ) {
    var list, events, position, i, originalListener;

    if (typeof listener !== 'function')
      throw new TypeError('"listener" argument must be a function');

    events = this._events;
    if (!events) return this;

    list = events[type];
    if (!list) return this;

    if (list === listener || (list.listener && list.listener === listener)) {
      if (--this._eventsCount === 0) this._events = new EventHandlers();
      else {
        delete events[type];
        if (events.removeListener)
          this.emit('removeListener', type, list.listener || listener);
      }
    } else if (typeof list !== 'function') {
      position = -1;

      for (i = list.length; i-- > 0; ) {
        if (
          list[i] === listener ||
          (list[i].listener && list[i].listener === listener)
        ) {
          originalListener = list[i].listener;
          position = i;
          break;
        }
      }

      if (position < 0) return this;

      if (list.length === 1) {
        list[0] = undefined;
        if (--this._eventsCount === 0) {
          this._events = new EventHandlers();
          return this;
        } else {
          delete events[type];
        }
      } else {
        spliceOne(list, position);
      }

      if (events.removeListener)
        this.emit('removeListener', type, originalListener || listener);
    }

    return this;
  };

  EventEmitter.prototype.removeAllListeners = function removeAllListeners(
    type
  ) {
    var listeners, events;

    events = this._events;
    if (!events) return this;

    // not listening for removeListener, no need to emit
    if (!events.removeListener) {
      if (arguments.length === 0) {
        this._events = new EventHandlers();
        this._eventsCount = 0;
      } else if (events[type]) {
        if (--this._eventsCount === 0) this._events = new EventHandlers();
        else delete events[type];
      }
      return this;
    }

    // emit removeListener for all listeners on all events
    if (arguments.length === 0) {
      var keys = Object.keys(events);
      for (var i = 0, key; i < keys.length; ++i) {
        key = keys[i];
        if (key === 'removeListener') continue;
        this.removeAllListeners(key);
      }
      this.removeAllListeners('removeListener');
      this._events = new EventHandlers();
      this._eventsCount = 0;
      return this;
    }

    listeners = events[type];

    if (typeof listeners === 'function') {
      this.removeListener(type, listeners);
    } else if (listeners) {
      // LIFO order
      do {
        this.removeListener(type, listeners[listeners.length - 1]);
      } while (listeners[0]);
    }

    return this;
  };

  EventEmitter.prototype.listeners = function listeners(type) {
    var evlistener;
    var ret;
    var events = this._events;

    if (!events) ret = [];
    else {
      evlistener = events[type];
      if (!evlistener) ret = [];
      else if (typeof evlistener === 'function')
        ret = [evlistener.listener || evlistener];
      else ret = unwrapListeners(evlistener);
    }

    return ret;
  };

  EventEmitter.listenerCount = function(emitter, type) {
    if (typeof emitter.listenerCount === 'function') {
      return emitter.listenerCount(type);
    } else {
      return listenerCount.call(emitter, type);
    }
  };

  EventEmitter.prototype.listenerCount = listenerCount;
  function listenerCount(type) {
    var events = this._events;

    if (events) {
      var evlistener = events[type];

      if (typeof evlistener === 'function') {
        return 1;
      } else if (evlistener) {
        return evlistener.length;
      }
    }

    return 0;
  }

  EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
  };

  // About 1.5x faster than the two-arg version of Array#splice().
  function spliceOne(list, index) {
    for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
      list[i] = list[k];
    list.pop();
  }

  function arrayClone(arr, i) {
    var copy = new Array(i);
    while (i--) copy[i] = arr[i];
    return copy;
  }

  function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for (var i = 0; i < ret.length; ++i) {
      ret[i] = arr[i].listener || arr[i];
    }
    return ret;
  }

  function BufferList() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;
    else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;
    else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while ((p = p.next)) {
      ret += s + p.data;
    }
    return ret;
  };

  BufferList.prototype.concat = function(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      p.data.copy(ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  // Copyright Joyent, Inc. and other Node contributors.
  var isBufferEncoding =
    Buffer.isEncoding ||
    function(encoding) {
      switch (encoding && encoding.toLowerCase()) {
        case 'hex':
        case 'utf8':
        case 'utf-8':
        case 'ascii':
        case 'binary':
        case 'base64':
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
        case 'raw':
          return true;
        default:
          return false;
      }
    };

  function assertEncoding(encoding) {
    if (encoding && !isBufferEncoding(encoding)) {
      throw new Error('Unknown encoding: ' + encoding);
    }
  }

  // StringDecoder provides an interface for efficiently splitting a series of
  // buffers into a series of JS strings without breaking apart multi-byte
  // characters. CESU-8 is handled as part of the UTF-8 encoding.
  //
  // @TODO Handling all encodings inside a single object makes it very difficult
  // to reason about this code, so it should be split up in the future.
  // @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
  // points as used by CESU-8.
  function StringDecoder(encoding) {
    this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
    assertEncoding(encoding);
    switch (this.encoding) {
      case 'utf8':
        // CESU-8 represents each of Surrogate Pair by 3-bytes
        this.surrogateSize = 3;
        break;
      case 'ucs2':
      case 'utf16le':
        // UTF-16 represents each of Surrogate Pair by 2-bytes
        this.surrogateSize = 2;
        this.detectIncompleteChar = utf16DetectIncompleteChar;
        break;
      case 'base64':
        // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
        this.surrogateSize = 3;
        this.detectIncompleteChar = base64DetectIncompleteChar;
        break;
      default:
        this.write = passThroughWrite;
        return;
    }

    // Enough space to store all bytes of a single character. UTF-8 needs 4
    // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
    this.charBuffer = new Buffer(6);
    // Number of bytes received for the current incomplete multi-byte character.
    this.charReceived = 0;
    // Number of bytes expected for the current incomplete multi-byte character.
    this.charLength = 0;
  }

  // write decodes the given buffer and returns it as JS string that is
  // guaranteed to not contain any partial multi-byte characters. Any partial
  // character found at the end of the buffer is buffered up, and will be
  // returned when calling write again with the remaining bytes.
  //
  // Note: Converting a Buffer containing an orphan surrogate to a String
  // currently works, but converting a String to a Buffer (via `new Buffer`, or
  // Buffer#write) will replace incomplete surrogates with the unicode
  // replacement character. See https://codereview.chromium.org/121173009/ .
  StringDecoder.prototype.write = function(buffer) {
    var charStr = '';
    // if our last write ended with an incomplete multibyte character
    while (this.charLength) {
      // determine how many remaining bytes this buffer has to offer for this char
      var available =
        buffer.length >= this.charLength - this.charReceived
          ? this.charLength - this.charReceived
          : buffer.length;

      // add the new bytes to the char buffer
      buffer.copy(this.charBuffer, this.charReceived, 0, available);
      this.charReceived += available;

      if (this.charReceived < this.charLength) {
        // still not enough chars in this buffer? wait for more ...
        return '';
      }

      // remove bytes belonging to the current character from the buffer
      buffer = buffer.slice(available, buffer.length);

      // get the character that was split
      charStr = this.charBuffer
        .slice(0, this.charLength)
        .toString(this.encoding);

      // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
      var charCode = charStr.charCodeAt(charStr.length - 1);
      if (charCode >= 0xd800 && charCode <= 0xdbff) {
        this.charLength += this.surrogateSize;
        charStr = '';
        continue;
      }
      this.charReceived = this.charLength = 0;

      // if there are no more bytes in this buffer, just emit our char
      if (buffer.length === 0) {
        return charStr;
      }
      break;
    }

    // determine and set charLength / charReceived
    this.detectIncompleteChar(buffer);

    var end = buffer.length;
    if (this.charLength) {
      // buffer the incomplete character bytes we got
      buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
      end -= this.charReceived;
    }

    charStr += buffer.toString(this.encoding, 0, end);

    var end = charStr.length - 1;
    var charCode = charStr.charCodeAt(end);
    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
    if (charCode >= 0xd800 && charCode <= 0xdbff) {
      var size = this.surrogateSize;
      this.charLength += size;
      this.charReceived += size;
      this.charBuffer.copy(this.charBuffer, size, 0, size);
      buffer.copy(this.charBuffer, 0, 0, size);
      return charStr.substring(0, end);
    }

    // or just emit the charStr
    return charStr;
  };

  // detectIncompleteChar determines if there is an incomplete UTF-8 character at
  // the end of the given buffer. If so, it sets this.charLength to the byte
  // length that character, and sets this.charReceived to the number of bytes
  // that are available for this character.
  StringDecoder.prototype.detectIncompleteChar = function(buffer) {
    // determine how many bytes we have to check at the end of this buffer
    var i = buffer.length >= 3 ? 3 : buffer.length;

    // Figure out if one of the last i bytes of our buffer announces an
    // incomplete char.
    for (; i > 0; i--) {
      var c = buffer[buffer.length - i];

      // See http://en.wikipedia.org/wiki/UTF-8#Description

      // 110XXXXX
      if (i == 1 && c >> 5 == 0x06) {
        this.charLength = 2;
        break;
      }

      // 1110XXXX
      if (i <= 2 && c >> 4 == 0x0e) {
        this.charLength = 3;
        break;
      }

      // 11110XXX
      if (i <= 3 && c >> 3 == 0x1e) {
        this.charLength = 4;
        break;
      }
    }
    this.charReceived = i;
  };

  StringDecoder.prototype.end = function(buffer) {
    var res = '';
    if (buffer && buffer.length) res = this.write(buffer);

    if (this.charReceived) {
      var cr = this.charReceived;
      var buf = this.charBuffer;
      var enc = this.encoding;
      res += buf.slice(0, cr).toString(enc);
    }

    return res;
  };

  function passThroughWrite(buffer) {
    return buffer.toString(this.encoding);
  }

  function utf16DetectIncompleteChar(buffer) {
    this.charReceived = buffer.length % 2;
    this.charLength = this.charReceived ? 2 : 0;
  }

  function base64DetectIncompleteChar(buffer) {
    this.charReceived = buffer.length % 3;
    this.charLength = this.charReceived ? 3 : 0;
  }

  Readable.ReadableState = ReadableState;

  var debug = debuglog('stream');
  inherits$1(Readable, EventEmitter);

  function prependListener(emitter, event, fn) {
    // Sadly this is not cacheable as some libraries bundle their own
    // event emitter implementation with them.
    if (typeof emitter.prependListener === 'function') {
      return emitter.prependListener(event, fn);
    } else {
      // This is a hack to make sure that our error handler is attached before any
      // userland ones.  NEVER DO THIS. This is here only because this code needs
      // to continue to work with older versions of Node.js that do not include
      // the prependListener() method. The goal is to eventually remove this hack.
      if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);
      else if (Array.isArray(emitter._events[event]))
        emitter._events[event].unshift(fn);
      else emitter._events[event] = [fn, emitter._events[event]];
    }
  }
  function listenerCount$1(emitter, type) {
    return emitter.listeners(type).length;
  }
  function ReadableState(options, stream) {
    options = options || {};

    // object stream flag. Used to make read(n) ignore n and to
    // make all the buffer merging and length checks go away
    this.objectMode = !!options.objectMode;

    if (stream instanceof Duplex)
      this.objectMode = this.objectMode || !!options.readableObjectMode;

    // the point at which it stops calling _read() to fill the buffer
    // Note: 0 is a valid value, means "don't call _read preemptively ever"
    var hwm = options.highWaterMark;
    var defaultHwm = this.objectMode ? 16 : 16 * 1024;
    this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

    // cast to ints.
    this.highWaterMark = ~~this.highWaterMark;

    // A linked list is used to store data chunks instead of an array because the
    // linked list can remove elements from the beginning faster than
    // array.shift()
    this.buffer = new BufferList();
    this.length = 0;
    this.pipes = null;
    this.pipesCount = 0;
    this.flowing = null;
    this.ended = false;
    this.endEmitted = false;
    this.reading = false;

    // a flag to be able to tell if the onwrite cb is called immediately,
    // or on a later tick.  We set this to true at first, because any
    // actions that shouldn't happen until "later" should generally also
    // not happen before the first write call.
    this.sync = true;

    // whenever we return null, then we set a flag to say
    // that we're awaiting a 'readable' event emission.
    this.needReadable = false;
    this.emittedReadable = false;
    this.readableListening = false;
    this.resumeScheduled = false;

    // Crypto is kind of old and crusty.  Historically, its default string
    // encoding is 'binary' so we have to make this configurable.
    // Everything else in the universe uses 'utf8', though.
    this.defaultEncoding = options.defaultEncoding || 'utf8';

    // when piping, we only care about 'readable' events that happen
    // after read()ing all the bytes and not getting any pushback.
    this.ranOut = false;

    // the number of writers that are awaiting a drain event in .pipe()s
    this.awaitDrain = 0;

    // if true, a maybeReadMore has been scheduled
    this.readingMore = false;

    this.decoder = null;
    this.encoding = null;
    if (options.encoding) {
      this.decoder = new StringDecoder(options.encoding);
      this.encoding = options.encoding;
    }
  }
  function Readable(options) {
    if (!(this instanceof Readable)) return new Readable(options);

    this._readableState = new ReadableState(options, this);

    // legacy
    this.readable = true;

    if (options && typeof options.read === 'function')
      this._read = options.read;

    EventEmitter.call(this);
  }

  // Manually shove something into the read() buffer.
  // This returns true if the highWaterMark has not been hit yet,
  // similar to how Writable.write() returns true if you should
  // write() some more.
  Readable.prototype.push = function(chunk, encoding) {
    var state = this._readableState;

    if (!state.objectMode && typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
    }

    return readableAddChunk(this, state, chunk, encoding, false);
  };

  // Unshift should *always* be something directly out of read()
  Readable.prototype.unshift = function(chunk) {
    var state = this._readableState;
    return readableAddChunk(this, state, chunk, '', true);
  };

  Readable.prototype.isPaused = function() {
    return this._readableState.flowing === false;
  };

  function readableAddChunk(stream, state, chunk, encoding, addToFront) {
    var er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (chunk === null) {
      state.reading = false;
      onEofChunk(stream, state);
    } else if (state.objectMode || (chunk && chunk.length > 0)) {
      if (state.ended && !addToFront) {
        var e = new Error('stream.push() after EOF');
        stream.emit('error', e);
      } else if (state.endEmitted && addToFront) {
        var _e = new Error('stream.unshift() after end event');
        stream.emit('error', _e);
      } else {
        var skipAdd;
        if (state.decoder && !addToFront && !encoding) {
          chunk = state.decoder.write(chunk);
          skipAdd = !state.objectMode && chunk.length === 0;
        }

        if (!addToFront) state.reading = false;

        // Don't add to the buffer if we've decoded to an empty string chunk and
        // we're not in object mode
        if (!skipAdd) {
          // if we want the data now, just emit it.
          if (state.flowing && state.length === 0 && !state.sync) {
            stream.emit('data', chunk);
            stream.read(0);
          } else {
            // update the buffer info.
            state.length += state.objectMode ? 1 : chunk.length;
            if (addToFront) state.buffer.unshift(chunk);
            else state.buffer.push(chunk);

            if (state.needReadable) emitReadable(stream);
          }
        }

        maybeReadMore(stream, state);
      }
    } else if (!addToFront) {
      state.reading = false;
    }

    return needMoreData(state);
  }

  // if it's past the high water mark, we can push in some more.
  // Also, if we have no data yet, we can stand some
  // more bytes.  This is to work around cases where hwm=0,
  // such as the repl.  Also, if the push() triggered a
  // readable event, and the user called read(largeNumber) such that
  // needReadable was set, then we ought to push more, so that another
  // 'readable' event will be triggered.
  function needMoreData(state) {
    return (
      !state.ended &&
      (state.needReadable ||
        state.length < state.highWaterMark ||
        state.length === 0)
    );
  }

  // backwards compatibility.
  Readable.prototype.setEncoding = function(enc) {
    this._readableState.decoder = new StringDecoder(enc);
    this._readableState.encoding = enc;
    return this;
  };

  // Don't raise the hwm > 8MB
  var MAX_HWM = 0x800000;
  function computeNewHighWaterMark(n) {
    if (n >= MAX_HWM) {
      n = MAX_HWM;
    } else {
      // Get the next highest power of 2 to prevent increasing hwm excessively in
      // tiny amounts
      n--;
      n |= n >>> 1;
      n |= n >>> 2;
      n |= n >>> 4;
      n |= n >>> 8;
      n |= n >>> 16;
      n++;
    }
    return n;
  }

  // This function is designed to be inlinable, so please take care when making
  // changes to the function body.
  function howMuchToRead(n, state) {
    if (n <= 0 || (state.length === 0 && state.ended)) return 0;
    if (state.objectMode) return 1;
    if (n !== n) {
      // Only flow one buffer at a time
      if (state.flowing && state.length) return state.buffer.head.data.length;
      else return state.length;
    }
    // If we're asking for more than the current hwm, then raise the hwm.
    if (n > state.highWaterMark)
      state.highWaterMark = computeNewHighWaterMark(n);
    if (n <= state.length) return n;
    // Don't have enough
    if (!state.ended) {
      state.needReadable = true;
      return 0;
    }
    return state.length;
  }

  // you can override either this method, or the async _read(n) below.
  Readable.prototype.read = function(n) {
    debug('read', n);
    n = parseInt(n, 10);
    var state = this._readableState;
    var nOrig = n;

    if (n !== 0) state.emittedReadable = false;

    // if we're doing read(0) to trigger a readable event, but we
    // already have a bunch of data in the buffer, then just trigger
    // the 'readable' event and move on.
    if (
      n === 0 &&
      state.needReadable &&
      (state.length >= state.highWaterMark || state.ended)
    ) {
      debug('read: emitReadable', state.length, state.ended);
      if (state.length === 0 && state.ended) endReadable(this);
      else emitReadable(this);
      return null;
    }

    n = howMuchToRead(n, state);

    // if we've ended, and we're now clear, then finish it up.
    if (n === 0 && state.ended) {
      if (state.length === 0) endReadable(this);
      return null;
    }

    // All the actual chunk generation logic needs to be
    // *below* the call to _read.  The reason is that in certain
    // synthetic stream cases, such as passthrough streams, _read
    // may be a completely synchronous operation which may change
    // the state of the read buffer, providing enough data when
    // before there was *not* enough.
    //
    // So, the steps are:
    // 1. Figure out what the state of things will be after we do
    // a read from the buffer.
    //
    // 2. If that resulting state will trigger a _read, then call _read.
    // Note that this may be asynchronous, or synchronous.  Yes, it is
    // deeply ugly to write APIs this way, but that still doesn't mean
    // that the Readable class should behave improperly, as streams are
    // designed to be sync/async agnostic.
    // Take note if the _read call is sync or async (ie, if the read call
    // has returned yet), so that we know whether or not it's safe to emit
    // 'readable' etc.
    //
    // 3. Actually pull the requested chunks out of the buffer and return.

    // if we need a readable event, then we need to do some reading.
    var doRead = state.needReadable;
    debug('need readable', doRead);

    // if we currently have less than the highWaterMark, then also read some
    if (state.length === 0 || state.length - n < state.highWaterMark) {
      doRead = true;
      debug('length less than watermark', doRead);
    }

    // however, if we've ended, then there's no point, and if we're already
    // reading, then it's unnecessary.
    if (state.ended || state.reading) {
      doRead = false;
      debug('reading or ended', doRead);
    } else if (doRead) {
      debug('do read');
      state.reading = true;
      state.sync = true;
      // if the length is currently zero, then we *need* a readable event.
      if (state.length === 0) state.needReadable = true;
      // call internal read method
      this._read(state.highWaterMark);
      state.sync = false;
      // If _read pushed data synchronously, then `reading` will be false,
      // and we need to re-evaluate how much data we can return to the user.
      if (!state.reading) n = howMuchToRead(nOrig, state);
    }

    var ret;
    if (n > 0) ret = fromList(n, state);
    else ret = null;

    if (ret === null) {
      state.needReadable = true;
      n = 0;
    } else {
      state.length -= n;
    }

    if (state.length === 0) {
      // If we have nothing in the buffer, then we want to know
      // as soon as we *do* get something into the buffer.
      if (!state.ended) state.needReadable = true;

      // If we tried to read() past the EOF, then emit end on the next tick.
      if (nOrig !== n && state.ended) endReadable(this);
    }

    if (ret !== null) this.emit('data', ret);

    return ret;
  };

  function chunkInvalid(state, chunk) {
    var er = null;
    if (
      !isBuffer$1(chunk) &&
      typeof chunk !== 'string' &&
      chunk !== null &&
      chunk !== undefined &&
      !state.objectMode
    ) {
      er = new TypeError('Invalid non-string/buffer chunk');
    }
    return er;
  }

  function onEofChunk(stream, state) {
    if (state.ended) return;
    if (state.decoder) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) {
        state.buffer.push(chunk);
        state.length += state.objectMode ? 1 : chunk.length;
      }
    }
    state.ended = true;

    // emit 'readable' now to make sure it gets picked up.
    emitReadable(stream);
  }

  // Don't emit readable right away in sync mode, because this can trigger
  // another read() call => stack overflow.  This way, it might trigger
  // a nextTick recursion warning, but that's not so bad.
  function emitReadable(stream) {
    var state = stream._readableState;
    state.needReadable = false;
    if (!state.emittedReadable) {
      debug('emitReadable', state.flowing);
      state.emittedReadable = true;
      if (state.sync) nextTick(emitReadable_, stream);
      else emitReadable_(stream);
    }
  }

  function emitReadable_(stream) {
    debug('emit readable');
    stream.emit('readable');
    flow(stream);
  }

  // at this point, the user has presumably seen the 'readable' event,
  // and called read() to consume some data.  that may have triggered
  // in turn another _read(n) call, in which case reading = true if
  // it's in progress.
  // However, if we're not ended, or reading, and the length < hwm,
  // then go ahead and try to read some more preemptively.
  function maybeReadMore(stream, state) {
    if (!state.readingMore) {
      state.readingMore = true;
      nextTick(maybeReadMore_, stream, state);
    }
  }

  function maybeReadMore_(stream, state) {
    var len = state.length;
    while (
      !state.reading &&
      !state.flowing &&
      !state.ended &&
      state.length < state.highWaterMark
    ) {
      debug('maybeReadMore read 0');
      stream.read(0);
      if (len === state.length)
        // didn't get any data, stop spinning.
        break;
      else len = state.length;
    }
    state.readingMore = false;
  }

  // abstract method.  to be overridden in specific implementation classes.
  // call cb(er, data) where data is <= n in length.
  // for virtual (non-string, non-buffer) streams, "length" is somewhat
  // arbitrary, and perhaps not very meaningful.
  Readable.prototype._read = function(n) {
    this.emit('error', new Error('not implemented'));
  };

  Readable.prototype.pipe = function(dest, pipeOpts) {
    var src = this;
    var state = this._readableState;

    switch (state.pipesCount) {
      case 0:
        state.pipes = dest;
        break;
      case 1:
        state.pipes = [state.pipes, dest];
        break;
      default:
        state.pipes.push(dest);
        break;
    }
    state.pipesCount += 1;
    debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

    var doEnd = !pipeOpts || pipeOpts.end !== false;

    var endFn = doEnd ? onend : cleanup;
    if (state.endEmitted) nextTick(endFn);
    else src.once('end', endFn);

    dest.on('unpipe', onunpipe);
    function onunpipe(readable) {
      debug('onunpipe');
      if (readable === src) {
        cleanup();
      }
    }

    function onend() {
      debug('onend');
      dest.end();
    }

    // when the dest drains, it reduces the awaitDrain counter
    // on the source.  This would be more elegant with a .once()
    // handler in flow(), but adding and removing repeatedly is
    // too slow.
    var ondrain = pipeOnDrain(src);
    dest.on('drain', ondrain);

    var cleanedUp = false;
    function cleanup() {
      debug('cleanup');
      // cleanup event handlers once the pipe is broken
      dest.removeListener('close', onclose);
      dest.removeListener('finish', onfinish);
      dest.removeListener('drain', ondrain);
      dest.removeListener('error', onerror);
      dest.removeListener('unpipe', onunpipe);
      src.removeListener('end', onend);
      src.removeListener('end', cleanup);
      src.removeListener('data', ondata);

      cleanedUp = true;

      // if the reader is waiting for a drain event from this
      // specific writer, then it would cause it to never start
      // flowing again.
      // So, if this is awaiting a drain, then we just call it now.
      // If we don't know, then assume that we are waiting for one.
      if (
        state.awaitDrain &&
        (!dest._writableState || dest._writableState.needDrain)
      )
        ondrain();
    }

    // If the user pushes more data while we're writing to dest then we'll end up
    // in ondata again. However, we only want to increase awaitDrain once because
    // dest will only emit one 'drain' event for the multiple writes.
    // => Introduce a guard on increasing awaitDrain.
    var increasedAwaitDrain = false;
    src.on('data', ondata);
    function ondata(chunk) {
      debug('ondata');
      increasedAwaitDrain = false;
      var ret = dest.write(chunk);
      if (false === ret && !increasedAwaitDrain) {
        // If the user unpiped during `dest.write()`, it is possible
        // to get stuck in a permanently paused state if that write
        // also returned false.
        // => Check whether `dest` is still a piping destination.
        if (
          ((state.pipesCount === 1 && state.pipes === dest) ||
            (state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1)) &&
          !cleanedUp
        ) {
          debug('false write response, pause', src._readableState.awaitDrain);
          src._readableState.awaitDrain++;
          increasedAwaitDrain = true;
        }
        src.pause();
      }
    }

    // if the dest has an error, then stop piping into it.
    // however, don't suppress the throwing behavior for this.
    function onerror(er) {
      debug('onerror', er);
      unpipe();
      dest.removeListener('error', onerror);
      if (listenerCount$1(dest, 'error') === 0) dest.emit('error', er);
    }

    // Make sure our error handler is attached before userland ones.
    prependListener(dest, 'error', onerror);

    // Both close and finish should trigger unpipe, but only once.
    function onclose() {
      dest.removeListener('finish', onfinish);
      unpipe();
    }
    dest.once('close', onclose);
    function onfinish() {
      debug('onfinish');
      dest.removeListener('close', onclose);
      unpipe();
    }
    dest.once('finish', onfinish);

    function unpipe() {
      debug('unpipe');
      src.unpipe(dest);
    }

    // tell the dest that it's being piped to
    dest.emit('pipe', src);

    // start the flow if it hasn't been started already.
    if (!state.flowing) {
      debug('pipe resume');
      src.resume();
    }

    return dest;
  };

  function pipeOnDrain(src) {
    return function() {
      var state = src._readableState;
      debug('pipeOnDrain', state.awaitDrain);
      if (state.awaitDrain) state.awaitDrain--;
      if (state.awaitDrain === 0 && src.listeners('data').length) {
        state.flowing = true;
        flow(src);
      }
    };
  }

  Readable.prototype.unpipe = function(dest) {
    var state = this._readableState;

    // if we're not piping anywhere, then do nothing.
    if (state.pipesCount === 0) return this;

    // just one destination.  most common case.
    if (state.pipesCount === 1) {
      // passed in one, but it's not the right one.
      if (dest && dest !== state.pipes) return this;

      if (!dest) dest = state.pipes;

      // got a match.
      state.pipes = null;
      state.pipesCount = 0;
      state.flowing = false;
      if (dest) dest.emit('unpipe', this);
      return this;
    }

    // slow case. multiple pipe destinations.

    if (!dest) {
      // remove all.
      var dests = state.pipes;
      var len = state.pipesCount;
      state.pipes = null;
      state.pipesCount = 0;
      state.flowing = false;

      for (var _i = 0; _i < len; _i++) {
        dests[_i].emit('unpipe', this);
      }
      return this;
    }

    // try to find the right one.
    var i = indexOf(state.pipes, dest);
    if (i === -1) return this;

    state.pipes.splice(i, 1);
    state.pipesCount -= 1;
    if (state.pipesCount === 1) state.pipes = state.pipes[0];

    dest.emit('unpipe', this);

    return this;
  };

  // set up data events if they are asked for
  // Ensure readable listeners eventually get something
  Readable.prototype.on = function(ev, fn) {
    var res = EventEmitter.prototype.on.call(this, ev, fn);

    if (ev === 'data') {
      // Start flowing on next tick if stream isn't explicitly paused
      if (this._readableState.flowing !== false) this.resume();
    } else if (ev === 'readable') {
      var state = this._readableState;
      if (!state.endEmitted && !state.readableListening) {
        state.readableListening = state.needReadable = true;
        state.emittedReadable = false;
        if (!state.reading) {
          nextTick(nReadingNextTick, this);
        } else if (state.length) {
          emitReadable(this);
        }
      }
    }

    return res;
  };
  Readable.prototype.addListener = Readable.prototype.on;

  function nReadingNextTick(self) {
    debug('readable nexttick read 0');
    self.read(0);
  }

  // pause() and resume() are remnants of the legacy readable stream API
  // If the user uses them, then switch into old mode.
  Readable.prototype.resume = function() {
    var state = this._readableState;
    if (!state.flowing) {
      debug('resume');
      state.flowing = true;
      resume(this, state);
    }
    return this;
  };

  function resume(stream, state) {
    if (!state.resumeScheduled) {
      state.resumeScheduled = true;
      nextTick(resume_, stream, state);
    }
  }

  function resume_(stream, state) {
    if (!state.reading) {
      debug('resume read 0');
      stream.read(0);
    }

    state.resumeScheduled = false;
    state.awaitDrain = 0;
    stream.emit('resume');
    flow(stream);
    if (state.flowing && !state.reading) stream.read(0);
  }

  Readable.prototype.pause = function() {
    debug('call pause flowing=%j', this._readableState.flowing);
    if (false !== this._readableState.flowing) {
      debug('pause');
      this._readableState.flowing = false;
      this.emit('pause');
    }
    return this;
  };

  function flow(stream) {
    var state = stream._readableState;
    debug('flow', state.flowing);
    while (state.flowing && stream.read() !== null) {}
  }

  // wrap an old-style stream as the async data source.
  // This is *not* part of the readable stream interface.
  // It is an ugly unfortunate mess of history.
  Readable.prototype.wrap = function(stream) {
    var state = this._readableState;
    var paused = false;

    var self = this;
    stream.on('end', function() {
      debug('wrapped end');
      if (state.decoder && !state.ended) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length) self.push(chunk);
      }

      self.push(null);
    });

    stream.on('data', function(chunk) {
      debug('wrapped data');
      if (state.decoder) chunk = state.decoder.write(chunk);

      // don't skip over falsy values in objectMode
      if (state.objectMode && (chunk === null || chunk === undefined)) return;
      else if (!state.objectMode && (!chunk || !chunk.length)) return;

      var ret = self.push(chunk);
      if (!ret) {
        paused = true;
        stream.pause();
      }
    });

    // proxy all the other methods.
    // important when wrapping filters and duplexes.
    for (var i in stream) {
      if (this[i] === undefined && typeof stream[i] === 'function') {
        this[i] = (function(method) {
          return function() {
            return stream[method].apply(stream, arguments);
          };
        })(i);
      }
    }

    // proxy certain important events.
    var events = ['error', 'close', 'destroy', 'pause', 'resume'];
    forEach$1(events, function(ev) {
      stream.on(ev, self.emit.bind(self, ev));
    });

    // when we try to consume some more bytes, simply unpause the
    // underlying stream.
    self._read = function(n) {
      debug('wrapped _read', n);
      if (paused) {
        paused = false;
        stream.resume();
      }
    };

    return self;
  };

  // exposed for testing purposes only.
  Readable._fromList = fromList;

  // Pluck off n bytes from an array of buffers.
  // Length is the combined lengths of all the buffers in the list.
  // This function is designed to be inlinable, so please take care when making
  // changes to the function body.
  function fromList(n, state) {
    // nothing buffered
    if (state.length === 0) return null;

    var ret;
    if (state.objectMode) ret = state.buffer.shift();
    else if (!n || n >= state.length) {
      // read it all, truncate the list
      if (state.decoder) ret = state.buffer.join('');
      else if (state.buffer.length === 1) ret = state.buffer.head.data;
      else ret = state.buffer.concat(state.length);
      state.buffer.clear();
    } else {
      // read part of list
      ret = fromListPartial(n, state.buffer, state.decoder);
    }

    return ret;
  }

  // Extracts only enough buffered data to satisfy the amount requested.
  // This function is designed to be inlinable, so please take care when making
  // changes to the function body.
  function fromListPartial(n, list, hasStrings) {
    var ret;
    if (n < list.head.data.length) {
      // slice is the same for buffers and strings
      ret = list.head.data.slice(0, n);
      list.head.data = list.head.data.slice(n);
    } else if (n === list.head.data.length) {
      // first chunk is a perfect match
      ret = list.shift();
    } else {
      // result spans more than one buffer
      ret = hasStrings
        ? copyFromBufferString(n, list)
        : copyFromBuffer(n, list);
    }
    return ret;
  }

  // Copies a specified amount of characters from the list of buffered data
  // chunks.
  // This function is designed to be inlinable, so please take care when making
  // changes to the function body.
  function copyFromBufferString(n, list) {
    var p = list.head;
    var c = 1;
    var ret = p.data;
    n -= ret.length;
    while ((p = p.next)) {
      var str = p.data;
      var nb = n > str.length ? str.length : n;
      if (nb === str.length) ret += str;
      else ret += str.slice(0, n);
      n -= nb;
      if (n === 0) {
        if (nb === str.length) {
          ++c;
          if (p.next) list.head = p.next;
          else list.head = list.tail = null;
        } else {
          list.head = p;
          p.data = str.slice(nb);
        }
        break;
      }
      ++c;
    }
    list.length -= c;
    return ret;
  }

  // Copies a specified amount of bytes from the list of buffered data chunks.
  // This function is designed to be inlinable, so please take care when making
  // changes to the function body.
  function copyFromBuffer(n, list) {
    var ret = Buffer.allocUnsafe(n);
    var p = list.head;
    var c = 1;
    p.data.copy(ret);
    n -= p.data.length;
    while ((p = p.next)) {
      var buf = p.data;
      var nb = n > buf.length ? buf.length : n;
      buf.copy(ret, ret.length - n, 0, nb);
      n -= nb;
      if (n === 0) {
        if (nb === buf.length) {
          ++c;
          if (p.next) list.head = p.next;
          else list.head = list.tail = null;
        } else {
          list.head = p;
          p.data = buf.slice(nb);
        }
        break;
      }
      ++c;
    }
    list.length -= c;
    return ret;
  }

  function endReadable(stream) {
    var state = stream._readableState;

    // If we get here before consuming all the bytes, then that is a
    // bug in node.  Should never happen.
    if (state.length > 0)
      throw new Error('"endReadable()" called on non-empty stream');

    if (!state.endEmitted) {
      state.ended = true;
      nextTick(endReadableNT, state, stream);
    }
  }

  function endReadableNT(state, stream) {
    // Check that we didn't get one last unshift.
    if (!state.endEmitted && state.length === 0) {
      state.endEmitted = true;
      stream.readable = false;
      stream.emit('end');
    }
  }

  function forEach$1(xs, f) {
    for (var i = 0, l = xs.length; i < l; i++) {
      f(xs[i], i);
    }
  }

  function indexOf(xs, x) {
    for (var i = 0, l = xs.length; i < l; i++) {
      if (xs[i] === x) return i;
    }
    return -1;
  }

  // A bit simpler than readable streams.
  Writable.WritableState = WritableState;
  inherits$1(Writable, EventEmitter);

  function nop() {}

  function WriteReq(chunk, encoding, cb) {
    this.chunk = chunk;
    this.encoding = encoding;
    this.callback = cb;
    this.next = null;
  }

  function WritableState(options, stream) {
    Object.defineProperty(this, 'buffer', {
      get: deprecate(function() {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' +
        'instead.')
    });
    options = options || {};

    // object stream flag to indicate whether or not this stream
    // contains buffers or objects.
    this.objectMode = !!options.objectMode;

    if (stream instanceof Duplex)
      this.objectMode = this.objectMode || !!options.writableObjectMode;

    // the point at which write() starts returning false
    // Note: 0 is a valid value, means that we always return false if
    // the entire buffer is not flushed immediately on write()
    var hwm = options.highWaterMark;
    var defaultHwm = this.objectMode ? 16 : 16 * 1024;
    this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

    // cast to ints.
    this.highWaterMark = ~~this.highWaterMark;

    this.needDrain = false;
    // at the start of calling end()
    this.ending = false;
    // when end() has been called, and returned
    this.ended = false;
    // when 'finish' is emitted
    this.finished = false;

    // should we decode strings into buffers before passing to _write?
    // this is here so that some node-core streams can optimize string
    // handling at a lower level.
    var noDecode = options.decodeStrings === false;
    this.decodeStrings = !noDecode;

    // Crypto is kind of old and crusty.  Historically, its default string
    // encoding is 'binary' so we have to make this configurable.
    // Everything else in the universe uses 'utf8', though.
    this.defaultEncoding = options.defaultEncoding || 'utf8';

    // not an actual buffer we keep track of, but a measurement
    // of how much we're waiting to get pushed to some underlying
    // socket or file.
    this.length = 0;

    // a flag to see when we're in the middle of a write.
    this.writing = false;

    // when true all writes will be buffered until .uncork() call
    this.corked = 0;

    // a flag to be able to tell if the onwrite cb is called immediately,
    // or on a later tick.  We set this to true at first, because any
    // actions that shouldn't happen until "later" should generally also
    // not happen before the first write call.
    this.sync = true;

    // a flag to know if we're processing previously buffered items, which
    // may call the _write() callback in the same tick, so that we don't
    // end up in an overlapped onwrite situation.
    this.bufferProcessing = false;

    // the callback that's passed to _write(chunk,cb)
    this.onwrite = function(er) {
      onwrite(stream, er);
    };

    // the callback that the user supplies to write(chunk,encoding,cb)
    this.writecb = null;

    // the amount that is being written when _write is called.
    this.writelen = 0;

    this.bufferedRequest = null;
    this.lastBufferedRequest = null;

    // number of pending user-supplied write callbacks
    // this must be 0 before 'finish' can be emitted
    this.pendingcb = 0;

    // emit prefinish if the only thing we're waiting for is _write cbs
    // This is relevant for synchronous Transform streams
    this.prefinished = false;

    // True if the error was already emitted and should not be thrown again
    this.errorEmitted = false;

    // count buffered requests
    this.bufferedRequestCount = 0;

    // allocate the first CorkedRequest, there is always
    // one allocated and free to use, and we maintain at most two
    this.corkedRequestsFree = new CorkedRequest(this);
  }

  WritableState.prototype.getBuffer = function writableStateGetBuffer() {
    var current = this.bufferedRequest;
    var out = [];
    while (current) {
      out.push(current);
      current = current.next;
    }
    return out;
  };
  function Writable(options) {
    // Writable ctor is applied to Duplexes, though they're not
    // instanceof Writable, they're instanceof Readable.
    if (!(this instanceof Writable) && !(this instanceof Duplex))
      return new Writable(options);

    this._writableState = new WritableState(options, this);

    // legacy.
    this.writable = true;

    if (options) {
      if (typeof options.write === 'function') this._write = options.write;

      if (typeof options.writev === 'function') this._writev = options.writev;
    }

    EventEmitter.call(this);
  }

  // Otherwise people can pipe Writable streams, which is just wrong.
  Writable.prototype.pipe = function() {
    this.emit('error', new Error('Cannot pipe, not readable'));
  };

  function writeAfterEnd(stream, cb) {
    var er = new Error('write after end');
    // TODO: defer error events consistently everywhere, not just the cb
    stream.emit('error', er);
    nextTick(cb, er);
  }

  // If we get something that is not a buffer, string, null, or undefined,
  // and we're not in objectMode, then that's an error.
  // Otherwise stream chunks are all considered to be of length=1, and the
  // watermarks determine how many objects to keep in the buffer, rather than
  // how many bytes or characters.
  function validChunk(stream, state, chunk, cb) {
    var valid = true;
    var er = false;
    // Always throw error if a null is written
    // if we are not in object mode then throw
    // if it is not a buffer, string, or undefined.
    if (chunk === null) {
      er = new TypeError('May not write null values to stream');
    } else if (
      !Buffer.isBuffer(chunk) &&
      typeof chunk !== 'string' &&
      chunk !== undefined &&
      !state.objectMode
    ) {
      er = new TypeError('Invalid non-string/buffer chunk');
    }
    if (er) {
      stream.emit('error', er);
      nextTick(cb, er);
      valid = false;
    }
    return valid;
  }

  Writable.prototype.write = function(chunk, encoding, cb) {
    var state = this._writableState;
    var ret = false;

    if (typeof encoding === 'function') {
      cb = encoding;
      encoding = null;
    }

    if (Buffer.isBuffer(chunk)) encoding = 'buffer';
    else if (!encoding) encoding = state.defaultEncoding;

    if (typeof cb !== 'function') cb = nop;

    if (state.ended) writeAfterEnd(this, cb);
    else if (validChunk(this, state, chunk, cb)) {
      state.pendingcb++;
      ret = writeOrBuffer(this, state, chunk, encoding, cb);
    }

    return ret;
  };

  Writable.prototype.cork = function() {
    var state = this._writableState;

    state.corked++;
  };

  Writable.prototype.uncork = function() {
    var state = this._writableState;

    if (state.corked) {
      state.corked--;

      if (
        !state.writing &&
        !state.corked &&
        !state.finished &&
        !state.bufferProcessing &&
        state.bufferedRequest
      )
        clearBuffer(this, state);
    }
  };

  Writable.prototype.setDefaultEncoding = function setDefaultEncoding(
    encoding
  ) {
    // node::ParseEncoding() requires lower case.
    if (typeof encoding === 'string') encoding = encoding.toLowerCase();
    if (
      !(
        [
          'hex',
          'utf8',
          'utf-8',
          'ascii',
          'binary',
          'base64',
          'ucs2',
          'ucs-2',
          'utf16le',
          'utf-16le',
          'raw'
        ].indexOf((encoding + '').toLowerCase()) > -1
      )
    )
      throw new TypeError('Unknown encoding: ' + encoding);
    this._writableState.defaultEncoding = encoding;
    return this;
  };

  function decodeChunk(state, chunk, encoding) {
    if (
      !state.objectMode &&
      state.decodeStrings !== false &&
      typeof chunk === 'string'
    ) {
      chunk = Buffer.from(chunk, encoding);
    }
    return chunk;
  }

  // if we're already writing something, then just put this
  // in the queue, and wait our turn.  Otherwise, call _write
  // If we return false, then we need a drain event, so set that flag.
  function writeOrBuffer(stream, state, chunk, encoding, cb) {
    chunk = decodeChunk(state, chunk, encoding);

    if (Buffer.isBuffer(chunk)) encoding = 'buffer';
    var len = state.objectMode ? 1 : chunk.length;

    state.length += len;

    var ret = state.length < state.highWaterMark;
    // we must ensure that previous needDrain will not be reset to false.
    if (!ret) state.needDrain = true;

    if (state.writing || state.corked) {
      var last = state.lastBufferedRequest;
      state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
      if (last) {
        last.next = state.lastBufferedRequest;
      } else {
        state.bufferedRequest = state.lastBufferedRequest;
      }
      state.bufferedRequestCount += 1;
    } else {
      doWrite(stream, state, false, len, chunk, encoding, cb);
    }

    return ret;
  }

  function doWrite(stream, state, writev, len, chunk, encoding, cb) {
    state.writelen = len;
    state.writecb = cb;
    state.writing = true;
    state.sync = true;
    if (writev) stream._writev(chunk, state.onwrite);
    else stream._write(chunk, encoding, state.onwrite);
    state.sync = false;
  }

  function onwriteError(stream, state, sync, er, cb) {
    --state.pendingcb;
    if (sync) nextTick(cb, er);
    else cb(er);

    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  }

  function onwriteStateUpdate(state) {
    state.writing = false;
    state.writecb = null;
    state.length -= state.writelen;
    state.writelen = 0;
  }

  function onwrite(stream, er) {
    var state = stream._writableState;
    var sync = state.sync;
    var cb = state.writecb;

    onwriteStateUpdate(state);

    if (er) onwriteError(stream, state, sync, er, cb);
    else {
      // Check if we're actually ready to finish, but don't emit yet
      var finished = needFinish(state);

      if (
        !finished &&
        !state.corked &&
        !state.bufferProcessing &&
        state.bufferedRequest
      ) {
        clearBuffer(stream, state);
      }

      if (sync) {
        /*<replacement>*/
        nextTick(afterWrite, stream, state, finished, cb);
        /*</replacement>*/
      } else {
        afterWrite(stream, state, finished, cb);
      }
    }
  }

  function afterWrite(stream, state, finished, cb) {
    if (!finished) onwriteDrain(stream, state);
    state.pendingcb--;
    cb();
    finishMaybe(stream, state);
  }

  // Must force callback to be called on nextTick, so that we don't
  // emit 'drain' before the write() consumer gets the 'false' return
  // value, and has a chance to attach a 'drain' listener.
  function onwriteDrain(stream, state) {
    if (state.length === 0 && state.needDrain) {
      state.needDrain = false;
      stream.emit('drain');
    }
  }

  // if there's something in the buffer waiting, then process it
  function clearBuffer(stream, state) {
    state.bufferProcessing = true;
    var entry = state.bufferedRequest;

    if (stream._writev && entry && entry.next) {
      // Fast case, write everything using _writev()
      var l = state.bufferedRequestCount;
      var buffer = new Array(l);
      var holder = state.corkedRequestsFree;
      holder.entry = entry;

      var count = 0;
      while (entry) {
        buffer[count] = entry;
        entry = entry.next;
        count += 1;
      }

      doWrite(stream, state, true, state.length, buffer, '', holder.finish);

      // doWrite is almost always async, defer these to save a bit of time
      // as the hot path ends with doWrite
      state.pendingcb++;
      state.lastBufferedRequest = null;
      if (holder.next) {
        state.corkedRequestsFree = holder.next;
        holder.next = null;
      } else {
        state.corkedRequestsFree = new CorkedRequest(state);
      }
    } else {
      // Slow case, write chunks one-by-one
      while (entry) {
        var chunk = entry.chunk;
        var encoding = entry.encoding;
        var cb = entry.callback;
        var len = state.objectMode ? 1 : chunk.length;

        doWrite(stream, state, false, len, chunk, encoding, cb);
        entry = entry.next;
        // if we didn't call the onwrite immediately, then
        // it means that we need to wait until it does.
        // also, that means that the chunk and cb are currently
        // being processed, so move the buffer counter past them.
        if (state.writing) {
          break;
        }
      }

      if (entry === null) state.lastBufferedRequest = null;
    }

    state.bufferedRequestCount = 0;
    state.bufferedRequest = entry;
    state.bufferProcessing = false;
  }

  Writable.prototype._write = function(chunk, encoding, cb) {
    cb(new Error('not implemented'));
  };

  Writable.prototype._writev = null;

  Writable.prototype.end = function(chunk, encoding, cb) {
    var state = this._writableState;

    if (typeof chunk === 'function') {
      cb = chunk;
      chunk = null;
      encoding = null;
    } else if (typeof encoding === 'function') {
      cb = encoding;
      encoding = null;
    }

    if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

    // .end() fully uncorks
    if (state.corked) {
      state.corked = 1;
      this.uncork();
    }

    // ignore unnecessary end() calls.
    if (!state.ending && !state.finished) endWritable(this, state, cb);
  };

  function needFinish(state) {
    return (
      state.ending &&
      state.length === 0 &&
      state.bufferedRequest === null &&
      !state.finished &&
      !state.writing
    );
  }

  function prefinish(stream, state) {
    if (!state.prefinished) {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }

  function finishMaybe(stream, state) {
    var need = needFinish(state);
    if (need) {
      if (state.pendingcb === 0) {
        prefinish(stream, state);
        state.finished = true;
        stream.emit('finish');
      } else {
        prefinish(stream, state);
      }
    }
    return need;
  }

  function endWritable(stream, state, cb) {
    state.ending = true;
    finishMaybe(stream, state);
    if (cb) {
      if (state.finished) nextTick(cb);
      else stream.once('finish', cb);
    }
    state.ended = true;
    stream.writable = false;
  }

  // It seems a linked list but it is not
  // there will be only 2 of these for each stream
  function CorkedRequest(state) {
    var _this = this;

    this.next = null;
    this.entry = null;

    this.finish = function(err) {
      var entry = _this.entry;
      _this.entry = null;
      while (entry) {
        var cb = entry.callback;
        state.pendingcb--;
        cb(err);
        entry = entry.next;
      }
      if (state.corkedRequestsFree) {
        state.corkedRequestsFree.next = _this;
      } else {
        state.corkedRequestsFree = _this;
      }
    };
  }

  inherits$1(Duplex, Readable);

  var keys = Object.keys(Writable.prototype);
  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method])
      Duplex.prototype[method] = Writable.prototype[method];
  }
  function Duplex(options) {
    if (!(this instanceof Duplex)) return new Duplex(options);

    Readable.call(this, options);
    Writable.call(this, options);

    if (options && options.readable === false) this.readable = false;

    if (options && options.writable === false) this.writable = false;

    this.allowHalfOpen = true;
    if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

    this.once('end', onend);
  }

  // the no-half-open enforcer
  function onend() {
    // if we allow half-open state, or if the writable side ended,
    // then we're ok.
    if (this.allowHalfOpen || this._writableState.ended) return;

    // no more data can be written.
    // But allow more writes to happen in this tick.
    nextTick(onEndNT, this);
  }

  function onEndNT(self) {
    self.end();
  }

  // a transform stream is a readable/writable stream where you do
  inherits$1(Transform, Duplex);

  function TransformState(stream) {
    this.afterTransform = function(er, data) {
      return afterTransform(stream, er, data);
    };

    this.needTransform = false;
    this.transforming = false;
    this.writecb = null;
    this.writechunk = null;
    this.writeencoding = null;
  }

  function afterTransform(stream, er, data) {
    var ts = stream._transformState;
    ts.transforming = false;

    var cb = ts.writecb;

    if (!cb)
      return stream.emit('error', new Error('no writecb in Transform class'));

    ts.writechunk = null;
    ts.writecb = null;

    if (data !== null && data !== undefined) stream.push(data);

    cb(er);

    var rs = stream._readableState;
    rs.reading = false;
    if (rs.needReadable || rs.length < rs.highWaterMark) {
      stream._read(rs.highWaterMark);
    }
  }
  function Transform(options) {
    if (!(this instanceof Transform)) return new Transform(options);

    Duplex.call(this, options);

    this._transformState = new TransformState(this);

    // when the writable side finishes, then flush out anything remaining.
    var stream = this;

    // start out asking for a readable event once data is transformed.
    this._readableState.needReadable = true;

    // we have implemented the _read method, and done the other things
    // that Readable wants before the first _read call, so unset the
    // sync guard flag.
    this._readableState.sync = false;

    if (options) {
      if (typeof options.transform === 'function')
        this._transform = options.transform;

      if (typeof options.flush === 'function') this._flush = options.flush;
    }

    this.once('prefinish', function() {
      if (typeof this._flush === 'function')
        this._flush(function(er) {
          done(stream, er);
        });
      else done(stream);
    });
  }

  Transform.prototype.push = function(chunk, encoding) {
    this._transformState.needTransform = false;
    return Duplex.prototype.push.call(this, chunk, encoding);
  };

  // This is the part where you do stuff!
  // override this function in implementation classes.
  // 'chunk' is an input chunk.
  //
  // Call `push(newChunk)` to pass along transformed output
  // to the readable side.  You may call 'push' zero or more times.
  //
  // Call `cb(err)` when you are done with this chunk.  If you pass
  // an error, then that'll put the hurt on the whole operation.  If you
  // never call cb(), then you'll never get another chunk.
  Transform.prototype._transform = function(chunk, encoding, cb) {
    throw new Error('Not implemented');
  };

  Transform.prototype._write = function(chunk, encoding, cb) {
    var ts = this._transformState;
    ts.writecb = cb;
    ts.writechunk = chunk;
    ts.writeencoding = encoding;
    if (!ts.transforming) {
      var rs = this._readableState;
      if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
        this._read(rs.highWaterMark);
    }
  };

  // Doesn't matter what the args are here.
  // _transform does all the work.
  // That we got here means that the readable side wants more data.
  Transform.prototype._read = function(n) {
    var ts = this._transformState;

    if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
      ts.transforming = true;
      this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
    } else {
      // mark that we need a transform, so that any data that comes in
      // will get processed, now that we've asked for it.
      ts.needTransform = true;
    }
  };

  function done(stream, er) {
    if (er) return stream.emit('error', er);

    // if there's nothing in the write buffer, then that means
    // that nothing more will ever be provided
    var ws = stream._writableState;
    var ts = stream._transformState;

    if (ws.length)
      throw new Error('Calling transform done when ws.length != 0');

    if (ts.transforming)
      throw new Error('Calling transform done when still transforming');

    return stream.push(null);
  }

  inherits$1(PassThrough, Transform);
  function PassThrough(options) {
    if (!(this instanceof PassThrough)) return new PassThrough(options);

    Transform.call(this, options);
  }

  PassThrough.prototype._transform = function(chunk, encoding, cb) {
    cb(null, chunk);
  };

  inherits$1(Stream, EventEmitter);
  Stream.Readable = Readable;
  Stream.Writable = Writable;
  Stream.Duplex = Duplex;
  Stream.Transform = Transform;
  Stream.PassThrough = PassThrough;

  // Backwards-compat with node 0.4.x
  Stream.Stream = Stream;

  // old-style streams.  Note that the pipe method (the only relevant
  // part of this class) is overridden in the Readable class.

  function Stream() {
    EventEmitter.call(this);
  }

  Stream.prototype.pipe = function(dest, options) {
    var source = this;

    function ondata(chunk) {
      if (dest.writable) {
        if (false === dest.write(chunk) && source.pause) {
          source.pause();
        }
      }
    }

    source.on('data', ondata);

    function ondrain() {
      if (source.readable && source.resume) {
        source.resume();
      }
    }

    dest.on('drain', ondrain);

    // If the 'end' option is not supplied, dest.end() will be called when
    // source gets the 'end' or 'close' events.  Only dest.end() once.
    if (!dest._isStdio && (!options || options.end !== false)) {
      source.on('end', onend);
      source.on('close', onclose);
    }

    var didOnEnd = false;
    function onend() {
      if (didOnEnd) return;
      didOnEnd = true;

      dest.end();
    }

    function onclose() {
      if (didOnEnd) return;
      didOnEnd = true;

      if (typeof dest.destroy === 'function') dest.destroy();
    }

    // don't leave dangling pipes when there are errors.
    function onerror(er) {
      cleanup();
      if (EventEmitter.listenerCount(this, 'error') === 0) {
        throw er; // Unhandled stream error in pipe.
      }
    }

    source.on('error', onerror);
    dest.on('error', onerror);

    // remove all the event listeners that were added.
    function cleanup() {
      source.removeListener('data', ondata);
      dest.removeListener('drain', ondrain);

      source.removeListener('end', onend);
      source.removeListener('close', onclose);

      source.removeListener('error', onerror);
      dest.removeListener('error', onerror);

      source.removeListener('end', cleanup);
      source.removeListener('close', cleanup);

      dest.removeListener('close', cleanup);
    }

    source.on('end', cleanup);
    source.on('close', cleanup);

    dest.on('close', cleanup);

    dest.emit('pipe', source);

    // Allow for unix-like usage: A.pipe(B).pipe(C)
    return dest;
  };

  var rStates = {
    UNSENT: 0,
    OPENED: 1,
    HEADERS_RECEIVED: 2,
    LOADING: 3,
    DONE: 4
  };
  function IncomingMessage(xhr, response, mode) {
    var self = this;
    Readable.call(self);

    self._mode = mode;
    self.headers = {};
    self.rawHeaders = [];
    self.trailers = {};
    self.rawTrailers = [];

    // Fake the 'close' event, but only once 'end' fires
    self.on('end', function() {
      // The nextTick is necessary to prevent the 'request' module from causing an infinite loop
      nextTick(function() {
        self.emit('close');
      });
    });
    var read;
    if (mode === 'fetch') {
      self._fetchResponse = response;

      self.url = response.url;
      self.statusCode = response.status;
      self.statusMessage = response.statusText;
      // backwards compatible version of for (<item> of <iterable>):
      // for (var <item>,_i,_it = <iterable>[Symbol.iterator](); <item> = (_i = _it.next()).value,!_i.done;)
      for (
        var header, _i, _it = response.headers[Symbol.iterator]();
        (header = (_i = _it.next()).value), !_i.done;

      ) {
        self.headers[header[0].toLowerCase()] = header[1];
        self.rawHeaders.push(header[0], header[1]);
      }

      // TODO: this doesn't respect backpressure. Once WritableStream is available, this can be fixed
      var reader = response.body.getReader();

      read = function() {
        reader.read().then(function(result) {
          if (self._destroyed) return;
          if (result.done) {
            self.push(null);
            return;
          }
          self.push(new Buffer(result.value));
          read();
        });
      };
      read();
    } else {
      self._xhr = xhr;
      self._pos = 0;

      self.url = xhr.responseURL;
      self.statusCode = xhr.status;
      self.statusMessage = xhr.statusText;
      var headers = xhr.getAllResponseHeaders().split(/\r?\n/);
      headers.forEach(function(header) {
        var matches = header.match(/^([^:]+):\s*(.*)/);
        if (matches) {
          var key = matches[1].toLowerCase();
          if (key === 'set-cookie') {
            if (self.headers[key] === undefined) {
              self.headers[key] = [];
            }
            self.headers[key].push(matches[2]);
          } else if (self.headers[key] !== undefined) {
            self.headers[key] += ', ' + matches[2];
          } else {
            self.headers[key] = matches[2];
          }
          self.rawHeaders.push(matches[1], matches[2]);
        }
      });

      self._charset = 'x-user-defined';
      if (!overrideMimeType) {
        var mimeType = self.rawHeaders['mime-type'];
        if (mimeType) {
          var charsetMatch = mimeType.match(/;\s*charset=([^;])(;|$)/);
          if (charsetMatch) {
            self._charset = charsetMatch[1].toLowerCase();
          }
        }
        if (!self._charset) self._charset = 'utf-8'; // best guess
      }
    }
  }

  inherits$1(IncomingMessage, Readable);

  IncomingMessage.prototype._read = function() {};

  IncomingMessage.prototype._onXHRProgress = function() {
    var self = this;

    var xhr = self._xhr;

    var response = null;
    switch (self._mode) {
      case 'text:vbarray': // For IE9
        if (xhr.readyState !== rStates.DONE) break;
        try {
          // This fails in IE8
          response = new global$1.VBArray(xhr.responseBody).toArray();
        } catch (e) {
          // pass
        }
        if (response !== null) {
          self.push(new Buffer(response));
          break;
        }
      // Falls through in IE8
      case 'text':
        try {
          // This will fail when readyState = 3 in IE9. Switch mode and wait for readyState = 4
          response = xhr.responseText;
        } catch (e) {
          self._mode = 'text:vbarray';
          break;
        }
        if (response.length > self._pos) {
          var newData = response.substr(self._pos);
          if (self._charset === 'x-user-defined') {
            var buffer = new Buffer(newData.length);
            for (var i = 0; i < newData.length; i++)
              buffer[i] = newData.charCodeAt(i) & 0xff;

            self.push(buffer);
          } else {
            self.push(newData, self._charset);
          }
          self._pos = response.length;
        }
        break;
      case 'arraybuffer':
        if (xhr.readyState !== rStates.DONE || !xhr.response) break;
        response = xhr.response;
        self.push(new Buffer(new Uint8Array(response)));
        break;
      case 'moz-chunked-arraybuffer': // take whole
        response = xhr.response;
        if (xhr.readyState !== rStates.LOADING || !response) break;
        self.push(new Buffer(new Uint8Array(response)));
        break;
      case 'ms-stream':
        response = xhr.response;
        if (xhr.readyState !== rStates.LOADING) break;
        var reader = new global$1.MSStreamReader();
        reader.onprogress = function() {
          if (reader.result.byteLength > self._pos) {
            self.push(
              new Buffer(new Uint8Array(reader.result.slice(self._pos)))
            );
            self._pos = reader.result.byteLength;
          }
        };
        reader.onload = function() {
          self.push(null);
        };
        // reader.onerror = ??? // TODO: this
        reader.readAsArrayBuffer(response);
        break;
    }

    // The ms-stream case handles end separately in reader.onload()
    if (self._xhr.readyState === rStates.DONE && self._mode !== 'ms-stream') {
      self.push(null);
    }
  };

  // from https://github.com/jhiesey/to-arraybuffer/blob/6502d9850e70ba7935a7df4ad86b358fc216f9f0/index.js
  function toArrayBuffer(buf) {
    // If the buffer is backed by a Uint8Array, a faster version will work
    if (buf instanceof Uint8Array) {
      // If the buffer isn't a subarray, return the underlying ArrayBuffer
      if (buf.byteOffset === 0 && buf.byteLength === buf.buffer.byteLength) {
        return buf.buffer;
      } else if (typeof buf.buffer.slice === 'function') {
        // Otherwise we need to get a proper copy
        return buf.buffer.slice(
          buf.byteOffset,
          buf.byteOffset + buf.byteLength
        );
      }
    }

    if (isBuffer$1(buf)) {
      // This is the slow version that will work with any Buffer
      // implementation (even in old browsers)
      var arrayCopy = new Uint8Array(buf.length);
      var len = buf.length;
      for (var i = 0; i < len; i++) {
        arrayCopy[i] = buf[i];
      }
      return arrayCopy.buffer;
    } else {
      throw new Error('Argument must be a Buffer');
    }
  }

  function decideMode(preferBinary, useFetch) {
    if (hasFetch && useFetch) {
      return 'fetch';
    } else if (mozchunkedarraybuffer) {
      return 'moz-chunked-arraybuffer';
    } else if (msstream) {
      return 'ms-stream';
    } else if (arraybuffer && preferBinary) {
      return 'arraybuffer';
    } else if (vbArray && preferBinary) {
      return 'text:vbarray';
    } else {
      return 'text';
    }
  }

  function ClientRequest(opts) {
    var self = this;
    Writable.call(self);

    self._opts = opts;
    self._body = [];
    self._headers = {};
    if (opts.auth)
      self.setHeader(
        'Authorization',
        'Basic ' + new Buffer(opts.auth).toString('base64')
      );
    Object.keys(opts.headers).forEach(function(name) {
      self.setHeader(name, opts.headers[name]);
    });

    var preferBinary;
    var useFetch = true;
    if (opts.mode === 'disable-fetch') {
      // If the use of XHR should be preferred and includes preserving the 'content-type' header
      useFetch = false;
      preferBinary = true;
    } else if (opts.mode === 'prefer-streaming') {
      // If streaming is a high priority but binary compatibility and
      // the accuracy of the 'content-type' header aren't
      preferBinary = false;
    } else if (opts.mode === 'allow-wrong-content-type') {
      // If streaming is more important than preserving the 'content-type' header
      preferBinary = !overrideMimeType;
    } else if (
      !opts.mode ||
      opts.mode === 'default' ||
      opts.mode === 'prefer-fast'
    ) {
      // Use binary if text streaming may corrupt data or the content-type header, or for speed
      preferBinary = true;
    } else {
      throw new Error('Invalid value for opts.mode');
    }
    self._mode = decideMode(preferBinary, useFetch);

    self.on('finish', function() {
      self._onFinish();
    });
  }

  inherits$1(ClientRequest, Writable);
  // Taken from http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader%28%29-method
  var unsafeHeaders = [
    'accept-charset',
    'accept-encoding',
    'access-control-request-headers',
    'access-control-request-method',
    'connection',
    'content-length',
    'cookie',
    'cookie2',
    'date',
    'dnt',
    'expect',
    'host',
    'keep-alive',
    'origin',
    'referer',
    'te',
    'trailer',
    'transfer-encoding',
    'upgrade',
    'user-agent',
    'via'
  ];
  ClientRequest.prototype.setHeader = function(name, value) {
    var self = this;
    var lowerName = name.toLowerCase();
    // This check is not necessary, but it prevents warnings from browsers about setting unsafe
    // headers. To be honest I'm not entirely sure hiding these warnings is a good thing, but
    // http-browserify did it, so I will too.
    if (unsafeHeaders.indexOf(lowerName) !== -1) return;

    self._headers[lowerName] = {
      name: name,
      value: value
    };
  };

  ClientRequest.prototype.getHeader = function(name) {
    var self = this;
    return self._headers[name.toLowerCase()].value;
  };

  ClientRequest.prototype.removeHeader = function(name) {
    var self = this;
    delete self._headers[name.toLowerCase()];
  };

  ClientRequest.prototype._onFinish = function() {
    var self = this;

    if (self._destroyed) return;
    var opts = self._opts;

    var headersObj = self._headers;
    var body;
    if (
      opts.method === 'POST' ||
      opts.method === 'PUT' ||
      opts.method === 'PATCH'
    ) {
      if (blobConstructor()) {
        body = new global$1.Blob(
          self._body.map(function(buffer) {
            return toArrayBuffer(buffer);
          }),
          {
            type: (headersObj['content-type'] || {}).value || ''
          }
        );
      } else {
        // get utf8 string
        body = Buffer.concat(self._body).toString();
      }
    }

    if (self._mode === 'fetch') {
      var headers = Object.keys(headersObj).map(function(name) {
        return [headersObj[name].name, headersObj[name].value];
      });

      global$1
        .fetch(self._opts.url, {
          method: self._opts.method,
          headers: headers,
          body: body,
          mode: 'cors',
          credentials: opts.withCredentials ? 'include' : 'same-origin'
        })
        .then(
          function(response) {
            self._fetchResponse = response;
            self._connect();
          },
          function(reason) {
            self.emit('error', reason);
          }
        );
    } else {
      var xhr = (self._xhr = new global$1.XMLHttpRequest());
      try {
        xhr.open(self._opts.method, self._opts.url, true);
      } catch (err) {
        nextTick(function() {
          self.emit('error', err);
        });
        return;
      }

      // Can't set responseType on really old browsers
      if ('responseType' in xhr) xhr.responseType = self._mode.split(':')[0];

      if ('withCredentials' in xhr)
        xhr.withCredentials = !!opts.withCredentials;

      if (self._mode === 'text' && 'overrideMimeType' in xhr)
        xhr.overrideMimeType('text/plain; charset=x-user-defined');

      Object.keys(headersObj).forEach(function(name) {
        xhr.setRequestHeader(headersObj[name].name, headersObj[name].value);
      });

      self._response = null;
      xhr.onreadystatechange = function() {
        switch (xhr.readyState) {
          case rStates.LOADING:
          case rStates.DONE:
            self._onXHRProgress();
            break;
        }
      };
      // Necessary for streaming in Firefox, since xhr.response is ONLY defined
      // in onprogress, not in onreadystatechange with xhr.readyState = 3
      if (self._mode === 'moz-chunked-arraybuffer') {
        xhr.onprogress = function() {
          self._onXHRProgress();
        };
      }

      xhr.onerror = function() {
        if (self._destroyed) return;
        self.emit('error', new Error('XHR error'));
      };

      try {
        xhr.send(body);
      } catch (err) {
        nextTick(function() {
          self.emit('error', err);
        });
        return;
      }
    }
  };

  /**
   * Checks if xhr.status is readable and non-zero, indicating no error.
   * Even though the spec says it should be available in readyState 3,
   * accessing it throws an exception in IE8
   */
  function statusValid(xhr) {
    try {
      var status = xhr.status;
      return status !== null && status !== 0;
    } catch (e) {
      return false;
    }
  }

  ClientRequest.prototype._onXHRProgress = function() {
    var self = this;

    if (!statusValid(self._xhr) || self._destroyed) return;

    if (!self._response) self._connect();

    self._response._onXHRProgress();
  };

  ClientRequest.prototype._connect = function() {
    var self = this;

    if (self._destroyed) return;

    self._response = new IncomingMessage(
      self._xhr,
      self._fetchResponse,
      self._mode
    );
    self.emit('response', self._response);
  };

  ClientRequest.prototype._write = function(chunk, encoding, cb) {
    var self = this;

    self._body.push(chunk);
    cb();
  };

  ClientRequest.prototype.abort = ClientRequest.prototype.destroy = function() {
    var self = this;
    self._destroyed = true;
    if (self._response) self._response._destroyed = true;
    if (self._xhr) self._xhr.abort();
    // Currently, there isn't a way to truly abort a fetch.
    // If you like bikeshedding, see https://github.com/whatwg/fetch/issues/27
  };

  ClientRequest.prototype.end = function(data, encoding, cb) {
    var self = this;
    if (typeof data === 'function') {
      cb = data;
      data = undefined;
    }

    Writable.prototype.end.call(self, data, encoding, cb);
  };

  ClientRequest.prototype.flushHeaders = function() {};
  ClientRequest.prototype.setTimeout = function() {};
  ClientRequest.prototype.setNoDelay = function() {};
  ClientRequest.prototype.setSocketKeepAlive = function() {};

  /*! https://mths.be/punycode v1.4.1 by @mathias */

  /** Highest positive signed 32-bit float value */
  var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

  /** Bootstring parameters */
  var base = 36;
  var tMin = 1;
  var tMax = 26;
  var skew = 38;
  var damp = 700;
  var initialBias = 72;
  var initialN = 128; // 0x80
  var delimiter = '-'; // '\x2D'

  /** Regular expressions */
  var regexPunycode = /^xn--/;
  var regexNonASCII = /[^\x20-\x7E]/; // unprintable ASCII chars + non-ASCII chars
  var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

  /** Error messages */
  var errors = {
    overflow: 'Overflow: input needs wider integers to process',
    'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
    'invalid-input': 'Invalid input'
  };

  /** Convenience shortcuts */
  var baseMinusTMin = base - tMin;
  var floor = Math.floor;
  var stringFromCharCode = String.fromCharCode;

  /*--------------------------------------------------------------------------*/

  /**
   * A generic error utility function.
   * @private
   * @param {String} type The error type.
   * @returns {Error} Throws a `RangeError` with the applicable error message.
   */
  function error(type) {
    throw new RangeError(errors[type]);
  }

  /**
   * A generic `Array#map` utility function.
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function that gets called for every array
   * item.
   * @returns {Array} A new array of values returned by the callback function.
   */
  function map(array, fn) {
    var length = array.length;
    var result = [];
    while (length--) {
      result[length] = fn(array[length]);
    }
    return result;
  }

  /**
   * A simple `Array#map`-like wrapper to work with domain name strings or email
   * addresses.
   * @private
   * @param {String} domain The domain name or email address.
   * @param {Function} callback The function that gets called for every
   * character.
   * @returns {Array} A new string of characters returned by the callback
   * function.
   */
  function mapDomain(string, fn) {
    var parts = string.split('@');
    var result = '';
    if (parts.length > 1) {
      // In email addresses, only the domain name should be punycoded. Leave
      // the local part (i.e. everything up to `@`) intact.
      result = parts[0] + '@';
      string = parts[1];
    }
    // Avoid `split(regex)` for IE8 compatibility. See #17.
    string = string.replace(regexSeparators, '\x2E');
    var labels = string.split('.');
    var encoded = map(labels, fn).join('.');
    return result + encoded;
  }

  /**
   * Creates an array containing the numeric code points of each Unicode
   * character in the string. While JavaScript uses UCS-2 internally,
   * this function will convert a pair of surrogate halves (each of which
   * UCS-2 exposes as separate characters) into a single code point,
   * matching UTF-16.
   * @see `punycode.ucs2.encode`
   * @see <https://mathiasbynens.be/notes/javascript-encoding>
   * @memberOf punycode.ucs2
   * @name decode
   * @param {String} string The Unicode input string (UCS-2).
   * @returns {Array} The new array of code points.
   */
  function ucs2decode(string) {
    var output = [],
      counter = 0,
      length = string.length,
      value,
      extra;
    while (counter < length) {
      value = string.charCodeAt(counter++);
      if (value >= 0xd800 && value <= 0xdbff && counter < length) {
        // high surrogate, and there is a next character
        extra = string.charCodeAt(counter++);
        if ((extra & 0xfc00) == 0xdc00) {
          // low surrogate
          output.push(((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000);
        } else {
          // unmatched surrogate; only append this code unit, in case the next
          // code unit is the high surrogate of a surrogate pair
          output.push(value);
          counter--;
        }
      } else {
        output.push(value);
      }
    }
    return output;
  }

  /**
   * Creates a string based on an array of numeric code points.
   * @see `punycode.ucs2.decode`
   * @memberOf punycode.ucs2
   * @name encode
   * @param {Array} codePoints The array of numeric code points.
   * @returns {String} The new Unicode string (UCS-2).
   */
  function ucs2encode(array) {
    return map(array, function(value) {
      var output = '';
      if (value > 0xffff) {
        value -= 0x10000;
        output += stringFromCharCode(((value >>> 10) & 0x3ff) | 0xd800);
        value = 0xdc00 | (value & 0x3ff);
      }
      output += stringFromCharCode(value);
      return output;
    }).join('');
  }

  /**
   * Converts a basic code point into a digit/integer.
   * @see `digitToBasic()`
   * @private
   * @param {Number} codePoint The basic numeric code point value.
   * @returns {Number} The numeric value of a basic code point (for use in
   * representing integers) in the range `0` to `base - 1`, or `base` if
   * the code point does not represent a value.
   */
  function basicToDigit(codePoint) {
    if (codePoint - 48 < 10) {
      return codePoint - 22;
    }
    if (codePoint - 65 < 26) {
      return codePoint - 65;
    }
    if (codePoint - 97 < 26) {
      return codePoint - 97;
    }
    return base;
  }

  /**
   * Converts a digit/integer into a basic code point.
   * @see `basicToDigit()`
   * @private
   * @param {Number} digit The numeric value of a basic code point.
   * @returns {Number} The basic code point whose value (when used for
   * representing integers) is `digit`, which needs to be in the range
   * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
   * used; else, the lowercase form is used. The behavior is undefined
   * if `flag` is non-zero and `digit` has no uppercase form.
   */
  function digitToBasic(digit, flag) {
    //  0..25 map to ASCII a..z or A..Z
    // 26..35 map to ASCII 0..9
    return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
  }

  /**
   * Bias adaptation function as per section 3.4 of RFC 3492.
   * https://tools.ietf.org/html/rfc3492#section-3.4
   * @private
   */
  function adapt(delta, numPoints, firstTime) {
    var k = 0;
    delta = firstTime ? floor(delta / damp) : delta >> 1;
    delta += floor(delta / numPoints);
    for (
      ;
      /* no initialization */ delta > (baseMinusTMin * tMax) >> 1;
      k += base
    ) {
      delta = floor(delta / baseMinusTMin);
    }
    return floor(k + ((baseMinusTMin + 1) * delta) / (delta + skew));
  }

  /**
   * Converts a Punycode string of ASCII-only symbols to a string of Unicode
   * symbols.
   * @memberOf punycode
   * @param {String} input The Punycode string of ASCII-only symbols.
   * @returns {String} The resulting string of Unicode symbols.
   */
  function decode(input) {
    // Don't use UCS-2
    var output = [],
      inputLength = input.length,
      out,
      i = 0,
      n = initialN,
      bias = initialBias,
      basic,
      j,
      index,
      oldi,
      w,
      k,
      digit,
      t,
      /** Cached calculation results */
      baseMinusT;

    // Handle the basic code points: let `basic` be the number of input code
    // points before the last delimiter, or `0` if there is none, then copy
    // the first basic code points to the output.

    basic = input.lastIndexOf(delimiter);
    if (basic < 0) {
      basic = 0;
    }

    for (j = 0; j < basic; ++j) {
      // if it's not a basic code point
      if (input.charCodeAt(j) >= 0x80) {
        error('not-basic');
      }
      output.push(input.charCodeAt(j));
    }

    // Main decoding loop: start just after the last delimiter if any basic code
    // points were copied; start at the beginning otherwise.

    for (
      index = basic > 0 ? basic + 1 : 0;
      index < inputLength /* no final expression */;

    ) {
      // `index` is the index of the next character to be consumed.
      // Decode a generalized variable-length integer into `delta`,
      // which gets added to `i`. The overflow checking is easier
      // if we increase `i` as we go, then subtract off its starting
      // value at the end to obtain `delta`.
      for (oldi = i, w = 1, k = base /* no condition */; ; k += base) {
        if (index >= inputLength) {
          error('invalid-input');
        }

        digit = basicToDigit(input.charCodeAt(index++));

        if (digit >= base || digit > floor((maxInt - i) / w)) {
          error('overflow');
        }

        i += digit * w;
        t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

        if (digit < t) {
          break;
        }

        baseMinusT = base - t;
        if (w > floor(maxInt / baseMinusT)) {
          error('overflow');
        }

        w *= baseMinusT;
      }

      out = output.length + 1;
      bias = adapt(i - oldi, out, oldi == 0);

      // `i` was supposed to wrap around from `out` to `0`,
      // incrementing `n` each time, so we'll fix that now:
      if (floor(i / out) > maxInt - n) {
        error('overflow');
      }

      n += floor(i / out);
      i %= out;

      // Insert `n` at position `i` of the output
      output.splice(i++, 0, n);
    }

    return ucs2encode(output);
  }

  /**
   * Converts a string of Unicode symbols (e.g. a domain name label) to a
   * Punycode string of ASCII-only symbols.
   * @memberOf punycode
   * @param {String} input The string of Unicode symbols.
   * @returns {String} The resulting Punycode string of ASCII-only symbols.
   */
  function encode$1(input) {
    var n,
      delta,
      handledCPCount,
      basicLength,
      bias,
      j,
      m,
      q,
      k,
      t,
      currentValue,
      output = [],
      /** `inputLength` will hold the number of code points in `input`. */
      inputLength,
      /** Cached calculation results */
      handledCPCountPlusOne,
      baseMinusT,
      qMinusT;

    // Convert the input in UCS-2 to Unicode
    input = ucs2decode(input);

    // Cache the length
    inputLength = input.length;

    // Initialize the state
    n = initialN;
    delta = 0;
    bias = initialBias;

    // Handle the basic code points
    for (j = 0; j < inputLength; ++j) {
      currentValue = input[j];
      if (currentValue < 0x80) {
        output.push(stringFromCharCode(currentValue));
      }
    }

    handledCPCount = basicLength = output.length;

    // `handledCPCount` is the number of code points that have been handled;
    // `basicLength` is the number of basic code points.

    // Finish the basic string - if it is not empty - with a delimiter
    if (basicLength) {
      output.push(delimiter);
    }

    // Main encoding loop:
    while (handledCPCount < inputLength) {
      // All non-basic code points < n have been handled already. Find the next
      // larger one:
      for (m = maxInt, j = 0; j < inputLength; ++j) {
        currentValue = input[j];
        if (currentValue >= n && currentValue < m) {
          m = currentValue;
        }
      }

      // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
      // but guard against overflow
      handledCPCountPlusOne = handledCPCount + 1;
      if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
        error('overflow');
      }

      delta += (m - n) * handledCPCountPlusOne;
      n = m;

      for (j = 0; j < inputLength; ++j) {
        currentValue = input[j];

        if (currentValue < n && ++delta > maxInt) {
          error('overflow');
        }

        if (currentValue == n) {
          // Represent delta as a generalized variable-length integer
          for (q = delta, k = base /* no condition */; ; k += base) {
            t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
            if (q < t) {
              break;
            }
            qMinusT = q - t;
            baseMinusT = base - t;
            output.push(
              stringFromCharCode(digitToBasic(t + (qMinusT % baseMinusT), 0))
            );
            q = floor(qMinusT / baseMinusT);
          }

          output.push(stringFromCharCode(digitToBasic(q, 0)));
          bias = adapt(
            delta,
            handledCPCountPlusOne,
            handledCPCount == basicLength
          );
          delta = 0;
          ++handledCPCount;
        }
      }

      ++delta;
      ++n;
    }
    return output.join('');
  }

  /**
   * Converts a Punycode string representing a domain name or an email address
   * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
   * it doesn't matter if you call it on a string that has already been
   * converted to Unicode.
   * @memberOf punycode
   * @param {String} input The Punycoded domain name or email address to
   * convert to Unicode.
   * @returns {String} The Unicode representation of the given Punycode
   * string.
   */
  function toUnicode(input) {
    return mapDomain(input, function(string) {
      return regexPunycode.test(string)
        ? decode(string.slice(4).toLowerCase())
        : string;
    });
  }

  /**
   * Converts a Unicode string representing a domain name or an email address to
   * Punycode. Only the non-ASCII parts of the domain name will be converted,
   * i.e. it doesn't matter if you call it with a domain that's already in
   * ASCII.
   * @memberOf punycode
   * @param {String} input The domain name or email address to convert, as a
   * Unicode string.
   * @returns {String} The Punycode representation of the given domain name or
   * email address.
   */
  function toASCII(input) {
    return mapDomain(input, function(string) {
      return regexNonASCII.test(string) ? 'xn--' + encode$1(string) : string;
    });
  }
  var version$1 = '1.4.1';
  /**
   * An object of methods to convert from JavaScript's internal character
   * representation (UCS-2) to Unicode code points, and back.
   * @see <https://mathiasbynens.be/notes/javascript-encoding>
   * @memberOf punycode
   * @type Object
   */

  var ucs2 = {
    decode: ucs2decode,
    encode: ucs2encode
  };
  var require$$4 = {
    version: version$1,
    ucs2: ucs2,
    toASCII: toASCII,
    toUnicode: toUnicode,
    encode: encode$1,
    decode: decode
  };

  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.

  // If obj.hasOwnProperty has been overridden, then calling
  // obj.hasOwnProperty(prop) will break.
  // See: https://github.com/joyent/node/issues/1707
  function hasOwnProperty$1(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }
  var isArray$3 =
    Array.isArray ||
    function(xs) {
      return Object.prototype.toString.call(xs) === '[object Array]';
    };
  function stringifyPrimitive(v) {
    switch (typeof v) {
      case 'string':
        return v;

      case 'boolean':
        return v ? 'true' : 'false';

      case 'number':
        return isFinite(v) ? v : '';

      default:
        return '';
    }
  }

  function stringify(obj, sep, eq, name) {
    sep = sep || '&';
    eq = eq || '=';
    if (obj === null) {
      obj = undefined;
    }

    if (typeof obj === 'object') {
      return map$1(objectKeys(obj), function(k) {
        var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
        if (isArray$3(obj[k])) {
          return map$1(obj[k], function(v) {
            return ks + encodeURIComponent(stringifyPrimitive(v));
          }).join(sep);
        } else {
          return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
        }
      }).join(sep);
    }

    if (!name) return '';
    return (
      encodeURIComponent(stringifyPrimitive(name)) +
      eq +
      encodeURIComponent(stringifyPrimitive(obj))
    );
  }
  function map$1(xs, f) {
    if (xs.map) return xs.map(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
      res.push(f(xs[i], i));
    }
    return res;
  }

  var objectKeys =
    Object.keys ||
    function(obj) {
      var res = [];
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
      }
      return res;
    };

  function parse(qs, sep, eq, options) {
    sep = sep || '&';
    eq = eq || '=';
    var obj = {};

    if (typeof qs !== 'string' || qs.length === 0) {
      return obj;
    }

    var regexp = /\+/g;
    qs = qs.split(sep);

    var maxKeys = 1000;
    if (options && typeof options.maxKeys === 'number') {
      maxKeys = options.maxKeys;
    }

    var len = qs.length;
    // maxKeys <= 0 means that we should not limit keys count
    if (maxKeys > 0 && len > maxKeys) {
      len = maxKeys;
    }

    for (var i = 0; i < len; ++i) {
      var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr,
        vstr,
        k,
        v;

      if (idx >= 0) {
        kstr = x.substr(0, idx);
        vstr = x.substr(idx + 1);
      } else {
        kstr = x;
        vstr = '';
      }

      k = decodeURIComponent(kstr);
      v = decodeURIComponent(vstr);

      if (!hasOwnProperty$1(obj, k)) {
        obj[k] = v;
      } else if (isArray$3(obj[k])) {
        obj[k].push(v);
      } else {
        obj[k] = [obj[k], v];
      }
    }

    return obj;
  }

  // Copyright Joyent, Inc. and other Node contributors.
  var require$$0 = {
    parse: urlParse,
    resolve: urlResolve,
    resolveObject: urlResolveObject,
    format: urlFormat,
    Url: Url
  };
  function Url() {
    this.protocol = null;
    this.slashes = null;
    this.auth = null;
    this.host = null;
    this.port = null;
    this.hostname = null;
    this.hash = null;
    this.search = null;
    this.query = null;
    this.pathname = null;
    this.path = null;
    this.href = null;
  }

  // Reference: RFC 3986, RFC 1808, RFC 2396

  // define these here so at least they only have to be
  // compiled once on the first module load.
  var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,
    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),
    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ["'"].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      javascript: true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      javascript: true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      http: true,
      https: true,
      ftp: true,
      gopher: true,
      file: true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    };

  function urlParse(url, parseQueryString, slashesDenoteHost) {
    if (url && isObject$1(url) && url instanceof Url) return url;

    var u = new Url();
    u.parse(url, parseQueryString, slashesDenoteHost);
    return u;
  }
  Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
    return parse$1(this, url, parseQueryString, slashesDenoteHost);
  };

  function parse$1(self, url, parseQueryString, slashesDenoteHost) {
    if (!isString$1(url)) {
      throw new TypeError(
        "Parameter 'url' must be a string, not " + typeof url
      );
    }

    // Copy chrome, IE, opera backslash-handling behavior.
    // Back slashes before the query string get converted to forward slashes
    // See: https://code.google.com/p/chromium/issues/detail?id=25916
    var queryIndex = url.indexOf('?'),
      splitter = queryIndex !== -1 && queryIndex < url.indexOf('#') ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
    uSplit[0] = uSplit[0].replace(slashRegex, '/');
    url = uSplit.join(splitter);

    var rest = url;

    // trim before proceeding.
    // This is to support parse stuff like "  http://foo.com  \n"
    rest = rest.trim();

    if (!slashesDenoteHost && url.split('#').length === 1) {
      // Try fast path regexp
      var simplePath = simplePathPattern.exec(rest);
      if (simplePath) {
        self.path = rest;
        self.href = rest;
        self.pathname = simplePath[1];
        if (simplePath[2]) {
          self.search = simplePath[2];
          if (parseQueryString) {
            self.query = parse(self.search.substr(1));
          } else {
            self.query = self.search.substr(1);
          }
        } else if (parseQueryString) {
          self.search = '';
          self.query = {};
        }
        return self;
      }
    }

    var proto = protocolPattern.exec(rest);
    if (proto) {
      proto = proto[0];
      var lowerProto = proto.toLowerCase();
      self.protocol = lowerProto;
      rest = rest.substr(proto.length);
    }

    // figure out if it's got a host
    // user@server is *always* interpreted as a hostname, and url
    // resolution will treat //foo/bar as host=foo,path=bar because that's
    // how the browser resolves relative URLs.
    if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
      var slashes = rest.substr(0, 2) === '//';
      if (slashes && !(proto && hostlessProtocol[proto])) {
        rest = rest.substr(2);
        self.slashes = true;
      }
    }
    var i, hec, l, p;
    if (
      !hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))
    ) {
      // there's a hostname.
      // the first instance of /, ?, ;, or # ends the host.
      //
      // If there is an @ in the hostname, then non-host chars *are* allowed
      // to the left of the last @ sign, unless some host-ending character
      // comes *before* the @-sign.
      // URLs are obnoxious.
      //
      // ex:
      // http://a@b@c/ => user:a@b host:c
      // http://a@b?@c => user:a host:c path:/?@c

      // v0.12 TODO(isaacs): This is not quite how Chrome does things.
      // Review our test case against browsers more comprehensively.

      // find the first instance of any hostEndingChars
      var hostEnd = -1;
      for (i = 0; i < hostEndingChars.length; i++) {
        hec = rest.indexOf(hostEndingChars[i]);
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
      }

      // at this point, either we have an explicit point where the
      // auth portion cannot go past, or the last @ char is the decider.
      var auth, atSign;
      if (hostEnd === -1) {
        // atSign can be anywhere.
        atSign = rest.lastIndexOf('@');
      } else {
        // atSign must be in auth portion.
        // http://a@b/c@d => host:b auth:a path:/c@d
        atSign = rest.lastIndexOf('@', hostEnd);
      }

      // Now we have a portion which is definitely the auth.
      // Pull that off.
      if (atSign !== -1) {
        auth = rest.slice(0, atSign);
        rest = rest.slice(atSign + 1);
        self.auth = decodeURIComponent(auth);
      }

      // the host is the remaining to the left of the first non-host char
      hostEnd = -1;
      for (i = 0; i < nonHostChars.length; i++) {
        hec = rest.indexOf(nonHostChars[i]);
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
      }
      // if we still have not hit it, then the entire thing is a host.
      if (hostEnd === -1) hostEnd = rest.length;

      self.host = rest.slice(0, hostEnd);
      rest = rest.slice(hostEnd);

      // pull out port.
      parseHost(self);

      // we've indicated that there is a hostname,
      // so even if it's empty, it has to be present.
      self.hostname = self.hostname || '';

      // if hostname begins with [ and ends with ]
      // assume that it's an IPv6 address.
      var ipv6Hostname =
        self.hostname[0] === '[' &&
        self.hostname[self.hostname.length - 1] === ']';

      // validate a little.
      if (!ipv6Hostname) {
        var hostparts = self.hostname.split(/\./);
        for (i = 0, l = hostparts.length; i < l; i++) {
          var part = hostparts[i];
          if (!part) continue;
          if (!part.match(hostnamePartPattern)) {
            var newpart = '';
            for (var j = 0, k = part.length; j < k; j++) {
              if (part.charCodeAt(j) > 127) {
                // we replace non-ASCII char with a temporary placeholder
                // we need this to make sure size of hostname is not
                // broken by replacing non-ASCII by nothing
                newpart += 'x';
              } else {
                newpart += part[j];
              }
            }
            // we test again with ASCII char only
            if (!newpart.match(hostnamePartPattern)) {
              var validParts = hostparts.slice(0, i);
              var notHost = hostparts.slice(i + 1);
              var bit = part.match(hostnamePartStart);
              if (bit) {
                validParts.push(bit[1]);
                notHost.unshift(bit[2]);
              }
              if (notHost.length) {
                rest = '/' + notHost.join('.') + rest;
              }
              self.hostname = validParts.join('.');
              break;
            }
          }
        }
      }

      if (self.hostname.length > hostnameMaxLen) {
        self.hostname = '';
      } else {
        // hostnames are always lower case.
        self.hostname = self.hostname.toLowerCase();
      }

      if (!ipv6Hostname) {
        // IDNA Support: Returns a punycoded representation of "domain".
        // It only converts parts of the domain name that
        // have non-ASCII characters, i.e. it doesn't matter if
        // you call it with a domain that already is ASCII-only.
        self.hostname = toASCII(self.hostname);
      }

      p = self.port ? ':' + self.port : '';
      var h = self.hostname || '';
      self.host = h + p;
      self.href += self.host;

      // strip [ and ] from the hostname
      // the host field still retains them, though
      if (ipv6Hostname) {
        self.hostname = self.hostname.substr(1, self.hostname.length - 2);
        if (rest[0] !== '/') {
          rest = '/' + rest;
        }
      }
    }

    // now rest is set to the post-host stuff.
    // chop off any delim chars.
    if (!unsafeProtocol[lowerProto]) {
      // First, make 100% sure that any "autoEscape" chars get
      // escaped, even if encodeURIComponent doesn't think they
      // need to be.
      for (i = 0, l = autoEscape.length; i < l; i++) {
        var ae = autoEscape[i];
        if (rest.indexOf(ae) === -1) continue;
        var esc = encodeURIComponent(ae);
        if (esc === ae) {
          esc = escape(ae);
        }
        rest = rest.split(ae).join(esc);
      }
    }

    // chop off from the tail first.
    var hash = rest.indexOf('#');
    if (hash !== -1) {
      // got a fragment string.
      self.hash = rest.substr(hash);
      rest = rest.slice(0, hash);
    }
    var qm = rest.indexOf('?');
    if (qm !== -1) {
      self.search = rest.substr(qm);
      self.query = rest.substr(qm + 1);
      if (parseQueryString) {
        self.query = parse(self.query);
      }
      rest = rest.slice(0, qm);
    } else if (parseQueryString) {
      // no query string, but parseQueryString still requested
      self.search = '';
      self.query = {};
    }
    if (rest) self.pathname = rest;
    if (slashedProtocol[lowerProto] && self.hostname && !self.pathname) {
      self.pathname = '/';
    }

    //to support http.request
    if (self.pathname || self.search) {
      p = self.pathname || '';
      var s = self.search || '';
      self.path = p + s;
    }

    // finally, reconstruct the href based on what has been validated.
    self.href = format$1(self);
    return self;
  }

  // format a parsed object into a url string
  function urlFormat(obj) {
    // ensure it's an object, and not a string url.
    // If it's an obj, this is a no-op.
    // this way, you can call url_format() on strings
    // to clean up potentially wonky urls.
    if (isString$1(obj)) obj = parse$1({}, obj);
    return format$1(obj);
  }

  function format$1(self) {
    var auth = self.auth || '';
    if (auth) {
      auth = encodeURIComponent(auth);
      auth = auth.replace(/%3A/i, ':');
      auth += '@';
    }

    var protocol = self.protocol || '',
      pathname = self.pathname || '',
      hash = self.hash || '',
      host = false,
      query = '';

    if (self.host) {
      host = auth + self.host;
    } else if (self.hostname) {
      host =
        auth +
        (self.hostname.indexOf(':') === -1
          ? self.hostname
          : '[' + this.hostname + ']');
      if (self.port) {
        host += ':' + self.port;
      }
    }

    if (
      self.query &&
      isObject$1(self.query) &&
      Object.keys(self.query).length
    ) {
      query = stringify(self.query);
    }

    var search = self.search || (query && '?' + query) || '';

    if (protocol && protocol.substr(-1) !== ':') protocol += ':';

    // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
    // unless they had them to begin with.
    if (
      self.slashes ||
      ((!protocol || slashedProtocol[protocol]) && host !== false)
    ) {
      host = '//' + (host || '');
      if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
    } else if (!host) {
      host = '';
    }

    if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
    if (search && search.charAt(0) !== '?') search = '?' + search;

    pathname = pathname.replace(/[?#]/g, function(match) {
      return encodeURIComponent(match);
    });
    search = search.replace('#', '%23');

    return protocol + host + pathname + search + hash;
  }

  Url.prototype.format = function() {
    return format$1(this);
  };

  function urlResolve(source, relative) {
    return urlParse(source, false, true).resolve(relative);
  }

  Url.prototype.resolve = function(relative) {
    return this.resolveObject(urlParse(relative, false, true)).format();
  };

  function urlResolveObject(source, relative) {
    if (!source) return relative;
    return urlParse(source, false, true).resolveObject(relative);
  }

  Url.prototype.resolveObject = function(relative) {
    if (isString$1(relative)) {
      var rel = new Url();
      rel.parse(relative, false, true);
      relative = rel;
    }

    var result = new Url();
    var tkeys = Object.keys(this);
    for (var tk = 0; tk < tkeys.length; tk++) {
      var tkey = tkeys[tk];
      result[tkey] = this[tkey];
    }

    // hash is always overridden, no matter what.
    // even href="" will remove it.
    result.hash = relative.hash;

    // if the relative url is empty, then there's nothing left to do here.
    if (relative.href === '') {
      result.href = result.format();
      return result;
    }

    // hrefs like //foo/bar always cut to the protocol.
    if (relative.slashes && !relative.protocol) {
      // take everything except the protocol from relative
      var rkeys = Object.keys(relative);
      for (var rk = 0; rk < rkeys.length; rk++) {
        var rkey = rkeys[rk];
        if (rkey !== 'protocol') result[rkey] = relative[rkey];
      }

      //urlParse appends trailing / to urls like http://www.example.com
      if (
        slashedProtocol[result.protocol] &&
        result.hostname &&
        !result.pathname
      ) {
        result.path = result.pathname = '/';
      }

      result.href = result.format();
      return result;
    }
    var relPath;
    if (relative.protocol && relative.protocol !== result.protocol) {
      // if it's a known url protocol, then changing
      // the protocol does weird things
      // first, if it's not file:, then we MUST have a host,
      // and if there was a path
      // to begin with, then we MUST have a path.
      // if it is file:, then the host is dropped,
      // because that's known to be hostless.
      // anything else is assumed to be absolute.
      if (!slashedProtocol[relative.protocol]) {
        var keys = Object.keys(relative);
        for (var v = 0; v < keys.length; v++) {
          var k = keys[v];
          result[k] = relative[k];
        }
        result.href = result.format();
        return result;
      }

      result.protocol = relative.protocol;
      if (!relative.host && !hostlessProtocol[relative.protocol]) {
        relPath = (relative.pathname || '').split('/');
        while (relPath.length && !(relative.host = relPath.shift()));
        if (!relative.host) relative.host = '';
        if (!relative.hostname) relative.hostname = '';
        if (relPath[0] !== '') relPath.unshift('');
        if (relPath.length < 2) relPath.unshift('');
        result.pathname = relPath.join('/');
      } else {
        result.pathname = relative.pathname;
      }
      result.search = relative.search;
      result.query = relative.query;
      result.host = relative.host || '';
      result.auth = relative.auth;
      result.hostname = relative.hostname || relative.host;
      result.port = relative.port;
      // to support http.request
      if (result.pathname || result.search) {
        var p = result.pathname || '';
        var s = result.search || '';
        result.path = p + s;
      }
      result.slashes = result.slashes || relative.slashes;
      result.href = result.format();
      return result;
    }

    var isSourceAbs = result.pathname && result.pathname.charAt(0) === '/',
      isRelAbs =
        relative.host ||
        (relative.pathname && relative.pathname.charAt(0) === '/'),
      mustEndAbs =
        isRelAbs || isSourceAbs || (result.host && relative.pathname),
      removeAllDots = mustEndAbs,
      srcPath = (result.pathname && result.pathname.split('/')) || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];
    relPath = (relative.pathname && relative.pathname.split('/')) || [];
    // if the url is a non-slashed url, then relative
    // links like ../.. should be able
    // to crawl up to the hostname, as well.  This is strange.
    // result.protocol has already been set by now.
    // Later on, put the first path part into the host field.
    if (psychotic) {
      result.hostname = '';
      result.port = null;
      if (result.host) {
        if (srcPath[0] === '') srcPath[0] = result.host;
        else srcPath.unshift(result.host);
      }
      result.host = '';
      if (relative.protocol) {
        relative.hostname = null;
        relative.port = null;
        if (relative.host) {
          if (relPath[0] === '') relPath[0] = relative.host;
          else relPath.unshift(relative.host);
        }
        relative.host = null;
      }
      mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
    }
    var authInHost;
    if (isRelAbs) {
      // it's absolute.
      result.host =
        relative.host || relative.host === '' ? relative.host : result.host;
      result.hostname =
        relative.hostname || relative.hostname === ''
          ? relative.hostname
          : result.hostname;
      result.search = relative.search;
      result.query = relative.query;
      srcPath = relPath;
      // fall through to the dot-handling below.
    } else if (relPath.length) {
      // it's relative
      // throw away the existing file, and take the new path instead.
      if (!srcPath) srcPath = [];
      srcPath.pop();
      srcPath = srcPath.concat(relPath);
      result.search = relative.search;
      result.query = relative.query;
    } else if (!isNullOrUndefined(relative.search)) {
      // just pull out the search.
      // like href='?foo'.
      // Put this after the other two cases because it simplifies the booleans
      if (psychotic) {
        result.hostname = result.host = srcPath.shift();
        //occationaly the auth can get stuck only in host
        //this especially happens in cases like
        //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
        authInHost =
          result.host && result.host.indexOf('@') > 0
            ? result.host.split('@')
            : false;
        if (authInHost) {
          result.auth = authInHost.shift();
          result.host = result.hostname = authInHost.shift();
        }
      }
      result.search = relative.search;
      result.query = relative.query;
      //to support http.request
      if (!isNull(result.pathname) || !isNull(result.search)) {
        result.path =
          (result.pathname ? result.pathname : '') +
          (result.search ? result.search : '');
      }
      result.href = result.format();
      return result;
    }

    if (!srcPath.length) {
      // no path at all.  easy.
      // we've already handled the other stuff above.
      result.pathname = null;
      //to support http.request
      if (result.search) {
        result.path = '/' + result.search;
      } else {
        result.path = null;
      }
      result.href = result.format();
      return result;
    }

    // if a url ENDs in . or .., then it must get a trailing slash.
    // however, if it ends in anything else non-slashy,
    // then it must NOT get a trailing slash.
    var last = srcPath.slice(-1)[0];
    var hasTrailingSlash =
      ((result.host || relative.host || srcPath.length > 1) &&
        (last === '.' || last === '..')) ||
      last === '';

    // strip single dots, resolve double dots to parent dir
    // if the path tries to go above the root, `up` ends up > 0
    var up = 0;
    for (var i = srcPath.length; i >= 0; i--) {
      last = srcPath[i];
      if (last === '.') {
        srcPath.splice(i, 1);
      } else if (last === '..') {
        srcPath.splice(i, 1);
        up++;
      } else if (up) {
        srcPath.splice(i, 1);
        up--;
      }
    }

    // if the path is allowed to go above the root, restore leading ..s
    if (!mustEndAbs && !removeAllDots) {
      for (; up--; up) {
        srcPath.unshift('..');
      }
    }

    if (
      mustEndAbs &&
      srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')
    ) {
      srcPath.unshift('');
    }

    if (hasTrailingSlash && srcPath.join('/').substr(-1) !== '/') {
      srcPath.push('');
    }

    var isAbsolute =
      srcPath[0] === '' || (srcPath[0] && srcPath[0].charAt(0) === '/');

    // put the host back
    if (psychotic) {
      result.hostname = result.host = isAbsolute
        ? ''
        : srcPath.length
        ? srcPath.shift()
        : '';
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      authInHost =
        result.host && result.host.indexOf('@') > 0
          ? result.host.split('@')
          : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }

    mustEndAbs = mustEndAbs || (result.host && srcPath.length);

    if (mustEndAbs && !isAbsolute) {
      srcPath.unshift('');
    }

    if (!srcPath.length) {
      result.pathname = null;
      result.path = null;
    } else {
      result.pathname = srcPath.join('/');
    }

    //to support request.http
    if (!isNull(result.pathname) || !isNull(result.search)) {
      result.path =
        (result.pathname ? result.pathname : '') +
        (result.search ? result.search : '');
    }
    result.auth = relative.auth || result.auth;
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  };

  Url.prototype.parseHost = function() {
    return parseHost(this);
  };

  function parseHost(self) {
    var host = self.host;
    var port = portPattern.exec(host);
    if (port) {
      port = port[0];
      if (port !== ':') {
        self.port = port.substr(1);
      }
      host = host.substr(0, host.length - port.length);
    }
    if (host) self.hostname = host;
  }

  function request(opts, cb) {
    if (typeof opts === 'string') opts = urlParse(opts);

    // Normally, the page is loaded from http or https, so not specifying a protocol
    // will result in a (valid) protocol-relative url. However, this won't work if
    // the protocol is something else, like 'file:'
    var defaultProtocol =
      global$1.location.protocol.search(/^https?:$/) === -1 ? 'http:' : '';

    var protocol = opts.protocol || defaultProtocol;
    var host = opts.hostname || opts.host;
    var port = opts.port;
    var path = opts.path || '/';

    // Necessary for IPv6 addresses
    if (host && host.indexOf(':') !== -1) host = '[' + host + ']';

    // This may be a relative url. The browser should always be able to interpret it correctly.
    opts.url =
      (host ? protocol + '//' + host : '') + (port ? ':' + port : '') + path;
    opts.method = (opts.method || 'GET').toUpperCase();
    opts.headers = opts.headers || {};

    // Also valid opts.auth, opts.mode

    var req = new ClientRequest(opts);
    if (cb) req.on('response', cb);
    return req;
  }

  function get(opts, cb) {
    var req = request(opts, cb);
    req.end();
    return req;
  }

  function Agent() {}
  Agent.defaultMaxSockets = 4;

  var METHODS = [
    'CHECKOUT',
    'CONNECT',
    'COPY',
    'DELETE',
    'GET',
    'HEAD',
    'LOCK',
    'M-SEARCH',
    'MERGE',
    'MKACTIVITY',
    'MKCOL',
    'MOVE',
    'NOTIFY',
    'OPTIONS',
    'PATCH',
    'POST',
    'PROPFIND',
    'PROPPATCH',
    'PURGE',
    'PUT',
    'REPORT',
    'SEARCH',
    'SUBSCRIBE',
    'TRACE',
    'UNLOCK',
    'UNSUBSCRIBE'
  ];
  var STATUS_CODES = {
    100: 'Continue',
    101: 'Switching Protocols',
    102: 'Processing', // RFC 2518, obsoleted by RFC 4918
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    203: 'Non-Authoritative Information',
    204: 'No Content',
    205: 'Reset Content',
    206: 'Partial Content',
    207: 'Multi-Status', // RFC 4918
    300: 'Multiple Choices',
    301: 'Moved Permanently',
    302: 'Moved Temporarily',
    303: 'See Other',
    304: 'Not Modified',
    305: 'Use Proxy',
    307: 'Temporary Redirect',
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    407: 'Proxy Authentication Required',
    408: 'Request Time-out',
    409: 'Conflict',
    410: 'Gone',
    411: 'Length Required',
    412: 'Precondition Failed',
    413: 'Request Entity Too Large',
    414: 'Request-URI Too Large',
    415: 'Unsupported Media Type',
    416: 'Requested Range Not Satisfiable',
    417: 'Expectation Failed',
    418: "I'm a teapot", // RFC 2324
    422: 'Unprocessable Entity', // RFC 4918
    423: 'Locked', // RFC 4918
    424: 'Failed Dependency', // RFC 4918
    425: 'Unordered Collection', // RFC 4918
    426: 'Upgrade Required', // RFC 2817
    428: 'Precondition Required', // RFC 6585
    429: 'Too Many Requests', // RFC 6585
    431: 'Request Header Fields Too Large', // RFC 6585
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Time-out',
    505: 'HTTP Version Not Supported',
    506: 'Variant Also Negotiates', // RFC 2295
    507: 'Insufficient Storage', // RFC 4918
    509: 'Bandwidth Limit Exceeded',
    510: 'Not Extended', // RFC 2774
    511: 'Network Authentication Required' // RFC 6585
  };

  var https = {
    request,
    get,
    Agent,
    METHODS,
    STATUS_CODES
  };

  var Utils = {
    isStandardBrowserEnv: function isStandardBrowserEnv() {
      if (
        typeof navigator !== 'undefined' &&
        navigator.product === 'ReactNative'
      ) {
        return false;
      }

      return typeof window !== 'undefined' && typeof document !== 'undefined';
    },
    isNode: function isNode() {
      return !Utils.isStandardBrowserEnv();
    }
  };

  function noopEnableCookieJarSupport(instance) {
    return instance;
  }

  var noop$1 = noopEnableCookieJarSupport;

  var net = {};

  function createCommonjsModule(fn, module) {
    return (
      (module = { exports: {} }), fn(module, module.exports), module.exports
    );
  }

  function getCjsExportFromNamespace(n) {
    return (n && n['default']) || n;
  }

  var rules = [
    'ac',
    'com.ac',
    'edu.ac',
    'gov.ac',
    'net.ac',
    'mil.ac',
    'org.ac',
    'ad',
    'nom.ad',
    'ae',
    'co.ae',
    'net.ae',
    'org.ae',
    'sch.ae',
    'ac.ae',
    'gov.ae',
    'mil.ae',
    'aero',
    'accident-investigation.aero',
    'accident-prevention.aero',
    'aerobatic.aero',
    'aeroclub.aero',
    'aerodrome.aero',
    'agents.aero',
    'aircraft.aero',
    'airline.aero',
    'airport.aero',
    'air-surveillance.aero',
    'airtraffic.aero',
    'air-traffic-control.aero',
    'ambulance.aero',
    'amusement.aero',
    'association.aero',
    'author.aero',
    'ballooning.aero',
    'broker.aero',
    'caa.aero',
    'cargo.aero',
    'catering.aero',
    'certification.aero',
    'championship.aero',
    'charter.aero',
    'civilaviation.aero',
    'club.aero',
    'conference.aero',
    'consultant.aero',
    'consulting.aero',
    'control.aero',
    'council.aero',
    'crew.aero',
    'design.aero',
    'dgca.aero',
    'educator.aero',
    'emergency.aero',
    'engine.aero',
    'engineer.aero',
    'entertainment.aero',
    'equipment.aero',
    'exchange.aero',
    'express.aero',
    'federation.aero',
    'flight.aero',
    'freight.aero',
    'fuel.aero',
    'gliding.aero',
    'government.aero',
    'groundhandling.aero',
    'group.aero',
    'hanggliding.aero',
    'homebuilt.aero',
    'insurance.aero',
    'journal.aero',
    'journalist.aero',
    'leasing.aero',
    'logistics.aero',
    'magazine.aero',
    'maintenance.aero',
    'media.aero',
    'microlight.aero',
    'modelling.aero',
    'navigation.aero',
    'parachuting.aero',
    'paragliding.aero',
    'passenger-association.aero',
    'pilot.aero',
    'press.aero',
    'production.aero',
    'recreation.aero',
    'repbody.aero',
    'res.aero',
    'research.aero',
    'rotorcraft.aero',
    'safety.aero',
    'scientist.aero',
    'services.aero',
    'show.aero',
    'skydiving.aero',
    'software.aero',
    'student.aero',
    'trader.aero',
    'trading.aero',
    'trainer.aero',
    'union.aero',
    'workinggroup.aero',
    'works.aero',
    'af',
    'gov.af',
    'com.af',
    'org.af',
    'net.af',
    'edu.af',
    'ag',
    'com.ag',
    'org.ag',
    'net.ag',
    'co.ag',
    'nom.ag',
    'ai',
    'off.ai',
    'com.ai',
    'net.ai',
    'org.ai',
    'al',
    'com.al',
    'edu.al',
    'gov.al',
    'mil.al',
    'net.al',
    'org.al',
    'am',
    'ao',
    'ed.ao',
    'gv.ao',
    'og.ao',
    'co.ao',
    'pb.ao',
    'it.ao',
    'aq',
    'ar',
    'com.ar',
    'edu.ar',
    'gob.ar',
    'gov.ar',
    'int.ar',
    'mil.ar',
    'musica.ar',
    'net.ar',
    'org.ar',
    'tur.ar',
    'arpa',
    'e164.arpa',
    'in-addr.arpa',
    'ip6.arpa',
    'iris.arpa',
    'uri.arpa',
    'urn.arpa',
    'as',
    'gov.as',
    'asia',
    'at',
    'ac.at',
    'co.at',
    'gv.at',
    'or.at',
    'au',
    'com.au',
    'net.au',
    'org.au',
    'edu.au',
    'gov.au',
    'asn.au',
    'id.au',
    'info.au',
    'conf.au',
    'oz.au',
    'act.au',
    'nsw.au',
    'nt.au',
    'qld.au',
    'sa.au',
    'tas.au',
    'vic.au',
    'wa.au',
    'act.edu.au',
    'nsw.edu.au',
    'nt.edu.au',
    'qld.edu.au',
    'sa.edu.au',
    'tas.edu.au',
    'vic.edu.au',
    'wa.edu.au',
    'qld.gov.au',
    'sa.gov.au',
    'tas.gov.au',
    'vic.gov.au',
    'wa.gov.au',
    'aw',
    'com.aw',
    'ax',
    'az',
    'com.az',
    'net.az',
    'int.az',
    'gov.az',
    'org.az',
    'edu.az',
    'info.az',
    'pp.az',
    'mil.az',
    'name.az',
    'pro.az',
    'biz.az',
    'ba',
    'com.ba',
    'edu.ba',
    'gov.ba',
    'mil.ba',
    'net.ba',
    'org.ba',
    'bb',
    'biz.bb',
    'co.bb',
    'com.bb',
    'edu.bb',
    'gov.bb',
    'info.bb',
    'net.bb',
    'org.bb',
    'store.bb',
    'tv.bb',
    '*.bd',
    'be',
    'ac.be',
    'bf',
    'gov.bf',
    'bg',
    'a.bg',
    'b.bg',
    'c.bg',
    'd.bg',
    'e.bg',
    'f.bg',
    'g.bg',
    'h.bg',
    'i.bg',
    'j.bg',
    'k.bg',
    'l.bg',
    'm.bg',
    'n.bg',
    'o.bg',
    'p.bg',
    'q.bg',
    'r.bg',
    's.bg',
    't.bg',
    'u.bg',
    'v.bg',
    'w.bg',
    'x.bg',
    'y.bg',
    'z.bg',
    '0.bg',
    '1.bg',
    '2.bg',
    '3.bg',
    '4.bg',
    '5.bg',
    '6.bg',
    '7.bg',
    '8.bg',
    '9.bg',
    'bh',
    'com.bh',
    'edu.bh',
    'net.bh',
    'org.bh',
    'gov.bh',
    'bi',
    'co.bi',
    'com.bi',
    'edu.bi',
    'or.bi',
    'org.bi',
    'biz',
    'bj',
    'asso.bj',
    'barreau.bj',
    'gouv.bj',
    'bm',
    'com.bm',
    'edu.bm',
    'gov.bm',
    'net.bm',
    'org.bm',
    'bn',
    'com.bn',
    'edu.bn',
    'gov.bn',
    'net.bn',
    'org.bn',
    'bo',
    'com.bo',
    'edu.bo',
    'gob.bo',
    'int.bo',
    'org.bo',
    'net.bo',
    'mil.bo',
    'tv.bo',
    'web.bo',
    'academia.bo',
    'agro.bo',
    'arte.bo',
    'blog.bo',
    'bolivia.bo',
    'ciencia.bo',
    'cooperativa.bo',
    'democracia.bo',
    'deporte.bo',
    'ecologia.bo',
    'economia.bo',
    'empresa.bo',
    'indigena.bo',
    'industria.bo',
    'info.bo',
    'medicina.bo',
    'movimiento.bo',
    'musica.bo',
    'natural.bo',
    'nombre.bo',
    'noticias.bo',
    'patria.bo',
    'politica.bo',
    'profesional.bo',
    'plurinacional.bo',
    'pueblo.bo',
    'revista.bo',
    'salud.bo',
    'tecnologia.bo',
    'tksat.bo',
    'transporte.bo',
    'wiki.bo',
    'br',
    '9guacu.br',
    'abc.br',
    'adm.br',
    'adv.br',
    'agr.br',
    'aju.br',
    'am.br',
    'anani.br',
    'aparecida.br',
    'arq.br',
    'art.br',
    'ato.br',
    'b.br',
    'barueri.br',
    'belem.br',
    'bhz.br',
    'bio.br',
    'blog.br',
    'bmd.br',
    'boavista.br',
    'bsb.br',
    'campinagrande.br',
    'campinas.br',
    'caxias.br',
    'cim.br',
    'cng.br',
    'cnt.br',
    'com.br',
    'contagem.br',
    'coop.br',
    'cri.br',
    'cuiaba.br',
    'curitiba.br',
    'def.br',
    'ecn.br',
    'eco.br',
    'edu.br',
    'emp.br',
    'eng.br',
    'esp.br',
    'etc.br',
    'eti.br',
    'far.br',
    'feira.br',
    'flog.br',
    'floripa.br',
    'fm.br',
    'fnd.br',
    'fortal.br',
    'fot.br',
    'foz.br',
    'fst.br',
    'g12.br',
    'ggf.br',
    'goiania.br',
    'gov.br',
    'ac.gov.br',
    'al.gov.br',
    'am.gov.br',
    'ap.gov.br',
    'ba.gov.br',
    'ce.gov.br',
    'df.gov.br',
    'es.gov.br',
    'go.gov.br',
    'ma.gov.br',
    'mg.gov.br',
    'ms.gov.br',
    'mt.gov.br',
    'pa.gov.br',
    'pb.gov.br',
    'pe.gov.br',
    'pi.gov.br',
    'pr.gov.br',
    'rj.gov.br',
    'rn.gov.br',
    'ro.gov.br',
    'rr.gov.br',
    'rs.gov.br',
    'sc.gov.br',
    'se.gov.br',
    'sp.gov.br',
    'to.gov.br',
    'gru.br',
    'imb.br',
    'ind.br',
    'inf.br',
    'jab.br',
    'jampa.br',
    'jdf.br',
    'joinville.br',
    'jor.br',
    'jus.br',
    'leg.br',
    'lel.br',
    'londrina.br',
    'macapa.br',
    'maceio.br',
    'manaus.br',
    'maringa.br',
    'mat.br',
    'med.br',
    'mil.br',
    'morena.br',
    'mp.br',
    'mus.br',
    'natal.br',
    'net.br',
    'niteroi.br',
    '*.nom.br',
    'not.br',
    'ntr.br',
    'odo.br',
    'ong.br',
    'org.br',
    'osasco.br',
    'palmas.br',
    'poa.br',
    'ppg.br',
    'pro.br',
    'psc.br',
    'psi.br',
    'pvh.br',
    'qsl.br',
    'radio.br',
    'rec.br',
    'recife.br',
    'ribeirao.br',
    'rio.br',
    'riobranco.br',
    'riopreto.br',
    'salvador.br',
    'sampa.br',
    'santamaria.br',
    'santoandre.br',
    'saobernardo.br',
    'saogonca.br',
    'sjc.br',
    'slg.br',
    'slz.br',
    'sorocaba.br',
    'srv.br',
    'taxi.br',
    'teo.br',
    'the.br',
    'tmp.br',
    'trd.br',
    'tur.br',
    'tv.br',
    'udi.br',
    'vet.br',
    'vix.br',
    'vlog.br',
    'wiki.br',
    'zlg.br',
    'bs',
    'com.bs',
    'net.bs',
    'org.bs',
    'edu.bs',
    'gov.bs',
    'bt',
    'com.bt',
    'edu.bt',
    'gov.bt',
    'net.bt',
    'org.bt',
    'bv',
    'bw',
    'co.bw',
    'org.bw',
    'by',
    'gov.by',
    'mil.by',
    'com.by',
    'of.by',
    'bz',
    'com.bz',
    'net.bz',
    'org.bz',
    'edu.bz',
    'gov.bz',
    'ca',
    'ab.ca',
    'bc.ca',
    'mb.ca',
    'nb.ca',
    'nf.ca',
    'nl.ca',
    'ns.ca',
    'nt.ca',
    'nu.ca',
    'on.ca',
    'pe.ca',
    'qc.ca',
    'sk.ca',
    'yk.ca',
    'gc.ca',
    'cat',
    'cc',
    'cd',
    'gov.cd',
    'cf',
    'cg',
    'ch',
    'ci',
    'org.ci',
    'or.ci',
    'com.ci',
    'co.ci',
    'edu.ci',
    'ed.ci',
    'ac.ci',
    'net.ci',
    'go.ci',
    'asso.ci',
    'aéroport.ci',
    'int.ci',
    'presse.ci',
    'md.ci',
    'gouv.ci',
    '*.ck',
    '!www.ck',
    'cl',
    'gov.cl',
    'gob.cl',
    'co.cl',
    'mil.cl',
    'cm',
    'co.cm',
    'com.cm',
    'gov.cm',
    'net.cm',
    'cn',
    'ac.cn',
    'com.cn',
    'edu.cn',
    'gov.cn',
    'net.cn',
    'org.cn',
    'mil.cn',
    '公司.cn',
    '网络.cn',
    '網絡.cn',
    'ah.cn',
    'bj.cn',
    'cq.cn',
    'fj.cn',
    'gd.cn',
    'gs.cn',
    'gz.cn',
    'gx.cn',
    'ha.cn',
    'hb.cn',
    'he.cn',
    'hi.cn',
    'hl.cn',
    'hn.cn',
    'jl.cn',
    'js.cn',
    'jx.cn',
    'ln.cn',
    'nm.cn',
    'nx.cn',
    'qh.cn',
    'sc.cn',
    'sd.cn',
    'sh.cn',
    'sn.cn',
    'sx.cn',
    'tj.cn',
    'xj.cn',
    'xz.cn',
    'yn.cn',
    'zj.cn',
    'hk.cn',
    'mo.cn',
    'tw.cn',
    'co',
    'arts.co',
    'com.co',
    'edu.co',
    'firm.co',
    'gov.co',
    'info.co',
    'int.co',
    'mil.co',
    'net.co',
    'nom.co',
    'org.co',
    'rec.co',
    'web.co',
    'com',
    'coop',
    'cr',
    'ac.cr',
    'co.cr',
    'ed.cr',
    'fi.cr',
    'go.cr',
    'or.cr',
    'sa.cr',
    'cu',
    'com.cu',
    'edu.cu',
    'org.cu',
    'net.cu',
    'gov.cu',
    'inf.cu',
    'cv',
    'cw',
    'com.cw',
    'edu.cw',
    'net.cw',
    'org.cw',
    'cx',
    'gov.cx',
    'cy',
    'ac.cy',
    'biz.cy',
    'com.cy',
    'ekloges.cy',
    'gov.cy',
    'ltd.cy',
    'name.cy',
    'net.cy',
    'org.cy',
    'parliament.cy',
    'press.cy',
    'pro.cy',
    'tm.cy',
    'cz',
    'de',
    'dj',
    'dk',
    'dm',
    'com.dm',
    'net.dm',
    'org.dm',
    'edu.dm',
    'gov.dm',
    'do',
    'art.do',
    'com.do',
    'edu.do',
    'gob.do',
    'gov.do',
    'mil.do',
    'net.do',
    'org.do',
    'sld.do',
    'web.do',
    'dz',
    'com.dz',
    'org.dz',
    'net.dz',
    'gov.dz',
    'edu.dz',
    'asso.dz',
    'pol.dz',
    'art.dz',
    'ec',
    'com.ec',
    'info.ec',
    'net.ec',
    'fin.ec',
    'k12.ec',
    'med.ec',
    'pro.ec',
    'org.ec',
    'edu.ec',
    'gov.ec',
    'gob.ec',
    'mil.ec',
    'edu',
    'ee',
    'edu.ee',
    'gov.ee',
    'riik.ee',
    'lib.ee',
    'med.ee',
    'com.ee',
    'pri.ee',
    'aip.ee',
    'org.ee',
    'fie.ee',
    'eg',
    'com.eg',
    'edu.eg',
    'eun.eg',
    'gov.eg',
    'mil.eg',
    'name.eg',
    'net.eg',
    'org.eg',
    'sci.eg',
    '*.er',
    'es',
    'com.es',
    'nom.es',
    'org.es',
    'gob.es',
    'edu.es',
    'et',
    'com.et',
    'gov.et',
    'org.et',
    'edu.et',
    'biz.et',
    'name.et',
    'info.et',
    'net.et',
    'eu',
    'fi',
    'aland.fi',
    '*.fj',
    '*.fk',
    'fm',
    'fo',
    'fr',
    'com.fr',
    'asso.fr',
    'nom.fr',
    'prd.fr',
    'presse.fr',
    'tm.fr',
    'aeroport.fr',
    'assedic.fr',
    'avocat.fr',
    'avoues.fr',
    'cci.fr',
    'chambagri.fr',
    'chirurgiens-dentistes.fr',
    'experts-comptables.fr',
    'geometre-expert.fr',
    'gouv.fr',
    'greta.fr',
    'huissier-justice.fr',
    'medecin.fr',
    'notaires.fr',
    'pharmacien.fr',
    'port.fr',
    'veterinaire.fr',
    'ga',
    'gb',
    'gd',
    'ge',
    'com.ge',
    'edu.ge',
    'gov.ge',
    'org.ge',
    'mil.ge',
    'net.ge',
    'pvt.ge',
    'gf',
    'gg',
    'co.gg',
    'net.gg',
    'org.gg',
    'gh',
    'com.gh',
    'edu.gh',
    'gov.gh',
    'org.gh',
    'mil.gh',
    'gi',
    'com.gi',
    'ltd.gi',
    'gov.gi',
    'mod.gi',
    'edu.gi',
    'org.gi',
    'gl',
    'co.gl',
    'com.gl',
    'edu.gl',
    'net.gl',
    'org.gl',
    'gm',
    'gn',
    'ac.gn',
    'com.gn',
    'edu.gn',
    'gov.gn',
    'org.gn',
    'net.gn',
    'gov',
    'gp',
    'com.gp',
    'net.gp',
    'mobi.gp',
    'edu.gp',
    'org.gp',
    'asso.gp',
    'gq',
    'gr',
    'com.gr',
    'edu.gr',
    'net.gr',
    'org.gr',
    'gov.gr',
    'gs',
    'gt',
    'com.gt',
    'edu.gt',
    'gob.gt',
    'ind.gt',
    'mil.gt',
    'net.gt',
    'org.gt',
    'gu',
    'com.gu',
    'edu.gu',
    'gov.gu',
    'guam.gu',
    'info.gu',
    'net.gu',
    'org.gu',
    'web.gu',
    'gw',
    'gy',
    'co.gy',
    'com.gy',
    'edu.gy',
    'gov.gy',
    'net.gy',
    'org.gy',
    'hk',
    'com.hk',
    'edu.hk',
    'gov.hk',
    'idv.hk',
    'net.hk',
    'org.hk',
    '公司.hk',
    '教育.hk',
    '敎育.hk',
    '政府.hk',
    '個人.hk',
    '个人.hk',
    '箇人.hk',
    '網络.hk',
    '网络.hk',
    '组織.hk',
    '網絡.hk',
    '网絡.hk',
    '组织.hk',
    '組織.hk',
    '組织.hk',
    'hm',
    'hn',
    'com.hn',
    'edu.hn',
    'org.hn',
    'net.hn',
    'mil.hn',
    'gob.hn',
    'hr',
    'iz.hr',
    'from.hr',
    'name.hr',
    'com.hr',
    'ht',
    'com.ht',
    'shop.ht',
    'firm.ht',
    'info.ht',
    'adult.ht',
    'net.ht',
    'pro.ht',
    'org.ht',
    'med.ht',
    'art.ht',
    'coop.ht',
    'pol.ht',
    'asso.ht',
    'edu.ht',
    'rel.ht',
    'gouv.ht',
    'perso.ht',
    'hu',
    'co.hu',
    'info.hu',
    'org.hu',
    'priv.hu',
    'sport.hu',
    'tm.hu',
    '2000.hu',
    'agrar.hu',
    'bolt.hu',
    'casino.hu',
    'city.hu',
    'erotica.hu',
    'erotika.hu',
    'film.hu',
    'forum.hu',
    'games.hu',
    'hotel.hu',
    'ingatlan.hu',
    'jogasz.hu',
    'konyvelo.hu',
    'lakas.hu',
    'media.hu',
    'news.hu',
    'reklam.hu',
    'sex.hu',
    'shop.hu',
    'suli.hu',
    'szex.hu',
    'tozsde.hu',
    'utazas.hu',
    'video.hu',
    'id',
    'ac.id',
    'biz.id',
    'co.id',
    'desa.id',
    'go.id',
    'mil.id',
    'my.id',
    'net.id',
    'or.id',
    'ponpes.id',
    'sch.id',
    'web.id',
    'ie',
    'gov.ie',
    'il',
    'ac.il',
    'co.il',
    'gov.il',
    'idf.il',
    'k12.il',
    'muni.il',
    'net.il',
    'org.il',
    'im',
    'ac.im',
    'co.im',
    'com.im',
    'ltd.co.im',
    'net.im',
    'org.im',
    'plc.co.im',
    'tt.im',
    'tv.im',
    'in',
    'co.in',
    'firm.in',
    'net.in',
    'org.in',
    'gen.in',
    'ind.in',
    'nic.in',
    'ac.in',
    'edu.in',
    'res.in',
    'gov.in',
    'mil.in',
    'info',
    'int',
    'eu.int',
    'io',
    'com.io',
    'iq',
    'gov.iq',
    'edu.iq',
    'mil.iq',
    'com.iq',
    'org.iq',
    'net.iq',
    'ir',
    'ac.ir',
    'co.ir',
    'gov.ir',
    'id.ir',
    'net.ir',
    'org.ir',
    'sch.ir',
    'ایران.ir',
    'ايران.ir',
    'is',
    'net.is',
    'com.is',
    'edu.is',
    'gov.is',
    'org.is',
    'int.is',
    'it',
    'gov.it',
    'edu.it',
    'abr.it',
    'abruzzo.it',
    'aosta-valley.it',
    'aostavalley.it',
    'bas.it',
    'basilicata.it',
    'cal.it',
    'calabria.it',
    'cam.it',
    'campania.it',
    'emilia-romagna.it',
    'emiliaromagna.it',
    'emr.it',
    'friuli-v-giulia.it',
    'friuli-ve-giulia.it',
    'friuli-vegiulia.it',
    'friuli-venezia-giulia.it',
    'friuli-veneziagiulia.it',
    'friuli-vgiulia.it',
    'friuliv-giulia.it',
    'friulive-giulia.it',
    'friulivegiulia.it',
    'friulivenezia-giulia.it',
    'friuliveneziagiulia.it',
    'friulivgiulia.it',
    'fvg.it',
    'laz.it',
    'lazio.it',
    'lig.it',
    'liguria.it',
    'lom.it',
    'lombardia.it',
    'lombardy.it',
    'lucania.it',
    'mar.it',
    'marche.it',
    'mol.it',
    'molise.it',
    'piedmont.it',
    'piemonte.it',
    'pmn.it',
    'pug.it',
    'puglia.it',
    'sar.it',
    'sardegna.it',
    'sardinia.it',
    'sic.it',
    'sicilia.it',
    'sicily.it',
    'taa.it',
    'tos.it',
    'toscana.it',
    'trentin-sud-tirol.it',
    'trentin-süd-tirol.it',
    'trentin-sudtirol.it',
    'trentin-südtirol.it',
    'trentin-sued-tirol.it',
    'trentin-suedtirol.it',
    'trentino-a-adige.it',
    'trentino-aadige.it',
    'trentino-alto-adige.it',
    'trentino-altoadige.it',
    'trentino-s-tirol.it',
    'trentino-stirol.it',
    'trentino-sud-tirol.it',
    'trentino-süd-tirol.it',
    'trentino-sudtirol.it',
    'trentino-südtirol.it',
    'trentino-sued-tirol.it',
    'trentino-suedtirol.it',
    'trentino.it',
    'trentinoa-adige.it',
    'trentinoaadige.it',
    'trentinoalto-adige.it',
    'trentinoaltoadige.it',
    'trentinos-tirol.it',
    'trentinostirol.it',
    'trentinosud-tirol.it',
    'trentinosüd-tirol.it',
    'trentinosudtirol.it',
    'trentinosüdtirol.it',
    'trentinosued-tirol.it',
    'trentinosuedtirol.it',
    'trentinsud-tirol.it',
    'trentinsüd-tirol.it',
    'trentinsudtirol.it',
    'trentinsüdtirol.it',
    'trentinsued-tirol.it',
    'trentinsuedtirol.it',
    'tuscany.it',
    'umb.it',
    'umbria.it',
    'val-d-aosta.it',
    'val-daosta.it',
    'vald-aosta.it',
    'valdaosta.it',
    'valle-aosta.it',
    'valle-d-aosta.it',
    'valle-daosta.it',
    'valleaosta.it',
    'valled-aosta.it',
    'valledaosta.it',
    'vallee-aoste.it',
    'vallée-aoste.it',
    'vallee-d-aoste.it',
    'vallée-d-aoste.it',
    'valleeaoste.it',
    'valléeaoste.it',
    'valleedaoste.it',
    'valléedaoste.it',
    'vao.it',
    'vda.it',
    'ven.it',
    'veneto.it',
    'ag.it',
    'agrigento.it',
    'al.it',
    'alessandria.it',
    'alto-adige.it',
    'altoadige.it',
    'an.it',
    'ancona.it',
    'andria-barletta-trani.it',
    'andria-trani-barletta.it',
    'andriabarlettatrani.it',
    'andriatranibarletta.it',
    'ao.it',
    'aosta.it',
    'aoste.it',
    'ap.it',
    'aq.it',
    'aquila.it',
    'ar.it',
    'arezzo.it',
    'ascoli-piceno.it',
    'ascolipiceno.it',
    'asti.it',
    'at.it',
    'av.it',
    'avellino.it',
    'ba.it',
    'balsan-sudtirol.it',
    'balsan-südtirol.it',
    'balsan-suedtirol.it',
    'balsan.it',
    'bari.it',
    'barletta-trani-andria.it',
    'barlettatraniandria.it',
    'belluno.it',
    'benevento.it',
    'bergamo.it',
    'bg.it',
    'bi.it',
    'biella.it',
    'bl.it',
    'bn.it',
    'bo.it',
    'bologna.it',
    'bolzano-altoadige.it',
    'bolzano.it',
    'bozen-sudtirol.it',
    'bozen-südtirol.it',
    'bozen-suedtirol.it',
    'bozen.it',
    'br.it',
    'brescia.it',
    'brindisi.it',
    'bs.it',
    'bt.it',
    'bulsan-sudtirol.it',
    'bulsan-südtirol.it',
    'bulsan-suedtirol.it',
    'bulsan.it',
    'bz.it',
    'ca.it',
    'cagliari.it',
    'caltanissetta.it',
    'campidano-medio.it',
    'campidanomedio.it',
    'campobasso.it',
    'carbonia-iglesias.it',
    'carboniaiglesias.it',
    'carrara-massa.it',
    'carraramassa.it',
    'caserta.it',
    'catania.it',
    'catanzaro.it',
    'cb.it',
    'ce.it',
    'cesena-forli.it',
    'cesena-forlì.it',
    'cesenaforli.it',
    'cesenaforlì.it',
    'ch.it',
    'chieti.it',
    'ci.it',
    'cl.it',
    'cn.it',
    'co.it',
    'como.it',
    'cosenza.it',
    'cr.it',
    'cremona.it',
    'crotone.it',
    'cs.it',
    'ct.it',
    'cuneo.it',
    'cz.it',
    'dell-ogliastra.it',
    'dellogliastra.it',
    'en.it',
    'enna.it',
    'fc.it',
    'fe.it',
    'fermo.it',
    'ferrara.it',
    'fg.it',
    'fi.it',
    'firenze.it',
    'florence.it',
    'fm.it',
    'foggia.it',
    'forli-cesena.it',
    'forlì-cesena.it',
    'forlicesena.it',
    'forlìcesena.it',
    'fr.it',
    'frosinone.it',
    'ge.it',
    'genoa.it',
    'genova.it',
    'go.it',
    'gorizia.it',
    'gr.it',
    'grosseto.it',
    'iglesias-carbonia.it',
    'iglesiascarbonia.it',
    'im.it',
    'imperia.it',
    'is.it',
    'isernia.it',
    'kr.it',
    'la-spezia.it',
    'laquila.it',
    'laspezia.it',
    'latina.it',
    'lc.it',
    'le.it',
    'lecce.it',
    'lecco.it',
    'li.it',
    'livorno.it',
    'lo.it',
    'lodi.it',
    'lt.it',
    'lu.it',
    'lucca.it',
    'macerata.it',
    'mantova.it',
    'massa-carrara.it',
    'massacarrara.it',
    'matera.it',
    'mb.it',
    'mc.it',
    'me.it',
    'medio-campidano.it',
    'mediocampidano.it',
    'messina.it',
    'mi.it',
    'milan.it',
    'milano.it',
    'mn.it',
    'mo.it',
    'modena.it',
    'monza-brianza.it',
    'monza-e-della-brianza.it',
    'monza.it',
    'monzabrianza.it',
    'monzaebrianza.it',
    'monzaedellabrianza.it',
    'ms.it',
    'mt.it',
    'na.it',
    'naples.it',
    'napoli.it',
    'no.it',
    'novara.it',
    'nu.it',
    'nuoro.it',
    'og.it',
    'ogliastra.it',
    'olbia-tempio.it',
    'olbiatempio.it',
    'or.it',
    'oristano.it',
    'ot.it',
    'pa.it',
    'padova.it',
    'padua.it',
    'palermo.it',
    'parma.it',
    'pavia.it',
    'pc.it',
    'pd.it',
    'pe.it',
    'perugia.it',
    'pesaro-urbino.it',
    'pesarourbino.it',
    'pescara.it',
    'pg.it',
    'pi.it',
    'piacenza.it',
    'pisa.it',
    'pistoia.it',
    'pn.it',
    'po.it',
    'pordenone.it',
    'potenza.it',
    'pr.it',
    'prato.it',
    'pt.it',
    'pu.it',
    'pv.it',
    'pz.it',
    'ra.it',
    'ragusa.it',
    'ravenna.it',
    'rc.it',
    're.it',
    'reggio-calabria.it',
    'reggio-emilia.it',
    'reggiocalabria.it',
    'reggioemilia.it',
    'rg.it',
    'ri.it',
    'rieti.it',
    'rimini.it',
    'rm.it',
    'rn.it',
    'ro.it',
    'roma.it',
    'rome.it',
    'rovigo.it',
    'sa.it',
    'salerno.it',
    'sassari.it',
    'savona.it',
    'si.it',
    'siena.it',
    'siracusa.it',
    'so.it',
    'sondrio.it',
    'sp.it',
    'sr.it',
    'ss.it',
    'suedtirol.it',
    'südtirol.it',
    'sv.it',
    'ta.it',
    'taranto.it',
    'te.it',
    'tempio-olbia.it',
    'tempioolbia.it',
    'teramo.it',
    'terni.it',
    'tn.it',
    'to.it',
    'torino.it',
    'tp.it',
    'tr.it',
    'trani-andria-barletta.it',
    'trani-barletta-andria.it',
    'traniandriabarletta.it',
    'tranibarlettaandria.it',
    'trapani.it',
    'trento.it',
    'treviso.it',
    'trieste.it',
    'ts.it',
    'turin.it',
    'tv.it',
    'ud.it',
    'udine.it',
    'urbino-pesaro.it',
    'urbinopesaro.it',
    'va.it',
    'varese.it',
    'vb.it',
    'vc.it',
    've.it',
    'venezia.it',
    'venice.it',
    'verbania.it',
    'vercelli.it',
    'verona.it',
    'vi.it',
    'vibo-valentia.it',
    'vibovalentia.it',
    'vicenza.it',
    'viterbo.it',
    'vr.it',
    'vs.it',
    'vt.it',
    'vv.it',
    'je',
    'co.je',
    'net.je',
    'org.je',
    '*.jm',
    'jo',
    'com.jo',
    'org.jo',
    'net.jo',
    'edu.jo',
    'sch.jo',
    'gov.jo',
    'mil.jo',
    'name.jo',
    'jobs',
    'jp',
    'ac.jp',
    'ad.jp',
    'co.jp',
    'ed.jp',
    'go.jp',
    'gr.jp',
    'lg.jp',
    'ne.jp',
    'or.jp',
    'aichi.jp',
    'akita.jp',
    'aomori.jp',
    'chiba.jp',
    'ehime.jp',
    'fukui.jp',
    'fukuoka.jp',
    'fukushima.jp',
    'gifu.jp',
    'gunma.jp',
    'hiroshima.jp',
    'hokkaido.jp',
    'hyogo.jp',
    'ibaraki.jp',
    'ishikawa.jp',
    'iwate.jp',
    'kagawa.jp',
    'kagoshima.jp',
    'kanagawa.jp',
    'kochi.jp',
    'kumamoto.jp',
    'kyoto.jp',
    'mie.jp',
    'miyagi.jp',
    'miyazaki.jp',
    'nagano.jp',
    'nagasaki.jp',
    'nara.jp',
    'niigata.jp',
    'oita.jp',
    'okayama.jp',
    'okinawa.jp',
    'osaka.jp',
    'saga.jp',
    'saitama.jp',
    'shiga.jp',
    'shimane.jp',
    'shizuoka.jp',
    'tochigi.jp',
    'tokushima.jp',
    'tokyo.jp',
    'tottori.jp',
    'toyama.jp',
    'wakayama.jp',
    'yamagata.jp',
    'yamaguchi.jp',
    'yamanashi.jp',
    '栃木.jp',
    '愛知.jp',
    '愛媛.jp',
    '兵庫.jp',
    '熊本.jp',
    '茨城.jp',
    '北海道.jp',
    '千葉.jp',
    '和歌山.jp',
    '長崎.jp',
    '長野.jp',
    '新潟.jp',
    '青森.jp',
    '静岡.jp',
    '東京.jp',
    '石川.jp',
    '埼玉.jp',
    '三重.jp',
    '京都.jp',
    '佐賀.jp',
    '大分.jp',
    '大阪.jp',
    '奈良.jp',
    '宮城.jp',
    '宮崎.jp',
    '富山.jp',
    '山口.jp',
    '山形.jp',
    '山梨.jp',
    '岩手.jp',
    '岐阜.jp',
    '岡山.jp',
    '島根.jp',
    '広島.jp',
    '徳島.jp',
    '沖縄.jp',
    '滋賀.jp',
    '神奈川.jp',
    '福井.jp',
    '福岡.jp',
    '福島.jp',
    '秋田.jp',
    '群馬.jp',
    '香川.jp',
    '高知.jp',
    '鳥取.jp',
    '鹿児島.jp',
    '*.kawasaki.jp',
    '*.kitakyushu.jp',
    '*.kobe.jp',
    '*.nagoya.jp',
    '*.sapporo.jp',
    '*.sendai.jp',
    '*.yokohama.jp',
    '!city.kawasaki.jp',
    '!city.kitakyushu.jp',
    '!city.kobe.jp',
    '!city.nagoya.jp',
    '!city.sapporo.jp',
    '!city.sendai.jp',
    '!city.yokohama.jp',
    'aisai.aichi.jp',
    'ama.aichi.jp',
    'anjo.aichi.jp',
    'asuke.aichi.jp',
    'chiryu.aichi.jp',
    'chita.aichi.jp',
    'fuso.aichi.jp',
    'gamagori.aichi.jp',
    'handa.aichi.jp',
    'hazu.aichi.jp',
    'hekinan.aichi.jp',
    'higashiura.aichi.jp',
    'ichinomiya.aichi.jp',
    'inazawa.aichi.jp',
    'inuyama.aichi.jp',
    'isshiki.aichi.jp',
    'iwakura.aichi.jp',
    'kanie.aichi.jp',
    'kariya.aichi.jp',
    'kasugai.aichi.jp',
    'kira.aichi.jp',
    'kiyosu.aichi.jp',
    'komaki.aichi.jp',
    'konan.aichi.jp',
    'kota.aichi.jp',
    'mihama.aichi.jp',
    'miyoshi.aichi.jp',
    'nishio.aichi.jp',
    'nisshin.aichi.jp',
    'obu.aichi.jp',
    'oguchi.aichi.jp',
    'oharu.aichi.jp',
    'okazaki.aichi.jp',
    'owariasahi.aichi.jp',
    'seto.aichi.jp',
    'shikatsu.aichi.jp',
    'shinshiro.aichi.jp',
    'shitara.aichi.jp',
    'tahara.aichi.jp',
    'takahama.aichi.jp',
    'tobishima.aichi.jp',
    'toei.aichi.jp',
    'togo.aichi.jp',
    'tokai.aichi.jp',
    'tokoname.aichi.jp',
    'toyoake.aichi.jp',
    'toyohashi.aichi.jp',
    'toyokawa.aichi.jp',
    'toyone.aichi.jp',
    'toyota.aichi.jp',
    'tsushima.aichi.jp',
    'yatomi.aichi.jp',
    'akita.akita.jp',
    'daisen.akita.jp',
    'fujisato.akita.jp',
    'gojome.akita.jp',
    'hachirogata.akita.jp',
    'happou.akita.jp',
    'higashinaruse.akita.jp',
    'honjo.akita.jp',
    'honjyo.akita.jp',
    'ikawa.akita.jp',
    'kamikoani.akita.jp',
    'kamioka.akita.jp',
    'katagami.akita.jp',
    'kazuno.akita.jp',
    'kitaakita.akita.jp',
    'kosaka.akita.jp',
    'kyowa.akita.jp',
    'misato.akita.jp',
    'mitane.akita.jp',
    'moriyoshi.akita.jp',
    'nikaho.akita.jp',
    'noshiro.akita.jp',
    'odate.akita.jp',
    'oga.akita.jp',
    'ogata.akita.jp',
    'semboku.akita.jp',
    'yokote.akita.jp',
    'yurihonjo.akita.jp',
    'aomori.aomori.jp',
    'gonohe.aomori.jp',
    'hachinohe.aomori.jp',
    'hashikami.aomori.jp',
    'hiranai.aomori.jp',
    'hirosaki.aomori.jp',
    'itayanagi.aomori.jp',
    'kuroishi.aomori.jp',
    'misawa.aomori.jp',
    'mutsu.aomori.jp',
    'nakadomari.aomori.jp',
    'noheji.aomori.jp',
    'oirase.aomori.jp',
    'owani.aomori.jp',
    'rokunohe.aomori.jp',
    'sannohe.aomori.jp',
    'shichinohe.aomori.jp',
    'shingo.aomori.jp',
    'takko.aomori.jp',
    'towada.aomori.jp',
    'tsugaru.aomori.jp',
    'tsuruta.aomori.jp',
    'abiko.chiba.jp',
    'asahi.chiba.jp',
    'chonan.chiba.jp',
    'chosei.chiba.jp',
    'choshi.chiba.jp',
    'chuo.chiba.jp',
    'funabashi.chiba.jp',
    'futtsu.chiba.jp',
    'hanamigawa.chiba.jp',
    'ichihara.chiba.jp',
    'ichikawa.chiba.jp',
    'ichinomiya.chiba.jp',
    'inzai.chiba.jp',
    'isumi.chiba.jp',
    'kamagaya.chiba.jp',
    'kamogawa.chiba.jp',
    'kashiwa.chiba.jp',
    'katori.chiba.jp',
    'katsuura.chiba.jp',
    'kimitsu.chiba.jp',
    'kisarazu.chiba.jp',
    'kozaki.chiba.jp',
    'kujukuri.chiba.jp',
    'kyonan.chiba.jp',
    'matsudo.chiba.jp',
    'midori.chiba.jp',
    'mihama.chiba.jp',
    'minamiboso.chiba.jp',
    'mobara.chiba.jp',
    'mutsuzawa.chiba.jp',
    'nagara.chiba.jp',
    'nagareyama.chiba.jp',
    'narashino.chiba.jp',
    'narita.chiba.jp',
    'noda.chiba.jp',
    'oamishirasato.chiba.jp',
    'omigawa.chiba.jp',
    'onjuku.chiba.jp',
    'otaki.chiba.jp',
    'sakae.chiba.jp',
    'sakura.chiba.jp',
    'shimofusa.chiba.jp',
    'shirako.chiba.jp',
    'shiroi.chiba.jp',
    'shisui.chiba.jp',
    'sodegaura.chiba.jp',
    'sosa.chiba.jp',
    'tako.chiba.jp',
    'tateyama.chiba.jp',
    'togane.chiba.jp',
    'tohnosho.chiba.jp',
    'tomisato.chiba.jp',
    'urayasu.chiba.jp',
    'yachimata.chiba.jp',
    'yachiyo.chiba.jp',
    'yokaichiba.chiba.jp',
    'yokoshibahikari.chiba.jp',
    'yotsukaido.chiba.jp',
    'ainan.ehime.jp',
    'honai.ehime.jp',
    'ikata.ehime.jp',
    'imabari.ehime.jp',
    'iyo.ehime.jp',
    'kamijima.ehime.jp',
    'kihoku.ehime.jp',
    'kumakogen.ehime.jp',
    'masaki.ehime.jp',
    'matsuno.ehime.jp',
    'matsuyama.ehime.jp',
    'namikata.ehime.jp',
    'niihama.ehime.jp',
    'ozu.ehime.jp',
    'saijo.ehime.jp',
    'seiyo.ehime.jp',
    'shikokuchuo.ehime.jp',
    'tobe.ehime.jp',
    'toon.ehime.jp',
    'uchiko.ehime.jp',
    'uwajima.ehime.jp',
    'yawatahama.ehime.jp',
    'echizen.fukui.jp',
    'eiheiji.fukui.jp',
    'fukui.fukui.jp',
    'ikeda.fukui.jp',
    'katsuyama.fukui.jp',
    'mihama.fukui.jp',
    'minamiechizen.fukui.jp',
    'obama.fukui.jp',
    'ohi.fukui.jp',
    'ono.fukui.jp',
    'sabae.fukui.jp',
    'sakai.fukui.jp',
    'takahama.fukui.jp',
    'tsuruga.fukui.jp',
    'wakasa.fukui.jp',
    'ashiya.fukuoka.jp',
    'buzen.fukuoka.jp',
    'chikugo.fukuoka.jp',
    'chikuho.fukuoka.jp',
    'chikujo.fukuoka.jp',
    'chikushino.fukuoka.jp',
    'chikuzen.fukuoka.jp',
    'chuo.fukuoka.jp',
    'dazaifu.fukuoka.jp',
    'fukuchi.fukuoka.jp',
    'hakata.fukuoka.jp',
    'higashi.fukuoka.jp',
    'hirokawa.fukuoka.jp',
    'hisayama.fukuoka.jp',
    'iizuka.fukuoka.jp',
    'inatsuki.fukuoka.jp',
    'kaho.fukuoka.jp',
    'kasuga.fukuoka.jp',
    'kasuya.fukuoka.jp',
    'kawara.fukuoka.jp',
    'keisen.fukuoka.jp',
    'koga.fukuoka.jp',
    'kurate.fukuoka.jp',
    'kurogi.fukuoka.jp',
    'kurume.fukuoka.jp',
    'minami.fukuoka.jp',
    'miyako.fukuoka.jp',
    'miyama.fukuoka.jp',
    'miyawaka.fukuoka.jp',
    'mizumaki.fukuoka.jp',
    'munakata.fukuoka.jp',
    'nakagawa.fukuoka.jp',
    'nakama.fukuoka.jp',
    'nishi.fukuoka.jp',
    'nogata.fukuoka.jp',
    'ogori.fukuoka.jp',
    'okagaki.fukuoka.jp',
    'okawa.fukuoka.jp',
    'oki.fukuoka.jp',
    'omuta.fukuoka.jp',
    'onga.fukuoka.jp',
    'onojo.fukuoka.jp',
    'oto.fukuoka.jp',
    'saigawa.fukuoka.jp',
    'sasaguri.fukuoka.jp',
    'shingu.fukuoka.jp',
    'shinyoshitomi.fukuoka.jp',
    'shonai.fukuoka.jp',
    'soeda.fukuoka.jp',
    'sue.fukuoka.jp',
    'tachiarai.fukuoka.jp',
    'tagawa.fukuoka.jp',
    'takata.fukuoka.jp',
    'toho.fukuoka.jp',
    'toyotsu.fukuoka.jp',
    'tsuiki.fukuoka.jp',
    'ukiha.fukuoka.jp',
    'umi.fukuoka.jp',
    'usui.fukuoka.jp',
    'yamada.fukuoka.jp',
    'yame.fukuoka.jp',
    'yanagawa.fukuoka.jp',
    'yukuhashi.fukuoka.jp',
    'aizubange.fukushima.jp',
    'aizumisato.fukushima.jp',
    'aizuwakamatsu.fukushima.jp',
    'asakawa.fukushima.jp',
    'bandai.fukushima.jp',
    'date.fukushima.jp',
    'fukushima.fukushima.jp',
    'furudono.fukushima.jp',
    'futaba.fukushima.jp',
    'hanawa.fukushima.jp',
    'higashi.fukushima.jp',
    'hirata.fukushima.jp',
    'hirono.fukushima.jp',
    'iitate.fukushima.jp',
    'inawashiro.fukushima.jp',
    'ishikawa.fukushima.jp',
    'iwaki.fukushima.jp',
    'izumizaki.fukushima.jp',
    'kagamiishi.fukushima.jp',
    'kaneyama.fukushima.jp',
    'kawamata.fukushima.jp',
    'kitakata.fukushima.jp',
    'kitashiobara.fukushima.jp',
    'koori.fukushima.jp',
    'koriyama.fukushima.jp',
    'kunimi.fukushima.jp',
    'miharu.fukushima.jp',
    'mishima.fukushima.jp',
    'namie.fukushima.jp',
    'nango.fukushima.jp',
    'nishiaizu.fukushima.jp',
    'nishigo.fukushima.jp',
    'okuma.fukushima.jp',
    'omotego.fukushima.jp',
    'ono.fukushima.jp',
    'otama.fukushima.jp',
    'samegawa.fukushima.jp',
    'shimogo.fukushima.jp',
    'shirakawa.fukushima.jp',
    'showa.fukushima.jp',
    'soma.fukushima.jp',
    'sukagawa.fukushima.jp',
    'taishin.fukushima.jp',
    'tamakawa.fukushima.jp',
    'tanagura.fukushima.jp',
    'tenei.fukushima.jp',
    'yabuki.fukushima.jp',
    'yamato.fukushima.jp',
    'yamatsuri.fukushima.jp',
    'yanaizu.fukushima.jp',
    'yugawa.fukushima.jp',
    'anpachi.gifu.jp',
    'ena.gifu.jp',
    'gifu.gifu.jp',
    'ginan.gifu.jp',
    'godo.gifu.jp',
    'gujo.gifu.jp',
    'hashima.gifu.jp',
    'hichiso.gifu.jp',
    'hida.gifu.jp',
    'higashishirakawa.gifu.jp',
    'ibigawa.gifu.jp',
    'ikeda.gifu.jp',
    'kakamigahara.gifu.jp',
    'kani.gifu.jp',
    'kasahara.gifu.jp',
    'kasamatsu.gifu.jp',
    'kawaue.gifu.jp',
    'kitagata.gifu.jp',
    'mino.gifu.jp',
    'minokamo.gifu.jp',
    'mitake.gifu.jp',
    'mizunami.gifu.jp',
    'motosu.gifu.jp',
    'nakatsugawa.gifu.jp',
    'ogaki.gifu.jp',
    'sakahogi.gifu.jp',
    'seki.gifu.jp',
    'sekigahara.gifu.jp',
    'shirakawa.gifu.jp',
    'tajimi.gifu.jp',
    'takayama.gifu.jp',
    'tarui.gifu.jp',
    'toki.gifu.jp',
    'tomika.gifu.jp',
    'wanouchi.gifu.jp',
    'yamagata.gifu.jp',
    'yaotsu.gifu.jp',
    'yoro.gifu.jp',
    'annaka.gunma.jp',
    'chiyoda.gunma.jp',
    'fujioka.gunma.jp',
    'higashiagatsuma.gunma.jp',
    'isesaki.gunma.jp',
    'itakura.gunma.jp',
    'kanna.gunma.jp',
    'kanra.gunma.jp',
    'katashina.gunma.jp',
    'kawaba.gunma.jp',
    'kiryu.gunma.jp',
    'kusatsu.gunma.jp',
    'maebashi.gunma.jp',
    'meiwa.gunma.jp',
    'midori.gunma.jp',
    'minakami.gunma.jp',
    'naganohara.gunma.jp',
    'nakanojo.gunma.jp',
    'nanmoku.gunma.jp',
    'numata.gunma.jp',
    'oizumi.gunma.jp',
    'ora.gunma.jp',
    'ota.gunma.jp',
    'shibukawa.gunma.jp',
    'shimonita.gunma.jp',
    'shinto.gunma.jp',
    'showa.gunma.jp',
    'takasaki.gunma.jp',
    'takayama.gunma.jp',
    'tamamura.gunma.jp',
    'tatebayashi.gunma.jp',
    'tomioka.gunma.jp',
    'tsukiyono.gunma.jp',
    'tsumagoi.gunma.jp',
    'ueno.gunma.jp',
    'yoshioka.gunma.jp',
    'asaminami.hiroshima.jp',
    'daiwa.hiroshima.jp',
    'etajima.hiroshima.jp',
    'fuchu.hiroshima.jp',
    'fukuyama.hiroshima.jp',
    'hatsukaichi.hiroshima.jp',
    'higashihiroshima.hiroshima.jp',
    'hongo.hiroshima.jp',
    'jinsekikogen.hiroshima.jp',
    'kaita.hiroshima.jp',
    'kui.hiroshima.jp',
    'kumano.hiroshima.jp',
    'kure.hiroshima.jp',
    'mihara.hiroshima.jp',
    'miyoshi.hiroshima.jp',
    'naka.hiroshima.jp',
    'onomichi.hiroshima.jp',
    'osakikamijima.hiroshima.jp',
    'otake.hiroshima.jp',
    'saka.hiroshima.jp',
    'sera.hiroshima.jp',
    'seranishi.hiroshima.jp',
    'shinichi.hiroshima.jp',
    'shobara.hiroshima.jp',
    'takehara.hiroshima.jp',
    'abashiri.hokkaido.jp',
    'abira.hokkaido.jp',
    'aibetsu.hokkaido.jp',
    'akabira.hokkaido.jp',
    'akkeshi.hokkaido.jp',
    'asahikawa.hokkaido.jp',
    'ashibetsu.hokkaido.jp',
    'ashoro.hokkaido.jp',
    'assabu.hokkaido.jp',
    'atsuma.hokkaido.jp',
    'bibai.hokkaido.jp',
    'biei.hokkaido.jp',
    'bifuka.hokkaido.jp',
    'bihoro.hokkaido.jp',
    'biratori.hokkaido.jp',
    'chippubetsu.hokkaido.jp',
    'chitose.hokkaido.jp',
    'date.hokkaido.jp',
    'ebetsu.hokkaido.jp',
    'embetsu.hokkaido.jp',
    'eniwa.hokkaido.jp',
    'erimo.hokkaido.jp',
    'esan.hokkaido.jp',
    'esashi.hokkaido.jp',
    'fukagawa.hokkaido.jp',
    'fukushima.hokkaido.jp',
    'furano.hokkaido.jp',
    'furubira.hokkaido.jp',
    'haboro.hokkaido.jp',
    'hakodate.hokkaido.jp',
    'hamatonbetsu.hokkaido.jp',
    'hidaka.hokkaido.jp',
    'higashikagura.hokkaido.jp',
    'higashikawa.hokkaido.jp',
    'hiroo.hokkaido.jp',
    'hokuryu.hokkaido.jp',
    'hokuto.hokkaido.jp',
    'honbetsu.hokkaido.jp',
    'horokanai.hokkaido.jp',
    'horonobe.hokkaido.jp',
    'ikeda.hokkaido.jp',
    'imakane.hokkaido.jp',
    'ishikari.hokkaido.jp',
    'iwamizawa.hokkaido.jp',
    'iwanai.hokkaido.jp',
    'kamifurano.hokkaido.jp',
    'kamikawa.hokkaido.jp',
    'kamishihoro.hokkaido.jp',
    'kamisunagawa.hokkaido.jp',
    'kamoenai.hokkaido.jp',
    'kayabe.hokkaido.jp',
    'kembuchi.hokkaido.jp',
    'kikonai.hokkaido.jp',
    'kimobetsu.hokkaido.jp',
    'kitahiroshima.hokkaido.jp',
    'kitami.hokkaido.jp',
    'kiyosato.hokkaido.jp',
    'koshimizu.hokkaido.jp',
    'kunneppu.hokkaido.jp',
    'kuriyama.hokkaido.jp',
    'kuromatsunai.hokkaido.jp',
    'kushiro.hokkaido.jp',
    'kutchan.hokkaido.jp',
    'kyowa.hokkaido.jp',
    'mashike.hokkaido.jp',
    'matsumae.hokkaido.jp',
    'mikasa.hokkaido.jp',
    'minamifurano.hokkaido.jp',
    'mombetsu.hokkaido.jp',
    'moseushi.hokkaido.jp',
    'mukawa.hokkaido.jp',
    'muroran.hokkaido.jp',
    'naie.hokkaido.jp',
    'nakagawa.hokkaido.jp',
    'nakasatsunai.hokkaido.jp',
    'nakatombetsu.hokkaido.jp',
    'nanae.hokkaido.jp',
    'nanporo.hokkaido.jp',
    'nayoro.hokkaido.jp',
    'nemuro.hokkaido.jp',
    'niikappu.hokkaido.jp',
    'niki.hokkaido.jp',
    'nishiokoppe.hokkaido.jp',
    'noboribetsu.hokkaido.jp',
    'numata.hokkaido.jp',
    'obihiro.hokkaido.jp',
    'obira.hokkaido.jp',
    'oketo.hokkaido.jp',
    'okoppe.hokkaido.jp',
    'otaru.hokkaido.jp',
    'otobe.hokkaido.jp',
    'otofuke.hokkaido.jp',
    'otoineppu.hokkaido.jp',
    'oumu.hokkaido.jp',
    'ozora.hokkaido.jp',
    'pippu.hokkaido.jp',
    'rankoshi.hokkaido.jp',
    'rebun.hokkaido.jp',
    'rikubetsu.hokkaido.jp',
    'rishiri.hokkaido.jp',
    'rishirifuji.hokkaido.jp',
    'saroma.hokkaido.jp',
    'sarufutsu.hokkaido.jp',
    'shakotan.hokkaido.jp',
    'shari.hokkaido.jp',
    'shibecha.hokkaido.jp',
    'shibetsu.hokkaido.jp',
    'shikabe.hokkaido.jp',
    'shikaoi.hokkaido.jp',
    'shimamaki.hokkaido.jp',
    'shimizu.hokkaido.jp',
    'shimokawa.hokkaido.jp',
    'shinshinotsu.hokkaido.jp',
    'shintoku.hokkaido.jp',
    'shiranuka.hokkaido.jp',
    'shiraoi.hokkaido.jp',
    'shiriuchi.hokkaido.jp',
    'sobetsu.hokkaido.jp',
    'sunagawa.hokkaido.jp',
    'taiki.hokkaido.jp',
    'takasu.hokkaido.jp',
    'takikawa.hokkaido.jp',
    'takinoue.hokkaido.jp',
    'teshikaga.hokkaido.jp',
    'tobetsu.hokkaido.jp',
    'tohma.hokkaido.jp',
    'tomakomai.hokkaido.jp',
    'tomari.hokkaido.jp',
    'toya.hokkaido.jp',
    'toyako.hokkaido.jp',
    'toyotomi.hokkaido.jp',
    'toyoura.hokkaido.jp',
    'tsubetsu.hokkaido.jp',
    'tsukigata.hokkaido.jp',
    'urakawa.hokkaido.jp',
    'urausu.hokkaido.jp',
    'uryu.hokkaido.jp',
    'utashinai.hokkaido.jp',
    'wakkanai.hokkaido.jp',
    'wassamu.hokkaido.jp',
    'yakumo.hokkaido.jp',
    'yoichi.hokkaido.jp',
    'aioi.hyogo.jp',
    'akashi.hyogo.jp',
    'ako.hyogo.jp',
    'amagasaki.hyogo.jp',
    'aogaki.hyogo.jp',
    'asago.hyogo.jp',
    'ashiya.hyogo.jp',
    'awaji.hyogo.jp',
    'fukusaki.hyogo.jp',
    'goshiki.hyogo.jp',
    'harima.hyogo.jp',
    'himeji.hyogo.jp',
    'ichikawa.hyogo.jp',
    'inagawa.hyogo.jp',
    'itami.hyogo.jp',
    'kakogawa.hyogo.jp',
    'kamigori.hyogo.jp',
    'kamikawa.hyogo.jp',
    'kasai.hyogo.jp',
    'kasuga.hyogo.jp',
    'kawanishi.hyogo.jp',
    'miki.hyogo.jp',
    'minamiawaji.hyogo.jp',
    'nishinomiya.hyogo.jp',
    'nishiwaki.hyogo.jp',
    'ono.hyogo.jp',
    'sanda.hyogo.jp',
    'sannan.hyogo.jp',
    'sasayama.hyogo.jp',
    'sayo.hyogo.jp',
    'shingu.hyogo.jp',
    'shinonsen.hyogo.jp',
    'shiso.hyogo.jp',
    'sumoto.hyogo.jp',
    'taishi.hyogo.jp',
    'taka.hyogo.jp',
    'takarazuka.hyogo.jp',
    'takasago.hyogo.jp',
    'takino.hyogo.jp',
    'tamba.hyogo.jp',
    'tatsuno.hyogo.jp',
    'toyooka.hyogo.jp',
    'yabu.hyogo.jp',
    'yashiro.hyogo.jp',
    'yoka.hyogo.jp',
    'yokawa.hyogo.jp',
    'ami.ibaraki.jp',
    'asahi.ibaraki.jp',
    'bando.ibaraki.jp',
    'chikusei.ibaraki.jp',
    'daigo.ibaraki.jp',
    'fujishiro.ibaraki.jp',
    'hitachi.ibaraki.jp',
    'hitachinaka.ibaraki.jp',
    'hitachiomiya.ibaraki.jp',
    'hitachiota.ibaraki.jp',
    'ibaraki.ibaraki.jp',
    'ina.ibaraki.jp',
    'inashiki.ibaraki.jp',
    'itako.ibaraki.jp',
    'iwama.ibaraki.jp',
    'joso.ibaraki.jp',
    'kamisu.ibaraki.jp',
    'kasama.ibaraki.jp',
    'kashima.ibaraki.jp',
    'kasumigaura.ibaraki.jp',
    'koga.ibaraki.jp',
    'miho.ibaraki.jp',
    'mito.ibaraki.jp',
    'moriya.ibaraki.jp',
    'naka.ibaraki.jp',
    'namegata.ibaraki.jp',
    'oarai.ibaraki.jp',
    'ogawa.ibaraki.jp',
    'omitama.ibaraki.jp',
    'ryugasaki.ibaraki.jp',
    'sakai.ibaraki.jp',
    'sakuragawa.ibaraki.jp',
    'shimodate.ibaraki.jp',
    'shimotsuma.ibaraki.jp',
    'shirosato.ibaraki.jp',
    'sowa.ibaraki.jp',
    'suifu.ibaraki.jp',
    'takahagi.ibaraki.jp',
    'tamatsukuri.ibaraki.jp',
    'tokai.ibaraki.jp',
    'tomobe.ibaraki.jp',
    'tone.ibaraki.jp',
    'toride.ibaraki.jp',
    'tsuchiura.ibaraki.jp',
    'tsukuba.ibaraki.jp',
    'uchihara.ibaraki.jp',
    'ushiku.ibaraki.jp',
    'yachiyo.ibaraki.jp',
    'yamagata.ibaraki.jp',
    'yawara.ibaraki.jp',
    'yuki.ibaraki.jp',
    'anamizu.ishikawa.jp',
    'hakui.ishikawa.jp',
    'hakusan.ishikawa.jp',
    'kaga.ishikawa.jp',
    'kahoku.ishikawa.jp',
    'kanazawa.ishikawa.jp',
    'kawakita.ishikawa.jp',
    'komatsu.ishikawa.jp',
    'nakanoto.ishikawa.jp',
    'nanao.ishikawa.jp',
    'nomi.ishikawa.jp',
    'nonoichi.ishikawa.jp',
    'noto.ishikawa.jp',
    'shika.ishikawa.jp',
    'suzu.ishikawa.jp',
    'tsubata.ishikawa.jp',
    'tsurugi.ishikawa.jp',
    'uchinada.ishikawa.jp',
    'wajima.ishikawa.jp',
    'fudai.iwate.jp',
    'fujisawa.iwate.jp',
    'hanamaki.iwate.jp',
    'hiraizumi.iwate.jp',
    'hirono.iwate.jp',
    'ichinohe.iwate.jp',
    'ichinoseki.iwate.jp',
    'iwaizumi.iwate.jp',
    'iwate.iwate.jp',
    'joboji.iwate.jp',
    'kamaishi.iwate.jp',
    'kanegasaki.iwate.jp',
    'karumai.iwate.jp',
    'kawai.iwate.jp',
    'kitakami.iwate.jp',
    'kuji.iwate.jp',
    'kunohe.iwate.jp',
    'kuzumaki.iwate.jp',
    'miyako.iwate.jp',
    'mizusawa.iwate.jp',
    'morioka.iwate.jp',
    'ninohe.iwate.jp',
    'noda.iwate.jp',
    'ofunato.iwate.jp',
    'oshu.iwate.jp',
    'otsuchi.iwate.jp',
    'rikuzentakata.iwate.jp',
    'shiwa.iwate.jp',
    'shizukuishi.iwate.jp',
    'sumita.iwate.jp',
    'tanohata.iwate.jp',
    'tono.iwate.jp',
    'yahaba.iwate.jp',
    'yamada.iwate.jp',
    'ayagawa.kagawa.jp',
    'higashikagawa.kagawa.jp',
    'kanonji.kagawa.jp',
    'kotohira.kagawa.jp',
    'manno.kagawa.jp',
    'marugame.kagawa.jp',
    'mitoyo.kagawa.jp',
    'naoshima.kagawa.jp',
    'sanuki.kagawa.jp',
    'tadotsu.kagawa.jp',
    'takamatsu.kagawa.jp',
    'tonosho.kagawa.jp',
    'uchinomi.kagawa.jp',
    'utazu.kagawa.jp',
    'zentsuji.kagawa.jp',
    'akune.kagoshima.jp',
    'amami.kagoshima.jp',
    'hioki.kagoshima.jp',
    'isa.kagoshima.jp',
    'isen.kagoshima.jp',
    'izumi.kagoshima.jp',
    'kagoshima.kagoshima.jp',
    'kanoya.kagoshima.jp',
    'kawanabe.kagoshima.jp',
    'kinko.kagoshima.jp',
    'kouyama.kagoshima.jp',
    'makurazaki.kagoshima.jp',
    'matsumoto.kagoshima.jp',
    'minamitane.kagoshima.jp',
    'nakatane.kagoshima.jp',
    'nishinoomote.kagoshima.jp',
    'satsumasendai.kagoshima.jp',
    'soo.kagoshima.jp',
    'tarumizu.kagoshima.jp',
    'yusui.kagoshima.jp',
    'aikawa.kanagawa.jp',
    'atsugi.kanagawa.jp',
    'ayase.kanagawa.jp',
    'chigasaki.kanagawa.jp',
    'ebina.kanagawa.jp',
    'fujisawa.kanagawa.jp',
    'hadano.kanagawa.jp',
    'hakone.kanagawa.jp',
    'hiratsuka.kanagawa.jp',
    'isehara.kanagawa.jp',
    'kaisei.kanagawa.jp',
    'kamakura.kanagawa.jp',
    'kiyokawa.kanagawa.jp',
    'matsuda.kanagawa.jp',
    'minamiashigara.kanagawa.jp',
    'miura.kanagawa.jp',
    'nakai.kanagawa.jp',
    'ninomiya.kanagawa.jp',
    'odawara.kanagawa.jp',
    'oi.kanagawa.jp',
    'oiso.kanagawa.jp',
    'sagamihara.kanagawa.jp',
    'samukawa.kanagawa.jp',
    'tsukui.kanagawa.jp',
    'yamakita.kanagawa.jp',
    'yamato.kanagawa.jp',
    'yokosuka.kanagawa.jp',
    'yugawara.kanagawa.jp',
    'zama.kanagawa.jp',
    'zushi.kanagawa.jp',
    'aki.kochi.jp',
    'geisei.kochi.jp',
    'hidaka.kochi.jp',
    'higashitsuno.kochi.jp',
    'ino.kochi.jp',
    'kagami.kochi.jp',
    'kami.kochi.jp',
    'kitagawa.kochi.jp',
    'kochi.kochi.jp',
    'mihara.kochi.jp',
    'motoyama.kochi.jp',
    'muroto.kochi.jp',
    'nahari.kochi.jp',
    'nakamura.kochi.jp',
    'nankoku.kochi.jp',
    'nishitosa.kochi.jp',
    'niyodogawa.kochi.jp',
    'ochi.kochi.jp',
    'okawa.kochi.jp',
    'otoyo.kochi.jp',
    'otsuki.kochi.jp',
    'sakawa.kochi.jp',
    'sukumo.kochi.jp',
    'susaki.kochi.jp',
    'tosa.kochi.jp',
    'tosashimizu.kochi.jp',
    'toyo.kochi.jp',
    'tsuno.kochi.jp',
    'umaji.kochi.jp',
    'yasuda.kochi.jp',
    'yusuhara.kochi.jp',
    'amakusa.kumamoto.jp',
    'arao.kumamoto.jp',
    'aso.kumamoto.jp',
    'choyo.kumamoto.jp',
    'gyokuto.kumamoto.jp',
    'kamiamakusa.kumamoto.jp',
    'kikuchi.kumamoto.jp',
    'kumamoto.kumamoto.jp',
    'mashiki.kumamoto.jp',
    'mifune.kumamoto.jp',
    'minamata.kumamoto.jp',
    'minamioguni.kumamoto.jp',
    'nagasu.kumamoto.jp',
    'nishihara.kumamoto.jp',
    'oguni.kumamoto.jp',
    'ozu.kumamoto.jp',
    'sumoto.kumamoto.jp',
    'takamori.kumamoto.jp',
    'uki.kumamoto.jp',
    'uto.kumamoto.jp',
    'yamaga.kumamoto.jp',
    'yamato.kumamoto.jp',
    'yatsushiro.kumamoto.jp',
    'ayabe.kyoto.jp',
    'fukuchiyama.kyoto.jp',
    'higashiyama.kyoto.jp',
    'ide.kyoto.jp',
    'ine.kyoto.jp',
    'joyo.kyoto.jp',
    'kameoka.kyoto.jp',
    'kamo.kyoto.jp',
    'kita.kyoto.jp',
    'kizu.kyoto.jp',
    'kumiyama.kyoto.jp',
    'kyotamba.kyoto.jp',
    'kyotanabe.kyoto.jp',
    'kyotango.kyoto.jp',
    'maizuru.kyoto.jp',
    'minami.kyoto.jp',
    'minamiyamashiro.kyoto.jp',
    'miyazu.kyoto.jp',
    'muko.kyoto.jp',
    'nagaokakyo.kyoto.jp',
    'nakagyo.kyoto.jp',
    'nantan.kyoto.jp',
    'oyamazaki.kyoto.jp',
    'sakyo.kyoto.jp',
    'seika.kyoto.jp',
    'tanabe.kyoto.jp',
    'uji.kyoto.jp',
    'ujitawara.kyoto.jp',
    'wazuka.kyoto.jp',
    'yamashina.kyoto.jp',
    'yawata.kyoto.jp',
    'asahi.mie.jp',
    'inabe.mie.jp',
    'ise.mie.jp',
    'kameyama.mie.jp',
    'kawagoe.mie.jp',
    'kiho.mie.jp',
    'kisosaki.mie.jp',
    'kiwa.mie.jp',
    'komono.mie.jp',
    'kumano.mie.jp',
    'kuwana.mie.jp',
    'matsusaka.mie.jp',
    'meiwa.mie.jp',
    'mihama.mie.jp',
    'minamiise.mie.jp',
    'misugi.mie.jp',
    'miyama.mie.jp',
    'nabari.mie.jp',
    'shima.mie.jp',
    'suzuka.mie.jp',
    'tado.mie.jp',
    'taiki.mie.jp',
    'taki.mie.jp',
    'tamaki.mie.jp',
    'toba.mie.jp',
    'tsu.mie.jp',
    'udono.mie.jp',
    'ureshino.mie.jp',
    'watarai.mie.jp',
    'yokkaichi.mie.jp',
    'furukawa.miyagi.jp',
    'higashimatsushima.miyagi.jp',
    'ishinomaki.miyagi.jp',
    'iwanuma.miyagi.jp',
    'kakuda.miyagi.jp',
    'kami.miyagi.jp',
    'kawasaki.miyagi.jp',
    'marumori.miyagi.jp',
    'matsushima.miyagi.jp',
    'minamisanriku.miyagi.jp',
    'misato.miyagi.jp',
    'murata.miyagi.jp',
    'natori.miyagi.jp',
    'ogawara.miyagi.jp',
    'ohira.miyagi.jp',
    'onagawa.miyagi.jp',
    'osaki.miyagi.jp',
    'rifu.miyagi.jp',
    'semine.miyagi.jp',
    'shibata.miyagi.jp',
    'shichikashuku.miyagi.jp',
    'shikama.miyagi.jp',
    'shiogama.miyagi.jp',
    'shiroishi.miyagi.jp',
    'tagajo.miyagi.jp',
    'taiwa.miyagi.jp',
    'tome.miyagi.jp',
    'tomiya.miyagi.jp',
    'wakuya.miyagi.jp',
    'watari.miyagi.jp',
    'yamamoto.miyagi.jp',
    'zao.miyagi.jp',
    'aya.miyazaki.jp',
    'ebino.miyazaki.jp',
    'gokase.miyazaki.jp',
    'hyuga.miyazaki.jp',
    'kadogawa.miyazaki.jp',
    'kawaminami.miyazaki.jp',
    'kijo.miyazaki.jp',
    'kitagawa.miyazaki.jp',
    'kitakata.miyazaki.jp',
    'kitaura.miyazaki.jp',
    'kobayashi.miyazaki.jp',
    'kunitomi.miyazaki.jp',
    'kushima.miyazaki.jp',
    'mimata.miyazaki.jp',
    'miyakonojo.miyazaki.jp',
    'miyazaki.miyazaki.jp',
    'morotsuka.miyazaki.jp',
    'nichinan.miyazaki.jp',
    'nishimera.miyazaki.jp',
    'nobeoka.miyazaki.jp',
    'saito.miyazaki.jp',
    'shiiba.miyazaki.jp',
    'shintomi.miyazaki.jp',
    'takaharu.miyazaki.jp',
    'takanabe.miyazaki.jp',
    'takazaki.miyazaki.jp',
    'tsuno.miyazaki.jp',
    'achi.nagano.jp',
    'agematsu.nagano.jp',
    'anan.nagano.jp',
    'aoki.nagano.jp',
    'asahi.nagano.jp',
    'azumino.nagano.jp',
    'chikuhoku.nagano.jp',
    'chikuma.nagano.jp',
    'chino.nagano.jp',
    'fujimi.nagano.jp',
    'hakuba.nagano.jp',
    'hara.nagano.jp',
    'hiraya.nagano.jp',
    'iida.nagano.jp',
    'iijima.nagano.jp',
    'iiyama.nagano.jp',
    'iizuna.nagano.jp',
    'ikeda.nagano.jp',
    'ikusaka.nagano.jp',
    'ina.nagano.jp',
    'karuizawa.nagano.jp',
    'kawakami.nagano.jp',
    'kiso.nagano.jp',
    'kisofukushima.nagano.jp',
    'kitaaiki.nagano.jp',
    'komagane.nagano.jp',
    'komoro.nagano.jp',
    'matsukawa.nagano.jp',
    'matsumoto.nagano.jp',
    'miasa.nagano.jp',
    'minamiaiki.nagano.jp',
    'minamimaki.nagano.jp',
    'minamiminowa.nagano.jp',
    'minowa.nagano.jp',
    'miyada.nagano.jp',
    'miyota.nagano.jp',
    'mochizuki.nagano.jp',
    'nagano.nagano.jp',
    'nagawa.nagano.jp',
    'nagiso.nagano.jp',
    'nakagawa.nagano.jp',
    'nakano.nagano.jp',
    'nozawaonsen.nagano.jp',
    'obuse.nagano.jp',
    'ogawa.nagano.jp',
    'okaya.nagano.jp',
    'omachi.nagano.jp',
    'omi.nagano.jp',
    'ookuwa.nagano.jp',
    'ooshika.nagano.jp',
    'otaki.nagano.jp',
    'otari.nagano.jp',
    'sakae.nagano.jp',
    'sakaki.nagano.jp',
    'saku.nagano.jp',
    'sakuho.nagano.jp',
    'shimosuwa.nagano.jp',
    'shinanomachi.nagano.jp',
    'shiojiri.nagano.jp',
    'suwa.nagano.jp',
    'suzaka.nagano.jp',
    'takagi.nagano.jp',
    'takamori.nagano.jp',
    'takayama.nagano.jp',
    'tateshina.nagano.jp',
    'tatsuno.nagano.jp',
    'togakushi.nagano.jp',
    'togura.nagano.jp',
    'tomi.nagano.jp',
    'ueda.nagano.jp',
    'wada.nagano.jp',
    'yamagata.nagano.jp',
    'yamanouchi.nagano.jp',
    'yasaka.nagano.jp',
    'yasuoka.nagano.jp',
    'chijiwa.nagasaki.jp',
    'futsu.nagasaki.jp',
    'goto.nagasaki.jp',
    'hasami.nagasaki.jp',
    'hirado.nagasaki.jp',
    'iki.nagasaki.jp',
    'isahaya.nagasaki.jp',
    'kawatana.nagasaki.jp',
    'kuchinotsu.nagasaki.jp',
    'matsuura.nagasaki.jp',
    'nagasaki.nagasaki.jp',
    'obama.nagasaki.jp',
    'omura.nagasaki.jp',
    'oseto.nagasaki.jp',
    'saikai.nagasaki.jp',
    'sasebo.nagasaki.jp',
    'seihi.nagasaki.jp',
    'shimabara.nagasaki.jp',
    'shinkamigoto.nagasaki.jp',
    'togitsu.nagasaki.jp',
    'tsushima.nagasaki.jp',
    'unzen.nagasaki.jp',
    'ando.nara.jp',
    'gose.nara.jp',
    'heguri.nara.jp',
    'higashiyoshino.nara.jp',
    'ikaruga.nara.jp',
    'ikoma.nara.jp',
    'kamikitayama.nara.jp',
    'kanmaki.nara.jp',
    'kashiba.nara.jp',
    'kashihara.nara.jp',
    'katsuragi.nara.jp',
    'kawai.nara.jp',
    'kawakami.nara.jp',
    'kawanishi.nara.jp',
    'koryo.nara.jp',
    'kurotaki.nara.jp',
    'mitsue.nara.jp',
    'miyake.nara.jp',
    'nara.nara.jp',
    'nosegawa.nara.jp',
    'oji.nara.jp',
    'ouda.nara.jp',
    'oyodo.nara.jp',
    'sakurai.nara.jp',
    'sango.nara.jp',
    'shimoichi.nara.jp',
    'shimokitayama.nara.jp',
    'shinjo.nara.jp',
    'soni.nara.jp',
    'takatori.nara.jp',
    'tawaramoto.nara.jp',
    'tenkawa.nara.jp',
    'tenri.nara.jp',
    'uda.nara.jp',
    'yamatokoriyama.nara.jp',
    'yamatotakada.nara.jp',
    'yamazoe.nara.jp',
    'yoshino.nara.jp',
    'aga.niigata.jp',
    'agano.niigata.jp',
    'gosen.niigata.jp',
    'itoigawa.niigata.jp',
    'izumozaki.niigata.jp',
    'joetsu.niigata.jp',
    'kamo.niigata.jp',
    'kariwa.niigata.jp',
    'kashiwazaki.niigata.jp',
    'minamiuonuma.niigata.jp',
    'mitsuke.niigata.jp',
    'muika.niigata.jp',
    'murakami.niigata.jp',
    'myoko.niigata.jp',
    'nagaoka.niigata.jp',
    'niigata.niigata.jp',
    'ojiya.niigata.jp',
    'omi.niigata.jp',
    'sado.niigata.jp',
    'sanjo.niigata.jp',
    'seiro.niigata.jp',
    'seirou.niigata.jp',
    'sekikawa.niigata.jp',
    'shibata.niigata.jp',
    'tagami.niigata.jp',
    'tainai.niigata.jp',
    'tochio.niigata.jp',
    'tokamachi.niigata.jp',
    'tsubame.niigata.jp',
    'tsunan.niigata.jp',
    'uonuma.niigata.jp',
    'yahiko.niigata.jp',
    'yoita.niigata.jp',
    'yuzawa.niigata.jp',
    'beppu.oita.jp',
    'bungoono.oita.jp',
    'bungotakada.oita.jp',
    'hasama.oita.jp',
    'hiji.oita.jp',
    'himeshima.oita.jp',
    'hita.oita.jp',
    'kamitsue.oita.jp',
    'kokonoe.oita.jp',
    'kuju.oita.jp',
    'kunisaki.oita.jp',
    'kusu.oita.jp',
    'oita.oita.jp',
    'saiki.oita.jp',
    'taketa.oita.jp',
    'tsukumi.oita.jp',
    'usa.oita.jp',
    'usuki.oita.jp',
    'yufu.oita.jp',
    'akaiwa.okayama.jp',
    'asakuchi.okayama.jp',
    'bizen.okayama.jp',
    'hayashima.okayama.jp',
    'ibara.okayama.jp',
    'kagamino.okayama.jp',
    'kasaoka.okayama.jp',
    'kibichuo.okayama.jp',
    'kumenan.okayama.jp',
    'kurashiki.okayama.jp',
    'maniwa.okayama.jp',
    'misaki.okayama.jp',
    'nagi.okayama.jp',
    'niimi.okayama.jp',
    'nishiawakura.okayama.jp',
    'okayama.okayama.jp',
    'satosho.okayama.jp',
    'setouchi.okayama.jp',
    'shinjo.okayama.jp',
    'shoo.okayama.jp',
    'soja.okayama.jp',
    'takahashi.okayama.jp',
    'tamano.okayama.jp',
    'tsuyama.okayama.jp',
    'wake.okayama.jp',
    'yakage.okayama.jp',
    'aguni.okinawa.jp',
    'ginowan.okinawa.jp',
    'ginoza.okinawa.jp',
    'gushikami.okinawa.jp',
    'haebaru.okinawa.jp',
    'higashi.okinawa.jp',
    'hirara.okinawa.jp',
    'iheya.okinawa.jp',
    'ishigaki.okinawa.jp',
    'ishikawa.okinawa.jp',
    'itoman.okinawa.jp',
    'izena.okinawa.jp',
    'kadena.okinawa.jp',
    'kin.okinawa.jp',
    'kitadaito.okinawa.jp',
    'kitanakagusuku.okinawa.jp',
    'kumejima.okinawa.jp',
    'kunigami.okinawa.jp',
    'minamidaito.okinawa.jp',
    'motobu.okinawa.jp',
    'nago.okinawa.jp',
    'naha.okinawa.jp',
    'nakagusuku.okinawa.jp',
    'nakijin.okinawa.jp',
    'nanjo.okinawa.jp',
    'nishihara.okinawa.jp',
    'ogimi.okinawa.jp',
    'okinawa.okinawa.jp',
    'onna.okinawa.jp',
    'shimoji.okinawa.jp',
    'taketomi.okinawa.jp',
    'tarama.okinawa.jp',
    'tokashiki.okinawa.jp',
    'tomigusuku.okinawa.jp',
    'tonaki.okinawa.jp',
    'urasoe.okinawa.jp',
    'uruma.okinawa.jp',
    'yaese.okinawa.jp',
    'yomitan.okinawa.jp',
    'yonabaru.okinawa.jp',
    'yonaguni.okinawa.jp',
    'zamami.okinawa.jp',
    'abeno.osaka.jp',
    'chihayaakasaka.osaka.jp',
    'chuo.osaka.jp',
    'daito.osaka.jp',
    'fujiidera.osaka.jp',
    'habikino.osaka.jp',
    'hannan.osaka.jp',
    'higashiosaka.osaka.jp',
    'higashisumiyoshi.osaka.jp',
    'higashiyodogawa.osaka.jp',
    'hirakata.osaka.jp',
    'ibaraki.osaka.jp',
    'ikeda.osaka.jp',
    'izumi.osaka.jp',
    'izumiotsu.osaka.jp',
    'izumisano.osaka.jp',
    'kadoma.osaka.jp',
    'kaizuka.osaka.jp',
    'kanan.osaka.jp',
    'kashiwara.osaka.jp',
    'katano.osaka.jp',
    'kawachinagano.osaka.jp',
    'kishiwada.osaka.jp',
    'kita.osaka.jp',
    'kumatori.osaka.jp',
    'matsubara.osaka.jp',
    'minato.osaka.jp',
    'minoh.osaka.jp',
    'misaki.osaka.jp',
    'moriguchi.osaka.jp',
    'neyagawa.osaka.jp',
    'nishi.osaka.jp',
    'nose.osaka.jp',
    'osakasayama.osaka.jp',
    'sakai.osaka.jp',
    'sayama.osaka.jp',
    'sennan.osaka.jp',
    'settsu.osaka.jp',
    'shijonawate.osaka.jp',
    'shimamoto.osaka.jp',
    'suita.osaka.jp',
    'tadaoka.osaka.jp',
    'taishi.osaka.jp',
    'tajiri.osaka.jp',
    'takaishi.osaka.jp',
    'takatsuki.osaka.jp',
    'tondabayashi.osaka.jp',
    'toyonaka.osaka.jp',
    'toyono.osaka.jp',
    'yao.osaka.jp',
    'ariake.saga.jp',
    'arita.saga.jp',
    'fukudomi.saga.jp',
    'genkai.saga.jp',
    'hamatama.saga.jp',
    'hizen.saga.jp',
    'imari.saga.jp',
    'kamimine.saga.jp',
    'kanzaki.saga.jp',
    'karatsu.saga.jp',
    'kashima.saga.jp',
    'kitagata.saga.jp',
    'kitahata.saga.jp',
    'kiyama.saga.jp',
    'kouhoku.saga.jp',
    'kyuragi.saga.jp',
    'nishiarita.saga.jp',
    'ogi.saga.jp',
    'omachi.saga.jp',
    'ouchi.saga.jp',
    'saga.saga.jp',
    'shiroishi.saga.jp',
    'taku.saga.jp',
    'tara.saga.jp',
    'tosu.saga.jp',
    'yoshinogari.saga.jp',
    'arakawa.saitama.jp',
    'asaka.saitama.jp',
    'chichibu.saitama.jp',
    'fujimi.saitama.jp',
    'fujimino.saitama.jp',
    'fukaya.saitama.jp',
    'hanno.saitama.jp',
    'hanyu.saitama.jp',
    'hasuda.saitama.jp',
    'hatogaya.saitama.jp',
    'hatoyama.saitama.jp',
    'hidaka.saitama.jp',
    'higashichichibu.saitama.jp',
    'higashimatsuyama.saitama.jp',
    'honjo.saitama.jp',
    'ina.saitama.jp',
    'iruma.saitama.jp',
    'iwatsuki.saitama.jp',
    'kamiizumi.saitama.jp',
    'kamikawa.saitama.jp',
    'kamisato.saitama.jp',
    'kasukabe.saitama.jp',
    'kawagoe.saitama.jp',
    'kawaguchi.saitama.jp',
    'kawajima.saitama.jp',
    'kazo.saitama.jp',
    'kitamoto.saitama.jp',
    'koshigaya.saitama.jp',
    'kounosu.saitama.jp',
    'kuki.saitama.jp',
    'kumagaya.saitama.jp',
    'matsubushi.saitama.jp',
    'minano.saitama.jp',
    'misato.saitama.jp',
    'miyashiro.saitama.jp',
    'miyoshi.saitama.jp',
    'moroyama.saitama.jp',
    'nagatoro.saitama.jp',
    'namegawa.saitama.jp',
    'niiza.saitama.jp',
    'ogano.saitama.jp',
    'ogawa.saitama.jp',
    'ogose.saitama.jp',
    'okegawa.saitama.jp',
    'omiya.saitama.jp',
    'otaki.saitama.jp',
    'ranzan.saitama.jp',
    'ryokami.saitama.jp',
    'saitama.saitama.jp',
    'sakado.saitama.jp',
    'satte.saitama.jp',
    'sayama.saitama.jp',
    'shiki.saitama.jp',
    'shiraoka.saitama.jp',
    'soka.saitama.jp',
    'sugito.saitama.jp',
    'toda.saitama.jp',
    'tokigawa.saitama.jp',
    'tokorozawa.saitama.jp',
    'tsurugashima.saitama.jp',
    'urawa.saitama.jp',
    'warabi.saitama.jp',
    'yashio.saitama.jp',
    'yokoze.saitama.jp',
    'yono.saitama.jp',
    'yorii.saitama.jp',
    'yoshida.saitama.jp',
    'yoshikawa.saitama.jp',
    'yoshimi.saitama.jp',
    'aisho.shiga.jp',
    'gamo.shiga.jp',
    'higashiomi.shiga.jp',
    'hikone.shiga.jp',
    'koka.shiga.jp',
    'konan.shiga.jp',
    'kosei.shiga.jp',
    'koto.shiga.jp',
    'kusatsu.shiga.jp',
    'maibara.shiga.jp',
    'moriyama.shiga.jp',
    'nagahama.shiga.jp',
    'nishiazai.shiga.jp',
    'notogawa.shiga.jp',
    'omihachiman.shiga.jp',
    'otsu.shiga.jp',
    'ritto.shiga.jp',
    'ryuoh.shiga.jp',
    'takashima.shiga.jp',
    'takatsuki.shiga.jp',
    'torahime.shiga.jp',
    'toyosato.shiga.jp',
    'yasu.shiga.jp',
    'akagi.shimane.jp',
    'ama.shimane.jp',
    'gotsu.shimane.jp',
    'hamada.shimane.jp',
    'higashiizumo.shimane.jp',
    'hikawa.shimane.jp',
    'hikimi.shimane.jp',
    'izumo.shimane.jp',
    'kakinoki.shimane.jp',
    'masuda.shimane.jp',
    'matsue.shimane.jp',
    'misato.shimane.jp',
    'nishinoshima.shimane.jp',
    'ohda.shimane.jp',
    'okinoshima.shimane.jp',
    'okuizumo.shimane.jp',
    'shimane.shimane.jp',
    'tamayu.shimane.jp',
    'tsuwano.shimane.jp',
    'unnan.shimane.jp',
    'yakumo.shimane.jp',
    'yasugi.shimane.jp',
    'yatsuka.shimane.jp',
    'arai.shizuoka.jp',
    'atami.shizuoka.jp',
    'fuji.shizuoka.jp',
    'fujieda.shizuoka.jp',
    'fujikawa.shizuoka.jp',
    'fujinomiya.shizuoka.jp',
    'fukuroi.shizuoka.jp',
    'gotemba.shizuoka.jp',
    'haibara.shizuoka.jp',
    'hamamatsu.shizuoka.jp',
    'higashiizu.shizuoka.jp',
    'ito.shizuoka.jp',
    'iwata.shizuoka.jp',
    'izu.shizuoka.jp',
    'izunokuni.shizuoka.jp',
    'kakegawa.shizuoka.jp',
    'kannami.shizuoka.jp',
    'kawanehon.shizuoka.jp',
    'kawazu.shizuoka.jp',
    'kikugawa.shizuoka.jp',
    'kosai.shizuoka.jp',
    'makinohara.shizuoka.jp',
    'matsuzaki.shizuoka.jp',
    'minamiizu.shizuoka.jp',
    'mishima.shizuoka.jp',
    'morimachi.shizuoka.jp',
    'nishiizu.shizuoka.jp',
    'numazu.shizuoka.jp',
    'omaezaki.shizuoka.jp',
    'shimada.shizuoka.jp',
    'shimizu.shizuoka.jp',
    'shimoda.shizuoka.jp',
    'shizuoka.shizuoka.jp',
    'susono.shizuoka.jp',
    'yaizu.shizuoka.jp',
    'yoshida.shizuoka.jp',
    'ashikaga.tochigi.jp',
    'bato.tochigi.jp',
    'haga.tochigi.jp',
    'ichikai.tochigi.jp',
    'iwafune.tochigi.jp',
    'kaminokawa.tochigi.jp',
    'kanuma.tochigi.jp',
    'karasuyama.tochigi.jp',
    'kuroiso.tochigi.jp',
    'mashiko.tochigi.jp',
    'mibu.tochigi.jp',
    'moka.tochigi.jp',
    'motegi.tochigi.jp',
    'nasu.tochigi.jp',
    'nasushiobara.tochigi.jp',
    'nikko.tochigi.jp',
    'nishikata.tochigi.jp',
    'nogi.tochigi.jp',
    'ohira.tochigi.jp',
    'ohtawara.tochigi.jp',
    'oyama.tochigi.jp',
    'sakura.tochigi.jp',
    'sano.tochigi.jp',
    'shimotsuke.tochigi.jp',
    'shioya.tochigi.jp',
    'takanezawa.tochigi.jp',
    'tochigi.tochigi.jp',
    'tsuga.tochigi.jp',
    'ujiie.tochigi.jp',
    'utsunomiya.tochigi.jp',
    'yaita.tochigi.jp',
    'aizumi.tokushima.jp',
    'anan.tokushima.jp',
    'ichiba.tokushima.jp',
    'itano.tokushima.jp',
    'kainan.tokushima.jp',
    'komatsushima.tokushima.jp',
    'matsushige.tokushima.jp',
    'mima.tokushima.jp',
    'minami.tokushima.jp',
    'miyoshi.tokushima.jp',
    'mugi.tokushima.jp',
    'nakagawa.tokushima.jp',
    'naruto.tokushima.jp',
    'sanagochi.tokushima.jp',
    'shishikui.tokushima.jp',
    'tokushima.tokushima.jp',
    'wajiki.tokushima.jp',
    'adachi.tokyo.jp',
    'akiruno.tokyo.jp',
    'akishima.tokyo.jp',
    'aogashima.tokyo.jp',
    'arakawa.tokyo.jp',
    'bunkyo.tokyo.jp',
    'chiyoda.tokyo.jp',
    'chofu.tokyo.jp',
    'chuo.tokyo.jp',
    'edogawa.tokyo.jp',
    'fuchu.tokyo.jp',
    'fussa.tokyo.jp',
    'hachijo.tokyo.jp',
    'hachioji.tokyo.jp',
    'hamura.tokyo.jp',
    'higashikurume.tokyo.jp',
    'higashimurayama.tokyo.jp',
    'higashiyamato.tokyo.jp',
    'hino.tokyo.jp',
    'hinode.tokyo.jp',
    'hinohara.tokyo.jp',
    'inagi.tokyo.jp',
    'itabashi.tokyo.jp',
    'katsushika.tokyo.jp',
    'kita.tokyo.jp',
    'kiyose.tokyo.jp',
    'kodaira.tokyo.jp',
    'koganei.tokyo.jp',
    'kokubunji.tokyo.jp',
    'komae.tokyo.jp',
    'koto.tokyo.jp',
    'kouzushima.tokyo.jp',
    'kunitachi.tokyo.jp',
    'machida.tokyo.jp',
    'meguro.tokyo.jp',
    'minato.tokyo.jp',
    'mitaka.tokyo.jp',
    'mizuho.tokyo.jp',
    'musashimurayama.tokyo.jp',
    'musashino.tokyo.jp',
    'nakano.tokyo.jp',
    'nerima.tokyo.jp',
    'ogasawara.tokyo.jp',
    'okutama.tokyo.jp',
    'ome.tokyo.jp',
    'oshima.tokyo.jp',
    'ota.tokyo.jp',
    'setagaya.tokyo.jp',
    'shibuya.tokyo.jp',
    'shinagawa.tokyo.jp',
    'shinjuku.tokyo.jp',
    'suginami.tokyo.jp',
    'sumida.tokyo.jp',
    'tachikawa.tokyo.jp',
    'taito.tokyo.jp',
    'tama.tokyo.jp',
    'toshima.tokyo.jp',
    'chizu.tottori.jp',
    'hino.tottori.jp',
    'kawahara.tottori.jp',
    'koge.tottori.jp',
    'kotoura.tottori.jp',
    'misasa.tottori.jp',
    'nanbu.tottori.jp',
    'nichinan.tottori.jp',
    'sakaiminato.tottori.jp',
    'tottori.tottori.jp',
    'wakasa.tottori.jp',
    'yazu.tottori.jp',
    'yonago.tottori.jp',
    'asahi.toyama.jp',
    'fuchu.toyama.jp',
    'fukumitsu.toyama.jp',
    'funahashi.toyama.jp',
    'himi.toyama.jp',
    'imizu.toyama.jp',
    'inami.toyama.jp',
    'johana.toyama.jp',
    'kamiichi.toyama.jp',
    'kurobe.toyama.jp',
    'nakaniikawa.toyama.jp',
    'namerikawa.toyama.jp',
    'nanto.toyama.jp',
    'nyuzen.toyama.jp',
    'oyabe.toyama.jp',
    'taira.toyama.jp',
    'takaoka.toyama.jp',
    'tateyama.toyama.jp',
    'toga.toyama.jp',
    'tonami.toyama.jp',
    'toyama.toyama.jp',
    'unazuki.toyama.jp',
    'uozu.toyama.jp',
    'yamada.toyama.jp',
    'arida.wakayama.jp',
    'aridagawa.wakayama.jp',
    'gobo.wakayama.jp',
    'hashimoto.wakayama.jp',
    'hidaka.wakayama.jp',
    'hirogawa.wakayama.jp',
    'inami.wakayama.jp',
    'iwade.wakayama.jp',
    'kainan.wakayama.jp',
    'kamitonda.wakayama.jp',
    'katsuragi.wakayama.jp',
    'kimino.wakayama.jp',
    'kinokawa.wakayama.jp',
    'kitayama.wakayama.jp',
    'koya.wakayama.jp',
    'koza.wakayama.jp',
    'kozagawa.wakayama.jp',
    'kudoyama.wakayama.jp',
    'kushimoto.wakayama.jp',
    'mihama.wakayama.jp',
    'misato.wakayama.jp',
    'nachikatsuura.wakayama.jp',
    'shingu.wakayama.jp',
    'shirahama.wakayama.jp',
    'taiji.wakayama.jp',
    'tanabe.wakayama.jp',
    'wakayama.wakayama.jp',
    'yuasa.wakayama.jp',
    'yura.wakayama.jp',
    'asahi.yamagata.jp',
    'funagata.yamagata.jp',
    'higashine.yamagata.jp',
    'iide.yamagata.jp',
    'kahoku.yamagata.jp',
    'kaminoyama.yamagata.jp',
    'kaneyama.yamagata.jp',
    'kawanishi.yamagata.jp',
    'mamurogawa.yamagata.jp',
    'mikawa.yamagata.jp',
    'murayama.yamagata.jp',
    'nagai.yamagata.jp',
    'nakayama.yamagata.jp',
    'nanyo.yamagata.jp',
    'nishikawa.yamagata.jp',
    'obanazawa.yamagata.jp',
    'oe.yamagata.jp',
    'oguni.yamagata.jp',
    'ohkura.yamagata.jp',
    'oishida.yamagata.jp',
    'sagae.yamagata.jp',
    'sakata.yamagata.jp',
    'sakegawa.yamagata.jp',
    'shinjo.yamagata.jp',
    'shirataka.yamagata.jp',
    'shonai.yamagata.jp',
    'takahata.yamagata.jp',
    'tendo.yamagata.jp',
    'tozawa.yamagata.jp',
    'tsuruoka.yamagata.jp',
    'yamagata.yamagata.jp',
    'yamanobe.yamagata.jp',
    'yonezawa.yamagata.jp',
    'yuza.yamagata.jp',
    'abu.yamaguchi.jp',
    'hagi.yamaguchi.jp',
    'hikari.yamaguchi.jp',
    'hofu.yamaguchi.jp',
    'iwakuni.yamaguchi.jp',
    'kudamatsu.yamaguchi.jp',
    'mitou.yamaguchi.jp',
    'nagato.yamaguchi.jp',
    'oshima.yamaguchi.jp',
    'shimonoseki.yamaguchi.jp',
    'shunan.yamaguchi.jp',
    'tabuse.yamaguchi.jp',
    'tokuyama.yamaguchi.jp',
    'toyota.yamaguchi.jp',
    'ube.yamaguchi.jp',
    'yuu.yamaguchi.jp',
    'chuo.yamanashi.jp',
    'doshi.yamanashi.jp',
    'fuefuki.yamanashi.jp',
    'fujikawa.yamanashi.jp',
    'fujikawaguchiko.yamanashi.jp',
    'fujiyoshida.yamanashi.jp',
    'hayakawa.yamanashi.jp',
    'hokuto.yamanashi.jp',
    'ichikawamisato.yamanashi.jp',
    'kai.yamanashi.jp',
    'kofu.yamanashi.jp',
    'koshu.yamanashi.jp',
    'kosuge.yamanashi.jp',
    'minami-alps.yamanashi.jp',
    'minobu.yamanashi.jp',
    'nakamichi.yamanashi.jp',
    'nanbu.yamanashi.jp',
    'narusawa.yamanashi.jp',
    'nirasaki.yamanashi.jp',
    'nishikatsura.yamanashi.jp',
    'oshino.yamanashi.jp',
    'otsuki.yamanashi.jp',
    'showa.yamanashi.jp',
    'tabayama.yamanashi.jp',
    'tsuru.yamanashi.jp',
    'uenohara.yamanashi.jp',
    'yamanakako.yamanashi.jp',
    'yamanashi.yamanashi.jp',
    'ke',
    'ac.ke',
    'co.ke',
    'go.ke',
    'info.ke',
    'me.ke',
    'mobi.ke',
    'ne.ke',
    'or.ke',
    'sc.ke',
    'kg',
    'org.kg',
    'net.kg',
    'com.kg',
    'edu.kg',
    'gov.kg',
    'mil.kg',
    '*.kh',
    'ki',
    'edu.ki',
    'biz.ki',
    'net.ki',
    'org.ki',
    'gov.ki',
    'info.ki',
    'com.ki',
    'km',
    'org.km',
    'nom.km',
    'gov.km',
    'prd.km',
    'tm.km',
    'edu.km',
    'mil.km',
    'ass.km',
    'com.km',
    'coop.km',
    'asso.km',
    'presse.km',
    'medecin.km',
    'notaires.km',
    'pharmaciens.km',
    'veterinaire.km',
    'gouv.km',
    'kn',
    'net.kn',
    'org.kn',
    'edu.kn',
    'gov.kn',
    'kp',
    'com.kp',
    'edu.kp',
    'gov.kp',
    'org.kp',
    'rep.kp',
    'tra.kp',
    'kr',
    'ac.kr',
    'co.kr',
    'es.kr',
    'go.kr',
    'hs.kr',
    'kg.kr',
    'mil.kr',
    'ms.kr',
    'ne.kr',
    'or.kr',
    'pe.kr',
    're.kr',
    'sc.kr',
    'busan.kr',
    'chungbuk.kr',
    'chungnam.kr',
    'daegu.kr',
    'daejeon.kr',
    'gangwon.kr',
    'gwangju.kr',
    'gyeongbuk.kr',
    'gyeonggi.kr',
    'gyeongnam.kr',
    'incheon.kr',
    'jeju.kr',
    'jeonbuk.kr',
    'jeonnam.kr',
    'seoul.kr',
    'ulsan.kr',
    'kw',
    'com.kw',
    'edu.kw',
    'emb.kw',
    'gov.kw',
    'ind.kw',
    'net.kw',
    'org.kw',
    'ky',
    'edu.ky',
    'gov.ky',
    'com.ky',
    'org.ky',
    'net.ky',
    'kz',
    'org.kz',
    'edu.kz',
    'net.kz',
    'gov.kz',
    'mil.kz',
    'com.kz',
    'la',
    'int.la',
    'net.la',
    'info.la',
    'edu.la',
    'gov.la',
    'per.la',
    'com.la',
    'org.la',
    'lb',
    'com.lb',
    'edu.lb',
    'gov.lb',
    'net.lb',
    'org.lb',
    'lc',
    'com.lc',
    'net.lc',
    'co.lc',
    'org.lc',
    'edu.lc',
    'gov.lc',
    'li',
    'lk',
    'gov.lk',
    'sch.lk',
    'net.lk',
    'int.lk',
    'com.lk',
    'org.lk',
    'edu.lk',
    'ngo.lk',
    'soc.lk',
    'web.lk',
    'ltd.lk',
    'assn.lk',
    'grp.lk',
    'hotel.lk',
    'ac.lk',
    'lr',
    'com.lr',
    'edu.lr',
    'gov.lr',
    'org.lr',
    'net.lr',
    'ls',
    'co.ls',
    'org.ls',
    'lt',
    'gov.lt',
    'lu',
    'lv',
    'com.lv',
    'edu.lv',
    'gov.lv',
    'org.lv',
    'mil.lv',
    'id.lv',
    'net.lv',
    'asn.lv',
    'conf.lv',
    'ly',
    'com.ly',
    'net.ly',
    'gov.ly',
    'plc.ly',
    'edu.ly',
    'sch.ly',
    'med.ly',
    'org.ly',
    'id.ly',
    'ma',
    'co.ma',
    'net.ma',
    'gov.ma',
    'org.ma',
    'ac.ma',
    'press.ma',
    'mc',
    'tm.mc',
    'asso.mc',
    'md',
    'me',
    'co.me',
    'net.me',
    'org.me',
    'edu.me',
    'ac.me',
    'gov.me',
    'its.me',
    'priv.me',
    'mg',
    'org.mg',
    'nom.mg',
    'gov.mg',
    'prd.mg',
    'tm.mg',
    'edu.mg',
    'mil.mg',
    'com.mg',
    'co.mg',
    'mh',
    'mil',
    'mk',
    'com.mk',
    'org.mk',
    'net.mk',
    'edu.mk',
    'gov.mk',
    'inf.mk',
    'name.mk',
    'ml',
    'com.ml',
    'edu.ml',
    'gouv.ml',
    'gov.ml',
    'net.ml',
    'org.ml',
    'presse.ml',
    '*.mm',
    'mn',
    'gov.mn',
    'edu.mn',
    'org.mn',
    'mo',
    'com.mo',
    'net.mo',
    'org.mo',
    'edu.mo',
    'gov.mo',
    'mobi',
    'mp',
    'mq',
    'mr',
    'gov.mr',
    'ms',
    'com.ms',
    'edu.ms',
    'gov.ms',
    'net.ms',
    'org.ms',
    'mt',
    'com.mt',
    'edu.mt',
    'net.mt',
    'org.mt',
    'mu',
    'com.mu',
    'net.mu',
    'org.mu',
    'gov.mu',
    'ac.mu',
    'co.mu',
    'or.mu',
    'museum',
    'academy.museum',
    'agriculture.museum',
    'air.museum',
    'airguard.museum',
    'alabama.museum',
    'alaska.museum',
    'amber.museum',
    'ambulance.museum',
    'american.museum',
    'americana.museum',
    'americanantiques.museum',
    'americanart.museum',
    'amsterdam.museum',
    'and.museum',
    'annefrank.museum',
    'anthro.museum',
    'anthropology.museum',
    'antiques.museum',
    'aquarium.museum',
    'arboretum.museum',
    'archaeological.museum',
    'archaeology.museum',
    'architecture.museum',
    'art.museum',
    'artanddesign.museum',
    'artcenter.museum',
    'artdeco.museum',
    'arteducation.museum',
    'artgallery.museum',
    'arts.museum',
    'artsandcrafts.museum',
    'asmatart.museum',
    'assassination.museum',
    'assisi.museum',
    'association.museum',
    'astronomy.museum',
    'atlanta.museum',
    'austin.museum',
    'australia.museum',
    'automotive.museum',
    'aviation.museum',
    'axis.museum',
    'badajoz.museum',
    'baghdad.museum',
    'bahn.museum',
    'bale.museum',
    'baltimore.museum',
    'barcelona.museum',
    'baseball.museum',
    'basel.museum',
    'baths.museum',
    'bauern.museum',
    'beauxarts.museum',
    'beeldengeluid.museum',
    'bellevue.museum',
    'bergbau.museum',
    'berkeley.museum',
    'berlin.museum',
    'bern.museum',
    'bible.museum',
    'bilbao.museum',
    'bill.museum',
    'birdart.museum',
    'birthplace.museum',
    'bonn.museum',
    'boston.museum',
    'botanical.museum',
    'botanicalgarden.museum',
    'botanicgarden.museum',
    'botany.museum',
    'brandywinevalley.museum',
    'brasil.museum',
    'bristol.museum',
    'british.museum',
    'britishcolumbia.museum',
    'broadcast.museum',
    'brunel.museum',
    'brussel.museum',
    'brussels.museum',
    'bruxelles.museum',
    'building.museum',
    'burghof.museum',
    'bus.museum',
    'bushey.museum',
    'cadaques.museum',
    'california.museum',
    'cambridge.museum',
    'can.museum',
    'canada.museum',
    'capebreton.museum',
    'carrier.museum',
    'cartoonart.museum',
    'casadelamoneda.museum',
    'castle.museum',
    'castres.museum',
    'celtic.museum',
    'center.museum',
    'chattanooga.museum',
    'cheltenham.museum',
    'chesapeakebay.museum',
    'chicago.museum',
    'children.museum',
    'childrens.museum',
    'childrensgarden.museum',
    'chiropractic.museum',
    'chocolate.museum',
    'christiansburg.museum',
    'cincinnati.museum',
    'cinema.museum',
    'circus.museum',
    'civilisation.museum',
    'civilization.museum',
    'civilwar.museum',
    'clinton.museum',
    'clock.museum',
    'coal.museum',
    'coastaldefence.museum',
    'cody.museum',
    'coldwar.museum',
    'collection.museum',
    'colonialwilliamsburg.museum',
    'coloradoplateau.museum',
    'columbia.museum',
    'columbus.museum',
    'communication.museum',
    'communications.museum',
    'community.museum',
    'computer.museum',
    'computerhistory.museum',
    'comunicações.museum',
    'contemporary.museum',
    'contemporaryart.museum',
    'convent.museum',
    'copenhagen.museum',
    'corporation.museum',
    'correios-e-telecomunicações.museum',
    'corvette.museum',
    'costume.museum',
    'countryestate.museum',
    'county.museum',
    'crafts.museum',
    'cranbrook.museum',
    'creation.museum',
    'cultural.museum',
    'culturalcenter.museum',
    'culture.museum',
    'cyber.museum',
    'cymru.museum',
    'dali.museum',
    'dallas.museum',
    'database.museum',
    'ddr.museum',
    'decorativearts.museum',
    'delaware.museum',
    'delmenhorst.museum',
    'denmark.museum',
    'depot.museum',
    'design.museum',
    'detroit.museum',
    'dinosaur.museum',
    'discovery.museum',
    'dolls.museum',
    'donostia.museum',
    'durham.museum',
    'eastafrica.museum',
    'eastcoast.museum',
    'education.museum',
    'educational.museum',
    'egyptian.museum',
    'eisenbahn.museum',
    'elburg.museum',
    'elvendrell.museum',
    'embroidery.museum',
    'encyclopedic.museum',
    'england.museum',
    'entomology.museum',
    'environment.museum',
    'environmentalconservation.museum',
    'epilepsy.museum',
    'essex.museum',
    'estate.museum',
    'ethnology.museum',
    'exeter.museum',
    'exhibition.museum',
    'family.museum',
    'farm.museum',
    'farmequipment.museum',
    'farmers.museum',
    'farmstead.museum',
    'field.museum',
    'figueres.museum',
    'filatelia.museum',
    'film.museum',
    'fineart.museum',
    'finearts.museum',
    'finland.museum',
    'flanders.museum',
    'florida.museum',
    'force.museum',
    'fortmissoula.museum',
    'fortworth.museum',
    'foundation.museum',
    'francaise.museum',
    'frankfurt.museum',
    'franziskaner.museum',
    'freemasonry.museum',
    'freiburg.museum',
    'fribourg.museum',
    'frog.museum',
    'fundacio.museum',
    'furniture.museum',
    'gallery.museum',
    'garden.museum',
    'gateway.museum',
    'geelvinck.museum',
    'gemological.museum',
    'geology.museum',
    'georgia.museum',
    'giessen.museum',
    'glas.museum',
    'glass.museum',
    'gorge.museum',
    'grandrapids.museum',
    'graz.museum',
    'guernsey.museum',
    'halloffame.museum',
    'hamburg.museum',
    'handson.museum',
    'harvestcelebration.museum',
    'hawaii.museum',
    'health.museum',
    'heimatunduhren.museum',
    'hellas.museum',
    'helsinki.museum',
    'hembygdsforbund.museum',
    'heritage.museum',
    'histoire.museum',
    'historical.museum',
    'historicalsociety.museum',
    'historichouses.museum',
    'historisch.museum',
    'historisches.museum',
    'history.museum',
    'historyofscience.museum',
    'horology.museum',
    'house.museum',
    'humanities.museum',
    'illustration.museum',
    'imageandsound.museum',
    'indian.museum',
    'indiana.museum',
    'indianapolis.museum',
    'indianmarket.museum',
    'intelligence.museum',
    'interactive.museum',
    'iraq.museum',
    'iron.museum',
    'isleofman.museum',
    'jamison.museum',
    'jefferson.museum',
    'jerusalem.museum',
    'jewelry.museum',
    'jewish.museum',
    'jewishart.museum',
    'jfk.museum',
    'journalism.museum',
    'judaica.museum',
    'judygarland.museum',
    'juedisches.museum',
    'juif.museum',
    'karate.museum',
    'karikatur.museum',
    'kids.museum',
    'koebenhavn.museum',
    'koeln.museum',
    'kunst.museum',
    'kunstsammlung.museum',
    'kunstunddesign.museum',
    'labor.museum',
    'labour.museum',
    'lajolla.museum',
    'lancashire.museum',
    'landes.museum',
    'lans.museum',
    'läns.museum',
    'larsson.museum',
    'lewismiller.museum',
    'lincoln.museum',
    'linz.museum',
    'living.museum',
    'livinghistory.museum',
    'localhistory.museum',
    'london.museum',
    'losangeles.museum',
    'louvre.museum',
    'loyalist.museum',
    'lucerne.museum',
    'luxembourg.museum',
    'luzern.museum',
    'mad.museum',
    'madrid.museum',
    'mallorca.museum',
    'manchester.museum',
    'mansion.museum',
    'mansions.museum',
    'manx.museum',
    'marburg.museum',
    'maritime.museum',
    'maritimo.museum',
    'maryland.museum',
    'marylhurst.museum',
    'media.museum',
    'medical.museum',
    'medizinhistorisches.museum',
    'meeres.museum',
    'memorial.museum',
    'mesaverde.museum',
    'michigan.museum',
    'midatlantic.museum',
    'military.museum',
    'mill.museum',
    'miners.museum',
    'mining.museum',
    'minnesota.museum',
    'missile.museum',
    'missoula.museum',
    'modern.museum',
    'moma.museum',
    'money.museum',
    'monmouth.museum',
    'monticello.museum',
    'montreal.museum',
    'moscow.museum',
    'motorcycle.museum',
    'muenchen.museum',
    'muenster.museum',
    'mulhouse.museum',
    'muncie.museum',
    'museet.museum',
    'museumcenter.museum',
    'museumvereniging.museum',
    'music.museum',
    'national.museum',
    'nationalfirearms.museum',
    'nationalheritage.museum',
    'nativeamerican.museum',
    'naturalhistory.museum',
    'naturalhistorymuseum.museum',
    'naturalsciences.museum',
    'nature.museum',
    'naturhistorisches.museum',
    'natuurwetenschappen.museum',
    'naumburg.museum',
    'naval.museum',
    'nebraska.museum',
    'neues.museum',
    'newhampshire.museum',
    'newjersey.museum',
    'newmexico.museum',
    'newport.museum',
    'newspaper.museum',
    'newyork.museum',
    'niepce.museum',
    'norfolk.museum',
    'north.museum',
    'nrw.museum',
    'nuernberg.museum',
    'nuremberg.museum',
    'nyc.museum',
    'nyny.museum',
    'oceanographic.museum',
    'oceanographique.museum',
    'omaha.museum',
    'online.museum',
    'ontario.museum',
    'openair.museum',
    'oregon.museum',
    'oregontrail.museum',
    'otago.museum',
    'oxford.museum',
    'pacific.museum',
    'paderborn.museum',
    'palace.museum',
    'paleo.museum',
    'palmsprings.museum',
    'panama.museum',
    'paris.museum',
    'pasadena.museum',
    'pharmacy.museum',
    'philadelphia.museum',
    'philadelphiaarea.museum',
    'philately.museum',
    'phoenix.museum',
    'photography.museum',
    'pilots.museum',
    'pittsburgh.museum',
    'planetarium.museum',
    'plantation.museum',
    'plants.museum',
    'plaza.museum',
    'portal.museum',
    'portland.museum',
    'portlligat.museum',
    'posts-and-telecommunications.museum',
    'preservation.museum',
    'presidio.museum',
    'press.museum',
    'project.museum',
    'public.museum',
    'pubol.museum',
    'quebec.museum',
    'railroad.museum',
    'railway.museum',
    'research.museum',
    'resistance.museum',
    'riodejaneiro.museum',
    'rochester.museum',
    'rockart.museum',
    'roma.museum',
    'russia.museum',
    'saintlouis.museum',
    'salem.museum',
    'salvadordali.museum',
    'salzburg.museum',
    'sandiego.museum',
    'sanfrancisco.museum',
    'santabarbara.museum',
    'santacruz.museum',
    'santafe.museum',
    'saskatchewan.museum',
    'satx.museum',
    'savannahga.museum',
    'schlesisches.museum',
    'schoenbrunn.museum',
    'schokoladen.museum',
    'school.museum',
    'schweiz.museum',
    'science.museum',
    'scienceandhistory.museum',
    'scienceandindustry.museum',
    'sciencecenter.museum',
    'sciencecenters.museum',
    'science-fiction.museum',
    'sciencehistory.museum',
    'sciences.museum',
    'sciencesnaturelles.museum',
    'scotland.museum',
    'seaport.museum',
    'settlement.museum',
    'settlers.museum',
    'shell.museum',
    'sherbrooke.museum',
    'sibenik.museum',
    'silk.museum',
    'ski.museum',
    'skole.museum',
    'society.museum',
    'sologne.museum',
    'soundandvision.museum',
    'southcarolina.museum',
    'southwest.museum',
    'space.museum',
    'spy.museum',
    'square.museum',
    'stadt.museum',
    'stalbans.museum',
    'starnberg.museum',
    'state.museum',
    'stateofdelaware.museum',
    'station.museum',
    'steam.museum',
    'steiermark.museum',
    'stjohn.museum',
    'stockholm.museum',
    'stpetersburg.museum',
    'stuttgart.museum',
    'suisse.museum',
    'surgeonshall.museum',
    'surrey.museum',
    'svizzera.museum',
    'sweden.museum',
    'sydney.museum',
    'tank.museum',
    'tcm.museum',
    'technology.museum',
    'telekommunikation.museum',
    'television.museum',
    'texas.museum',
    'textile.museum',
    'theater.museum',
    'time.museum',
    'timekeeping.museum',
    'topology.museum',
    'torino.museum',
    'touch.museum',
    'town.museum',
    'transport.museum',
    'tree.museum',
    'trolley.museum',
    'trust.museum',
    'trustee.museum',
    'uhren.museum',
    'ulm.museum',
    'undersea.museum',
    'university.museum',
    'usa.museum',
    'usantiques.museum',
    'usarts.museum',
    'uscountryestate.museum',
    'usculture.museum',
    'usdecorativearts.museum',
    'usgarden.museum',
    'ushistory.museum',
    'ushuaia.museum',
    'uslivinghistory.museum',
    'utah.museum',
    'uvic.museum',
    'valley.museum',
    'vantaa.museum',
    'versailles.museum',
    'viking.museum',
    'village.museum',
    'virginia.museum',
    'virtual.museum',
    'virtuel.museum',
    'vlaanderen.museum',
    'volkenkunde.museum',
    'wales.museum',
    'wallonie.museum',
    'war.museum',
    'washingtondc.museum',
    'watchandclock.museum',
    'watch-and-clock.museum',
    'western.museum',
    'westfalen.museum',
    'whaling.museum',
    'wildlife.museum',
    'williamsburg.museum',
    'windmill.museum',
    'workshop.museum',
    'york.museum',
    'yorkshire.museum',
    'yosemite.museum',
    'youth.museum',
    'zoological.museum',
    'zoology.museum',
    'ירושלים.museum',
    'иком.museum',
    'mv',
    'aero.mv',
    'biz.mv',
    'com.mv',
    'coop.mv',
    'edu.mv',
    'gov.mv',
    'info.mv',
    'int.mv',
    'mil.mv',
    'museum.mv',
    'name.mv',
    'net.mv',
    'org.mv',
    'pro.mv',
    'mw',
    'ac.mw',
    'biz.mw',
    'co.mw',
    'com.mw',
    'coop.mw',
    'edu.mw',
    'gov.mw',
    'int.mw',
    'museum.mw',
    'net.mw',
    'org.mw',
    'mx',
    'com.mx',
    'org.mx',
    'gob.mx',
    'edu.mx',
    'net.mx',
    'my',
    'com.my',
    'net.my',
    'org.my',
    'gov.my',
    'edu.my',
    'mil.my',
    'name.my',
    'mz',
    'ac.mz',
    'adv.mz',
    'co.mz',
    'edu.mz',
    'gov.mz',
    'mil.mz',
    'net.mz',
    'org.mz',
    'na',
    'info.na',
    'pro.na',
    'name.na',
    'school.na',
    'or.na',
    'dr.na',
    'us.na',
    'mx.na',
    'ca.na',
    'in.na',
    'cc.na',
    'tv.na',
    'ws.na',
    'mobi.na',
    'co.na',
    'com.na',
    'org.na',
    'name',
    'nc',
    'asso.nc',
    'nom.nc',
    'ne',
    'net',
    'nf',
    'com.nf',
    'net.nf',
    'per.nf',
    'rec.nf',
    'web.nf',
    'arts.nf',
    'firm.nf',
    'info.nf',
    'other.nf',
    'store.nf',
    'ng',
    'com.ng',
    'edu.ng',
    'gov.ng',
    'i.ng',
    'mil.ng',
    'mobi.ng',
    'name.ng',
    'net.ng',
    'org.ng',
    'sch.ng',
    'ni',
    'ac.ni',
    'biz.ni',
    'co.ni',
    'com.ni',
    'edu.ni',
    'gob.ni',
    'in.ni',
    'info.ni',
    'int.ni',
    'mil.ni',
    'net.ni',
    'nom.ni',
    'org.ni',
    'web.ni',
    'nl',
    'bv.nl',
    'no',
    'fhs.no',
    'vgs.no',
    'fylkesbibl.no',
    'folkebibl.no',
    'museum.no',
    'idrett.no',
    'priv.no',
    'mil.no',
    'stat.no',
    'dep.no',
    'kommune.no',
    'herad.no',
    'aa.no',
    'ah.no',
    'bu.no',
    'fm.no',
    'hl.no',
    'hm.no',
    'jan-mayen.no',
    'mr.no',
    'nl.no',
    'nt.no',
    'of.no',
    'ol.no',
    'oslo.no',
    'rl.no',
    'sf.no',
    'st.no',
    'svalbard.no',
    'tm.no',
    'tr.no',
    'va.no',
    'vf.no',
    'gs.aa.no',
    'gs.ah.no',
    'gs.bu.no',
    'gs.fm.no',
    'gs.hl.no',
    'gs.hm.no',
    'gs.jan-mayen.no',
    'gs.mr.no',
    'gs.nl.no',
    'gs.nt.no',
    'gs.of.no',
    'gs.ol.no',
    'gs.oslo.no',
    'gs.rl.no',
    'gs.sf.no',
    'gs.st.no',
    'gs.svalbard.no',
    'gs.tm.no',
    'gs.tr.no',
    'gs.va.no',
    'gs.vf.no',
    'akrehamn.no',
    'åkrehamn.no',
    'algard.no',
    'ålgård.no',
    'arna.no',
    'brumunddal.no',
    'bryne.no',
    'bronnoysund.no',
    'brønnøysund.no',
    'drobak.no',
    'drøbak.no',
    'egersund.no',
    'fetsund.no',
    'floro.no',
    'florø.no',
    'fredrikstad.no',
    'hokksund.no',
    'honefoss.no',
    'hønefoss.no',
    'jessheim.no',
    'jorpeland.no',
    'jørpeland.no',
    'kirkenes.no',
    'kopervik.no',
    'krokstadelva.no',
    'langevag.no',
    'langevåg.no',
    'leirvik.no',
    'mjondalen.no',
    'mjøndalen.no',
    'mo-i-rana.no',
    'mosjoen.no',
    'mosjøen.no',
    'nesoddtangen.no',
    'orkanger.no',
    'osoyro.no',
    'osøyro.no',
    'raholt.no',
    'råholt.no',
    'sandnessjoen.no',
    'sandnessjøen.no',
    'skedsmokorset.no',
    'slattum.no',
    'spjelkavik.no',
    'stathelle.no',
    'stavern.no',
    'stjordalshalsen.no',
    'stjørdalshalsen.no',
    'tananger.no',
    'tranby.no',
    'vossevangen.no',
    'afjord.no',
    'åfjord.no',
    'agdenes.no',
    'al.no',
    'ål.no',
    'alesund.no',
    'ålesund.no',
    'alstahaug.no',
    'alta.no',
    'áltá.no',
    'alaheadju.no',
    'álaheadju.no',
    'alvdal.no',
    'amli.no',
    'åmli.no',
    'amot.no',
    'åmot.no',
    'andebu.no',
    'andoy.no',
    'andøy.no',
    'andasuolo.no',
    'ardal.no',
    'årdal.no',
    'aremark.no',
    'arendal.no',
    'ås.no',
    'aseral.no',
    'åseral.no',
    'asker.no',
    'askim.no',
    'askvoll.no',
    'askoy.no',
    'askøy.no',
    'asnes.no',
    'åsnes.no',
    'audnedaln.no',
    'aukra.no',
    'aure.no',
    'aurland.no',
    'aurskog-holand.no',
    'aurskog-høland.no',
    'austevoll.no',
    'austrheim.no',
    'averoy.no',
    'averøy.no',
    'balestrand.no',
    'ballangen.no',
    'balat.no',
    'bálát.no',
    'balsfjord.no',
    'bahccavuotna.no',
    'báhccavuotna.no',
    'bamble.no',
    'bardu.no',
    'beardu.no',
    'beiarn.no',
    'bajddar.no',
    'bájddar.no',
    'baidar.no',
    'báidár.no',
    'berg.no',
    'bergen.no',
    'berlevag.no',
    'berlevåg.no',
    'bearalvahki.no',
    'bearalváhki.no',
    'bindal.no',
    'birkenes.no',
    'bjarkoy.no',
    'bjarkøy.no',
    'bjerkreim.no',
    'bjugn.no',
    'bodo.no',
    'bodø.no',
    'badaddja.no',
    'bådåddjå.no',
    'budejju.no',
    'bokn.no',
    'bremanger.no',
    'bronnoy.no',
    'brønnøy.no',
    'bygland.no',
    'bykle.no',
    'barum.no',
    'bærum.no',
    'bo.telemark.no',
    'bø.telemark.no',
    'bo.nordland.no',
    'bø.nordland.no',
    'bievat.no',
    'bievát.no',
    'bomlo.no',
    'bømlo.no',
    'batsfjord.no',
    'båtsfjord.no',
    'bahcavuotna.no',
    'báhcavuotna.no',
    'dovre.no',
    'drammen.no',
    'drangedal.no',
    'dyroy.no',
    'dyrøy.no',
    'donna.no',
    'dønna.no',
    'eid.no',
    'eidfjord.no',
    'eidsberg.no',
    'eidskog.no',
    'eidsvoll.no',
    'eigersund.no',
    'elverum.no',
    'enebakk.no',
    'engerdal.no',
    'etne.no',
    'etnedal.no',
    'evenes.no',
    'evenassi.no',
    'evenášši.no',
    'evje-og-hornnes.no',
    'farsund.no',
    'fauske.no',
    'fuossko.no',
    'fuoisku.no',
    'fedje.no',
    'fet.no',
    'finnoy.no',
    'finnøy.no',
    'fitjar.no',
    'fjaler.no',
    'fjell.no',
    'flakstad.no',
    'flatanger.no',
    'flekkefjord.no',
    'flesberg.no',
    'flora.no',
    'fla.no',
    'flå.no',
    'folldal.no',
    'forsand.no',
    'fosnes.no',
    'frei.no',
    'frogn.no',
    'froland.no',
    'frosta.no',
    'frana.no',
    'fræna.no',
    'froya.no',
    'frøya.no',
    'fusa.no',
    'fyresdal.no',
    'forde.no',
    'førde.no',
    'gamvik.no',
    'gangaviika.no',
    'gáŋgaviika.no',
    'gaular.no',
    'gausdal.no',
    'gildeskal.no',
    'gildeskål.no',
    'giske.no',
    'gjemnes.no',
    'gjerdrum.no',
    'gjerstad.no',
    'gjesdal.no',
    'gjovik.no',
    'gjøvik.no',
    'gloppen.no',
    'gol.no',
    'gran.no',
    'grane.no',
    'granvin.no',
    'gratangen.no',
    'grimstad.no',
    'grong.no',
    'kraanghke.no',
    'kråanghke.no',
    'grue.no',
    'gulen.no',
    'hadsel.no',
    'halden.no',
    'halsa.no',
    'hamar.no',
    'hamaroy.no',
    'habmer.no',
    'hábmer.no',
    'hapmir.no',
    'hápmir.no',
    'hammerfest.no',
    'hammarfeasta.no',
    'hámmárfeasta.no',
    'haram.no',
    'hareid.no',
    'harstad.no',
    'hasvik.no',
    'aknoluokta.no',
    'ákŋoluokta.no',
    'hattfjelldal.no',
    'aarborte.no',
    'haugesund.no',
    'hemne.no',
    'hemnes.no',
    'hemsedal.no',
    'heroy.more-og-romsdal.no',
    'herøy.møre-og-romsdal.no',
    'heroy.nordland.no',
    'herøy.nordland.no',
    'hitra.no',
    'hjartdal.no',
    'hjelmeland.no',
    'hobol.no',
    'hobøl.no',
    'hof.no',
    'hol.no',
    'hole.no',
    'holmestrand.no',
    'holtalen.no',
    'holtålen.no',
    'hornindal.no',
    'horten.no',
    'hurdal.no',
    'hurum.no',
    'hvaler.no',
    'hyllestad.no',
    'hagebostad.no',
    'hægebostad.no',
    'hoyanger.no',
    'høyanger.no',
    'hoylandet.no',
    'høylandet.no',
    'ha.no',
    'hå.no',
    'ibestad.no',
    'inderoy.no',
    'inderøy.no',
    'iveland.no',
    'jevnaker.no',
    'jondal.no',
    'jolster.no',
    'jølster.no',
    'karasjok.no',
    'karasjohka.no',
    'kárášjohka.no',
    'karlsoy.no',
    'galsa.no',
    'gálsá.no',
    'karmoy.no',
    'karmøy.no',
    'kautokeino.no',
    'guovdageaidnu.no',
    'klepp.no',
    'klabu.no',
    'klæbu.no',
    'kongsberg.no',
    'kongsvinger.no',
    'kragero.no',
    'kragerø.no',
    'kristiansand.no',
    'kristiansund.no',
    'krodsherad.no',
    'krødsherad.no',
    'kvalsund.no',
    'rahkkeravju.no',
    'ráhkkerávju.no',
    'kvam.no',
    'kvinesdal.no',
    'kvinnherad.no',
    'kviteseid.no',
    'kvitsoy.no',
    'kvitsøy.no',
    'kvafjord.no',
    'kvæfjord.no',
    'giehtavuoatna.no',
    'kvanangen.no',
    'kvænangen.no',
    'navuotna.no',
    'návuotna.no',
    'kafjord.no',
    'kåfjord.no',
    'gaivuotna.no',
    'gáivuotna.no',
    'larvik.no',
    'lavangen.no',
    'lavagis.no',
    'loabat.no',
    'loabát.no',
    'lebesby.no',
    'davvesiida.no',
    'leikanger.no',
    'leirfjord.no',
    'leka.no',
    'leksvik.no',
    'lenvik.no',
    'leangaviika.no',
    'leaŋgaviika.no',
    'lesja.no',
    'levanger.no',
    'lier.no',
    'lierne.no',
    'lillehammer.no',
    'lillesand.no',
    'lindesnes.no',
    'lindas.no',
    'lindås.no',
    'lom.no',
    'loppa.no',
    'lahppi.no',
    'láhppi.no',
    'lund.no',
    'lunner.no',
    'luroy.no',
    'lurøy.no',
    'luster.no',
    'lyngdal.no',
    'lyngen.no',
    'ivgu.no',
    'lardal.no',
    'lerdal.no',
    'lærdal.no',
    'lodingen.no',
    'lødingen.no',
    'lorenskog.no',
    'lørenskog.no',
    'loten.no',
    'løten.no',
    'malvik.no',
    'masoy.no',
    'måsøy.no',
    'muosat.no',
    'muosát.no',
    'mandal.no',
    'marker.no',
    'marnardal.no',
    'masfjorden.no',
    'meland.no',
    'meldal.no',
    'melhus.no',
    'meloy.no',
    'meløy.no',
    'meraker.no',
    'meråker.no',
    'moareke.no',
    'moåreke.no',
    'midsund.no',
    'midtre-gauldal.no',
    'modalen.no',
    'modum.no',
    'molde.no',
    'moskenes.no',
    'moss.no',
    'mosvik.no',
    'malselv.no',
    'målselv.no',
    'malatvuopmi.no',
    'málatvuopmi.no',
    'namdalseid.no',
    'aejrie.no',
    'namsos.no',
    'namsskogan.no',
    'naamesjevuemie.no',
    'nååmesjevuemie.no',
    'laakesvuemie.no',
    'nannestad.no',
    'narvik.no',
    'narviika.no',
    'naustdal.no',
    'nedre-eiker.no',
    'nes.akershus.no',
    'nes.buskerud.no',
    'nesna.no',
    'nesodden.no',
    'nesseby.no',
    'unjarga.no',
    'unjárga.no',
    'nesset.no',
    'nissedal.no',
    'nittedal.no',
    'nord-aurdal.no',
    'nord-fron.no',
    'nord-odal.no',
    'norddal.no',
    'nordkapp.no',
    'davvenjarga.no',
    'davvenjárga.no',
    'nordre-land.no',
    'nordreisa.no',
    'raisa.no',
    'ráisa.no',
    'nore-og-uvdal.no',
    'notodden.no',
    'naroy.no',
    'nærøy.no',
    'notteroy.no',
    'nøtterøy.no',
    'odda.no',
    'oksnes.no',
    'øksnes.no',
    'oppdal.no',
    'oppegard.no',
    'oppegård.no',
    'orkdal.no',
    'orland.no',
    'ørland.no',
    'orskog.no',
    'ørskog.no',
    'orsta.no',
    'ørsta.no',
    'os.hedmark.no',
    'os.hordaland.no',
    'osen.no',
    'osteroy.no',
    'osterøy.no',
    'ostre-toten.no',
    'østre-toten.no',
    'overhalla.no',
    'ovre-eiker.no',
    'øvre-eiker.no',
    'oyer.no',
    'øyer.no',
    'oygarden.no',
    'øygarden.no',
    'oystre-slidre.no',
    'øystre-slidre.no',
    'porsanger.no',
    'porsangu.no',
    'porsáŋgu.no',
    'porsgrunn.no',
    'radoy.no',
    'radøy.no',
    'rakkestad.no',
    'rana.no',
    'ruovat.no',
    'randaberg.no',
    'rauma.no',
    'rendalen.no',
    'rennebu.no',
    'rennesoy.no',
    'rennesøy.no',
    'rindal.no',
    'ringebu.no',
    'ringerike.no',
    'ringsaker.no',
    'rissa.no',
    'risor.no',
    'risør.no',
    'roan.no',
    'rollag.no',
    'rygge.no',
    'ralingen.no',
    'rælingen.no',
    'rodoy.no',
    'rødøy.no',
    'romskog.no',
    'rømskog.no',
    'roros.no',
    'røros.no',
    'rost.no',
    'røst.no',
    'royken.no',
    'røyken.no',
    'royrvik.no',
    'røyrvik.no',
    'rade.no',
    'råde.no',
    'salangen.no',
    'siellak.no',
    'saltdal.no',
    'salat.no',
    'sálát.no',
    'sálat.no',
    'samnanger.no',
    'sande.more-og-romsdal.no',
    'sande.møre-og-romsdal.no',
    'sande.vestfold.no',
    'sandefjord.no',
    'sandnes.no',
    'sandoy.no',
    'sandøy.no',
    'sarpsborg.no',
    'sauda.no',
    'sauherad.no',
    'sel.no',
    'selbu.no',
    'selje.no',
    'seljord.no',
    'sigdal.no',
    'siljan.no',
    'sirdal.no',
    'skaun.no',
    'skedsmo.no',
    'ski.no',
    'skien.no',
    'skiptvet.no',
    'skjervoy.no',
    'skjervøy.no',
    'skierva.no',
    'skiervá.no',
    'skjak.no',
    'skjåk.no',
    'skodje.no',
    'skanland.no',
    'skånland.no',
    'skanit.no',
    'skánit.no',
    'smola.no',
    'smøla.no',
    'snillfjord.no',
    'snasa.no',
    'snåsa.no',
    'snoasa.no',
    'snaase.no',
    'snåase.no',
    'sogndal.no',
    'sokndal.no',
    'sola.no',
    'solund.no',
    'songdalen.no',
    'sortland.no',
    'spydeberg.no',
    'stange.no',
    'stavanger.no',
    'steigen.no',
    'steinkjer.no',
    'stjordal.no',
    'stjørdal.no',
    'stokke.no',
    'stor-elvdal.no',
    'stord.no',
    'stordal.no',
    'storfjord.no',
    'omasvuotna.no',
    'strand.no',
    'stranda.no',
    'stryn.no',
    'sula.no',
    'suldal.no',
    'sund.no',
    'sunndal.no',
    'surnadal.no',
    'sveio.no',
    'svelvik.no',
    'sykkylven.no',
    'sogne.no',
    'søgne.no',
    'somna.no',
    'sømna.no',
    'sondre-land.no',
    'søndre-land.no',
    'sor-aurdal.no',
    'sør-aurdal.no',
    'sor-fron.no',
    'sør-fron.no',
    'sor-odal.no',
    'sør-odal.no',
    'sor-varanger.no',
    'sør-varanger.no',
    'matta-varjjat.no',
    'mátta-várjjat.no',
    'sorfold.no',
    'sørfold.no',
    'sorreisa.no',
    'sørreisa.no',
    'sorum.no',
    'sørum.no',
    'tana.no',
    'deatnu.no',
    'time.no',
    'tingvoll.no',
    'tinn.no',
    'tjeldsund.no',
    'dielddanuorri.no',
    'tjome.no',
    'tjøme.no',
    'tokke.no',
    'tolga.no',
    'torsken.no',
    'tranoy.no',
    'tranøy.no',
    'tromso.no',
    'tromsø.no',
    'tromsa.no',
    'romsa.no',
    'trondheim.no',
    'troandin.no',
    'trysil.no',
    'trana.no',
    'træna.no',
    'trogstad.no',
    'trøgstad.no',
    'tvedestrand.no',
    'tydal.no',
    'tynset.no',
    'tysfjord.no',
    'divtasvuodna.no',
    'divttasvuotna.no',
    'tysnes.no',
    'tysvar.no',
    'tysvær.no',
    'tonsberg.no',
    'tønsberg.no',
    'ullensaker.no',
    'ullensvang.no',
    'ulvik.no',
    'utsira.no',
    'vadso.no',
    'vadsø.no',
    'cahcesuolo.no',
    'čáhcesuolo.no',
    'vaksdal.no',
    'valle.no',
    'vang.no',
    'vanylven.no',
    'vardo.no',
    'vardø.no',
    'varggat.no',
    'várggát.no',
    'vefsn.no',
    'vaapste.no',
    'vega.no',
    'vegarshei.no',
    'vegårshei.no',
    'vennesla.no',
    'verdal.no',
    'verran.no',
    'vestby.no',
    'vestnes.no',
    'vestre-slidre.no',
    'vestre-toten.no',
    'vestvagoy.no',
    'vestvågøy.no',
    'vevelstad.no',
    'vik.no',
    'vikna.no',
    'vindafjord.no',
    'volda.no',
    'voss.no',
    'varoy.no',
    'værøy.no',
    'vagan.no',
    'vågan.no',
    'voagat.no',
    'vagsoy.no',
    'vågsøy.no',
    'vaga.no',
    'vågå.no',
    'valer.ostfold.no',
    'våler.østfold.no',
    'valer.hedmark.no',
    'våler.hedmark.no',
    '*.np',
    'nr',
    'biz.nr',
    'info.nr',
    'gov.nr',
    'edu.nr',
    'org.nr',
    'net.nr',
    'com.nr',
    'nu',
    'nz',
    'ac.nz',
    'co.nz',
    'cri.nz',
    'geek.nz',
    'gen.nz',
    'govt.nz',
    'health.nz',
    'iwi.nz',
    'kiwi.nz',
    'maori.nz',
    'mil.nz',
    'māori.nz',
    'net.nz',
    'org.nz',
    'parliament.nz',
    'school.nz',
    'om',
    'co.om',
    'com.om',
    'edu.om',
    'gov.om',
    'med.om',
    'museum.om',
    'net.om',
    'org.om',
    'pro.om',
    'onion',
    'org',
    'pa',
    'ac.pa',
    'gob.pa',
    'com.pa',
    'org.pa',
    'sld.pa',
    'edu.pa',
    'net.pa',
    'ing.pa',
    'abo.pa',
    'med.pa',
    'nom.pa',
    'pe',
    'edu.pe',
    'gob.pe',
    'nom.pe',
    'mil.pe',
    'org.pe',
    'com.pe',
    'net.pe',
    'pf',
    'com.pf',
    'org.pf',
    'edu.pf',
    '*.pg',
    'ph',
    'com.ph',
    'net.ph',
    'org.ph',
    'gov.ph',
    'edu.ph',
    'ngo.ph',
    'mil.ph',
    'i.ph',
    'pk',
    'com.pk',
    'net.pk',
    'edu.pk',
    'org.pk',
    'fam.pk',
    'biz.pk',
    'web.pk',
    'gov.pk',
    'gob.pk',
    'gok.pk',
    'gon.pk',
    'gop.pk',
    'gos.pk',
    'info.pk',
    'pl',
    'com.pl',
    'net.pl',
    'org.pl',
    'aid.pl',
    'agro.pl',
    'atm.pl',
    'auto.pl',
    'biz.pl',
    'edu.pl',
    'gmina.pl',
    'gsm.pl',
    'info.pl',
    'mail.pl',
    'miasta.pl',
    'media.pl',
    'mil.pl',
    'nieruchomosci.pl',
    'nom.pl',
    'pc.pl',
    'powiat.pl',
    'priv.pl',
    'realestate.pl',
    'rel.pl',
    'sex.pl',
    'shop.pl',
    'sklep.pl',
    'sos.pl',
    'szkola.pl',
    'targi.pl',
    'tm.pl',
    'tourism.pl',
    'travel.pl',
    'turystyka.pl',
    'gov.pl',
    'ap.gov.pl',
    'ic.gov.pl',
    'is.gov.pl',
    'us.gov.pl',
    'kmpsp.gov.pl',
    'kppsp.gov.pl',
    'kwpsp.gov.pl',
    'psp.gov.pl',
    'wskr.gov.pl',
    'kwp.gov.pl',
    'mw.gov.pl',
    'ug.gov.pl',
    'um.gov.pl',
    'umig.gov.pl',
    'ugim.gov.pl',
    'upow.gov.pl',
    'uw.gov.pl',
    'starostwo.gov.pl',
    'pa.gov.pl',
    'po.gov.pl',
    'psse.gov.pl',
    'pup.gov.pl',
    'rzgw.gov.pl',
    'sa.gov.pl',
    'so.gov.pl',
    'sr.gov.pl',
    'wsa.gov.pl',
    'sko.gov.pl',
    'uzs.gov.pl',
    'wiih.gov.pl',
    'winb.gov.pl',
    'pinb.gov.pl',
    'wios.gov.pl',
    'witd.gov.pl',
    'wzmiuw.gov.pl',
    'piw.gov.pl',
    'wiw.gov.pl',
    'griw.gov.pl',
    'wif.gov.pl',
    'oum.gov.pl',
    'sdn.gov.pl',
    'zp.gov.pl',
    'uppo.gov.pl',
    'mup.gov.pl',
    'wuoz.gov.pl',
    'konsulat.gov.pl',
    'oirm.gov.pl',
    'augustow.pl',
    'babia-gora.pl',
    'bedzin.pl',
    'beskidy.pl',
    'bialowieza.pl',
    'bialystok.pl',
    'bielawa.pl',
    'bieszczady.pl',
    'boleslawiec.pl',
    'bydgoszcz.pl',
    'bytom.pl',
    'cieszyn.pl',
    'czeladz.pl',
    'czest.pl',
    'dlugoleka.pl',
    'elblag.pl',
    'elk.pl',
    'glogow.pl',
    'gniezno.pl',
    'gorlice.pl',
    'grajewo.pl',
    'ilawa.pl',
    'jaworzno.pl',
    'jelenia-gora.pl',
    'jgora.pl',
    'kalisz.pl',
    'kazimierz-dolny.pl',
    'karpacz.pl',
    'kartuzy.pl',
    'kaszuby.pl',
    'katowice.pl',
    'kepno.pl',
    'ketrzyn.pl',
    'klodzko.pl',
    'kobierzyce.pl',
    'kolobrzeg.pl',
    'konin.pl',
    'konskowola.pl',
    'kutno.pl',
    'lapy.pl',
    'lebork.pl',
    'legnica.pl',
    'lezajsk.pl',
    'limanowa.pl',
    'lomza.pl',
    'lowicz.pl',
    'lubin.pl',
    'lukow.pl',
    'malbork.pl',
    'malopolska.pl',
    'mazowsze.pl',
    'mazury.pl',
    'mielec.pl',
    'mielno.pl',
    'mragowo.pl',
    'naklo.pl',
    'nowaruda.pl',
    'nysa.pl',
    'olawa.pl',
    'olecko.pl',
    'olkusz.pl',
    'olsztyn.pl',
    'opoczno.pl',
    'opole.pl',
    'ostroda.pl',
    'ostroleka.pl',
    'ostrowiec.pl',
    'ostrowwlkp.pl',
    'pila.pl',
    'pisz.pl',
    'podhale.pl',
    'podlasie.pl',
    'polkowice.pl',
    'pomorze.pl',
    'pomorskie.pl',
    'prochowice.pl',
    'pruszkow.pl',
    'przeworsk.pl',
    'pulawy.pl',
    'radom.pl',
    'rawa-maz.pl',
    'rybnik.pl',
    'rzeszow.pl',
    'sanok.pl',
    'sejny.pl',
    'slask.pl',
    'slupsk.pl',
    'sosnowiec.pl',
    'stalowa-wola.pl',
    'skoczow.pl',
    'starachowice.pl',
    'stargard.pl',
    'suwalki.pl',
    'swidnica.pl',
    'swiebodzin.pl',
    'swinoujscie.pl',
    'szczecin.pl',
    'szczytno.pl',
    'tarnobrzeg.pl',
    'tgory.pl',
    'turek.pl',
    'tychy.pl',
    'ustka.pl',
    'walbrzych.pl',
    'warmia.pl',
    'warszawa.pl',
    'waw.pl',
    'wegrow.pl',
    'wielun.pl',
    'wlocl.pl',
    'wloclawek.pl',
    'wodzislaw.pl',
    'wolomin.pl',
    'wroclaw.pl',
    'zachpomor.pl',
    'zagan.pl',
    'zarow.pl',
    'zgora.pl',
    'zgorzelec.pl',
    'pm',
    'pn',
    'gov.pn',
    'co.pn',
    'org.pn',
    'edu.pn',
    'net.pn',
    'post',
    'pr',
    'com.pr',
    'net.pr',
    'org.pr',
    'gov.pr',
    'edu.pr',
    'isla.pr',
    'pro.pr',
    'biz.pr',
    'info.pr',
    'name.pr',
    'est.pr',
    'prof.pr',
    'ac.pr',
    'pro',
    'aaa.pro',
    'aca.pro',
    'acct.pro',
    'avocat.pro',
    'bar.pro',
    'cpa.pro',
    'eng.pro',
    'jur.pro',
    'law.pro',
    'med.pro',
    'recht.pro',
    'ps',
    'edu.ps',
    'gov.ps',
    'sec.ps',
    'plo.ps',
    'com.ps',
    'org.ps',
    'net.ps',
    'pt',
    'net.pt',
    'gov.pt',
    'org.pt',
    'edu.pt',
    'int.pt',
    'publ.pt',
    'com.pt',
    'nome.pt',
    'pw',
    'co.pw',
    'ne.pw',
    'or.pw',
    'ed.pw',
    'go.pw',
    'belau.pw',
    'py',
    'com.py',
    'coop.py',
    'edu.py',
    'gov.py',
    'mil.py',
    'net.py',
    'org.py',
    'qa',
    'com.qa',
    'edu.qa',
    'gov.qa',
    'mil.qa',
    'name.qa',
    'net.qa',
    'org.qa',
    'sch.qa',
    're',
    'asso.re',
    'com.re',
    'nom.re',
    'ro',
    'arts.ro',
    'com.ro',
    'firm.ro',
    'info.ro',
    'nom.ro',
    'nt.ro',
    'org.ro',
    'rec.ro',
    'store.ro',
    'tm.ro',
    'www.ro',
    'rs',
    'ac.rs',
    'co.rs',
    'edu.rs',
    'gov.rs',
    'in.rs',
    'org.rs',
    'ru',
    'ac.ru',
    'edu.ru',
    'gov.ru',
    'int.ru',
    'mil.ru',
    'test.ru',
    'rw',
    'gov.rw',
    'net.rw',
    'edu.rw',
    'ac.rw',
    'com.rw',
    'co.rw',
    'int.rw',
    'mil.rw',
    'gouv.rw',
    'sa',
    'com.sa',
    'net.sa',
    'org.sa',
    'gov.sa',
    'med.sa',
    'pub.sa',
    'edu.sa',
    'sch.sa',
    'sb',
    'com.sb',
    'edu.sb',
    'gov.sb',
    'net.sb',
    'org.sb',
    'sc',
    'com.sc',
    'gov.sc',
    'net.sc',
    'org.sc',
    'edu.sc',
    'sd',
    'com.sd',
    'net.sd',
    'org.sd',
    'edu.sd',
    'med.sd',
    'tv.sd',
    'gov.sd',
    'info.sd',
    'se',
    'a.se',
    'ac.se',
    'b.se',
    'bd.se',
    'brand.se',
    'c.se',
    'd.se',
    'e.se',
    'f.se',
    'fh.se',
    'fhsk.se',
    'fhv.se',
    'g.se',
    'h.se',
    'i.se',
    'k.se',
    'komforb.se',
    'kommunalforbund.se',
    'komvux.se',
    'l.se',
    'lanbib.se',
    'm.se',
    'n.se',
    'naturbruksgymn.se',
    'o.se',
    'org.se',
    'p.se',
    'parti.se',
    'pp.se',
    'press.se',
    'r.se',
    's.se',
    't.se',
    'tm.se',
    'u.se',
    'w.se',
    'x.se',
    'y.se',
    'z.se',
    'sg',
    'com.sg',
    'net.sg',
    'org.sg',
    'gov.sg',
    'edu.sg',
    'per.sg',
    'sh',
    'com.sh',
    'net.sh',
    'gov.sh',
    'org.sh',
    'mil.sh',
    'si',
    'sj',
    'sk',
    'sl',
    'com.sl',
    'net.sl',
    'edu.sl',
    'gov.sl',
    'org.sl',
    'sm',
    'sn',
    'art.sn',
    'com.sn',
    'edu.sn',
    'gouv.sn',
    'org.sn',
    'perso.sn',
    'univ.sn',
    'so',
    'com.so',
    'net.so',
    'org.so',
    'sr',
    'st',
    'co.st',
    'com.st',
    'consulado.st',
    'edu.st',
    'embaixada.st',
    'gov.st',
    'mil.st',
    'net.st',
    'org.st',
    'principe.st',
    'saotome.st',
    'store.st',
    'su',
    'sv',
    'com.sv',
    'edu.sv',
    'gob.sv',
    'org.sv',
    'red.sv',
    'sx',
    'gov.sx',
    'sy',
    'edu.sy',
    'gov.sy',
    'net.sy',
    'mil.sy',
    'com.sy',
    'org.sy',
    'sz',
    'co.sz',
    'ac.sz',
    'org.sz',
    'tc',
    'td',
    'tel',
    'tf',
    'tg',
    'th',
    'ac.th',
    'co.th',
    'go.th',
    'in.th',
    'mi.th',
    'net.th',
    'or.th',
    'tj',
    'ac.tj',
    'biz.tj',
    'co.tj',
    'com.tj',
    'edu.tj',
    'go.tj',
    'gov.tj',
    'int.tj',
    'mil.tj',
    'name.tj',
    'net.tj',
    'nic.tj',
    'org.tj',
    'test.tj',
    'web.tj',
    'tk',
    'tl',
    'gov.tl',
    'tm',
    'com.tm',
    'co.tm',
    'org.tm',
    'net.tm',
    'nom.tm',
    'gov.tm',
    'mil.tm',
    'edu.tm',
    'tn',
    'com.tn',
    'ens.tn',
    'fin.tn',
    'gov.tn',
    'ind.tn',
    'intl.tn',
    'nat.tn',
    'net.tn',
    'org.tn',
    'info.tn',
    'perso.tn',
    'tourism.tn',
    'edunet.tn',
    'rnrt.tn',
    'rns.tn',
    'rnu.tn',
    'mincom.tn',
    'agrinet.tn',
    'defense.tn',
    'turen.tn',
    'to',
    'com.to',
    'gov.to',
    'net.to',
    'org.to',
    'edu.to',
    'mil.to',
    'tr',
    'com.tr',
    'info.tr',
    'biz.tr',
    'net.tr',
    'org.tr',
    'web.tr',
    'gen.tr',
    'tv.tr',
    'av.tr',
    'dr.tr',
    'bbs.tr',
    'name.tr',
    'tel.tr',
    'gov.tr',
    'bel.tr',
    'pol.tr',
    'mil.tr',
    'k12.tr',
    'edu.tr',
    'kep.tr',
    'nc.tr',
    'gov.nc.tr',
    'tt',
    'co.tt',
    'com.tt',
    'org.tt',
    'net.tt',
    'biz.tt',
    'info.tt',
    'pro.tt',
    'int.tt',
    'coop.tt',
    'jobs.tt',
    'mobi.tt',
    'travel.tt',
    'museum.tt',
    'aero.tt',
    'name.tt',
    'gov.tt',
    'edu.tt',
    'tv',
    'tw',
    'edu.tw',
    'gov.tw',
    'mil.tw',
    'com.tw',
    'net.tw',
    'org.tw',
    'idv.tw',
    'game.tw',
    'ebiz.tw',
    'club.tw',
    '網路.tw',
    '組織.tw',
    '商業.tw',
    'tz',
    'ac.tz',
    'co.tz',
    'go.tz',
    'hotel.tz',
    'info.tz',
    'me.tz',
    'mil.tz',
    'mobi.tz',
    'ne.tz',
    'or.tz',
    'sc.tz',
    'tv.tz',
    'ua',
    'com.ua',
    'edu.ua',
    'gov.ua',
    'in.ua',
    'net.ua',
    'org.ua',
    'cherkassy.ua',
    'cherkasy.ua',
    'chernigov.ua',
    'chernihiv.ua',
    'chernivtsi.ua',
    'chernovtsy.ua',
    'ck.ua',
    'cn.ua',
    'cr.ua',
    'crimea.ua',
    'cv.ua',
    'dn.ua',
    'dnepropetrovsk.ua',
    'dnipropetrovsk.ua',
    'dominic.ua',
    'donetsk.ua',
    'dp.ua',
    'if.ua',
    'ivano-frankivsk.ua',
    'kh.ua',
    'kharkiv.ua',
    'kharkov.ua',
    'kherson.ua',
    'khmelnitskiy.ua',
    'khmelnytskyi.ua',
    'kiev.ua',
    'kirovograd.ua',
    'km.ua',
    'kr.ua',
    'krym.ua',
    'ks.ua',
    'kv.ua',
    'kyiv.ua',
    'lg.ua',
    'lt.ua',
    'lugansk.ua',
    'lutsk.ua',
    'lv.ua',
    'lviv.ua',
    'mk.ua',
    'mykolaiv.ua',
    'nikolaev.ua',
    'od.ua',
    'odesa.ua',
    'odessa.ua',
    'pl.ua',
    'poltava.ua',
    'rivne.ua',
    'rovno.ua',
    'rv.ua',
    'sb.ua',
    'sebastopol.ua',
    'sevastopol.ua',
    'sm.ua',
    'sumy.ua',
    'te.ua',
    'ternopil.ua',
    'uz.ua',
    'uzhgorod.ua',
    'vinnica.ua',
    'vinnytsia.ua',
    'vn.ua',
    'volyn.ua',
    'yalta.ua',
    'zaporizhzhe.ua',
    'zaporizhzhia.ua',
    'zhitomir.ua',
    'zhytomyr.ua',
    'zp.ua',
    'zt.ua',
    'ug',
    'co.ug',
    'or.ug',
    'ac.ug',
    'sc.ug',
    'go.ug',
    'ne.ug',
    'com.ug',
    'org.ug',
    'uk',
    'ac.uk',
    'co.uk',
    'gov.uk',
    'ltd.uk',
    'me.uk',
    'net.uk',
    'nhs.uk',
    'org.uk',
    'plc.uk',
    'police.uk',
    '*.sch.uk',
    'us',
    'dni.us',
    'fed.us',
    'isa.us',
    'kids.us',
    'nsn.us',
    'ak.us',
    'al.us',
    'ar.us',
    'as.us',
    'az.us',
    'ca.us',
    'co.us',
    'ct.us',
    'dc.us',
    'de.us',
    'fl.us',
    'ga.us',
    'gu.us',
    'hi.us',
    'ia.us',
    'id.us',
    'il.us',
    'in.us',
    'ks.us',
    'ky.us',
    'la.us',
    'ma.us',
    'md.us',
    'me.us',
    'mi.us',
    'mn.us',
    'mo.us',
    'ms.us',
    'mt.us',
    'nc.us',
    'nd.us',
    'ne.us',
    'nh.us',
    'nj.us',
    'nm.us',
    'nv.us',
    'ny.us',
    'oh.us',
    'ok.us',
    'or.us',
    'pa.us',
    'pr.us',
    'ri.us',
    'sc.us',
    'sd.us',
    'tn.us',
    'tx.us',
    'ut.us',
    'vi.us',
    'vt.us',
    'va.us',
    'wa.us',
    'wi.us',
    'wv.us',
    'wy.us',
    'k12.ak.us',
    'k12.al.us',
    'k12.ar.us',
    'k12.as.us',
    'k12.az.us',
    'k12.ca.us',
    'k12.co.us',
    'k12.ct.us',
    'k12.dc.us',
    'k12.de.us',
    'k12.fl.us',
    'k12.ga.us',
    'k12.gu.us',
    'k12.ia.us',
    'k12.id.us',
    'k12.il.us',
    'k12.in.us',
    'k12.ks.us',
    'k12.ky.us',
    'k12.la.us',
    'k12.ma.us',
    'k12.md.us',
    'k12.me.us',
    'k12.mi.us',
    'k12.mn.us',
    'k12.mo.us',
    'k12.ms.us',
    'k12.mt.us',
    'k12.nc.us',
    'k12.ne.us',
    'k12.nh.us',
    'k12.nj.us',
    'k12.nm.us',
    'k12.nv.us',
    'k12.ny.us',
    'k12.oh.us',
    'k12.ok.us',
    'k12.or.us',
    'k12.pa.us',
    'k12.pr.us',
    'k12.ri.us',
    'k12.sc.us',
    'k12.tn.us',
    'k12.tx.us',
    'k12.ut.us',
    'k12.vi.us',
    'k12.vt.us',
    'k12.va.us',
    'k12.wa.us',
    'k12.wi.us',
    'k12.wy.us',
    'cc.ak.us',
    'cc.al.us',
    'cc.ar.us',
    'cc.as.us',
    'cc.az.us',
    'cc.ca.us',
    'cc.co.us',
    'cc.ct.us',
    'cc.dc.us',
    'cc.de.us',
    'cc.fl.us',
    'cc.ga.us',
    'cc.gu.us',
    'cc.hi.us',
    'cc.ia.us',
    'cc.id.us',
    'cc.il.us',
    'cc.in.us',
    'cc.ks.us',
    'cc.ky.us',
    'cc.la.us',
    'cc.ma.us',
    'cc.md.us',
    'cc.me.us',
    'cc.mi.us',
    'cc.mn.us',
    'cc.mo.us',
    'cc.ms.us',
    'cc.mt.us',
    'cc.nc.us',
    'cc.nd.us',
    'cc.ne.us',
    'cc.nh.us',
    'cc.nj.us',
    'cc.nm.us',
    'cc.nv.us',
    'cc.ny.us',
    'cc.oh.us',
    'cc.ok.us',
    'cc.or.us',
    'cc.pa.us',
    'cc.pr.us',
    'cc.ri.us',
    'cc.sc.us',
    'cc.sd.us',
    'cc.tn.us',
    'cc.tx.us',
    'cc.ut.us',
    'cc.vi.us',
    'cc.vt.us',
    'cc.va.us',
    'cc.wa.us',
    'cc.wi.us',
    'cc.wv.us',
    'cc.wy.us',
    'lib.ak.us',
    'lib.al.us',
    'lib.ar.us',
    'lib.as.us',
    'lib.az.us',
    'lib.ca.us',
    'lib.co.us',
    'lib.ct.us',
    'lib.dc.us',
    'lib.fl.us',
    'lib.ga.us',
    'lib.gu.us',
    'lib.hi.us',
    'lib.ia.us',
    'lib.id.us',
    'lib.il.us',
    'lib.in.us',
    'lib.ks.us',
    'lib.ky.us',
    'lib.la.us',
    'lib.ma.us',
    'lib.md.us',
    'lib.me.us',
    'lib.mi.us',
    'lib.mn.us',
    'lib.mo.us',
    'lib.ms.us',
    'lib.mt.us',
    'lib.nc.us',
    'lib.nd.us',
    'lib.ne.us',
    'lib.nh.us',
    'lib.nj.us',
    'lib.nm.us',
    'lib.nv.us',
    'lib.ny.us',
    'lib.oh.us',
    'lib.ok.us',
    'lib.or.us',
    'lib.pa.us',
    'lib.pr.us',
    'lib.ri.us',
    'lib.sc.us',
    'lib.sd.us',
    'lib.tn.us',
    'lib.tx.us',
    'lib.ut.us',
    'lib.vi.us',
    'lib.vt.us',
    'lib.va.us',
    'lib.wa.us',
    'lib.wi.us',
    'lib.wy.us',
    'pvt.k12.ma.us',
    'chtr.k12.ma.us',
    'paroch.k12.ma.us',
    'ann-arbor.mi.us',
    'cog.mi.us',
    'dst.mi.us',
    'eaton.mi.us',
    'gen.mi.us',
    'mus.mi.us',
    'tec.mi.us',
    'washtenaw.mi.us',
    'uy',
    'com.uy',
    'edu.uy',
    'gub.uy',
    'mil.uy',
    'net.uy',
    'org.uy',
    'uz',
    'co.uz',
    'com.uz',
    'net.uz',
    'org.uz',
    'va',
    'vc',
    'com.vc',
    'net.vc',
    'org.vc',
    'gov.vc',
    'mil.vc',
    'edu.vc',
    've',
    'arts.ve',
    'co.ve',
    'com.ve',
    'e12.ve',
    'edu.ve',
    'firm.ve',
    'gob.ve',
    'gov.ve',
    'info.ve',
    'int.ve',
    'mil.ve',
    'net.ve',
    'org.ve',
    'rec.ve',
    'store.ve',
    'tec.ve',
    'web.ve',
    'vg',
    'vi',
    'co.vi',
    'com.vi',
    'k12.vi',
    'net.vi',
    'org.vi',
    'vn',
    'com.vn',
    'net.vn',
    'org.vn',
    'edu.vn',
    'gov.vn',
    'int.vn',
    'ac.vn',
    'biz.vn',
    'info.vn',
    'name.vn',
    'pro.vn',
    'health.vn',
    'vu',
    'com.vu',
    'edu.vu',
    'net.vu',
    'org.vu',
    'wf',
    'ws',
    'com.ws',
    'net.ws',
    'org.ws',
    'gov.ws',
    'edu.ws',
    'yt',
    'امارات',
    'հայ',
    'বাংলা',
    'бг',
    'бел',
    '中国',
    '中國',
    'الجزائر',
    'مصر',
    'ею',
    'გე',
    'ελ',
    '香港',
    '公司.香港',
    '教育.香港',
    '政府.香港',
    '個人.香港',
    '網絡.香港',
    '組織.香港',
    'ಭಾರತ',
    'ଭାରତ',
    'ভাৰত',
    'भारतम्',
    'भारोत',
    'ڀارت',
    'ഭാരതം',
    'भारत',
    'بارت',
    'بھارت',
    'భారత్',
    'ભારત',
    'ਭਾਰਤ',
    'ভারত',
    'இந்தியா',
    'ایران',
    'ايران',
    'عراق',
    'الاردن',
    '한국',
    'қаз',
    'ලංකා',
    'இலங்கை',
    'المغرب',
    'мкд',
    'мон',
    '澳門',
    '澳门',
    'مليسيا',
    'عمان',
    'پاکستان',
    'پاكستان',
    'فلسطين',
    'срб',
    'пр.срб',
    'орг.срб',
    'обр.срб',
    'од.срб',
    'упр.срб',
    'ак.срб',
    'рф',
    'قطر',
    'السعودية',
    'السعودیة',
    'السعودیۃ',
    'السعوديه',
    'سودان',
    '新加坡',
    'சிங்கப்பூர்',
    'سورية',
    'سوريا',
    'ไทย',
    'ศึกษา.ไทย',
    'ธุรกิจ.ไทย',
    'รัฐบาล.ไทย',
    'ทหาร.ไทย',
    'เน็ต.ไทย',
    'องค์กร.ไทย',
    'تونس',
    '台灣',
    '台湾',
    '臺灣',
    'укр',
    'اليمن',
    'xxx',
    '*.ye',
    'ac.za',
    'agric.za',
    'alt.za',
    'co.za',
    'edu.za',
    'gov.za',
    'grondar.za',
    'law.za',
    'mil.za',
    'net.za',
    'ngo.za',
    'nis.za',
    'nom.za',
    'org.za',
    'school.za',
    'tm.za',
    'web.za',
    'zm',
    'ac.zm',
    'biz.zm',
    'co.zm',
    'com.zm',
    'edu.zm',
    'gov.zm',
    'info.zm',
    'mil.zm',
    'net.zm',
    'org.zm',
    'sch.zm',
    'zw',
    'ac.zw',
    'co.zw',
    'gov.zw',
    'mil.zw',
    'org.zw',
    'aaa',
    'aarp',
    'abarth',
    'abb',
    'abbott',
    'abbvie',
    'abc',
    'able',
    'abogado',
    'abudhabi',
    'academy',
    'accenture',
    'accountant',
    'accountants',
    'aco',
    'active',
    'actor',
    'adac',
    'ads',
    'adult',
    'aeg',
    'aetna',
    'afamilycompany',
    'afl',
    'africa',
    'agakhan',
    'agency',
    'aig',
    'aigo',
    'airbus',
    'airforce',
    'airtel',
    'akdn',
    'alfaromeo',
    'alibaba',
    'alipay',
    'allfinanz',
    'allstate',
    'ally',
    'alsace',
    'alstom',
    'americanexpress',
    'americanfamily',
    'amex',
    'amfam',
    'amica',
    'amsterdam',
    'analytics',
    'android',
    'anquan',
    'anz',
    'aol',
    'apartments',
    'app',
    'apple',
    'aquarelle',
    'arab',
    'aramco',
    'archi',
    'army',
    'art',
    'arte',
    'asda',
    'associates',
    'athleta',
    'attorney',
    'auction',
    'audi',
    'audible',
    'audio',
    'auspost',
    'author',
    'auto',
    'autos',
    'avianca',
    'aws',
    'axa',
    'azure',
    'baby',
    'baidu',
    'banamex',
    'bananarepublic',
    'band',
    'bank',
    'bar',
    'barcelona',
    'barclaycard',
    'barclays',
    'barefoot',
    'bargains',
    'baseball',
    'basketball',
    'bauhaus',
    'bayern',
    'bbc',
    'bbt',
    'bbva',
    'bcg',
    'bcn',
    'beats',
    'beauty',
    'beer',
    'bentley',
    'berlin',
    'best',
    'bestbuy',
    'bet',
    'bharti',
    'bible',
    'bid',
    'bike',
    'bing',
    'bingo',
    'bio',
    'black',
    'blackfriday',
    'blanco',
    'blockbuster',
    'blog',
    'bloomberg',
    'blue',
    'bms',
    'bmw',
    'bnl',
    'bnpparibas',
    'boats',
    'boehringer',
    'bofa',
    'bom',
    'bond',
    'boo',
    'book',
    'booking',
    'bosch',
    'bostik',
    'boston',
    'bot',
    'boutique',
    'box',
    'bradesco',
    'bridgestone',
    'broadway',
    'broker',
    'brother',
    'brussels',
    'budapest',
    'bugatti',
    'build',
    'builders',
    'business',
    'buy',
    'buzz',
    'bzh',
    'cab',
    'cafe',
    'cal',
    'call',
    'calvinklein',
    'cam',
    'camera',
    'camp',
    'cancerresearch',
    'canon',
    'capetown',
    'capital',
    'capitalone',
    'car',
    'caravan',
    'cards',
    'care',
    'career',
    'careers',
    'cars',
    'cartier',
    'casa',
    'case',
    'caseih',
    'cash',
    'casino',
    'catering',
    'catholic',
    'cba',
    'cbn',
    'cbre',
    'cbs',
    'ceb',
    'center',
    'ceo',
    'cern',
    'cfa',
    'cfd',
    'chanel',
    'channel',
    'charity',
    'chase',
    'chat',
    'cheap',
    'chintai',
    'christmas',
    'chrome',
    'chrysler',
    'church',
    'cipriani',
    'circle',
    'cisco',
    'citadel',
    'citi',
    'citic',
    'city',
    'cityeats',
    'claims',
    'cleaning',
    'click',
    'clinic',
    'clinique',
    'clothing',
    'cloud',
    'club',
    'clubmed',
    'coach',
    'codes',
    'coffee',
    'college',
    'cologne',
    'comcast',
    'commbank',
    'community',
    'company',
    'compare',
    'computer',
    'comsec',
    'condos',
    'construction',
    'consulting',
    'contact',
    'contractors',
    'cooking',
    'cookingchannel',
    'cool',
    'corsica',
    'country',
    'coupon',
    'coupons',
    'courses',
    'credit',
    'creditcard',
    'creditunion',
    'cricket',
    'crown',
    'crs',
    'cruise',
    'cruises',
    'csc',
    'cuisinella',
    'cymru',
    'cyou',
    'dabur',
    'dad',
    'dance',
    'data',
    'date',
    'dating',
    'datsun',
    'day',
    'dclk',
    'dds',
    'deal',
    'dealer',
    'deals',
    'degree',
    'delivery',
    'dell',
    'deloitte',
    'delta',
    'democrat',
    'dental',
    'dentist',
    'desi',
    'design',
    'dev',
    'dhl',
    'diamonds',
    'diet',
    'digital',
    'direct',
    'directory',
    'discount',
    'discover',
    'dish',
    'diy',
    'dnp',
    'docs',
    'doctor',
    'dodge',
    'dog',
    'doha',
    'domains',
    'dot',
    'download',
    'drive',
    'dtv',
    'dubai',
    'duck',
    'dunlop',
    'duns',
    'dupont',
    'durban',
    'dvag',
    'dvr',
    'earth',
    'eat',
    'eco',
    'edeka',
    'education',
    'email',
    'emerck',
    'energy',
    'engineer',
    'engineering',
    'enterprises',
    'epost',
    'epson',
    'equipment',
    'ericsson',
    'erni',
    'esq',
    'estate',
    'esurance',
    'etisalat',
    'eurovision',
    'eus',
    'events',
    'everbank',
    'exchange',
    'expert',
    'exposed',
    'express',
    'extraspace',
    'fage',
    'fail',
    'fairwinds',
    'faith',
    'family',
    'fan',
    'fans',
    'farm',
    'farmers',
    'fashion',
    'fast',
    'fedex',
    'feedback',
    'ferrari',
    'ferrero',
    'fiat',
    'fidelity',
    'fido',
    'film',
    'final',
    'finance',
    'financial',
    'fire',
    'firestone',
    'firmdale',
    'fish',
    'fishing',
    'fit',
    'fitness',
    'flickr',
    'flights',
    'flir',
    'florist',
    'flowers',
    'fly',
    'foo',
    'food',
    'foodnetwork',
    'football',
    'ford',
    'forex',
    'forsale',
    'forum',
    'foundation',
    'fox',
    'free',
    'fresenius',
    'frl',
    'frogans',
    'frontdoor',
    'frontier',
    'ftr',
    'fujitsu',
    'fujixerox',
    'fun',
    'fund',
    'furniture',
    'futbol',
    'fyi',
    'gal',
    'gallery',
    'gallo',
    'gallup',
    'game',
    'games',
    'gap',
    'garden',
    'gbiz',
    'gdn',
    'gea',
    'gent',
    'genting',
    'george',
    'ggee',
    'gift',
    'gifts',
    'gives',
    'giving',
    'glade',
    'glass',
    'gle',
    'global',
    'globo',
    'gmail',
    'gmbh',
    'gmo',
    'gmx',
    'godaddy',
    'gold',
    'goldpoint',
    'golf',
    'goo',
    'goodyear',
    'goog',
    'google',
    'gop',
    'got',
    'grainger',
    'graphics',
    'gratis',
    'green',
    'gripe',
    'grocery',
    'group',
    'guardian',
    'gucci',
    'guge',
    'guide',
    'guitars',
    'guru',
    'hair',
    'hamburg',
    'hangout',
    'haus',
    'hbo',
    'hdfc',
    'hdfcbank',
    'health',
    'healthcare',
    'help',
    'helsinki',
    'here',
    'hermes',
    'hgtv',
    'hiphop',
    'hisamitsu',
    'hitachi',
    'hiv',
    'hkt',
    'hockey',
    'holdings',
    'holiday',
    'homedepot',
    'homegoods',
    'homes',
    'homesense',
    'honda',
    'honeywell',
    'horse',
    'hospital',
    'host',
    'hosting',
    'hot',
    'hoteles',
    'hotels',
    'hotmail',
    'house',
    'how',
    'hsbc',
    'hughes',
    'hyatt',
    'hyundai',
    'ibm',
    'icbc',
    'ice',
    'icu',
    'ieee',
    'ifm',
    'ikano',
    'imamat',
    'imdb',
    'immo',
    'immobilien',
    'inc',
    'industries',
    'infiniti',
    'ing',
    'ink',
    'institute',
    'insurance',
    'insure',
    'intel',
    'international',
    'intuit',
    'investments',
    'ipiranga',
    'irish',
    'iselect',
    'ismaili',
    'ist',
    'istanbul',
    'itau',
    'itv',
    'iveco',
    'jaguar',
    'java',
    'jcb',
    'jcp',
    'jeep',
    'jetzt',
    'jewelry',
    'jio',
    'jll',
    'jmp',
    'jnj',
    'joburg',
    'jot',
    'joy',
    'jpmorgan',
    'jprs',
    'juegos',
    'juniper',
    'kaufen',
    'kddi',
    'kerryhotels',
    'kerrylogistics',
    'kerryproperties',
    'kfh',
    'kia',
    'kim',
    'kinder',
    'kindle',
    'kitchen',
    'kiwi',
    'koeln',
    'komatsu',
    'kosher',
    'kpmg',
    'kpn',
    'krd',
    'kred',
    'kuokgroup',
    'kyoto',
    'lacaixa',
    'ladbrokes',
    'lamborghini',
    'lamer',
    'lancaster',
    'lancia',
    'lancome',
    'land',
    'landrover',
    'lanxess',
    'lasalle',
    'lat',
    'latino',
    'latrobe',
    'law',
    'lawyer',
    'lds',
    'lease',
    'leclerc',
    'lefrak',
    'legal',
    'lego',
    'lexus',
    'lgbt',
    'liaison',
    'lidl',
    'life',
    'lifeinsurance',
    'lifestyle',
    'lighting',
    'like',
    'lilly',
    'limited',
    'limo',
    'lincoln',
    'linde',
    'link',
    'lipsy',
    'live',
    'living',
    'lixil',
    'llc',
    'loan',
    'loans',
    'locker',
    'locus',
    'loft',
    'lol',
    'london',
    'lotte',
    'lotto',
    'love',
    'lpl',
    'lplfinancial',
    'ltd',
    'ltda',
    'lundbeck',
    'lupin',
    'luxe',
    'luxury',
    'macys',
    'madrid',
    'maif',
    'maison',
    'makeup',
    'man',
    'management',
    'mango',
    'map',
    'market',
    'marketing',
    'markets',
    'marriott',
    'marshalls',
    'maserati',
    'mattel',
    'mba',
    'mckinsey',
    'med',
    'media',
    'meet',
    'melbourne',
    'meme',
    'memorial',
    'men',
    'menu',
    'merckmsd',
    'metlife',
    'miami',
    'microsoft',
    'mini',
    'mint',
    'mit',
    'mitsubishi',
    'mlb',
    'mls',
    'mma',
    'mobile',
    'mobily',
    'moda',
    'moe',
    'moi',
    'mom',
    'monash',
    'money',
    'monster',
    'mopar',
    'mormon',
    'mortgage',
    'moscow',
    'moto',
    'motorcycles',
    'mov',
    'movie',
    'movistar',
    'msd',
    'mtn',
    'mtr',
    'mutual',
    'nab',
    'nadex',
    'nagoya',
    'nationwide',
    'natura',
    'navy',
    'nba',
    'nec',
    'netbank',
    'netflix',
    'network',
    'neustar',
    'new',
    'newholland',
    'news',
    'next',
    'nextdirect',
    'nexus',
    'nfl',
    'ngo',
    'nhk',
    'nico',
    'nike',
    'nikon',
    'ninja',
    'nissan',
    'nissay',
    'nokia',
    'northwesternmutual',
    'norton',
    'now',
    'nowruz',
    'nowtv',
    'nra',
    'nrw',
    'ntt',
    'nyc',
    'obi',
    'observer',
    'off',
    'office',
    'okinawa',
    'olayan',
    'olayangroup',
    'oldnavy',
    'ollo',
    'omega',
    'one',
    'ong',
    'onl',
    'online',
    'onyourside',
    'ooo',
    'open',
    'oracle',
    'orange',
    'organic',
    'origins',
    'osaka',
    'otsuka',
    'ott',
    'ovh',
    'page',
    'panasonic',
    'paris',
    'pars',
    'partners',
    'parts',
    'party',
    'passagens',
    'pay',
    'pccw',
    'pet',
    'pfizer',
    'pharmacy',
    'phd',
    'philips',
    'phone',
    'photo',
    'photography',
    'photos',
    'physio',
    'piaget',
    'pics',
    'pictet',
    'pictures',
    'pid',
    'pin',
    'ping',
    'pink',
    'pioneer',
    'pizza',
    'place',
    'play',
    'playstation',
    'plumbing',
    'plus',
    'pnc',
    'pohl',
    'poker',
    'politie',
    'porn',
    'pramerica',
    'praxi',
    'press',
    'prime',
    'prod',
    'productions',
    'prof',
    'progressive',
    'promo',
    'properties',
    'property',
    'protection',
    'pru',
    'prudential',
    'pub',
    'pwc',
    'qpon',
    'quebec',
    'quest',
    'qvc',
    'racing',
    'radio',
    'raid',
    'read',
    'realestate',
    'realtor',
    'realty',
    'recipes',
    'red',
    'redstone',
    'redumbrella',
    'rehab',
    'reise',
    'reisen',
    'reit',
    'reliance',
    'ren',
    'rent',
    'rentals',
    'repair',
    'report',
    'republican',
    'rest',
    'restaurant',
    'review',
    'reviews',
    'rexroth',
    'rich',
    'richardli',
    'ricoh',
    'rightathome',
    'ril',
    'rio',
    'rip',
    'rmit',
    'rocher',
    'rocks',
    'rodeo',
    'rogers',
    'room',
    'rsvp',
    'rugby',
    'ruhr',
    'run',
    'rwe',
    'ryukyu',
    'saarland',
    'safe',
    'safety',
    'sakura',
    'sale',
    'salon',
    'samsclub',
    'samsung',
    'sandvik',
    'sandvikcoromant',
    'sanofi',
    'sap',
    'sarl',
    'sas',
    'save',
    'saxo',
    'sbi',
    'sbs',
    'sca',
    'scb',
    'schaeffler',
    'schmidt',
    'scholarships',
    'school',
    'schule',
    'schwarz',
    'science',
    'scjohnson',
    'scor',
    'scot',
    'search',
    'seat',
    'secure',
    'security',
    'seek',
    'select',
    'sener',
    'services',
    'ses',
    'seven',
    'sew',
    'sex',
    'sexy',
    'sfr',
    'shangrila',
    'sharp',
    'shaw',
    'shell',
    'shia',
    'shiksha',
    'shoes',
    'shop',
    'shopping',
    'shouji',
    'show',
    'showtime',
    'shriram',
    'silk',
    'sina',
    'singles',
    'site',
    'ski',
    'skin',
    'sky',
    'skype',
    'sling',
    'smart',
    'smile',
    'sncf',
    'soccer',
    'social',
    'softbank',
    'software',
    'sohu',
    'solar',
    'solutions',
    'song',
    'sony',
    'soy',
    'space',
    'spiegel',
    'sport',
    'spot',
    'spreadbetting',
    'srl',
    'srt',
    'stada',
    'staples',
    'star',
    'starhub',
    'statebank',
    'statefarm',
    'statoil',
    'stc',
    'stcgroup',
    'stockholm',
    'storage',
    'store',
    'stream',
    'studio',
    'study',
    'style',
    'sucks',
    'supplies',
    'supply',
    'support',
    'surf',
    'surgery',
    'suzuki',
    'swatch',
    'swiftcover',
    'swiss',
    'sydney',
    'symantec',
    'systems',
    'tab',
    'taipei',
    'talk',
    'taobao',
    'target',
    'tatamotors',
    'tatar',
    'tattoo',
    'tax',
    'taxi',
    'tci',
    'tdk',
    'team',
    'tech',
    'technology',
    'telefonica',
    'temasek',
    'tennis',
    'teva',
    'thd',
    'theater',
    'theatre',
    'tiaa',
    'tickets',
    'tienda',
    'tiffany',
    'tips',
    'tires',
    'tirol',
    'tjmaxx',
    'tjx',
    'tkmaxx',
    'tmall',
    'today',
    'tokyo',
    'tools',
    'top',
    'toray',
    'toshiba',
    'total',
    'tours',
    'town',
    'toyota',
    'toys',
    'trade',
    'trading',
    'training',
    'travel',
    'travelchannel',
    'travelers',
    'travelersinsurance',
    'trust',
    'trv',
    'tube',
    'tui',
    'tunes',
    'tushu',
    'tvs',
    'ubank',
    'ubs',
    'uconnect',
    'unicom',
    'university',
    'uno',
    'uol',
    'ups',
    'vacations',
    'vana',
    'vanguard',
    'vegas',
    'ventures',
    'verisign',
    'versicherung',
    'vet',
    'viajes',
    'video',
    'vig',
    'viking',
    'villas',
    'vin',
    'vip',
    'virgin',
    'visa',
    'vision',
    'vistaprint',
    'viva',
    'vivo',
    'vlaanderen',
    'vodka',
    'volkswagen',
    'volvo',
    'vote',
    'voting',
    'voto',
    'voyage',
    'vuelos',
    'wales',
    'walmart',
    'walter',
    'wang',
    'wanggou',
    'warman',
    'watch',
    'watches',
    'weather',
    'weatherchannel',
    'webcam',
    'weber',
    'website',
    'wed',
    'wedding',
    'weibo',
    'weir',
    'whoswho',
    'wien',
    'wiki',
    'williamhill',
    'win',
    'windows',
    'wine',
    'winners',
    'wme',
    'wolterskluwer',
    'woodside',
    'work',
    'works',
    'world',
    'wow',
    'wtc',
    'wtf',
    'xbox',
    'xerox',
    'xfinity',
    'xihuan',
    'xin',
    'कॉम',
    'セール',
    '佛山',
    '慈善',
    '集团',
    '在线',
    '大众汽车',
    '点看',
    'คอม',
    '八卦',
    'موقع',
    '公益',
    '公司',
    '香格里拉',
    '网站',
    '移动',
    '我爱你',
    'москва',
    'католик',
    'онлайн',
    'сайт',
    '联通',
    'קום',
    '时尚',
    '微博',
    '淡马锡',
    'ファッション',
    'орг',
    'नेट',
    'ストア',
    '삼성',
    '商标',
    '商店',
    '商城',
    'дети',
    'ポイント',
    '新闻',
    '工行',
    '家電',
    'كوم',
    '中文网',
    '中信',
    '娱乐',
    '谷歌',
    '電訊盈科',
    '购物',
    'クラウド',
    '通販',
    '网店',
    'संगठन',
    '餐厅',
    '网络',
    'ком',
    '诺基亚',
    '食品',
    '飞利浦',
    '手表',
    '手机',
    'ارامكو',
    'العليان',
    'اتصالات',
    'بازار',
    'موبايلي',
    'ابوظبي',
    'كاثوليك',
    'همراه',
    '닷컴',
    '政府',
    'شبكة',
    'بيتك',
    'عرب',
    '机构',
    '组织机构',
    '健康',
    '招聘',
    'рус',
    '珠宝',
    '大拿',
    'みんな',
    'グーグル',
    '世界',
    '書籍',
    '网址',
    '닷넷',
    'コム',
    '天主教',
    '游戏',
    'vermögensberater',
    'vermögensberatung',
    '企业',
    '信息',
    '嘉里大酒店',
    '嘉里',
    '广东',
    '政务',
    'xyz',
    'yachts',
    'yahoo',
    'yamaxun',
    'yandex',
    'yodobashi',
    'yoga',
    'yokohama',
    'you',
    'youtube',
    'yun',
    'zappos',
    'zara',
    'zero',
    'zip',
    'zippo',
    'zone',
    'zuerich',
    'cc.ua',
    'inf.ua',
    'ltd.ua',
    'beep.pl',
    '*.compute.estate',
    '*.alces.network',
    'alwaysdata.net',
    'cloudfront.net',
    '*.compute.amazonaws.com',
    '*.compute-1.amazonaws.com',
    '*.compute.amazonaws.com.cn',
    'us-east-1.amazonaws.com',
    'cn-north-1.eb.amazonaws.com.cn',
    'cn-northwest-1.eb.amazonaws.com.cn',
    'elasticbeanstalk.com',
    'ap-northeast-1.elasticbeanstalk.com',
    'ap-northeast-2.elasticbeanstalk.com',
    'ap-northeast-3.elasticbeanstalk.com',
    'ap-south-1.elasticbeanstalk.com',
    'ap-southeast-1.elasticbeanstalk.com',
    'ap-southeast-2.elasticbeanstalk.com',
    'ca-central-1.elasticbeanstalk.com',
    'eu-central-1.elasticbeanstalk.com',
    'eu-west-1.elasticbeanstalk.com',
    'eu-west-2.elasticbeanstalk.com',
    'eu-west-3.elasticbeanstalk.com',
    'sa-east-1.elasticbeanstalk.com',
    'us-east-1.elasticbeanstalk.com',
    'us-east-2.elasticbeanstalk.com',
    'us-gov-west-1.elasticbeanstalk.com',
    'us-west-1.elasticbeanstalk.com',
    'us-west-2.elasticbeanstalk.com',
    '*.elb.amazonaws.com',
    '*.elb.amazonaws.com.cn',
    's3.amazonaws.com',
    's3-ap-northeast-1.amazonaws.com',
    's3-ap-northeast-2.amazonaws.com',
    's3-ap-south-1.amazonaws.com',
    's3-ap-southeast-1.amazonaws.com',
    's3-ap-southeast-2.amazonaws.com',
    's3-ca-central-1.amazonaws.com',
    's3-eu-central-1.amazonaws.com',
    's3-eu-west-1.amazonaws.com',
    's3-eu-west-2.amazonaws.com',
    's3-eu-west-3.amazonaws.com',
    's3-external-1.amazonaws.com',
    's3-fips-us-gov-west-1.amazonaws.com',
    's3-sa-east-1.amazonaws.com',
    's3-us-gov-west-1.amazonaws.com',
    's3-us-east-2.amazonaws.com',
    's3-us-west-1.amazonaws.com',
    's3-us-west-2.amazonaws.com',
    's3.ap-northeast-2.amazonaws.com',
    's3.ap-south-1.amazonaws.com',
    's3.cn-north-1.amazonaws.com.cn',
    's3.ca-central-1.amazonaws.com',
    's3.eu-central-1.amazonaws.com',
    's3.eu-west-2.amazonaws.com',
    's3.eu-west-3.amazonaws.com',
    's3.us-east-2.amazonaws.com',
    's3.dualstack.ap-northeast-1.amazonaws.com',
    's3.dualstack.ap-northeast-2.amazonaws.com',
    's3.dualstack.ap-south-1.amazonaws.com',
    's3.dualstack.ap-southeast-1.amazonaws.com',
    's3.dualstack.ap-southeast-2.amazonaws.com',
    's3.dualstack.ca-central-1.amazonaws.com',
    's3.dualstack.eu-central-1.amazonaws.com',
    's3.dualstack.eu-west-1.amazonaws.com',
    's3.dualstack.eu-west-2.amazonaws.com',
    's3.dualstack.eu-west-3.amazonaws.com',
    's3.dualstack.sa-east-1.amazonaws.com',
    's3.dualstack.us-east-1.amazonaws.com',
    's3.dualstack.us-east-2.amazonaws.com',
    's3-website-us-east-1.amazonaws.com',
    's3-website-us-west-1.amazonaws.com',
    's3-website-us-west-2.amazonaws.com',
    's3-website-ap-northeast-1.amazonaws.com',
    's3-website-ap-southeast-1.amazonaws.com',
    's3-website-ap-southeast-2.amazonaws.com',
    's3-website-eu-west-1.amazonaws.com',
    's3-website-sa-east-1.amazonaws.com',
    's3-website.ap-northeast-2.amazonaws.com',
    's3-website.ap-south-1.amazonaws.com',
    's3-website.ca-central-1.amazonaws.com',
    's3-website.eu-central-1.amazonaws.com',
    's3-website.eu-west-2.amazonaws.com',
    's3-website.eu-west-3.amazonaws.com',
    's3-website.us-east-2.amazonaws.com',
    't3l3p0rt.net',
    'tele.amune.org',
    'apigee.io',
    'on-aptible.com',
    'user.party.eus',
    'pimienta.org',
    'poivron.org',
    'potager.org',
    'sweetpepper.org',
    'myasustor.com',
    'myfritz.net',
    '*.awdev.ca',
    '*.advisor.ws',
    'backplaneapp.io',
    'betainabox.com',
    'bnr.la',
    'blackbaudcdn.net',
    'boomla.net',
    'boxfuse.io',
    'square7.ch',
    'bplaced.com',
    'bplaced.de',
    'square7.de',
    'bplaced.net',
    'square7.net',
    'browsersafetymark.io',
    'mycd.eu',
    'ae.org',
    'ar.com',
    'br.com',
    'cn.com',
    'com.de',
    'com.se',
    'de.com',
    'eu.com',
    'gb.com',
    'gb.net',
    'hu.com',
    'hu.net',
    'jp.net',
    'jpn.com',
    'kr.com',
    'mex.com',
    'no.com',
    'qc.com',
    'ru.com',
    'sa.com',
    'se.net',
    'uk.com',
    'uk.net',
    'us.com',
    'uy.com',
    'za.bz',
    'za.com',
    'africa.com',
    'gr.com',
    'in.net',
    'us.org',
    'co.com',
    'c.la',
    'certmgr.org',
    'xenapponazure.com',
    'virtueeldomein.nl',
    'cleverapps.io',
    'c66.me',
    'cloud66.ws',
    'jdevcloud.com',
    'wpdevcloud.com',
    'cloudaccess.host',
    'freesite.host',
    'cloudaccess.net',
    'cloudcontrolled.com',
    'cloudcontrolapp.com',
    'co.ca',
    '*.otap.co',
    'co.cz',
    'c.cdn77.org',
    'cdn77-ssl.net',
    'r.cdn77.net',
    'rsc.cdn77.org',
    'ssl.origin.cdn77-secure.org',
    'cloudns.asia',
    'cloudns.biz',
    'cloudns.club',
    'cloudns.cc',
    'cloudns.eu',
    'cloudns.in',
    'cloudns.info',
    'cloudns.org',
    'cloudns.pro',
    'cloudns.pw',
    'cloudns.us',
    'cloudeity.net',
    'cnpy.gdn',
    'co.nl',
    'co.no',
    'webhosting.be',
    'hosting-cluster.nl',
    'dyn.cosidns.de',
    'dynamisches-dns.de',
    'dnsupdater.de',
    'internet-dns.de',
    'l-o-g-i-n.de',
    'dynamic-dns.info',
    'feste-ip.net',
    'knx-server.net',
    'static-access.net',
    'realm.cz',
    '*.cryptonomic.net',
    'cupcake.is',
    'cyon.link',
    'cyon.site',
    'daplie.me',
    'localhost.daplie.me',
    'dattolocal.com',
    'dattorelay.com',
    'dattoweb.com',
    'mydatto.com',
    'dattolocal.net',
    'mydatto.net',
    'biz.dk',
    'co.dk',
    'firm.dk',
    'reg.dk',
    'store.dk',
    'debian.net',
    'dedyn.io',
    'dnshome.de',
    'drayddns.com',
    'dreamhosters.com',
    'mydrobo.com',
    'drud.io',
    'drud.us',
    'duckdns.org',
    'dy.fi',
    'tunk.org',
    'dyndns-at-home.com',
    'dyndns-at-work.com',
    'dyndns-blog.com',
    'dyndns-free.com',
    'dyndns-home.com',
    'dyndns-ip.com',
    'dyndns-mail.com',
    'dyndns-office.com',
    'dyndns-pics.com',
    'dyndns-remote.com',
    'dyndns-server.com',
    'dyndns-web.com',
    'dyndns-wiki.com',
    'dyndns-work.com',
    'dyndns.biz',
    'dyndns.info',
    'dyndns.org',
    'dyndns.tv',
    'at-band-camp.net',
    'ath.cx',
    'barrel-of-knowledge.info',
    'barrell-of-knowledge.info',
    'better-than.tv',
    'blogdns.com',
    'blogdns.net',
    'blogdns.org',
    'blogsite.org',
    'boldlygoingnowhere.org',
    'broke-it.net',
    'buyshouses.net',
    'cechire.com',
    'dnsalias.com',
    'dnsalias.net',
    'dnsalias.org',
    'dnsdojo.com',
    'dnsdojo.net',
    'dnsdojo.org',
    'does-it.net',
    'doesntexist.com',
    'doesntexist.org',
    'dontexist.com',
    'dontexist.net',
    'dontexist.org',
    'doomdns.com',
    'doomdns.org',
    'dvrdns.org',
    'dyn-o-saur.com',
    'dynalias.com',
    'dynalias.net',
    'dynalias.org',
    'dynathome.net',
    'dyndns.ws',
    'endofinternet.net',
    'endofinternet.org',
    'endoftheinternet.org',
    'est-a-la-maison.com',
    'est-a-la-masion.com',
    'est-le-patron.com',
    'est-mon-blogueur.com',
    'for-better.biz',
    'for-more.biz',
    'for-our.info',
    'for-some.biz',
    'for-the.biz',
    'forgot.her.name',
    'forgot.his.name',
    'from-ak.com',
    'from-al.com',
    'from-ar.com',
    'from-az.net',
    'from-ca.com',
    'from-co.net',
    'from-ct.com',
    'from-dc.com',
    'from-de.com',
    'from-fl.com',
    'from-ga.com',
    'from-hi.com',
    'from-ia.com',
    'from-id.com',
    'from-il.com',
    'from-in.com',
    'from-ks.com',
    'from-ky.com',
    'from-la.net',
    'from-ma.com',
    'from-md.com',
    'from-me.org',
    'from-mi.com',
    'from-mn.com',
    'from-mo.com',
    'from-ms.com',
    'from-mt.com',
    'from-nc.com',
    'from-nd.com',
    'from-ne.com',
    'from-nh.com',
    'from-nj.com',
    'from-nm.com',
    'from-nv.com',
    'from-ny.net',
    'from-oh.com',
    'from-ok.com',
    'from-or.com',
    'from-pa.com',
    'from-pr.com',
    'from-ri.com',
    'from-sc.com',
    'from-sd.com',
    'from-tn.com',
    'from-tx.com',
    'from-ut.com',
    'from-va.com',
    'from-vt.com',
    'from-wa.com',
    'from-wi.com',
    'from-wv.com',
    'from-wy.com',
    'ftpaccess.cc',
    'fuettertdasnetz.de',
    'game-host.org',
    'game-server.cc',
    'getmyip.com',
    'gets-it.net',
    'go.dyndns.org',
    'gotdns.com',
    'gotdns.org',
    'groks-the.info',
    'groks-this.info',
    'ham-radio-op.net',
    'here-for-more.info',
    'hobby-site.com',
    'hobby-site.org',
    'home.dyndns.org',
    'homedns.org',
    'homeftp.net',
    'homeftp.org',
    'homeip.net',
    'homelinux.com',
    'homelinux.net',
    'homelinux.org',
    'homeunix.com',
    'homeunix.net',
    'homeunix.org',
    'iamallama.com',
    'in-the-band.net',
    'is-a-anarchist.com',
    'is-a-blogger.com',
    'is-a-bookkeeper.com',
    'is-a-bruinsfan.org',
    'is-a-bulls-fan.com',
    'is-a-candidate.org',
    'is-a-caterer.com',
    'is-a-celticsfan.org',
    'is-a-chef.com',
    'is-a-chef.net',
    'is-a-chef.org',
    'is-a-conservative.com',
    'is-a-cpa.com',
    'is-a-cubicle-slave.com',
    'is-a-democrat.com',
    'is-a-designer.com',
    'is-a-doctor.com',
    'is-a-financialadvisor.com',
    'is-a-geek.com',
    'is-a-geek.net',
    'is-a-geek.org',
    'is-a-green.com',
    'is-a-guru.com',
    'is-a-hard-worker.com',
    'is-a-hunter.com',
    'is-a-knight.org',
    'is-a-landscaper.com',
    'is-a-lawyer.com',
    'is-a-liberal.com',
    'is-a-libertarian.com',
    'is-a-linux-user.org',
    'is-a-llama.com',
    'is-a-musician.com',
    'is-a-nascarfan.com',
    'is-a-nurse.com',
    'is-a-painter.com',
    'is-a-patsfan.org',
    'is-a-personaltrainer.com',
    'is-a-photographer.com',
    'is-a-player.com',
    'is-a-republican.com',
    'is-a-rockstar.com',
    'is-a-socialist.com',
    'is-a-soxfan.org',
    'is-a-student.com',
    'is-a-teacher.com',
    'is-a-techie.com',
    'is-a-therapist.com',
    'is-an-accountant.com',
    'is-an-actor.com',
    'is-an-actress.com',
    'is-an-anarchist.com',
    'is-an-artist.com',
    'is-an-engineer.com',
    'is-an-entertainer.com',
    'is-by.us',
    'is-certified.com',
    'is-found.org',
    'is-gone.com',
    'is-into-anime.com',
    'is-into-cars.com',
    'is-into-cartoons.com',
    'is-into-games.com',
    'is-leet.com',
    'is-lost.org',
    'is-not-certified.com',
    'is-saved.org',
    'is-slick.com',
    'is-uberleet.com',
    'is-very-bad.org',
    'is-very-evil.org',
    'is-very-good.org',
    'is-very-nice.org',
    'is-very-sweet.org',
    'is-with-theband.com',
    'isa-geek.com',
    'isa-geek.net',
    'isa-geek.org',
    'isa-hockeynut.com',
    'issmarterthanyou.com',
    'isteingeek.de',
    'istmein.de',
    'kicks-ass.net',
    'kicks-ass.org',
    'knowsitall.info',
    'land-4-sale.us',
    'lebtimnetz.de',
    'leitungsen.de',
    'likes-pie.com',
    'likescandy.com',
    'merseine.nu',
    'mine.nu',
    'misconfused.org',
    'mypets.ws',
    'myphotos.cc',
    'neat-url.com',
    'office-on-the.net',
    'on-the-web.tv',
    'podzone.net',
    'podzone.org',
    'readmyblog.org',
    'saves-the-whales.com',
    'scrapper-site.net',
    'scrapping.cc',
    'selfip.biz',
    'selfip.com',
    'selfip.info',
    'selfip.net',
    'selfip.org',
    'sells-for-less.com',
    'sells-for-u.com',
    'sells-it.net',
    'sellsyourhome.org',
    'servebbs.com',
    'servebbs.net',
    'servebbs.org',
    'serveftp.net',
    'serveftp.org',
    'servegame.org',
    'shacknet.nu',
    'simple-url.com',
    'space-to-rent.com',
    'stuff-4-sale.org',
    'stuff-4-sale.us',
    'teaches-yoga.com',
    'thruhere.net',
    'traeumtgerade.de',
    'webhop.biz',
    'webhop.info',
    'webhop.net',
    'webhop.org',
    'worse-than.tv',
    'writesthisblog.com',
    'ddnss.de',
    'dyn.ddnss.de',
    'dyndns.ddnss.de',
    'dyndns1.de',
    'dyn-ip24.de',
    'home-webserver.de',
    'dyn.home-webserver.de',
    'myhome-server.de',
    'ddnss.org',
    'definima.net',
    'definima.io',
    'bci.dnstrace.pro',
    'ddnsfree.com',
    'ddnsgeek.com',
    'giize.com',
    'gleeze.com',
    'kozow.com',
    'loseyourip.com',
    'ooguy.com',
    'theworkpc.com',
    'casacam.net',
    'dynu.net',
    'accesscam.org',
    'camdvr.org',
    'freeddns.org',
    'mywire.org',
    'webredirect.org',
    'myddns.rocks',
    'blogsite.xyz',
    'dynv6.net',
    'e4.cz',
    'mytuleap.com',
    'enonic.io',
    'customer.enonic.io',
    'eu.org',
    'al.eu.org',
    'asso.eu.org',
    'at.eu.org',
    'au.eu.org',
    'be.eu.org',
    'bg.eu.org',
    'ca.eu.org',
    'cd.eu.org',
    'ch.eu.org',
    'cn.eu.org',
    'cy.eu.org',
    'cz.eu.org',
    'de.eu.org',
    'dk.eu.org',
    'edu.eu.org',
    'ee.eu.org',
    'es.eu.org',
    'fi.eu.org',
    'fr.eu.org',
    'gr.eu.org',
    'hr.eu.org',
    'hu.eu.org',
    'ie.eu.org',
    'il.eu.org',
    'in.eu.org',
    'int.eu.org',
    'is.eu.org',
    'it.eu.org',
    'jp.eu.org',
    'kr.eu.org',
    'lt.eu.org',
    'lu.eu.org',
    'lv.eu.org',
    'mc.eu.org',
    'me.eu.org',
    'mk.eu.org',
    'mt.eu.org',
    'my.eu.org',
    'net.eu.org',
    'ng.eu.org',
    'nl.eu.org',
    'no.eu.org',
    'nz.eu.org',
    'paris.eu.org',
    'pl.eu.org',
    'pt.eu.org',
    'q-a.eu.org',
    'ro.eu.org',
    'ru.eu.org',
    'se.eu.org',
    'si.eu.org',
    'sk.eu.org',
    'tr.eu.org',
    'uk.eu.org',
    'us.eu.org',
    'eu-1.evennode.com',
    'eu-2.evennode.com',
    'eu-3.evennode.com',
    'eu-4.evennode.com',
    'us-1.evennode.com',
    'us-2.evennode.com',
    'us-3.evennode.com',
    'us-4.evennode.com',
    'twmail.cc',
    'twmail.net',
    'twmail.org',
    'mymailer.com.tw',
    'url.tw',
    'apps.fbsbx.com',
    'ru.net',
    'adygeya.ru',
    'bashkiria.ru',
    'bir.ru',
    'cbg.ru',
    'com.ru',
    'dagestan.ru',
    'grozny.ru',
    'kalmykia.ru',
    'kustanai.ru',
    'marine.ru',
    'mordovia.ru',
    'msk.ru',
    'mytis.ru',
    'nalchik.ru',
    'nov.ru',
    'pyatigorsk.ru',
    'spb.ru',
    'vladikavkaz.ru',
    'vladimir.ru',
    'abkhazia.su',
    'adygeya.su',
    'aktyubinsk.su',
    'arkhangelsk.su',
    'armenia.su',
    'ashgabad.su',
    'azerbaijan.su',
    'balashov.su',
    'bashkiria.su',
    'bryansk.su',
    'bukhara.su',
    'chimkent.su',
    'dagestan.su',
    'east-kazakhstan.su',
    'exnet.su',
    'georgia.su',
    'grozny.su',
    'ivanovo.su',
    'jambyl.su',
    'kalmykia.su',
    'kaluga.su',
    'karacol.su',
    'karaganda.su',
    'karelia.su',
    'khakassia.su',
    'krasnodar.su',
    'kurgan.su',
    'kustanai.su',
    'lenug.su',
    'mangyshlak.su',
    'mordovia.su',
    'msk.su',
    'murmansk.su',
    'nalchik.su',
    'navoi.su',
    'north-kazakhstan.su',
    'nov.su',
    'obninsk.su',
    'penza.su',
    'pokrovsk.su',
    'sochi.su',
    'spb.su',
    'tashkent.su',
    'termez.su',
    'togliatti.su',
    'troitsk.su',
    'tselinograd.su',
    'tula.su',
    'tuva.su',
    'vladikavkaz.su',
    'vladimir.su',
    'vologda.su',
    'channelsdvr.net',
    'fastlylb.net',
    'map.fastlylb.net',
    'freetls.fastly.net',
    'map.fastly.net',
    'a.prod.fastly.net',
    'global.prod.fastly.net',
    'a.ssl.fastly.net',
    'b.ssl.fastly.net',
    'global.ssl.fastly.net',
    'fastpanel.direct',
    'fastvps-server.com',
    'fhapp.xyz',
    'fedorainfracloud.org',
    'fedorapeople.org',
    'cloud.fedoraproject.org',
    'app.os.fedoraproject.org',
    'app.os.stg.fedoraproject.org',
    'filegear.me',
    'firebaseapp.com',
    'flynnhub.com',
    'flynnhosting.net',
    'freebox-os.com',
    'freeboxos.com',
    'fbx-os.fr',
    'fbxos.fr',
    'freebox-os.fr',
    'freeboxos.fr',
    'freedesktop.org',
    '*.futurecms.at',
    '*.ex.futurecms.at',
    '*.in.futurecms.at',
    'futurehosting.at',
    'futuremailing.at',
    '*.ex.ortsinfo.at',
    '*.kunden.ortsinfo.at',
    '*.statics.cloud',
    'service.gov.uk',
    'github.io',
    'githubusercontent.com',
    'gitlab.io',
    'homeoffice.gov.uk',
    'ro.im',
    'shop.ro',
    'goip.de',
    '*.0emm.com',
    'appspot.com',
    'blogspot.ae',
    'blogspot.al',
    'blogspot.am',
    'blogspot.ba',
    'blogspot.be',
    'blogspot.bg',
    'blogspot.bj',
    'blogspot.ca',
    'blogspot.cf',
    'blogspot.ch',
    'blogspot.cl',
    'blogspot.co.at',
    'blogspot.co.id',
    'blogspot.co.il',
    'blogspot.co.ke',
    'blogspot.co.nz',
    'blogspot.co.uk',
    'blogspot.co.za',
    'blogspot.com',
    'blogspot.com.ar',
    'blogspot.com.au',
    'blogspot.com.br',
    'blogspot.com.by',
    'blogspot.com.co',
    'blogspot.com.cy',
    'blogspot.com.ee',
    'blogspot.com.eg',
    'blogspot.com.es',
    'blogspot.com.mt',
    'blogspot.com.ng',
    'blogspot.com.tr',
    'blogspot.com.uy',
    'blogspot.cv',
    'blogspot.cz',
    'blogspot.de',
    'blogspot.dk',
    'blogspot.fi',
    'blogspot.fr',
    'blogspot.gr',
    'blogspot.hk',
    'blogspot.hr',
    'blogspot.hu',
    'blogspot.ie',
    'blogspot.in',
    'blogspot.is',
    'blogspot.it',
    'blogspot.jp',
    'blogspot.kr',
    'blogspot.li',
    'blogspot.lt',
    'blogspot.lu',
    'blogspot.md',
    'blogspot.mk',
    'blogspot.mr',
    'blogspot.mx',
    'blogspot.my',
    'blogspot.nl',
    'blogspot.no',
    'blogspot.pe',
    'blogspot.pt',
    'blogspot.qa',
    'blogspot.re',
    'blogspot.ro',
    'blogspot.rs',
    'blogspot.ru',
    'blogspot.se',
    'blogspot.sg',
    'blogspot.si',
    'blogspot.sk',
    'blogspot.sn',
    'blogspot.td',
    'blogspot.tw',
    'blogspot.ug',
    'blogspot.vn',
    'cloudfunctions.net',
    'cloud.goog',
    'codespot.com',
    'googleapis.com',
    'googlecode.com',
    'pagespeedmobilizer.com',
    'publishproxy.com',
    'withgoogle.com',
    'withyoutube.com',
    'hashbang.sh',
    'hasura.app',
    'hasura-app.io',
    'hepforge.org',
    'herokuapp.com',
    'herokussl.com',
    'myravendb.com',
    'ravendb.community',
    'ravendb.me',
    'development.run',
    'ravendb.run',
    'moonscale.net',
    'iki.fi',
    'biz.at',
    'info.at',
    'info.cx',
    'ac.leg.br',
    'al.leg.br',
    'am.leg.br',
    'ap.leg.br',
    'ba.leg.br',
    'ce.leg.br',
    'df.leg.br',
    'es.leg.br',
    'go.leg.br',
    'ma.leg.br',
    'mg.leg.br',
    'ms.leg.br',
    'mt.leg.br',
    'pa.leg.br',
    'pb.leg.br',
    'pe.leg.br',
    'pi.leg.br',
    'pr.leg.br',
    'rj.leg.br',
    'rn.leg.br',
    'ro.leg.br',
    'rr.leg.br',
    'rs.leg.br',
    'sc.leg.br',
    'se.leg.br',
    'sp.leg.br',
    'to.leg.br',
    'pixolino.com',
    'ipifony.net',
    'mein-iserv.de',
    'test-iserv.de',
    'myjino.ru',
    '*.hosting.myjino.ru',
    '*.landing.myjino.ru',
    '*.spectrum.myjino.ru',
    '*.vps.myjino.ru',
    '*.triton.zone',
    '*.cns.joyent.com',
    'js.org',
    'keymachine.de',
    'knightpoint.systems',
    'co.krd',
    'edu.krd',
    'git-repos.de',
    'lcube-server.de',
    'svn-repos.de',
    'app.lmpm.com',
    'linkitools.space',
    'linkyard.cloud',
    'linkyard-cloud.ch',
    'we.bs',
    'uklugs.org',
    'glug.org.uk',
    'lug.org.uk',
    'lugs.org.uk',
    'barsy.bg',
    'barsy.co.uk',
    'barsyonline.co.uk',
    'barsycenter.com',
    'barsyonline.com',
    'barsy.club',
    'barsy.de',
    'barsy.eu',
    'barsy.in',
    'barsy.info',
    'barsy.io',
    'barsy.me',
    'barsy.menu',
    'barsy.mobi',
    'barsy.net',
    'barsy.online',
    'barsy.org',
    'barsy.pro',
    'barsy.pub',
    'barsy.shop',
    'barsy.site',
    'barsy.support',
    'barsy.uk',
    '*.magentosite.cloud',
    'mayfirst.info',
    'mayfirst.org',
    'hb.cldmail.ru',
    'miniserver.com',
    'memset.net',
    'cloud.metacentrum.cz',
    'custom.metacentrum.cz',
    'flt.cloud.muni.cz',
    'usr.cloud.muni.cz',
    'meteorapp.com',
    'eu.meteorapp.com',
    'co.pl',
    'azurecontainer.io',
    'azurewebsites.net',
    'azure-mobile.net',
    'cloudapp.net',
    'mozilla-iot.org',
    'bmoattachments.org',
    'net.ru',
    'org.ru',
    'pp.ru',
    'bitballoon.com',
    'netlify.com',
    '4u.com',
    'ngrok.io',
    'nh-serv.co.uk',
    'nfshost.com',
    'dnsking.ch',
    'mypi.co',
    'n4t.co',
    '001www.com',
    'ddnslive.com',
    'myiphost.com',
    'forumz.info',
    '16-b.it',
    '32-b.it',
    '64-b.it',
    'soundcast.me',
    'tcp4.me',
    'dnsup.net',
    'hicam.net',
    'now-dns.net',
    'ownip.net',
    'vpndns.net',
    'dynserv.org',
    'now-dns.org',
    'x443.pw',
    'now-dns.top',
    'ntdll.top',
    'freeddns.us',
    'crafting.xyz',
    'zapto.xyz',
    'nsupdate.info',
    'nerdpol.ovh',
    'blogsyte.com',
    'brasilia.me',
    'cable-modem.org',
    'ciscofreak.com',
    'collegefan.org',
    'couchpotatofries.org',
    'damnserver.com',
    'ddns.me',
    'ditchyourip.com',
    'dnsfor.me',
    'dnsiskinky.com',
    'dvrcam.info',
    'dynns.com',
    'eating-organic.net',
    'fantasyleague.cc',
    'geekgalaxy.com',
    'golffan.us',
    'health-carereform.com',
    'homesecuritymac.com',
    'homesecuritypc.com',
    'hopto.me',
    'ilovecollege.info',
    'loginto.me',
    'mlbfan.org',
    'mmafan.biz',
    'myactivedirectory.com',
    'mydissent.net',
    'myeffect.net',
    'mymediapc.net',
    'mypsx.net',
    'mysecuritycamera.com',
    'mysecuritycamera.net',
    'mysecuritycamera.org',
    'net-freaks.com',
    'nflfan.org',
    'nhlfan.net',
    'no-ip.ca',
    'no-ip.co.uk',
    'no-ip.net',
    'noip.us',
    'onthewifi.com',
    'pgafan.net',
    'point2this.com',
    'pointto.us',
    'privatizehealthinsurance.net',
    'quicksytes.com',
    'read-books.org',
    'securitytactics.com',
    'serveexchange.com',
    'servehumour.com',
    'servep2p.com',
    'servesarcasm.com',
    'stufftoread.com',
    'ufcfan.org',
    'unusualperson.com',
    'workisboring.com',
    '3utilities.com',
    'bounceme.net',
    'ddns.net',
    'ddnsking.com',
    'gotdns.ch',
    'hopto.org',
    'myftp.biz',
    'myftp.org',
    'myvnc.com',
    'no-ip.biz',
    'no-ip.info',
    'no-ip.org',
    'noip.me',
    'redirectme.net',
    'servebeer.com',
    'serveblog.net',
    'servecounterstrike.com',
    'serveftp.com',
    'servegame.com',
    'servehalflife.com',
    'servehttp.com',
    'serveirc.com',
    'serveminecraft.net',
    'servemp3.com',
    'servepics.com',
    'servequake.com',
    'sytes.net',
    'webhop.me',
    'zapto.org',
    'stage.nodeart.io',
    'nodum.co',
    'nodum.io',
    'pcloud.host',
    'nyc.mn',
    'nom.ae',
    'nom.af',
    'nom.ai',
    'nom.al',
    'nym.by',
    'nym.bz',
    'nom.cl',
    'nom.gd',
    'nom.ge',
    'nom.gl',
    'nym.gr',
    'nom.gt',
    'nym.gy',
    'nom.hn',
    'nym.ie',
    'nom.im',
    'nom.ke',
    'nym.kz',
    'nym.la',
    'nym.lc',
    'nom.li',
    'nym.li',
    'nym.lt',
    'nym.lu',
    'nym.me',
    'nom.mk',
    'nym.mn',
    'nym.mx',
    'nom.nu',
    'nym.nz',
    'nym.pe',
    'nym.pt',
    'nom.pw',
    'nom.qa',
    'nym.ro',
    'nom.rs',
    'nom.si',
    'nym.sk',
    'nom.st',
    'nym.su',
    'nym.sx',
    'nom.tj',
    'nym.tw',
    'nom.ug',
    'nom.uy',
    'nom.vc',
    'nom.vg',
    'cya.gg',
    'cloudycluster.net',
    'nid.io',
    'opencraft.hosting',
    'operaunite.com',
    'outsystemscloud.com',
    'ownprovider.com',
    'own.pm',
    'ox.rs',
    'oy.lc',
    'pgfog.com',
    'pagefrontapp.com',
    'art.pl',
    'gliwice.pl',
    'krakow.pl',
    'poznan.pl',
    'wroc.pl',
    'zakopane.pl',
    'pantheonsite.io',
    'gotpantheon.com',
    'mypep.link',
    'on-web.fr',
    '*.platform.sh',
    '*.platformsh.site',
    'xen.prgmr.com',
    'priv.at',
    'protonet.io',
    'chirurgiens-dentistes-en-france.fr',
    'byen.site',
    'ras.ru',
    'qa2.com',
    'dev-myqnapcloud.com',
    'alpha-myqnapcloud.com',
    'myqnapcloud.com',
    '*.quipelements.com',
    'vapor.cloud',
    'vaporcloud.io',
    'rackmaze.com',
    'rackmaze.net',
    'rhcloud.com',
    'resindevice.io',
    'devices.resinstaging.io',
    'hzc.io',
    'wellbeingzone.eu',
    'ptplus.fit',
    'wellbeingzone.co.uk',
    'sandcats.io',
    'logoip.de',
    'logoip.com',
    'schokokeks.net',
    'scrysec.com',
    'firewall-gateway.com',
    'firewall-gateway.de',
    'my-gateway.de',
    'my-router.de',
    'spdns.de',
    'spdns.eu',
    'firewall-gateway.net',
    'my-firewall.org',
    'myfirewall.org',
    'spdns.org',
    '*.s5y.io',
    '*.sensiosite.cloud',
    'biz.ua',
    'co.ua',
    'pp.ua',
    'shiftedit.io',
    'myshopblocks.com',
    '1kapp.com',
    'appchizi.com',
    'applinzi.com',
    'sinaapp.com',
    'vipsinaapp.com',
    'bounty-full.com',
    'alpha.bounty-full.com',
    'beta.bounty-full.com',
    'static.land',
    'dev.static.land',
    'sites.static.land',
    'apps.lair.io',
    '*.stolos.io',
    'spacekit.io',
    'customer.speedpartner.de',
    'storj.farm',
    'utwente.io',
    'temp-dns.com',
    'diskstation.me',
    'dscloud.biz',
    'dscloud.me',
    'dscloud.mobi',
    'dsmynas.com',
    'dsmynas.net',
    'dsmynas.org',
    'familyds.com',
    'familyds.net',
    'familyds.org',
    'i234.me',
    'myds.me',
    'synology.me',
    'vpnplus.to',
    'taifun-dns.de',
    'gda.pl',
    'gdansk.pl',
    'gdynia.pl',
    'med.pl',
    'sopot.pl',
    'gwiddle.co.uk',
    'cust.dev.thingdust.io',
    'cust.disrec.thingdust.io',
    'cust.prod.thingdust.io',
    'cust.testing.thingdust.io',
    'bloxcms.com',
    'townnews-staging.com',
    '12hp.at',
    '2ix.at',
    '4lima.at',
    'lima-city.at',
    '12hp.ch',
    '2ix.ch',
    '4lima.ch',
    'lima-city.ch',
    'trafficplex.cloud',
    'de.cool',
    '12hp.de',
    '2ix.de',
    '4lima.de',
    'lima-city.de',
    '1337.pictures',
    'clan.rip',
    'lima-city.rocks',
    'webspace.rocks',
    'lima.zone',
    '*.transurl.be',
    '*.transurl.eu',
    '*.transurl.nl',
    'tuxfamily.org',
    'dd-dns.de',
    'diskstation.eu',
    'diskstation.org',
    'dray-dns.de',
    'draydns.de',
    'dyn-vpn.de',
    'dynvpn.de',
    'mein-vigor.de',
    'my-vigor.de',
    'my-wan.de',
    'syno-ds.de',
    'synology-diskstation.de',
    'synology-ds.de',
    'uber.space',
    '*.uberspace.de',
    'hk.com',
    'hk.org',
    'ltd.hk',
    'inc.hk',
    'virtualuser.de',
    'virtual-user.de',
    'lib.de.us',
    '2038.io',
    'router.management',
    'v-info.info',
    'wedeploy.io',
    'wedeploy.me',
    'wedeploy.sh',
    'remotewd.com',
    'wmflabs.org',
    'half.host',
    'xnbay.com',
    'u2.xnbay.com',
    'u2-local.xnbay.com',
    'cistron.nl',
    'demon.nl',
    'xs4all.space',
    'official.academy',
    'yolasite.com',
    'ybo.faith',
    'yombo.me',
    'homelink.one',
    'ybo.party',
    'ybo.review',
    'ybo.science',
    'ybo.trade',
    'nohost.me',
    'noho.st',
    'za.net',
    'za.org',
    'now.sh',
    'zone.id'
  ];

  var rules$1 = /*#__PURE__*/ Object.freeze({
    default: rules
  });

  var require$$0$1 = getCjsExportFromNamespace(rules$1);

  var psl = createCommonjsModule(function(module, exports) {
    var internals = {};

    //
    // Read rules from file.
    //
    internals.rules = require$$0$1.map(function(rule) {
      return {
        rule: rule,
        suffix: rule.replace(/^(\*\.|\!)/, ''),
        punySuffix: -1,
        wildcard: rule.charAt(0) === '*',
        exception: rule.charAt(0) === '!'
      };
    });

    //
    // Check is given string ends with `suffix`.
    //
    internals.endsWith = function(str, suffix) {
      return str.indexOf(suffix, str.length - suffix.length) !== -1;
    };

    //
    // Find rule for a given domain.
    //
    internals.findRule = function(domain) {
      var punyDomain = require$$4.toASCII(domain);
      return internals.rules.reduce(function(memo, rule) {
        if (rule.punySuffix === -1) {
          rule.punySuffix = require$$4.toASCII(rule.suffix);
        }
        if (
          !internals.endsWith(punyDomain, '.' + rule.punySuffix) &&
          punyDomain !== rule.punySuffix
        ) {
          return memo;
        }
        // This has been commented out as it never seems to run. This is because
        // sub tlds always appear after their parents and we never find a shorter
        // match.
        //if (memo) {
        //  var memoSuffix = Punycode.toASCII(memo.suffix);
        //  if (memoSuffix.length >= punySuffix.length) {
        //    return memo;
        //  }
        //}
        return rule;
      }, null);
    };

    //
    // Error codes and messages.
    //
    exports.errorCodes = {
      DOMAIN_TOO_SHORT: 'Domain name too short.',
      DOMAIN_TOO_LONG:
        'Domain name too long. It should be no more than 255 chars.',
      LABEL_STARTS_WITH_DASH: 'Domain name label can not start with a dash.',
      LABEL_ENDS_WITH_DASH: 'Domain name label can not end with a dash.',
      LABEL_TOO_LONG: 'Domain name label should be at most 63 chars long.',
      LABEL_TOO_SHORT: 'Domain name label should be at least 1 character long.',
      LABEL_INVALID_CHARS:
        'Domain name label can only contain alphanumeric characters or dashes.'
    };

    //
    // Validate domain name and throw if not valid.
    //
    // From wikipedia:
    //
    // Hostnames are composed of series of labels concatenated with dots, as are all
    // domain names. Each label must be between 1 and 63 characters long, and the
    // entire hostname (including the delimiting dots) has a maximum of 255 chars.
    //
    // Allowed chars:
    //
    // * `a-z`
    // * `0-9`
    // * `-` but not as a starting or ending character
    // * `.` as a separator for the textual portions of a domain name
    //
    // * http://en.wikipedia.org/wiki/Domain_name
    // * http://en.wikipedia.org/wiki/Hostname
    //
    internals.validate = function(input) {
      // Before we can validate we need to take care of IDNs with unicode chars.
      var ascii = require$$4.toASCII(input);

      if (ascii.length < 1) {
        return 'DOMAIN_TOO_SHORT';
      }
      if (ascii.length > 255) {
        return 'DOMAIN_TOO_LONG';
      }

      // Check each part's length and allowed chars.
      var labels = ascii.split('.');
      var label;

      for (var i = 0; i < labels.length; ++i) {
        label = labels[i];
        if (!label.length) {
          return 'LABEL_TOO_SHORT';
        }
        if (label.length > 63) {
          return 'LABEL_TOO_LONG';
        }
        if (label.charAt(0) === '-') {
          return 'LABEL_STARTS_WITH_DASH';
        }
        if (label.charAt(label.length - 1) === '-') {
          return 'LABEL_ENDS_WITH_DASH';
        }
        if (!/^[a-z0-9\-]+$/.test(label)) {
          return 'LABEL_INVALID_CHARS';
        }
      }
    };

    //
    // Public API
    //

    //
    // Parse domain.
    //
    exports.parse = function(input) {
      if (typeof input !== 'string') {
        throw new TypeError('Domain name must be a string.');
      }

      // Force domain to lowercase.
      var domain = input.slice(0).toLowerCase();

      // Handle FQDN.
      // TODO: Simply remove trailing dot?
      if (domain.charAt(domain.length - 1) === '.') {
        domain = domain.slice(0, domain.length - 1);
      }

      // Validate and sanitise input.
      var error = internals.validate(domain);
      if (error) {
        return {
          input: input,
          error: {
            message: exports.errorCodes[error],
            code: error
          }
        };
      }

      var parsed = {
        input: input,
        tld: null,
        sld: null,
        domain: null,
        subdomain: null,
        listed: false
      };

      var domainParts = domain.split('.');

      // Non-Internet TLD
      if (domainParts[domainParts.length - 1] === 'local') {
        return parsed;
      }

      var handlePunycode = function() {
        if (!/xn--/.test(domain)) {
          return parsed;
        }
        if (parsed.domain) {
          parsed.domain = require$$4.toASCII(parsed.domain);
        }
        if (parsed.subdomain) {
          parsed.subdomain = require$$4.toASCII(parsed.subdomain);
        }
        return parsed;
      };

      var rule = internals.findRule(domain);

      // Unlisted tld.
      if (!rule) {
        if (domainParts.length < 2) {
          return parsed;
        }
        parsed.tld = domainParts.pop();
        parsed.sld = domainParts.pop();
        parsed.domain = [parsed.sld, parsed.tld].join('.');
        if (domainParts.length) {
          parsed.subdomain = domainParts.pop();
        }
        return handlePunycode();
      }

      // At this point we know the public suffix is listed.
      parsed.listed = true;

      var tldParts = rule.suffix.split('.');
      var privateParts = domainParts.slice(
        0,
        domainParts.length - tldParts.length
      );

      if (rule.exception) {
        privateParts.push(tldParts.shift());
      }

      parsed.tld = tldParts.join('.');

      if (!privateParts.length) {
        return handlePunycode();
      }

      if (rule.wildcard) {
        tldParts.unshift(privateParts.pop());
        parsed.tld = tldParts.join('.');
      }

      if (!privateParts.length) {
        return handlePunycode();
      }

      parsed.sld = privateParts.pop();
      parsed.domain = [parsed.sld, parsed.tld].join('.');

      if (privateParts.length) {
        parsed.subdomain = privateParts.join('.');
      }

      return handlePunycode();
    };

    //
    // Get domain.
    //
    exports.get = function(domain) {
      if (!domain) {
        return null;
      }
      return exports.parse(domain).domain || null;
    };

    //
    // Check whether domain belongs to a known public suffix.
    //
    exports.isValid = function(domain) {
      var parsed = exports.parse(domain);
      return Boolean(parsed.domain && parsed.listed);
    };
  });
  var psl_1 = psl.errorCodes;
  var psl_2 = psl.parse;
  var psl_3 = psl.get;
  var psl_4 = psl.isValid;

  function getPublicSuffix(domain) {
    return psl.get(domain);
  }

  var getPublicSuffix_1 = getPublicSuffix;

  var pubsuffixPsl = {
    getPublicSuffix: getPublicSuffix_1
  };

  /*!
   * Copyright (c) 2015, Salesforce.com, Inc.
   * All rights reserved.
   *
   * Redistribution and use in source and binary forms, with or without
   * modification, are permitted provided that the following conditions are met:
   *
   * 1. Redistributions of source code must retain the above copyright notice,
   * this list of conditions and the following disclaimer.
   *
   * 2. Redistributions in binary form must reproduce the above copyright notice,
   * this list of conditions and the following disclaimer in the documentation
   * and/or other materials provided with the distribution.
   *
   * 3. Neither the name of Salesforce.com nor the names of its contributors may
   * be used to endorse or promote products derived from this software without
   * specific prior written permission.
   *
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
   * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
   * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
   * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
   * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
   * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
   * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
   * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
   * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
   * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
   * POSSIBILITY OF SUCH DAMAGE.
   */
  /*jshint unused:false */

  function Store() {}
  var Store_1 = Store;

  // Stores may be synchronous, but are still required to use a
  // Continuation-Passing Style API.  The CookieJar itself will expose a "*Sync"
  // API that converts from synchronous-callbacks to imperative style.
  Store.prototype.synchronous = false;

  Store.prototype.findCookie = function(domain, path, key, cb) {
    throw new Error('findCookie is not implemented');
  };

  Store.prototype.findCookies = function(domain, path, cb) {
    throw new Error('findCookies is not implemented');
  };

  Store.prototype.putCookie = function(cookie, cb) {
    throw new Error('putCookie is not implemented');
  };

  Store.prototype.updateCookie = function(oldCookie, newCookie, cb) {
    // recommended default implementation:
    // return this.putCookie(newCookie, cb);
    throw new Error('updateCookie is not implemented');
  };

  Store.prototype.removeCookie = function(domain, path, key, cb) {
    throw new Error('removeCookie is not implemented');
  };

  Store.prototype.removeCookies = function(domain, path, cb) {
    throw new Error('removeCookies is not implemented');
  };

  Store.prototype.removeAllCookies = function(cb) {
    throw new Error('removeAllCookies is not implemented');
  };

  Store.prototype.getAllCookies = function(cb) {
    throw new Error(
      'getAllCookies is not implemented (therefore jar cannot be serialized)'
    );
  };

  var store = {
    Store: Store_1
  };

  // Gives the permutation of all possible domainMatch()es of a given domain. The
  // array is in shortest-to-longest order.  Handy for indexing.
  function permuteDomain(domain) {
    var pubSuf = pubsuffixPsl.getPublicSuffix(domain);
    if (!pubSuf) {
      return null;
    }
    if (pubSuf == domain) {
      return [domain];
    }

    var prefix = domain.slice(0, -(pubSuf.length + 1)); // ".example.com"
    var parts = prefix.split('.').reverse();
    var cur = pubSuf;
    var permutations = [cur];
    while (parts.length) {
      cur = parts.shift() + '.' + cur;
      permutations.push(cur);
    }
    return permutations;
  }

  var permuteDomain_2 = permuteDomain;

  var permuteDomain_1 = {
    permuteDomain: permuteDomain_2
  };

  /*!
   * Copyright (c) 2015, Salesforce.com, Inc.
   * All rights reserved.
   *
   * Redistribution and use in source and binary forms, with or without
   * modification, are permitted provided that the following conditions are met:
   *
   * 1. Redistributions of source code must retain the above copyright notice,
   * this list of conditions and the following disclaimer.
   *
   * 2. Redistributions in binary form must reproduce the above copyright notice,
   * this list of conditions and the following disclaimer in the documentation
   * and/or other materials provided with the distribution.
   *
   * 3. Neither the name of Salesforce.com nor the names of its contributors may
   * be used to endorse or promote products derived from this software without
   * specific prior written permission.
   *
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
   * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
   * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
   * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
   * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
   * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
   * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
   * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
   * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
   * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
   * POSSIBILITY OF SUCH DAMAGE.
   */
  /*
   * "A request-path path-matches a given cookie-path if at least one of the
   * following conditions holds:"
   */
  function pathMatch(reqPath, cookiePath) {
    // "o  The cookie-path and the request-path are identical."
    if (cookiePath === reqPath) {
      return true;
    }

    var idx = reqPath.indexOf(cookiePath);
    if (idx === 0) {
      // "o  The cookie-path is a prefix of the request-path, and the last
      // character of the cookie-path is %x2F ("/")."
      if (cookiePath.substr(-1) === '/') {
        return true;
      }

      // " o  The cookie-path is a prefix of the request-path, and the first
      // character of the request-path that is not included in the cookie- path
      // is a %x2F ("/") character."
      if (reqPath.substr(cookiePath.length, 1) === '/') {
        return true;
      }
    }

    return false;
  }

  var pathMatch_2 = pathMatch;

  var pathMatch_1 = {
    pathMatch: pathMatch_2
  };

  var Store$1 = store.Store;
  var permuteDomain$1 = permuteDomain_1.permuteDomain;
  var pathMatch$1 = pathMatch_1.pathMatch;

  function MemoryCookieStore() {
    Store$1.call(this);
    this.idx = {};
  }
  util.inherits(MemoryCookieStore, Store$1);
  var MemoryCookieStore_1 = MemoryCookieStore;
  MemoryCookieStore.prototype.idx = null;

  // Since it's just a struct in RAM, this Store is synchronous
  MemoryCookieStore.prototype.synchronous = true;

  // force a default depth:
  MemoryCookieStore.prototype.inspect = function() {
    return '{ idx: ' + util.inspect(this.idx, false, 2) + ' }';
  };

  // Use the new custom inspection symbol to add the custom inspect function if
  // available.
  if (util.inspect.custom) {
    MemoryCookieStore.prototype[util.inspect.custom] =
      MemoryCookieStore.prototype.inspect;
  }

  MemoryCookieStore.prototype.findCookie = function(domain, path, key, cb) {
    if (!this.idx[domain]) {
      return cb(null, undefined);
    }
    if (!this.idx[domain][path]) {
      return cb(null, undefined);
    }
    return cb(null, this.idx[domain][path][key] || null);
  };

  MemoryCookieStore.prototype.findCookies = function(domain, path, cb) {
    var results = [];
    if (!domain) {
      return cb(null, []);
    }

    var pathMatcher;
    if (!path) {
      // null means "all paths"
      pathMatcher = function matchAll(domainIndex) {
        for (var curPath in domainIndex) {
          var pathIndex = domainIndex[curPath];
          for (var key in pathIndex) {
            results.push(pathIndex[key]);
          }
        }
      };
    } else {
      pathMatcher = function matchRFC(domainIndex) {
        //NOTE: we should use path-match algorithm from S5.1.4 here
        //(see : https://github.com/ChromiumWebApps/chromium/blob/b3d3b4da8bb94c1b2e061600df106d590fda3620/net/cookies/canonical_cookie.cc#L299)
        Object.keys(domainIndex).forEach(function(cookiePath) {
          if (pathMatch$1(path, cookiePath)) {
            var pathIndex = domainIndex[cookiePath];

            for (var key in pathIndex) {
              results.push(pathIndex[key]);
            }
          }
        });
      };
    }

    var domains = permuteDomain$1(domain) || [domain];
    var idx = this.idx;
    domains.forEach(function(curDomain) {
      var domainIndex = idx[curDomain];
      if (!domainIndex) {
        return;
      }
      pathMatcher(domainIndex);
    });

    cb(null, results);
  };

  MemoryCookieStore.prototype.putCookie = function(cookie, cb) {
    if (!this.idx[cookie.domain]) {
      this.idx[cookie.domain] = {};
    }
    if (!this.idx[cookie.domain][cookie.path]) {
      this.idx[cookie.domain][cookie.path] = {};
    }
    this.idx[cookie.domain][cookie.path][cookie.key] = cookie;
    cb(null);
  };

  MemoryCookieStore.prototype.updateCookie = function(
    oldCookie,
    newCookie,
    cb
  ) {
    // updateCookie() may avoid updating cookies that are identical.  For example,
    // lastAccessed may not be important to some stores and an equality
    // comparison could exclude that field.
    this.putCookie(newCookie, cb);
  };

  MemoryCookieStore.prototype.removeCookie = function(domain, path, key, cb) {
    if (
      this.idx[domain] &&
      this.idx[domain][path] &&
      this.idx[domain][path][key]
    ) {
      delete this.idx[domain][path][key];
    }
    cb(null);
  };

  MemoryCookieStore.prototype.removeCookies = function(domain, path, cb) {
    if (this.idx[domain]) {
      if (path) {
        delete this.idx[domain][path];
      } else {
        delete this.idx[domain];
      }
    }
    return cb(null);
  };

  MemoryCookieStore.prototype.removeAllCookies = function(cb) {
    this.idx = {};
    return cb(null);
  };

  MemoryCookieStore.prototype.getAllCookies = function(cb) {
    var cookies = [];
    var idx = this.idx;

    var domains = Object.keys(idx);
    domains.forEach(function(domain) {
      var paths = Object.keys(idx[domain]);
      paths.forEach(function(path) {
        var keys = Object.keys(idx[domain][path]);
        keys.forEach(function(key) {
          if (key !== null) {
            cookies.push(idx[domain][path][key]);
          }
        });
      });
    });

    // Sort by creationIndex so deserializing retains the creation order.
    // When implementing your own store, this SHOULD retain the order too
    cookies.sort(function(a, b) {
      return (a.creationIndex || 0) - (b.creationIndex || 0);
    });

    cb(null, cookies);
  };

  var memstore = {
    MemoryCookieStore: MemoryCookieStore_1
  };

  // generated by genversion
  var version$2 = '2.5.0';

  var urlParse$1 = require$$0.parse;

  var Store$2 = store.Store;
  var MemoryCookieStore$1 = memstore.MemoryCookieStore;
  var pathMatch$2 = pathMatch_1.pathMatch;

  var punycode;
  try {
    punycode = require$$4;
  } catch (e) {
    console.warn(
      "tough-cookie: can't load punycode; won't use punycode for domain normalization"
    );
  }

  // From RFC6265 S4.1.1
  // note that it excludes \x3B ";"
  var COOKIE_OCTETS = /^[\x21\x23-\x2B\x2D-\x3A\x3C-\x5B\x5D-\x7E]+$/;

  var CONTROL_CHARS = /[\x00-\x1F]/;

  // From Chromium // '\r', '\n' and '\0' should be treated as a terminator in
  // the "relaxed" mode, see:
  // https://github.com/ChromiumWebApps/chromium/blob/b3d3b4da8bb94c1b2e061600df106d590fda3620/net/cookies/parsed_cookie.cc#L60
  var TERMINATORS = ['\n', '\r', '\0'];

  // RFC6265 S4.1.1 defines path value as 'any CHAR except CTLs or ";"'
  // Note ';' is \x3B
  var PATH_VALUE = /[\x20-\x3A\x3C-\x7E]+/;

  // date-time parsing constants (RFC6265 S5.1.1)

  var DATE_DELIM = /[\x09\x20-\x2F\x3B-\x40\x5B-\x60\x7B-\x7E]/;

  var MONTH_TO_NUM = {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dec: 11
  };
  var NUM_TO_MONTH = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  var NUM_TO_DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  var MAX_TIME = 2147483647000; // 31-bit max
  var MIN_TIME = 0; // 31-bit min

  /*
   * Parses a Natural number (i.e., non-negative integer) with either the
   *    <min>*<max>DIGIT ( non-digit *OCTET )
   * or
   *    <min>*<max>DIGIT
   * grammar (RFC6265 S5.1.1).
   *
   * The "trailingOK" boolean controls if the grammar accepts a
   * "( non-digit *OCTET )" trailer.
   */
  function parseDigits(token, minDigits, maxDigits, trailingOK) {
    var count = 0;
    while (count < token.length) {
      var c = token.charCodeAt(count);
      // "non-digit = %x00-2F / %x3A-FF"
      if (c <= 0x2f || c >= 0x3a) {
        break;
      }
      count++;
    }

    // constrain to a minimum and maximum number of digits.
    if (count < minDigits || count > maxDigits) {
      return null;
    }

    if (!trailingOK && count != token.length) {
      return null;
    }

    return parseInt(token.substr(0, count), 10);
  }

  function parseTime(token) {
    var parts = token.split(':');
    var result = [0, 0, 0];

    /* RF6256 S5.1.1:
     *      time            = hms-time ( non-digit *OCTET )
     *      hms-time        = time-field ":" time-field ":" time-field
     *      time-field      = 1*2DIGIT
     */

    if (parts.length !== 3) {
      return null;
    }

    for (var i = 0; i < 3; i++) {
      // "time-field" must be strictly "1*2DIGIT", HOWEVER, "hms-time" can be
      // followed by "( non-digit *OCTET )" so therefore the last time-field can
      // have a trailer
      var trailingOK = i == 2;
      var num = parseDigits(parts[i], 1, 2, trailingOK);
      if (num === null) {
        return null;
      }
      result[i] = num;
    }

    return result;
  }

  function parseMonth(token) {
    token = String(token)
      .substr(0, 3)
      .toLowerCase();
    var num = MONTH_TO_NUM[token];
    return num >= 0 ? num : null;
  }

  /*
   * RFC6265 S5.1.1 date parser (see RFC for full grammar)
   */
  function parseDate(str) {
    if (!str) {
      return;
    }

    /* RFC6265 S5.1.1:
     * 2. Process each date-token sequentially in the order the date-tokens
     * appear in the cookie-date
     */
    var tokens = str.split(DATE_DELIM);
    if (!tokens) {
      return;
    }

    var hour = null;
    var minute = null;
    var second = null;
    var dayOfMonth = null;
    var month = null;
    var year = null;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i].trim();
      if (!token.length) {
        continue;
      }

      var result;

      /* 2.1. If the found-time flag is not set and the token matches the time
       * production, set the found-time flag and set the hour- value,
       * minute-value, and second-value to the numbers denoted by the digits in
       * the date-token, respectively.  Skip the remaining sub-steps and continue
       * to the next date-token.
       */
      if (second === null) {
        result = parseTime(token);
        if (result) {
          hour = result[0];
          minute = result[1];
          second = result[2];
          continue;
        }
      }

      /* 2.2. If the found-day-of-month flag is not set and the date-token matches
       * the day-of-month production, set the found-day-of- month flag and set
       * the day-of-month-value to the number denoted by the date-token.  Skip
       * the remaining sub-steps and continue to the next date-token.
       */
      if (dayOfMonth === null) {
        // "day-of-month = 1*2DIGIT ( non-digit *OCTET )"
        result = parseDigits(token, 1, 2, true);
        if (result !== null) {
          dayOfMonth = result;
          continue;
        }
      }

      /* 2.3. If the found-month flag is not set and the date-token matches the
       * month production, set the found-month flag and set the month-value to
       * the month denoted by the date-token.  Skip the remaining sub-steps and
       * continue to the next date-token.
       */
      if (month === null) {
        result = parseMonth(token);
        if (result !== null) {
          month = result;
          continue;
        }
      }

      /* 2.4. If the found-year flag is not set and the date-token matches the
       * year production, set the found-year flag and set the year-value to the
       * number denoted by the date-token.  Skip the remaining sub-steps and
       * continue to the next date-token.
       */
      if (year === null) {
        // "year = 2*4DIGIT ( non-digit *OCTET )"
        result = parseDigits(token, 2, 4, true);
        if (result !== null) {
          year = result;
          /* From S5.1.1:
           * 3.  If the year-value is greater than or equal to 70 and less
           * than or equal to 99, increment the year-value by 1900.
           * 4.  If the year-value is greater than or equal to 0 and less
           * than or equal to 69, increment the year-value by 2000.
           */
          if (year >= 70 && year <= 99) {
            year += 1900;
          } else if (year >= 0 && year <= 69) {
            year += 2000;
          }
        }
      }
    }

    /* RFC 6265 S5.1.1
     * "5. Abort these steps and fail to parse the cookie-date if:
     *     *  at least one of the found-day-of-month, found-month, found-
     *        year, or found-time flags is not set,
     *     *  the day-of-month-value is less than 1 or greater than 31,
     *     *  the year-value is less than 1601,
     *     *  the hour-value is greater than 23,
     *     *  the minute-value is greater than 59, or
     *     *  the second-value is greater than 59.
     *     (Note that leap seconds cannot be represented in this syntax.)"
     *
     * So, in order as above:
     */
    if (
      dayOfMonth === null ||
      month === null ||
      year === null ||
      second === null ||
      dayOfMonth < 1 ||
      dayOfMonth > 31 ||
      year < 1601 ||
      hour > 23 ||
      minute > 59 ||
      second > 59
    ) {
      return;
    }

    return new Date(Date.UTC(year, month, dayOfMonth, hour, minute, second));
  }

  function formatDate(date) {
    var d = date.getUTCDate();
    d = d >= 10 ? d : '0' + d;
    var h = date.getUTCHours();
    h = h >= 10 ? h : '0' + h;
    var m = date.getUTCMinutes();
    m = m >= 10 ? m : '0' + m;
    var s = date.getUTCSeconds();
    s = s >= 10 ? s : '0' + s;
    return (
      NUM_TO_DAY[date.getUTCDay()] +
      ', ' +
      d +
      ' ' +
      NUM_TO_MONTH[date.getUTCMonth()] +
      ' ' +
      date.getUTCFullYear() +
      ' ' +
      h +
      ':' +
      m +
      ':' +
      s +
      ' GMT'
    );
  }

  // S5.1.2 Canonicalized Host Names
  function canonicalDomain(str) {
    if (str == null) {
      return null;
    }
    str = str.trim().replace(/^\./, ''); // S4.1.2.3 & S5.2.3: ignore leading .

    // convert to IDN if any non-ASCII characters
    if (punycode && /[^\u0001-\u007f]/.test(str)) {
      str = punycode.toASCII(str);
    }

    return str.toLowerCase();
  }

  // S5.1.3 Domain Matching
  function domainMatch(str, domStr, canonicalize) {
    if (str == null || domStr == null) {
      return null;
    }
    if (canonicalize !== false) {
      str = canonicalDomain(str);
      domStr = canonicalDomain(domStr);
    }

    /*
     * "The domain string and the string are identical. (Note that both the
     * domain string and the string will have been canonicalized to lower case at
     * this point)"
     */
    if (str == domStr) {
      return true;
    }

    /* "All of the following [three] conditions hold:" (order adjusted from the RFC) */

    /* "* The string is a host name (i.e., not an IP address)." */
    if (net.isIP(str)) {
      return false;
    }

    /* "* The domain string is a suffix of the string" */
    var idx = str.indexOf(domStr);
    if (idx <= 0) {
      return false; // it's a non-match (-1) or prefix (0)
    }

    // e.g "a.b.c".indexOf("b.c") === 2
    // 5 === 3+2
    if (str.length !== domStr.length + idx) {
      // it's not a suffix
      return false;
    }

    /* "* The last character of the string that is not included in the domain
     * string is a %x2E (".") character." */
    if (str.substr(idx - 1, 1) !== '.') {
      return false;
    }

    return true;
  }

  // RFC6265 S5.1.4 Paths and Path-Match

  /*
   * "The user agent MUST use an algorithm equivalent to the following algorithm
   * to compute the default-path of a cookie:"
   *
   * Assumption: the path (and not query part or absolute uri) is passed in.
   */
  function defaultPath(path) {
    // "2. If the uri-path is empty or if the first character of the uri-path is not
    // a %x2F ("/") character, output %x2F ("/") and skip the remaining steps.
    if (!path || path.substr(0, 1) !== '/') {
      return '/';
    }

    // "3. If the uri-path contains no more than one %x2F ("/") character, output
    // %x2F ("/") and skip the remaining step."
    if (path === '/') {
      return path;
    }

    var rightSlash = path.lastIndexOf('/');
    if (rightSlash === 0) {
      return '/';
    }

    // "4. Output the characters of the uri-path from the first character up to,
    // but not including, the right-most %x2F ("/")."
    return path.slice(0, rightSlash);
  }

  function trimTerminator(str) {
    for (var t = 0; t < TERMINATORS.length; t++) {
      var terminatorIdx = str.indexOf(TERMINATORS[t]);
      if (terminatorIdx !== -1) {
        str = str.substr(0, terminatorIdx);
      }
    }

    return str;
  }

  function parseCookiePair(cookiePair, looseMode) {
    cookiePair = trimTerminator(cookiePair);

    var firstEq = cookiePair.indexOf('=');
    if (looseMode) {
      if (firstEq === 0) {
        // '=' is immediately at start
        cookiePair = cookiePair.substr(1);
        firstEq = cookiePair.indexOf('='); // might still need to split on '='
      }
    } else {
      // non-loose mode
      if (firstEq <= 0) {
        // no '=' or is at start
        return; // needs to have non-empty "cookie-name"
      }
    }

    var cookieName, cookieValue;
    if (firstEq <= 0) {
      cookieName = '';
      cookieValue = cookiePair.trim();
    } else {
      cookieName = cookiePair.substr(0, firstEq).trim();
      cookieValue = cookiePair.substr(firstEq + 1).trim();
    }

    if (CONTROL_CHARS.test(cookieName) || CONTROL_CHARS.test(cookieValue)) {
      return;
    }

    var c = new Cookie();
    c.key = cookieName;
    c.value = cookieValue;
    return c;
  }

  function parse$2(str, options) {
    if (!options || typeof options !== 'object') {
      options = {};
    }
    str = str.trim();

    // We use a regex to parse the "name-value-pair" part of S5.2
    var firstSemi = str.indexOf(';'); // S5.2 step 1
    var cookiePair = firstSemi === -1 ? str : str.substr(0, firstSemi);
    var c = parseCookiePair(cookiePair, !!options.loose);
    if (!c) {
      return;
    }

    if (firstSemi === -1) {
      return c;
    }

    // S5.2.3 "unparsed-attributes consist of the remainder of the set-cookie-string
    // (including the %x3B (";") in question)." plus later on in the same section
    // "discard the first ";" and trim".
    var unparsed = str.slice(firstSemi + 1).trim();

    // "If the unparsed-attributes string is empty, skip the rest of these
    // steps."
    if (unparsed.length === 0) {
      return c;
    }

    /*
     * S5.2 says that when looping over the items "[p]rocess the attribute-name
     * and attribute-value according to the requirements in the following
     * subsections" for every item.  Plus, for many of the individual attributes
     * in S5.3 it says to use the "attribute-value of the last attribute in the
     * cookie-attribute-list".  Therefore, in this implementation, we overwrite
     * the previous value.
     */
    var cookie_avs = unparsed.split(';');
    while (cookie_avs.length) {
      var av = cookie_avs.shift().trim();
      if (av.length === 0) {
        // happens if ";;" appears
        continue;
      }
      var av_sep = av.indexOf('=');
      var av_key, av_value;

      if (av_sep === -1) {
        av_key = av;
        av_value = null;
      } else {
        av_key = av.substr(0, av_sep);
        av_value = av.substr(av_sep + 1);
      }

      av_key = av_key.trim().toLowerCase();

      if (av_value) {
        av_value = av_value.trim();
      }

      switch (av_key) {
        case 'expires': // S5.2.1
          if (av_value) {
            var exp = parseDate(av_value);
            // "If the attribute-value failed to parse as a cookie date, ignore the
            // cookie-av."
            if (exp) {
              // over and underflow not realistically a concern: V8's getTime() seems to
              // store something larger than a 32-bit time_t (even with 32-bit node)
              c.expires = exp;
            }
          }
          break;

        case 'max-age': // S5.2.2
          if (av_value) {
            // "If the first character of the attribute-value is not a DIGIT or a "-"
            // character ...[or]... If the remainder of attribute-value contains a
            // non-DIGIT character, ignore the cookie-av."
            if (/^-?[0-9]+$/.test(av_value)) {
              var delta = parseInt(av_value, 10);
              // "If delta-seconds is less than or equal to zero (0), let expiry-time
              // be the earliest representable date and time."
              c.setMaxAge(delta);
            }
          }
          break;

        case 'domain': // S5.2.3
          // "If the attribute-value is empty, the behavior is undefined.  However,
          // the user agent SHOULD ignore the cookie-av entirely."
          if (av_value) {
            // S5.2.3 "Let cookie-domain be the attribute-value without the leading %x2E
            // (".") character."
            var domain = av_value.trim().replace(/^\./, '');
            if (domain) {
              // "Convert the cookie-domain to lower case."
              c.domain = domain.toLowerCase();
            }
          }
          break;

        case 'path': // S5.2.4
          /*
           * "If the attribute-value is empty or if the first character of the
           * attribute-value is not %x2F ("/"):
           *   Let cookie-path be the default-path.
           * Otherwise:
           *   Let cookie-path be the attribute-value."
           *
           * We'll represent the default-path as null since it depends on the
           * context of the parsing.
           */
          c.path = av_value && av_value[0] === '/' ? av_value : null;
          break;

        case 'secure': // S5.2.5
          /*
           * "If the attribute-name case-insensitively matches the string "Secure",
           * the user agent MUST append an attribute to the cookie-attribute-list
           * with an attribute-name of Secure and an empty attribute-value."
           */
          c.secure = true;
          break;

        case 'httponly': // S5.2.6 -- effectively the same as 'secure'
          c.httpOnly = true;
          break;

        default:
          c.extensions = c.extensions || [];
          c.extensions.push(av);
          break;
      }
    }

    return c;
  }

  // avoid the V8 deoptimization monster!
  function jsonParse(str) {
    var obj;
    try {
      obj = JSON.parse(str);
    } catch (e) {
      return e;
    }
    return obj;
  }

  function fromJSON(str) {
    if (!str) {
      return null;
    }

    var obj;
    if (typeof str === 'string') {
      obj = jsonParse(str);
      if (obj instanceof Error) {
        return null;
      }
    } else {
      // assume it's an Object
      obj = str;
    }

    var c = new Cookie();
    for (var i = 0; i < Cookie.serializableProperties.length; i++) {
      var prop = Cookie.serializableProperties[i];
      if (obj[prop] === undefined || obj[prop] === Cookie.prototype[prop]) {
        continue; // leave as prototype default
      }

      if (
        prop === 'expires' ||
        prop === 'creation' ||
        prop === 'lastAccessed'
      ) {
        if (obj[prop] === null) {
          c[prop] = null;
        } else {
          c[prop] = obj[prop] == 'Infinity' ? 'Infinity' : new Date(obj[prop]);
        }
      } else {
        c[prop] = obj[prop];
      }
    }

    return c;
  }

  /* Section 5.4 part 2:
   * "*  Cookies with longer paths are listed before cookies with
   *     shorter paths.
   *
   *  *  Among cookies that have equal-length path fields, cookies with
   *     earlier creation-times are listed before cookies with later
   *     creation-times."
   */

  function cookieCompare(a, b) {
    var cmp = 0;

    // descending for length: b CMP a
    var aPathLen = a.path ? a.path.length : 0;
    var bPathLen = b.path ? b.path.length : 0;
    cmp = bPathLen - aPathLen;
    if (cmp !== 0) {
      return cmp;
    }

    // ascending for time: a CMP b
    var aTime = a.creation ? a.creation.getTime() : MAX_TIME;
    var bTime = b.creation ? b.creation.getTime() : MAX_TIME;
    cmp = aTime - bTime;
    if (cmp !== 0) {
      return cmp;
    }

    // break ties for the same millisecond (precision of JavaScript's clock)
    cmp = a.creationIndex - b.creationIndex;

    return cmp;
  }

  // Gives the permutation of all possible pathMatch()es of a given path. The
  // array is in longest-to-shortest order.  Handy for indexing.
  function permutePath(path) {
    if (path === '/') {
      return ['/'];
    }
    if (path.lastIndexOf('/') === path.length - 1) {
      path = path.substr(0, path.length - 1);
    }
    var permutations = [path];
    while (path.length > 1) {
      var lindex = path.lastIndexOf('/');
      if (lindex === 0) {
        break;
      }
      path = path.substr(0, lindex);
      permutations.push(path);
    }
    permutations.push('/');
    return permutations;
  }

  function getCookieContext(url) {
    if (url instanceof Object) {
      return url;
    }
    // NOTE: decodeURI will throw on malformed URIs (see GH-32).
    // Therefore, we will just skip decoding for such URIs.
    try {
      url = decodeURI(url);
    } catch (err) {
      // Silently swallow error
    }

    return urlParse$1(url);
  }

  function Cookie(options) {
    options = options || {};

    Object.keys(options).forEach(function(prop) {
      if (
        Cookie.prototype.hasOwnProperty(prop) &&
        Cookie.prototype[prop] !== options[prop] &&
        prop.substr(0, 1) !== '_'
      ) {
        this[prop] = options[prop];
      }
    }, this);

    this.creation = this.creation || new Date();

    // used to break creation ties in cookieCompare():
    Object.defineProperty(this, 'creationIndex', {
      configurable: false,
      enumerable: false, // important for assert.deepEqual checks
      writable: true,
      value: ++Cookie.cookiesCreated
    });
  }

  Cookie.cookiesCreated = 0; // incremented each time a cookie is created

  Cookie.parse = parse$2;
  Cookie.fromJSON = fromJSON;

  Cookie.prototype.key = '';
  Cookie.prototype.value = '';

  // the order in which the RFC has them:
  Cookie.prototype.expires = 'Infinity'; // coerces to literal Infinity
  Cookie.prototype.maxAge = null; // takes precedence over expires for TTL
  Cookie.prototype.domain = null;
  Cookie.prototype.path = null;
  Cookie.prototype.secure = false;
  Cookie.prototype.httpOnly = false;
  Cookie.prototype.extensions = null;

  // set by the CookieJar:
  Cookie.prototype.hostOnly = null; // boolean when set
  Cookie.prototype.pathIsDefault = null; // boolean when set
  Cookie.prototype.creation = null; // Date when set; defaulted by Cookie.parse
  Cookie.prototype.lastAccessed = null; // Date when set
  Object.defineProperty(Cookie.prototype, 'creationIndex', {
    configurable: true,
    enumerable: false,
    writable: true,
    value: 0
  });

  Cookie.serializableProperties = Object.keys(Cookie.prototype).filter(function(
    prop
  ) {
    return !(
      Cookie.prototype[prop] instanceof Function ||
      prop === 'creationIndex' ||
      prop.substr(0, 1) === '_'
    );
  });

  Cookie.prototype.inspect = function inspect() {
    var now = Date.now();
    return (
      'Cookie="' +
      this.toString() +
      '; hostOnly=' +
      (this.hostOnly != null ? this.hostOnly : '?') +
      '; aAge=' +
      (this.lastAccessed ? now - this.lastAccessed.getTime() + 'ms' : '?') +
      '; cAge=' +
      (this.creation ? now - this.creation.getTime() + 'ms' : '?') +
      '"'
    );
  };

  // Use the new custom inspection symbol to add the custom inspect function if
  // available.
  if (util.inspect.custom) {
    Cookie.prototype[util.inspect.custom] = Cookie.prototype.inspect;
  }

  Cookie.prototype.toJSON = function() {
    var obj = {};

    var props = Cookie.serializableProperties;
    for (var i = 0; i < props.length; i++) {
      var prop = props[i];
      if (this[prop] === Cookie.prototype[prop]) {
        continue; // leave as prototype default
      }

      if (
        prop === 'expires' ||
        prop === 'creation' ||
        prop === 'lastAccessed'
      ) {
        if (this[prop] === null) {
          obj[prop] = null;
        } else {
          obj[prop] =
            this[prop] == 'Infinity' // intentionally not ===
              ? 'Infinity'
              : this[prop].toISOString();
        }
      } else if (prop === 'maxAge') {
        if (this[prop] !== null) {
          // again, intentionally not ===
          obj[prop] =
            this[prop] == Infinity || this[prop] == -Infinity
              ? this[prop].toString()
              : this[prop];
        }
      } else {
        if (this[prop] !== Cookie.prototype[prop]) {
          obj[prop] = this[prop];
        }
      }
    }

    return obj;
  };

  Cookie.prototype.clone = function() {
    return fromJSON(this.toJSON());
  };

  Cookie.prototype.validate = function validate() {
    if (!COOKIE_OCTETS.test(this.value)) {
      return false;
    }
    if (
      this.expires != Infinity &&
      !(this.expires instanceof Date) &&
      !parseDate(this.expires)
    ) {
      return false;
    }
    if (this.maxAge != null && this.maxAge <= 0) {
      return false; // "Max-Age=" non-zero-digit *DIGIT
    }
    if (this.path != null && !PATH_VALUE.test(this.path)) {
      return false;
    }

    var cdomain = this.cdomain();
    if (cdomain) {
      if (cdomain.match(/\.$/)) {
        return false; // S4.1.2.3 suggests that this is bad. domainMatch() tests confirm this
      }
      var suffix = pubsuffixPsl.getPublicSuffix(cdomain);
      if (suffix == null) {
        // it's a public suffix
        return false;
      }
    }
    return true;
  };

  Cookie.prototype.setExpires = function setExpires(exp) {
    if (exp instanceof Date) {
      this.expires = exp;
    } else {
      this.expires = parseDate(exp) || 'Infinity';
    }
  };

  Cookie.prototype.setMaxAge = function setMaxAge(age) {
    if (age === Infinity || age === -Infinity) {
      this.maxAge = age.toString(); // so JSON.stringify() works
    } else {
      this.maxAge = age;
    }
  };

  // gives Cookie header format
  Cookie.prototype.cookieString = function cookieString() {
    var val = this.value;
    if (val == null) {
      val = '';
    }
    if (this.key === '') {
      return val;
    }
    return this.key + '=' + val;
  };

  // gives Set-Cookie header format
  Cookie.prototype.toString = function toString() {
    var str = this.cookieString();

    if (this.expires != Infinity) {
      if (this.expires instanceof Date) {
        str += '; Expires=' + formatDate(this.expires);
      } else {
        str += '; Expires=' + this.expires;
      }
    }

    if (this.maxAge != null && this.maxAge != Infinity) {
      str += '; Max-Age=' + this.maxAge;
    }

    if (this.domain && !this.hostOnly) {
      str += '; Domain=' + this.domain;
    }
    if (this.path) {
      str += '; Path=' + this.path;
    }

    if (this.secure) {
      str += '; Secure';
    }
    if (this.httpOnly) {
      str += '; HttpOnly';
    }
    if (this.extensions) {
      this.extensions.forEach(function(ext) {
        str += '; ' + ext;
      });
    }

    return str;
  };

  // TTL() partially replaces the "expiry-time" parts of S5.3 step 3 (setCookie()
  // elsewhere)
  // S5.3 says to give the "latest representable date" for which we use Infinity
  // For "expired" we use 0
  Cookie.prototype.TTL = function TTL(now) {
    /* RFC6265 S4.1.2.2 If a cookie has both the Max-Age and the Expires
     * attribute, the Max-Age attribute has precedence and controls the
     * expiration date of the cookie.
     * (Concurs with S5.3 step 3)
     */
    if (this.maxAge != null) {
      return this.maxAge <= 0 ? 0 : this.maxAge * 1000;
    }

    var expires = this.expires;
    if (expires != Infinity) {
      if (!(expires instanceof Date)) {
        expires = parseDate(expires) || Infinity;
      }

      if (expires == Infinity) {
        return Infinity;
      }

      return expires.getTime() - (now || Date.now());
    }

    return Infinity;
  };

  // expiryTime() replaces the "expiry-time" parts of S5.3 step 3 (setCookie()
  // elsewhere)
  Cookie.prototype.expiryTime = function expiryTime(now) {
    if (this.maxAge != null) {
      var relativeTo = now || this.creation || new Date();
      var age = this.maxAge <= 0 ? -Infinity : this.maxAge * 1000;
      return relativeTo.getTime() + age;
    }

    if (this.expires == Infinity) {
      return Infinity;
    }
    return this.expires.getTime();
  };

  // expiryDate() replaces the "expiry-time" parts of S5.3 step 3 (setCookie()
  // elsewhere), except it returns a Date
  Cookie.prototype.expiryDate = function expiryDate(now) {
    var millisec = this.expiryTime(now);
    if (millisec == Infinity) {
      return new Date(MAX_TIME);
    } else if (millisec == -Infinity) {
      return new Date(MIN_TIME);
    } else {
      return new Date(millisec);
    }
  };

  // This replaces the "persistent-flag" parts of S5.3 step 3
  Cookie.prototype.isPersistent = function isPersistent() {
    return this.maxAge != null || this.expires != Infinity;
  };

  // Mostly S5.1.2 and S5.2.3:
  Cookie.prototype.cdomain = Cookie.prototype.canonicalizedDomain = function canonicalizedDomain() {
    if (this.domain == null) {
      return null;
    }
    return canonicalDomain(this.domain);
  };

  function CookieJar(store, options) {
    if (typeof options === 'boolean') {
      options = { rejectPublicSuffixes: options };
    } else if (options == null) {
      options = {};
    }
    if (options.rejectPublicSuffixes != null) {
      this.rejectPublicSuffixes = options.rejectPublicSuffixes;
    }
    if (options.looseMode != null) {
      this.enableLooseMode = options.looseMode;
    }

    if (!store) {
      store = new MemoryCookieStore$1();
    }
    this.store = store;
  }
  CookieJar.prototype.store = null;
  CookieJar.prototype.rejectPublicSuffixes = true;
  CookieJar.prototype.enableLooseMode = false;
  var CAN_BE_SYNC = [];

  CAN_BE_SYNC.push('setCookie');
  CookieJar.prototype.setCookie = function(cookie, url, options, cb) {
    var err;
    var context = getCookieContext(url);
    if (options instanceof Function) {
      cb = options;
      options = {};
    }

    var host = canonicalDomain(context.hostname);
    var loose = this.enableLooseMode;
    if (options.loose != null) {
      loose = options.loose;
    }

    // S5.3 step 1
    if (!(cookie instanceof Cookie)) {
      cookie = Cookie.parse(cookie, { loose: loose });
    }
    if (!cookie) {
      err = new Error('Cookie failed to parse');
      return cb(options.ignoreError ? null : err);
    }

    // S5.3 step 2
    var now = options.now || new Date(); // will assign later to save effort in the face of errors

    // S5.3 step 3: NOOP; persistent-flag and expiry-time is handled by getCookie()

    // S5.3 step 4: NOOP; domain is null by default

    // S5.3 step 5: public suffixes
    if (this.rejectPublicSuffixes && cookie.domain) {
      var suffix = pubsuffixPsl.getPublicSuffix(cookie.cdomain());
      if (suffix == null) {
        // e.g. "com"
        err = new Error('Cookie has domain set to a public suffix');
        return cb(options.ignoreError ? null : err);
      }
    }

    // S5.3 step 6:
    if (cookie.domain) {
      if (!domainMatch(host, cookie.cdomain(), false)) {
        err = new Error(
          "Cookie not in this host's domain. Cookie:" +
            cookie.cdomain() +
            ' Request:' +
            host
        );
        return cb(options.ignoreError ? null : err);
      }

      if (cookie.hostOnly == null) {
        // don't reset if already set
        cookie.hostOnly = false;
      }
    } else {
      cookie.hostOnly = true;
      cookie.domain = host;
    }

    //S5.2.4 If the attribute-value is empty or if the first character of the
    //attribute-value is not %x2F ("/"):
    //Let cookie-path be the default-path.
    if (!cookie.path || cookie.path[0] !== '/') {
      cookie.path = defaultPath(context.pathname);
      cookie.pathIsDefault = true;
    }

    // S5.3 step 8: NOOP; secure attribute
    // S5.3 step 9: NOOP; httpOnly attribute

    // S5.3 step 10
    if (options.http === false && cookie.httpOnly) {
      err = new Error("Cookie is HttpOnly and this isn't an HTTP API");
      return cb(options.ignoreError ? null : err);
    }

    var store = this.store;

    if (!store.updateCookie) {
      store.updateCookie = function(oldCookie, newCookie, cb) {
        this.putCookie(newCookie, cb);
      };
    }

    function withCookie(err, oldCookie) {
      if (err) {
        return cb(err);
      }

      var next = function(err) {
        if (err) {
          return cb(err);
        } else {
          cb(null, cookie);
        }
      };

      if (oldCookie) {
        // S5.3 step 11 - "If the cookie store contains a cookie with the same name,
        // domain, and path as the newly created cookie:"
        if (options.http === false && oldCookie.httpOnly) {
          // step 11.2
          err = new Error("old Cookie is HttpOnly and this isn't an HTTP API");
          return cb(options.ignoreError ? null : err);
        }
        cookie.creation = oldCookie.creation; // step 11.3
        cookie.creationIndex = oldCookie.creationIndex; // preserve tie-breaker
        cookie.lastAccessed = now;
        // Step 11.4 (delete cookie) is implied by just setting the new one:
        store.updateCookie(oldCookie, cookie, next); // step 12
      } else {
        cookie.creation = cookie.lastAccessed = now;
        store.putCookie(cookie, next); // step 12
      }
    }

    store.findCookie(cookie.domain, cookie.path, cookie.key, withCookie);
  };

  // RFC6365 S5.4
  CAN_BE_SYNC.push('getCookies');
  CookieJar.prototype.getCookies = function(url, options, cb) {
    var context = getCookieContext(url);
    if (options instanceof Function) {
      cb = options;
      options = {};
    }

    var host = canonicalDomain(context.hostname);
    var path = context.pathname || '/';

    var secure = options.secure;
    if (
      secure == null &&
      context.protocol &&
      (context.protocol == 'https:' || context.protocol == 'wss:')
    ) {
      secure = true;
    }

    var http = options.http;
    if (http == null) {
      http = true;
    }

    var now = options.now || Date.now();
    var expireCheck = options.expire !== false;
    var allPaths = !!options.allPaths;
    var store = this.store;

    function matchingCookie(c) {
      // "Either:
      //   The cookie's host-only-flag is true and the canonicalized
      //   request-host is identical to the cookie's domain.
      // Or:
      //   The cookie's host-only-flag is false and the canonicalized
      //   request-host domain-matches the cookie's domain."
      if (c.hostOnly) {
        if (c.domain != host) {
          return false;
        }
      } else {
        if (!domainMatch(host, c.domain, false)) {
          return false;
        }
      }

      // "The request-uri's path path-matches the cookie's path."
      if (!allPaths && !pathMatch$2(path, c.path)) {
        return false;
      }

      // "If the cookie's secure-only-flag is true, then the request-uri's
      // scheme must denote a "secure" protocol"
      if (c.secure && !secure) {
        return false;
      }

      // "If the cookie's http-only-flag is true, then exclude the cookie if the
      // cookie-string is being generated for a "non-HTTP" API"
      if (c.httpOnly && !http) {
        return false;
      }

      // deferred from S5.3
      // non-RFC: allow retention of expired cookies by choice
      if (expireCheck && c.expiryTime() <= now) {
        store.removeCookie(c.domain, c.path, c.key, function() {}); // result ignored
        return false;
      }

      return true;
    }

    store.findCookies(host, allPaths ? null : path, function(err, cookies) {
      if (err) {
        return cb(err);
      }

      cookies = cookies.filter(matchingCookie);

      // sorting of S5.4 part 2
      if (options.sort !== false) {
        cookies = cookies.sort(cookieCompare);
      }

      // S5.4 part 3
      var now = new Date();
      cookies.forEach(function(c) {
        c.lastAccessed = now;
      });
      // TODO persist lastAccessed

      cb(null, cookies);
    });
  };

  CAN_BE_SYNC.push('getCookieString');
  CookieJar.prototype.getCookieString = function(/*..., cb*/) {
    var args = Array.prototype.slice.call(arguments, 0);
    var cb = args.pop();
    var next = function(err, cookies) {
      if (err) {
        cb(err);
      } else {
        cb(
          null,
          cookies
            .sort(cookieCompare)
            .map(function(c) {
              return c.cookieString();
            })
            .join('; ')
        );
      }
    };
    args.push(next);
    this.getCookies.apply(this, args);
  };

  CAN_BE_SYNC.push('getSetCookieStrings');
  CookieJar.prototype.getSetCookieStrings = function(/*..., cb*/) {
    var args = Array.prototype.slice.call(arguments, 0);
    var cb = args.pop();
    var next = function(err, cookies) {
      if (err) {
        cb(err);
      } else {
        cb(
          null,
          cookies.map(function(c) {
            return c.toString();
          })
        );
      }
    };
    args.push(next);
    this.getCookies.apply(this, args);
  };

  CAN_BE_SYNC.push('serialize');
  CookieJar.prototype.serialize = function(cb) {
    var type = this.store.constructor.name;
    if (type === 'Object') {
      type = null;
    }

    // update README.md "Serialization Format" if you change this, please!
    var serialized = {
      // The version of tough-cookie that serialized this jar. Generally a good
      // practice since future versions can make data import decisions based on
      // known past behavior. When/if this matters, use `semver`.
      version: 'tough-cookie@' + version$2,

      // add the store type, to make humans happy:
      storeType: type,

      // CookieJar configuration:
      rejectPublicSuffixes: !!this.rejectPublicSuffixes,

      // this gets filled from getAllCookies:
      cookies: []
    };

    if (
      !(
        this.store.getAllCookies &&
        typeof this.store.getAllCookies === 'function'
      )
    ) {
      return cb(
        new Error(
          'store does not support getAllCookies and cannot be serialized'
        )
      );
    }

    this.store.getAllCookies(function(err, cookies) {
      if (err) {
        return cb(err);
      }

      serialized.cookies = cookies.map(function(cookie) {
        // convert to serialized 'raw' cookies
        cookie = cookie instanceof Cookie ? cookie.toJSON() : cookie;

        // Remove the index so new ones get assigned during deserialization
        delete cookie.creationIndex;

        return cookie;
      });

      return cb(null, serialized);
    });
  };

  // well-known name that JSON.stringify calls
  CookieJar.prototype.toJSON = function() {
    return this.serializeSync();
  };

  // use the class method CookieJar.deserialize instead of calling this directly
  CAN_BE_SYNC.push('_importCookies');
  CookieJar.prototype._importCookies = function(serialized, cb) {
    var jar = this;
    var cookies = serialized.cookies;
    if (!cookies || !Array.isArray(cookies)) {
      return cb(new Error('serialized jar has no cookies array'));
    }
    cookies = cookies.slice(); // do not modify the original

    function putNext(err) {
      if (err) {
        return cb(err);
      }

      if (!cookies.length) {
        return cb(err, jar);
      }

      var cookie;
      try {
        cookie = fromJSON(cookies.shift());
      } catch (e) {
        return cb(e);
      }

      if (cookie === null) {
        return putNext(null); // skip this cookie
      }

      jar.store.putCookie(cookie, putNext);
    }

    putNext();
  };

  CookieJar.deserialize = function(strOrObj, store, cb) {
    if (arguments.length !== 3) {
      // store is optional
      cb = store;
      store = null;
    }

    var serialized;
    if (typeof strOrObj === 'string') {
      serialized = jsonParse(strOrObj);
      if (serialized instanceof Error) {
        return cb(serialized);
      }
    } else {
      serialized = strOrObj;
    }

    var jar = new CookieJar(store, serialized.rejectPublicSuffixes);
    jar._importCookies(serialized, function(err) {
      if (err) {
        return cb(err);
      }
      cb(null, jar);
    });
  };

  CookieJar.deserializeSync = function(strOrObj, store) {
    var serialized =
      typeof strOrObj === 'string' ? JSON.parse(strOrObj) : strOrObj;
    var jar = new CookieJar(store, serialized.rejectPublicSuffixes);

    // catch this mistake early:
    if (!jar.store.synchronous) {
      throw new Error(
        'CookieJar store is not synchronous; use async API instead.'
      );
    }

    jar._importCookiesSync(serialized);
    return jar;
  };
  CookieJar.fromJSON = CookieJar.deserializeSync;

  CookieJar.prototype.clone = function(newStore, cb) {
    if (arguments.length === 1) {
      cb = newStore;
      newStore = null;
    }

    this.serialize(function(err, serialized) {
      if (err) {
        return cb(err);
      }
      CookieJar.deserialize(serialized, newStore, cb);
    });
  };

  CAN_BE_SYNC.push('removeAllCookies');
  CookieJar.prototype.removeAllCookies = function(cb) {
    var store = this.store;

    // Check that the store implements its own removeAllCookies(). The default
    // implementation in Store will immediately call the callback with a "not
    // implemented" Error.
    if (
      store.removeAllCookies instanceof Function &&
      store.removeAllCookies !== Store$2.prototype.removeAllCookies
    ) {
      return store.removeAllCookies(cb);
    }

    store.getAllCookies(function(err, cookies) {
      if (err) {
        return cb(err);
      }

      if (cookies.length === 0) {
        return cb(null);
      }

      var completedCount = 0;
      var removeErrors = [];

      function removeCookieCb(removeErr) {
        if (removeErr) {
          removeErrors.push(removeErr);
        }

        completedCount++;

        if (completedCount === cookies.length) {
          return cb(removeErrors.length ? removeErrors[0] : null);
        }
      }

      cookies.forEach(function(cookie) {
        store.removeCookie(
          cookie.domain,
          cookie.path,
          cookie.key,
          removeCookieCb
        );
      });
    });
  };

  CookieJar.prototype._cloneSync = syncWrap('clone');
  CookieJar.prototype.cloneSync = function(newStore) {
    if (!newStore.synchronous) {
      throw new Error(
        'CookieJar clone destination store is not synchronous; use async API instead.'
      );
    }
    return this._cloneSync(newStore);
  };

  // Use a closure to provide a true imperative API for synchronous stores.
  function syncWrap(method) {
    return function() {
      if (!this.store.synchronous) {
        throw new Error(
          'CookieJar store is not synchronous; use async API instead.'
        );
      }

      var args = Array.prototype.slice.call(arguments);
      var syncErr, syncResult;
      args.push(function syncCb(err, result) {
        syncErr = err;
        syncResult = result;
      });
      this[method].apply(this, args);

      if (syncErr) {
        throw syncErr;
      }
      return syncResult;
    };
  }

  // wrap all declared CAN_BE_SYNC methods in the sync wrapper
  CAN_BE_SYNC.forEach(function(method) {
    CookieJar.prototype[method + 'Sync'] = syncWrap(method);
  });

  var version$3 = version$2;
  var CookieJar_1 = CookieJar;
  var Cookie_1 = Cookie;
  var Store_1$1 = Store$2;
  var MemoryCookieStore_1$1 = MemoryCookieStore$1;
  var parseDate_1 = parseDate;
  var formatDate_1 = formatDate;
  var parse_1 = parse$2;
  var fromJSON_1 = fromJSON;
  var domainMatch_1 = domainMatch;
  var defaultPath_1 = defaultPath;
  var pathMatch_1$1 = pathMatch$2;
  var getPublicSuffix$1 = pubsuffixPsl.getPublicSuffix;
  var cookieCompare_1 = cookieCompare;
  var permuteDomain$2 = permuteDomain_1.permuteDomain;
  var permutePath_1 = permutePath;
  var canonicalDomain_1 = canonicalDomain;

  var cookie = {
    version: version$3,
    CookieJar: CookieJar_1,
    Cookie: Cookie_1,
    Store: Store_1$1,
    MemoryCookieStore: MemoryCookieStore_1$1,
    parseDate: parseDate_1,
    formatDate: formatDate_1,
    parse: parse_1,
    fromJSON: fromJSON_1,
    domainMatch: domainMatch_1,
    defaultPath: defaultPath_1,
    pathMatch: pathMatch_1$1,
    getPublicSuffix: getPublicSuffix$1,
    cookieCompare: cookieCompare_1,
    permuteDomain: permuteDomain$2,
    permutePath: permutePath_1,
    canonicalDomain: canonicalDomain_1
  };

  var cRequest;

  var CognosRequest = (function() {
    function CognosRequest(url, debug, timeout) {
      _classCallCheck(this, CognosRequest);

      if (url.substr(-1) !== '/') {
        url = url + '/';
      }

      this.url = url;
      this.debug = debug;
      this.token = '';
      this.loggedin = false;
      this.namespace = '';
      this.namespaces = [];
      this.timeout = timeout;
    }

    _createClass(CognosRequest, [
      {
        key: 'log',
        value: function log(text, object) {
          if (this.debug) {
            if (object) {
              console.log(text, object);
            } else {
              console.log(text);
            }
          }
        }
      },
      {
        key: 'error',
        value: function error(text, object) {
          if (this.debug) {
            if (object) {
              console.error(text, object);
            } else {
              console.error(text);
            }
          }
        }
      },
      {
        key: 'initialise',
        value: function initialise() {
          var loggedout =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : false;
          var me = this;
          var cookieJar = false;
          var firstheaders = {};
          this.axios = axios$1.create({
            timeout: me.timeout,
            maxRedirects: 10,
            maxContentLength: 50 * 1000 * 1000
          });

          if (Utils.isNode()) {
            noop$1(this.axios);
            var cookieJar = new cookie.CookieJar();
            me.cookies = cookieJar;
            me.log('CookieJar is set', cookieJar);
          } else {
            if (me.token == '') {
              var rawcookies = document.cookie.split(';');
              var goon = true;
              rawcookies.forEach(function(rawcookie) {
                var cookie$1 = cookie.parse(rawcookie);

                if (typeof cookie$1 != 'undefined') {
                  if (
                    cookie$1.key == 'X-XSRF-TOKEN' ||
                    cookie$1.key == 'XSRF-TOKEN'
                  ) {
                    if (cookie$1.value != 'undefined' || cookie$1.value != '') {
                      me.token = cookie$1.value;
                    }
                  } else {
                    me.log('deleting cookie' + cookie$1.key);
                    goon = loggedout;
                  }
                }
              });

              if (!goon) {
                result = this['delete']('bi/v1/login').then(function() {
                  me.loggedin = false;
                  return me.initialise(true);
                });
                return result;
              }
            }

            if (me.token) {
              firstheaders = {
                'X-XSRF-TOKEN': me.token,
                'Content-Type': 'application/json; charset=UTF-8'
              };
            } else {
              noop$1(this.axios);
              var cookieJar = new cookie.CookieJar();
              me.cookies = cookieJar;
            }
          }

          var result = this.axios
            .get(me.url + 'bi/v1/login', {
              jar: cookieJar,
              withCredentials: false,
              headers: firstheaders
            })
            .then(function() {
              me.log('Unexpected success');
              return me;
            })
            ['catch'](function(err) {
              if (
                typeof err.response === 'undefined' ||
                err.response.status !== 441
              ) {
                me.log('Unexpected Error in initialise', err);
                throw err.message;
              }

              me.log('Expected Error in initialise');

              if (Utils.isNode() && typeof cookieJar !== 'undefined') {
                me.log('Cookiejar', cookieJar);
                var cookieurl = me.url + 'bi';
                cookieurl = me.url + 'bi';
                me.log('cookie url: ' + cookieurl);
                var cookies = cookieJar.getCookies(
                  cookieurl,
                  {
                    allPaths: true
                  },
                  function(err, cookies) {
                    cookies.forEach(function(cook) {
                      me.log('cook: ', cook);
                      me.log('cookie key: ' + cook.key);

                      if (cook.key.toUpperCase() == 'XSRF-TOKEN') {
                        me.log('cookie value: ', cook.value);
                        me.token = cook.value;
                        me.log('token: ' + me.token);
                        cookieJar.setCookie(
                          'XSRF-TOKEN=' + me.token,
                          cookieurl,
                          function() {
                            cookieJar.setCookie(
                              'X-XSRF-TOKEN=' + me.token,
                              cookieurl,
                              function() {
                                me.cookies = cookieJar;
                              }
                            );
                          }
                        );
                      }
                    });
                  }
                );
              }

              try {
                if (typeof err.response !== 'undefined') {
                  err.response.data.promptInfo.displayObjects.forEach(function(
                    item
                  ) {
                    if (item.name == 'CAMNamespace') {
                      me.namespace = item.value;
                      me.log('Default Namespace: ' + me.namespace);
                    }
                  });
                  var displayName = '';
                  err.response.data.promptInfo.displayObjects.forEach(function(
                    item
                  ) {
                    if (item.name == 'CAMNamespaceDisplayName') {
                      displayName = item.value;
                      me.log('Default Namespace Name: ' + displayName);
                    }
                  });

                  if (displayName) {
                    me.namespaces.push({
                      isDefault: true,
                      id: me.namespace,
                      value: displayName
                    });
                  }

                  if (!me.namespace) {
                    err.response.data.promptInfo.displayObjects[0].promptOptions.forEach(
                      function(item) {
                        if (item.isDefault) {
                          me.namespace = item.id;
                        }

                        me.namespaces.push(item);
                      }
                    );

                    if (!me.namespace) {
                      me.namespace = me.namespaces[0].id;
                    }
                  }
                } else {
                  throw err.message;
                }
              } catch (error) {
                me.error(error);
              }

              return me;
            });
          return result;
        }
      },
      {
        key: 'get',
        value: function get(path) {
          var me = this;
          var headers = {};
          me.log('get URL:    ' + me.url + path);

          if (!Utils.isNode) {
            document.cookie = 'XSRF-TOKEN=' + me.token;
          } else if (me.token) {
            headers['X-XSRF-TOKEN'] = me.token;
          }

          headers['X-Requested-With'] = 'XMLHttpRequest';
          headers['Content-Type'] = 'application/json; charset=UTF-8';
          var result = this.axios
            .get(me.url + path, {
              headers: headers,
              jar: me.cookies,
              withCredentials: true
            })
            .then(function(response) {
              if (typeof response !== 'undefined') {
                me.log('Get Response Data', response.data);
                return response.data;
              }

              return '';
            });
          return result;
        }
      },
      {
        key: 'post',
        value: function post(path, params, fullResponse) {
          var me = this;
          var paramsJSON = JSON.stringify(params);
          var result = {};
          var headers = {};
          me.log('params: ' + paramsJSON);
          me.log('token: ' + me.token);
          me.log('cookies: ', me.cookies);

          if (!Utils.isNode) {
            document.cookie = 'XSRF-TOKEN=' + me.token;
          } else if (me.token) {
            headers['X-XSRF-TOKEN'] = me.token;
          }

          headers['X-Requested-With'] = 'XMLHttpRequest';
          headers['Content-Type'] = 'application/json; charset=UTF-8';
          var result = this.axios
            .post(me.url + path, paramsJSON, {
              headers: headers,
              jar: me.cookies,
              withCredentials: true
            })
            .then(function(response) {
              me.log('CognosRequest : Success Posting');

              if (fullResponse && typeof response !== 'undefined') {
                result = response;
              } else {
                result = response.data;
              }

              return response;
            })
            ['catch'](function(err) {
              var errormessage = '';
              me.error('CognosRequest : Error in post', err);

              if (typeof err.response !== 'undefined') {
                if (typeof err.response.data.messages !== 'undefined') {
                  errormessage = err.response.data.messages[0].messageString;
                } else {
                  errormessage = err.response.data;
                }
              } else {
                errormessage = err.message;
              }

              me.error(err);

              if (
                errormessage != 'AAA-AUT-0011 Invalid namespace was selected.'
              ) {
                throw errormessage;
              }
            });
          return result;
        }
      },
      {
        key: 'delete',
        value: function _delete(path) {
          var params =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : {};
          var fullResponse =
            arguments.length > 2 && arguments[2] !== undefined
              ? arguments[2]
              : false;
          var me = this;
          var headers = {};
          var paramsJSON = JSON.stringify(params);
          var result = {};

          if (!Utils.isNode) {
            document.cookie = 'XSRF-TOKEN=' + me.token;
          } else if (me.token) {
            headers['X-XSRF-TOKEN'] = me.token;
          }

          headers['X-Requested-With'] = 'XMLHttpRequest';
          headers['Content-Type'] = 'application/json; charset=UTF-8';
          me.log('params: ' + paramsJSON);
          var result = this.axios['delete'](me.url + path, {
            data: paramsJSON,
            headers: headers,
            jar: me.cookies,
            withCredentials: true
          })
            .then(function(response) {
              me.log('CognosRequest : Success Deleting');

              if (fullResponse) {
                result = response;
              } else {
                try {
                  result = response.data;
                } catch (err) {
                  me.log('No valid JSON returned from delete request. ' + path);
                  result = response;
                }
              }

              return result;
            })
            ['catch'](function(err) {
              var errormessage = '';

              if (typeof err.response !== 'undefined') {
                if (err.response.status === 441) {
                  errormessage = 'Access Denied';
                }

                if (typeof err.response.data.messages !== 'undefined') {
                  if (err.response.data.messages.length > 0) {
                    errormessage = err.response.data.messages[0].messageString;
                  } else {
                    if (err.response.data.errorCodeString) {
                      errormessage = err.response.data.errorCodeString;
                    }
                  }
                } else {
                  errormessage = err.response.data;
                }
              } else {
                errormessage = err.message;
              }

              me.error(err);

              if (
                errormessage != 'AAA-AUT-0011 Invalid namespace was selected.'
              ) {
                throw errormessage;
              }
            });
          return result;
        }
      },
      {
        key: 'put',
        value: function put(path) {
          var filename =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : false;
          var data =
            arguments.length > 2 && arguments[2] !== undefined
              ? arguments[2]
              : {};
          var options = arguments.length > 3 ? arguments[3] : undefined;
          var me = this;
          var stream;
          var checkssl = options.checkssl ? options.checkssl : false;

          if (Utils.isStandardBrowserEnv()) {
            console.log(
              'The put function is not implemented for browser environments'
            );
            return false;
          }

          var headers = {};

          if (me.token) {
            me.log('Token: ' + me.token);
            headers['X-XSRF-TOKEN'] = me.token;
            headers['Cookie'] = 'XSRF-TOKEN=' + me.token;
          }

          headers['X-Requested-With'] = 'XMLHttpRequest';
          var url = me.url + path;

          if (filename) {
            headers['Content-Type'] = 'application/zip';

            var fs = require('fs');

            me.log('About to upload extension');
            me.log('File: ' + filename);
            me.log('To:', url);
            var result = false;

            var fs = require('fs');

            stream = fs.createReadStream(filename);
            stream.on('error', console.log);
          } else {
            headers['Content-Type'] = 'application/json';
            stream = data;
          }

          var axiosparams = {
            method: 'PUT',
            url: url,
            headers: headers,
            jar: me.cookies,
            withCredentials: true,
            data: stream
          };

          if (checkssl) {
            axiosparams.httpsAgent = new https.Agent({
              rejectUnauthorized: false
            });
          }

          var result = me
            .axios(axiosparams)
            .then(function(response) {
              me.log('CognosRequest : Success Putting ');
              return response.data;
            })
            ['catch'](function(err) {
              var errormessage = '';
              me.error('CognosRequest : Error in put', err);

              if (typeof err.response !== 'undefined') {
                if (typeof err.response.data.messages !== 'undefined') {
                  errormessage = err.response.data.messages[0].messageString;
                } else {
                  errormessage = err.response.data
                    ? err.response.data
                    : err.response.statusText;
                }
              } else {
                errormessage = err.message;
              }

              me.error(errormessage);

              if (
                errormessage != 'AAA-AUT-0011 Invalid namespace was selected.'
              ) {
                throw errormessage;
              }
            });
          return result;
        }
      },
      {
        key: 'uploadfilepart',
        value: function uploadfilepart(path, filename) {
          var me = this;

          if (Utils.isStandardBrowserEnv()) {
            console.log(
              'The uploadfile function is not implemented for browser environments'
            );
            return false;
          }

          var headers = {};

          if (me.token) {
            me.log('Token: ' + me.token);
            headers['X-XSRF-TOKEN'] = me.token;
            headers['Cookie'] = 'XSRF-TOKEN=' + me.token;
          }

          headers['X-Requested-With'] = 'XMLHttpRequest';
          headers['Content-Type'] = 'text/csv';

          var fs = require('fs');

          var url = me.url + path;
          me.log('About to upload data file');
          me.log('File: ' + filename);
          me.log('To:', url);
          var result = false;

          var fs = require('fs');

          var stream = fs.createReadStream(filename);
          stream.on('error', console.log);
          var result = me.axios
            .put(url, filename, {
              headers: headers,
              jar: me.cookies,
              withCredentials: true
            })
            .then(function(response) {
              me.log('CognosRequest : Success Putting ');
              return response.data;
            })
            ['catch'](function(err) {
              var errormessage = '';
              me.error('CognosRequest : Error in put', err);

              if (typeof err.response !== 'undefined') {
                if (typeof err.response.data.messages !== 'undefined') {
                  errormessage = err.response.data.messages[0].messageString;
                } else {
                  errormessage = err.response.data
                    ? err.response.data
                    : err.response.statusText;
                }
              } else {
                errormessage = err.message;
              }

              me.error(errormessage);

              if (
                errormessage != 'AAA-AUT-0011 Invalid namespace was selected.'
              ) {
                throw errormessage;
              }
            });
          return result;
        }
      },
      {
        key: 'uploadfilepartFinish',
        value: function uploadfilepartFinish(path) {
          var me = this;

          if (Utils.isStandardBrowserEnv()) {
            console.log(
              'The uploadfile function is not implemented for browser environments'
            );
            return false;
          }

          var headers = {};

          if (me.token) {
            me.log('Token: ' + me.token);
            headers['X-XSRF-TOKEN'] = me.token;
            headers['Cookie'] = 'XSRF-TOKEN=' + me.token;
          }

          headers['X-Requested-With'] = 'XMLHttpRequest';
          headers['Content-Type'] = 'application/json';
          headers['Content-Length'] = 0;
          var url = me.url + path;
          me.log('About to upload data file');
          me.log('To:', url);
          var result = false;
          var result = me.axios
            .put(url, false, {
              headers: headers,
              jar: me.cookies,
              withCredentials: true
            })
            .then(function(response) {
              me.log('CognosRequest : Success Putting ');
              me.log(response.data);
              return response.data;
            })
            ['catch'](function(err) {
              var errormessage = '';
              me.error('CognosRequest : Error in uploadfilepartFinish', err);

              if (typeof err.response !== 'undefined') {
                if (typeof err.response.data.messages !== 'undefined') {
                  errormessage = err.response.data.messages[0].messageString;
                } else {
                  errormessage = err.response.data
                    ? err.response.data
                    : err.response.statusText;
                }
              } else {
                errormessage = err.message;
              }

              me.error(errormessage);

              if (
                errormessage != 'AAA-AUT-0011 Invalid namespace was selected.'
              ) {
                throw errormessage;
              }
            });
          return result;
        }
      }
    ]);

    return CognosRequest;
  })();

  function getCognosRequest(url, debug) {
    var reset =
      arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var timeout = arguments.length > 3 ? arguments[3] : undefined;

    if (reset) {
      cRequest = undefined;
    }

    var result;

    if (typeof cRequest == 'undefined' || reset) {
      cRequest = new CognosRequest(url, debug, timeout);
      result = cRequest.initialise();
    } else {
      result = Promise.resolve(cRequest);
    }

    return result;
  }

  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.

  // resolves . and .. elements in a path array with directory names there
  // must be no slashes, empty elements, or device names (c:\) in the array
  // (so also no leading and trailing slashes - it does not distinguish
  // relative and absolute paths)
  function normalizeArray(parts, allowAboveRoot) {
    // if the path tries to go above the root, `up` ends up > 0
    var up = 0;
    for (var i = parts.length - 1; i >= 0; i--) {
      var last = parts[i];
      if (last === '.') {
        parts.splice(i, 1);
      } else if (last === '..') {
        parts.splice(i, 1);
        up++;
      } else if (up) {
        parts.splice(i, 1);
        up--;
      }
    }

    // if the path is allowed to go above the root, restore leading ..s
    if (allowAboveRoot) {
      for (; up--; up) {
        parts.unshift('..');
      }
    }

    return parts;
  }

  // Split a filename into [root, dir, basename, ext], unix version
  // 'root' is just a slash, or nothing.
  var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
  var splitPath = function(filename) {
    return splitPathRe.exec(filename).slice(1);
  };

  // path.resolve([from ...], to)
  // posix version
  function resolve() {
    var resolvedPath = '',
      resolvedAbsolute = false;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path = i >= 0 ? arguments[i] : '/';

      // Skip empty and invalid entries
      if (typeof path !== 'string') {
        throw new TypeError('Arguments to path.resolve must be strings');
      } else if (!path) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charAt(0) === '/';
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeArray(
      filter(resolvedPath.split('/'), function(p) {
        return !!p;
      }),
      !resolvedAbsolute
    ).join('/');

    return (resolvedAbsolute ? '/' : '') + resolvedPath || '.';
  }
  // path.normalize(path)
  // posix version
  function normalize(path) {
    var isPathAbsolute = isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

    // Normalize the path
    path = normalizeArray(
      filter(path.split('/'), function(p) {
        return !!p;
      }),
      !isPathAbsolute
    ).join('/');

    if (!path && !isPathAbsolute) {
      path = '.';
    }
    if (path && trailingSlash) {
      path += '/';
    }

    return (isPathAbsolute ? '/' : '') + path;
  }
  // posix version
  function isAbsolute(path) {
    return path.charAt(0) === '/';
  }

  // posix version
  function join() {
    var paths = Array.prototype.slice.call(arguments, 0);
    return normalize(
      filter(paths, function(p, index) {
        if (typeof p !== 'string') {
          throw new TypeError('Arguments to path.join must be strings');
        }
        return p;
      }).join('/')
    );
  }

  // path.relative(from, to)
  // posix version
  function relative(from, to) {
    from = resolve(from).substr(1);
    to = resolve(to).substr(1);

    function trim(arr) {
      var start = 0;
      for (; start < arr.length; start++) {
        if (arr[start] !== '') break;
      }

      var end = arr.length - 1;
      for (; end >= 0; end--) {
        if (arr[end] !== '') break;
      }

      if (start > end) return [];
      return arr.slice(start, end - start + 1);
    }

    var fromParts = trim(from.split('/'));
    var toParts = trim(to.split('/'));

    var length = Math.min(fromParts.length, toParts.length);
    var samePartsLength = length;
    for (var i = 0; i < length; i++) {
      if (fromParts[i] !== toParts[i]) {
        samePartsLength = i;
        break;
      }
    }

    var outputParts = [];
    for (var i = samePartsLength; i < fromParts.length; i++) {
      outputParts.push('..');
    }

    outputParts = outputParts.concat(toParts.slice(samePartsLength));

    return outputParts.join('/');
  }

  var sep = '/';
  var delimiter$1 = ':';

  function dirname(path) {
    var result = splitPath(path),
      root = result[0],
      dir = result[1];

    if (!root && !dir) {
      // No dirname whatsoever
      return '.';
    }

    if (dir) {
      // It has a dirname, strip trailing slash
      dir = dir.substr(0, dir.length - 1);
    }

    return root + dir;
  }

  function basename(path, ext) {
    var f = splitPath(path)[2];
    // TODO: make this comparison case-insensitive on windows?
    if (ext && f.substr(-1 * ext.length) === ext) {
      f = f.substr(0, f.length - ext.length);
    }
    return f;
  }

  function extname(path) {
    return splitPath(path)[3];
  }
  var require$$0$2 = {
    extname: extname,
    basename: basename,
    dirname: dirname,
    sep: sep,
    delimiter: delimiter$1,
    relative: relative,
    join: join,
    isAbsolute: isAbsolute,
    normalize: normalize,
    resolve: resolve
  };
  function filter(xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
      if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
  }

  // String.prototype.substr - negative index don't work in IE8
  var substr =
    'ab'.substr(-1) === 'b'
      ? function(str, start, len) {
          return str.substr(start, len);
        }
      : function(str, start, len) {
          if (start < 0) start = str.length + start;
          return str.substr(start, len);
        };
  var concatMap = function(xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
      var x = fn(xs[i], i);
      if (isArray$4(x)) res.push.apply(res, x);
      else res.push(x);
    }
    return res;
  };

  var isArray$4 =
    Array.isArray ||
    function(xs) {
      return Object.prototype.toString.call(xs) === '[object Array]';
    };

  var balancedMatch = balanced;
  function balanced(a, b, str) {
    if (a instanceof RegExp) a = maybeMatch(a, str);
    if (b instanceof RegExp) b = maybeMatch(b, str);

    var r = range(a, b, str);

    return (
      r && {
        start: r[0],
        end: r[1],
        pre: str.slice(0, r[0]),
        body: str.slice(r[0] + a.length, r[1]),
        post: str.slice(r[1] + b.length)
      }
    );
  }

  function maybeMatch(reg, str) {
    var m = str.match(reg);
    return m ? m[0] : null;
  }

  balanced.range = range;
  function range(a, b, str) {
    var begs, beg, left, right, result;
    var ai = str.indexOf(a);
    var bi = str.indexOf(b, ai + 1);
    var i = ai;

    if (ai >= 0 && bi > 0) {
      begs = [];
      left = str.length;

      while (i >= 0 && !result) {
        if (i == ai) {
          begs.push(i);
          ai = str.indexOf(a, i + 1);
        } else if (begs.length == 1) {
          result = [begs.pop(), bi];
        } else {
          beg = begs.pop();
          if (beg < left) {
            left = beg;
            right = bi;
          }

          bi = str.indexOf(b, i + 1);
        }

        i = ai < bi && ai >= 0 ? ai : bi;
      }

      if (begs.length) {
        result = [left, right];
      }
    }

    return result;
  }

  var braceExpansion = expandTop;

  var escSlash = '\0SLASH' + Math.random() + '\0';
  var escOpen = '\0OPEN' + Math.random() + '\0';
  var escClose = '\0CLOSE' + Math.random() + '\0';
  var escComma = '\0COMMA' + Math.random() + '\0';
  var escPeriod = '\0PERIOD' + Math.random() + '\0';

  function numeric(str) {
    return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
  }

  function escapeBraces(str) {
    return str
      .split('\\\\')
      .join(escSlash)
      .split('\\{')
      .join(escOpen)
      .split('\\}')
      .join(escClose)
      .split('\\,')
      .join(escComma)
      .split('\\.')
      .join(escPeriod);
  }

  function unescapeBraces(str) {
    return str
      .split(escSlash)
      .join('\\')
      .split(escOpen)
      .join('{')
      .split(escClose)
      .join('}')
      .split(escComma)
      .join(',')
      .split(escPeriod)
      .join('.');
  }

  // Basically just str.split(","), but handling cases
  // where we have nested braced sections, which should be
  // treated as individual members, like {a,{b,c},d}
  function parseCommaParts(str) {
    if (!str) return [''];

    var parts = [];
    var m = balancedMatch('{', '}', str);

    if (!m) return str.split(',');

    var pre = m.pre;
    var body = m.body;
    var post = m.post;
    var p = pre.split(',');

    p[p.length - 1] += '{' + body + '}';
    var postParts = parseCommaParts(post);
    if (post.length) {
      p[p.length - 1] += postParts.shift();
      p.push.apply(p, postParts);
    }

    parts.push.apply(parts, p);

    return parts;
  }

  function expandTop(str) {
    if (!str) return [];

    // I don't know why Bash 4.3 does this, but it does.
    // Anything starting with {} will have the first two bytes preserved
    // but *only* at the top level, so {},a}b will not expand to anything,
    // but a{},b}c will be expanded to [a}c,abc].
    // One could argue that this is a bug in Bash, but since the goal of
    // this module is to match Bash's rules, we escape a leading {}
    if (str.substr(0, 2) === '{}') {
      str = '\\{\\}' + str.substr(2);
    }

    return expand(escapeBraces(str), true).map(unescapeBraces);
  }

  function embrace(str) {
    return '{' + str + '}';
  }
  function isPadded(el) {
    return /^-?0\d/.test(el);
  }

  function lte(i, y) {
    return i <= y;
  }
  function gte(i, y) {
    return i >= y;
  }

  function expand(str, isTop) {
    var expansions = [];

    var m = balancedMatch('{', '}', str);
    if (!m || /\$$/.test(m.pre)) return [str];

    var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
    var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
    var isSequence = isNumericSequence || isAlphaSequence;
    var isOptions = m.body.indexOf(',') >= 0;
    if (!isSequence && !isOptions) {
      // {a},b}
      if (m.post.match(/,.*\}/)) {
        str = m.pre + '{' + m.body + escClose + m.post;
        return expand(str);
      }
      return [str];
    }

    var n;
    if (isSequence) {
      n = m.body.split(/\.\./);
    } else {
      n = parseCommaParts(m.body);
      if (n.length === 1) {
        // x{{a,b}}y ==> x{a}y x{b}y
        n = expand(n[0], false).map(embrace);
        if (n.length === 1) {
          var post = m.post.length ? expand(m.post, false) : [''];
          return post.map(function(p) {
            return m.pre + n[0] + p;
          });
        }
      }
    }

    // at this point, n is the parts, and we know it's not a comma set
    // with a single entry.

    // no need to expand pre, since it is guaranteed to be free of brace-sets
    var pre = m.pre;
    var post = m.post.length ? expand(m.post, false) : [''];

    var N;

    if (isSequence) {
      var x = numeric(n[0]);
      var y = numeric(n[1]);
      var width = Math.max(n[0].length, n[1].length);
      var incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1;
      var test = lte;
      var reverse = y < x;
      if (reverse) {
        incr *= -1;
        test = gte;
      }
      var pad = n.some(isPadded);

      N = [];

      for (var i = x; test(i, y); i += incr) {
        var c;
        if (isAlphaSequence) {
          c = String.fromCharCode(i);
          if (c === '\\') c = '';
        } else {
          c = String(i);
          if (pad) {
            var need = width - c.length;
            if (need > 0) {
              var z = new Array(need + 1).join('0');
              if (i < 0) c = '-' + z + c.slice(1);
              else c = z + c;
            }
          }
        }
        N.push(c);
      }
    } else {
      N = concatMap(n, function(el) {
        return expand(el, false);
      });
    }

    for (var j = 0; j < N.length; j++) {
      for (var k = 0; k < post.length; k++) {
        var expansion = pre + N[j] + post[k];
        if (!isTop || isSequence || expansion) expansions.push(expansion);
      }
    }

    return expansions;
  }

  var minimatch_1 = minimatch;
  minimatch.Minimatch = Minimatch;

  var path = { sep: '/' };
  try {
    path = require$$0$2;
  } catch (er) {}

  var GLOBSTAR = (minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {});

  var plTypes = {
    '!': { open: '(?:(?!(?:', close: '))[^/]*?)' },
    '?': { open: '(?:', close: ')?' },
    '+': { open: '(?:', close: ')+' },
    '*': { open: '(?:', close: ')*' },
    '@': { open: '(?:', close: ')' }
  };

  // any single thing other than /
  // don't need to escape / when using new RegExp()
  var qmark = '[^/]';

  // * => any number of characters
  var star = qmark + '*?';

  // ** when dots are allowed.  Anything goes, except .. and .
  // not (^ or / followed by one or two dots followed by $ or /),
  // followed by anything, any number of times.
  var twoStarDot = '(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?';

  // not a ^ or / followed by a dot,
  // followed by anything, any number of times.
  var twoStarNoDot = '(?:(?!(?:\\/|^)\\.).)*?';

  // characters that need to be escaped in RegExp.
  var reSpecials = charSet('().*{}+?[]^$\\!');

  // "abc" -> { a:true, b:true, c:true }
  function charSet(s) {
    return s.split('').reduce(function(set, c) {
      set[c] = true;
      return set;
    }, {});
  }

  // normalizes slashes.
  var slashSplit = /\/+/;

  minimatch.filter = filter$1;
  function filter$1(pattern, options) {
    options = options || {};
    return function(p, i, list) {
      return minimatch(p, pattern, options);
    };
  }

  function ext(a, b) {
    a = a || {};
    b = b || {};
    var t = {};
    Object.keys(b).forEach(function(k) {
      t[k] = b[k];
    });
    Object.keys(a).forEach(function(k) {
      t[k] = a[k];
    });
    return t;
  }

  minimatch.defaults = function(def) {
    if (!def || !Object.keys(def).length) return minimatch;

    var orig = minimatch;

    var m = function minimatch(p, pattern, options) {
      return orig.minimatch(p, pattern, ext(def, options));
    };

    m.Minimatch = function Minimatch(pattern, options) {
      return new orig.Minimatch(pattern, ext(def, options));
    };

    return m;
  };

  Minimatch.defaults = function(def) {
    if (!def || !Object.keys(def).length) return Minimatch;
    return minimatch.defaults(def).Minimatch;
  };

  function minimatch(p, pattern, options) {
    if (typeof pattern !== 'string') {
      throw new TypeError('glob pattern string required');
    }

    if (!options) options = {};

    // shortcut: comments match nothing.
    if (!options.nocomment && pattern.charAt(0) === '#') {
      return false;
    }

    // "" only matches ""
    if (pattern.trim() === '') return p === '';

    return new Minimatch(pattern, options).match(p);
  }

  function Minimatch(pattern, options) {
    if (!(this instanceof Minimatch)) {
      return new Minimatch(pattern, options);
    }

    if (typeof pattern !== 'string') {
      throw new TypeError('glob pattern string required');
    }

    if (!options) options = {};
    pattern = pattern.trim();

    // windows support: need to use /, not \
    if (path.sep !== '/') {
      pattern = pattern.split(path.sep).join('/');
    }

    this.options = options;
    this.set = [];
    this.pattern = pattern;
    this.regexp = null;
    this.negate = false;
    this.comment = false;
    this.empty = false;

    // make the set of regexps etc.
    this.make();
  }

  Minimatch.prototype.debug = function() {};

  Minimatch.prototype.make = make;
  function make() {
    // don't do it more than once.
    if (this._made) return;

    var pattern = this.pattern;
    var options = this.options;

    // empty patterns and comments match nothing.
    if (!options.nocomment && pattern.charAt(0) === '#') {
      this.comment = true;
      return;
    }
    if (!pattern) {
      this.empty = true;
      return;
    }

    // step 1: figure out negation, etc.
    this.parseNegate();

    // step 2: expand braces
    var set = (this.globSet = this.braceExpand());

    if (options.debug) this.debug = console.error;

    this.debug(this.pattern, set);

    // step 3: now we have a set, so turn each one into a series of path-portion
    // matching patterns.
    // These will be regexps, except in the case of "**", which is
    // set to the GLOBSTAR object for globstar behavior,
    // and will not contain any / characters
    set = this.globParts = set.map(function(s) {
      return s.split(slashSplit);
    });

    this.debug(this.pattern, set);

    // glob --> regexps
    set = set.map(function(s, si, set) {
      return s.map(this.parse, this);
    }, this);

    this.debug(this.pattern, set);

    // filter out everything that didn't compile properly.
    set = set.filter(function(s) {
      return s.indexOf(false) === -1;
    });

    this.debug(this.pattern, set);

    this.set = set;
  }

  Minimatch.prototype.parseNegate = parseNegate;
  function parseNegate() {
    var pattern = this.pattern;
    var negate = false;
    var options = this.options;
    var negateOffset = 0;

    if (options.nonegate) return;

    for (
      var i = 0, l = pattern.length;
      i < l && pattern.charAt(i) === '!';
      i++
    ) {
      negate = !negate;
      negateOffset++;
    }

    if (negateOffset) this.pattern = pattern.substr(negateOffset);
    this.negate = negate;
  }

  // Brace expansion:
  // a{b,c}d -> abd acd
  // a{b,}c -> abc ac
  // a{0..3}d -> a0d a1d a2d a3d
  // a{b,c{d,e}f}g -> abg acdfg acefg
  // a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
  //
  // Invalid sets are not expanded.
  // a{2..}b -> a{2..}b
  // a{b}c -> a{b}c
  minimatch.braceExpand = function(pattern, options) {
    return braceExpand(pattern, options);
  };

  Minimatch.prototype.braceExpand = braceExpand;

  function braceExpand(pattern, options) {
    if (!options) {
      if (this instanceof Minimatch) {
        options = this.options;
      } else {
        options = {};
      }
    }

    pattern = typeof pattern === 'undefined' ? this.pattern : pattern;

    if (typeof pattern === 'undefined') {
      throw new TypeError('undefined pattern');
    }

    if (options.nobrace || !pattern.match(/\{.*\}/)) {
      // shortcut. no need to expand.
      return [pattern];
    }

    return braceExpansion(pattern);
  }

  // parse a component of the expanded set.
  // At this point, no pattern may contain "/" in it
  // so we're going to return a 2d array, where each entry is the full
  // pattern, split on '/', and then turned into a regular expression.
  // A regexp is made at the end which joins each array with an
  // escaped /, and another full one which joins each regexp with |.
  //
  // Following the lead of Bash 4.1, note that "**" only has special meaning
  // when it is the *only* thing in a path portion.  Otherwise, any series
  // of * is equivalent to a single *.  Globstar behavior is enabled by
  // default, and can be disabled by setting options.noglobstar.
  Minimatch.prototype.parse = parse$3;
  var SUBPARSE = {};
  function parse$3(pattern, isSub) {
    if (pattern.length > 1024 * 64) {
      throw new TypeError('pattern is too long');
    }

    var options = this.options;

    // shortcuts
    if (!options.noglobstar && pattern === '**') return GLOBSTAR;
    if (pattern === '') return '';

    var re = '';
    var hasMagic = !!options.nocase;
    var escaping = false;
    // ? => one single character
    var patternListStack = [];
    var negativeLists = [];
    var stateChar;
    var inClass = false;
    var reClassStart = -1;
    var classStart = -1;
    // . and .. never match anything that doesn't start with .,
    // even when options.dot is set.
    var patternStart =
      pattern.charAt(0) === '.'
        ? '' // anything
        : // not (start or / followed by . or .. followed by / or end)
        options.dot
        ? '(?!(?:^|\\/)\\.{1,2}(?:$|\\/))'
        : '(?!\\.)';
    var self = this;

    function clearStateChar() {
      if (stateChar) {
        // we had some state-tracking character
        // that wasn't consumed by this pass.
        switch (stateChar) {
          case '*':
            re += star;
            hasMagic = true;
            break;
          case '?':
            re += qmark;
            hasMagic = true;
            break;
          default:
            re += '\\' + stateChar;
            break;
        }
        self.debug('clearStateChar %j %j', stateChar, re);
        stateChar = false;
      }
    }

    for (
      var i = 0, len = pattern.length, c;
      i < len && (c = pattern.charAt(i));
      i++
    ) {
      this.debug('%s\t%s %s %j', pattern, i, re, c);

      // skip over any that are escaped.
      if (escaping && reSpecials[c]) {
        re += '\\' + c;
        escaping = false;
        continue;
      }

      switch (c) {
        case '/':
          // completely not allowed, even escaped.
          // Should already be path-split by now.
          return false;

        case '\\':
          clearStateChar();
          escaping = true;
          continue;

        // the various stateChar values
        // for the "extglob" stuff.
        case '?':
        case '*':
        case '+':
        case '@':
        case '!':
          this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c);

          // all of those are literals inside a class, except that
          // the glob [!a] means [^a] in regexp
          if (inClass) {
            this.debug('  in class');
            if (c === '!' && i === classStart + 1) c = '^';
            re += c;
            continue;
          }

          // if we already have a stateChar, then it means
          // that there was something like ** or +? in there.
          // Handle the stateChar, then proceed with this one.
          self.debug('call clearStateChar %j', stateChar);
          clearStateChar();
          stateChar = c;
          // if extglob is disabled, then +(asdf|foo) isn't a thing.
          // just clear the statechar *now*, rather than even diving into
          // the patternList stuff.
          if (options.noext) clearStateChar();
          continue;

        case '(':
          if (inClass) {
            re += '(';
            continue;
          }

          if (!stateChar) {
            re += '\\(';
            continue;
          }

          patternListStack.push({
            type: stateChar,
            start: i - 1,
            reStart: re.length,
            open: plTypes[stateChar].open,
            close: plTypes[stateChar].close
          });
          // negation is (?:(?!js)[^/]*)
          re += stateChar === '!' ? '(?:(?!(?:' : '(?:';
          this.debug('plType %j %j', stateChar, re);
          stateChar = false;
          continue;

        case ')':
          if (inClass || !patternListStack.length) {
            re += '\\)';
            continue;
          }

          clearStateChar();
          hasMagic = true;
          var pl = patternListStack.pop();
          // negation is (?:(?!js)[^/]*)
          // The others are (?:<pattern>)<type>
          re += pl.close;
          if (pl.type === '!') {
            negativeLists.push(pl);
          }
          pl.reEnd = re.length;
          continue;

        case '|':
          if (inClass || !patternListStack.length || escaping) {
            re += '\\|';
            escaping = false;
            continue;
          }

          clearStateChar();
          re += '|';
          continue;

        // these are mostly the same in regexp and glob
        case '[':
          // swallow any state-tracking char before the [
          clearStateChar();

          if (inClass) {
            re += '\\' + c;
            continue;
          }

          inClass = true;
          classStart = i;
          reClassStart = re.length;
          re += c;
          continue;

        case ']':
          //  a right bracket shall lose its special
          //  meaning and represent itself in
          //  a bracket expression if it occurs
          //  first in the list.  -- POSIX.2 2.8.3.2
          if (i === classStart + 1 || !inClass) {
            re += '\\' + c;
            escaping = false;
            continue;
          }

          // handle the case where we left a class open.
          // "[z-a]" is valid, equivalent to "\[z-a\]"
          if (inClass) {
            // split where the last [ was, make sure we don't have
            // an invalid re. if so, re-walk the contents of the
            // would-be class to re-translate any characters that
            // were passed through as-is
            // TODO: It would probably be faster to determine this
            // without a try/catch and a new RegExp, but it's tricky
            // to do safely.  For now, this is safe and works.
            var cs = pattern.substring(classStart + 1, i);
            try {
              RegExp('[' + cs + ']');
            } catch (er) {
              // not a valid class!
              var sp = this.parse(cs, SUBPARSE);
              re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]';
              hasMagic = hasMagic || sp[1];
              inClass = false;
              continue;
            }
          }

          // finish up the class.
          hasMagic = true;
          inClass = false;
          re += c;
          continue;

        default:
          // swallow any state char that wasn't consumed
          clearStateChar();

          if (escaping) {
            // no need
            escaping = false;
          } else if (reSpecials[c] && !(c === '^' && inClass)) {
            re += '\\';
          }

          re += c;
      } // switch
    } // for

    // handle the case where we left a class open.
    // "[abc" is valid, equivalent to "\[abc"
    if (inClass) {
      // split where the last [ was, and escape it
      // this is a huge pita.  We now have to re-walk
      // the contents of the would-be class to re-translate
      // any characters that were passed through as-is
      cs = pattern.substr(classStart + 1);
      sp = this.parse(cs, SUBPARSE);
      re = re.substr(0, reClassStart) + '\\[' + sp[0];
      hasMagic = hasMagic || sp[1];
    }

    // handle the case where we had a +( thing at the *end*
    // of the pattern.
    // each pattern list stack adds 3 chars, and we need to go through
    // and escape any | chars that were passed through as-is for the regexp.
    // Go through and escape them, taking care not to double-escape any
    // | chars that were already escaped.
    for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
      var tail = re.slice(pl.reStart + pl.open.length);
      this.debug('setting tail', re, pl);
      // maybe some even number of \, then maybe 1 \, followed by a |
      tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function(_, $1, $2) {
        if (!$2) {
          // the | isn't already escaped, so escape it.
          $2 = '\\';
        }

        // need to escape all those slashes *again*, without escaping the
        // one that we need for escaping the | character.  As it works out,
        // escaping an even number of slashes can be done by simply repeating
        // it exactly after itself.  That's why this trick works.
        //
        // I am sorry that you have to see this.
        return $1 + $1 + $2 + '|';
      });

      this.debug('tail=%j\n   %s', tail, tail, pl, re);
      var t = pl.type === '*' ? star : pl.type === '?' ? qmark : '\\' + pl.type;

      hasMagic = true;
      re = re.slice(0, pl.reStart) + t + '\\(' + tail;
    }

    // handle trailing things that only matter at the very end.
    clearStateChar();
    if (escaping) {
      // trailing \\
      re += '\\\\';
    }

    // only need to apply the nodot start if the re starts with
    // something that could conceivably capture a dot
    var addPatternStart = false;
    switch (re.charAt(0)) {
      case '.':
      case '[':
      case '(':
        addPatternStart = true;
    }

    // Hack to work around lack of negative lookbehind in JS
    // A pattern like: *.!(x).!(y|z) needs to ensure that a name
    // like 'a.xyz.yz' doesn't match.  So, the first negative
    // lookahead, has to look ALL the way ahead, to the end of
    // the pattern.
    for (var n = negativeLists.length - 1; n > -1; n--) {
      var nl = negativeLists[n];

      var nlBefore = re.slice(0, nl.reStart);
      var nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
      var nlLast = re.slice(nl.reEnd - 8, nl.reEnd);
      var nlAfter = re.slice(nl.reEnd);

      nlLast += nlAfter;

      // Handle nested stuff like *(*.js|!(*.json)), where open parens
      // mean that we should *not* include the ) in the bit that is considered
      // "after" the negated section.
      var openParensBefore = nlBefore.split('(').length - 1;
      var cleanAfter = nlAfter;
      for (i = 0; i < openParensBefore; i++) {
        cleanAfter = cleanAfter.replace(/\)[+*?]?/, '');
      }
      nlAfter = cleanAfter;

      var dollar = '';
      if (nlAfter === '' && isSub !== SUBPARSE) {
        dollar = '$';
      }
      var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast;
      re = newRe;
    }

    // if the re is not "" at this point, then we need to make sure
    // it doesn't match against an empty path part.
    // Otherwise a/* will match a/, which it should not.
    if (re !== '' && hasMagic) {
      re = '(?=.)' + re;
    }

    if (addPatternStart) {
      re = patternStart + re;
    }

    // parsing just a piece of a larger pattern.
    if (isSub === SUBPARSE) {
      return [re, hasMagic];
    }

    // skip the regexp for non-magical patterns
    // unescape anything in it, though, so that it'll be
    // an exact match against a file etc.
    if (!hasMagic) {
      return globUnescape(pattern);
    }

    var flags = options.nocase ? 'i' : '';
    try {
      var regExp = new RegExp('^' + re + '$', flags);
    } catch (er) {
      // If it was an invalid regular expression, then it can't match
      // anything.  This trick looks for a character after the end of
      // the string, which is of course impossible, except in multi-line
      // mode, but it's not a /m regex.
      return new RegExp('$.');
    }

    regExp._glob = pattern;
    regExp._src = re;

    return regExp;
  }

  minimatch.makeRe = function(pattern, options) {
    return new Minimatch(pattern, options || {}).makeRe();
  };

  Minimatch.prototype.makeRe = makeRe;
  function makeRe() {
    if (this.regexp || this.regexp === false) return this.regexp;

    // at this point, this.set is a 2d array of partial
    // pattern strings, or "**".
    //
    // It's better to use .match().  This function shouldn't
    // be used, really, but it's pretty convenient sometimes,
    // when you just want to work with a regex.
    var set = this.set;

    if (!set.length) {
      this.regexp = false;
      return this.regexp;
    }
    var options = this.options;

    var twoStar = options.noglobstar
      ? star
      : options.dot
      ? twoStarDot
      : twoStarNoDot;
    var flags = options.nocase ? 'i' : '';

    var re = set
      .map(function(pattern) {
        return pattern
          .map(function(p) {
            return p === GLOBSTAR
              ? twoStar
              : typeof p === 'string'
              ? regExpEscape(p)
              : p._src;
          })
          .join('\\/');
      })
      .join('|');

    // must match entire pattern
    // ending in a * or ** will make it less strict.
    re = '^(?:' + re + ')$';

    // can match anything, as long as it's not this.
    if (this.negate) re = '^(?!' + re + ').*$';

    try {
      this.regexp = new RegExp(re, flags);
    } catch (ex) {
      this.regexp = false;
    }
    return this.regexp;
  }

  minimatch.match = function(list, pattern, options) {
    options = options || {};
    var mm = new Minimatch(pattern, options);
    list = list.filter(function(f) {
      return mm.match(f);
    });
    if (mm.options.nonull && !list.length) {
      list.push(pattern);
    }
    return list;
  };

  Minimatch.prototype.match = match;
  function match(f, partial) {
    this.debug('match', f, this.pattern);
    // short-circuit in the case of busted things.
    // comments, etc.
    if (this.comment) return false;
    if (this.empty) return f === '';

    if (f === '/' && partial) return true;

    var options = this.options;

    // windows: need to use /, not \
    if (path.sep !== '/') {
      f = f.split(path.sep).join('/');
    }

    // treat the test path as a set of pathparts.
    f = f.split(slashSplit);
    this.debug(this.pattern, 'split', f);

    // just ONE of the pattern sets in this.set needs to match
    // in order for it to be valid.  If negating, then just one
    // match means that we have failed.
    // Either way, return on the first hit.

    var set = this.set;
    this.debug(this.pattern, 'set', set);

    // Find the basename of the path by looking for the last non-empty segment
    var filename;
    var i;
    for (i = f.length - 1; i >= 0; i--) {
      filename = f[i];
      if (filename) break;
    }

    for (i = 0; i < set.length; i++) {
      var pattern = set[i];
      var file = f;
      if (options.matchBase && pattern.length === 1) {
        file = [filename];
      }
      var hit = this.matchOne(file, pattern, partial);
      if (hit) {
        if (options.flipNegate) return true;
        return !this.negate;
      }
    }

    // didn't get any hits.  this is success if it's a negative
    // pattern, failure otherwise.
    if (options.flipNegate) return false;
    return this.negate;
  }

  // set partial to true to test if, for example,
  // "/a/b" matches the start of "/*/b/*/d"
  // Partial means, if you run out of file before you run
  // out of pattern, then that's fine, as long as all
  // the parts match.
  Minimatch.prototype.matchOne = function(file, pattern, partial) {
    var options = this.options;

    this.debug('matchOne', { this: this, file: file, pattern: pattern });

    this.debug('matchOne', file.length, pattern.length);

    for (
      var fi = 0, pi = 0, fl = file.length, pl = pattern.length;
      fi < fl && pi < pl;
      fi++, pi++
    ) {
      this.debug('matchOne loop');
      var p = pattern[pi];
      var f = file[fi];

      this.debug(pattern, p, f);

      // should be impossible.
      // some invalid regexp stuff in the set.
      if (p === false) return false;

      if (p === GLOBSTAR) {
        this.debug('GLOBSTAR', [pattern, p, f]);

        // "**"
        // a/**/b/**/c would match the following:
        // a/b/x/y/z/c
        // a/x/y/z/b/c
        // a/b/x/b/x/c
        // a/b/c
        // To do this, take the rest of the pattern after
        // the **, and see if it would match the file remainder.
        // If so, return success.
        // If not, the ** "swallows" a segment, and try again.
        // This is recursively awful.
        //
        // a/**/b/**/c matching a/b/x/y/z/c
        // - a matches a
        // - doublestar
        //   - matchOne(b/x/y/z/c, b/**/c)
        //     - b matches b
        //     - doublestar
        //       - matchOne(x/y/z/c, c) -> no
        //       - matchOne(y/z/c, c) -> no
        //       - matchOne(z/c, c) -> no
        //       - matchOne(c, c) yes, hit
        var fr = fi;
        var pr = pi + 1;
        if (pr === pl) {
          this.debug('** at the end');
          // a ** at the end will just swallow the rest.
          // We have found a match.
          // however, it will not swallow /.x, unless
          // options.dot is set.
          // . and .. are *never* matched by **, for explosively
          // exponential reasons.
          for (; fi < fl; fi++) {
            if (
              file[fi] === '.' ||
              file[fi] === '..' ||
              (!options.dot && file[fi].charAt(0) === '.')
            )
              return false;
          }
          return true;
        }

        // ok, let's see if we can swallow whatever we can.
        while (fr < fl) {
          var swallowee = file[fr];

          this.debug('\nglobstar while', file, fr, pattern, pr, swallowee);

          // XXX remove this slice.  Just pass the start index.
          if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
            this.debug('globstar found match!', fr, fl, swallowee);
            // found a match.
            return true;
          } else {
            // can't swallow "." or ".." ever.
            // can only swallow ".foo" when explicitly asked.
            if (
              swallowee === '.' ||
              swallowee === '..' ||
              (!options.dot && swallowee.charAt(0) === '.')
            ) {
              this.debug('dot detected!', file, fr, pattern, pr);
              break;
            }

            // ** swallows a segment, and continue.
            this.debug('globstar swallow a segment, and continue');
            fr++;
          }
        }

        // no match was found.
        // However, in partial mode, we can't say this is necessarily over.
        // If there's more *pattern* left, then
        if (partial) {
          // ran out of file
          this.debug('\n>>> no match, partial?', file, fr, pattern, pr);
          if (fr === fl) return true;
        }
        return false;
      }

      // something other than **
      // non-magic patterns just have to match exactly
      // patterns with magic have been turned into regexps.
      var hit;
      if (typeof p === 'string') {
        if (options.nocase) {
          hit = f.toLowerCase() === p.toLowerCase();
        } else {
          hit = f === p;
        }
        this.debug('string match', p, f, hit);
      } else {
        hit = f.match(p);
        this.debug('pattern match', p, f, hit);
      }

      if (!hit) return false;
    }

    // Note: ending in / means that we'll get a final ""
    // at the end of the pattern.  This can only match a
    // corresponding "" at the end of the file.
    // If the file ends in /, then it can only match a
    // a pattern that ends in /, unless the pattern just
    // doesn't have any more for it. But, a/b/ should *not*
    // match "a/b/*", even though "" matches against the
    // [^/]*? pattern, except in partial mode, where it might
    // simply not be reached yet.
    // However, a/b/ should still satisfy a/*

    // now either we fell off the end of the pattern, or we're done.
    if (fi === fl && pi === pl) {
      // ran out of pattern and filename at the same time.
      // an exact hit!
      return true;
    } else if (fi === fl) {
      // ran out of file, but still had pattern left.
      // this is ok if we're doing the match as part of
      // a glob fs traversal.
      return partial;
    } else if (pi === pl) {
      // ran out of pattern, still have file left.
      // this is only acceptable if we're on the very last
      // empty segment of a file with a trailing slash.
      // a/* should match a/b/
      var emptyFileEnd = fi === fl - 1 && file[fi] === '';
      return emptyFileEnd;
    }

    // should be unreachable.
    throw new Error('wtf?');
  };

  // replace stuff like \* with *
  function globUnescape(s) {
    return s.replace(/\\(.)/g, '$1');
  }

  function regExpEscape(s) {
    return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

  var jCognos;
  var cognosUrl;

  var Cognos = (function() {
    function Cognos(debug, timeout) {
      _classCallCheck(this, Cognos);

      this.loggedin = false;
      this.url = '';
      this.debug = debug;
      this.username = '';
      this.password = '';
      this.timeout = timeout;
      this.productVersion = '';
      this.capabilities = {};
      this.preferences = {};
      this.defaultNamespace = '';
      this.namespace = '';
      this.namespaces = '';
      this.retrycount = 0;
      this.loginrequest = false;
      this.resetting = false;
    }

    _createClass(Cognos, [
      {
        key: 'log',
        value: function log(text, object) {
          if (this.debug) {
            if (object) {
              console.log(text, object);
            } else {
              console.log(text);
            }
          }
        }
      },
      {
        key: 'error',
        value: function error(text, object) {
          if (this.debug) {
            if (object) {
              console.error(text, object);
            } else {
              console.error(text);
            }
          }
        }
      },
      {
        key: 'login',
        value: function login(user, password) {
          var namespace =
            arguments.length > 2 && arguments[2] !== undefined
              ? arguments[2]
              : '';
          var me = this;
          me.log('login: Starting to login');

          if (me.loginrequest !== false) {
            me.log(
              'login: Already logging in, returning loginrequest promise',
              me.loginrequest
            );
            return Promise.resolve(me.loginrequest);
          }

          if (namespace == '') {
            namespace = me.defaultNamespace;
          }

          if (!namespace) {
            throw 'Namespace not known.';
          }

          var params = {
            parameters: [
              {
                name: 'CAMNamespace',
                value: namespace
              },
              {
                name: 'h_CAM_action',
                value: 'logonAs'
              },
              {
                name: 'CAMUsername',
                value: user
              },
              {
                name: 'CAMPassword',
                value: password
              }
            ]
          };
          this.loginrequest = me.requester
            .post('bi/v1/login', params)
            .then(function() {
              me.loggedin = true;
              me.username = user;
              me.password = password;
              me.namespace = namespace;
              me.loginrequest = false;
              var capabilities = Promise.resolve(
                me.requester
                  .get('bi/v1/users/~/capabilities')
                  .then(function(caps) {
                    me.capabilities = caps;
                    return caps;
                  })
              );
              var preferences = Promise.resolve(
                me.requester
                  .get('bi/v1/users/~/preferences')
                  .then(function(prefs) {
                    me.preferences = prefs;
                    return prefs;
                  })
              );
              return Promise.resolve(Promise.all([capabilities, preferences]));
            })
            .then(function() {
              return me;
            })
            ['catch'](function(err) {
              me.log('Cognos: Error when logging in.');
              me.loginrequest = false;
              throw err;
            });
          this.log('login: returning login promise', this.loginrequest);
          return this.loginrequest;
        }
      },
      {
        key: 'logoff',
        value: function logoff() {
          var me = this;

          if (_typeof(me.requester) !== undefined) {
            var result = me.requester['delete']('bi/v1/login')
              .then(function(body) {
                me.loggedin = false;
                return body;
              })
              ['catch'](function(err) {
                me.log('Cognos: Error when logging off.', err);
              });
            return result;
          } else {
            me.loggedin = false;
            return Promise.resolve(true);
          }
        }
      },
      {
        key: 'handleError',
        value: function handleError(err) {
          var me = this;
          var errormessage = '';

          if (err.code === 'ECONNABORTED' || err.message === 'Network Error') {
            throw err;
          }

          if (typeof err.response !== 'undefined') {
            if (err.response.status == 441 || err.response.status == 403) {
              me.log('going to reset');
              var result = me.reset();
              me.log('in handleError, returning promise', result);
              return result;
            }

            if (typeof err.response.data.messages !== 'undefined') {
              errormessage = err.response.data.messages[0].messageString;
            } else {
              errormessage = err.response.data;
            }
          } else {
            errormessage = err.message;
          }

          me.error(err);

          if (errormessage != 'AAA-AUT-0011 Invalid namespace was selected.') {
            throw errormessage;
          }

          return Promise.resolve();
        }
      },
      {
        key: 'reset',
        value: function reset() {
          var me = this;
          me.log('Going to Reset');

          if (this.resetting) {
            return this.resetting;
          }

          this.retrycount++;
          me.log('retrycount = ' + this.retrycount);

          if (this.retrycount > 2) {
            return Promise.reject();
          }

          this.requester = undefined;
          me.log('going to reset the cognos request');
          this.resetting = getCognosRequest(
            this.url,
            this.debug,
            true,
            this.timeout
          )
            .then(function(cRequest) {
              me.requester = cRequest;
              me.log('going to login again');
              var result = me.login(me.username, me.password, me.namespace);
              me.log('login promise', result);
              return Promise.resolve(result);
            })
            .then(function() {
              me.log('Done logging in');
              return Promise.resolve();
            })
            ['catch'](function(err) {
              me.error('Error resetting', err);

              if (me.retrycount < 3) {
                return me.reset();
              }

              throw err;
            });
          me.log('Returning a promise to reset', this.resetting);
          return this.resetting;
        }
      },
      {
        key: 'getCurrentThemeSettings',
        value: function getCurrentThemeSettings() {
          var me = this;
          var url = 'bi/v1/plugins/themes/current/spec.json';
          var result = me.requester
            .get(url)
            .then(function(themesettings) {
              return themesettings;
            })
            ['catch'](function(err) {
              me.error(
                'Error while fetching Cognos Current Theme Settings.',
                err
              );
              throw err;
            });
          return result;
        }
      },
      {
        key: 'getCognosVersion',
        value: function getCognosVersion() {
          var me = this;

          if (this.productVersion !== '') {
            return Promise.resolve(me.productVersion);
          }

          var url = 'bi/v1/configuration/keys/Glass.productVersion';
          var result = me.requester
            .get(url)
            .then(function(version) {
              me.productVersion = version['Glass.productVersion'];
              return me.productVersion;
            })
            ['catch'](function(err) {
              me.error('Error while fetching Cognos Version.', err);
              throw err;
            });
          return result;
        }
      },
      {
        key: '_getPublicFolderId',
        value: function _getPublicFolderId() {
          var me = this;
          var url = '';
          return this.getCognosVersion().then(function(version) {
            if (version.substr(0, 4) == '11.1') {
              url = 'bi/v1/disp/icd/feeds/cm/?dojo=';
              me.log('We are version 11. Going to fetch: ' + url);
            } else {
              url = 'bi/v1/objects/.public_folders?fields=permissions';
            }

            return Promise.resolve(
              me.requester
                .get(url)
                .then(function(folders) {
                  var id;

                  if (version.substr(0, 4) == '11.1') {
                    folders = eval('(' + folders + ')');
                    id = folders.items[0].entry[2].cm$storeID;
                  } else {
                    id = folders.data[0].id;
                  }

                  return id;
                })
                ['catch'](function(err) {
                  me.error('There was an error fetching the folder id', err);
                  throw err;
                })
            );
          });
        }
      },
      {
        key: 'listRootFolder',
        value: function listRootFolder() {
          var me = this;
          var rootfolders = [];
          return me.requester
            .get('bi/v1/objects/.my_folders?fields=permissions')
            .then(function(folders) {
              me.log('Got the Private Folders');

              if (typeof folders !== 'undefined') {
                rootfolders.push({
                  id: folders.data[0].id,
                  name: 'My Content'
                });
              }

              return rootfolders;
            })
            .then(function() {
              return Promise.resolve(
                me._getPublicFolderId().then(function(id) {
                  me.log('Got the Public Folders');

                  if (typeof id !== 'undefined') {
                    rootfolders.push({
                      id: id,
                      name: 'Team Content'
                    });
                  }

                  return rootfolders;
                })
              );
            })
            ['catch'](function(err) {
              me.error('CognosRequest : Error in listRootFolder', err);
              me.handleError(err)
                .then(function() {
                  me.log('We have been reset, list the root folder again');
                  me.resetting = false;
                  return me.listRootFolder();
                })
                ['catch'](function() {
                  throw err;
                });
            });
        }
      },
      {
        key: 'listPublicFolders',
        value: function listPublicFolders() {
          var me = this;

          var result = me
            ._getPublicFolderId()
            .then(function(id) {
              if (typeof id !== 'undefined') {
                return Promise.resolve(me.listFolderById(id));
              }

              return {};
            })
            ['catch'](function(err) {
              me.error('CognosRequest : Error in listPublicFolders', err);
              me.handleError(err)
                .then(function() {
                  me.log('We have been reset, list the public folders again');
                  me.resetting = false;
                  return me.listPublicFolders();
                })
                ['catch'](function() {
                  throw err;
                });
            });

          return result;
        }
      },
      {
        key: 'listFolderById',
        value: function listFolderById(id) {
          var pattern =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : '*';
          var types =
            arguments.length > 2 && arguments[2] !== undefined
              ? arguments[2]
              : ['folder'];
          var me = this;
          var result = me.requester
            .get(
              'bi/v1/objects/' +
                id +
                '/items?nav_filter=true&fields=defaultName,defaultScreenTip'
            )
            .then(function(folders) {
              var result = [];
              folders.data.forEach(function(folder) {
                if (minimatch_1(folder.defaultName, pattern)) {
                  me.log('folder ', folder.defaultName);

                  try {
                    if (types.indexOf(folder.type) > -1) {
                      var tpFolder = {
                        name: folder.defaultName,
                        id: folder.id,
                        searchPath: folder.searchPath,
                        type: folder.type
                      };
                      result.push(tpFolder);
                    }
                  } catch (err) {
                    me.error('something fishy', err);
                  }
                }
              });
              return result;
            })
            ['catch'](function(err) {
              me.error('CognosRequest : Error in listFolderById', err);
              return me
                .handleError(err)
                .then(function() {
                  me.log('We have been reset, list the folder by id again');
                  me.resetting = false;
                  return me.listFolderById(id, pattern, types);
                })
                ['catch'](function() {
                  throw err;
                });
            });
          return result;
        }
      },
      {
        key: 'getFolderDetails',
        value: function getFolderDetails(id) {
          var me = this;
          var url =
            'bi/v1/objects/' +
            id +
            '?fields=id,defaultName,owner.defaultName,ancestors,defaultDescription,modificationTime,creationTime,contact,type,disabled,hidden,name.locale,permissions,tenantID,searchPath,repositoryRules';
          return me.requester
            .get(url)
            .then(function(details) {
              me.log('Got Folder Details', details);
              return details;
            })
            ['catch'](function(err) {
              me.error('CognosRequest : Error in getFolderDetails', err);
              me.handleError(err)
                .then(function() {
                  me.log('We have been reset, getFolderDetails again');
                  me.resetting = false;
                  return me.getFolderDetails(id);
                })
                ['catch'](function() {
                  throw err;
                });
            });
        }
      },
      {
        key: 'addFolder',
        value: function addFolder(parentid, name) {
          var me = this;
          var params = {
            defaultName: name,
            type: 'folder'
          };
          var result = me.requester
            .post('bi/v1/objects/' + parentid + '/items', params, true)
            .then(function(response) {
              me.log('created folder');

              if (response.headers && response.headers.location) {
                var id = response.headers.location.split('/').pop();
              } else {
                var id = response.data.data[0].id;
              }

              return {
                name: name,
                id: id
              };
            })
            ['catch'](function(err) {
              me.error('CognosRequest : Error in addFolder', err);
              return me
                .handleError(err)
                .then(function() {
                  me.log('We have been reset, lets add the folder again');
                  me.resetting = false;
                  return me.addFolder(parentid, name);
                })
                ['catch'](function() {
                  throw err;
                });
            });
          me.log('Maybe going to create folder');
          return result;
        }
      },
      {
        key: 'deleteFolder',
        value: function deleteFolder(id) {
          var force =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : true;
          var recursive =
            arguments.length > 2 && arguments[2] !== undefined
              ? arguments[2]
              : true;
          var me = this;
          var params = {
            force: force,
            recursive: recursive
          };
          var result = me.requester['delete'](
            'bi/v1/objects/' + id,
            params,
            true
          )
            .then(function() {
              me.log('Deleted folder');
              return true;
            })
            ['catch'](function(err) {
              me.error('CognosRequest : Error in deleteFolder', err);
              return me
                .handleError(err)
                .then(function() {
                  me.log('We have been reset, delete the folder again');
                  me.resetting = false;
                  return me.deleteFolder(id, force, recursive);
                })
                ['catch'](function(errtwo) {
                  throw errtwo;
                });
            });
          me.log('Returning Delete Promise');
          return result;
        }
      },
      {
        key: 'getReportData',
        value: function getReportData(id) {
          var prompts =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : {};
          var limit =
            arguments.length > 2 && arguments[2] !== undefined
              ? arguments[2]
              : 2000;
          var me = this;
          var promptString = '';
          var keys = Object.keys(prompts);
          keys.forEach(function(key) {
            promptString += '&p_' + key + '=' + prompts[key];
          });
          var result = me.requester
            .get(
              'bi/v1/disp/rds/reportData/report/' +
                id +
                '?fmt=DataSetJSON&rowLimit=' +
                limit +
                promptString
            )
            .then(function(data) {
              me.log('retrieved the data', data);
              return data;
            })
            ['catch'](function(err) {
              me.error('CognosRequest : Error in getReportData', err);
              return me
                .handleError(err)
                .then(function() {
                  me.log('We have been reset, get Report Data again');
                  me.resetting = false;
                  return me.getReportData(id, prompts, limit);
                })
                ['catch'](function() {
                  throw err;
                });
            });
          return result;
        }
      },
      {
        key: 'uploadExtension',
        value: function uploadExtension(filename, name) {
          var type =
            arguments.length > 2 && arguments[2] !== undefined
              ? arguments[2]
              : 'extensions';
          var options =
            arguments.length > 3 && arguments[3] !== undefined
              ? arguments[3]
              : {};
          var me = this;
          var path = 'bi/v1/plugins/' + type + '/' + name;
          var result = this.requester
            .put(path, filename, false, options)
            .then(function(response) {
              me.log('New extension id =' + response.id);
            })
            ['catch'](function(err) {
              me.error('CognosRequest : Error in uploadExtension', err);
              throw err;
            });
          return result;
        }
      },
      {
        key: 'upLoadDataFile',
        value: function upLoadDataFile(filename) {
          var me = this;
          var path = 'bi/v1/metadata/files?filename=' + file;
          var result = this.requester
            .uploadfile(path, filename)
            .then(function(response) {
              me.log('New extension id =' + response);

              if (response) {
                path = 'bi/v1/metadata/files/segment/' + response + '?index=1';
                me.requester
                  .uploadfilepart(path, filename)
                  .then(function(response) {
                    me.log('New extension id =' + response);
                    path =
                      'bi/v1/metadata/files/segment/' + response + '?index=-1';
                    me.requester
                      .uploadfilepartFinish(path)
                      .then(function(response) {
                        me.log('New extension id =' + response);
                      })
                      ['catch'](function(err) {
                        me.error(
                          'CognosRequest : Error in uploadDataFile Part',
                          err
                        );
                        throw err;
                      });
                  })
                  ['catch'](function(err) {
                    me.error(
                      'CognosRequest : Error in uploadDataFile Part',
                      err
                    );
                    throw err;
                  });
              }
            })
            ['catch'](function(err) {
              me.error('CognosRequest : Error in uploadDataFile', err);
              throw err;
            });
          return result;
        }
      },
      {
        key: 'getPalettes',
        value: function getPalettes() {
          var me = this;
          var result = me.requester
            .get('bi/v1/palettes/public')
            .then(function(data) {
              me.log('retrieved the data', data);
              return data;
            })
            ['catch'](function(err) {
              me.error('CognosRequest : Error in getPalettes', err);
              return me
                .handleError(err)
                .then(function() {
                  me.log('We have been reset, getPalettes again');
                  me.resetting = false;
                  return me.getPalettes();
                })
                ['catch'](function() {
                  throw err;
                });
            });
          return result;
        }
      },
      {
        key: 'savePalette',
        value: function savePalette(palette) {
          var id =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : false;
          var me = this;
          var result;

          if (id) {
            result = me.requester
              .put('bi/v1/palettes/' + id, false, palette)
              .then(function() {
                me.log('saved palette ' + id);
                return id;
              })
              ['catch'](function(err) {
                me.error('CognosRequest : Error in savePalette', err);

                if (err == 'Not Found') {
                  throw 'Palette with id ' + id + ' is not found';
                }

                return me
                  .handleError(err)
                  .then(function() {
                    me.log('We have been reset, savePalette again');
                    me.resetting = false;
                    return me.savePalette(id, palette);
                  })
                  ['catch'](function() {
                    throw err;
                  });
              });
          } else {
            result = me.requester
              .post('bi/v1/palettes/my', palette, true)
              .then(function() {
                me.log('saved palette');
              })
              ['catch'](function(err) {
                me.error('CognosRequest : Error in savePalette', err);
                return me
                  .handleError(err)
                  .then(function() {
                    me.log('We have been reset, savePalette again');
                    me.resetting = false;
                    return me.savePalette(palette, id);
                  })
                  ['catch'](function() {
                    throw err;
                  });
              });
          }

          return result;
        }
      },
      {
        key: 'deletePalette',
        value: function deletePalette(id) {
          var me = this;
          var params = {
            force: 'true'
          };
          var result = me.requester['delete'](
            'bi/v1/palettes/' + id,
            params,
            false
          )
            .then(function() {
              me.log('deleted palette ' + id);
              return id;
            })
            ['catch'](function(err) {
              me.error('CognosRequest : Error in deletePalette', err);

              if (err == 'Not Found') {
                throw 'Palette with id ' + id + ' is not found';
              }

              return me
                .handleError(err)
                .then(function() {
                  me.log('We have been reset, deletePalette again');
                  me.resetting = false;
                  return me.deletePalette(id);
                })
                ['catch'](function() {
                  throw err;
                });
            });
          return result;
        }
      }
    ]);

    return Cognos;
  })();

  function getCognos() {
    var url =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var debug =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var timeout =
      arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 60000;
    var reset = false;

    if (url && url !== cognosUrl) {
      jCognos = undefined;
      reset = true;
    }

    if (typeof jCognos == 'undefined' && url) {
      var myRequest = getCognosRequest(url, debug, reset, timeout)
        .then(function(cRequest) {
          jCognos = new Cognos(debug, timeout);
          jCognos.requester = cRequest;
          jCognos.url = url;
          jCognos.defaultNamespace = cRequest.namespace;
          jCognos.namespaces = cRequest.namespaces;
          return jCognos;
        })
        ['catch'](function(err) {
          throw err;
        });
      return myRequest;
    } else {
      return Promise.resolve(jCognos);
    }
  }

  exports.getCognos = getCognos;

  Object.defineProperty(exports, '__esModule', { value: true });
});
