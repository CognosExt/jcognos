!(function(e, a) {
  'object' == typeof exports && 'undefined' != typeof module
    ? a(exports)
    : 'function' == typeof define && define.amd
    ? define(['exports'], a)
    : a(((e = e || self).jcognos = {}));
})(this, function(exports) {
  'use strict';
  function _typeof(e) {
    return (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function(e) {
            return typeof e;
          }
        : function(e) {
            return e &&
              'function' == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? 'symbol'
              : typeof e;
          })(e);
  }
  function _classCallCheck(e, a) {
    if (!(e instanceof a))
      throw new TypeError('Cannot call a class as a function');
  }
  function _defineProperties(e, a) {
    for (var o = 0; o < a.length; o++) {
      var t = a[o];
      (t.enumerable = t.enumerable || !1),
        (t.configurable = !0),
        'value' in t && (t.writable = !0),
        Object.defineProperty(e, t.key, t);
    }
  }
  function _createClass(e, a, o) {
    return (
      a && _defineProperties(e.prototype, a), o && _defineProperties(e, o), e
    );
  }
  function _defineProperty(e, a, o) {
    return (
      a in e
        ? Object.defineProperty(e, a, {
            value: o,
            enumerable: !0,
            configurable: !0,
            writable: !0
          })
        : (e[a] = o),
      e
    );
  }
  var bind = function(e, a) {
      return function() {
        for (var o = new Array(arguments.length), t = 0; t < o.length; t++)
          o[t] = arguments[t];
        return e.apply(a, o);
      };
    },
    isBuffer = function(e) {
      return (
        null != e &&
        null != e.constructor &&
        'function' == typeof e.constructor.isBuffer &&
        e.constructor.isBuffer(e)
      );
    },
    toString = Object.prototype.toString;
  function isArray(e) {
    return '[object Array]' === toString.call(e);
  }
  function isArrayBuffer(e) {
    return '[object ArrayBuffer]' === toString.call(e);
  }
  function isFormData(e) {
    return 'undefined' != typeof FormData && e instanceof FormData;
  }
  function isArrayBufferView(e) {
    return 'undefined' != typeof ArrayBuffer && ArrayBuffer.isView
      ? ArrayBuffer.isView(e)
      : e && e.buffer && e.buffer instanceof ArrayBuffer;
  }
  function isString(e) {
    return 'string' == typeof e;
  }
  function isNumber(e) {
    return 'number' == typeof e;
  }
  function isUndefined(e) {
    return void 0 === e;
  }
  function isObject(e) {
    return null !== e && 'object' == typeof e;
  }
  function isDate(e) {
    return '[object Date]' === toString.call(e);
  }
  function isFile(e) {
    return '[object File]' === toString.call(e);
  }
  function isBlob(e) {
    return '[object Blob]' === toString.call(e);
  }
  function isFunction(e) {
    return '[object Function]' === toString.call(e);
  }
  function isStream(e) {
    return isObject(e) && isFunction(e.pipe);
  }
  function isURLSearchParams(e) {
    return (
      'undefined' != typeof URLSearchParams && e instanceof URLSearchParams
    );
  }
  function trim(e) {
    return e.replace(/^\s*/, '').replace(/\s*$/, '');
  }
  function isStandardBrowserEnv() {
    return (
      ('undefined' == typeof navigator ||
        ('ReactNative' !== navigator.product &&
          'NativeScript' !== navigator.product &&
          'NS' !== navigator.product)) &&
      ('undefined' != typeof window && 'undefined' != typeof document)
    );
  }
  function forEach(e, a) {
    if (null != e)
      if (('object' != typeof e && (e = [e]), isArray(e)))
        for (var o = 0, t = e.length; o < t; o++) a.call(null, e[o], o, e);
      else
        for (var i in e)
          Object.prototype.hasOwnProperty.call(e, i) &&
            a.call(null, e[i], i, e);
  }
  function merge() {
    var e = {};
    function a(a, o) {
      'object' == typeof e[o] && 'object' == typeof a
        ? (e[o] = merge(e[o], a))
        : (e[o] = a);
    }
    for (var o = 0, t = arguments.length; o < t; o++) forEach(arguments[o], a);
    return e;
  }
  function deepMerge() {
    var e = {};
    function a(a, o) {
      'object' == typeof e[o] && 'object' == typeof a
        ? (e[o] = deepMerge(e[o], a))
        : (e[o] = 'object' == typeof a ? deepMerge({}, a) : a);
    }
    for (var o = 0, t = arguments.length; o < t; o++) forEach(arguments[o], a);
    return e;
  }
  function extend(e, a, o) {
    return (
      forEach(a, function(a, t) {
        e[t] = o && 'function' == typeof a ? bind(a, o) : a;
      }),
      e
    );
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
    deepMerge: deepMerge,
    extend: extend,
    trim: trim
  };
  function encode(e) {
    return encodeURIComponent(e)
      .replace(/%40/gi, '@')
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      .replace(/%20/g, '+')
      .replace(/%5B/gi, '[')
      .replace(/%5D/gi, ']');
  }
  var buildURL = function(e, a, o) {
    if (!a) return e;
    var t;
    if (o) t = o(a);
    else if (utils.isURLSearchParams(a)) t = a.toString();
    else {
      var i = [];
      utils.forEach(a, function(e, a) {
        null != e &&
          (utils.isArray(e) ? (a += '[]') : (e = [e]),
          utils.forEach(e, function(e) {
            utils.isDate(e)
              ? (e = e.toISOString())
              : utils.isObject(e) && (e = JSON.stringify(e)),
              i.push(encode(a) + '=' + encode(e));
          }));
      }),
        (t = i.join('&'));
    }
    if (t) {
      var n = e.indexOf('#');
      -1 !== n && (e = e.slice(0, n)),
        (e += (-1 === e.indexOf('?') ? '?' : '&') + t);
    }
    return e;
  };
  function InterceptorManager() {
    this.handlers = [];
  }
  (InterceptorManager.prototype.use = function(e, a) {
    return (
      this.handlers.push({ fulfilled: e, rejected: a }),
      this.handlers.length - 1
    );
  }),
    (InterceptorManager.prototype.eject = function(e) {
      this.handlers[e] && (this.handlers[e] = null);
    }),
    (InterceptorManager.prototype.forEach = function(e) {
      utils.forEach(this.handlers, function(a) {
        null !== a && e(a);
      });
    });
  var InterceptorManager_1 = InterceptorManager,
    transformData = function(e, a, o) {
      return (
        utils.forEach(o, function(o) {
          e = o(e, a);
        }),
        e
      );
    },
    isCancel = function(e) {
      return !(!e || !e.__CANCEL__);
    },
    global$1 =
      'undefined' != typeof global
        ? global
        : 'undefined' != typeof self
        ? self
        : 'undefined' != typeof window
        ? window
        : {};
  function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
  }
  function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
  }
  var cachedSetTimeout = defaultSetTimout,
    cachedClearTimeout = defaultClearTimeout;
  function runTimeout(e) {
    if (cachedSetTimeout === setTimeout) return setTimeout(e, 0);
    if (
      (cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) &&
      setTimeout
    )
      return (cachedSetTimeout = setTimeout), setTimeout(e, 0);
    try {
      return cachedSetTimeout(e, 0);
    } catch (a) {
      try {
        return cachedSetTimeout.call(null, e, 0);
      } catch (a) {
        return cachedSetTimeout.call(this, e, 0);
      }
    }
  }
  function runClearTimeout(e) {
    if (cachedClearTimeout === clearTimeout) return clearTimeout(e);
    if (
      (cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) &&
      clearTimeout
    )
      return (cachedClearTimeout = clearTimeout), clearTimeout(e);
    try {
      return cachedClearTimeout(e);
    } catch (a) {
      try {
        return cachedClearTimeout.call(null, e);
      } catch (a) {
        return cachedClearTimeout.call(this, e);
      }
    }
  }
  'function' == typeof global$1.setTimeout && (cachedSetTimeout = setTimeout),
    'function' == typeof global$1.clearTimeout &&
      (cachedClearTimeout = clearTimeout);
  var queue = [],
    draining = !1,
    currentQueue,
    queueIndex = -1;
  function cleanUpNextTick() {
    draining &&
      currentQueue &&
      ((draining = !1),
      currentQueue.length
        ? (queue = currentQueue.concat(queue))
        : (queueIndex = -1),
      queue.length && drainQueue());
  }
  function drainQueue() {
    if (!draining) {
      var e = runTimeout(cleanUpNextTick);
      draining = !0;
      for (var a = queue.length; a; ) {
        for (currentQueue = queue, queue = []; ++queueIndex < a; )
          currentQueue && currentQueue[queueIndex].run();
        (queueIndex = -1), (a = queue.length);
      }
      (currentQueue = null), (draining = !1), runClearTimeout(e);
    }
  }
  function nextTick(e) {
    var a = new Array(arguments.length - 1);
    if (arguments.length > 1)
      for (var o = 1; o < arguments.length; o++) a[o - 1] = arguments[o];
    queue.push(new Item(e, a)),
      1 !== queue.length || draining || runTimeout(drainQueue);
  }
  function Item(e, a) {
    (this.fun = e), (this.array = a);
  }
  Item.prototype.run = function() {
    this.fun.apply(null, this.array);
  };
  var title = 'browser',
    platform = 'browser',
    browser = !0,
    env = {},
    argv = [],
    version = '',
    versions = {},
    release = {},
    config = {};
  function noop() {}
  var on = noop,
    addListener = noop,
    once = noop,
    off = noop,
    removeListener = noop,
    removeAllListeners = noop,
    emit = noop;
  function binding(e) {
    throw new Error('process.binding is not supported');
  }
  function cwd() {
    return '/';
  }
  function chdir(e) {
    throw new Error('process.chdir is not supported');
  }
  function umask() {
    return 0;
  }
  var performance = global$1.performance || {},
    performanceNow =
      performance.now ||
      performance.mozNow ||
      performance.msNow ||
      performance.oNow ||
      performance.webkitNow ||
      function() {
        return new Date().getTime();
      };
  function hrtime(e) {
    var a = 0.001 * performanceNow.call(performance),
      o = Math.floor(a),
      t = Math.floor((a % 1) * 1e9);
    return e && ((o -= e[0]), (t -= e[1]) < 0 && (o--, (t += 1e9))), [o, t];
  }
  var startTime = new Date();
  function uptime() {
    return (new Date() - startTime) / 1e3;
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
    },
    normalizeHeaderName = function(e, a) {
      utils.forEach(e, function(o, t) {
        t !== a &&
          t.toUpperCase() === a.toUpperCase() &&
          ((e[a] = o), delete e[t]);
      });
    },
    enhanceError = function(e, a, o, t, i) {
      return (
        (e.config = a),
        o && (e.code = o),
        (e.request = t),
        (e.response = i),
        (e.isAxiosError = !0),
        (e.toJSON = function() {
          return {
            message: this.message,
            name: this.name,
            description: this.description,
            number: this.number,
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            config: this.config,
            code: this.code
          };
        }),
        e
      );
    },
    createError = function(e, a, o, t, i) {
      var n = new Error(e);
      return enhanceError(n, a, o, t, i);
    },
    settle = function(e, a, o) {
      var t = o.config.validateStatus;
      !t || t(o.status)
        ? e(o)
        : a(
            createError(
              'Request failed with status code ' + o.status,
              o.config,
              null,
              o.request,
              o
            )
          );
    },
    ignoreDuplicateOf = [
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
    ],
    parseHeaders = function(e) {
      var a,
        o,
        t,
        i = {};
      return e
        ? (utils.forEach(e.split('\n'), function(e) {
            if (
              ((t = e.indexOf(':')),
              (a = utils.trim(e.substr(0, t)).toLowerCase()),
              (o = utils.trim(e.substr(t + 1))),
              a)
            ) {
              if (i[a] && ignoreDuplicateOf.indexOf(a) >= 0) return;
              i[a] =
                'set-cookie' === a
                  ? (i[a] ? i[a] : []).concat([o])
                  : i[a]
                  ? i[a] + ', ' + o
                  : o;
            }
          }),
          i)
        : i;
    },
    isURLSameOrigin = utils.isStandardBrowserEnv()
      ? (function() {
          var e,
            a = /(msie|trident)/i.test(navigator.userAgent),
            o = document.createElement('a');
          function t(e) {
            var t = e;
            return (
              a && (o.setAttribute('href', t), (t = o.href)),
              o.setAttribute('href', t),
              {
                href: o.href,
                protocol: o.protocol ? o.protocol.replace(/:$/, '') : '',
                host: o.host,
                search: o.search ? o.search.replace(/^\?/, '') : '',
                hash: o.hash ? o.hash.replace(/^#/, '') : '',
                hostname: o.hostname,
                port: o.port,
                pathname:
                  '/' === o.pathname.charAt(0) ? o.pathname : '/' + o.pathname
              }
            );
          }
          return (
            (e = t(window.location.href)),
            function(a) {
              var o = utils.isString(a) ? t(a) : a;
              return o.protocol === e.protocol && o.host === e.host;
            }
          );
        })()
      : function() {
          return !0;
        },
    cookies = utils.isStandardBrowserEnv()
      ? {
          write: function(e, a, o, t, i, n) {
            var r = [];
            r.push(e + '=' + encodeURIComponent(a)),
              utils.isNumber(o) &&
                r.push('expires=' + new Date(o).toGMTString()),
              utils.isString(t) && r.push('path=' + t),
              utils.isString(i) && r.push('domain=' + i),
              !0 === n && r.push('secure'),
              (document.cookie = r.join('; '));
          },
          read: function(e) {
            var a = document.cookie.match(
              new RegExp('(^|;\\s*)(' + e + ')=([^;]*)')
            );
            return a ? decodeURIComponent(a[3]) : null;
          },
          remove: function(e) {
            this.write(e, '', Date.now() - 864e5);
          }
        }
      : {
          write: function() {},
          read: function() {
            return null;
          },
          remove: function() {}
        },
    xhr = function(e) {
      return new Promise(function(a, o) {
        var t = e.data,
          i = e.headers;
        utils.isFormData(t) && delete i['Content-Type'];
        var n = new XMLHttpRequest();
        if (e.auth) {
          var r = e.auth.username || '',
            s = e.auth.password || '';
          i.Authorization = 'Basic ' + btoa(r + ':' + s);
        }
        if (
          (n.open(
            e.method.toUpperCase(),
            buildURL(e.url, e.params, e.paramsSerializer),
            !0
          ),
          (n.timeout = e.timeout),
          (n.onreadystatechange = function() {
            if (
              n &&
              4 === n.readyState &&
              (0 !== n.status ||
                (n.responseURL && 0 === n.responseURL.indexOf('file:')))
            ) {
              var t =
                  'getAllResponseHeaders' in n
                    ? parseHeaders(n.getAllResponseHeaders())
                    : null,
                i = {
                  data:
                    e.responseType && 'text' !== e.responseType
                      ? n.response
                      : n.responseText,
                  status: n.status,
                  statusText: n.statusText,
                  headers: t,
                  config: e,
                  request: n
                };
              settle(a, o, i), (n = null);
            }
          }),
          (n.onabort = function() {
            n &&
              (o(createError('Request aborted', e, 'ECONNABORTED', n)),
              (n = null));
          }),
          (n.onerror = function() {
            o(createError('Network Error', e, null, n)), (n = null);
          }),
          (n.ontimeout = function() {
            o(
              createError(
                'timeout of ' + e.timeout + 'ms exceeded',
                e,
                'ECONNABORTED',
                n
              )
            ),
              (n = null);
          }),
          utils.isStandardBrowserEnv())
        ) {
          var u = cookies,
            m =
              (e.withCredentials || isURLSameOrigin(e.url)) && e.xsrfCookieName
                ? u.read(e.xsrfCookieName)
                : void 0;
          m && (i[e.xsrfHeaderName] = m);
        }
        if (
          ('setRequestHeader' in n &&
            utils.forEach(i, function(e, a) {
              void 0 === t && 'content-type' === a.toLowerCase()
                ? delete i[a]
                : n.setRequestHeader(a, e);
            }),
          e.withCredentials && (n.withCredentials = !0),
          e.responseType)
        )
          try {
            n.responseType = e.responseType;
          } catch (a) {
            if ('json' !== e.responseType) throw a;
          }
        'function' == typeof e.onDownloadProgress &&
          n.addEventListener('progress', e.onDownloadProgress),
          'function' == typeof e.onUploadProgress &&
            n.upload &&
            n.upload.addEventListener('progress', e.onUploadProgress),
          e.cancelToken &&
            e.cancelToken.promise.then(function(e) {
              n && (n.abort(), o(e), (n = null));
            }),
          void 0 === t && (t = null),
          n.send(t);
      });
    },
    DEFAULT_CONTENT_TYPE = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
  function setContentTypeIfUnset(e, a) {
    !utils.isUndefined(e) &&
      utils.isUndefined(e['Content-Type']) &&
      (e['Content-Type'] = a);
  }
  function getDefaultAdapter() {
    var e;
    return (
      void 0 !== process &&
      '[object process]' === Object.prototype.toString.call(process)
        ? (e = xhr)
        : 'undefined' != typeof XMLHttpRequest && (e = xhr),
      e
    );
  }
  var defaults = {
    adapter: getDefaultAdapter(),
    transformRequest: [
      function(e, a) {
        return (
          normalizeHeaderName(a, 'Accept'),
          normalizeHeaderName(a, 'Content-Type'),
          utils.isFormData(e) ||
          utils.isArrayBuffer(e) ||
          utils.isBuffer(e) ||
          utils.isStream(e) ||
          utils.isFile(e) ||
          utils.isBlob(e)
            ? e
            : utils.isArrayBufferView(e)
            ? e.buffer
            : utils.isURLSearchParams(e)
            ? (setContentTypeIfUnset(
                a,
                'application/x-www-form-urlencoded;charset=utf-8'
              ),
              e.toString())
            : utils.isObject(e)
            ? (setContentTypeIfUnset(a, 'application/json;charset=utf-8'),
              JSON.stringify(e))
            : e
        );
      }
    ],
    transformResponse: [
      function(e) {
        if ('string' == typeof e)
          try {
            e = JSON.parse(e);
          } catch (e) {}
        return e;
      }
    ],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    validateStatus: function(e) {
      return e >= 200 && e < 300;
    },
    headers: { common: { Accept: 'application/json, text/plain, */*' } }
  };
  utils.forEach(['delete', 'get', 'head'], function(e) {
    defaults.headers[e] = {};
  }),
    utils.forEach(['post', 'put', 'patch'], function(e) {
      defaults.headers[e] = utils.merge(DEFAULT_CONTENT_TYPE);
    });
  var defaults_1 = defaults,
    isAbsoluteURL = function(e) {
      return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e);
    },
    combineURLs = function(e, a) {
      return a ? e.replace(/\/+$/, '') + '/' + a.replace(/^\/+/, '') : e;
    };
  function throwIfCancellationRequested(e) {
    e.cancelToken && e.cancelToken.throwIfRequested();
  }
  var dispatchRequest = function(e) {
      return (
        throwIfCancellationRequested(e),
        e.baseURL &&
          !isAbsoluteURL(e.url) &&
          (e.url = combineURLs(e.baseURL, e.url)),
        (e.headers = e.headers || {}),
        (e.data = transformData(e.data, e.headers, e.transformRequest)),
        (e.headers = utils.merge(
          e.headers.common || {},
          e.headers[e.method] || {},
          e.headers || {}
        )),
        utils.forEach(
          ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
          function(a) {
            delete e.headers[a];
          }
        ),
        (e.adapter || defaults_1.adapter)(e).then(
          function(a) {
            return (
              throwIfCancellationRequested(e),
              (a.data = transformData(a.data, a.headers, e.transformResponse)),
              a
            );
          },
          function(a) {
            return (
              isCancel(a) ||
                (throwIfCancellationRequested(e),
                a &&
                  a.response &&
                  (a.response.data = transformData(
                    a.response.data,
                    a.response.headers,
                    e.transformResponse
                  ))),
              Promise.reject(a)
            );
          }
        )
      );
    },
    mergeConfig = function(e, a) {
      a = a || {};
      var o = {};
      return (
        utils.forEach(['url', 'method', 'params', 'data'], function(e) {
          void 0 !== a[e] && (o[e] = a[e]);
        }),
        utils.forEach(['headers', 'auth', 'proxy'], function(t) {
          utils.isObject(a[t])
            ? (o[t] = utils.deepMerge(e[t], a[t]))
            : void 0 !== a[t]
            ? (o[t] = a[t])
            : utils.isObject(e[t])
            ? (o[t] = utils.deepMerge(e[t]))
            : void 0 !== e[t] && (o[t] = e[t]);
        }),
        utils.forEach(
          [
            'baseURL',
            'transformRequest',
            'transformResponse',
            'paramsSerializer',
            'timeout',
            'withCredentials',
            'adapter',
            'responseType',
            'xsrfCookieName',
            'xsrfHeaderName',
            'onUploadProgress',
            'onDownloadProgress',
            'maxContentLength',
            'validateStatus',
            'maxRedirects',
            'httpAgent',
            'httpsAgent',
            'cancelToken',
            'socketPath'
          ],
          function(t) {
            void 0 !== a[t] ? (o[t] = a[t]) : void 0 !== e[t] && (o[t] = e[t]);
          }
        ),
        o
      );
    };
  function Axios(e) {
    (this.defaults = e),
      (this.interceptors = {
        request: new InterceptorManager_1(),
        response: new InterceptorManager_1()
      });
  }
  (Axios.prototype.request = function(e) {
    'string' == typeof e
      ? ((e = arguments[1] || {}).url = arguments[0])
      : (e = e || {}),
      ((e = mergeConfig(this.defaults, e)).method = e.method
        ? e.method.toLowerCase()
        : 'get');
    var a = [dispatchRequest, void 0],
      o = Promise.resolve(e);
    for (
      this.interceptors.request.forEach(function(e) {
        a.unshift(e.fulfilled, e.rejected);
      }),
        this.interceptors.response.forEach(function(e) {
          a.push(e.fulfilled, e.rejected);
        });
      a.length;

    )
      o = o.then(a.shift(), a.shift());
    return o;
  }),
    (Axios.prototype.getUri = function(e) {
      return (
        (e = mergeConfig(this.defaults, e)),
        buildURL(e.url, e.params, e.paramsSerializer).replace(/^\?/, '')
      );
    }),
    utils.forEach(['delete', 'get', 'head', 'options'], function(e) {
      Axios.prototype[e] = function(a, o) {
        return this.request(utils.merge(o || {}, { method: e, url: a }));
      };
    }),
    utils.forEach(['post', 'put', 'patch'], function(e) {
      Axios.prototype[e] = function(a, o, t) {
        return this.request(
          utils.merge(t || {}, { method: e, url: a, data: o })
        );
      };
    });
  var Axios_1 = Axios;
  function Cancel(e) {
    this.message = e;
  }
  (Cancel.prototype.toString = function() {
    return 'Cancel' + (this.message ? ': ' + this.message : '');
  }),
    (Cancel.prototype.__CANCEL__ = !0);
  var Cancel_1 = Cancel;
  function CancelToken(e) {
    if ('function' != typeof e)
      throw new TypeError('executor must be a function.');
    var a;
    this.promise = new Promise(function(e) {
      a = e;
    });
    var o = this;
    e(function(e) {
      o.reason || ((o.reason = new Cancel_1(e)), a(o.reason));
    });
  }
  (CancelToken.prototype.throwIfRequested = function() {
    if (this.reason) throw this.reason;
  }),
    (CancelToken.source = function() {
      var e;
      return {
        token: new CancelToken(function(a) {
          e = a;
        }),
        cancel: e
      };
    });
  var CancelToken_1 = CancelToken,
    spread = function(e) {
      return function(a) {
        return e.apply(null, a);
      };
    };
  function createInstance(e) {
    var a = new Axios_1(e),
      o = bind(Axios_1.prototype.request, a);
    return utils.extend(o, Axios_1.prototype, a), utils.extend(o, a), o;
  }
  var axios = createInstance(defaults_1);
  (axios.Axios = Axios_1),
    (axios.create = function(e) {
      return createInstance(mergeConfig(axios.defaults, e));
    }),
    (axios.Cancel = Cancel_1),
    (axios.CancelToken = CancelToken_1),
    (axios.isCancel = isCancel),
    (axios.all = function(e) {
      return Promise.all(e);
    }),
    (axios.spread = spread);
  var axios_1 = axios,
    default_1 = axios;
  axios_1.default = default_1;
  var axios$1 = axios_1,
    lookup = [],
    revLookup = [],
    Arr = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
    inited = !1;
  function init() {
    inited = !0;
    for (
      var e =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
        a = 0,
        o = e.length;
      a < o;
      ++a
    )
      (lookup[a] = e[a]), (revLookup[e.charCodeAt(a)] = a);
    (revLookup['-'.charCodeAt(0)] = 62), (revLookup['_'.charCodeAt(0)] = 63);
  }
  function toByteArray(e) {
    var a, o, t, i, n, r;
    inited || init();
    var s = e.length;
    if (s % 4 > 0)
      throw new Error('Invalid string. Length must be a multiple of 4');
    (n = '=' === e[s - 2] ? 2 : '=' === e[s - 1] ? 1 : 0),
      (r = new Arr((3 * s) / 4 - n)),
      (t = n > 0 ? s - 4 : s);
    var u = 0;
    for (a = 0, o = 0; a < t; a += 4, o += 3)
      (i =
        (revLookup[e.charCodeAt(a)] << 18) |
        (revLookup[e.charCodeAt(a + 1)] << 12) |
        (revLookup[e.charCodeAt(a + 2)] << 6) |
        revLookup[e.charCodeAt(a + 3)]),
        (r[u++] = (i >> 16) & 255),
        (r[u++] = (i >> 8) & 255),
        (r[u++] = 255 & i);
    return (
      2 === n
        ? ((i =
            (revLookup[e.charCodeAt(a)] << 2) |
            (revLookup[e.charCodeAt(a + 1)] >> 4)),
          (r[u++] = 255 & i))
        : 1 === n &&
          ((i =
            (revLookup[e.charCodeAt(a)] << 10) |
            (revLookup[e.charCodeAt(a + 1)] << 4) |
            (revLookup[e.charCodeAt(a + 2)] >> 2)),
          (r[u++] = (i >> 8) & 255),
          (r[u++] = 255 & i)),
      r
    );
  }
  function tripletToBase64(e) {
    return (
      lookup[(e >> 18) & 63] +
      lookup[(e >> 12) & 63] +
      lookup[(e >> 6) & 63] +
      lookup[63 & e]
    );
  }
  function encodeChunk(e, a, o) {
    for (var t, i = [], n = a; n < o; n += 3)
      (t = (e[n] << 16) + (e[n + 1] << 8) + e[n + 2]),
        i.push(tripletToBase64(t));
    return i.join('');
  }
  function fromByteArray(e) {
    var a;
    inited || init();
    for (
      var o = e.length, t = o % 3, i = '', n = [], r = 0, s = o - t;
      r < s;
      r += 16383
    )
      n.push(encodeChunk(e, r, r + 16383 > s ? s : r + 16383));
    return (
      1 === t
        ? ((a = e[o - 1]),
          (i += lookup[a >> 2]),
          (i += lookup[(a << 4) & 63]),
          (i += '=='))
        : 2 === t &&
          ((a = (e[o - 2] << 8) + e[o - 1]),
          (i += lookup[a >> 10]),
          (i += lookup[(a >> 4) & 63]),
          (i += lookup[(a << 2) & 63]),
          (i += '=')),
      n.push(i),
      n.join('')
    );
  }
  function read(e, a, o, t, i) {
    var n,
      r,
      s = 8 * i - t - 1,
      u = (1 << s) - 1,
      m = u >> 1,
      c = -7,
      l = o ? i - 1 : 0,
      p = o ? -1 : 1,
      h = e[a + l];
    for (
      l += p, n = h & ((1 << -c) - 1), h >>= -c, c += s;
      c > 0;
      n = 256 * n + e[a + l], l += p, c -= 8
    );
    for (
      r = n & ((1 << -c) - 1), n >>= -c, c += t;
      c > 0;
      r = 256 * r + e[a + l], l += p, c -= 8
    );
    if (0 === n) n = 1 - m;
    else {
      if (n === u) return r ? NaN : (1 / 0) * (h ? -1 : 1);
      (r += Math.pow(2, t)), (n -= m);
    }
    return (h ? -1 : 1) * r * Math.pow(2, n - t);
  }
  function write(e, a, o, t, i, n) {
    var r,
      s,
      u,
      m = 8 * n - i - 1,
      c = (1 << m) - 1,
      l = c >> 1,
      p = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
      h = t ? 0 : n - 1,
      f = t ? 1 : -1,
      g = a < 0 || (0 === a && 1 / a < 0) ? 1 : 0;
    for (
      a = Math.abs(a),
        isNaN(a) || a === 1 / 0
          ? ((s = isNaN(a) ? 1 : 0), (r = c))
          : ((r = Math.floor(Math.log(a) / Math.LN2)),
            a * (u = Math.pow(2, -r)) < 1 && (r--, (u *= 2)),
            (a += r + l >= 1 ? p / u : p * Math.pow(2, 1 - l)) * u >= 2 &&
              (r++, (u /= 2)),
            r + l >= c
              ? ((s = 0), (r = c))
              : r + l >= 1
              ? ((s = (a * u - 1) * Math.pow(2, i)), (r += l))
              : ((s = a * Math.pow(2, l - 1) * Math.pow(2, i)), (r = 0)));
      i >= 8;
      e[o + h] = 255 & s, h += f, s /= 256, i -= 8
    );
    for (
      r = (r << i) | s, m += i;
      m > 0;
      e[o + h] = 255 & r, h += f, r /= 256, m -= 8
    );
    e[o + h - f] |= 128 * g;
  }
  var toString$1 = {}.toString,
    isArray$1 =
      Array.isArray ||
      function(e) {
        return '[object Array]' == toString$1.call(e);
      },
    INSPECT_MAX_BYTES = 50;
  function kMaxLength() {
    return Buffer.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
  }
  function createBuffer(e, a) {
    if (kMaxLength() < a) throw new RangeError('Invalid typed array length');
    return (
      Buffer.TYPED_ARRAY_SUPPORT
        ? ((e = new Uint8Array(a)).__proto__ = Buffer.prototype)
        : (null === e && (e = new Buffer(a)), (e.length = a)),
      e
    );
  }
  function Buffer(e, a, o) {
    if (!(Buffer.TYPED_ARRAY_SUPPORT || this instanceof Buffer))
      return new Buffer(e, a, o);
    if ('number' == typeof e) {
      if ('string' == typeof a)
        throw new Error(
          'If encoding is specified then the first argument must be a string'
        );
      return allocUnsafe(this, e);
    }
    return from(this, e, a, o);
  }
  function from(e, a, o, t) {
    if ('number' == typeof a)
      throw new TypeError('"value" argument must not be a number');
    return 'undefined' != typeof ArrayBuffer && a instanceof ArrayBuffer
      ? fromArrayBuffer(e, a, o, t)
      : 'string' == typeof a
      ? fromString(e, a, o)
      : fromObject(e, a);
  }
  function assertSize(e) {
    if ('number' != typeof e)
      throw new TypeError('"size" argument must be a number');
    if (e < 0) throw new RangeError('"size" argument must not be negative');
  }
  function alloc(e, a, o, t) {
    return (
      assertSize(a),
      a <= 0
        ? createBuffer(e, a)
        : void 0 !== o
        ? 'string' == typeof t
          ? createBuffer(e, a).fill(o, t)
          : createBuffer(e, a).fill(o)
        : createBuffer(e, a)
    );
  }
  function allocUnsafe(e, a) {
    if (
      (assertSize(a),
      (e = createBuffer(e, a < 0 ? 0 : 0 | checked(a))),
      !Buffer.TYPED_ARRAY_SUPPORT)
    )
      for (var o = 0; o < a; ++o) e[o] = 0;
    return e;
  }
  function fromString(e, a, o) {
    if (
      (('string' == typeof o && '' !== o) || (o = 'utf8'),
      !Buffer.isEncoding(o))
    )
      throw new TypeError('"encoding" must be a valid string encoding');
    var t = 0 | byteLength(a, o),
      i = (e = createBuffer(e, t)).write(a, o);
    return i !== t && (e = e.slice(0, i)), e;
  }
  function fromArrayLike(e, a) {
    var o = a.length < 0 ? 0 : 0 | checked(a.length);
    e = createBuffer(e, o);
    for (var t = 0; t < o; t += 1) e[t] = 255 & a[t];
    return e;
  }
  function fromArrayBuffer(e, a, o, t) {
    if ((a.byteLength, o < 0 || a.byteLength < o))
      throw new RangeError("'offset' is out of bounds");
    if (a.byteLength < o + (t || 0))
      throw new RangeError("'length' is out of bounds");
    return (
      (a =
        void 0 === o && void 0 === t
          ? new Uint8Array(a)
          : void 0 === t
          ? new Uint8Array(a, o)
          : new Uint8Array(a, o, t)),
      Buffer.TYPED_ARRAY_SUPPORT
        ? ((e = a).__proto__ = Buffer.prototype)
        : (e = fromArrayLike(e, a)),
      e
    );
  }
  function fromObject(e, a) {
    if (internalIsBuffer(a)) {
      var o = 0 | checked(a.length);
      return 0 === (e = createBuffer(e, o)).length
        ? e
        : (a.copy(e, 0, 0, o), e);
    }
    if (a) {
      if (
        ('undefined' != typeof ArrayBuffer &&
          a.buffer instanceof ArrayBuffer) ||
        'length' in a
      )
        return 'number' != typeof a.length || isnan(a.length)
          ? createBuffer(e, 0)
          : fromArrayLike(e, a);
      if ('Buffer' === a.type && isArray$1(a.data))
        return fromArrayLike(e, a.data);
    }
    throw new TypeError(
      'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.'
    );
  }
  function checked(e) {
    if (e >= kMaxLength())
      throw new RangeError(
        'Attempt to allocate Buffer larger than maximum size: 0x' +
          kMaxLength().toString(16) +
          ' bytes'
      );
    return 0 | e;
  }
  function internalIsBuffer(e) {
    return !(null == e || !e._isBuffer);
  }
  function byteLength(e, a) {
    if (internalIsBuffer(e)) return e.length;
    if (
      'undefined' != typeof ArrayBuffer &&
      'function' == typeof ArrayBuffer.isView &&
      (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)
    )
      return e.byteLength;
    'string' != typeof e && (e = '' + e);
    var o = e.length;
    if (0 === o) return 0;
    for (var t = !1; ; )
      switch (a) {
        case 'ascii':
        case 'latin1':
        case 'binary':
          return o;
        case 'utf8':
        case 'utf-8':
        case void 0:
          return utf8ToBytes(e).length;
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return 2 * o;
        case 'hex':
          return o >>> 1;
        case 'base64':
          return base64ToBytes(e).length;
        default:
          if (t) return utf8ToBytes(e).length;
          (a = ('' + a).toLowerCase()), (t = !0);
      }
  }
  function slowToString(e, a, o) {
    var t = !1;
    if (((void 0 === a || a < 0) && (a = 0), a > this.length)) return '';
    if (((void 0 === o || o > this.length) && (o = this.length), o <= 0))
      return '';
    if ((o >>>= 0) <= (a >>>= 0)) return '';
    for (e || (e = 'utf8'); ; )
      switch (e) {
        case 'hex':
          return hexSlice(this, a, o);
        case 'utf8':
        case 'utf-8':
          return utf8Slice(this, a, o);
        case 'ascii':
          return asciiSlice(this, a, o);
        case 'latin1':
        case 'binary':
          return latin1Slice(this, a, o);
        case 'base64':
          return base64Slice(this, a, o);
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return utf16leSlice(this, a, o);
        default:
          if (t) throw new TypeError('Unknown encoding: ' + e);
          (e = (e + '').toLowerCase()), (t = !0);
      }
  }
  function swap(e, a, o) {
    var t = e[a];
    (e[a] = e[o]), (e[o] = t);
  }
  function bidirectionalIndexOf(e, a, o, t, i) {
    if (0 === e.length) return -1;
    if (
      ('string' == typeof o
        ? ((t = o), (o = 0))
        : o > 2147483647
        ? (o = 2147483647)
        : o < -2147483648 && (o = -2147483648),
      (o = +o),
      isNaN(o) && (o = i ? 0 : e.length - 1),
      o < 0 && (o = e.length + o),
      o >= e.length)
    ) {
      if (i) return -1;
      o = e.length - 1;
    } else if (o < 0) {
      if (!i) return -1;
      o = 0;
    }
    if (('string' == typeof a && (a = Buffer.from(a, t)), internalIsBuffer(a)))
      return 0 === a.length ? -1 : arrayIndexOf(e, a, o, t, i);
    if ('number' == typeof a)
      return (
        (a &= 255),
        Buffer.TYPED_ARRAY_SUPPORT &&
        'function' == typeof Uint8Array.prototype.indexOf
          ? i
            ? Uint8Array.prototype.indexOf.call(e, a, o)
            : Uint8Array.prototype.lastIndexOf.call(e, a, o)
          : arrayIndexOf(e, [a], o, t, i)
      );
    throw new TypeError('val must be string, number or Buffer');
  }
  function arrayIndexOf(e, a, o, t, i) {
    var n,
      r = 1,
      s = e.length,
      u = a.length;
    if (
      void 0 !== t &&
      ('ucs2' === (t = String(t).toLowerCase()) ||
        'ucs-2' === t ||
        'utf16le' === t ||
        'utf-16le' === t)
    ) {
      if (e.length < 2 || a.length < 2) return -1;
      (r = 2), (s /= 2), (u /= 2), (o /= 2);
    }
    function m(e, a) {
      return 1 === r ? e[a] : e.readUInt16BE(a * r);
    }
    if (i) {
      var c = -1;
      for (n = o; n < s; n++)
        if (m(e, n) === m(a, -1 === c ? 0 : n - c)) {
          if ((-1 === c && (c = n), n - c + 1 === u)) return c * r;
        } else -1 !== c && (n -= n - c), (c = -1);
    } else
      for (o + u > s && (o = s - u), n = o; n >= 0; n--) {
        for (var l = !0, p = 0; p < u; p++)
          if (m(e, n + p) !== m(a, p)) {
            l = !1;
            break;
          }
        if (l) return n;
      }
    return -1;
  }
  function hexWrite(e, a, o, t) {
    o = Number(o) || 0;
    var i = e.length - o;
    t ? (t = Number(t)) > i && (t = i) : (t = i);
    var n = a.length;
    if (n % 2 != 0) throw new TypeError('Invalid hex string');
    t > n / 2 && (t = n / 2);
    for (var r = 0; r < t; ++r) {
      var s = parseInt(a.substr(2 * r, 2), 16);
      if (isNaN(s)) return r;
      e[o + r] = s;
    }
    return r;
  }
  function utf8Write(e, a, o, t) {
    return blitBuffer(utf8ToBytes(a, e.length - o), e, o, t);
  }
  function asciiWrite(e, a, o, t) {
    return blitBuffer(asciiToBytes(a), e, o, t);
  }
  function latin1Write(e, a, o, t) {
    return asciiWrite(e, a, o, t);
  }
  function base64Write(e, a, o, t) {
    return blitBuffer(base64ToBytes(a), e, o, t);
  }
  function ucs2Write(e, a, o, t) {
    return blitBuffer(utf16leToBytes(a, e.length - o), e, o, t);
  }
  function base64Slice(e, a, o) {
    return 0 === a && o === e.length
      ? fromByteArray(e)
      : fromByteArray(e.slice(a, o));
  }
  function utf8Slice(e, a, o) {
    o = Math.min(e.length, o);
    for (var t = [], i = a; i < o; ) {
      var n,
        r,
        s,
        u,
        m = e[i],
        c = null,
        l = m > 239 ? 4 : m > 223 ? 3 : m > 191 ? 2 : 1;
      if (i + l <= o)
        switch (l) {
          case 1:
            m < 128 && (c = m);
            break;
          case 2:
            128 == (192 & (n = e[i + 1])) &&
              (u = ((31 & m) << 6) | (63 & n)) > 127 &&
              (c = u);
            break;
          case 3:
            (n = e[i + 1]),
              (r = e[i + 2]),
              128 == (192 & n) &&
                128 == (192 & r) &&
                (u = ((15 & m) << 12) | ((63 & n) << 6) | (63 & r)) > 2047 &&
                (u < 55296 || u > 57343) &&
                (c = u);
            break;
          case 4:
            (n = e[i + 1]),
              (r = e[i + 2]),
              (s = e[i + 3]),
              128 == (192 & n) &&
                128 == (192 & r) &&
                128 == (192 & s) &&
                (u =
                  ((15 & m) << 18) |
                  ((63 & n) << 12) |
                  ((63 & r) << 6) |
                  (63 & s)) > 65535 &&
                u < 1114112 &&
                (c = u);
        }
      null === c
        ? ((c = 65533), (l = 1))
        : c > 65535 &&
          ((c -= 65536),
          t.push(((c >>> 10) & 1023) | 55296),
          (c = 56320 | (1023 & c))),
        t.push(c),
        (i += l);
    }
    return decodeCodePointsArray(t);
  }
  (Buffer.TYPED_ARRAY_SUPPORT =
    void 0 === global$1.TYPED_ARRAY_SUPPORT || global$1.TYPED_ARRAY_SUPPORT),
    (Buffer.poolSize = 8192),
    (Buffer._augment = function(e) {
      return (e.__proto__ = Buffer.prototype), e;
    }),
    (Buffer.from = function(e, a, o) {
      return from(null, e, a, o);
    }),
    Buffer.TYPED_ARRAY_SUPPORT &&
      ((Buffer.prototype.__proto__ = Uint8Array.prototype),
      (Buffer.__proto__ = Uint8Array)),
    (Buffer.alloc = function(e, a, o) {
      return alloc(null, e, a, o);
    }),
    (Buffer.allocUnsafe = function(e) {
      return allocUnsafe(null, e);
    }),
    (Buffer.allocUnsafeSlow = function(e) {
      return allocUnsafe(null, e);
    }),
    (Buffer.isBuffer = isBuffer$1),
    (Buffer.compare = function(e, a) {
      if (!internalIsBuffer(e) || !internalIsBuffer(a))
        throw new TypeError('Arguments must be Buffers');
      if (e === a) return 0;
      for (
        var o = e.length, t = a.length, i = 0, n = Math.min(o, t);
        i < n;
        ++i
      )
        if (e[i] !== a[i]) {
          (o = e[i]), (t = a[i]);
          break;
        }
      return o < t ? -1 : t < o ? 1 : 0;
    }),
    (Buffer.isEncoding = function(e) {
      switch (String(e).toLowerCase()) {
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
          return !0;
        default:
          return !1;
      }
    }),
    (Buffer.concat = function(e, a) {
      if (!isArray$1(e))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (0 === e.length) return Buffer.alloc(0);
      var o;
      if (void 0 === a) for (a = 0, o = 0; o < e.length; ++o) a += e[o].length;
      var t = Buffer.allocUnsafe(a),
        i = 0;
      for (o = 0; o < e.length; ++o) {
        var n = e[o];
        if (!internalIsBuffer(n))
          throw new TypeError('"list" argument must be an Array of Buffers');
        n.copy(t, i), (i += n.length);
      }
      return t;
    }),
    (Buffer.byteLength = byteLength),
    (Buffer.prototype._isBuffer = !0),
    (Buffer.prototype.swap16 = function() {
      var e = this.length;
      if (e % 2 != 0)
        throw new RangeError('Buffer size must be a multiple of 16-bits');
      for (var a = 0; a < e; a += 2) swap(this, a, a + 1);
      return this;
    }),
    (Buffer.prototype.swap32 = function() {
      var e = this.length;
      if (e % 4 != 0)
        throw new RangeError('Buffer size must be a multiple of 32-bits');
      for (var a = 0; a < e; a += 4)
        swap(this, a, a + 3), swap(this, a + 1, a + 2);
      return this;
    }),
    (Buffer.prototype.swap64 = function() {
      var e = this.length;
      if (e % 8 != 0)
        throw new RangeError('Buffer size must be a multiple of 64-bits');
      for (var a = 0; a < e; a += 8)
        swap(this, a, a + 7),
          swap(this, a + 1, a + 6),
          swap(this, a + 2, a + 5),
          swap(this, a + 3, a + 4);
      return this;
    }),
    (Buffer.prototype.toString = function() {
      var e = 0 | this.length;
      return 0 === e
        ? ''
        : 0 === arguments.length
        ? utf8Slice(this, 0, e)
        : slowToString.apply(this, arguments);
    }),
    (Buffer.prototype.equals = function(e) {
      if (!internalIsBuffer(e))
        throw new TypeError('Argument must be a Buffer');
      return this === e || 0 === Buffer.compare(this, e);
    }),
    (Buffer.prototype.inspect = function() {
      var e = '',
        a = INSPECT_MAX_BYTES;
      return (
        this.length > 0 &&
          ((e = this.toString('hex', 0, a)
            .match(/.{2}/g)
            .join(' ')),
          this.length > a && (e += ' ... ')),
        '<Buffer ' + e + '>'
      );
    }),
    (Buffer.prototype.compare = function(e, a, o, t, i) {
      if (!internalIsBuffer(e))
        throw new TypeError('Argument must be a Buffer');
      if (
        (void 0 === a && (a = 0),
        void 0 === o && (o = e ? e.length : 0),
        void 0 === t && (t = 0),
        void 0 === i && (i = this.length),
        a < 0 || o > e.length || t < 0 || i > this.length)
      )
        throw new RangeError('out of range index');
      if (t >= i && a >= o) return 0;
      if (t >= i) return -1;
      if (a >= o) return 1;
      if (this === e) return 0;
      for (
        var n = (i >>>= 0) - (t >>>= 0),
          r = (o >>>= 0) - (a >>>= 0),
          s = Math.min(n, r),
          u = this.slice(t, i),
          m = e.slice(a, o),
          c = 0;
        c < s;
        ++c
      )
        if (u[c] !== m[c]) {
          (n = u[c]), (r = m[c]);
          break;
        }
      return n < r ? -1 : r < n ? 1 : 0;
    }),
    (Buffer.prototype.includes = function(e, a, o) {
      return -1 !== this.indexOf(e, a, o);
    }),
    (Buffer.prototype.indexOf = function(e, a, o) {
      return bidirectionalIndexOf(this, e, a, o, !0);
    }),
    (Buffer.prototype.lastIndexOf = function(e, a, o) {
      return bidirectionalIndexOf(this, e, a, o, !1);
    }),
    (Buffer.prototype.write = function(e, a, o, t) {
      if (void 0 === a) (t = 'utf8'), (o = this.length), (a = 0);
      else if (void 0 === o && 'string' == typeof a)
        (t = a), (o = this.length), (a = 0);
      else {
        if (!isFinite(a))
          throw new Error(
            'Buffer.write(string, encoding, offset[, length]) is no longer supported'
          );
        (a |= 0),
          isFinite(o)
            ? ((o |= 0), void 0 === t && (t = 'utf8'))
            : ((t = o), (o = void 0));
      }
      var i = this.length - a;
      if (
        ((void 0 === o || o > i) && (o = i),
        (e.length > 0 && (o < 0 || a < 0)) || a > this.length)
      )
        throw new RangeError('Attempt to write outside buffer bounds');
      t || (t = 'utf8');
      for (var n = !1; ; )
        switch (t) {
          case 'hex':
            return hexWrite(this, e, a, o);
          case 'utf8':
          case 'utf-8':
            return utf8Write(this, e, a, o);
          case 'ascii':
            return asciiWrite(this, e, a, o);
          case 'latin1':
          case 'binary':
            return latin1Write(this, e, a, o);
          case 'base64':
            return base64Write(this, e, a, o);
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return ucs2Write(this, e, a, o);
          default:
            if (n) throw new TypeError('Unknown encoding: ' + t);
            (t = ('' + t).toLowerCase()), (n = !0);
        }
    }),
    (Buffer.prototype.toJSON = function() {
      return {
        type: 'Buffer',
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    });
  var MAX_ARGUMENTS_LENGTH = 4096;
  function decodeCodePointsArray(e) {
    var a = e.length;
    if (a <= MAX_ARGUMENTS_LENGTH) return String.fromCharCode.apply(String, e);
    for (var o = '', t = 0; t < a; )
      o += String.fromCharCode.apply(
        String,
        e.slice(t, (t += MAX_ARGUMENTS_LENGTH))
      );
    return o;
  }
  function asciiSlice(e, a, o) {
    var t = '';
    o = Math.min(e.length, o);
    for (var i = a; i < o; ++i) t += String.fromCharCode(127 & e[i]);
    return t;
  }
  function latin1Slice(e, a, o) {
    var t = '';
    o = Math.min(e.length, o);
    for (var i = a; i < o; ++i) t += String.fromCharCode(e[i]);
    return t;
  }
  function hexSlice(e, a, o) {
    var t = e.length;
    (!a || a < 0) && (a = 0), (!o || o < 0 || o > t) && (o = t);
    for (var i = '', n = a; n < o; ++n) i += toHex(e[n]);
    return i;
  }
  function utf16leSlice(e, a, o) {
    for (var t = e.slice(a, o), i = '', n = 0; n < t.length; n += 2)
      i += String.fromCharCode(t[n] + 256 * t[n + 1]);
    return i;
  }
  function checkOffset(e, a, o) {
    if (e % 1 != 0 || e < 0) throw new RangeError('offset is not uint');
    if (e + a > o)
      throw new RangeError('Trying to access beyond buffer length');
  }
  function checkInt(e, a, o, t, i, n) {
    if (!internalIsBuffer(e))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (a > i || a < n)
      throw new RangeError('"value" argument is out of bounds');
    if (o + t > e.length) throw new RangeError('Index out of range');
  }
  function objectWriteUInt16(e, a, o, t) {
    a < 0 && (a = 65535 + a + 1);
    for (var i = 0, n = Math.min(e.length - o, 2); i < n; ++i)
      e[o + i] = (a & (255 << (8 * (t ? i : 1 - i)))) >>> (8 * (t ? i : 1 - i));
  }
  function objectWriteUInt32(e, a, o, t) {
    a < 0 && (a = 4294967295 + a + 1);
    for (var i = 0, n = Math.min(e.length - o, 4); i < n; ++i)
      e[o + i] = (a >>> (8 * (t ? i : 3 - i))) & 255;
  }
  function checkIEEE754(e, a, o, t, i, n) {
    if (o + t > e.length) throw new RangeError('Index out of range');
    if (o < 0) throw new RangeError('Index out of range');
  }
  function writeFloat(e, a, o, t, i) {
    return i || checkIEEE754(e, a, o, 4), write(e, a, o, t, 23, 4), o + 4;
  }
  function writeDouble(e, a, o, t, i) {
    return i || checkIEEE754(e, a, o, 8), write(e, a, o, t, 52, 8), o + 8;
  }
  (Buffer.prototype.slice = function(e, a) {
    var o,
      t = this.length;
    if (
      ((e = ~~e) < 0 ? (e += t) < 0 && (e = 0) : e > t && (e = t),
      (a = void 0 === a ? t : ~~a) < 0
        ? (a += t) < 0 && (a = 0)
        : a > t && (a = t),
      a < e && (a = e),
      Buffer.TYPED_ARRAY_SUPPORT)
    )
      (o = this.subarray(e, a)).__proto__ = Buffer.prototype;
    else {
      var i = a - e;
      o = new Buffer(i, void 0);
      for (var n = 0; n < i; ++n) o[n] = this[n + e];
    }
    return o;
  }),
    (Buffer.prototype.readUIntLE = function(e, a, o) {
      (e |= 0), (a |= 0), o || checkOffset(e, a, this.length);
      for (var t = this[e], i = 1, n = 0; ++n < a && (i *= 256); )
        t += this[e + n] * i;
      return t;
    }),
    (Buffer.prototype.readUIntBE = function(e, a, o) {
      (e |= 0), (a |= 0), o || checkOffset(e, a, this.length);
      for (var t = this[e + --a], i = 1; a > 0 && (i *= 256); )
        t += this[e + --a] * i;
      return t;
    }),
    (Buffer.prototype.readUInt8 = function(e, a) {
      return a || checkOffset(e, 1, this.length), this[e];
    }),
    (Buffer.prototype.readUInt16LE = function(e, a) {
      return a || checkOffset(e, 2, this.length), this[e] | (this[e + 1] << 8);
    }),
    (Buffer.prototype.readUInt16BE = function(e, a) {
      return a || checkOffset(e, 2, this.length), (this[e] << 8) | this[e + 1];
    }),
    (Buffer.prototype.readUInt32LE = function(e, a) {
      return (
        a || checkOffset(e, 4, this.length),
        (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) +
          16777216 * this[e + 3]
      );
    }),
    (Buffer.prototype.readUInt32BE = function(e, a) {
      return (
        a || checkOffset(e, 4, this.length),
        16777216 * this[e] +
          ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
      );
    }),
    (Buffer.prototype.readIntLE = function(e, a, o) {
      (e |= 0), (a |= 0), o || checkOffset(e, a, this.length);
      for (var t = this[e], i = 1, n = 0; ++n < a && (i *= 256); )
        t += this[e + n] * i;
      return t >= (i *= 128) && (t -= Math.pow(2, 8 * a)), t;
    }),
    (Buffer.prototype.readIntBE = function(e, a, o) {
      (e |= 0), (a |= 0), o || checkOffset(e, a, this.length);
      for (var t = a, i = 1, n = this[e + --t]; t > 0 && (i *= 256); )
        n += this[e + --t] * i;
      return n >= (i *= 128) && (n -= Math.pow(2, 8 * a)), n;
    }),
    (Buffer.prototype.readInt8 = function(e, a) {
      return (
        a || checkOffset(e, 1, this.length),
        128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
      );
    }),
    (Buffer.prototype.readInt16LE = function(e, a) {
      a || checkOffset(e, 2, this.length);
      var o = this[e] | (this[e + 1] << 8);
      return 32768 & o ? 4294901760 | o : o;
    }),
    (Buffer.prototype.readInt16BE = function(e, a) {
      a || checkOffset(e, 2, this.length);
      var o = this[e + 1] | (this[e] << 8);
      return 32768 & o ? 4294901760 | o : o;
    }),
    (Buffer.prototype.readInt32LE = function(e, a) {
      return (
        a || checkOffset(e, 4, this.length),
        this[e] | (this[e + 1] << 8) | (this[e + 2] << 16) | (this[e + 3] << 24)
      );
    }),
    (Buffer.prototype.readInt32BE = function(e, a) {
      return (
        a || checkOffset(e, 4, this.length),
        (this[e] << 24) | (this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3]
      );
    }),
    (Buffer.prototype.readFloatLE = function(e, a) {
      return a || checkOffset(e, 4, this.length), read(this, e, !0, 23, 4);
    }),
    (Buffer.prototype.readFloatBE = function(e, a) {
      return a || checkOffset(e, 4, this.length), read(this, e, !1, 23, 4);
    }),
    (Buffer.prototype.readDoubleLE = function(e, a) {
      return a || checkOffset(e, 8, this.length), read(this, e, !0, 52, 8);
    }),
    (Buffer.prototype.readDoubleBE = function(e, a) {
      return a || checkOffset(e, 8, this.length), read(this, e, !1, 52, 8);
    }),
    (Buffer.prototype.writeUIntLE = function(e, a, o, t) {
      ((e = +e), (a |= 0), (o |= 0), t) ||
        checkInt(this, e, a, o, Math.pow(2, 8 * o) - 1, 0);
      var i = 1,
        n = 0;
      for (this[a] = 255 & e; ++n < o && (i *= 256); )
        this[a + n] = (e / i) & 255;
      return a + o;
    }),
    (Buffer.prototype.writeUIntBE = function(e, a, o, t) {
      ((e = +e), (a |= 0), (o |= 0), t) ||
        checkInt(this, e, a, o, Math.pow(2, 8 * o) - 1, 0);
      var i = o - 1,
        n = 1;
      for (this[a + i] = 255 & e; --i >= 0 && (n *= 256); )
        this[a + i] = (e / n) & 255;
      return a + o;
    }),
    (Buffer.prototype.writeUInt8 = function(e, a, o) {
      return (
        (e = +e),
        (a |= 0),
        o || checkInt(this, e, a, 1, 255, 0),
        Buffer.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
        (this[a] = 255 & e),
        a + 1
      );
    }),
    (Buffer.prototype.writeUInt16LE = function(e, a, o) {
      return (
        (e = +e),
        (a |= 0),
        o || checkInt(this, e, a, 2, 65535, 0),
        Buffer.TYPED_ARRAY_SUPPORT
          ? ((this[a] = 255 & e), (this[a + 1] = e >>> 8))
          : objectWriteUInt16(this, e, a, !0),
        a + 2
      );
    }),
    (Buffer.prototype.writeUInt16BE = function(e, a, o) {
      return (
        (e = +e),
        (a |= 0),
        o || checkInt(this, e, a, 2, 65535, 0),
        Buffer.TYPED_ARRAY_SUPPORT
          ? ((this[a] = e >>> 8), (this[a + 1] = 255 & e))
          : objectWriteUInt16(this, e, a, !1),
        a + 2
      );
    }),
    (Buffer.prototype.writeUInt32LE = function(e, a, o) {
      return (
        (e = +e),
        (a |= 0),
        o || checkInt(this, e, a, 4, 4294967295, 0),
        Buffer.TYPED_ARRAY_SUPPORT
          ? ((this[a + 3] = e >>> 24),
            (this[a + 2] = e >>> 16),
            (this[a + 1] = e >>> 8),
            (this[a] = 255 & e))
          : objectWriteUInt32(this, e, a, !0),
        a + 4
      );
    }),
    (Buffer.prototype.writeUInt32BE = function(e, a, o) {
      return (
        (e = +e),
        (a |= 0),
        o || checkInt(this, e, a, 4, 4294967295, 0),
        Buffer.TYPED_ARRAY_SUPPORT
          ? ((this[a] = e >>> 24),
            (this[a + 1] = e >>> 16),
            (this[a + 2] = e >>> 8),
            (this[a + 3] = 255 & e))
          : objectWriteUInt32(this, e, a, !1),
        a + 4
      );
    }),
    (Buffer.prototype.writeIntLE = function(e, a, o, t) {
      if (((e = +e), (a |= 0), !t)) {
        var i = Math.pow(2, 8 * o - 1);
        checkInt(this, e, a, o, i - 1, -i);
      }
      var n = 0,
        r = 1,
        s = 0;
      for (this[a] = 255 & e; ++n < o && (r *= 256); )
        e < 0 && 0 === s && 0 !== this[a + n - 1] && (s = 1),
          (this[a + n] = (((e / r) >> 0) - s) & 255);
      return a + o;
    }),
    (Buffer.prototype.writeIntBE = function(e, a, o, t) {
      if (((e = +e), (a |= 0), !t)) {
        var i = Math.pow(2, 8 * o - 1);
        checkInt(this, e, a, o, i - 1, -i);
      }
      var n = o - 1,
        r = 1,
        s = 0;
      for (this[a + n] = 255 & e; --n >= 0 && (r *= 256); )
        e < 0 && 0 === s && 0 !== this[a + n + 1] && (s = 1),
          (this[a + n] = (((e / r) >> 0) - s) & 255);
      return a + o;
    }),
    (Buffer.prototype.writeInt8 = function(e, a, o) {
      return (
        (e = +e),
        (a |= 0),
        o || checkInt(this, e, a, 1, 127, -128),
        Buffer.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
        e < 0 && (e = 255 + e + 1),
        (this[a] = 255 & e),
        a + 1
      );
    }),
    (Buffer.prototype.writeInt16LE = function(e, a, o) {
      return (
        (e = +e),
        (a |= 0),
        o || checkInt(this, e, a, 2, 32767, -32768),
        Buffer.TYPED_ARRAY_SUPPORT
          ? ((this[a] = 255 & e), (this[a + 1] = e >>> 8))
          : objectWriteUInt16(this, e, a, !0),
        a + 2
      );
    }),
    (Buffer.prototype.writeInt16BE = function(e, a, o) {
      return (
        (e = +e),
        (a |= 0),
        o || checkInt(this, e, a, 2, 32767, -32768),
        Buffer.TYPED_ARRAY_SUPPORT
          ? ((this[a] = e >>> 8), (this[a + 1] = 255 & e))
          : objectWriteUInt16(this, e, a, !1),
        a + 2
      );
    }),
    (Buffer.prototype.writeInt32LE = function(e, a, o) {
      return (
        (e = +e),
        (a |= 0),
        o || checkInt(this, e, a, 4, 2147483647, -2147483648),
        Buffer.TYPED_ARRAY_SUPPORT
          ? ((this[a] = 255 & e),
            (this[a + 1] = e >>> 8),
            (this[a + 2] = e >>> 16),
            (this[a + 3] = e >>> 24))
          : objectWriteUInt32(this, e, a, !0),
        a + 4
      );
    }),
    (Buffer.prototype.writeInt32BE = function(e, a, o) {
      return (
        (e = +e),
        (a |= 0),
        o || checkInt(this, e, a, 4, 2147483647, -2147483648),
        e < 0 && (e = 4294967295 + e + 1),
        Buffer.TYPED_ARRAY_SUPPORT
          ? ((this[a] = e >>> 24),
            (this[a + 1] = e >>> 16),
            (this[a + 2] = e >>> 8),
            (this[a + 3] = 255 & e))
          : objectWriteUInt32(this, e, a, !1),
        a + 4
      );
    }),
    (Buffer.prototype.writeFloatLE = function(e, a, o) {
      return writeFloat(this, e, a, !0, o);
    }),
    (Buffer.prototype.writeFloatBE = function(e, a, o) {
      return writeFloat(this, e, a, !1, o);
    }),
    (Buffer.prototype.writeDoubleLE = function(e, a, o) {
      return writeDouble(this, e, a, !0, o);
    }),
    (Buffer.prototype.writeDoubleBE = function(e, a, o) {
      return writeDouble(this, e, a, !1, o);
    }),
    (Buffer.prototype.copy = function(e, a, o, t) {
      if (
        (o || (o = 0),
        t || 0 === t || (t = this.length),
        a >= e.length && (a = e.length),
        a || (a = 0),
        t > 0 && t < o && (t = o),
        t === o)
      )
        return 0;
      if (0 === e.length || 0 === this.length) return 0;
      if (a < 0) throw new RangeError('targetStart out of bounds');
      if (o < 0 || o >= this.length)
        throw new RangeError('sourceStart out of bounds');
      if (t < 0) throw new RangeError('sourceEnd out of bounds');
      t > this.length && (t = this.length),
        e.length - a < t - o && (t = e.length - a + o);
      var i,
        n = t - o;
      if (this === e && o < a && a < t)
        for (i = n - 1; i >= 0; --i) e[i + a] = this[i + o];
      else if (n < 1e3 || !Buffer.TYPED_ARRAY_SUPPORT)
        for (i = 0; i < n; ++i) e[i + a] = this[i + o];
      else Uint8Array.prototype.set.call(e, this.subarray(o, o + n), a);
      return n;
    }),
    (Buffer.prototype.fill = function(e, a, o, t) {
      if ('string' == typeof e) {
        if (
          ('string' == typeof a
            ? ((t = a), (a = 0), (o = this.length))
            : 'string' == typeof o && ((t = o), (o = this.length)),
          1 === e.length)
        ) {
          var i = e.charCodeAt(0);
          i < 256 && (e = i);
        }
        if (void 0 !== t && 'string' != typeof t)
          throw new TypeError('encoding must be a string');
        if ('string' == typeof t && !Buffer.isEncoding(t))
          throw new TypeError('Unknown encoding: ' + t);
      } else 'number' == typeof e && (e &= 255);
      if (a < 0 || this.length < a || this.length < o)
        throw new RangeError('Out of range index');
      if (o <= a) return this;
      var n;
      if (
        ((a >>>= 0),
        (o = void 0 === o ? this.length : o >>> 0),
        e || (e = 0),
        'number' == typeof e)
      )
        for (n = a; n < o; ++n) this[n] = e;
      else {
        var r = internalIsBuffer(e)
            ? e
            : utf8ToBytes(new Buffer(e, t).toString()),
          s = r.length;
        for (n = 0; n < o - a; ++n) this[n + a] = r[n % s];
      }
      return this;
    });
  var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
  function base64clean(e) {
    if ((e = stringtrim(e).replace(INVALID_BASE64_RE, '')).length < 2)
      return '';
    for (; e.length % 4 != 0; ) e += '=';
    return e;
  }
  function stringtrim(e) {
    return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, '');
  }
  function toHex(e) {
    return e < 16 ? '0' + e.toString(16) : e.toString(16);
  }
  function utf8ToBytes(e, a) {
    var o;
    a = a || 1 / 0;
    for (var t = e.length, i = null, n = [], r = 0; r < t; ++r) {
      if ((o = e.charCodeAt(r)) > 55295 && o < 57344) {
        if (!i) {
          if (o > 56319) {
            (a -= 3) > -1 && n.push(239, 191, 189);
            continue;
          }
          if (r + 1 === t) {
            (a -= 3) > -1 && n.push(239, 191, 189);
            continue;
          }
          i = o;
          continue;
        }
        if (o < 56320) {
          (a -= 3) > -1 && n.push(239, 191, 189), (i = o);
          continue;
        }
        o = 65536 + (((i - 55296) << 10) | (o - 56320));
      } else i && (a -= 3) > -1 && n.push(239, 191, 189);
      if (((i = null), o < 128)) {
        if ((a -= 1) < 0) break;
        n.push(o);
      } else if (o < 2048) {
        if ((a -= 2) < 0) break;
        n.push((o >> 6) | 192, (63 & o) | 128);
      } else if (o < 65536) {
        if ((a -= 3) < 0) break;
        n.push((o >> 12) | 224, ((o >> 6) & 63) | 128, (63 & o) | 128);
      } else {
        if (!(o < 1114112)) throw new Error('Invalid code point');
        if ((a -= 4) < 0) break;
        n.push(
          (o >> 18) | 240,
          ((o >> 12) & 63) | 128,
          ((o >> 6) & 63) | 128,
          (63 & o) | 128
        );
      }
    }
    return n;
  }
  function asciiToBytes(e) {
    for (var a = [], o = 0; o < e.length; ++o) a.push(255 & e.charCodeAt(o));
    return a;
  }
  function utf16leToBytes(e, a) {
    for (var o, t, i, n = [], r = 0; r < e.length && !((a -= 2) < 0); ++r)
      (t = (o = e.charCodeAt(r)) >> 8), (i = o % 256), n.push(i), n.push(t);
    return n;
  }
  function base64ToBytes(e) {
    return toByteArray(base64clean(e));
  }
  function blitBuffer(e, a, o, t) {
    for (var i = 0; i < t && !(i + o >= a.length || i >= e.length); ++i)
      a[i + o] = e[i];
    return i;
  }
  function isnan(e) {
    return e != e;
  }
  function isBuffer$1(e) {
    return null != e && (!!e._isBuffer || isFastBuffer(e) || isSlowBuffer(e));
  }
  function isFastBuffer(e) {
    return (
      !!e.constructor &&
      'function' == typeof e.constructor.isBuffer &&
      e.constructor.isBuffer(e)
    );
  }
  function isSlowBuffer(e) {
    return (
      'function' == typeof e.readFloatLE &&
      'function' == typeof e.slice &&
      isFastBuffer(e.slice(0, 0))
    );
  }
  var hasFetch =
      isFunction$1(global$1.fetch) && isFunction$1(global$1.ReadableStream),
    _blobConstructor,
    xhr$1;
  function blobConstructor() {
    if (void 0 !== _blobConstructor) return _blobConstructor;
    try {
      new global$1.Blob([new ArrayBuffer(1)]), (_blobConstructor = !0);
    } catch (e) {
      _blobConstructor = !1;
    }
    return _blobConstructor;
  }
  function checkTypeSupport(e) {
    xhr$1 ||
      (xhr$1 = new global$1.XMLHttpRequest()).open(
        'GET',
        global$1.location.host ? '/' : 'https://example.com'
      );
    try {
      return (xhr$1.responseType = e), xhr$1.responseType === e;
    } catch (e) {
      return !1;
    }
  }
  var haveArrayBuffer = void 0 !== global$1.ArrayBuffer,
    haveSlice =
      haveArrayBuffer && isFunction$1(global$1.ArrayBuffer.prototype.slice),
    arraybuffer = haveArrayBuffer && checkTypeSupport('arraybuffer'),
    msstream = !hasFetch && haveSlice && checkTypeSupport('ms-stream'),
    mozchunkedarraybuffer =
      !hasFetch &&
      haveArrayBuffer &&
      checkTypeSupport('moz-chunked-arraybuffer'),
    overrideMimeType = isFunction$1(xhr$1.overrideMimeType),
    vbArray = isFunction$1(global$1.VBArray),
    inherits;
  function isFunction$1(e) {
    return 'function' == typeof e;
  }
  (xhr$1 = null),
    (inherits =
      'function' == typeof Object.create
        ? function(e, a) {
            (e.super_ = a),
              (e.prototype = Object.create(a.prototype, {
                constructor: {
                  value: e,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0
                }
              }));
          }
        : function(e, a) {
            e.super_ = a;
            var o = function() {};
            (o.prototype = a.prototype),
              (e.prototype = new o()),
              (e.prototype.constructor = e);
          });
  var inherits$1 = inherits,
    formatRegExp = /%[sdj%]/g;
  function format(e) {
    if (!isString$1(e)) {
      for (var a = [], o = 0; o < arguments.length; o++)
        a.push(inspect(arguments[o]));
      return a.join(' ');
    }
    o = 1;
    for (
      var t = arguments,
        i = t.length,
        n = String(e).replace(formatRegExp, function(e) {
          if ('%%' === e) return '%';
          if (o >= i) return e;
          switch (e) {
            case '%s':
              return String(t[o++]);
            case '%d':
              return Number(t[o++]);
            case '%j':
              try {
                return JSON.stringify(t[o++]);
              } catch (e) {
                return '[Circular]';
              }
            default:
              return e;
          }
        }),
        r = t[o];
      o < i;
      r = t[++o]
    )
      isNull(r) || !isObject$1(r) ? (n += ' ' + r) : (n += ' ' + inspect(r));
    return n;
  }
  function deprecate(e, a) {
    if (isUndefined$1(global$1.process))
      return function() {
        return deprecate(e, a).apply(this, arguments);
      };
    if (!0 === process.noDeprecation) return e;
    var o = !1;
    return function() {
      if (!o) {
        if (process.throwDeprecation) throw new Error(a);
        process.traceDeprecation ? console.trace(a) : console.error(a),
          (o = !0);
      }
      return e.apply(this, arguments);
    };
  }
  var debugs = {},
    debugEnviron;
  function debuglog(e) {
    if (
      (isUndefined$1(debugEnviron) &&
        (debugEnviron = process.env.NODE_DEBUG || ''),
      (e = e.toUpperCase()),
      !debugs[e])
    )
      if (new RegExp('\\b' + e + '\\b', 'i').test(debugEnviron)) {
        debugs[e] = function() {
          var a = format.apply(null, arguments);
          console.error('%s %d: %s', e, 0, a);
        };
      } else debugs[e] = function() {};
    return debugs[e];
  }
  function inspect(e, a) {
    var o = { seen: [], stylize: stylizeNoColor };
    return (
      arguments.length >= 3 && (o.depth = arguments[2]),
      arguments.length >= 4 && (o.colors = arguments[3]),
      isBoolean(a) ? (o.showHidden = a) : a && _extend(o, a),
      isUndefined$1(o.showHidden) && (o.showHidden = !1),
      isUndefined$1(o.depth) && (o.depth = 2),
      isUndefined$1(o.colors) && (o.colors = !1),
      isUndefined$1(o.customInspect) && (o.customInspect = !0),
      o.colors && (o.stylize = stylizeWithColor),
      formatValue(o, e, o.depth)
    );
  }
  function stylizeWithColor(e, a) {
    var o = inspect.styles[a];
    return o
      ? '[' + inspect.colors[o][0] + 'm' + e + '[' + inspect.colors[o][1] + 'm'
      : e;
  }
  function stylizeNoColor(e, a) {
    return e;
  }
  function arrayToHash(e) {
    var a = {};
    return (
      e.forEach(function(e, o) {
        a[e] = !0;
      }),
      a
    );
  }
  function formatValue(e, a, o) {
    if (
      e.customInspect &&
      a &&
      isFunction$2(a.inspect) &&
      a.inspect !== inspect &&
      (!a.constructor || a.constructor.prototype !== a)
    ) {
      var t = a.inspect(o, e);
      return isString$1(t) || (t = formatValue(e, t, o)), t;
    }
    var i = formatPrimitive(e, a);
    if (i) return i;
    var n = Object.keys(a),
      r = arrayToHash(n);
    if (
      (e.showHidden && (n = Object.getOwnPropertyNames(a)),
      isError(a) &&
        (n.indexOf('message') >= 0 || n.indexOf('description') >= 0))
    )
      return formatError(a);
    if (0 === n.length) {
      if (isFunction$2(a)) {
        var s = a.name ? ': ' + a.name : '';
        return e.stylize('[Function' + s + ']', 'special');
      }
      if (isRegExp(a))
        return e.stylize(RegExp.prototype.toString.call(a), 'regexp');
      if (isDate$1(a))
        return e.stylize(Date.prototype.toString.call(a), 'date');
      if (isError(a)) return formatError(a);
    }
    var u,
      m = '',
      c = !1,
      l = ['{', '}'];
    (isArray$2(a) && ((c = !0), (l = ['[', ']'])), isFunction$2(a)) &&
      (m = ' [Function' + (a.name ? ': ' + a.name : '') + ']');
    return (
      isRegExp(a) && (m = ' ' + RegExp.prototype.toString.call(a)),
      isDate$1(a) && (m = ' ' + Date.prototype.toUTCString.call(a)),
      isError(a) && (m = ' ' + formatError(a)),
      0 !== n.length || (c && 0 != a.length)
        ? o < 0
          ? isRegExp(a)
            ? e.stylize(RegExp.prototype.toString.call(a), 'regexp')
            : e.stylize('[Object]', 'special')
          : (e.seen.push(a),
            (u = c
              ? formatArray(e, a, o, r, n)
              : n.map(function(t) {
                  return formatProperty(e, a, o, r, t, c);
                })),
            e.seen.pop(),
            reduceToSingleString(u, m, l))
        : l[0] + m + l[1]
    );
  }
  function formatPrimitive(e, a) {
    if (isUndefined$1(a)) return e.stylize('undefined', 'undefined');
    if (isString$1(a)) {
      var o =
        "'" +
        JSON.stringify(a)
          .replace(/^"|"$/g, '')
          .replace(/'/g, "\\'")
          .replace(/\\"/g, '"') +
        "'";
      return e.stylize(o, 'string');
    }
    return isNumber$1(a)
      ? e.stylize('' + a, 'number')
      : isBoolean(a)
      ? e.stylize('' + a, 'boolean')
      : isNull(a)
      ? e.stylize('null', 'null')
      : void 0;
  }
  function formatError(e) {
    return '[' + Error.prototype.toString.call(e) + ']';
  }
  function formatArray(e, a, o, t, i) {
    for (var n = [], r = 0, s = a.length; r < s; ++r)
      hasOwnProperty(a, String(r))
        ? n.push(formatProperty(e, a, o, t, String(r), !0))
        : n.push('');
    return (
      i.forEach(function(i) {
        i.match(/^\d+$/) || n.push(formatProperty(e, a, o, t, i, !0));
      }),
      n
    );
  }
  function formatProperty(e, a, o, t, i, n) {
    var r, s, u;
    if (
      ((u = Object.getOwnPropertyDescriptor(a, i) || { value: a[i] }).get
        ? (s = u.set
            ? e.stylize('[Getter/Setter]', 'special')
            : e.stylize('[Getter]', 'special'))
        : u.set && (s = e.stylize('[Setter]', 'special')),
      hasOwnProperty(t, i) || (r = '[' + i + ']'),
      s ||
        (e.seen.indexOf(u.value) < 0
          ? (s = isNull(o)
              ? formatValue(e, u.value, null)
              : formatValue(e, u.value, o - 1)).indexOf('\n') > -1 &&
            (s = n
              ? s
                  .split('\n')
                  .map(function(e) {
                    return '  ' + e;
                  })
                  .join('\n')
                  .substr(2)
              : '\n' +
                s
                  .split('\n')
                  .map(function(e) {
                    return '   ' + e;
                  })
                  .join('\n'))
          : (s = e.stylize('[Circular]', 'special'))),
      isUndefined$1(r))
    ) {
      if (n && i.match(/^\d+$/)) return s;
      (r = JSON.stringify('' + i)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)
        ? ((r = r.substr(1, r.length - 2)), (r = e.stylize(r, 'name')))
        : ((r = r
            .replace(/'/g, "\\'")
            .replace(/\\"/g, '"')
            .replace(/(^"|"$)/g, "'")),
          (r = e.stylize(r, 'string')));
    }
    return r + ': ' + s;
  }
  function reduceToSingleString(e, a, o) {
    return e.reduce(function(e, a) {
      return a.indexOf('\n'), e + a.replace(/\u001b\[\d\d?m/g, '').length + 1;
    }, 0) > 60
      ? o[0] + ('' === a ? '' : a + '\n ') + ' ' + e.join(',\n  ') + ' ' + o[1]
      : o[0] + a + ' ' + e.join(', ') + ' ' + o[1];
  }
  function isArray$2(e) {
    return Array.isArray(e);
  }
  function isBoolean(e) {
    return 'boolean' == typeof e;
  }
  function isNull(e) {
    return null === e;
  }
  function isNullOrUndefined(e) {
    return null == e;
  }
  function isNumber$1(e) {
    return 'number' == typeof e;
  }
  function isString$1(e) {
    return 'string' == typeof e;
  }
  function isSymbol(e) {
    return 'symbol' == typeof e;
  }
  function isUndefined$1(e) {
    return void 0 === e;
  }
  function isRegExp(e) {
    return isObject$1(e) && '[object RegExp]' === objectToString(e);
  }
  function isObject$1(e) {
    return 'object' == typeof e && null !== e;
  }
  function isDate$1(e) {
    return isObject$1(e) && '[object Date]' === objectToString(e);
  }
  function isError(e) {
    return (
      isObject$1(e) &&
      ('[object Error]' === objectToString(e) || e instanceof Error)
    );
  }
  function isFunction$2(e) {
    return 'function' == typeof e;
  }
  function isPrimitive(e) {
    return (
      null === e ||
      'boolean' == typeof e ||
      'number' == typeof e ||
      'string' == typeof e ||
      'symbol' == typeof e ||
      void 0 === e
    );
  }
  function isBuffer$2(e) {
    return isBuffer$1(e);
  }
  function objectToString(e) {
    return Object.prototype.toString.call(e);
  }
  function pad(e) {
    return e < 10 ? '0' + e.toString(10) : e.toString(10);
  }
  (inspect.colors = {
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
  }),
    (inspect.styles = {
      special: 'cyan',
      number: 'yellow',
      boolean: 'yellow',
      undefined: 'grey',
      null: 'bold',
      string: 'green',
      date: 'magenta',
      regexp: 'red'
    });
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
  function timestamp() {
    var e = new Date(),
      a = [pad(e.getHours()), pad(e.getMinutes()), pad(e.getSeconds())].join(
        ':'
      );
    return [e.getDate(), months[e.getMonth()], a].join(' ');
  }
  function log() {
    console.log('%s - %s', timestamp(), format.apply(null, arguments));
  }
  function _extend(e, a) {
    if (!a || !isObject$1(a)) return e;
    for (var o = Object.keys(a), t = o.length; t--; ) e[o[t]] = a[o[t]];
    return e;
  }
  function hasOwnProperty(e, a) {
    return Object.prototype.hasOwnProperty.call(e, a);
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
    },
    domain;
  function EventHandlers() {}
  function EventEmitter() {
    EventEmitter.init.call(this);
  }
  function $getMaxListeners(e) {
    return void 0 === e._maxListeners
      ? EventEmitter.defaultMaxListeners
      : e._maxListeners;
  }
  function emitNone(e, a, o) {
    if (a) e.call(o);
    else
      for (var t = e.length, i = arrayClone(e, t), n = 0; n < t; ++n)
        i[n].call(o);
  }
  function emitOne(e, a, o, t) {
    if (a) e.call(o, t);
    else
      for (var i = e.length, n = arrayClone(e, i), r = 0; r < i; ++r)
        n[r].call(o, t);
  }
  function emitTwo(e, a, o, t, i) {
    if (a) e.call(o, t, i);
    else
      for (var n = e.length, r = arrayClone(e, n), s = 0; s < n; ++s)
        r[s].call(o, t, i);
  }
  function emitThree(e, a, o, t, i, n) {
    if (a) e.call(o, t, i, n);
    else
      for (var r = e.length, s = arrayClone(e, r), u = 0; u < r; ++u)
        s[u].call(o, t, i, n);
  }
  function emitMany(e, a, o, t) {
    if (a) e.apply(o, t);
    else
      for (var i = e.length, n = arrayClone(e, i), r = 0; r < i; ++r)
        n[r].apply(o, t);
  }
  function _addListener(e, a, o, t) {
    var i, n, r;
    if ('function' != typeof o)
      throw new TypeError('"listener" argument must be a function');
    if (
      ((n = e._events)
        ? (n.newListener &&
            (e.emit('newListener', a, o.listener ? o.listener : o),
            (n = e._events)),
          (r = n[a]))
        : ((n = e._events = new EventHandlers()), (e._eventsCount = 0)),
      r)
    ) {
      if (
        ('function' == typeof r
          ? (r = n[a] = t ? [o, r] : [r, o])
          : t
          ? r.unshift(o)
          : r.push(o),
        !r.warned && (i = $getMaxListeners(e)) && i > 0 && r.length > i)
      ) {
        r.warned = !0;
        var s = new Error(
          'Possible EventEmitter memory leak detected. ' +
            r.length +
            ' ' +
            a +
            ' listeners added. Use emitter.setMaxListeners() to increase limit'
        );
        (s.name = 'MaxListenersExceededWarning'),
          (s.emitter = e),
          (s.type = a),
          (s.count = r.length),
          emitWarning(s);
      }
    } else (r = n[a] = o), ++e._eventsCount;
    return e;
  }
  function emitWarning(e) {
    'function' == typeof console.warn ? console.warn(e) : console.log(e);
  }
  function _onceWrap(e, a, o) {
    var t = !1;
    function i() {
      e.removeListener(a, i), t || ((t = !0), o.apply(e, arguments));
    }
    return (i.listener = o), i;
  }
  function listenerCount(e) {
    var a = this._events;
    if (a) {
      var o = a[e];
      if ('function' == typeof o) return 1;
      if (o) return o.length;
    }
    return 0;
  }
  function spliceOne(e, a) {
    for (var o = a, t = o + 1, i = e.length; t < i; o += 1, t += 1) e[o] = e[t];
    e.pop();
  }
  function arrayClone(e, a) {
    for (var o = new Array(a); a--; ) o[a] = e[a];
    return o;
  }
  function unwrapListeners(e) {
    for (var a = new Array(e.length), o = 0; o < a.length; ++o)
      a[o] = e[o].listener || e[o];
    return a;
  }
  function BufferList() {
    (this.head = null), (this.tail = null), (this.length = 0);
  }
  (EventHandlers.prototype = Object.create(null)),
    (EventEmitter.EventEmitter = EventEmitter),
    (EventEmitter.usingDomains = !1),
    (EventEmitter.prototype.domain = void 0),
    (EventEmitter.prototype._events = void 0),
    (EventEmitter.prototype._maxListeners = void 0),
    (EventEmitter.defaultMaxListeners = 10),
    (EventEmitter.init = function() {
      (this.domain = null),
        EventEmitter.usingDomains && domain.active && domain.Domain,
        (this._events &&
          this._events !== Object.getPrototypeOf(this)._events) ||
          ((this._events = new EventHandlers()), (this._eventsCount = 0)),
        (this._maxListeners = this._maxListeners || void 0);
    }),
    (EventEmitter.prototype.setMaxListeners = function(e) {
      if ('number' != typeof e || e < 0 || isNaN(e))
        throw new TypeError('"n" argument must be a positive number');
      return (this._maxListeners = e), this;
    }),
    (EventEmitter.prototype.getMaxListeners = function() {
      return $getMaxListeners(this);
    }),
    (EventEmitter.prototype.emit = function(e) {
      var a,
        o,
        t,
        i,
        n,
        r,
        s,
        u = 'error' === e;
      if ((r = this._events)) u = u && null == r.error;
      else if (!u) return !1;
      if (((s = this.domain), u)) {
        if (((a = arguments[1]), !s)) {
          if (a instanceof Error) throw a;
          var m = new Error('Uncaught, unspecified "error" event. (' + a + ')');
          throw ((m.context = a), m);
        }
        return (
          a || (a = new Error('Uncaught, unspecified "error" event')),
          (a.domainEmitter = this),
          (a.domain = s),
          (a.domainThrown = !1),
          s.emit('error', a),
          !1
        );
      }
      if (!(o = r[e])) return !1;
      var c = 'function' == typeof o;
      switch ((t = arguments.length)) {
        case 1:
          emitNone(o, c, this);
          break;
        case 2:
          emitOne(o, c, this, arguments[1]);
          break;
        case 3:
          emitTwo(o, c, this, arguments[1], arguments[2]);
          break;
        case 4:
          emitThree(o, c, this, arguments[1], arguments[2], arguments[3]);
          break;
        default:
          for (i = new Array(t - 1), n = 1; n < t; n++) i[n - 1] = arguments[n];
          emitMany(o, c, this, i);
      }
      return !0;
    }),
    (EventEmitter.prototype.addListener = function(e, a) {
      return _addListener(this, e, a, !1);
    }),
    (EventEmitter.prototype.on = EventEmitter.prototype.addListener),
    (EventEmitter.prototype.prependListener = function(e, a) {
      return _addListener(this, e, a, !0);
    }),
    (EventEmitter.prototype.once = function(e, a) {
      if ('function' != typeof a)
        throw new TypeError('"listener" argument must be a function');
      return this.on(e, _onceWrap(this, e, a)), this;
    }),
    (EventEmitter.prototype.prependOnceListener = function(e, a) {
      if ('function' != typeof a)
        throw new TypeError('"listener" argument must be a function');
      return this.prependListener(e, _onceWrap(this, e, a)), this;
    }),
    (EventEmitter.prototype.removeListener = function(e, a) {
      var o, t, i, n, r;
      if ('function' != typeof a)
        throw new TypeError('"listener" argument must be a function');
      if (!(t = this._events)) return this;
      if (!(o = t[e])) return this;
      if (o === a || (o.listener && o.listener === a))
        0 == --this._eventsCount
          ? (this._events = new EventHandlers())
          : (delete t[e],
            t.removeListener &&
              this.emit('removeListener', e, o.listener || a));
      else if ('function' != typeof o) {
        for (i = -1, n = o.length; n-- > 0; )
          if (o[n] === a || (o[n].listener && o[n].listener === a)) {
            (r = o[n].listener), (i = n);
            break;
          }
        if (i < 0) return this;
        if (1 === o.length) {
          if (((o[0] = void 0), 0 == --this._eventsCount))
            return (this._events = new EventHandlers()), this;
          delete t[e];
        } else spliceOne(o, i);
        t.removeListener && this.emit('removeListener', e, r || a);
      }
      return this;
    }),
    (EventEmitter.prototype.removeAllListeners = function(e) {
      var a, o;
      if (!(o = this._events)) return this;
      if (!o.removeListener)
        return (
          0 === arguments.length
            ? ((this._events = new EventHandlers()), (this._eventsCount = 0))
            : o[e] &&
              (0 == --this._eventsCount
                ? (this._events = new EventHandlers())
                : delete o[e]),
          this
        );
      if (0 === arguments.length) {
        for (var t, i = Object.keys(o), n = 0; n < i.length; ++n)
          'removeListener' !== (t = i[n]) && this.removeAllListeners(t);
        return (
          this.removeAllListeners('removeListener'),
          (this._events = new EventHandlers()),
          (this._eventsCount = 0),
          this
        );
      }
      if ('function' == typeof (a = o[e])) this.removeListener(e, a);
      else if (a)
        do {
          this.removeListener(e, a[a.length - 1]);
        } while (a[0]);
      return this;
    }),
    (EventEmitter.prototype.listeners = function(e) {
      var a,
        o = this._events;
      return o && (a = o[e])
        ? 'function' == typeof a
          ? [a.listener || a]
          : unwrapListeners(a)
        : [];
    }),
    (EventEmitter.listenerCount = function(e, a) {
      return 'function' == typeof e.listenerCount
        ? e.listenerCount(a)
        : listenerCount.call(e, a);
    }),
    (EventEmitter.prototype.listenerCount = listenerCount),
    (EventEmitter.prototype.eventNames = function() {
      return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
    }),
    (BufferList.prototype.push = function(e) {
      var a = { data: e, next: null };
      this.length > 0 ? (this.tail.next = a) : (this.head = a),
        (this.tail = a),
        ++this.length;
    }),
    (BufferList.prototype.unshift = function(e) {
      var a = { data: e, next: this.head };
      0 === this.length && (this.tail = a), (this.head = a), ++this.length;
    }),
    (BufferList.prototype.shift = function() {
      if (0 !== this.length) {
        var e = this.head.data;
        return (
          1 === this.length
            ? (this.head = this.tail = null)
            : (this.head = this.head.next),
          --this.length,
          e
        );
      }
    }),
    (BufferList.prototype.clear = function() {
      (this.head = this.tail = null), (this.length = 0);
    }),
    (BufferList.prototype.join = function(e) {
      if (0 === this.length) return '';
      for (var a = this.head, o = '' + a.data; (a = a.next); ) o += e + a.data;
      return o;
    }),
    (BufferList.prototype.concat = function(e) {
      if (0 === this.length) return Buffer.alloc(0);
      if (1 === this.length) return this.head.data;
      for (var a = Buffer.allocUnsafe(e >>> 0), o = this.head, t = 0; o; )
        o.data.copy(a, t), (t += o.data.length), (o = o.next);
      return a;
    });
  var isBufferEncoding =
    Buffer.isEncoding ||
    function(e) {
      switch (e && e.toLowerCase()) {
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
          return !0;
        default:
          return !1;
      }
    };
  function assertEncoding(e) {
    if (e && !isBufferEncoding(e)) throw new Error('Unknown encoding: ' + e);
  }
  function StringDecoder(e) {
    switch (
      ((this.encoding = (e || 'utf8').toLowerCase().replace(/[-_]/, '')),
      assertEncoding(e),
      this.encoding)
    ) {
      case 'utf8':
        this.surrogateSize = 3;
        break;
      case 'ucs2':
      case 'utf16le':
        (this.surrogateSize = 2),
          (this.detectIncompleteChar = utf16DetectIncompleteChar);
        break;
      case 'base64':
        (this.surrogateSize = 3),
          (this.detectIncompleteChar = base64DetectIncompleteChar);
        break;
      default:
        return void (this.write = passThroughWrite);
    }
    (this.charBuffer = new Buffer(6)),
      (this.charReceived = 0),
      (this.charLength = 0);
  }
  function passThroughWrite(e) {
    return e.toString(this.encoding);
  }
  function utf16DetectIncompleteChar(e) {
    (this.charReceived = e.length % 2),
      (this.charLength = this.charReceived ? 2 : 0);
  }
  function base64DetectIncompleteChar(e) {
    (this.charReceived = e.length % 3),
      (this.charLength = this.charReceived ? 3 : 0);
  }
  (StringDecoder.prototype.write = function(e) {
    for (var a = ''; this.charLength; ) {
      var o =
        e.length >= this.charLength - this.charReceived
          ? this.charLength - this.charReceived
          : e.length;
      if (
        (e.copy(this.charBuffer, this.charReceived, 0, o),
        (this.charReceived += o),
        this.charReceived < this.charLength)
      )
        return '';
      if (
        ((e = e.slice(o, e.length)),
        !(
          (i = (a = this.charBuffer
            .slice(0, this.charLength)
            .toString(this.encoding)).charCodeAt(a.length - 1)) >= 55296 &&
          i <= 56319
        ))
      ) {
        if (((this.charReceived = this.charLength = 0), 0 === e.length))
          return a;
        break;
      }
      (this.charLength += this.surrogateSize), (a = '');
    }
    this.detectIncompleteChar(e);
    var t = e.length;
    this.charLength &&
      (e.copy(this.charBuffer, 0, e.length - this.charReceived, t),
      (t -= this.charReceived));
    var i;
    t = (a += e.toString(this.encoding, 0, t)).length - 1;
    if ((i = a.charCodeAt(t)) >= 55296 && i <= 56319) {
      var n = this.surrogateSize;
      return (
        (this.charLength += n),
        (this.charReceived += n),
        this.charBuffer.copy(this.charBuffer, n, 0, n),
        e.copy(this.charBuffer, 0, 0, n),
        a.substring(0, t)
      );
    }
    return a;
  }),
    (StringDecoder.prototype.detectIncompleteChar = function(e) {
      for (var a = e.length >= 3 ? 3 : e.length; a > 0; a--) {
        var o = e[e.length - a];
        if (1 == a && o >> 5 == 6) {
          this.charLength = 2;
          break;
        }
        if (a <= 2 && o >> 4 == 14) {
          this.charLength = 3;
          break;
        }
        if (a <= 3 && o >> 3 == 30) {
          this.charLength = 4;
          break;
        }
      }
      this.charReceived = a;
    }),
    (StringDecoder.prototype.end = function(e) {
      var a = '';
      if ((e && e.length && (a = this.write(e)), this.charReceived)) {
        var o = this.charReceived,
          t = this.charBuffer,
          i = this.encoding;
        a += t.slice(0, o).toString(i);
      }
      return a;
    }),
    (Readable.ReadableState = ReadableState);
  var debug = debuglog('stream');
  function prependListener(e, a, o) {
    if ('function' == typeof e.prependListener) return e.prependListener(a, o);
    e._events && e._events[a]
      ? Array.isArray(e._events[a])
        ? e._events[a].unshift(o)
        : (e._events[a] = [o, e._events[a]])
      : e.on(a, o);
  }
  function listenerCount$1(e, a) {
    return e.listeners(a).length;
  }
  function ReadableState(e, a) {
    (e = e || {}),
      (this.objectMode = !!e.objectMode),
      a instanceof Duplex &&
        (this.objectMode = this.objectMode || !!e.readableObjectMode);
    var o = e.highWaterMark,
      t = this.objectMode ? 16 : 16384;
    (this.highWaterMark = o || 0 === o ? o : t),
      (this.highWaterMark = ~~this.highWaterMark),
      (this.buffer = new BufferList()),
      (this.length = 0),
      (this.pipes = null),
      (this.pipesCount = 0),
      (this.flowing = null),
      (this.ended = !1),
      (this.endEmitted = !1),
      (this.reading = !1),
      (this.sync = !0),
      (this.needReadable = !1),
      (this.emittedReadable = !1),
      (this.readableListening = !1),
      (this.resumeScheduled = !1),
      (this.defaultEncoding = e.defaultEncoding || 'utf8'),
      (this.ranOut = !1),
      (this.awaitDrain = 0),
      (this.readingMore = !1),
      (this.decoder = null),
      (this.encoding = null),
      e.encoding &&
        ((this.decoder = new StringDecoder(e.encoding)),
        (this.encoding = e.encoding));
  }
  function Readable(e) {
    if (!(this instanceof Readable)) return new Readable(e);
    (this._readableState = new ReadableState(e, this)),
      (this.readable = !0),
      e && 'function' == typeof e.read && (this._read = e.read),
      EventEmitter.call(this);
  }
  function readableAddChunk(e, a, o, t, i) {
    var n = chunkInvalid(a, o);
    if (n) e.emit('error', n);
    else if (null === o) (a.reading = !1), onEofChunk(e, a);
    else if (a.objectMode || (o && o.length > 0))
      if (a.ended && !i) {
        var r = new Error('stream.push() after EOF');
        e.emit('error', r);
      } else if (a.endEmitted && i) {
        var s = new Error('stream.unshift() after end event');
        e.emit('error', s);
      } else {
        var u;
        !a.decoder ||
          i ||
          t ||
          ((o = a.decoder.write(o)), (u = !a.objectMode && 0 === o.length)),
          i || (a.reading = !1),
          u ||
            (a.flowing && 0 === a.length && !a.sync
              ? (e.emit('data', o), e.read(0))
              : ((a.length += a.objectMode ? 1 : o.length),
                i ? a.buffer.unshift(o) : a.buffer.push(o),
                a.needReadable && emitReadable(e))),
          maybeReadMore(e, a);
      }
    else i || (a.reading = !1);
    return needMoreData(a);
  }
  function needMoreData(e) {
    return (
      !e.ended &&
      (e.needReadable || e.length < e.highWaterMark || 0 === e.length)
    );
  }
  inherits$1(Readable, EventEmitter),
    (Readable.prototype.push = function(e, a) {
      var o = this._readableState;
      return (
        o.objectMode ||
          'string' != typeof e ||
          ((a = a || o.defaultEncoding) !== o.encoding &&
            ((e = Buffer.from(e, a)), (a = ''))),
        readableAddChunk(this, o, e, a, !1)
      );
    }),
    (Readable.prototype.unshift = function(e) {
      return readableAddChunk(this, this._readableState, e, '', !0);
    }),
    (Readable.prototype.isPaused = function() {
      return !1 === this._readableState.flowing;
    }),
    (Readable.prototype.setEncoding = function(e) {
      return (
        (this._readableState.decoder = new StringDecoder(e)),
        (this._readableState.encoding = e),
        this
      );
    });
  var MAX_HWM = 8388608;
  function computeNewHighWaterMark(e) {
    return (
      e >= MAX_HWM
        ? (e = MAX_HWM)
        : (e--,
          (e |= e >>> 1),
          (e |= e >>> 2),
          (e |= e >>> 4),
          (e |= e >>> 8),
          (e |= e >>> 16),
          e++),
      e
    );
  }
  function howMuchToRead(e, a) {
    return e <= 0 || (0 === a.length && a.ended)
      ? 0
      : a.objectMode
      ? 1
      : e != e
      ? a.flowing && a.length
        ? a.buffer.head.data.length
        : a.length
      : (e > a.highWaterMark && (a.highWaterMark = computeNewHighWaterMark(e)),
        e <= a.length ? e : a.ended ? a.length : ((a.needReadable = !0), 0));
  }
  function chunkInvalid(e, a) {
    var o = null;
    return (
      isBuffer$1(a) ||
        'string' == typeof a ||
        null == a ||
        e.objectMode ||
        (o = new TypeError('Invalid non-string/buffer chunk')),
      o
    );
  }
  function onEofChunk(e, a) {
    if (!a.ended) {
      if (a.decoder) {
        var o = a.decoder.end();
        o &&
          o.length &&
          (a.buffer.push(o), (a.length += a.objectMode ? 1 : o.length));
      }
      (a.ended = !0), emitReadable(e);
    }
  }
  function emitReadable(e) {
    var a = e._readableState;
    (a.needReadable = !1),
      a.emittedReadable ||
        (debug('emitReadable', a.flowing),
        (a.emittedReadable = !0),
        a.sync ? nextTick(emitReadable_, e) : emitReadable_(e));
  }
  function emitReadable_(e) {
    debug('emit readable'), e.emit('readable'), flow(e);
  }
  function maybeReadMore(e, a) {
    a.readingMore || ((a.readingMore = !0), nextTick(maybeReadMore_, e, a));
  }
  function maybeReadMore_(e, a) {
    for (
      var o = a.length;
      !a.reading &&
      !a.flowing &&
      !a.ended &&
      a.length < a.highWaterMark &&
      (debug('maybeReadMore read 0'), e.read(0), o !== a.length);

    )
      o = a.length;
    a.readingMore = !1;
  }
  function pipeOnDrain(e) {
    return function() {
      var a = e._readableState;
      debug('pipeOnDrain', a.awaitDrain),
        a.awaitDrain && a.awaitDrain--,
        0 === a.awaitDrain &&
          e.listeners('data').length &&
          ((a.flowing = !0), flow(e));
    };
  }
  function nReadingNextTick(e) {
    debug('readable nexttick read 0'), e.read(0);
  }
  function resume(e, a) {
    a.resumeScheduled || ((a.resumeScheduled = !0), nextTick(resume_, e, a));
  }
  function resume_(e, a) {
    a.reading || (debug('resume read 0'), e.read(0)),
      (a.resumeScheduled = !1),
      (a.awaitDrain = 0),
      e.emit('resume'),
      flow(e),
      a.flowing && !a.reading && e.read(0);
  }
  function flow(e) {
    var a = e._readableState;
    for (debug('flow', a.flowing); a.flowing && null !== e.read(); );
  }
  function fromList(e, a) {
    return 0 === a.length
      ? null
      : (a.objectMode
          ? (o = a.buffer.shift())
          : !e || e >= a.length
          ? ((o = a.decoder
              ? a.buffer.join('')
              : 1 === a.buffer.length
              ? a.buffer.head.data
              : a.buffer.concat(a.length)),
            a.buffer.clear())
          : (o = fromListPartial(e, a.buffer, a.decoder)),
        o);
    var o;
  }
  function fromListPartial(e, a, o) {
    var t;
    return (
      e < a.head.data.length
        ? ((t = a.head.data.slice(0, e)), (a.head.data = a.head.data.slice(e)))
        : (t =
            e === a.head.data.length
              ? a.shift()
              : o
              ? copyFromBufferString(e, a)
              : copyFromBuffer(e, a)),
      t
    );
  }
  function copyFromBufferString(e, a) {
    var o = a.head,
      t = 1,
      i = o.data;
    for (e -= i.length; (o = o.next); ) {
      var n = o.data,
        r = e > n.length ? n.length : e;
      if ((r === n.length ? (i += n) : (i += n.slice(0, e)), 0 === (e -= r))) {
        r === n.length
          ? (++t, o.next ? (a.head = o.next) : (a.head = a.tail = null))
          : ((a.head = o), (o.data = n.slice(r)));
        break;
      }
      ++t;
    }
    return (a.length -= t), i;
  }
  function copyFromBuffer(e, a) {
    var o = Buffer.allocUnsafe(e),
      t = a.head,
      i = 1;
    for (t.data.copy(o), e -= t.data.length; (t = t.next); ) {
      var n = t.data,
        r = e > n.length ? n.length : e;
      if ((n.copy(o, o.length - e, 0, r), 0 === (e -= r))) {
        r === n.length
          ? (++i, t.next ? (a.head = t.next) : (a.head = a.tail = null))
          : ((a.head = t), (t.data = n.slice(r)));
        break;
      }
      ++i;
    }
    return (a.length -= i), o;
  }
  function endReadable(e) {
    var a = e._readableState;
    if (a.length > 0)
      throw new Error('"endReadable()" called on non-empty stream');
    a.endEmitted || ((a.ended = !0), nextTick(endReadableNT, a, e));
  }
  function endReadableNT(e, a) {
    e.endEmitted ||
      0 !== e.length ||
      ((e.endEmitted = !0), (a.readable = !1), a.emit('end'));
  }
  function forEach$1(e, a) {
    for (var o = 0, t = e.length; o < t; o++) a(e[o], o);
  }
  function indexOf(e, a) {
    for (var o = 0, t = e.length; o < t; o++) if (e[o] === a) return o;
    return -1;
  }
  function nop() {}
  function WriteReq(e, a, o) {
    (this.chunk = e),
      (this.encoding = a),
      (this.callback = o),
      (this.next = null);
  }
  function WritableState(e, a) {
    Object.defineProperty(this, 'buffer', {
      get: deprecate(function() {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer instead.')
    }),
      (e = e || {}),
      (this.objectMode = !!e.objectMode),
      a instanceof Duplex &&
        (this.objectMode = this.objectMode || !!e.writableObjectMode);
    var o = e.highWaterMark,
      t = this.objectMode ? 16 : 16384;
    (this.highWaterMark = o || 0 === o ? o : t),
      (this.highWaterMark = ~~this.highWaterMark),
      (this.needDrain = !1),
      (this.ending = !1),
      (this.ended = !1),
      (this.finished = !1);
    var i = !1 === e.decodeStrings;
    (this.decodeStrings = !i),
      (this.defaultEncoding = e.defaultEncoding || 'utf8'),
      (this.length = 0),
      (this.writing = !1),
      (this.corked = 0),
      (this.sync = !0),
      (this.bufferProcessing = !1),
      (this.onwrite = function(e) {
        onwrite(a, e);
      }),
      (this.writecb = null),
      (this.writelen = 0),
      (this.bufferedRequest = null),
      (this.lastBufferedRequest = null),
      (this.pendingcb = 0),
      (this.prefinished = !1),
      (this.errorEmitted = !1),
      (this.bufferedRequestCount = 0),
      (this.corkedRequestsFree = new CorkedRequest(this));
  }
  function Writable(e) {
    if (!(this instanceof Writable || this instanceof Duplex))
      return new Writable(e);
    (this._writableState = new WritableState(e, this)),
      (this.writable = !0),
      e &&
        ('function' == typeof e.write && (this._write = e.write),
        'function' == typeof e.writev && (this._writev = e.writev)),
      EventEmitter.call(this);
  }
  function writeAfterEnd(e, a) {
    var o = new Error('write after end');
    e.emit('error', o), nextTick(a, o);
  }
  function validChunk(e, a, o, t) {
    var i = !0,
      n = !1;
    return (
      null === o
        ? (n = new TypeError('May not write null values to stream'))
        : Buffer.isBuffer(o) ||
          'string' == typeof o ||
          void 0 === o ||
          a.objectMode ||
          (n = new TypeError('Invalid non-string/buffer chunk')),
      n && (e.emit('error', n), nextTick(t, n), (i = !1)),
      i
    );
  }
  function decodeChunk(e, a, o) {
    return (
      e.objectMode ||
        !1 === e.decodeStrings ||
        'string' != typeof a ||
        (a = Buffer.from(a, o)),
      a
    );
  }
  function writeOrBuffer(e, a, o, t, i) {
    (o = decodeChunk(a, o, t)), Buffer.isBuffer(o) && (t = 'buffer');
    var n = a.objectMode ? 1 : o.length;
    a.length += n;
    var r = a.length < a.highWaterMark;
    if ((r || (a.needDrain = !0), a.writing || a.corked)) {
      var s = a.lastBufferedRequest;
      (a.lastBufferedRequest = new WriteReq(o, t, i)),
        s
          ? (s.next = a.lastBufferedRequest)
          : (a.bufferedRequest = a.lastBufferedRequest),
        (a.bufferedRequestCount += 1);
    } else doWrite(e, a, !1, n, o, t, i);
    return r;
  }
  function doWrite(e, a, o, t, i, n, r) {
    (a.writelen = t),
      (a.writecb = r),
      (a.writing = !0),
      (a.sync = !0),
      o ? e._writev(i, a.onwrite) : e._write(i, n, a.onwrite),
      (a.sync = !1);
  }
  function onwriteError(e, a, o, t, i) {
    --a.pendingcb,
      o ? nextTick(i, t) : i(t),
      (e._writableState.errorEmitted = !0),
      e.emit('error', t);
  }
  function onwriteStateUpdate(e) {
    (e.writing = !1),
      (e.writecb = null),
      (e.length -= e.writelen),
      (e.writelen = 0);
  }
  function onwrite(e, a) {
    var o = e._writableState,
      t = o.sync,
      i = o.writecb;
    if ((onwriteStateUpdate(o), a)) onwriteError(e, o, t, a, i);
    else {
      var n = needFinish(o);
      n ||
        o.corked ||
        o.bufferProcessing ||
        !o.bufferedRequest ||
        clearBuffer(e, o),
        t ? nextTick(afterWrite, e, o, n, i) : afterWrite(e, o, n, i);
    }
  }
  function afterWrite(e, a, o, t) {
    o || onwriteDrain(e, a), a.pendingcb--, t(), finishMaybe(e, a);
  }
  function onwriteDrain(e, a) {
    0 === a.length && a.needDrain && ((a.needDrain = !1), e.emit('drain'));
  }
  function clearBuffer(e, a) {
    a.bufferProcessing = !0;
    var o = a.bufferedRequest;
    if (e._writev && o && o.next) {
      var t = a.bufferedRequestCount,
        i = new Array(t),
        n = a.corkedRequestsFree;
      n.entry = o;
      for (var r = 0; o; ) (i[r] = o), (o = o.next), (r += 1);
      doWrite(e, a, !0, a.length, i, '', n.finish),
        a.pendingcb++,
        (a.lastBufferedRequest = null),
        n.next
          ? ((a.corkedRequestsFree = n.next), (n.next = null))
          : (a.corkedRequestsFree = new CorkedRequest(a));
    } else {
      for (; o; ) {
        var s = o.chunk,
          u = o.encoding,
          m = o.callback;
        if (
          (doWrite(e, a, !1, a.objectMode ? 1 : s.length, s, u, m),
          (o = o.next),
          a.writing)
        )
          break;
      }
      null === o && (a.lastBufferedRequest = null);
    }
    (a.bufferedRequestCount = 0),
      (a.bufferedRequest = o),
      (a.bufferProcessing = !1);
  }
  function needFinish(e) {
    return (
      e.ending &&
      0 === e.length &&
      null === e.bufferedRequest &&
      !e.finished &&
      !e.writing
    );
  }
  function prefinish(e, a) {
    a.prefinished || ((a.prefinished = !0), e.emit('prefinish'));
  }
  function finishMaybe(e, a) {
    var o = needFinish(a);
    return (
      o &&
        (0 === a.pendingcb
          ? (prefinish(e, a), (a.finished = !0), e.emit('finish'))
          : prefinish(e, a)),
      o
    );
  }
  function endWritable(e, a, o) {
    (a.ending = !0),
      finishMaybe(e, a),
      o && (a.finished ? nextTick(o) : e.once('finish', o)),
      (a.ended = !0),
      (e.writable = !1);
  }
  function CorkedRequest(e) {
    var a = this;
    (this.next = null),
      (this.entry = null),
      (this.finish = function(o) {
        var t = a.entry;
        for (a.entry = null; t; ) {
          var i = t.callback;
          e.pendingcb--, i(o), (t = t.next);
        }
        e.corkedRequestsFree
          ? (e.corkedRequestsFree.next = a)
          : (e.corkedRequestsFree = a);
      });
  }
  (Readable.prototype.read = function(e) {
    debug('read', e), (e = parseInt(e, 10));
    var a = this._readableState,
      o = e;
    if (
      (0 !== e && (a.emittedReadable = !1),
      0 === e && a.needReadable && (a.length >= a.highWaterMark || a.ended))
    )
      return (
        debug('read: emitReadable', a.length, a.ended),
        0 === a.length && a.ended ? endReadable(this) : emitReadable(this),
        null
      );
    if (0 === (e = howMuchToRead(e, a)) && a.ended)
      return 0 === a.length && endReadable(this), null;
    var t,
      i = a.needReadable;
    return (
      debug('need readable', i),
      (0 === a.length || a.length - e < a.highWaterMark) &&
        debug('length less than watermark', (i = !0)),
      a.ended || a.reading
        ? debug('reading or ended', (i = !1))
        : i &&
          (debug('do read'),
          (a.reading = !0),
          (a.sync = !0),
          0 === a.length && (a.needReadable = !0),
          this._read(a.highWaterMark),
          (a.sync = !1),
          a.reading || (e = howMuchToRead(o, a))),
      null === (t = e > 0 ? fromList(e, a) : null)
        ? ((a.needReadable = !0), (e = 0))
        : (a.length -= e),
      0 === a.length &&
        (a.ended || (a.needReadable = !0),
        o !== e && a.ended && endReadable(this)),
      null !== t && this.emit('data', t),
      t
    );
  }),
    (Readable.prototype._read = function(e) {
      this.emit('error', new Error('not implemented'));
    }),
    (Readable.prototype.pipe = function(e, a) {
      var o = this,
        t = this._readableState;
      switch (t.pipesCount) {
        case 0:
          t.pipes = e;
          break;
        case 1:
          t.pipes = [t.pipes, e];
          break;
        default:
          t.pipes.push(e);
      }
      (t.pipesCount += 1), debug('pipe count=%d opts=%j', t.pipesCount, a);
      var i = !a || !1 !== a.end ? r : m;
      function n(e) {
        debug('onunpipe'), e === o && m();
      }
      function r() {
        debug('onend'), e.end();
      }
      t.endEmitted ? nextTick(i) : o.once('end', i), e.on('unpipe', n);
      var s = pipeOnDrain(o);
      e.on('drain', s);
      var u = !1;
      function m() {
        debug('cleanup'),
          e.removeListener('close', h),
          e.removeListener('finish', f),
          e.removeListener('drain', s),
          e.removeListener('error', p),
          e.removeListener('unpipe', n),
          o.removeListener('end', r),
          o.removeListener('end', m),
          o.removeListener('data', l),
          (u = !0),
          !t.awaitDrain ||
            (e._writableState && !e._writableState.needDrain) ||
            s();
      }
      var c = !1;
      function l(a) {
        debug('ondata'),
          (c = !1),
          !1 !== e.write(a) ||
            c ||
            (((1 === t.pipesCount && t.pipes === e) ||
              (t.pipesCount > 1 && -1 !== indexOf(t.pipes, e))) &&
              !u &&
              (debug(
                'false write response, pause',
                o._readableState.awaitDrain
              ),
              o._readableState.awaitDrain++,
              (c = !0)),
            o.pause());
      }
      function p(a) {
        debug('onerror', a),
          g(),
          e.removeListener('error', p),
          0 === listenerCount$1(e, 'error') && e.emit('error', a);
      }
      function h() {
        e.removeListener('finish', f), g();
      }
      function f() {
        debug('onfinish'), e.removeListener('close', h), g();
      }
      function g() {
        debug('unpipe'), o.unpipe(e);
      }
      return (
        o.on('data', l),
        prependListener(e, 'error', p),
        e.once('close', h),
        e.once('finish', f),
        e.emit('pipe', o),
        t.flowing || (debug('pipe resume'), o.resume()),
        e
      );
    }),
    (Readable.prototype.unpipe = function(e) {
      var a = this._readableState;
      if (0 === a.pipesCount) return this;
      if (1 === a.pipesCount)
        return e && e !== a.pipes
          ? this
          : (e || (e = a.pipes),
            (a.pipes = null),
            (a.pipesCount = 0),
            (a.flowing = !1),
            e && e.emit('unpipe', this),
            this);
      if (!e) {
        var o = a.pipes,
          t = a.pipesCount;
        (a.pipes = null), (a.pipesCount = 0), (a.flowing = !1);
        for (var i = 0; i < t; i++) o[i].emit('unpipe', this);
        return this;
      }
      var n = indexOf(a.pipes, e);
      return -1 === n
        ? this
        : (a.pipes.splice(n, 1),
          (a.pipesCount -= 1),
          1 === a.pipesCount && (a.pipes = a.pipes[0]),
          e.emit('unpipe', this),
          this);
    }),
    (Readable.prototype.on = function(e, a) {
      var o = EventEmitter.prototype.on.call(this, e, a);
      if ('data' === e) !1 !== this._readableState.flowing && this.resume();
      else if ('readable' === e) {
        var t = this._readableState;
        t.endEmitted ||
          t.readableListening ||
          ((t.readableListening = t.needReadable = !0),
          (t.emittedReadable = !1),
          t.reading
            ? t.length && emitReadable(this)
            : nextTick(nReadingNextTick, this));
      }
      return o;
    }),
    (Readable.prototype.addListener = Readable.prototype.on),
    (Readable.prototype.resume = function() {
      var e = this._readableState;
      return (
        e.flowing || (debug('resume'), (e.flowing = !0), resume(this, e)), this
      );
    }),
    (Readable.prototype.pause = function() {
      return (
        debug('call pause flowing=%j', this._readableState.flowing),
        !1 !== this._readableState.flowing &&
          (debug('pause'),
          (this._readableState.flowing = !1),
          this.emit('pause')),
        this
      );
    }),
    (Readable.prototype.wrap = function(e) {
      var a = this._readableState,
        o = !1,
        t = this;
      for (var i in (e.on('end', function() {
        if ((debug('wrapped end'), a.decoder && !a.ended)) {
          var e = a.decoder.end();
          e && e.length && t.push(e);
        }
        t.push(null);
      }),
      e.on('data', function(i) {
        (debug('wrapped data'),
        a.decoder && (i = a.decoder.write(i)),
        a.objectMode && null == i) ||
          ((a.objectMode || (i && i.length)) &&
            (t.push(i) || ((o = !0), e.pause())));
      }),
      e))
        void 0 === this[i] &&
          'function' == typeof e[i] &&
          (this[i] = (function(a) {
            return function() {
              return e[a].apply(e, arguments);
            };
          })(i));
      return (
        forEach$1(['error', 'close', 'destroy', 'pause', 'resume'], function(
          a
        ) {
          e.on(a, t.emit.bind(t, a));
        }),
        (t._read = function(a) {
          debug('wrapped _read', a), o && ((o = !1), e.resume());
        }),
        t
      );
    }),
    (Readable._fromList = fromList),
    (Writable.WritableState = WritableState),
    inherits$1(Writable, EventEmitter),
    (WritableState.prototype.getBuffer = function() {
      for (var e = this.bufferedRequest, a = []; e; ) a.push(e), (e = e.next);
      return a;
    }),
    (Writable.prototype.pipe = function() {
      this.emit('error', new Error('Cannot pipe, not readable'));
    }),
    (Writable.prototype.write = function(e, a, o) {
      var t = this._writableState,
        i = !1;
      return (
        'function' == typeof a && ((o = a), (a = null)),
        Buffer.isBuffer(e) ? (a = 'buffer') : a || (a = t.defaultEncoding),
        'function' != typeof o && (o = nop),
        t.ended
          ? writeAfterEnd(this, o)
          : validChunk(this, t, e, o) &&
            (t.pendingcb++, (i = writeOrBuffer(this, t, e, a, o))),
        i
      );
    }),
    (Writable.prototype.cork = function() {
      this._writableState.corked++;
    }),
    (Writable.prototype.uncork = function() {
      var e = this._writableState;
      e.corked &&
        (e.corked--,
        e.writing ||
          e.corked ||
          e.finished ||
          e.bufferProcessing ||
          !e.bufferedRequest ||
          clearBuffer(this, e));
    }),
    (Writable.prototype.setDefaultEncoding = function(e) {
      if (
        ('string' == typeof e && (e = e.toLowerCase()),
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
          ].indexOf((e + '').toLowerCase()) > -1
        ))
      )
        throw new TypeError('Unknown encoding: ' + e);
      return (this._writableState.defaultEncoding = e), this;
    }),
    (Writable.prototype._write = function(e, a, o) {
      o(new Error('not implemented'));
    }),
    (Writable.prototype._writev = null),
    (Writable.prototype.end = function(e, a, o) {
      var t = this._writableState;
      'function' == typeof e
        ? ((o = e), (e = null), (a = null))
        : 'function' == typeof a && ((o = a), (a = null)),
        null != e && this.write(e, a),
        t.corked && ((t.corked = 1), this.uncork()),
        t.ending || t.finished || endWritable(this, t, o);
    }),
    inherits$1(Duplex, Readable);
  for (
    var keys = Object.keys(Writable.prototype), v = 0;
    v < keys.length;
    v++
  ) {
    var method = keys[v];
    Duplex.prototype[method] ||
      (Duplex.prototype[method] = Writable.prototype[method]);
  }
  function Duplex(e) {
    if (!(this instanceof Duplex)) return new Duplex(e);
    Readable.call(this, e),
      Writable.call(this, e),
      e && !1 === e.readable && (this.readable = !1),
      e && !1 === e.writable && (this.writable = !1),
      (this.allowHalfOpen = !0),
      e && !1 === e.allowHalfOpen && (this.allowHalfOpen = !1),
      this.once('end', onend);
  }
  function onend() {
    this.allowHalfOpen || this._writableState.ended || nextTick(onEndNT, this);
  }
  function onEndNT(e) {
    e.end();
  }
  function TransformState(e) {
    (this.afterTransform = function(a, o) {
      return afterTransform(e, a, o);
    }),
      (this.needTransform = !1),
      (this.transforming = !1),
      (this.writecb = null),
      (this.writechunk = null),
      (this.writeencoding = null);
  }
  function afterTransform(e, a, o) {
    var t = e._transformState;
    t.transforming = !1;
    var i = t.writecb;
    if (!i) return e.emit('error', new Error('no writecb in Transform class'));
    (t.writechunk = null), (t.writecb = null), null != o && e.push(o), i(a);
    var n = e._readableState;
    (n.reading = !1),
      (n.needReadable || n.length < n.highWaterMark) &&
        e._read(n.highWaterMark);
  }
  function Transform(e) {
    if (!(this instanceof Transform)) return new Transform(e);
    Duplex.call(this, e), (this._transformState = new TransformState(this));
    var a = this;
    (this._readableState.needReadable = !0),
      (this._readableState.sync = !1),
      e &&
        ('function' == typeof e.transform && (this._transform = e.transform),
        'function' == typeof e.flush && (this._flush = e.flush)),
      this.once('prefinish', function() {
        'function' == typeof this._flush
          ? this._flush(function(e) {
              done(a, e);
            })
          : done(a);
      });
  }
  function done(e, a) {
    if (a) return e.emit('error', a);
    var o = e._writableState,
      t = e._transformState;
    if (o.length) throw new Error('Calling transform done when ws.length != 0');
    if (t.transforming)
      throw new Error('Calling transform done when still transforming');
    return e.push(null);
  }
  function PassThrough(e) {
    if (!(this instanceof PassThrough)) return new PassThrough(e);
    Transform.call(this, e);
  }
  function Stream() {
    EventEmitter.call(this);
  }
  inherits$1(Transform, Duplex),
    (Transform.prototype.push = function(e, a) {
      return (
        (this._transformState.needTransform = !1),
        Duplex.prototype.push.call(this, e, a)
      );
    }),
    (Transform.prototype._transform = function(e, a, o) {
      throw new Error('Not implemented');
    }),
    (Transform.prototype._write = function(e, a, o) {
      var t = this._transformState;
      if (
        ((t.writecb = o),
        (t.writechunk = e),
        (t.writeencoding = a),
        !t.transforming)
      ) {
        var i = this._readableState;
        (t.needTransform || i.needReadable || i.length < i.highWaterMark) &&
          this._read(i.highWaterMark);
      }
    }),
    (Transform.prototype._read = function(e) {
      var a = this._transformState;
      null !== a.writechunk && a.writecb && !a.transforming
        ? ((a.transforming = !0),
          this._transform(a.writechunk, a.writeencoding, a.afterTransform))
        : (a.needTransform = !0);
    }),
    inherits$1(PassThrough, Transform),
    (PassThrough.prototype._transform = function(e, a, o) {
      o(null, e);
    }),
    inherits$1(Stream, EventEmitter),
    (Stream.Readable = Readable),
    (Stream.Writable = Writable),
    (Stream.Duplex = Duplex),
    (Stream.Transform = Transform),
    (Stream.PassThrough = PassThrough),
    (Stream.Stream = Stream),
    (Stream.prototype.pipe = function(e, a) {
      var o = this;
      function t(a) {
        e.writable && !1 === e.write(a) && o.pause && o.pause();
      }
      function i() {
        o.readable && o.resume && o.resume();
      }
      o.on('data', t),
        e.on('drain', i),
        e._isStdio || (a && !1 === a.end) || (o.on('end', r), o.on('close', s));
      var n = !1;
      function r() {
        n || ((n = !0), e.end());
      }
      function s() {
        n || ((n = !0), 'function' == typeof e.destroy && e.destroy());
      }
      function u(e) {
        if ((m(), 0 === EventEmitter.listenerCount(this, 'error'))) throw e;
      }
      function m() {
        o.removeListener('data', t),
          e.removeListener('drain', i),
          o.removeListener('end', r),
          o.removeListener('close', s),
          o.removeListener('error', u),
          e.removeListener('error', u),
          o.removeListener('end', m),
          o.removeListener('close', m),
          e.removeListener('close', m);
      }
      return (
        o.on('error', u),
        e.on('error', u),
        o.on('end', m),
        o.on('close', m),
        e.on('close', m),
        e.emit('pipe', o),
        e
      );
    });
  var rStates = {
    UNSENT: 0,
    OPENED: 1,
    HEADERS_RECEIVED: 2,
    LOADING: 3,
    DONE: 4
  };
  function IncomingMessage(e, a, o) {
    var t,
      i = this;
    if (
      (Readable.call(i),
      (i._mode = o),
      (i.headers = {}),
      (i.rawHeaders = []),
      (i.trailers = {}),
      (i.rawTrailers = []),
      i.on('end', function() {
        nextTick(function() {
          i.emit('close');
        });
      }),
      'fetch' === o)
    ) {
      (i._fetchResponse = a),
        (i.url = a.url),
        (i.statusCode = a.status),
        (i.statusMessage = a.statusText);
      for (
        var n, r, s = a.headers[Symbol.iterator]();
        (n = (r = s.next()).value), !r.done;

      )
        (i.headers[n[0].toLowerCase()] = n[1]), i.rawHeaders.push(n[0], n[1]);
      var u = a.body.getReader();
      (t = function() {
        u.read().then(function(e) {
          i._destroyed ||
            (e.done ? i.push(null) : (i.push(new Buffer(e.value)), t()));
        });
      })();
    } else {
      if (
        ((i._xhr = e),
        (i._pos = 0),
        (i.url = e.responseURL),
        (i.statusCode = e.status),
        (i.statusMessage = e.statusText),
        e
          .getAllResponseHeaders()
          .split(/\r?\n/)
          .forEach(function(e) {
            var a = e.match(/^([^:]+):\s*(.*)/);
            if (a) {
              var o = a[1].toLowerCase();
              'set-cookie' === o
                ? (void 0 === i.headers[o] && (i.headers[o] = []),
                  i.headers[o].push(a[2]))
                : void 0 !== i.headers[o]
                ? (i.headers[o] += ', ' + a[2])
                : (i.headers[o] = a[2]),
                i.rawHeaders.push(a[1], a[2]);
            }
          }),
        (i._charset = 'x-user-defined'),
        !overrideMimeType)
      ) {
        var m = i.rawHeaders['mime-type'];
        if (m) {
          var c = m.match(/;\s*charset=([^;])(;|$)/);
          c && (i._charset = c[1].toLowerCase());
        }
        i._charset || (i._charset = 'utf-8');
      }
    }
  }
  function toArrayBuffer(e) {
    if (e instanceof Uint8Array) {
      if (0 === e.byteOffset && e.byteLength === e.buffer.byteLength)
        return e.buffer;
      if ('function' == typeof e.buffer.slice)
        return e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength);
    }
    if (isBuffer$1(e)) {
      for (var a = new Uint8Array(e.length), o = e.length, t = 0; t < o; t++)
        a[t] = e[t];
      return a.buffer;
    }
    throw new Error('Argument must be a Buffer');
  }
  function decideMode(e, a) {
    return hasFetch && a
      ? 'fetch'
      : mozchunkedarraybuffer
      ? 'moz-chunked-arraybuffer'
      : msstream
      ? 'ms-stream'
      : arraybuffer && e
      ? 'arraybuffer'
      : vbArray && e
      ? 'text:vbarray'
      : 'text';
  }
  function ClientRequest(e) {
    var a,
      o = this;
    Writable.call(o),
      (o._opts = e),
      (o._body = []),
      (o._headers = {}),
      e.auth &&
        o.setHeader(
          'Authorization',
          'Basic ' + new Buffer(e.auth).toString('base64')
        ),
      Object.keys(e.headers).forEach(function(a) {
        o.setHeader(a, e.headers[a]);
      });
    var t = !0;
    if ('disable-fetch' === e.mode) (t = !1), (a = !0);
    else if ('prefer-streaming' === e.mode) a = !1;
    else if ('allow-wrong-content-type' === e.mode) a = !overrideMimeType;
    else {
      if (e.mode && 'default' !== e.mode && 'prefer-fast' !== e.mode)
        throw new Error('Invalid value for opts.mode');
      a = !0;
    }
    (o._mode = decideMode(a, t)),
      o.on('finish', function() {
        o._onFinish();
      });
  }
  inherits$1(IncomingMessage, Readable),
    (IncomingMessage.prototype._read = function() {}),
    (IncomingMessage.prototype._onXHRProgress = function() {
      var e = this,
        a = e._xhr,
        o = null;
      switch (e._mode) {
        case 'text:vbarray':
          if (a.readyState !== rStates.DONE) break;
          try {
            o = new global$1.VBArray(a.responseBody).toArray();
          } catch (e) {}
          if (null !== o) {
            e.push(new Buffer(o));
            break;
          }
        case 'text':
          try {
            o = a.responseText;
          } catch (a) {
            e._mode = 'text:vbarray';
            break;
          }
          if (o.length > e._pos) {
            var t = o.substr(e._pos);
            if ('x-user-defined' === e._charset) {
              for (var i = new Buffer(t.length), n = 0; n < t.length; n++)
                i[n] = 255 & t.charCodeAt(n);
              e.push(i);
            } else e.push(t, e._charset);
            e._pos = o.length;
          }
          break;
        case 'arraybuffer':
          if (a.readyState !== rStates.DONE || !a.response) break;
          (o = a.response), e.push(new Buffer(new Uint8Array(o)));
          break;
        case 'moz-chunked-arraybuffer':
          if (((o = a.response), a.readyState !== rStates.LOADING || !o)) break;
          e.push(new Buffer(new Uint8Array(o)));
          break;
        case 'ms-stream':
          if (((o = a.response), a.readyState !== rStates.LOADING)) break;
          var r = new global$1.MSStreamReader();
          (r.onprogress = function() {
            r.result.byteLength > e._pos &&
              (e.push(new Buffer(new Uint8Array(r.result.slice(e._pos)))),
              (e._pos = r.result.byteLength));
          }),
            (r.onload = function() {
              e.push(null);
            }),
            r.readAsArrayBuffer(o);
      }
      e._xhr.readyState === rStates.DONE &&
        'ms-stream' !== e._mode &&
        e.push(null);
    }),
    inherits$1(ClientRequest, Writable);
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
  function statusValid(e) {
    try {
      var a = e.status;
      return null !== a && 0 !== a;
    } catch (e) {
      return !1;
    }
  }
  (ClientRequest.prototype.setHeader = function(e, a) {
    var o = e.toLowerCase();
    -1 === unsafeHeaders.indexOf(o) &&
      (this._headers[o] = { name: e, value: a });
  }),
    (ClientRequest.prototype.getHeader = function(e) {
      return this._headers[e.toLowerCase()].value;
    }),
    (ClientRequest.prototype.removeHeader = function(e) {
      delete this._headers[e.toLowerCase()];
    }),
    (ClientRequest.prototype._onFinish = function() {
      var e = this;
      if (!e._destroyed) {
        var a,
          o = e._opts,
          t = e._headers;
        if (
          (('POST' !== o.method &&
            'PUT' !== o.method &&
            'PATCH' !== o.method) ||
            (a = blobConstructor()
              ? new global$1.Blob(
                  e._body.map(function(e) {
                    return toArrayBuffer(e);
                  }),
                  { type: (t['content-type'] || {}).value || '' }
                )
              : Buffer.concat(e._body).toString()),
          'fetch' === e._mode)
        ) {
          var i = Object.keys(t).map(function(e) {
            return [t[e].name, t[e].value];
          });
          global$1
            .fetch(e._opts.url, {
              method: e._opts.method,
              headers: i,
              body: a,
              mode: 'cors',
              credentials: o.withCredentials ? 'include' : 'same-origin'
            })
            .then(
              function(a) {
                (e._fetchResponse = a), e._connect();
              },
              function(a) {
                e.emit('error', a);
              }
            );
        } else {
          var n = (e._xhr = new global$1.XMLHttpRequest());
          try {
            n.open(e._opts.method, e._opts.url, !0);
          } catch (a) {
            return void nextTick(function() {
              e.emit('error', a);
            });
          }
          'responseType' in n && (n.responseType = e._mode.split(':')[0]),
            'withCredentials' in n && (n.withCredentials = !!o.withCredentials),
            'text' === e._mode &&
              'overrideMimeType' in n &&
              n.overrideMimeType('text/plain; charset=x-user-defined'),
            Object.keys(t).forEach(function(e) {
              n.setRequestHeader(t[e].name, t[e].value);
            }),
            (e._response = null),
            (n.onreadystatechange = function() {
              switch (n.readyState) {
                case rStates.LOADING:
                case rStates.DONE:
                  e._onXHRProgress();
              }
            }),
            'moz-chunked-arraybuffer' === e._mode &&
              (n.onprogress = function() {
                e._onXHRProgress();
              }),
            (n.onerror = function() {
              e._destroyed || e.emit('error', new Error('XHR error'));
            });
          try {
            n.send(a);
          } catch (a) {
            return void nextTick(function() {
              e.emit('error', a);
            });
          }
        }
      }
    }),
    (ClientRequest.prototype._onXHRProgress = function() {
      statusValid(this._xhr) &&
        !this._destroyed &&
        (this._response || this._connect(), this._response._onXHRProgress());
    }),
    (ClientRequest.prototype._connect = function() {
      this._destroyed ||
        ((this._response = new IncomingMessage(
          this._xhr,
          this._fetchResponse,
          this._mode
        )),
        this.emit('response', this._response));
    }),
    (ClientRequest.prototype._write = function(e, a, o) {
      this._body.push(e), o();
    }),
    (ClientRequest.prototype.abort = ClientRequest.prototype.destroy = function() {
      (this._destroyed = !0),
        this._response && (this._response._destroyed = !0),
        this._xhr && this._xhr.abort();
    }),
    (ClientRequest.prototype.end = function(e, a, o) {
      'function' == typeof e && ((o = e), (e = void 0)),
        Writable.prototype.end.call(this, e, a, o);
    }),
    (ClientRequest.prototype.flushHeaders = function() {}),
    (ClientRequest.prototype.setTimeout = function() {}),
    (ClientRequest.prototype.setNoDelay = function() {}),
    (ClientRequest.prototype.setSocketKeepAlive = function() {});
  var maxInt = 2147483647,
    base = 36,
    tMin = 1,
    tMax = 26,
    skew = 38,
    damp = 700,
    initialBias = 72,
    initialN = 128,
    delimiter = '-',
    regexPunycode = /^xn--/,
    regexNonASCII = /[^\x20-\x7E]/,
    regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g,
    errors = {
      overflow: 'Overflow: input needs wider integers to process',
      'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
      'invalid-input': 'Invalid input'
    },
    baseMinusTMin = base - tMin,
    floor = Math.floor,
    stringFromCharCode = String.fromCharCode;
  function error(e) {
    throw new RangeError(errors[e]);
  }
  function map(e, a) {
    for (var o = e.length, t = []; o--; ) t[o] = a(e[o]);
    return t;
  }
  function mapDomain(e, a) {
    var o = e.split('@'),
      t = '';
    return (
      o.length > 1 && ((t = o[0] + '@'), (e = o[1])),
      t + map((e = e.replace(regexSeparators, '.')).split('.'), a).join('.')
    );
  }
  function ucs2decode(e) {
    for (var a, o, t = [], i = 0, n = e.length; i < n; )
      (a = e.charCodeAt(i++)) >= 55296 && a <= 56319 && i < n
        ? 56320 == (64512 & (o = e.charCodeAt(i++)))
          ? t.push(((1023 & a) << 10) + (1023 & o) + 65536)
          : (t.push(a), i--)
        : t.push(a);
    return t;
  }
  function ucs2encode(e) {
    return map(e, function(e) {
      var a = '';
      return (
        e > 65535 &&
          ((a += stringFromCharCode((((e -= 65536) >>> 10) & 1023) | 55296)),
          (e = 56320 | (1023 & e))),
        (a += stringFromCharCode(e))
      );
    }).join('');
  }
  function basicToDigit(e) {
    return e - 48 < 10
      ? e - 22
      : e - 65 < 26
      ? e - 65
      : e - 97 < 26
      ? e - 97
      : base;
  }
  function digitToBasic(e, a) {
    return e + 22 + 75 * (e < 26) - ((0 != a) << 5);
  }
  function adapt(e, a, o) {
    var t = 0;
    for (
      e = o ? floor(e / damp) : e >> 1, e += floor(e / a);
      e > (baseMinusTMin * tMax) >> 1;
      t += base
    )
      e = floor(e / baseMinusTMin);
    return floor(t + ((baseMinusTMin + 1) * e) / (e + skew));
  }
  function decode(e) {
    var a,
      o,
      t,
      i,
      n,
      r,
      s,
      u,
      m,
      c,
      l = [],
      p = e.length,
      h = 0,
      f = initialN,
      g = initialBias;
    for ((o = e.lastIndexOf(delimiter)) < 0 && (o = 0), t = 0; t < o; ++t)
      e.charCodeAt(t) >= 128 && error('not-basic'), l.push(e.charCodeAt(t));
    for (i = o > 0 ? o + 1 : 0; i < p; ) {
      for (
        n = h, r = 1, s = base;
        i >= p && error('invalid-input'),
          ((u = basicToDigit(e.charCodeAt(i++))) >= base ||
            u > floor((maxInt - h) / r)) &&
            error('overflow'),
          (h += u * r),
          !(u < (m = s <= g ? tMin : s >= g + tMax ? tMax : s - g));
        s += base
      )
        r > floor(maxInt / (c = base - m)) && error('overflow'), (r *= c);
      (g = adapt(h - n, (a = l.length + 1), 0 == n)),
        floor(h / a) > maxInt - f && error('overflow'),
        (f += floor(h / a)),
        (h %= a),
        l.splice(h++, 0, f);
    }
    return ucs2encode(l);
  }
  function encode$1(e) {
    var a,
      o,
      t,
      i,
      n,
      r,
      s,
      u,
      m,
      c,
      l,
      p,
      h,
      f,
      g,
      d = [];
    for (
      p = (e = ucs2decode(e)).length,
        a = initialN,
        o = 0,
        n = initialBias,
        r = 0;
      r < p;
      ++r
    )
      (l = e[r]) < 128 && d.push(stringFromCharCode(l));
    for (t = i = d.length, i && d.push(delimiter); t < p; ) {
      for (s = maxInt, r = 0; r < p; ++r) (l = e[r]) >= a && l < s && (s = l);
      for (
        s - a > floor((maxInt - o) / (h = t + 1)) && error('overflow'),
          o += (s - a) * h,
          a = s,
          r = 0;
        r < p;
        ++r
      )
        if (((l = e[r]) < a && ++o > maxInt && error('overflow'), l == a)) {
          for (
            u = o, m = base;
            !(u < (c = m <= n ? tMin : m >= n + tMax ? tMax : m - n));
            m += base
          )
            (g = u - c),
              (f = base - c),
              d.push(stringFromCharCode(digitToBasic(c + (g % f), 0))),
              (u = floor(g / f));
          d.push(stringFromCharCode(digitToBasic(u, 0))),
            (n = adapt(o, h, t == i)),
            (o = 0),
            ++t;
        }
      ++o, ++a;
    }
    return d.join('');
  }
  function toUnicode(e) {
    return mapDomain(e, function(e) {
      return regexPunycode.test(e) ? decode(e.slice(4).toLowerCase()) : e;
    });
  }
  function toASCII(e) {
    return mapDomain(e, function(e) {
      return regexNonASCII.test(e) ? 'xn--' + encode$1(e) : e;
    });
  }
  var version$1 = '1.4.1',
    ucs2 = { decode: ucs2decode, encode: ucs2encode },
    require$$5 = {
      version: version$1,
      ucs2: ucs2,
      toASCII: toASCII,
      toUnicode: toUnicode,
      encode: encode$1,
      decode: decode
    };
  function hasOwnProperty$1(e, a) {
    return Object.prototype.hasOwnProperty.call(e, a);
  }
  var isArray$3 =
    Array.isArray ||
    function(e) {
      return '[object Array]' === Object.prototype.toString.call(e);
    };
  function stringifyPrimitive(e) {
    switch (typeof e) {
      case 'string':
        return e;
      case 'boolean':
        return e ? 'true' : 'false';
      case 'number':
        return isFinite(e) ? e : '';
      default:
        return '';
    }
  }
  function stringify(e, a, o, t) {
    return (
      (a = a || '&'),
      (o = o || '='),
      null === e && (e = void 0),
      'object' == typeof e
        ? map$1(objectKeys(e), function(t) {
            var i = encodeURIComponent(stringifyPrimitive(t)) + o;
            return isArray$3(e[t])
              ? map$1(e[t], function(e) {
                  return i + encodeURIComponent(stringifyPrimitive(e));
                }).join(a)
              : i + encodeURIComponent(stringifyPrimitive(e[t]));
          }).join(a)
        : t
        ? encodeURIComponent(stringifyPrimitive(t)) +
          o +
          encodeURIComponent(stringifyPrimitive(e))
        : ''
    );
  }
  function map$1(e, a) {
    if (e.map) return e.map(a);
    for (var o = [], t = 0; t < e.length; t++) o.push(a(e[t], t));
    return o;
  }
  var objectKeys =
    Object.keys ||
    function(e) {
      var a = [];
      for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && a.push(o);
      return a;
    };
  function parse(e, a, o, t) {
    (a = a || '&'), (o = o || '=');
    var i = {};
    if ('string' != typeof e || 0 === e.length) return i;
    var n = /\+/g;
    e = e.split(a);
    var r = 1e3;
    t && 'number' == typeof t.maxKeys && (r = t.maxKeys);
    var s = e.length;
    r > 0 && s > r && (s = r);
    for (var u = 0; u < s; ++u) {
      var m,
        c,
        l,
        p,
        h = e[u].replace(n, '%20'),
        f = h.indexOf(o);
      f >= 0
        ? ((m = h.substr(0, f)), (c = h.substr(f + 1)))
        : ((m = h), (c = '')),
        (l = decodeURIComponent(m)),
        (p = decodeURIComponent(c)),
        hasOwnProperty$1(i, l)
          ? isArray$3(i[l])
            ? i[l].push(p)
            : (i[l] = [i[l], p])
          : (i[l] = p);
    }
    return i;
  }
  var require$$0 = {
    parse: urlParse,
    resolve: urlResolve,
    resolveObject: urlResolveObject,
    format: urlFormat,
    Url: Url
  };
  function Url() {
    (this.protocol = null),
      (this.slashes = null),
      (this.auth = null),
      (this.host = null),
      (this.port = null),
      (this.hostname = null),
      (this.hash = null),
      (this.search = null),
      (this.query = null),
      (this.pathname = null),
      (this.path = null),
      (this.href = null);
  }
  var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),
    autoEscape = ["'"].concat(unwise),
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    unsafeProtocol = { javascript: !0, 'javascript:': !0 },
    hostlessProtocol = { javascript: !0, 'javascript:': !0 },
    slashedProtocol = {
      http: !0,
      https: !0,
      ftp: !0,
      gopher: !0,
      file: !0,
      'http:': !0,
      'https:': !0,
      'ftp:': !0,
      'gopher:': !0,
      'file:': !0
    };
  function urlParse(e, a, o) {
    if (e && isObject$1(e) && e instanceof Url) return e;
    var t = new Url();
    return t.parse(e, a, o), t;
  }
  function parse$1(e, a, o, t) {
    if (!isString$1(a))
      throw new TypeError("Parameter 'url' must be a string, not " + typeof a);
    var i = a.indexOf('?'),
      n = -1 !== i && i < a.indexOf('#') ? '?' : '#',
      r = a.split(n);
    r[0] = r[0].replace(/\\/g, '/');
    var s = (a = r.join(n));
    if (((s = s.trim()), !t && 1 === a.split('#').length)) {
      var u = simplePathPattern.exec(s);
      if (u)
        return (
          (e.path = s),
          (e.href = s),
          (e.pathname = u[1]),
          u[2]
            ? ((e.search = u[2]),
              (e.query = o ? parse(e.search.substr(1)) : e.search.substr(1)))
            : o && ((e.search = ''), (e.query = {})),
          e
        );
    }
    var m,
      c,
      l,
      p,
      h = protocolPattern.exec(s);
    if (h) {
      var f = (h = h[0]).toLowerCase();
      (e.protocol = f), (s = s.substr(h.length));
    }
    if (t || h || s.match(/^\/\/[^@\/]+@[^@\/]+/)) {
      var g = '//' === s.substr(0, 2);
      !g || (h && hostlessProtocol[h]) || ((s = s.substr(2)), (e.slashes = !0));
    }
    if (!hostlessProtocol[h] && (g || (h && !slashedProtocol[h]))) {
      var d,
        k,
        b = -1;
      for (m = 0; m < hostEndingChars.length; m++)
        -1 !== (c = s.indexOf(hostEndingChars[m])) &&
          (-1 === b || c < b) &&
          (b = c);
      for (
        -1 !== (k = -1 === b ? s.lastIndexOf('@') : s.lastIndexOf('@', b)) &&
          ((d = s.slice(0, k)),
          (s = s.slice(k + 1)),
          (e.auth = decodeURIComponent(d))),
          b = -1,
          m = 0;
        m < nonHostChars.length;
        m++
      )
        -1 !== (c = s.indexOf(nonHostChars[m])) &&
          (-1 === b || c < b) &&
          (b = c);
      -1 === b && (b = s.length),
        (e.host = s.slice(0, b)),
        (s = s.slice(b)),
        parseHost(e),
        (e.hostname = e.hostname || '');
      var y =
        '[' === e.hostname[0] && ']' === e.hostname[e.hostname.length - 1];
      if (!y) {
        var j = e.hostname.split(/\./);
        for (m = 0, l = j.length; m < l; m++) {
          var v = j[m];
          if (v && !v.match(hostnamePartPattern)) {
            for (var w = '', x = 0, z = v.length; x < z; x++)
              v.charCodeAt(x) > 127 ? (w += 'x') : (w += v[x]);
            if (!w.match(hostnamePartPattern)) {
              var C = j.slice(0, m),
                E = j.slice(m + 1),
                S = v.match(hostnamePartStart);
              S && (C.push(S[1]), E.unshift(S[2])),
                E.length && (s = '/' + E.join('.') + s),
                (e.hostname = C.join('.'));
              break;
            }
          }
        }
      }
      e.hostname.length > hostnameMaxLen
        ? (e.hostname = '')
        : (e.hostname = e.hostname.toLowerCase()),
        y || (e.hostname = toASCII(e.hostname)),
        (p = e.port ? ':' + e.port : '');
      var _ = e.hostname || '';
      (e.host = _ + p),
        (e.href += e.host),
        y &&
          ((e.hostname = e.hostname.substr(1, e.hostname.length - 2)),
          '/' !== s[0] && (s = '/' + s));
    }
    if (!unsafeProtocol[f])
      for (m = 0, l = autoEscape.length; m < l; m++) {
        var A = autoEscape[m];
        if (-1 !== s.indexOf(A)) {
          var R = encodeURIComponent(A);
          R === A && (R = escape(A)), (s = s.split(A).join(R));
        }
      }
    var T = s.indexOf('#');
    -1 !== T && ((e.hash = s.substr(T)), (s = s.slice(0, T)));
    var O = s.indexOf('?');
    if (
      (-1 !== O
        ? ((e.search = s.substr(O)),
          (e.query = s.substr(O + 1)),
          o && (e.query = parse(e.query)),
          (s = s.slice(0, O)))
        : o && ((e.search = ''), (e.query = {})),
      s && (e.pathname = s),
      slashedProtocol[f] && e.hostname && !e.pathname && (e.pathname = '/'),
      e.pathname || e.search)
    ) {
      p = e.pathname || '';
      var B = e.search || '';
      e.path = p + B;
    }
    return (e.href = format$1(e)), e;
  }
  function urlFormat(e) {
    return isString$1(e) && (e = parse$1({}, e)), format$1(e);
  }
  function format$1(e) {
    var a = e.auth || '';
    a && ((a = (a = encodeURIComponent(a)).replace(/%3A/i, ':')), (a += '@'));
    var o = e.protocol || '',
      t = e.pathname || '',
      i = e.hash || '',
      n = !1,
      r = '';
    e.host
      ? (n = a + e.host)
      : e.hostname &&
        ((n =
          a +
          (-1 === e.hostname.indexOf(':')
            ? e.hostname
            : '[' + this.hostname + ']')),
        e.port && (n += ':' + e.port)),
      e.query &&
        isObject$1(e.query) &&
        Object.keys(e.query).length &&
        (r = stringify(e.query));
    var s = e.search || (r && '?' + r) || '';
    return (
      o && ':' !== o.substr(-1) && (o += ':'),
      e.slashes || ((!o || slashedProtocol[o]) && !1 !== n)
        ? ((n = '//' + (n || '')), t && '/' !== t.charAt(0) && (t = '/' + t))
        : n || (n = ''),
      i && '#' !== i.charAt(0) && (i = '#' + i),
      s && '?' !== s.charAt(0) && (s = '?' + s),
      o +
        n +
        (t = t.replace(/[?#]/g, function(e) {
          return encodeURIComponent(e);
        })) +
        (s = s.replace('#', '%23')) +
        i
    );
  }
  function urlResolve(e, a) {
    return urlParse(e, !1, !0).resolve(a);
  }
  function urlResolveObject(e, a) {
    return e ? urlParse(e, !1, !0).resolveObject(a) : a;
  }
  function parseHost(e) {
    var a = e.host,
      o = portPattern.exec(a);
    o &&
      (':' !== (o = o[0]) && (e.port = o.substr(1)),
      (a = a.substr(0, a.length - o.length))),
      a && (e.hostname = a);
  }
  function request(e, a) {
    'string' == typeof e && (e = urlParse(e));
    var o =
        -1 === global$1.location.protocol.search(/^https?:$/) ? 'http:' : '',
      t = e.protocol || o,
      i = e.hostname || e.host,
      n = e.port,
      r = e.path || '/';
    i && -1 !== i.indexOf(':') && (i = '[' + i + ']'),
      (e.url = (i ? t + '//' + i : '') + (n ? ':' + n : '') + r),
      (e.method = (e.method || 'GET').toUpperCase()),
      (e.headers = e.headers || {});
    var s = new ClientRequest(e);
    return a && s.on('response', a), s;
  }
  function get(e, a) {
    var o = request(e, a);
    return o.end(), o;
  }
  function Agent() {}
  (Url.prototype.parse = function(e, a, o) {
    return parse$1(this, e, a, o);
  }),
    (Url.prototype.format = function() {
      return format$1(this);
    }),
    (Url.prototype.resolve = function(e) {
      return this.resolveObject(urlParse(e, !1, !0)).format();
    }),
    (Url.prototype.resolveObject = function(e) {
      if (isString$1(e)) {
        var a = new Url();
        a.parse(e, !1, !0), (e = a);
      }
      for (
        var o, t = new Url(), i = Object.keys(this), n = 0;
        n < i.length;
        n++
      ) {
        var r = i[n];
        t[r] = this[r];
      }
      if (((t.hash = e.hash), '' === e.href)) return (t.href = t.format()), t;
      if (e.slashes && !e.protocol) {
        for (var s = Object.keys(e), u = 0; u < s.length; u++) {
          var m = s[u];
          'protocol' !== m && (t[m] = e[m]);
        }
        return (
          slashedProtocol[t.protocol] &&
            t.hostname &&
            !t.pathname &&
            (t.path = t.pathname = '/'),
          (t.href = t.format()),
          t
        );
      }
      if (e.protocol && e.protocol !== t.protocol) {
        if (!slashedProtocol[e.protocol]) {
          for (var c = Object.keys(e), l = 0; l < c.length; l++) {
            var p = c[l];
            t[p] = e[p];
          }
          return (t.href = t.format()), t;
        }
        if (((t.protocol = e.protocol), e.host || hostlessProtocol[e.protocol]))
          t.pathname = e.pathname;
        else {
          for (
            o = (e.pathname || '').split('/');
            o.length && !(e.host = o.shift());

          );
          e.host || (e.host = ''),
            e.hostname || (e.hostname = ''),
            '' !== o[0] && o.unshift(''),
            o.length < 2 && o.unshift(''),
            (t.pathname = o.join('/'));
        }
        if (
          ((t.search = e.search),
          (t.query = e.query),
          (t.host = e.host || ''),
          (t.auth = e.auth),
          (t.hostname = e.hostname || e.host),
          (t.port = e.port),
          t.pathname || t.search)
        ) {
          var h = t.pathname || '',
            f = t.search || '';
          t.path = h + f;
        }
        return (t.slashes = t.slashes || e.slashes), (t.href = t.format()), t;
      }
      var g,
        d = t.pathname && '/' === t.pathname.charAt(0),
        k = e.host || (e.pathname && '/' === e.pathname.charAt(0)),
        b = k || d || (t.host && e.pathname),
        y = b,
        j = (t.pathname && t.pathname.split('/')) || [],
        v = t.protocol && !slashedProtocol[t.protocol];
      if (
        ((o = (e.pathname && e.pathname.split('/')) || []),
        v &&
          ((t.hostname = ''),
          (t.port = null),
          t.host && ('' === j[0] ? (j[0] = t.host) : j.unshift(t.host)),
          (t.host = ''),
          e.protocol &&
            ((e.hostname = null),
            (e.port = null),
            e.host && ('' === o[0] ? (o[0] = e.host) : o.unshift(e.host)),
            (e.host = null)),
          (b = b && ('' === o[0] || '' === j[0]))),
        k)
      )
        (t.host = e.host || '' === e.host ? e.host : t.host),
          (t.hostname =
            e.hostname || '' === e.hostname ? e.hostname : t.hostname),
          (t.search = e.search),
          (t.query = e.query),
          (j = o);
      else if (o.length)
        j || (j = []),
          j.pop(),
          (j = j.concat(o)),
          (t.search = e.search),
          (t.query = e.query);
      else if (!isNullOrUndefined(e.search))
        return (
          v &&
            ((t.hostname = t.host = j.shift()),
            (g = !!(t.host && t.host.indexOf('@') > 0) && t.host.split('@')) &&
              ((t.auth = g.shift()), (t.host = t.hostname = g.shift()))),
          (t.search = e.search),
          (t.query = e.query),
          (isNull(t.pathname) && isNull(t.search)) ||
            (t.path =
              (t.pathname ? t.pathname : '') + (t.search ? t.search : '')),
          (t.href = t.format()),
          t
        );
      if (!j.length)
        return (
          (t.pathname = null),
          t.search ? (t.path = '/' + t.search) : (t.path = null),
          (t.href = t.format()),
          t
        );
      for (
        var w = j.slice(-1)[0],
          x =
            ((t.host || e.host || j.length > 1) && ('.' === w || '..' === w)) ||
            '' === w,
          z = 0,
          C = j.length;
        C >= 0;
        C--
      )
        '.' === (w = j[C])
          ? j.splice(C, 1)
          : '..' === w
          ? (j.splice(C, 1), z++)
          : z && (j.splice(C, 1), z--);
      if (!b && !y) for (; z--; z) j.unshift('..');
      !b || '' === j[0] || (j[0] && '/' === j[0].charAt(0)) || j.unshift(''),
        x && '/' !== j.join('/').substr(-1) && j.push('');
      var E = '' === j[0] || (j[0] && '/' === j[0].charAt(0));
      return (
        v &&
          ((t.hostname = t.host = E ? '' : j.length ? j.shift() : ''),
          (g = !!(t.host && t.host.indexOf('@') > 0) && t.host.split('@')) &&
            ((t.auth = g.shift()), (t.host = t.hostname = g.shift()))),
        (b = b || (t.host && j.length)) && !E && j.unshift(''),
        j.length
          ? (t.pathname = j.join('/'))
          : ((t.pathname = null), (t.path = null)),
        (isNull(t.pathname) && isNull(t.search)) ||
          (t.path =
            (t.pathname ? t.pathname : '') + (t.search ? t.search : '')),
        (t.auth = e.auth || t.auth),
        (t.slashes = t.slashes || e.slashes),
        (t.href = t.format()),
        t
      );
    }),
    (Url.prototype.parseHost = function() {
      return parseHost(this);
    }),
    (Agent.defaultMaxSockets = 4);
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
    ],
    STATUS_CODES = {
      100: 'Continue',
      101: 'Switching Protocols',
      102: 'Processing',
      200: 'OK',
      201: 'Created',
      202: 'Accepted',
      203: 'Non-Authoritative Information',
      204: 'No Content',
      205: 'Reset Content',
      206: 'Partial Content',
      207: 'Multi-Status',
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
      418: "I'm a teapot",
      422: 'Unprocessable Entity',
      423: 'Locked',
      424: 'Failed Dependency',
      425: 'Unordered Collection',
      426: 'Upgrade Required',
      428: 'Precondition Required',
      429: 'Too Many Requests',
      431: 'Request Header Fields Too Large',
      500: 'Internal Server Error',
      501: 'Not Implemented',
      502: 'Bad Gateway',
      503: 'Service Unavailable',
      504: 'Gateway Time-out',
      505: 'HTTP Version Not Supported',
      506: 'Variant Also Negotiates',
      507: 'Insufficient Storage',
      509: 'Bandwidth Limit Exceeded',
      510: 'Not Extended',
      511: 'Network Authentication Required'
    },
    https = {
      request: request,
      get: get,
      Agent: Agent,
      METHODS: METHODS,
      STATUS_CODES: STATUS_CODES
    },
    Utils = {
      isStandardBrowserEnv: function() {
        return (
          ('undefined' == typeof navigator ||
            'ReactNative' !== navigator.product) &&
          ('undefined' != typeof window && 'undefined' != typeof document)
        );
      },
      isNode: function() {
        return !Utils.isStandardBrowserEnv();
      }
    };
  function noopEnableCookieJarSupport(e) {
    return e;
  }
  var noop$1 = noopEnableCookieJarSupport;
  function createCommonjsModule(e, a) {
    return e((a = { exports: {} }), a.exports), a.exports;
  }
  function getCjsExportFromNamespace(e) {
    return (e && e.default) || e;
  }
  var ipRegex = createCommonjsModule(function(e) {
      const a =
          '(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(?:\\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])){3}',
        o = '[0-9a-fA-F]{1,4}',
        t = '\n(\n(?:'
          .concat(o, ':){7}(?:')
          .concat(
            o,
            '|:)|                                // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8\n(?:'
          )
          .concat(o, ':){6}(?:')
          .concat(a, '|:')
          .concat(
            o,
            '|:)|                         // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4\n(?:'
          )
          .concat(o, ':){5}(?::')
          .concat(a, '|(:')
          .concat(
            o,
            '){1,2}|:)|                 // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4\n(?:'
          )
          .concat(o, ':){4}(?:(:')
          .concat(o, '){0,1}:')
          .concat(a, '|(:')
          .concat(
            o,
            '){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4\n(?:'
          )
          .concat(o, ':){3}(?:(:')
          .concat(o, '){0,2}:')
          .concat(a, '|(:')
          .concat(
            o,
            '){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4\n(?:'
          )
          .concat(o, ':){2}(?:(:')
          .concat(o, '){0,3}:')
          .concat(a, '|(:')
          .concat(
            o,
            '){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4\n(?:'
          )
          .concat(o, ':){1}(?:(:')
          .concat(o, '){0,4}:')
          .concat(a, '|(:')
          .concat(
            o,
            '){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4\n(?::((?::'
          )
          .concat(o, '){0,5}:')
          .concat(a, '|(?::')
          .concat(
            o,
            '){1,7}|:))           // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4\n)(%[0-9a-zA-Z]{1,})?                                           // %eth0            %1\n'
          )
          .replace(/\s*\/\/.*$/gm, '')
          .replace(/\n/g, '')
          .trim(),
        i = (e.exports = function(e) {
          return e && e.exact
            ? new RegExp('(?:^'.concat(a, '$)|(?:^').concat(t, '$)'))
            : new RegExp('(?:'.concat(a, ')|(?:').concat(t, ')'), 'g');
        });
      (i.v4 = function(e) {
        return e && e.exact
          ? new RegExp('^'.concat(a, '$'))
          : new RegExp(a, 'g');
      }),
        (i.v6 = function(e) {
          return e && e.exact
            ? new RegExp('^'.concat(t, '$'))
            : new RegExp(t, 'g');
        });
    }),
    rules = [
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
    ],
    rules$1 = Object.freeze({ default: rules }),
    require$$0$1 = getCjsExportFromNamespace(rules$1),
    psl = createCommonjsModule(function(e, a) {
      var o = {};
      (o.rules = require$$0$1.map(function(e) {
        return {
          rule: e,
          suffix: e.replace(/^(\*\.|\!)/, ''),
          punySuffix: -1,
          wildcard: '*' === e.charAt(0),
          exception: '!' === e.charAt(0)
        };
      })),
        (o.endsWith = function(e, a) {
          return -1 !== e.indexOf(a, e.length - a.length);
        }),
        (o.findRule = function(e) {
          var a = require$$5.toASCII(e);
          return o.rules.reduce(function(e, t) {
            return (
              -1 === t.punySuffix &&
                (t.punySuffix = require$$5.toASCII(t.suffix)),
              o.endsWith(a, '.' + t.punySuffix) || a === t.punySuffix ? t : e
            );
          }, null);
        }),
        (a.errorCodes = {
          DOMAIN_TOO_SHORT: 'Domain name too short.',
          DOMAIN_TOO_LONG:
            'Domain name too long. It should be no more than 255 chars.',
          LABEL_STARTS_WITH_DASH:
            'Domain name label can not start with a dash.',
          LABEL_ENDS_WITH_DASH: 'Domain name label can not end with a dash.',
          LABEL_TOO_LONG: 'Domain name label should be at most 63 chars long.',
          LABEL_TOO_SHORT:
            'Domain name label should be at least 1 character long.',
          LABEL_INVALID_CHARS:
            'Domain name label can only contain alphanumeric characters or dashes.'
        }),
        (o.validate = function(e) {
          var a = require$$5.toASCII(e);
          if (a.length < 1) return 'DOMAIN_TOO_SHORT';
          if (a.length > 255) return 'DOMAIN_TOO_LONG';
          for (var o, t = a.split('.'), i = 0; i < t.length; ++i) {
            if (!(o = t[i]).length) return 'LABEL_TOO_SHORT';
            if (o.length > 63) return 'LABEL_TOO_LONG';
            if ('-' === o.charAt(0)) return 'LABEL_STARTS_WITH_DASH';
            if ('-' === o.charAt(o.length - 1)) return 'LABEL_ENDS_WITH_DASH';
            if (!/^[a-z0-9\-]+$/.test(o)) return 'LABEL_INVALID_CHARS';
          }
        }),
        (a.parse = function(e) {
          if ('string' != typeof e)
            throw new TypeError('Domain name must be a string.');
          var t = e.slice(0).toLowerCase();
          '.' === t.charAt(t.length - 1) && (t = t.slice(0, t.length - 1));
          var i = o.validate(t);
          if (i)
            return { input: e, error: { message: a.errorCodes[i], code: i } };
          var n = {
              input: e,
              tld: null,
              sld: null,
              domain: null,
              subdomain: null,
              listed: !1
            },
            r = t.split('.');
          if ('local' === r[r.length - 1]) return n;
          var s = function() {
              return /xn--/.test(t)
                ? (n.domain && (n.domain = require$$5.toASCII(n.domain)),
                  n.subdomain &&
                    (n.subdomain = require$$5.toASCII(n.subdomain)),
                  n)
                : n;
            },
            u = o.findRule(t);
          if (!u)
            return r.length < 2
              ? n
              : ((n.tld = r.pop()),
                (n.sld = r.pop()),
                (n.domain = [n.sld, n.tld].join('.')),
                r.length && (n.subdomain = r.pop()),
                s());
          n.listed = !0;
          var m = u.suffix.split('.'),
            c = r.slice(0, r.length - m.length);
          return (
            u.exception && c.push(m.shift()),
            (n.tld = m.join('.')),
            c.length
              ? (u.wildcard && (m.unshift(c.pop()), (n.tld = m.join('.'))),
                c.length
                  ? ((n.sld = c.pop()),
                    (n.domain = [n.sld, n.tld].join('.')),
                    c.length && (n.subdomain = c.join('.')),
                    s())
                  : s())
              : s()
          );
        }),
        (a.get = function(e) {
          return (e && a.parse(e).domain) || null;
        }),
        (a.isValid = function(e) {
          var o = a.parse(e);
          return Boolean(o.domain && o.listed);
        });
    }),
    psl_1 = psl.errorCodes,
    psl_2 = psl.parse,
    psl_3 = psl.get,
    psl_4 = psl.isValid;
  function getPublicSuffix(e) {
    return psl.get(e);
  }
  var getPublicSuffix_1 = getPublicSuffix,
    pubsuffixPsl = { getPublicSuffix: getPublicSuffix_1 };
  function Store() {}
  var Store_1 = Store;
  (Store.prototype.synchronous = !1),
    (Store.prototype.findCookie = function(e, a, o, t) {
      throw new Error('findCookie is not implemented');
    }),
    (Store.prototype.findCookies = function(e, a, o) {
      throw new Error('findCookies is not implemented');
    }),
    (Store.prototype.putCookie = function(e, a) {
      throw new Error('putCookie is not implemented');
    }),
    (Store.prototype.updateCookie = function(e, a, o) {
      throw new Error('updateCookie is not implemented');
    }),
    (Store.prototype.removeCookie = function(e, a, o, t) {
      throw new Error('removeCookie is not implemented');
    }),
    (Store.prototype.removeCookies = function(e, a, o) {
      throw new Error('removeCookies is not implemented');
    }),
    (Store.prototype.removeAllCookies = function(e) {
      throw new Error('removeAllCookies is not implemented');
    }),
    (Store.prototype.getAllCookies = function(e) {
      throw new Error(
        'getAllCookies is not implemented (therefore jar cannot be serialized)'
      );
    });
  var store = { Store: Store_1 };
  function permuteDomain(e) {
    var a = pubsuffixPsl.getPublicSuffix(e);
    if (!a) return null;
    if (a == e) return [e];
    for (
      var o = e
          .slice(0, -(a.length + 1))
          .split('.')
          .reverse(),
        t = a,
        i = [t];
      o.length;

    )
      (t = o.shift() + '.' + t), i.push(t);
    return i;
  }
  var permuteDomain_2 = permuteDomain,
    permuteDomain_1 = { permuteDomain: permuteDomain_2 };
  function pathMatch(e, a) {
    if (a === e) return !0;
    if (0 === e.indexOf(a)) {
      if ('/' === a.substr(-1)) return !0;
      if ('/' === e.substr(a.length, 1)) return !0;
    }
    return !1;
  }
  var pathMatch_2 = pathMatch,
    pathMatch_1 = { pathMatch: pathMatch_2 },
    Store$1 = store.Store,
    permuteDomain$1 = permuteDomain_1.permuteDomain,
    pathMatch$1 = pathMatch_1.pathMatch;
  function MemoryCookieStore() {
    Store$1.call(this), (this.idx = {});
  }
  util.inherits(MemoryCookieStore, Store$1);
  var MemoryCookieStore_1 = MemoryCookieStore;
  (MemoryCookieStore.prototype.idx = null),
    (MemoryCookieStore.prototype.synchronous = !0),
    (MemoryCookieStore.prototype.inspect = function() {
      return '{ idx: ' + util.inspect(this.idx, !1, 2) + ' }';
    }),
    util.inspect.custom &&
      (MemoryCookieStore.prototype[util.inspect.custom] =
        MemoryCookieStore.prototype.inspect),
    (MemoryCookieStore.prototype.findCookie = function(e, a, o, t) {
      return this.idx[e] && this.idx[e][a]
        ? t(null, this.idx[e][a][o] || null)
        : t(null, void 0);
    }),
    (MemoryCookieStore.prototype.findCookies = function(e, a, o) {
      var t,
        i = [];
      if (!e) return o(null, []);
      t = a
        ? function(e) {
            Object.keys(e).forEach(function(o) {
              if (pathMatch$1(a, o)) {
                var t = e[o];
                for (var n in t) i.push(t[n]);
              }
            });
          }
        : function(e) {
            for (var a in e) {
              var o = e[a];
              for (var t in o) i.push(o[t]);
            }
          };
      var n = permuteDomain$1(e) || [e],
        r = this.idx;
      n.forEach(function(e) {
        var a = r[e];
        a && t(a);
      }),
        o(null, i);
    }),
    (MemoryCookieStore.prototype.putCookie = function(e, a) {
      this.idx[e.domain] || (this.idx[e.domain] = {}),
        this.idx[e.domain][e.path] || (this.idx[e.domain][e.path] = {}),
        (this.idx[e.domain][e.path][e.key] = e),
        a(null);
    }),
    (MemoryCookieStore.prototype.updateCookie = function(e, a, o) {
      this.putCookie(a, o);
    }),
    (MemoryCookieStore.prototype.removeCookie = function(e, a, o, t) {
      this.idx[e] &&
        this.idx[e][a] &&
        this.idx[e][a][o] &&
        delete this.idx[e][a][o],
        t(null);
    }),
    (MemoryCookieStore.prototype.removeCookies = function(e, a, o) {
      return (
        this.idx[e] && (a ? delete this.idx[e][a] : delete this.idx[e]), o(null)
      );
    }),
    (MemoryCookieStore.prototype.removeAllCookies = function(e) {
      return (this.idx = {}), e(null);
    }),
    (MemoryCookieStore.prototype.getAllCookies = function(e) {
      var a = [],
        o = this.idx;
      Object.keys(o).forEach(function(e) {
        Object.keys(o[e]).forEach(function(t) {
          Object.keys(o[e][t]).forEach(function(i) {
            null !== i && a.push(o[e][t][i]);
          });
        });
      }),
        a.sort(function(e, a) {
          return (e.creationIndex || 0) - (a.creationIndex || 0);
        }),
        e(null, a);
    });
  var memstore = { MemoryCookieStore: MemoryCookieStore_1 },
    version$2 = '3.0.1',
    urlParse$1 = require$$0.parse,
    ipRegex$1 = ipRegex({ exact: !0 }),
    Store$2 = store.Store,
    MemoryCookieStore$1 = memstore.MemoryCookieStore,
    pathMatch$2 = pathMatch_1.pathMatch,
    punycode;
  try {
    punycode = require$$5;
  } catch (e) {
    console.warn(
      "tough-cookie: can't load punycode; won't use punycode for domain normalization"
    );
  }
  var COOKIE_OCTETS = /^[\x21\x23-\x2B\x2D-\x3A\x3C-\x5B\x5D-\x7E]+$/,
    CONTROL_CHARS = /[\x00-\x1F]/,
    TERMINATORS = ['\n', '\r', '\0'],
    PATH_VALUE = /[\x20-\x3A\x3C-\x7E]+/,
    DATE_DELIM = /[\x09\x20-\x2F\x3B-\x40\x5B-\x60\x7B-\x7E]/,
    MONTH_TO_NUM = {
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
    },
    NUM_TO_MONTH = [
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
    ],
    NUM_TO_DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    MAX_TIME = 2147483647e3,
    MIN_TIME = 0;
  function parseDigits(e, a, o, t) {
    for (var i = 0; i < e.length; ) {
      var n = e.charCodeAt(i);
      if (n <= 47 || n >= 58) break;
      i++;
    }
    return i < a || i > o
      ? null
      : t || i == e.length
      ? parseInt(e.substr(0, i), 10)
      : null;
  }
  function parseTime(e) {
    var a = e.split(':'),
      o = [0, 0, 0];
    if (3 !== a.length) return null;
    for (var t = 0; t < 3; t++) {
      var i = 2 == t,
        n = parseDigits(a[t], 1, 2, i);
      if (null === n) return null;
      o[t] = n;
    }
    return o;
  }
  function parseMonth(e) {
    e = String(e)
      .substr(0, 3)
      .toLowerCase();
    var a = MONTH_TO_NUM[e];
    return a >= 0 ? a : null;
  }
  function parseDate(e) {
    if (e) {
      var a = e.split(DATE_DELIM);
      if (a) {
        for (
          var o = null, t = null, i = null, n = null, r = null, s = null, u = 0;
          u < a.length;
          u++
        ) {
          var m,
            c = a[u].trim();
          if (c.length)
            null === i && (m = parseTime(c))
              ? ((o = m[0]), (t = m[1]), (i = m[2]))
              : null !== n || null === (m = parseDigits(c, 1, 2, !0))
              ? null !== r || null === (m = parseMonth(c))
                ? null === s &&
                  null !== (m = parseDigits(c, 2, 4, !0)) &&
                  ((s = m) >= 70 && s <= 99
                    ? (s += 1900)
                    : s >= 0 && s <= 69 && (s += 2e3))
                : (r = m)
              : (n = m);
        }
        if (
          !(
            null === n ||
            null === r ||
            null === s ||
            null === i ||
            n < 1 ||
            n > 31 ||
            s < 1601 ||
            o > 23 ||
            t > 59 ||
            i > 59
          )
        )
          return new Date(Date.UTC(s, r, n, o, t, i));
      }
    }
  }
  function formatDate(e) {
    var a = e.getUTCDate();
    a = a >= 10 ? a : '0' + a;
    var o = e.getUTCHours();
    o = o >= 10 ? o : '0' + o;
    var t = e.getUTCMinutes();
    t = t >= 10 ? t : '0' + t;
    var i = e.getUTCSeconds();
    return (
      (i = i >= 10 ? i : '0' + i),
      NUM_TO_DAY[e.getUTCDay()] +
        ', ' +
        a +
        ' ' +
        NUM_TO_MONTH[e.getUTCMonth()] +
        ' ' +
        e.getUTCFullYear() +
        ' ' +
        o +
        ':' +
        t +
        ':' +
        i +
        ' GMT'
    );
  }
  function canonicalDomain(e) {
    return null == e
      ? null
      : ((e = e.trim().replace(/^\./, '')),
        punycode && /[^\u0001-\u007f]/.test(e) && (e = punycode.toASCII(e)),
        e.toLowerCase());
  }
  function domainMatch(e, a, o) {
    if (null == e || null == a) return null;
    if (
      (!1 !== o && ((e = canonicalDomain(e)), (a = canonicalDomain(a))), e == a)
    )
      return !0;
    if (ipRegex$1.test(e)) return !1;
    var t = e.indexOf(a);
    return (
      !(t <= 0) && (e.length === a.length + t && '.' === e.substr(t - 1, 1))
    );
  }
  function defaultPath(e) {
    if (!e || '/' !== e.substr(0, 1)) return '/';
    if ('/' === e) return e;
    var a = e.lastIndexOf('/');
    return 0 === a ? '/' : e.slice(0, a);
  }
  function trimTerminator(e) {
    for (var a = 0; a < TERMINATORS.length; a++) {
      var o = e.indexOf(TERMINATORS[a]);
      -1 !== o && (e = e.substr(0, o));
    }
    return e;
  }
  function parseCookiePair(e, a) {
    var o,
      t,
      i = (e = trimTerminator(e)).indexOf('=');
    if (a) 0 === i && (i = (e = e.substr(1)).indexOf('='));
    else if (i <= 0) return;
    if (
      (i <= 0
        ? ((o = ''), (t = e.trim()))
        : ((o = e.substr(0, i).trim()), (t = e.substr(i + 1).trim())),
      !CONTROL_CHARS.test(o) && !CONTROL_CHARS.test(t))
    ) {
      var n = new Cookie();
      return (n.key = o), (n.value = t), n;
    }
  }
  function parse$2(e, a) {
    (a && 'object' == typeof a) || (a = {});
    var o = (e = e.trim()).indexOf(';'),
      t = parseCookiePair(-1 === o ? e : e.substr(0, o), !!a.loose);
    if (t) {
      if (-1 === o) return t;
      var i = e.slice(o + 1).trim();
      if (0 === i.length) return t;
      for (var n = i.split(';'); n.length; ) {
        var r = n.shift().trim();
        if (0 !== r.length) {
          var s,
            u,
            m = r.indexOf('=');
          switch (
            (-1 === m
              ? ((s = r), (u = null))
              : ((s = r.substr(0, m)), (u = r.substr(m + 1))),
            (s = s.trim().toLowerCase()),
            u && (u = u.trim()),
            s)
          ) {
            case 'expires':
              if (u) {
                var c = parseDate(u);
                c && (t.expires = c);
              }
              break;
            case 'max-age':
              if (u && /^-?[0-9]+$/.test(u)) {
                var l = parseInt(u, 10);
                t.setMaxAge(l);
              }
              break;
            case 'domain':
              if (u) {
                var p = u.trim().replace(/^\./, '');
                p && (t.domain = p.toLowerCase());
              }
              break;
            case 'path':
              t.path = u && '/' === u[0] ? u : null;
              break;
            case 'secure':
              t.secure = !0;
              break;
            case 'httponly':
              t.httpOnly = !0;
              break;
            default:
              (t.extensions = t.extensions || []), t.extensions.push(r);
          }
        }
      }
      return t;
    }
  }
  function jsonParse(e) {
    var a;
    try {
      a = JSON.parse(e);
    } catch (e) {
      return e;
    }
    return a;
  }
  function fromJSON(e) {
    if (!e) return null;
    var a;
    if ('string' == typeof e) {
      if ((a = jsonParse(e)) instanceof Error) return null;
    } else a = e;
    for (
      var o = new Cookie(), t = 0;
      t < Cookie.serializableProperties.length;
      t++
    ) {
      var i = Cookie.serializableProperties[t];
      void 0 !== a[i] &&
        a[i] !== Cookie.prototype[i] &&
        ('expires' === i || 'creation' === i || 'lastAccessed' === i
          ? null === a[i]
            ? (o[i] = null)
            : (o[i] = 'Infinity' == a[i] ? 'Infinity' : new Date(a[i]))
          : (o[i] = a[i]));
    }
    return o;
  }
  function cookieCompare(e, a) {
    var o = 0,
      t = e.path ? e.path.length : 0;
    return 0 !== (o = (a.path ? a.path.length : 0) - t)
      ? o
      : 0 !==
        (o =
          (e.creation ? e.creation.getTime() : MAX_TIME) -
          (a.creation ? a.creation.getTime() : MAX_TIME))
      ? o
      : (o = e.creationIndex - a.creationIndex);
  }
  function permutePath(e) {
    if ('/' === e) return ['/'];
    e.lastIndexOf('/') === e.length - 1 && (e = e.substr(0, e.length - 1));
    for (var a = [e]; e.length > 1; ) {
      var o = e.lastIndexOf('/');
      if (0 === o) break;
      (e = e.substr(0, o)), a.push(e);
    }
    return a.push('/'), a;
  }
  function getCookieContext(e) {
    if (e instanceof Object) return e;
    try {
      e = decodeURI(e);
    } catch (e) {}
    return urlParse$1(e);
  }
  function Cookie(e) {
    (e = e || {}),
      Object.keys(e).forEach(function(a) {
        Cookie.prototype.hasOwnProperty(a) &&
          Cookie.prototype[a] !== e[a] &&
          '_' !== a.substr(0, 1) &&
          (this[a] = e[a]);
      }, this),
      (this.creation = this.creation || new Date()),
      Object.defineProperty(this, 'creationIndex', {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: ++Cookie.cookiesCreated
      });
  }
  function CookieJar(e, a) {
    'boolean' == typeof a
      ? (a = { rejectPublicSuffixes: a })
      : null == a && (a = {}),
      null != a.rejectPublicSuffixes &&
        (this.rejectPublicSuffixes = a.rejectPublicSuffixes),
      null != a.looseMode && (this.enableLooseMode = a.looseMode),
      e || (e = new MemoryCookieStore$1()),
      (this.store = e);
  }
  (Cookie.cookiesCreated = 0),
    (Cookie.parse = parse$2),
    (Cookie.fromJSON = fromJSON),
    (Cookie.prototype.key = ''),
    (Cookie.prototype.value = ''),
    (Cookie.prototype.expires = 'Infinity'),
    (Cookie.prototype.maxAge = null),
    (Cookie.prototype.domain = null),
    (Cookie.prototype.path = null),
    (Cookie.prototype.secure = !1),
    (Cookie.prototype.httpOnly = !1),
    (Cookie.prototype.extensions = null),
    (Cookie.prototype.hostOnly = null),
    (Cookie.prototype.pathIsDefault = null),
    (Cookie.prototype.creation = null),
    (Cookie.prototype.lastAccessed = null),
    Object.defineProperty(Cookie.prototype, 'creationIndex', {
      configurable: !0,
      enumerable: !1,
      writable: !0,
      value: 0
    }),
    (Cookie.serializableProperties = Object.keys(Cookie.prototype).filter(
      function(e) {
        return !(
          Cookie.prototype[e] instanceof Function ||
          'creationIndex' === e ||
          '_' === e.substr(0, 1)
        );
      }
    )),
    (Cookie.prototype.inspect = function() {
      var e = Date.now();
      return (
        'Cookie="' +
        this.toString() +
        '; hostOnly=' +
        (null != this.hostOnly ? this.hostOnly : '?') +
        '; aAge=' +
        (this.lastAccessed ? e - this.lastAccessed.getTime() + 'ms' : '?') +
        '; cAge=' +
        (this.creation ? e - this.creation.getTime() + 'ms' : '?') +
        '"'
      );
    }),
    util.inspect.custom &&
      (Cookie.prototype[util.inspect.custom] = Cookie.prototype.inspect),
    (Cookie.prototype.toJSON = function() {
      for (
        var e = {}, a = Cookie.serializableProperties, o = 0;
        o < a.length;
        o++
      ) {
        var t = a[o];
        this[t] !== Cookie.prototype[t] &&
          ('expires' === t || 'creation' === t || 'lastAccessed' === t
            ? null === this[t]
              ? (e[t] = null)
              : (e[t] =
                  'Infinity' == this[t] ? 'Infinity' : this[t].toISOString())
            : 'maxAge' === t
            ? null !== this[t] &&
              (e[t] =
                this[t] == 1 / 0 || this[t] == -1 / 0
                  ? this[t].toString()
                  : this[t])
            : this[t] !== Cookie.prototype[t] && (e[t] = this[t]));
      }
      return e;
    }),
    (Cookie.prototype.clone = function() {
      return fromJSON(this.toJSON());
    }),
    (Cookie.prototype.validate = function() {
      if (!COOKIE_OCTETS.test(this.value)) return !1;
      if (
        !(
          this.expires == 1 / 0 ||
          this.expires instanceof Date ||
          parseDate(this.expires)
        )
      )
        return !1;
      if (null != this.maxAge && this.maxAge <= 0) return !1;
      if (null != this.path && !PATH_VALUE.test(this.path)) return !1;
      var e = this.cdomain();
      if (e) {
        if (e.match(/\.$/)) return !1;
        if (null == pubsuffixPsl.getPublicSuffix(e)) return !1;
      }
      return !0;
    }),
    (Cookie.prototype.setExpires = function(e) {
      e instanceof Date
        ? (this.expires = e)
        : (this.expires = parseDate(e) || 'Infinity');
    }),
    (Cookie.prototype.setMaxAge = function(e) {
      this.maxAge = e === 1 / 0 || e === -1 / 0 ? e.toString() : e;
    }),
    (Cookie.prototype.cookieString = function() {
      var e = this.value;
      return null == e && (e = ''), '' === this.key ? e : this.key + '=' + e;
    }),
    (Cookie.prototype.toString = function() {
      var e = this.cookieString();
      return (
        this.expires != 1 / 0 &&
          (this.expires instanceof Date
            ? (e += '; Expires=' + formatDate(this.expires))
            : (e += '; Expires=' + this.expires)),
        null != this.maxAge &&
          this.maxAge != 1 / 0 &&
          (e += '; Max-Age=' + this.maxAge),
        this.domain && !this.hostOnly && (e += '; Domain=' + this.domain),
        this.path && (e += '; Path=' + this.path),
        this.secure && (e += '; Secure'),
        this.httpOnly && (e += '; HttpOnly'),
        this.extensions &&
          this.extensions.forEach(function(a) {
            e += '; ' + a;
          }),
        e
      );
    }),
    (Cookie.prototype.TTL = function(e) {
      if (null != this.maxAge) return this.maxAge <= 0 ? 0 : 1e3 * this.maxAge;
      var a = this.expires;
      return a != 1 / 0
        ? (a instanceof Date || (a = parseDate(a) || 1 / 0),
          a == 1 / 0 ? 1 / 0 : a.getTime() - (e || Date.now()))
        : 1 / 0;
    }),
    (Cookie.prototype.expiryTime = function(e) {
      if (null != this.maxAge) {
        var a = e || this.creation || new Date(),
          o = this.maxAge <= 0 ? -1 / 0 : 1e3 * this.maxAge;
        return a.getTime() + o;
      }
      return this.expires == 1 / 0 ? 1 / 0 : this.expires.getTime();
    }),
    (Cookie.prototype.expiryDate = function(e) {
      var a = this.expiryTime(e);
      return a == 1 / 0
        ? new Date(MAX_TIME)
        : a == -1 / 0
        ? new Date(MIN_TIME)
        : new Date(a);
    }),
    (Cookie.prototype.isPersistent = function() {
      return null != this.maxAge || this.expires != 1 / 0;
    }),
    (Cookie.prototype.cdomain = Cookie.prototype.canonicalizedDomain = function() {
      return null == this.domain ? null : canonicalDomain(this.domain);
    }),
    (CookieJar.prototype.store = null),
    (CookieJar.prototype.rejectPublicSuffixes = !0),
    (CookieJar.prototype.enableLooseMode = !1);
  var CAN_BE_SYNC = [];
  function syncWrap(e) {
    return function() {
      if (!this.store.synchronous)
        throw new Error(
          'CookieJar store is not synchronous; use async API instead.'
        );
      var a,
        o,
        t = Array.prototype.slice.call(arguments);
      if (
        (t.push(function(e, t) {
          (a = e), (o = t);
        }),
        this[e].apply(this, t),
        a)
      )
        throw a;
      return o;
    };
  }
  CAN_BE_SYNC.push('setCookie'),
    (CookieJar.prototype.setCookie = function(e, a, o, t) {
      var i,
        n = getCookieContext(a);
      o instanceof Function && ((t = o), (o = {}));
      var r = canonicalDomain(n.hostname),
        s = this.enableLooseMode;
      if (
        (null != o.loose && (s = o.loose),
        'string' == typeof e || e instanceof String)
      ) {
        if (!(e = Cookie.parse(e, { loose: s })))
          return (
            (i = new Error('Cookie failed to parse')),
            t(o.ignoreError ? null : i)
          );
      } else if (!(e instanceof Cookie))
        return (
          (i = new Error(
            'First argument to setCookie must be a Cookie object or string'
          )),
          t(o.ignoreError ? null : i)
        );
      var u = o.now || new Date();
      if (
        this.rejectPublicSuffixes &&
        e.domain &&
        null == pubsuffixPsl.getPublicSuffix(e.cdomain())
      )
        return (
          (i = new Error('Cookie has domain set to a public suffix')),
          t(o.ignoreError ? null : i)
        );
      if (e.domain) {
        if (!domainMatch(r, e.cdomain(), !1))
          return (
            (i = new Error(
              "Cookie not in this host's domain. Cookie:" +
                e.cdomain() +
                ' Request:' +
                r
            )),
            t(o.ignoreError ? null : i)
          );
        null == e.hostOnly && (e.hostOnly = !1);
      } else (e.hostOnly = !0), (e.domain = r);
      if (
        ((e.path && '/' === e.path[0]) ||
          ((e.path = defaultPath(n.pathname)), (e.pathIsDefault = !0)),
        !1 === o.http && e.httpOnly)
      )
        return (
          (i = new Error("Cookie is HttpOnly and this isn't an HTTP API")),
          t(o.ignoreError ? null : i)
        );
      var m = this.store;
      m.updateCookie ||
        (m.updateCookie = function(e, a, o) {
          this.putCookie(a, o);
        }),
        m.findCookie(e.domain, e.path, e.key, function(a, i) {
          if (a) return t(a);
          var n = function(a) {
            if (a) return t(a);
            t(null, e);
          };
          if (i) {
            if (!1 === o.http && i.httpOnly)
              return (
                (a = new Error(
                  "old Cookie is HttpOnly and this isn't an HTTP API"
                )),
                t(o.ignoreError ? null : a)
              );
            (e.creation = i.creation),
              (e.creationIndex = i.creationIndex),
              (e.lastAccessed = u),
              m.updateCookie(i, e, n);
          } else (e.creation = e.lastAccessed = u), m.putCookie(e, n);
        });
    }),
    CAN_BE_SYNC.push('getCookies'),
    (CookieJar.prototype.getCookies = function(e, a, o) {
      var t = getCookieContext(e);
      a instanceof Function && ((o = a), (a = {}));
      var i = canonicalDomain(t.hostname),
        n = t.pathname || '/',
        r = a.secure;
      null != r ||
        !t.protocol ||
        ('https:' != t.protocol && 'wss:' != t.protocol) ||
        (r = !0);
      var s = a.http;
      null == s && (s = !0);
      var u = a.now || Date.now(),
        m = !1 !== a.expire,
        c = !!a.allPaths,
        l = this.store;
      function p(e) {
        if (e.hostOnly) {
          if (e.domain != i) return !1;
        } else if (!domainMatch(i, e.domain, !1)) return !1;
        return (
          !(!c && !pathMatch$2(n, e.path)) &&
          (!(e.secure && !r) &&
            (!(e.httpOnly && !s) &&
              (!(m && e.expiryTime() <= u) ||
                (l.removeCookie(e.domain, e.path, e.key, function() {}), !1))))
        );
      }
      l.findCookies(i, c ? null : n, function(e, t) {
        if (e) return o(e);
        (t = t.filter(p)), !1 !== a.sort && (t = t.sort(cookieCompare));
        var i = new Date();
        t.forEach(function(e) {
          e.lastAccessed = i;
        }),
          o(null, t);
      });
    }),
    CAN_BE_SYNC.push('getCookieString'),
    (CookieJar.prototype.getCookieString = function() {
      var e = Array.prototype.slice.call(arguments, 0),
        a = e.pop(),
        o = function(e, o) {
          e
            ? a(e)
            : a(
                null,
                o
                  .sort(cookieCompare)
                  .map(function(e) {
                    return e.cookieString();
                  })
                  .join('; ')
              );
        };
      e.push(o), this.getCookies.apply(this, e);
    }),
    CAN_BE_SYNC.push('getSetCookieStrings'),
    (CookieJar.prototype.getSetCookieStrings = function() {
      var e = Array.prototype.slice.call(arguments, 0),
        a = e.pop(),
        o = function(e, o) {
          e
            ? a(e)
            : a(
                null,
                o.map(function(e) {
                  return e.toString();
                })
              );
        };
      e.push(o), this.getCookies.apply(this, e);
    }),
    CAN_BE_SYNC.push('serialize'),
    (CookieJar.prototype.serialize = function(e) {
      var a = this.store.constructor.name;
      'Object' === a && (a = null);
      var o = {
        version: 'tough-cookie@' + version$2,
        storeType: a,
        rejectPublicSuffixes: !!this.rejectPublicSuffixes,
        cookies: []
      };
      if (
        !this.store.getAllCookies ||
        'function' != typeof this.store.getAllCookies
      )
        return e(
          new Error(
            'store does not support getAllCookies and cannot be serialized'
          )
        );
      this.store.getAllCookies(function(a, t) {
        return a
          ? e(a)
          : ((o.cookies = t.map(function(e) {
              return (
                delete (e = e instanceof Cookie ? e.toJSON() : e).creationIndex,
                e
              );
            })),
            e(null, o));
      });
    }),
    (CookieJar.prototype.toJSON = function() {
      return this.serializeSync();
    }),
    CAN_BE_SYNC.push('_importCookies'),
    (CookieJar.prototype._importCookies = function(e, a) {
      var o = this,
        t = e.cookies;
      if (!t || !Array.isArray(t))
        return a(new Error('serialized jar has no cookies array'));
      (t = t.slice()),
        (function e(i) {
          if (i) return a(i);
          if (!t.length) return a(i, o);
          var n;
          try {
            n = fromJSON(t.shift());
          } catch (e) {
            return a(e);
          }
          if (null === n) return e(null);
          o.store.putCookie(n, e);
        })();
    }),
    (CookieJar.deserialize = function(e, a, o) {
      var t;
      if (
        (3 !== arguments.length && ((o = a), (a = null)), 'string' == typeof e)
      ) {
        if ((t = jsonParse(e)) instanceof Error) return o(t);
      } else t = e;
      var i = new CookieJar(a, t.rejectPublicSuffixes);
      i._importCookies(t, function(e) {
        if (e) return o(e);
        o(null, i);
      });
    }),
    (CookieJar.deserializeSync = function(e, a) {
      var o = 'string' == typeof e ? JSON.parse(e) : e,
        t = new CookieJar(a, o.rejectPublicSuffixes);
      if (!t.store.synchronous)
        throw new Error(
          'CookieJar store is not synchronous; use async API instead.'
        );
      return t._importCookiesSync(o), t;
    }),
    (CookieJar.fromJSON = CookieJar.deserializeSync),
    (CookieJar.prototype.clone = function(e, a) {
      1 === arguments.length && ((a = e), (e = null)),
        this.serialize(function(o, t) {
          if (o) return a(o);
          CookieJar.deserialize(t, e, a);
        });
    }),
    CAN_BE_SYNC.push('removeAllCookies'),
    (CookieJar.prototype.removeAllCookies = function(e) {
      var a = this.store;
      if (
        a.removeAllCookies instanceof Function &&
        a.removeAllCookies !== Store$2.prototype.removeAllCookies
      )
        return a.removeAllCookies(e);
      a.getAllCookies(function(o, t) {
        if (o) return e(o);
        if (0 === t.length) return e(null);
        var i = 0,
          n = [];
        function r(a) {
          if ((a && n.push(a), ++i === t.length))
            return e(n.length ? n[0] : null);
        }
        t.forEach(function(e) {
          a.removeCookie(e.domain, e.path, e.key, r);
        });
      });
    }),
    (CookieJar.prototype._cloneSync = syncWrap('clone')),
    (CookieJar.prototype.cloneSync = function(e) {
      if (!e.synchronous)
        throw new Error(
          'CookieJar clone destination store is not synchronous; use async API instead.'
        );
      return this._cloneSync(e);
    }),
    CAN_BE_SYNC.forEach(function(e) {
      CookieJar.prototype[e + 'Sync'] = syncWrap(e);
    });
  var version$3 = version$2,
    CookieJar_1 = CookieJar,
    Cookie_1 = Cookie,
    Store_1$1 = Store$2,
    MemoryCookieStore_1$1 = MemoryCookieStore$1,
    parseDate_1 = parseDate,
    formatDate_1 = formatDate,
    parse_1 = parse$2,
    fromJSON_1 = fromJSON,
    domainMatch_1 = domainMatch,
    defaultPath_1 = defaultPath,
    pathMatch_1$1 = pathMatch$2,
    getPublicSuffix$1 = pubsuffixPsl.getPublicSuffix,
    cookieCompare_1 = cookieCompare,
    permuteDomain$2 = permuteDomain_1.permuteDomain,
    permutePath_1 = permutePath,
    canonicalDomain_1 = canonicalDomain,
    cookie = {
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
    },
    cRequest,
    CognosRequest = (function() {
      function e(a, o, t, i) {
        _classCallCheck(this, e),
          '/' !== a.substr(-1) && (a += '/'),
          (this.url = a),
          (this.debug = o),
          (this.token = ''),
          (this.loggedin = !1),
          (this.namespace = ''),
          (this.namespaces = []),
          (this.timeout = t),
          (this.ignoreinvalidcertificates = i);
      }
      return (
        _createClass(e, [
          {
            key: 'log',
            value: function(e, a) {
              this.debug && (a ? console.log(e, a) : console.log(e));
            }
          },
          {
            key: 'error',
            value: function(e, a) {
              this.debug && (a ? console.error(e, a) : console.error(e));
            }
          },
          {
            key: 'initialise',
            value: function() {
              var e =
                  arguments.length > 0 &&
                  void 0 !== arguments[0] &&
                  arguments[0],
                a = this,
                o = !1,
                t = {},
                i = {
                  timeout: a.timeout,
                  maxRedirects: 10,
                  maxContentLength: 5e7
                };
              if (
                (this.ignoreinvalidcertificates &&
                  (i.httpsAgent = new https.Agent({ rejectUnauthorized: !1 })),
                (this.axios = axios$1.create(i)),
                Utils.isNode())
              ) {
                noop$1(this.axios);
                o = new cookie.CookieJar();
                (a.cookies = o), a.log('CookieJar is set', o);
              } else {
                if ('' == a.token) {
                  var n = document.cookie.split(';'),
                    r = !0;
                  if (
                    (n.forEach(function(o) {
                      var t = cookie.parse(o);
                      void 0 !== t &&
                        ('X-XSRF-TOKEN' == t.key || 'XSRF-TOKEN' == t.key
                          ? ('undefined' == t.value && '' == t.value) ||
                            (a.token = t.value)
                          : (a.log('deleting cookie' + t.key), (r = e)));
                    }),
                    !r)
                  )
                    return (s = this.delete('bi/v1/login').then(function() {
                      return (a.loggedin = !1), a.initialise(!0);
                    }));
                }
                if (a.token)
                  t = {
                    'X-XSRF-TOKEN': a.token,
                    'Content-Type': 'application/json; charset=UTF-8'
                  };
                else {
                  noop$1(this.axios);
                  o = new cookie.CookieJar();
                  a.cookies = o;
                }
              }
              var s = this.axios
                .get(a.url + 'bi/v1/login', {
                  jar: o,
                  withCredentials: !1,
                  headers: t
                })
                .then(function() {
                  return a.log('Unexpected success'), a;
                })
                .catch(function(e) {
                  if (void 0 === e.response || 441 !== e.response.status)
                    throw (a.log('Unexpected Error in initialise', e),
                    e.message);
                  if (
                    (a.log('Expected Error in initialise'),
                    Utils.isNode() && void 0 !== o)
                  ) {
                    a.log('Cookiejar', o);
                    var t = a.url;
                    (t = a.url + 'bi'), a.log('cookie url: ' + t);
                    o.getCookies(t, { allPaths: !0 }, function(e, i) {
                      i.forEach(function(e) {
                        a.log('cook: ', e),
                          a.log('cookie key: ' + e.key),
                          'XSRF-TOKEN' == e.key.toUpperCase() &&
                            (a.log('cookie value: ', e.value),
                            (a.token = e.value),
                            a.log('token: ' + a.token),
                            o.setCookie('XSRF-TOKEN=' + a.token, t, function() {
                              o.setCookie(
                                'X-XSRF-TOKEN=' + a.token,
                                t,
                                function() {
                                  a.cookies = o;
                                }
                              );
                            }));
                      });
                    });
                  }
                  try {
                    if (void 0 === e.response) throw e.message;
                    e.response.data.promptInfo.displayObjects.forEach(function(
                      e
                    ) {
                      'CAMNamespace' == e.name &&
                        ((a.namespace = e.value),
                        a.log('Default Namespace: ' + a.namespace));
                    });
                    var i = '';
                    e.response.data.promptInfo.displayObjects.forEach(function(
                      e
                    ) {
                      'CAMNamespaceDisplayName' == e.name &&
                        ((i = e.value), a.log('Default Namespace Name: ' + i));
                    }),
                      i &&
                        a.namespaces.push({
                          isDefault: !0,
                          id: a.namespace,
                          value: i
                        }),
                      a.namespace ||
                        (e.response.data.promptInfo.displayObjects[0].promptOptions.forEach(
                          function(e) {
                            e.isDefault && (a.namespace = e.id),
                              a.namespaces.push(e);
                          }
                        ),
                        a.namespace || (a.namespace = a.namespaces[0].id));
                  } catch (e) {
                    a.error(e);
                  }
                  return a;
                });
              return a.log('Login function made it until the end'), s;
            }
          },
          {
            key: 'get',
            value: function(e) {
              var a = this,
                o = {};
              new cookie.CookieJar();
              return (
                isNull(this.cookies) || this.cookies,
                a.log('get URL:    ' + a.url + e),
                Utils.isNode && a.token && (o['X-XSRF-TOKEN'] = a.token),
                (o['X-Requested-With'] = 'XMLHttpRequest'),
                (o['Content-Type'] = 'application/json; charset=UTF-8'),
                this.axios
                  .get(a.url + e, {
                    headers: o,
                    jar: a.cookies,
                    withCredentials: !0
                  })
                  .then(function(e) {
                    return void 0 !== e ? e.data : '';
                  })
              );
            }
          },
          {
            key: 'post',
            value: function(e, a, o) {
              var t = this,
                i = JSON.stringify(a),
                n = {};
              return (
                t.log('params: ' + i),
                t.log('token: ' + t.token),
                t.log('cookies: ', t.cookies),
                Utils.isNode
                  ? t.token && (n['X-XSRF-TOKEN'] = t.token)
                  : (document.cookie = 'XSRF-TOKEN=' + t.token),
                (n['X-Requested-With'] = 'XMLHttpRequest'),
                (n['Content-Type'] = 'application/json; charset=UTF-8'),
                this.axios
                  .post(t.url + e, i, {
                    headers: n,
                    jar: t.cookies,
                    withCredentials: !0
                  })
                  .then(function(e) {
                    return (
                      t.log('CognosRequest : Success Posting'),
                      o && void 0 !== e ? e : e.data,
                      e
                    );
                  })
                  .catch(function(e) {
                    var a = '';
                    if (
                      (t.error('CognosRequest : Error in post', e),
                      (a =
                        void 0 !== e.response
                          ? void 0 !== e.response.data.messages
                            ? e.response.data.messages[0].messageString
                            : e.response.data
                          : e.message),
                      t.error(e),
                      'AAA-AUT-0011 Invalid namespace was selected.' != a)
                    )
                      throw a;
                  })
              );
            }
          },
          {
            key: 'delete',
            value: function(e) {
              var a =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {},
                o =
                  arguments.length > 2 &&
                  void 0 !== arguments[2] &&
                  arguments[2],
                t = this,
                i = {},
                n = JSON.stringify(a),
                r = {};
              return (
                Utils.isNode
                  ? t.token && (i['X-XSRF-TOKEN'] = t.token)
                  : (document.cookie = 'XSRF-TOKEN=' + t.token),
                (i['X-Requested-With'] = 'XMLHttpRequest'),
                (i['Content-Type'] = 'application/json; charset=UTF-8'),
                t.log('params: ' + n),
                this.axios
                  .delete(t.url + e, {
                    data: n,
                    headers: i,
                    jar: t.cookies,
                    withCredentials: !0
                  })
                  .then(function(a) {
                    if ((t.log('CognosRequest : Success Deleting'), o)) r = a;
                    else
                      try {
                        r = a.data;
                      } catch (o) {
                        t.log(
                          'No valid JSON returned from delete request. ' + e
                        ),
                          (r = a);
                      }
                    return r;
                  })
                  .catch(function(e) {
                    var a = '';
                    if (
                      (void 0 !== e.response
                        ? (441 === e.response.status && (a = 'Access Denied'),
                          void 0 !== e.response.data.messages
                            ? e.response.data.messages.length > 0
                              ? (a = e.response.data.messages[0].messageString)
                              : e.response.data.errorCodeString &&
                                (a = e.response.data.errorCodeString)
                            : (a = e.response.data))
                        : (a = e.message),
                      t.error(e),
                      'AAA-AUT-0011 Invalid namespace was selected.' != a)
                    )
                      throw a;
                  })
              );
            }
          },
          {
            key: 'put',
            value: function(e) {
              var a,
                o =
                  arguments.length > 1 &&
                  void 0 !== arguments[1] &&
                  arguments[1],
                t =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : {},
                i = this;
              if (Utils.isStandardBrowserEnv())
                return (
                  console.log(
                    'The put function is not implemented for browser environments'
                  ),
                  !1
                );
              var n = {};
              Utils.isNode
                ? i.token && (n['X-XSRF-TOKEN'] = i.token)
                : (document.cookie = 'XSRF-TOKEN=' + i.token),
                (n['X-Requested-With'] = 'XMLHttpRequest');
              var r = i.url + e;
              if (o) {
                n['Content-Type'] = 'application/zip';
                require('fs');
                i.log('About to upload extension'),
                  i.log('File: ' + o),
                  i.log('To:', r),
                  (a = require('fs').createReadStream(o)).on(
                    'error',
                    console.log
                  );
              } else
                (n['Content-Type'] = 'application/json; charset=UTF-8'),
                  (a = t);
              var s = { headers: n, jar: i.cookies, withCredentials: !0 };
              return this.axios
                .put(r, a, s)
                .then(function(e) {
                  return i.log('CognosRequest : Success Putting '), e.data;
                })
                .catch(function(e) {
                  var a = '';
                  if (
                    (i.error('CognosRequest : Error in put', e),
                    (a =
                      void 0 !== e.response
                        ? void 0 !== e.response.data.messages
                          ? e.response.data.messages[0].messageString
                          : e.response.data
                          ? e.response.data
                          : e.response.statusText
                        : e.message),
                    i.error(a),
                    'AAA-AUT-0011 Invalid namespace was selected.' != a)
                  )
                    throw a;
                });
            }
          },
          {
            key: 'uploadfilepart',
            value: function(e, a) {
              var o = this;
              if (Utils.isStandardBrowserEnv())
                return (
                  console.log(
                    'The uploadfile function is not implemented for browser environments'
                  ),
                  !1
                );
              var t = {};
              o.token &&
                (o.log('Token: ' + o.token),
                (t['X-XSRF-TOKEN'] = o.token),
                (t.Cookie = 'XSRF-TOKEN=' + o.token)),
                (t['X-Requested-With'] = 'XMLHttpRequest'),
                (t['Content-Type'] = 'text/csv');
              require('fs');
              var i = o.url + e;
              o.log('About to upload data file'),
                o.log('File: ' + a),
                o.log('To:', i);
              return (
                require('fs')
                  .createReadStream(a)
                  .on('error', console.log),
                o.axios
                  .put(i, a, {
                    headers: t,
                    jar: o.cookies,
                    withCredentials: !0
                  })
                  .then(function(e) {
                    return o.log('CognosRequest : Success Putting '), e.data;
                  })
                  .catch(function(e) {
                    var a = '';
                    if (
                      (o.error('CognosRequest : Error in put', e),
                      (a =
                        void 0 !== e.response
                          ? void 0 !== e.response.data.messages
                            ? e.response.data.messages[0].messageString
                            : e.response.data
                            ? e.response.data
                            : e.response.statusText
                          : e.message),
                      o.error(a),
                      'AAA-AUT-0011 Invalid namespace was selected.' != a)
                    )
                      throw a;
                  })
              );
            }
          },
          {
            key: 'uploadfilepartFinish',
            value: function(e) {
              var a = this;
              if (Utils.isStandardBrowserEnv())
                return (
                  console.log(
                    'The uploadfile function is not implemented for browser environments'
                  ),
                  !1
                );
              var o = {};
              a.token &&
                (a.log('Token: ' + a.token),
                (o['X-XSRF-TOKEN'] = a.token),
                (o.Cookie = 'XSRF-TOKEN=' + a.token)),
                (o['X-Requested-With'] = 'XMLHttpRequest'),
                (o['Content-Type'] = 'application/json'),
                (o['Content-Length'] = 0);
              var t = a.url + e;
              a.log('About to upload data file'), a.log('To:', t);
              return a.axios
                .put(t, !1, { headers: o, jar: a.cookies, withCredentials: !0 })
                .then(function(e) {
                  return (
                    a.log('CognosRequest : Success Putting '),
                    a.log(e.data),
                    e.data
                  );
                })
                .catch(function(e) {
                  var o = '';
                  if (
                    (a.error(
                      'CognosRequest : Error in uploadfilepartFinish',
                      e
                    ),
                    (o =
                      void 0 !== e.response
                        ? void 0 !== e.response.data.messages
                          ? e.response.data.messages[0].messageString
                          : e.response.data
                          ? e.response.data
                          : e.response.statusText
                        : e.message),
                    a.error(o),
                    'AAA-AUT-0011 Invalid namespace was selected.' != o)
                  )
                    throw o;
                });
            }
          }
        ]),
        e
      );
    })();
  function getCognosRequest(e, a) {
    var o = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
      t = arguments.length > 3 ? arguments[3] : void 0,
      i = arguments.length > 4 ? arguments[4] : void 0;
    return (
      o && (cRequest = void 0),
      void 0 === cRequest || o
        ? (cRequest = new CognosRequest(e, a, t, i)).initialise()
        : Promise.resolve(cRequest)
    );
  }
  function normalizeArray(e, a) {
    for (var o = 0, t = e.length - 1; t >= 0; t--) {
      var i = e[t];
      '.' === i
        ? e.splice(t, 1)
        : '..' === i
        ? (e.splice(t, 1), o++)
        : o && (e.splice(t, 1), o--);
    }
    if (a) for (; o--; o) e.unshift('..');
    return e;
  }
  var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,
    splitPath = function(e) {
      return splitPathRe.exec(e).slice(1);
    };
  function resolve() {
    for (var e = '', a = !1, o = arguments.length - 1; o >= -1 && !a; o--) {
      var t = o >= 0 ? arguments[o] : '/';
      if ('string' != typeof t)
        throw new TypeError('Arguments to path.resolve must be strings');
      t && ((e = t + '/' + e), (a = '/' === t.charAt(0)));
    }
    return (
      (a ? '/' : '') +
        (e = normalizeArray(
          filter(e.split('/'), function(e) {
            return !!e;
          }),
          !a
        ).join('/')) || '.'
    );
  }
  function normalize(e) {
    var a = isAbsolute(e),
      o = '/' === substr(e, -1);
    return (
      (e = normalizeArray(
        filter(e.split('/'), function(e) {
          return !!e;
        }),
        !a
      ).join('/')) ||
        a ||
        (e = '.'),
      e && o && (e += '/'),
      (a ? '/' : '') + e
    );
  }
  function isAbsolute(e) {
    return '/' === e.charAt(0);
  }
  function join() {
    return normalize(
      filter(Array.prototype.slice.call(arguments, 0), function(e, a) {
        if ('string' != typeof e)
          throw new TypeError('Arguments to path.join must be strings');
        return e;
      }).join('/')
    );
  }
  function relative(e, a) {
    function o(e) {
      for (var a = 0; a < e.length && '' === e[a]; a++);
      for (var o = e.length - 1; o >= 0 && '' === e[o]; o--);
      return a > o ? [] : e.slice(a, o - a + 1);
    }
    (e = resolve(e).substr(1)), (a = resolve(a).substr(1));
    for (
      var t = o(e.split('/')),
        i = o(a.split('/')),
        n = Math.min(t.length, i.length),
        r = n,
        s = 0;
      s < n;
      s++
    )
      if (t[s] !== i[s]) {
        r = s;
        break;
      }
    var u = [];
    for (s = r; s < t.length; s++) u.push('..');
    return (u = u.concat(i.slice(r))).join('/');
  }
  var sep = '/',
    delimiter$1 = ':';
  function dirname(e) {
    var a = splitPath(e),
      o = a[0],
      t = a[1];
    return o || t ? (t && (t = t.substr(0, t.length - 1)), o + t) : '.';
  }
  function basename(e, a) {
    var o = splitPath(e)[2];
    return (
      a &&
        o.substr(-1 * a.length) === a &&
        (o = o.substr(0, o.length - a.length)),
      o
    );
  }
  function extname(e) {
    return splitPath(e)[3];
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
  function filter(e, a) {
    if (e.filter) return e.filter(a);
    for (var o = [], t = 0; t < e.length; t++) a(e[t], t, e) && o.push(e[t]);
    return o;
  }
  var substr =
      'b' === 'ab'.substr(-1)
        ? function(e, a, o) {
            return e.substr(a, o);
          }
        : function(e, a, o) {
            return a < 0 && (a = e.length + a), e.substr(a, o);
          },
    concatMap = function(e, a) {
      for (var o = [], t = 0; t < e.length; t++) {
        var i = a(e[t], t);
        isArray$4(i) ? o.push.apply(o, i) : o.push(i);
      }
      return o;
    },
    isArray$4 =
      Array.isArray ||
      function(e) {
        return '[object Array]' === Object.prototype.toString.call(e);
      },
    balancedMatch = balanced;
  function balanced(e, a, o) {
    e instanceof RegExp && (e = maybeMatch(e, o)),
      a instanceof RegExp && (a = maybeMatch(a, o));
    var t = range(e, a, o);
    return (
      t && {
        start: t[0],
        end: t[1],
        pre: o.slice(0, t[0]),
        body: o.slice(t[0] + e.length, t[1]),
        post: o.slice(t[1] + a.length)
      }
    );
  }
  function maybeMatch(e, a) {
    var o = a.match(e);
    return o ? o[0] : null;
  }
  function range(e, a, o) {
    var t,
      i,
      n,
      r,
      s,
      u = o.indexOf(e),
      m = o.indexOf(a, u + 1),
      c = u;
    if (u >= 0 && m > 0) {
      for (t = [], n = o.length; c >= 0 && !s; )
        c == u
          ? (t.push(c), (u = o.indexOf(e, c + 1)))
          : 1 == t.length
          ? (s = [t.pop(), m])
          : ((i = t.pop()) < n && ((n = i), (r = m)),
            (m = o.indexOf(a, c + 1))),
          (c = u < m && u >= 0 ? u : m);
      t.length && (s = [n, r]);
    }
    return s;
  }
  balanced.range = range;
  var braceExpansion = expandTop,
    escSlash = '\0SLASH' + Math.random() + '\0',
    escOpen = '\0OPEN' + Math.random() + '\0',
    escClose = '\0CLOSE' + Math.random() + '\0',
    escComma = '\0COMMA' + Math.random() + '\0',
    escPeriod = '\0PERIOD' + Math.random() + '\0';
  function numeric(e) {
    return parseInt(e, 10) == e ? parseInt(e, 10) : e.charCodeAt(0);
  }
  function escapeBraces(e) {
    return e
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
  function unescapeBraces(e) {
    return e
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
  function parseCommaParts(e) {
    if (!e) return [''];
    var a = [],
      o = balancedMatch('{', '}', e);
    if (!o) return e.split(',');
    var t = o.pre,
      i = o.body,
      n = o.post,
      r = t.split(',');
    r[r.length - 1] += '{' + i + '}';
    var s = parseCommaParts(n);
    return (
      n.length && ((r[r.length - 1] += s.shift()), r.push.apply(r, s)),
      a.push.apply(a, r),
      a
    );
  }
  function expandTop(e) {
    return e
      ? ('{}' === e.substr(0, 2) && (e = '\\{\\}' + e.substr(2)),
        expand(escapeBraces(e), !0).map(unescapeBraces))
      : [];
  }
  function embrace(e) {
    return '{' + e + '}';
  }
  function isPadded(e) {
    return /^-?0\d/.test(e);
  }
  function lte(e, a) {
    return e <= a;
  }
  function gte(e, a) {
    return e >= a;
  }
  function expand(e, a) {
    var o = [],
      t = balancedMatch('{', '}', e);
    if (!t || /\$$/.test(t.pre)) return [e];
    var i,
      n = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(t.body),
      r = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(t.body),
      s = n || r,
      u = t.body.indexOf(',') >= 0;
    if (!s && !u)
      return t.post.match(/,.*\}/)
        ? expand((e = t.pre + '{' + t.body + escClose + t.post))
        : [e];
    if (s) i = t.body.split(/\.\./);
    else if (
      1 === (i = parseCommaParts(t.body)).length &&
      1 === (i = expand(i[0], !1).map(embrace)).length
    )
      return (l = t.post.length ? expand(t.post, !1) : ['']).map(function(e) {
        return t.pre + i[0] + e;
      });
    var m,
      c = t.pre,
      l = t.post.length ? expand(t.post, !1) : [''];
    if (s) {
      var p = numeric(i[0]),
        h = numeric(i[1]),
        f = Math.max(i[0].length, i[1].length),
        g = 3 == i.length ? Math.abs(numeric(i[2])) : 1,
        d = lte;
      h < p && ((g *= -1), (d = gte));
      var k = i.some(isPadded);
      m = [];
      for (var b = p; d(b, h); b += g) {
        var y;
        if (r) '\\' === (y = String.fromCharCode(b)) && (y = '');
        else if (((y = String(b)), k)) {
          var j = f - y.length;
          if (j > 0) {
            var v = new Array(j + 1).join('0');
            y = b < 0 ? '-' + v + y.slice(1) : v + y;
          }
        }
        m.push(y);
      }
    } else
      m = concatMap(i, function(e) {
        return expand(e, !1);
      });
    for (var w = 0; w < m.length; w++)
      for (var x = 0; x < l.length; x++) {
        var z = c + m[w] + l[x];
        (!a || s || z) && o.push(z);
      }
    return o;
  }
  var minimatch_1 = minimatch;
  minimatch.Minimatch = Minimatch;
  var path = { sep: '/' };
  try {
    path = require$$0$2;
  } catch (e) {}
  var GLOBSTAR = (minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {}),
    plTypes = {
      '!': { open: '(?:(?!(?:', close: '))[^/]*?)' },
      '?': { open: '(?:', close: ')?' },
      '+': { open: '(?:', close: ')+' },
      '*': { open: '(?:', close: ')*' },
      '@': { open: '(?:', close: ')' }
    },
    qmark = '[^/]',
    star = qmark + '*?',
    twoStarDot = '(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?',
    twoStarNoDot = '(?:(?!(?:\\/|^)\\.).)*?',
    reSpecials = charSet('().*{}+?[]^$\\!');
  function charSet(e) {
    return e.split('').reduce(function(e, a) {
      return (e[a] = !0), e;
    }, {});
  }
  var slashSplit = /\/+/;
  function filter$1(e, a) {
    return (
      (a = a || {}),
      function(o, t, i) {
        return minimatch(o, e, a);
      }
    );
  }
  function ext(e, a) {
    (e = e || {}), (a = a || {});
    var o = {};
    return (
      Object.keys(a).forEach(function(e) {
        o[e] = a[e];
      }),
      Object.keys(e).forEach(function(a) {
        o[a] = e[a];
      }),
      o
    );
  }
  function minimatch(e, a, o) {
    if ('string' != typeof a)
      throw new TypeError('glob pattern string required');
    return (
      o || (o = {}),
      !(!o.nocomment && '#' === a.charAt(0)) &&
        ('' === a.trim() ? '' === e : new Minimatch(a, o).match(e))
    );
  }
  function Minimatch(e, a) {
    if (!(this instanceof Minimatch)) return new Minimatch(e, a);
    if ('string' != typeof e)
      throw new TypeError('glob pattern string required');
    a || (a = {}),
      (e = e.trim()),
      '/' !== path.sep && (e = e.split(path.sep).join('/')),
      (this.options = a),
      (this.set = []),
      (this.pattern = e),
      (this.regexp = null),
      (this.negate = !1),
      (this.comment = !1),
      (this.empty = !1),
      this.make();
  }
  function make() {
    if (!this._made) {
      var e = this.pattern,
        a = this.options;
      if (a.nocomment || '#' !== e.charAt(0))
        if (e) {
          this.parseNegate();
          var o = (this.globSet = this.braceExpand());
          a.debug && (this.debug = console.error),
            this.debug(this.pattern, o),
            (o = this.globParts = o.map(function(e) {
              return e.split(slashSplit);
            })),
            this.debug(this.pattern, o),
            (o = o.map(function(e, a, o) {
              return e.map(this.parse, this);
            }, this)),
            this.debug(this.pattern, o),
            (o = o.filter(function(e) {
              return -1 === e.indexOf(!1);
            })),
            this.debug(this.pattern, o),
            (this.set = o);
        } else this.empty = !0;
      else this.comment = !0;
    }
  }
  function parseNegate() {
    var e = this.pattern,
      a = !1,
      o = 0;
    if (!this.options.nonegate) {
      for (var t = 0, i = e.length; t < i && '!' === e.charAt(t); t++)
        (a = !a), o++;
      o && (this.pattern = e.substr(o)), (this.negate = a);
    }
  }
  function braceExpand(e, a) {
    if (
      (a || (a = this instanceof Minimatch ? this.options : {}),
      void 0 === (e = void 0 === e ? this.pattern : e))
    )
      throw new TypeError('undefined pattern');
    return a.nobrace || !e.match(/\{.*\}/) ? [e] : braceExpansion(e);
  }
  (minimatch.filter = filter$1),
    (minimatch.defaults = function(e) {
      if (!e || !Object.keys(e).length) return minimatch;
      var a = minimatch,
        o = function(o, t, i) {
          return a.minimatch(o, t, ext(e, i));
        };
      return (
        (o.Minimatch = function(o, t) {
          return new a.Minimatch(o, ext(e, t));
        }),
        o
      );
    }),
    (Minimatch.defaults = function(e) {
      return e && Object.keys(e).length
        ? minimatch.defaults(e).Minimatch
        : Minimatch;
    }),
    (Minimatch.prototype.debug = function() {}),
    (Minimatch.prototype.make = make),
    (Minimatch.prototype.parseNegate = parseNegate),
    (minimatch.braceExpand = function(e, a) {
      return braceExpand(e, a);
    }),
    (Minimatch.prototype.braceExpand = braceExpand),
    (Minimatch.prototype.parse = parse$3);
  var SUBPARSE = {},
    jCognos,
    cognosUrl;
  function parse$3(e, a) {
    if (e.length > 65536) throw new TypeError('pattern is too long');
    var o = this.options;
    if (!o.noglobstar && '**' === e) return GLOBSTAR;
    if ('' === e) return '';
    var t,
      i = '',
      n = !!o.nocase,
      r = !1,
      s = [],
      u = [],
      m = !1,
      c = -1,
      l = -1,
      p =
        '.' === e.charAt(0)
          ? ''
          : o.dot
          ? '(?!(?:^|\\/)\\.{1,2}(?:$|\\/))'
          : '(?!\\.)',
      h = this;
    function f() {
      if (t) {
        switch (t) {
          case '*':
            (i += star), (n = !0);
            break;
          case '?':
            (i += qmark), (n = !0);
            break;
          default:
            i += '\\' + t;
        }
        h.debug('clearStateChar %j %j', t, i), (t = !1);
      }
    }
    for (var g, d = 0, k = e.length; d < k && (g = e.charAt(d)); d++)
      if ((this.debug('%s\t%s %s %j', e, d, i, g), r && reSpecials[g]))
        (i += '\\' + g), (r = !1);
      else
        switch (g) {
          case '/':
            return !1;
          case '\\':
            f(), (r = !0);
            continue;
          case '?':
          case '*':
          case '+':
          case '@':
          case '!':
            if ((this.debug('%s\t%s %s %j <-- stateChar', e, d, i, g), m)) {
              this.debug('  in class'),
                '!' === g && d === l + 1 && (g = '^'),
                (i += g);
              continue;
            }
            h.debug('call clearStateChar %j', t), f(), (t = g), o.noext && f();
            continue;
          case '(':
            if (m) {
              i += '(';
              continue;
            }
            if (!t) {
              i += '\\(';
              continue;
            }
            s.push({
              type: t,
              start: d - 1,
              reStart: i.length,
              open: plTypes[t].open,
              close: plTypes[t].close
            }),
              (i += '!' === t ? '(?:(?!(?:' : '(?:'),
              this.debug('plType %j %j', t, i),
              (t = !1);
            continue;
          case ')':
            if (m || !s.length) {
              i += '\\)';
              continue;
            }
            f(), (n = !0);
            var b = s.pop();
            (i += b.close), '!' === b.type && u.push(b), (b.reEnd = i.length);
            continue;
          case '|':
            if (m || !s.length || r) {
              (i += '\\|'), (r = !1);
              continue;
            }
            f(), (i += '|');
            continue;
          case '[':
            if ((f(), m)) {
              i += '\\' + g;
              continue;
            }
            (m = !0), (l = d), (c = i.length), (i += g);
            continue;
          case ']':
            if (d === l + 1 || !m) {
              (i += '\\' + g), (r = !1);
              continue;
            }
            if (m) {
              var y = e.substring(l + 1, d);
              try {
                RegExp('[' + y + ']');
              } catch (e) {
                var j = this.parse(y, SUBPARSE);
                (i = i.substr(0, c) + '\\[' + j[0] + '\\]'),
                  (n = n || j[1]),
                  (m = !1);
                continue;
              }
            }
            (n = !0), (m = !1), (i += g);
            continue;
          default:
            f(),
              r ? (r = !1) : !reSpecials[g] || ('^' === g && m) || (i += '\\'),
              (i += g);
        }
    for (
      m &&
        ((y = e.substr(l + 1)),
        (j = this.parse(y, SUBPARSE)),
        (i = i.substr(0, c) + '\\[' + j[0]),
        (n = n || j[1])),
        b = s.pop();
      b;
      b = s.pop()
    ) {
      var v = i.slice(b.reStart + b.open.length);
      this.debug('setting tail', i, b),
        (v = v.replace(/((?:\\{2}){0,64})(\\?)\|/g, function(e, a, o) {
          return o || (o = '\\'), a + a + o + '|';
        })),
        this.debug('tail=%j\n   %s', v, v, b, i);
      var w = '*' === b.type ? star : '?' === b.type ? qmark : '\\' + b.type;
      (n = !0), (i = i.slice(0, b.reStart) + w + '\\(' + v);
    }
    f(), r && (i += '\\\\');
    var x = !1;
    switch (i.charAt(0)) {
      case '.':
      case '[':
      case '(':
        x = !0;
    }
    for (var z = u.length - 1; z > -1; z--) {
      var C = u[z],
        E = i.slice(0, C.reStart),
        S = i.slice(C.reStart, C.reEnd - 8),
        _ = i.slice(C.reEnd - 8, C.reEnd),
        A = i.slice(C.reEnd);
      _ += A;
      var R = E.split('(').length - 1,
        T = A;
      for (d = 0; d < R; d++) T = T.replace(/\)[+*?]?/, '');
      var O = '';
      '' === (A = T) && a !== SUBPARSE && (O = '$'), (i = E + S + A + O + _);
    }
    if (('' !== i && n && (i = '(?=.)' + i), x && (i = p + i), a === SUBPARSE))
      return [i, n];
    if (!n) return globUnescape(e);
    var B = o.nocase ? 'i' : '';
    try {
      var M = new RegExp('^' + i + '$', B);
    } catch (e) {
      return new RegExp('$.');
    }
    return (M._glob = e), (M._src = i), M;
  }
  function makeRe() {
    if (this.regexp || !1 === this.regexp) return this.regexp;
    var e = this.set;
    if (!e.length) return (this.regexp = !1), this.regexp;
    var a = this.options,
      o = a.noglobstar ? star : a.dot ? twoStarDot : twoStarNoDot,
      t = a.nocase ? 'i' : '',
      i = e
        .map(function(e) {
          return e
            .map(function(e) {
              return e === GLOBSTAR
                ? o
                : 'string' == typeof e
                ? regExpEscape(e)
                : e._src;
            })
            .join('\\/');
        })
        .join('|');
    (i = '^(?:' + i + ')$'), this.negate && (i = '^(?!' + i + ').*$');
    try {
      this.regexp = new RegExp(i, t);
    } catch (e) {
      this.regexp = !1;
    }
    return this.regexp;
  }
  function match(e, a) {
    if ((this.debug('match', e, this.pattern), this.comment)) return !1;
    if (this.empty) return '' === e;
    if ('/' === e && a) return !0;
    var o = this.options;
    '/' !== path.sep && (e = e.split(path.sep).join('/')),
      (e = e.split(slashSplit)),
      this.debug(this.pattern, 'split', e);
    var t,
      i,
      n = this.set;
    for (
      this.debug(this.pattern, 'set', n), i = e.length - 1;
      i >= 0 && !(t = e[i]);
      i--
    );
    for (i = 0; i < n.length; i++) {
      var r = n[i],
        s = e;
      if ((o.matchBase && 1 === r.length && (s = [t]), this.matchOne(s, r, a)))
        return !!o.flipNegate || !this.negate;
    }
    return !o.flipNegate && this.negate;
  }
  function globUnescape(e) {
    return e.replace(/\\(.)/g, '$1');
  }
  function regExpEscape(e) {
    return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
  (minimatch.makeRe = function(e, a) {
    return new Minimatch(e, a || {}).makeRe();
  }),
    (Minimatch.prototype.makeRe = makeRe),
    (minimatch.match = function(e, a, o) {
      var t = new Minimatch(a, (o = o || {}));
      return (
        (e = e.filter(function(e) {
          return t.match(e);
        })),
        t.options.nonull && !e.length && e.push(a),
        e
      );
    }),
    (Minimatch.prototype.match = match),
    (Minimatch.prototype.matchOne = function(e, a, o) {
      var t = this.options;
      this.debug('matchOne', { this: this, file: e, pattern: a }),
        this.debug('matchOne', e.length, a.length);
      for (
        var i = 0, n = 0, r = e.length, s = a.length;
        i < r && n < s;
        i++, n++
      ) {
        this.debug('matchOne loop');
        var u,
          m = a[n],
          c = e[i];
        if ((this.debug(a, m, c), !1 === m)) return !1;
        if (m === GLOBSTAR) {
          this.debug('GLOBSTAR', [a, m, c]);
          var l = i,
            p = n + 1;
          if (p === s) {
            for (this.debug('** at the end'); i < r; i++)
              if (
                '.' === e[i] ||
                '..' === e[i] ||
                (!t.dot && '.' === e[i].charAt(0))
              )
                return !1;
            return !0;
          }
          for (; l < r; ) {
            var h = e[l];
            if (
              (this.debug('\nglobstar while', e, l, a, p, h),
              this.matchOne(e.slice(l), a.slice(p), o))
            )
              return this.debug('globstar found match!', l, r, h), !0;
            if ('.' === h || '..' === h || (!t.dot && '.' === h.charAt(0))) {
              this.debug('dot detected!', e, l, a, p);
              break;
            }
            this.debug('globstar swallow a segment, and continue'), l++;
          }
          return !(
            !o || (this.debug('\n>>> no match, partial?', e, l, a, p), l !== r)
          );
        }
        if (
          ('string' == typeof m
            ? ((u = t.nocase ? c.toLowerCase() === m.toLowerCase() : c === m),
              this.debug('string match', m, c, u))
            : ((u = c.match(m)), this.debug('pattern match', m, c, u)),
          !u)
        )
          return !1;
      }
      if (i === r && n === s) return !0;
      if (i === r) return o;
      if (n === s) return i === r - 1 && '' === e[i];
      throw new Error('wtf?');
    });
  var Cognos = (function() {
    function Cognos(e, a, o) {
      _classCallCheck(this, Cognos),
        (this.loggedin = !1),
        (this.url = ''),
        (this.debug = e),
        (this.username = ''),
        (this.password = ''),
        (this.timeout = a),
        (this.productVersion = ''),
        this.ignoreInvalidCertificates,
        (this.capabilities = {}),
        (this.preferences = {}),
        (this.defaultNamespace = ''),
        (this.namespace = ''),
        (this.namespaces = ''),
        (this.retrycount = 0),
        (this.loginrequest = !1),
        (this.resetting = !1);
    }
    return (
      _createClass(Cognos, [
        {
          key: 'log',
          value: function(e, a) {
            this.debug && (a ? console.log(e, a) : console.log(e));
          }
        },
        {
          key: 'error',
          value: function(e, a) {
            this.debug && (a ? console.error(e, a) : console.error(e));
          }
        },
        {
          key: 'login',
          value: function(e, a) {
            var o =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : '',
              t = this;
            if ((t.log('login: Starting to login'), !1 !== t.loginrequest))
              return (
                t.log(
                  'login: Already logging in, returning loginrequest promise',
                  t.loginrequest
                ),
                Promise.resolve(t.loginrequest)
              );
            if (('' == o && (o = t.defaultNamespace), !o))
              throw 'Namespace not known.';
            var i = {
              parameters: [
                { name: 'CAMNamespace', value: o },
                { name: 'h_CAM_action', value: 'logonAs' },
                { name: 'CAMUsername', value: e },
                { name: 'CAMPassword', value: a }
              ]
            };
            return (
              (this.loginrequest = t.requester
                .post('bi/v1/login', i)
                .then(function(i) {
                  (t.loggedin = !0),
                    (t.username = e),
                    (t.password = a),
                    (t.namespace = o),
                    (t.loginrequest = !1);
                  var n = Promise.resolve(
                      t.requester
                        .get('bi/v1/users/~/capabilities')
                        .then(function(e) {
                          return (t.capabilities = e), e;
                        })
                    ),
                    r = Promise.resolve(
                      t.requester
                        .get('bi/v1/users/~/preferences')
                        .then(function(e) {
                          return (t.preferences = e), e;
                        })
                    );
                  return Promise.resolve(Promise.all([n, r]));
                })
                .then(function() {
                  return t;
                })
                .catch(function(e) {
                  throw (t.log('Cognos: Error when logging in.'),
                  (t.loginrequest = !1),
                  e);
                })),
              this.log('login: returning login promise', this.loginrequest),
              this.loginrequest
            );
          }
        },
        {
          key: 'logoff',
          value: function() {
            var e = this;
            return void 0 !== _typeof(e.requester)
              ? e.requester
                  .delete('bi/v1/login')
                  .then(function(a) {
                    return (e.loggedin = !1), a;
                  })
                  .catch(function(a) {
                    e.log('Cognos: Error when logging off.', a);
                  })
              : ((e.loggedin = !1), Promise.resolve(!0));
          }
        },
        {
          key: 'handleError',
          value: function(e) {
            var a = '';
            if ('ECONNABORTED' === e.code || 'Network Error' === e.message)
              throw e;
            if (void 0 !== e.response) {
              if (441 == e.response.status || 403 == e.response.status) {
                this.log('going to reset');
                var o = this.reset();
                return this.log('in handleError, returning promise', o), o;
              }
              a =
                void 0 !== e.response.data.messages
                  ? e.response.data.messages[0].messageString
                  : e.response.data;
            } else a = e.message;
            if (
              (this.error(e),
              'AAA-AUT-0011 Invalid namespace was selected.' != a)
            )
              throw a;
            return Promise.resolve();
          }
        },
        {
          key: 'reset',
          value: function() {
            var e = this;
            return (
              e.log('Going to Reset'),
              this.resetting
                ? this.resetting
                : (this.retrycount++,
                  e.log('retrycount = ' + this.retrycount),
                  this.retrycount > 2
                    ? Promise.reject()
                    : ((this.requester = void 0),
                      e.log('going to reset the cognos request'),
                      (this.resetting = getCognosRequest(
                        this.url,
                        this.debug,
                        !0,
                        this.timeout,
                        this.ignoreInvalidCertificates
                      )
                        .then(function(a) {
                          (e.requester = a), e.log('going to login again');
                          var o = e.login(e.username, e.password, e.namespace);
                          return e.log('login promise', o), Promise.resolve(o);
                        })
                        .then(function() {
                          return e.log('Done logging in'), Promise.resolve();
                        })
                        .catch(function(a) {
                          if ((e.error('Error resetting', a), e.retrycount < 3))
                            return e.reset();
                          throw a;
                        })),
                      e.log('Returning a promise to reset', this.resetting),
                      this.resetting))
            );
          }
        },
        {
          key: 'getCurrentThemeSettings',
          value: function() {
            var e = this;
            return e.requester
              .get('bi/v1/plugins/themes/current/spec.json')
              .then(function(e) {
                return e;
              })
              .catch(function(a) {
                throw (e.error(
                  'Error while fetching Cognos Current Theme Settings.',
                  a
                ),
                a);
              });
          }
        },
        {
          key: 'getCognosVersion',
          value: function() {
            var e = this;
            if ('' !== this.productVersion)
              return Promise.resolve(e.productVersion);
            return e.requester
              .get('bi/v1/configuration/keys/Glass.productVersion')
              .then(function(a) {
                return (
                  (e.productVersion = a['Glass.productVersion']),
                  e.productVersion
                );
              })
              .catch(function(a) {
                throw (e.error('Error while fetching Cognos Version.', a), a);
              });
          }
        },
        {
          key: 'setConfig',
          value: function(e, a) {
            var o = this;
            return o.requester
              .put(
                'bi/v1/configuration/keys/global',
                !1,
                _defineProperty({}, e, a)
              )
              .then(function(t) {
                return (
                  (o.productVersion = t['Glass.productVersion']),
                  o.log('saved key ' + e + ' with value ' + a),
                  _defineProperty({}, e, a)
                );
              })
              .catch(function(a) {
                throw (o.error('Error while setting key ' + e, a), a);
              });
          }
        },
        {
          key: 'getConfig',
          value: function() {
            var e = this;
            return e.requester
              .get('bi/v1/configuration/keys')
              .then(function(e) {
                return e;
              })
              .catch(function(a) {
                throw (e.error(
                  'Error while fetching Cognos configuration keys.',
                  a
                ),
                a);
              });
          }
        },
        {
          key: 'getConfigKey',
          value: function(e) {
            var a = this;
            return a
              .getConfig()
              .then(function(a) {
                return a.global[e];
              })
              .catch(function(e) {
                throw (a.error(
                  'Error while fetching Cognos configuration keys.',
                  e
                ),
                e);
              });
          }
        },
        {
          key: '_getPublicFolderId',
          value: function _getPublicFolderId() {
            var me = this,
              url = '';
            return this.getCognosVersion().then(function(version) {
              return (
                '11.1' == version.substr(0, 4)
                  ? ((url = 'bi/v1/disp/icd/feeds/cm/?dojo='),
                    me.log('We are version 11. Going to fetch: ' + url))
                  : (url = 'bi/v1/objects/.public_folders?fields=permissions'),
                me.requester
                  .get(url)
                  .then(function(folders) {
                    var id;
                    return (
                      '11.1' == version.substr(0, 4)
                        ? ((folders = folders.replace(/\\\'/g, '\\"')),
                          JSON.parse(folders),
                          (folders = eval('(' + folders + ')')),
                          (id = folders.items[0].entry[2].cm$storeID))
                        : (id = folders.data[0].id),
                      id
                    );
                  })
                  .catch(function(e) {
                    throw (me.error(
                      'There was an error fetching the folder id',
                      e
                    ),
                    e);
                  })
              );
            });
          }
        },
        {
          key: 'listRootFolder',
          value: function() {
            var e = this,
              a = [];
            return e.requester
              .get('bi/v1/objects/.my_folders?fields=permissions')
              .then(function(o) {
                return (
                  e.log('Got the Private Folders'),
                  void 0 !== o &&
                    a.push({ id: o.data[0].id, name: 'My Content' }),
                  a
                );
              })
              .then(function() {
                return e._getPublicFolderId().then(function(o) {
                  return (
                    e.log('Got the Public Folders'),
                    void 0 !== o && a.push({ id: o, name: 'Team Content' }),
                    a
                  );
                });
              })
              .catch(function(a) {
                e.error('CognosRequest : Error in listRootFolder', a),
                  e
                    .handleError(a)
                    .then(function() {
                      return (
                        e.log('We have been reset, list the root folder again'),
                        (e.resetting = !1),
                        e.listRootFolder()
                      );
                    })
                    .catch(function() {
                      throw a;
                    });
              });
          }
        },
        {
          key: 'listPublicFolders',
          value: function() {
            var e = this;
            return e
              ._getPublicFolderId()
              .then(function(a) {
                return void 0 !== a ? Promise.resolve(e.listFolderById(a)) : {};
              })
              .catch(function(a) {
                e.error('CognosRequest : Error in listPublicFolders', a),
                  e
                    .handleError(a)
                    .then(function() {
                      return (
                        e.log(
                          'We have been reset, list the public folders again'
                        ),
                        (e.resetting = !1),
                        e.listPublicFolders()
                      );
                    })
                    .catch(function() {
                      throw a;
                    });
              });
          }
        },
        {
          key: 'listFolderById',
          value: function(e) {
            var a =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : '*',
              o =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : ['folder'],
              t = this,
              i = t.requester
                .get(
                  'bi/v1/objects/' +
                    e +
                    '/items?nav_filter=true&fields=defaultName,defaultScreenTip'
                )
                .then(function(e) {
                  var i = [];
                  return (
                    e.data.forEach(function(e) {
                      if (minimatch_1(e.defaultName, a)) {
                        t.log('folder ', e.defaultName);
                        try {
                          if (o.indexOf(e.type) > -1) {
                            var n = {
                              name: e.defaultName,
                              id: e.id,
                              searchPath: e.searchPath,
                              type: e.type
                            };
                            i.push(n);
                          }
                        } catch (e) {
                          t.error('something fishy', e);
                        }
                      }
                    }),
                    i
                  );
                })
                .catch(function(i) {
                  return (
                    t.error('CognosRequest : Error in listFolderById', i),
                    t
                      .handleError(i)
                      .then(function() {
                        return (
                          t.log(
                            'We have been reset, list the folder by id again'
                          ),
                          (t.resetting = !1),
                          t.listFolderById(e, a, o)
                        );
                      })
                      .catch(function() {
                        throw i;
                      })
                  );
                });
            return i;
          }
        },
        {
          key: 'getFolderDetails',
          value: function(e) {
            var a = this,
              o =
                'bi/v1/objects/' +
                e +
                '?fields=id,defaultName,owner.defaultName,ancestors,defaultDescription,modificationTime,creationTime,contact,type,disabled,hidden,name.locale,permissions,tenantID,searchPath,repositoryRules';
            return a.requester
              .get(o)
              .then(function(e) {
                return a.log('Got Folder Details', e), e;
              })
              .catch(function(o) {
                a.error('CognosRequest : Error in getFolderDetails', o),
                  a
                    .handleError(o)
                    .then(function() {
                      return (
                        a.log('We have been reset, getFolderDetails again'),
                        (a.resetting = !1),
                        a.getFolderDetails(e)
                      );
                    })
                    .catch(function() {
                      throw o;
                    });
              });
          }
        },
        {
          key: 'addFolder',
          value: function(e, a) {
            var o = this,
              t = { defaultName: a, type: 'folder' };
            return o.requester
              .post('bi/v1/objects/' + e + '/items', t, !0)
              .then(function(e) {
                if ((o.log('created folder'), e.headers && e.headers.location))
                  var t = e.headers.location.split('/').pop();
                else t = e.data.data[0].id;
                return { name: a, id: t };
              })
              .catch(function(t) {
                return (
                  o.error('CognosRequest : Error in addFolder', t),
                  o
                    .handleError(t)
                    .then(function() {
                      return (
                        o.log('We have been reset, lets add the folder again'),
                        (o.resetting = !1),
                        o.addFolder(e, a)
                      );
                    })
                    .catch(function() {
                      throw t;
                    })
                );
              });
          }
        },
        {
          key: 'deleteFolder',
          value: function(e) {
            var a =
                !(arguments.length > 1 && void 0 !== arguments[1]) ||
                arguments[1],
              o =
                !(arguments.length > 2 && void 0 !== arguments[2]) ||
                arguments[2],
              t = this,
              i = { force: a, recursive: o };
            return t.requester
              .delete('bi/v1/objects/' + e, i, !0)
              .then(function() {
                return t.log('Deleted folder'), !0;
              })
              .catch(function(i) {
                return (
                  t.error('CognosRequest : Error in deleteFolder', i),
                  t
                    .handleError(i)
                    .then(function() {
                      return (
                        t.log('We have been reset, delete the folder again'),
                        (t.resetting = !1),
                        t.deleteFolder(e, a, o)
                      );
                    })
                    .catch(function(e) {
                      throw e;
                    })
                );
              });
          }
        },
        {
          key: 'getReportData',
          value: function(e) {
            var a =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {},
              o =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : 2e3,
              t = this,
              i = '',
              n = Object.keys(a);
            n.forEach(function(e) {
              i += '&p_' + e + '=' + a[e];
            });
            var r = t.requester
              .get(
                'bi/v1/disp/rds/reportData/report/' +
                  e +
                  '?fmt=DataSetJSON&rowLimit=' +
                  o +
                  i
              )
              .then(function(e) {
                return t.log('retrieved the data', e), e;
              })
              .catch(function(i) {
                return (
                  t.error('CognosRequest : Error in getReportData', i),
                  t
                    .handleError(i)
                    .then(function() {
                      return (
                        t.log('We have been reset, get Report Data again'),
                        (t.resetting = !1),
                        t.getReportData(e, a, o)
                      );
                    })
                    .catch(function() {
                      throw i;
                    })
                );
              });
            return r;
          }
        },
        {
          key: 'uploadExtension',
          value: function(e, a) {
            var o =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : 'extensions',
              t = this,
              i = 'bi/v1/plugins/' + o + '/' + a,
              n = this.requester
                .put(i, e, !1)
                .then(function(e) {
                  t.log('New extension id =' + e.id);
                })
                .catch(function(e) {
                  throw (t.error('CognosRequest : Error in uploadExtension', e),
                  e);
                });
            return n;
          }
        },
        {
          key: 'upLoadDataFile',
          value: function(e) {
            var a = this,
              o = 'bi/v1/metadata/files?filename=' + file;
            return this.requester
              .uploadfile(o, e)
              .then(function(t) {
                a.log('New extension id =' + t),
                  t &&
                    ((o = 'bi/v1/metadata/files/segment/' + t + '?index=1'),
                    a.requester
                      .uploadfilepart(o, e)
                      .then(function(e) {
                        a.log('New extension id =' + e),
                          (o =
                            'bi/v1/metadata/files/segment/' + e + '?index=-1'),
                          a.requester
                            .uploadfilepartFinish(o)
                            .then(function(e) {
                              a.log('New extension id =' + e);
                            })
                            .catch(function(e) {
                              throw (a.error(
                                'CognosRequest : Error in uploadDataFile Part',
                                e
                              ),
                              e);
                            });
                      })
                      .catch(function(e) {
                        throw (a.error(
                          'CognosRequest : Error in uploadDataFile Part',
                          e
                        ),
                        e);
                      }));
              })
              .catch(function(e) {
                throw (a.error('CognosRequest : Error in uploadDataFile', e),
                e);
              });
          }
        },
        {
          key: 'getPalettes',
          value: function() {
            var e = this;
            return e.requester
              .get('bi/v1/palettes/public')
              .then(function(a) {
                return e.log('retrieved the data', a), a;
              })
              .catch(function(a) {
                return (
                  e.error('CognosRequest : Error in getPalettes', a),
                  e
                    .handleError(a)
                    .then(function() {
                      return (
                        e.log('We have been reset, getPalettes again'),
                        (e.resetting = !1),
                        e.getPalettes()
                      );
                    })
                    .catch(function() {
                      throw a;
                    })
                );
              });
          }
        },
        {
          key: 'savePalette',
          value: function(e) {
            var a =
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
              o = this;
            return a
              ? o.requester
                  .put('bi/v1/palettes/' + a, !1, e)
                  .then(function() {
                    return o.log('saved palette ' + a), a;
                  })
                  .catch(function(t) {
                    if (
                      (o.error('CognosRequest : Error in savePalette', t),
                      'Not Found' == t)
                    )
                      throw 'Palette with id ' + a + ' is not found';
                    return o
                      .handleError(t)
                      .then(function() {
                        return (
                          o.log('We have been reset, savePalette again'),
                          (o.resetting = !1),
                          o.savePalette(a, e)
                        );
                      })
                      .catch(function() {
                        throw t;
                      });
                  })
              : o.requester
                  .post('bi/v1/palettes/my', e, !0)
                  .then(function() {
                    o.log('saved palette');
                  })
                  .catch(function(t) {
                    return (
                      o.error('CognosRequest : Error in savePalette', t),
                      o
                        .handleError(t)
                        .then(function() {
                          return (
                            o.log('We have been reset, savePalette again'),
                            (o.resetting = !1),
                            o.savePalette(e, a)
                          );
                        })
                        .catch(function() {
                          throw t;
                        })
                    );
                  });
          }
        },
        {
          key: 'deletePalette',
          value: function(e) {
            var a = this;
            return a.requester
              .delete('bi/v1/palettes/' + e, { force: 'true' }, !1)
              .then(function() {
                return a.log('deleted palette ' + e), e;
              })
              .catch(function(o) {
                if (
                  (a.error('CognosRequest : Error in deletePalette', o),
                  'Not Found' == o)
                )
                  throw 'Palette with id ' + e + ' is not found';
                return a
                  .handleError(o)
                  .then(function() {
                    return (
                      a.log('We have been reset, deletePalette again'),
                      (a.resetting = !1),
                      a.deletePalette(e)
                    );
                  })
                  .catch(function() {
                    throw o;
                  });
              });
          }
        }
      ]),
      Cognos
    );
  })();
  function getCognos() {
    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
      a = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
      o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 6e4,
      t = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
      i = !1;
    return (
      e && e !== cognosUrl && ((jCognos = void 0), (i = !0)),
      void 0 === jCognos && e
        ? getCognosRequest(e, a, i, o, t)
            .then(function(i) {
              return (
                ((jCognos = new Cognos(a, o, t)).requester = i),
                (jCognos.url = e),
                (jCognos.defaultNamespace = i.namespace),
                (jCognos.namespaces = i.namespaces),
                jCognos
              );
            })
            .catch(function(e) {
              throw e;
            })
        : Promise.resolve(jCognos)
    );
  }
  (exports.getCognos = getCognos),
    Object.defineProperty(exports, '__esModule', { value: !0 });
});
