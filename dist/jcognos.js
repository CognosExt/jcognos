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

  // btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

  var chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  function E() {
    this.message = 'String contains an invalid character';
  }
  E.prototype = new Error();
  E.prototype.code = 5;
  E.prototype.name = 'InvalidCharacterError';

  function btoa(input) {
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

  var btoa_1 = btoa;

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

  var btoa$1 =
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
          'Basic ' + btoa$1(username + ':' + password);
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

  var empty = {};

  var empty$1 = /*#__PURE__*/ Object.freeze({
    default: empty
  });

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
  var punycode = {
    version: version$1,
    ucs2: ucs2,
    toASCII: toASCII,
    toUnicode: toUnicode,
    encode: encode$1,
    decode: decode
  };

  var punycode$1 = /*#__PURE__*/ Object.freeze({
    decode: decode,
    encode: encode$1,
    toUnicode: toUnicode,
    toASCII: toASCII,
    version: version$1,
    ucs2: ucs2,
    default: punycode
  });

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
  function isBuffer$1(obj) {
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
      isFunction$1(value.inspect) &&
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
      if (isFunction$1(value)) {
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
    if (isFunction$1(value)) {
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

  function isFunction$1(arg) {
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
    isFunction: isFunction$1,
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

  var util$1 = /*#__PURE__*/ Object.freeze({
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
    isFunction: isFunction$1,
    isPrimitive: isPrimitive,
    isBuffer: isBuffer$2,
    log: log,
    inherits: inherits$1,
    _extend: _extend,
    default: util
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

  var url$1 = /*#__PURE__*/ Object.freeze({
    parse: urlParse,
    resolve: urlResolve,
    resolveObject: urlResolveObject,
    format: urlFormat,
    default: url,
    Url: Url
  });

  function createCommonjsModule(fn, module) {
    return (
      (module = { exports: {} }), fn(module, module.exports), module.exports
    );
  }

  var punycode$2 = (punycode$1 && punycode) || punycode$1;

  var pubsuffix = createCommonjsModule(function(module) {
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
      var asciiDomain = punycode$2.toASCII(domain);
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
        return converted ? punycode$2.toUnicode(publicSuffix) : publicSuffix;
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
      'musica.ar': true,
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
      'gob.bo': true,
      'int.bo': true,
      'org.bo': true,
      'net.bo': true,
      'mil.bo': true,
      'tv.bo': true,
      'web.bo': true,
      'academia.bo': true,
      'agro.bo': true,
      'arte.bo': true,
      'blog.bo': true,
      'bolivia.bo': true,
      'ciencia.bo': true,
      'cooperativa.bo': true,
      'democracia.bo': true,
      'deporte.bo': true,
      'ecologia.bo': true,
      'economia.bo': true,
      'empresa.bo': true,
      'indigena.bo': true,
      'industria.bo': true,
      'info.bo': true,
      'medicina.bo': true,
      'movimiento.bo': true,
      'musica.bo': true,
      'natural.bo': true,
      'nombre.bo': true,
      'noticias.bo': true,
      'patria.bo': true,
      'politica.bo': true,
      'profesional.bo': true,
      'plurinacional.bo': true,
      'pueblo.bo': true,
      'revista.bo': true,
      'salud.bo': true,
      'tecnologia.bo': true,
      'tksat.bo': true,
      'transporte.bo': true,
      'wiki.bo': true,
      br: true,
      '9guacu.br': true,
      'abc.br': true,
      'adm.br': true,
      'adv.br': true,
      'agr.br': true,
      'aju.br': true,
      'am.br': true,
      'anani.br': true,
      'aparecida.br': true,
      'arq.br': true,
      'art.br': true,
      'ato.br': true,
      'b.br': true,
      'belem.br': true,
      'bhz.br': true,
      'bio.br': true,
      'blog.br': true,
      'bmd.br': true,
      'boavista.br': true,
      'bsb.br': true,
      'campinagrande.br': true,
      'campinas.br': true,
      'caxias.br': true,
      'cim.br': true,
      'cng.br': true,
      'cnt.br': true,
      'com.br': true,
      'contagem.br': true,
      'coop.br': true,
      'cri.br': true,
      'cuiaba.br': true,
      'curitiba.br': true,
      'def.br': true,
      'ecn.br': true,
      'eco.br': true,
      'edu.br': true,
      'emp.br': true,
      'eng.br': true,
      'esp.br': true,
      'etc.br': true,
      'eti.br': true,
      'far.br': true,
      'feira.br': true,
      'flog.br': true,
      'floripa.br': true,
      'fm.br': true,
      'fnd.br': true,
      'fortal.br': true,
      'fot.br': true,
      'foz.br': true,
      'fst.br': true,
      'g12.br': true,
      'ggf.br': true,
      'goiania.br': true,
      'gov.br': true,
      'ac.gov.br': true,
      'al.gov.br': true,
      'am.gov.br': true,
      'ap.gov.br': true,
      'ba.gov.br': true,
      'ce.gov.br': true,
      'df.gov.br': true,
      'es.gov.br': true,
      'go.gov.br': true,
      'ma.gov.br': true,
      'mg.gov.br': true,
      'ms.gov.br': true,
      'mt.gov.br': true,
      'pa.gov.br': true,
      'pb.gov.br': true,
      'pe.gov.br': true,
      'pi.gov.br': true,
      'pr.gov.br': true,
      'rj.gov.br': true,
      'rn.gov.br': true,
      'ro.gov.br': true,
      'rr.gov.br': true,
      'rs.gov.br': true,
      'sc.gov.br': true,
      'se.gov.br': true,
      'sp.gov.br': true,
      'to.gov.br': true,
      'gru.br': true,
      'imb.br': true,
      'ind.br': true,
      'inf.br': true,
      'jab.br': true,
      'jampa.br': true,
      'jdf.br': true,
      'joinville.br': true,
      'jor.br': true,
      'jus.br': true,
      'leg.br': true,
      'lel.br': true,
      'londrina.br': true,
      'macapa.br': true,
      'maceio.br': true,
      'manaus.br': true,
      'maringa.br': true,
      'mat.br': true,
      'med.br': true,
      'mil.br': true,
      'morena.br': true,
      'mp.br': true,
      'mus.br': true,
      'natal.br': true,
      'net.br': true,
      'niteroi.br': true,
      '*.nom.br': true,
      'not.br': true,
      'ntr.br': true,
      'odo.br': true,
      'org.br': true,
      'osasco.br': true,
      'palmas.br': true,
      'poa.br': true,
      'ppg.br': true,
      'pro.br': true,
      'psc.br': true,
      'psi.br': true,
      'pvh.br': true,
      'qsl.br': true,
      'radio.br': true,
      'rec.br': true,
      'recife.br': true,
      'ribeirao.br': true,
      'rio.br': true,
      'riobranco.br': true,
      'riopreto.br': true,
      'salvador.br': true,
      'sampa.br': true,
      'santamaria.br': true,
      'santoandre.br': true,
      'saobernardo.br': true,
      'saogonca.br': true,
      'sjc.br': true,
      'slg.br': true,
      'slz.br': true,
      'sorocaba.br': true,
      'srv.br': true,
      'taxi.br': true,
      'teo.br': true,
      'the.br': true,
      'tmp.br': true,
      'trd.br': true,
      'tur.br': true,
      'tv.br': true,
      'udi.br': true,
      'vet.br': true,
      'vix.br': true,
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
      ke: true,
      'ac.ke': true,
      'co.ke': true,
      'go.ke': true,
      'info.ke': true,
      'me.ke': true,
      'mobi.ke': true,
      'ne.ke': true,
      'or.ke': true,
      'sc.ke': true,
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
      'nom.nc': true,
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
      ni: true,
      'ac.ni': true,
      'biz.ni': true,
      'co.ni': true,
      'com.ni': true,
      'edu.ni': true,
      'gob.ni': true,
      'in.ni': true,
      'info.ni': true,
      'int.ni': true,
      'mil.ni': true,
      'net.ni': true,
      'nom.ni': true,
      'org.ni': true,
      'web.ni': true,
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
      onion: true,
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
      'edu.ru': true,
      'gov.ru': true,
      'int.ru': true,
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
      'ann-arbor.mi.us': true,
      'cog.mi.us': true,
      'dst.mi.us': true,
      'eaton.mi.us': true,
      'gen.mi.us': true,
      'mus.mi.us': true,
      'tec.mi.us': true,
      'washtenaw.mi.us': true,
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
      'xn--90ae': true,
      'xn--90ais': true,
      'xn--fiqs8s': true,
      'xn--fiqz9s': true,
      'xn--lgbbat1ad8j': true,
      'xn--wgbh1c': true,
      'xn--e1a4c': true,
      'xn--node': true,
      'xn--qxam': true,
      'xn--j6w193g': true,
      'xn--2scrj9c': true,
      'xn--3hcrj9c': true,
      'xn--45br5cyl': true,
      'xn--h2breg3eve': true,
      'xn--h2brj9c8c': true,
      'xn--mgbgu82a': true,
      'xn--rvc1e0am3e': true,
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
      'xn--12c1fe0br.xn--o3cw4h': true,
      'xn--12co0c3b4eva.xn--o3cw4h': true,
      'xn--h3cuzk1di.xn--o3cw4h': true,
      'xn--o3cyx2a.xn--o3cw4h': true,
      'xn--m3ch0j3a.xn--o3cw4h': true,
      'xn--12cfi8ixb8l.xn--o3cw4h': true,
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
      zw: true,
      'ac.zw': true,
      'co.zw': true,
      'gov.zw': true,
      'mil.zw': true,
      'org.zw': true,
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
      earth: true,
      eat: true,
      eco: true,
      edeka: true,
      education: true,
      email: true,
      emerck: true,
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
      hospital: true,
      host: true,
      hosting: true,
      hot: true,
      hoteles: true,
      hotels: true,
      hotmail: true,
      house: true,
      how: true,
      hsbc: true,
      hughes: true,
      hyatt: true,
      hyundai: true,
      ibm: true,
      icbc: true,
      ice: true,
      icu: true,
      ieee: true,
      ifm: true,
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
      origins: true,
      osaka: true,
      otsuka: true,
      ott: true,
      ovh: true,
      page: true,
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
      rugby: true,
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
      'cc.ua': true,
      'inf.ua': true,
      'ltd.ua': true,
      '1password.ca': true,
      '1password.com': true,
      '1password.eu': true,
      'beep.pl': true,
      '*.compute.estate': true,
      '*.alces.network': true,
      'alwaysdata.net': true,
      'cloudfront.net': true,
      '*.compute.amazonaws.com': true,
      '*.compute-1.amazonaws.com': true,
      '*.compute.amazonaws.com.cn': true,
      'us-east-1.amazonaws.com': true,
      'cn-north-1.eb.amazonaws.com.cn': true,
      'elasticbeanstalk.com': true,
      'ap-northeast-1.elasticbeanstalk.com': true,
      'ap-northeast-2.elasticbeanstalk.com': true,
      'ap-south-1.elasticbeanstalk.com': true,
      'ap-southeast-1.elasticbeanstalk.com': true,
      'ap-southeast-2.elasticbeanstalk.com': true,
      'ca-central-1.elasticbeanstalk.com': true,
      'eu-central-1.elasticbeanstalk.com': true,
      'eu-west-1.elasticbeanstalk.com': true,
      'eu-west-2.elasticbeanstalk.com': true,
      'eu-west-3.elasticbeanstalk.com': true,
      'sa-east-1.elasticbeanstalk.com': true,
      'us-east-1.elasticbeanstalk.com': true,
      'us-east-2.elasticbeanstalk.com': true,
      'us-gov-west-1.elasticbeanstalk.com': true,
      'us-west-1.elasticbeanstalk.com': true,
      'us-west-2.elasticbeanstalk.com': true,
      '*.elb.amazonaws.com': true,
      '*.elb.amazonaws.com.cn': true,
      's3.amazonaws.com': true,
      's3-ap-northeast-1.amazonaws.com': true,
      's3-ap-northeast-2.amazonaws.com': true,
      's3-ap-south-1.amazonaws.com': true,
      's3-ap-southeast-1.amazonaws.com': true,
      's3-ap-southeast-2.amazonaws.com': true,
      's3-ca-central-1.amazonaws.com': true,
      's3-eu-central-1.amazonaws.com': true,
      's3-eu-west-1.amazonaws.com': true,
      's3-eu-west-2.amazonaws.com': true,
      's3-eu-west-3.amazonaws.com': true,
      's3-external-1.amazonaws.com': true,
      's3-fips-us-gov-west-1.amazonaws.com': true,
      's3-sa-east-1.amazonaws.com': true,
      's3-us-gov-west-1.amazonaws.com': true,
      's3-us-east-2.amazonaws.com': true,
      's3-us-west-1.amazonaws.com': true,
      's3-us-west-2.amazonaws.com': true,
      's3.ap-northeast-2.amazonaws.com': true,
      's3.ap-south-1.amazonaws.com': true,
      's3.cn-north-1.amazonaws.com.cn': true,
      's3.ca-central-1.amazonaws.com': true,
      's3.eu-central-1.amazonaws.com': true,
      's3.eu-west-2.amazonaws.com': true,
      's3.eu-west-3.amazonaws.com': true,
      's3.us-east-2.amazonaws.com': true,
      's3.dualstack.ap-northeast-1.amazonaws.com': true,
      's3.dualstack.ap-northeast-2.amazonaws.com': true,
      's3.dualstack.ap-south-1.amazonaws.com': true,
      's3.dualstack.ap-southeast-1.amazonaws.com': true,
      's3.dualstack.ap-southeast-2.amazonaws.com': true,
      's3.dualstack.ca-central-1.amazonaws.com': true,
      's3.dualstack.eu-central-1.amazonaws.com': true,
      's3.dualstack.eu-west-1.amazonaws.com': true,
      's3.dualstack.eu-west-2.amazonaws.com': true,
      's3.dualstack.eu-west-3.amazonaws.com': true,
      's3.dualstack.sa-east-1.amazonaws.com': true,
      's3.dualstack.us-east-1.amazonaws.com': true,
      's3.dualstack.us-east-2.amazonaws.com': true,
      's3-website-us-east-1.amazonaws.com': true,
      's3-website-us-west-1.amazonaws.com': true,
      's3-website-us-west-2.amazonaws.com': true,
      's3-website-ap-northeast-1.amazonaws.com': true,
      's3-website-ap-southeast-1.amazonaws.com': true,
      's3-website-ap-southeast-2.amazonaws.com': true,
      's3-website-eu-west-1.amazonaws.com': true,
      's3-website-sa-east-1.amazonaws.com': true,
      's3-website.ap-northeast-2.amazonaws.com': true,
      's3-website.ap-south-1.amazonaws.com': true,
      's3-website.ca-central-1.amazonaws.com': true,
      's3-website.eu-central-1.amazonaws.com': true,
      's3-website.eu-west-2.amazonaws.com': true,
      's3-website.eu-west-3.amazonaws.com': true,
      's3-website.us-east-2.amazonaws.com': true,
      't3l3p0rt.net': true,
      'tele.amune.org': true,
      'on-aptible.com': true,
      'user.party.eus': true,
      'pimienta.org': true,
      'poivron.org': true,
      'potager.org': true,
      'sweetpepper.org': true,
      'myasustor.com': true,
      'myfritz.net': true,
      '*.awdev.ca': true,
      '*.advisor.ws': true,
      'backplaneapp.io': true,
      'betainabox.com': true,
      'bnr.la': true,
      'boomla.net': true,
      'boxfuse.io': true,
      'square7.ch': true,
      'bplaced.com': true,
      'bplaced.de': true,
      'square7.de': true,
      'bplaced.net': true,
      'square7.net': true,
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
      'c66.me': true,
      'cloud66.ws': true,
      'jdevcloud.com': true,
      'wpdevcloud.com': true,
      'cloudaccess.host': true,
      'freesite.host': true,
      'cloudaccess.net': true,
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
      'webhosting.be': true,
      'hosting-cluster.nl': true,
      'dyn.cosidns.de': true,
      'dynamisches-dns.de': true,
      'dnsupdater.de': true,
      'internet-dns.de': true,
      'l-o-g-i-n.de': true,
      'dynamic-dns.info': true,
      'feste-ip.net': true,
      'knx-server.net': true,
      'static-access.net': true,
      'realm.cz': true,
      '*.cryptonomic.net': true,
      'cupcake.is': true,
      'cyon.link': true,
      'cyon.site': true,
      'daplie.me': true,
      'localhost.daplie.me': true,
      'biz.dk': true,
      'co.dk': true,
      'firm.dk': true,
      'reg.dk': true,
      'store.dk': true,
      'debian.net': true,
      'dedyn.io': true,
      'dnshome.de': true,
      'drayddns.com': true,
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
      'definima.net': true,
      'definima.io': true,
      'ddnsfree.com': true,
      'ddnsgeek.com': true,
      'giize.com': true,
      'gleeze.com': true,
      'kozow.com': true,
      'loseyourip.com': true,
      'ooguy.com': true,
      'theworkpc.com': true,
      'casacam.net': true,
      'dynu.net': true,
      'accesscam.org': true,
      'camdvr.org': true,
      'freeddns.org': true,
      'mywire.org': true,
      'webredirect.org': true,
      'myddns.rocks': true,
      'blogsite.xyz': true,
      'dynv6.net': true,
      'e4.cz': true,
      'mytuleap.com': true,
      'enonic.io': true,
      'customer.enonic.io': true,
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
      'eu-3.evennode.com': true,
      'eu-4.evennode.com': true,
      'us-1.evennode.com': true,
      'us-2.evennode.com': true,
      'us-3.evennode.com': true,
      'us-4.evennode.com': true,
      'twmail.cc': true,
      'twmail.net': true,
      'twmail.org': true,
      'mymailer.com.tw': true,
      'url.tw': true,
      'apps.fbsbx.com': true,
      'ru.net': true,
      'adygeya.ru': true,
      'bashkiria.ru': true,
      'bir.ru': true,
      'cbg.ru': true,
      'com.ru': true,
      'dagestan.ru': true,
      'grozny.ru': true,
      'kalmykia.ru': true,
      'kustanai.ru': true,
      'marine.ru': true,
      'mordovia.ru': true,
      'msk.ru': true,
      'mytis.ru': true,
      'nalchik.ru': true,
      'nov.ru': true,
      'pyatigorsk.ru': true,
      'spb.ru': true,
      'vladikavkaz.ru': true,
      'vladimir.ru': true,
      'abkhazia.su': true,
      'adygeya.su': true,
      'aktyubinsk.su': true,
      'arkhangelsk.su': true,
      'armenia.su': true,
      'ashgabad.su': true,
      'azerbaijan.su': true,
      'balashov.su': true,
      'bashkiria.su': true,
      'bryansk.su': true,
      'bukhara.su': true,
      'chimkent.su': true,
      'dagestan.su': true,
      'east-kazakhstan.su': true,
      'exnet.su': true,
      'georgia.su': true,
      'grozny.su': true,
      'ivanovo.su': true,
      'jambyl.su': true,
      'kalmykia.su': true,
      'kaluga.su': true,
      'karacol.su': true,
      'karaganda.su': true,
      'karelia.su': true,
      'khakassia.su': true,
      'krasnodar.su': true,
      'kurgan.su': true,
      'kustanai.su': true,
      'lenug.su': true,
      'mangyshlak.su': true,
      'mordovia.su': true,
      'msk.su': true,
      'murmansk.su': true,
      'nalchik.su': true,
      'navoi.su': true,
      'north-kazakhstan.su': true,
      'nov.su': true,
      'obninsk.su': true,
      'penza.su': true,
      'pokrovsk.su': true,
      'sochi.su': true,
      'spb.su': true,
      'tashkent.su': true,
      'termez.su': true,
      'togliatti.su': true,
      'troitsk.su': true,
      'tselinograd.su': true,
      'tula.su': true,
      'tuva.su': true,
      'vladikavkaz.su': true,
      'vladimir.su': true,
      'vologda.su': true,
      'channelsdvr.net': true,
      'fastlylb.net': true,
      'map.fastlylb.net': true,
      'freetls.fastly.net': true,
      'map.fastly.net': true,
      'a.prod.fastly.net': true,
      'global.prod.fastly.net': true,
      'a.ssl.fastly.net': true,
      'b.ssl.fastly.net': true,
      'global.ssl.fastly.net': true,
      'fhapp.xyz': true,
      'fedorainfracloud.org': true,
      'fedorapeople.org': true,
      'cloud.fedoraproject.org': true,
      'app.os.fedoraproject.org': true,
      'app.os.stg.fedoraproject.org': true,
      'filegear.me': true,
      'firebaseapp.com': true,
      'flynnhub.com': true,
      'flynnhosting.net': true,
      'freebox-os.com': true,
      'freeboxos.com': true,
      'fbx-os.fr': true,
      'fbxos.fr': true,
      'freebox-os.fr': true,
      'freeboxos.fr': true,
      '*.futurecms.at': true,
      'futurehosting.at': true,
      'futuremailing.at': true,
      '*.ex.ortsinfo.at': true,
      '*.kunden.ortsinfo.at': true,
      '*.statics.cloud': true,
      'service.gov.uk': true,
      'github.io': true,
      'githubusercontent.com': true,
      'gitlab.io': true,
      'homeoffice.gov.uk': true,
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
      'cloud.goog': true,
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
      'moonscale.net': true,
      'iki.fi': true,
      'biz.at': true,
      'info.at': true,
      'info.cx': true,
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
      'pixolino.com': true,
      'ipifony.net': true,
      '*.triton.zone': true,
      '*.cns.joyent.com': true,
      'js.org': true,
      'keymachine.de': true,
      'knightpoint.systems': true,
      'co.krd': true,
      'edu.krd': true,
      'git-repos.de': true,
      'lcube-server.de': true,
      'svn-repos.de': true,
      'linkyard.cloud': true,
      'linkyard-cloud.ch': true,
      'we.bs': true,
      'barsy.bg': true,
      'barsyonline.com': true,
      'barsy.de': true,
      'barsy.eu': true,
      'barsy.in': true,
      'barsy.net': true,
      'barsy.online': true,
      'barsy.support': true,
      '*.magentosite.cloud': true,
      'hb.cldmail.ru': true,
      'cloud.metacentrum.cz': true,
      'custom.metacentrum.cz': true,
      'meteorapp.com': true,
      'eu.meteorapp.com': true,
      'co.pl': true,
      'azurewebsites.net': true,
      'azure-mobile.net': true,
      'cloudapp.net': true,
      'mozilla-iot.org': true,
      'bmoattachments.org': true,
      'net.ru': true,
      'org.ru': true,
      'pp.ru': true,
      'bitballoon.com': true,
      'netlify.com': true,
      '4u.com': true,
      'ngrok.io': true,
      'nh-serv.co.uk': true,
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
      'stage.nodeart.io': true,
      'nodum.co': true,
      'nodum.io': true,
      'nyc.mn': true,
      'nom.ae': true,
      'nom.ai': true,
      'nom.al': true,
      'nym.by': true,
      'nym.bz': true,
      'nom.cl': true,
      'nom.gd': true,
      'nom.gl': true,
      'nym.gr': true,
      'nom.gt': true,
      'nom.hn': true,
      'nom.im': true,
      'nym.kz': true,
      'nym.la': true,
      'nom.li': true,
      'nym.li': true,
      'nym.lt': true,
      'nym.lu': true,
      'nym.me': true,
      'nom.mk': true,
      'nym.mx': true,
      'nom.nu': true,
      'nym.nz': true,
      'nym.pe': true,
      'nym.pt': true,
      'nom.pw': true,
      'nom.qa': true,
      'nom.rs': true,
      'nom.si': true,
      'nym.sk': true,
      'nym.su': true,
      'nym.sx': true,
      'nym.tw': true,
      'nom.ug': true,
      'nom.uy': true,
      'nom.vc': true,
      'nom.vg': true,
      'cya.gg': true,
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
      'on-web.fr': true,
      '*.platform.sh': true,
      '*.platformsh.site': true,
      'xen.prgmr.com': true,
      'priv.at': true,
      'protonet.io': true,
      'chirurgiens-dentistes-en-france.fr': true,
      'byen.site': true,
      'qa2.com': true,
      'dev-myqnapcloud.com': true,
      'alpha-myqnapcloud.com': true,
      'myqnapcloud.com': true,
      '*.quipelements.com': true,
      'vapor.cloud': true,
      'vaporcloud.io': true,
      'rackmaze.com': true,
      'rackmaze.net': true,
      'rhcloud.com': true,
      'resindevice.io': true,
      'devices.resinstaging.io': true,
      'hzc.io': true,
      'wellbeingzone.eu': true,
      'ptplus.fit': true,
      'wellbeingzone.co.uk': true,
      'sandcats.io': true,
      'logoip.de': true,
      'logoip.com': true,
      'schokokeks.net': true,
      'scrysec.com': true,
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
      '*.s5y.io': true,
      '*.sensiosite.cloud': true,
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
      'storj.farm': true,
      'temp-dns.com': true,
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
      'vpnplus.to': true,
      'taifun-dns.de': true,
      'gda.pl': true,
      'gdansk.pl': true,
      'gdynia.pl': true,
      'med.pl': true,
      'sopot.pl': true,
      'cust.dev.thingdust.io': true,
      'cust.disrec.thingdust.io': true,
      'cust.prod.thingdust.io': true,
      'cust.testing.thingdust.io': true,
      'bloxcms.com': true,
      'townnews-staging.com': true,
      '12hp.at': true,
      '2ix.at': true,
      '4lima.at': true,
      'lima-city.at': true,
      '12hp.ch': true,
      '2ix.ch': true,
      '4lima.ch': true,
      'lima-city.ch': true,
      'trafficplex.cloud': true,
      'de.cool': true,
      '12hp.de': true,
      '2ix.de': true,
      '4lima.de': true,
      'lima-city.de': true,
      '1337.pictures': true,
      'clan.rip': true,
      'lima-city.rocks': true,
      'webspace.rocks': true,
      'lima.zone': true,
      '*.transurl.be': true,
      '*.transurl.eu': true,
      '*.transurl.nl': true,
      'tuxfamily.org': true,
      'dd-dns.de': true,
      'diskstation.eu': true,
      'diskstation.org': true,
      'dray-dns.de': true,
      'draydns.de': true,
      'dyn-vpn.de': true,
      'dynvpn.de': true,
      'mein-vigor.de': true,
      'my-vigor.de': true,
      'my-wan.de': true,
      'syno-ds.de': true,
      'synology-diskstation.de': true,
      'synology-ds.de': true,
      'uber.space': true,
      'hk.com': true,
      'hk.org': true,
      'ltd.hk': true,
      'inc.hk': true,
      'lib.de.us': true,
      '2038.io': true,
      'router.management': true,
      'v-info.info': true,
      'wedeploy.io': true,
      'wedeploy.me': true,
      'wedeploy.sh': true,
      'remotewd.com': true,
      'wmflabs.org': true,
      'cistron.nl': true,
      'demon.nl': true,
      'xs4all.space': true,
      'official.academy': true,
      'yolasite.com': true,
      'ybo.faith': true,
      'yombo.me': true,
      'homelink.one': true,
      'ybo.party': true,
      'ybo.review': true,
      'ybo.science': true,
      'ybo.trade': true,
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

  var util$2 = (util$1 && util) || util$1;

  var Store$1 = store.Store;
  var permuteDomain$1 = permuteDomain_1.permuteDomain;
  var pathMatch$1 = pathMatch_1.pathMatch;

  function MemoryCookieStore() {
    Store$1.call(this);
    this.idx = {};
  }
  util$2.inherits(MemoryCookieStore, Store$1);
  var MemoryCookieStore_1 = MemoryCookieStore;
  MemoryCookieStore.prototype.idx = null;

  // Since it's just a struct in RAM, this Store is synchronous
  MemoryCookieStore.prototype.synchronous = true;

  // force a default depth:
  MemoryCookieStore.prototype.inspect = function() {
    return '{ idx: ' + util$2.inspect(this.idx, false, 2) + ' }';
  };

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

  var _args = [
    ['tough-cookie@2.3.4', '/var/www/gologic/Cognos11/Tools/jcognos']
  ];
  var _development = true;
  var _from = 'tough-cookie@2.3.4';
  var _id = 'tough-cookie@2.3.4';
  var _inBundle = false;
  var _integrity =
    'sha512-TZ6TTfI5NtZnuyy/Kecv+CnoROnyXn2DN97LontgQpCwsX2XyLYCC0ENhYkehSOwAp8rTQKc/NUIF7BkQ5rKLA==';
  var _location = '/tough-cookie';
  var _phantomChildren = {};
  var _requested = {
    type: 'version',
    registry: true,
    raw: 'tough-cookie@2.3.4',
    name: 'tough-cookie',
    escapedName: 'tough-cookie',
    rawSpec: '2.3.4',
    saveSpec: null,
    fetchSpec: '2.3.4'
  };
  var _requiredBy = ['/request'];
  var _resolved =
    'https://registry.npmjs.org/tough-cookie/-/tough-cookie-2.3.4.tgz';
  var _spec = '2.3.4';
  var _where = '/var/www/gologic/Cognos11/Tools/jcognos';
  var author = {
    name: 'Jeremy Stashewsky',
    email: 'jstashewsky@salesforce.com'
  };
  var bugs = { url: 'https://github.com/salesforce/tough-cookie/issues' };
  var contributors = [
    { name: 'Alexander Savin' },
    { name: 'Ian Livingstone' },
    { name: 'Ivan Nikulin' },
    { name: 'Lalit Kapoor' },
    { name: 'Sam Thompson' },
    { name: 'Sebastian Mayr' }
  ];
  var dependencies = { punycode: '^1.4.1' };
  var description = 'RFC6265 Cookies and Cookie Jar for node.js';
  var devDependencies = {
    async: '^1.4.2',
    'string.prototype.repeat': '^0.2.0',
    vows: '^0.8.1'
  };
  var engines = { node: '>=0.8' };
  var files = ['lib'];
  var homepage = 'https://github.com/salesforce/tough-cookie';
  var keywords = [
    'HTTP',
    'cookie',
    'cookies',
    'set-cookie',
    'cookiejar',
    'jar',
    'RFC6265',
    'RFC2965'
  ];
  var license = 'BSD-3-Clause';
  var main = './lib/cookie';
  var name = 'tough-cookie';
  var repository = {
    type: 'git',
    url: 'git://github.com/salesforce/tough-cookie.git'
  };
  var scripts = {
    suffixup:
      'curl -o public_suffix_list.dat https://publicsuffix.org/list/public_suffix_list.dat && ./generate-pubsuffix.js',
    test: 'vows test/*_test.js'
  };
  var version$2 = '2.3.4';
  var _package = {
    _args: _args,
    _development: _development,
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
    bugs: bugs,
    contributors: contributors,
    dependencies: dependencies,
    description: description,
    devDependencies: devDependencies,
    engines: engines,
    files: files,
    homepage: homepage,
    keywords: keywords,
    license: license,
    main: main,
    name: name,
    repository: repository,
    scripts: scripts,
    version: version$2
  };

  var _package$1 = /*#__PURE__*/ Object.freeze({
    _args: _args,
    _development: _development,
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
    bugs: bugs,
    contributors: contributors,
    dependencies: dependencies,
    description: description,
    devDependencies: devDependencies,
    engines: engines,
    files: files,
    homepage: homepage,
    keywords: keywords,
    license: license,
    main: main,
    name: name,
    repository: repository,
    scripts: scripts,
    version: version$2,
    default: _package
  });

  var net = (empty$1 && empty) || empty$1;

  var require$$0 = (url$1 && url) || url$1;

  var require$$4 = (_package$1 && _package) || _package$1;

  var urlParse$1 = require$$0.parse;

  var Store$2 = store.Store;
  var MemoryCookieStore$1 = memstore.MemoryCookieStore;
  var pathMatch$2 = pathMatch_1.pathMatch;
  var VERSION = require$$4.version;

  var punycode$3;
  try {
    punycode$3 = punycode$2;
  } catch (e) {
    console.warn(
      "cookie: can't load punycode; won't use punycode for domain normalization"
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
    if (punycode$3 && /[^\u0001-\u007f]/.test(str)) {
      str = punycode$3.toASCII(str);
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
      store$$1 = new MemoryCookieStore$1();
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
    Store: Store$2,
    MemoryCookieStore: MemoryCookieStore$1,
    parseDate: parseDate,
    formatDate: formatDate,
    parse: parse$2,
    fromJSON: fromJSON,
    domainMatch: domainMatch,
    defaultPath: defaultPath,
    pathMatch: pathMatch$2,
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
      this.namespace = '';
      this.namespaces = [];
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
          this.axios = axios$1.create({
            timeout: 60000,

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

                    goon = loggedout;
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
            .then(function(body) {
              me.log('Unexpected success');
              return me;
            })
            .catch(function(err) {
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
        value: function get$$1(path) {
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
            .catch(function(err) {
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
          var result = this.axios
            .delete(me.url + path, {
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
              var errormessage = '';
              me.error('CognosRequest : Error in delete', err);

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
        key: 'put',
        value: function put(path, filename) {
          var me = this;
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
          headers['Content-Type'] = 'application/zip';

          var fs = require('fs');
          var url = me.url + path;
          me.log('About to upload extension');
          me.log('File: ' + filename);
          me.log('To:', url);
          var result = false;
          var fs = require('fs');

          var stream = fs.createReadStream(filename);
          stream.on('error', console.log);

          var result = me
            .axios({
              method: 'PUT',
              url: url,
              headers: headers,
              jar: me.cookies,
              withCredentials: true,
              data: stream
            })
            .then(function(response) {
              me.log('CognosRequest : Success Putting ');
              return response.data;
            })
            .catch(function(err) {
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
      }
    ]);
    return CognosRequest;
  })();

  function getCognosRequest(url, debug) {
    var reset =
      arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (reset) {
      cRequest = undefined;
    }
    var result;
    if (typeof cRequest == 'undefined' || reset) {
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
  var path = {
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

  var path$1 = /*#__PURE__*/ Object.freeze({
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
    default: path
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

  var require$$0$1 = (path$1 && path) || path$1;

  var minimatch_1 = minimatch;
  minimatch.Minimatch = Minimatch;

  var path$2 = { sep: '/' };
  try {
    path$2 = require$$0$1;
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
    if (path$2.sep !== '/') {
      pattern = pattern.split(path$2.sep).join('/');
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
    if (path$2.sep !== '/') {
      f = f.split(path$2.sep).join('/');
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
    function Cognos(debug) {
      classCallCheck(this, Cognos);

      this.loggedin = false;
      this.url = '';
      this.debug = debug;
      this.username = '';
      this.password = '';

      this.defaultNamespace = '';
      this.namespace = '';

      this.namespaces = '';
      this.retrycount = 0;
      this.loginrequest = false;
      this.resetting = false;
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
            return me.loginrequest;
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
            .then(function(body) {
              me.loggedin = true;
              me.username = user;
              me.password = password;
              me.namespace = namespace;
              me.loginrequest = false;
              me.log('Successfully logged in');
              return body;
            })
            .catch(function(err) {
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
        key: 'handleError',
        value: function handleError(err) {
          var me = this;
          var errormessage = '';

          if (err.response.status == 441 || err.response.status == 403) {
            me.log('going to reset');
            var result = me.reset();
            me.log('in handleError, returning promise', result);
            return result;
          }

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

          this.resetting = getCognosRequest(this.url, this.debug, true)
            .then(function(cRequest) {
              me.requester = cRequest;
              me.log('going to login again');
              var result = me.login(me.username, me.password, me.namespace);
              me.log('login promise', result);
              return result;
            })
            .then(function() {
              me.log('Done logging in');
              return Promise.resolve();
            })
            .catch(function(err) {
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
        key: 'listRootFolder',
        value: function listRootFolder() {
          var me = this;
          var rootfolders = [];

          var result = me.requester
            .get('bi/v1/objects/.my_folders?fields=permissions')
            .then(function(folders) {
              me.log('Got the Private Folders');
              if (typeof folders !== 'undefined') {
                rootfolders.push({
                  id: folders.data[0].id,
                  name: 'My Content'
                });
              }
            })
            .then(function() {
              return me.requester
                .get('bi/v1/objects/.public_folders?fields=permissions')
                .then(function(folders) {
                  me.log('Got the Public Folders');
                  if (typeof folders !== 'undefined') {
                    rootfolders.push({
                      id: folders.data[0].id,
                      name: 'Team Content'
                    });
                  }
                  return rootfolders;
                });
            })
            .catch(function(err) {
              me.error('CognosRequest : Error in listRootFolder', err);

              me.handleError(err)
                .then(function() {
                  me.log('We have been reset, list the root folder again');
                  me.resetting = false;
                  return me.listRootFolder();
                })
                .catch(function(rejecterr) {
                  throw err;
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
              if (typeof folders !== 'undefined') {
                return me.listFolderById(folders.data[0].id);
              }
              return {};
            })
            .catch(function(err) {
              me.error('CognosRequest : Error in listPublicFolders', err);

              me.handleError(err)
                .then(function() {
                  me.log('We have been reset, list the public folders again');
                  me.resetting = false;
                  return me.listPublicFolders();
                })
                .catch(function(rejecterr) {
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
            .catch(function(err) {
              me.error('CognosRequest : Error in listFolderById', err);

              return me
                .handleError(err)
                .then(function() {
                  me.log('We have been reset, list the folder by id again');
                  me.resetting = false;
                  return me.listFolderById(id, pattern, types);
                })
                .catch(function(rejecterr) {
                  throw err;
                });
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
            .catch(function(err) {
              me.error('CognosRequest : Error in addFolder', err);

              return me
                .handleError(err)
                .then(function() {
                  me.log('We have been reset, lets add the folder again');
                  me.resetting = false;
                  return me.addFolder(parentid, name);
                })
                .catch(function(rejecterr) {
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

          var result = me.requester
            .delete('bi/v1/objects/' + id, params, true)
            .then(function(response) {
              me.log('deleted folder');
              return true;
            })
            .catch(function(err) {
              me.error('CognosRequest : Error in deleteFolder', err);

              return me
                .handleError(err)
                .then(function() {
                  me.log('We have been reset, delete the folder again');
                  me.resetting = false;
                  return me.deleteFolder(id, force, recursive);
                })
                .catch(function(rejecterr) {
                  throw err;
                });
            });
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

          var promptString = '&';
          var keys = Object.keys(prompts);
          keys.forEach(function(key) {
            promptString += 'p_' + key + '=' + prompts[key];
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
            .catch(function(err) {
              me.error('CognosRequest : Error in getReportData', err);

              return me
                .handleError(err)
                .then(function() {
                  me.log('We have been reset, get Report Data again');
                  me.resetting = false;
                  return me.getReportData(id, prompts, limit);
                })
                .catch(function(rejecterr) {
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

          var me = this;
          var path = 'bi/v1/plugins/' + type + '/' + name;

          var result = this.requester
            .put(path, filename)
            .then(function(response) {
              me.log('New extension id =' + response.id);
            })
            .catch(function(err) {
              me.error('CognosRequest : Error in uploadExtension', err);
              throw err;
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

    var reset = false;
    if (url && url !== cognosUrl) {
      jCognos = undefined;
      reset = true;
    }
    if (typeof jCognos == 'undefined' && url) {
      var myRequest = getCognosRequest(url, debug, reset)
        .then(function(cRequest) {
          jCognos = new Cognos(debug);
          jCognos.requester = cRequest;
          jCognos.url = url;
          jCognos.defaultNamespace = cRequest.namespace;
          jCognos.namespaces = cRequest.namespaces;
          return jCognos;
        })
        .catch(function(err) {
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
