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
      : factory((global.jcognos = {}));
})(this, function(exports) {
  'use strict';

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

  // The _isBuffer check is for Safari 5-7 support, because it's missing
  // Object.prototype.constructor. Remove this eventually
  var isBuffer_1 = function(obj) {
    return (
      obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
    );
  };

  function isBuffer(obj) {
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
      isBuffer(obj.slice(0, 0))
    );
  }

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
    isBuffer: isBuffer_1,
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
        : typeof window !== 'undefined' ? window : {};

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
        }

        if (!utils.isArray(val)) {
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

  // btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

  var chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  function E() {
    this.message = 'String contains an invalid character';
  }
  E.prototype = new Error();
  E.prototype.code = 5;
  E.prototype.name = 'InvalidCharacterError';

  function btoa$1(input) {
    var str = String(input);
    var output = '';
    for (
      // initialize result and counter
      var block, charCode, idx = 0, map = chars;
      // if the next str index does not exist:
      //   change the mapping table to "="
      //   check if d has no fractional digits
      str.charAt(idx | 0) || ((map = '='), idx % 1);
      // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
      output += map.charAt(63 & (block >> (8 - (idx % 1) * 8)))
    ) {
      charCode = str.charCodeAt((idx += 3 / 4));
      if (charCode > 0xff) {
        throw new E();
      }
      block = (block << 8) | charCode;
    }
    return output;
  }

  var btoa_1 = btoa$1;

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

  var btoa =
    (typeof window !== 'undefined' &&
      window.btoa &&
      window.btoa.bind(window)) ||
    btoa_1;

  var xhr = function xhrAdapter(config$$1) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      var requestData = config$$1.data;
      var requestHeaders = config$$1.headers;

      if (utils.isFormData(requestData)) {
        delete requestHeaders['Content-Type']; // Let the browser set it
      }

      var request = new XMLHttpRequest();
      var loadEvent = 'onreadystatechange';
      var xDomain = false;

      // For IE 8/9 CORS support
      // Only supports POST and GET calls and doesn't returns the response headers.
      // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
      if (
        process.env.NODE_ENV !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest &&
        !('withCredentials' in request) &&
        !isURLSameOrigin(config$$1.url)
      ) {
        request = new window.XDomainRequest();
        loadEvent = 'onload';
        xDomain = true;
        request.onprogress = function handleProgress() {};
        request.ontimeout = function handleTimeout() {};
      }

      // HTTP basic authentication
      if (config$$1.auth) {
        var username = config$$1.auth.username || '';
        var password = config$$1.auth.password || '';
        requestHeaders.Authorization =
          'Basic ' + btoa(username + ':' + password);
      }

      request.open(
        config$$1.method.toUpperCase(),
        buildURL(config$$1.url, config$$1.params, config$$1.paramsSerializer),
        true
      );

      // Set the request timeout in MS
      request.timeout = config$$1.timeout;

      // Listen for ready state
      request[loadEvent] = function handleLoad() {
        if (!request || (request.readyState !== 4 && !xDomain)) {
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
          !config$$1.responseType || config$$1.responseType === 'text'
            ? request.responseText
            : request.response;
        var response = {
          data: responseData,
          // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
          status: request.status === 1223 ? 204 : request.status,
          statusText:
            request.status === 1223 ? 'No Content' : request.statusText,
          headers: responseHeaders,
          config: config$$1,
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
        reject(createError('Network Error', config$$1, null, request));

        // Clean up request
        request = null;
      };

      // Handle timeout
      request.ontimeout = function handleTimeout() {
        reject(
          createError(
            'timeout of ' + config$$1.timeout + 'ms exceeded',
            config$$1,
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
        var cookies$$1 = cookies;

        // Add xsrf header
        var xsrfValue =
          (config$$1.withCredentials || isURLSameOrigin(config$$1.url)) &&
          config$$1.xsrfCookieName
            ? cookies$$1.read(config$$1.xsrfCookieName)
            : undefined;

        if (xsrfValue) {
          requestHeaders[config$$1.xsrfHeaderName] = xsrfValue;
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
      if (config$$1.withCredentials) {
        request.withCredentials = true;
      }

      // Add responseType to request if needed
      if (config$$1.responseType) {
        try {
          request.responseType = config$$1.responseType;
        } catch (e) {
          // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
          // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
          if (config$$1.responseType !== 'json') {
            throw e;
          }
        }
      }

      // Handle progress if needed
      if (typeof config$$1.onDownloadProgress === 'function') {
        request.addEventListener('progress', config$$1.onDownloadProgress);
      }

      // Not all browsers support upload events
      if (typeof config$$1.onUploadProgress === 'function' && request.upload) {
        request.upload.addEventListener('progress', config$$1.onUploadProgress);
      }

      if (config$$1.cancelToken) {
        // Handle cancellation
        config$$1.cancelToken.promise.then(function onCanceled(cancel) {
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
    arr = new Arr(len * 3 / 4 - placeHolders);

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

  /*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
  /* eslint-disable no-proto */

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

  Buffer.isBuffer = isBuffer$2;
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

    function read$$1(buf, i) {
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
          read$$1(arr, i) ===
          read$$1(val, foundIndex === -1 ? 0 : i - foundIndex)
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
          if (read$$1(arr, i + j) !== read$$1(val, j)) {
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

  Buffer.prototype.write = function write$$1(string, offset, length, encoding) {
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
      checkIEEE754(
        buf,
        value,
        offset,
        4,
        3.4028234663852886e38,
        -3.4028234663852886e38
      );
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
      checkIEEE754(
        buf,
        value,
        offset,
        8,
        1.7976931348623157e308,
        -1.7976931348623157e308
      );
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
  function isBuffer$2(obj) {
    return (
      obj != null &&
      (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer$1(obj))
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
  function isSlowBuffer$1(obj) {
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
  var xhr$2;

  function checkTypeSupport(type) {
    if (!xhr$2) {
      xhr$2 = new global$1.XMLHttpRequest();
      // If location.host is empty, e.g. if this page/worker was loaded
      // from a Blob, then use example.com to avoid an error
      xhr$2.open('GET', global$1.location.host ? '/' : 'https://example.com');
    }
    try {
      xhr$2.responseType = type;
      return xhr$2.responseType === type;
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
  var overrideMimeType = isFunction$1(xhr$2.overrideMimeType);
  var vbArray = isFunction$1(global$1.VBArray);

  function isFunction$1(value) {
    return typeof value === 'function';
  }

  xhr$2 = null; // Help gc

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

    if (process.noDeprecation === true) {
      return fn;
    }

    var warned = false;
    function deprecated() {
      if (!warned) {
        if (process.throwDeprecation) {
          throw new Error(msg);
        } else if (process.traceDeprecation) {
          console.trace(msg);
        } else {
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
    if (isUndefined$1(debugEnviron))
      debugEnviron = process.env.NODE_DEBUG || '';
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
    var numLinesEst = 0;
    var length = output.reduce(function(prev, cur) {
      numLinesEst++;
      if (cur.indexOf('\n') >= 0) numLinesEst++;
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

  function isBuffer$3(maybeBuf) {
    return isBuffer$2(maybeBuf);
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

  /**
   * Inherit the prototype methods from one constructor into another.
   *
   * The Function.prototype.inherits from lang.js rewritten as a standalone
   * function (not on Function.prototype). NOTE: If this file is to be loaded
   * during bootstrapping this function needs to be rewritten using some native
   * functions as prototype setup using normal JavaScript does not work as
   * expected during bootstrapping (see mirror.js in r114903).
   *
   * @param {function} ctor Constructor function which needs to inherit the
   *     prototype.
   * @param {function} superCtor Constructor function to inherit prototype from.
   */
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
    isBuffer: isBuffer$3,
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

  var util$1 = Object.freeze({
    format: format,
    deprecate: deprecate,
    debuglog: debuglog,
    inspect: inspect,
    isArray: isArray$2,
    isBoolean: isBoolean,
    isNull: isNull,
    isNullOrUndefined: isNullOrUndefined,
    isNumber: isNumber$1,
    isString: isString$1,
    isSymbol: isSymbol,
    isUndefined: isUndefined$1,
    isRegExp: isRegExp,
    isObject: isObject$1,
    isDate: isDate$1,
    isError: isError,
    isFunction: isFunction$2,
    isPrimitive: isPrimitive,
    isBuffer: isBuffer$3,
    log: log,
    inherits: inherits$1,
    _extend: _extend,
    default: util
  });

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
      if (domain.active && !(this instanceof domain.Domain)) {
        this.domain = domain.active;
      }
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
    var needDomainExit = false;
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

    if (needDomainExit) domain.exit();

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

  function BufferList$1() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList$1.prototype.push = function(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;
    else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList$1.prototype.unshift = function(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList$1.prototype.shift = function() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;
    else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList$1.prototype.clear = function() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList$1.prototype.join = function(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while ((p = p.next)) {
      ret += s + p.data;
    }
    return ret;
  };

  BufferList$1.prototype.concat = function(n) {
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

  Readable$1.ReadableState = ReadableState;
  var debug = debuglog('stream');
  inherits$1(Readable$1, EventEmitter);

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

    if (stream instanceof Duplex$1)
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
    this.buffer = new BufferList$1();
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
  function Readable$1(options) {
    if (!(this instanceof Readable$1)) return new Readable$1(options);

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
  Readable$1.prototype.push = function(chunk, encoding) {
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
  Readable$1.prototype.unshift = function(chunk) {
    var state = this._readableState;
    return readableAddChunk(this, state, chunk, '', true);
  };

  Readable$1.prototype.isPaused = function() {
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
  Readable$1.prototype.setEncoding = function(enc) {
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
  Readable$1.prototype.read = function(n) {
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
      !isBuffer$2(chunk) &&
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
  Readable$1.prototype._read = function(n) {
    this.emit('error', new Error('not implemented'));
  };

  Readable$1.prototype.pipe = function(dest, pipeOpts) {
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

  Readable$1.prototype.unpipe = function(dest) {
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
  Readable$1.prototype.on = function(ev, fn) {
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
          emitReadable(this, state);
        }
      }
    }

    return res;
  };
  Readable$1.prototype.addListener = Readable$1.prototype.on;

  function nReadingNextTick(self) {
    debug('readable nexttick read 0');
    self.read(0);
  }

  // pause() and resume() are remnants of the legacy readable stream API
  // If the user uses them, then switch into old mode.
  Readable$1.prototype.resume = function() {
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

  Readable$1.prototype.pause = function() {
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
  Readable$1.prototype.wrap = function(stream) {
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
  Readable$1._fromList = fromList;

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
  // Implement an async ._write(chunk, encoding, cb), and it'll handle all
  // the drain event emission and buffering.

  Writable$1.WritableState = WritableState;
  inherits$1(Writable$1, EventEmitter);

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

    if (stream instanceof Duplex$1)
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

  function Writable$1(options) {
    // Writable ctor is applied to Duplexes, though they're not
    // instanceof Writable, they're instanceof Readable.
    if (!(this instanceof Writable$1) && !(this instanceof Duplex$1))
      return new Writable$1(options);

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
  Writable$1.prototype.pipe = function() {
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

  Writable$1.prototype.write = function(chunk, encoding, cb) {
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

  Writable$1.prototype.cork = function() {
    var state = this._writableState;

    state.corked++;
  };

  Writable$1.prototype.uncork = function() {
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

  Writable$1.prototype.setDefaultEncoding = function setDefaultEncoding(
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

  Writable$1.prototype._write = function(chunk, encoding, cb) {
    cb(new Error('not implemented'));
  };

  Writable$1.prototype._writev = null;

  Writable$1.prototype.end = function(chunk, encoding, cb) {
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

  inherits$1(Duplex$1, Readable$1);

  var keys = Object.keys(Writable$1.prototype);
  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex$1.prototype[method])
      Duplex$1.prototype[method] = Writable$1.prototype[method];
  }
  function Duplex$1(options) {
    if (!(this instanceof Duplex$1)) return new Duplex$1(options);

    Readable$1.call(this, options);
    Writable$1.call(this, options);

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
  // something with the data.  Sometimes it's called a "filter",
  // but that's not a great name for it, since that implies a thing where
  // some bits pass through, and others are simply ignored.  (That would
  // be a valid example of a transform, of course.)
  //
  // While the output is causally related to the input, it's not a
  // necessarily symmetric or synchronous transformation.  For example,
  // a zlib stream might take multiple plain-text writes(), and then
  // emit a single compressed chunk some time in the future.
  //
  // Here's how this works:
  //
  // The Transform stream has all the aspects of the readable and writable
  // stream classes.  When you write(chunk), that calls _write(chunk,cb)
  // internally, and returns false if there's a lot of pending writes
  // buffered up.  When you call read(), that calls _read(n) until
  // there's enough pending readable data buffered up.
  //
  // In a transform stream, the written data is placed in a buffer.  When
  // _read(n) is called, it transforms the queued up data, calling the
  // buffered _write cb's as it consumes chunks.  If consuming a single
  // written chunk would result in multiple output chunks, then the first
  // outputted bit calls the readcb, and subsequent chunks just go into
  // the read buffer, and will cause it to emit 'readable' if necessary.
  //
  // This way, back-pressure is actually determined by the reading side,
  // since _read has to be called to start processing a new chunk.  However,
  // a pathological inflate type of transform can cause excessive buffering
  // here.  For example, imagine a stream where every byte of input is
  // interpreted as an integer from 0-255, and then results in that many
  // bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
  // 1kb of data being output.  In this case, you could write a very small
  // amount of input, and end up with a very large amount of output.  In
  // such a pathological inflating mechanism, there'd be no way to tell
  // the system to stop doing the transform.  A single 4MB write could
  // cause the system to run out of memory.
  //
  // However, even in such a pathological case, only a single written chunk
  // would be consumed, and then the rest would wait (un-transformed) until
  // the results of the previous transformed chunk were consumed.

  inherits$1(Transform$1, Duplex$1);

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
  function Transform$1(options) {
    if (!(this instanceof Transform$1)) return new Transform$1(options);

    Duplex$1.call(this, options);

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

  Transform$1.prototype.push = function(chunk, encoding) {
    this._transformState.needTransform = false;
    return Duplex$1.prototype.push.call(this, chunk, encoding);
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
  Transform$1.prototype._transform = function(chunk, encoding, cb) {
    throw new Error('Not implemented');
  };

  Transform$1.prototype._write = function(chunk, encoding, cb) {
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
  Transform$1.prototype._read = function(n) {
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

  inherits$1(PassThrough$1, Transform$1);
  function PassThrough$1(options) {
    if (!(this instanceof PassThrough$1)) return new PassThrough$1(options);

    Transform$1.call(this, options);
  }

  PassThrough$1.prototype._transform = function(chunk, encoding, cb) {
    cb(null, chunk);
  };

  inherits$1(Stream$1, EventEmitter);
  Stream$1.Readable = Readable$1;
  Stream$1.Writable = Writable$1;
  Stream$1.Duplex = Duplex$1;
  Stream$1.Transform = Transform$1;
  Stream$1.PassThrough = PassThrough$1;

  // Backwards-compat with node 0.4.x
  Stream$1.Stream = Stream$1;

  // old-style streams.  Note that the pipe method (the only relevant
  // part of this class) is overridden in the Readable class.

  function Stream$1() {
    EventEmitter.call(this);
  }

  Stream$1.prototype.pipe = function(dest, options) {
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

  var stream = Object.freeze({
    default: Stream$1,
    Readable: Readable$1,
    Writable: Writable$1,
    Duplex: Duplex$1,
    Transform: Transform$1,
    PassThrough: PassThrough$1,
    Stream: Stream$1
  });

  var rStates = {
    UNSENT: 0,
    OPENED: 1,
    HEADERS_RECEIVED: 2,
    LOADING: 3,
    DONE: 4
  };
  function IncomingMessage(xhr, response, mode) {
    var self = this;
    Readable$1.call(self);

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

  inherits$1(IncomingMessage, Readable$1);

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

  // MIT License
  // Copyright (c) 2016 John Hiesey
  var toArrayBuffer = function(buf) {
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

    if (isBuffer$2(buf)) {
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
  };

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
  function ClientRequest$1(opts) {
    var self = this;
    Writable$1.call(self);

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

  inherits$1(ClientRequest$1, Writable$1);
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
  ClientRequest$1.prototype.setHeader = function(name, value) {
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

  ClientRequest$1.prototype.getHeader = function(name) {
    var self = this;
    return self._headers[name.toLowerCase()].value;
  };

  ClientRequest$1.prototype.removeHeader = function(name) {
    var self = this;
    delete self._headers[name.toLowerCase()];
  };

  ClientRequest$1.prototype._onFinish = function() {
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

  ClientRequest$1.prototype._onXHRProgress = function() {
    var self = this;

    if (!statusValid(self._xhr) || self._destroyed) return;

    if (!self._response) self._connect();

    self._response._onXHRProgress();
  };

  ClientRequest$1.prototype._connect = function() {
    var self = this;

    if (self._destroyed) return;

    self._response = new IncomingMessage(
      self._xhr,
      self._fetchResponse,
      self._mode
    );
    self.emit('response', self._response);
  };

  ClientRequest$1.prototype._write = function(chunk, encoding, cb) {
    var self = this;

    self._body.push(chunk);
    cb();
  };

  ClientRequest$1.prototype.abort = ClientRequest$1.prototype.destroy = function() {
    var self = this;
    self._destroyed = true;
    if (self._response) self._response._destroyed = true;
    if (self._xhr) self._xhr.abort();
    // Currently, there isn't a way to truly abort a fetch.
    // If you like bikeshedding, see https://github.com/whatwg/fetch/issues/27
  };

  ClientRequest$1.prototype.end = function(data, encoding, cb) {
    var self = this;
    if (typeof data === 'function') {
      cb = data;
      data = undefined;
    }

    Writable$1.prototype.end.call(self, data, encoding, cb);
  };

  ClientRequest$1.prototype.flushHeaders = function() {};
  ClientRequest$1.prototype.setTimeout = function() {};
  ClientRequest$1.prototype.setNoDelay = function() {};
  ClientRequest$1.prototype.setSocketKeepAlive = function() {};

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
    return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
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
              stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
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
  var punycode = {
    version: version$1,
    ucs2: ucs2,
    toASCII: toASCII,
    toUnicode: toUnicode,
    encode: encode$1,
    decode: decode
  };

  var punycode$1 = Object.freeze({
    decode: decode,
    encode: encode$1,
    toUnicode: toUnicode,
    toASCII: toASCII,
    version: version$1,
    ucs2: ucs2,
    default: punycode
  });

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

  function parse$1(qs, sep, eq, options) {
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

  var url = {
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
  var protocolPattern = /^([a-z0-9.+-]+:)/i;
  var portPattern = /:[0-9]*$/;
  var simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/;
  var delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'];
  var unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims);
  var autoEscape = ["'"].concat(unwise);
  var nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape);
  var hostEndingChars = ['/', '?', '#'];
  var hostnameMaxLen = 255;
  var hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/;
  var hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/;
  var unsafeProtocol = {
    javascript: true,
    'javascript:': true
  };
  var hostlessProtocol = {
    javascript: true,
    'javascript:': true
  };
  var slashedProtocol = {
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
    return parse$$1(this, url, parseQueryString, slashesDenoteHost);
  };

  function parse$$1(self, url, parseQueryString, slashesDenoteHost) {
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
            self.query = parse$1(self.search.substr(1));
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
        self.query = parse$1(self.query);
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
    if (isString$1(obj)) obj = parse$$1({}, obj);
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
        : srcPath.length ? srcPath.shift() : '';
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

  var url$1 = Object.freeze({
    parse: urlParse,
    resolve: urlResolve,
    resolveObject: urlResolveObject,
    format: urlFormat,
    default: url,
    Url: Url
  });

  /*
this and http-lib folder

The MIT License

Copyright (c) 2015 John Hiesey

Permission is hereby granted, free of charge,
to any person obtaining a copy of this software and
associated documentation files (the "Software"), to
deal in the Software without restriction, including
without limitation the rights to use, copy, modify,
merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom
the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice
shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR
ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/
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

    var req = new ClientRequest$1(opts);
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

  var http = {
    request,
    get,
    Agent,
    METHODS,
    STATUS_CODES
  };

  var http$1 = Object.freeze({
    request: request,
    get: get,
    Agent: Agent,
    METHODS: METHODS,
    STATUS_CODES: STATUS_CODES,
    default: http
  });

  function createCommonjsModule(fn, module) {
    return (
      (module = { exports: {} }), fn(module, module.exports), module.exports
    );
  }

  function compare(a, b) {
    if (a === b) {
      return 0;
    }

    var x = a.length;
    var y = b.length;

    for (var i = 0, len = Math.min(x, y); i < len; ++i) {
      if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break;
      }
    }

    if (x < y) {
      return -1;
    }
    if (y < x) {
      return 1;
    }
    return 0;
  }
  var hasOwn = Object.prototype.hasOwnProperty;

  var objectKeys$1 =
    Object.keys ||
    function(obj) {
      var keys = [];
      for (var key in obj) {
        if (hasOwn.call(obj, key)) keys.push(key);
      }
      return keys;
    };
  // based on node assert, original notice:

  // http://wiki.commonjs.org/wiki/Unit_Testing/1.0
  //
  // THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
  //
  // Originally from narwhal.js (http://narwhaljs.org)
  // Copyright (c) 2009 Thomas Robinson <280north.com>
  //
  // Permission is hereby granted, free of charge, to any person obtaining a copy
  // of this software and associated documentation files (the 'Software'), to
  // deal in the Software without restriction, including without limitation the
  // rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
  // sell copies of the Software, and to permit persons to whom the Software is
  // furnished to do so, subject to the following conditions:
  //
  // The above copyright notice and this permission notice shall be included in
  // all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  // AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  // ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
  // WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  var pSlice = Array.prototype.slice;
  var _functionsHaveNames;
  function functionsHaveNames() {
    if (typeof _functionsHaveNames !== 'undefined') {
      return _functionsHaveNames;
    }
    return (_functionsHaveNames = (function() {
      return function foo() {}.name === 'foo';
    })());
  }
  function pToString(obj) {
    return Object.prototype.toString.call(obj);
  }
  function isView(arrbuf) {
    if (isBuffer$2(arrbuf)) {
      return false;
    }
    if (typeof global$1.ArrayBuffer !== 'function') {
      return false;
    }
    if (typeof ArrayBuffer.isView === 'function') {
      return ArrayBuffer.isView(arrbuf);
    }
    if (!arrbuf) {
      return false;
    }
    if (arrbuf instanceof DataView) {
      return true;
    }
    if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
      return true;
    }
    return false;
  }
  // 1. The assert module provides functions that throw
  // AssertionError's when particular conditions are not met. The
  // assert module must conform to the following interface.

  function assert(value, message) {
    if (!value) fail(value, true, message, '==', ok);
  }
  // 2. The AssertionError is defined in assert.
  // new assert.AssertionError({ message: message,
  //                             actual: actual,
  //                             expected: expected })

  var regex = /\s*function\s+([^\(\s]*)\s*/;
  // based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
  function getName(func) {
    if (!isFunction$2(func)) {
      return;
    }
    if (functionsHaveNames()) {
      return func.name;
    }
    var str = func.toString();
    var match = str.match(regex);
    return match && match[1];
  }
  assert.AssertionError = AssertionError;
  function AssertionError(options) {
    this.name = 'AssertionError';
    this.actual = options.actual;
    this.expected = options.expected;
    this.operator = options.operator;
    if (options.message) {
      this.message = options.message;
      this.generatedMessage = false;
    } else {
      this.message = getMessage(this);
      this.generatedMessage = true;
    }
    var stackStartFunction = options.stackStartFunction || fail;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, stackStartFunction);
    } else {
      // non v8 browsers so we can have a stacktrace
      var err = new Error();
      if (err.stack) {
        var out = err.stack;

        // try to strip useless frames
        var fn_name = getName(stackStartFunction);
        var idx = out.indexOf('\n' + fn_name);
        if (idx >= 0) {
          // once we have located the function frame
          // we need to strip out everything before it (and its line)
          var next_line = out.indexOf('\n', idx + 1);
          out = out.substring(next_line + 1);
        }

        this.stack = out;
      }
    }
  }

  // assert.AssertionError instanceof Error
  inherits$1(AssertionError, Error);

  function truncate(s, n) {
    if (typeof s === 'string') {
      return s.length < n ? s : s.slice(0, n);
    } else {
      return s;
    }
  }
  function inspect$1(something) {
    if (functionsHaveNames() || !isFunction$2(something)) {
      return inspect(something);
    }
    var rawname = getName(something);
    var name = rawname ? ': ' + rawname : '';
    return '[Function' + name + ']';
  }
  function getMessage(self) {
    return (
      truncate(inspect$1(self.actual), 128) +
      ' ' +
      self.operator +
      ' ' +
      truncate(inspect$1(self.expected), 128)
    );
  }

  // At present only the three keys mentioned above are used and
  // understood by the spec. Implementations or sub modules can pass
  // other keys to the AssertionError's constructor - they will be
  // ignored.

  // 3. All of the following functions must throw an AssertionError
  // when a corresponding condition is not met, with a message that
  // may be undefined if not provided.  All assertion methods provide
  // both the actual and expected values to the assertion error for
  // display purposes.

  function fail(actual, expected, message, operator, stackStartFunction) {
    throw new AssertionError({
      message: message,
      actual: actual,
      expected: expected,
      operator: operator,
      stackStartFunction: stackStartFunction
    });
  }

  // EXTENSION! allows for well behaved errors defined elsewhere.
  assert.fail = fail;

  // 4. Pure assertion tests whether a value is truthy, as determined
  // by !!guard.
  // assert.ok(guard, message_opt);
  // This statement is equivalent to assert.equal(true, !!guard,
  // message_opt);. To test strictly for the value true, use
  // assert.strictEqual(true, guard, message_opt);.

  function ok(value, message) {
    if (!value) fail(value, true, message, '==', ok);
  }
  assert.ok = ok;
  // 5. The equality assertion tests shallow, coercive equality with
  // ==.
  // assert.equal(actual, expected, message_opt);
  assert.equal = equal;
  function equal(actual, expected, message) {
    if (actual != expected) fail(actual, expected, message, '==', equal);
  }

  // 6. The non-equality assertion tests for whether two objects are not equal
  // with != assert.notEqual(actual, expected, message_opt);
  assert.notEqual = notEqual;
  function notEqual(actual, expected, message) {
    if (actual == expected) {
      fail(actual, expected, message, '!=', notEqual);
    }
  }

  // 7. The equivalence assertion tests a deep equality relation.
  // assert.deepEqual(actual, expected, message_opt);
  assert.deepEqual = deepEqual;
  function deepEqual(actual, expected, message) {
    if (!_deepEqual(actual, expected, false)) {
      fail(actual, expected, message, 'deepEqual', deepEqual);
    }
  }
  assert.deepStrictEqual = deepStrictEqual;
  function deepStrictEqual(actual, expected, message) {
    if (!_deepEqual(actual, expected, true)) {
      fail(actual, expected, message, 'deepStrictEqual', deepStrictEqual);
    }
  }

  function _deepEqual(actual, expected, strict, memos) {
    // 7.1. All identical values are equivalent, as determined by ===.
    if (actual === expected) {
      return true;
    } else if (isBuffer$2(actual) && isBuffer$2(expected)) {
      return compare(actual, expected) === 0;

      // 7.2. If the expected value is a Date object, the actual value is
      // equivalent if it is also a Date object that refers to the same time.
    } else if (isDate$1(actual) && isDate$1(expected)) {
      return actual.getTime() === expected.getTime();

      // 7.3 If the expected value is a RegExp object, the actual value is
      // equivalent if it is also a RegExp object with the same source and
      // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
    } else if (isRegExp(actual) && isRegExp(expected)) {
      return (
        actual.source === expected.source &&
        actual.global === expected.global &&
        actual.multiline === expected.multiline &&
        actual.lastIndex === expected.lastIndex &&
        actual.ignoreCase === expected.ignoreCase
      );

      // 7.4. Other pairs that do not both pass typeof value == 'object',
      // equivalence is determined by ==.
    } else if (
      (actual === null || typeof actual !== 'object') &&
      (expected === null || typeof expected !== 'object')
    ) {
      return strict ? actual === expected : actual == expected;

      // If both values are instances of typed arrays, wrap their underlying
      // ArrayBuffers in a Buffer each to increase performance
      // This optimization requires the arrays to have the same type as checked by
      // Object.prototype.toString (aka pToString). Never perform binary
      // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
      // bit patterns are not identical.
    } else if (
      isView(actual) &&
      isView(expected) &&
      pToString(actual) === pToString(expected) &&
      !(actual instanceof Float32Array || actual instanceof Float64Array)
    ) {
      return (
        compare(
          new Uint8Array(actual.buffer),
          new Uint8Array(expected.buffer)
        ) === 0
      );

      // 7.5 For all other Object pairs, including Array objects, equivalence is
      // determined by having the same number of owned properties (as verified
      // with Object.prototype.hasOwnProperty.call), the same set of keys
      // (although not necessarily the same order), equivalent values for every
      // corresponding key, and an identical 'prototype' property. Note: this
      // accounts for both named and indexed properties on Arrays.
    } else if (isBuffer$2(actual) !== isBuffer$2(expected)) {
      return false;
    } else {
      memos = memos || { actual: [], expected: [] };

      var actualIndex = memos.actual.indexOf(actual);
      if (actualIndex !== -1) {
        if (actualIndex === memos.expected.indexOf(expected)) {
          return true;
        }
      }

      memos.actual.push(actual);
      memos.expected.push(expected);

      return objEquiv(actual, expected, strict, memos);
    }
  }

  function isArguments(object) {
    return Object.prototype.toString.call(object) == '[object Arguments]';
  }

  function objEquiv(a, b, strict, actualVisitedObjects) {
    if (a === null || a === undefined || b === null || b === undefined)
      return false;
    // if one is a primitive, the other must be same
    if (isPrimitive(a) || isPrimitive(b)) return a === b;
    if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
      return false;
    var aIsArgs = isArguments(a);
    var bIsArgs = isArguments(b);
    if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs)) return false;
    if (aIsArgs) {
      a = pSlice.call(a);
      b = pSlice.call(b);
      return _deepEqual(a, b, strict);
    }
    var ka = objectKeys$1(a);
    var kb = objectKeys$1(b);
    var key, i;
    // having the same number of owned properties (keys incorporates
    // hasOwnProperty)
    if (ka.length !== kb.length) return false;
    //the same set of keys (although not necessarily the same order),
    ka.sort();
    kb.sort();
    //~~~cheap key test
    for (i = ka.length - 1; i >= 0; i--) {
      if (ka[i] !== kb[i]) return false;
    }
    //equivalent values for every corresponding key, and
    //~~~possibly expensive deep test
    for (i = ka.length - 1; i >= 0; i--) {
      key = ka[i];
      if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
        return false;
    }
    return true;
  }

  // 8. The non-equivalence assertion tests for any deep inequality.
  // assert.notDeepEqual(actual, expected, message_opt);
  assert.notDeepEqual = notDeepEqual;
  function notDeepEqual(actual, expected, message) {
    if (_deepEqual(actual, expected, false)) {
      fail(actual, expected, message, 'notDeepEqual', notDeepEqual);
    }
  }

  assert.notDeepStrictEqual = notDeepStrictEqual;
  function notDeepStrictEqual(actual, expected, message) {
    if (_deepEqual(actual, expected, true)) {
      fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
    }
  }

  // 9. The strict equality assertion tests strict equality, as determined by ===.
  // assert.strictEqual(actual, expected, message_opt);
  assert.strictEqual = strictEqual;
  function strictEqual(actual, expected, message) {
    if (actual !== expected) {
      fail(actual, expected, message, '===', strictEqual);
    }
  }

  // 10. The strict non-equality assertion tests for strict inequality, as
  // determined by !==.  assert.notStrictEqual(actual, expected, message_opt);
  assert.notStrictEqual = notStrictEqual;
  function notStrictEqual(actual, expected, message) {
    if (actual === expected) {
      fail(actual, expected, message, '!==', notStrictEqual);
    }
  }

  function expectedException(actual, expected) {
    if (!actual || !expected) {
      return false;
    }

    if (Object.prototype.toString.call(expected) == '[object RegExp]') {
      return expected.test(actual);
    }

    try {
      if (actual instanceof expected) {
        return true;
      }
    } catch (e) {
      // Ignore.  The instanceof check doesn't work for arrow functions.
    }

    if (Error.isPrototypeOf(expected)) {
      return false;
    }

    return expected.call({}, actual) === true;
  }

  function _tryBlock(block) {
    var error;
    try {
      block();
    } catch (e) {
      error = e;
    }
    return error;
  }

  function _throws(shouldThrow, block, expected, message) {
    var actual;

    if (typeof block !== 'function') {
      throw new TypeError('"block" argument must be a function');
    }

    if (typeof expected === 'string') {
      message = expected;
      expected = null;
    }

    actual = _tryBlock(block);

    message =
      (expected && expected.name ? ' (' + expected.name + ').' : '.') +
      (message ? ' ' + message : '.');

    if (shouldThrow && !actual) {
      fail(actual, expected, 'Missing expected exception' + message);
    }

    var userProvidedMessage = typeof message === 'string';
    var isUnwantedException = !shouldThrow && isError(actual);
    var isUnexpectedException = !shouldThrow && actual && !expected;

    if (
      (isUnwantedException &&
        userProvidedMessage &&
        expectedException(actual, expected)) ||
      isUnexpectedException
    ) {
      fail(actual, expected, 'Got unwanted exception' + message);
    }

    if (
      (shouldThrow &&
        actual &&
        expected &&
        !expectedException(actual, expected)) ||
      (!shouldThrow && actual)
    ) {
      throw actual;
    }
  }

  // 11. Expected to throw an error:
  // assert.throws(block, Error_opt, message_opt);
  assert.throws = throws;
  function throws(block, /*optional*/ error, /*optional*/ message) {
    _throws(true, block, error, message);
  }

  // EXTENSION! This is annoying to write outside this module.
  assert.doesNotThrow = doesNotThrow;
  function doesNotThrow(block, /*optional*/ error, /*optional*/ message) {
    _throws(false, block, error, message);
  }

  assert.ifError = ifError;
  function ifError(err) {
    if (err) throw err;
  }

  var assert$2 = Object.freeze({
    default: assert,
    AssertionError: AssertionError,
    fail: fail,
    ok: ok,
    assert: ok,
    equal: equal,
    notEqual: notEqual,
    deepEqual: deepEqual,
    deepStrictEqual: deepStrictEqual,
    notDeepEqual: notDeepEqual,
    notDeepStrictEqual: notDeepStrictEqual,
    strictEqual: strictEqual,
    notStrictEqual: notStrictEqual,
    throws: throws,
    doesNotThrow: doesNotThrow,
    ifError: ifError
  });

  /**
   * Helpers.
   */

  var s = 1000;
  var m = s * 60;
  var h = m * 60;
  var d = h * 24;
  var y = d * 365.25;

  /**
   * Parse or format the given `val`.
   *
   * Options:
   *
   *  - `long` verbose formatting [false]
   *
   * @param {String|Number} val
   * @param {Object} [options]
   * @throws {Error} throw an error if val is not a non-empty string or a number
   * @return {String|Number}
   * @api public
   */

  var ms = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === 'string' && val.length > 0) {
      return parse$2(val);
    } else if (type === 'number' && isNaN(val) === false) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error(
      'val is not a non-empty string or a valid number. val=' +
        JSON.stringify(val)
    );
  };

  /**
   * Parse the given `str` and return milliseconds.
   *
   * @param {String} str
   * @return {Number}
   * @api private
   */

  function parse$2(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
      str
    );
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || 'ms').toLowerCase();
    switch (type) {
      case 'years':
      case 'year':
      case 'yrs':
      case 'yr':
      case 'y':
        return n * y;
      case 'days':
      case 'day':
      case 'd':
        return n * d;
      case 'hours':
      case 'hour':
      case 'hrs':
      case 'hr':
      case 'h':
        return n * h;
      case 'minutes':
      case 'minute':
      case 'mins':
      case 'min':
      case 'm':
        return n * m;
      case 'seconds':
      case 'second':
      case 'secs':
      case 'sec':
      case 's':
        return n * s;
      case 'milliseconds':
      case 'millisecond':
      case 'msecs':
      case 'msec':
      case 'ms':
        return n;
      default:
        return undefined;
    }
  }

  /**
   * Short format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */

  function fmtShort(ms) {
    if (ms >= d) {
      return Math.round(ms / d) + 'd';
    }
    if (ms >= h) {
      return Math.round(ms / h) + 'h';
    }
    if (ms >= m) {
      return Math.round(ms / m) + 'm';
    }
    if (ms >= s) {
      return Math.round(ms / s) + 's';
    }
    return ms + 'ms';
  }

  /**
   * Long format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */

  function fmtLong(ms) {
    return (
      plural(ms, d, 'day') ||
      plural(ms, h, 'hour') ||
      plural(ms, m, 'minute') ||
      plural(ms, s, 'second') ||
      ms + ' ms'
    );
  }

  /**
   * Pluralization helper.
   */

  function plural(ms, n, name) {
    if (ms < n) {
      return;
    }
    if (ms < n * 1.5) {
      return Math.floor(ms / n) + ' ' + name;
    }
    return Math.ceil(ms / n) + ' ' + name + 's';
  }

  var debug$1 = createCommonjsModule(function(module, exports) {
    /**
     * This is the common logic for both the Node.js and web browser
     * implementations of `debug()`.
     *
     * Expose `debug()` as the module.
     */

    exports = module.exports = createDebug.debug = createDebug[
      'default'
    ] = createDebug;
    exports.coerce = coerce;
    exports.disable = disable;
    exports.enable = enable;
    exports.enabled = enabled;
    exports.humanize = ms;

    /**
     * The currently active debug mode names, and names to skip.
     */

    exports.names = [];
    exports.skips = [];

    /**
     * Map of special "%n" handling functions, for the debug "format" argument.
     *
     * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
     */

    exports.formatters = {};

    /**
     * Previous log timestamp.
     */

    var prevTime;

    /**
     * Select a color.
     * @param {String} namespace
     * @return {Number}
     * @api private
     */

    function selectColor(namespace) {
      var hash = 0,
        i;

      for (i in namespace) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
      }

      return exports.colors[Math.abs(hash) % exports.colors.length];
    }

    /**
     * Create a debugger with the given `namespace`.
     *
     * @param {String} namespace
     * @return {Function}
     * @api public
     */

    function createDebug(namespace) {
      function debug() {
        // disabled?
        if (!debug.enabled) return;

        var self = debug;

        // set `diff` timestamp
        var curr = +new Date();
        var ms$$1 = curr - (prevTime || curr);
        self.diff = ms$$1;
        self.prev = prevTime;
        self.curr = curr;
        prevTime = curr;

        // turn the `arguments` into a proper Array
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }

        args[0] = exports.coerce(args[0]);

        if ('string' !== typeof args[0]) {
          // anything else let's inspect with %O
          args.unshift('%O');
        }

        // apply any `formatters` transformations
        var index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
          // if we encounter an escaped % then don't increase the array index
          if (match === '%%') return match;
          index++;
          var formatter = exports.formatters[format];
          if ('function' === typeof formatter) {
            var val = args[index];
            match = formatter.call(self, val);

            // now we need to remove `args[index]` since it's inlined in the `format`
            args.splice(index, 1);
            index--;
          }
          return match;
        });

        // apply env-specific formatting (colors, etc.)
        exports.formatArgs.call(self, args);

        var logFn = debug.log || exports.log || console.log.bind(console);
        logFn.apply(self, args);
      }

      debug.namespace = namespace;
      debug.enabled = exports.enabled(namespace);
      debug.useColors = exports.useColors();
      debug.color = selectColor(namespace);

      // env-specific initialization logic for debug instances
      if ('function' === typeof exports.init) {
        exports.init(debug);
      }

      return debug;
    }

    /**
     * Enables a debug mode by namespaces. This can include modes
     * separated by a colon and wildcards.
     *
     * @param {String} namespaces
     * @api public
     */

    function enable(namespaces) {
      exports.save(namespaces);

      exports.names = [];
      exports.skips = [];

      var split = (typeof namespaces === 'string' ? namespaces : '').split(
        /[\s,]+/
      );
      var len = split.length;

      for (var i = 0; i < len; i++) {
        if (!split[i]) continue; // ignore empty strings
        namespaces = split[i].replace(/\*/g, '.*?');
        if (namespaces[0] === '-') {
          exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
        } else {
          exports.names.push(new RegExp('^' + namespaces + '$'));
        }
      }
    }

    /**
     * Disable debug output.
     *
     * @api public
     */

    function disable() {
      exports.enable('');
    }

    /**
     * Returns true if the given mode name is enabled, false otherwise.
     *
     * @param {String} name
     * @return {Boolean}
     * @api public
     */

    function enabled(name) {
      var i, len;
      for (i = 0, len = exports.skips.length; i < len; i++) {
        if (exports.skips[i].test(name)) {
          return false;
        }
      }
      for (i = 0, len = exports.names.length; i < len; i++) {
        if (exports.names[i].test(name)) {
          return true;
        }
      }
      return false;
    }

    /**
     * Coerce `val`.
     *
     * @param {Mixed} val
     * @return {Mixed}
     * @api private
     */

    function coerce(val) {
      if (val instanceof Error) return val.stack || val.message;
      return val;
    }
  });

  var debug_1 = debug$1.coerce;
  var debug_2 = debug$1.disable;
  var debug_3 = debug$1.enable;
  var debug_4 = debug$1.enabled;
  var debug_5 = debug$1.humanize;
  var debug_6 = debug$1.names;
  var debug_7 = debug$1.skips;
  var debug_8 = debug$1.formatters;

  var browser$1 = createCommonjsModule(function(module, exports) {
    /**
     * This is the web browser implementation of `debug()`.
     *
     * Expose `debug()` as the module.
     */

    exports = module.exports = debug$1;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage =
      'undefined' != typeof chrome && 'undefined' != typeof chrome.storage
        ? chrome.storage.local
        : localstorage();

    /**
     * Colors.
     */

    exports.colors = [
      'lightseagreen',
      'forestgreen',
      'goldenrod',
      'dodgerblue',
      'darkorchid',
      'crimson'
    ];

    /**
     * Currently only WebKit-based Web Inspectors, Firefox >= v31,
     * and the Firebug extension (any Firefox version) are known
     * to support "%c" CSS customizations.
     *
     * TODO: add a `localStorage` variable to explicitly enable/disable colors
     */

    function useColors() {
      // NB: In an Electron preload script, document will be defined but not fully
      // initialized. Since we know we're in Chrome, we'll just detect this case
      // explicitly
      if (
        typeof window !== 'undefined' &&
        window.process &&
        window.process.type === 'renderer'
      ) {
        return true;
      }

      // is webkit? http://stackoverflow.com/a/16459606/376773
      // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
      return (
        (typeof document !== 'undefined' &&
          document.documentElement &&
          document.documentElement.style &&
          document.documentElement.style.WebkitAppearance) ||
        // is firebug? http://stackoverflow.com/a/398120/376773
        (typeof window !== 'undefined' &&
          window.console &&
          (window.console.firebug ||
            (window.console.exception && window.console.table))) ||
        // is firefox >= v31?
        // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
        (typeof navigator !== 'undefined' &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
          parseInt(RegExp.$1, 10) >= 31) ||
        // double check webkit in userAgent just in case we are in a worker
        (typeof navigator !== 'undefined' &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
      );
    }

    /**
     * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
     */

    exports.formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (err) {
        return '[UnexpectedJSONParseError]: ' + err.message;
      }
    };

    /**
     * Colorize log arguments if enabled.
     *
     * @api public
     */

    function formatArgs(args) {
      var useColors = this.useColors;

      args[0] =
        (useColors ? '%c' : '') +
        this.namespace +
        (useColors ? ' %c' : ' ') +
        args[0] +
        (useColors ? '%c ' : ' ') +
        '+' +
        exports.humanize(this.diff);

      if (!useColors) return;

      var c = 'color: ' + this.color;
      args.splice(1, 0, c, 'color: inherit');

      // the final "%c" is somewhat tricky, because there could be other
      // arguments passed either before or after the %c, so we need to
      // figure out the correct index to insert the CSS into
      var index = 0;
      var lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, function(match) {
        if ('%%' === match) return;
        index++;
        if ('%c' === match) {
          // we only are interested in the *last* %c
          // (the user may have provided their own)
          lastC = index;
        }
      });

      args.splice(lastC, 0, c);
    }

    /**
     * Invokes `console.log()` when available.
     * No-op when `console.log` is not a "function".
     *
     * @api public
     */

    function log() {
      // this hackery is required for IE8/9, where
      // the `console.log` function doesn't have 'apply'
      return (
        'object' === typeof console &&
        console.log &&
        Function.prototype.apply.call(console.log, console, arguments)
      );
    }

    /**
     * Save `namespaces`.
     *
     * @param {String} namespaces
     * @api private
     */

    function save(namespaces) {
      try {
        if (null == namespaces) {
          exports.storage.removeItem('debug');
        } else {
          exports.storage.debug = namespaces;
        }
      } catch (e) {}
    }

    /**
     * Load `namespaces`.
     *
     * @return {String} returns the previously persisted debug modes
     * @api private
     */

    function load() {
      var r;
      try {
        r = exports.storage.debug;
      } catch (e) {}

      // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
      if (!r && typeof process !== 'undefined' && 'env' in process) {
        r = process.env.DEBUG;
      }

      return r;
    }

    /**
     * Enable namespaces listed in `localStorage.debug` initially.
     */

    exports.enable(load());

    /**
     * Localstorage attempts to return the localstorage.
     *
     * This is necessary because safari throws
     * when a user disables cookies/localstorage
     * and you attempt to access it.
     *
     * @return {LocalStorage}
     * @api private
     */

    function localstorage() {
      try {
        return window.localStorage;
      } catch (e) {}
    }
  });

  var browser_1 = browser$1.log;
  var browser_2 = browser$1.formatArgs;
  var browser_3 = browser$1.save;
  var browser_4 = browser$1.load;
  var browser_5 = browser$1.useColors;
  var browser_6 = browser$1.storage;
  var browser_7 = browser$1.colors;

  var require$$0$3 = (url$1 && url) || url$1;

  var assert$3 = (assert$2 && assert) || assert$2;

  var https = (http$1 && http) || http$1;

  var require$$0$4 = (stream && Stream$1) || stream;

  var followRedirects = createCommonjsModule(function(module) {
    var Writable = require$$0$4.Writable;
    var debug = browser$1('follow-redirects');

    var nativeProtocols = { 'http:': https, 'https:': https };
    var schemes = {};
    var exports = (module.exports = {
      maxRedirects: 21
    });
    // RFC7231§4.2.1: Of the request methods defined by this specification,
    // the GET, HEAD, OPTIONS, and TRACE methods are defined to be safe.
    var safeMethods = { GET: true, HEAD: true, OPTIONS: true, TRACE: true };

    // Create handlers that pass events from native requests
    var eventHandlers = Object.create(null);
    ['abort', 'aborted', 'error', 'socket'].forEach(function(event) {
      eventHandlers[event] = function(arg) {
        this._redirectable.emit(event, arg);
      };
    });

    // An HTTP(S) request that can be redirected
    function RedirectableRequest(options, responseCallback) {
      // Initialize the request
      Writable.call(this);
      this._options = options;
      this._redirectCount = 0;
      this._bufferedWrites = [];

      // Attach a callback if passed
      if (responseCallback) {
        this.on('response', responseCallback);
      }

      // React to responses of native requests
      var self = this;
      this._onNativeResponse = function(response) {
        self._processResponse(response);
      };

      // Complete the URL object when necessary
      if (!options.pathname && options.path) {
        var searchPos = options.path.indexOf('?');
        if (searchPos < 0) {
          options.pathname = options.path;
        } else {
          options.pathname = options.path.substring(0, searchPos);
          options.search = options.path.substring(searchPos);
        }
      }

      // Perform the first request
      this._performRequest();
    }
    RedirectableRequest.prototype = Object.create(Writable.prototype);

    // Executes the next native request (initial or redirect)
    RedirectableRequest.prototype._performRequest = function() {
      // If specified, use the agent corresponding to the protocol
      // (HTTP and HTTPS use different types of agents)
      var protocol = this._options.protocol;
      if (this._options.agents) {
        this._options.agent = this._options.agents[schemes[protocol]];
      }

      // Create the native request
      var nativeProtocol = nativeProtocols[protocol];
      var request = (this._currentRequest = nativeProtocol.request(
        this._options,
        this._onNativeResponse
      ));
      this._currentUrl = require$$0$3.format(this._options);

      // Set up event handlers
      request._redirectable = this;
      for (var event in eventHandlers) {
        /* istanbul ignore else */
        if (event) {
          request.on(event, eventHandlers[event]);
        }
      }

      // End a redirected request
      // (The first request must be ended explicitly with RedirectableRequest#end)
      if (this._isRedirect) {
        // If the request doesn't have en entity, end directly.
        var bufferedWrites = this._bufferedWrites;
        if (bufferedWrites.length === 0) {
          request.end();
          // Otherwise, write the request entity and end afterwards.
        } else {
          var i = 0;
          (function writeNext() {
            if (i < bufferedWrites.length) {
              var bufferedWrite = bufferedWrites[i++];
              request.write(
                bufferedWrite.data,
                bufferedWrite.encoding,
                writeNext
              );
            } else {
              request.end();
            }
          })();
        }
      }
    };

    // Processes a response from the current native request
    RedirectableRequest.prototype._processResponse = function(response) {
      // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
      // that further action needs to be taken by the user agent in order to
      // fulfill the request. If a Location header field is provided,
      // the user agent MAY automatically redirect its request to the URI
      // referenced by the Location field value,
      // even if the specific status code is not understood.
      var location = response.headers.location;
      if (
        location &&
        this._options.followRedirects !== false &&
        response.statusCode >= 300 &&
        response.statusCode < 400
      ) {
        // RFC7231§6.4: A client SHOULD detect and intervene
        // in cyclical redirections (i.e., "infinite" redirection loops).
        if (++this._redirectCount > this._options.maxRedirects) {
          return this.emit('error', new Error('Max redirects exceeded.'));
        }

        // RFC7231§6.4: Automatic redirection needs to done with
        // care for methods not known to be safe […],
        // since the user might not wish to redirect an unsafe request.
        // RFC7231§6.4.7: The 307 (Temporary Redirect) status code indicates
        // that the target resource resides temporarily under a different URI
        // and the user agent MUST NOT change the request method
        // if it performs an automatic redirection to that URI.
        var header;
        var headers = this._options.headers;
        if (
          response.statusCode !== 307 &&
          !(this._options.method in safeMethods)
        ) {
          this._options.method = 'GET';
          // Drop a possible entity and headers related to it
          this._bufferedWrites = [];
          for (header in headers) {
            if (/^content-/i.test(header)) {
              delete headers[header];
            }
          }
        }

        // Drop the Host header, as the redirect might lead to a different host
        if (!this._isRedirect) {
          for (header in headers) {
            if (/^host$/i.test(header)) {
              delete headers[header];
            }
          }
        }

        // Perform the redirected request
        var redirectUrl = require$$0$3.resolve(this._currentUrl, location);
        debug('redirecting to', redirectUrl);
        Object.assign(this._options, require$$0$3.parse(redirectUrl));
        this._isRedirect = true;
        this._performRequest();
      } else {
        // The response is not a redirect; return it as-is
        response.responseUrl = this._currentUrl;
        this.emit('response', response);

        // Clean up
        delete this._options;
        delete this._bufferedWrites;
      }
    };

    // Aborts the current native request
    RedirectableRequest.prototype.abort = function() {
      this._currentRequest.abort();
    };

    // Flushes the headers of the current native request
    RedirectableRequest.prototype.flushHeaders = function() {
      this._currentRequest.flushHeaders();
    };

    // Sets the noDelay option of the current native request
    RedirectableRequest.prototype.setNoDelay = function(noDelay) {
      this._currentRequest.setNoDelay(noDelay);
    };

    // Sets the socketKeepAlive option of the current native request
    RedirectableRequest.prototype.setSocketKeepAlive = function(
      enable,
      initialDelay
    ) {
      this._currentRequest.setSocketKeepAlive(enable, initialDelay);
    };

    // Sets the timeout option of the current native request
    RedirectableRequest.prototype.setTimeout = function(timeout, callback) {
      this._currentRequest.setTimeout(timeout, callback);
    };

    // Writes buffered data to the current native request
    RedirectableRequest.prototype.write = function(data, encoding, callback) {
      this._currentRequest.write(data, encoding, callback);
      this._bufferedWrites.push({ data: data, encoding: encoding });
    };

    // Ends the current native request
    RedirectableRequest.prototype.end = function(data, encoding, callback) {
      this._currentRequest.end(data, encoding, callback);
      if (data) {
        this._bufferedWrites.push({ data: data, encoding: encoding });
      }
    };

    // Export a redirecting wrapper for each native protocol
    Object.keys(nativeProtocols).forEach(function(protocol) {
      var scheme = (schemes[protocol] = protocol.substr(
        0,
        protocol.length - 1
      ));
      var nativeProtocol = nativeProtocols[protocol];
      var wrappedProtocol = (exports[scheme] = Object.create(nativeProtocol));

      // Executes an HTTP request, following redirects
      wrappedProtocol.request = function(options, callback) {
        if (typeof options === 'string') {
          options = require$$0$3.parse(options);
          options.maxRedirects = exports.maxRedirects;
        } else {
          options = Object.assign(
            {
              maxRedirects: exports.maxRedirects,
              protocol: protocol
            },
            options
          );
        }
        assert$3.equal(options.protocol, protocol, 'protocol mismatch');
        debug('options', options);

        return new RedirectableRequest(options, callback);
      };

      // Executes a GET request, following redirects
      wrappedProtocol.get = function(options, callback) {
        var request = wrappedProtocol.request(options, callback);
        request.end();
        return request;
      };
    });
  });

  var followRedirects_1 = followRedirects.maxRedirects;

  var msg = {
    2: 'need dictionary' /* Z_NEED_DICT       2  */,
    1: 'stream end' /* Z_STREAM_END      1  */,
    0: '' /* Z_OK              0  */,
    '-1': 'file error' /* Z_ERRNO         (-1) */,
    '-2': 'stream error' /* Z_STREAM_ERROR  (-2) */,
    '-3': 'data error' /* Z_DATA_ERROR    (-3) */,
    '-4': 'insufficient memory' /* Z_MEM_ERROR     (-4) */,
    '-5': 'buffer error' /* Z_BUF_ERROR     (-5) */,
    '-6': 'incompatible version' /* Z_VERSION_ERROR (-6) */
  };

  function ZStream() {
    /* next input byte */
    this.input = null; // JS specific, because we have no pointers
    this.next_in = 0;
    /* number of bytes available at input */
    this.avail_in = 0;
    /* total number of input bytes read so far */
    this.total_in = 0;
    /* next output byte should be put there */
    this.output = null; // JS specific, because we have no pointers
    this.next_out = 0;
    /* remaining free space at output */
    this.avail_out = 0;
    /* total number of bytes output so far */
    this.total_out = 0;
    /* last error message, NULL if no error */
    this.msg = '' /*Z_NULL*/;
    /* not visible by applications */
    this.state = null;
    /* best guess about the data type: binary or text */
    this.data_type = 2 /*Z_UNKNOWN*/;
    /* adler32 value of the uncompressed data */
    this.adler = 0;
  }

  // reduce buffer size, avoiding mem copy

  function arraySet(dest, src, src_offs, len, dest_offs) {
    if (src.subarray && dest.subarray) {
      dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
      return;
    }
    // Fallback to ordinary array
    for (var i = 0; i < len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  }

  var Buf8 = Uint8Array;
  var Buf16 = Uint16Array;
  var Buf32 = Int32Array;
  // Enable/Disable typed arrays use, for testing
  //

  /* Public constants ==========================================================*/
  /* ===========================================================================*/

  //var Z_FILTERED          = 1;
  //var Z_HUFFMAN_ONLY      = 2;
  //var Z_RLE               = 3;
  var Z_FIXED$2 = 4;
  //var Z_DEFAULT_STRATEGY  = 0;

  /* Possible values of the data_type field (though see inflate()) */
  var Z_BINARY$1 = 0;
  var Z_TEXT$1 = 1;
  //var Z_ASCII             = 1; // = Z_TEXT
  var Z_UNKNOWN$2 = 2;

  /*============================================================================*/

  function zero$1(buf) {
    var len = buf.length;
    while (--len >= 0) {
      buf[len] = 0;
    }
  }

  // From zutil.h

  var STORED_BLOCK = 0;
  var STATIC_TREES = 1;
  var DYN_TREES = 2;
  /* The three kinds of block type */

  var MIN_MATCH$1 = 3;
  var MAX_MATCH$1 = 258;
  /* The minimum and maximum match lengths */

  // From deflate.h
  /* ===========================================================================
 * Internal compression state.
 */

  var LENGTH_CODES$1 = 29;
  /* number of length codes, not counting the special END_BLOCK code */

  var LITERALS$1 = 256;
  /* number of literal bytes 0..255 */

  var L_CODES$1 = LITERALS$1 + 1 + LENGTH_CODES$1;
  /* number of Literal or Length codes, including the END_BLOCK code */

  var D_CODES$1 = 30;
  /* number of distance codes */

  var BL_CODES$1 = 19;
  /* number of codes used to transfer the bit lengths */

  var HEAP_SIZE$1 = 2 * L_CODES$1 + 1;
  /* maximum heap size */

  var MAX_BITS$1 = 15;
  /* All codes must not exceed MAX_BITS bits */

  var Buf_size = 16;
  /* size of bit buffer in bi_buf */

  /* ===========================================================================
 * Constants
 */

  var MAX_BL_BITS = 7;
  /* Bit length codes must not exceed MAX_BL_BITS bits */

  var END_BLOCK = 256;
  /* end of block literal code */

  var REP_3_6 = 16;
  /* repeat previous bit length 3-6 times (2 bits of repeat count) */

  var REPZ_3_10 = 17;
  /* repeat a zero length 3-10 times  (3 bits of repeat count) */

  var REPZ_11_138 = 18;
  /* repeat a zero length 11-138 times  (7 bits of repeat count) */

  /* eslint-disable comma-spacing,array-bracket-spacing */
  var extra_lbits = /* extra bits for each length code */ [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    4,
    4,
    4,
    4,
    5,
    5,
    5,
    5,
    0
  ];

  var extra_dbits = /* extra bits for each distance code */ [
    0,
    0,
    0,
    0,
    1,
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    5,
    5,
    6,
    6,
    7,
    7,
    8,
    8,
    9,
    9,
    10,
    10,
    11,
    11,
    12,
    12,
    13,
    13
  ];

  var extra_blbits = /* extra bits for each bit length code */ [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    2,
    3,
    7
  ];

  var bl_order = [
    16,
    17,
    18,
    0,
    8,
    7,
    9,
    6,
    10,
    5,
    11,
    4,
    12,
    3,
    13,
    2,
    14,
    1,
    15
  ];
  /* eslint-enable comma-spacing,array-bracket-spacing */

  /* The lengths of the bit length codes are sent in order of decreasing
 * probability, to avoid transmitting the lengths for unused bit length codes.
 */

  /* ===========================================================================
 * Local data. These are initialized only once.
 */

  // We pre-fill arrays with 0 to avoid uninitialized gaps

  var DIST_CODE_LEN = 512; /* see definition of array dist_code below */

  // !!!! Use flat array insdead of structure, Freq = i*2, Len = i*2+1
  var static_ltree = new Array((L_CODES$1 + 2) * 2);
  zero$1(static_ltree);
  /* The static literal tree. Since the bit lengths are imposed, there is no
 * need for the L_CODES extra codes used during heap construction. However
 * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
 * below).
 */

  var static_dtree = new Array(D_CODES$1 * 2);
  zero$1(static_dtree);
  /* The static distance tree. (Actually a trivial tree since all codes use
 * 5 bits.)
 */

  var _dist_code = new Array(DIST_CODE_LEN);
  zero$1(_dist_code);
  /* Distance codes. The first 256 values correspond to the distances
 * 3 .. 258, the last 256 values correspond to the top 8 bits of
 * the 15 bit distances.
 */

  var _length_code = new Array(MAX_MATCH$1 - MIN_MATCH$1 + 1);
  zero$1(_length_code);
  /* length code for each normalized match length (0 == MIN_MATCH) */

  var base_length = new Array(LENGTH_CODES$1);
  zero$1(base_length);
  /* First normalized length for each code (0 = MIN_MATCH) */

  var base_dist = new Array(D_CODES$1);
  zero$1(base_dist);
  /* First normalized distance for each code (0 = distance of 1) */

  function StaticTreeDesc(
    static_tree,
    extra_bits,
    extra_base,
    elems,
    max_length
  ) {
    this.static_tree = static_tree; /* static tree or NULL */
    this.extra_bits = extra_bits; /* extra bits for each code or NULL */
    this.extra_base = extra_base; /* base index for extra_bits */
    this.elems = elems; /* max number of elements in the tree */
    this.max_length = max_length; /* max bit length for the codes */

    // show if `static_tree` has data or dummy - needed for monomorphic objects
    this.has_stree = static_tree && static_tree.length;
  }

  var static_l_desc;
  var static_d_desc;
  var static_bl_desc;

  function TreeDesc(dyn_tree, stat_desc) {
    this.dyn_tree = dyn_tree; /* the dynamic tree */
    this.max_code = 0; /* largest code with non zero frequency */
    this.stat_desc = stat_desc; /* the corresponding static tree */
  }

  function d_code(dist) {
    return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
  }

  /* ===========================================================================
 * Output a short LSB first on the stream.
 * IN assertion: there is enough room in pendingBuf.
 */
  function put_short(s, w) {
    //    put_byte(s, (uch)((w) & 0xff));
    //    put_byte(s, (uch)((ush)(w) >> 8));
    s.pending_buf[s.pending++] = w & 0xff;
    s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
  }

  /* ===========================================================================
 * Send a value on a given number of bits.
 * IN assertion: length <= 16 and value fits in length bits.
 */
  function send_bits(s, value, length) {
    if (s.bi_valid > Buf_size - length) {
      s.bi_buf |= (value << s.bi_valid) & 0xffff;
      put_short(s, s.bi_buf);
      s.bi_buf = value >> (Buf_size - s.bi_valid);
      s.bi_valid += length - Buf_size;
    } else {
      s.bi_buf |= (value << s.bi_valid) & 0xffff;
      s.bi_valid += length;
    }
  }

  function send_code(s, c, tree) {
    send_bits(s, tree[c * 2] /*.Code*/, tree[c * 2 + 1] /*.Len*/);
  }

  /* ===========================================================================
 * Reverse the first len bits of a code, using straightforward code (a faster
 * method would use a table)
 * IN assertion: 1 <= len <= 15
 */
  function bi_reverse(code, len) {
    var res = 0;
    do {
      res |= code & 1;
      code >>>= 1;
      res <<= 1;
    } while (--len > 0);
    return res >>> 1;
  }

  /* ===========================================================================
 * Flush the bit buffer, keeping at most 7 bits in it.
 */
  function bi_flush(s) {
    if (s.bi_valid === 16) {
      put_short(s, s.bi_buf);
      s.bi_buf = 0;
      s.bi_valid = 0;
    } else if (s.bi_valid >= 8) {
      s.pending_buf[s.pending++] = s.bi_buf & 0xff;
      s.bi_buf >>= 8;
      s.bi_valid -= 8;
    }
  }

  /* ===========================================================================
 * Compute the optimal bit lengths for a tree and update the total bit length
 * for the current block.
 * IN assertion: the fields freq and dad are set, heap[heap_max] and
 *    above are the tree nodes sorted by increasing frequency.
 * OUT assertions: the field len is set to the optimal bit length, the
 *     array bl_count contains the frequencies for each bit length.
 *     The length opt_len is updated; static_len is also updated if stree is
 *     not null.
 */
  function gen_bitlen(s, desc) {
    //    deflate_state *s;
    //    tree_desc *desc;    /* the tree descriptor */
    var tree = desc.dyn_tree;
    var max_code = desc.max_code;
    var stree = desc.stat_desc.static_tree;
    var has_stree = desc.stat_desc.has_stree;
    var extra = desc.stat_desc.extra_bits;
    var base = desc.stat_desc.extra_base;
    var max_length = desc.stat_desc.max_length;
    var h; /* heap index */
    var n, m; /* iterate over the tree elements */
    var bits; /* bit length */
    var xbits; /* extra bits */
    var f; /* frequency */
    var overflow = 0; /* number of elements with bit length too large */

    for (bits = 0; bits <= MAX_BITS$1; bits++) {
      s.bl_count[bits] = 0;
    }

    /* In a first pass, compute the optimal bit lengths (which may
   * overflow in the case of the bit length tree).
   */
    tree[s.heap[s.heap_max] * 2 + 1] /*.Len*/ = 0; /* root of the heap */

    for (h = s.heap_max + 1; h < HEAP_SIZE$1; h++) {
      n = s.heap[h];
      bits = tree[tree[n * 2 + 1] /*.Dad*/ * 2 + 1] /*.Len*/ + 1;
      if (bits > max_length) {
        bits = max_length;
        overflow++;
      }
      tree[n * 2 + 1] /*.Len*/ = bits;
      /* We overwrite tree[n].Dad which is no longer needed */

      if (n > max_code) {
        continue;
      } /* not a leaf node */

      s.bl_count[bits]++;
      xbits = 0;
      if (n >= base) {
        xbits = extra[n - base];
      }
      f = tree[n * 2] /*.Freq*/;
      s.opt_len += f * (bits + xbits);
      if (has_stree) {
        s.static_len += f * (stree[n * 2 + 1] /*.Len*/ + xbits);
      }
    }
    if (overflow === 0) {
      return;
    }

    // Trace((stderr,"\nbit length overflow\n"));
    /* This happens for example on obj2 and pic of the Calgary corpus */

    /* Find the first bit length which could increase: */
    do {
      bits = max_length - 1;
      while (s.bl_count[bits] === 0) {
        bits--;
      }
      s.bl_count[bits]--; /* move one leaf down the tree */
      s.bl_count[bits + 1] += 2; /* move one overflow item as its brother */
      s.bl_count[max_length]--;
      /* The brother of the overflow item also moves one step up,
     * but this does not affect bl_count[max_length]
     */
      overflow -= 2;
    } while (overflow > 0);

    /* Now recompute all bit lengths, scanning in increasing frequency.
   * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
   * lengths instead of fixing only the wrong ones. This idea is taken
   * from 'ar' written by Haruhiko Okumura.)
   */
    for (bits = max_length; bits !== 0; bits--) {
      n = s.bl_count[bits];
      while (n !== 0) {
        m = s.heap[--h];
        if (m > max_code) {
          continue;
        }
        if (tree[m * 2 + 1] /*.Len*/ !== bits) {
          // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
          s.opt_len +=
            (bits - tree[m * 2 + 1]) /*.Len*/ * tree[m * 2] /*.Freq*/;
          tree[m * 2 + 1] /*.Len*/ = bits;
        }
        n--;
      }
    }
  }

  /* ===========================================================================
 * Generate the codes for a given tree and bit counts (which need not be
 * optimal).
 * IN assertion: the array bl_count contains the bit length statistics for
 * the given tree and the field len is set for all tree elements.
 * OUT assertion: the field code is set for all tree elements of non
 *     zero code length.
 */
  function gen_codes(tree, max_code, bl_count) {
    //    ct_data *tree;             /* the tree to decorate */
    //    int max_code;              /* largest code with non zero frequency */
    //    ushf *bl_count;            /* number of codes at each bit length */

    var next_code = new Array(
      MAX_BITS$1 + 1
    ); /* next code value for each bit length */
    var code = 0; /* running code value */
    var bits; /* bit index */
    var n; /* code index */

    /* The distribution counts are first used to generate the code values
   * without bit reversal.
   */
    for (bits = 1; bits <= MAX_BITS$1; bits++) {
      next_code[bits] = code = (code + bl_count[bits - 1]) << 1;
    }
    /* Check that the bit counts in bl_count are consistent. The last code
   * must be all ones.
   */
    //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
    //        "inconsistent bit counts");
    //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

    for (n = 0; n <= max_code; n++) {
      var len = tree[n * 2 + 1];
      if (len === 0) {
        continue;
      }
      /* Now reverse the bits */
      tree[n * 2] /*.Code*/ = bi_reverse(next_code[len]++, len);

      //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
      //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
    }
  }

  /* ===========================================================================
 * Initialize the various 'constant' tables.
 */
  function tr_static_init() {
    var n; /* iterates over tree elements */
    var bits; /* bit counter */
    var length; /* length value */
    var code; /* code value */
    var dist; /* distance index */
    var bl_count = new Array(MAX_BITS$1 + 1);
    /* number of codes at each bit length for an optimal tree */

    // do check in _tr_init()
    //if (static_init_done) return;

    /* For some embedded targets, global variables are not initialized: */
    /*#ifdef NO_INIT_GLOBAL_POINTERS
    static_l_desc.static_tree = static_ltree;
    static_l_desc.extra_bits = extra_lbits;
    static_d_desc.static_tree = static_dtree;
    static_d_desc.extra_bits = extra_dbits;
    static_bl_desc.extra_bits = extra_blbits;
  #endif*/

    /* Initialize the mapping length (0..255) -> length code (0..28) */
    length = 0;
    for (code = 0; code < LENGTH_CODES$1 - 1; code++) {
      base_length[code] = length;
      for (n = 0; n < 1 << extra_lbits[code]; n++) {
        _length_code[length++] = code;
      }
    }
    //Assert (length == 256, "tr_static_init: length != 256");
    /* Note that the length 255 (match length 258) can be represented
   * in two different ways: code 284 + 5 bits or code 285, so we
   * overwrite length_code[255] to use the best encoding:
   */
    _length_code[length - 1] = code;

    /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
    dist = 0;
    for (code = 0; code < 16; code++) {
      base_dist[code] = dist;
      for (n = 0; n < 1 << extra_dbits[code]; n++) {
        _dist_code[dist++] = code;
      }
    }
    //Assert (dist == 256, "tr_static_init: dist != 256");
    dist >>= 7; /* from now on, all distances are divided by 128 */
    for (; code < D_CODES$1; code++) {
      base_dist[code] = dist << 7;
      for (n = 0; n < 1 << (extra_dbits[code] - 7); n++) {
        _dist_code[256 + dist++] = code;
      }
    }
    //Assert (dist == 256, "tr_static_init: 256+dist != 512");

    /* Construct the codes of the static literal tree */
    for (bits = 0; bits <= MAX_BITS$1; bits++) {
      bl_count[bits] = 0;
    }

    n = 0;
    while (n <= 143) {
      static_ltree[n * 2 + 1] /*.Len*/ = 8;
      n++;
      bl_count[8]++;
    }
    while (n <= 255) {
      static_ltree[n * 2 + 1] /*.Len*/ = 9;
      n++;
      bl_count[9]++;
    }
    while (n <= 279) {
      static_ltree[n * 2 + 1] /*.Len*/ = 7;
      n++;
      bl_count[7]++;
    }
    while (n <= 287) {
      static_ltree[n * 2 + 1] /*.Len*/ = 8;
      n++;
      bl_count[8]++;
    }
    /* Codes 286 and 287 do not exist, but we must include them in the
   * tree construction to get a canonical Huffman tree (longest code
   * all ones)
   */
    gen_codes(static_ltree, L_CODES$1 + 1, bl_count);

    /* The static distance tree is trivial: */
    for (n = 0; n < D_CODES$1; n++) {
      static_dtree[n * 2 + 1] /*.Len*/ = 5;
      static_dtree[n * 2] /*.Code*/ = bi_reverse(n, 5);
    }

    // Now data ready and we can init static trees
    static_l_desc = new StaticTreeDesc(
      static_ltree,
      extra_lbits,
      LITERALS$1 + 1,
      L_CODES$1,
      MAX_BITS$1
    );
    static_d_desc = new StaticTreeDesc(
      static_dtree,
      extra_dbits,
      0,
      D_CODES$1,
      MAX_BITS$1
    );
    static_bl_desc = new StaticTreeDesc(
      new Array(0),
      extra_blbits,
      0,
      BL_CODES$1,
      MAX_BL_BITS
    );

    //static_init_done = true;
  }

  /* ===========================================================================
 * Initialize a new block.
 */
  function init_block(s) {
    var n; /* iterates over tree elements */

    /* Initialize the trees. */
    for (n = 0; n < L_CODES$1; n++) {
      s.dyn_ltree[n * 2] /*.Freq*/ = 0;
    }
    for (n = 0; n < D_CODES$1; n++) {
      s.dyn_dtree[n * 2] /*.Freq*/ = 0;
    }
    for (n = 0; n < BL_CODES$1; n++) {
      s.bl_tree[n * 2] /*.Freq*/ = 0;
    }

    s.dyn_ltree[END_BLOCK * 2] /*.Freq*/ = 1;
    s.opt_len = s.static_len = 0;
    s.last_lit = s.matches = 0;
  }

  /* ===========================================================================
 * Flush the bit buffer and align the output on a byte boundary
 */
  function bi_windup(s) {
    if (s.bi_valid > 8) {
      put_short(s, s.bi_buf);
    } else if (s.bi_valid > 0) {
      //put_byte(s, (Byte)s->bi_buf);
      s.pending_buf[s.pending++] = s.bi_buf;
    }
    s.bi_buf = 0;
    s.bi_valid = 0;
  }

  /* ===========================================================================
 * Copy a stored block, storing first the length and its
 * one's complement if requested.
 */
  function copy_block(s, buf, len, header) {
    //DeflateState *s;
    //charf    *buf;    /* the input data */
    //unsigned len;     /* its length */
    //int      header;  /* true if block header must be written */

    bi_windup(s); /* align on byte boundary */

    if (header) {
      put_short(s, len);
      put_short(s, ~len);
    }
    //  while (len--) {
    //    put_byte(s, *buf++);
    //  }
    arraySet(s.pending_buf, s.window, buf, len, s.pending);
    s.pending += len;
  }

  /* ===========================================================================
 * Compares to subtrees, using the tree depth as tie breaker when
 * the subtrees have equal frequency. This minimizes the worst case length.
 */
  function smaller(tree, n, m, depth) {
    var _n2 = n * 2;
    var _m2 = m * 2;
    return (
      tree[_n2] /*.Freq*/ < tree[_m2] /*.Freq*/ ||
      (tree[_n2] /*.Freq*/ === tree[_m2] /*.Freq*/ && depth[n] <= depth[m])
    );
  }

  /* ===========================================================================
 * Restore the heap property by moving down the tree starting at node k,
 * exchanging a node with the smallest of its two sons if necessary, stopping
 * when the heap property is re-established (each father smaller than its
 * two sons).
 */
  function pqdownheap(s, tree, k) //    deflate_state *s;
  //    ct_data *tree;  /* the tree to restore */
  //    int k;               /* node to move down */
  {
    var v = s.heap[k];
    var j = k << 1; /* left son of k */
    while (j <= s.heap_len) {
      /* Set j to the smallest of the two sons: */
      if (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
        j++;
      }
      /* Exit if v is smaller than both sons */
      if (smaller(tree, v, s.heap[j], s.depth)) {
        break;
      }

      /* Exchange v with the smallest son */
      s.heap[k] = s.heap[j];
      k = j;

      /* And continue down the tree, setting j to the left son of k */
      j <<= 1;
    }
    s.heap[k] = v;
  }

  // inlined manually
  // var SMALLEST = 1;

  /* ===========================================================================
 * Send the block data compressed using the given Huffman trees
 */
  function compress_block(s, ltree, dtree) //    deflate_state *s;
  //    const ct_data *ltree; /* literal tree */
  //    const ct_data *dtree; /* distance tree */
  {
    var dist; /* distance of matched string */
    var lc; /* match length or unmatched char (if dist == 0) */
    var lx = 0; /* running index in l_buf */
    var code; /* the code to send */
    var extra; /* number of extra bits to send */

    if (s.last_lit !== 0) {
      do {
        dist =
          (s.pending_buf[s.d_buf + lx * 2] << 8) |
          s.pending_buf[s.d_buf + lx * 2 + 1];
        lc = s.pending_buf[s.l_buf + lx];
        lx++;

        if (dist === 0) {
          send_code(s, lc, ltree); /* send a literal byte */
          //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
        } else {
          /* Here, lc is the match length - MIN_MATCH */
          code = _length_code[lc];
          send_code(s, code + LITERALS$1 + 1, ltree); /* send the length code */
          extra = extra_lbits[code];
          if (extra !== 0) {
            lc -= base_length[code];
            send_bits(s, lc, extra); /* send the extra length bits */
          }
          dist--; /* dist is now the match distance - 1 */
          code = d_code(dist);
          //Assert (code < D_CODES, "bad d_code");

          send_code(s, code, dtree); /* send the distance code */
          extra = extra_dbits[code];
          if (extra !== 0) {
            dist -= base_dist[code];
            send_bits(s, dist, extra); /* send the extra distance bits */
          }
        } /* literal or match pair ? */

        /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
        //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
        //       "pendingBuf overflow");
      } while (lx < s.last_lit);
    }

    send_code(s, END_BLOCK, ltree);
  }

  /* ===========================================================================
 * Construct one Huffman tree and assigns the code bit strings and lengths.
 * Update the total bit length for the current block.
 * IN assertion: the field freq is set for all tree elements.
 * OUT assertions: the fields len and code are set to the optimal bit length
 *     and corresponding code. The length opt_len is updated; static_len is
 *     also updated if stree is not null. The field max_code is set.
 */
  function build_tree(s, desc) //    deflate_state *s;
  //    tree_desc *desc; /* the tree descriptor */
  {
    var tree = desc.dyn_tree;
    var stree = desc.stat_desc.static_tree;
    var has_stree = desc.stat_desc.has_stree;
    var elems = desc.stat_desc.elems;
    var n, m; /* iterate over heap elements */
    var max_code = -1; /* largest code with non zero frequency */
    var node; /* new node being created */

    /* Construct the initial heap, with least frequent element in
   * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
   * heap[0] is not used.
   */
    s.heap_len = 0;
    s.heap_max = HEAP_SIZE$1;

    for (n = 0; n < elems; n++) {
      if (tree[n * 2] /*.Freq*/ !== 0) {
        s.heap[++s.heap_len] = max_code = n;
        s.depth[n] = 0;
      } else {
        tree[n * 2 + 1] /*.Len*/ = 0;
      }
    }

    /* The pkzip format requires that at least one distance code exists,
   * and that at least one bit should be sent even if there is only one
   * possible code. So to avoid special checks later on we force at least
   * two codes of non zero frequency.
   */
    while (s.heap_len < 2) {
      node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
      tree[node * 2] /*.Freq*/ = 1;
      s.depth[node] = 0;
      s.opt_len--;

      if (has_stree) {
        s.static_len -= stree[node * 2 + 1] /*.Len*/;
      }
      /* node is 0 or 1 so it does not have extra bits */
    }
    desc.max_code = max_code;

    /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
   * establish sub-heaps of increasing lengths:
   */
    for (n = s.heap_len >> 1 /*int /2*/; n >= 1; n--) {
      pqdownheap(s, tree, n);
    }

    /* Construct the Huffman tree by repeatedly combining the least two
   * frequent nodes.
   */
    node = elems; /* next internal node of the tree */
    do {
      //pqremove(s, tree, n);  /* n = node of least frequency */
      /*** pqremove ***/
      n = s.heap[1 /*SMALLEST*/];
      s.heap[1 /*SMALLEST*/] = s.heap[s.heap_len--];
      pqdownheap(s, tree, 1 /*SMALLEST*/);
      /***/

      m = s.heap[1 /*SMALLEST*/]; /* m = node of next least frequency */

      s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
      s.heap[--s.heap_max] = m;

      /* Create a new node father of n and m */
      tree[node * 2] /*.Freq*/ = tree[n * 2] /*.Freq*/ + tree[m * 2] /*.Freq*/;
      s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
      tree[n * 2 + 1] /*.Dad*/ = tree[m * 2 + 1] /*.Dad*/ = node;

      /* and insert the new node in the heap */
      s.heap[1 /*SMALLEST*/] = node++;
      pqdownheap(s, tree, 1 /*SMALLEST*/);
    } while (s.heap_len >= 2);

    s.heap[--s.heap_max] = s.heap[1 /*SMALLEST*/];

    /* At this point, the fields freq and dad are set. We can now
   * generate the bit lengths.
   */
    gen_bitlen(s, desc);

    /* The field len is now set, we can generate the bit codes */
    gen_codes(tree, max_code, s.bl_count);
  }

  /* ===========================================================================
 * Scan a literal or distance tree to determine the frequencies of the codes
 * in the bit length tree.
 */
  function scan_tree(s, tree, max_code) //    deflate_state *s;
  //    ct_data *tree;   /* the tree to be scanned */
  //    int max_code;    /* and its largest code of non zero frequency */
  {
    var n; /* iterates over all tree elements */
    var prevlen = -1; /* last emitted length */
    var curlen; /* length of current code */

    var nextlen = tree[0 * 2 + 1]; /* length of next code */

    var count = 0; /* repeat count of the current code */
    var max_count = 7; /* max repeat count */
    var min_count = 4; /* min repeat count */

    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    }
    tree[(max_code + 1) * 2 + 1] /*.Len*/ = 0xffff; /* guard */

    for (n = 0; n <= max_code; n++) {
      curlen = nextlen;
      nextlen = tree[(n + 1) * 2 + 1] /*.Len*/;

      if (++count < max_count && curlen === nextlen) {
        continue;
      } else if (count < min_count) {
        s.bl_tree[curlen * 2] /*.Freq*/ += count;
      } else if (curlen !== 0) {
        if (curlen !== prevlen) {
          s.bl_tree[curlen * 2] /*.Freq*/++;
        }
        s.bl_tree[REP_3_6 * 2] /*.Freq*/++;
      } else if (count <= 10) {
        s.bl_tree[REPZ_3_10 * 2] /*.Freq*/++;
      } else {
        s.bl_tree[REPZ_11_138 * 2] /*.Freq*/++;
      }

      count = 0;
      prevlen = curlen;

      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      } else if (curlen === nextlen) {
        max_count = 6;
        min_count = 3;
      } else {
        max_count = 7;
        min_count = 4;
      }
    }
  }

  /* ===========================================================================
 * Send a literal or distance tree in compressed form, using the codes in
 * bl_tree.
 */
  function send_tree(s, tree, max_code) //    deflate_state *s;
  //    ct_data *tree; /* the tree to be scanned */
  //    int max_code;       /* and its largest code of non zero frequency */
  {
    var n; /* iterates over all tree elements */
    var prevlen = -1; /* last emitted length */
    var curlen; /* length of current code */

    var nextlen = tree[0 * 2 + 1]; /* length of next code */

    var count = 0; /* repeat count of the current code */
    var max_count = 7; /* max repeat count */
    var min_count = 4; /* min repeat count */

    /* tree[max_code+1].Len = -1; */
    /* guard already set */
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    }

    for (n = 0; n <= max_code; n++) {
      curlen = nextlen;
      nextlen = tree[(n + 1) * 2 + 1] /*.Len*/;

      if (++count < max_count && curlen === nextlen) {
        continue;
      } else if (count < min_count) {
        do {
          send_code(s, curlen, s.bl_tree);
        } while (--count !== 0);
      } else if (curlen !== 0) {
        if (curlen !== prevlen) {
          send_code(s, curlen, s.bl_tree);
          count--;
        }
        //Assert(count >= 3 && count <= 6, " 3_6?");
        send_code(s, REP_3_6, s.bl_tree);
        send_bits(s, count - 3, 2);
      } else if (count <= 10) {
        send_code(s, REPZ_3_10, s.bl_tree);
        send_bits(s, count - 3, 3);
      } else {
        send_code(s, REPZ_11_138, s.bl_tree);
        send_bits(s, count - 11, 7);
      }

      count = 0;
      prevlen = curlen;
      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      } else if (curlen === nextlen) {
        max_count = 6;
        min_count = 3;
      } else {
        max_count = 7;
        min_count = 4;
      }
    }
  }

  /* ===========================================================================
 * Construct the Huffman tree for the bit lengths and return the index in
 * bl_order of the last bit length code to send.
 */
  function build_bl_tree(s) {
    var max_blindex; /* index of last bit length code of non zero freq */

    /* Determine the bit length frequencies for literal and distance trees */
    scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
    scan_tree(s, s.dyn_dtree, s.d_desc.max_code);

    /* Build the bit length tree: */
    build_tree(s, s.bl_desc);
    /* opt_len now includes the length of the tree representations, except
   * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
   */

    /* Determine the number of bit length codes to send. The pkzip format
   * requires that at least 4 bit length codes be sent. (appnote.txt says
   * 3 but the actual value used is 4.)
   */
    for (max_blindex = BL_CODES$1 - 1; max_blindex >= 3; max_blindex--) {
      if (s.bl_tree[bl_order[max_blindex] * 2 + 1] /*.Len*/ !== 0) {
        break;
      }
    }
    /* Update opt_len to include the bit length tree and counts */
    s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
    //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
    //        s->opt_len, s->static_len));

    return max_blindex;
  }

  /* ===========================================================================
 * Send the header for a block using dynamic Huffman trees: the counts, the
 * lengths of the bit length codes, the literal tree and the distance tree.
 * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
 */
  function send_all_trees(s, lcodes, dcodes, blcodes) //    deflate_state *s;
  //    int lcodes, dcodes, blcodes; /* number of codes for each tree */
  {
    var rank; /* index in bl_order */

    //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
    //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
    //        "too many codes");
    //Tracev((stderr, "\nbl counts: "));
    send_bits(s, lcodes - 257, 5); /* not +255 as stated in appnote.txt */
    send_bits(s, dcodes - 1, 5);
    send_bits(s, blcodes - 4, 4); /* not -3 as stated in appnote.txt */
    for (rank = 0; rank < blcodes; rank++) {
      //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
      send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1] /*.Len*/, 3);
    }
    //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));

    send_tree(s, s.dyn_ltree, lcodes - 1); /* literal tree */
    //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

    send_tree(s, s.dyn_dtree, dcodes - 1); /* distance tree */
    //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
  }

  /* ===========================================================================
 * Check if the data type is TEXT or BINARY, using the following algorithm:
 * - TEXT if the two conditions below are satisfied:
 *    a) There are no non-portable control characters belonging to the
 *       "black list" (0..6, 14..25, 28..31).
 *    b) There is at least one printable character belonging to the
 *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
 * - BINARY otherwise.
 * - The following partially-portable control characters form a
 *   "gray list" that is ignored in this detection algorithm:
 *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
 * IN assertion: the fields Freq of dyn_ltree are set.
 */
  function detect_data_type(s) {
    /* black_mask is the bit mask of black-listed bytes
   * set bits 0..6, 14..25, and 28..31
   * 0xf3ffc07f = binary 11110011111111111100000001111111
   */
    var black_mask = 0xf3ffc07f;
    var n;

    /* Check for non-textual ("black-listed") bytes. */
    for (n = 0; n <= 31; n++, black_mask >>>= 1) {
      if (black_mask & 1 && s.dyn_ltree[n * 2] /*.Freq*/ !== 0) {
        return Z_BINARY$1;
      }
    }

    /* Check for textual ("white-listed") bytes. */
    if (
      s.dyn_ltree[9 * 2] /*.Freq*/ !== 0 ||
      s.dyn_ltree[10 * 2] /*.Freq*/ !== 0 ||
      s.dyn_ltree[13 * 2] /*.Freq*/ !== 0
    ) {
      return Z_TEXT$1;
    }
    for (n = 32; n < LITERALS$1; n++) {
      if (s.dyn_ltree[n * 2] /*.Freq*/ !== 0) {
        return Z_TEXT$1;
      }
    }

    /* There are no "black-listed" or "white-listed" bytes:
   * this stream either is empty or has tolerated ("gray-listed") bytes only.
   */
    return Z_BINARY$1;
  }

  var static_init_done = false;

  /* ===========================================================================
 * Initialize the tree data structures for a new zlib stream.
 */
  function _tr_init(s) {
    if (!static_init_done) {
      tr_static_init();
      static_init_done = true;
    }

    s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
    s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
    s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);

    s.bi_buf = 0;
    s.bi_valid = 0;

    /* Initialize the first block of the first file: */
    init_block(s);
  }

  /* ===========================================================================
 * Send a stored block
 */
  function _tr_stored_block(s, buf, stored_len, last) //DeflateState *s;
  //charf *buf;       /* input block */
  //ulg stored_len;   /* length of input block */
  //int last;         /* one if this is the last block for a file */
  {
    send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3); /* send block type */
    copy_block(s, buf, stored_len, true); /* with header */
  }

  /* ===========================================================================
 * Send one empty static block to give enough lookahead for inflate.
 * This takes 10 bits, of which 7 may remain in the bit buffer.
 */
  function _tr_align(s) {
    send_bits(s, STATIC_TREES << 1, 3);
    send_code(s, END_BLOCK, static_ltree);
    bi_flush(s);
  }

  /* ===========================================================================
 * Determine the best encoding for the current block: dynamic trees, static
 * trees or store, and output the encoded block to the zip file.
 */
  function _tr_flush_block(s, buf, stored_len, last) //DeflateState *s;
  //charf *buf;       /* input block, or NULL if too old */
  //ulg stored_len;   /* length of input block */
  //int last;         /* one if this is the last block for a file */
  {
    var opt_lenb, static_lenb; /* opt_len and static_len in bytes */
    var max_blindex = 0; /* index of last bit length code of non zero freq */

    /* Build the Huffman trees unless a stored block is forced */
    if (s.level > 0) {
      /* Check if the file is binary or text */
      if (s.strm.data_type === Z_UNKNOWN$2) {
        s.strm.data_type = detect_data_type(s);
      }

      /* Construct the literal and distance trees */
      build_tree(s, s.l_desc);
      // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
      //        s->static_len));

      build_tree(s, s.d_desc);
      // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
      //        s->static_len));
      /* At this point, opt_len and static_len are the total bit lengths of
     * the compressed block data, excluding the tree representations.
     */

      /* Build the bit length tree for the above two trees, and get the index
     * in bl_order of the last bit length code to send.
     */
      max_blindex = build_bl_tree(s);

      /* Determine the best encoding. Compute the block lengths in bytes. */
      opt_lenb = (s.opt_len + 3 + 7) >>> 3;
      static_lenb = (s.static_len + 3 + 7) >>> 3;

      // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
      //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
      //        s->last_lit));

      if (static_lenb <= opt_lenb) {
        opt_lenb = static_lenb;
      }
    } else {
      // Assert(buf != (char*)0, "lost buf");
      opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
    }

    if (stored_len + 4 <= opt_lenb && buf !== -1) {
      /* 4: two words for the lengths */

      /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
     * Otherwise we can't have processed more than WSIZE input bytes since
     * the last block flush, because compression would have been
     * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
     * transform a block into a stored block.
     */
      _tr_stored_block(s, buf, stored_len, last);
    } else if (s.strategy === Z_FIXED$2 || static_lenb === opt_lenb) {
      send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
      compress_block(s, static_ltree, static_dtree);
    } else {
      send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
      send_all_trees(
        s,
        s.l_desc.max_code + 1,
        s.d_desc.max_code + 1,
        max_blindex + 1
      );
      compress_block(s, s.dyn_ltree, s.dyn_dtree);
    }
    // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
    /* The above check is made mod 2^32, for files larger than 512 MB
   * and uLong implemented on 32 bits.
   */
    init_block(s);

    if (last) {
      bi_windup(s);
    }
    // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
    //       s->compressed_len-7*last));
  }

  /* ===========================================================================
 * Save the match info and tally the frequency counts. Return true if
 * the current block must be flushed.
 */
  function _tr_tally(s, dist, lc) //    deflate_state *s;
  //    unsigned dist;  /* distance of matched string */
  //    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
  {
    //var out_length, in_length, dcode;

    s.pending_buf[s.d_buf + s.last_lit * 2] = (dist >>> 8) & 0xff;
    s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;

    s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
    s.last_lit++;

    if (dist === 0) {
      /* lc is the unmatched char */
      s.dyn_ltree[lc * 2] /*.Freq*/++;
    } else {
      s.matches++;
      /* Here, lc is the match length - MIN_MATCH */
      dist--; /* dist = match distance - 1 */
      //Assert((ush)dist < (ush)MAX_DIST(s) &&
      //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
      //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

      s.dyn_ltree[(_length_code[lc] + LITERALS$1 + 1) * 2] /*.Freq*/++;
      s.dyn_dtree[d_code(dist) * 2] /*.Freq*/++;
    }

    // (!) This block is disabled in zlib defailts,
    // don't enable it for binary compatibility

    //#ifdef TRUNCATE_BLOCK
    //  /* Try to guess if it is profitable to stop the current block here */
    //  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
    //    /* Compute an upper bound for the compressed length */
    //    out_length = s.last_lit*8;
    //    in_length = s.strstart - s.block_start;
    //
    //    for (dcode = 0; dcode < D_CODES; dcode++) {
    //      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
    //    }
    //    out_length >>>= 3;
    //    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
    //    //       s->last_lit, in_length, out_length,
    //    //       100L - out_length*100L/in_length));
    //    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
    //      return true;
    //    }
    //  }
    //#endif

    return s.last_lit === s.lit_bufsize - 1;
    /* We avoid equality with lit_bufsize because of wraparound at 64K
   * on 16 bit machines and because stored blocks are restricted to
   * 64K-1 bytes.
   */
  }

  // Note: adler32 takes 12% for level 0 and 2% for level 6.
  // It doesn't worth to make additional optimizationa as in original.
  // Small size is preferable.

  function adler32(adler, buf, len, pos) {
    var s1 = (adler & 0xffff) | 0,
      s2 = ((adler >>> 16) & 0xffff) | 0,
      n = 0;

    while (len !== 0) {
      // Set limit ~ twice less than 5552, to keep
      // s2 in 31-bits, because we force signed ints.
      // in other case %= will fail.
      n = len > 2000 ? 2000 : len;
      len -= n;

      do {
        s1 = (s1 + buf[pos++]) | 0;
        s2 = (s2 + s1) | 0;
      } while (--n);

      s1 %= 65521;
      s2 %= 65521;
    }

    return s1 | (s2 << 16) | 0;
  }

  // Note: we can't get significant speed boost here.
  // So write code to minimize size - no pregenerated tables
  // and array tools dependencies.

  // Use ordinary array, since untyped makes no boost here
  function makeTable() {
    var c,
      table = [];

    for (var n = 0; n < 256; n++) {
      c = n;
      for (var k = 0; k < 8; k++) {
        c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      }
      table[n] = c;
    }

    return table;
  }

  // Create table on load. Just 255 signed longs. Not a problem.
  var crcTable = makeTable();

  function crc32(crc, buf, len, pos) {
    var t = crcTable,
      end = pos + len;

    crc ^= -1;

    for (var i = pos; i < end; i++) {
      crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xff];
    }

    return crc ^ -1; // >>> 0;
  }

  /* Public constants ==========================================================*/
  /* ===========================================================================*/

  /* Allowed flush values; see deflate() and inflate() below for details */
  var Z_NO_FLUSH$1 = 0;
  var Z_PARTIAL_FLUSH$1 = 1;
  //var Z_SYNC_FLUSH    = 2;
  var Z_FULL_FLUSH$1 = 3;
  var Z_FINISH$1 = 4;
  var Z_BLOCK$1 = 5;
  //var Z_TREES         = 6;

  /* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
  var Z_OK$1 = 0;
  var Z_STREAM_END$1 = 1;
  //var Z_NEED_DICT     = 2;
  //var Z_ERRNO         = -1;
  var Z_STREAM_ERROR$1 = -2;
  var Z_DATA_ERROR$1 = -3;
  //var Z_MEM_ERROR     = -4;
  var Z_BUF_ERROR$1 = -5;
  //var Z_VERSION_ERROR = -6;

  /* compression levels */
  //var Z_NO_COMPRESSION      = 0;
  //var Z_BEST_SPEED          = 1;
  //var Z_BEST_COMPRESSION    = 9;
  var Z_DEFAULT_COMPRESSION$1 = -1;

  var Z_FILTERED$1 = 1;
  var Z_HUFFMAN_ONLY$1 = 2;
  var Z_RLE$1 = 3;
  var Z_FIXED$1 = 4;
  /* Possible values of the data_type field (though see inflate()) */
  //var Z_BINARY              = 0;
  //var Z_TEXT                = 1;
  //var Z_ASCII               = 1; // = Z_TEXT
  var Z_UNKNOWN$1 = 2;

  /* The deflate compression method */
  var Z_DEFLATED$1 = 8;

  /*============================================================================*/

  var MAX_MEM_LEVEL = 9;
  var LENGTH_CODES = 29;
  /* number of length codes, not counting the special END_BLOCK code */
  var LITERALS = 256;
  /* number of literal bytes 0..255 */
  var L_CODES = LITERALS + 1 + LENGTH_CODES;
  /* number of Literal or Length codes, including the END_BLOCK code */
  var D_CODES = 30;
  /* number of distance codes */
  var BL_CODES = 19;
  /* number of codes used to transfer the bit lengths */
  var HEAP_SIZE = 2 * L_CODES + 1;
  /* maximum heap size */
  var MAX_BITS = 15;
  /* All codes must not exceed MAX_BITS bits */

  var MIN_MATCH = 3;
  var MAX_MATCH = 258;
  var MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;

  var PRESET_DICT = 0x20;

  var INIT_STATE = 42;
  var EXTRA_STATE = 69;
  var NAME_STATE = 73;
  var COMMENT_STATE = 91;
  var HCRC_STATE = 103;
  var BUSY_STATE = 113;
  var FINISH_STATE = 666;

  var BS_NEED_MORE = 1; /* block not completed, need more input or more output */
  var BS_BLOCK_DONE = 2; /* block flush performed */
  var BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
  var BS_FINISH_DONE = 4; /* finish done, accept no more input or output */

  var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

  function err(strm, errorCode) {
    strm.msg = msg[errorCode];
    return errorCode;
  }

  function rank(f) {
    return (f << 1) - (f > 4 ? 9 : 0);
  }

  function zero(buf) {
    var len = buf.length;
    while (--len >= 0) {
      buf[len] = 0;
    }
  }

  /* =========================================================================
 * Flush as much pending output as possible. All deflate() output goes
 * through this function so some applications may wish to modify it
 * to avoid allocating a large strm->output buffer and copying into it.
 * (See also read_buf()).
 */
  function flush_pending(strm) {
    var s = strm.state;

    //_tr_flush_bits(s);
    var len = s.pending;
    if (len > strm.avail_out) {
      len = strm.avail_out;
    }
    if (len === 0) {
      return;
    }

    arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
    strm.next_out += len;
    s.pending_out += len;
    strm.total_out += len;
    strm.avail_out -= len;
    s.pending -= len;
    if (s.pending === 0) {
      s.pending_out = 0;
    }
  }

  function flush_block_only(s, last) {
    _tr_flush_block(
      s,
      s.block_start >= 0 ? s.block_start : -1,
      s.strstart - s.block_start,
      last
    );
    s.block_start = s.strstart;
    flush_pending(s.strm);
  }

  function put_byte(s, b) {
    s.pending_buf[s.pending++] = b;
  }

  /* =========================================================================
 * Put a short in the pending buffer. The 16-bit value is put in MSB order.
 * IN assertion: the stream state is correct and there is enough room in
 * pending_buf.
 */
  function putShortMSB(s, b) {
    //  put_byte(s, (Byte)(b >> 8));
    //  put_byte(s, (Byte)(b & 0xff));
    s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
    s.pending_buf[s.pending++] = b & 0xff;
  }

  /* ===========================================================================
 * Read a new buffer from the current input stream, update the adler32
 * and total number of bytes read.  All deflate() input goes through
 * this function so some applications may wish to modify it to avoid
 * allocating a large strm->input buffer and copying from it.
 * (See also flush_pending()).
 */
  function read_buf(strm, buf, start, size) {
    var len = strm.avail_in;

    if (len > size) {
      len = size;
    }
    if (len === 0) {
      return 0;
    }

    strm.avail_in -= len;

    // zmemcpy(buf, strm->next_in, len);
    arraySet(buf, strm.input, strm.next_in, len, start);
    if (strm.state.wrap === 1) {
      strm.adler = adler32(strm.adler, buf, len, start);
    } else if (strm.state.wrap === 2) {
      strm.adler = crc32(strm.adler, buf, len, start);
    }

    strm.next_in += len;
    strm.total_in += len;

    return len;
  }

  /* ===========================================================================
 * Set match_start to the longest match starting at the given string and
 * return its length. Matches shorter or equal to prev_length are discarded,
 * in which case the result is equal to prev_length and match_start is
 * garbage.
 * IN assertions: cur_match is the head of the hash chain for the current
 *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
 * OUT assertion: the match length is not greater than s->lookahead.
 */
  function longest_match(s, cur_match) {
    var chain_length = s.max_chain_length; /* max hash chain length */
    var scan = s.strstart; /* current string */
    var match; /* matched string */
    var len; /* length of current match */
    var best_len = s.prev_length; /* best match length so far */
    var nice_match = s.nice_match; /* stop if match long enough */
    var limit =
      s.strstart > s.w_size - MIN_LOOKAHEAD
        ? s.strstart - (s.w_size - MIN_LOOKAHEAD)
        : 0;

    var _win = s.window; // shortcut

    var wmask = s.w_mask;
    var prev = s.prev;

    /* Stop when cur_match becomes <= limit. To simplify the code,
   * we prevent matches with the string of window index 0.
   */

    var strend = s.strstart + MAX_MATCH;
    var scan_end1 = _win[scan + best_len - 1];
    var scan_end = _win[scan + best_len];

    /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
   * It is easy to get rid of this optimization if necessary.
   */
    // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

    /* Do not waste too much time if we already have a good match: */
    if (s.prev_length >= s.good_match) {
      chain_length >>= 2;
    }
    /* Do not look for matches beyond the end of the input. This is necessary
   * to make deflate deterministic.
   */
    if (nice_match > s.lookahead) {
      nice_match = s.lookahead;
    }

    // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");

    do {
      // Assert(cur_match < s->strstart, "no future");
      match = cur_match;

      /* Skip to next match if the match length cannot increase
     * or if the match length is less than 2.  Note that the checks below
     * for insufficient lookahead only occur occasionally for performance
     * reasons.  Therefore uninitialized memory will be accessed, and
     * conditional jumps will be made that depend on those values.
     * However the length of the match is limited to the lookahead, so
     * the output of deflate is not affected by the uninitialized values.
     */

      if (
        _win[match + best_len] !== scan_end ||
        _win[match + best_len - 1] !== scan_end1 ||
        _win[match] !== _win[scan] ||
        _win[++match] !== _win[scan + 1]
      ) {
        continue;
      }

      /* The check at best_len-1 can be removed because it will be made
     * again later. (This heuristic is not always a win.)
     * It is not necessary to compare scan[2] and match[2] since they
     * are always equal when the other bytes match, given that
     * the hash keys are equal and that HASH_BITS >= 8.
     */
      scan += 2;
      match++;
      // Assert(*scan == *match, "match[2]?");

      /* We check for insufficient lookahead only every 8th comparison;
     * the 256th check will be made at strstart+258.
     */
      do {
        /*jshint noempty:false*/
      } while (
        _win[++scan] === _win[++match] &&
        _win[++scan] === _win[++match] &&
        _win[++scan] === _win[++match] &&
        _win[++scan] === _win[++match] &&
        _win[++scan] === _win[++match] &&
        _win[++scan] === _win[++match] &&
        _win[++scan] === _win[++match] &&
        _win[++scan] === _win[++match] &&
        scan < strend
      );

      // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");

      len = MAX_MATCH - (strend - scan);
      scan = strend - MAX_MATCH;

      if (len > best_len) {
        s.match_start = cur_match;
        best_len = len;
        if (len >= nice_match) {
          break;
        }
        scan_end1 = _win[scan + best_len - 1];
        scan_end = _win[scan + best_len];
      }
    } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

    if (best_len <= s.lookahead) {
      return best_len;
    }
    return s.lookahead;
  }

  /* ===========================================================================
 * Fill the window when the lookahead becomes insufficient.
 * Updates strstart and lookahead.
 *
 * IN assertion: lookahead < MIN_LOOKAHEAD
 * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
 *    At least one byte has been read, or avail_in == 0; reads are
 *    performed for at least two bytes (required for the zip translate_eol
 *    option -- not supported here).
 */
  function fill_window(s) {
    var _w_size = s.w_size;
    var p, n, m, more, str;

    //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

    do {
      more = s.window_size - s.lookahead - s.strstart;

      // JS ints have 32 bit, block below not needed
      /* Deal with !@#$% 64K limit: */
      //if (sizeof(int) <= 2) {
      //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
      //        more = wsize;
      //
      //  } else if (more == (unsigned)(-1)) {
      //        /* Very unlikely, but possible on 16 bit machine if
      //         * strstart == 0 && lookahead == 1 (input done a byte at time)
      //         */
      //        more--;
      //    }
      //}

      /* If the window is almost full and there is insufficient lookahead,
     * move the upper half to the lower one to make room in the upper half.
     */
      if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
        arraySet(s.window, s.window, _w_size, _w_size, 0);
        s.match_start -= _w_size;
        s.strstart -= _w_size;
        /* we now have strstart >= MAX_DIST */
        s.block_start -= _w_size;

        /* Slide the hash table (could be avoided with 32 bit values
       at the expense of memory usage). We slide even when level == 0
       to keep the hash table consistent if we switch back to level > 0
       later. (Using level 0 permanently is not an optimal usage of
       zlib, so we don't care about this pathological case.)
       */

        n = s.hash_size;
        p = n;
        do {
          m = s.head[--p];
          s.head[p] = m >= _w_size ? m - _w_size : 0;
        } while (--n);

        n = _w_size;
        p = n;
        do {
          m = s.prev[--p];
          s.prev[p] = m >= _w_size ? m - _w_size : 0;
          /* If n is not on any hash chain, prev[n] is garbage but
         * its value will never be used.
         */
        } while (--n);

        more += _w_size;
      }
      if (s.strm.avail_in === 0) {
        break;
      }

      /* If there was no sliding:
     *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
     *    more == window_size - lookahead - strstart
     * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
     * => more >= window_size - 2*WSIZE + 2
     * In the BIG_MEM or MMAP case (not yet supported),
     *   window_size == input_size + MIN_LOOKAHEAD  &&
     *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
     * Otherwise, window_size == 2*WSIZE so more >= 2.
     * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
     */
      //Assert(more >= 2, "more < 2");
      n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
      s.lookahead += n;

      /* Initialize the hash value now that we have some input: */
      if (s.lookahead + s.insert >= MIN_MATCH) {
        str = s.strstart - s.insert;
        s.ins_h = s.window[str];

        /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + 1]) & s.hash_mask;
        //#if MIN_MATCH != 3
        //        Call update_hash() MIN_MATCH-3 more times
        //#endif
        while (s.insert) {
          /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
          s.ins_h =
            ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) &
            s.hash_mask;

          s.prev[str & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = str;
          str++;
          s.insert--;
          if (s.lookahead + s.insert < MIN_MATCH) {
            break;
          }
        }
      }
      /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
     * but this is not important since only literal bytes will be emitted.
     */
    } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);

    /* If the WIN_INIT bytes after the end of the current data have never been
   * written, then zero those bytes in order to avoid memory check reports of
   * the use of uninitialized (or uninitialised as Julian writes) bytes by
   * the longest match routines.  Update the high water mark for the next
   * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
   * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
   */
    //  if (s.high_water < s.window_size) {
    //    var curr = s.strstart + s.lookahead;
    //    var init = 0;
    //
    //    if (s.high_water < curr) {
    //      /* Previous high water mark below current data -- zero WIN_INIT
    //       * bytes or up to end of window, whichever is less.
    //       */
    //      init = s.window_size - curr;
    //      if (init > WIN_INIT)
    //        init = WIN_INIT;
    //      zmemzero(s->window + curr, (unsigned)init);
    //      s->high_water = curr + init;
    //    }
    //    else if (s->high_water < (ulg)curr + WIN_INIT) {
    //      /* High water mark at or above current data, but below current data
    //       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
    //       * to end of window, whichever is less.
    //       */
    //      init = (ulg)curr + WIN_INIT - s->high_water;
    //      if (init > s->window_size - s->high_water)
    //        init = s->window_size - s->high_water;
    //      zmemzero(s->window + s->high_water, (unsigned)init);
    //      s->high_water += init;
    //    }
    //  }
    //
    //  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
    //    "not enough room for search");
  }

  /* ===========================================================================
 * Copy without compression as much as possible from the input stream, return
 * the current block state.
 * This function does not insert new strings in the dictionary since
 * uncompressible data is probably not useful. This function is used
 * only for the level=0 compression option.
 * NOTE: this function should be optimized to avoid extra copying from
 * window to pending_buf.
 */
  function deflate_stored(s, flush) {
    /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
   * to pending_buf_size, and each stored block has a 5 byte header:
   */
    var max_block_size = 0xffff;

    if (max_block_size > s.pending_buf_size - 5) {
      max_block_size = s.pending_buf_size - 5;
    }

    /* Copy as much as possible from input to output: */
    for (;;) {
      /* Fill the window as much as possible: */
      if (s.lookahead <= 1) {
        //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
        //  s->block_start >= (long)s->w_size, "slide too late");
        //      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
        //        s.block_start >= s.w_size)) {
        //        throw  new Error("slide too late");
        //      }

        fill_window(s);
        if (s.lookahead === 0 && flush === Z_NO_FLUSH$1) {
          return BS_NEED_MORE;
        }

        if (s.lookahead === 0) {
          break;
        }
        /* flush the current block */
      }
      //Assert(s->block_start >= 0L, "block gone");
      //    if (s.block_start < 0) throw new Error("block gone");

      s.strstart += s.lookahead;
      s.lookahead = 0;

      /* Emit a stored block if pending_buf will be full: */
      var max_start = s.block_start + max_block_size;

      if (s.strstart === 0 || s.strstart >= max_start) {
        /* strstart == 0 is possible when wraparound on 16-bit machine */
        s.lookahead = s.strstart - max_start;
        s.strstart = max_start;
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }
      /* Flush if we may have to slide, otherwise block_start may become
     * negative and the data will be gone:
     */
      if (s.strstart - s.block_start >= s.w_size - MIN_LOOKAHEAD) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }
    }

    s.insert = 0;

    if (flush === Z_FINISH$1) {
      /*** FLUSH_BLOCK(s, 1); ***/
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      /***/
      return BS_FINISH_DONE;
    }

    if (s.strstart > s.block_start) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }

    return BS_NEED_MORE;
  }

  /* ===========================================================================
 * Compress as much as possible from the input stream, return the current
 * block state.
 * This function does not perform lazy evaluation of matches and inserts
 * new strings in the dictionary only for unmatched strings or for short
 * matches. It is used only for the fast compression options.
 */
  function deflate_fast(s, flush) {
    var hash_head; /* head of the hash chain */
    var bflush; /* set if current block must be flushed */

    for (;;) {
      /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
      if (s.lookahead < MIN_LOOKAHEAD) {
        fill_window(s);
        if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$1) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) {
          break; /* flush the current block */
        }
      }

      /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
      hash_head = 0 /*NIL*/;
      if (s.lookahead >= MIN_MATCH) {
        /*** INSERT_STRING(s, s.strstart, hash_head); ***/
        s.ins_h =
          ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) &
          s.hash_mask;
        hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = s.strstart;
        /***/
      }

      /* Find the longest match, discarding those <= prev_length.
     * At this point we have always match_length < MIN_MATCH
     */
      if (
        hash_head !== 0 /*NIL*/ &&
        s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD
      ) {
        /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
        s.match_length = longest_match(s, hash_head);
        /* longest_match() sets match_start */
      }
      if (s.match_length >= MIN_MATCH) {
        // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

        /*** _tr_tally_dist(s, s.strstart - s.match_start,
         s.match_length - MIN_MATCH, bflush); ***/
        bflush = _tr_tally(
          s,
          s.strstart - s.match_start,
          s.match_length - MIN_MATCH
        );

        s.lookahead -= s.match_length;

        /* Insert new strings in the hash table only if the match length
       * is not too large. This saves time but degrades compression.
       */
        if (
          s.match_length <= s.max_lazy_match /*max_insert_length*/ &&
          s.lookahead >= MIN_MATCH
        ) {
          s.match_length--; /* string at strstart already in table */
          do {
            s.strstart++;
            /*** INSERT_STRING(s, s.strstart, hash_head); ***/
            s.ins_h =
              ((s.ins_h << s.hash_shift) ^
                s.window[s.strstart + MIN_MATCH - 1]) &
              s.hash_mask;
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
            /***/
            /* strstart never exceeds WSIZE-MAX_MATCH, so there are
           * always MIN_MATCH bytes ahead.
           */
          } while (--s.match_length !== 0);
          s.strstart++;
        } else {
          s.strstart += s.match_length;
          s.match_length = 0;
          s.ins_h = s.window[s.strstart];
          /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
          s.ins_h =
            ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + 1]) &
            s.hash_mask;

          //#if MIN_MATCH != 3
          //                Call UPDATE_HASH() MIN_MATCH-3 more times
          //#endif
          /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
         * matter since it will be recomputed at next deflate call.
         */
        }
      } else {
        /* No match, output a literal byte */
        //Tracevv((stderr,"%c", s.window[s.strstart]));
        /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
        bflush = _tr_tally(s, 0, s.window[s.strstart]);

        s.lookahead--;
        s.strstart++;
      }
      if (bflush) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }
    }
    s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
    if (flush === Z_FINISH$1) {
      /*** FLUSH_BLOCK(s, 1); ***/
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      /***/
      return BS_FINISH_DONE;
    }
    if (s.last_lit) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
    return BS_BLOCK_DONE;
  }

  /* ===========================================================================
 * Same as above, but achieves better compression. We use a lazy
 * evaluation for matches: a match is finally adopted only if there is
 * no better match at the next window position.
 */
  function deflate_slow(s, flush) {
    var hash_head; /* head of hash chain */
    var bflush; /* set if current block must be flushed */

    var max_insert;

    /* Process the input block. */
    for (;;) {
      /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
      if (s.lookahead < MIN_LOOKAHEAD) {
        fill_window(s);
        if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$1) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) {
          break;
        } /* flush the current block */
      }

      /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
      hash_head = 0 /*NIL*/;
      if (s.lookahead >= MIN_MATCH) {
        /*** INSERT_STRING(s, s.strstart, hash_head); ***/
        s.ins_h =
          ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) &
          s.hash_mask;
        hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = s.strstart;
        /***/
      }

      /* Find the longest match, discarding those <= prev_length.
     */
      s.prev_length = s.match_length;
      s.prev_match = s.match_start;
      s.match_length = MIN_MATCH - 1;

      if (
        hash_head !== 0 /*NIL*/ &&
        s.prev_length < s.max_lazy_match &&
        s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD /*MAX_DIST(s)*/
      ) {
        /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
        s.match_length = longest_match(s, hash_head);
        /* longest_match() sets match_start */

        if (
          s.match_length <= 5 &&
          (s.strategy === Z_FILTERED$1 ||
            (s.match_length === MIN_MATCH &&
              s.strstart - s.match_start > 4096) /*TOO_FAR*/)
        ) {
          /* If prev_match is also MIN_MATCH, match_start is garbage
         * but we will ignore the current match anyway.
         */
          s.match_length = MIN_MATCH - 1;
        }
      }
      /* If there was a match at the previous step and the current
     * match is not better, output the previous match:
     */
      if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
        max_insert = s.strstart + s.lookahead - MIN_MATCH;
        /* Do not insert strings in hash table beyond this. */

        //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

        /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
         s.prev_length - MIN_MATCH, bflush);***/
        bflush = _tr_tally(
          s,
          s.strstart - 1 - s.prev_match,
          s.prev_length - MIN_MATCH
        );
        /* Insert in hash table all strings up to the end of the match.
       * strstart-1 and strstart are already inserted. If there is not
       * enough lookahead, the last two strings are not inserted in
       * the hash table.
       */
        s.lookahead -= s.prev_length - 1;
        s.prev_length -= 2;
        do {
          if (++s.strstart <= max_insert) {
            /*** INSERT_STRING(s, s.strstart, hash_head); ***/
            s.ins_h =
              ((s.ins_h << s.hash_shift) ^
                s.window[s.strstart + MIN_MATCH - 1]) &
              s.hash_mask;
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
            /***/
          }
        } while (--s.prev_length !== 0);
        s.match_available = 0;
        s.match_length = MIN_MATCH - 1;
        s.strstart++;

        if (bflush) {
          /*** FLUSH_BLOCK(s, 0); ***/
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
          /***/
        }
      } else if (s.match_available) {
        /* If there was no match at the previous position, output a
       * single literal. If there was a match but the current match
       * is longer, truncate the previous match to a single literal.
       */
        //Tracevv((stderr,"%c", s->window[s->strstart-1]));
        /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
        bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);

        if (bflush) {
          /*** FLUSH_BLOCK_ONLY(s, 0) ***/
          flush_block_only(s, false);
          /***/
        }
        s.strstart++;
        s.lookahead--;
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      } else {
        /* There is no previous match to compare with, wait for
       * the next step to decide.
       */
        s.match_available = 1;
        s.strstart++;
        s.lookahead--;
      }
    }
    //Assert (flush != Z_NO_FLUSH, "no flush?");
    if (s.match_available) {
      //Tracevv((stderr,"%c", s->window[s->strstart-1]));
      /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
      bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);

      s.match_available = 0;
    }
    s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
    if (flush === Z_FINISH$1) {
      /*** FLUSH_BLOCK(s, 1); ***/
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      /***/
      return BS_FINISH_DONE;
    }
    if (s.last_lit) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }

    return BS_BLOCK_DONE;
  }

  /* ===========================================================================
 * For Z_RLE, simply look for runs of bytes, generate matches only of distance
 * one.  Do not maintain a hash table.  (It will be regenerated if this run of
 * deflate switches away from Z_RLE.)
 */
  function deflate_rle(s, flush) {
    var bflush; /* set if current block must be flushed */
    var prev; /* byte at distance one to match */
    var scan, strend; /* scan goes up to strend for length of run */

    var _win = s.window;

    for (;;) {
      /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the longest run, plus one for the unrolled loop.
     */
      if (s.lookahead <= MAX_MATCH) {
        fill_window(s);
        if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH$1) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) {
          break;
        } /* flush the current block */
      }

      /* See how many times the previous byte repeats */
      s.match_length = 0;
      if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
        scan = s.strstart - 1;
        prev = _win[scan];
        if (
          prev === _win[++scan] &&
          prev === _win[++scan] &&
          prev === _win[++scan]
        ) {
          strend = s.strstart + MAX_MATCH;
          do {
            /*jshint noempty:false*/
          } while (
            prev === _win[++scan] &&
            prev === _win[++scan] &&
            prev === _win[++scan] &&
            prev === _win[++scan] &&
            prev === _win[++scan] &&
            prev === _win[++scan] &&
            prev === _win[++scan] &&
            prev === _win[++scan] &&
            scan < strend
          );
          s.match_length = MAX_MATCH - (strend - scan);
          if (s.match_length > s.lookahead) {
            s.match_length = s.lookahead;
          }
        }
        //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
      }

      /* Emit match if have run of MIN_MATCH or longer, else emit literal */
      if (s.match_length >= MIN_MATCH) {
        //check_match(s, s.strstart, s.strstart - 1, s.match_length);

        /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
        bflush = _tr_tally(s, 1, s.match_length - MIN_MATCH);

        s.lookahead -= s.match_length;
        s.strstart += s.match_length;
        s.match_length = 0;
      } else {
        /* No match, output a literal byte */
        //Tracevv((stderr,"%c", s->window[s->strstart]));
        /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
        bflush = _tr_tally(s, 0, s.window[s.strstart]);

        s.lookahead--;
        s.strstart++;
      }
      if (bflush) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }
    }
    s.insert = 0;
    if (flush === Z_FINISH$1) {
      /*** FLUSH_BLOCK(s, 1); ***/
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      /***/
      return BS_FINISH_DONE;
    }
    if (s.last_lit) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
    return BS_BLOCK_DONE;
  }

  /* ===========================================================================
 * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
 * (It will be regenerated if this run of deflate switches away from Huffman.)
 */
  function deflate_huff(s, flush) {
    var bflush; /* set if current block must be flushed */

    for (;;) {
      /* Make sure that we have a literal to write. */
      if (s.lookahead === 0) {
        fill_window(s);
        if (s.lookahead === 0) {
          if (flush === Z_NO_FLUSH$1) {
            return BS_NEED_MORE;
          }
          break; /* flush the current block */
        }
      }

      /* Output a literal byte */
      s.match_length = 0;
      //Tracevv((stderr,"%c", s->window[s->strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = _tr_tally(s, 0, s.window[s.strstart]);
      s.lookahead--;
      s.strstart++;
      if (bflush) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }
    }
    s.insert = 0;
    if (flush === Z_FINISH$1) {
      /*** FLUSH_BLOCK(s, 1); ***/
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      /***/
      return BS_FINISH_DONE;
    }
    if (s.last_lit) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
    return BS_BLOCK_DONE;
  }

  /* Values for max_lazy_match, good_match and max_chain_length, depending on
 * the desired pack level (0..9). The values given below have been tuned to
 * exclude worst case performance for pathological files. Better values may be
 * found for specific files.
 */
  function Config(good_length, max_lazy, nice_length, max_chain, func) {
    this.good_length = good_length;
    this.max_lazy = max_lazy;
    this.nice_length = nice_length;
    this.max_chain = max_chain;
    this.func = func;
  }

  var configuration_table;

  configuration_table = [
    /*      good lazy nice chain */
    new Config(0, 0, 0, 0, deflate_stored) /* 0 store only */,
    new Config(4, 4, 8, 4, deflate_fast) /* 1 max speed, no lazy matches */,
    new Config(4, 5, 16, 8, deflate_fast) /* 2 */,
    new Config(4, 6, 32, 32, deflate_fast) /* 3 */,

    new Config(4, 4, 16, 16, deflate_slow) /* 4 lazy matches */,
    new Config(8, 16, 32, 32, deflate_slow) /* 5 */,
    new Config(8, 16, 128, 128, deflate_slow) /* 6 */,
    new Config(8, 32, 128, 256, deflate_slow) /* 7 */,
    new Config(32, 128, 258, 1024, deflate_slow) /* 8 */,
    new Config(32, 258, 258, 4096, deflate_slow) /* 9 max compression */
  ];

  /* ===========================================================================
 * Initialize the "longest match" routines for a new zlib stream
 */
  function lm_init(s) {
    s.window_size = 2 * s.w_size;

    /*** CLEAR_HASH(s); ***/
    zero(s.head); // Fill with NIL (= 0);

    /* Set the default configuration parameters:
   */
    s.max_lazy_match = configuration_table[s.level].max_lazy;
    s.good_match = configuration_table[s.level].good_length;
    s.nice_match = configuration_table[s.level].nice_length;
    s.max_chain_length = configuration_table[s.level].max_chain;

    s.strstart = 0;
    s.block_start = 0;
    s.lookahead = 0;
    s.insert = 0;
    s.match_length = s.prev_length = MIN_MATCH - 1;
    s.match_available = 0;
    s.ins_h = 0;
  }

  function DeflateState() {
    this.strm = null; /* pointer back to this zlib stream */
    this.status = 0; /* as the name implies */
    this.pending_buf = null; /* output still pending */
    this.pending_buf_size = 0; /* size of pending_buf */
    this.pending_out = 0; /* next pending byte to output to the stream */
    this.pending = 0; /* nb of bytes in the pending buffer */
    this.wrap = 0; /* bit 0 true for zlib, bit 1 true for gzip */
    this.gzhead = null; /* gzip header information to write */
    this.gzindex = 0; /* where in extra, name, or comment */
    this.method = Z_DEFLATED$1; /* can only be DEFLATED */
    this.last_flush = -1; /* value of flush param for previous deflate call */

    this.w_size = 0; /* LZ77 window size (32K by default) */
    this.w_bits = 0; /* log2(w_size)  (8..16) */
    this.w_mask = 0; /* w_size - 1 */

    this.window = null;
    /* Sliding window. Input bytes are read into the second half of the window,
   * and move to the first half later to keep a dictionary of at least wSize
   * bytes. With this organization, matches are limited to a distance of
   * wSize-MAX_MATCH bytes, but this ensures that IO is always
   * performed with a length multiple of the block size.
   */

    this.window_size = 0;
    /* Actual size of window: 2*wSize, except when the user input buffer
   * is directly used as sliding window.
   */

    this.prev = null;
    /* Link to older string with same hash index. To limit the size of this
   * array to 64K, this link is maintained only for the last 32K strings.
   * An index in this array is thus a window index modulo 32K.
   */

    this.head = null; /* Heads of the hash chains or NIL. */

    this.ins_h = 0; /* hash index of string to be inserted */
    this.hash_size = 0; /* number of elements in hash table */
    this.hash_bits = 0; /* log2(hash_size) */
    this.hash_mask = 0; /* hash_size-1 */

    this.hash_shift = 0;
    /* Number of bits by which ins_h must be shifted at each input
   * step. It must be such that after MIN_MATCH steps, the oldest
   * byte no longer takes part in the hash key, that is:
   *   hash_shift * MIN_MATCH >= hash_bits
   */

    this.block_start = 0;
    /* Window position at the beginning of the current output block. Gets
   * negative when the window is moved backwards.
   */

    this.match_length = 0; /* length of best match */
    this.prev_match = 0; /* previous match */
    this.match_available = 0; /* set if previous match exists */
    this.strstart = 0; /* start of string to insert */
    this.match_start = 0; /* start of matching string */
    this.lookahead = 0; /* number of valid bytes ahead in window */

    this.prev_length = 0;
    /* Length of the best match at previous step. Matches not greater than this
   * are discarded. This is used in the lazy match evaluation.
   */

    this.max_chain_length = 0;
    /* To speed up deflation, hash chains are never searched beyond this
   * length.  A higher limit improves compression ratio but degrades the
   * speed.
   */

    this.max_lazy_match = 0;
    /* Attempt to find a better match only when the current match is strictly
   * smaller than this value. This mechanism is used only for compression
   * levels >= 4.
   */
    // That's alias to max_lazy_match, don't use directly
    //this.max_insert_length = 0;
    /* Insert new strings in the hash table only if the match length is not
   * greater than this length. This saves time but degrades compression.
   * max_insert_length is used only for compression levels <= 3.
   */

    this.level = 0; /* compression level (1..9) */
    this.strategy = 0; /* favor or force Huffman coding*/

    this.good_match = 0;
    /* Use a faster search when the previous match is longer than this */

    this.nice_match = 0; /* Stop searching when current match exceeds this */

    /* used by c: */

    /* Didn't use ct_data typedef below to suppress compiler warning */

    // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
    // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
    // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */

    // Use flat array of DOUBLE size, with interleaved fata,
    // because JS does not support effective
    this.dyn_ltree = new Buf16(HEAP_SIZE * 2);
    this.dyn_dtree = new Buf16((2 * D_CODES + 1) * 2);
    this.bl_tree = new Buf16((2 * BL_CODES + 1) * 2);
    zero(this.dyn_ltree);
    zero(this.dyn_dtree);
    zero(this.bl_tree);

    this.l_desc = null; /* desc. for literal tree */
    this.d_desc = null; /* desc. for distance tree */
    this.bl_desc = null; /* desc. for bit length tree */

    //ush bl_count[MAX_BITS+1];
    this.bl_count = new Buf16(MAX_BITS + 1);
    /* number of codes at each bit length for an optimal tree */

    //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
    this.heap = new Buf16(
      2 * L_CODES + 1
    ); /* heap used to build the Huffman trees */
    zero(this.heap);

    this.heap_len = 0; /* number of elements in the heap */
    this.heap_max = 0; /* element of largest frequency */
    /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
   * The same heap array is used to build all
   */

    this.depth = new Buf16(2 * L_CODES + 1); //uch depth[2*L_CODES+1];
    zero(this.depth);
    /* Depth of each subtree used as tie breaker for trees of equal frequency
   */

    this.l_buf = 0; /* buffer index for literals or lengths */

    this.lit_bufsize = 0;
    /* Size of match buffer for literals/lengths.  There are 4 reasons for
   * limiting lit_bufsize to 64K:
   *   - frequencies can be kept in 16 bit counters
   *   - if compression is not successful for the first block, all input
   *     data is still in the window so we can still emit a stored block even
   *     when input comes from standard input.  (This can also be done for
   *     all blocks if lit_bufsize is not greater than 32K.)
   *   - if compression is not successful for a file smaller than 64K, we can
   *     even emit a stored file instead of a stored block (saving 5 bytes).
   *     This is applicable only for zip (not gzip or zlib).
   *   - creating new Huffman trees less frequently may not provide fast
   *     adaptation to changes in the input data statistics. (Take for
   *     example a binary file with poorly compressible code followed by
   *     a highly compressible string table.) Smaller buffer sizes give
   *     fast adaptation but have of course the overhead of transmitting
   *     trees more frequently.
   *   - I can't count above 4
   */

    this.last_lit = 0; /* running index in l_buf */

    this.d_buf = 0;
    /* Buffer index for distances. To simplify the code, d_buf and l_buf have
   * the same number of elements. To use different lengths, an extra flag
   * array would be necessary.
   */

    this.opt_len = 0; /* bit length of current block with optimal trees */
    this.static_len = 0; /* bit length of current block with static trees */
    this.matches = 0; /* number of string matches in current block */
    this.insert = 0; /* bytes at end of window left to insert */

    this.bi_buf = 0;
    /* Output buffer. bits are inserted starting at the bottom (least
   * significant bits).
   */
    this.bi_valid = 0;
    /* Number of valid bits in bi_buf.  All bits above the last valid bit
   * are always zero.
   */

    // Used for window memory init. We safely ignore it for JS. That makes
    // sense only for pointers and memory check tools.
    //this.high_water = 0;
    /* High water mark offset in window for initialized bytes -- bytes above
   * this are set to zero in order to avoid memory check warnings when
   * longest match routines access bytes past the input.  This is then
   * updated to the new high water mark.
   */
  }

  function deflateResetKeep(strm) {
    var s;

    if (!strm || !strm.state) {
      return err(strm, Z_STREAM_ERROR$1);
    }

    strm.total_in = strm.total_out = 0;
    strm.data_type = Z_UNKNOWN$1;

    s = strm.state;
    s.pending = 0;
    s.pending_out = 0;

    if (s.wrap < 0) {
      s.wrap = -s.wrap;
      /* was made negative by deflate(..., Z_FINISH); */
    }
    s.status = s.wrap ? INIT_STATE : BUSY_STATE;
    strm.adler =
      s.wrap === 2
        ? 0 // crc32(0, Z_NULL, 0)
        : 1; // adler32(0, Z_NULL, 0)
    s.last_flush = Z_NO_FLUSH$1;
    _tr_init(s);
    return Z_OK$1;
  }

  function deflateReset(strm) {
    var ret = deflateResetKeep(strm);
    if (ret === Z_OK$1) {
      lm_init(strm.state);
    }
    return ret;
  }

  function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
    if (!strm) {
      // === Z_NULL
      return Z_STREAM_ERROR$1;
    }
    var wrap = 1;

    if (level === Z_DEFAULT_COMPRESSION$1) {
      level = 6;
    }

    if (windowBits < 0) {
      /* suppress zlib wrapper */
      wrap = 0;
      windowBits = -windowBits;
    } else if (windowBits > 15) {
      wrap = 2; /* write gzip wrapper instead */
      windowBits -= 16;
    }

    if (
      memLevel < 1 ||
      memLevel > MAX_MEM_LEVEL ||
      method !== Z_DEFLATED$1 ||
      windowBits < 8 ||
      windowBits > 15 ||
      level < 0 ||
      level > 9 ||
      strategy < 0 ||
      strategy > Z_FIXED$1
    ) {
      return err(strm, Z_STREAM_ERROR$1);
    }

    if (windowBits === 8) {
      windowBits = 9;
    }
    /* until 256-byte window bug fixed */

    var s = new DeflateState();

    strm.state = s;
    s.strm = strm;

    s.wrap = wrap;
    s.gzhead = null;
    s.w_bits = windowBits;
    s.w_size = 1 << s.w_bits;
    s.w_mask = s.w_size - 1;

    s.hash_bits = memLevel + 7;
    s.hash_size = 1 << s.hash_bits;
    s.hash_mask = s.hash_size - 1;
    s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);

    s.window = new Buf8(s.w_size * 2);
    s.head = new Buf16(s.hash_size);
    s.prev = new Buf16(s.w_size);

    // Don't need mem init magic for JS.
    //s.high_water = 0;  /* nothing written to s->window yet */

    s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */

    s.pending_buf_size = s.lit_bufsize * 4;

    //overlay = (ushf *) ZALLOC(strm, s->lit_bufsize, sizeof(ush)+2);
    //s->pending_buf = (uchf *) overlay;
    s.pending_buf = new Buf8(s.pending_buf_size);

    // It is offset from `s.pending_buf` (size is `s.lit_bufsize * 2`)
    //s->d_buf = overlay + s->lit_bufsize/sizeof(ush);
    s.d_buf = 1 * s.lit_bufsize;

    //s->l_buf = s->pending_buf + (1+sizeof(ush))*s->lit_bufsize;
    s.l_buf = (1 + 2) * s.lit_bufsize;

    s.level = level;
    s.strategy = strategy;
    s.method = method;

    return deflateReset(strm);
  }

  function deflate$1(strm, flush) {
    var old_flush, s;
    var beg, val; // for gzip header write only

    if (!strm || !strm.state || flush > Z_BLOCK$1 || flush < 0) {
      return strm ? err(strm, Z_STREAM_ERROR$1) : Z_STREAM_ERROR$1;
    }

    s = strm.state;

    if (
      !strm.output ||
      (!strm.input && strm.avail_in !== 0) ||
      (s.status === FINISH_STATE && flush !== Z_FINISH$1)
    ) {
      return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR$1 : Z_STREAM_ERROR$1);
    }

    s.strm = strm; /* just in case */
    old_flush = s.last_flush;
    s.last_flush = flush;

    /* Write the header */
    if (s.status === INIT_STATE) {
      if (s.wrap === 2) {
        // GZIP header
        strm.adler = 0; //crc32(0L, Z_NULL, 0);
        put_byte(s, 31);
        put_byte(s, 139);
        put_byte(s, 8);
        if (!s.gzhead) {
          // s->gzhead == Z_NULL
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(
            s,
            s.level === 9
              ? 2
              : s.strategy >= Z_HUFFMAN_ONLY$1 || s.level < 2 ? 4 : 0
          );
          put_byte(s, OS_CODE);
          s.status = BUSY_STATE;
        } else {
          put_byte(
            s,
            (s.gzhead.text ? 1 : 0) +
              (s.gzhead.hcrc ? 2 : 0) +
              (!s.gzhead.extra ? 0 : 4) +
              (!s.gzhead.name ? 0 : 8) +
              (!s.gzhead.comment ? 0 : 16)
          );
          put_byte(s, s.gzhead.time & 0xff);
          put_byte(s, (s.gzhead.time >> 8) & 0xff);
          put_byte(s, (s.gzhead.time >> 16) & 0xff);
          put_byte(s, (s.gzhead.time >> 24) & 0xff);
          put_byte(
            s,
            s.level === 9
              ? 2
              : s.strategy >= Z_HUFFMAN_ONLY$1 || s.level < 2 ? 4 : 0
          );
          put_byte(s, s.gzhead.os & 0xff);
          if (s.gzhead.extra && s.gzhead.extra.length) {
            put_byte(s, s.gzhead.extra.length & 0xff);
            put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
          }
          if (s.gzhead.hcrc) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
          }
          s.gzindex = 0;
          s.status = EXTRA_STATE;
        }
      } else {
        // DEFLATE header
        var header = (Z_DEFLATED$1 + ((s.w_bits - 8) << 4)) << 8;
        var level_flags = -1;

        if (s.strategy >= Z_HUFFMAN_ONLY$1 || s.level < 2) {
          level_flags = 0;
        } else if (s.level < 6) {
          level_flags = 1;
        } else if (s.level === 6) {
          level_flags = 2;
        } else {
          level_flags = 3;
        }
        header |= level_flags << 6;
        if (s.strstart !== 0) {
          header |= PRESET_DICT;
        }
        header += 31 - header % 31;

        s.status = BUSY_STATE;
        putShortMSB(s, header);

        /* Save the adler32 of the preset dictionary: */
        if (s.strstart !== 0) {
          putShortMSB(s, strm.adler >>> 16);
          putShortMSB(s, strm.adler & 0xffff);
        }
        strm.adler = 1; // adler32(0L, Z_NULL, 0);
      }
    }

    //#ifdef GZIP
    if (s.status === EXTRA_STATE) {
      if (s.gzhead.extra /* != Z_NULL*/) {
        beg = s.pending; /* start of bytes to update crc */

        while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32(
                strm.adler,
                s.pending_buf,
                s.pending - beg,
                beg
              );
            }
            flush_pending(strm);
            beg = s.pending;
            if (s.pending === s.pending_buf_size) {
              break;
            }
          }
          put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
          s.gzindex++;
        }
        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        if (s.gzindex === s.gzhead.extra.length) {
          s.gzindex = 0;
          s.status = NAME_STATE;
        }
      } else {
        s.status = NAME_STATE;
      }
    }
    if (s.status === NAME_STATE) {
      if (s.gzhead.name /* != Z_NULL*/) {
        beg = s.pending; /* start of bytes to update crc */
        //int val;

        do {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32(
                strm.adler,
                s.pending_buf,
                s.pending - beg,
                beg
              );
            }
            flush_pending(strm);
            beg = s.pending;
            if (s.pending === s.pending_buf_size) {
              val = 1;
              break;
            }
          }
          // JS specific: little magic to add zero terminator to end of string
          if (s.gzindex < s.gzhead.name.length) {
            val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
          } else {
            val = 0;
          }
          put_byte(s, val);
        } while (val !== 0);

        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        if (val === 0) {
          s.gzindex = 0;
          s.status = COMMENT_STATE;
        }
      } else {
        s.status = COMMENT_STATE;
      }
    }
    if (s.status === COMMENT_STATE) {
      if (s.gzhead.comment /* != Z_NULL*/) {
        beg = s.pending; /* start of bytes to update crc */
        //int val;

        do {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32(
                strm.adler,
                s.pending_buf,
                s.pending - beg,
                beg
              );
            }
            flush_pending(strm);
            beg = s.pending;
            if (s.pending === s.pending_buf_size) {
              val = 1;
              break;
            }
          }
          // JS specific: little magic to add zero terminator to end of string
          if (s.gzindex < s.gzhead.comment.length) {
            val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
          } else {
            val = 0;
          }
          put_byte(s, val);
        } while (val !== 0);

        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        if (val === 0) {
          s.status = HCRC_STATE;
        }
      } else {
        s.status = HCRC_STATE;
      }
    }
    if (s.status === HCRC_STATE) {
      if (s.gzhead.hcrc) {
        if (s.pending + 2 > s.pending_buf_size) {
          flush_pending(strm);
        }
        if (s.pending + 2 <= s.pending_buf_size) {
          put_byte(s, strm.adler & 0xff);
          put_byte(s, (strm.adler >> 8) & 0xff);
          strm.adler = 0; //crc32(0L, Z_NULL, 0);
          s.status = BUSY_STATE;
        }
      } else {
        s.status = BUSY_STATE;
      }
    }
    //#endif

    /* Flush as much pending output as possible */
    if (s.pending !== 0) {
      flush_pending(strm);
      if (strm.avail_out === 0) {
        /* Since avail_out is 0, deflate will be called again with
       * more output space, but possibly with both pending and
       * avail_in equal to zero. There won't be anything to do,
       * but this is not an error situation so make sure we
       * return OK instead of BUF_ERROR at next call of deflate:
       */
        s.last_flush = -1;
        return Z_OK$1;
      }

      /* Make sure there is something to do and avoid duplicate consecutive
     * flushes. For repeated and useless calls with Z_FINISH, we keep
     * returning Z_STREAM_END instead of Z_BUF_ERROR.
     */
    } else if (
      strm.avail_in === 0 &&
      rank(flush) <= rank(old_flush) &&
      flush !== Z_FINISH$1
    ) {
      return err(strm, Z_BUF_ERROR$1);
    }

    /* User must not provide more input after the first FINISH: */
    if (s.status === FINISH_STATE && strm.avail_in !== 0) {
      return err(strm, Z_BUF_ERROR$1);
    }

    /* Start a new block or continue the current one.
   */
    if (
      strm.avail_in !== 0 ||
      s.lookahead !== 0 ||
      (flush !== Z_NO_FLUSH$1 && s.status !== FINISH_STATE)
    ) {
      var bstate =
        s.strategy === Z_HUFFMAN_ONLY$1
          ? deflate_huff(s, flush)
          : s.strategy === Z_RLE$1
            ? deflate_rle(s, flush)
            : configuration_table[s.level].func(s, flush);

      if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
        s.status = FINISH_STATE;
      }
      if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
        if (strm.avail_out === 0) {
          s.last_flush = -1;
          /* avoid BUF_ERROR next call, see above */
        }
        return Z_OK$1;
        /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
       * of deflate should use the same flush parameter to make sure
       * that the flush is complete. So we don't have to output an
       * empty block here, this will be done at next call. This also
       * ensures that for a very small output buffer, we emit at most
       * one empty block.
       */
      }
      if (bstate === BS_BLOCK_DONE) {
        if (flush === Z_PARTIAL_FLUSH$1) {
          _tr_align(s);
        } else if (flush !== Z_BLOCK$1) {
          /* FULL_FLUSH or SYNC_FLUSH */

          _tr_stored_block(s, 0, 0, false);
          /* For a full flush, this empty block will be recognized
         * as a special marker by inflate_sync().
         */
          if (flush === Z_FULL_FLUSH$1) {
            /*** CLEAR_HASH(s); ***/
            /* forget history */
            zero(s.head); // Fill with NIL (= 0);

            if (s.lookahead === 0) {
              s.strstart = 0;
              s.block_start = 0;
              s.insert = 0;
            }
          }
        }
        flush_pending(strm);
        if (strm.avail_out === 0) {
          s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
          return Z_OK$1;
        }
      }
    }
    //Assert(strm->avail_out > 0, "bug2");
    //if (strm.avail_out <= 0) { throw new Error("bug2");}

    if (flush !== Z_FINISH$1) {
      return Z_OK$1;
    }
    if (s.wrap <= 0) {
      return Z_STREAM_END$1;
    }

    /* Write the trailer */
    if (s.wrap === 2) {
      put_byte(s, strm.adler & 0xff);
      put_byte(s, (strm.adler >> 8) & 0xff);
      put_byte(s, (strm.adler >> 16) & 0xff);
      put_byte(s, (strm.adler >> 24) & 0xff);
      put_byte(s, strm.total_in & 0xff);
      put_byte(s, (strm.total_in >> 8) & 0xff);
      put_byte(s, (strm.total_in >> 16) & 0xff);
      put_byte(s, (strm.total_in >> 24) & 0xff);
    } else {
      putShortMSB(s, strm.adler >>> 16);
      putShortMSB(s, strm.adler & 0xffff);
    }

    flush_pending(strm);
    /* If avail_out is zero, the application will call deflate again
   * to flush the rest.
   */
    if (s.wrap > 0) {
      s.wrap = -s.wrap;
    }
    /* write the trailer only once! */
    return s.pending !== 0 ? Z_OK$1 : Z_STREAM_END$1;
  }

  function deflateEnd(strm) {
    var status;

    if (!strm /*== Z_NULL*/ || !strm.state /*== Z_NULL*/) {
      return Z_STREAM_ERROR$1;
    }

    status = strm.state.status;
    if (
      status !== INIT_STATE &&
      status !== EXTRA_STATE &&
      status !== NAME_STATE &&
      status !== COMMENT_STATE &&
      status !== HCRC_STATE &&
      status !== BUSY_STATE &&
      status !== FINISH_STATE
    ) {
      return err(strm, Z_STREAM_ERROR$1);
    }

    strm.state = null;

    return status === BUSY_STATE ? err(strm, Z_DATA_ERROR$1) : Z_OK$1;
  }

  /* =========================================================================
 * Initializes the compression dictionary from the given byte
 * sequence without producing any compressed output.
 */

  /* Not implemented
exports.deflateBound = deflateBound;
exports.deflateCopy = deflateCopy;
exports.deflateParams = deflateParams;
exports.deflatePending = deflatePending;
exports.deflatePrime = deflatePrime;
exports.deflateTune = deflateTune;
*/

  // See state defs from inflate.js
  var BAD$1 = 30; /* got a data error -- remain here until reset */
  var TYPE$1 = 12; /* i: waiting for type bits, including last-flag bit */

  /*
   Decode literal, length, and distance codes and write out the resulting
   literal and match bytes until either not enough input or output is
   available, an end-of-block is encountered, or a data error is encountered.
   When large enough input and output buffers are supplied to inflate(), for
   example, a 16K input buffer and a 64K output buffer, more than 95% of the
   inflate execution time is spent in this routine.

   Entry assumptions:

        state.mode === LEN
        strm.avail_in >= 6
        strm.avail_out >= 258
        start >= strm.avail_out
        state.bits < 8

   On return, state.mode is one of:

        LEN -- ran out of enough output space or enough available input
        TYPE -- reached end of block code, inflate() to interpret next block
        BAD -- error in block data

   Notes:

    - The maximum input bits used by a length/distance pair is 15 bits for the
      length code, 5 bits for the length extra, 15 bits for the distance code,
      and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
      Therefore if strm.avail_in >= 6, then there is enough input to avoid
      checking for available input while decoding.

    - The maximum bytes that a single length/distance pair can output is 258
      bytes, which is the maximum length that can be coded.  inflate_fast()
      requires strm.avail_out >= 258 for each loop to avoid checking for
      output space.
 */
  function inflate_fast(strm, start) {
    var state;
    var _in; /* local strm.input */
    var last; /* have enough input while in < last */
    var _out; /* local strm.output */
    var beg; /* inflate()'s initial strm.output */
    var end; /* while out < end, enough space available */
    //#ifdef INFLATE_STRICT
    var dmax; /* maximum distance from zlib header */
    //#endif
    var wsize; /* window size or zero if not using window */
    var whave; /* valid bytes in the window */
    var wnext; /* window write index */
    // Use `s_window` instead `window`, avoid conflict with instrumentation tools
    var s_window; /* allocated sliding window, if wsize != 0 */
    var hold; /* local strm.hold */
    var bits; /* local strm.bits */
    var lcode; /* local strm.lencode */
    var dcode; /* local strm.distcode */
    var lmask; /* mask for first level of length codes */
    var dmask; /* mask for first level of distance codes */
    var here; /* retrieved table entry */
    var op; /* code bits, operation, extra bits, or */
    /*  window position, window bytes to copy */
    var len; /* match length, unused bytes */
    var dist; /* match distance */
    var from; /* where to copy match from */
    var from_source;

    var input, output; // JS specific, because we have no pointers

    /* copy state to local variables */
    state = strm.state;
    //here = state.here;
    _in = strm.next_in;
    input = strm.input;
    last = _in + (strm.avail_in - 5);
    _out = strm.next_out;
    output = strm.output;
    beg = _out - (start - strm.avail_out);
    end = _out + (strm.avail_out - 257);
    //#ifdef INFLATE_STRICT
    dmax = state.dmax;
    //#endif
    wsize = state.wsize;
    whave = state.whave;
    wnext = state.wnext;
    s_window = state.window;
    hold = state.hold;
    bits = state.bits;
    lcode = state.lencode;
    dcode = state.distcode;
    lmask = (1 << state.lenbits) - 1;
    dmask = (1 << state.distbits) - 1;

    /* decode literals and length/distances until end-of-block or not enough
     input data or output space */

    top: do {
      if (bits < 15) {
        hold += input[_in++] << bits;
        bits += 8;
        hold += input[_in++] << bits;
        bits += 8;
      }

      here = lcode[hold & lmask];

      dolen: for (;;) {
        // Goto emulation
        op = here >>> 24 /*here.bits*/;
        hold >>>= op;
        bits -= op;
        op = (here >>> 16) & 0xff /*here.op*/;
        if (op === 0) {
          /* literal */
          //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
          //        "inflate:         literal '%c'\n" :
          //        "inflate:         literal 0x%02x\n", here.val));
          output[_out++] = here & 0xffff /*here.val*/;
        } else if (op & 16) {
          /* length base */
          len = here & 0xffff /*here.val*/;
          op &= 15; /* number of extra bits */
          if (op) {
            if (bits < op) {
              hold += input[_in++] << bits;
              bits += 8;
            }
            len += hold & ((1 << op) - 1);
            hold >>>= op;
            bits -= op;
          }
          //Tracevv((stderr, "inflate:         length %u\n", len));
          if (bits < 15) {
            hold += input[_in++] << bits;
            bits += 8;
            hold += input[_in++] << bits;
            bits += 8;
          }
          here = dcode[hold & dmask];

          dodist: for (;;) {
            // goto emulation
            op = here >>> 24 /*here.bits*/;
            hold >>>= op;
            bits -= op;
            op = (here >>> 16) & 0xff /*here.op*/;

            if (op & 16) {
              /* distance base */
              dist = here & 0xffff /*here.val*/;
              op &= 15; /* number of extra bits */
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
                if (bits < op) {
                  hold += input[_in++] << bits;
                  bits += 8;
                }
              }
              dist += hold & ((1 << op) - 1);
              //#ifdef INFLATE_STRICT
              if (dist > dmax) {
                strm.msg = 'invalid distance too far back';
                state.mode = BAD$1;
                break top;
              }
              //#endif
              hold >>>= op;
              bits -= op;
              //Tracevv((stderr, "inflate:         distance %u\n", dist));
              op = _out - beg; /* max distance in output */
              if (dist > op) {
                /* see if copy from window */
                op = dist - op; /* distance back in window */
                if (op > whave) {
                  if (state.sane) {
                    strm.msg = 'invalid distance too far back';
                    state.mode = BAD$1;
                    break top;
                  }

                  // (!) This block is disabled in zlib defailts,
                  // don't enable it for binary compatibility
                  //#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
                  //                if (len <= op - whave) {
                  //                  do {
                  //                    output[_out++] = 0;
                  //                  } while (--len);
                  //                  continue top;
                  //                }
                  //                len -= op - whave;
                  //                do {
                  //                  output[_out++] = 0;
                  //                } while (--op > whave);
                  //                if (op === 0) {
                  //                  from = _out - dist;
                  //                  do {
                  //                    output[_out++] = output[from++];
                  //                  } while (--len);
                  //                  continue top;
                  //                }
                  //#endif
                }
                from = 0; // window index
                from_source = s_window;
                if (wnext === 0) {
                  /* very common case */
                  from += wsize - op;
                  if (op < len) {
                    /* some from window */
                    len -= op;
                    do {
                      output[_out++] = s_window[from++];
                    } while (--op);
                    from = _out - dist; /* rest from output */
                    from_source = output;
                  }
                } else if (wnext < op) {
                  /* wrap around window */
                  from += wsize + wnext - op;
                  op -= wnext;
                  if (op < len) {
                    /* some from end of window */
                    len -= op;
                    do {
                      output[_out++] = s_window[from++];
                    } while (--op);
                    from = 0;
                    if (wnext < len) {
                      /* some from start of window */
                      op = wnext;
                      len -= op;
                      do {
                        output[_out++] = s_window[from++];
                      } while (--op);
                      from = _out - dist; /* rest from output */
                      from_source = output;
                    }
                  }
                } else {
                  /* contiguous in window */
                  from += wnext - op;
                  if (op < len) {
                    /* some from window */
                    len -= op;
                    do {
                      output[_out++] = s_window[from++];
                    } while (--op);
                    from = _out - dist; /* rest from output */
                    from_source = output;
                  }
                }
                while (len > 2) {
                  output[_out++] = from_source[from++];
                  output[_out++] = from_source[from++];
                  output[_out++] = from_source[from++];
                  len -= 3;
                }
                if (len) {
                  output[_out++] = from_source[from++];
                  if (len > 1) {
                    output[_out++] = from_source[from++];
                  }
                }
              } else {
                from = _out - dist; /* copy direct from output */
                do {
                  /* minimum length is three */
                  output[_out++] = output[from++];
                  output[_out++] = output[from++];
                  output[_out++] = output[from++];
                  len -= 3;
                } while (len > 2);
                if (len) {
                  output[_out++] = output[from++];
                  if (len > 1) {
                    output[_out++] = output[from++];
                  }
                }
              }
            } else if ((op & 64) === 0) {
              /* 2nd level distance code */
              here =
                dcode[(here & 0xffff) /*here.val*/ + (hold & ((1 << op) - 1))];
              continue dodist;
            } else {
              strm.msg = 'invalid distance code';
              state.mode = BAD$1;
              break top;
            }

            break; // need to emulate goto via "continue"
          }
        } else if ((op & 64) === 0) {
          /* 2nd level length code */
          here = lcode[(here & 0xffff) /*here.val*/ + (hold & ((1 << op) - 1))];
          continue dolen;
        } else if (op & 32) {
          /* end-of-block */
          //Tracevv((stderr, "inflate:         end of block\n"));
          state.mode = TYPE$1;
          break top;
        } else {
          strm.msg = 'invalid literal/length code';
          state.mode = BAD$1;
          break top;
        }

        break; // need to emulate goto via "continue"
      }
    } while (_in < last && _out < end);

    /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
    len = bits >> 3;
    _in -= len;
    bits -= len << 3;
    hold &= (1 << bits) - 1;

    /* update state and return */
    strm.next_in = _in;
    strm.next_out = _out;
    strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
    strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
    state.hold = hold;
    state.bits = bits;
    return;
  }

  var MAXBITS = 15;
  var ENOUGH_LENS$1 = 852;
  var ENOUGH_DISTS$1 = 592;
  //var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

  var CODES$1 = 0;
  var LENS$1 = 1;
  var DISTS$1 = 2;

  var lbase = [
    /* Length codes 257..285 base */
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    13,
    15,
    17,
    19,
    23,
    27,
    31,
    35,
    43,
    51,
    59,
    67,
    83,
    99,
    115,
    131,
    163,
    195,
    227,
    258,
    0,
    0
  ];

  var lext = [
    /* Length codes 257..285 extra */
    16,
    16,
    16,
    16,
    16,
    16,
    16,
    16,
    17,
    17,
    17,
    17,
    18,
    18,
    18,
    18,
    19,
    19,
    19,
    19,
    20,
    20,
    20,
    20,
    21,
    21,
    21,
    21,
    16,
    72,
    78
  ];

  var dbase = [
    /* Distance codes 0..29 base */
    1,
    2,
    3,
    4,
    5,
    7,
    9,
    13,
    17,
    25,
    33,
    49,
    65,
    97,
    129,
    193,
    257,
    385,
    513,
    769,
    1025,
    1537,
    2049,
    3073,
    4097,
    6145,
    8193,
    12289,
    16385,
    24577,
    0,
    0
  ];

  var dext = [
    /* Distance codes 0..29 extra */
    16,
    16,
    16,
    16,
    17,
    17,
    18,
    18,
    19,
    19,
    20,
    20,
    21,
    21,
    22,
    22,
    23,
    23,
    24,
    24,
    25,
    25,
    26,
    26,
    27,
    27,
    28,
    28,
    29,
    29,
    64,
    64
  ];

  function inflate_table(
    type,
    lens,
    lens_index,
    codes,
    table,
    table_index,
    work,
    opts
  ) {
    var bits = opts.bits;
    //here = opts.here; /* table entry for duplication */

    var len = 0; /* a code's length in bits */
    var sym = 0; /* index of code symbols */
    var min = 0,
      max = 0; /* minimum and maximum code lengths */
    var root = 0; /* number of index bits for root table */
    var curr = 0; /* number of index bits for current table */
    var drop = 0; /* code bits to drop for sub-table */
    var left = 0; /* number of prefix codes available */
    var used = 0; /* code entries in table used */
    var huff = 0; /* Huffman code */
    var incr; /* for incrementing code, index */
    var fill; /* index for replicating entries */
    var low; /* low bits for current root entry */
    var mask; /* mask for low root bits */
    var next; /* next available space in table */
    var base = null; /* base value table to use */
    var base_index = 0;
    //  var shoextra;    /* extra bits table to use */
    var end; /* use base and extra for symbol > end */
    var count = new Buf16(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */
    var offs = new Buf16(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */
    var extra = null;
    var extra_index = 0;

    var here_bits, here_op, here_val;

    /*
   Process a set of code lengths to create a canonical Huffman code.  The
   code lengths are lens[0..codes-1].  Each length corresponds to the
   symbols 0..codes-1.  The Huffman code is generated by first sorting the
   symbols by length from short to long, and retaining the symbol order
   for codes with equal lengths.  Then the code starts with all zero bits
   for the first code of the shortest length, and the codes are integer
   increments for the same length, and zeros are appended as the length
   increases.  For the deflate format, these bits are stored backwards
   from their more natural integer increment ordering, and so when the
   decoding tables are built in the large loop below, the integer codes
   are incremented backwards.

   This routine assumes, but does not check, that all of the entries in
   lens[] are in the range 0..MAXBITS.  The caller must assure this.
   1..MAXBITS is interpreted as that code length.  zero means that that
   symbol does not occur in this code.

   The codes are sorted by computing a count of codes for each length,
   creating from that a table of starting indices for each length in the
   sorted table, and then entering the symbols in order in the sorted
   table.  The sorted table is work[], with that space being provided by
   the caller.

   The length counts are used for other purposes as well, i.e. finding
   the minimum and maximum length codes, determining if there are any
   codes at all, checking for a valid set of lengths, and looking ahead
   at length counts to determine sub-table sizes when building the
   decoding tables.
   */

    /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
    for (len = 0; len <= MAXBITS; len++) {
      count[len] = 0;
    }
    for (sym = 0; sym < codes; sym++) {
      count[lens[lens_index + sym]]++;
    }

    /* bound code lengths, force root to be within code lengths */
    root = bits;
    for (max = MAXBITS; max >= 1; max--) {
      if (count[max] !== 0) {
        break;
      }
    }
    if (root > max) {
      root = max;
    }
    if (max === 0) {
      /* no symbols to code at all */
      //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
      //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
      //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
      table[table_index++] = (1 << 24) | (64 << 16) | 0;

      //table.op[opts.table_index] = 64;
      //table.bits[opts.table_index] = 1;
      //table.val[opts.table_index++] = 0;
      table[table_index++] = (1 << 24) | (64 << 16) | 0;

      opts.bits = 1;
      return 0; /* no symbols, but wait for decoding to report error */
    }
    for (min = 1; min < max; min++) {
      if (count[min] !== 0) {
        break;
      }
    }
    if (root < min) {
      root = min;
    }

    /* check for an over-subscribed or incomplete set of lengths */
    left = 1;
    for (len = 1; len <= MAXBITS; len++) {
      left <<= 1;
      left -= count[len];
      if (left < 0) {
        return -1;
      } /* over-subscribed */
    }
    if (left > 0 && (type === CODES$1 || max !== 1)) {
      return -1; /* incomplete set */
    }

    /* generate offsets into symbol table for each length for sorting */
    offs[1] = 0;
    for (len = 1; len < MAXBITS; len++) {
      offs[len + 1] = offs[len] + count[len];
    }

    /* sort symbols by length, by symbol order within each length */
    for (sym = 0; sym < codes; sym++) {
      if (lens[lens_index + sym] !== 0) {
        work[offs[lens[lens_index + sym]]++] = sym;
      }
    }

    /*
   Create and fill in decoding tables.  In this loop, the table being
   filled is at next and has curr index bits.  The code being used is huff
   with length len.  That code is converted to an index by dropping drop
   bits off of the bottom.  For codes where len is less than drop + curr,
   those top drop + curr - len bits are incremented through all values to
   fill the table with replicated entries.

   root is the number of index bits for the root table.  When len exceeds
   root, sub-tables are created pointed to by the root entry with an index
   of the low root bits of huff.  This is saved in low to check for when a
   new sub-table should be started.  drop is zero when the root table is
   being filled, and drop is root when sub-tables are being filled.

   When a new sub-table is needed, it is necessary to look ahead in the
   code lengths to determine what size sub-table is needed.  The length
   counts are used for this, and so count[] is decremented as codes are
   entered in the tables.

   used keeps track of how many table entries have been allocated from the
   provided *table space.  It is checked for LENS and DIST tables against
   the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
   the initial root table size constants.  See the comments in inftrees.h
   for more information.

   sym increments through all symbols, and the loop terminates when
   all codes of length max, i.e. all codes, have been processed.  This
   routine permits incomplete codes, so another loop after this one fills
   in the rest of the decoding tables with invalid code markers.
   */

    /* set up for code type */
    // poor man optimization - use if-else instead of switch,
    // to avoid deopts in old v8
    if (type === CODES$1) {
      base = extra = work; /* dummy value--not used */
      end = 19;
    } else if (type === LENS$1) {
      base = lbase;
      base_index -= 257;
      extra = lext;
      extra_index -= 257;
      end = 256;
    } else {
      /* DISTS */
      base = dbase;
      extra = dext;
      end = -1;
    }

    /* initialize opts for loop */
    huff = 0; /* starting code */
    sym = 0; /* starting code symbol */
    len = min; /* starting code length */
    next = table_index; /* current table to fill in */
    curr = root; /* current table index bits */
    drop = 0; /* current bits to drop from code for index */
    low = -1; /* trigger new sub-table when len > root */
    used = 1 << root; /* use root table entries */
    mask = used - 1; /* mask for comparing low */

    /* check available table space */
    if (
      (type === LENS$1 && used > ENOUGH_LENS$1) ||
      (type === DISTS$1 && used > ENOUGH_DISTS$1)
    ) {
      return 1;
    }

    for (;;) {
      here_bits = len - drop;
      if (work[sym] < end) {
        here_op = 0;
        here_val = work[sym];
      } else if (work[sym] > end) {
        here_op = extra[extra_index + work[sym]];
        here_val = base[base_index + work[sym]];
      } else {
        here_op = 32 + 64; /* end of block */
        here_val = 0;
      }

      /* replicate for those indices with low len bits equal to huff */
      incr = 1 << (len - drop);
      fill = 1 << curr;
      min = fill; /* save offset to next table */
      do {
        fill -= incr;
        table[next + (huff >> drop) + fill] =
          (here_bits << 24) | (here_op << 16) | here_val | 0;
      } while (fill !== 0);

      /* backwards increment the len-bit code huff */
      incr = 1 << (len - 1);
      while (huff & incr) {
        incr >>= 1;
      }
      if (incr !== 0) {
        huff &= incr - 1;
        huff += incr;
      } else {
        huff = 0;
      }

      /* go to next symbol, update count, len */
      sym++;
      if (--count[len] === 0) {
        if (len === max) {
          break;
        }
        len = lens[lens_index + work[sym]];
      }

      /* create new sub-table if needed */
      if (len > root && (huff & mask) !== low) {
        /* if first time, transition to sub-tables */
        if (drop === 0) {
          drop = root;
        }

        /* increment past last table */
        next += min; /* here min is 1 << curr */

        /* determine length of next table */
        curr = len - drop;
        left = 1 << curr;
        while (curr + drop < max) {
          left -= count[curr + drop];
          if (left <= 0) {
            break;
          }
          curr++;
          left <<= 1;
        }

        /* check for enough space */
        used += 1 << curr;
        if (
          (type === LENS$1 && used > ENOUGH_LENS$1) ||
          (type === DISTS$1 && used > ENOUGH_DISTS$1)
        ) {
          return 1;
        }

        /* point entry in root table to sub-table */
        low = huff & mask;
        /*table.op[low] = curr;
      table.bits[low] = root;
      table.val[low] = next - opts.table_index;*/
        table[low] = (root << 24) | (curr << 16) | (next - table_index) | 0;
      }
    }

    /* fill in remaining table entry if code is incomplete (guaranteed to have
   at most one remaining entry, since if the code is incomplete, the
   maximum code length that was allowed to get this far is one bit) */
    if (huff !== 0) {
      //table.op[next + huff] = 64;            /* invalid code marker */
      //table.bits[next + huff] = len - drop;
      //table.val[next + huff] = 0;
      table[next + huff] = ((len - drop) << 24) | (64 << 16) | 0;
    }

    /* set return parameters */
    //opts.table_index += used;
    opts.bits = root;
    return 0;
  }

  var CODES = 0;
  var LENS = 1;
  var DISTS = 2;

  /* Public constants ==========================================================*/
  /* ===========================================================================*/

  /* Allowed flush values; see deflate() and inflate() below for details */
  //var Z_NO_FLUSH      = 0;
  //var Z_PARTIAL_FLUSH = 1;
  //var Z_SYNC_FLUSH    = 2;
  //var Z_FULL_FLUSH    = 3;
  var Z_FINISH$2 = 4;
  var Z_BLOCK$2 = 5;
  var Z_TREES$1 = 6;

  /* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
  var Z_OK$2 = 0;
  var Z_STREAM_END$2 = 1;
  var Z_NEED_DICT$1 = 2;
  //var Z_ERRNO         = -1;
  var Z_STREAM_ERROR$2 = -2;
  var Z_DATA_ERROR$2 = -3;
  var Z_MEM_ERROR = -4;
  var Z_BUF_ERROR$2 = -5;
  //var Z_VERSION_ERROR = -6;

  /* The deflate compression method */
  var Z_DEFLATED$2 = 8;

  /* STATES ====================================================================*/
  /* ===========================================================================*/

  var HEAD = 1; /* i: waiting for magic header */
  var FLAGS = 2; /* i: waiting for method and flags (gzip) */
  var TIME = 3; /* i: waiting for modification time (gzip) */
  var OS = 4; /* i: waiting for extra flags and operating system (gzip) */
  var EXLEN = 5; /* i: waiting for extra length (gzip) */
  var EXTRA = 6; /* i: waiting for extra bytes (gzip) */
  var NAME = 7; /* i: waiting for end of file name (gzip) */
  var COMMENT = 8; /* i: waiting for end of comment (gzip) */
  var HCRC = 9; /* i: waiting for header crc (gzip) */
  var DICTID = 10; /* i: waiting for dictionary check value */
  var DICT = 11; /* waiting for inflateSetDictionary() call */
  var TYPE = 12; /* i: waiting for type bits, including last-flag bit */
  var TYPEDO = 13; /* i: same, but skip check to exit inflate on new block */
  var STORED = 14; /* i: waiting for stored size (length and complement) */
  var COPY_ = 15; /* i/o: same as COPY below, but only first time in */
  var COPY = 16; /* i/o: waiting for input or output to copy stored block */
  var TABLE = 17; /* i: waiting for dynamic block table lengths */
  var LENLENS = 18; /* i: waiting for code length code lengths */
  var CODELENS = 19; /* i: waiting for length/lit and distance code lengths */
  var LEN_ = 20; /* i: same as LEN below, but only first time in */
  var LEN = 21; /* i: waiting for length/lit/eob code */
  var LENEXT = 22; /* i: waiting for length extra bits */
  var DIST = 23; /* i: waiting for distance code */
  var DISTEXT = 24; /* i: waiting for distance extra bits */
  var MATCH = 25; /* o: waiting for output space to copy string */
  var LIT = 26; /* o: waiting for output space to write literal */
  var CHECK = 27; /* i: waiting for 32-bit check value */
  var LENGTH = 28; /* i: waiting for 32-bit length (gzip) */
  var DONE = 29; /* finished check, done -- remain here until reset */
  var BAD = 30; /* got a data error -- remain here until reset */
  var MEM = 31; /* got an inflate() memory error -- remain here until reset */
  var SYNC = 32; /* looking for synchronization bytes to restart inflate() */

  /* ===========================================================================*/

  var ENOUGH_LENS = 852;
  var ENOUGH_DISTS = 592;
  function zswap32(q) {
    return (
      ((q >>> 24) & 0xff) +
      ((q >>> 8) & 0xff00) +
      ((q & 0xff00) << 8) +
      ((q & 0xff) << 24)
    );
  }

  function InflateState() {
    this.mode = 0; /* current inflate mode */
    this.last = false; /* true if processing last block */
    this.wrap = 0; /* bit 0 true for zlib, bit 1 true for gzip */
    this.havedict = false; /* true if dictionary provided */
    this.flags = 0; /* gzip header method and flags (0 if zlib) */
    this.dmax = 0; /* zlib header max distance (INFLATE_STRICT) */
    this.check = 0; /* protected copy of check value */
    this.total = 0; /* protected copy of output count */
    // TODO: may be {}
    this.head = null; /* where to save gzip header information */

    /* sliding window */
    this.wbits = 0; /* log base 2 of requested window size */
    this.wsize = 0; /* window size or zero if not using window */
    this.whave = 0; /* valid bytes in the window */
    this.wnext = 0; /* window write index */
    this.window = null; /* allocated sliding window, if needed */

    /* bit accumulator */
    this.hold = 0; /* input bit accumulator */
    this.bits = 0; /* number of bits in "in" */

    /* for string and stored block copying */
    this.length = 0; /* literal or length of data to copy */
    this.offset = 0; /* distance back to copy string from */

    /* for table and code decoding */
    this.extra = 0; /* extra bits needed */

    /* fixed and dynamic code tables */
    this.lencode = null; /* starting table for length/literal codes */
    this.distcode = null; /* starting table for distance codes */
    this.lenbits = 0; /* index bits for lencode */
    this.distbits = 0; /* index bits for distcode */

    /* dynamic table building */
    this.ncode = 0; /* number of code length code lengths */
    this.nlen = 0; /* number of length code lengths */
    this.ndist = 0; /* number of distance code lengths */
    this.have = 0; /* number of code lengths in lens[] */
    this.next = null; /* next available space in codes[] */

    this.lens = new Buf16(320); /* temporary storage for code lengths */
    this.work = new Buf16(288); /* work area for code table building */

    /*
   because we don't have pointers in js, we use lencode and distcode directly
   as buffers so we don't need codes
  */
    //this.codes = new Buf32(ENOUGH);       /* space for code tables */
    this.lendyn = null; /* dynamic table for length/literal codes (JS specific) */
    this.distdyn = null; /* dynamic table for distance codes (JS specific) */
    this.sane = 0; /* if false, allow invalid distance too far */
    this.back = 0; /* bits back of last unprocessed length/lit */
    this.was = 0; /* initial length of match */
  }

  function inflateResetKeep(strm) {
    var state;

    if (!strm || !strm.state) {
      return Z_STREAM_ERROR$2;
    }
    state = strm.state;
    strm.total_in = strm.total_out = state.total = 0;
    strm.msg = ''; /*Z_NULL*/
    if (state.wrap) {
      /* to support ill-conceived Java test suite */
      strm.adler = state.wrap & 1;
    }
    state.mode = HEAD;
    state.last = 0;
    state.havedict = 0;
    state.dmax = 32768;
    state.head = null /*Z_NULL*/;
    state.hold = 0;
    state.bits = 0;
    //state.lencode = state.distcode = state.next = state.codes;
    state.lencode = state.lendyn = new Buf32(ENOUGH_LENS);
    state.distcode = state.distdyn = new Buf32(ENOUGH_DISTS);

    state.sane = 1;
    state.back = -1;
    //Tracev((stderr, "inflate: reset\n"));
    return Z_OK$2;
  }

  function inflateReset(strm) {
    var state;

    if (!strm || !strm.state) {
      return Z_STREAM_ERROR$2;
    }
    state = strm.state;
    state.wsize = 0;
    state.whave = 0;
    state.wnext = 0;
    return inflateResetKeep(strm);
  }

  function inflateReset2(strm, windowBits) {
    var wrap;
    var state;

    /* get the state */
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR$2;
    }
    state = strm.state;

    /* extract wrap request from windowBits parameter */
    if (windowBits < 0) {
      wrap = 0;
      windowBits = -windowBits;
    } else {
      wrap = (windowBits >> 4) + 1;
      if (windowBits < 48) {
        windowBits &= 15;
      }
    }

    /* set number of window bits, free window if different */
    if (windowBits && (windowBits < 8 || windowBits > 15)) {
      return Z_STREAM_ERROR$2;
    }
    if (state.window !== null && state.wbits !== windowBits) {
      state.window = null;
    }

    /* update state and reset the rest of it */
    state.wrap = wrap;
    state.wbits = windowBits;
    return inflateReset(strm);
  }

  function inflateInit2(strm, windowBits) {
    var ret;
    var state;

    if (!strm) {
      return Z_STREAM_ERROR$2;
    }
    //strm.msg = Z_NULL;                 /* in case we return an error */

    state = new InflateState();

    //if (state === Z_NULL) return Z_MEM_ERROR;
    //Tracev((stderr, "inflate: allocated\n"));
    strm.state = state;
    state.window = null /*Z_NULL*/;
    ret = inflateReset2(strm, windowBits);
    if (ret !== Z_OK$2) {
      strm.state = null /*Z_NULL*/;
    }
    return ret;
  }

  /*
 Return state with length and distance decoding tables and index sizes set to
 fixed code decoding.  Normally this returns fixed tables from inffixed.h.
 If BUILDFIXED is defined, then instead this routine builds the tables the
 first time it's called, and returns those tables the first time and
 thereafter.  This reduces the size of the code by about 2K bytes, in
 exchange for a little execution time.  However, BUILDFIXED should not be
 used for threaded applications, since the rewriting of the tables and virgin
 may not be thread-safe.
 */
  var virgin = true;

  var lenfix;
  var distfix; // We have no pointers in JS, so keep tables separate

  function fixedtables(state) {
    /* build fixed huffman tables if first call (may not be thread safe) */
    if (virgin) {
      var sym;

      lenfix = new Buf32(512);
      distfix = new Buf32(32);

      /* literal/length table */
      sym = 0;
      while (sym < 144) {
        state.lens[sym++] = 8;
      }
      while (sym < 256) {
        state.lens[sym++] = 9;
      }
      while (sym < 280) {
        state.lens[sym++] = 7;
      }
      while (sym < 288) {
        state.lens[sym++] = 8;
      }

      inflate_table(LENS, state.lens, 0, 288, lenfix, 0, state.work, {
        bits: 9
      });

      /* distance table */
      sym = 0;
      while (sym < 32) {
        state.lens[sym++] = 5;
      }

      inflate_table(DISTS, state.lens, 0, 32, distfix, 0, state.work, {
        bits: 5
      });

      /* do this just once */
      virgin = false;
    }

    state.lencode = lenfix;
    state.lenbits = 9;
    state.distcode = distfix;
    state.distbits = 5;
  }

  /*
 Update the window with the last wsize (normally 32K) bytes written before
 returning.  If window does not exist yet, create it.  This is only called
 when a window is already in use, or when output has been written during this
 inflate call, but the end of the deflate stream has not been reached yet.
 It is also called to create a window for dictionary data when a dictionary
 is loaded.

 Providing output buffers larger than 32K to inflate() should provide a speed
 advantage, since only the last 32K of output is copied to the sliding window
 upon return from inflate(), and since all distances after the first 32K of
 output will fall in the output data, making match copies simpler and faster.
 The advantage may be dependent on the size of the processor's data caches.
 */
  function updatewindow(strm, src, end, copy) {
    var dist;
    var state = strm.state;

    /* if it hasn't been done already, allocate space for the window */
    if (state.window === null) {
      state.wsize = 1 << state.wbits;
      state.wnext = 0;
      state.whave = 0;

      state.window = new Buf8(state.wsize);
    }

    /* copy state->wsize or less output bytes into the circular window */
    if (copy >= state.wsize) {
      arraySet(state.window, src, end - state.wsize, state.wsize, 0);
      state.wnext = 0;
      state.whave = state.wsize;
    } else {
      dist = state.wsize - state.wnext;
      if (dist > copy) {
        dist = copy;
      }
      //zmemcpy(state->window + state->wnext, end - copy, dist);
      arraySet(state.window, src, end - copy, dist, state.wnext);
      copy -= dist;
      if (copy) {
        //zmemcpy(state->window, end - copy, copy);
        arraySet(state.window, src, end - copy, copy, 0);
        state.wnext = copy;
        state.whave = state.wsize;
      } else {
        state.wnext += dist;
        if (state.wnext === state.wsize) {
          state.wnext = 0;
        }
        if (state.whave < state.wsize) {
          state.whave += dist;
        }
      }
    }
    return 0;
  }

  function inflate$1(strm, flush) {
    var state;
    var input, output; // input/output buffers
    var next; /* next input INDEX */
    var put; /* next output INDEX */
    var have, left; /* available input and output */
    var hold; /* bit buffer */
    var bits; /* bits in bit buffer */
    var _in, _out; /* save starting available input and output */
    var copy; /* number of stored or match bytes to copy */
    var from; /* where to copy match bytes from */
    var from_source;
    var here = 0; /* current decoding table entry */
    var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
    //var last;                   /* parent table entry */
    var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
    var len; /* length to copy for repeats, bits to drop */
    var ret; /* return code */
    var hbuf = new Buf8(4); /* buffer for gzip header crc calculation */
    var opts;

    var n; // temporary var for NEED_BITS

    var order = /* permutation of code lengths */ [
      16,
      17,
      18,
      0,
      8,
      7,
      9,
      6,
      10,
      5,
      11,
      4,
      12,
      3,
      13,
      2,
      14,
      1,
      15
    ];

    if (
      !strm ||
      !strm.state ||
      !strm.output ||
      (!strm.input && strm.avail_in !== 0)
    ) {
      return Z_STREAM_ERROR$2;
    }

    state = strm.state;
    if (state.mode === TYPE) {
      state.mode = TYPEDO;
    } /* skip check */

    //--- LOAD() ---
    put = strm.next_out;
    output = strm.output;
    left = strm.avail_out;
    next = strm.next_in;
    input = strm.input;
    have = strm.avail_in;
    hold = state.hold;
    bits = state.bits;
    //---

    _in = have;
    _out = left;
    ret = Z_OK$2;

    // goto emulation
    inf_leave: for (;;) {
      switch (state.mode) {
        case HEAD:
          if (state.wrap === 0) {
            state.mode = TYPEDO;
            break;
          }
          //=== NEEDBITS(16);
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if (state.wrap & 2 && hold === 0x8b1f) {
            /* gzip header */
            state.check = 0 /*crc32(0L, Z_NULL, 0)*/;
            //=== CRC2(state.check, hold);
            hbuf[0] = hold & 0xff;
            hbuf[1] = (hold >>> 8) & 0xff;
            state.check = crc32(state.check, hbuf, 2, 0);
            //===//

            //=== INITBITS();
            hold = 0;
            bits = 0;
            //===//
            state.mode = FLAGS;
            break;
          }
          state.flags = 0; /* expect zlib header */
          if (state.head) {
            state.head.done = false;
          }
          if (
            !(state.wrap & 1) /* check if zlib header allowed */ ||
            (((hold & 0xff) /*BITS(8)*/ << 8) + (hold >> 8)) % 31
          ) {
            strm.msg = 'incorrect header check';
            state.mode = BAD;
            break;
          }
          if ((hold & 0x0f) /*BITS(4)*/ !== Z_DEFLATED$2) {
            strm.msg = 'unknown compression method';
            state.mode = BAD;
            break;
          }
          //--- DROPBITS(4) ---//
          hold >>>= 4;
          bits -= 4;
          //---//
          len = (hold & 0x0f) /*BITS(4)*/ + 8;
          if (state.wbits === 0) {
            state.wbits = len;
          } else if (len > state.wbits) {
            strm.msg = 'invalid window size';
            state.mode = BAD;
            break;
          }
          state.dmax = 1 << len;
          //Tracev((stderr, "inflate:   zlib header ok\n"));
          strm.adler = state.check = 1 /*adler32(0L, Z_NULL, 0)*/;
          state.mode = hold & 0x200 ? DICTID : TYPE;
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          break;
        case FLAGS:
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.flags = hold;
          if ((state.flags & 0xff) !== Z_DEFLATED$2) {
            strm.msg = 'unknown compression method';
            state.mode = BAD;
            break;
          }
          if (state.flags & 0xe000) {
            strm.msg = 'unknown header flags set';
            state.mode = BAD;
            break;
          }
          if (state.head) {
            state.head.text = (hold >> 8) & 1;
          }
          if (state.flags & 0x0200) {
            //=== CRC2(state.check, hold);
            hbuf[0] = hold & 0xff;
            hbuf[1] = (hold >>> 8) & 0xff;
            state.check = crc32(state.check, hbuf, 2, 0);
            //===//
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          state.mode = TIME;
        /* falls through */
        case TIME:
          //=== NEEDBITS(32); */
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if (state.head) {
            state.head.time = hold;
          }
          if (state.flags & 0x0200) {
            //=== CRC4(state.check, hold)
            hbuf[0] = hold & 0xff;
            hbuf[1] = (hold >>> 8) & 0xff;
            hbuf[2] = (hold >>> 16) & 0xff;
            hbuf[3] = (hold >>> 24) & 0xff;
            state.check = crc32(state.check, hbuf, 4, 0);
            //===
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          state.mode = OS;
        /* falls through */
        case OS:
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if (state.head) {
            state.head.xflags = hold & 0xff;
            state.head.os = hold >> 8;
          }
          if (state.flags & 0x0200) {
            //=== CRC2(state.check, hold);
            hbuf[0] = hold & 0xff;
            hbuf[1] = (hold >>> 8) & 0xff;
            state.check = crc32(state.check, hbuf, 2, 0);
            //===//
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          state.mode = EXLEN;
        /* falls through */
        case EXLEN:
          if (state.flags & 0x0400) {
            //=== NEEDBITS(16); */
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            state.length = hold;
            if (state.head) {
              state.head.extra_len = hold;
            }
            if (state.flags & 0x0200) {
              //=== CRC2(state.check, hold);
              hbuf[0] = hold & 0xff;
              hbuf[1] = (hold >>> 8) & 0xff;
              state.check = crc32(state.check, hbuf, 2, 0);
              //===//
            }
            //=== INITBITS();
            hold = 0;
            bits = 0;
            //===//
          } else if (state.head) {
            state.head.extra = null /*Z_NULL*/;
          }
          state.mode = EXTRA;
        /* falls through */
        case EXTRA:
          if (state.flags & 0x0400) {
            copy = state.length;
            if (copy > have) {
              copy = have;
            }
            if (copy) {
              if (state.head) {
                len = state.head.extra_len - state.length;
                if (!state.head.extra) {
                  // Use untyped array for more conveniend processing later
                  state.head.extra = new Array(state.head.extra_len);
                }
                arraySet(
                  state.head.extra,
                  input,
                  next,
                  // extra field is limited to 65536 bytes
                  // - no need for additional size check
                  copy,
                  /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                  len
                );
                //zmemcpy(state.head.extra + len, next,
                //        len + copy > state.head.extra_max ?
                //        state.head.extra_max - len : copy);
              }
              if (state.flags & 0x0200) {
                state.check = crc32(state.check, input, copy, next);
              }
              have -= copy;
              next += copy;
              state.length -= copy;
            }
            if (state.length) {
              break inf_leave;
            }
          }
          state.length = 0;
          state.mode = NAME;
        /* falls through */
        case NAME:
          if (state.flags & 0x0800) {
            if (have === 0) {
              break inf_leave;
            }
            copy = 0;
            do {
              // TODO: 2 or 1 bytes?
              len = input[next + copy++];
              /* use constant limit because in js we should not preallocate memory */
              if (
                state.head &&
                len &&
                state.length < 65536 /*state.head.name_max*/
              ) {
                state.head.name += String.fromCharCode(len);
              }
            } while (len && copy < have);

            if (state.flags & 0x0200) {
              state.check = crc32(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            if (len) {
              break inf_leave;
            }
          } else if (state.head) {
            state.head.name = null;
          }
          state.length = 0;
          state.mode = COMMENT;
        /* falls through */
        case COMMENT:
          if (state.flags & 0x1000) {
            if (have === 0) {
              break inf_leave;
            }
            copy = 0;
            do {
              len = input[next + copy++];
              /* use constant limit because in js we should not preallocate memory */
              if (
                state.head &&
                len &&
                state.length < 65536 /*state.head.comm_max*/
              ) {
                state.head.comment += String.fromCharCode(len);
              }
            } while (len && copy < have);
            if (state.flags & 0x0200) {
              state.check = crc32(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            if (len) {
              break inf_leave;
            }
          } else if (state.head) {
            state.head.comment = null;
          }
          state.mode = HCRC;
        /* falls through */
        case HCRC:
          if (state.flags & 0x0200) {
            //=== NEEDBITS(16); */
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            if (hold !== (state.check & 0xffff)) {
              strm.msg = 'header crc mismatch';
              state.mode = BAD;
              break;
            }
            //=== INITBITS();
            hold = 0;
            bits = 0;
            //===//
          }
          if (state.head) {
            state.head.hcrc = (state.flags >> 9) & 1;
            state.head.done = true;
          }
          strm.adler = state.check = 0;
          state.mode = TYPE;
          break;
        case DICTID:
          //=== NEEDBITS(32); */
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          strm.adler = state.check = zswap32(hold);
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          state.mode = DICT;
        /* falls through */
        case DICT:
          if (state.havedict === 0) {
            //--- RESTORE() ---
            strm.next_out = put;
            strm.avail_out = left;
            strm.next_in = next;
            strm.avail_in = have;
            state.hold = hold;
            state.bits = bits;
            //---
            return Z_NEED_DICT$1;
          }
          strm.adler = state.check = 1 /*adler32(0L, Z_NULL, 0)*/;
          state.mode = TYPE;
        /* falls through */
        case TYPE:
          if (flush === Z_BLOCK$2 || flush === Z_TREES$1) {
            break inf_leave;
          }
        /* falls through */
        case TYPEDO:
          if (state.last) {
            //--- BYTEBITS() ---//
            hold >>>= bits & 7;
            bits -= bits & 7;
            //---//
            state.mode = CHECK;
            break;
          }
          //=== NEEDBITS(3); */
          while (bits < 3) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.last = hold & 0x01 /*BITS(1)*/;
          //--- DROPBITS(1) ---//
          hold >>>= 1;
          bits -= 1;
          //---//

          switch (hold & 0x03 /*BITS(2)*/) {
            case 0:
              /* stored block */
              //Tracev((stderr, "inflate:     stored block%s\n",
              //        state.last ? " (last)" : ""));
              state.mode = STORED;
              break;
            case 1:
              /* fixed block */
              fixedtables(state);
              //Tracev((stderr, "inflate:     fixed codes block%s\n",
              //        state.last ? " (last)" : ""));
              state.mode = LEN_; /* decode codes */
              if (flush === Z_TREES$1) {
                //--- DROPBITS(2) ---//
                hold >>>= 2;
                bits -= 2;
                //---//
                break inf_leave;
              }
              break;
            case 2:
              /* dynamic block */
              //Tracev((stderr, "inflate:     dynamic codes block%s\n",
              //        state.last ? " (last)" : ""));
              state.mode = TABLE;
              break;
            case 3:
              strm.msg = 'invalid block type';
              state.mode = BAD;
          }
          //--- DROPBITS(2) ---//
          hold >>>= 2;
          bits -= 2;
          //---//
          break;
        case STORED:
          //--- BYTEBITS() ---// /* go to byte boundary */
          hold >>>= bits & 7;
          bits -= bits & 7;
          //---//
          //=== NEEDBITS(32); */
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
            strm.msg = 'invalid stored block lengths';
            state.mode = BAD;
            break;
          }
          state.length = hold & 0xffff;
          //Tracev((stderr, "inflate:       stored length %u\n",
          //        state.length));
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          state.mode = COPY_;
          if (flush === Z_TREES$1) {
            break inf_leave;
          }
        /* falls through */
        case COPY_:
          state.mode = COPY;
        /* falls through */
        case COPY:
          copy = state.length;
          if (copy) {
            if (copy > have) {
              copy = have;
            }
            if (copy > left) {
              copy = left;
            }
            if (copy === 0) {
              break inf_leave;
            }
            //--- zmemcpy(put, next, copy); ---
            arraySet(output, input, next, copy, put);
            //---//
            have -= copy;
            next += copy;
            left -= copy;
            put += copy;
            state.length -= copy;
            break;
          }
          //Tracev((stderr, "inflate:       stored end\n"));
          state.mode = TYPE;
          break;
        case TABLE:
          //=== NEEDBITS(14); */
          while (bits < 14) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.nlen = (hold & 0x1f) /*BITS(5)*/ + 257;
          //--- DROPBITS(5) ---//
          hold >>>= 5;
          bits -= 5;
          //---//
          state.ndist = (hold & 0x1f) /*BITS(5)*/ + 1;
          //--- DROPBITS(5) ---//
          hold >>>= 5;
          bits -= 5;
          //---//
          state.ncode = (hold & 0x0f) /*BITS(4)*/ + 4;
          //--- DROPBITS(4) ---//
          hold >>>= 4;
          bits -= 4;
          //---//
          //#ifndef PKZIP_BUG_WORKAROUND
          if (state.nlen > 286 || state.ndist > 30) {
            strm.msg = 'too many length or distance symbols';
            state.mode = BAD;
            break;
          }
          //#endif
          //Tracev((stderr, "inflate:       table sizes ok\n"));
          state.have = 0;
          state.mode = LENLENS;
        /* falls through */
        case LENLENS:
          while (state.have < state.ncode) {
            //=== NEEDBITS(3);
            while (bits < 3) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            state.lens[order[state.have++]] = hold & 0x07; //BITS(3);
            //--- DROPBITS(3) ---//
            hold >>>= 3;
            bits -= 3;
            //---//
          }
          while (state.have < 19) {
            state.lens[order[state.have++]] = 0;
          }
          // We have separate tables & no pointers. 2 commented lines below not needed.
          //state.next = state.codes;
          //state.lencode = state.next;
          // Switch to use dynamic table
          state.lencode = state.lendyn;
          state.lenbits = 7;

          opts = {
            bits: state.lenbits
          };
          ret = inflate_table(
            CODES,
            state.lens,
            0,
            19,
            state.lencode,
            0,
            state.work,
            opts
          );
          state.lenbits = opts.bits;

          if (ret) {
            strm.msg = 'invalid code lengths set';
            state.mode = BAD;
            break;
          }
          //Tracev((stderr, "inflate:       code lengths ok\n"));
          state.have = 0;
          state.mode = CODELENS;
        /* falls through */
        case CODELENS:
          while (state.have < state.nlen + state.ndist) {
            for (;;) {
              here =
                state.lencode[
                  hold & ((1 << state.lenbits) - 1)
                ]; /*BITS(state.lenbits)*/
              here_bits = here >>> 24;
              here_op = (here >>> 16) & 0xff;
              here_val = here & 0xffff;

              if (here_bits <= bits) {
                break;
              }
              //--- PULLBYTE() ---//
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
              //---//
            }
            if (here_val < 16) {
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              state.lens[state.have++] = here_val;
            } else {
              if (here_val === 16) {
                //=== NEEDBITS(here.bits + 2);
                n = here_bits + 2;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                //===//
                //--- DROPBITS(here.bits) ---//
                hold >>>= here_bits;
                bits -= here_bits;
                //---//
                if (state.have === 0) {
                  strm.msg = 'invalid bit length repeat';
                  state.mode = BAD;
                  break;
                }
                len = state.lens[state.have - 1];
                copy = 3 + (hold & 0x03); //BITS(2);
                //--- DROPBITS(2) ---//
                hold >>>= 2;
                bits -= 2;
                //---//
              } else if (here_val === 17) {
                //=== NEEDBITS(here.bits + 3);
                n = here_bits + 3;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                //===//
                //--- DROPBITS(here.bits) ---//
                hold >>>= here_bits;
                bits -= here_bits;
                //---//
                len = 0;
                copy = 3 + (hold & 0x07); //BITS(3);
                //--- DROPBITS(3) ---//
                hold >>>= 3;
                bits -= 3;
                //---//
              } else {
                //=== NEEDBITS(here.bits + 7);
                n = here_bits + 7;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                //===//
                //--- DROPBITS(here.bits) ---//
                hold >>>= here_bits;
                bits -= here_bits;
                //---//
                len = 0;
                copy = 11 + (hold & 0x7f); //BITS(7);
                //--- DROPBITS(7) ---//
                hold >>>= 7;
                bits -= 7;
                //---//
              }
              if (state.have + copy > state.nlen + state.ndist) {
                strm.msg = 'invalid bit length repeat';
                state.mode = BAD;
                break;
              }
              while (copy--) {
                state.lens[state.have++] = len;
              }
            }
          }

          /* handle error breaks in while */
          if (state.mode === BAD) {
            break;
          }

          /* check for end-of-block code (better have one) */
          if (state.lens[256] === 0) {
            strm.msg = 'invalid code -- missing end-of-block';
            state.mode = BAD;
            break;
          }

          /* build code tables -- note: do not change the lenbits or distbits
           values here (9 and 6) without reading the comments in inftrees.h
           concerning the ENOUGH constants, which depend on those values */
          state.lenbits = 9;

          opts = {
            bits: state.lenbits
          };
          ret = inflate_table(
            LENS,
            state.lens,
            0,
            state.nlen,
            state.lencode,
            0,
            state.work,
            opts
          );
          // We have separate tables & no pointers. 2 commented lines below not needed.
          // state.next_index = opts.table_index;
          state.lenbits = opts.bits;
          // state.lencode = state.next;

          if (ret) {
            strm.msg = 'invalid literal/lengths set';
            state.mode = BAD;
            break;
          }

          state.distbits = 6;
          //state.distcode.copy(state.codes);
          // Switch to use dynamic table
          state.distcode = state.distdyn;
          opts = {
            bits: state.distbits
          };
          ret = inflate_table(
            DISTS,
            state.lens,
            state.nlen,
            state.ndist,
            state.distcode,
            0,
            state.work,
            opts
          );
          // We have separate tables & no pointers. 2 commented lines below not needed.
          // state.next_index = opts.table_index;
          state.distbits = opts.bits;
          // state.distcode = state.next;

          if (ret) {
            strm.msg = 'invalid distances set';
            state.mode = BAD;
            break;
          }
          //Tracev((stderr, 'inflate:       codes ok\n'));
          state.mode = LEN_;
          if (flush === Z_TREES$1) {
            break inf_leave;
          }
        /* falls through */
        case LEN_:
          state.mode = LEN;
        /* falls through */
        case LEN:
          if (have >= 6 && left >= 258) {
            //--- RESTORE() ---
            strm.next_out = put;
            strm.avail_out = left;
            strm.next_in = next;
            strm.avail_in = have;
            state.hold = hold;
            state.bits = bits;
            //---
            inflate_fast(strm, _out);
            //--- LOAD() ---
            put = strm.next_out;
            output = strm.output;
            left = strm.avail_out;
            next = strm.next_in;
            input = strm.input;
            have = strm.avail_in;
            hold = state.hold;
            bits = state.bits;
            //---

            if (state.mode === TYPE) {
              state.back = -1;
            }
            break;
          }
          state.back = 0;
          for (;;) {
            here =
              state.lencode[
                hold & ((1 << state.lenbits) - 1)
              ]; /*BITS(state.lenbits)*/
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if (here_bits <= bits) {
              break;
            }
            //--- PULLBYTE() ---//
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          if (here_op && (here_op & 0xf0) === 0) {
            last_bits = here_bits;
            last_op = here_op;
            last_val = here_val;
            for (;;) {
              here =
                state.lencode[
                  last_val +
                    ((hold &
                      ((1 << (last_bits + last_op)) -
                        1)) /*BITS(last.bits + last.op)*/ >>
                      last_bits)
                ];
              here_bits = here >>> 24;
              here_op = (here >>> 16) & 0xff;
              here_val = here & 0xffff;

              if (last_bits + here_bits <= bits) {
                break;
              }
              //--- PULLBYTE() ---//
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
              //---//
            }
            //--- DROPBITS(last.bits) ---//
            hold >>>= last_bits;
            bits -= last_bits;
            //---//
            state.back += last_bits;
          }
          //--- DROPBITS(here.bits) ---//
          hold >>>= here_bits;
          bits -= here_bits;
          //---//
          state.back += here_bits;
          state.length = here_val;
          if (here_op === 0) {
            //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
            //        "inflate:         literal '%c'\n" :
            //        "inflate:         literal 0x%02x\n", here.val));
            state.mode = LIT;
            break;
          }
          if (here_op & 32) {
            //Tracevv((stderr, "inflate:         end of block\n"));
            state.back = -1;
            state.mode = TYPE;
            break;
          }
          if (here_op & 64) {
            strm.msg = 'invalid literal/length code';
            state.mode = BAD;
            break;
          }
          state.extra = here_op & 15;
          state.mode = LENEXT;
        /* falls through */
        case LENEXT:
          if (state.extra) {
            //=== NEEDBITS(state.extra);
            n = state.extra;
            while (bits < n) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            state.length +=
              hold & ((1 << state.extra) - 1) /*BITS(state.extra)*/;
            //--- DROPBITS(state.extra) ---//
            hold >>>= state.extra;
            bits -= state.extra;
            //---//
            state.back += state.extra;
          }
          //Tracevv((stderr, "inflate:         length %u\n", state.length));
          state.was = state.length;
          state.mode = DIST;
        /* falls through */
        case DIST:
          for (;;) {
            here =
              state.distcode[
                hold & ((1 << state.distbits) - 1)
              ]; /*BITS(state.distbits)*/
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if (here_bits <= bits) {
              break;
            }
            //--- PULLBYTE() ---//
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          if ((here_op & 0xf0) === 0) {
            last_bits = here_bits;
            last_op = here_op;
            last_val = here_val;
            for (;;) {
              here =
                state.distcode[
                  last_val +
                    ((hold &
                      ((1 << (last_bits + last_op)) -
                        1)) /*BITS(last.bits + last.op)*/ >>
                      last_bits)
                ];
              here_bits = here >>> 24;
              here_op = (here >>> 16) & 0xff;
              here_val = here & 0xffff;

              if (last_bits + here_bits <= bits) {
                break;
              }
              //--- PULLBYTE() ---//
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
              //---//
            }
            //--- DROPBITS(last.bits) ---//
            hold >>>= last_bits;
            bits -= last_bits;
            //---//
            state.back += last_bits;
          }
          //--- DROPBITS(here.bits) ---//
          hold >>>= here_bits;
          bits -= here_bits;
          //---//
          state.back += here_bits;
          if (here_op & 64) {
            strm.msg = 'invalid distance code';
            state.mode = BAD;
            break;
          }
          state.offset = here_val;
          state.extra = here_op & 15;
          state.mode = DISTEXT;
        /* falls through */
        case DISTEXT:
          if (state.extra) {
            //=== NEEDBITS(state.extra);
            n = state.extra;
            while (bits < n) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            state.offset +=
              hold & ((1 << state.extra) - 1) /*BITS(state.extra)*/;
            //--- DROPBITS(state.extra) ---//
            hold >>>= state.extra;
            bits -= state.extra;
            //---//
            state.back += state.extra;
          }
          //#ifdef INFLATE_STRICT
          if (state.offset > state.dmax) {
            strm.msg = 'invalid distance too far back';
            state.mode = BAD;
            break;
          }
          //#endif
          //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
          state.mode = MATCH;
        /* falls through */
        case MATCH:
          if (left === 0) {
            break inf_leave;
          }
          copy = _out - left;
          if (state.offset > copy) {
            /* copy from window */
            copy = state.offset - copy;
            if (copy > state.whave) {
              if (state.sane) {
                strm.msg = 'invalid distance too far back';
                state.mode = BAD;
                break;
              }
              // (!) This block is disabled in zlib defailts,
              // don't enable it for binary compatibility
              //#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
              //          Trace((stderr, "inflate.c too far\n"));
              //          copy -= state.whave;
              //          if (copy > state.length) { copy = state.length; }
              //          if (copy > left) { copy = left; }
              //          left -= copy;
              //          state.length -= copy;
              //          do {
              //            output[put++] = 0;
              //          } while (--copy);
              //          if (state.length === 0) { state.mode = LEN; }
              //          break;
              //#endif
            }
            if (copy > state.wnext) {
              copy -= state.wnext;
              from = state.wsize - copy;
            } else {
              from = state.wnext - copy;
            }
            if (copy > state.length) {
              copy = state.length;
            }
            from_source = state.window;
          } else {
            /* copy from output */
            from_source = output;
            from = put - state.offset;
            copy = state.length;
          }
          if (copy > left) {
            copy = left;
          }
          left -= copy;
          state.length -= copy;
          do {
            output[put++] = from_source[from++];
          } while (--copy);
          if (state.length === 0) {
            state.mode = LEN;
          }
          break;
        case LIT:
          if (left === 0) {
            break inf_leave;
          }
          output[put++] = state.length;
          left--;
          state.mode = LEN;
          break;
        case CHECK:
          if (state.wrap) {
            //=== NEEDBITS(32);
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              // Use '|' insdead of '+' to make sure that result is signed
              hold |= input[next++] << bits;
              bits += 8;
            }
            //===//
            _out -= left;
            strm.total_out += _out;
            state.total += _out;
            if (_out) {
              strm.adler = state.check =
                /*UPDATE(state.check, put - _out, _out);*/
                state.flags
                  ? crc32(state.check, output, _out, put - _out)
                  : adler32(state.check, output, _out, put - _out);
            }
            _out = left;
            // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too
            if ((state.flags ? hold : zswap32(hold)) !== state.check) {
              strm.msg = 'incorrect data check';
              state.mode = BAD;
              break;
            }
            //=== INITBITS();
            hold = 0;
            bits = 0;
            //===//
            //Tracev((stderr, "inflate:   check matches trailer\n"));
          }
          state.mode = LENGTH;
        /* falls through */
        case LENGTH:
          if (state.wrap && state.flags) {
            //=== NEEDBITS(32);
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            if (hold !== (state.total & 0xffffffff)) {
              strm.msg = 'incorrect length check';
              state.mode = BAD;
              break;
            }
            //=== INITBITS();
            hold = 0;
            bits = 0;
            //===//
            //Tracev((stderr, "inflate:   length matches trailer\n"));
          }
          state.mode = DONE;
        /* falls through */
        case DONE:
          ret = Z_STREAM_END$2;
          break inf_leave;
        case BAD:
          ret = Z_DATA_ERROR$2;
          break inf_leave;
        case MEM:
          return Z_MEM_ERROR;
        case SYNC:
        /* falls through */
        default:
          return Z_STREAM_ERROR$2;
      }
    }

    // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

    /*
     Return from inflate(), updating the total counts and the check value.
     If there was no progress during the inflate() call, return a buffer
     error.  Call updatewindow() to create and/or update the window state.
     Note: a memory error from inflate() is non-recoverable.
   */

    //--- RESTORE() ---
    strm.next_out = put;
    strm.avail_out = left;
    strm.next_in = next;
    strm.avail_in = have;
    state.hold = hold;
    state.bits = bits;
    //---

    if (
      state.wsize ||
      (_out !== strm.avail_out &&
        state.mode < BAD &&
        (state.mode < CHECK || flush !== Z_FINISH$2))
    ) {
      if (
        updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)
      ) {
        state.mode = MEM;
        return Z_MEM_ERROR;
      }
    }
    _in -= strm.avail_in;
    _out -= strm.avail_out;
    strm.total_in += _in;
    strm.total_out += _out;
    state.total += _out;
    if (state.wrap && _out) {
      strm.adler = state.check /*UPDATE(state.check, strm.next_out - _out, _out);*/ = state.flags
        ? crc32(state.check, output, _out, strm.next_out - _out)
        : adler32(state.check, output, _out, strm.next_out - _out);
    }
    strm.data_type =
      state.bits +
      (state.last ? 64 : 0) +
      (state.mode === TYPE ? 128 : 0) +
      (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
    if (((_in === 0 && _out === 0) || flush === Z_FINISH$2) && ret === Z_OK$2) {
      ret = Z_BUF_ERROR$2;
    }
    return ret;
  }

  function inflateEnd(strm) {
    if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {
      return Z_STREAM_ERROR$2;
    }

    var state = strm.state;
    if (state.window) {
      state.window = null;
    }
    strm.state = null;
    return Z_OK$2;
  }

  /* Not implemented
exports.inflateCopy = inflateCopy;
exports.inflateGetDictionary = inflateGetDictionary;
exports.inflateMark = inflateMark;
exports.inflatePrime = inflatePrime;
exports.inflateSync = inflateSync;
exports.inflateSyncPoint = inflateSyncPoint;
exports.inflateUndermine = inflateUndermine;
*/

  // import constants from './constants';

  // zlib modes
  var NONE = 0;
  var DEFLATE = 1;
  var INFLATE = 2;
  var GZIP = 3;
  var GUNZIP = 4;
  var DEFLATERAW = 5;
  var INFLATERAW = 6;
  var UNZIP = 7;
  var Z_NO_FLUSH = 0;
  var Z_PARTIAL_FLUSH = 1;
  var Z_SYNC_FLUSH = 2;
  var Z_FULL_FLUSH = 3;
  var Z_FINISH = 4;
  var Z_BLOCK = 5;
  var Z_TREES = 6;
  var Z_OK = 0;
  var Z_STREAM_END = 1;
  var Z_NEED_DICT = 2;
  var Z_ERRNO = -1;
  var Z_STREAM_ERROR = -2;
  var Z_DATA_ERROR = -3;
  var Z_BUF_ERROR = -5;
  var Z_NO_COMPRESSION = 0;
  var Z_BEST_SPEED = 1;
  var Z_BEST_COMPRESSION = 9;
  var Z_DEFAULT_COMPRESSION = -1;
  var Z_FILTERED = 1;
  var Z_HUFFMAN_ONLY = 2;
  var Z_RLE = 3;
  var Z_FIXED = 4;
  var Z_DEFAULT_STRATEGY = 0;
  var Z_BINARY = 0;
  var Z_TEXT = 1;
  var Z_UNKNOWN = 2;
  var Z_DEFLATED = 8;
  function Zlib$1(mode) {
    if (mode < DEFLATE || mode > UNZIP) throw new TypeError('Bad argument');

    this.mode = mode;
    this.init_done = false;
    this.write_in_progress = false;
    this.pending_close = false;
    this.windowBits = 0;
    this.level = 0;
    this.memLevel = 0;
    this.strategy = 0;
    this.dictionary = null;
  }

  Zlib$1.prototype.init = function(
    windowBits,
    level,
    memLevel,
    strategy,
    dictionary
  ) {
    this.windowBits = windowBits;
    this.level = level;
    this.memLevel = memLevel;
    this.strategy = strategy;
    // dictionary not supported.

    if (this.mode === GZIP || this.mode === GUNZIP) this.windowBits += 16;

    if (this.mode === UNZIP) this.windowBits += 32;

    if (this.mode === DEFLATERAW || this.mode === INFLATERAW)
      this.windowBits = -this.windowBits;

    this.strm = new ZStream();
    var status;
    switch (this.mode) {
      case DEFLATE:
      case GZIP:
      case DEFLATERAW:
        status = deflateInit2(
          this.strm,
          this.level,
          Z_DEFLATED,
          this.windowBits,
          this.memLevel,
          this.strategy
        );
        break;
      case INFLATE:
      case GUNZIP:
      case INFLATERAW:
      case UNZIP:
        status = inflateInit2(this.strm, this.windowBits);
        break;
      default:
        throw new Error('Unknown mode ' + this.mode);
    }

    if (status !== Z_OK) {
      this._error(status);
      return;
    }

    this.write_in_progress = false;
    this.init_done = true;
  };

  Zlib$1.prototype.params = function() {
    throw new Error('deflateParams Not supported');
  };

  Zlib$1.prototype._writeCheck = function() {
    if (!this.init_done) throw new Error('write before init');

    if (this.mode === NONE) throw new Error('already finalized');

    if (this.write_in_progress) throw new Error('write already in progress');

    if (this.pending_close) throw new Error('close is pending');
  };

  Zlib$1.prototype.write = function(
    flush,
    input,
    in_off,
    in_len,
    out,
    out_off,
    out_len
  ) {
    this._writeCheck();
    this.write_in_progress = true;

    var self = this;
    nextTick(function() {
      self.write_in_progress = false;
      var res = self._write(
        flush,
        input,
        in_off,
        in_len,
        out,
        out_off,
        out_len
      );
      self.callback(res[0], res[1]);

      if (self.pending_close) self.close();
    });

    return this;
  };

  // set method for Node buffers, used by pako
  function bufferSet(data, offset) {
    for (var i = 0; i < data.length; i++) {
      this[offset + i] = data[i];
    }
  }

  Zlib$1.prototype.writeSync = function(
    flush,
    input,
    in_off,
    in_len,
    out,
    out_off,
    out_len
  ) {
    this._writeCheck();
    return this._write(flush, input, in_off, in_len, out, out_off, out_len);
  };

  Zlib$1.prototype._write = function(
    flush,
    input,
    in_off,
    in_len,
    out,
    out_off,
    out_len
  ) {
    this.write_in_progress = true;

    if (
      flush !== Z_NO_FLUSH &&
      flush !== Z_PARTIAL_FLUSH &&
      flush !== Z_SYNC_FLUSH &&
      flush !== Z_FULL_FLUSH &&
      flush !== Z_FINISH &&
      flush !== Z_BLOCK
    ) {
      throw new Error('Invalid flush value');
    }

    if (input == null) {
      input = new Buffer(0);
      in_len = 0;
      in_off = 0;
    }

    if (out._set) out.set = out._set;
    else out.set = bufferSet;

    var strm = this.strm;
    strm.avail_in = in_len;
    strm.input = input;
    strm.next_in = in_off;
    strm.avail_out = out_len;
    strm.output = out;
    strm.next_out = out_off;
    var status;
    switch (this.mode) {
      case DEFLATE:
      case GZIP:
      case DEFLATERAW:
        status = deflate$1(strm, flush);
        break;
      case UNZIP:
      case INFLATE:
      case GUNZIP:
      case INFLATERAW:
        status = inflate$1(strm, flush);
        break;
      default:
        throw new Error('Unknown mode ' + this.mode);
    }

    if (status !== Z_STREAM_END && status !== Z_OK) {
      this._error(status);
    }

    this.write_in_progress = false;
    return [strm.avail_in, strm.avail_out];
  };

  Zlib$1.prototype.close = function() {
    if (this.write_in_progress) {
      this.pending_close = true;
      return;
    }

    this.pending_close = false;

    if (
      this.mode === DEFLATE ||
      this.mode === GZIP ||
      this.mode === DEFLATERAW
    ) {
      deflateEnd(this.strm);
    } else {
      inflateEnd(this.strm);
    }

    this.mode = NONE;
  };
  var status;
  Zlib$1.prototype.reset = function() {
    switch (this.mode) {
      case DEFLATE:
      case DEFLATERAW:
        status = deflateReset(this.strm);
        break;
      case INFLATE:
      case INFLATERAW:
        status = inflateReset(this.strm);
        break;
    }

    if (status !== Z_OK) {
      this._error(status);
    }
  };

  Zlib$1.prototype._error = function(status) {
    this.onerror(msg[status] + ': ' + this.strm.msg, status);

    this.write_in_progress = false;
    if (this.pending_close) this.close();
  };

  var _binding = Object.freeze({
    NONE: NONE,
    DEFLATE: DEFLATE,
    INFLATE: INFLATE,
    GZIP: GZIP,
    GUNZIP: GUNZIP,
    DEFLATERAW: DEFLATERAW,
    INFLATERAW: INFLATERAW,
    UNZIP: UNZIP,
    Z_NO_FLUSH: Z_NO_FLUSH,
    Z_PARTIAL_FLUSH: Z_PARTIAL_FLUSH,
    Z_SYNC_FLUSH: Z_SYNC_FLUSH,
    Z_FULL_FLUSH: Z_FULL_FLUSH,
    Z_FINISH: Z_FINISH,
    Z_BLOCK: Z_BLOCK,
    Z_TREES: Z_TREES,
    Z_OK: Z_OK,
    Z_STREAM_END: Z_STREAM_END,
    Z_NEED_DICT: Z_NEED_DICT,
    Z_ERRNO: Z_ERRNO,
    Z_STREAM_ERROR: Z_STREAM_ERROR,
    Z_DATA_ERROR: Z_DATA_ERROR,
    Z_BUF_ERROR: Z_BUF_ERROR,
    Z_NO_COMPRESSION: Z_NO_COMPRESSION,
    Z_BEST_SPEED: Z_BEST_SPEED,
    Z_BEST_COMPRESSION: Z_BEST_COMPRESSION,
    Z_DEFAULT_COMPRESSION: Z_DEFAULT_COMPRESSION,
    Z_FILTERED: Z_FILTERED,
    Z_HUFFMAN_ONLY: Z_HUFFMAN_ONLY,
    Z_RLE: Z_RLE,
    Z_FIXED: Z_FIXED,
    Z_DEFAULT_STRATEGY: Z_DEFAULT_STRATEGY,
    Z_BINARY: Z_BINARY,
    Z_TEXT: Z_TEXT,
    Z_UNKNOWN: Z_UNKNOWN,
    Z_DEFLATED: Z_DEFLATED,
    Zlib: Zlib$1
  });

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

  function assert$4(a, msg) {
    if (!a) {
      throw new Error(msg);
    }
  }
  var binding$1 = {};
  Object.keys(_binding).forEach(function(key) {
    binding$1[key] = _binding[key];
  });
  // zlib doesn't provide these, so kludge them in following the same
  // const naming scheme zlib uses.
  binding$1.Z_MIN_WINDOWBITS = 8;
  binding$1.Z_MAX_WINDOWBITS = 15;
  binding$1.Z_DEFAULT_WINDOWBITS = 15;

  // fewer than 64 bytes per chunk is stupid.
  // technically it could work with as few as 8, but even 64 bytes
  // is absurdly low.  Usually a MB or more is best.
  binding$1.Z_MIN_CHUNK = 64;
  binding$1.Z_MAX_CHUNK = Infinity;
  binding$1.Z_DEFAULT_CHUNK = 16 * 1024;

  binding$1.Z_MIN_MEMLEVEL = 1;
  binding$1.Z_MAX_MEMLEVEL = 9;
  binding$1.Z_DEFAULT_MEMLEVEL = 8;

  binding$1.Z_MIN_LEVEL = -1;
  binding$1.Z_MAX_LEVEL = 9;
  binding$1.Z_DEFAULT_LEVEL = binding$1.Z_DEFAULT_COMPRESSION;

  // translation table for return codes.
  var codes = {
    Z_OK: binding$1.Z_OK,
    Z_STREAM_END: binding$1.Z_STREAM_END,
    Z_NEED_DICT: binding$1.Z_NEED_DICT,
    Z_ERRNO: binding$1.Z_ERRNO,
    Z_STREAM_ERROR: binding$1.Z_STREAM_ERROR,
    Z_DATA_ERROR: binding$1.Z_DATA_ERROR,
    Z_MEM_ERROR: binding$1.Z_MEM_ERROR,
    Z_BUF_ERROR: binding$1.Z_BUF_ERROR,
    Z_VERSION_ERROR: binding$1.Z_VERSION_ERROR
  };

  Object.keys(codes).forEach(function(k) {
    codes[codes[k]] = k;
  });

  function createDeflate(o) {
    return new Deflate(o);
  }

  function createInflate(o) {
    return new Inflate(o);
  }

  function createDeflateRaw(o) {
    return new DeflateRaw(o);
  }

  function createInflateRaw(o) {
    return new InflateRaw(o);
  }

  function createGzip(o) {
    return new Gzip(o);
  }

  function createGunzip(o) {
    return new Gunzip(o);
  }

  function createUnzip(o) {
    return new Unzip(o);
  }

  // Convenience methods.
  // compress/decompress a string or buffer in one step.
  function deflate(buffer, opts, callback) {
    if (typeof opts === 'function') {
      callback = opts;
      opts = {};
    }
    return zlibBuffer(new Deflate(opts), buffer, callback);
  }

  function deflateSync(buffer, opts) {
    return zlibBufferSync(new Deflate(opts), buffer);
  }

  function gzip(buffer, opts, callback) {
    if (typeof opts === 'function') {
      callback = opts;
      opts = {};
    }
    return zlibBuffer(new Gzip(opts), buffer, callback);
  }

  function gzipSync(buffer, opts) {
    return zlibBufferSync(new Gzip(opts), buffer);
  }

  function deflateRaw(buffer, opts, callback) {
    if (typeof opts === 'function') {
      callback = opts;
      opts = {};
    }
    return zlibBuffer(new DeflateRaw(opts), buffer, callback);
  }

  function deflateRawSync(buffer, opts) {
    return zlibBufferSync(new DeflateRaw(opts), buffer);
  }

  function unzip(buffer, opts, callback) {
    if (typeof opts === 'function') {
      callback = opts;
      opts = {};
    }
    return zlibBuffer(new Unzip(opts), buffer, callback);
  }

  function unzipSync(buffer, opts) {
    return zlibBufferSync(new Unzip(opts), buffer);
  }

  function inflate(buffer, opts, callback) {
    if (typeof opts === 'function') {
      callback = opts;
      opts = {};
    }
    return zlibBuffer(new Inflate(opts), buffer, callback);
  }

  function inflateSync(buffer, opts) {
    return zlibBufferSync(new Inflate(opts), buffer);
  }

  function gunzip(buffer, opts, callback) {
    if (typeof opts === 'function') {
      callback = opts;
      opts = {};
    }
    return zlibBuffer(new Gunzip(opts), buffer, callback);
  }

  function gunzipSync(buffer, opts) {
    return zlibBufferSync(new Gunzip(opts), buffer);
  }

  function inflateRaw(buffer, opts, callback) {
    if (typeof opts === 'function') {
      callback = opts;
      opts = {};
    }
    return zlibBuffer(new InflateRaw(opts), buffer, callback);
  }

  function inflateRawSync(buffer, opts) {
    return zlibBufferSync(new InflateRaw(opts), buffer);
  }

  function zlibBuffer(engine, buffer, callback) {
    var buffers = [];
    var nread = 0;

    engine.on('error', onError);
    engine.on('end', onEnd);

    engine.end(buffer);
    flow();

    function flow() {
      var chunk;
      while (null !== (chunk = engine.read())) {
        buffers.push(chunk);
        nread += chunk.length;
      }
      engine.once('readable', flow);
    }

    function onError(err) {
      engine.removeListener('end', onEnd);
      engine.removeListener('readable', flow);
      callback(err);
    }

    function onEnd() {
      var buf = Buffer.concat(buffers, nread);
      buffers = [];
      callback(null, buf);
      engine.close();
    }
  }

  function zlibBufferSync(engine, buffer) {
    if (typeof buffer === 'string') buffer = new Buffer(buffer);
    if (!isBuffer$2(buffer)) throw new TypeError('Not a string or buffer');

    var flushFlag = binding$1.Z_FINISH;

    return engine._processChunk(buffer, flushFlag);
  }

  // generic zlib
  // minimal 2-byte header
  function Deflate(opts) {
    if (!(this instanceof Deflate)) return new Deflate(opts);
    Zlib.call(this, opts, binding$1.DEFLATE);
  }

  function Inflate(opts) {
    if (!(this instanceof Inflate)) return new Inflate(opts);
    Zlib.call(this, opts, binding$1.INFLATE);
  }

  // gzip - bigger header, same deflate compression
  function Gzip(opts) {
    if (!(this instanceof Gzip)) return new Gzip(opts);
    Zlib.call(this, opts, binding$1.GZIP);
  }

  function Gunzip(opts) {
    if (!(this instanceof Gunzip)) return new Gunzip(opts);
    Zlib.call(this, opts, binding$1.GUNZIP);
  }

  // raw - no header
  function DeflateRaw(opts) {
    if (!(this instanceof DeflateRaw)) return new DeflateRaw(opts);
    Zlib.call(this, opts, binding$1.DEFLATERAW);
  }

  function InflateRaw(opts) {
    if (!(this instanceof InflateRaw)) return new InflateRaw(opts);
    Zlib.call(this, opts, binding$1.INFLATERAW);
  }

  // auto-detect header.
  function Unzip(opts) {
    if (!(this instanceof Unzip)) return new Unzip(opts);
    Zlib.call(this, opts, binding$1.UNZIP);
  }

  // the Zlib class they all inherit from
  // This thing manages the queue of requests, and returns
  // true or false if there is anything in the queue when
  // you call the .write() method.

  function Zlib(opts, mode) {
    this._opts = opts = opts || {};
    this._chunkSize = opts.chunkSize || binding$1.Z_DEFAULT_CHUNK;

    Transform$1.call(this, opts);

    if (opts.flush) {
      if (
        opts.flush !== binding$1.Z_NO_FLUSH &&
        opts.flush !== binding$1.Z_PARTIAL_FLUSH &&
        opts.flush !== binding$1.Z_SYNC_FLUSH &&
        opts.flush !== binding$1.Z_FULL_FLUSH &&
        opts.flush !== binding$1.Z_FINISH &&
        opts.flush !== binding$1.Z_BLOCK
      ) {
        throw new Error('Invalid flush flag: ' + opts.flush);
      }
    }
    this._flushFlag = opts.flush || binding$1.Z_NO_FLUSH;

    if (opts.chunkSize) {
      if (
        opts.chunkSize < binding$1.Z_MIN_CHUNK ||
        opts.chunkSize > binding$1.Z_MAX_CHUNK
      ) {
        throw new Error('Invalid chunk size: ' + opts.chunkSize);
      }
    }

    if (opts.windowBits) {
      if (
        opts.windowBits < binding$1.Z_MIN_WINDOWBITS ||
        opts.windowBits > binding$1.Z_MAX_WINDOWBITS
      ) {
        throw new Error('Invalid windowBits: ' + opts.windowBits);
      }
    }

    if (opts.level) {
      if (
        opts.level < binding$1.Z_MIN_LEVEL ||
        opts.level > binding$1.Z_MAX_LEVEL
      ) {
        throw new Error('Invalid compression level: ' + opts.level);
      }
    }

    if (opts.memLevel) {
      if (
        opts.memLevel < binding$1.Z_MIN_MEMLEVEL ||
        opts.memLevel > binding$1.Z_MAX_MEMLEVEL
      ) {
        throw new Error('Invalid memLevel: ' + opts.memLevel);
      }
    }

    if (opts.strategy) {
      if (
        opts.strategy != binding$1.Z_FILTERED &&
        opts.strategy != binding$1.Z_HUFFMAN_ONLY &&
        opts.strategy != binding$1.Z_RLE &&
        opts.strategy != binding$1.Z_FIXED &&
        opts.strategy != binding$1.Z_DEFAULT_STRATEGY
      ) {
        throw new Error('Invalid strategy: ' + opts.strategy);
      }
    }

    if (opts.dictionary) {
      if (!isBuffer$2(opts.dictionary)) {
        throw new Error('Invalid dictionary: it should be a Buffer instance');
      }
    }

    this._binding = new binding$1.Zlib(mode);

    var self = this;
    this._hadError = false;
    this._binding.onerror = function(message, errno) {
      // there is no way to cleanly recover.
      // continuing only obscures problems.
      self._binding = null;
      self._hadError = true;

      var error = new Error(message);
      error.errno = errno;
      error.code = binding$1.codes[errno];
      self.emit('error', error);
    };

    var level = binding$1.Z_DEFAULT_COMPRESSION;
    if (typeof opts.level === 'number') level = opts.level;

    var strategy = binding$1.Z_DEFAULT_STRATEGY;
    if (typeof opts.strategy === 'number') strategy = opts.strategy;

    this._binding.init(
      opts.windowBits || binding$1.Z_DEFAULT_WINDOWBITS,
      level,
      opts.memLevel || binding$1.Z_DEFAULT_MEMLEVEL,
      strategy,
      opts.dictionary
    );

    this._buffer = new Buffer(this._chunkSize);
    this._offset = 0;
    this._closed = false;
    this._level = level;
    this._strategy = strategy;

    this.once('end', this.close);
  }

  inherits$1(Zlib, Transform$1);

  Zlib.prototype.params = function(level, strategy, callback) {
    if (level < binding$1.Z_MIN_LEVEL || level > binding$1.Z_MAX_LEVEL) {
      throw new RangeError('Invalid compression level: ' + level);
    }
    if (
      strategy != binding$1.Z_FILTERED &&
      strategy != binding$1.Z_HUFFMAN_ONLY &&
      strategy != binding$1.Z_RLE &&
      strategy != binding$1.Z_FIXED &&
      strategy != binding$1.Z_DEFAULT_STRATEGY
    ) {
      throw new TypeError('Invalid strategy: ' + strategy);
    }

    if (this._level !== level || this._strategy !== strategy) {
      var self = this;
      this.flush(binding$1.Z_SYNC_FLUSH, function() {
        self._binding.params(level, strategy);
        if (!self._hadError) {
          self._level = level;
          self._strategy = strategy;
          if (callback) callback();
        }
      });
    } else {
      nextTick(callback);
    }
  };

  Zlib.prototype.reset = function() {
    return this._binding.reset();
  };

  // This is the _flush function called by the transform class,
  // internally, when the last chunk has been written.
  Zlib.prototype._flush = function(callback) {
    this._transform(new Buffer(0), '', callback);
  };

  Zlib.prototype.flush = function(kind, callback) {
    var ws = this._writableState;

    if (typeof kind === 'function' || (kind === void 0 && !callback)) {
      callback = kind;
      kind = binding$1.Z_FULL_FLUSH;
    }

    if (ws.ended) {
      if (callback) nextTick(callback);
    } else if (ws.ending) {
      if (callback) this.once('end', callback);
    } else if (ws.needDrain) {
      var self = this;
      this.once('drain', function() {
        self.flush(callback);
      });
    } else {
      this._flushFlag = kind;
      this.write(new Buffer(0), '', callback);
    }
  };

  Zlib.prototype.close = function(callback) {
    if (callback) nextTick(callback);

    if (this._closed) return;

    this._closed = true;

    this._binding.close();

    var self = this;
    nextTick(function() {
      self.emit('close');
    });
  };

  Zlib.prototype._transform = function(chunk, encoding, cb) {
    var flushFlag;
    var ws = this._writableState;
    var ending = ws.ending || ws.ended;
    var last = ending && (!chunk || ws.length === chunk.length);

    if (!chunk === null && !isBuffer$2(chunk))
      return cb(new Error('invalid input'));

    // If it's the last chunk, or a final flush, we use the Z_FINISH flush flag.
    // If it's explicitly flushing at some other time, then we use
    // Z_FULL_FLUSH. Otherwise, use Z_NO_FLUSH for maximum compression
    // goodness.
    if (last) flushFlag = binding$1.Z_FINISH;
    else {
      flushFlag = this._flushFlag;
      // once we've flushed the last of the queue, stop flushing and
      // go back to the normal behavior.
      if (chunk.length >= ws.length) {
        this._flushFlag = this._opts.flush || binding$1.Z_NO_FLUSH;
      }
    }

    this._processChunk(chunk, flushFlag, cb);
  };

  Zlib.prototype._processChunk = function(chunk, flushFlag, cb) {
    var availInBefore = chunk && chunk.length;
    var availOutBefore = this._chunkSize - this._offset;
    var inOff = 0;

    var self = this;

    var async = typeof cb === 'function';

    if (!async) {
      var buffers = [];
      var nread = 0;

      var error;
      this.on('error', function(er) {
        error = er;
      });

      do {
        var res = this._binding.writeSync(
          flushFlag,
          chunk, // in
          inOff, // in_off
          availInBefore, // in_len
          this._buffer, // out
          this._offset, //out_off
          availOutBefore
        ); // out_len
      } while (!this._hadError && callback(res[0], res[1]));

      if (this._hadError) {
        throw error;
      }

      var buf = Buffer.concat(buffers, nread);
      this.close();

      return buf;
    }

    var req = this._binding.write(
      flushFlag,
      chunk, // in
      inOff, // in_off
      availInBefore, // in_len
      this._buffer, // out
      this._offset, //out_off
      availOutBefore
    ); // out_len

    req.buffer = chunk;
    req.callback = callback;

    function callback(availInAfter, availOutAfter) {
      if (self._hadError) return;

      var have = availOutBefore - availOutAfter;
      assert$4(have >= 0, 'have should not go down');

      if (have > 0) {
        var out = self._buffer.slice(self._offset, self._offset + have);
        self._offset += have;
        // serve some output to the consumer.
        if (async) {
          self.push(out);
        } else {
          buffers.push(out);
          nread += out.length;
        }
      }

      // exhausted the output buffer, or used all the input create a new one.
      if (availOutAfter === 0 || self._offset >= self._chunkSize) {
        availOutBefore = self._chunkSize;
        self._offset = 0;
        self._buffer = new Buffer(self._chunkSize);
      }

      if (availOutAfter === 0) {
        // Not actually done.  Need to reprocess.
        // Also, update the availInBefore to the availInAfter value,
        // so that if we have to hit it a third (fourth, etc.) time,
        // it'll have the correct byte counts.
        inOff += availInBefore - availInAfter;
        availInBefore = availInAfter;

        if (!async) return true;

        var newReq = self._binding.write(
          flushFlag,
          chunk,
          inOff,
          availInBefore,
          self._buffer,
          self._offset,
          self._chunkSize
        );
        newReq.callback = callback; // this same function
        newReq.buffer = chunk;
        return;
      }

      if (!async) return false;

      // finished with the chunk.
      cb();
    }
  };

  inherits$1(Deflate, Zlib);
  inherits$1(Inflate, Zlib);
  inherits$1(Gzip, Zlib);
  inherits$1(Gunzip, Zlib);
  inherits$1(DeflateRaw, Zlib);
  inherits$1(InflateRaw, Zlib);
  inherits$1(Unzip, Zlib);
  var zlib = {
    codes: codes,
    createDeflate: createDeflate,
    createInflate: createInflate,
    createDeflateRaw: createDeflateRaw,
    createInflateRaw: createInflateRaw,
    createGzip: createGzip,
    createGunzip: createGunzip,
    createUnzip: createUnzip,
    deflate: deflate,
    deflateSync: deflateSync,
    gzip: gzip,
    gzipSync: gzipSync,
    deflateRaw: deflateRaw,
    deflateRawSync: deflateRawSync,
    unzip: unzip,
    unzipSync: unzipSync,
    inflate: inflate,
    inflateSync: inflateSync,
    gunzip: gunzip,
    gunzipSync: gunzipSync,
    inflateRaw: inflateRaw,
    inflateRawSync: inflateRawSync,
    Deflate: Deflate,
    Inflate: Inflate,
    Gzip: Gzip,
    Gunzip: Gunzip,
    DeflateRaw: DeflateRaw,
    InflateRaw: InflateRaw,
    Unzip: Unzip,
    Zlib: Zlib
  };

  var zlib$1 = Object.freeze({
    codes: codes,
    createDeflate: createDeflate,
    createInflate: createInflate,
    createDeflateRaw: createDeflateRaw,
    createInflateRaw: createInflateRaw,
    createGzip: createGzip,
    createGunzip: createGunzip,
    createUnzip: createUnzip,
    deflate: deflate,
    deflateSync: deflateSync,
    gzip: gzip,
    gzipSync: gzipSync,
    deflateRaw: deflateRaw,
    deflateRawSync: deflateRawSync,
    unzip: unzip,
    unzipSync: unzipSync,
    inflate: inflate,
    inflateSync: inflateSync,
    gunzip: gunzip,
    gunzipSync: gunzipSync,
    inflateRaw: inflateRaw,
    inflateRawSync: inflateRawSync,
    Deflate: Deflate,
    Inflate: Inflate,
    Gzip: Gzip,
    Gunzip: Gunzip,
    DeflateRaw: DeflateRaw,
    InflateRaw: InflateRaw,
    Unzip: Unzip,
    Zlib: Zlib,
    default: zlib
  });

  var _args = [['axios@0.17.1', '/var/www/gologic/temp/jcognos']];
  var _from = 'axios@0.17.1';
  var _id = 'axios@0.17.1';
  var _inBundle = false;
  var _integrity = 'sha1-LY4+XQvb1zJ/kbyBT1xXZg+Bgk0=';
  var _location = '/axios';
  var _phantomChildren = {};
  var _requested = {
    type: 'version',
    registry: true,
    raw: 'axios@0.17.1',
    name: 'axios',
    escapedName: 'axios',
    rawSpec: '0.17.1',
    saveSpec: null,
    fetchSpec: '0.17.1'
  };
  var _requiredBy = ['/'];
  var _resolved = 'https://registry.npmjs.org/axios/-/axios-0.17.1.tgz';
  var _spec = '0.17.1';
  var _where = '/var/www/gologic/temp/jcognos';
  var author = { name: 'Matt Zabriskie' };
  var browser$3 = { './lib/adapters/http.js': './lib/adapters/xhr.js' };
  var bugs = { url: 'https://github.com/axios/axios/issues' };
  var bundlesize = [{ path: './dist/axios.min.js', threshold: '5kB' }];
  var dependencies = { 'follow-redirects': '^1.2.5', 'is-buffer': '^1.1.5' };
  var description = 'Promise based HTTP client for the browser and node.js';
  var devDependencies = {
    bundlesize: '^0.5.7',
    coveralls: '^2.11.9',
    'es6-promise': '^4.0.5',
    grunt: '^1.0.1',
    'grunt-banner': '^0.6.0',
    'grunt-cli': '^1.2.0',
    'grunt-contrib-clean': '^1.0.0',
    'grunt-contrib-nodeunit': '^1.0.0',
    'grunt-contrib-watch': '^1.0.0',
    'grunt-eslint': '^19.0.0',
    'grunt-karma': '^2.0.0',
    'grunt-ts': '^6.0.0-beta.3',
    'grunt-webpack': '^1.0.18',
    'istanbul-instrumenter-loader': '^1.0.0',
    'jasmine-core': '^2.4.1',
    karma: '^1.3.0',
    'karma-chrome-launcher': '^2.0.0',
    'karma-coverage': '^1.0.0',
    'karma-firefox-launcher': '^1.0.0',
    'karma-jasmine': '^1.0.2',
    'karma-jasmine-ajax': '^0.1.13',
    'karma-opera-launcher': '^1.0.0',
    'karma-phantomjs-launcher': '^1.0.0',
    'karma-safari-launcher': '^1.0.0',
    'karma-sauce-launcher': '^1.1.0',
    'karma-sinon': '^1.0.5',
    'karma-sourcemap-loader': '^0.3.7',
    'karma-webpack': '^1.7.0',
    'load-grunt-tasks': '^3.5.2',
    minimist: '^1.2.0',
    'phantomjs-prebuilt': '^2.1.7',
    sinon: '^1.17.4',
    typescript: '^2.0.3',
    'url-search-params': '^0.6.1',
    webpack: '^1.13.1',
    'webpack-dev-server': '^1.14.1'
  };
  var homepage = 'https://github.com/axios/axios';
  var keywords = ['xhr', 'http', 'ajax', 'promise', 'node'];
  var license = 'MIT';
  var main = 'index.js';
  var name = 'axios';
  var repository = {
    type: 'git',
    url: 'git+https://github.com/axios/axios.git'
  };
  var scripts = {
    build: 'NODE_ENV=production grunt build',
    coveralls:
      'cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js',
    examples: 'node ./examples/server.js',
    postversion: 'git push && git push --tags',
    preversion: 'npm test',
    start: 'node ./sandbox/server.js',
    test: 'grunt test && bundlesize',
    version:
      'npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json'
  };
  var typings = './index.d.ts';
  var version$2 = '0.17.1';
  var _package = {
    _args: _args,
    _from: _from,
    _id: _id,
    _inBundle: _inBundle,
    _integrity: _integrity,
    _location: _location,
    _phantomChildren: _phantomChildren,
    _requested: _requested,
    _requiredBy: _requiredBy,
    _resolved: _resolved,
    _spec: _spec,
    _where: _where,
    author: author,
    browser: browser$3,
    bugs: bugs,
    bundlesize: bundlesize,
    dependencies: dependencies,
    description: description,
    devDependencies: devDependencies,
    homepage: homepage,
    keywords: keywords,
    license: license,
    main: main,
    name: name,
    repository: repository,
    scripts: scripts,
    typings: typings,
    version: version$2
  };

  var _package$1 = Object.freeze({
    _args: _args,
    _from: _from,
    _id: _id,
    _inBundle: _inBundle,
    _integrity: _integrity,
    _location: _location,
    _phantomChildren: _phantomChildren,
    _requested: _requested,
    _requiredBy: _requiredBy,
    _resolved: _resolved,
    _spec: _spec,
    _where: _where,
    author: author,
    browser: browser$3,
    bugs: bugs,
    bundlesize: bundlesize,
    dependencies: dependencies,
    description: description,
    devDependencies: devDependencies,
    homepage: homepage,
    keywords: keywords,
    license: license,
    main: main,
    name: name,
    repository: repository,
    scripts: scripts,
    typings: typings,
    version: version$2,
    default: _package
  });

  var zlib$2 = (zlib$1 && zlib) || zlib$1;

  var pkg = (_package$1 && _package) || _package$1;

  var httpFollow = followRedirects.http;
  var httpsFollow = followRedirects.https;

  /*eslint consistent-return:0*/
  var http_1 = function httpAdapter(config$$1) {
    return new Promise(function dispatchHttpRequest(resolve, reject) {
      var data = config$$1.data;
      var headers = config$$1.headers;
      var timer;

      // Set User-Agent (required by some servers)
      // Only set header if it hasn't been set in config
      // See https://github.com/axios/axios/issues/69
      if (!headers['User-Agent'] && !headers['user-agent']) {
        headers['User-Agent'] = 'axios/' + pkg.version;
      }

      if (data && !utils.isStream(data)) {
        if (isBuffer$2(data)) {
          // Nothing to do...
        } else if (utils.isArrayBuffer(data)) {
          data = new Buffer(new Uint8Array(data));
        } else if (utils.isString(data)) {
          data = new Buffer(data, 'utf-8');
        } else {
          return reject(
            createError(
              'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
              config$$1
            )
          );
        }

        // Add Content-Length header if data exists
        headers['Content-Length'] = data.length;
      }

      // HTTP basic authentication
      var auth = undefined;
      if (config$$1.auth) {
        var username = config$$1.auth.username || '';
        var password = config$$1.auth.password || '';
        auth = username + ':' + password;
      }

      // Parse url
      var parsed = require$$0$3.parse(config$$1.url);
      var protocol = parsed.protocol || 'http:';

      if (!auth && parsed.auth) {
        var urlAuth = parsed.auth.split(':');
        var urlUsername = urlAuth[0] || '';
        var urlPassword = urlAuth[1] || '';
        auth = urlUsername + ':' + urlPassword;
      }

      if (auth) {
        delete headers.Authorization;
      }

      var isHttps = protocol === 'https:';
      var agent = isHttps ? config$$1.httpsAgent : config$$1.httpAgent;

      var options = {
        hostname: parsed.hostname,
        port: parsed.port,
        path: buildURL(
          parsed.path,
          config$$1.params,
          config$$1.paramsSerializer
        ).replace(/^\?/, ''),
        method: config$$1.method,
        headers: headers,
        agent: agent,
        auth: auth
      };

      var proxy = config$$1.proxy;
      if (!proxy && proxy !== false) {
        var proxyEnv = protocol.slice(0, -1) + '_proxy';
        var proxyUrl =
          process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
        if (proxyUrl) {
          var parsedProxyUrl = require$$0$3.parse(proxyUrl);
          proxy = {
            host: parsedProxyUrl.hostname,
            port: parsedProxyUrl.port
          };

          if (parsedProxyUrl.auth) {
            var proxyUrlAuth = parsedProxyUrl.auth.split(':');
            proxy.auth = {
              username: proxyUrlAuth[0],
              password: proxyUrlAuth[1]
            };
          }
        }
      }

      if (proxy) {
        options.hostname = proxy.host;
        options.host = proxy.host;
        options.headers.host =
          parsed.hostname + (parsed.port ? ':' + parsed.port : '');
        options.port = proxy.port;
        options.path =
          protocol +
          '//' +
          parsed.hostname +
          (parsed.port ? ':' + parsed.port : '') +
          options.path;

        // Basic proxy authorization
        if (proxy.auth) {
          var base64 = new Buffer(
            proxy.auth.username + ':' + proxy.auth.password,
            'utf8'
          ).toString('base64');
          options.headers['Proxy-Authorization'] = 'Basic ' + base64;
        }
      }

      var transport;
      if (config$$1.transport) {
        transport = config$$1.transport;
      } else if (config$$1.maxRedirects === 0) {
        transport = isHttps ? https : https;
      } else {
        if (config$$1.maxRedirects) {
          options.maxRedirects = config$$1.maxRedirects;
        }
        transport = isHttps ? httpsFollow : httpFollow;
      }

      // Create the request
      var req = transport.request(options, function handleResponse(res) {
        if (req.aborted) return;

        // Response has been received so kill timer that handles request timeout
        clearTimeout(timer);
        timer = null;

        // uncompress the response body transparently if required
        var stream = res;
        switch (res.headers['content-encoding']) {
          /*eslint default-case:0*/
          case 'gzip':
          case 'compress':
          case 'deflate':
            // add the unzipper to the body stream processing pipeline
            stream = stream.pipe(zlib$2.createUnzip());

            // remove the content-encoding in order to not confuse downstream operations
            delete res.headers['content-encoding'];
            break;
        }

        // return the last request in case of redirects
        var lastRequest = res.req || req;

        var response = {
          status: res.statusCode,
          statusText: res.statusMessage,
          headers: res.headers,
          config: config$$1,
          request: lastRequest
        };

        if (config$$1.responseType === 'stream') {
          response.data = stream;
          settle(resolve, reject, response);
        } else {
          var responseBuffer = [];
          stream.on('data', function handleStreamData(chunk) {
            responseBuffer.push(chunk);

            // make sure the content length is not over the maxContentLength if specified
            if (
              config$$1.maxContentLength > -1 &&
              Buffer.concat(responseBuffer).length > config$$1.maxContentLength
            ) {
              reject(
                createError(
                  'maxContentLength size of ' +
                    config$$1.maxContentLength +
                    ' exceeded',
                  config$$1,
                  null,
                  lastRequest
                )
              );
            }
          });

          stream.on('error', function handleStreamError(err) {
            if (req.aborted) return;
            reject(enhanceError(err, config$$1, null, lastRequest));
          });

          stream.on('end', function handleStreamEnd() {
            var responseData = Buffer.concat(responseBuffer);
            if (config$$1.responseType !== 'arraybuffer') {
              responseData = responseData.toString('utf8');
            }

            response.data = responseData;
            settle(resolve, reject, response);
          });
        }
      });

      // Handle errors
      req.on('error', function handleRequestError(err) {
        if (req.aborted) return;
        reject(enhanceError(err, config$$1, null, req));
      });

      // Handle request timeout
      if (config$$1.timeout && !timer) {
        timer = setTimeout(function handleRequestTimeout() {
          req.abort();
          reject(
            createError(
              'timeout of ' + config$$1.timeout + 'ms exceeded',
              config$$1,
              'ECONNABORTED',
              req
            )
          );
        }, config$$1.timeout);
      }

      if (config$$1.cancelToken) {
        // Handle cancellation
        config$$1.cancelToken.promise.then(function onCanceled(cancel) {
          if (req.aborted) return;

          req.abort();
          reject(cancel);
        });
      }

      // Send the request
      if (utils.isStream(data)) {
        data.pipe(req);
      } else {
        req.end(data);
      }
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
      adapter = http_1;
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

    config = utils.merge(defaults_1, this.defaults, { method: 'get' }, config);
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
  var axios$2 = createInstance(defaults_1);

  // Expose Axios class to allow class inheritance
  axios$2.Axios = Axios_1;

  // Factory for creating new instances
  axios$2.create = function create(instanceConfig) {
    return createInstance(utils.merge(defaults_1, instanceConfig));
  };

  // Expose Cancel & CancelToken
  axios$2.Cancel = Cancel_1;
  axios$2.CancelToken = CancelToken_1;
  axios$2.isCancel = isCancel;

  // Expose all/spread
  axios$2.all = function all(promises) {
    return Promise.all(promises);
  };
  axios$2.spread = spread;

  var axios_1 = axios$2;

  // Allow use of default import syntax in TypeScript
  var default_1 = axios$2;

  axios_1.default = default_1;

  var axios = axios_1;

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

  var empty = {};

  var empty$1 = Object.freeze({
    default: empty
  });

  var punycode$3 = (punycode$1 && punycode) || punycode$1;

  var pubsuffix = createCommonjsModule(function(module) {
    /****************************************************
     * AUTOMATICALLY GENERATED by generate-pubsuffix.js *
     *                  DO NOT EDIT!                    *
     ****************************************************/

    module.exports.getPublicSuffix = function getPublicSuffix(domain) {
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
      if (!domain) {
        return null;
      }
      if (domain.match(/^\./)) {
        return null;
      }
      var asciiDomain = punycode$3.toASCII(domain);
      var converted = false;
      if (asciiDomain !== domain) {
        domain = asciiDomain;
        converted = true;
      }
      if (index[domain]) {
        return null;
      }

      domain = domain.toLowerCase();
      var parts = domain.split('.').reverse();

      var suffix = '';
      var suffixLen = 0;
      for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        var starstr = '*' + suffix;
        var partstr = part + suffix;

        if (index[starstr]) {
          // star rule matches
          suffixLen = i + 1;
          if (index[partstr] === false) {
            // exception rule matches (NB: false, not undefined)
            suffixLen--;
          }
        } else if (index[partstr]) {
          // exact match, not exception
          suffixLen = i + 1;
        }

        suffix = '.' + partstr;
      }

      if (index['*' + suffix]) {
        // *.domain exists (e.g. *.kyoto.jp for domain='kyoto.jp');
        return null;
      }

      suffixLen = suffixLen || 1;
      if (parts.length > suffixLen) {
        var publicSuffix = parts
          .slice(0, suffixLen + 1)
          .reverse()
          .join('.');
        return converted ? punycode$3.toUnicode(publicSuffix) : publicSuffix;
      }

      return null;
    };

    // The following generated structure is used under the MPL version 2.0
    // See public-suffix.txt for more information

    var index = (module.exports.index = Object.freeze({
      ac: true,
      'com.ac': true,
      'edu.ac': true,
      'gov.ac': true,
      'net.ac': true,
      'mil.ac': true,
      'org.ac': true,
      ad: true,
      'nom.ad': true,
      ae: true,
      'co.ae': true,
      'net.ae': true,
      'org.ae': true,
      'sch.ae': true,
      'ac.ae': true,
      'gov.ae': true,
      'mil.ae': true,
      aero: true,
      'accident-investigation.aero': true,
      'accident-prevention.aero': true,
      'aerobatic.aero': true,
      'aeroclub.aero': true,
      'aerodrome.aero': true,
      'agents.aero': true,
      'aircraft.aero': true,
      'airline.aero': true,
      'airport.aero': true,
      'air-surveillance.aero': true,
      'airtraffic.aero': true,
      'air-traffic-control.aero': true,
      'ambulance.aero': true,
      'amusement.aero': true,
      'association.aero': true,
      'author.aero': true,
      'ballooning.aero': true,
      'broker.aero': true,
      'caa.aero': true,
      'cargo.aero': true,
      'catering.aero': true,
      'certification.aero': true,
      'championship.aero': true,
      'charter.aero': true,
      'civilaviation.aero': true,
      'club.aero': true,
      'conference.aero': true,
      'consultant.aero': true,
      'consulting.aero': true,
      'control.aero': true,
      'council.aero': true,
      'crew.aero': true,
      'design.aero': true,
      'dgca.aero': true,
      'educator.aero': true,
      'emergency.aero': true,
      'engine.aero': true,
      'engineer.aero': true,
      'entertainment.aero': true,
      'equipment.aero': true,
      'exchange.aero': true,
      'express.aero': true,
      'federation.aero': true,
      'flight.aero': true,
      'freight.aero': true,
      'fuel.aero': true,
      'gliding.aero': true,
      'government.aero': true,
      'groundhandling.aero': true,
      'group.aero': true,
      'hanggliding.aero': true,
      'homebuilt.aero': true,
      'insurance.aero': true,
      'journal.aero': true,
      'journalist.aero': true,
      'leasing.aero': true,
      'logistics.aero': true,
      'magazine.aero': true,
      'maintenance.aero': true,
      'media.aero': true,
      'microlight.aero': true,
      'modelling.aero': true,
      'navigation.aero': true,
      'parachuting.aero': true,
      'paragliding.aero': true,
      'passenger-association.aero': true,
      'pilot.aero': true,
      'press.aero': true,
      'production.aero': true,
      'recreation.aero': true,
      'repbody.aero': true,
      'res.aero': true,
      'research.aero': true,
      'rotorcraft.aero': true,
      'safety.aero': true,
      'scientist.aero': true,
      'services.aero': true,
      'show.aero': true,
      'skydiving.aero': true,
      'software.aero': true,
      'student.aero': true,
      'trader.aero': true,
      'trading.aero': true,
      'trainer.aero': true,
      'union.aero': true,
      'workinggroup.aero': true,
      'works.aero': true,
      af: true,
      'gov.af': true,
      'com.af': true,
      'org.af': true,
      'net.af': true,
      'edu.af': true,
      ag: true,
      'com.ag': true,
      'org.ag': true,
      'net.ag': true,
      'co.ag': true,
      'nom.ag': true,
      ai: true,
      'off.ai': true,
      'com.ai': true,
      'net.ai': true,
      'org.ai': true,
      al: true,
      'com.al': true,
      'edu.al': true,
      'gov.al': true,
      'mil.al': true,
      'net.al': true,
      'org.al': true,
      am: true,
      ao: true,
      'ed.ao': true,
      'gv.ao': true,
      'og.ao': true,
      'co.ao': true,
      'pb.ao': true,
      'it.ao': true,
      aq: true,
      ar: true,
      'com.ar': true,
      'edu.ar': true,
      'gob.ar': true,
      'gov.ar': true,
      'int.ar': true,
      'mil.ar': true,
      'net.ar': true,
      'org.ar': true,
      'tur.ar': true,
      arpa: true,
      'e164.arpa': true,
      'in-addr.arpa': true,
      'ip6.arpa': true,
      'iris.arpa': true,
      'uri.arpa': true,
      'urn.arpa': true,
      as: true,
      'gov.as': true,
      asia: true,
      at: true,
      'ac.at': true,
      'co.at': true,
      'gv.at': true,
      'or.at': true,
      au: true,
      'com.au': true,
      'net.au': true,
      'org.au': true,
      'edu.au': true,
      'gov.au': true,
      'asn.au': true,
      'id.au': true,
      'info.au': true,
      'conf.au': true,
      'oz.au': true,
      'act.au': true,
      'nsw.au': true,
      'nt.au': true,
      'qld.au': true,
      'sa.au': true,
      'tas.au': true,
      'vic.au': true,
      'wa.au': true,
      'act.edu.au': true,
      'nsw.edu.au': true,
      'nt.edu.au': true,
      'qld.edu.au': true,
      'sa.edu.au': true,
      'tas.edu.au': true,
      'vic.edu.au': true,
      'wa.edu.au': true,
      'qld.gov.au': true,
      'sa.gov.au': true,
      'tas.gov.au': true,
      'vic.gov.au': true,
      'wa.gov.au': true,
      aw: true,
      'com.aw': true,
      ax: true,
      az: true,
      'com.az': true,
      'net.az': true,
      'int.az': true,
      'gov.az': true,
      'org.az': true,
      'edu.az': true,
      'info.az': true,
      'pp.az': true,
      'mil.az': true,
      'name.az': true,
      'pro.az': true,
      'biz.az': true,
      ba: true,
      'com.ba': true,
      'edu.ba': true,
      'gov.ba': true,
      'mil.ba': true,
      'net.ba': true,
      'org.ba': true,
      bb: true,
      'biz.bb': true,
      'co.bb': true,
      'com.bb': true,
      'edu.bb': true,
      'gov.bb': true,
      'info.bb': true,
      'net.bb': true,
      'org.bb': true,
      'store.bb': true,
      'tv.bb': true,
      '*.bd': true,
      be: true,
      'ac.be': true,
      bf: true,
      'gov.bf': true,
      bg: true,
      'a.bg': true,
      'b.bg': true,
      'c.bg': true,
      'd.bg': true,
      'e.bg': true,
      'f.bg': true,
      'g.bg': true,
      'h.bg': true,
      'i.bg': true,
      'j.bg': true,
      'k.bg': true,
      'l.bg': true,
      'm.bg': true,
      'n.bg': true,
      'o.bg': true,
      'p.bg': true,
      'q.bg': true,
      'r.bg': true,
      's.bg': true,
      't.bg': true,
      'u.bg': true,
      'v.bg': true,
      'w.bg': true,
      'x.bg': true,
      'y.bg': true,
      'z.bg': true,
      '0.bg': true,
      '1.bg': true,
      '2.bg': true,
      '3.bg': true,
      '4.bg': true,
      '5.bg': true,
      '6.bg': true,
      '7.bg': true,
      '8.bg': true,
      '9.bg': true,
      bh: true,
      'com.bh': true,
      'edu.bh': true,
      'net.bh': true,
      'org.bh': true,
      'gov.bh': true,
      bi: true,
      'co.bi': true,
      'com.bi': true,
      'edu.bi': true,
      'or.bi': true,
      'org.bi': true,
      biz: true,
      bj: true,
      'asso.bj': true,
      'barreau.bj': true,
      'gouv.bj': true,
      bm: true,
      'com.bm': true,
      'edu.bm': true,
      'gov.bm': true,
      'net.bm': true,
      'org.bm': true,
      '*.bn': true,
      bo: true,
      'com.bo': true,
      'edu.bo': true,
      'gov.bo': true,
      'gob.bo': true,
      'int.bo': true,
      'org.bo': true,
      'net.bo': true,
      'mil.bo': true,
      'tv.bo': true,
      br: true,
      'adm.br': true,
      'adv.br': true,
      'agr.br': true,
      'am.br': true,
      'arq.br': true,
      'art.br': true,
      'ato.br': true,
      'b.br': true,
      'bio.br': true,
      'blog.br': true,
      'bmd.br': true,
      'cim.br': true,
      'cng.br': true,
      'cnt.br': true,
      'com.br': true,
      'coop.br': true,
      'ecn.br': true,
      'eco.br': true,
      'edu.br': true,
      'emp.br': true,
      'eng.br': true,
      'esp.br': true,
      'etc.br': true,
      'eti.br': true,
      'far.br': true,
      'flog.br': true,
      'fm.br': true,
      'fnd.br': true,
      'fot.br': true,
      'fst.br': true,
      'g12.br': true,
      'ggf.br': true,
      'gov.br': true,
      'imb.br': true,
      'ind.br': true,
      'inf.br': true,
      'jor.br': true,
      'jus.br': true,
      'leg.br': true,
      'lel.br': true,
      'mat.br': true,
      'med.br': true,
      'mil.br': true,
      'mp.br': true,
      'mus.br': true,
      'net.br': true,
      '*.nom.br': true,
      'not.br': true,
      'ntr.br': true,
      'odo.br': true,
      'org.br': true,
      'ppg.br': true,
      'pro.br': true,
      'psc.br': true,
      'psi.br': true,
      'qsl.br': true,
      'radio.br': true,
      'rec.br': true,
      'slg.br': true,
      'srv.br': true,
      'taxi.br': true,
      'teo.br': true,
      'tmp.br': true,
      'trd.br': true,
      'tur.br': true,
      'tv.br': true,
      'vet.br': true,
      'vlog.br': true,
      'wiki.br': true,
      'zlg.br': true,
      bs: true,
      'com.bs': true,
      'net.bs': true,
      'org.bs': true,
      'edu.bs': true,
      'gov.bs': true,
      bt: true,
      'com.bt': true,
      'edu.bt': true,
      'gov.bt': true,
      'net.bt': true,
      'org.bt': true,
      bv: true,
      bw: true,
      'co.bw': true,
      'org.bw': true,
      by: true,
      'gov.by': true,
      'mil.by': true,
      'com.by': true,
      'of.by': true,
      bz: true,
      'com.bz': true,
      'net.bz': true,
      'org.bz': true,
      'edu.bz': true,
      'gov.bz': true,
      ca: true,
      'ab.ca': true,
      'bc.ca': true,
      'mb.ca': true,
      'nb.ca': true,
      'nf.ca': true,
      'nl.ca': true,
      'ns.ca': true,
      'nt.ca': true,
      'nu.ca': true,
      'on.ca': true,
      'pe.ca': true,
      'qc.ca': true,
      'sk.ca': true,
      'yk.ca': true,
      'gc.ca': true,
      cat: true,
      cc: true,
      cd: true,
      'gov.cd': true,
      cf: true,
      cg: true,
      ch: true,
      ci: true,
      'org.ci': true,
      'or.ci': true,
      'com.ci': true,
      'co.ci': true,
      'edu.ci': true,
      'ed.ci': true,
      'ac.ci': true,
      'net.ci': true,
      'go.ci': true,
      'asso.ci': true,
      'xn--aroport-bya.ci': true,
      'int.ci': true,
      'presse.ci': true,
      'md.ci': true,
      'gouv.ci': true,
      '*.ck': true,
      'www.ck': false,
      cl: true,
      'gov.cl': true,
      'gob.cl': true,
      'co.cl': true,
      'mil.cl': true,
      cm: true,
      'co.cm': true,
      'com.cm': true,
      'gov.cm': true,
      'net.cm': true,
      cn: true,
      'ac.cn': true,
      'com.cn': true,
      'edu.cn': true,
      'gov.cn': true,
      'net.cn': true,
      'org.cn': true,
      'mil.cn': true,
      'xn--55qx5d.cn': true,
      'xn--io0a7i.cn': true,
      'xn--od0alg.cn': true,
      'ah.cn': true,
      'bj.cn': true,
      'cq.cn': true,
      'fj.cn': true,
      'gd.cn': true,
      'gs.cn': true,
      'gz.cn': true,
      'gx.cn': true,
      'ha.cn': true,
      'hb.cn': true,
      'he.cn': true,
      'hi.cn': true,
      'hl.cn': true,
      'hn.cn': true,
      'jl.cn': true,
      'js.cn': true,
      'jx.cn': true,
      'ln.cn': true,
      'nm.cn': true,
      'nx.cn': true,
      'qh.cn': true,
      'sc.cn': true,
      'sd.cn': true,
      'sh.cn': true,
      'sn.cn': true,
      'sx.cn': true,
      'tj.cn': true,
      'xj.cn': true,
      'xz.cn': true,
      'yn.cn': true,
      'zj.cn': true,
      'hk.cn': true,
      'mo.cn': true,
      'tw.cn': true,
      co: true,
      'arts.co': true,
      'com.co': true,
      'edu.co': true,
      'firm.co': true,
      'gov.co': true,
      'info.co': true,
      'int.co': true,
      'mil.co': true,
      'net.co': true,
      'nom.co': true,
      'org.co': true,
      'rec.co': true,
      'web.co': true,
      com: true,
      coop: true,
      cr: true,
      'ac.cr': true,
      'co.cr': true,
      'ed.cr': true,
      'fi.cr': true,
      'go.cr': true,
      'or.cr': true,
      'sa.cr': true,
      cu: true,
      'com.cu': true,
      'edu.cu': true,
      'org.cu': true,
      'net.cu': true,
      'gov.cu': true,
      'inf.cu': true,
      cv: true,
      cw: true,
      'com.cw': true,
      'edu.cw': true,
      'net.cw': true,
      'org.cw': true,
      cx: true,
      'gov.cx': true,
      cy: true,
      'ac.cy': true,
      'biz.cy': true,
      'com.cy': true,
      'ekloges.cy': true,
      'gov.cy': true,
      'ltd.cy': true,
      'name.cy': true,
      'net.cy': true,
      'org.cy': true,
      'parliament.cy': true,
      'press.cy': true,
      'pro.cy': true,
      'tm.cy': true,
      cz: true,
      de: true,
      dj: true,
      dk: true,
      dm: true,
      'com.dm': true,
      'net.dm': true,
      'org.dm': true,
      'edu.dm': true,
      'gov.dm': true,
      do: true,
      'art.do': true,
      'com.do': true,
      'edu.do': true,
      'gob.do': true,
      'gov.do': true,
      'mil.do': true,
      'net.do': true,
      'org.do': true,
      'sld.do': true,
      'web.do': true,
      dz: true,
      'com.dz': true,
      'org.dz': true,
      'net.dz': true,
      'gov.dz': true,
      'edu.dz': true,
      'asso.dz': true,
      'pol.dz': true,
      'art.dz': true,
      ec: true,
      'com.ec': true,
      'info.ec': true,
      'net.ec': true,
      'fin.ec': true,
      'k12.ec': true,
      'med.ec': true,
      'pro.ec': true,
      'org.ec': true,
      'edu.ec': true,
      'gov.ec': true,
      'gob.ec': true,
      'mil.ec': true,
      edu: true,
      ee: true,
      'edu.ee': true,
      'gov.ee': true,
      'riik.ee': true,
      'lib.ee': true,
      'med.ee': true,
      'com.ee': true,
      'pri.ee': true,
      'aip.ee': true,
      'org.ee': true,
      'fie.ee': true,
      eg: true,
      'com.eg': true,
      'edu.eg': true,
      'eun.eg': true,
      'gov.eg': true,
      'mil.eg': true,
      'name.eg': true,
      'net.eg': true,
      'org.eg': true,
      'sci.eg': true,
      '*.er': true,
      es: true,
      'com.es': true,
      'nom.es': true,
      'org.es': true,
      'gob.es': true,
      'edu.es': true,
      et: true,
      'com.et': true,
      'gov.et': true,
      'org.et': true,
      'edu.et': true,
      'biz.et': true,
      'name.et': true,
      'info.et': true,
      'net.et': true,
      eu: true,
      fi: true,
      'aland.fi': true,
      '*.fj': true,
      '*.fk': true,
      fm: true,
      fo: true,
      fr: true,
      'com.fr': true,
      'asso.fr': true,
      'nom.fr': true,
      'prd.fr': true,
      'presse.fr': true,
      'tm.fr': true,
      'aeroport.fr': true,
      'assedic.fr': true,
      'avocat.fr': true,
      'avoues.fr': true,
      'cci.fr': true,
      'chambagri.fr': true,
      'chirurgiens-dentistes.fr': true,
      'experts-comptables.fr': true,
      'geometre-expert.fr': true,
      'gouv.fr': true,
      'greta.fr': true,
      'huissier-justice.fr': true,
      'medecin.fr': true,
      'notaires.fr': true,
      'pharmacien.fr': true,
      'port.fr': true,
      'veterinaire.fr': true,
      ga: true,
      gb: true,
      gd: true,
      ge: true,
      'com.ge': true,
      'edu.ge': true,
      'gov.ge': true,
      'org.ge': true,
      'mil.ge': true,
      'net.ge': true,
      'pvt.ge': true,
      gf: true,
      gg: true,
      'co.gg': true,
      'net.gg': true,
      'org.gg': true,
      gh: true,
      'com.gh': true,
      'edu.gh': true,
      'gov.gh': true,
      'org.gh': true,
      'mil.gh': true,
      gi: true,
      'com.gi': true,
      'ltd.gi': true,
      'gov.gi': true,
      'mod.gi': true,
      'edu.gi': true,
      'org.gi': true,
      gl: true,
      'co.gl': true,
      'com.gl': true,
      'edu.gl': true,
      'net.gl': true,
      'org.gl': true,
      gm: true,
      gn: true,
      'ac.gn': true,
      'com.gn': true,
      'edu.gn': true,
      'gov.gn': true,
      'org.gn': true,
      'net.gn': true,
      gov: true,
      gp: true,
      'com.gp': true,
      'net.gp': true,
      'mobi.gp': true,
      'edu.gp': true,
      'org.gp': true,
      'asso.gp': true,
      gq: true,
      gr: true,
      'com.gr': true,
      'edu.gr': true,
      'net.gr': true,
      'org.gr': true,
      'gov.gr': true,
      gs: true,
      gt: true,
      'com.gt': true,
      'edu.gt': true,
      'gob.gt': true,
      'ind.gt': true,
      'mil.gt': true,
      'net.gt': true,
      'org.gt': true,
      '*.gu': true,
      gw: true,
      gy: true,
      'co.gy': true,
      'com.gy': true,
      'edu.gy': true,
      'gov.gy': true,
      'net.gy': true,
      'org.gy': true,
      hk: true,
      'com.hk': true,
      'edu.hk': true,
      'gov.hk': true,
      'idv.hk': true,
      'net.hk': true,
      'org.hk': true,
      'xn--55qx5d.hk': true,
      'xn--wcvs22d.hk': true,
      'xn--lcvr32d.hk': true,
      'xn--mxtq1m.hk': true,
      'xn--gmqw5a.hk': true,
      'xn--ciqpn.hk': true,
      'xn--gmq050i.hk': true,
      'xn--zf0avx.hk': true,
      'xn--io0a7i.hk': true,
      'xn--mk0axi.hk': true,
      'xn--od0alg.hk': true,
      'xn--od0aq3b.hk': true,
      'xn--tn0ag.hk': true,
      'xn--uc0atv.hk': true,
      'xn--uc0ay4a.hk': true,
      hm: true,
      hn: true,
      'com.hn': true,
      'edu.hn': true,
      'org.hn': true,
      'net.hn': true,
      'mil.hn': true,
      'gob.hn': true,
      hr: true,
      'iz.hr': true,
      'from.hr': true,
      'name.hr': true,
      'com.hr': true,
      ht: true,
      'com.ht': true,
      'shop.ht': true,
      'firm.ht': true,
      'info.ht': true,
      'adult.ht': true,
      'net.ht': true,
      'pro.ht': true,
      'org.ht': true,
      'med.ht': true,
      'art.ht': true,
      'coop.ht': true,
      'pol.ht': true,
      'asso.ht': true,
      'edu.ht': true,
      'rel.ht': true,
      'gouv.ht': true,
      'perso.ht': true,
      hu: true,
      'co.hu': true,
      'info.hu': true,
      'org.hu': true,
      'priv.hu': true,
      'sport.hu': true,
      'tm.hu': true,
      '2000.hu': true,
      'agrar.hu': true,
      'bolt.hu': true,
      'casino.hu': true,
      'city.hu': true,
      'erotica.hu': true,
      'erotika.hu': true,
      'film.hu': true,
      'forum.hu': true,
      'games.hu': true,
      'hotel.hu': true,
      'ingatlan.hu': true,
      'jogasz.hu': true,
      'konyvelo.hu': true,
      'lakas.hu': true,
      'media.hu': true,
      'news.hu': true,
      'reklam.hu': true,
      'sex.hu': true,
      'shop.hu': true,
      'suli.hu': true,
      'szex.hu': true,
      'tozsde.hu': true,
      'utazas.hu': true,
      'video.hu': true,
      id: true,
      'ac.id': true,
      'biz.id': true,
      'co.id': true,
      'desa.id': true,
      'go.id': true,
      'mil.id': true,
      'my.id': true,
      'net.id': true,
      'or.id': true,
      'sch.id': true,
      'web.id': true,
      ie: true,
      'gov.ie': true,
      il: true,
      'ac.il': true,
      'co.il': true,
      'gov.il': true,
      'idf.il': true,
      'k12.il': true,
      'muni.il': true,
      'net.il': true,
      'org.il': true,
      im: true,
      'ac.im': true,
      'co.im': true,
      'com.im': true,
      'ltd.co.im': true,
      'net.im': true,
      'org.im': true,
      'plc.co.im': true,
      'tt.im': true,
      'tv.im': true,
      in: true,
      'co.in': true,
      'firm.in': true,
      'net.in': true,
      'org.in': true,
      'gen.in': true,
      'ind.in': true,
      'nic.in': true,
      'ac.in': true,
      'edu.in': true,
      'res.in': true,
      'gov.in': true,
      'mil.in': true,
      info: true,
      int: true,
      'eu.int': true,
      io: true,
      'com.io': true,
      iq: true,
      'gov.iq': true,
      'edu.iq': true,
      'mil.iq': true,
      'com.iq': true,
      'org.iq': true,
      'net.iq': true,
      ir: true,
      'ac.ir': true,
      'co.ir': true,
      'gov.ir': true,
      'id.ir': true,
      'net.ir': true,
      'org.ir': true,
      'sch.ir': true,
      'xn--mgba3a4f16a.ir': true,
      'xn--mgba3a4fra.ir': true,
      is: true,
      'net.is': true,
      'com.is': true,
      'edu.is': true,
      'gov.is': true,
      'org.is': true,
      'int.is': true,
      it: true,
      'gov.it': true,
      'edu.it': true,
      'abr.it': true,
      'abruzzo.it': true,
      'aosta-valley.it': true,
      'aostavalley.it': true,
      'bas.it': true,
      'basilicata.it': true,
      'cal.it': true,
      'calabria.it': true,
      'cam.it': true,
      'campania.it': true,
      'emilia-romagna.it': true,
      'emiliaromagna.it': true,
      'emr.it': true,
      'friuli-v-giulia.it': true,
      'friuli-ve-giulia.it': true,
      'friuli-vegiulia.it': true,
      'friuli-venezia-giulia.it': true,
      'friuli-veneziagiulia.it': true,
      'friuli-vgiulia.it': true,
      'friuliv-giulia.it': true,
      'friulive-giulia.it': true,
      'friulivegiulia.it': true,
      'friulivenezia-giulia.it': true,
      'friuliveneziagiulia.it': true,
      'friulivgiulia.it': true,
      'fvg.it': true,
      'laz.it': true,
      'lazio.it': true,
      'lig.it': true,
      'liguria.it': true,
      'lom.it': true,
      'lombardia.it': true,
      'lombardy.it': true,
      'lucania.it': true,
      'mar.it': true,
      'marche.it': true,
      'mol.it': true,
      'molise.it': true,
      'piedmont.it': true,
      'piemonte.it': true,
      'pmn.it': true,
      'pug.it': true,
      'puglia.it': true,
      'sar.it': true,
      'sardegna.it': true,
      'sardinia.it': true,
      'sic.it': true,
      'sicilia.it': true,
      'sicily.it': true,
      'taa.it': true,
      'tos.it': true,
      'toscana.it': true,
      'trentino-a-adige.it': true,
      'trentino-aadige.it': true,
      'trentino-alto-adige.it': true,
      'trentino-altoadige.it': true,
      'trentino-s-tirol.it': true,
      'trentino-stirol.it': true,
      'trentino-sud-tirol.it': true,
      'trentino-sudtirol.it': true,
      'trentino-sued-tirol.it': true,
      'trentino-suedtirol.it': true,
      'trentinoa-adige.it': true,
      'trentinoaadige.it': true,
      'trentinoalto-adige.it': true,
      'trentinoaltoadige.it': true,
      'trentinos-tirol.it': true,
      'trentinostirol.it': true,
      'trentinosud-tirol.it': true,
      'trentinosudtirol.it': true,
      'trentinosued-tirol.it': true,
      'trentinosuedtirol.it': true,
      'tuscany.it': true,
      'umb.it': true,
      'umbria.it': true,
      'val-d-aosta.it': true,
      'val-daosta.it': true,
      'vald-aosta.it': true,
      'valdaosta.it': true,
      'valle-aosta.it': true,
      'valle-d-aosta.it': true,
      'valle-daosta.it': true,
      'valleaosta.it': true,
      'valled-aosta.it': true,
      'valledaosta.it': true,
      'vallee-aoste.it': true,
      'valleeaoste.it': true,
      'vao.it': true,
      'vda.it': true,
      'ven.it': true,
      'veneto.it': true,
      'ag.it': true,
      'agrigento.it': true,
      'al.it': true,
      'alessandria.it': true,
      'alto-adige.it': true,
      'altoadige.it': true,
      'an.it': true,
      'ancona.it': true,
      'andria-barletta-trani.it': true,
      'andria-trani-barletta.it': true,
      'andriabarlettatrani.it': true,
      'andriatranibarletta.it': true,
      'ao.it': true,
      'aosta.it': true,
      'aoste.it': true,
      'ap.it': true,
      'aq.it': true,
      'aquila.it': true,
      'ar.it': true,
      'arezzo.it': true,
      'ascoli-piceno.it': true,
      'ascolipiceno.it': true,
      'asti.it': true,
      'at.it': true,
      'av.it': true,
      'avellino.it': true,
      'ba.it': true,
      'balsan.it': true,
      'bari.it': true,
      'barletta-trani-andria.it': true,
      'barlettatraniandria.it': true,
      'belluno.it': true,
      'benevento.it': true,
      'bergamo.it': true,
      'bg.it': true,
      'bi.it': true,
      'biella.it': true,
      'bl.it': true,
      'bn.it': true,
      'bo.it': true,
      'bologna.it': true,
      'bolzano.it': true,
      'bozen.it': true,
      'br.it': true,
      'brescia.it': true,
      'brindisi.it': true,
      'bs.it': true,
      'bt.it': true,
      'bz.it': true,
      'ca.it': true,
      'cagliari.it': true,
      'caltanissetta.it': true,
      'campidano-medio.it': true,
      'campidanomedio.it': true,
      'campobasso.it': true,
      'carbonia-iglesias.it': true,
      'carboniaiglesias.it': true,
      'carrara-massa.it': true,
      'carraramassa.it': true,
      'caserta.it': true,
      'catania.it': true,
      'catanzaro.it': true,
      'cb.it': true,
      'ce.it': true,
      'cesena-forli.it': true,
      'cesenaforli.it': true,
      'ch.it': true,
      'chieti.it': true,
      'ci.it': true,
      'cl.it': true,
      'cn.it': true,
      'co.it': true,
      'como.it': true,
      'cosenza.it': true,
      'cr.it': true,
      'cremona.it': true,
      'crotone.it': true,
      'cs.it': true,
      'ct.it': true,
      'cuneo.it': true,
      'cz.it': true,
      'dell-ogliastra.it': true,
      'dellogliastra.it': true,
      'en.it': true,
      'enna.it': true,
      'fc.it': true,
      'fe.it': true,
      'fermo.it': true,
      'ferrara.it': true,
      'fg.it': true,
      'fi.it': true,
      'firenze.it': true,
      'florence.it': true,
      'fm.it': true,
      'foggia.it': true,
      'forli-cesena.it': true,
      'forlicesena.it': true,
      'fr.it': true,
      'frosinone.it': true,
      'ge.it': true,
      'genoa.it': true,
      'genova.it': true,
      'go.it': true,
      'gorizia.it': true,
      'gr.it': true,
      'grosseto.it': true,
      'iglesias-carbonia.it': true,
      'iglesiascarbonia.it': true,
      'im.it': true,
      'imperia.it': true,
      'is.it': true,
      'isernia.it': true,
      'kr.it': true,
      'la-spezia.it': true,
      'laquila.it': true,
      'laspezia.it': true,
      'latina.it': true,
      'lc.it': true,
      'le.it': true,
      'lecce.it': true,
      'lecco.it': true,
      'li.it': true,
      'livorno.it': true,
      'lo.it': true,
      'lodi.it': true,
      'lt.it': true,
      'lu.it': true,
      'lucca.it': true,
      'macerata.it': true,
      'mantova.it': true,
      'massa-carrara.it': true,
      'massacarrara.it': true,
      'matera.it': true,
      'mb.it': true,
      'mc.it': true,
      'me.it': true,
      'medio-campidano.it': true,
      'mediocampidano.it': true,
      'messina.it': true,
      'mi.it': true,
      'milan.it': true,
      'milano.it': true,
      'mn.it': true,
      'mo.it': true,
      'modena.it': true,
      'monza-brianza.it': true,
      'monza-e-della-brianza.it': true,
      'monza.it': true,
      'monzabrianza.it': true,
      'monzaebrianza.it': true,
      'monzaedellabrianza.it': true,
      'ms.it': true,
      'mt.it': true,
      'na.it': true,
      'naples.it': true,
      'napoli.it': true,
      'no.it': true,
      'novara.it': true,
      'nu.it': true,
      'nuoro.it': true,
      'og.it': true,
      'ogliastra.it': true,
      'olbia-tempio.it': true,
      'olbiatempio.it': true,
      'or.it': true,
      'oristano.it': true,
      'ot.it': true,
      'pa.it': true,
      'padova.it': true,
      'padua.it': true,
      'palermo.it': true,
      'parma.it': true,
      'pavia.it': true,
      'pc.it': true,
      'pd.it': true,
      'pe.it': true,
      'perugia.it': true,
      'pesaro-urbino.it': true,
      'pesarourbino.it': true,
      'pescara.it': true,
      'pg.it': true,
      'pi.it': true,
      'piacenza.it': true,
      'pisa.it': true,
      'pistoia.it': true,
      'pn.it': true,
      'po.it': true,
      'pordenone.it': true,
      'potenza.it': true,
      'pr.it': true,
      'prato.it': true,
      'pt.it': true,
      'pu.it': true,
      'pv.it': true,
      'pz.it': true,
      'ra.it': true,
      'ragusa.it': true,
      'ravenna.it': true,
      'rc.it': true,
      're.it': true,
      'reggio-calabria.it': true,
      'reggio-emilia.it': true,
      'reggiocalabria.it': true,
      'reggioemilia.it': true,
      'rg.it': true,
      'ri.it': true,
      'rieti.it': true,
      'rimini.it': true,
      'rm.it': true,
      'rn.it': true,
      'ro.it': true,
      'roma.it': true,
      'rome.it': true,
      'rovigo.it': true,
      'sa.it': true,
      'salerno.it': true,
      'sassari.it': true,
      'savona.it': true,
      'si.it': true,
      'siena.it': true,
      'siracusa.it': true,
      'so.it': true,
      'sondrio.it': true,
      'sp.it': true,
      'sr.it': true,
      'ss.it': true,
      'suedtirol.it': true,
      'sv.it': true,
      'ta.it': true,
      'taranto.it': true,
      'te.it': true,
      'tempio-olbia.it': true,
      'tempioolbia.it': true,
      'teramo.it': true,
      'terni.it': true,
      'tn.it': true,
      'to.it': true,
      'torino.it': true,
      'tp.it': true,
      'tr.it': true,
      'trani-andria-barletta.it': true,
      'trani-barletta-andria.it': true,
      'traniandriabarletta.it': true,
      'tranibarlettaandria.it': true,
      'trapani.it': true,
      'trentino.it': true,
      'trento.it': true,
      'treviso.it': true,
      'trieste.it': true,
      'ts.it': true,
      'turin.it': true,
      'tv.it': true,
      'ud.it': true,
      'udine.it': true,
      'urbino-pesaro.it': true,
      'urbinopesaro.it': true,
      'va.it': true,
      'varese.it': true,
      'vb.it': true,
      'vc.it': true,
      've.it': true,
      'venezia.it': true,
      'venice.it': true,
      'verbania.it': true,
      'vercelli.it': true,
      'verona.it': true,
      'vi.it': true,
      'vibo-valentia.it': true,
      'vibovalentia.it': true,
      'vicenza.it': true,
      'viterbo.it': true,
      'vr.it': true,
      'vs.it': true,
      'vt.it': true,
      'vv.it': true,
      je: true,
      'co.je': true,
      'net.je': true,
      'org.je': true,
      '*.jm': true,
      jo: true,
      'com.jo': true,
      'org.jo': true,
      'net.jo': true,
      'edu.jo': true,
      'sch.jo': true,
      'gov.jo': true,
      'mil.jo': true,
      'name.jo': true,
      jobs: true,
      jp: true,
      'ac.jp': true,
      'ad.jp': true,
      'co.jp': true,
      'ed.jp': true,
      'go.jp': true,
      'gr.jp': true,
      'lg.jp': true,
      'ne.jp': true,
      'or.jp': true,
      'aichi.jp': true,
      'akita.jp': true,
      'aomori.jp': true,
      'chiba.jp': true,
      'ehime.jp': true,
      'fukui.jp': true,
      'fukuoka.jp': true,
      'fukushima.jp': true,
      'gifu.jp': true,
      'gunma.jp': true,
      'hiroshima.jp': true,
      'hokkaido.jp': true,
      'hyogo.jp': true,
      'ibaraki.jp': true,
      'ishikawa.jp': true,
      'iwate.jp': true,
      'kagawa.jp': true,
      'kagoshima.jp': true,
      'kanagawa.jp': true,
      'kochi.jp': true,
      'kumamoto.jp': true,
      'kyoto.jp': true,
      'mie.jp': true,
      'miyagi.jp': true,
      'miyazaki.jp': true,
      'nagano.jp': true,
      'nagasaki.jp': true,
      'nara.jp': true,
      'niigata.jp': true,
      'oita.jp': true,
      'okayama.jp': true,
      'okinawa.jp': true,
      'osaka.jp': true,
      'saga.jp': true,
      'saitama.jp': true,
      'shiga.jp': true,
      'shimane.jp': true,
      'shizuoka.jp': true,
      'tochigi.jp': true,
      'tokushima.jp': true,
      'tokyo.jp': true,
      'tottori.jp': true,
      'toyama.jp': true,
      'wakayama.jp': true,
      'yamagata.jp': true,
      'yamaguchi.jp': true,
      'yamanashi.jp': true,
      'xn--4pvxs.jp': true,
      'xn--vgu402c.jp': true,
      'xn--c3s14m.jp': true,
      'xn--f6qx53a.jp': true,
      'xn--8pvr4u.jp': true,
      'xn--uist22h.jp': true,
      'xn--djrs72d6uy.jp': true,
      'xn--mkru45i.jp': true,
      'xn--0trq7p7nn.jp': true,
      'xn--8ltr62k.jp': true,
      'xn--2m4a15e.jp': true,
      'xn--efvn9s.jp': true,
      'xn--32vp30h.jp': true,
      'xn--4it797k.jp': true,
      'xn--1lqs71d.jp': true,
      'xn--5rtp49c.jp': true,
      'xn--5js045d.jp': true,
      'xn--ehqz56n.jp': true,
      'xn--1lqs03n.jp': true,
      'xn--qqqt11m.jp': true,
      'xn--kbrq7o.jp': true,
      'xn--pssu33l.jp': true,
      'xn--ntsq17g.jp': true,
      'xn--uisz3g.jp': true,
      'xn--6btw5a.jp': true,
      'xn--1ctwo.jp': true,
      'xn--6orx2r.jp': true,
      'xn--rht61e.jp': true,
      'xn--rht27z.jp': true,
      'xn--djty4k.jp': true,
      'xn--nit225k.jp': true,
      'xn--rht3d.jp': true,
      'xn--klty5x.jp': true,
      'xn--kltx9a.jp': true,
      'xn--kltp7d.jp': true,
      'xn--uuwu58a.jp': true,
      'xn--zbx025d.jp': true,
      'xn--ntso0iqx3a.jp': true,
      'xn--elqq16h.jp': true,
      'xn--4it168d.jp': true,
      'xn--klt787d.jp': true,
      'xn--rny31h.jp': true,
      'xn--7t0a264c.jp': true,
      'xn--5rtq34k.jp': true,
      'xn--k7yn95e.jp': true,
      'xn--tor131o.jp': true,
      'xn--d5qv7z876c.jp': true,
      '*.kawasaki.jp': true,
      '*.kitakyushu.jp': true,
      '*.kobe.jp': true,
      '*.nagoya.jp': true,
      '*.sapporo.jp': true,
      '*.sendai.jp': true,
      '*.yokohama.jp': true,
      'city.kawasaki.jp': false,
      'city.kitakyushu.jp': false,
      'city.kobe.jp': false,
      'city.nagoya.jp': false,
      'city.sapporo.jp': false,
      'city.sendai.jp': false,
      'city.yokohama.jp': false,
      'aisai.aichi.jp': true,
      'ama.aichi.jp': true,
      'anjo.aichi.jp': true,
      'asuke.aichi.jp': true,
      'chiryu.aichi.jp': true,
      'chita.aichi.jp': true,
      'fuso.aichi.jp': true,
      'gamagori.aichi.jp': true,
      'handa.aichi.jp': true,
      'hazu.aichi.jp': true,
      'hekinan.aichi.jp': true,
      'higashiura.aichi.jp': true,
      'ichinomiya.aichi.jp': true,
      'inazawa.aichi.jp': true,
      'inuyama.aichi.jp': true,
      'isshiki.aichi.jp': true,
      'iwakura.aichi.jp': true,
      'kanie.aichi.jp': true,
      'kariya.aichi.jp': true,
      'kasugai.aichi.jp': true,
      'kira.aichi.jp': true,
      'kiyosu.aichi.jp': true,
      'komaki.aichi.jp': true,
      'konan.aichi.jp': true,
      'kota.aichi.jp': true,
      'mihama.aichi.jp': true,
      'miyoshi.aichi.jp': true,
      'nishio.aichi.jp': true,
      'nisshin.aichi.jp': true,
      'obu.aichi.jp': true,
      'oguchi.aichi.jp': true,
      'oharu.aichi.jp': true,
      'okazaki.aichi.jp': true,
      'owariasahi.aichi.jp': true,
      'seto.aichi.jp': true,
      'shikatsu.aichi.jp': true,
      'shinshiro.aichi.jp': true,
      'shitara.aichi.jp': true,
      'tahara.aichi.jp': true,
      'takahama.aichi.jp': true,
      'tobishima.aichi.jp': true,
      'toei.aichi.jp': true,
      'togo.aichi.jp': true,
      'tokai.aichi.jp': true,
      'tokoname.aichi.jp': true,
      'toyoake.aichi.jp': true,
      'toyohashi.aichi.jp': true,
      'toyokawa.aichi.jp': true,
      'toyone.aichi.jp': true,
      'toyota.aichi.jp': true,
      'tsushima.aichi.jp': true,
      'yatomi.aichi.jp': true,
      'akita.akita.jp': true,
      'daisen.akita.jp': true,
      'fujisato.akita.jp': true,
      'gojome.akita.jp': true,
      'hachirogata.akita.jp': true,
      'happou.akita.jp': true,
      'higashinaruse.akita.jp': true,
      'honjo.akita.jp': true,
      'honjyo.akita.jp': true,
      'ikawa.akita.jp': true,
      'kamikoani.akita.jp': true,
      'kamioka.akita.jp': true,
      'katagami.akita.jp': true,
      'kazuno.akita.jp': true,
      'kitaakita.akita.jp': true,
      'kosaka.akita.jp': true,
      'kyowa.akita.jp': true,
      'misato.akita.jp': true,
      'mitane.akita.jp': true,
      'moriyoshi.akita.jp': true,
      'nikaho.akita.jp': true,
      'noshiro.akita.jp': true,
      'odate.akita.jp': true,
      'oga.akita.jp': true,
      'ogata.akita.jp': true,
      'semboku.akita.jp': true,
      'yokote.akita.jp': true,
      'yurihonjo.akita.jp': true,
      'aomori.aomori.jp': true,
      'gonohe.aomori.jp': true,
      'hachinohe.aomori.jp': true,
      'hashikami.aomori.jp': true,
      'hiranai.aomori.jp': true,
      'hirosaki.aomori.jp': true,
      'itayanagi.aomori.jp': true,
      'kuroishi.aomori.jp': true,
      'misawa.aomori.jp': true,
      'mutsu.aomori.jp': true,
      'nakadomari.aomori.jp': true,
      'noheji.aomori.jp': true,
      'oirase.aomori.jp': true,
      'owani.aomori.jp': true,
      'rokunohe.aomori.jp': true,
      'sannohe.aomori.jp': true,
      'shichinohe.aomori.jp': true,
      'shingo.aomori.jp': true,
      'takko.aomori.jp': true,
      'towada.aomori.jp': true,
      'tsugaru.aomori.jp': true,
      'tsuruta.aomori.jp': true,
      'abiko.chiba.jp': true,
      'asahi.chiba.jp': true,
      'chonan.chiba.jp': true,
      'chosei.chiba.jp': true,
      'choshi.chiba.jp': true,
      'chuo.chiba.jp': true,
      'funabashi.chiba.jp': true,
      'futtsu.chiba.jp': true,
      'hanamigawa.chiba.jp': true,
      'ichihara.chiba.jp': true,
      'ichikawa.chiba.jp': true,
      'ichinomiya.chiba.jp': true,
      'inzai.chiba.jp': true,
      'isumi.chiba.jp': true,
      'kamagaya.chiba.jp': true,
      'kamogawa.chiba.jp': true,
      'kashiwa.chiba.jp': true,
      'katori.chiba.jp': true,
      'katsuura.chiba.jp': true,
      'kimitsu.chiba.jp': true,
      'kisarazu.chiba.jp': true,
      'kozaki.chiba.jp': true,
      'kujukuri.chiba.jp': true,
      'kyonan.chiba.jp': true,
      'matsudo.chiba.jp': true,
      'midori.chiba.jp': true,
      'mihama.chiba.jp': true,
      'minamiboso.chiba.jp': true,
      'mobara.chiba.jp': true,
      'mutsuzawa.chiba.jp': true,
      'nagara.chiba.jp': true,
      'nagareyama.chiba.jp': true,
      'narashino.chiba.jp': true,
      'narita.chiba.jp': true,
      'noda.chiba.jp': true,
      'oamishirasato.chiba.jp': true,
      'omigawa.chiba.jp': true,
      'onjuku.chiba.jp': true,
      'otaki.chiba.jp': true,
      'sakae.chiba.jp': true,
      'sakura.chiba.jp': true,
      'shimofusa.chiba.jp': true,
      'shirako.chiba.jp': true,
      'shiroi.chiba.jp': true,
      'shisui.chiba.jp': true,
      'sodegaura.chiba.jp': true,
      'sosa.chiba.jp': true,
      'tako.chiba.jp': true,
      'tateyama.chiba.jp': true,
      'togane.chiba.jp': true,
      'tohnosho.chiba.jp': true,
      'tomisato.chiba.jp': true,
      'urayasu.chiba.jp': true,
      'yachimata.chiba.jp': true,
      'yachiyo.chiba.jp': true,
      'yokaichiba.chiba.jp': true,
      'yokoshibahikari.chiba.jp': true,
      'yotsukaido.chiba.jp': true,
      'ainan.ehime.jp': true,
      'honai.ehime.jp': true,
      'ikata.ehime.jp': true,
      'imabari.ehime.jp': true,
      'iyo.ehime.jp': true,
      'kamijima.ehime.jp': true,
      'kihoku.ehime.jp': true,
      'kumakogen.ehime.jp': true,
      'masaki.ehime.jp': true,
      'matsuno.ehime.jp': true,
      'matsuyama.ehime.jp': true,
      'namikata.ehime.jp': true,
      'niihama.ehime.jp': true,
      'ozu.ehime.jp': true,
      'saijo.ehime.jp': true,
      'seiyo.ehime.jp': true,
      'shikokuchuo.ehime.jp': true,
      'tobe.ehime.jp': true,
      'toon.ehime.jp': true,
      'uchiko.ehime.jp': true,
      'uwajima.ehime.jp': true,
      'yawatahama.ehime.jp': true,
      'echizen.fukui.jp': true,
      'eiheiji.fukui.jp': true,
      'fukui.fukui.jp': true,
      'ikeda.fukui.jp': true,
      'katsuyama.fukui.jp': true,
      'mihama.fukui.jp': true,
      'minamiechizen.fukui.jp': true,
      'obama.fukui.jp': true,
      'ohi.fukui.jp': true,
      'ono.fukui.jp': true,
      'sabae.fukui.jp': true,
      'sakai.fukui.jp': true,
      'takahama.fukui.jp': true,
      'tsuruga.fukui.jp': true,
      'wakasa.fukui.jp': true,
      'ashiya.fukuoka.jp': true,
      'buzen.fukuoka.jp': true,
      'chikugo.fukuoka.jp': true,
      'chikuho.fukuoka.jp': true,
      'chikujo.fukuoka.jp': true,
      'chikushino.fukuoka.jp': true,
      'chikuzen.fukuoka.jp': true,
      'chuo.fukuoka.jp': true,
      'dazaifu.fukuoka.jp': true,
      'fukuchi.fukuoka.jp': true,
      'hakata.fukuoka.jp': true,
      'higashi.fukuoka.jp': true,
      'hirokawa.fukuoka.jp': true,
      'hisayama.fukuoka.jp': true,
      'iizuka.fukuoka.jp': true,
      'inatsuki.fukuoka.jp': true,
      'kaho.fukuoka.jp': true,
      'kasuga.fukuoka.jp': true,
      'kasuya.fukuoka.jp': true,
      'kawara.fukuoka.jp': true,
      'keisen.fukuoka.jp': true,
      'koga.fukuoka.jp': true,
      'kurate.fukuoka.jp': true,
      'kurogi.fukuoka.jp': true,
      'kurume.fukuoka.jp': true,
      'minami.fukuoka.jp': true,
      'miyako.fukuoka.jp': true,
      'miyama.fukuoka.jp': true,
      'miyawaka.fukuoka.jp': true,
      'mizumaki.fukuoka.jp': true,
      'munakata.fukuoka.jp': true,
      'nakagawa.fukuoka.jp': true,
      'nakama.fukuoka.jp': true,
      'nishi.fukuoka.jp': true,
      'nogata.fukuoka.jp': true,
      'ogori.fukuoka.jp': true,
      'okagaki.fukuoka.jp': true,
      'okawa.fukuoka.jp': true,
      'oki.fukuoka.jp': true,
      'omuta.fukuoka.jp': true,
      'onga.fukuoka.jp': true,
      'onojo.fukuoka.jp': true,
      'oto.fukuoka.jp': true,
      'saigawa.fukuoka.jp': true,
      'sasaguri.fukuoka.jp': true,
      'shingu.fukuoka.jp': true,
      'shinyoshitomi.fukuoka.jp': true,
      'shonai.fukuoka.jp': true,
      'soeda.fukuoka.jp': true,
      'sue.fukuoka.jp': true,
      'tachiarai.fukuoka.jp': true,
      'tagawa.fukuoka.jp': true,
      'takata.fukuoka.jp': true,
      'toho.fukuoka.jp': true,
      'toyotsu.fukuoka.jp': true,
      'tsuiki.fukuoka.jp': true,
      'ukiha.fukuoka.jp': true,
      'umi.fukuoka.jp': true,
      'usui.fukuoka.jp': true,
      'yamada.fukuoka.jp': true,
      'yame.fukuoka.jp': true,
      'yanagawa.fukuoka.jp': true,
      'yukuhashi.fukuoka.jp': true,
      'aizubange.fukushima.jp': true,
      'aizumisato.fukushima.jp': true,
      'aizuwakamatsu.fukushima.jp': true,
      'asakawa.fukushima.jp': true,
      'bandai.fukushima.jp': true,
      'date.fukushima.jp': true,
      'fukushima.fukushima.jp': true,
      'furudono.fukushima.jp': true,
      'futaba.fukushima.jp': true,
      'hanawa.fukushima.jp': true,
      'higashi.fukushima.jp': true,
      'hirata.fukushima.jp': true,
      'hirono.fukushima.jp': true,
      'iitate.fukushima.jp': true,
      'inawashiro.fukushima.jp': true,
      'ishikawa.fukushima.jp': true,
      'iwaki.fukushima.jp': true,
      'izumizaki.fukushima.jp': true,
      'kagamiishi.fukushima.jp': true,
      'kaneyama.fukushima.jp': true,
      'kawamata.fukushima.jp': true,
      'kitakata.fukushima.jp': true,
      'kitashiobara.fukushima.jp': true,
      'koori.fukushima.jp': true,
      'koriyama.fukushima.jp': true,
      'kunimi.fukushima.jp': true,
      'miharu.fukushima.jp': true,
      'mishima.fukushima.jp': true,
      'namie.fukushima.jp': true,
      'nango.fukushima.jp': true,
      'nishiaizu.fukushima.jp': true,
      'nishigo.fukushima.jp': true,
      'okuma.fukushima.jp': true,
      'omotego.fukushima.jp': true,
      'ono.fukushima.jp': true,
      'otama.fukushima.jp': true,
      'samegawa.fukushima.jp': true,
      'shimogo.fukushima.jp': true,
      'shirakawa.fukushima.jp': true,
      'showa.fukushima.jp': true,
      'soma.fukushima.jp': true,
      'sukagawa.fukushima.jp': true,
      'taishin.fukushima.jp': true,
      'tamakawa.fukushima.jp': true,
      'tanagura.fukushima.jp': true,
      'tenei.fukushima.jp': true,
      'yabuki.fukushima.jp': true,
      'yamato.fukushima.jp': true,
      'yamatsuri.fukushima.jp': true,
      'yanaizu.fukushima.jp': true,
      'yugawa.fukushima.jp': true,
      'anpachi.gifu.jp': true,
      'ena.gifu.jp': true,
      'gifu.gifu.jp': true,
      'ginan.gifu.jp': true,
      'godo.gifu.jp': true,
      'gujo.gifu.jp': true,
      'hashima.gifu.jp': true,
      'hichiso.gifu.jp': true,
      'hida.gifu.jp': true,
      'higashishirakawa.gifu.jp': true,
      'ibigawa.gifu.jp': true,
      'ikeda.gifu.jp': true,
      'kakamigahara.gifu.jp': true,
      'kani.gifu.jp': true,
      'kasahara.gifu.jp': true,
      'kasamatsu.gifu.jp': true,
      'kawaue.gifu.jp': true,
      'kitagata.gifu.jp': true,
      'mino.gifu.jp': true,
      'minokamo.gifu.jp': true,
      'mitake.gifu.jp': true,
      'mizunami.gifu.jp': true,
      'motosu.gifu.jp': true,
      'nakatsugawa.gifu.jp': true,
      'ogaki.gifu.jp': true,
      'sakahogi.gifu.jp': true,
      'seki.gifu.jp': true,
      'sekigahara.gifu.jp': true,
      'shirakawa.gifu.jp': true,
      'tajimi.gifu.jp': true,
      'takayama.gifu.jp': true,
      'tarui.gifu.jp': true,
      'toki.gifu.jp': true,
      'tomika.gifu.jp': true,
      'wanouchi.gifu.jp': true,
      'yamagata.gifu.jp': true,
      'yaotsu.gifu.jp': true,
      'yoro.gifu.jp': true,
      'annaka.gunma.jp': true,
      'chiyoda.gunma.jp': true,
      'fujioka.gunma.jp': true,
      'higashiagatsuma.gunma.jp': true,
      'isesaki.gunma.jp': true,
      'itakura.gunma.jp': true,
      'kanna.gunma.jp': true,
      'kanra.gunma.jp': true,
      'katashina.gunma.jp': true,
      'kawaba.gunma.jp': true,
      'kiryu.gunma.jp': true,
      'kusatsu.gunma.jp': true,
      'maebashi.gunma.jp': true,
      'meiwa.gunma.jp': true,
      'midori.gunma.jp': true,
      'minakami.gunma.jp': true,
      'naganohara.gunma.jp': true,
      'nakanojo.gunma.jp': true,
      'nanmoku.gunma.jp': true,
      'numata.gunma.jp': true,
      'oizumi.gunma.jp': true,
      'ora.gunma.jp': true,
      'ota.gunma.jp': true,
      'shibukawa.gunma.jp': true,
      'shimonita.gunma.jp': true,
      'shinto.gunma.jp': true,
      'showa.gunma.jp': true,
      'takasaki.gunma.jp': true,
      'takayama.gunma.jp': true,
      'tamamura.gunma.jp': true,
      'tatebayashi.gunma.jp': true,
      'tomioka.gunma.jp': true,
      'tsukiyono.gunma.jp': true,
      'tsumagoi.gunma.jp': true,
      'ueno.gunma.jp': true,
      'yoshioka.gunma.jp': true,
      'asaminami.hiroshima.jp': true,
      'daiwa.hiroshima.jp': true,
      'etajima.hiroshima.jp': true,
      'fuchu.hiroshima.jp': true,
      'fukuyama.hiroshima.jp': true,
      'hatsukaichi.hiroshima.jp': true,
      'higashihiroshima.hiroshima.jp': true,
      'hongo.hiroshima.jp': true,
      'jinsekikogen.hiroshima.jp': true,
      'kaita.hiroshima.jp': true,
      'kui.hiroshima.jp': true,
      'kumano.hiroshima.jp': true,
      'kure.hiroshima.jp': true,
      'mihara.hiroshima.jp': true,
      'miyoshi.hiroshima.jp': true,
      'naka.hiroshima.jp': true,
      'onomichi.hiroshima.jp': true,
      'osakikamijima.hiroshima.jp': true,
      'otake.hiroshima.jp': true,
      'saka.hiroshima.jp': true,
      'sera.hiroshima.jp': true,
      'seranishi.hiroshima.jp': true,
      'shinichi.hiroshima.jp': true,
      'shobara.hiroshima.jp': true,
      'takehara.hiroshima.jp': true,
      'abashiri.hokkaido.jp': true,
      'abira.hokkaido.jp': true,
      'aibetsu.hokkaido.jp': true,
      'akabira.hokkaido.jp': true,
      'akkeshi.hokkaido.jp': true,
      'asahikawa.hokkaido.jp': true,
      'ashibetsu.hokkaido.jp': true,
      'ashoro.hokkaido.jp': true,
      'assabu.hokkaido.jp': true,
      'atsuma.hokkaido.jp': true,
      'bibai.hokkaido.jp': true,
      'biei.hokkaido.jp': true,
      'bifuka.hokkaido.jp': true,
      'bihoro.hokkaido.jp': true,
      'biratori.hokkaido.jp': true,
      'chippubetsu.hokkaido.jp': true,
      'chitose.hokkaido.jp': true,
      'date.hokkaido.jp': true,
      'ebetsu.hokkaido.jp': true,
      'embetsu.hokkaido.jp': true,
      'eniwa.hokkaido.jp': true,
      'erimo.hokkaido.jp': true,
      'esan.hokkaido.jp': true,
      'esashi.hokkaido.jp': true,
      'fukagawa.hokkaido.jp': true,
      'fukushima.hokkaido.jp': true,
      'furano.hokkaido.jp': true,
      'furubira.hokkaido.jp': true,
      'haboro.hokkaido.jp': true,
      'hakodate.hokkaido.jp': true,
      'hamatonbetsu.hokkaido.jp': true,
      'hidaka.hokkaido.jp': true,
      'higashikagura.hokkaido.jp': true,
      'higashikawa.hokkaido.jp': true,
      'hiroo.hokkaido.jp': true,
      'hokuryu.hokkaido.jp': true,
      'hokuto.hokkaido.jp': true,
      'honbetsu.hokkaido.jp': true,
      'horokanai.hokkaido.jp': true,
      'horonobe.hokkaido.jp': true,
      'ikeda.hokkaido.jp': true,
      'imakane.hokkaido.jp': true,
      'ishikari.hokkaido.jp': true,
      'iwamizawa.hokkaido.jp': true,
      'iwanai.hokkaido.jp': true,
      'kamifurano.hokkaido.jp': true,
      'kamikawa.hokkaido.jp': true,
      'kamishihoro.hokkaido.jp': true,
      'kamisunagawa.hokkaido.jp': true,
      'kamoenai.hokkaido.jp': true,
      'kayabe.hokkaido.jp': true,
      'kembuchi.hokkaido.jp': true,
      'kikonai.hokkaido.jp': true,
      'kimobetsu.hokkaido.jp': true,
      'kitahiroshima.hokkaido.jp': true,
      'kitami.hokkaido.jp': true,
      'kiyosato.hokkaido.jp': true,
      'koshimizu.hokkaido.jp': true,
      'kunneppu.hokkaido.jp': true,
      'kuriyama.hokkaido.jp': true,
      'kuromatsunai.hokkaido.jp': true,
      'kushiro.hokkaido.jp': true,
      'kutchan.hokkaido.jp': true,
      'kyowa.hokkaido.jp': true,
      'mashike.hokkaido.jp': true,
      'matsumae.hokkaido.jp': true,
      'mikasa.hokkaido.jp': true,
      'minamifurano.hokkaido.jp': true,
      'mombetsu.hokkaido.jp': true,
      'moseushi.hokkaido.jp': true,
      'mukawa.hokkaido.jp': true,
      'muroran.hokkaido.jp': true,
      'naie.hokkaido.jp': true,
      'nakagawa.hokkaido.jp': true,
      'nakasatsunai.hokkaido.jp': true,
      'nakatombetsu.hokkaido.jp': true,
      'nanae.hokkaido.jp': true,
      'nanporo.hokkaido.jp': true,
      'nayoro.hokkaido.jp': true,
      'nemuro.hokkaido.jp': true,
      'niikappu.hokkaido.jp': true,
      'niki.hokkaido.jp': true,
      'nishiokoppe.hokkaido.jp': true,
      'noboribetsu.hokkaido.jp': true,
      'numata.hokkaido.jp': true,
      'obihiro.hokkaido.jp': true,
      'obira.hokkaido.jp': true,
      'oketo.hokkaido.jp': true,
      'okoppe.hokkaido.jp': true,
      'otaru.hokkaido.jp': true,
      'otobe.hokkaido.jp': true,
      'otofuke.hokkaido.jp': true,
      'otoineppu.hokkaido.jp': true,
      'oumu.hokkaido.jp': true,
      'ozora.hokkaido.jp': true,
      'pippu.hokkaido.jp': true,
      'rankoshi.hokkaido.jp': true,
      'rebun.hokkaido.jp': true,
      'rikubetsu.hokkaido.jp': true,
      'rishiri.hokkaido.jp': true,
      'rishirifuji.hokkaido.jp': true,
      'saroma.hokkaido.jp': true,
      'sarufutsu.hokkaido.jp': true,
      'shakotan.hokkaido.jp': true,
      'shari.hokkaido.jp': true,
      'shibecha.hokkaido.jp': true,
      'shibetsu.hokkaido.jp': true,
      'shikabe.hokkaido.jp': true,
      'shikaoi.hokkaido.jp': true,
      'shimamaki.hokkaido.jp': true,
      'shimizu.hokkaido.jp': true,
      'shimokawa.hokkaido.jp': true,
      'shinshinotsu.hokkaido.jp': true,
      'shintoku.hokkaido.jp': true,
      'shiranuka.hokkaido.jp': true,
      'shiraoi.hokkaido.jp': true,
      'shiriuchi.hokkaido.jp': true,
      'sobetsu.hokkaido.jp': true,
      'sunagawa.hokkaido.jp': true,
      'taiki.hokkaido.jp': true,
      'takasu.hokkaido.jp': true,
      'takikawa.hokkaido.jp': true,
      'takinoue.hokkaido.jp': true,
      'teshikaga.hokkaido.jp': true,
      'tobetsu.hokkaido.jp': true,
      'tohma.hokkaido.jp': true,
      'tomakomai.hokkaido.jp': true,
      'tomari.hokkaido.jp': true,
      'toya.hokkaido.jp': true,
      'toyako.hokkaido.jp': true,
      'toyotomi.hokkaido.jp': true,
      'toyoura.hokkaido.jp': true,
      'tsubetsu.hokkaido.jp': true,
      'tsukigata.hokkaido.jp': true,
      'urakawa.hokkaido.jp': true,
      'urausu.hokkaido.jp': true,
      'uryu.hokkaido.jp': true,
      'utashinai.hokkaido.jp': true,
      'wakkanai.hokkaido.jp': true,
      'wassamu.hokkaido.jp': true,
      'yakumo.hokkaido.jp': true,
      'yoichi.hokkaido.jp': true,
      'aioi.hyogo.jp': true,
      'akashi.hyogo.jp': true,
      'ako.hyogo.jp': true,
      'amagasaki.hyogo.jp': true,
      'aogaki.hyogo.jp': true,
      'asago.hyogo.jp': true,
      'ashiya.hyogo.jp': true,
      'awaji.hyogo.jp': true,
      'fukusaki.hyogo.jp': true,
      'goshiki.hyogo.jp': true,
      'harima.hyogo.jp': true,
      'himeji.hyogo.jp': true,
      'ichikawa.hyogo.jp': true,
      'inagawa.hyogo.jp': true,
      'itami.hyogo.jp': true,
      'kakogawa.hyogo.jp': true,
      'kamigori.hyogo.jp': true,
      'kamikawa.hyogo.jp': true,
      'kasai.hyogo.jp': true,
      'kasuga.hyogo.jp': true,
      'kawanishi.hyogo.jp': true,
      'miki.hyogo.jp': true,
      'minamiawaji.hyogo.jp': true,
      'nishinomiya.hyogo.jp': true,
      'nishiwaki.hyogo.jp': true,
      'ono.hyogo.jp': true,
      'sanda.hyogo.jp': true,
      'sannan.hyogo.jp': true,
      'sasayama.hyogo.jp': true,
      'sayo.hyogo.jp': true,
      'shingu.hyogo.jp': true,
      'shinonsen.hyogo.jp': true,
      'shiso.hyogo.jp': true,
      'sumoto.hyogo.jp': true,
      'taishi.hyogo.jp': true,
      'taka.hyogo.jp': true,
      'takarazuka.hyogo.jp': true,
      'takasago.hyogo.jp': true,
      'takino.hyogo.jp': true,
      'tamba.hyogo.jp': true,
      'tatsuno.hyogo.jp': true,
      'toyooka.hyogo.jp': true,
      'yabu.hyogo.jp': true,
      'yashiro.hyogo.jp': true,
      'yoka.hyogo.jp': true,
      'yokawa.hyogo.jp': true,
      'ami.ibaraki.jp': true,
      'asahi.ibaraki.jp': true,
      'bando.ibaraki.jp': true,
      'chikusei.ibaraki.jp': true,
      'daigo.ibaraki.jp': true,
      'fujishiro.ibaraki.jp': true,
      'hitachi.ibaraki.jp': true,
      'hitachinaka.ibaraki.jp': true,
      'hitachiomiya.ibaraki.jp': true,
      'hitachiota.ibaraki.jp': true,
      'ibaraki.ibaraki.jp': true,
      'ina.ibaraki.jp': true,
      'inashiki.ibaraki.jp': true,
      'itako.ibaraki.jp': true,
      'iwama.ibaraki.jp': true,
      'joso.ibaraki.jp': true,
      'kamisu.ibaraki.jp': true,
      'kasama.ibaraki.jp': true,
      'kashima.ibaraki.jp': true,
      'kasumigaura.ibaraki.jp': true,
      'koga.ibaraki.jp': true,
      'miho.ibaraki.jp': true,
      'mito.ibaraki.jp': true,
      'moriya.ibaraki.jp': true,
      'naka.ibaraki.jp': true,
      'namegata.ibaraki.jp': true,
      'oarai.ibaraki.jp': true,
      'ogawa.ibaraki.jp': true,
      'omitama.ibaraki.jp': true,
      'ryugasaki.ibaraki.jp': true,
      'sakai.ibaraki.jp': true,
      'sakuragawa.ibaraki.jp': true,
      'shimodate.ibaraki.jp': true,
      'shimotsuma.ibaraki.jp': true,
      'shirosato.ibaraki.jp': true,
      'sowa.ibaraki.jp': true,
      'suifu.ibaraki.jp': true,
      'takahagi.ibaraki.jp': true,
      'tamatsukuri.ibaraki.jp': true,
      'tokai.ibaraki.jp': true,
      'tomobe.ibaraki.jp': true,
      'tone.ibaraki.jp': true,
      'toride.ibaraki.jp': true,
      'tsuchiura.ibaraki.jp': true,
      'tsukuba.ibaraki.jp': true,
      'uchihara.ibaraki.jp': true,
      'ushiku.ibaraki.jp': true,
      'yachiyo.ibaraki.jp': true,
      'yamagata.ibaraki.jp': true,
      'yawara.ibaraki.jp': true,
      'yuki.ibaraki.jp': true,
      'anamizu.ishikawa.jp': true,
      'hakui.ishikawa.jp': true,
      'hakusan.ishikawa.jp': true,
      'kaga.ishikawa.jp': true,
      'kahoku.ishikawa.jp': true,
      'kanazawa.ishikawa.jp': true,
      'kawakita.ishikawa.jp': true,
      'komatsu.ishikawa.jp': true,
      'nakanoto.ishikawa.jp': true,
      'nanao.ishikawa.jp': true,
      'nomi.ishikawa.jp': true,
      'nonoichi.ishikawa.jp': true,
      'noto.ishikawa.jp': true,
      'shika.ishikawa.jp': true,
      'suzu.ishikawa.jp': true,
      'tsubata.ishikawa.jp': true,
      'tsurugi.ishikawa.jp': true,
      'uchinada.ishikawa.jp': true,
      'wajima.ishikawa.jp': true,
      'fudai.iwate.jp': true,
      'fujisawa.iwate.jp': true,
      'hanamaki.iwate.jp': true,
      'hiraizumi.iwate.jp': true,
      'hirono.iwate.jp': true,
      'ichinohe.iwate.jp': true,
      'ichinoseki.iwate.jp': true,
      'iwaizumi.iwate.jp': true,
      'iwate.iwate.jp': true,
      'joboji.iwate.jp': true,
      'kamaishi.iwate.jp': true,
      'kanegasaki.iwate.jp': true,
      'karumai.iwate.jp': true,
      'kawai.iwate.jp': true,
      'kitakami.iwate.jp': true,
      'kuji.iwate.jp': true,
      'kunohe.iwate.jp': true,
      'kuzumaki.iwate.jp': true,
      'miyako.iwate.jp': true,
      'mizusawa.iwate.jp': true,
      'morioka.iwate.jp': true,
      'ninohe.iwate.jp': true,
      'noda.iwate.jp': true,
      'ofunato.iwate.jp': true,
      'oshu.iwate.jp': true,
      'otsuchi.iwate.jp': true,
      'rikuzentakata.iwate.jp': true,
      'shiwa.iwate.jp': true,
      'shizukuishi.iwate.jp': true,
      'sumita.iwate.jp': true,
      'tanohata.iwate.jp': true,
      'tono.iwate.jp': true,
      'yahaba.iwate.jp': true,
      'yamada.iwate.jp': true,
      'ayagawa.kagawa.jp': true,
      'higashikagawa.kagawa.jp': true,
      'kanonji.kagawa.jp': true,
      'kotohira.kagawa.jp': true,
      'manno.kagawa.jp': true,
      'marugame.kagawa.jp': true,
      'mitoyo.kagawa.jp': true,
      'naoshima.kagawa.jp': true,
      'sanuki.kagawa.jp': true,
      'tadotsu.kagawa.jp': true,
      'takamatsu.kagawa.jp': true,
      'tonosho.kagawa.jp': true,
      'uchinomi.kagawa.jp': true,
      'utazu.kagawa.jp': true,
      'zentsuji.kagawa.jp': true,
      'akune.kagoshima.jp': true,
      'amami.kagoshima.jp': true,
      'hioki.kagoshima.jp': true,
      'isa.kagoshima.jp': true,
      'isen.kagoshima.jp': true,
      'izumi.kagoshima.jp': true,
      'kagoshima.kagoshima.jp': true,
      'kanoya.kagoshima.jp': true,
      'kawanabe.kagoshima.jp': true,
      'kinko.kagoshima.jp': true,
      'kouyama.kagoshima.jp': true,
      'makurazaki.kagoshima.jp': true,
      'matsumoto.kagoshima.jp': true,
      'minamitane.kagoshima.jp': true,
      'nakatane.kagoshima.jp': true,
      'nishinoomote.kagoshima.jp': true,
      'satsumasendai.kagoshima.jp': true,
      'soo.kagoshima.jp': true,
      'tarumizu.kagoshima.jp': true,
      'yusui.kagoshima.jp': true,
      'aikawa.kanagawa.jp': true,
      'atsugi.kanagawa.jp': true,
      'ayase.kanagawa.jp': true,
      'chigasaki.kanagawa.jp': true,
      'ebina.kanagawa.jp': true,
      'fujisawa.kanagawa.jp': true,
      'hadano.kanagawa.jp': true,
      'hakone.kanagawa.jp': true,
      'hiratsuka.kanagawa.jp': true,
      'isehara.kanagawa.jp': true,
      'kaisei.kanagawa.jp': true,
      'kamakura.kanagawa.jp': true,
      'kiyokawa.kanagawa.jp': true,
      'matsuda.kanagawa.jp': true,
      'minamiashigara.kanagawa.jp': true,
      'miura.kanagawa.jp': true,
      'nakai.kanagawa.jp': true,
      'ninomiya.kanagawa.jp': true,
      'odawara.kanagawa.jp': true,
      'oi.kanagawa.jp': true,
      'oiso.kanagawa.jp': true,
      'sagamihara.kanagawa.jp': true,
      'samukawa.kanagawa.jp': true,
      'tsukui.kanagawa.jp': true,
      'yamakita.kanagawa.jp': true,
      'yamato.kanagawa.jp': true,
      'yokosuka.kanagawa.jp': true,
      'yugawara.kanagawa.jp': true,
      'zama.kanagawa.jp': true,
      'zushi.kanagawa.jp': true,
      'aki.kochi.jp': true,
      'geisei.kochi.jp': true,
      'hidaka.kochi.jp': true,
      'higashitsuno.kochi.jp': true,
      'ino.kochi.jp': true,
      'kagami.kochi.jp': true,
      'kami.kochi.jp': true,
      'kitagawa.kochi.jp': true,
      'kochi.kochi.jp': true,
      'mihara.kochi.jp': true,
      'motoyama.kochi.jp': true,
      'muroto.kochi.jp': true,
      'nahari.kochi.jp': true,
      'nakamura.kochi.jp': true,
      'nankoku.kochi.jp': true,
      'nishitosa.kochi.jp': true,
      'niyodogawa.kochi.jp': true,
      'ochi.kochi.jp': true,
      'okawa.kochi.jp': true,
      'otoyo.kochi.jp': true,
      'otsuki.kochi.jp': true,
      'sakawa.kochi.jp': true,
      'sukumo.kochi.jp': true,
      'susaki.kochi.jp': true,
      'tosa.kochi.jp': true,
      'tosashimizu.kochi.jp': true,
      'toyo.kochi.jp': true,
      'tsuno.kochi.jp': true,
      'umaji.kochi.jp': true,
      'yasuda.kochi.jp': true,
      'yusuhara.kochi.jp': true,
      'amakusa.kumamoto.jp': true,
      'arao.kumamoto.jp': true,
      'aso.kumamoto.jp': true,
      'choyo.kumamoto.jp': true,
      'gyokuto.kumamoto.jp': true,
      'kamiamakusa.kumamoto.jp': true,
      'kikuchi.kumamoto.jp': true,
      'kumamoto.kumamoto.jp': true,
      'mashiki.kumamoto.jp': true,
      'mifune.kumamoto.jp': true,
      'minamata.kumamoto.jp': true,
      'minamioguni.kumamoto.jp': true,
      'nagasu.kumamoto.jp': true,
      'nishihara.kumamoto.jp': true,
      'oguni.kumamoto.jp': true,
      'ozu.kumamoto.jp': true,
      'sumoto.kumamoto.jp': true,
      'takamori.kumamoto.jp': true,
      'uki.kumamoto.jp': true,
      'uto.kumamoto.jp': true,
      'yamaga.kumamoto.jp': true,
      'yamato.kumamoto.jp': true,
      'yatsushiro.kumamoto.jp': true,
      'ayabe.kyoto.jp': true,
      'fukuchiyama.kyoto.jp': true,
      'higashiyama.kyoto.jp': true,
      'ide.kyoto.jp': true,
      'ine.kyoto.jp': true,
      'joyo.kyoto.jp': true,
      'kameoka.kyoto.jp': true,
      'kamo.kyoto.jp': true,
      'kita.kyoto.jp': true,
      'kizu.kyoto.jp': true,
      'kumiyama.kyoto.jp': true,
      'kyotamba.kyoto.jp': true,
      'kyotanabe.kyoto.jp': true,
      'kyotango.kyoto.jp': true,
      'maizuru.kyoto.jp': true,
      'minami.kyoto.jp': true,
      'minamiyamashiro.kyoto.jp': true,
      'miyazu.kyoto.jp': true,
      'muko.kyoto.jp': true,
      'nagaokakyo.kyoto.jp': true,
      'nakagyo.kyoto.jp': true,
      'nantan.kyoto.jp': true,
      'oyamazaki.kyoto.jp': true,
      'sakyo.kyoto.jp': true,
      'seika.kyoto.jp': true,
      'tanabe.kyoto.jp': true,
      'uji.kyoto.jp': true,
      'ujitawara.kyoto.jp': true,
      'wazuka.kyoto.jp': true,
      'yamashina.kyoto.jp': true,
      'yawata.kyoto.jp': true,
      'asahi.mie.jp': true,
      'inabe.mie.jp': true,
      'ise.mie.jp': true,
      'kameyama.mie.jp': true,
      'kawagoe.mie.jp': true,
      'kiho.mie.jp': true,
      'kisosaki.mie.jp': true,
      'kiwa.mie.jp': true,
      'komono.mie.jp': true,
      'kumano.mie.jp': true,
      'kuwana.mie.jp': true,
      'matsusaka.mie.jp': true,
      'meiwa.mie.jp': true,
      'mihama.mie.jp': true,
      'minamiise.mie.jp': true,
      'misugi.mie.jp': true,
      'miyama.mie.jp': true,
      'nabari.mie.jp': true,
      'shima.mie.jp': true,
      'suzuka.mie.jp': true,
      'tado.mie.jp': true,
      'taiki.mie.jp': true,
      'taki.mie.jp': true,
      'tamaki.mie.jp': true,
      'toba.mie.jp': true,
      'tsu.mie.jp': true,
      'udono.mie.jp': true,
      'ureshino.mie.jp': true,
      'watarai.mie.jp': true,
      'yokkaichi.mie.jp': true,
      'furukawa.miyagi.jp': true,
      'higashimatsushima.miyagi.jp': true,
      'ishinomaki.miyagi.jp': true,
      'iwanuma.miyagi.jp': true,
      'kakuda.miyagi.jp': true,
      'kami.miyagi.jp': true,
      'kawasaki.miyagi.jp': true,
      'marumori.miyagi.jp': true,
      'matsushima.miyagi.jp': true,
      'minamisanriku.miyagi.jp': true,
      'misato.miyagi.jp': true,
      'murata.miyagi.jp': true,
      'natori.miyagi.jp': true,
      'ogawara.miyagi.jp': true,
      'ohira.miyagi.jp': true,
      'onagawa.miyagi.jp': true,
      'osaki.miyagi.jp': true,
      'rifu.miyagi.jp': true,
      'semine.miyagi.jp': true,
      'shibata.miyagi.jp': true,
      'shichikashuku.miyagi.jp': true,
      'shikama.miyagi.jp': true,
      'shiogama.miyagi.jp': true,
      'shiroishi.miyagi.jp': true,
      'tagajo.miyagi.jp': true,
      'taiwa.miyagi.jp': true,
      'tome.miyagi.jp': true,
      'tomiya.miyagi.jp': true,
      'wakuya.miyagi.jp': true,
      'watari.miyagi.jp': true,
      'yamamoto.miyagi.jp': true,
      'zao.miyagi.jp': true,
      'aya.miyazaki.jp': true,
      'ebino.miyazaki.jp': true,
      'gokase.miyazaki.jp': true,
      'hyuga.miyazaki.jp': true,
      'kadogawa.miyazaki.jp': true,
      'kawaminami.miyazaki.jp': true,
      'kijo.miyazaki.jp': true,
      'kitagawa.miyazaki.jp': true,
      'kitakata.miyazaki.jp': true,
      'kitaura.miyazaki.jp': true,
      'kobayashi.miyazaki.jp': true,
      'kunitomi.miyazaki.jp': true,
      'kushima.miyazaki.jp': true,
      'mimata.miyazaki.jp': true,
      'miyakonojo.miyazaki.jp': true,
      'miyazaki.miyazaki.jp': true,
      'morotsuka.miyazaki.jp': true,
      'nichinan.miyazaki.jp': true,
      'nishimera.miyazaki.jp': true,
      'nobeoka.miyazaki.jp': true,
      'saito.miyazaki.jp': true,
      'shiiba.miyazaki.jp': true,
      'shintomi.miyazaki.jp': true,
      'takaharu.miyazaki.jp': true,
      'takanabe.miyazaki.jp': true,
      'takazaki.miyazaki.jp': true,
      'tsuno.miyazaki.jp': true,
      'achi.nagano.jp': true,
      'agematsu.nagano.jp': true,
      'anan.nagano.jp': true,
      'aoki.nagano.jp': true,
      'asahi.nagano.jp': true,
      'azumino.nagano.jp': true,
      'chikuhoku.nagano.jp': true,
      'chikuma.nagano.jp': true,
      'chino.nagano.jp': true,
      'fujimi.nagano.jp': true,
      'hakuba.nagano.jp': true,
      'hara.nagano.jp': true,
      'hiraya.nagano.jp': true,
      'iida.nagano.jp': true,
      'iijima.nagano.jp': true,
      'iiyama.nagano.jp': true,
      'iizuna.nagano.jp': true,
      'ikeda.nagano.jp': true,
      'ikusaka.nagano.jp': true,
      'ina.nagano.jp': true,
      'karuizawa.nagano.jp': true,
      'kawakami.nagano.jp': true,
      'kiso.nagano.jp': true,
      'kisofukushima.nagano.jp': true,
      'kitaaiki.nagano.jp': true,
      'komagane.nagano.jp': true,
      'komoro.nagano.jp': true,
      'matsukawa.nagano.jp': true,
      'matsumoto.nagano.jp': true,
      'miasa.nagano.jp': true,
      'minamiaiki.nagano.jp': true,
      'minamimaki.nagano.jp': true,
      'minamiminowa.nagano.jp': true,
      'minowa.nagano.jp': true,
      'miyada.nagano.jp': true,
      'miyota.nagano.jp': true,
      'mochizuki.nagano.jp': true,
      'nagano.nagano.jp': true,
      'nagawa.nagano.jp': true,
      'nagiso.nagano.jp': true,
      'nakagawa.nagano.jp': true,
      'nakano.nagano.jp': true,
      'nozawaonsen.nagano.jp': true,
      'obuse.nagano.jp': true,
      'ogawa.nagano.jp': true,
      'okaya.nagano.jp': true,
      'omachi.nagano.jp': true,
      'omi.nagano.jp': true,
      'ookuwa.nagano.jp': true,
      'ooshika.nagano.jp': true,
      'otaki.nagano.jp': true,
      'otari.nagano.jp': true,
      'sakae.nagano.jp': true,
      'sakaki.nagano.jp': true,
      'saku.nagano.jp': true,
      'sakuho.nagano.jp': true,
      'shimosuwa.nagano.jp': true,
      'shinanomachi.nagano.jp': true,
      'shiojiri.nagano.jp': true,
      'suwa.nagano.jp': true,
      'suzaka.nagano.jp': true,
      'takagi.nagano.jp': true,
      'takamori.nagano.jp': true,
      'takayama.nagano.jp': true,
      'tateshina.nagano.jp': true,
      'tatsuno.nagano.jp': true,
      'togakushi.nagano.jp': true,
      'togura.nagano.jp': true,
      'tomi.nagano.jp': true,
      'ueda.nagano.jp': true,
      'wada.nagano.jp': true,
      'yamagata.nagano.jp': true,
      'yamanouchi.nagano.jp': true,
      'yasaka.nagano.jp': true,
      'yasuoka.nagano.jp': true,
      'chijiwa.nagasaki.jp': true,
      'futsu.nagasaki.jp': true,
      'goto.nagasaki.jp': true,
      'hasami.nagasaki.jp': true,
      'hirado.nagasaki.jp': true,
      'iki.nagasaki.jp': true,
      'isahaya.nagasaki.jp': true,
      'kawatana.nagasaki.jp': true,
      'kuchinotsu.nagasaki.jp': true,
      'matsuura.nagasaki.jp': true,
      'nagasaki.nagasaki.jp': true,
      'obama.nagasaki.jp': true,
      'omura.nagasaki.jp': true,
      'oseto.nagasaki.jp': true,
      'saikai.nagasaki.jp': true,
      'sasebo.nagasaki.jp': true,
      'seihi.nagasaki.jp': true,
      'shimabara.nagasaki.jp': true,
      'shinkamigoto.nagasaki.jp': true,
      'togitsu.nagasaki.jp': true,
      'tsushima.nagasaki.jp': true,
      'unzen.nagasaki.jp': true,
      'ando.nara.jp': true,
      'gose.nara.jp': true,
      'heguri.nara.jp': true,
      'higashiyoshino.nara.jp': true,
      'ikaruga.nara.jp': true,
      'ikoma.nara.jp': true,
      'kamikitayama.nara.jp': true,
      'kanmaki.nara.jp': true,
      'kashiba.nara.jp': true,
      'kashihara.nara.jp': true,
      'katsuragi.nara.jp': true,
      'kawai.nara.jp': true,
      'kawakami.nara.jp': true,
      'kawanishi.nara.jp': true,
      'koryo.nara.jp': true,
      'kurotaki.nara.jp': true,
      'mitsue.nara.jp': true,
      'miyake.nara.jp': true,
      'nara.nara.jp': true,
      'nosegawa.nara.jp': true,
      'oji.nara.jp': true,
      'ouda.nara.jp': true,
      'oyodo.nara.jp': true,
      'sakurai.nara.jp': true,
      'sango.nara.jp': true,
      'shimoichi.nara.jp': true,
      'shimokitayama.nara.jp': true,
      'shinjo.nara.jp': true,
      'soni.nara.jp': true,
      'takatori.nara.jp': true,
      'tawaramoto.nara.jp': true,
      'tenkawa.nara.jp': true,
      'tenri.nara.jp': true,
      'uda.nara.jp': true,
      'yamatokoriyama.nara.jp': true,
      'yamatotakada.nara.jp': true,
      'yamazoe.nara.jp': true,
      'yoshino.nara.jp': true,
      'aga.niigata.jp': true,
      'agano.niigata.jp': true,
      'gosen.niigata.jp': true,
      'itoigawa.niigata.jp': true,
      'izumozaki.niigata.jp': true,
      'joetsu.niigata.jp': true,
      'kamo.niigata.jp': true,
      'kariwa.niigata.jp': true,
      'kashiwazaki.niigata.jp': true,
      'minamiuonuma.niigata.jp': true,
      'mitsuke.niigata.jp': true,
      'muika.niigata.jp': true,
      'murakami.niigata.jp': true,
      'myoko.niigata.jp': true,
      'nagaoka.niigata.jp': true,
      'niigata.niigata.jp': true,
      'ojiya.niigata.jp': true,
      'omi.niigata.jp': true,
      'sado.niigata.jp': true,
      'sanjo.niigata.jp': true,
      'seiro.niigata.jp': true,
      'seirou.niigata.jp': true,
      'sekikawa.niigata.jp': true,
      'shibata.niigata.jp': true,
      'tagami.niigata.jp': true,
      'tainai.niigata.jp': true,
      'tochio.niigata.jp': true,
      'tokamachi.niigata.jp': true,
      'tsubame.niigata.jp': true,
      'tsunan.niigata.jp': true,
      'uonuma.niigata.jp': true,
      'yahiko.niigata.jp': true,
      'yoita.niigata.jp': true,
      'yuzawa.niigata.jp': true,
      'beppu.oita.jp': true,
      'bungoono.oita.jp': true,
      'bungotakada.oita.jp': true,
      'hasama.oita.jp': true,
      'hiji.oita.jp': true,
      'himeshima.oita.jp': true,
      'hita.oita.jp': true,
      'kamitsue.oita.jp': true,
      'kokonoe.oita.jp': true,
      'kuju.oita.jp': true,
      'kunisaki.oita.jp': true,
      'kusu.oita.jp': true,
      'oita.oita.jp': true,
      'saiki.oita.jp': true,
      'taketa.oita.jp': true,
      'tsukumi.oita.jp': true,
      'usa.oita.jp': true,
      'usuki.oita.jp': true,
      'yufu.oita.jp': true,
      'akaiwa.okayama.jp': true,
      'asakuchi.okayama.jp': true,
      'bizen.okayama.jp': true,
      'hayashima.okayama.jp': true,
      'ibara.okayama.jp': true,
      'kagamino.okayama.jp': true,
      'kasaoka.okayama.jp': true,
      'kibichuo.okayama.jp': true,
      'kumenan.okayama.jp': true,
      'kurashiki.okayama.jp': true,
      'maniwa.okayama.jp': true,
      'misaki.okayama.jp': true,
      'nagi.okayama.jp': true,
      'niimi.okayama.jp': true,
      'nishiawakura.okayama.jp': true,
      'okayama.okayama.jp': true,
      'satosho.okayama.jp': true,
      'setouchi.okayama.jp': true,
      'shinjo.okayama.jp': true,
      'shoo.okayama.jp': true,
      'soja.okayama.jp': true,
      'takahashi.okayama.jp': true,
      'tamano.okayama.jp': true,
      'tsuyama.okayama.jp': true,
      'wake.okayama.jp': true,
      'yakage.okayama.jp': true,
      'aguni.okinawa.jp': true,
      'ginowan.okinawa.jp': true,
      'ginoza.okinawa.jp': true,
      'gushikami.okinawa.jp': true,
      'haebaru.okinawa.jp': true,
      'higashi.okinawa.jp': true,
      'hirara.okinawa.jp': true,
      'iheya.okinawa.jp': true,
      'ishigaki.okinawa.jp': true,
      'ishikawa.okinawa.jp': true,
      'itoman.okinawa.jp': true,
      'izena.okinawa.jp': true,
      'kadena.okinawa.jp': true,
      'kin.okinawa.jp': true,
      'kitadaito.okinawa.jp': true,
      'kitanakagusuku.okinawa.jp': true,
      'kumejima.okinawa.jp': true,
      'kunigami.okinawa.jp': true,
      'minamidaito.okinawa.jp': true,
      'motobu.okinawa.jp': true,
      'nago.okinawa.jp': true,
      'naha.okinawa.jp': true,
      'nakagusuku.okinawa.jp': true,
      'nakijin.okinawa.jp': true,
      'nanjo.okinawa.jp': true,
      'nishihara.okinawa.jp': true,
      'ogimi.okinawa.jp': true,
      'okinawa.okinawa.jp': true,
      'onna.okinawa.jp': true,
      'shimoji.okinawa.jp': true,
      'taketomi.okinawa.jp': true,
      'tarama.okinawa.jp': true,
      'tokashiki.okinawa.jp': true,
      'tomigusuku.okinawa.jp': true,
      'tonaki.okinawa.jp': true,
      'urasoe.okinawa.jp': true,
      'uruma.okinawa.jp': true,
      'yaese.okinawa.jp': true,
      'yomitan.okinawa.jp': true,
      'yonabaru.okinawa.jp': true,
      'yonaguni.okinawa.jp': true,
      'zamami.okinawa.jp': true,
      'abeno.osaka.jp': true,
      'chihayaakasaka.osaka.jp': true,
      'chuo.osaka.jp': true,
      'daito.osaka.jp': true,
      'fujiidera.osaka.jp': true,
      'habikino.osaka.jp': true,
      'hannan.osaka.jp': true,
      'higashiosaka.osaka.jp': true,
      'higashisumiyoshi.osaka.jp': true,
      'higashiyodogawa.osaka.jp': true,
      'hirakata.osaka.jp': true,
      'ibaraki.osaka.jp': true,
      'ikeda.osaka.jp': true,
      'izumi.osaka.jp': true,
      'izumiotsu.osaka.jp': true,
      'izumisano.osaka.jp': true,
      'kadoma.osaka.jp': true,
      'kaizuka.osaka.jp': true,
      'kanan.osaka.jp': true,
      'kashiwara.osaka.jp': true,
      'katano.osaka.jp': true,
      'kawachinagano.osaka.jp': true,
      'kishiwada.osaka.jp': true,
      'kita.osaka.jp': true,
      'kumatori.osaka.jp': true,
      'matsubara.osaka.jp': true,
      'minato.osaka.jp': true,
      'minoh.osaka.jp': true,
      'misaki.osaka.jp': true,
      'moriguchi.osaka.jp': true,
      'neyagawa.osaka.jp': true,
      'nishi.osaka.jp': true,
      'nose.osaka.jp': true,
      'osakasayama.osaka.jp': true,
      'sakai.osaka.jp': true,
      'sayama.osaka.jp': true,
      'sennan.osaka.jp': true,
      'settsu.osaka.jp': true,
      'shijonawate.osaka.jp': true,
      'shimamoto.osaka.jp': true,
      'suita.osaka.jp': true,
      'tadaoka.osaka.jp': true,
      'taishi.osaka.jp': true,
      'tajiri.osaka.jp': true,
      'takaishi.osaka.jp': true,
      'takatsuki.osaka.jp': true,
      'tondabayashi.osaka.jp': true,
      'toyonaka.osaka.jp': true,
      'toyono.osaka.jp': true,
      'yao.osaka.jp': true,
      'ariake.saga.jp': true,
      'arita.saga.jp': true,
      'fukudomi.saga.jp': true,
      'genkai.saga.jp': true,
      'hamatama.saga.jp': true,
      'hizen.saga.jp': true,
      'imari.saga.jp': true,
      'kamimine.saga.jp': true,
      'kanzaki.saga.jp': true,
      'karatsu.saga.jp': true,
      'kashima.saga.jp': true,
      'kitagata.saga.jp': true,
      'kitahata.saga.jp': true,
      'kiyama.saga.jp': true,
      'kouhoku.saga.jp': true,
      'kyuragi.saga.jp': true,
      'nishiarita.saga.jp': true,
      'ogi.saga.jp': true,
      'omachi.saga.jp': true,
      'ouchi.saga.jp': true,
      'saga.saga.jp': true,
      'shiroishi.saga.jp': true,
      'taku.saga.jp': true,
      'tara.saga.jp': true,
      'tosu.saga.jp': true,
      'yoshinogari.saga.jp': true,
      'arakawa.saitama.jp': true,
      'asaka.saitama.jp': true,
      'chichibu.saitama.jp': true,
      'fujimi.saitama.jp': true,
      'fujimino.saitama.jp': true,
      'fukaya.saitama.jp': true,
      'hanno.saitama.jp': true,
      'hanyu.saitama.jp': true,
      'hasuda.saitama.jp': true,
      'hatogaya.saitama.jp': true,
      'hatoyama.saitama.jp': true,
      'hidaka.saitama.jp': true,
      'higashichichibu.saitama.jp': true,
      'higashimatsuyama.saitama.jp': true,
      'honjo.saitama.jp': true,
      'ina.saitama.jp': true,
      'iruma.saitama.jp': true,
      'iwatsuki.saitama.jp': true,
      'kamiizumi.saitama.jp': true,
      'kamikawa.saitama.jp': true,
      'kamisato.saitama.jp': true,
      'kasukabe.saitama.jp': true,
      'kawagoe.saitama.jp': true,
      'kawaguchi.saitama.jp': true,
      'kawajima.saitama.jp': true,
      'kazo.saitama.jp': true,
      'kitamoto.saitama.jp': true,
      'koshigaya.saitama.jp': true,
      'kounosu.saitama.jp': true,
      'kuki.saitama.jp': true,
      'kumagaya.saitama.jp': true,
      'matsubushi.saitama.jp': true,
      'minano.saitama.jp': true,
      'misato.saitama.jp': true,
      'miyashiro.saitama.jp': true,
      'miyoshi.saitama.jp': true,
      'moroyama.saitama.jp': true,
      'nagatoro.saitama.jp': true,
      'namegawa.saitama.jp': true,
      'niiza.saitama.jp': true,
      'ogano.saitama.jp': true,
      'ogawa.saitama.jp': true,
      'ogose.saitama.jp': true,
      'okegawa.saitama.jp': true,
      'omiya.saitama.jp': true,
      'otaki.saitama.jp': true,
      'ranzan.saitama.jp': true,
      'ryokami.saitama.jp': true,
      'saitama.saitama.jp': true,
      'sakado.saitama.jp': true,
      'satte.saitama.jp': true,
      'sayama.saitama.jp': true,
      'shiki.saitama.jp': true,
      'shiraoka.saitama.jp': true,
      'soka.saitama.jp': true,
      'sugito.saitama.jp': true,
      'toda.saitama.jp': true,
      'tokigawa.saitama.jp': true,
      'tokorozawa.saitama.jp': true,
      'tsurugashima.saitama.jp': true,
      'urawa.saitama.jp': true,
      'warabi.saitama.jp': true,
      'yashio.saitama.jp': true,
      'yokoze.saitama.jp': true,
      'yono.saitama.jp': true,
      'yorii.saitama.jp': true,
      'yoshida.saitama.jp': true,
      'yoshikawa.saitama.jp': true,
      'yoshimi.saitama.jp': true,
      'aisho.shiga.jp': true,
      'gamo.shiga.jp': true,
      'higashiomi.shiga.jp': true,
      'hikone.shiga.jp': true,
      'koka.shiga.jp': true,
      'konan.shiga.jp': true,
      'kosei.shiga.jp': true,
      'koto.shiga.jp': true,
      'kusatsu.shiga.jp': true,
      'maibara.shiga.jp': true,
      'moriyama.shiga.jp': true,
      'nagahama.shiga.jp': true,
      'nishiazai.shiga.jp': true,
      'notogawa.shiga.jp': true,
      'omihachiman.shiga.jp': true,
      'otsu.shiga.jp': true,
      'ritto.shiga.jp': true,
      'ryuoh.shiga.jp': true,
      'takashima.shiga.jp': true,
      'takatsuki.shiga.jp': true,
      'torahime.shiga.jp': true,
      'toyosato.shiga.jp': true,
      'yasu.shiga.jp': true,
      'akagi.shimane.jp': true,
      'ama.shimane.jp': true,
      'gotsu.shimane.jp': true,
      'hamada.shimane.jp': true,
      'higashiizumo.shimane.jp': true,
      'hikawa.shimane.jp': true,
      'hikimi.shimane.jp': true,
      'izumo.shimane.jp': true,
      'kakinoki.shimane.jp': true,
      'masuda.shimane.jp': true,
      'matsue.shimane.jp': true,
      'misato.shimane.jp': true,
      'nishinoshima.shimane.jp': true,
      'ohda.shimane.jp': true,
      'okinoshima.shimane.jp': true,
      'okuizumo.shimane.jp': true,
      'shimane.shimane.jp': true,
      'tamayu.shimane.jp': true,
      'tsuwano.shimane.jp': true,
      'unnan.shimane.jp': true,
      'yakumo.shimane.jp': true,
      'yasugi.shimane.jp': true,
      'yatsuka.shimane.jp': true,
      'arai.shizuoka.jp': true,
      'atami.shizuoka.jp': true,
      'fuji.shizuoka.jp': true,
      'fujieda.shizuoka.jp': true,
      'fujikawa.shizuoka.jp': true,
      'fujinomiya.shizuoka.jp': true,
      'fukuroi.shizuoka.jp': true,
      'gotemba.shizuoka.jp': true,
      'haibara.shizuoka.jp': true,
      'hamamatsu.shizuoka.jp': true,
      'higashiizu.shizuoka.jp': true,
      'ito.shizuoka.jp': true,
      'iwata.shizuoka.jp': true,
      'izu.shizuoka.jp': true,
      'izunokuni.shizuoka.jp': true,
      'kakegawa.shizuoka.jp': true,
      'kannami.shizuoka.jp': true,
      'kawanehon.shizuoka.jp': true,
      'kawazu.shizuoka.jp': true,
      'kikugawa.shizuoka.jp': true,
      'kosai.shizuoka.jp': true,
      'makinohara.shizuoka.jp': true,
      'matsuzaki.shizuoka.jp': true,
      'minamiizu.shizuoka.jp': true,
      'mishima.shizuoka.jp': true,
      'morimachi.shizuoka.jp': true,
      'nishiizu.shizuoka.jp': true,
      'numazu.shizuoka.jp': true,
      'omaezaki.shizuoka.jp': true,
      'shimada.shizuoka.jp': true,
      'shimizu.shizuoka.jp': true,
      'shimoda.shizuoka.jp': true,
      'shizuoka.shizuoka.jp': true,
      'susono.shizuoka.jp': true,
      'yaizu.shizuoka.jp': true,
      'yoshida.shizuoka.jp': true,
      'ashikaga.tochigi.jp': true,
      'bato.tochigi.jp': true,
      'haga.tochigi.jp': true,
      'ichikai.tochigi.jp': true,
      'iwafune.tochigi.jp': true,
      'kaminokawa.tochigi.jp': true,
      'kanuma.tochigi.jp': true,
      'karasuyama.tochigi.jp': true,
      'kuroiso.tochigi.jp': true,
      'mashiko.tochigi.jp': true,
      'mibu.tochigi.jp': true,
      'moka.tochigi.jp': true,
      'motegi.tochigi.jp': true,
      'nasu.tochigi.jp': true,
      'nasushiobara.tochigi.jp': true,
      'nikko.tochigi.jp': true,
      'nishikata.tochigi.jp': true,
      'nogi.tochigi.jp': true,
      'ohira.tochigi.jp': true,
      'ohtawara.tochigi.jp': true,
      'oyama.tochigi.jp': true,
      'sakura.tochigi.jp': true,
      'sano.tochigi.jp': true,
      'shimotsuke.tochigi.jp': true,
      'shioya.tochigi.jp': true,
      'takanezawa.tochigi.jp': true,
      'tochigi.tochigi.jp': true,
      'tsuga.tochigi.jp': true,
      'ujiie.tochigi.jp': true,
      'utsunomiya.tochigi.jp': true,
      'yaita.tochigi.jp': true,
      'aizumi.tokushima.jp': true,
      'anan.tokushima.jp': true,
      'ichiba.tokushima.jp': true,
      'itano.tokushima.jp': true,
      'kainan.tokushima.jp': true,
      'komatsushima.tokushima.jp': true,
      'matsushige.tokushima.jp': true,
      'mima.tokushima.jp': true,
      'minami.tokushima.jp': true,
      'miyoshi.tokushima.jp': true,
      'mugi.tokushima.jp': true,
      'nakagawa.tokushima.jp': true,
      'naruto.tokushima.jp': true,
      'sanagochi.tokushima.jp': true,
      'shishikui.tokushima.jp': true,
      'tokushima.tokushima.jp': true,
      'wajiki.tokushima.jp': true,
      'adachi.tokyo.jp': true,
      'akiruno.tokyo.jp': true,
      'akishima.tokyo.jp': true,
      'aogashima.tokyo.jp': true,
      'arakawa.tokyo.jp': true,
      'bunkyo.tokyo.jp': true,
      'chiyoda.tokyo.jp': true,
      'chofu.tokyo.jp': true,
      'chuo.tokyo.jp': true,
      'edogawa.tokyo.jp': true,
      'fuchu.tokyo.jp': true,
      'fussa.tokyo.jp': true,
      'hachijo.tokyo.jp': true,
      'hachioji.tokyo.jp': true,
      'hamura.tokyo.jp': true,
      'higashikurume.tokyo.jp': true,
      'higashimurayama.tokyo.jp': true,
      'higashiyamato.tokyo.jp': true,
      'hino.tokyo.jp': true,
      'hinode.tokyo.jp': true,
      'hinohara.tokyo.jp': true,
      'inagi.tokyo.jp': true,
      'itabashi.tokyo.jp': true,
      'katsushika.tokyo.jp': true,
      'kita.tokyo.jp': true,
      'kiyose.tokyo.jp': true,
      'kodaira.tokyo.jp': true,
      'koganei.tokyo.jp': true,
      'kokubunji.tokyo.jp': true,
      'komae.tokyo.jp': true,
      'koto.tokyo.jp': true,
      'kouzushima.tokyo.jp': true,
      'kunitachi.tokyo.jp': true,
      'machida.tokyo.jp': true,
      'meguro.tokyo.jp': true,
      'minato.tokyo.jp': true,
      'mitaka.tokyo.jp': true,
      'mizuho.tokyo.jp': true,
      'musashimurayama.tokyo.jp': true,
      'musashino.tokyo.jp': true,
      'nakano.tokyo.jp': true,
      'nerima.tokyo.jp': true,
      'ogasawara.tokyo.jp': true,
      'okutama.tokyo.jp': true,
      'ome.tokyo.jp': true,
      'oshima.tokyo.jp': true,
      'ota.tokyo.jp': true,
      'setagaya.tokyo.jp': true,
      'shibuya.tokyo.jp': true,
      'shinagawa.tokyo.jp': true,
      'shinjuku.tokyo.jp': true,
      'suginami.tokyo.jp': true,
      'sumida.tokyo.jp': true,
      'tachikawa.tokyo.jp': true,
      'taito.tokyo.jp': true,
      'tama.tokyo.jp': true,
      'toshima.tokyo.jp': true,
      'chizu.tottori.jp': true,
      'hino.tottori.jp': true,
      'kawahara.tottori.jp': true,
      'koge.tottori.jp': true,
      'kotoura.tottori.jp': true,
      'misasa.tottori.jp': true,
      'nanbu.tottori.jp': true,
      'nichinan.tottori.jp': true,
      'sakaiminato.tottori.jp': true,
      'tottori.tottori.jp': true,
      'wakasa.tottori.jp': true,
      'yazu.tottori.jp': true,
      'yonago.tottori.jp': true,
      'asahi.toyama.jp': true,
      'fuchu.toyama.jp': true,
      'fukumitsu.toyama.jp': true,
      'funahashi.toyama.jp': true,
      'himi.toyama.jp': true,
      'imizu.toyama.jp': true,
      'inami.toyama.jp': true,
      'johana.toyama.jp': true,
      'kamiichi.toyama.jp': true,
      'kurobe.toyama.jp': true,
      'nakaniikawa.toyama.jp': true,
      'namerikawa.toyama.jp': true,
      'nanto.toyama.jp': true,
      'nyuzen.toyama.jp': true,
      'oyabe.toyama.jp': true,
      'taira.toyama.jp': true,
      'takaoka.toyama.jp': true,
      'tateyama.toyama.jp': true,
      'toga.toyama.jp': true,
      'tonami.toyama.jp': true,
      'toyama.toyama.jp': true,
      'unazuki.toyama.jp': true,
      'uozu.toyama.jp': true,
      'yamada.toyama.jp': true,
      'arida.wakayama.jp': true,
      'aridagawa.wakayama.jp': true,
      'gobo.wakayama.jp': true,
      'hashimoto.wakayama.jp': true,
      'hidaka.wakayama.jp': true,
      'hirogawa.wakayama.jp': true,
      'inami.wakayama.jp': true,
      'iwade.wakayama.jp': true,
      'kainan.wakayama.jp': true,
      'kamitonda.wakayama.jp': true,
      'katsuragi.wakayama.jp': true,
      'kimino.wakayama.jp': true,
      'kinokawa.wakayama.jp': true,
      'kitayama.wakayama.jp': true,
      'koya.wakayama.jp': true,
      'koza.wakayama.jp': true,
      'kozagawa.wakayama.jp': true,
      'kudoyama.wakayama.jp': true,
      'kushimoto.wakayama.jp': true,
      'mihama.wakayama.jp': true,
      'misato.wakayama.jp': true,
      'nachikatsuura.wakayama.jp': true,
      'shingu.wakayama.jp': true,
      'shirahama.wakayama.jp': true,
      'taiji.wakayama.jp': true,
      'tanabe.wakayama.jp': true,
      'wakayama.wakayama.jp': true,
      'yuasa.wakayama.jp': true,
      'yura.wakayama.jp': true,
      'asahi.yamagata.jp': true,
      'funagata.yamagata.jp': true,
      'higashine.yamagata.jp': true,
      'iide.yamagata.jp': true,
      'kahoku.yamagata.jp': true,
      'kaminoyama.yamagata.jp': true,
      'kaneyama.yamagata.jp': true,
      'kawanishi.yamagata.jp': true,
      'mamurogawa.yamagata.jp': true,
      'mikawa.yamagata.jp': true,
      'murayama.yamagata.jp': true,
      'nagai.yamagata.jp': true,
      'nakayama.yamagata.jp': true,
      'nanyo.yamagata.jp': true,
      'nishikawa.yamagata.jp': true,
      'obanazawa.yamagata.jp': true,
      'oe.yamagata.jp': true,
      'oguni.yamagata.jp': true,
      'ohkura.yamagata.jp': true,
      'oishida.yamagata.jp': true,
      'sagae.yamagata.jp': true,
      'sakata.yamagata.jp': true,
      'sakegawa.yamagata.jp': true,
      'shinjo.yamagata.jp': true,
      'shirataka.yamagata.jp': true,
      'shonai.yamagata.jp': true,
      'takahata.yamagata.jp': true,
      'tendo.yamagata.jp': true,
      'tozawa.yamagata.jp': true,
      'tsuruoka.yamagata.jp': true,
      'yamagata.yamagata.jp': true,
      'yamanobe.yamagata.jp': true,
      'yonezawa.yamagata.jp': true,
      'yuza.yamagata.jp': true,
      'abu.yamaguchi.jp': true,
      'hagi.yamaguchi.jp': true,
      'hikari.yamaguchi.jp': true,
      'hofu.yamaguchi.jp': true,
      'iwakuni.yamaguchi.jp': true,
      'kudamatsu.yamaguchi.jp': true,
      'mitou.yamaguchi.jp': true,
      'nagato.yamaguchi.jp': true,
      'oshima.yamaguchi.jp': true,
      'shimonoseki.yamaguchi.jp': true,
      'shunan.yamaguchi.jp': true,
      'tabuse.yamaguchi.jp': true,
      'tokuyama.yamaguchi.jp': true,
      'toyota.yamaguchi.jp': true,
      'ube.yamaguchi.jp': true,
      'yuu.yamaguchi.jp': true,
      'chuo.yamanashi.jp': true,
      'doshi.yamanashi.jp': true,
      'fuefuki.yamanashi.jp': true,
      'fujikawa.yamanashi.jp': true,
      'fujikawaguchiko.yamanashi.jp': true,
      'fujiyoshida.yamanashi.jp': true,
      'hayakawa.yamanashi.jp': true,
      'hokuto.yamanashi.jp': true,
      'ichikawamisato.yamanashi.jp': true,
      'kai.yamanashi.jp': true,
      'kofu.yamanashi.jp': true,
      'koshu.yamanashi.jp': true,
      'kosuge.yamanashi.jp': true,
      'minami-alps.yamanashi.jp': true,
      'minobu.yamanashi.jp': true,
      'nakamichi.yamanashi.jp': true,
      'nanbu.yamanashi.jp': true,
      'narusawa.yamanashi.jp': true,
      'nirasaki.yamanashi.jp': true,
      'nishikatsura.yamanashi.jp': true,
      'oshino.yamanashi.jp': true,
      'otsuki.yamanashi.jp': true,
      'showa.yamanashi.jp': true,
      'tabayama.yamanashi.jp': true,
      'tsuru.yamanashi.jp': true,
      'uenohara.yamanashi.jp': true,
      'yamanakako.yamanashi.jp': true,
      'yamanashi.yamanashi.jp': true,
      '*.ke': true,
      kg: true,
      'org.kg': true,
      'net.kg': true,
      'com.kg': true,
      'edu.kg': true,
      'gov.kg': true,
      'mil.kg': true,
      '*.kh': true,
      ki: true,
      'edu.ki': true,
      'biz.ki': true,
      'net.ki': true,
      'org.ki': true,
      'gov.ki': true,
      'info.ki': true,
      'com.ki': true,
      km: true,
      'org.km': true,
      'nom.km': true,
      'gov.km': true,
      'prd.km': true,
      'tm.km': true,
      'edu.km': true,
      'mil.km': true,
      'ass.km': true,
      'com.km': true,
      'coop.km': true,
      'asso.km': true,
      'presse.km': true,
      'medecin.km': true,
      'notaires.km': true,
      'pharmaciens.km': true,
      'veterinaire.km': true,
      'gouv.km': true,
      kn: true,
      'net.kn': true,
      'org.kn': true,
      'edu.kn': true,
      'gov.kn': true,
      kp: true,
      'com.kp': true,
      'edu.kp': true,
      'gov.kp': true,
      'org.kp': true,
      'rep.kp': true,
      'tra.kp': true,
      kr: true,
      'ac.kr': true,
      'co.kr': true,
      'es.kr': true,
      'go.kr': true,
      'hs.kr': true,
      'kg.kr': true,
      'mil.kr': true,
      'ms.kr': true,
      'ne.kr': true,
      'or.kr': true,
      'pe.kr': true,
      're.kr': true,
      'sc.kr': true,
      'busan.kr': true,
      'chungbuk.kr': true,
      'chungnam.kr': true,
      'daegu.kr': true,
      'daejeon.kr': true,
      'gangwon.kr': true,
      'gwangju.kr': true,
      'gyeongbuk.kr': true,
      'gyeonggi.kr': true,
      'gyeongnam.kr': true,
      'incheon.kr': true,
      'jeju.kr': true,
      'jeonbuk.kr': true,
      'jeonnam.kr': true,
      'seoul.kr': true,
      'ulsan.kr': true,
      '*.kw': true,
      ky: true,
      'edu.ky': true,
      'gov.ky': true,
      'com.ky': true,
      'org.ky': true,
      'net.ky': true,
      kz: true,
      'org.kz': true,
      'edu.kz': true,
      'net.kz': true,
      'gov.kz': true,
      'mil.kz': true,
      'com.kz': true,
      la: true,
      'int.la': true,
      'net.la': true,
      'info.la': true,
      'edu.la': true,
      'gov.la': true,
      'per.la': true,
      'com.la': true,
      'org.la': true,
      lb: true,
      'com.lb': true,
      'edu.lb': true,
      'gov.lb': true,
      'net.lb': true,
      'org.lb': true,
      lc: true,
      'com.lc': true,
      'net.lc': true,
      'co.lc': true,
      'org.lc': true,
      'edu.lc': true,
      'gov.lc': true,
      li: true,
      lk: true,
      'gov.lk': true,
      'sch.lk': true,
      'net.lk': true,
      'int.lk': true,
      'com.lk': true,
      'org.lk': true,
      'edu.lk': true,
      'ngo.lk': true,
      'soc.lk': true,
      'web.lk': true,
      'ltd.lk': true,
      'assn.lk': true,
      'grp.lk': true,
      'hotel.lk': true,
      'ac.lk': true,
      lr: true,
      'com.lr': true,
      'edu.lr': true,
      'gov.lr': true,
      'org.lr': true,
      'net.lr': true,
      ls: true,
      'co.ls': true,
      'org.ls': true,
      lt: true,
      'gov.lt': true,
      lu: true,
      lv: true,
      'com.lv': true,
      'edu.lv': true,
      'gov.lv': true,
      'org.lv': true,
      'mil.lv': true,
      'id.lv': true,
      'net.lv': true,
      'asn.lv': true,
      'conf.lv': true,
      ly: true,
      'com.ly': true,
      'net.ly': true,
      'gov.ly': true,
      'plc.ly': true,
      'edu.ly': true,
      'sch.ly': true,
      'med.ly': true,
      'org.ly': true,
      'id.ly': true,
      ma: true,
      'co.ma': true,
      'net.ma': true,
      'gov.ma': true,
      'org.ma': true,
      'ac.ma': true,
      'press.ma': true,
      mc: true,
      'tm.mc': true,
      'asso.mc': true,
      md: true,
      me: true,
      'co.me': true,
      'net.me': true,
      'org.me': true,
      'edu.me': true,
      'ac.me': true,
      'gov.me': true,
      'its.me': true,
      'priv.me': true,
      mg: true,
      'org.mg': true,
      'nom.mg': true,
      'gov.mg': true,
      'prd.mg': true,
      'tm.mg': true,
      'edu.mg': true,
      'mil.mg': true,
      'com.mg': true,
      'co.mg': true,
      mh: true,
      mil: true,
      mk: true,
      'com.mk': true,
      'org.mk': true,
      'net.mk': true,
      'edu.mk': true,
      'gov.mk': true,
      'inf.mk': true,
      'name.mk': true,
      ml: true,
      'com.ml': true,
      'edu.ml': true,
      'gouv.ml': true,
      'gov.ml': true,
      'net.ml': true,
      'org.ml': true,
      'presse.ml': true,
      '*.mm': true,
      mn: true,
      'gov.mn': true,
      'edu.mn': true,
      'org.mn': true,
      mo: true,
      'com.mo': true,
      'net.mo': true,
      'org.mo': true,
      'edu.mo': true,
      'gov.mo': true,
      mobi: true,
      mp: true,
      mq: true,
      mr: true,
      'gov.mr': true,
      ms: true,
      'com.ms': true,
      'edu.ms': true,
      'gov.ms': true,
      'net.ms': true,
      'org.ms': true,
      mt: true,
      'com.mt': true,
      'edu.mt': true,
      'net.mt': true,
      'org.mt': true,
      mu: true,
      'com.mu': true,
      'net.mu': true,
      'org.mu': true,
      'gov.mu': true,
      'ac.mu': true,
      'co.mu': true,
      'or.mu': true,
      museum: true,
      'academy.museum': true,
      'agriculture.museum': true,
      'air.museum': true,
      'airguard.museum': true,
      'alabama.museum': true,
      'alaska.museum': true,
      'amber.museum': true,
      'ambulance.museum': true,
      'american.museum': true,
      'americana.museum': true,
      'americanantiques.museum': true,
      'americanart.museum': true,
      'amsterdam.museum': true,
      'and.museum': true,
      'annefrank.museum': true,
      'anthro.museum': true,
      'anthropology.museum': true,
      'antiques.museum': true,
      'aquarium.museum': true,
      'arboretum.museum': true,
      'archaeological.museum': true,
      'archaeology.museum': true,
      'architecture.museum': true,
      'art.museum': true,
      'artanddesign.museum': true,
      'artcenter.museum': true,
      'artdeco.museum': true,
      'arteducation.museum': true,
      'artgallery.museum': true,
      'arts.museum': true,
      'artsandcrafts.museum': true,
      'asmatart.museum': true,
      'assassination.museum': true,
      'assisi.museum': true,
      'association.museum': true,
      'astronomy.museum': true,
      'atlanta.museum': true,
      'austin.museum': true,
      'australia.museum': true,
      'automotive.museum': true,
      'aviation.museum': true,
      'axis.museum': true,
      'badajoz.museum': true,
      'baghdad.museum': true,
      'bahn.museum': true,
      'bale.museum': true,
      'baltimore.museum': true,
      'barcelona.museum': true,
      'baseball.museum': true,
      'basel.museum': true,
      'baths.museum': true,
      'bauern.museum': true,
      'beauxarts.museum': true,
      'beeldengeluid.museum': true,
      'bellevue.museum': true,
      'bergbau.museum': true,
      'berkeley.museum': true,
      'berlin.museum': true,
      'bern.museum': true,
      'bible.museum': true,
      'bilbao.museum': true,
      'bill.museum': true,
      'birdart.museum': true,
      'birthplace.museum': true,
      'bonn.museum': true,
      'boston.museum': true,
      'botanical.museum': true,
      'botanicalgarden.museum': true,
      'botanicgarden.museum': true,
      'botany.museum': true,
      'brandywinevalley.museum': true,
      'brasil.museum': true,
      'bristol.museum': true,
      'british.museum': true,
      'britishcolumbia.museum': true,
      'broadcast.museum': true,
      'brunel.museum': true,
      'brussel.museum': true,
      'brussels.museum': true,
      'bruxelles.museum': true,
      'building.museum': true,
      'burghof.museum': true,
      'bus.museum': true,
      'bushey.museum': true,
      'cadaques.museum': true,
      'california.museum': true,
      'cambridge.museum': true,
      'can.museum': true,
      'canada.museum': true,
      'capebreton.museum': true,
      'carrier.museum': true,
      'cartoonart.museum': true,
      'casadelamoneda.museum': true,
      'castle.museum': true,
      'castres.museum': true,
      'celtic.museum': true,
      'center.museum': true,
      'chattanooga.museum': true,
      'cheltenham.museum': true,
      'chesapeakebay.museum': true,
      'chicago.museum': true,
      'children.museum': true,
      'childrens.museum': true,
      'childrensgarden.museum': true,
      'chiropractic.museum': true,
      'chocolate.museum': true,
      'christiansburg.museum': true,
      'cincinnati.museum': true,
      'cinema.museum': true,
      'circus.museum': true,
      'civilisation.museum': true,
      'civilization.museum': true,
      'civilwar.museum': true,
      'clinton.museum': true,
      'clock.museum': true,
      'coal.museum': true,
      'coastaldefence.museum': true,
      'cody.museum': true,
      'coldwar.museum': true,
      'collection.museum': true,
      'colonialwilliamsburg.museum': true,
      'coloradoplateau.museum': true,
      'columbia.museum': true,
      'columbus.museum': true,
      'communication.museum': true,
      'communications.museum': true,
      'community.museum': true,
      'computer.museum': true,
      'computerhistory.museum': true,
      'xn--comunicaes-v6a2o.museum': true,
      'contemporary.museum': true,
      'contemporaryart.museum': true,
      'convent.museum': true,
      'copenhagen.museum': true,
      'corporation.museum': true,
      'xn--correios-e-telecomunicaes-ghc29a.museum': true,
      'corvette.museum': true,
      'costume.museum': true,
      'countryestate.museum': true,
      'county.museum': true,
      'crafts.museum': true,
      'cranbrook.museum': true,
      'creation.museum': true,
      'cultural.museum': true,
      'culturalcenter.museum': true,
      'culture.museum': true,
      'cyber.museum': true,
      'cymru.museum': true,
      'dali.museum': true,
      'dallas.museum': true,
      'database.museum': true,
      'ddr.museum': true,
      'decorativearts.museum': true,
      'delaware.museum': true,
      'delmenhorst.museum': true,
      'denmark.museum': true,
      'depot.museum': true,
      'design.museum': true,
      'detroit.museum': true,
      'dinosaur.museum': true,
      'discovery.museum': true,
      'dolls.museum': true,
      'donostia.museum': true,
      'durham.museum': true,
      'eastafrica.museum': true,
      'eastcoast.museum': true,
      'education.museum': true,
      'educational.museum': true,
      'egyptian.museum': true,
      'eisenbahn.museum': true,
      'elburg.museum': true,
      'elvendrell.museum': true,
      'embroidery.museum': true,
      'encyclopedic.museum': true,
      'england.museum': true,
      'entomology.museum': true,
      'environment.museum': true,
      'environmentalconservation.museum': true,
      'epilepsy.museum': true,
      'essex.museum': true,
      'estate.museum': true,
      'ethnology.museum': true,
      'exeter.museum': true,
      'exhibition.museum': true,
      'family.museum': true,
      'farm.museum': true,
      'farmequipment.museum': true,
      'farmers.museum': true,
      'farmstead.museum': true,
      'field.museum': true,
      'figueres.museum': true,
      'filatelia.museum': true,
      'film.museum': true,
      'fineart.museum': true,
      'finearts.museum': true,
      'finland.museum': true,
      'flanders.museum': true,
      'florida.museum': true,
      'force.museum': true,
      'fortmissoula.museum': true,
      'fortworth.museum': true,
      'foundation.museum': true,
      'francaise.museum': true,
      'frankfurt.museum': true,
      'franziskaner.museum': true,
      'freemasonry.museum': true,
      'freiburg.museum': true,
      'fribourg.museum': true,
      'frog.museum': true,
      'fundacio.museum': true,
      'furniture.museum': true,
      'gallery.museum': true,
      'garden.museum': true,
      'gateway.museum': true,
      'geelvinck.museum': true,
      'gemological.museum': true,
      'geology.museum': true,
      'georgia.museum': true,
      'giessen.museum': true,
      'glas.museum': true,
      'glass.museum': true,
      'gorge.museum': true,
      'grandrapids.museum': true,
      'graz.museum': true,
      'guernsey.museum': true,
      'halloffame.museum': true,
      'hamburg.museum': true,
      'handson.museum': true,
      'harvestcelebration.museum': true,
      'hawaii.museum': true,
      'health.museum': true,
      'heimatunduhren.museum': true,
      'hellas.museum': true,
      'helsinki.museum': true,
      'hembygdsforbund.museum': true,
      'heritage.museum': true,
      'histoire.museum': true,
      'historical.museum': true,
      'historicalsociety.museum': true,
      'historichouses.museum': true,
      'historisch.museum': true,
      'historisches.museum': true,
      'history.museum': true,
      'historyofscience.museum': true,
      'horology.museum': true,
      'house.museum': true,
      'humanities.museum': true,
      'illustration.museum': true,
      'imageandsound.museum': true,
      'indian.museum': true,
      'indiana.museum': true,
      'indianapolis.museum': true,
      'indianmarket.museum': true,
      'intelligence.museum': true,
      'interactive.museum': true,
      'iraq.museum': true,
      'iron.museum': true,
      'isleofman.museum': true,
      'jamison.museum': true,
      'jefferson.museum': true,
      'jerusalem.museum': true,
      'jewelry.museum': true,
      'jewish.museum': true,
      'jewishart.museum': true,
      'jfk.museum': true,
      'journalism.museum': true,
      'judaica.museum': true,
      'judygarland.museum': true,
      'juedisches.museum': true,
      'juif.museum': true,
      'karate.museum': true,
      'karikatur.museum': true,
      'kids.museum': true,
      'koebenhavn.museum': true,
      'koeln.museum': true,
      'kunst.museum': true,
      'kunstsammlung.museum': true,
      'kunstunddesign.museum': true,
      'labor.museum': true,
      'labour.museum': true,
      'lajolla.museum': true,
      'lancashire.museum': true,
      'landes.museum': true,
      'lans.museum': true,
      'xn--lns-qla.museum': true,
      'larsson.museum': true,
      'lewismiller.museum': true,
      'lincoln.museum': true,
      'linz.museum': true,
      'living.museum': true,
      'livinghistory.museum': true,
      'localhistory.museum': true,
      'london.museum': true,
      'losangeles.museum': true,
      'louvre.museum': true,
      'loyalist.museum': true,
      'lucerne.museum': true,
      'luxembourg.museum': true,
      'luzern.museum': true,
      'mad.museum': true,
      'madrid.museum': true,
      'mallorca.museum': true,
      'manchester.museum': true,
      'mansion.museum': true,
      'mansions.museum': true,
      'manx.museum': true,
      'marburg.museum': true,
      'maritime.museum': true,
      'maritimo.museum': true,
      'maryland.museum': true,
      'marylhurst.museum': true,
      'media.museum': true,
      'medical.museum': true,
      'medizinhistorisches.museum': true,
      'meeres.museum': true,
      'memorial.museum': true,
      'mesaverde.museum': true,
      'michigan.museum': true,
      'midatlantic.museum': true,
      'military.museum': true,
      'mill.museum': true,
      'miners.museum': true,
      'mining.museum': true,
      'minnesota.museum': true,
      'missile.museum': true,
      'missoula.museum': true,
      'modern.museum': true,
      'moma.museum': true,
      'money.museum': true,
      'monmouth.museum': true,
      'monticello.museum': true,
      'montreal.museum': true,
      'moscow.museum': true,
      'motorcycle.museum': true,
      'muenchen.museum': true,
      'muenster.museum': true,
      'mulhouse.museum': true,
      'muncie.museum': true,
      'museet.museum': true,
      'museumcenter.museum': true,
      'museumvereniging.museum': true,
      'music.museum': true,
      'national.museum': true,
      'nationalfirearms.museum': true,
      'nationalheritage.museum': true,
      'nativeamerican.museum': true,
      'naturalhistory.museum': true,
      'naturalhistorymuseum.museum': true,
      'naturalsciences.museum': true,
      'nature.museum': true,
      'naturhistorisches.museum': true,
      'natuurwetenschappen.museum': true,
      'naumburg.museum': true,
      'naval.museum': true,
      'nebraska.museum': true,
      'neues.museum': true,
      'newhampshire.museum': true,
      'newjersey.museum': true,
      'newmexico.museum': true,
      'newport.museum': true,
      'newspaper.museum': true,
      'newyork.museum': true,
      'niepce.museum': true,
      'norfolk.museum': true,
      'north.museum': true,
      'nrw.museum': true,
      'nuernberg.museum': true,
      'nuremberg.museum': true,
      'nyc.museum': true,
      'nyny.museum': true,
      'oceanographic.museum': true,
      'oceanographique.museum': true,
      'omaha.museum': true,
      'online.museum': true,
      'ontario.museum': true,
      'openair.museum': true,
      'oregon.museum': true,
      'oregontrail.museum': true,
      'otago.museum': true,
      'oxford.museum': true,
      'pacific.museum': true,
      'paderborn.museum': true,
      'palace.museum': true,
      'paleo.museum': true,
      'palmsprings.museum': true,
      'panama.museum': true,
      'paris.museum': true,
      'pasadena.museum': true,
      'pharmacy.museum': true,
      'philadelphia.museum': true,
      'philadelphiaarea.museum': true,
      'philately.museum': true,
      'phoenix.museum': true,
      'photography.museum': true,
      'pilots.museum': true,
      'pittsburgh.museum': true,
      'planetarium.museum': true,
      'plantation.museum': true,
      'plants.museum': true,
      'plaza.museum': true,
      'portal.museum': true,
      'portland.museum': true,
      'portlligat.museum': true,
      'posts-and-telecommunications.museum': true,
      'preservation.museum': true,
      'presidio.museum': true,
      'press.museum': true,
      'project.museum': true,
      'public.museum': true,
      'pubol.museum': true,
      'quebec.museum': true,
      'railroad.museum': true,
      'railway.museum': true,
      'research.museum': true,
      'resistance.museum': true,
      'riodejaneiro.museum': true,
      'rochester.museum': true,
      'rockart.museum': true,
      'roma.museum': true,
      'russia.museum': true,
      'saintlouis.museum': true,
      'salem.museum': true,
      'salvadordali.museum': true,
      'salzburg.museum': true,
      'sandiego.museum': true,
      'sanfrancisco.museum': true,
      'santabarbara.museum': true,
      'santacruz.museum': true,
      'santafe.museum': true,
      'saskatchewan.museum': true,
      'satx.museum': true,
      'savannahga.museum': true,
      'schlesisches.museum': true,
      'schoenbrunn.museum': true,
      'schokoladen.museum': true,
      'school.museum': true,
      'schweiz.museum': true,
      'science.museum': true,
      'scienceandhistory.museum': true,
      'scienceandindustry.museum': true,
      'sciencecenter.museum': true,
      'sciencecenters.museum': true,
      'science-fiction.museum': true,
      'sciencehistory.museum': true,
      'sciences.museum': true,
      'sciencesnaturelles.museum': true,
      'scotland.museum': true,
      'seaport.museum': true,
      'settlement.museum': true,
      'settlers.museum': true,
      'shell.museum': true,
      'sherbrooke.museum': true,
      'sibenik.museum': true,
      'silk.museum': true,
      'ski.museum': true,
      'skole.museum': true,
      'society.museum': true,
      'sologne.museum': true,
      'soundandvision.museum': true,
      'southcarolina.museum': true,
      'southwest.museum': true,
      'space.museum': true,
      'spy.museum': true,
      'square.museum': true,
      'stadt.museum': true,
      'stalbans.museum': true,
      'starnberg.museum': true,
      'state.museum': true,
      'stateofdelaware.museum': true,
      'station.museum': true,
      'steam.museum': true,
      'steiermark.museum': true,
      'stjohn.museum': true,
      'stockholm.museum': true,
      'stpetersburg.museum': true,
      'stuttgart.museum': true,
      'suisse.museum': true,
      'surgeonshall.museum': true,
      'surrey.museum': true,
      'svizzera.museum': true,
      'sweden.museum': true,
      'sydney.museum': true,
      'tank.museum': true,
      'tcm.museum': true,
      'technology.museum': true,
      'telekommunikation.museum': true,
      'television.museum': true,
      'texas.museum': true,
      'textile.museum': true,
      'theater.museum': true,
      'time.museum': true,
      'timekeeping.museum': true,
      'topology.museum': true,
      'torino.museum': true,
      'touch.museum': true,
      'town.museum': true,
      'transport.museum': true,
      'tree.museum': true,
      'trolley.museum': true,
      'trust.museum': true,
      'trustee.museum': true,
      'uhren.museum': true,
      'ulm.museum': true,
      'undersea.museum': true,
      'university.museum': true,
      'usa.museum': true,
      'usantiques.museum': true,
      'usarts.museum': true,
      'uscountryestate.museum': true,
      'usculture.museum': true,
      'usdecorativearts.museum': true,
      'usgarden.museum': true,
      'ushistory.museum': true,
      'ushuaia.museum': true,
      'uslivinghistory.museum': true,
      'utah.museum': true,
      'uvic.museum': true,
      'valley.museum': true,
      'vantaa.museum': true,
      'versailles.museum': true,
      'viking.museum': true,
      'village.museum': true,
      'virginia.museum': true,
      'virtual.museum': true,
      'virtuel.museum': true,
      'vlaanderen.museum': true,
      'volkenkunde.museum': true,
      'wales.museum': true,
      'wallonie.museum': true,
      'war.museum': true,
      'washingtondc.museum': true,
      'watchandclock.museum': true,
      'watch-and-clock.museum': true,
      'western.museum': true,
      'westfalen.museum': true,
      'whaling.museum': true,
      'wildlife.museum': true,
      'williamsburg.museum': true,
      'windmill.museum': true,
      'workshop.museum': true,
      'york.museum': true,
      'yorkshire.museum': true,
      'yosemite.museum': true,
      'youth.museum': true,
      'zoological.museum': true,
      'zoology.museum': true,
      'xn--9dbhblg6di.museum': true,
      'xn--h1aegh.museum': true,
      mv: true,
      'aero.mv': true,
      'biz.mv': true,
      'com.mv': true,
      'coop.mv': true,
      'edu.mv': true,
      'gov.mv': true,
      'info.mv': true,
      'int.mv': true,
      'mil.mv': true,
      'museum.mv': true,
      'name.mv': true,
      'net.mv': true,
      'org.mv': true,
      'pro.mv': true,
      mw: true,
      'ac.mw': true,
      'biz.mw': true,
      'co.mw': true,
      'com.mw': true,
      'coop.mw': true,
      'edu.mw': true,
      'gov.mw': true,
      'int.mw': true,
      'museum.mw': true,
      'net.mw': true,
      'org.mw': true,
      mx: true,
      'com.mx': true,
      'org.mx': true,
      'gob.mx': true,
      'edu.mx': true,
      'net.mx': true,
      my: true,
      'com.my': true,
      'net.my': true,
      'org.my': true,
      'gov.my': true,
      'edu.my': true,
      'mil.my': true,
      'name.my': true,
      mz: true,
      'ac.mz': true,
      'adv.mz': true,
      'co.mz': true,
      'edu.mz': true,
      'gov.mz': true,
      'mil.mz': true,
      'net.mz': true,
      'org.mz': true,
      na: true,
      'info.na': true,
      'pro.na': true,
      'name.na': true,
      'school.na': true,
      'or.na': true,
      'dr.na': true,
      'us.na': true,
      'mx.na': true,
      'ca.na': true,
      'in.na': true,
      'cc.na': true,
      'tv.na': true,
      'ws.na': true,
      'mobi.na': true,
      'co.na': true,
      'com.na': true,
      'org.na': true,
      name: true,
      nc: true,
      'asso.nc': true,
      ne: true,
      net: true,
      nf: true,
      'com.nf': true,
      'net.nf': true,
      'per.nf': true,
      'rec.nf': true,
      'web.nf': true,
      'arts.nf': true,
      'firm.nf': true,
      'info.nf': true,
      'other.nf': true,
      'store.nf': true,
      ng: true,
      'com.ng': true,
      'edu.ng': true,
      'gov.ng': true,
      'i.ng': true,
      'mil.ng': true,
      'mobi.ng': true,
      'name.ng': true,
      'net.ng': true,
      'org.ng': true,
      'sch.ng': true,
      'com.ni': true,
      'gob.ni': true,
      'edu.ni': true,
      'org.ni': true,
      'nom.ni': true,
      'net.ni': true,
      'mil.ni': true,
      'co.ni': true,
      'biz.ni': true,
      'web.ni': true,
      'int.ni': true,
      'ac.ni': true,
      'in.ni': true,
      'info.ni': true,
      nl: true,
      'bv.nl': true,
      no: true,
      'fhs.no': true,
      'vgs.no': true,
      'fylkesbibl.no': true,
      'folkebibl.no': true,
      'museum.no': true,
      'idrett.no': true,
      'priv.no': true,
      'mil.no': true,
      'stat.no': true,
      'dep.no': true,
      'kommune.no': true,
      'herad.no': true,
      'aa.no': true,
      'ah.no': true,
      'bu.no': true,
      'fm.no': true,
      'hl.no': true,
      'hm.no': true,
      'jan-mayen.no': true,
      'mr.no': true,
      'nl.no': true,
      'nt.no': true,
      'of.no': true,
      'ol.no': true,
      'oslo.no': true,
      'rl.no': true,
      'sf.no': true,
      'st.no': true,
      'svalbard.no': true,
      'tm.no': true,
      'tr.no': true,
      'va.no': true,
      'vf.no': true,
      'gs.aa.no': true,
      'gs.ah.no': true,
      'gs.bu.no': true,
      'gs.fm.no': true,
      'gs.hl.no': true,
      'gs.hm.no': true,
      'gs.jan-mayen.no': true,
      'gs.mr.no': true,
      'gs.nl.no': true,
      'gs.nt.no': true,
      'gs.of.no': true,
      'gs.ol.no': true,
      'gs.oslo.no': true,
      'gs.rl.no': true,
      'gs.sf.no': true,
      'gs.st.no': true,
      'gs.svalbard.no': true,
      'gs.tm.no': true,
      'gs.tr.no': true,
      'gs.va.no': true,
      'gs.vf.no': true,
      'akrehamn.no': true,
      'xn--krehamn-dxa.no': true,
      'algard.no': true,
      'xn--lgrd-poac.no': true,
      'arna.no': true,
      'brumunddal.no': true,
      'bryne.no': true,
      'bronnoysund.no': true,
      'xn--brnnysund-m8ac.no': true,
      'drobak.no': true,
      'xn--drbak-wua.no': true,
      'egersund.no': true,
      'fetsund.no': true,
      'floro.no': true,
      'xn--flor-jra.no': true,
      'fredrikstad.no': true,
      'hokksund.no': true,
      'honefoss.no': true,
      'xn--hnefoss-q1a.no': true,
      'jessheim.no': true,
      'jorpeland.no': true,
      'xn--jrpeland-54a.no': true,
      'kirkenes.no': true,
      'kopervik.no': true,
      'krokstadelva.no': true,
      'langevag.no': true,
      'xn--langevg-jxa.no': true,
      'leirvik.no': true,
      'mjondalen.no': true,
      'xn--mjndalen-64a.no': true,
      'mo-i-rana.no': true,
      'mosjoen.no': true,
      'xn--mosjen-eya.no': true,
      'nesoddtangen.no': true,
      'orkanger.no': true,
      'osoyro.no': true,
      'xn--osyro-wua.no': true,
      'raholt.no': true,
      'xn--rholt-mra.no': true,
      'sandnessjoen.no': true,
      'xn--sandnessjen-ogb.no': true,
      'skedsmokorset.no': true,
      'slattum.no': true,
      'spjelkavik.no': true,
      'stathelle.no': true,
      'stavern.no': true,
      'stjordalshalsen.no': true,
      'xn--stjrdalshalsen-sqb.no': true,
      'tananger.no': true,
      'tranby.no': true,
      'vossevangen.no': true,
      'afjord.no': true,
      'xn--fjord-lra.no': true,
      'agdenes.no': true,
      'al.no': true,
      'xn--l-1fa.no': true,
      'alesund.no': true,
      'xn--lesund-hua.no': true,
      'alstahaug.no': true,
      'alta.no': true,
      'xn--lt-liac.no': true,
      'alaheadju.no': true,
      'xn--laheadju-7ya.no': true,
      'alvdal.no': true,
      'amli.no': true,
      'xn--mli-tla.no': true,
      'amot.no': true,
      'xn--mot-tla.no': true,
      'andebu.no': true,
      'andoy.no': true,
      'xn--andy-ira.no': true,
      'andasuolo.no': true,
      'ardal.no': true,
      'xn--rdal-poa.no': true,
      'aremark.no': true,
      'arendal.no': true,
      'xn--s-1fa.no': true,
      'aseral.no': true,
      'xn--seral-lra.no': true,
      'asker.no': true,
      'askim.no': true,
      'askvoll.no': true,
      'askoy.no': true,
      'xn--asky-ira.no': true,
      'asnes.no': true,
      'xn--snes-poa.no': true,
      'audnedaln.no': true,
      'aukra.no': true,
      'aure.no': true,
      'aurland.no': true,
      'aurskog-holand.no': true,
      'xn--aurskog-hland-jnb.no': true,
      'austevoll.no': true,
      'austrheim.no': true,
      'averoy.no': true,
      'xn--avery-yua.no': true,
      'balestrand.no': true,
      'ballangen.no': true,
      'balat.no': true,
      'xn--blt-elab.no': true,
      'balsfjord.no': true,
      'bahccavuotna.no': true,
      'xn--bhccavuotna-k7a.no': true,
      'bamble.no': true,
      'bardu.no': true,
      'beardu.no': true,
      'beiarn.no': true,
      'bajddar.no': true,
      'xn--bjddar-pta.no': true,
      'baidar.no': true,
      'xn--bidr-5nac.no': true,
      'berg.no': true,
      'bergen.no': true,
      'berlevag.no': true,
      'xn--berlevg-jxa.no': true,
      'bearalvahki.no': true,
      'xn--bearalvhki-y4a.no': true,
      'bindal.no': true,
      'birkenes.no': true,
      'bjarkoy.no': true,
      'xn--bjarky-fya.no': true,
      'bjerkreim.no': true,
      'bjugn.no': true,
      'bodo.no': true,
      'xn--bod-2na.no': true,
      'badaddja.no': true,
      'xn--bdddj-mrabd.no': true,
      'budejju.no': true,
      'bokn.no': true,
      'bremanger.no': true,
      'bronnoy.no': true,
      'xn--brnny-wuac.no': true,
      'bygland.no': true,
      'bykle.no': true,
      'barum.no': true,
      'xn--brum-voa.no': true,
      'bo.telemark.no': true,
      'xn--b-5ga.telemark.no': true,
      'bo.nordland.no': true,
      'xn--b-5ga.nordland.no': true,
      'bievat.no': true,
      'xn--bievt-0qa.no': true,
      'bomlo.no': true,
      'xn--bmlo-gra.no': true,
      'batsfjord.no': true,
      'xn--btsfjord-9za.no': true,
      'bahcavuotna.no': true,
      'xn--bhcavuotna-s4a.no': true,
      'dovre.no': true,
      'drammen.no': true,
      'drangedal.no': true,
      'dyroy.no': true,
      'xn--dyry-ira.no': true,
      'donna.no': true,
      'xn--dnna-gra.no': true,
      'eid.no': true,
      'eidfjord.no': true,
      'eidsberg.no': true,
      'eidskog.no': true,
      'eidsvoll.no': true,
      'eigersund.no': true,
      'elverum.no': true,
      'enebakk.no': true,
      'engerdal.no': true,
      'etne.no': true,
      'etnedal.no': true,
      'evenes.no': true,
      'evenassi.no': true,
      'xn--eveni-0qa01ga.no': true,
      'evje-og-hornnes.no': true,
      'farsund.no': true,
      'fauske.no': true,
      'fuossko.no': true,
      'fuoisku.no': true,
      'fedje.no': true,
      'fet.no': true,
      'finnoy.no': true,
      'xn--finny-yua.no': true,
      'fitjar.no': true,
      'fjaler.no': true,
      'fjell.no': true,
      'flakstad.no': true,
      'flatanger.no': true,
      'flekkefjord.no': true,
      'flesberg.no': true,
      'flora.no': true,
      'fla.no': true,
      'xn--fl-zia.no': true,
      'folldal.no': true,
      'forsand.no': true,
      'fosnes.no': true,
      'frei.no': true,
      'frogn.no': true,
      'froland.no': true,
      'frosta.no': true,
      'frana.no': true,
      'xn--frna-woa.no': true,
      'froya.no': true,
      'xn--frya-hra.no': true,
      'fusa.no': true,
      'fyresdal.no': true,
      'forde.no': true,
      'xn--frde-gra.no': true,
      'gamvik.no': true,
      'gangaviika.no': true,
      'xn--ggaviika-8ya47h.no': true,
      'gaular.no': true,
      'gausdal.no': true,
      'gildeskal.no': true,
      'xn--gildeskl-g0a.no': true,
      'giske.no': true,
      'gjemnes.no': true,
      'gjerdrum.no': true,
      'gjerstad.no': true,
      'gjesdal.no': true,
      'gjovik.no': true,
      'xn--gjvik-wua.no': true,
      'gloppen.no': true,
      'gol.no': true,
      'gran.no': true,
      'grane.no': true,
      'granvin.no': true,
      'gratangen.no': true,
      'grimstad.no': true,
      'grong.no': true,
      'kraanghke.no': true,
      'xn--kranghke-b0a.no': true,
      'grue.no': true,
      'gulen.no': true,
      'hadsel.no': true,
      'halden.no': true,
      'halsa.no': true,
      'hamar.no': true,
      'hamaroy.no': true,
      'habmer.no': true,
      'xn--hbmer-xqa.no': true,
      'hapmir.no': true,
      'xn--hpmir-xqa.no': true,
      'hammerfest.no': true,
      'hammarfeasta.no': true,
      'xn--hmmrfeasta-s4ac.no': true,
      'haram.no': true,
      'hareid.no': true,
      'harstad.no': true,
      'hasvik.no': true,
      'aknoluokta.no': true,
      'xn--koluokta-7ya57h.no': true,
      'hattfjelldal.no': true,
      'aarborte.no': true,
      'haugesund.no': true,
      'hemne.no': true,
      'hemnes.no': true,
      'hemsedal.no': true,
      'heroy.more-og-romsdal.no': true,
      'xn--hery-ira.xn--mre-og-romsdal-qqb.no': true,
      'heroy.nordland.no': true,
      'xn--hery-ira.nordland.no': true,
      'hitra.no': true,
      'hjartdal.no': true,
      'hjelmeland.no': true,
      'hobol.no': true,
      'xn--hobl-ira.no': true,
      'hof.no': true,
      'hol.no': true,
      'hole.no': true,
      'holmestrand.no': true,
      'holtalen.no': true,
      'xn--holtlen-hxa.no': true,
      'hornindal.no': true,
      'horten.no': true,
      'hurdal.no': true,
      'hurum.no': true,
      'hvaler.no': true,
      'hyllestad.no': true,
      'hagebostad.no': true,
      'xn--hgebostad-g3a.no': true,
      'hoyanger.no': true,
      'xn--hyanger-q1a.no': true,
      'hoylandet.no': true,
      'xn--hylandet-54a.no': true,
      'ha.no': true,
      'xn--h-2fa.no': true,
      'ibestad.no': true,
      'inderoy.no': true,
      'xn--indery-fya.no': true,
      'iveland.no': true,
      'jevnaker.no': true,
      'jondal.no': true,
      'jolster.no': true,
      'xn--jlster-bya.no': true,
      'karasjok.no': true,
      'karasjohka.no': true,
      'xn--krjohka-hwab49j.no': true,
      'karlsoy.no': true,
      'galsa.no': true,
      'xn--gls-elac.no': true,
      'karmoy.no': true,
      'xn--karmy-yua.no': true,
      'kautokeino.no': true,
      'guovdageaidnu.no': true,
      'klepp.no': true,
      'klabu.no': true,
      'xn--klbu-woa.no': true,
      'kongsberg.no': true,
      'kongsvinger.no': true,
      'kragero.no': true,
      'xn--krager-gya.no': true,
      'kristiansand.no': true,
      'kristiansund.no': true,
      'krodsherad.no': true,
      'xn--krdsherad-m8a.no': true,
      'kvalsund.no': true,
      'rahkkeravju.no': true,
      'xn--rhkkervju-01af.no': true,
      'kvam.no': true,
      'kvinesdal.no': true,
      'kvinnherad.no': true,
      'kviteseid.no': true,
      'kvitsoy.no': true,
      'xn--kvitsy-fya.no': true,
      'kvafjord.no': true,
      'xn--kvfjord-nxa.no': true,
      'giehtavuoatna.no': true,
      'kvanangen.no': true,
      'xn--kvnangen-k0a.no': true,
      'navuotna.no': true,
      'xn--nvuotna-hwa.no': true,
      'kafjord.no': true,
      'xn--kfjord-iua.no': true,
      'gaivuotna.no': true,
      'xn--givuotna-8ya.no': true,
      'larvik.no': true,
      'lavangen.no': true,
      'lavagis.no': true,
      'loabat.no': true,
      'xn--loabt-0qa.no': true,
      'lebesby.no': true,
      'davvesiida.no': true,
      'leikanger.no': true,
      'leirfjord.no': true,
      'leka.no': true,
      'leksvik.no': true,
      'lenvik.no': true,
      'leangaviika.no': true,
      'xn--leagaviika-52b.no': true,
      'lesja.no': true,
      'levanger.no': true,
      'lier.no': true,
      'lierne.no': true,
      'lillehammer.no': true,
      'lillesand.no': true,
      'lindesnes.no': true,
      'lindas.no': true,
      'xn--linds-pra.no': true,
      'lom.no': true,
      'loppa.no': true,
      'lahppi.no': true,
      'xn--lhppi-xqa.no': true,
      'lund.no': true,
      'lunner.no': true,
      'luroy.no': true,
      'xn--lury-ira.no': true,
      'luster.no': true,
      'lyngdal.no': true,
      'lyngen.no': true,
      'ivgu.no': true,
      'lardal.no': true,
      'lerdal.no': true,
      'xn--lrdal-sra.no': true,
      'lodingen.no': true,
      'xn--ldingen-q1a.no': true,
      'lorenskog.no': true,
      'xn--lrenskog-54a.no': true,
      'loten.no': true,
      'xn--lten-gra.no': true,
      'malvik.no': true,
      'masoy.no': true,
      'xn--msy-ula0h.no': true,
      'muosat.no': true,
      'xn--muost-0qa.no': true,
      'mandal.no': true,
      'marker.no': true,
      'marnardal.no': true,
      'masfjorden.no': true,
      'meland.no': true,
      'meldal.no': true,
      'melhus.no': true,
      'meloy.no': true,
      'xn--mely-ira.no': true,
      'meraker.no': true,
      'xn--merker-kua.no': true,
      'moareke.no': true,
      'xn--moreke-jua.no': true,
      'midsund.no': true,
      'midtre-gauldal.no': true,
      'modalen.no': true,
      'modum.no': true,
      'molde.no': true,
      'moskenes.no': true,
      'moss.no': true,
      'mosvik.no': true,
      'malselv.no': true,
      'xn--mlselv-iua.no': true,
      'malatvuopmi.no': true,
      'xn--mlatvuopmi-s4a.no': true,
      'namdalseid.no': true,
      'aejrie.no': true,
      'namsos.no': true,
      'namsskogan.no': true,
      'naamesjevuemie.no': true,
      'xn--nmesjevuemie-tcba.no': true,
      'laakesvuemie.no': true,
      'nannestad.no': true,
      'narvik.no': true,
      'narviika.no': true,
      'naustdal.no': true,
      'nedre-eiker.no': true,
      'nes.akershus.no': true,
      'nes.buskerud.no': true,
      'nesna.no': true,
      'nesodden.no': true,
      'nesseby.no': true,
      'unjarga.no': true,
      'xn--unjrga-rta.no': true,
      'nesset.no': true,
      'nissedal.no': true,
      'nittedal.no': true,
      'nord-aurdal.no': true,
      'nord-fron.no': true,
      'nord-odal.no': true,
      'norddal.no': true,
      'nordkapp.no': true,
      'davvenjarga.no': true,
      'xn--davvenjrga-y4a.no': true,
      'nordre-land.no': true,
      'nordreisa.no': true,
      'raisa.no': true,
      'xn--risa-5na.no': true,
      'nore-og-uvdal.no': true,
      'notodden.no': true,
      'naroy.no': true,
      'xn--nry-yla5g.no': true,
      'notteroy.no': true,
      'xn--nttery-byae.no': true,
      'odda.no': true,
      'oksnes.no': true,
      'xn--ksnes-uua.no': true,
      'oppdal.no': true,
      'oppegard.no': true,
      'xn--oppegrd-ixa.no': true,
      'orkdal.no': true,
      'orland.no': true,
      'xn--rland-uua.no': true,
      'orskog.no': true,
      'xn--rskog-uua.no': true,
      'orsta.no': true,
      'xn--rsta-fra.no': true,
      'os.hedmark.no': true,
      'os.hordaland.no': true,
      'osen.no': true,
      'osteroy.no': true,
      'xn--ostery-fya.no': true,
      'ostre-toten.no': true,
      'xn--stre-toten-zcb.no': true,
      'overhalla.no': true,
      'ovre-eiker.no': true,
      'xn--vre-eiker-k8a.no': true,
      'oyer.no': true,
      'xn--yer-zna.no': true,
      'oygarden.no': true,
      'xn--ygarden-p1a.no': true,
      'oystre-slidre.no': true,
      'xn--ystre-slidre-ujb.no': true,
      'porsanger.no': true,
      'porsangu.no': true,
      'xn--porsgu-sta26f.no': true,
      'porsgrunn.no': true,
      'radoy.no': true,
      'xn--rady-ira.no': true,
      'rakkestad.no': true,
      'rana.no': true,
      'ruovat.no': true,
      'randaberg.no': true,
      'rauma.no': true,
      'rendalen.no': true,
      'rennebu.no': true,
      'rennesoy.no': true,
      'xn--rennesy-v1a.no': true,
      'rindal.no': true,
      'ringebu.no': true,
      'ringerike.no': true,
      'ringsaker.no': true,
      'rissa.no': true,
      'risor.no': true,
      'xn--risr-ira.no': true,
      'roan.no': true,
      'rollag.no': true,
      'rygge.no': true,
      'ralingen.no': true,
      'xn--rlingen-mxa.no': true,
      'rodoy.no': true,
      'xn--rdy-0nab.no': true,
      'romskog.no': true,
      'xn--rmskog-bya.no': true,
      'roros.no': true,
      'xn--rros-gra.no': true,
      'rost.no': true,
      'xn--rst-0na.no': true,
      'royken.no': true,
      'xn--ryken-vua.no': true,
      'royrvik.no': true,
      'xn--ryrvik-bya.no': true,
      'rade.no': true,
      'xn--rde-ula.no': true,
      'salangen.no': true,
      'siellak.no': true,
      'saltdal.no': true,
      'salat.no': true,
      'xn--slt-elab.no': true,
      'xn--slat-5na.no': true,
      'samnanger.no': true,
      'sande.more-og-romsdal.no': true,
      'sande.xn--mre-og-romsdal-qqb.no': true,
      'sande.vestfold.no': true,
      'sandefjord.no': true,
      'sandnes.no': true,
      'sandoy.no': true,
      'xn--sandy-yua.no': true,
      'sarpsborg.no': true,
      'sauda.no': true,
      'sauherad.no': true,
      'sel.no': true,
      'selbu.no': true,
      'selje.no': true,
      'seljord.no': true,
      'sigdal.no': true,
      'siljan.no': true,
      'sirdal.no': true,
      'skaun.no': true,
      'skedsmo.no': true,
      'ski.no': true,
      'skien.no': true,
      'skiptvet.no': true,
      'skjervoy.no': true,
      'xn--skjervy-v1a.no': true,
      'skierva.no': true,
      'xn--skierv-uta.no': true,
      'skjak.no': true,
      'xn--skjk-soa.no': true,
      'skodje.no': true,
      'skanland.no': true,
      'xn--sknland-fxa.no': true,
      'skanit.no': true,
      'xn--sknit-yqa.no': true,
      'smola.no': true,
      'xn--smla-hra.no': true,
      'snillfjord.no': true,
      'snasa.no': true,
      'xn--snsa-roa.no': true,
      'snoasa.no': true,
      'snaase.no': true,
      'xn--snase-nra.no': true,
      'sogndal.no': true,
      'sokndal.no': true,
      'sola.no': true,
      'solund.no': true,
      'songdalen.no': true,
      'sortland.no': true,
      'spydeberg.no': true,
      'stange.no': true,
      'stavanger.no': true,
      'steigen.no': true,
      'steinkjer.no': true,
      'stjordal.no': true,
      'xn--stjrdal-s1a.no': true,
      'stokke.no': true,
      'stor-elvdal.no': true,
      'stord.no': true,
      'stordal.no': true,
      'storfjord.no': true,
      'omasvuotna.no': true,
      'strand.no': true,
      'stranda.no': true,
      'stryn.no': true,
      'sula.no': true,
      'suldal.no': true,
      'sund.no': true,
      'sunndal.no': true,
      'surnadal.no': true,
      'sveio.no': true,
      'svelvik.no': true,
      'sykkylven.no': true,
      'sogne.no': true,
      'xn--sgne-gra.no': true,
      'somna.no': true,
      'xn--smna-gra.no': true,
      'sondre-land.no': true,
      'xn--sndre-land-0cb.no': true,
      'sor-aurdal.no': true,
      'xn--sr-aurdal-l8a.no': true,
      'sor-fron.no': true,
      'xn--sr-fron-q1a.no': true,
      'sor-odal.no': true,
      'xn--sr-odal-q1a.no': true,
      'sor-varanger.no': true,
      'xn--sr-varanger-ggb.no': true,
      'matta-varjjat.no': true,
      'xn--mtta-vrjjat-k7af.no': true,
      'sorfold.no': true,
      'xn--srfold-bya.no': true,
      'sorreisa.no': true,
      'xn--srreisa-q1a.no': true,
      'sorum.no': true,
      'xn--srum-gra.no': true,
      'tana.no': true,
      'deatnu.no': true,
      'time.no': true,
      'tingvoll.no': true,
      'tinn.no': true,
      'tjeldsund.no': true,
      'dielddanuorri.no': true,
      'tjome.no': true,
      'xn--tjme-hra.no': true,
      'tokke.no': true,
      'tolga.no': true,
      'torsken.no': true,
      'tranoy.no': true,
      'xn--trany-yua.no': true,
      'tromso.no': true,
      'xn--troms-zua.no': true,
      'tromsa.no': true,
      'romsa.no': true,
      'trondheim.no': true,
      'troandin.no': true,
      'trysil.no': true,
      'trana.no': true,
      'xn--trna-woa.no': true,
      'trogstad.no': true,
      'xn--trgstad-r1a.no': true,
      'tvedestrand.no': true,
      'tydal.no': true,
      'tynset.no': true,
      'tysfjord.no': true,
      'divtasvuodna.no': true,
      'divttasvuotna.no': true,
      'tysnes.no': true,
      'tysvar.no': true,
      'xn--tysvr-vra.no': true,
      'tonsberg.no': true,
      'xn--tnsberg-q1a.no': true,
      'ullensaker.no': true,
      'ullensvang.no': true,
      'ulvik.no': true,
      'utsira.no': true,
      'vadso.no': true,
      'xn--vads-jra.no': true,
      'cahcesuolo.no': true,
      'xn--hcesuolo-7ya35b.no': true,
      'vaksdal.no': true,
      'valle.no': true,
      'vang.no': true,
      'vanylven.no': true,
      'vardo.no': true,
      'xn--vard-jra.no': true,
      'varggat.no': true,
      'xn--vrggt-xqad.no': true,
      'vefsn.no': true,
      'vaapste.no': true,
      'vega.no': true,
      'vegarshei.no': true,
      'xn--vegrshei-c0a.no': true,
      'vennesla.no': true,
      'verdal.no': true,
      'verran.no': true,
      'vestby.no': true,
      'vestnes.no': true,
      'vestre-slidre.no': true,
      'vestre-toten.no': true,
      'vestvagoy.no': true,
      'xn--vestvgy-ixa6o.no': true,
      'vevelstad.no': true,
      'vik.no': true,
      'vikna.no': true,
      'vindafjord.no': true,
      'volda.no': true,
      'voss.no': true,
      'varoy.no': true,
      'xn--vry-yla5g.no': true,
      'vagan.no': true,
      'xn--vgan-qoa.no': true,
      'voagat.no': true,
      'vagsoy.no': true,
      'xn--vgsy-qoa0j.no': true,
      'vaga.no': true,
      'xn--vg-yiab.no': true,
      'valer.ostfold.no': true,
      'xn--vler-qoa.xn--stfold-9xa.no': true,
      'valer.hedmark.no': true,
      'xn--vler-qoa.hedmark.no': true,
      '*.np': true,
      nr: true,
      'biz.nr': true,
      'info.nr': true,
      'gov.nr': true,
      'edu.nr': true,
      'org.nr': true,
      'net.nr': true,
      'com.nr': true,
      nu: true,
      nz: true,
      'ac.nz': true,
      'co.nz': true,
      'cri.nz': true,
      'geek.nz': true,
      'gen.nz': true,
      'govt.nz': true,
      'health.nz': true,
      'iwi.nz': true,
      'kiwi.nz': true,
      'maori.nz': true,
      'mil.nz': true,
      'xn--mori-qsa.nz': true,
      'net.nz': true,
      'org.nz': true,
      'parliament.nz': true,
      'school.nz': true,
      om: true,
      'co.om': true,
      'com.om': true,
      'edu.om': true,
      'gov.om': true,
      'med.om': true,
      'museum.om': true,
      'net.om': true,
      'org.om': true,
      'pro.om': true,
      org: true,
      pa: true,
      'ac.pa': true,
      'gob.pa': true,
      'com.pa': true,
      'org.pa': true,
      'sld.pa': true,
      'edu.pa': true,
      'net.pa': true,
      'ing.pa': true,
      'abo.pa': true,
      'med.pa': true,
      'nom.pa': true,
      pe: true,
      'edu.pe': true,
      'gob.pe': true,
      'nom.pe': true,
      'mil.pe': true,
      'org.pe': true,
      'com.pe': true,
      'net.pe': true,
      pf: true,
      'com.pf': true,
      'org.pf': true,
      'edu.pf': true,
      '*.pg': true,
      ph: true,
      'com.ph': true,
      'net.ph': true,
      'org.ph': true,
      'gov.ph': true,
      'edu.ph': true,
      'ngo.ph': true,
      'mil.ph': true,
      'i.ph': true,
      pk: true,
      'com.pk': true,
      'net.pk': true,
      'edu.pk': true,
      'org.pk': true,
      'fam.pk': true,
      'biz.pk': true,
      'web.pk': true,
      'gov.pk': true,
      'gob.pk': true,
      'gok.pk': true,
      'gon.pk': true,
      'gop.pk': true,
      'gos.pk': true,
      'info.pk': true,
      pl: true,
      'com.pl': true,
      'net.pl': true,
      'org.pl': true,
      'aid.pl': true,
      'agro.pl': true,
      'atm.pl': true,
      'auto.pl': true,
      'biz.pl': true,
      'edu.pl': true,
      'gmina.pl': true,
      'gsm.pl': true,
      'info.pl': true,
      'mail.pl': true,
      'miasta.pl': true,
      'media.pl': true,
      'mil.pl': true,
      'nieruchomosci.pl': true,
      'nom.pl': true,
      'pc.pl': true,
      'powiat.pl': true,
      'priv.pl': true,
      'realestate.pl': true,
      'rel.pl': true,
      'sex.pl': true,
      'shop.pl': true,
      'sklep.pl': true,
      'sos.pl': true,
      'szkola.pl': true,
      'targi.pl': true,
      'tm.pl': true,
      'tourism.pl': true,
      'travel.pl': true,
      'turystyka.pl': true,
      'gov.pl': true,
      'ap.gov.pl': true,
      'ic.gov.pl': true,
      'is.gov.pl': true,
      'us.gov.pl': true,
      'kmpsp.gov.pl': true,
      'kppsp.gov.pl': true,
      'kwpsp.gov.pl': true,
      'psp.gov.pl': true,
      'wskr.gov.pl': true,
      'kwp.gov.pl': true,
      'mw.gov.pl': true,
      'ug.gov.pl': true,
      'um.gov.pl': true,
      'umig.gov.pl': true,
      'ugim.gov.pl': true,
      'upow.gov.pl': true,
      'uw.gov.pl': true,
      'starostwo.gov.pl': true,
      'pa.gov.pl': true,
      'po.gov.pl': true,
      'psse.gov.pl': true,
      'pup.gov.pl': true,
      'rzgw.gov.pl': true,
      'sa.gov.pl': true,
      'so.gov.pl': true,
      'sr.gov.pl': true,
      'wsa.gov.pl': true,
      'sko.gov.pl': true,
      'uzs.gov.pl': true,
      'wiih.gov.pl': true,
      'winb.gov.pl': true,
      'pinb.gov.pl': true,
      'wios.gov.pl': true,
      'witd.gov.pl': true,
      'wzmiuw.gov.pl': true,
      'piw.gov.pl': true,
      'wiw.gov.pl': true,
      'griw.gov.pl': true,
      'wif.gov.pl': true,
      'oum.gov.pl': true,
      'sdn.gov.pl': true,
      'zp.gov.pl': true,
      'uppo.gov.pl': true,
      'mup.gov.pl': true,
      'wuoz.gov.pl': true,
      'konsulat.gov.pl': true,
      'oirm.gov.pl': true,
      'augustow.pl': true,
      'babia-gora.pl': true,
      'bedzin.pl': true,
      'beskidy.pl': true,
      'bialowieza.pl': true,
      'bialystok.pl': true,
      'bielawa.pl': true,
      'bieszczady.pl': true,
      'boleslawiec.pl': true,
      'bydgoszcz.pl': true,
      'bytom.pl': true,
      'cieszyn.pl': true,
      'czeladz.pl': true,
      'czest.pl': true,
      'dlugoleka.pl': true,
      'elblag.pl': true,
      'elk.pl': true,
      'glogow.pl': true,
      'gniezno.pl': true,
      'gorlice.pl': true,
      'grajewo.pl': true,
      'ilawa.pl': true,
      'jaworzno.pl': true,
      'jelenia-gora.pl': true,
      'jgora.pl': true,
      'kalisz.pl': true,
      'kazimierz-dolny.pl': true,
      'karpacz.pl': true,
      'kartuzy.pl': true,
      'kaszuby.pl': true,
      'katowice.pl': true,
      'kepno.pl': true,
      'ketrzyn.pl': true,
      'klodzko.pl': true,
      'kobierzyce.pl': true,
      'kolobrzeg.pl': true,
      'konin.pl': true,
      'konskowola.pl': true,
      'kutno.pl': true,
      'lapy.pl': true,
      'lebork.pl': true,
      'legnica.pl': true,
      'lezajsk.pl': true,
      'limanowa.pl': true,
      'lomza.pl': true,
      'lowicz.pl': true,
      'lubin.pl': true,
      'lukow.pl': true,
      'malbork.pl': true,
      'malopolska.pl': true,
      'mazowsze.pl': true,
      'mazury.pl': true,
      'mielec.pl': true,
      'mielno.pl': true,
      'mragowo.pl': true,
      'naklo.pl': true,
      'nowaruda.pl': true,
      'nysa.pl': true,
      'olawa.pl': true,
      'olecko.pl': true,
      'olkusz.pl': true,
      'olsztyn.pl': true,
      'opoczno.pl': true,
      'opole.pl': true,
      'ostroda.pl': true,
      'ostroleka.pl': true,
      'ostrowiec.pl': true,
      'ostrowwlkp.pl': true,
      'pila.pl': true,
      'pisz.pl': true,
      'podhale.pl': true,
      'podlasie.pl': true,
      'polkowice.pl': true,
      'pomorze.pl': true,
      'pomorskie.pl': true,
      'prochowice.pl': true,
      'pruszkow.pl': true,
      'przeworsk.pl': true,
      'pulawy.pl': true,
      'radom.pl': true,
      'rawa-maz.pl': true,
      'rybnik.pl': true,
      'rzeszow.pl': true,
      'sanok.pl': true,
      'sejny.pl': true,
      'slask.pl': true,
      'slupsk.pl': true,
      'sosnowiec.pl': true,
      'stalowa-wola.pl': true,
      'skoczow.pl': true,
      'starachowice.pl': true,
      'stargard.pl': true,
      'suwalki.pl': true,
      'swidnica.pl': true,
      'swiebodzin.pl': true,
      'swinoujscie.pl': true,
      'szczecin.pl': true,
      'szczytno.pl': true,
      'tarnobrzeg.pl': true,
      'tgory.pl': true,
      'turek.pl': true,
      'tychy.pl': true,
      'ustka.pl': true,
      'walbrzych.pl': true,
      'warmia.pl': true,
      'warszawa.pl': true,
      'waw.pl': true,
      'wegrow.pl': true,
      'wielun.pl': true,
      'wlocl.pl': true,
      'wloclawek.pl': true,
      'wodzislaw.pl': true,
      'wolomin.pl': true,
      'wroclaw.pl': true,
      'zachpomor.pl': true,
      'zagan.pl': true,
      'zarow.pl': true,
      'zgora.pl': true,
      'zgorzelec.pl': true,
      pm: true,
      pn: true,
      'gov.pn': true,
      'co.pn': true,
      'org.pn': true,
      'edu.pn': true,
      'net.pn': true,
      post: true,
      pr: true,
      'com.pr': true,
      'net.pr': true,
      'org.pr': true,
      'gov.pr': true,
      'edu.pr': true,
      'isla.pr': true,
      'pro.pr': true,
      'biz.pr': true,
      'info.pr': true,
      'name.pr': true,
      'est.pr': true,
      'prof.pr': true,
      'ac.pr': true,
      pro: true,
      'aaa.pro': true,
      'aca.pro': true,
      'acct.pro': true,
      'avocat.pro': true,
      'bar.pro': true,
      'cpa.pro': true,
      'eng.pro': true,
      'jur.pro': true,
      'law.pro': true,
      'med.pro': true,
      'recht.pro': true,
      ps: true,
      'edu.ps': true,
      'gov.ps': true,
      'sec.ps': true,
      'plo.ps': true,
      'com.ps': true,
      'org.ps': true,
      'net.ps': true,
      pt: true,
      'net.pt': true,
      'gov.pt': true,
      'org.pt': true,
      'edu.pt': true,
      'int.pt': true,
      'publ.pt': true,
      'com.pt': true,
      'nome.pt': true,
      pw: true,
      'co.pw': true,
      'ne.pw': true,
      'or.pw': true,
      'ed.pw': true,
      'go.pw': true,
      'belau.pw': true,
      py: true,
      'com.py': true,
      'coop.py': true,
      'edu.py': true,
      'gov.py': true,
      'mil.py': true,
      'net.py': true,
      'org.py': true,
      qa: true,
      'com.qa': true,
      'edu.qa': true,
      'gov.qa': true,
      'mil.qa': true,
      'name.qa': true,
      'net.qa': true,
      'org.qa': true,
      'sch.qa': true,
      re: true,
      'asso.re': true,
      'com.re': true,
      'nom.re': true,
      ro: true,
      'arts.ro': true,
      'com.ro': true,
      'firm.ro': true,
      'info.ro': true,
      'nom.ro': true,
      'nt.ro': true,
      'org.ro': true,
      'rec.ro': true,
      'store.ro': true,
      'tm.ro': true,
      'www.ro': true,
      rs: true,
      'ac.rs': true,
      'co.rs': true,
      'edu.rs': true,
      'gov.rs': true,
      'in.rs': true,
      'org.rs': true,
      ru: true,
      'ac.ru': true,
      'com.ru': true,
      'edu.ru': true,
      'int.ru': true,
      'net.ru': true,
      'org.ru': true,
      'pp.ru': true,
      'adygeya.ru': true,
      'altai.ru': true,
      'amur.ru': true,
      'arkhangelsk.ru': true,
      'astrakhan.ru': true,
      'bashkiria.ru': true,
      'belgorod.ru': true,
      'bir.ru': true,
      'bryansk.ru': true,
      'buryatia.ru': true,
      'cbg.ru': true,
      'chel.ru': true,
      'chelyabinsk.ru': true,
      'chita.ru': true,
      'chukotka.ru': true,
      'chuvashia.ru': true,
      'dagestan.ru': true,
      'dudinka.ru': true,
      'e-burg.ru': true,
      'grozny.ru': true,
      'irkutsk.ru': true,
      'ivanovo.ru': true,
      'izhevsk.ru': true,
      'jar.ru': true,
      'joshkar-ola.ru': true,
      'kalmykia.ru': true,
      'kaluga.ru': true,
      'kamchatka.ru': true,
      'karelia.ru': true,
      'kazan.ru': true,
      'kchr.ru': true,
      'kemerovo.ru': true,
      'khabarovsk.ru': true,
      'khakassia.ru': true,
      'khv.ru': true,
      'kirov.ru': true,
      'koenig.ru': true,
      'komi.ru': true,
      'kostroma.ru': true,
      'krasnoyarsk.ru': true,
      'kuban.ru': true,
      'kurgan.ru': true,
      'kursk.ru': true,
      'lipetsk.ru': true,
      'magadan.ru': true,
      'mari.ru': true,
      'mari-el.ru': true,
      'marine.ru': true,
      'mordovia.ru': true,
      'msk.ru': true,
      'murmansk.ru': true,
      'nalchik.ru': true,
      'nnov.ru': true,
      'nov.ru': true,
      'novosibirsk.ru': true,
      'nsk.ru': true,
      'omsk.ru': true,
      'orenburg.ru': true,
      'oryol.ru': true,
      'palana.ru': true,
      'penza.ru': true,
      'perm.ru': true,
      'ptz.ru': true,
      'rnd.ru': true,
      'ryazan.ru': true,
      'sakhalin.ru': true,
      'samara.ru': true,
      'saratov.ru': true,
      'simbirsk.ru': true,
      'smolensk.ru': true,
      'spb.ru': true,
      'stavropol.ru': true,
      'stv.ru': true,
      'surgut.ru': true,
      'tambov.ru': true,
      'tatarstan.ru': true,
      'tom.ru': true,
      'tomsk.ru': true,
      'tsaritsyn.ru': true,
      'tsk.ru': true,
      'tula.ru': true,
      'tuva.ru': true,
      'tver.ru': true,
      'tyumen.ru': true,
      'udm.ru': true,
      'udmurtia.ru': true,
      'ulan-ude.ru': true,
      'vladikavkaz.ru': true,
      'vladimir.ru': true,
      'vladivostok.ru': true,
      'volgograd.ru': true,
      'vologda.ru': true,
      'voronezh.ru': true,
      'vrn.ru': true,
      'vyatka.ru': true,
      'yakutia.ru': true,
      'yamal.ru': true,
      'yaroslavl.ru': true,
      'yekaterinburg.ru': true,
      'yuzhno-sakhalinsk.ru': true,
      'amursk.ru': true,
      'baikal.ru': true,
      'cmw.ru': true,
      'fareast.ru': true,
      'jamal.ru': true,
      'kms.ru': true,
      'k-uralsk.ru': true,
      'kustanai.ru': true,
      'kuzbass.ru': true,
      'mytis.ru': true,
      'nakhodka.ru': true,
      'nkz.ru': true,
      'norilsk.ru': true,
      'oskol.ru': true,
      'pyatigorsk.ru': true,
      'rubtsovsk.ru': true,
      'snz.ru': true,
      'syzran.ru': true,
      'vdonsk.ru': true,
      'zgrad.ru': true,
      'gov.ru': true,
      'mil.ru': true,
      'test.ru': true,
      rw: true,
      'gov.rw': true,
      'net.rw': true,
      'edu.rw': true,
      'ac.rw': true,
      'com.rw': true,
      'co.rw': true,
      'int.rw': true,
      'mil.rw': true,
      'gouv.rw': true,
      sa: true,
      'com.sa': true,
      'net.sa': true,
      'org.sa': true,
      'gov.sa': true,
      'med.sa': true,
      'pub.sa': true,
      'edu.sa': true,
      'sch.sa': true,
      sb: true,
      'com.sb': true,
      'edu.sb': true,
      'gov.sb': true,
      'net.sb': true,
      'org.sb': true,
      sc: true,
      'com.sc': true,
      'gov.sc': true,
      'net.sc': true,
      'org.sc': true,
      'edu.sc': true,
      sd: true,
      'com.sd': true,
      'net.sd': true,
      'org.sd': true,
      'edu.sd': true,
      'med.sd': true,
      'tv.sd': true,
      'gov.sd': true,
      'info.sd': true,
      se: true,
      'a.se': true,
      'ac.se': true,
      'b.se': true,
      'bd.se': true,
      'brand.se': true,
      'c.se': true,
      'd.se': true,
      'e.se': true,
      'f.se': true,
      'fh.se': true,
      'fhsk.se': true,
      'fhv.se': true,
      'g.se': true,
      'h.se': true,
      'i.se': true,
      'k.se': true,
      'komforb.se': true,
      'kommunalforbund.se': true,
      'komvux.se': true,
      'l.se': true,
      'lanbib.se': true,
      'm.se': true,
      'n.se': true,
      'naturbruksgymn.se': true,
      'o.se': true,
      'org.se': true,
      'p.se': true,
      'parti.se': true,
      'pp.se': true,
      'press.se': true,
      'r.se': true,
      's.se': true,
      't.se': true,
      'tm.se': true,
      'u.se': true,
      'w.se': true,
      'x.se': true,
      'y.se': true,
      'z.se': true,
      sg: true,
      'com.sg': true,
      'net.sg': true,
      'org.sg': true,
      'gov.sg': true,
      'edu.sg': true,
      'per.sg': true,
      sh: true,
      'com.sh': true,
      'net.sh': true,
      'gov.sh': true,
      'org.sh': true,
      'mil.sh': true,
      si: true,
      sj: true,
      sk: true,
      sl: true,
      'com.sl': true,
      'net.sl': true,
      'edu.sl': true,
      'gov.sl': true,
      'org.sl': true,
      sm: true,
      sn: true,
      'art.sn': true,
      'com.sn': true,
      'edu.sn': true,
      'gouv.sn': true,
      'org.sn': true,
      'perso.sn': true,
      'univ.sn': true,
      so: true,
      'com.so': true,
      'net.so': true,
      'org.so': true,
      sr: true,
      st: true,
      'co.st': true,
      'com.st': true,
      'consulado.st': true,
      'edu.st': true,
      'embaixada.st': true,
      'gov.st': true,
      'mil.st': true,
      'net.st': true,
      'org.st': true,
      'principe.st': true,
      'saotome.st': true,
      'store.st': true,
      su: true,
      'adygeya.su': true,
      'arkhangelsk.su': true,
      'balashov.su': true,
      'bashkiria.su': true,
      'bryansk.su': true,
      'dagestan.su': true,
      'grozny.su': true,
      'ivanovo.su': true,
      'kalmykia.su': true,
      'kaluga.su': true,
      'karelia.su': true,
      'khakassia.su': true,
      'krasnodar.su': true,
      'kurgan.su': true,
      'lenug.su': true,
      'mordovia.su': true,
      'msk.su': true,
      'murmansk.su': true,
      'nalchik.su': true,
      'nov.su': true,
      'obninsk.su': true,
      'penza.su': true,
      'pokrovsk.su': true,
      'sochi.su': true,
      'spb.su': true,
      'togliatti.su': true,
      'troitsk.su': true,
      'tula.su': true,
      'tuva.su': true,
      'vladikavkaz.su': true,
      'vladimir.su': true,
      'vologda.su': true,
      sv: true,
      'com.sv': true,
      'edu.sv': true,
      'gob.sv': true,
      'org.sv': true,
      'red.sv': true,
      sx: true,
      'gov.sx': true,
      sy: true,
      'edu.sy': true,
      'gov.sy': true,
      'net.sy': true,
      'mil.sy': true,
      'com.sy': true,
      'org.sy': true,
      sz: true,
      'co.sz': true,
      'ac.sz': true,
      'org.sz': true,
      tc: true,
      td: true,
      tel: true,
      tf: true,
      tg: true,
      th: true,
      'ac.th': true,
      'co.th': true,
      'go.th': true,
      'in.th': true,
      'mi.th': true,
      'net.th': true,
      'or.th': true,
      tj: true,
      'ac.tj': true,
      'biz.tj': true,
      'co.tj': true,
      'com.tj': true,
      'edu.tj': true,
      'go.tj': true,
      'gov.tj': true,
      'int.tj': true,
      'mil.tj': true,
      'name.tj': true,
      'net.tj': true,
      'nic.tj': true,
      'org.tj': true,
      'test.tj': true,
      'web.tj': true,
      tk: true,
      tl: true,
      'gov.tl': true,
      tm: true,
      'com.tm': true,
      'co.tm': true,
      'org.tm': true,
      'net.tm': true,
      'nom.tm': true,
      'gov.tm': true,
      'mil.tm': true,
      'edu.tm': true,
      tn: true,
      'com.tn': true,
      'ens.tn': true,
      'fin.tn': true,
      'gov.tn': true,
      'ind.tn': true,
      'intl.tn': true,
      'nat.tn': true,
      'net.tn': true,
      'org.tn': true,
      'info.tn': true,
      'perso.tn': true,
      'tourism.tn': true,
      'edunet.tn': true,
      'rnrt.tn': true,
      'rns.tn': true,
      'rnu.tn': true,
      'mincom.tn': true,
      'agrinet.tn': true,
      'defense.tn': true,
      'turen.tn': true,
      to: true,
      'com.to': true,
      'gov.to': true,
      'net.to': true,
      'org.to': true,
      'edu.to': true,
      'mil.to': true,
      tr: true,
      'com.tr': true,
      'info.tr': true,
      'biz.tr': true,
      'net.tr': true,
      'org.tr': true,
      'web.tr': true,
      'gen.tr': true,
      'tv.tr': true,
      'av.tr': true,
      'dr.tr': true,
      'bbs.tr': true,
      'name.tr': true,
      'tel.tr': true,
      'gov.tr': true,
      'bel.tr': true,
      'pol.tr': true,
      'mil.tr': true,
      'k12.tr': true,
      'edu.tr': true,
      'kep.tr': true,
      'nc.tr': true,
      'gov.nc.tr': true,
      travel: true,
      tt: true,
      'co.tt': true,
      'com.tt': true,
      'org.tt': true,
      'net.tt': true,
      'biz.tt': true,
      'info.tt': true,
      'pro.tt': true,
      'int.tt': true,
      'coop.tt': true,
      'jobs.tt': true,
      'mobi.tt': true,
      'travel.tt': true,
      'museum.tt': true,
      'aero.tt': true,
      'name.tt': true,
      'gov.tt': true,
      'edu.tt': true,
      tv: true,
      tw: true,
      'edu.tw': true,
      'gov.tw': true,
      'mil.tw': true,
      'com.tw': true,
      'net.tw': true,
      'org.tw': true,
      'idv.tw': true,
      'game.tw': true,
      'ebiz.tw': true,
      'club.tw': true,
      'xn--zf0ao64a.tw': true,
      'xn--uc0atv.tw': true,
      'xn--czrw28b.tw': true,
      tz: true,
      'ac.tz': true,
      'co.tz': true,
      'go.tz': true,
      'hotel.tz': true,
      'info.tz': true,
      'me.tz': true,
      'mil.tz': true,
      'mobi.tz': true,
      'ne.tz': true,
      'or.tz': true,
      'sc.tz': true,
      'tv.tz': true,
      ua: true,
      'com.ua': true,
      'edu.ua': true,
      'gov.ua': true,
      'in.ua': true,
      'net.ua': true,
      'org.ua': true,
      'cherkassy.ua': true,
      'cherkasy.ua': true,
      'chernigov.ua': true,
      'chernihiv.ua': true,
      'chernivtsi.ua': true,
      'chernovtsy.ua': true,
      'ck.ua': true,
      'cn.ua': true,
      'cr.ua': true,
      'crimea.ua': true,
      'cv.ua': true,
      'dn.ua': true,
      'dnepropetrovsk.ua': true,
      'dnipropetrovsk.ua': true,
      'dominic.ua': true,
      'donetsk.ua': true,
      'dp.ua': true,
      'if.ua': true,
      'ivano-frankivsk.ua': true,
      'kh.ua': true,
      'kharkiv.ua': true,
      'kharkov.ua': true,
      'kherson.ua': true,
      'khmelnitskiy.ua': true,
      'khmelnytskyi.ua': true,
      'kiev.ua': true,
      'kirovograd.ua': true,
      'km.ua': true,
      'kr.ua': true,
      'krym.ua': true,
      'ks.ua': true,
      'kv.ua': true,
      'kyiv.ua': true,
      'lg.ua': true,
      'lt.ua': true,
      'lugansk.ua': true,
      'lutsk.ua': true,
      'lv.ua': true,
      'lviv.ua': true,
      'mk.ua': true,
      'mykolaiv.ua': true,
      'nikolaev.ua': true,
      'od.ua': true,
      'odesa.ua': true,
      'odessa.ua': true,
      'pl.ua': true,
      'poltava.ua': true,
      'rivne.ua': true,
      'rovno.ua': true,
      'rv.ua': true,
      'sb.ua': true,
      'sebastopol.ua': true,
      'sevastopol.ua': true,
      'sm.ua': true,
      'sumy.ua': true,
      'te.ua': true,
      'ternopil.ua': true,
      'uz.ua': true,
      'uzhgorod.ua': true,
      'vinnica.ua': true,
      'vinnytsia.ua': true,
      'vn.ua': true,
      'volyn.ua': true,
      'yalta.ua': true,
      'zaporizhzhe.ua': true,
      'zaporizhzhia.ua': true,
      'zhitomir.ua': true,
      'zhytomyr.ua': true,
      'zp.ua': true,
      'zt.ua': true,
      ug: true,
      'co.ug': true,
      'or.ug': true,
      'ac.ug': true,
      'sc.ug': true,
      'go.ug': true,
      'ne.ug': true,
      'com.ug': true,
      'org.ug': true,
      uk: true,
      'ac.uk': true,
      'co.uk': true,
      'gov.uk': true,
      'ltd.uk': true,
      'me.uk': true,
      'net.uk': true,
      'nhs.uk': true,
      'org.uk': true,
      'plc.uk': true,
      'police.uk': true,
      '*.sch.uk': true,
      us: true,
      'dni.us': true,
      'fed.us': true,
      'isa.us': true,
      'kids.us': true,
      'nsn.us': true,
      'ak.us': true,
      'al.us': true,
      'ar.us': true,
      'as.us': true,
      'az.us': true,
      'ca.us': true,
      'co.us': true,
      'ct.us': true,
      'dc.us': true,
      'de.us': true,
      'fl.us': true,
      'ga.us': true,
      'gu.us': true,
      'hi.us': true,
      'ia.us': true,
      'id.us': true,
      'il.us': true,
      'in.us': true,
      'ks.us': true,
      'ky.us': true,
      'la.us': true,
      'ma.us': true,
      'md.us': true,
      'me.us': true,
      'mi.us': true,
      'mn.us': true,
      'mo.us': true,
      'ms.us': true,
      'mt.us': true,
      'nc.us': true,
      'nd.us': true,
      'ne.us': true,
      'nh.us': true,
      'nj.us': true,
      'nm.us': true,
      'nv.us': true,
      'ny.us': true,
      'oh.us': true,
      'ok.us': true,
      'or.us': true,
      'pa.us': true,
      'pr.us': true,
      'ri.us': true,
      'sc.us': true,
      'sd.us': true,
      'tn.us': true,
      'tx.us': true,
      'ut.us': true,
      'vi.us': true,
      'vt.us': true,
      'va.us': true,
      'wa.us': true,
      'wi.us': true,
      'wv.us': true,
      'wy.us': true,
      'k12.ak.us': true,
      'k12.al.us': true,
      'k12.ar.us': true,
      'k12.as.us': true,
      'k12.az.us': true,
      'k12.ca.us': true,
      'k12.co.us': true,
      'k12.ct.us': true,
      'k12.dc.us': true,
      'k12.de.us': true,
      'k12.fl.us': true,
      'k12.ga.us': true,
      'k12.gu.us': true,
      'k12.ia.us': true,
      'k12.id.us': true,
      'k12.il.us': true,
      'k12.in.us': true,
      'k12.ks.us': true,
      'k12.ky.us': true,
      'k12.la.us': true,
      'k12.ma.us': true,
      'k12.md.us': true,
      'k12.me.us': true,
      'k12.mi.us': true,
      'k12.mn.us': true,
      'k12.mo.us': true,
      'k12.ms.us': true,
      'k12.mt.us': true,
      'k12.nc.us': true,
      'k12.ne.us': true,
      'k12.nh.us': true,
      'k12.nj.us': true,
      'k12.nm.us': true,
      'k12.nv.us': true,
      'k12.ny.us': true,
      'k12.oh.us': true,
      'k12.ok.us': true,
      'k12.or.us': true,
      'k12.pa.us': true,
      'k12.pr.us': true,
      'k12.ri.us': true,
      'k12.sc.us': true,
      'k12.tn.us': true,
      'k12.tx.us': true,
      'k12.ut.us': true,
      'k12.vi.us': true,
      'k12.vt.us': true,
      'k12.va.us': true,
      'k12.wa.us': true,
      'k12.wi.us': true,
      'k12.wy.us': true,
      'cc.ak.us': true,
      'cc.al.us': true,
      'cc.ar.us': true,
      'cc.as.us': true,
      'cc.az.us': true,
      'cc.ca.us': true,
      'cc.co.us': true,
      'cc.ct.us': true,
      'cc.dc.us': true,
      'cc.de.us': true,
      'cc.fl.us': true,
      'cc.ga.us': true,
      'cc.gu.us': true,
      'cc.hi.us': true,
      'cc.ia.us': true,
      'cc.id.us': true,
      'cc.il.us': true,
      'cc.in.us': true,
      'cc.ks.us': true,
      'cc.ky.us': true,
      'cc.la.us': true,
      'cc.ma.us': true,
      'cc.md.us': true,
      'cc.me.us': true,
      'cc.mi.us': true,
      'cc.mn.us': true,
      'cc.mo.us': true,
      'cc.ms.us': true,
      'cc.mt.us': true,
      'cc.nc.us': true,
      'cc.nd.us': true,
      'cc.ne.us': true,
      'cc.nh.us': true,
      'cc.nj.us': true,
      'cc.nm.us': true,
      'cc.nv.us': true,
      'cc.ny.us': true,
      'cc.oh.us': true,
      'cc.ok.us': true,
      'cc.or.us': true,
      'cc.pa.us': true,
      'cc.pr.us': true,
      'cc.ri.us': true,
      'cc.sc.us': true,
      'cc.sd.us': true,
      'cc.tn.us': true,
      'cc.tx.us': true,
      'cc.ut.us': true,
      'cc.vi.us': true,
      'cc.vt.us': true,
      'cc.va.us': true,
      'cc.wa.us': true,
      'cc.wi.us': true,
      'cc.wv.us': true,
      'cc.wy.us': true,
      'lib.ak.us': true,
      'lib.al.us': true,
      'lib.ar.us': true,
      'lib.as.us': true,
      'lib.az.us': true,
      'lib.ca.us': true,
      'lib.co.us': true,
      'lib.ct.us': true,
      'lib.dc.us': true,
      'lib.fl.us': true,
      'lib.ga.us': true,
      'lib.gu.us': true,
      'lib.hi.us': true,
      'lib.ia.us': true,
      'lib.id.us': true,
      'lib.il.us': true,
      'lib.in.us': true,
      'lib.ks.us': true,
      'lib.ky.us': true,
      'lib.la.us': true,
      'lib.ma.us': true,
      'lib.md.us': true,
      'lib.me.us': true,
      'lib.mi.us': true,
      'lib.mn.us': true,
      'lib.mo.us': true,
      'lib.ms.us': true,
      'lib.mt.us': true,
      'lib.nc.us': true,
      'lib.nd.us': true,
      'lib.ne.us': true,
      'lib.nh.us': true,
      'lib.nj.us': true,
      'lib.nm.us': true,
      'lib.nv.us': true,
      'lib.ny.us': true,
      'lib.oh.us': true,
      'lib.ok.us': true,
      'lib.or.us': true,
      'lib.pa.us': true,
      'lib.pr.us': true,
      'lib.ri.us': true,
      'lib.sc.us': true,
      'lib.sd.us': true,
      'lib.tn.us': true,
      'lib.tx.us': true,
      'lib.ut.us': true,
      'lib.vi.us': true,
      'lib.vt.us': true,
      'lib.va.us': true,
      'lib.wa.us': true,
      'lib.wi.us': true,
      'lib.wy.us': true,
      'pvt.k12.ma.us': true,
      'chtr.k12.ma.us': true,
      'paroch.k12.ma.us': true,
      uy: true,
      'com.uy': true,
      'edu.uy': true,
      'gub.uy': true,
      'mil.uy': true,
      'net.uy': true,
      'org.uy': true,
      uz: true,
      'co.uz': true,
      'com.uz': true,
      'net.uz': true,
      'org.uz': true,
      va: true,
      vc: true,
      'com.vc': true,
      'net.vc': true,
      'org.vc': true,
      'gov.vc': true,
      'mil.vc': true,
      'edu.vc': true,
      ve: true,
      'arts.ve': true,
      'co.ve': true,
      'com.ve': true,
      'e12.ve': true,
      'edu.ve': true,
      'firm.ve': true,
      'gob.ve': true,
      'gov.ve': true,
      'info.ve': true,
      'int.ve': true,
      'mil.ve': true,
      'net.ve': true,
      'org.ve': true,
      'rec.ve': true,
      'store.ve': true,
      'tec.ve': true,
      'web.ve': true,
      vg: true,
      vi: true,
      'co.vi': true,
      'com.vi': true,
      'k12.vi': true,
      'net.vi': true,
      'org.vi': true,
      vn: true,
      'com.vn': true,
      'net.vn': true,
      'org.vn': true,
      'edu.vn': true,
      'gov.vn': true,
      'int.vn': true,
      'ac.vn': true,
      'biz.vn': true,
      'info.vn': true,
      'name.vn': true,
      'pro.vn': true,
      'health.vn': true,
      vu: true,
      'com.vu': true,
      'edu.vu': true,
      'net.vu': true,
      'org.vu': true,
      wf: true,
      ws: true,
      'com.ws': true,
      'net.ws': true,
      'org.ws': true,
      'gov.ws': true,
      'edu.ws': true,
      yt: true,
      'xn--mgbaam7a8h': true,
      'xn--y9a3aq': true,
      'xn--54b7fta0cc': true,
      'xn--90ais': true,
      'xn--fiqs8s': true,
      'xn--fiqz9s': true,
      'xn--lgbbat1ad8j': true,
      'xn--wgbh1c': true,
      'xn--e1a4c': true,
      'xn--node': true,
      'xn--qxam': true,
      'xn--j6w193g': true,
      'xn--h2brj9c': true,
      'xn--mgbbh1a71e': true,
      'xn--fpcrj9c3d': true,
      'xn--gecrj9c': true,
      'xn--s9brj9c': true,
      'xn--45brj9c': true,
      'xn--xkc2dl3a5ee0h': true,
      'xn--mgba3a4f16a': true,
      'xn--mgba3a4fra': true,
      'xn--mgbtx2b': true,
      'xn--mgbayh7gpa': true,
      'xn--3e0b707e': true,
      'xn--80ao21a': true,
      'xn--fzc2c9e2c': true,
      'xn--xkc2al3hye2a': true,
      'xn--mgbc0a9azcg': true,
      'xn--d1alf': true,
      'xn--l1acc': true,
      'xn--mix891f': true,
      'xn--mix082f': true,
      'xn--mgbx4cd0ab': true,
      'xn--mgb9awbf': true,
      'xn--mgbai9azgqp6j': true,
      'xn--mgbai9a5eva00b': true,
      'xn--ygbi2ammx': true,
      'xn--90a3ac': true,
      'xn--o1ac.xn--90a3ac': true,
      'xn--c1avg.xn--90a3ac': true,
      'xn--90azh.xn--90a3ac': true,
      'xn--d1at.xn--90a3ac': true,
      'xn--o1ach.xn--90a3ac': true,
      'xn--80au.xn--90a3ac': true,
      'xn--p1ai': true,
      'xn--wgbl6a': true,
      'xn--mgberp4a5d4ar': true,
      'xn--mgberp4a5d4a87g': true,
      'xn--mgbqly7c0a67fbc': true,
      'xn--mgbqly7cvafr': true,
      'xn--mgbpl2fh': true,
      'xn--yfro4i67o': true,
      'xn--clchc0ea0b2g2a9gcd': true,
      'xn--ogbpf8fl': true,
      'xn--mgbtf8fl': true,
      'xn--o3cw4h': true,
      'xn--pgbs0dh': true,
      'xn--kpry57d': true,
      'xn--kprw13d': true,
      'xn--nnx388a': true,
      'xn--j1amh': true,
      'xn--mgb2ddes': true,
      xxx: true,
      '*.ye': true,
      'ac.za': true,
      'agric.za': true,
      'alt.za': true,
      'co.za': true,
      'edu.za': true,
      'gov.za': true,
      'grondar.za': true,
      'law.za': true,
      'mil.za': true,
      'net.za': true,
      'ngo.za': true,
      'nis.za': true,
      'nom.za': true,
      'org.za': true,
      'school.za': true,
      'tm.za': true,
      'web.za': true,
      zm: true,
      'ac.zm': true,
      'biz.zm': true,
      'co.zm': true,
      'com.zm': true,
      'edu.zm': true,
      'gov.zm': true,
      'info.zm': true,
      'mil.zm': true,
      'net.zm': true,
      'org.zm': true,
      'sch.zm': true,
      '*.zw': true,
      aaa: true,
      aarp: true,
      abarth: true,
      abb: true,
      abbott: true,
      abbvie: true,
      abc: true,
      able: true,
      abogado: true,
      abudhabi: true,
      academy: true,
      accenture: true,
      accountant: true,
      accountants: true,
      aco: true,
      active: true,
      actor: true,
      adac: true,
      ads: true,
      adult: true,
      aeg: true,
      aetna: true,
      afamilycompany: true,
      afl: true,
      africa: true,
      agakhan: true,
      agency: true,
      aig: true,
      aigo: true,
      airbus: true,
      airforce: true,
      airtel: true,
      akdn: true,
      alfaromeo: true,
      alibaba: true,
      alipay: true,
      allfinanz: true,
      allstate: true,
      ally: true,
      alsace: true,
      alstom: true,
      americanexpress: true,
      americanfamily: true,
      amex: true,
      amfam: true,
      amica: true,
      amsterdam: true,
      analytics: true,
      android: true,
      anquan: true,
      anz: true,
      aol: true,
      apartments: true,
      app: true,
      apple: true,
      aquarelle: true,
      arab: true,
      aramco: true,
      archi: true,
      army: true,
      art: true,
      arte: true,
      asda: true,
      associates: true,
      athleta: true,
      attorney: true,
      auction: true,
      audi: true,
      audible: true,
      audio: true,
      auspost: true,
      author: true,
      auto: true,
      autos: true,
      avianca: true,
      aws: true,
      axa: true,
      azure: true,
      baby: true,
      baidu: true,
      banamex: true,
      bananarepublic: true,
      band: true,
      bank: true,
      bar: true,
      barcelona: true,
      barclaycard: true,
      barclays: true,
      barefoot: true,
      bargains: true,
      baseball: true,
      basketball: true,
      bauhaus: true,
      bayern: true,
      bbc: true,
      bbt: true,
      bbva: true,
      bcg: true,
      bcn: true,
      beats: true,
      beauty: true,
      beer: true,
      bentley: true,
      berlin: true,
      best: true,
      bestbuy: true,
      bet: true,
      bharti: true,
      bible: true,
      bid: true,
      bike: true,
      bing: true,
      bingo: true,
      bio: true,
      black: true,
      blackfriday: true,
      blanco: true,
      blockbuster: true,
      blog: true,
      bloomberg: true,
      blue: true,
      bms: true,
      bmw: true,
      bnl: true,
      bnpparibas: true,
      boats: true,
      boehringer: true,
      bofa: true,
      bom: true,
      bond: true,
      boo: true,
      book: true,
      booking: true,
      boots: true,
      bosch: true,
      bostik: true,
      boston: true,
      bot: true,
      boutique: true,
      box: true,
      bradesco: true,
      bridgestone: true,
      broadway: true,
      broker: true,
      brother: true,
      brussels: true,
      budapest: true,
      bugatti: true,
      build: true,
      builders: true,
      business: true,
      buy: true,
      buzz: true,
      bzh: true,
      cab: true,
      cafe: true,
      cal: true,
      call: true,
      calvinklein: true,
      cam: true,
      camera: true,
      camp: true,
      cancerresearch: true,
      canon: true,
      capetown: true,
      capital: true,
      capitalone: true,
      car: true,
      caravan: true,
      cards: true,
      care: true,
      career: true,
      careers: true,
      cars: true,
      cartier: true,
      casa: true,
      case: true,
      caseih: true,
      cash: true,
      casino: true,
      catering: true,
      catholic: true,
      cba: true,
      cbn: true,
      cbre: true,
      cbs: true,
      ceb: true,
      center: true,
      ceo: true,
      cern: true,
      cfa: true,
      cfd: true,
      chanel: true,
      channel: true,
      chase: true,
      chat: true,
      cheap: true,
      chintai: true,
      chloe: true,
      christmas: true,
      chrome: true,
      chrysler: true,
      church: true,
      cipriani: true,
      circle: true,
      cisco: true,
      citadel: true,
      citi: true,
      citic: true,
      city: true,
      cityeats: true,
      claims: true,
      cleaning: true,
      click: true,
      clinic: true,
      clinique: true,
      clothing: true,
      cloud: true,
      club: true,
      clubmed: true,
      coach: true,
      codes: true,
      coffee: true,
      college: true,
      cologne: true,
      comcast: true,
      commbank: true,
      community: true,
      company: true,
      compare: true,
      computer: true,
      comsec: true,
      condos: true,
      construction: true,
      consulting: true,
      contact: true,
      contractors: true,
      cooking: true,
      cookingchannel: true,
      cool: true,
      corsica: true,
      country: true,
      coupon: true,
      coupons: true,
      courses: true,
      credit: true,
      creditcard: true,
      creditunion: true,
      cricket: true,
      crown: true,
      crs: true,
      cruise: true,
      cruises: true,
      csc: true,
      cuisinella: true,
      cymru: true,
      cyou: true,
      dabur: true,
      dad: true,
      dance: true,
      data: true,
      date: true,
      dating: true,
      datsun: true,
      day: true,
      dclk: true,
      dds: true,
      deal: true,
      dealer: true,
      deals: true,
      degree: true,
      delivery: true,
      dell: true,
      deloitte: true,
      delta: true,
      democrat: true,
      dental: true,
      dentist: true,
      desi: true,
      design: true,
      dev: true,
      dhl: true,
      diamonds: true,
      diet: true,
      digital: true,
      direct: true,
      directory: true,
      discount: true,
      discover: true,
      dish: true,
      diy: true,
      dnp: true,
      docs: true,
      doctor: true,
      dodge: true,
      dog: true,
      doha: true,
      domains: true,
      dot: true,
      download: true,
      drive: true,
      dtv: true,
      dubai: true,
      duck: true,
      dunlop: true,
      duns: true,
      dupont: true,
      durban: true,
      dvag: true,
      dvr: true,
      dwg: true,
      earth: true,
      eat: true,
      eco: true,
      edeka: true,
      education: true,
      email: true,
      emerck: true,
      emerson: true,
      energy: true,
      engineer: true,
      engineering: true,
      enterprises: true,
      epost: true,
      epson: true,
      equipment: true,
      ericsson: true,
      erni: true,
      esq: true,
      estate: true,
      esurance: true,
      etisalat: true,
      eurovision: true,
      eus: true,
      events: true,
      everbank: true,
      exchange: true,
      expert: true,
      exposed: true,
      express: true,
      extraspace: true,
      fage: true,
      fail: true,
      fairwinds: true,
      faith: true,
      family: true,
      fan: true,
      fans: true,
      farm: true,
      farmers: true,
      fashion: true,
      fast: true,
      fedex: true,
      feedback: true,
      ferrari: true,
      ferrero: true,
      fiat: true,
      fidelity: true,
      fido: true,
      film: true,
      final: true,
      finance: true,
      financial: true,
      fire: true,
      firestone: true,
      firmdale: true,
      fish: true,
      fishing: true,
      fit: true,
      fitness: true,
      flickr: true,
      flights: true,
      flir: true,
      florist: true,
      flowers: true,
      fly: true,
      foo: true,
      food: true,
      foodnetwork: true,
      football: true,
      ford: true,
      forex: true,
      forsale: true,
      forum: true,
      foundation: true,
      fox: true,
      free: true,
      fresenius: true,
      frl: true,
      frogans: true,
      frontdoor: true,
      frontier: true,
      ftr: true,
      fujitsu: true,
      fujixerox: true,
      fun: true,
      fund: true,
      furniture: true,
      futbol: true,
      fyi: true,
      gal: true,
      gallery: true,
      gallo: true,
      gallup: true,
      game: true,
      games: true,
      gap: true,
      garden: true,
      gbiz: true,
      gdn: true,
      gea: true,
      gent: true,
      genting: true,
      george: true,
      ggee: true,
      gift: true,
      gifts: true,
      gives: true,
      giving: true,
      glade: true,
      glass: true,
      gle: true,
      global: true,
      globo: true,
      gmail: true,
      gmbh: true,
      gmo: true,
      gmx: true,
      godaddy: true,
      gold: true,
      goldpoint: true,
      golf: true,
      goo: true,
      goodhands: true,
      goodyear: true,
      goog: true,
      google: true,
      gop: true,
      got: true,
      grainger: true,
      graphics: true,
      gratis: true,
      green: true,
      gripe: true,
      grocery: true,
      group: true,
      guardian: true,
      gucci: true,
      guge: true,
      guide: true,
      guitars: true,
      guru: true,
      hair: true,
      hamburg: true,
      hangout: true,
      haus: true,
      hbo: true,
      hdfc: true,
      hdfcbank: true,
      health: true,
      healthcare: true,
      help: true,
      helsinki: true,
      here: true,
      hermes: true,
      hgtv: true,
      hiphop: true,
      hisamitsu: true,
      hitachi: true,
      hiv: true,
      hkt: true,
      hockey: true,
      holdings: true,
      holiday: true,
      homedepot: true,
      homegoods: true,
      homes: true,
      homesense: true,
      honda: true,
      honeywell: true,
      horse: true,
      host: true,
      hosting: true,
      hot: true,
      hoteles: true,
      hotels: true,
      hotmail: true,
      house: true,
      how: true,
      hsbc: true,
      htc: true,
      hughes: true,
      hyatt: true,
      hyundai: true,
      ibm: true,
      icbc: true,
      ice: true,
      icu: true,
      ieee: true,
      ifm: true,
      iinet: true,
      ikano: true,
      imamat: true,
      imdb: true,
      immo: true,
      immobilien: true,
      industries: true,
      infiniti: true,
      ing: true,
      ink: true,
      institute: true,
      insurance: true,
      insure: true,
      intel: true,
      international: true,
      intuit: true,
      investments: true,
      ipiranga: true,
      irish: true,
      iselect: true,
      ismaili: true,
      ist: true,
      istanbul: true,
      itau: true,
      itv: true,
      iveco: true,
      iwc: true,
      jaguar: true,
      java: true,
      jcb: true,
      jcp: true,
      jeep: true,
      jetzt: true,
      jewelry: true,
      jio: true,
      jlc: true,
      jll: true,
      jmp: true,
      jnj: true,
      joburg: true,
      jot: true,
      joy: true,
      jpmorgan: true,
      jprs: true,
      juegos: true,
      juniper: true,
      kaufen: true,
      kddi: true,
      kerryhotels: true,
      kerrylogistics: true,
      kerryproperties: true,
      kfh: true,
      kia: true,
      kim: true,
      kinder: true,
      kindle: true,
      kitchen: true,
      kiwi: true,
      koeln: true,
      komatsu: true,
      kosher: true,
      kpmg: true,
      kpn: true,
      krd: true,
      kred: true,
      kuokgroup: true,
      kyoto: true,
      lacaixa: true,
      ladbrokes: true,
      lamborghini: true,
      lamer: true,
      lancaster: true,
      lancia: true,
      lancome: true,
      land: true,
      landrover: true,
      lanxess: true,
      lasalle: true,
      lat: true,
      latino: true,
      latrobe: true,
      law: true,
      lawyer: true,
      lds: true,
      lease: true,
      leclerc: true,
      lefrak: true,
      legal: true,
      lego: true,
      lexus: true,
      lgbt: true,
      liaison: true,
      lidl: true,
      life: true,
      lifeinsurance: true,
      lifestyle: true,
      lighting: true,
      like: true,
      lilly: true,
      limited: true,
      limo: true,
      lincoln: true,
      linde: true,
      link: true,
      lipsy: true,
      live: true,
      living: true,
      lixil: true,
      loan: true,
      loans: true,
      locker: true,
      locus: true,
      loft: true,
      lol: true,
      london: true,
      lotte: true,
      lotto: true,
      love: true,
      lpl: true,
      lplfinancial: true,
      ltd: true,
      ltda: true,
      lundbeck: true,
      lupin: true,
      luxe: true,
      luxury: true,
      macys: true,
      madrid: true,
      maif: true,
      maison: true,
      makeup: true,
      man: true,
      management: true,
      mango: true,
      map: true,
      market: true,
      marketing: true,
      markets: true,
      marriott: true,
      marshalls: true,
      maserati: true,
      mattel: true,
      mba: true,
      mcd: true,
      mcdonalds: true,
      mckinsey: true,
      med: true,
      media: true,
      meet: true,
      melbourne: true,
      meme: true,
      memorial: true,
      men: true,
      menu: true,
      meo: true,
      merckmsd: true,
      metlife: true,
      miami: true,
      microsoft: true,
      mini: true,
      mint: true,
      mit: true,
      mitsubishi: true,
      mlb: true,
      mls: true,
      mma: true,
      mobile: true,
      mobily: true,
      moda: true,
      moe: true,
      moi: true,
      mom: true,
      monash: true,
      money: true,
      monster: true,
      montblanc: true,
      mopar: true,
      mormon: true,
      mortgage: true,
      moscow: true,
      moto: true,
      motorcycles: true,
      mov: true,
      movie: true,
      movistar: true,
      msd: true,
      mtn: true,
      mtpc: true,
      mtr: true,
      mutual: true,
      mutuelle: true,
      nab: true,
      nadex: true,
      nagoya: true,
      nationwide: true,
      natura: true,
      navy: true,
      nba: true,
      nec: true,
      netbank: true,
      netflix: true,
      network: true,
      neustar: true,
      new: true,
      newholland: true,
      news: true,
      next: true,
      nextdirect: true,
      nexus: true,
      nfl: true,
      ngo: true,
      nhk: true,
      nico: true,
      nike: true,
      nikon: true,
      ninja: true,
      nissan: true,
      nissay: true,
      nokia: true,
      northwesternmutual: true,
      norton: true,
      now: true,
      nowruz: true,
      nowtv: true,
      nra: true,
      nrw: true,
      ntt: true,
      nyc: true,
      obi: true,
      observer: true,
      off: true,
      office: true,
      okinawa: true,
      olayan: true,
      olayangroup: true,
      oldnavy: true,
      ollo: true,
      omega: true,
      one: true,
      ong: true,
      onl: true,
      online: true,
      onyourside: true,
      ooo: true,
      open: true,
      oracle: true,
      orange: true,
      organic: true,
      orientexpress: true,
      origins: true,
      osaka: true,
      otsuka: true,
      ott: true,
      ovh: true,
      page: true,
      pamperedchef: true,
      panasonic: true,
      panerai: true,
      paris: true,
      pars: true,
      partners: true,
      parts: true,
      party: true,
      passagens: true,
      pay: true,
      pccw: true,
      pet: true,
      pfizer: true,
      pharmacy: true,
      phd: true,
      philips: true,
      phone: true,
      photo: true,
      photography: true,
      photos: true,
      physio: true,
      piaget: true,
      pics: true,
      pictet: true,
      pictures: true,
      pid: true,
      pin: true,
      ping: true,
      pink: true,
      pioneer: true,
      pizza: true,
      place: true,
      play: true,
      playstation: true,
      plumbing: true,
      plus: true,
      pnc: true,
      pohl: true,
      poker: true,
      politie: true,
      porn: true,
      pramerica: true,
      praxi: true,
      press: true,
      prime: true,
      prod: true,
      productions: true,
      prof: true,
      progressive: true,
      promo: true,
      properties: true,
      property: true,
      protection: true,
      pru: true,
      prudential: true,
      pub: true,
      pwc: true,
      qpon: true,
      quebec: true,
      quest: true,
      qvc: true,
      racing: true,
      radio: true,
      raid: true,
      read: true,
      realestate: true,
      realtor: true,
      realty: true,
      recipes: true,
      red: true,
      redstone: true,
      redumbrella: true,
      rehab: true,
      reise: true,
      reisen: true,
      reit: true,
      reliance: true,
      ren: true,
      rent: true,
      rentals: true,
      repair: true,
      report: true,
      republican: true,
      rest: true,
      restaurant: true,
      review: true,
      reviews: true,
      rexroth: true,
      rich: true,
      richardli: true,
      ricoh: true,
      rightathome: true,
      ril: true,
      rio: true,
      rip: true,
      rmit: true,
      rocher: true,
      rocks: true,
      rodeo: true,
      rogers: true,
      room: true,
      rsvp: true,
      ruhr: true,
      run: true,
      rwe: true,
      ryukyu: true,
      saarland: true,
      safe: true,
      safety: true,
      sakura: true,
      sale: true,
      salon: true,
      samsclub: true,
      samsung: true,
      sandvik: true,
      sandvikcoromant: true,
      sanofi: true,
      sap: true,
      sapo: true,
      sarl: true,
      sas: true,
      save: true,
      saxo: true,
      sbi: true,
      sbs: true,
      sca: true,
      scb: true,
      schaeffler: true,
      schmidt: true,
      scholarships: true,
      school: true,
      schule: true,
      schwarz: true,
      science: true,
      scjohnson: true,
      scor: true,
      scot: true,
      search: true,
      seat: true,
      secure: true,
      security: true,
      seek: true,
      select: true,
      sener: true,
      services: true,
      ses: true,
      seven: true,
      sew: true,
      sex: true,
      sexy: true,
      sfr: true,
      shangrila: true,
      sharp: true,
      shaw: true,
      shell: true,
      shia: true,
      shiksha: true,
      shoes: true,
      shop: true,
      shopping: true,
      shouji: true,
      show: true,
      showtime: true,
      shriram: true,
      silk: true,
      sina: true,
      singles: true,
      site: true,
      ski: true,
      skin: true,
      sky: true,
      skype: true,
      sling: true,
      smart: true,
      smile: true,
      sncf: true,
      soccer: true,
      social: true,
      softbank: true,
      software: true,
      sohu: true,
      solar: true,
      solutions: true,
      song: true,
      sony: true,
      soy: true,
      space: true,
      spiegel: true,
      spot: true,
      spreadbetting: true,
      srl: true,
      srt: true,
      stada: true,
      staples: true,
      star: true,
      starhub: true,
      statebank: true,
      statefarm: true,
      statoil: true,
      stc: true,
      stcgroup: true,
      stockholm: true,
      storage: true,
      store: true,
      stream: true,
      studio: true,
      study: true,
      style: true,
      sucks: true,
      supplies: true,
      supply: true,
      support: true,
      surf: true,
      surgery: true,
      suzuki: true,
      swatch: true,
      swiftcover: true,
      swiss: true,
      sydney: true,
      symantec: true,
      systems: true,
      tab: true,
      taipei: true,
      talk: true,
      taobao: true,
      target: true,
      tatamotors: true,
      tatar: true,
      tattoo: true,
      tax: true,
      taxi: true,
      tci: true,
      tdk: true,
      team: true,
      tech: true,
      technology: true,
      telecity: true,
      telefonica: true,
      temasek: true,
      tennis: true,
      teva: true,
      thd: true,
      theater: true,
      theatre: true,
      theguardian: true,
      tiaa: true,
      tickets: true,
      tienda: true,
      tiffany: true,
      tips: true,
      tires: true,
      tirol: true,
      tjmaxx: true,
      tjx: true,
      tkmaxx: true,
      tmall: true,
      today: true,
      tokyo: true,
      tools: true,
      top: true,
      toray: true,
      toshiba: true,
      total: true,
      tours: true,
      town: true,
      toyota: true,
      toys: true,
      trade: true,
      trading: true,
      training: true,
      travelchannel: true,
      travelers: true,
      travelersinsurance: true,
      trust: true,
      trv: true,
      tube: true,
      tui: true,
      tunes: true,
      tushu: true,
      tvs: true,
      ubank: true,
      ubs: true,
      uconnect: true,
      unicom: true,
      university: true,
      uno: true,
      uol: true,
      ups: true,
      vacations: true,
      vana: true,
      vanguard: true,
      vegas: true,
      ventures: true,
      verisign: true,
      versicherung: true,
      vet: true,
      viajes: true,
      video: true,
      vig: true,
      viking: true,
      villas: true,
      vin: true,
      vip: true,
      virgin: true,
      visa: true,
      vision: true,
      vista: true,
      vistaprint: true,
      viva: true,
      vivo: true,
      vlaanderen: true,
      vodka: true,
      volkswagen: true,
      volvo: true,
      vote: true,
      voting: true,
      voto: true,
      voyage: true,
      vuelos: true,
      wales: true,
      walmart: true,
      walter: true,
      wang: true,
      wanggou: true,
      warman: true,
      watch: true,
      watches: true,
      weather: true,
      weatherchannel: true,
      webcam: true,
      weber: true,
      website: true,
      wed: true,
      wedding: true,
      weibo: true,
      weir: true,
      whoswho: true,
      wien: true,
      wiki: true,
      williamhill: true,
      win: true,
      windows: true,
      wine: true,
      winners: true,
      wme: true,
      wolterskluwer: true,
      woodside: true,
      work: true,
      works: true,
      world: true,
      wow: true,
      wtc: true,
      wtf: true,
      xbox: true,
      xerox: true,
      xfinity: true,
      xihuan: true,
      xin: true,
      'xn--11b4c3d': true,
      'xn--1ck2e1b': true,
      'xn--1qqw23a': true,
      'xn--30rr7y': true,
      'xn--3bst00m': true,
      'xn--3ds443g': true,
      'xn--3oq18vl8pn36a': true,
      'xn--3pxu8k': true,
      'xn--42c2d9a': true,
      'xn--45q11c': true,
      'xn--4gbrim': true,
      'xn--4gq48lf9j': true,
      'xn--55qw42g': true,
      'xn--55qx5d': true,
      'xn--5su34j936bgsg': true,
      'xn--5tzm5g': true,
      'xn--6frz82g': true,
      'xn--6qq986b3xl': true,
      'xn--80adxhks': true,
      'xn--80aqecdr1a': true,
      'xn--80asehdb': true,
      'xn--80aswg': true,
      'xn--8y0a063a': true,
      'xn--9dbq2a': true,
      'xn--9et52u': true,
      'xn--9krt00a': true,
      'xn--b4w605ferd': true,
      'xn--bck1b9a5dre4c': true,
      'xn--c1avg': true,
      'xn--c2br7g': true,
      'xn--cck2b3b': true,
      'xn--cg4bki': true,
      'xn--czr694b': true,
      'xn--czrs0t': true,
      'xn--czru2d': true,
      'xn--d1acj3b': true,
      'xn--eckvdtc9d': true,
      'xn--efvy88h': true,
      'xn--estv75g': true,
      'xn--fct429k': true,
      'xn--fhbei': true,
      'xn--fiq228c5hs': true,
      'xn--fiq64b': true,
      'xn--fjq720a': true,
      'xn--flw351e': true,
      'xn--fzys8d69uvgm': true,
      'xn--g2xx48c': true,
      'xn--gckr3f0f': true,
      'xn--gk3at1e': true,
      'xn--hxt814e': true,
      'xn--i1b6b1a6a2e': true,
      'xn--imr513n': true,
      'xn--io0a7i': true,
      'xn--j1aef': true,
      'xn--jlq61u9w7b': true,
      'xn--jvr189m': true,
      'xn--kcrx77d1x4a': true,
      'xn--kpu716f': true,
      'xn--kput3i': true,
      'xn--mgba3a3ejt': true,
      'xn--mgba7c0bbn0a': true,
      'xn--mgbaakc7dvf': true,
      'xn--mgbab2bd': true,
      'xn--mgbb9fbpob': true,
      'xn--mgbca7dzdo': true,
      'xn--mgbi4ecexp': true,
      'xn--mgbt3dhd': true,
      'xn--mk1bu44c': true,
      'xn--mxtq1m': true,
      'xn--ngbc5azd': true,
      'xn--ngbe9e0a': true,
      'xn--ngbrx': true,
      'xn--nqv7f': true,
      'xn--nqv7fs00ema': true,
      'xn--nyqy26a': true,
      'xn--p1acf': true,
      'xn--pbt977c': true,
      'xn--pssy2u': true,
      'xn--q9jyb4c': true,
      'xn--qcka1pmc': true,
      'xn--rhqv96g': true,
      'xn--rovu88b': true,
      'xn--ses554g': true,
      'xn--t60b56a': true,
      'xn--tckwe': true,
      'xn--tiq49xqyj': true,
      'xn--unup4y': true,
      'xn--vermgensberater-ctb': true,
      'xn--vermgensberatung-pwb': true,
      'xn--vhquv': true,
      'xn--vuq861b': true,
      'xn--w4r85el8fhu5dnra': true,
      'xn--w4rs40l': true,
      'xn--xhq521b': true,
      'xn--zfr164b': true,
      xperia: true,
      xyz: true,
      yachts: true,
      yahoo: true,
      yamaxun: true,
      yandex: true,
      yodobashi: true,
      yoga: true,
      yokohama: true,
      you: true,
      youtube: true,
      yun: true,
      zappos: true,
      zara: true,
      zero: true,
      zip: true,
      zippo: true,
      zone: true,
      zuerich: true,
      'beep.pl': true,
      '*.compute.estate': true,
      '*.alces.network': true,
      '*.alwaysdata.net': true,
      'cloudfront.net': true,
      'compute.amazonaws.com': true,
      'ap-northeast-1.compute.amazonaws.com': true,
      'ap-northeast-2.compute.amazonaws.com': true,
      'ap-southeast-1.compute.amazonaws.com': true,
      'ap-southeast-2.compute.amazonaws.com': true,
      'eu-central-1.compute.amazonaws.com': true,
      'eu-west-1.compute.amazonaws.com': true,
      'sa-east-1.compute.amazonaws.com': true,
      'us-gov-west-1.compute.amazonaws.com': true,
      'us-west-1.compute.amazonaws.com': true,
      'us-west-2.compute.amazonaws.com': true,
      'compute-1.amazonaws.com': true,
      'z-1.compute-1.amazonaws.com': true,
      'z-2.compute-1.amazonaws.com': true,
      'us-east-1.amazonaws.com': true,
      'compute.amazonaws.com.cn': true,
      'cn-north-1.compute.amazonaws.com.cn': true,
      'elasticbeanstalk.com': true,
      'elb.amazonaws.com': true,
      's3.amazonaws.com': true,
      's3-ap-northeast-1.amazonaws.com': true,
      's3-ap-northeast-2.amazonaws.com': true,
      's3-ap-southeast-1.amazonaws.com': true,
      's3-ap-southeast-2.amazonaws.com': true,
      's3-eu-central-1.amazonaws.com': true,
      's3-eu-west-1.amazonaws.com': true,
      's3-external-1.amazonaws.com': true,
      's3-external-2.amazonaws.com': true,
      's3-fips-us-gov-west-1.amazonaws.com': true,
      's3-sa-east-1.amazonaws.com': true,
      's3-us-gov-west-1.amazonaws.com': true,
      's3-us-west-1.amazonaws.com': true,
      's3-us-west-2.amazonaws.com': true,
      's3.ap-northeast-2.amazonaws.com': true,
      's3.cn-north-1.amazonaws.com.cn': true,
      's3.eu-central-1.amazonaws.com': true,
      'on-aptible.com': true,
      'pimienta.org': true,
      'poivron.org': true,
      'potager.org': true,
      'sweetpepper.org': true,
      'myasustor.com': true,
      'myfritz.net': true,
      'backplaneapp.io': true,
      'betainabox.com': true,
      'bnr.la': true,
      'boxfuse.io': true,
      'browsersafetymark.io': true,
      'mycd.eu': true,
      'ae.org': true,
      'ar.com': true,
      'br.com': true,
      'cn.com': true,
      'com.de': true,
      'com.se': true,
      'de.com': true,
      'eu.com': true,
      'gb.com': true,
      'gb.net': true,
      'hu.com': true,
      'hu.net': true,
      'jp.net': true,
      'jpn.com': true,
      'kr.com': true,
      'mex.com': true,
      'no.com': true,
      'qc.com': true,
      'ru.com': true,
      'sa.com': true,
      'se.com': true,
      'se.net': true,
      'uk.com': true,
      'uk.net': true,
      'us.com': true,
      'uy.com': true,
      'za.bz': true,
      'za.com': true,
      'africa.com': true,
      'gr.com': true,
      'in.net': true,
      'us.org': true,
      'co.com': true,
      'c.la': true,
      'certmgr.org': true,
      'xenapponazure.com': true,
      'virtueeldomein.nl': true,
      'cloudcontrolled.com': true,
      'cloudcontrolapp.com': true,
      'co.ca': true,
      'co.cz': true,
      'c.cdn77.org': true,
      'cdn77-ssl.net': true,
      'r.cdn77.net': true,
      'rsc.cdn77.org': true,
      'ssl.origin.cdn77-secure.org': true,
      'cloudns.asia': true,
      'cloudns.biz': true,
      'cloudns.club': true,
      'cloudns.cc': true,
      'cloudns.eu': true,
      'cloudns.in': true,
      'cloudns.info': true,
      'cloudns.org': true,
      'cloudns.pro': true,
      'cloudns.pw': true,
      'cloudns.us': true,
      'co.nl': true,
      'co.no': true,
      '*.platform.sh': true,
      'realm.cz': true,
      '*.cryptonomic.net': true,
      'cupcake.is': true,
      'cyon.link': true,
      'cyon.site': true,
      'daplie.me': true,
      'biz.dk': true,
      'co.dk': true,
      'firm.dk': true,
      'reg.dk': true,
      'store.dk': true,
      'dedyn.io': true,
      'dnshome.de': true,
      'dreamhosters.com': true,
      'mydrobo.com': true,
      'drud.io': true,
      'drud.us': true,
      'duckdns.org': true,
      'dy.fi': true,
      'tunk.org': true,
      'dyndns-at-home.com': true,
      'dyndns-at-work.com': true,
      'dyndns-blog.com': true,
      'dyndns-free.com': true,
      'dyndns-home.com': true,
      'dyndns-ip.com': true,
      'dyndns-mail.com': true,
      'dyndns-office.com': true,
      'dyndns-pics.com': true,
      'dyndns-remote.com': true,
      'dyndns-server.com': true,
      'dyndns-web.com': true,
      'dyndns-wiki.com': true,
      'dyndns-work.com': true,
      'dyndns.biz': true,
      'dyndns.info': true,
      'dyndns.org': true,
      'dyndns.tv': true,
      'at-band-camp.net': true,
      'ath.cx': true,
      'barrel-of-knowledge.info': true,
      'barrell-of-knowledge.info': true,
      'better-than.tv': true,
      'blogdns.com': true,
      'blogdns.net': true,
      'blogdns.org': true,
      'blogsite.org': true,
      'boldlygoingnowhere.org': true,
      'broke-it.net': true,
      'buyshouses.net': true,
      'cechire.com': true,
      'dnsalias.com': true,
      'dnsalias.net': true,
      'dnsalias.org': true,
      'dnsdojo.com': true,
      'dnsdojo.net': true,
      'dnsdojo.org': true,
      'does-it.net': true,
      'doesntexist.com': true,
      'doesntexist.org': true,
      'dontexist.com': true,
      'dontexist.net': true,
      'dontexist.org': true,
      'doomdns.com': true,
      'doomdns.org': true,
      'dvrdns.org': true,
      'dyn-o-saur.com': true,
      'dynalias.com': true,
      'dynalias.net': true,
      'dynalias.org': true,
      'dynathome.net': true,
      'dyndns.ws': true,
      'endofinternet.net': true,
      'endofinternet.org': true,
      'endoftheinternet.org': true,
      'est-a-la-maison.com': true,
      'est-a-la-masion.com': true,
      'est-le-patron.com': true,
      'est-mon-blogueur.com': true,
      'for-better.biz': true,
      'for-more.biz': true,
      'for-our.info': true,
      'for-some.biz': true,
      'for-the.biz': true,
      'forgot.her.name': true,
      'forgot.his.name': true,
      'from-ak.com': true,
      'from-al.com': true,
      'from-ar.com': true,
      'from-az.net': true,
      'from-ca.com': true,
      'from-co.net': true,
      'from-ct.com': true,
      'from-dc.com': true,
      'from-de.com': true,
      'from-fl.com': true,
      'from-ga.com': true,
      'from-hi.com': true,
      'from-ia.com': true,
      'from-id.com': true,
      'from-il.com': true,
      'from-in.com': true,
      'from-ks.com': true,
      'from-ky.com': true,
      'from-la.net': true,
      'from-ma.com': true,
      'from-md.com': true,
      'from-me.org': true,
      'from-mi.com': true,
      'from-mn.com': true,
      'from-mo.com': true,
      'from-ms.com': true,
      'from-mt.com': true,
      'from-nc.com': true,
      'from-nd.com': true,
      'from-ne.com': true,
      'from-nh.com': true,
      'from-nj.com': true,
      'from-nm.com': true,
      'from-nv.com': true,
      'from-ny.net': true,
      'from-oh.com': true,
      'from-ok.com': true,
      'from-or.com': true,
      'from-pa.com': true,
      'from-pr.com': true,
      'from-ri.com': true,
      'from-sc.com': true,
      'from-sd.com': true,
      'from-tn.com': true,
      'from-tx.com': true,
      'from-ut.com': true,
      'from-va.com': true,
      'from-vt.com': true,
      'from-wa.com': true,
      'from-wi.com': true,
      'from-wv.com': true,
      'from-wy.com': true,
      'ftpaccess.cc': true,
      'fuettertdasnetz.de': true,
      'game-host.org': true,
      'game-server.cc': true,
      'getmyip.com': true,
      'gets-it.net': true,
      'go.dyndns.org': true,
      'gotdns.com': true,
      'gotdns.org': true,
      'groks-the.info': true,
      'groks-this.info': true,
      'ham-radio-op.net': true,
      'here-for-more.info': true,
      'hobby-site.com': true,
      'hobby-site.org': true,
      'home.dyndns.org': true,
      'homedns.org': true,
      'homeftp.net': true,
      'homeftp.org': true,
      'homeip.net': true,
      'homelinux.com': true,
      'homelinux.net': true,
      'homelinux.org': true,
      'homeunix.com': true,
      'homeunix.net': true,
      'homeunix.org': true,
      'iamallama.com': true,
      'in-the-band.net': true,
      'is-a-anarchist.com': true,
      'is-a-blogger.com': true,
      'is-a-bookkeeper.com': true,
      'is-a-bruinsfan.org': true,
      'is-a-bulls-fan.com': true,
      'is-a-candidate.org': true,
      'is-a-caterer.com': true,
      'is-a-celticsfan.org': true,
      'is-a-chef.com': true,
      'is-a-chef.net': true,
      'is-a-chef.org': true,
      'is-a-conservative.com': true,
      'is-a-cpa.com': true,
      'is-a-cubicle-slave.com': true,
      'is-a-democrat.com': true,
      'is-a-designer.com': true,
      'is-a-doctor.com': true,
      'is-a-financialadvisor.com': true,
      'is-a-geek.com': true,
      'is-a-geek.net': true,
      'is-a-geek.org': true,
      'is-a-green.com': true,
      'is-a-guru.com': true,
      'is-a-hard-worker.com': true,
      'is-a-hunter.com': true,
      'is-a-knight.org': true,
      'is-a-landscaper.com': true,
      'is-a-lawyer.com': true,
      'is-a-liberal.com': true,
      'is-a-libertarian.com': true,
      'is-a-linux-user.org': true,
      'is-a-llama.com': true,
      'is-a-musician.com': true,
      'is-a-nascarfan.com': true,
      'is-a-nurse.com': true,
      'is-a-painter.com': true,
      'is-a-patsfan.org': true,
      'is-a-personaltrainer.com': true,
      'is-a-photographer.com': true,
      'is-a-player.com': true,
      'is-a-republican.com': true,
      'is-a-rockstar.com': true,
      'is-a-socialist.com': true,
      'is-a-soxfan.org': true,
      'is-a-student.com': true,
      'is-a-teacher.com': true,
      'is-a-techie.com': true,
      'is-a-therapist.com': true,
      'is-an-accountant.com': true,
      'is-an-actor.com': true,
      'is-an-actress.com': true,
      'is-an-anarchist.com': true,
      'is-an-artist.com': true,
      'is-an-engineer.com': true,
      'is-an-entertainer.com': true,
      'is-by.us': true,
      'is-certified.com': true,
      'is-found.org': true,
      'is-gone.com': true,
      'is-into-anime.com': true,
      'is-into-cars.com': true,
      'is-into-cartoons.com': true,
      'is-into-games.com': true,
      'is-leet.com': true,
      'is-lost.org': true,
      'is-not-certified.com': true,
      'is-saved.org': true,
      'is-slick.com': true,
      'is-uberleet.com': true,
      'is-very-bad.org': true,
      'is-very-evil.org': true,
      'is-very-good.org': true,
      'is-very-nice.org': true,
      'is-very-sweet.org': true,
      'is-with-theband.com': true,
      'isa-geek.com': true,
      'isa-geek.net': true,
      'isa-geek.org': true,
      'isa-hockeynut.com': true,
      'issmarterthanyou.com': true,
      'isteingeek.de': true,
      'istmein.de': true,
      'kicks-ass.net': true,
      'kicks-ass.org': true,
      'knowsitall.info': true,
      'land-4-sale.us': true,
      'lebtimnetz.de': true,
      'leitungsen.de': true,
      'likes-pie.com': true,
      'likescandy.com': true,
      'merseine.nu': true,
      'mine.nu': true,
      'misconfused.org': true,
      'mypets.ws': true,
      'myphotos.cc': true,
      'neat-url.com': true,
      'office-on-the.net': true,
      'on-the-web.tv': true,
      'podzone.net': true,
      'podzone.org': true,
      'readmyblog.org': true,
      'saves-the-whales.com': true,
      'scrapper-site.net': true,
      'scrapping.cc': true,
      'selfip.biz': true,
      'selfip.com': true,
      'selfip.info': true,
      'selfip.net': true,
      'selfip.org': true,
      'sells-for-less.com': true,
      'sells-for-u.com': true,
      'sells-it.net': true,
      'sellsyourhome.org': true,
      'servebbs.com': true,
      'servebbs.net': true,
      'servebbs.org': true,
      'serveftp.net': true,
      'serveftp.org': true,
      'servegame.org': true,
      'shacknet.nu': true,
      'simple-url.com': true,
      'space-to-rent.com': true,
      'stuff-4-sale.org': true,
      'stuff-4-sale.us': true,
      'teaches-yoga.com': true,
      'thruhere.net': true,
      'traeumtgerade.de': true,
      'webhop.biz': true,
      'webhop.info': true,
      'webhop.net': true,
      'webhop.org': true,
      'worse-than.tv': true,
      'writesthisblog.com': true,
      'ddnss.de': true,
      'dyn.ddnss.de': true,
      'dyndns.ddnss.de': true,
      'dyndns1.de': true,
      'dyn-ip24.de': true,
      'home-webserver.de': true,
      'dyn.home-webserver.de': true,
      'myhome-server.de': true,
      'ddnss.org': true,
      'dynv6.net': true,
      'e4.cz': true,
      'eu.org': true,
      'al.eu.org': true,
      'asso.eu.org': true,
      'at.eu.org': true,
      'au.eu.org': true,
      'be.eu.org': true,
      'bg.eu.org': true,
      'ca.eu.org': true,
      'cd.eu.org': true,
      'ch.eu.org': true,
      'cn.eu.org': true,
      'cy.eu.org': true,
      'cz.eu.org': true,
      'de.eu.org': true,
      'dk.eu.org': true,
      'edu.eu.org': true,
      'ee.eu.org': true,
      'es.eu.org': true,
      'fi.eu.org': true,
      'fr.eu.org': true,
      'gr.eu.org': true,
      'hr.eu.org': true,
      'hu.eu.org': true,
      'ie.eu.org': true,
      'il.eu.org': true,
      'in.eu.org': true,
      'int.eu.org': true,
      'is.eu.org': true,
      'it.eu.org': true,
      'jp.eu.org': true,
      'kr.eu.org': true,
      'lt.eu.org': true,
      'lu.eu.org': true,
      'lv.eu.org': true,
      'mc.eu.org': true,
      'me.eu.org': true,
      'mk.eu.org': true,
      'mt.eu.org': true,
      'my.eu.org': true,
      'net.eu.org': true,
      'ng.eu.org': true,
      'nl.eu.org': true,
      'no.eu.org': true,
      'nz.eu.org': true,
      'paris.eu.org': true,
      'pl.eu.org': true,
      'pt.eu.org': true,
      'q-a.eu.org': true,
      'ro.eu.org': true,
      'ru.eu.org': true,
      'se.eu.org': true,
      'si.eu.org': true,
      'sk.eu.org': true,
      'tr.eu.org': true,
      'uk.eu.org': true,
      'us.eu.org': true,
      'eu-1.evennode.com': true,
      'eu-2.evennode.com': true,
      'us-1.evennode.com': true,
      'us-2.evennode.com': true,
      'apps.fbsbx.com': true,
      'a.ssl.fastly.net': true,
      'b.ssl.fastly.net': true,
      'global.ssl.fastly.net': true,
      'a.prod.fastly.net': true,
      'global.prod.fastly.net': true,
      'fhapp.xyz': true,
      'firebaseapp.com': true,
      'flynnhub.com': true,
      'freebox-os.com': true,
      'freeboxos.com': true,
      'fbx-os.fr': true,
      'fbxos.fr': true,
      'freebox-os.fr': true,
      'freeboxos.fr': true,
      'myfusion.cloud': true,
      'futuremailing.at': true,
      '*.ex.ortsinfo.at': true,
      '*.kunden.ortsinfo.at': true,
      'service.gov.uk': true,
      'github.io': true,
      'githubusercontent.com': true,
      'githubcloud.com': true,
      '*.api.githubcloud.com': true,
      '*.ext.githubcloud.com': true,
      'gist.githubcloud.com': true,
      '*.githubcloudusercontent.com': true,
      'gitlab.io': true,
      'ro.com': true,
      'ro.im': true,
      'shop.ro': true,
      'goip.de': true,
      '*.0emm.com': true,
      'appspot.com': true,
      'blogspot.ae': true,
      'blogspot.al': true,
      'blogspot.am': true,
      'blogspot.ba': true,
      'blogspot.be': true,
      'blogspot.bg': true,
      'blogspot.bj': true,
      'blogspot.ca': true,
      'blogspot.cf': true,
      'blogspot.ch': true,
      'blogspot.cl': true,
      'blogspot.co.at': true,
      'blogspot.co.id': true,
      'blogspot.co.il': true,
      'blogspot.co.ke': true,
      'blogspot.co.nz': true,
      'blogspot.co.uk': true,
      'blogspot.co.za': true,
      'blogspot.com': true,
      'blogspot.com.ar': true,
      'blogspot.com.au': true,
      'blogspot.com.br': true,
      'blogspot.com.by': true,
      'blogspot.com.co': true,
      'blogspot.com.cy': true,
      'blogspot.com.ee': true,
      'blogspot.com.eg': true,
      'blogspot.com.es': true,
      'blogspot.com.mt': true,
      'blogspot.com.ng': true,
      'blogspot.com.tr': true,
      'blogspot.com.uy': true,
      'blogspot.cv': true,
      'blogspot.cz': true,
      'blogspot.de': true,
      'blogspot.dk': true,
      'blogspot.fi': true,
      'blogspot.fr': true,
      'blogspot.gr': true,
      'blogspot.hk': true,
      'blogspot.hr': true,
      'blogspot.hu': true,
      'blogspot.ie': true,
      'blogspot.in': true,
      'blogspot.is': true,
      'blogspot.it': true,
      'blogspot.jp': true,
      'blogspot.kr': true,
      'blogspot.li': true,
      'blogspot.lt': true,
      'blogspot.lu': true,
      'blogspot.md': true,
      'blogspot.mk': true,
      'blogspot.mr': true,
      'blogspot.mx': true,
      'blogspot.my': true,
      'blogspot.nl': true,
      'blogspot.no': true,
      'blogspot.pe': true,
      'blogspot.pt': true,
      'blogspot.qa': true,
      'blogspot.re': true,
      'blogspot.ro': true,
      'blogspot.rs': true,
      'blogspot.ru': true,
      'blogspot.se': true,
      'blogspot.sg': true,
      'blogspot.si': true,
      'blogspot.sk': true,
      'blogspot.sn': true,
      'blogspot.td': true,
      'blogspot.tw': true,
      'blogspot.ug': true,
      'blogspot.vn': true,
      'cloudfunctions.net': true,
      'codespot.com': true,
      'googleapis.com': true,
      'googlecode.com': true,
      'pagespeedmobilizer.com': true,
      'publishproxy.com': true,
      'withgoogle.com': true,
      'withyoutube.com': true,
      'hashbang.sh': true,
      'hasura-app.io': true,
      'hepforge.org': true,
      'herokuapp.com': true,
      'herokussl.com': true,
      'iki.fi': true,
      'biz.at': true,
      'info.at': true,
      'ac.leg.br': true,
      'al.leg.br': true,
      'am.leg.br': true,
      'ap.leg.br': true,
      'ba.leg.br': true,
      'ce.leg.br': true,
      'df.leg.br': true,
      'es.leg.br': true,
      'go.leg.br': true,
      'ma.leg.br': true,
      'mg.leg.br': true,
      'ms.leg.br': true,
      'mt.leg.br': true,
      'pa.leg.br': true,
      'pb.leg.br': true,
      'pe.leg.br': true,
      'pi.leg.br': true,
      'pr.leg.br': true,
      'rj.leg.br': true,
      'rn.leg.br': true,
      'ro.leg.br': true,
      'rr.leg.br': true,
      'rs.leg.br': true,
      'sc.leg.br': true,
      'se.leg.br': true,
      'sp.leg.br': true,
      'to.leg.br': true,
      '*.triton.zone': true,
      '*.cns.joyent.com': true,
      'js.org': true,
      'keymachine.de': true,
      'knightpoint.systems': true,
      'co.krd': true,
      'edu.krd': true,
      '*.magentosite.cloud': true,
      'meteorapp.com': true,
      'eu.meteorapp.com': true,
      'co.pl': true,
      'azurewebsites.net': true,
      'azure-mobile.net': true,
      'cloudapp.net': true,
      'bmoattachments.org': true,
      '4u.com': true,
      'ngrok.io': true,
      'nfshost.com': true,
      'nsupdate.info': true,
      'nerdpol.ovh': true,
      'blogsyte.com': true,
      'brasilia.me': true,
      'cable-modem.org': true,
      'ciscofreak.com': true,
      'collegefan.org': true,
      'couchpotatofries.org': true,
      'damnserver.com': true,
      'ddns.me': true,
      'ditchyourip.com': true,
      'dnsfor.me': true,
      'dnsiskinky.com': true,
      'dvrcam.info': true,
      'dynns.com': true,
      'eating-organic.net': true,
      'fantasyleague.cc': true,
      'geekgalaxy.com': true,
      'golffan.us': true,
      'health-carereform.com': true,
      'homesecuritymac.com': true,
      'homesecuritypc.com': true,
      'hopto.me': true,
      'ilovecollege.info': true,
      'loginto.me': true,
      'mlbfan.org': true,
      'mmafan.biz': true,
      'myactivedirectory.com': true,
      'mydissent.net': true,
      'myeffect.net': true,
      'mymediapc.net': true,
      'mypsx.net': true,
      'mysecuritycamera.com': true,
      'mysecuritycamera.net': true,
      'mysecuritycamera.org': true,
      'net-freaks.com': true,
      'nflfan.org': true,
      'nhlfan.net': true,
      'no-ip.ca': true,
      'no-ip.co.uk': true,
      'no-ip.net': true,
      'noip.us': true,
      'onthewifi.com': true,
      'pgafan.net': true,
      'point2this.com': true,
      'pointto.us': true,
      'privatizehealthinsurance.net': true,
      'quicksytes.com': true,
      'read-books.org': true,
      'securitytactics.com': true,
      'serveexchange.com': true,
      'servehumour.com': true,
      'servep2p.com': true,
      'servesarcasm.com': true,
      'stufftoread.com': true,
      'ufcfan.org': true,
      'unusualperson.com': true,
      'workisboring.com': true,
      '3utilities.com': true,
      'bounceme.net': true,
      'ddns.net': true,
      'ddnsking.com': true,
      'gotdns.ch': true,
      'hopto.org': true,
      'myftp.biz': true,
      'myftp.org': true,
      'myvnc.com': true,
      'no-ip.biz': true,
      'no-ip.info': true,
      'no-ip.org': true,
      'noip.me': true,
      'redirectme.net': true,
      'servebeer.com': true,
      'serveblog.net': true,
      'servecounterstrike.com': true,
      'serveftp.com': true,
      'servegame.com': true,
      'servehalflife.com': true,
      'servehttp.com': true,
      'serveirc.com': true,
      'serveminecraft.net': true,
      'servemp3.com': true,
      'servepics.com': true,
      'servequake.com': true,
      'sytes.net': true,
      'webhop.me': true,
      'zapto.org': true,
      'nyc.mn': true,
      'nid.io': true,
      'opencraft.hosting': true,
      'operaunite.com': true,
      'outsystemscloud.com': true,
      'ownprovider.com': true,
      'oy.lc': true,
      'pgfog.com': true,
      'pagefrontapp.com': true,
      'art.pl': true,
      'gliwice.pl': true,
      'krakow.pl': true,
      'poznan.pl': true,
      'wroc.pl': true,
      'zakopane.pl': true,
      'pantheonsite.io': true,
      'gotpantheon.com': true,
      'mypep.link': true,
      'xen.prgmr.com': true,
      'priv.at': true,
      'protonet.io': true,
      'chirurgiens-dentistes-en-france.fr': true,
      'qa2.com': true,
      'dev-myqnapcloud.com': true,
      'alpha-myqnapcloud.com': true,
      'myqnapcloud.com': true,
      'rackmaze.com': true,
      'rackmaze.net': true,
      'rhcloud.com': true,
      'hzc.io': true,
      'wellbeingzone.eu': true,
      'ptplus.fit': true,
      'wellbeingzone.co.uk': true,
      'sandcats.io': true,
      'logoip.de': true,
      'logoip.com': true,
      'firewall-gateway.com': true,
      'firewall-gateway.de': true,
      'my-gateway.de': true,
      'my-router.de': true,
      'spdns.de': true,
      'spdns.eu': true,
      'firewall-gateway.net': true,
      'my-firewall.org': true,
      'myfirewall.org': true,
      'spdns.org': true,
      'biz.ua': true,
      'co.ua': true,
      'pp.ua': true,
      'shiftedit.io': true,
      'myshopblocks.com': true,
      '1kapp.com': true,
      'appchizi.com': true,
      'applinzi.com': true,
      'sinaapp.com': true,
      'vipsinaapp.com': true,
      'bounty-full.com': true,
      'alpha.bounty-full.com': true,
      'beta.bounty-full.com': true,
      'static.land': true,
      'dev.static.land': true,
      'sites.static.land': true,
      'apps.lair.io': true,
      '*.stolos.io': true,
      'spacekit.io': true,
      'stackspace.space': true,
      'diskstation.me': true,
      'dscloud.biz': true,
      'dscloud.me': true,
      'dscloud.mobi': true,
      'dsmynas.com': true,
      'dsmynas.net': true,
      'dsmynas.org': true,
      'familyds.com': true,
      'familyds.net': true,
      'familyds.org': true,
      'i234.me': true,
      'myds.me': true,
      'synology.me': true,
      'taifun-dns.de': true,
      'gda.pl': true,
      'gdansk.pl': true,
      'gdynia.pl': true,
      'med.pl': true,
      'sopot.pl': true,
      'bloxcms.com': true,
      'townnews-staging.com': true,
      '*.transurl.be': true,
      '*.transurl.eu': true,
      '*.transurl.nl': true,
      'tuxfamily.org': true,
      'hk.com': true,
      'hk.org': true,
      'ltd.hk': true,
      'inc.hk': true,
      'lib.de.us': true,
      'router.management': true,
      'wmflabs.org': true,
      'yolasite.com': true,
      'za.net': true,
      'za.org': true,
      'now.sh': true
    }));

    // END of automatically generated file
  });

  var pubsuffix_1 = pubsuffix.getPublicSuffix;
  var pubsuffix_2 = pubsuffix.index;

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

  function Store$1() {}
  var Store_1 = Store$1;

  // Stores may be synchronous, but are still required to use a
  // Continuation-Passing Style API.  The CookieJar itself will expose a "*Sync"
  // API that converts from synchronous-callbacks to imperative style.
  Store$1.prototype.synchronous = false;

  Store$1.prototype.findCookie = function(domain, path, key, cb) {
    throw new Error('findCookie is not implemented');
  };

  Store$1.prototype.findCookies = function(domain, path, cb) {
    throw new Error('findCookies is not implemented');
  };

  Store$1.prototype.putCookie = function(cookie, cb) {
    throw new Error('putCookie is not implemented');
  };

  Store$1.prototype.updateCookie = function(oldCookie, newCookie, cb) {
    // recommended default implementation:
    // return this.putCookie(newCookie, cb);
    throw new Error('updateCookie is not implemented');
  };

  Store$1.prototype.removeCookie = function(domain, path, key, cb) {
    throw new Error('removeCookie is not implemented');
  };

  Store$1.prototype.removeCookies = function(domain, path, cb) {
    throw new Error('removeCookies is not implemented');
  };

  Store$1.prototype.getAllCookies = function(cb) {
    throw new Error(
      'getAllCookies is not implemented (therefore jar cannot be serialized)'
    );
  };

  var store = {
    Store: Store_1
  };

  // Gives the permutation of all possible domainMatch()es of a given domain. The
  // array is in shortest-to-longest order.  Handy for indexing.
  function permuteDomain$1(domain) {
    var pubSuf = pubsuffix.getPublicSuffix(domain);
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

  var permuteDomain_2 = permuteDomain$1;

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
  function pathMatch$2(reqPath, cookiePath) {
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

  var pathMatch_2 = pathMatch$2;

  var pathMatch_1 = {
    pathMatch: pathMatch_2
  };

  var util$2 = (util$1 && util) || util$1;

  var Store$2 = store.Store;
  var permuteDomain = permuteDomain_1.permuteDomain;
  var pathMatch$1 = pathMatch_1.pathMatch;

  function MemoryCookieStore$1() {
    Store$2.call(this);
    this.idx = {};
  }
  util$2.inherits(MemoryCookieStore$1, Store$2);
  var MemoryCookieStore_1 = MemoryCookieStore$1;
  MemoryCookieStore$1.prototype.idx = null;

  // Since it's just a struct in RAM, this Store is synchronous
  MemoryCookieStore$1.prototype.synchronous = true;

  // force a default depth:
  MemoryCookieStore$1.prototype.inspect = function() {
    return '{ idx: ' + util$2.inspect(this.idx, false, 2) + ' }';
  };

  MemoryCookieStore$1.prototype.findCookie = function(domain, path, key, cb) {
    if (!this.idx[domain]) {
      return cb(null, undefined);
    }
    if (!this.idx[domain][path]) {
      return cb(null, undefined);
    }
    return cb(null, this.idx[domain][path][key] || null);
  };

  MemoryCookieStore$1.prototype.findCookies = function(domain, path, cb) {
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

    var domains = permuteDomain(domain) || [domain];
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

  MemoryCookieStore$1.prototype.putCookie = function(cookie, cb) {
    if (!this.idx[cookie.domain]) {
      this.idx[cookie.domain] = {};
    }
    if (!this.idx[cookie.domain][cookie.path]) {
      this.idx[cookie.domain][cookie.path] = {};
    }
    this.idx[cookie.domain][cookie.path][cookie.key] = cookie;
    cb(null);
  };

  MemoryCookieStore$1.prototype.updateCookie = function(
    oldCookie,
    newCookie,
    cb
  ) {
    // updateCookie() may avoid updating cookies that are identical.  For example,
    // lastAccessed may not be important to some stores and an equality
    // comparison could exclude that field.
    this.putCookie(newCookie, cb);
  };

  MemoryCookieStore$1.prototype.removeCookie = function(domain, path, key, cb) {
    if (
      this.idx[domain] &&
      this.idx[domain][path] &&
      this.idx[domain][path][key]
    ) {
      delete this.idx[domain][path][key];
    }
    cb(null);
  };

  MemoryCookieStore$1.prototype.removeCookies = function(domain, path, cb) {
    if (this.idx[domain]) {
      if (path) {
        delete this.idx[domain][path];
      } else {
        delete this.idx[domain];
      }
    }
    return cb(null);
  };

  MemoryCookieStore$1.prototype.getAllCookies = function(cb) {
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

  var _args$1 = [['tough-cookie@2.3.3', '/var/www/gologic/temp/jcognos']];
  var _from$1 = 'tough-cookie@2.3.3';
  var _id$1 = 'tough-cookie@2.3.3';
  var _inBundle$1 = false;
  var _integrity$1 = 'sha1-C2GKVWW23qkL80JdBNVe3EdadWE=';
  var _location$1 = '/tough-cookie';
  var _phantomChildren$1 = {};
  var _requested$1 = {
    type: 'version',
    registry: true,
    raw: 'tough-cookie@2.3.3',
    name: 'tough-cookie',
    escapedName: 'tough-cookie',
    rawSpec: '2.3.3',
    saveSpec: null,
    fetchSpec: '2.3.3'
  };
  var _requiredBy$1 = ['/axios-cookiejar-support', '/request'];
  var _resolved$1 =
    'https://registry.npmjs.org/tough-cookie/-/tough-cookie-2.3.3.tgz';
  var _spec$1 = '2.3.3';
  var _where$1 = '/var/www/gologic/temp/jcognos';
  var author$1 = {
    name: 'Jeremy Stashewsky',
    email: 'jstashewsky@salesforce.com'
  };
  var bugs$1 = { url: 'https://github.com/salesforce/tough-cookie/issues' };
  var contributors = [
    { name: 'Alexander Savin' },
    { name: 'Ian Livingstone' },
    { name: 'Ivan Nikulin' },
    { name: 'Lalit Kapoor' },
    { name: 'Sam Thompson' },
    { name: 'Sebastian Mayr' }
  ];
  var dependencies$1 = { punycode: '^1.4.1' };
  var description$1 = 'RFC6265 Cookies and Cookie Jar for node.js';
  var devDependencies$1 = {
    async: '^1.4.2',
    'string.prototype.repeat': '^0.2.0',
    vows: '^0.8.1'
  };
  var engines = { node: '>=0.8' };
  var files = ['lib'];
  var homepage$1 = 'https://github.com/salesforce/tough-cookie';
  var keywords$1 = [
    'HTTP',
    'cookie',
    'cookies',
    'set-cookie',
    'cookiejar',
    'jar',
    'RFC6265',
    'RFC2965'
  ];
  var license$1 = 'BSD-3-Clause';
  var main$1 = './lib/cookie';
  var name$1 = 'tough-cookie';
  var repository$1 = {
    type: 'git',
    url: 'git://github.com/salesforce/tough-cookie.git'
  };
  var scripts$1 = {
    suffixup:
      'curl -o public_suffix_list.dat https://publicsuffix.org/list/public_suffix_list.dat && ./generate-pubsuffix.js',
    test: 'vows test/*_test.js'
  };
  var version$3 = '2.3.3';
  var _package$2 = {
    _args: _args$1,
    _from: _from$1,
    _id: _id$1,
    _inBundle: _inBundle$1,
    _integrity: _integrity$1,
    _location: _location$1,
    _phantomChildren: _phantomChildren$1,
    _requested: _requested$1,
    _requiredBy: _requiredBy$1,
    _resolved: _resolved$1,
    _spec: _spec$1,
    _where: _where$1,
    author: author$1,
    bugs: bugs$1,
    contributors: contributors,
    dependencies: dependencies$1,
    description: description$1,
    devDependencies: devDependencies$1,
    engines: engines,
    files: files,
    homepage: homepage$1,
    keywords: keywords$1,
    license: license$1,
    main: main$1,
    name: name$1,
    repository: repository$1,
    scripts: scripts$1,
    version: version$3
  };

  var _package$3 = Object.freeze({
    _args: _args$1,
    _from: _from$1,
    _id: _id$1,
    _inBundle: _inBundle$1,
    _integrity: _integrity$1,
    _location: _location$1,
    _phantomChildren: _phantomChildren$1,
    _requested: _requested$1,
    _requiredBy: _requiredBy$1,
    _resolved: _resolved$1,
    _spec: _spec$1,
    _where: _where$1,
    author: author$1,
    bugs: bugs$1,
    contributors: contributors,
    dependencies: dependencies$1,
    description: description$1,
    devDependencies: devDependencies$1,
    engines: engines,
    files: files,
    homepage: homepage$1,
    keywords: keywords$1,
    license: license$1,
    main: main$1,
    name: name$1,
    repository: repository$1,
    scripts: scripts$1,
    version: version$3,
    default: _package$2
  });

  var net = (empty$1 && empty) || empty$1;

  var require$$4 = (_package$3 && _package$2) || _package$3;

  var urlParse$1 = require$$0$3.parse;

  var Store = store.Store;
  var MemoryCookieStore = memstore.MemoryCookieStore;
  var pathMatch = pathMatch_1.pathMatch;
  var VERSION = require$$4.version;

  var punycode$2;
  try {
    punycode$2 = punycode$3;
  } catch (e) {
    console.warn(
      "cookie: can't load punycode; won't use punycode for domain normalization"
    );
  }

  var DATE_DELIM = /[\x09\x20-\x2F\x3B-\x40\x5B-\x60\x7B-\x7E]/;

  // From RFC6265 S4.1.1
  // note that it excludes \x3B ";"
  var COOKIE_OCTET = /[\x21\x23-\x2B\x2D-\x3A\x3C-\x5B\x5D-\x7E]/;
  var COOKIE_OCTETS = new RegExp('^' + COOKIE_OCTET.source + '+$');

  var CONTROL_CHARS = /[\x00-\x1F]/;

  // For COOKIE_PAIR and LOOSE_COOKIE_PAIR below, the number of spaces has been
  // restricted to 256 to side-step a ReDoS issue reported here:
  // https://github.com/salesforce/tough-cookie/issues/92

  // Double quotes are part of the value (see: S4.1.1).
  // '\r', '\n' and '\0' should be treated as a terminator in the "relaxed" mode
  // (see: https://github.com/ChromiumWebApps/chromium/blob/b3d3b4da8bb94c1b2e061600df106d590fda3620/net/cookies/parsed_cookie.cc#L60)
  // '=' and ';' are attribute/values separators
  // (see: https://github.com/ChromiumWebApps/chromium/blob/b3d3b4da8bb94c1b2e061600df106d590fda3620/net/cookies/parsed_cookie.cc#L64)
  var COOKIE_PAIR = /^(([^=;]+))\s{0,256}=\s*([^\n\r\0]*)/;

  // Used to parse non-RFC-compliant cookies like '=abc' when given the `loose`
  // option in Cookie.parse:
  var LOOSE_COOKIE_PAIR = /^((?:=)?([^=;]*)\s{0,256}=\s*)?([^\n\r\0]*)/;

  // RFC6265 S4.1.1 defines path value as 'any CHAR except CTLs or ";"'
  // Note ';' is \x3B
  var PATH_VALUE = /[\x20-\x3A\x3C-\x7E]+/;

  var DAY_OF_MONTH = /^(\d{1,2})[^\d]*$/;
  var TIME$1 = /^(\d{1,2})[^\d]*:(\d{1,2})[^\d]*:(\d{1,2})[^\d]*$/;
  var MONTH = /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i;

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

  var YEAR = /^(\d{2}|\d{4})$/; // 2 to 4 digits

  var MAX_TIME = 2147483647000; // 31-bit max
  var MIN_TIME = 0; // 31-bit min

  // RFC6265 S5.1.1 date parser:
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
    var minutes = null;
    var seconds = null;
    var day = null;
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
      if (seconds === null) {
        result = TIME$1.exec(token);
        if (result) {
          hour = parseInt(result[1], 10);
          minutes = parseInt(result[2], 10);
          seconds = parseInt(result[3], 10);
          /* RFC6265 S5.1.1.5:
         * [fail if]
         * *  the hour-value is greater than 23,
         * *  the minute-value is greater than 59, or
         * *  the second-value is greater than 59.
         */
          if (hour > 23 || minutes > 59 || seconds > 59) {
            return;
          }

          continue;
        }
      }

      /* 2.2. If the found-day-of-month flag is not set and the date-token matches
     * the day-of-month production, set the found-day-of- month flag and set
     * the day-of-month-value to the number denoted by the date-token.  Skip
     * the remaining sub-steps and continue to the next date-token.
     */
      if (day === null) {
        result = DAY_OF_MONTH.exec(token);
        if (result) {
          day = parseInt(result, 10);
          /* RFC6265 S5.1.1.5:
         * [fail if] the day-of-month-value is less than 1 or greater than 31
         */
          if (day < 1 || day > 31) {
            return;
          }
          continue;
        }
      }

      /* 2.3. If the found-month flag is not set and the date-token matches the
     * month production, set the found-month flag and set the month-value to
     * the month denoted by the date-token.  Skip the remaining sub-steps and
     * continue to the next date-token.
     */
      if (month === null) {
        result = MONTH.exec(token);
        if (result) {
          month = MONTH_TO_NUM[result[1].toLowerCase()];
          continue;
        }
      }

      /* 2.4. If the found-year flag is not set and the date-token matches the year
     * production, set the found-year flag and set the year-value to the number
     * denoted by the date-token.  Skip the remaining sub-steps and continue to
     * the next date-token.
     */
      if (year === null) {
        result = YEAR.exec(token);
        if (result) {
          year = parseInt(result[0], 10);
          /* From S5.1.1:
         * 3.  If the year-value is greater than or equal to 70 and less
         * than or equal to 99, increment the year-value by 1900.
         * 4.  If the year-value is greater than or equal to 0 and less
         * than or equal to 69, increment the year-value by 2000.
         */
          if (70 <= year && year <= 99) {
            year += 1900;
          } else if (0 <= year && year <= 69) {
            year += 2000;
          }

          if (year < 1601) {
            return; // 5. ... the year-value is less than 1601
          }
        }
      }
    }

    if (seconds === null || day === null || month === null || year === null) {
      return; // 5. ... at least one of the found-day-of-month, found-month, found-
      // year, or found-time flags is not set,
    }

    return new Date(Date.UTC(year, month, day, hour, minutes, seconds));
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
    if (punycode$2 && /[^\u0001-\u007f]/.test(str)) {
      str = punycode$2.toASCII(str);
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

  function parse$3(str, options) {
    if (!options || typeof options !== 'object') {
      options = {};
    }
    str = str.trim();

    // We use a regex to parse the "name-value-pair" part of S5.2
    var firstSemi = str.indexOf(';'); // S5.2 step 1
    var pairRe = options.loose ? LOOSE_COOKIE_PAIR : COOKIE_PAIR;
    var result = pairRe.exec(firstSemi === -1 ? str : str.substr(0, firstSemi));

    // Rx satisfies the "the name string is empty" and "lacks a %x3D ("=")"
    // constraints as well as trimming any whitespace.
    if (!result) {
      return;
    }

    var c = new Cookie();
    if (result[1]) {
      c.key = result[2].trim();
    } else {
      c.key = '';
    }
    c.value = result[3].trim();
    if (CONTROL_CHARS.test(c.key) || CONTROL_CHARS.test(c.value)) {
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

  Cookie.parse = parse$3;
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
      var suffix = pubsuffix.getPublicSuffix(cdomain);
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

  function CookieJar(store$$1, options) {
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

    if (!store$$1) {
      store$$1 = new MemoryCookieStore();
    }
    this.store = store$$1;
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
      var suffix = pubsuffix.getPublicSuffix(cookie.cdomain());
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

    var store$$1 = this.store;

    if (!store$$1.updateCookie) {
      store$$1.updateCookie = function(oldCookie, newCookie, cb) {
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
        store$$1.updateCookie(oldCookie, cookie, next); // step 12
      } else {
        cookie.creation = cookie.lastAccessed = now;
        store$$1.putCookie(cookie, next); // step 12
      }
    }

    store$$1.findCookie(cookie.domain, cookie.path, cookie.key, withCookie);
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
    var store$$1 = this.store;

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
      if (!allPaths && !pathMatch(path, c.path)) {
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
        store$$1.removeCookie(c.domain, c.path, c.key, function() {}); // result ignored
        return false;
      }

      return true;
    }

    store$$1.findCookies(host, allPaths ? null : path, function(err, cookies) {
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
      version: 'tough-cookie@' + VERSION,

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

  CookieJar.deserialize = function(strOrObj, store$$1, cb) {
    if (arguments.length !== 3) {
      // store is optional
      cb = store$$1;
      store$$1 = null;
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

    var jar = new CookieJar(store$$1, serialized.rejectPublicSuffixes);
    jar._importCookies(serialized, function(err) {
      if (err) {
        return cb(err);
      }
      cb(null, jar);
    });
  };

  CookieJar.deserializeSync = function(strOrObj, store$$1) {
    var serialized =
      typeof strOrObj === 'string' ? JSON.parse(strOrObj) : strOrObj;
    var jar = new CookieJar(store$$1, serialized.rejectPublicSuffixes);

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

  CAN_BE_SYNC.push('clone');
  CookieJar.prototype.clone = function(newStore, cb) {
    if (arguments.length === 1) {
      cb = newStore;
      newStore = null;
    }

    this.serialize(function(err, serialized) {
      if (err) {
        return cb(err);
      }
      CookieJar.deserialize(newStore, serialized, cb);
    });
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

  var cookie = {
    CookieJar: CookieJar,
    Cookie: Cookie,
    Store: Store,
    MemoryCookieStore: MemoryCookieStore,
    parseDate: parseDate,
    formatDate: formatDate,
    parse: parse$3,
    fromJSON: fromJSON,
    domainMatch: domainMatch,
    defaultPath: defaultPath,
    pathMatch: pathMatch,
    getPublicSuffix: pubsuffix.getPublicSuffix,
    cookieCompare: cookieCompare,
    permuteDomain: permuteDomain_1.permuteDomain,
    permutePath: permutePath,
    canonicalDomain: canonicalDomain
  };

  var classCallCheck = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  };

  var createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function(Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  var cRequest;

  var CognosRequest = (function() {
    function CognosRequest(url, debug) {
      classCallCheck(this, CognosRequest);

      if (url.substr(-1) !== '/') {
        url = url + '/';
      }
      this.url = url;
      this.debug = debug;
      this.token = '';
      this.loggedin = false;
    }

    createClass(CognosRequest, [
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
          if (Utils.isNode()) {
            var cookieJar = new cookie.CookieJar();
          } else {
            if (me.token == '') {
              var rawcookies = document.cookie.split(';');

              var goon = true;
              rawcookies.forEach(function(rawcookie) {
                var cookie$$1 = cookie.parse(rawcookie);
                if (typeof cookie$$1 != 'undefined') {
                  if (
                    cookie$$1.key == 'X-XSRF-TOKEN' ||
                    cookie$$1.key == 'XSRF-TOKEN'
                  ) {
                    if (
                      cookie$$1.value != 'undefined' ||
                      cookie$$1.value != ''
                    ) {
                      me.token = cookie$$1.value;
                    }
                  } else {
                    me.log('deleting cookie' + cookie$$1.key);

                    goon = false || loggedout;
                  }
                }
              });
              if (!goon) {
                result = this.delete('bi/v1/login').then(function() {
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
            }
          }

          var result = axios
            .get(me.url + 'bi/v1/login', {
              jar: cookieJar,
              withCredentials: false,
              headers: firstheaders
            })
            .then(function(body) {
              me.log('Unexpected success');
              return me;
            })
            .catch(function(err) {
              me.log('Expected Error in initialise');
              if (cookieJar) {
                var cookieurl = me.url + 'bi';
                cookieurl = me.url + 'bi';
                me.log('cookie url: ' + cookieurl);
                me.cookies = cookieJar;
                var cookies = cookieJar.getCookies(
                  cookieurl,
                  {
                    allPaths: true
                  },
                  function(err, cookies) {
                    cookies.forEach(function(cook) {
                      me.log('cookie key: ' + cook.key);
                      if (cook.key == 'XSRFToken') {
                        me.token = cook.value;
                        me.log('token: ' + me.token);
                        cookieJar.setCookie(
                          'XSRF-TOKEN=' + me.token,
                          cookieurl,
                          function(err, cookje) {
                            cookieJar.setCookie(
                              'X-XSRF-TOKEN=' + me.token,
                              cookieurl,
                              function(err, cookje) {
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
                err.response.data.promptInfo.displayObjects.forEach(function(
                  item
                ) {
                  if (item.name == 'CAMNamespace') {
                    me.namespace = item.value;
                    me.log('Namespace: ' + me.namespace);
                  }
                });
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
          me.log('get URL:    ' + me.url + path);

          var result = axios
            .get(me.url + path, {
              headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json; charset=UTF-8'
              },
              jar: me.cookies,
              withCredentials: true
            })
            .then(function(response) {
              me.log('Get Response Data', response.data);
              return response.data;
            })
            .catch(function(err) {
              me.error('Error in Fetch of ' + path);
              me.log(err);
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

          me.log('params: ' + paramsJSON);
          me.log('cookies: ' + me.cookies);
          if (!Utils.isNode) {
            document.cookie = 'XSRF-TOKEN=' + me.token;
          }
          var result = axios
            .post(me.url + path, paramsJSON, {
              headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json; charset=UTF-8'
              },

              jar: me.cookies,

              withCredentials: true
            })
            .then(function(response) {
              me.log('CognosRequest : Success Posting');

              if (fullResponse) {
                result = response;
              } else {
                result = response.data;
              }
              return response;
            })
            .catch(function(err) {
              me.log('CognosRequest : Error in post', err);
              me.error(err);
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
          var paramsJSON = JSON.stringify(params);
          var result = {};

          me.log('params: ' + paramsJSON);
          var result = axios
            .delete(me.url + path, {
              data: paramsJSON,
              headers: {
                'X-XSRF-TOKEN': me.token,
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json; charset=UTF-8'
              },
              jar: me.cookies,
              withCredentials: true
            })
            .then(function(response) {
              me.log('CognosRequest : Success Deleting');

              if (fullResponse) {
                result = response;
              } else {
                try {
                  result = response.replace(/=\\'/g, "='");
                  result = result.replace(/\\']/g, "']");
                  result = JSON.parse(result);
                } catch (err) {
                  me.log('No valid JSON returned from delete request. ' + path);
                  result = response;
                }
              }
              return result;
            })
            .catch(function(err) {
              me.log('CognosRequest : Error in delete', err);
            });
          return result;
        }
      },
      {
        key: 'put',
        value: function put(path) {
          var me = this;

          var result = axios
            .put(me.url + path, {
              headers: {
                'X-Requested-With': 'XMLHttpRequest'
              },
              jar: me.cookies,
              withCredentials: true
            })
            .then(function(response) {
              me.log('CognosRequest : Success Putting ');

              response = response.replace(/=\\'/g, "='");
              response = response.replace(/\\']/g, "']");
              var result = JSON.parse(response);
              return result;
            })
            .catch(function(err) {
              me.log('CognosRequest : Error in put');
              me.error(err);
            });
          return result;
        }
      }
    ]);
    return CognosRequest;
  })();

  function getCognosRequest(url, debug) {
    var result;
    if (typeof cRequest == 'undefined') {
      cRequest = new CognosRequest(url, debug);
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
      filter$1(resolvedPath.split('/'), function(p) {
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
      filter$1(path.split('/'), function(p) {
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
      filter$1(paths, function(p, index) {
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
  var path$1 = {
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
  function filter$1(xs, f) {
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

  var path$2 = Object.freeze({
    resolve: resolve,
    normalize: normalize,
    isAbsolute: isAbsolute,
    join: join,
    relative: relative,
    sep: sep,
    delimiter: delimiter$1,
    dirname: dirname,
    basename: basename,
    extname: extname,
    default: path$1
  });

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

  var require$$0$9 = (path$2 && path$1) || path$2;

  var minimatch_1 = minimatch;
  minimatch.Minimatch = Minimatch;

  var path = { sep: '/' };
  try {
    path = require$$0$9;
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

  minimatch.filter = filter;
  function filter(pattern, options) {
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
  Minimatch.prototype.parse = parse$4;
  var SUBPARSE = {};
  function parse$4(pattern, isSub) {
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
          options.dot ? '(?!(?:^|\\/)\\.{1,2}(?:$|\\/))' : '(?!\\.)';
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
      : options.dot ? twoStarDot : twoStarNoDot;
    var flags = options.nocase ? 'i' : '';

    var re = set
      .map(function(pattern) {
        return pattern
          .map(function(p) {
            return p === GLOBSTAR
              ? twoStar
              : typeof p === 'string' ? regExpEscape(p) : p._src;
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

  var Cognos = (function() {
    function Cognos(debug) {
      classCallCheck(this, Cognos);

      this.loggedin = false;
      this.debug = debug;
    }

    createClass(Cognos, [
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
          var me = this;

          var params = {
            parameters: [
              {
                name: 'CAMNamespace',
                value: me.requester.namespace
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

          var result = me.requester
            .post('bi/v1/login', params)
            .then(function(body) {
              me.loggedin = true;
              me.log('Successfully logged in');
              return body;
            })
            .catch(function(err) {
              me.log('Cognos: Error when logging in.');
            });
          return result;
        }
      },
      {
        key: 'logoff',
        value: function logoff() {
          var me = this;

          var result = me.requester
            .delete('bi/v1/login')
            .then(function(body) {
              me.loggedin = false;
              me.log('Successfully logged off');
              return body;
            })
            .catch(function(err) {
              me.log('Cognos: Error when logging off.');
            });
          return result;
        }
      },
      {
        key: 'listfolderbyname',
        value: function listfolderbyname(name) {}
      },
      {
        key: 'listRootFolder',
        value: function listRootFolder() {
          var me = this;
          var rootfolders = [];

          var result = me.requester
            .get('bi/v1/objects/.my_folders?fields=permissions')
            .then(function(folders) {
              me.log('Got the Private Folders');

              rootfolders.push({
                id: folders.data[0].id,
                name: 'My Content'
              });
            })
            .then(function() {
              return me.requester
                .get('bi/v1/objects/.public_folders?fields=permissions')
                .then(function(folders) {
                  me.log('Got the Public Folders');
                  rootfolders.push({
                    id: folders.data[0].id,
                    name: 'Team Content'
                  });
                  return rootfolders;
                });
            });
          return result;
        }
      },
      {
        key: 'listPublicFolders',
        value: function listPublicFolders() {
          var me = this;

          var result = me.requester
            .get('bi/v1/objects/.public_folders?fields=permissions')
            .then(function(folders) {
              return me.listFolderById(folders.data[0].id);
            });
          return result;
        }
      },
      {
        key: 'listPublicFolders10',
        value: function listPublicFolders10() {
          var me = this;

          var result = me.requester
            .get('bi/v1/disp/icd/feeds/cm/?dojo=')
            .then(function(folders) {});

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

                  var tpFolder = {
                    name: folder.defaultName,
                    id: folder.id
                  };
                  result.push(tpFolder);
                }
              });
              return result;
            });
          return result;
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
              if (Utils.isStandardBrowserEnv()) {
                var id = response.headers.location.split('/').pop();
              } else {
                var id = response.data.data[0].id;
              }
              return {
                name: name,
                id: id
              };
            })
            .catch(function(err) {
              me.log('Cognos: Error creating folder.');
              me.log(err);
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

          var result = me.requester
            .delete('bi/v1/objects/' + id, params, true)
            .then(function(response) {
              me.log('deleted folder');
              return true;
            })
            .catch(function(err) {
              me.log('Cognos: Error Deleting folder.');
              me.log(err);
            });
          return result;
        }
      },
      {
        key: 'uploadExtension',
        value: function uploadExtension(path, name) {
          var result = false;

          return result;
        }
      }
    ]);
    return Cognos;
  })();

  function getCognos(url) {
    var debug =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (typeof jCognos == 'undefined') {
      var myRequest = getCognosRequest(url, debug).then(function(cRequest) {
        jCognos = new Cognos(debug);
        jCognos.requester = cRequest;
        return jCognos;
      });
      return myRequest;
    } else {
      return Promise.resolve(jCognos);
    }
  }

  exports.getCognos = getCognos;

  Object.defineProperty(exports, '__esModule', { value: true });
});
