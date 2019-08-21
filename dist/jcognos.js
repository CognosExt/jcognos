!(function(e, a) {
  'object' == typeof exports && 'undefined' != typeof module
    ? a(exports)
    : 'function' == typeof define && define.amd
    ? define(['exports'], a)
    : a(((e = e || self).jcognos = {}));
})(this, function(e) {
  'use strict';
  function a(e) {
    return (a =
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
  function o(e, a) {
    if (!(e instanceof a))
      throw new TypeError('Cannot call a class as a function');
  }
  function t(e, a) {
    for (var o = 0; o < a.length; o++) {
      var t = a[o];
      (t.enumerable = t.enumerable || !1),
        (t.configurable = !0),
        'value' in t && (t.writable = !0),
        Object.defineProperty(e, t.key, t);
    }
  }
  function n(e, a, o) {
    return a && t(e.prototype, a), o && t(e, o), e;
  }
  function i(e, a, o) {
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
  var r = function(e, a) {
      return function() {
        for (var o = new Array(arguments.length), t = 0; t < o.length; t++)
          o[t] = arguments[t];
        return e.apply(a, o);
      };
    },
    s = Object.prototype.toString;
  function u(e) {
    return '[object Array]' === s.call(e);
  }
  function m(e) {
    return null !== e && 'object' == typeof e;
  }
  function c(e) {
    return '[object Function]' === s.call(e);
  }
  function p(e, a) {
    if (null != e)
      if (('object' != typeof e && (e = [e]), u(e)))
        for (var o = 0, t = e.length; o < t; o++) a.call(null, e[o], o, e);
      else
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) &&
            a.call(null, e[n], n, e);
  }
  var l = {
    isArray: u,
    isArrayBuffer: function(e) {
      return '[object ArrayBuffer]' === s.call(e);
    },
    isBuffer: function(e) {
      return (
        null != e &&
        null != e.constructor &&
        'function' == typeof e.constructor.isBuffer &&
        e.constructor.isBuffer(e)
      );
    },
    isFormData: function(e) {
      return 'undefined' != typeof FormData && e instanceof FormData;
    },
    isArrayBufferView: function(e) {
      return 'undefined' != typeof ArrayBuffer && ArrayBuffer.isView
        ? ArrayBuffer.isView(e)
        : e && e.buffer && e.buffer instanceof ArrayBuffer;
    },
    isString: function(e) {
      return 'string' == typeof e;
    },
    isNumber: function(e) {
      return 'number' == typeof e;
    },
    isObject: m,
    isUndefined: function(e) {
      return void 0 === e;
    },
    isDate: function(e) {
      return '[object Date]' === s.call(e);
    },
    isFile: function(e) {
      return '[object File]' === s.call(e);
    },
    isBlob: function(e) {
      return '[object Blob]' === s.call(e);
    },
    isFunction: c,
    isStream: function(e) {
      return m(e) && c(e.pipe);
    },
    isURLSearchParams: function(e) {
      return (
        'undefined' != typeof URLSearchParams && e instanceof URLSearchParams
      );
    },
    isStandardBrowserEnv: function() {
      return (
        ('undefined' == typeof navigator ||
          ('ReactNative' !== navigator.product &&
            'NativeScript' !== navigator.product &&
            'NS' !== navigator.product)) &&
        ('undefined' != typeof window && 'undefined' != typeof document)
      );
    },
    forEach: p,
    merge: function e() {
      var a = {};
      function o(o, t) {
        'object' == typeof a[t] && 'object' == typeof o
          ? (a[t] = e(a[t], o))
          : (a[t] = o);
      }
      for (var t = 0, n = arguments.length; t < n; t++) p(arguments[t], o);
      return a;
    },
    deepMerge: function e() {
      var a = {};
      function o(o, t) {
        'object' == typeof a[t] && 'object' == typeof o
          ? (a[t] = e(a[t], o))
          : (a[t] = 'object' == typeof o ? e({}, o) : o);
      }
      for (var t = 0, n = arguments.length; t < n; t++) p(arguments[t], o);
      return a;
    },
    extend: function(e, a, o) {
      return (
        p(a, function(a, t) {
          e[t] = o && 'function' == typeof a ? r(a, o) : a;
        }),
        e
      );
    },
    trim: function(e) {
      return e.replace(/^\s*/, '').replace(/\s*$/, '');
    }
  };
  function h(e) {
    return encodeURIComponent(e)
      .replace(/%40/gi, '@')
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      .replace(/%20/g, '+')
      .replace(/%5B/gi, '[')
      .replace(/%5D/gi, ']');
  }
  var g = function(e, a, o) {
    if (!a) return e;
    var t;
    if (o) t = o(a);
    else if (l.isURLSearchParams(a)) t = a.toString();
    else {
      var n = [];
      l.forEach(a, function(e, a) {
        null != e &&
          (l.isArray(e) ? (a += '[]') : (e = [e]),
          l.forEach(e, function(e) {
            l.isDate(e)
              ? (e = e.toISOString())
              : l.isObject(e) && (e = JSON.stringify(e)),
              n.push(h(a) + '=' + h(e));
          }));
      }),
        (t = n.join('&'));
    }
    if (t) {
      var i = e.indexOf('#');
      -1 !== i && (e = e.slice(0, i)),
        (e += (-1 === e.indexOf('?') ? '?' : '&') + t);
    }
    return e;
  };
  function d() {
    this.handlers = [];
  }
  (d.prototype.use = function(e, a) {
    return (
      this.handlers.push({ fulfilled: e, rejected: a }),
      this.handlers.length - 1
    );
  }),
    (d.prototype.eject = function(e) {
      this.handlers[e] && (this.handlers[e] = null);
    }),
    (d.prototype.forEach = function(e) {
      l.forEach(this.handlers, function(a) {
        null !== a && e(a);
      });
    });
  var f = d,
    k = function(e, a, o) {
      return (
        l.forEach(o, function(o) {
          e = o(e, a);
        }),
        e
      );
    },
    y = function(e) {
      return !(!e || !e.__CANCEL__);
    },
    b =
      'undefined' != typeof global
        ? global
        : 'undefined' != typeof self
        ? self
        : 'undefined' != typeof window
        ? window
        : {};
  function j() {
    throw new Error('setTimeout has not been defined');
  }
  function v() {
    throw new Error('clearTimeout has not been defined');
  }
  var w = j,
    z = v;
  function x(e) {
    if (w === setTimeout) return setTimeout(e, 0);
    if ((w === j || !w) && setTimeout)
      return (w = setTimeout), setTimeout(e, 0);
    try {
      return w(e, 0);
    } catch (a) {
      try {
        return w.call(null, e, 0);
      } catch (a) {
        return w.call(this, e, 0);
      }
    }
  }
  'function' == typeof b.setTimeout && (w = setTimeout),
    'function' == typeof b.clearTimeout && (z = clearTimeout);
  var E,
    C = [],
    S = !1,
    A = -1;
  function R() {
    S &&
      E &&
      ((S = !1), E.length ? (C = E.concat(C)) : (A = -1), C.length && _());
  }
  function _() {
    if (!S) {
      var e = x(R);
      S = !0;
      for (var a = C.length; a; ) {
        for (E = C, C = []; ++A < a; ) E && E[A].run();
        (A = -1), (a = C.length);
      }
      (E = null),
        (S = !1),
        (function(e) {
          if (z === clearTimeout) return clearTimeout(e);
          if ((z === v || !z) && clearTimeout)
            return (z = clearTimeout), clearTimeout(e);
          try {
            z(e);
          } catch (a) {
            try {
              return z.call(null, e);
            } catch (a) {
              return z.call(this, e);
            }
          }
        })(e);
    }
  }
  function T(e) {
    var a = new Array(arguments.length - 1);
    if (arguments.length > 1)
      for (var o = 1; o < arguments.length; o++) a[o - 1] = arguments[o];
    C.push(new O(e, a)), 1 !== C.length || S || x(_);
  }
  function O(e, a) {
    (this.fun = e), (this.array = a);
  }
  O.prototype.run = function() {
    this.fun.apply(null, this.array);
  };
  function q() {}
  var P = q,
    L = q,
    M = q,
    N = q,
    D = q,
    I = q,
    U = q;
  var B = b.performance || {},
    F =
      B.now ||
      B.mozNow ||
      B.msNow ||
      B.oNow ||
      B.webkitNow ||
      function() {
        return new Date().getTime();
      };
  var H = new Date();
  var X = {
      nextTick: T,
      title: 'browser',
      browser: !0,
      env: {},
      argv: [],
      version: '',
      versions: {},
      on: P,
      addListener: L,
      once: M,
      off: N,
      removeListener: D,
      removeAllListeners: I,
      emit: U,
      binding: function(e) {
        throw new Error('process.binding is not supported');
      },
      cwd: function() {
        return '/';
      },
      chdir: function(e) {
        throw new Error('process.chdir is not supported');
      },
      umask: function() {
        return 0;
      },
      hrtime: function(e) {
        var a = 0.001 * F.call(B),
          o = Math.floor(a),
          t = Math.floor((a % 1) * 1e9);
        return e && ((o -= e[0]), (t -= e[1]) < 0 && (o--, (t += 1e9))), [o, t];
      },
      platform: 'browser',
      release: {},
      config: {},
      uptime: function() {
        return (new Date() - H) / 1e3;
      }
    },
    Y = function(e, a) {
      l.forEach(e, function(o, t) {
        t !== a &&
          t.toUpperCase() === a.toUpperCase() &&
          ((e[a] = o), delete e[t]);
      });
    },
    W = function(e, a, o, t, n) {
      return (function(e, a, o, t, n) {
        return (
          (e.config = a),
          o && (e.code = o),
          (e.request = t),
          (e.response = n),
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
      })(new Error(e), a, o, t, n);
    },
    $ = [
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
    J = l.isStandardBrowserEnv()
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
              var o = l.isString(a) ? t(a) : a;
              return o.protocol === e.protocol && o.host === e.host;
            }
          );
        })()
      : function() {
          return !0;
        },
    K = l.isStandardBrowserEnv()
      ? {
          write: function(e, a, o, t, n, i) {
            var r = [];
            r.push(e + '=' + encodeURIComponent(a)),
              l.isNumber(o) && r.push('expires=' + new Date(o).toGMTString()),
              l.isString(t) && r.push('path=' + t),
              l.isString(n) && r.push('domain=' + n),
              !0 === i && r.push('secure'),
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
    V = function(e) {
      return new Promise(function(a, o) {
        var t = e.data,
          n = e.headers;
        l.isFormData(t) && delete n['Content-Type'];
        var i = new XMLHttpRequest();
        if (e.auth) {
          var r = e.auth.username || '',
            s = e.auth.password || '';
          n.Authorization = 'Basic ' + btoa(r + ':' + s);
        }
        if (
          (i.open(
            e.method.toUpperCase(),
            g(e.url, e.params, e.paramsSerializer),
            !0
          ),
          (i.timeout = e.timeout),
          (i.onreadystatechange = function() {
            if (
              i &&
              4 === i.readyState &&
              (0 !== i.status ||
                (i.responseURL && 0 === i.responseURL.indexOf('file:')))
            ) {
              var t,
                n,
                r,
                s,
                u,
                m =
                  'getAllResponseHeaders' in i
                    ? ((t = i.getAllResponseHeaders()),
                      (u = {}),
                      t
                        ? (l.forEach(t.split('\n'), function(e) {
                            if (
                              ((s = e.indexOf(':')),
                              (n = l.trim(e.substr(0, s)).toLowerCase()),
                              (r = l.trim(e.substr(s + 1))),
                              n)
                            ) {
                              if (u[n] && $.indexOf(n) >= 0) return;
                              u[n] =
                                'set-cookie' === n
                                  ? (u[n] ? u[n] : []).concat([r])
                                  : u[n]
                                  ? u[n] + ', ' + r
                                  : r;
                            }
                          }),
                          u)
                        : u)
                    : null,
                c = {
                  data:
                    e.responseType && 'text' !== e.responseType
                      ? i.response
                      : i.responseText,
                  status: i.status,
                  statusText: i.statusText,
                  headers: m,
                  config: e,
                  request: i
                };
              !(function(e, a, o) {
                var t = o.config.validateStatus;
                !t || t(o.status)
                  ? e(o)
                  : a(
                      W(
                        'Request failed with status code ' + o.status,
                        o.config,
                        null,
                        o.request,
                        o
                      )
                    );
              })(a, o, c),
                (i = null);
            }
          }),
          (i.onabort = function() {
            i && (o(W('Request aborted', e, 'ECONNABORTED', i)), (i = null));
          }),
          (i.onerror = function() {
            o(W('Network Error', e, null, i)), (i = null);
          }),
          (i.ontimeout = function() {
            o(
              W('timeout of ' + e.timeout + 'ms exceeded', e, 'ECONNABORTED', i)
            ),
              (i = null);
          }),
          l.isStandardBrowserEnv())
        ) {
          var u = K,
            m =
              (e.withCredentials || J(e.url)) && e.xsrfCookieName
                ? u.read(e.xsrfCookieName)
                : void 0;
          m && (n[e.xsrfHeaderName] = m);
        }
        if (
          ('setRequestHeader' in i &&
            l.forEach(n, function(e, a) {
              void 0 === t && 'content-type' === a.toLowerCase()
                ? delete n[a]
                : i.setRequestHeader(a, e);
            }),
          e.withCredentials && (i.withCredentials = !0),
          e.responseType)
        )
          try {
            i.responseType = e.responseType;
          } catch (a) {
            if ('json' !== e.responseType) throw a;
          }
        'function' == typeof e.onDownloadProgress &&
          i.addEventListener('progress', e.onDownloadProgress),
          'function' == typeof e.onUploadProgress &&
            i.upload &&
            i.upload.addEventListener('progress', e.onUploadProgress),
          e.cancelToken &&
            e.cancelToken.promise.then(function(e) {
              i && (i.abort(), o(e), (i = null));
            }),
          void 0 === t && (t = null),
          i.send(t);
      });
    },
    G = { 'Content-Type': 'application/x-www-form-urlencoded' };
  function Z(e, a) {
    !l.isUndefined(e) &&
      l.isUndefined(e['Content-Type']) &&
      (e['Content-Type'] = a);
  }
  var Q,
    ee = {
      adapter:
        (void 0 !== X &&
        '[object process]' === Object.prototype.toString.call(X)
          ? (Q = V)
          : 'undefined' != typeof XMLHttpRequest && (Q = V),
        Q),
      transformRequest: [
        function(e, a) {
          return (
            Y(a, 'Accept'),
            Y(a, 'Content-Type'),
            l.isFormData(e) ||
            l.isArrayBuffer(e) ||
            l.isBuffer(e) ||
            l.isStream(e) ||
            l.isFile(e) ||
            l.isBlob(e)
              ? e
              : l.isArrayBufferView(e)
              ? e.buffer
              : l.isURLSearchParams(e)
              ? (Z(a, 'application/x-www-form-urlencoded;charset=utf-8'),
                e.toString())
              : l.isObject(e)
              ? (Z(a, 'application/json;charset=utf-8'), JSON.stringify(e))
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
      }
    };
  (ee.headers = { common: { Accept: 'application/json, text/plain, */*' } }),
    l.forEach(['delete', 'get', 'head'], function(e) {
      ee.headers[e] = {};
    }),
    l.forEach(['post', 'put', 'patch'], function(e) {
      ee.headers[e] = l.merge(G);
    });
  var ae = ee;
  function oe(e) {
    e.cancelToken && e.cancelToken.throwIfRequested();
  }
  var te = function(e) {
      var a, o, t;
      return (
        oe(e),
        e.baseURL &&
          ((t = e.url), !/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t)) &&
          (e.url =
            ((a = e.baseURL),
            (o = e.url)
              ? a.replace(/\/+$/, '') + '/' + o.replace(/^\/+/, '')
              : a)),
        (e.headers = e.headers || {}),
        (e.data = k(e.data, e.headers, e.transformRequest)),
        (e.headers = l.merge(
          e.headers.common || {},
          e.headers[e.method] || {},
          e.headers || {}
        )),
        l.forEach(
          ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
          function(a) {
            delete e.headers[a];
          }
        ),
        (e.adapter || ae.adapter)(e).then(
          function(a) {
            return (
              oe(e), (a.data = k(a.data, a.headers, e.transformResponse)), a
            );
          },
          function(a) {
            return (
              y(a) ||
                (oe(e),
                a &&
                  a.response &&
                  (a.response.data = k(
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
    ne = function(e, a) {
      a = a || {};
      var o = {};
      return (
        l.forEach(['url', 'method', 'params', 'data'], function(e) {
          void 0 !== a[e] && (o[e] = a[e]);
        }),
        l.forEach(['headers', 'auth', 'proxy'], function(t) {
          l.isObject(a[t])
            ? (o[t] = l.deepMerge(e[t], a[t]))
            : void 0 !== a[t]
            ? (o[t] = a[t])
            : l.isObject(e[t])
            ? (o[t] = l.deepMerge(e[t]))
            : void 0 !== e[t] && (o[t] = e[t]);
        }),
        l.forEach(
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
  function ie(e) {
    (this.defaults = e),
      (this.interceptors = { request: new f(), response: new f() });
  }
  (ie.prototype.request = function(e) {
    'string' == typeof e
      ? ((e = arguments[1] || {}).url = arguments[0])
      : (e = e || {}),
      ((e = ne(this.defaults, e)).method = e.method
        ? e.method.toLowerCase()
        : 'get');
    var a = [te, void 0],
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
    (ie.prototype.getUri = function(e) {
      return (
        (e = ne(this.defaults, e)),
        g(e.url, e.params, e.paramsSerializer).replace(/^\?/, '')
      );
    }),
    l.forEach(['delete', 'get', 'head', 'options'], function(e) {
      ie.prototype[e] = function(a, o) {
        return this.request(l.merge(o || {}, { method: e, url: a }));
      };
    }),
    l.forEach(['post', 'put', 'patch'], function(e) {
      ie.prototype[e] = function(a, o, t) {
        return this.request(l.merge(t || {}, { method: e, url: a, data: o }));
      };
    });
  var re = ie;
  function se(e) {
    this.message = e;
  }
  (se.prototype.toString = function() {
    return 'Cancel' + (this.message ? ': ' + this.message : '');
  }),
    (se.prototype.__CANCEL__ = !0);
  var ue = se;
  function me(e) {
    if ('function' != typeof e)
      throw new TypeError('executor must be a function.');
    var a;
    this.promise = new Promise(function(e) {
      a = e;
    });
    var o = this;
    e(function(e) {
      o.reason || ((o.reason = new ue(e)), a(o.reason));
    });
  }
  (me.prototype.throwIfRequested = function() {
    if (this.reason) throw this.reason;
  }),
    (me.source = function() {
      var e;
      return {
        token: new me(function(a) {
          e = a;
        }),
        cancel: e
      };
    });
  var ce = me;
  function pe(e) {
    var a = new re(e),
      o = r(re.prototype.request, a);
    return l.extend(o, re.prototype, a), l.extend(o, a), o;
  }
  var le = pe(ae);
  (le.Axios = re),
    (le.create = function(e) {
      return pe(ne(le.defaults, e));
    }),
    (le.Cancel = ue),
    (le.CancelToken = ce),
    (le.isCancel = y),
    (le.all = function(e) {
      return Promise.all(e);
    }),
    (le.spread = function(e) {
      return function(a) {
        return e.apply(null, a);
      };
    });
  var he = le,
    ge = le;
  he.default = ge;
  var de = he,
    fe = [],
    ke = [],
    ye = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
    be = !1;
  function je() {
    be = !0;
    for (
      var e =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
        a = 0,
        o = e.length;
      a < o;
      ++a
    )
      (fe[a] = e[a]), (ke[e.charCodeAt(a)] = a);
    (ke['-'.charCodeAt(0)] = 62), (ke['_'.charCodeAt(0)] = 63);
  }
  function ve(e, a, o) {
    for (var t, n, i = [], r = a; r < o; r += 3)
      (t = (e[r] << 16) + (e[r + 1] << 8) + e[r + 2]),
        i.push(
          fe[((n = t) >> 18) & 63] +
            fe[(n >> 12) & 63] +
            fe[(n >> 6) & 63] +
            fe[63 & n]
        );
    return i.join('');
  }
  function we(e) {
    var a;
    be || je();
    for (
      var o = e.length, t = o % 3, n = '', i = [], r = 0, s = o - t;
      r < s;
      r += 16383
    )
      i.push(ve(e, r, r + 16383 > s ? s : r + 16383));
    return (
      1 === t
        ? ((a = e[o - 1]),
          (n += fe[a >> 2]),
          (n += fe[(a << 4) & 63]),
          (n += '=='))
        : 2 === t &&
          ((a = (e[o - 2] << 8) + e[o - 1]),
          (n += fe[a >> 10]),
          (n += fe[(a >> 4) & 63]),
          (n += fe[(a << 2) & 63]),
          (n += '=')),
      i.push(n),
      i.join('')
    );
  }
  function ze(e, a, o, t, n) {
    var i,
      r,
      s = 8 * n - t - 1,
      u = (1 << s) - 1,
      m = u >> 1,
      c = -7,
      p = o ? n - 1 : 0,
      l = o ? -1 : 1,
      h = e[a + p];
    for (
      p += l, i = h & ((1 << -c) - 1), h >>= -c, c += s;
      c > 0;
      i = 256 * i + e[a + p], p += l, c -= 8
    );
    for (
      r = i & ((1 << -c) - 1), i >>= -c, c += t;
      c > 0;
      r = 256 * r + e[a + p], p += l, c -= 8
    );
    if (0 === i) i = 1 - m;
    else {
      if (i === u) return r ? NaN : (1 / 0) * (h ? -1 : 1);
      (r += Math.pow(2, t)), (i -= m);
    }
    return (h ? -1 : 1) * r * Math.pow(2, i - t);
  }
  function xe(e, a, o, t, n, i) {
    var r,
      s,
      u,
      m = 8 * i - n - 1,
      c = (1 << m) - 1,
      p = c >> 1,
      l = 23 === n ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
      h = t ? 0 : i - 1,
      g = t ? 1 : -1,
      d = a < 0 || (0 === a && 1 / a < 0) ? 1 : 0;
    for (
      a = Math.abs(a),
        isNaN(a) || a === 1 / 0
          ? ((s = isNaN(a) ? 1 : 0), (r = c))
          : ((r = Math.floor(Math.log(a) / Math.LN2)),
            a * (u = Math.pow(2, -r)) < 1 && (r--, (u *= 2)),
            (a += r + p >= 1 ? l / u : l * Math.pow(2, 1 - p)) * u >= 2 &&
              (r++, (u /= 2)),
            r + p >= c
              ? ((s = 0), (r = c))
              : r + p >= 1
              ? ((s = (a * u - 1) * Math.pow(2, n)), (r += p))
              : ((s = a * Math.pow(2, p - 1) * Math.pow(2, n)), (r = 0)));
      n >= 8;
      e[o + h] = 255 & s, h += g, s /= 256, n -= 8
    );
    for (
      r = (r << n) | s, m += n;
      m > 0;
      e[o + h] = 255 & r, h += g, r /= 256, m -= 8
    );
    e[o + h - g] |= 128 * d;
  }
  var Ee = {}.toString,
    Ce =
      Array.isArray ||
      function(e) {
        return '[object Array]' == Ee.call(e);
      };
  function Se() {
    return Re.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
  }
  function Ae(e, a) {
    if (Se() < a) throw new RangeError('Invalid typed array length');
    return (
      Re.TYPED_ARRAY_SUPPORT
        ? ((e = new Uint8Array(a)).__proto__ = Re.prototype)
        : (null === e && (e = new Re(a)), (e.length = a)),
      e
    );
  }
  function Re(e, a, o) {
    if (!(Re.TYPED_ARRAY_SUPPORT || this instanceof Re)) return new Re(e, a, o);
    if ('number' == typeof e) {
      if ('string' == typeof a)
        throw new Error(
          'If encoding is specified then the first argument must be a string'
        );
      return Oe(this, e);
    }
    return _e(this, e, a, o);
  }
  function _e(e, a, o, t) {
    if ('number' == typeof a)
      throw new TypeError('"value" argument must not be a number');
    return 'undefined' != typeof ArrayBuffer && a instanceof ArrayBuffer
      ? (function(e, a, o, t) {
          if ((a.byteLength, o < 0 || a.byteLength < o))
            throw new RangeError("'offset' is out of bounds");
          if (a.byteLength < o + (t || 0))
            throw new RangeError("'length' is out of bounds");
          a =
            void 0 === o && void 0 === t
              ? new Uint8Array(a)
              : void 0 === t
              ? new Uint8Array(a, o)
              : new Uint8Array(a, o, t);
          Re.TYPED_ARRAY_SUPPORT
            ? ((e = a).__proto__ = Re.prototype)
            : (e = qe(e, a));
          return e;
        })(e, a, o, t)
      : 'string' == typeof a
      ? (function(e, a, o) {
          ('string' == typeof o && '' !== o) || (o = 'utf8');
          if (!Re.isEncoding(o))
            throw new TypeError('"encoding" must be a valid string encoding');
          var t = 0 | Me(a, o),
            n = (e = Ae(e, t)).write(a, o);
          n !== t && (e = e.slice(0, n));
          return e;
        })(e, a, o)
      : (function(e, a) {
          if (Le(a)) {
            var o = 0 | Pe(a.length);
            return 0 === (e = Ae(e, o)).length ? e : (a.copy(e, 0, 0, o), e);
          }
          if (a) {
            if (
              ('undefined' != typeof ArrayBuffer &&
                a.buffer instanceof ArrayBuffer) ||
              'length' in a
            )
              return 'number' != typeof a.length || (t = a.length) != t
                ? Ae(e, 0)
                : qe(e, a);
            if ('Buffer' === a.type && Ce(a.data)) return qe(e, a.data);
          }
          var t;
          throw new TypeError(
            'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.'
          );
        })(e, a);
  }
  function Te(e) {
    if ('number' != typeof e)
      throw new TypeError('"size" argument must be a number');
    if (e < 0) throw new RangeError('"size" argument must not be negative');
  }
  function Oe(e, a) {
    if ((Te(a), (e = Ae(e, a < 0 ? 0 : 0 | Pe(a))), !Re.TYPED_ARRAY_SUPPORT))
      for (var o = 0; o < a; ++o) e[o] = 0;
    return e;
  }
  function qe(e, a) {
    var o = a.length < 0 ? 0 : 0 | Pe(a.length);
    e = Ae(e, o);
    for (var t = 0; t < o; t += 1) e[t] = 255 & a[t];
    return e;
  }
  function Pe(e) {
    if (e >= Se())
      throw new RangeError(
        'Attempt to allocate Buffer larger than maximum size: 0x' +
          Se().toString(16) +
          ' bytes'
      );
    return 0 | e;
  }
  function Le(e) {
    return !(null == e || !e._isBuffer);
  }
  function Me(e, a) {
    if (Le(e)) return e.length;
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
          return ma(e).length;
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return 2 * o;
        case 'hex':
          return o >>> 1;
        case 'base64':
          return ca(e).length;
        default:
          if (t) return ma(e).length;
          (a = ('' + a).toLowerCase()), (t = !0);
      }
  }
  function Ne(e, a, o) {
    var t = !1;
    if (((void 0 === a || a < 0) && (a = 0), a > this.length)) return '';
    if (((void 0 === o || o > this.length) && (o = this.length), o <= 0))
      return '';
    if ((o >>>= 0) <= (a >>>= 0)) return '';
    for (e || (e = 'utf8'); ; )
      switch (e) {
        case 'hex':
          return Ze(this, a, o);
        case 'utf8':
        case 'utf-8':
          return Je(this, a, o);
        case 'ascii':
          return Ve(this, a, o);
        case 'latin1':
        case 'binary':
          return Ge(this, a, o);
        case 'base64':
          return $e(this, a, o);
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return Qe(this, a, o);
        default:
          if (t) throw new TypeError('Unknown encoding: ' + e);
          (e = (e + '').toLowerCase()), (t = !0);
      }
  }
  function De(e, a, o) {
    var t = e[a];
    (e[a] = e[o]), (e[o] = t);
  }
  function Ie(e, a, o, t, n) {
    if (0 === e.length) return -1;
    if (
      ('string' == typeof o
        ? ((t = o), (o = 0))
        : o > 2147483647
        ? (o = 2147483647)
        : o < -2147483648 && (o = -2147483648),
      (o = +o),
      isNaN(o) && (o = n ? 0 : e.length - 1),
      o < 0 && (o = e.length + o),
      o >= e.length)
    ) {
      if (n) return -1;
      o = e.length - 1;
    } else if (o < 0) {
      if (!n) return -1;
      o = 0;
    }
    if (('string' == typeof a && (a = Re.from(a, t)), Le(a)))
      return 0 === a.length ? -1 : Ue(e, a, o, t, n);
    if ('number' == typeof a)
      return (
        (a &= 255),
        Re.TYPED_ARRAY_SUPPORT &&
        'function' == typeof Uint8Array.prototype.indexOf
          ? n
            ? Uint8Array.prototype.indexOf.call(e, a, o)
            : Uint8Array.prototype.lastIndexOf.call(e, a, o)
          : Ue(e, [a], o, t, n)
      );
    throw new TypeError('val must be string, number or Buffer');
  }
  function Ue(e, a, o, t, n) {
    var i,
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
    if (n) {
      var c = -1;
      for (i = o; i < s; i++)
        if (m(e, i) === m(a, -1 === c ? 0 : i - c)) {
          if ((-1 === c && (c = i), i - c + 1 === u)) return c * r;
        } else -1 !== c && (i -= i - c), (c = -1);
    } else
      for (o + u > s && (o = s - u), i = o; i >= 0; i--) {
        for (var p = !0, l = 0; l < u; l++)
          if (m(e, i + l) !== m(a, l)) {
            p = !1;
            break;
          }
        if (p) return i;
      }
    return -1;
  }
  function Be(e, a, o, t) {
    o = Number(o) || 0;
    var n = e.length - o;
    t ? (t = Number(t)) > n && (t = n) : (t = n);
    var i = a.length;
    if (i % 2 != 0) throw new TypeError('Invalid hex string');
    t > i / 2 && (t = i / 2);
    for (var r = 0; r < t; ++r) {
      var s = parseInt(a.substr(2 * r, 2), 16);
      if (isNaN(s)) return r;
      e[o + r] = s;
    }
    return r;
  }
  function Fe(e, a, o, t) {
    return pa(ma(a, e.length - o), e, o, t);
  }
  function He(e, a, o, t) {
    return pa(
      (function(e) {
        for (var a = [], o = 0; o < e.length; ++o)
          a.push(255 & e.charCodeAt(o));
        return a;
      })(a),
      e,
      o,
      t
    );
  }
  function Xe(e, a, o, t) {
    return He(e, a, o, t);
  }
  function Ye(e, a, o, t) {
    return pa(ca(a), e, o, t);
  }
  function We(e, a, o, t) {
    return pa(
      (function(e, a) {
        for (var o, t, n, i = [], r = 0; r < e.length && !((a -= 2) < 0); ++r)
          (o = e.charCodeAt(r)),
            (t = o >> 8),
            (n = o % 256),
            i.push(n),
            i.push(t);
        return i;
      })(a, e.length - o),
      e,
      o,
      t
    );
  }
  function $e(e, a, o) {
    return 0 === a && o === e.length ? we(e) : we(e.slice(a, o));
  }
  function Je(e, a, o) {
    o = Math.min(e.length, o);
    for (var t = [], n = a; n < o; ) {
      var i,
        r,
        s,
        u,
        m = e[n],
        c = null,
        p = m > 239 ? 4 : m > 223 ? 3 : m > 191 ? 2 : 1;
      if (n + p <= o)
        switch (p) {
          case 1:
            m < 128 && (c = m);
            break;
          case 2:
            128 == (192 & (i = e[n + 1])) &&
              (u = ((31 & m) << 6) | (63 & i)) > 127 &&
              (c = u);
            break;
          case 3:
            (i = e[n + 1]),
              (r = e[n + 2]),
              128 == (192 & i) &&
                128 == (192 & r) &&
                (u = ((15 & m) << 12) | ((63 & i) << 6) | (63 & r)) > 2047 &&
                (u < 55296 || u > 57343) &&
                (c = u);
            break;
          case 4:
            (i = e[n + 1]),
              (r = e[n + 2]),
              (s = e[n + 3]),
              128 == (192 & i) &&
                128 == (192 & r) &&
                128 == (192 & s) &&
                (u =
                  ((15 & m) << 18) |
                  ((63 & i) << 12) |
                  ((63 & r) << 6) |
                  (63 & s)) > 65535 &&
                u < 1114112 &&
                (c = u);
        }
      null === c
        ? ((c = 65533), (p = 1))
        : c > 65535 &&
          ((c -= 65536),
          t.push(((c >>> 10) & 1023) | 55296),
          (c = 56320 | (1023 & c))),
        t.push(c),
        (n += p);
    }
    return (function(e) {
      var a = e.length;
      if (a <= Ke) return String.fromCharCode.apply(String, e);
      var o = '',
        t = 0;
      for (; t < a; )
        o += String.fromCharCode.apply(String, e.slice(t, (t += Ke)));
      return o;
    })(t);
  }
  (Re.TYPED_ARRAY_SUPPORT =
    void 0 === b.TYPED_ARRAY_SUPPORT || b.TYPED_ARRAY_SUPPORT),
    (Re.poolSize = 8192),
    (Re._augment = function(e) {
      return (e.__proto__ = Re.prototype), e;
    }),
    (Re.from = function(e, a, o) {
      return _e(null, e, a, o);
    }),
    Re.TYPED_ARRAY_SUPPORT &&
      ((Re.prototype.__proto__ = Uint8Array.prototype),
      (Re.__proto__ = Uint8Array)),
    (Re.alloc = function(e, a, o) {
      return (function(e, a, o, t) {
        return (
          Te(a),
          a <= 0
            ? Ae(e, a)
            : void 0 !== o
            ? 'string' == typeof t
              ? Ae(e, a).fill(o, t)
              : Ae(e, a).fill(o)
            : Ae(e, a)
        );
      })(null, e, a, o);
    }),
    (Re.allocUnsafe = function(e) {
      return Oe(null, e);
    }),
    (Re.allocUnsafeSlow = function(e) {
      return Oe(null, e);
    }),
    (Re.isBuffer = la),
    (Re.compare = function(e, a) {
      if (!Le(e) || !Le(a)) throw new TypeError('Arguments must be Buffers');
      if (e === a) return 0;
      for (
        var o = e.length, t = a.length, n = 0, i = Math.min(o, t);
        n < i;
        ++n
      )
        if (e[n] !== a[n]) {
          (o = e[n]), (t = a[n]);
          break;
        }
      return o < t ? -1 : t < o ? 1 : 0;
    }),
    (Re.isEncoding = function(e) {
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
    (Re.concat = function(e, a) {
      if (!Ce(e))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (0 === e.length) return Re.alloc(0);
      var o;
      if (void 0 === a) for (a = 0, o = 0; o < e.length; ++o) a += e[o].length;
      var t = Re.allocUnsafe(a),
        n = 0;
      for (o = 0; o < e.length; ++o) {
        var i = e[o];
        if (!Le(i))
          throw new TypeError('"list" argument must be an Array of Buffers');
        i.copy(t, n), (n += i.length);
      }
      return t;
    }),
    (Re.byteLength = Me),
    (Re.prototype._isBuffer = !0),
    (Re.prototype.swap16 = function() {
      var e = this.length;
      if (e % 2 != 0)
        throw new RangeError('Buffer size must be a multiple of 16-bits');
      for (var a = 0; a < e; a += 2) De(this, a, a + 1);
      return this;
    }),
    (Re.prototype.swap32 = function() {
      var e = this.length;
      if (e % 4 != 0)
        throw new RangeError('Buffer size must be a multiple of 32-bits');
      for (var a = 0; a < e; a += 4) De(this, a, a + 3), De(this, a + 1, a + 2);
      return this;
    }),
    (Re.prototype.swap64 = function() {
      var e = this.length;
      if (e % 8 != 0)
        throw new RangeError('Buffer size must be a multiple of 64-bits');
      for (var a = 0; a < e; a += 8)
        De(this, a, a + 7),
          De(this, a + 1, a + 6),
          De(this, a + 2, a + 5),
          De(this, a + 3, a + 4);
      return this;
    }),
    (Re.prototype.toString = function() {
      var e = 0 | this.length;
      return 0 === e
        ? ''
        : 0 === arguments.length
        ? Je(this, 0, e)
        : Ne.apply(this, arguments);
    }),
    (Re.prototype.equals = function(e) {
      if (!Le(e)) throw new TypeError('Argument must be a Buffer');
      return this === e || 0 === Re.compare(this, e);
    }),
    (Re.prototype.inspect = function() {
      var e = '';
      return (
        this.length > 0 &&
          ((e = this.toString('hex', 0, 50)
            .match(/.{2}/g)
            .join(' ')),
          this.length > 50 && (e += ' ... ')),
        '<Buffer ' + e + '>'
      );
    }),
    (Re.prototype.compare = function(e, a, o, t, n) {
      if (!Le(e)) throw new TypeError('Argument must be a Buffer');
      if (
        (void 0 === a && (a = 0),
        void 0 === o && (o = e ? e.length : 0),
        void 0 === t && (t = 0),
        void 0 === n && (n = this.length),
        a < 0 || o > e.length || t < 0 || n > this.length)
      )
        throw new RangeError('out of range index');
      if (t >= n && a >= o) return 0;
      if (t >= n) return -1;
      if (a >= o) return 1;
      if (this === e) return 0;
      for (
        var i = (n >>>= 0) - (t >>>= 0),
          r = (o >>>= 0) - (a >>>= 0),
          s = Math.min(i, r),
          u = this.slice(t, n),
          m = e.slice(a, o),
          c = 0;
        c < s;
        ++c
      )
        if (u[c] !== m[c]) {
          (i = u[c]), (r = m[c]);
          break;
        }
      return i < r ? -1 : r < i ? 1 : 0;
    }),
    (Re.prototype.includes = function(e, a, o) {
      return -1 !== this.indexOf(e, a, o);
    }),
    (Re.prototype.indexOf = function(e, a, o) {
      return Ie(this, e, a, o, !0);
    }),
    (Re.prototype.lastIndexOf = function(e, a, o) {
      return Ie(this, e, a, o, !1);
    }),
    (Re.prototype.write = function(e, a, o, t) {
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
      var n = this.length - a;
      if (
        ((void 0 === o || o > n) && (o = n),
        (e.length > 0 && (o < 0 || a < 0)) || a > this.length)
      )
        throw new RangeError('Attempt to write outside buffer bounds');
      t || (t = 'utf8');
      for (var i = !1; ; )
        switch (t) {
          case 'hex':
            return Be(this, e, a, o);
          case 'utf8':
          case 'utf-8':
            return Fe(this, e, a, o);
          case 'ascii':
            return He(this, e, a, o);
          case 'latin1':
          case 'binary':
            return Xe(this, e, a, o);
          case 'base64':
            return Ye(this, e, a, o);
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return We(this, e, a, o);
          default:
            if (i) throw new TypeError('Unknown encoding: ' + t);
            (t = ('' + t).toLowerCase()), (i = !0);
        }
    }),
    (Re.prototype.toJSON = function() {
      return {
        type: 'Buffer',
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    });
  var Ke = 4096;
  function Ve(e, a, o) {
    var t = '';
    o = Math.min(e.length, o);
    for (var n = a; n < o; ++n) t += String.fromCharCode(127 & e[n]);
    return t;
  }
  function Ge(e, a, o) {
    var t = '';
    o = Math.min(e.length, o);
    for (var n = a; n < o; ++n) t += String.fromCharCode(e[n]);
    return t;
  }
  function Ze(e, a, o) {
    var t = e.length;
    (!a || a < 0) && (a = 0), (!o || o < 0 || o > t) && (o = t);
    for (var n = '', i = a; i < o; ++i) n += ua(e[i]);
    return n;
  }
  function Qe(e, a, o) {
    for (var t = e.slice(a, o), n = '', i = 0; i < t.length; i += 2)
      n += String.fromCharCode(t[i] + 256 * t[i + 1]);
    return n;
  }
  function ea(e, a, o) {
    if (e % 1 != 0 || e < 0) throw new RangeError('offset is not uint');
    if (e + a > o)
      throw new RangeError('Trying to access beyond buffer length');
  }
  function aa(e, a, o, t, n, i) {
    if (!Le(e))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (a > n || a < i)
      throw new RangeError('"value" argument is out of bounds');
    if (o + t > e.length) throw new RangeError('Index out of range');
  }
  function oa(e, a, o, t) {
    a < 0 && (a = 65535 + a + 1);
    for (var n = 0, i = Math.min(e.length - o, 2); n < i; ++n)
      e[o + n] = (a & (255 << (8 * (t ? n : 1 - n)))) >>> (8 * (t ? n : 1 - n));
  }
  function ta(e, a, o, t) {
    a < 0 && (a = 4294967295 + a + 1);
    for (var n = 0, i = Math.min(e.length - o, 4); n < i; ++n)
      e[o + n] = (a >>> (8 * (t ? n : 3 - n))) & 255;
  }
  function na(e, a, o, t, n, i) {
    if (o + t > e.length) throw new RangeError('Index out of range');
    if (o < 0) throw new RangeError('Index out of range');
  }
  function ia(e, a, o, t, n) {
    return n || na(e, 0, o, 4), xe(e, a, o, t, 23, 4), o + 4;
  }
  function ra(e, a, o, t, n) {
    return n || na(e, 0, o, 8), xe(e, a, o, t, 52, 8), o + 8;
  }
  (Re.prototype.slice = function(e, a) {
    var o,
      t = this.length;
    if (
      ((e = ~~e) < 0 ? (e += t) < 0 && (e = 0) : e > t && (e = t),
      (a = void 0 === a ? t : ~~a) < 0
        ? (a += t) < 0 && (a = 0)
        : a > t && (a = t),
      a < e && (a = e),
      Re.TYPED_ARRAY_SUPPORT)
    )
      (o = this.subarray(e, a)).__proto__ = Re.prototype;
    else {
      var n = a - e;
      o = new Re(n, void 0);
      for (var i = 0; i < n; ++i) o[i] = this[i + e];
    }
    return o;
  }),
    (Re.prototype.readUIntLE = function(e, a, o) {
      (e |= 0), (a |= 0), o || ea(e, a, this.length);
      for (var t = this[e], n = 1, i = 0; ++i < a && (n *= 256); )
        t += this[e + i] * n;
      return t;
    }),
    (Re.prototype.readUIntBE = function(e, a, o) {
      (e |= 0), (a |= 0), o || ea(e, a, this.length);
      for (var t = this[e + --a], n = 1; a > 0 && (n *= 256); )
        t += this[e + --a] * n;
      return t;
    }),
    (Re.prototype.readUInt8 = function(e, a) {
      return a || ea(e, 1, this.length), this[e];
    }),
    (Re.prototype.readUInt16LE = function(e, a) {
      return a || ea(e, 2, this.length), this[e] | (this[e + 1] << 8);
    }),
    (Re.prototype.readUInt16BE = function(e, a) {
      return a || ea(e, 2, this.length), (this[e] << 8) | this[e + 1];
    }),
    (Re.prototype.readUInt32LE = function(e, a) {
      return (
        a || ea(e, 4, this.length),
        (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) +
          16777216 * this[e + 3]
      );
    }),
    (Re.prototype.readUInt32BE = function(e, a) {
      return (
        a || ea(e, 4, this.length),
        16777216 * this[e] +
          ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
      );
    }),
    (Re.prototype.readIntLE = function(e, a, o) {
      (e |= 0), (a |= 0), o || ea(e, a, this.length);
      for (var t = this[e], n = 1, i = 0; ++i < a && (n *= 256); )
        t += this[e + i] * n;
      return t >= (n *= 128) && (t -= Math.pow(2, 8 * a)), t;
    }),
    (Re.prototype.readIntBE = function(e, a, o) {
      (e |= 0), (a |= 0), o || ea(e, a, this.length);
      for (var t = a, n = 1, i = this[e + --t]; t > 0 && (n *= 256); )
        i += this[e + --t] * n;
      return i >= (n *= 128) && (i -= Math.pow(2, 8 * a)), i;
    }),
    (Re.prototype.readInt8 = function(e, a) {
      return (
        a || ea(e, 1, this.length),
        128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
      );
    }),
    (Re.prototype.readInt16LE = function(e, a) {
      a || ea(e, 2, this.length);
      var o = this[e] | (this[e + 1] << 8);
      return 32768 & o ? 4294901760 | o : o;
    }),
    (Re.prototype.readInt16BE = function(e, a) {
      a || ea(e, 2, this.length);
      var o = this[e + 1] | (this[e] << 8);
      return 32768 & o ? 4294901760 | o : o;
    }),
    (Re.prototype.readInt32LE = function(e, a) {
      return (
        a || ea(e, 4, this.length),
        this[e] | (this[e + 1] << 8) | (this[e + 2] << 16) | (this[e + 3] << 24)
      );
    }),
    (Re.prototype.readInt32BE = function(e, a) {
      return (
        a || ea(e, 4, this.length),
        (this[e] << 24) | (this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3]
      );
    }),
    (Re.prototype.readFloatLE = function(e, a) {
      return a || ea(e, 4, this.length), ze(this, e, !0, 23, 4);
    }),
    (Re.prototype.readFloatBE = function(e, a) {
      return a || ea(e, 4, this.length), ze(this, e, !1, 23, 4);
    }),
    (Re.prototype.readDoubleLE = function(e, a) {
      return a || ea(e, 8, this.length), ze(this, e, !0, 52, 8);
    }),
    (Re.prototype.readDoubleBE = function(e, a) {
      return a || ea(e, 8, this.length), ze(this, e, !1, 52, 8);
    }),
    (Re.prototype.writeUIntLE = function(e, a, o, t) {
      ((e = +e), (a |= 0), (o |= 0), t) ||
        aa(this, e, a, o, Math.pow(2, 8 * o) - 1, 0);
      var n = 1,
        i = 0;
      for (this[a] = 255 & e; ++i < o && (n *= 256); )
        this[a + i] = (e / n) & 255;
      return a + o;
    }),
    (Re.prototype.writeUIntBE = function(e, a, o, t) {
      ((e = +e), (a |= 0), (o |= 0), t) ||
        aa(this, e, a, o, Math.pow(2, 8 * o) - 1, 0);
      var n = o - 1,
        i = 1;
      for (this[a + n] = 255 & e; --n >= 0 && (i *= 256); )
        this[a + n] = (e / i) & 255;
      return a + o;
    }),
    (Re.prototype.writeUInt8 = function(e, a, o) {
      return (
        (e = +e),
        (a |= 0),
        o || aa(this, e, a, 1, 255, 0),
        Re.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
        (this[a] = 255 & e),
        a + 1
      );
    }),
    (Re.prototype.writeUInt16LE = function(e, a, o) {
      return (
        (e = +e),
        (a |= 0),
        o || aa(this, e, a, 2, 65535, 0),
        Re.TYPED_ARRAY_SUPPORT
          ? ((this[a] = 255 & e), (this[a + 1] = e >>> 8))
          : oa(this, e, a, !0),
        a + 2
      );
    }),
    (Re.prototype.writeUInt16BE = function(e, a, o) {
      return (
        (e = +e),
        (a |= 0),
        o || aa(this, e, a, 2, 65535, 0),
        Re.TYPED_ARRAY_SUPPORT
          ? ((this[a] = e >>> 8), (this[a + 1] = 255 & e))
          : oa(this, e, a, !1),
        a + 2
      );
    }),
    (Re.prototype.writeUInt32LE = function(e, a, o) {
      return (
        (e = +e),
        (a |= 0),
        o || aa(this, e, a, 4, 4294967295, 0),
        Re.TYPED_ARRAY_SUPPORT
          ? ((this[a + 3] = e >>> 24),
            (this[a + 2] = e >>> 16),
            (this[a + 1] = e >>> 8),
            (this[a] = 255 & e))
          : ta(this, e, a, !0),
        a + 4
      );
    }),
    (Re.prototype.writeUInt32BE = function(e, a, o) {
      return (
        (e = +e),
        (a |= 0),
        o || aa(this, e, a, 4, 4294967295, 0),
        Re.TYPED_ARRAY_SUPPORT
          ? ((this[a] = e >>> 24),
            (this[a + 1] = e >>> 16),
            (this[a + 2] = e >>> 8),
            (this[a + 3] = 255 & e))
          : ta(this, e, a, !1),
        a + 4
      );
    }),
    (Re.prototype.writeIntLE = function(e, a, o, t) {
      if (((e = +e), (a |= 0), !t)) {
        var n = Math.pow(2, 8 * o - 1);
        aa(this, e, a, o, n - 1, -n);
      }
      var i = 0,
        r = 1,
        s = 0;
      for (this[a] = 255 & e; ++i < o && (r *= 256); )
        e < 0 && 0 === s && 0 !== this[a + i - 1] && (s = 1),
          (this[a + i] = (((e / r) >> 0) - s) & 255);
      return a + o;
    }),
    (Re.prototype.writeIntBE = function(e, a, o, t) {
      if (((e = +e), (a |= 0), !t)) {
        var n = Math.pow(2, 8 * o - 1);
        aa(this, e, a, o, n - 1, -n);
      }
      var i = o - 1,
        r = 1,
        s = 0;
      for (this[a + i] = 255 & e; --i >= 0 && (r *= 256); )
        e < 0 && 0 === s && 0 !== this[a + i + 1] && (s = 1),
          (this[a + i] = (((e / r) >> 0) - s) & 255);
      return a + o;
    }),
    (Re.prototype.writeInt8 = function(e, a, o) {
      return (
        (e = +e),
        (a |= 0),
        o || aa(this, e, a, 1, 127, -128),
        Re.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
        e < 0 && (e = 255 + e + 1),
        (this[a] = 255 & e),
        a + 1
      );
    }),
    (Re.prototype.writeInt16LE = function(e, a, o) {
      return (
        (e = +e),
        (a |= 0),
        o || aa(this, e, a, 2, 32767, -32768),
        Re.TYPED_ARRAY_SUPPORT
          ? ((this[a] = 255 & e), (this[a + 1] = e >>> 8))
          : oa(this, e, a, !0),
        a + 2
      );
    }),
    (Re.prototype.writeInt16BE = function(e, a, o) {
      return (
        (e = +e),
        (a |= 0),
        o || aa(this, e, a, 2, 32767, -32768),
        Re.TYPED_ARRAY_SUPPORT
          ? ((this[a] = e >>> 8), (this[a + 1] = 255 & e))
          : oa(this, e, a, !1),
        a + 2
      );
    }),
    (Re.prototype.writeInt32LE = function(e, a, o) {
      return (
        (e = +e),
        (a |= 0),
        o || aa(this, e, a, 4, 2147483647, -2147483648),
        Re.TYPED_ARRAY_SUPPORT
          ? ((this[a] = 255 & e),
            (this[a + 1] = e >>> 8),
            (this[a + 2] = e >>> 16),
            (this[a + 3] = e >>> 24))
          : ta(this, e, a, !0),
        a + 4
      );
    }),
    (Re.prototype.writeInt32BE = function(e, a, o) {
      return (
        (e = +e),
        (a |= 0),
        o || aa(this, e, a, 4, 2147483647, -2147483648),
        e < 0 && (e = 4294967295 + e + 1),
        Re.TYPED_ARRAY_SUPPORT
          ? ((this[a] = e >>> 24),
            (this[a + 1] = e >>> 16),
            (this[a + 2] = e >>> 8),
            (this[a + 3] = 255 & e))
          : ta(this, e, a, !1),
        a + 4
      );
    }),
    (Re.prototype.writeFloatLE = function(e, a, o) {
      return ia(this, e, a, !0, o);
    }),
    (Re.prototype.writeFloatBE = function(e, a, o) {
      return ia(this, e, a, !1, o);
    }),
    (Re.prototype.writeDoubleLE = function(e, a, o) {
      return ra(this, e, a, !0, o);
    }),
    (Re.prototype.writeDoubleBE = function(e, a, o) {
      return ra(this, e, a, !1, o);
    }),
    (Re.prototype.copy = function(e, a, o, t) {
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
      var n,
        i = t - o;
      if (this === e && o < a && a < t)
        for (n = i - 1; n >= 0; --n) e[n + a] = this[n + o];
      else if (i < 1e3 || !Re.TYPED_ARRAY_SUPPORT)
        for (n = 0; n < i; ++n) e[n + a] = this[n + o];
      else Uint8Array.prototype.set.call(e, this.subarray(o, o + i), a);
      return i;
    }),
    (Re.prototype.fill = function(e, a, o, t) {
      if ('string' == typeof e) {
        if (
          ('string' == typeof a
            ? ((t = a), (a = 0), (o = this.length))
            : 'string' == typeof o && ((t = o), (o = this.length)),
          1 === e.length)
        ) {
          var n = e.charCodeAt(0);
          n < 256 && (e = n);
        }
        if (void 0 !== t && 'string' != typeof t)
          throw new TypeError('encoding must be a string');
        if ('string' == typeof t && !Re.isEncoding(t))
          throw new TypeError('Unknown encoding: ' + t);
      } else 'number' == typeof e && (e &= 255);
      if (a < 0 || this.length < a || this.length < o)
        throw new RangeError('Out of range index');
      if (o <= a) return this;
      var i;
      if (
        ((a >>>= 0),
        (o = void 0 === o ? this.length : o >>> 0),
        e || (e = 0),
        'number' == typeof e)
      )
        for (i = a; i < o; ++i) this[i] = e;
      else {
        var r = Le(e) ? e : ma(new Re(e, t).toString()),
          s = r.length;
        for (i = 0; i < o - a; ++i) this[i + a] = r[i % s];
      }
      return this;
    });
  var sa = /[^+\/0-9A-Za-z-_]/g;
  function ua(e) {
    return e < 16 ? '0' + e.toString(16) : e.toString(16);
  }
  function ma(e, a) {
    var o;
    a = a || 1 / 0;
    for (var t = e.length, n = null, i = [], r = 0; r < t; ++r) {
      if ((o = e.charCodeAt(r)) > 55295 && o < 57344) {
        if (!n) {
          if (o > 56319) {
            (a -= 3) > -1 && i.push(239, 191, 189);
            continue;
          }
          if (r + 1 === t) {
            (a -= 3) > -1 && i.push(239, 191, 189);
            continue;
          }
          n = o;
          continue;
        }
        if (o < 56320) {
          (a -= 3) > -1 && i.push(239, 191, 189), (n = o);
          continue;
        }
        o = 65536 + (((n - 55296) << 10) | (o - 56320));
      } else n && (a -= 3) > -1 && i.push(239, 191, 189);
      if (((n = null), o < 128)) {
        if ((a -= 1) < 0) break;
        i.push(o);
      } else if (o < 2048) {
        if ((a -= 2) < 0) break;
        i.push((o >> 6) | 192, (63 & o) | 128);
      } else if (o < 65536) {
        if ((a -= 3) < 0) break;
        i.push((o >> 12) | 224, ((o >> 6) & 63) | 128, (63 & o) | 128);
      } else {
        if (!(o < 1114112)) throw new Error('Invalid code point');
        if ((a -= 4) < 0) break;
        i.push(
          (o >> 18) | 240,
          ((o >> 12) & 63) | 128,
          ((o >> 6) & 63) | 128,
          (63 & o) | 128
        );
      }
    }
    return i;
  }
  function ca(e) {
    return (function(e) {
      var a, o, t, n, i, r;
      be || je();
      var s = e.length;
      if (s % 4 > 0)
        throw new Error('Invalid string. Length must be a multiple of 4');
      (i = '=' === e[s - 2] ? 2 : '=' === e[s - 1] ? 1 : 0),
        (r = new ye((3 * s) / 4 - i)),
        (t = i > 0 ? s - 4 : s);
      var u = 0;
      for (a = 0, o = 0; a < t; a += 4, o += 3)
        (n =
          (ke[e.charCodeAt(a)] << 18) |
          (ke[e.charCodeAt(a + 1)] << 12) |
          (ke[e.charCodeAt(a + 2)] << 6) |
          ke[e.charCodeAt(a + 3)]),
          (r[u++] = (n >> 16) & 255),
          (r[u++] = (n >> 8) & 255),
          (r[u++] = 255 & n);
      return (
        2 === i
          ? ((n = (ke[e.charCodeAt(a)] << 2) | (ke[e.charCodeAt(a + 1)] >> 4)),
            (r[u++] = 255 & n))
          : 1 === i &&
            ((n =
              (ke[e.charCodeAt(a)] << 10) |
              (ke[e.charCodeAt(a + 1)] << 4) |
              (ke[e.charCodeAt(a + 2)] >> 2)),
            (r[u++] = (n >> 8) & 255),
            (r[u++] = 255 & n)),
        r
      );
    })(
      (function(e) {
        if (
          (e = (function(e) {
            return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, '');
          })(e).replace(sa, '')).length < 2
        )
          return '';
        for (; e.length % 4 != 0; ) e += '=';
        return e;
      })(e)
    );
  }
  function pa(e, a, o, t) {
    for (var n = 0; n < t && !(n + o >= a.length || n >= e.length); ++n)
      a[n + o] = e[n];
    return n;
  }
  function la(e) {
    return (
      null != e &&
      (!!e._isBuffer ||
        ha(e) ||
        (function(e) {
          return (
            'function' == typeof e.readFloatLE &&
            'function' == typeof e.slice &&
            ha(e.slice(0, 0))
          );
        })(e))
    );
  }
  function ha(e) {
    return (
      !!e.constructor &&
      'function' == typeof e.constructor.isBuffer &&
      e.constructor.isBuffer(e)
    );
  }
  var ga,
    da,
    fa = Ea(b.fetch) && Ea(b.ReadableStream);
  function ka(e) {
    da ||
      (da = new b.XMLHttpRequest()).open(
        'GET',
        b.location.host ? '/' : 'https://example.com'
      );
    try {
      return (da.responseType = e), da.responseType === e;
    } catch (e) {
      return !1;
    }
  }
  var ya = void 0 !== b.ArrayBuffer,
    ba = ya && Ea(b.ArrayBuffer.prototype.slice),
    ja = ya && ka('arraybuffer'),
    va = !fa && ba && ka('ms-stream'),
    wa = !fa && ya && ka('moz-chunked-arraybuffer'),
    za = Ea(da.overrideMimeType),
    xa = Ea(b.VBArray);
  function Ea(e) {
    return 'function' == typeof e;
  }
  da = null;
  var Ca =
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
          },
    Sa = /%[sdj%]/g;
  function Aa(e) {
    if (!Xa(e)) {
      for (var a = [], o = 0; o < arguments.length; o++)
        a.push(qa(arguments[o]));
      return a.join(' ');
    }
    o = 1;
    for (
      var t = arguments,
        n = t.length,
        i = String(e).replace(Sa, function(e) {
          if ('%%' === e) return '%';
          if (o >= n) return e;
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
      o < n;
      r = t[++o]
    )
      Ba(r) || !$a(r) ? (i += ' ' + r) : (i += ' ' + qa(r));
    return i;
  }
  function Ra(e, a) {
    if (Ya(b.process))
      return function() {
        return Ra(e, a).apply(this, arguments);
      };
    if (!0 === X.noDeprecation) return e;
    var o = !1;
    return function() {
      if (!o) {
        if (X.throwDeprecation) throw new Error(a);
        X.traceDeprecation ? console.trace(a) : console.error(a), (o = !0);
      }
      return e.apply(this, arguments);
    };
  }
  var _a,
    Ta = {};
  function Oa(e) {
    if (
      (Ya(_a) && (_a = X.env.NODE_DEBUG || ''), (e = e.toUpperCase()), !Ta[e])
    )
      if (new RegExp('\\b' + e + '\\b', 'i').test(_a)) {
        Ta[e] = function() {
          var a = Aa.apply(null, arguments);
          console.error('%s %d: %s', e, 0, a);
        };
      } else Ta[e] = function() {};
    return Ta[e];
  }
  function qa(e, a) {
    var o = { seen: [], stylize: La };
    return (
      arguments.length >= 3 && (o.depth = arguments[2]),
      arguments.length >= 4 && (o.colors = arguments[3]),
      Ua(a) ? (o.showHidden = a) : a && eo(o, a),
      Ya(o.showHidden) && (o.showHidden = !1),
      Ya(o.depth) && (o.depth = 2),
      Ya(o.colors) && (o.colors = !1),
      Ya(o.customInspect) && (o.customInspect = !0),
      o.colors && (o.stylize = Pa),
      Ma(o, e, o.depth)
    );
  }
  function Pa(e, a) {
    var o = qa.styles[a];
    return o
      ? '[' + qa.colors[o][0] + 'm' + e + '[' + qa.colors[o][1] + 'm'
      : e;
  }
  function La(e, a) {
    return e;
  }
  function Ma(e, a, o) {
    if (
      e.customInspect &&
      a &&
      Va(a.inspect) &&
      a.inspect !== qa &&
      (!a.constructor || a.constructor.prototype !== a)
    ) {
      var t = a.inspect(o, e);
      return Xa(t) || (t = Ma(e, t, o)), t;
    }
    var n = (function(e, a) {
      if (Ya(a)) return e.stylize('undefined', 'undefined');
      if (Xa(a)) {
        var o =
          "'" +
          JSON.stringify(a)
            .replace(/^"|"$/g, '')
            .replace(/'/g, "\\'")
            .replace(/\\"/g, '"') +
          "'";
        return e.stylize(o, 'string');
      }
      if (Ha(a)) return e.stylize('' + a, 'number');
      if (Ua(a)) return e.stylize('' + a, 'boolean');
      if (Ba(a)) return e.stylize('null', 'null');
    })(e, a);
    if (n) return n;
    var i = Object.keys(a),
      r = (function(e) {
        var a = {};
        return (
          e.forEach(function(e, o) {
            a[e] = !0;
          }),
          a
        );
      })(i);
    if (
      (e.showHidden && (i = Object.getOwnPropertyNames(a)),
      Ka(a) && (i.indexOf('message') >= 0 || i.indexOf('description') >= 0))
    )
      return Na(a);
    if (0 === i.length) {
      if (Va(a)) {
        var s = a.name ? ': ' + a.name : '';
        return e.stylize('[Function' + s + ']', 'special');
      }
      if (Wa(a)) return e.stylize(RegExp.prototype.toString.call(a), 'regexp');
      if (Ja(a)) return e.stylize(Date.prototype.toString.call(a), 'date');
      if (Ka(a)) return Na(a);
    }
    var u,
      m = '',
      c = !1,
      p = ['{', '}'];
    (Ia(a) && ((c = !0), (p = ['[', ']'])), Va(a)) &&
      (m = ' [Function' + (a.name ? ': ' + a.name : '') + ']');
    return (
      Wa(a) && (m = ' ' + RegExp.prototype.toString.call(a)),
      Ja(a) && (m = ' ' + Date.prototype.toUTCString.call(a)),
      Ka(a) && (m = ' ' + Na(a)),
      0 !== i.length || (c && 0 != a.length)
        ? o < 0
          ? Wa(a)
            ? e.stylize(RegExp.prototype.toString.call(a), 'regexp')
            : e.stylize('[Object]', 'special')
          : (e.seen.push(a),
            (u = c
              ? (function(e, a, o, t, n) {
                  for (var i = [], r = 0, s = a.length; r < s; ++r)
                    ao(a, String(r))
                      ? i.push(Da(e, a, o, t, String(r), !0))
                      : i.push('');
                  return (
                    n.forEach(function(n) {
                      n.match(/^\d+$/) || i.push(Da(e, a, o, t, n, !0));
                    }),
                    i
                  );
                })(e, a, o, r, i)
              : i.map(function(t) {
                  return Da(e, a, o, r, t, c);
                })),
            e.seen.pop(),
            (function(e, a, o) {
              if (
                e.reduce(function(e, a) {
                  return (
                    a.indexOf('\n'),
                    e + a.replace(/\u001b\[\d\d?m/g, '').length + 1
                  );
                }, 0) > 60
              )
                return (
                  o[0] +
                  ('' === a ? '' : a + '\n ') +
                  ' ' +
                  e.join(',\n  ') +
                  ' ' +
                  o[1]
                );
              return o[0] + a + ' ' + e.join(', ') + ' ' + o[1];
            })(u, m, p))
        : p[0] + m + p[1]
    );
  }
  function Na(e) {
    return '[' + Error.prototype.toString.call(e) + ']';
  }
  function Da(e, a, o, t, n, i) {
    var r, s, u;
    if (
      ((u = Object.getOwnPropertyDescriptor(a, n) || { value: a[n] }).get
        ? (s = u.set
            ? e.stylize('[Getter/Setter]', 'special')
            : e.stylize('[Getter]', 'special'))
        : u.set && (s = e.stylize('[Setter]', 'special')),
      ao(t, n) || (r = '[' + n + ']'),
      s ||
        (e.seen.indexOf(u.value) < 0
          ? (s = Ba(o) ? Ma(e, u.value, null) : Ma(e, u.value, o - 1)).indexOf(
              '\n'
            ) > -1 &&
            (s = i
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
      Ya(r))
    ) {
      if (i && n.match(/^\d+$/)) return s;
      (r = JSON.stringify('' + n)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)
        ? ((r = r.substr(1, r.length - 2)), (r = e.stylize(r, 'name')))
        : ((r = r
            .replace(/'/g, "\\'")
            .replace(/\\"/g, '"')
            .replace(/(^"|"$)/g, "'")),
          (r = e.stylize(r, 'string')));
    }
    return r + ': ' + s;
  }
  function Ia(e) {
    return Array.isArray(e);
  }
  function Ua(e) {
    return 'boolean' == typeof e;
  }
  function Ba(e) {
    return null === e;
  }
  function Fa(e) {
    return null == e;
  }
  function Ha(e) {
    return 'number' == typeof e;
  }
  function Xa(e) {
    return 'string' == typeof e;
  }
  function Ya(e) {
    return void 0 === e;
  }
  function Wa(e) {
    return $a(e) && '[object RegExp]' === Ga(e);
  }
  function $a(e) {
    return 'object' == typeof e && null !== e;
  }
  function Ja(e) {
    return $a(e) && '[object Date]' === Ga(e);
  }
  function Ka(e) {
    return $a(e) && ('[object Error]' === Ga(e) || e instanceof Error);
  }
  function Va(e) {
    return 'function' == typeof e;
  }
  function Ga(e) {
    return Object.prototype.toString.call(e);
  }
  function Za(e) {
    return e < 10 ? '0' + e.toString(10) : e.toString(10);
  }
  (qa.colors = {
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
    (qa.styles = {
      special: 'cyan',
      number: 'yellow',
      boolean: 'yellow',
      undefined: 'grey',
      null: 'bold',
      string: 'green',
      date: 'magenta',
      regexp: 'red'
    });
  var Qa = [
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
  function eo(e, a) {
    if (!a || !$a(a)) return e;
    for (var o = Object.keys(a), t = o.length; t--; ) e[o[t]] = a[o[t]];
    return e;
  }
  function ao(e, a) {
    return Object.prototype.hasOwnProperty.call(e, a);
  }
  var oo = {
    inherits: Ca,
    _extend: eo,
    log: function() {
      var e, a;
      console.log(
        '%s - %s',
        ((e = new Date()),
        (a = [Za(e.getHours()), Za(e.getMinutes()), Za(e.getSeconds())].join(
          ':'
        )),
        [e.getDate(), Qa[e.getMonth()], a].join(' ')),
        Aa.apply(null, arguments)
      );
    },
    isBuffer: function(e) {
      return la(e);
    },
    isPrimitive: function(e) {
      return (
        null === e ||
        'boolean' == typeof e ||
        'number' == typeof e ||
        'string' == typeof e ||
        'symbol' == typeof e ||
        void 0 === e
      );
    },
    isFunction: Va,
    isError: Ka,
    isDate: Ja,
    isObject: $a,
    isRegExp: Wa,
    isUndefined: Ya,
    isSymbol: function(e) {
      return 'symbol' == typeof e;
    },
    isString: Xa,
    isNumber: Ha,
    isNullOrUndefined: Fa,
    isNull: Ba,
    isBoolean: Ua,
    isArray: Ia,
    inspect: qa,
    deprecate: Ra,
    format: Aa,
    debuglog: Oa
  };
  function to() {}
  function no() {
    no.init.call(this);
  }
  function io(e) {
    return void 0 === e._maxListeners
      ? no.defaultMaxListeners
      : e._maxListeners;
  }
  function ro(e, a, o) {
    if (a) e.call(o);
    else for (var t = e.length, n = go(e, t), i = 0; i < t; ++i) n[i].call(o);
  }
  function so(e, a, o, t) {
    if (a) e.call(o, t);
    else
      for (var n = e.length, i = go(e, n), r = 0; r < n; ++r) i[r].call(o, t);
  }
  function uo(e, a, o, t, n) {
    if (a) e.call(o, t, n);
    else
      for (var i = e.length, r = go(e, i), s = 0; s < i; ++s)
        r[s].call(o, t, n);
  }
  function mo(e, a, o, t, n, i) {
    if (a) e.call(o, t, n, i);
    else
      for (var r = e.length, s = go(e, r), u = 0; u < r; ++u)
        s[u].call(o, t, n, i);
  }
  function co(e, a, o, t) {
    if (a) e.apply(o, t);
    else
      for (var n = e.length, i = go(e, n), r = 0; r < n; ++r) i[r].apply(o, t);
  }
  function po(e, a, o, t) {
    var n, i, r, s;
    if ('function' != typeof o)
      throw new TypeError('"listener" argument must be a function');
    if (
      ((i = e._events)
        ? (i.newListener &&
            (e.emit('newListener', a, o.listener ? o.listener : o),
            (i = e._events)),
          (r = i[a]))
        : ((i = e._events = new to()), (e._eventsCount = 0)),
      r)
    ) {
      if (
        ('function' == typeof r
          ? (r = i[a] = t ? [o, r] : [r, o])
          : t
          ? r.unshift(o)
          : r.push(o),
        !r.warned && (n = io(e)) && n > 0 && r.length > n)
      ) {
        r.warned = !0;
        var u = new Error(
          'Possible EventEmitter memory leak detected. ' +
            r.length +
            ' ' +
            a +
            ' listeners added. Use emitter.setMaxListeners() to increase limit'
        );
        (u.name = 'MaxListenersExceededWarning'),
          (u.emitter = e),
          (u.type = a),
          (u.count = r.length),
          (s = u),
          'function' == typeof console.warn ? console.warn(s) : console.log(s);
      }
    } else (r = i[a] = o), ++e._eventsCount;
    return e;
  }
  function lo(e, a, o) {
    var t = !1;
    function n() {
      e.removeListener(a, n), t || ((t = !0), o.apply(e, arguments));
    }
    return (n.listener = o), n;
  }
  function ho(e) {
    var a = this._events;
    if (a) {
      var o = a[e];
      if ('function' == typeof o) return 1;
      if (o) return o.length;
    }
    return 0;
  }
  function go(e, a) {
    for (var o = new Array(a); a--; ) o[a] = e[a];
    return o;
  }
  function fo() {
    (this.head = null), (this.tail = null), (this.length = 0);
  }
  (to.prototype = Object.create(null)),
    (no.EventEmitter = no),
    (no.usingDomains = !1),
    (no.prototype.domain = void 0),
    (no.prototype._events = void 0),
    (no.prototype._maxListeners = void 0),
    (no.defaultMaxListeners = 10),
    (no.init = function() {
      (this.domain = null),
        no.usingDomains && (void 0).active && (void 0).Domain,
        (this._events &&
          this._events !== Object.getPrototypeOf(this)._events) ||
          ((this._events = new to()), (this._eventsCount = 0)),
        (this._maxListeners = this._maxListeners || void 0);
    }),
    (no.prototype.setMaxListeners = function(e) {
      if ('number' != typeof e || e < 0 || isNaN(e))
        throw new TypeError('"n" argument must be a positive number');
      return (this._maxListeners = e), this;
    }),
    (no.prototype.getMaxListeners = function() {
      return io(this);
    }),
    (no.prototype.emit = function(e) {
      var a,
        o,
        t,
        n,
        i,
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
          ro(o, c, this);
          break;
        case 2:
          so(o, c, this, arguments[1]);
          break;
        case 3:
          uo(o, c, this, arguments[1], arguments[2]);
          break;
        case 4:
          mo(o, c, this, arguments[1], arguments[2], arguments[3]);
          break;
        default:
          for (n = new Array(t - 1), i = 1; i < t; i++) n[i - 1] = arguments[i];
          co(o, c, this, n);
      }
      return !0;
    }),
    (no.prototype.addListener = function(e, a) {
      return po(this, e, a, !1);
    }),
    (no.prototype.on = no.prototype.addListener),
    (no.prototype.prependListener = function(e, a) {
      return po(this, e, a, !0);
    }),
    (no.prototype.once = function(e, a) {
      if ('function' != typeof a)
        throw new TypeError('"listener" argument must be a function');
      return this.on(e, lo(this, e, a)), this;
    }),
    (no.prototype.prependOnceListener = function(e, a) {
      if ('function' != typeof a)
        throw new TypeError('"listener" argument must be a function');
      return this.prependListener(e, lo(this, e, a)), this;
    }),
    (no.prototype.removeListener = function(e, a) {
      var o, t, n, i, r;
      if ('function' != typeof a)
        throw new TypeError('"listener" argument must be a function');
      if (!(t = this._events)) return this;
      if (!(o = t[e])) return this;
      if (o === a || (o.listener && o.listener === a))
        0 == --this._eventsCount
          ? (this._events = new to())
          : (delete t[e],
            t.removeListener &&
              this.emit('removeListener', e, o.listener || a));
      else if ('function' != typeof o) {
        for (n = -1, i = o.length; i-- > 0; )
          if (o[i] === a || (o[i].listener && o[i].listener === a)) {
            (r = o[i].listener), (n = i);
            break;
          }
        if (n < 0) return this;
        if (1 === o.length) {
          if (((o[0] = void 0), 0 == --this._eventsCount))
            return (this._events = new to()), this;
          delete t[e];
        } else
          !(function(e, a) {
            for (var o = a, t = o + 1, n = e.length; t < n; o += 1, t += 1)
              e[o] = e[t];
            e.pop();
          })(o, n);
        t.removeListener && this.emit('removeListener', e, r || a);
      }
      return this;
    }),
    (no.prototype.removeAllListeners = function(e) {
      var a, o;
      if (!(o = this._events)) return this;
      if (!o.removeListener)
        return (
          0 === arguments.length
            ? ((this._events = new to()), (this._eventsCount = 0))
            : o[e] &&
              (0 == --this._eventsCount
                ? (this._events = new to())
                : delete o[e]),
          this
        );
      if (0 === arguments.length) {
        for (var t, n = Object.keys(o), i = 0; i < n.length; ++i)
          'removeListener' !== (t = n[i]) && this.removeAllListeners(t);
        return (
          this.removeAllListeners('removeListener'),
          (this._events = new to()),
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
    (no.prototype.listeners = function(e) {
      var a,
        o = this._events;
      return o && (a = o[e])
        ? 'function' == typeof a
          ? [a.listener || a]
          : (function(e) {
              for (var a = new Array(e.length), o = 0; o < a.length; ++o)
                a[o] = e[o].listener || e[o];
              return a;
            })(a)
        : [];
    }),
    (no.listenerCount = function(e, a) {
      return 'function' == typeof e.listenerCount
        ? e.listenerCount(a)
        : ho.call(e, a);
    }),
    (no.prototype.listenerCount = ho),
    (no.prototype.eventNames = function() {
      return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
    }),
    (fo.prototype.push = function(e) {
      var a = { data: e, next: null };
      this.length > 0 ? (this.tail.next = a) : (this.head = a),
        (this.tail = a),
        ++this.length;
    }),
    (fo.prototype.unshift = function(e) {
      var a = { data: e, next: this.head };
      0 === this.length && (this.tail = a), (this.head = a), ++this.length;
    }),
    (fo.prototype.shift = function() {
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
    (fo.prototype.clear = function() {
      (this.head = this.tail = null), (this.length = 0);
    }),
    (fo.prototype.join = function(e) {
      if (0 === this.length) return '';
      for (var a = this.head, o = '' + a.data; (a = a.next); ) o += e + a.data;
      return o;
    }),
    (fo.prototype.concat = function(e) {
      if (0 === this.length) return Re.alloc(0);
      if (1 === this.length) return this.head.data;
      for (var a = Re.allocUnsafe(e >>> 0), o = this.head, t = 0; o; )
        o.data.copy(a, t), (t += o.data.length), (o = o.next);
      return a;
    });
  var ko =
    Re.isEncoding ||
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
  function yo(e) {
    switch (
      ((this.encoding = (e || 'utf8').toLowerCase().replace(/[-_]/, '')),
      (function(e) {
        if (e && !ko(e)) throw new Error('Unknown encoding: ' + e);
      })(e),
      this.encoding)
    ) {
      case 'utf8':
        this.surrogateSize = 3;
        break;
      case 'ucs2':
      case 'utf16le':
        (this.surrogateSize = 2), (this.detectIncompleteChar = jo);
        break;
      case 'base64':
        (this.surrogateSize = 3), (this.detectIncompleteChar = vo);
        break;
      default:
        return void (this.write = bo);
    }
    (this.charBuffer = new Re(6)),
      (this.charReceived = 0),
      (this.charLength = 0);
  }
  function bo(e) {
    return e.toString(this.encoding);
  }
  function jo(e) {
    (this.charReceived = e.length % 2),
      (this.charLength = this.charReceived ? 2 : 0);
  }
  function vo(e) {
    (this.charReceived = e.length % 3),
      (this.charLength = this.charReceived ? 3 : 0);
  }
  (yo.prototype.write = function(e) {
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
          (n = (a = this.charBuffer
            .slice(0, this.charLength)
            .toString(this.encoding)).charCodeAt(a.length - 1)) >= 55296 &&
          n <= 56319
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
    var n;
    t = (a += e.toString(this.encoding, 0, t)).length - 1;
    if ((n = a.charCodeAt(t)) >= 55296 && n <= 56319) {
      var i = this.surrogateSize;
      return (
        (this.charLength += i),
        (this.charReceived += i),
        this.charBuffer.copy(this.charBuffer, i, 0, i),
        e.copy(this.charBuffer, 0, 0, i),
        a.substring(0, t)
      );
    }
    return a;
  }),
    (yo.prototype.detectIncompleteChar = function(e) {
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
    (yo.prototype.end = function(e) {
      var a = '';
      if ((e && e.length && (a = this.write(e)), this.charReceived)) {
        var o = this.charReceived,
          t = this.charBuffer,
          n = this.encoding;
        a += t.slice(0, o).toString(n);
      }
      return a;
    }),
    (xo.ReadableState = zo);
  var wo = Oa('stream');
  function zo(e, a) {
    (e = e || {}),
      (this.objectMode = !!e.objectMode),
      a instanceof Zo &&
        (this.objectMode = this.objectMode || !!e.readableObjectMode);
    var o = e.highWaterMark,
      t = this.objectMode ? 16 : 16384;
    (this.highWaterMark = o || 0 === o ? o : t),
      (this.highWaterMark = ~~this.highWaterMark),
      (this.buffer = new fo()),
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
        ((this.decoder = new yo(e.encoding)), (this.encoding = e.encoding));
  }
  function xo(e) {
    if (!(this instanceof xo)) return new xo(e);
    (this._readableState = new zo(e, this)),
      (this.readable = !0),
      e && 'function' == typeof e.read && (this._read = e.read),
      no.call(this);
  }
  function Eo(e, a, o, t, n) {
    var i = (function(e, a) {
      var o = null;
      la(a) ||
        'string' == typeof a ||
        null == a ||
        e.objectMode ||
        (o = new TypeError('Invalid non-string/buffer chunk'));
      return o;
    })(a, o);
    if (i) e.emit('error', i);
    else if (null === o)
      (a.reading = !1),
        (function(e, a) {
          if (a.ended) return;
          if (a.decoder) {
            var o = a.decoder.end();
            o &&
              o.length &&
              (a.buffer.push(o), (a.length += a.objectMode ? 1 : o.length));
          }
          (a.ended = !0), Ao(e);
        })(e, a);
    else if (a.objectMode || (o && o.length > 0))
      if (a.ended && !n) {
        var r = new Error('stream.push() after EOF');
        e.emit('error', r);
      } else if (a.endEmitted && n) {
        var s = new Error('stream.unshift() after end event');
        e.emit('error', s);
      } else {
        var u;
        !a.decoder ||
          n ||
          t ||
          ((o = a.decoder.write(o)), (u = !a.objectMode && 0 === o.length)),
          n || (a.reading = !1),
          u ||
            (a.flowing && 0 === a.length && !a.sync
              ? (e.emit('data', o), e.read(0))
              : ((a.length += a.objectMode ? 1 : o.length),
                n ? a.buffer.unshift(o) : a.buffer.push(o),
                a.needReadable && Ao(e))),
          (function(e, a) {
            a.readingMore || ((a.readingMore = !0), T(_o, e, a));
          })(e, a);
      }
    else n || (a.reading = !1);
    return (function(e) {
      return (
        !e.ended &&
        (e.needReadable || e.length < e.highWaterMark || 0 === e.length)
      );
    })(a);
  }
  Ca(xo, no),
    (xo.prototype.push = function(e, a) {
      var o = this._readableState;
      return (
        o.objectMode ||
          'string' != typeof e ||
          ((a = a || o.defaultEncoding) !== o.encoding &&
            ((e = Re.from(e, a)), (a = ''))),
        Eo(this, o, e, a, !1)
      );
    }),
    (xo.prototype.unshift = function(e) {
      return Eo(this, this._readableState, e, '', !0);
    }),
    (xo.prototype.isPaused = function() {
      return !1 === this._readableState.flowing;
    }),
    (xo.prototype.setEncoding = function(e) {
      return (
        (this._readableState.decoder = new yo(e)),
        (this._readableState.encoding = e),
        this
      );
    });
  var Co = 8388608;
  function So(e, a) {
    return e <= 0 || (0 === a.length && a.ended)
      ? 0
      : a.objectMode
      ? 1
      : e != e
      ? a.flowing && a.length
        ? a.buffer.head.data.length
        : a.length
      : (e > a.highWaterMark &&
          (a.highWaterMark = (function(e) {
            return (
              e >= Co
                ? (e = Co)
                : (e--,
                  (e |= e >>> 1),
                  (e |= e >>> 2),
                  (e |= e >>> 4),
                  (e |= e >>> 8),
                  (e |= e >>> 16),
                  e++),
              e
            );
          })(e)),
        e <= a.length ? e : a.ended ? a.length : ((a.needReadable = !0), 0));
  }
  function Ao(e) {
    var a = e._readableState;
    (a.needReadable = !1),
      a.emittedReadable ||
        (wo('emitReadable', a.flowing),
        (a.emittedReadable = !0),
        a.sync ? T(Ro, e) : Ro(e));
  }
  function Ro(e) {
    wo('emit readable'), e.emit('readable'), qo(e);
  }
  function _o(e, a) {
    for (
      var o = a.length;
      !a.reading &&
      !a.flowing &&
      !a.ended &&
      a.length < a.highWaterMark &&
      (wo('maybeReadMore read 0'), e.read(0), o !== a.length);

    )
      o = a.length;
    a.readingMore = !1;
  }
  function To(e) {
    wo('readable nexttick read 0'), e.read(0);
  }
  function Oo(e, a) {
    a.reading || (wo('resume read 0'), e.read(0)),
      (a.resumeScheduled = !1),
      (a.awaitDrain = 0),
      e.emit('resume'),
      qo(e),
      a.flowing && !a.reading && e.read(0);
  }
  function qo(e) {
    var a = e._readableState;
    for (wo('flow', a.flowing); a.flowing && null !== e.read(); );
  }
  function Po(e, a) {
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
          : (o = (function(e, a, o) {
              var t;
              e < a.head.data.length
                ? ((t = a.head.data.slice(0, e)),
                  (a.head.data = a.head.data.slice(e)))
                : (t =
                    e === a.head.data.length
                      ? a.shift()
                      : o
                      ? (function(e, a) {
                          var o = a.head,
                            t = 1,
                            n = o.data;
                          e -= n.length;
                          for (; (o = o.next); ) {
                            var i = o.data,
                              r = e > i.length ? i.length : e;
                            if (
                              (r === i.length ? (n += i) : (n += i.slice(0, e)),
                              0 === (e -= r))
                            ) {
                              r === i.length
                                ? (++t,
                                  o.next
                                    ? (a.head = o.next)
                                    : (a.head = a.tail = null))
                                : ((a.head = o), (o.data = i.slice(r)));
                              break;
                            }
                            ++t;
                          }
                          return (a.length -= t), n;
                        })(e, a)
                      : (function(e, a) {
                          var o = Re.allocUnsafe(e),
                            t = a.head,
                            n = 1;
                          t.data.copy(o), (e -= t.data.length);
                          for (; (t = t.next); ) {
                            var i = t.data,
                              r = e > i.length ? i.length : e;
                            if (
                              (i.copy(o, o.length - e, 0, r), 0 === (e -= r))
                            ) {
                              r === i.length
                                ? (++n,
                                  t.next
                                    ? (a.head = t.next)
                                    : (a.head = a.tail = null))
                                : ((a.head = t), (t.data = i.slice(r)));
                              break;
                            }
                            ++n;
                          }
                          return (a.length -= n), o;
                        })(e, a));
              return t;
            })(e, a.buffer, a.decoder)),
        o);
    var o;
  }
  function Lo(e) {
    var a = e._readableState;
    if (a.length > 0)
      throw new Error('"endReadable()" called on non-empty stream');
    a.endEmitted || ((a.ended = !0), T(Mo, a, e));
  }
  function Mo(e, a) {
    e.endEmitted ||
      0 !== e.length ||
      ((e.endEmitted = !0), (a.readable = !1), a.emit('end'));
  }
  function No(e, a) {
    for (var o = 0, t = e.length; o < t; o++) if (e[o] === a) return o;
    return -1;
  }
  function Do() {}
  function Io(e, a, o) {
    (this.chunk = e),
      (this.encoding = a),
      (this.callback = o),
      (this.next = null);
  }
  function Uo(e, a) {
    Object.defineProperty(this, 'buffer', {
      get: Ra(function() {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer instead.')
    }),
      (e = e || {}),
      (this.objectMode = !!e.objectMode),
      a instanceof Zo &&
        (this.objectMode = this.objectMode || !!e.writableObjectMode);
    var o = e.highWaterMark,
      t = this.objectMode ? 16 : 16384;
    (this.highWaterMark = o || 0 === o ? o : t),
      (this.highWaterMark = ~~this.highWaterMark),
      (this.needDrain = !1),
      (this.ending = !1),
      (this.ended = !1),
      (this.finished = !1);
    var n = !1 === e.decodeStrings;
    (this.decodeStrings = !n),
      (this.defaultEncoding = e.defaultEncoding || 'utf8'),
      (this.length = 0),
      (this.writing = !1),
      (this.corked = 0),
      (this.sync = !0),
      (this.bufferProcessing = !1),
      (this.onwrite = function(e) {
        !(function(e, a) {
          var o = e._writableState,
            t = o.sync,
            n = o.writecb;
          if (
            ((function(e) {
              (e.writing = !1),
                (e.writecb = null),
                (e.length -= e.writelen),
                (e.writelen = 0);
            })(o),
            a)
          )
            !(function(e, a, o, t, n) {
              --a.pendingcb, o ? T(n, t) : n(t);
              (e._writableState.errorEmitted = !0), e.emit('error', t);
            })(e, o, t, a, n);
          else {
            var i = Yo(o);
            i ||
              o.corked ||
              o.bufferProcessing ||
              !o.bufferedRequest ||
              Xo(e, o),
              t ? T(Ho, e, o, i, n) : Ho(e, o, i, n);
          }
        })(a, e);
      }),
      (this.writecb = null),
      (this.writelen = 0),
      (this.bufferedRequest = null),
      (this.lastBufferedRequest = null),
      (this.pendingcb = 0),
      (this.prefinished = !1),
      (this.errorEmitted = !1),
      (this.bufferedRequestCount = 0),
      (this.corkedRequestsFree = new Jo(this));
  }
  function Bo(e) {
    if (!(this instanceof Bo || this instanceof Zo)) return new Bo(e);
    (this._writableState = new Uo(e, this)),
      (this.writable = !0),
      e &&
        ('function' == typeof e.write && (this._write = e.write),
        'function' == typeof e.writev && (this._writev = e.writev)),
      no.call(this);
  }
  function Fo(e, a, o, t, n, i, r) {
    (a.writelen = t),
      (a.writecb = r),
      (a.writing = !0),
      (a.sync = !0),
      o ? e._writev(n, a.onwrite) : e._write(n, i, a.onwrite),
      (a.sync = !1);
  }
  function Ho(e, a, o, t) {
    o ||
      (function(e, a) {
        0 === a.length && a.needDrain && ((a.needDrain = !1), e.emit('drain'));
      })(e, a),
      a.pendingcb--,
      t(),
      $o(e, a);
  }
  function Xo(e, a) {
    a.bufferProcessing = !0;
    var o = a.bufferedRequest;
    if (e._writev && o && o.next) {
      var t = a.bufferedRequestCount,
        n = new Array(t),
        i = a.corkedRequestsFree;
      i.entry = o;
      for (var r = 0; o; ) (n[r] = o), (o = o.next), (r += 1);
      Fo(e, a, !0, a.length, n, '', i.finish),
        a.pendingcb++,
        (a.lastBufferedRequest = null),
        i.next
          ? ((a.corkedRequestsFree = i.next), (i.next = null))
          : (a.corkedRequestsFree = new Jo(a));
    } else {
      for (; o; ) {
        var s = o.chunk,
          u = o.encoding,
          m = o.callback;
        if (
          (Fo(e, a, !1, a.objectMode ? 1 : s.length, s, u, m),
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
  function Yo(e) {
    return (
      e.ending &&
      0 === e.length &&
      null === e.bufferedRequest &&
      !e.finished &&
      !e.writing
    );
  }
  function Wo(e, a) {
    a.prefinished || ((a.prefinished = !0), e.emit('prefinish'));
  }
  function $o(e, a) {
    var o = Yo(a);
    return (
      o &&
        (0 === a.pendingcb
          ? (Wo(e, a), (a.finished = !0), e.emit('finish'))
          : Wo(e, a)),
      o
    );
  }
  function Jo(e) {
    var a = this;
    (this.next = null),
      (this.entry = null),
      (this.finish = function(o) {
        var t = a.entry;
        for (a.entry = null; t; ) {
          var n = t.callback;
          e.pendingcb--, n(o), (t = t.next);
        }
        e.corkedRequestsFree
          ? (e.corkedRequestsFree.next = a)
          : (e.corkedRequestsFree = a);
      });
  }
  (xo.prototype.read = function(e) {
    wo('read', e), (e = parseInt(e, 10));
    var a = this._readableState,
      o = e;
    if (
      (0 !== e && (a.emittedReadable = !1),
      0 === e && a.needReadable && (a.length >= a.highWaterMark || a.ended))
    )
      return (
        wo('read: emitReadable', a.length, a.ended),
        0 === a.length && a.ended ? Lo(this) : Ao(this),
        null
      );
    if (0 === (e = So(e, a)) && a.ended)
      return 0 === a.length && Lo(this), null;
    var t,
      n = a.needReadable;
    return (
      wo('need readable', n),
      (0 === a.length || a.length - e < a.highWaterMark) &&
        wo('length less than watermark', (n = !0)),
      a.ended || a.reading
        ? wo('reading or ended', (n = !1))
        : n &&
          (wo('do read'),
          (a.reading = !0),
          (a.sync = !0),
          0 === a.length && (a.needReadable = !0),
          this._read(a.highWaterMark),
          (a.sync = !1),
          a.reading || (e = So(o, a))),
      null === (t = e > 0 ? Po(e, a) : null)
        ? ((a.needReadable = !0), (e = 0))
        : (a.length -= e),
      0 === a.length &&
        (a.ended || (a.needReadable = !0), o !== e && a.ended && Lo(this)),
      null !== t && this.emit('data', t),
      t
    );
  }),
    (xo.prototype._read = function(e) {
      this.emit('error', new Error('not implemented'));
    }),
    (xo.prototype.pipe = function(e, a) {
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
      (t.pipesCount += 1), wo('pipe count=%d opts=%j', t.pipesCount, a);
      var n = !a || !1 !== a.end ? r : m;
      function i(e) {
        wo('onunpipe'), e === o && m();
      }
      function r() {
        wo('onend'), e.end();
      }
      t.endEmitted ? T(n) : o.once('end', n), e.on('unpipe', i);
      var s = (function(e) {
        return function() {
          var a = e._readableState;
          wo('pipeOnDrain', a.awaitDrain),
            a.awaitDrain && a.awaitDrain--,
            0 === a.awaitDrain &&
              e.listeners('data').length &&
              ((a.flowing = !0), qo(e));
        };
      })(o);
      e.on('drain', s);
      var u = !1;
      function m() {
        wo('cleanup'),
          e.removeListener('close', h),
          e.removeListener('finish', g),
          e.removeListener('drain', s),
          e.removeListener('error', l),
          e.removeListener('unpipe', i),
          o.removeListener('end', r),
          o.removeListener('end', m),
          o.removeListener('data', p),
          (u = !0),
          !t.awaitDrain ||
            (e._writableState && !e._writableState.needDrain) ||
            s();
      }
      var c = !1;
      function p(a) {
        wo('ondata'),
          (c = !1),
          !1 !== e.write(a) ||
            c ||
            (((1 === t.pipesCount && t.pipes === e) ||
              (t.pipesCount > 1 && -1 !== No(t.pipes, e))) &&
              !u &&
              (wo('false write response, pause', o._readableState.awaitDrain),
              o._readableState.awaitDrain++,
              (c = !0)),
            o.pause());
      }
      function l(a) {
        var o;
        wo('onerror', a),
          d(),
          e.removeListener('error', l),
          0 === ((o = 'error'), e.listeners(o).length) && e.emit('error', a);
      }
      function h() {
        e.removeListener('finish', g), d();
      }
      function g() {
        wo('onfinish'), e.removeListener('close', h), d();
      }
      function d() {
        wo('unpipe'), o.unpipe(e);
      }
      return (
        o.on('data', p),
        (function(e, a, o) {
          if ('function' == typeof e.prependListener)
            return e.prependListener(a, o);
          e._events && e._events[a]
            ? Array.isArray(e._events[a])
              ? e._events[a].unshift(o)
              : (e._events[a] = [o, e._events[a]])
            : e.on(a, o);
        })(e, 'error', l),
        e.once('close', h),
        e.once('finish', g),
        e.emit('pipe', o),
        t.flowing || (wo('pipe resume'), o.resume()),
        e
      );
    }),
    (xo.prototype.unpipe = function(e) {
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
        for (var n = 0; n < t; n++) o[n].emit('unpipe', this);
        return this;
      }
      var i = No(a.pipes, e);
      return -1 === i
        ? this
        : (a.pipes.splice(i, 1),
          (a.pipesCount -= 1),
          1 === a.pipesCount && (a.pipes = a.pipes[0]),
          e.emit('unpipe', this),
          this);
    }),
    (xo.prototype.on = function(e, a) {
      var o = no.prototype.on.call(this, e, a);
      if ('data' === e) !1 !== this._readableState.flowing && this.resume();
      else if ('readable' === e) {
        var t = this._readableState;
        t.endEmitted ||
          t.readableListening ||
          ((t.readableListening = t.needReadable = !0),
          (t.emittedReadable = !1),
          t.reading ? t.length && Ao(this) : T(To, this));
      }
      return o;
    }),
    (xo.prototype.addListener = xo.prototype.on),
    (xo.prototype.resume = function() {
      var e = this._readableState;
      return (
        e.flowing ||
          (wo('resume'),
          (e.flowing = !0),
          (function(e, a) {
            a.resumeScheduled || ((a.resumeScheduled = !0), T(Oo, e, a));
          })(this, e)),
        this
      );
    }),
    (xo.prototype.pause = function() {
      return (
        wo('call pause flowing=%j', this._readableState.flowing),
        !1 !== this._readableState.flowing &&
          (wo('pause'), (this._readableState.flowing = !1), this.emit('pause')),
        this
      );
    }),
    (xo.prototype.wrap = function(e) {
      var a = this._readableState,
        o = !1,
        t = this;
      for (var n in (e.on('end', function() {
        if ((wo('wrapped end'), a.decoder && !a.ended)) {
          var e = a.decoder.end();
          e && e.length && t.push(e);
        }
        t.push(null);
      }),
      e.on('data', function(n) {
        (wo('wrapped data'),
        a.decoder && (n = a.decoder.write(n)),
        a.objectMode && null == n) ||
          ((a.objectMode || (n && n.length)) &&
            (t.push(n) || ((o = !0), e.pause())));
      }),
      e))
        void 0 === this[n] &&
          'function' == typeof e[n] &&
          (this[n] = (function(a) {
            return function() {
              return e[a].apply(e, arguments);
            };
          })(n));
      return (
        (function(e, a) {
          for (var o = 0, t = e.length; o < t; o++) a(e[o], o);
        })(['error', 'close', 'destroy', 'pause', 'resume'], function(a) {
          e.on(a, t.emit.bind(t, a));
        }),
        (t._read = function(a) {
          wo('wrapped _read', a), o && ((o = !1), e.resume());
        }),
        t
      );
    }),
    (xo._fromList = Po),
    (Bo.WritableState = Uo),
    Ca(Bo, no),
    (Uo.prototype.getBuffer = function() {
      for (var e = this.bufferedRequest, a = []; e; ) a.push(e), (e = e.next);
      return a;
    }),
    (Bo.prototype.pipe = function() {
      this.emit('error', new Error('Cannot pipe, not readable'));
    }),
    (Bo.prototype.write = function(e, a, o) {
      var t = this._writableState,
        n = !1;
      return (
        'function' == typeof a && ((o = a), (a = null)),
        Re.isBuffer(e) ? (a = 'buffer') : a || (a = t.defaultEncoding),
        'function' != typeof o && (o = Do),
        t.ended
          ? (function(e, a) {
              var o = new Error('write after end');
              e.emit('error', o), T(a, o);
            })(this, o)
          : (function(e, a, o, t) {
              var n = !0,
                i = !1;
              return (
                null === o
                  ? (i = new TypeError('May not write null values to stream'))
                  : Re.isBuffer(o) ||
                    'string' == typeof o ||
                    void 0 === o ||
                    a.objectMode ||
                    (i = new TypeError('Invalid non-string/buffer chunk')),
                i && (e.emit('error', i), T(t, i), (n = !1)),
                n
              );
            })(this, t, e, o) &&
            (t.pendingcb++,
            (n = (function(e, a, o, t, n) {
              (o = (function(e, a, o) {
                e.objectMode ||
                  !1 === e.decodeStrings ||
                  'string' != typeof a ||
                  (a = Re.from(a, o));
                return a;
              })(a, o, t)),
                Re.isBuffer(o) && (t = 'buffer');
              var i = a.objectMode ? 1 : o.length;
              a.length += i;
              var r = a.length < a.highWaterMark;
              r || (a.needDrain = !0);
              if (a.writing || a.corked) {
                var s = a.lastBufferedRequest;
                (a.lastBufferedRequest = new Io(o, t, n)),
                  s
                    ? (s.next = a.lastBufferedRequest)
                    : (a.bufferedRequest = a.lastBufferedRequest),
                  (a.bufferedRequestCount += 1);
              } else Fo(e, a, !1, i, o, t, n);
              return r;
            })(this, t, e, a, o))),
        n
      );
    }),
    (Bo.prototype.cork = function() {
      this._writableState.corked++;
    }),
    (Bo.prototype.uncork = function() {
      var e = this._writableState;
      e.corked &&
        (e.corked--,
        e.writing ||
          e.corked ||
          e.finished ||
          e.bufferProcessing ||
          !e.bufferedRequest ||
          Xo(this, e));
    }),
    (Bo.prototype.setDefaultEncoding = function(e) {
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
    (Bo.prototype._write = function(e, a, o) {
      o(new Error('not implemented'));
    }),
    (Bo.prototype._writev = null),
    (Bo.prototype.end = function(e, a, o) {
      var t = this._writableState;
      'function' == typeof e
        ? ((o = e), (e = null), (a = null))
        : 'function' == typeof a && ((o = a), (a = null)),
        null != e && this.write(e, a),
        t.corked && ((t.corked = 1), this.uncork()),
        t.ending ||
          t.finished ||
          (function(e, a, o) {
            (a.ending = !0),
              $o(e, a),
              o && (a.finished ? T(o) : e.once('finish', o));
            (a.ended = !0), (e.writable = !1);
          })(this, t, o);
    }),
    Ca(Zo, xo);
  for (var Ko = Object.keys(Bo.prototype), Vo = 0; Vo < Ko.length; Vo++) {
    var Go = Ko[Vo];
    Zo.prototype[Go] || (Zo.prototype[Go] = Bo.prototype[Go]);
  }
  function Zo(e) {
    if (!(this instanceof Zo)) return new Zo(e);
    xo.call(this, e),
      Bo.call(this, e),
      e && !1 === e.readable && (this.readable = !1),
      e && !1 === e.writable && (this.writable = !1),
      (this.allowHalfOpen = !0),
      e && !1 === e.allowHalfOpen && (this.allowHalfOpen = !1),
      this.once('end', Qo);
  }
  function Qo() {
    this.allowHalfOpen || this._writableState.ended || T(et, this);
  }
  function et(e) {
    e.end();
  }
  function at(e) {
    (this.afterTransform = function(a, o) {
      return (function(e, a, o) {
        var t = e._transformState;
        t.transforming = !1;
        var n = t.writecb;
        if (!n)
          return e.emit('error', new Error('no writecb in Transform class'));
        (t.writechunk = null), (t.writecb = null), null != o && e.push(o);
        n(a);
        var i = e._readableState;
        (i.reading = !1),
          (i.needReadable || i.length < i.highWaterMark) &&
            e._read(i.highWaterMark);
      })(e, a, o);
    }),
      (this.needTransform = !1),
      (this.transforming = !1),
      (this.writecb = null),
      (this.writechunk = null),
      (this.writeencoding = null);
  }
  function ot(e) {
    if (!(this instanceof ot)) return new ot(e);
    Zo.call(this, e), (this._transformState = new at(this));
    var a = this;
    (this._readableState.needReadable = !0),
      (this._readableState.sync = !1),
      e &&
        ('function' == typeof e.transform && (this._transform = e.transform),
        'function' == typeof e.flush && (this._flush = e.flush)),
      this.once('prefinish', function() {
        'function' == typeof this._flush
          ? this._flush(function(e) {
              tt(a, e);
            })
          : tt(a);
      });
  }
  function tt(e, a) {
    if (a) return e.emit('error', a);
    var o = e._writableState,
      t = e._transformState;
    if (o.length) throw new Error('Calling transform done when ws.length != 0');
    if (t.transforming)
      throw new Error('Calling transform done when still transforming');
    return e.push(null);
  }
  function nt(e) {
    if (!(this instanceof nt)) return new nt(e);
    ot.call(this, e);
  }
  function it() {
    no.call(this);
  }
  Ca(ot, Zo),
    (ot.prototype.push = function(e, a) {
      return (
        (this._transformState.needTransform = !1),
        Zo.prototype.push.call(this, e, a)
      );
    }),
    (ot.prototype._transform = function(e, a, o) {
      throw new Error('Not implemented');
    }),
    (ot.prototype._write = function(e, a, o) {
      var t = this._transformState;
      if (
        ((t.writecb = o),
        (t.writechunk = e),
        (t.writeencoding = a),
        !t.transforming)
      ) {
        var n = this._readableState;
        (t.needTransform || n.needReadable || n.length < n.highWaterMark) &&
          this._read(n.highWaterMark);
      }
    }),
    (ot.prototype._read = function(e) {
      var a = this._transformState;
      null !== a.writechunk && a.writecb && !a.transforming
        ? ((a.transforming = !0),
          this._transform(a.writechunk, a.writeencoding, a.afterTransform))
        : (a.needTransform = !0);
    }),
    Ca(nt, ot),
    (nt.prototype._transform = function(e, a, o) {
      o(null, e);
    }),
    Ca(it, no),
    (it.Readable = xo),
    (it.Writable = Bo),
    (it.Duplex = Zo),
    (it.Transform = ot),
    (it.PassThrough = nt),
    (it.Stream = it),
    (it.prototype.pipe = function(e, a) {
      var o = this;
      function t(a) {
        e.writable && !1 === e.write(a) && o.pause && o.pause();
      }
      function n() {
        o.readable && o.resume && o.resume();
      }
      o.on('data', t),
        e.on('drain', n),
        e._isStdio || (a && !1 === a.end) || (o.on('end', r), o.on('close', s));
      var i = !1;
      function r() {
        i || ((i = !0), e.end());
      }
      function s() {
        i || ((i = !0), 'function' == typeof e.destroy && e.destroy());
      }
      function u(e) {
        if ((m(), 0 === no.listenerCount(this, 'error'))) throw e;
      }
      function m() {
        o.removeListener('data', t),
          e.removeListener('drain', n),
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
  var rt = 3,
    st = 4;
  function ut(e, a, o) {
    var t,
      n = this;
    if (
      (xo.call(n),
      (n._mode = o),
      (n.headers = {}),
      (n.rawHeaders = []),
      (n.trailers = {}),
      (n.rawTrailers = []),
      n.on('end', function() {
        T(function() {
          n.emit('close');
        });
      }),
      'fetch' === o)
    ) {
      (n._fetchResponse = a),
        (n.url = a.url),
        (n.statusCode = a.status),
        (n.statusMessage = a.statusText);
      for (
        var i, r, s = a.headers[Symbol.iterator]();
        (i = (r = s.next()).value), !r.done;

      )
        (n.headers[i[0].toLowerCase()] = i[1]), n.rawHeaders.push(i[0], i[1]);
      var u = a.body.getReader();
      (t = function() {
        u.read().then(function(e) {
          n._destroyed ||
            (e.done ? n.push(null) : (n.push(new Re(e.value)), t()));
        });
      })();
    } else {
      if (
        ((n._xhr = e),
        (n._pos = 0),
        (n.url = e.responseURL),
        (n.statusCode = e.status),
        (n.statusMessage = e.statusText),
        e
          .getAllResponseHeaders()
          .split(/\r?\n/)
          .forEach(function(e) {
            var a = e.match(/^([^:]+):\s*(.*)/);
            if (a) {
              var o = a[1].toLowerCase();
              'set-cookie' === o
                ? (void 0 === n.headers[o] && (n.headers[o] = []),
                  n.headers[o].push(a[2]))
                : void 0 !== n.headers[o]
                ? (n.headers[o] += ', ' + a[2])
                : (n.headers[o] = a[2]),
                n.rawHeaders.push(a[1], a[2]);
            }
          }),
        (n._charset = 'x-user-defined'),
        !za)
      ) {
        var m = n.rawHeaders['mime-type'];
        if (m) {
          var c = m.match(/;\s*charset=([^;])(;|$)/);
          c && (n._charset = c[1].toLowerCase());
        }
        n._charset || (n._charset = 'utf-8');
      }
    }
  }
  function mt(e) {
    var a,
      o = this;
    Bo.call(o),
      (o._opts = e),
      (o._body = []),
      (o._headers = {}),
      e.auth &&
        o.setHeader(
          'Authorization',
          'Basic ' + new Re(e.auth).toString('base64')
        ),
      Object.keys(e.headers).forEach(function(a) {
        o.setHeader(a, e.headers[a]);
      });
    var t = !0;
    if ('disable-fetch' === e.mode) (t = !1), (a = !0);
    else if ('prefer-streaming' === e.mode) a = !1;
    else if ('allow-wrong-content-type' === e.mode) a = !za;
    else {
      if (e.mode && 'default' !== e.mode && 'prefer-fast' !== e.mode)
        throw new Error('Invalid value for opts.mode');
      a = !0;
    }
    (o._mode = (function(e, a) {
      return fa && a
        ? 'fetch'
        : wa
        ? 'moz-chunked-arraybuffer'
        : va
        ? 'ms-stream'
        : ja && e
        ? 'arraybuffer'
        : xa && e
        ? 'text:vbarray'
        : 'text';
    })(a, t)),
      o.on('finish', function() {
        o._onFinish();
      });
  }
  Ca(ut, xo),
    (ut.prototype._read = function() {}),
    (ut.prototype._onXHRProgress = function() {
      var e = this,
        a = e._xhr,
        o = null;
      switch (e._mode) {
        case 'text:vbarray':
          if (a.readyState !== st) break;
          try {
            o = new b.VBArray(a.responseBody).toArray();
          } catch (e) {}
          if (null !== o) {
            e.push(new Re(o));
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
              for (var n = new Re(t.length), i = 0; i < t.length; i++)
                n[i] = 255 & t.charCodeAt(i);
              e.push(n);
            } else e.push(t, e._charset);
            e._pos = o.length;
          }
          break;
        case 'arraybuffer':
          if (a.readyState !== st || !a.response) break;
          (o = a.response), e.push(new Re(new Uint8Array(o)));
          break;
        case 'moz-chunked-arraybuffer':
          if (((o = a.response), a.readyState !== rt || !o)) break;
          e.push(new Re(new Uint8Array(o)));
          break;
        case 'ms-stream':
          if (((o = a.response), a.readyState !== rt)) break;
          var r = new b.MSStreamReader();
          (r.onprogress = function() {
            r.result.byteLength > e._pos &&
              (e.push(new Re(new Uint8Array(r.result.slice(e._pos)))),
              (e._pos = r.result.byteLength));
          }),
            (r.onload = function() {
              e.push(null);
            }),
            r.readAsArrayBuffer(o);
      }
      e._xhr.readyState === st && 'ms-stream' !== e._mode && e.push(null);
    }),
    Ca(mt, Bo);
  var ct = [
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
  (mt.prototype.setHeader = function(e, a) {
    var o = e.toLowerCase();
    -1 === ct.indexOf(o) && (this._headers[o] = { name: e, value: a });
  }),
    (mt.prototype.getHeader = function(e) {
      return this._headers[e.toLowerCase()].value;
    }),
    (mt.prototype.removeHeader = function(e) {
      delete this._headers[e.toLowerCase()];
    }),
    (mt.prototype._onFinish = function() {
      var e = this;
      if (!e._destroyed) {
        var a,
          o = e._opts,
          t = e._headers;
        if (
          (('POST' !== o.method &&
            'PUT' !== o.method &&
            'PATCH' !== o.method) ||
            (a = (function() {
              if (void 0 !== ga) return ga;
              try {
                new b.Blob([new ArrayBuffer(1)]), (ga = !0);
              } catch (e) {
                ga = !1;
              }
              return ga;
            })()
              ? new b.Blob(
                  e._body.map(function(e) {
                    return (function(e) {
                      if (e instanceof Uint8Array) {
                        if (
                          0 === e.byteOffset &&
                          e.byteLength === e.buffer.byteLength
                        )
                          return e.buffer;
                        if ('function' == typeof e.buffer.slice)
                          return e.buffer.slice(
                            e.byteOffset,
                            e.byteOffset + e.byteLength
                          );
                      }
                      if (la(e)) {
                        for (
                          var a = new Uint8Array(e.length), o = e.length, t = 0;
                          t < o;
                          t++
                        )
                          a[t] = e[t];
                        return a.buffer;
                      }
                      throw new Error('Argument must be a Buffer');
                    })(e);
                  }),
                  { type: (t['content-type'] || {}).value || '' }
                )
              : Re.concat(e._body).toString()),
          'fetch' === e._mode)
        ) {
          var n = Object.keys(t).map(function(e) {
            return [t[e].name, t[e].value];
          });
          b.fetch(e._opts.url, {
            method: e._opts.method,
            headers: n,
            body: a,
            mode: 'cors',
            credentials: o.withCredentials ? 'include' : 'same-origin'
          }).then(
            function(a) {
              (e._fetchResponse = a), e._connect();
            },
            function(a) {
              e.emit('error', a);
            }
          );
        } else {
          var i = (e._xhr = new b.XMLHttpRequest());
          try {
            i.open(e._opts.method, e._opts.url, !0);
          } catch (a) {
            return void T(function() {
              e.emit('error', a);
            });
          }
          'responseType' in i && (i.responseType = e._mode.split(':')[0]),
            'withCredentials' in i && (i.withCredentials = !!o.withCredentials),
            'text' === e._mode &&
              'overrideMimeType' in i &&
              i.overrideMimeType('text/plain; charset=x-user-defined'),
            Object.keys(t).forEach(function(e) {
              i.setRequestHeader(t[e].name, t[e].value);
            }),
            (e._response = null),
            (i.onreadystatechange = function() {
              switch (i.readyState) {
                case rt:
                case st:
                  e._onXHRProgress();
              }
            }),
            'moz-chunked-arraybuffer' === e._mode &&
              (i.onprogress = function() {
                e._onXHRProgress();
              }),
            (i.onerror = function() {
              e._destroyed || e.emit('error', new Error('XHR error'));
            });
          try {
            i.send(a);
          } catch (a) {
            return void T(function() {
              e.emit('error', a);
            });
          }
        }
      }
    }),
    (mt.prototype._onXHRProgress = function() {
      (function(e) {
        try {
          var a = e.status;
          return null !== a && 0 !== a;
        } catch (e) {
          return !1;
        }
      })(this._xhr) &&
        !this._destroyed &&
        (this._response || this._connect(), this._response._onXHRProgress());
    }),
    (mt.prototype._connect = function() {
      this._destroyed ||
        ((this._response = new ut(this._xhr, this._fetchResponse, this._mode)),
        this.emit('response', this._response));
    }),
    (mt.prototype._write = function(e, a, o) {
      this._body.push(e), o();
    }),
    (mt.prototype.abort = mt.prototype.destroy = function() {
      (this._destroyed = !0),
        this._response && (this._response._destroyed = !0),
        this._xhr && this._xhr.abort();
    }),
    (mt.prototype.end = function(e, a, o) {
      'function' == typeof e && ((o = e), (e = void 0)),
        Bo.prototype.end.call(this, e, a, o);
    }),
    (mt.prototype.flushHeaders = function() {}),
    (mt.prototype.setTimeout = function() {}),
    (mt.prototype.setNoDelay = function() {}),
    (mt.prototype.setSocketKeepAlive = function() {});
  var pt = 2147483647,
    lt = 36,
    ht = 1,
    gt = 26,
    dt = 38,
    ft = 700,
    kt = 72,
    yt = 128,
    bt = '-',
    jt = /^xn--/,
    vt = /[^\x20-\x7E]/,
    wt = /[\x2E\u3002\uFF0E\uFF61]/g,
    zt = {
      overflow: 'Overflow: input needs wider integers to process',
      'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
      'invalid-input': 'Invalid input'
    },
    xt = lt - ht,
    Et = Math.floor,
    Ct = String.fromCharCode;
  function St(e) {
    throw new RangeError(zt[e]);
  }
  function At(e, a) {
    for (var o = e.length, t = []; o--; ) t[o] = a(e[o]);
    return t;
  }
  function Rt(e, a) {
    var o = e.split('@'),
      t = '';
    return (
      o.length > 1 && ((t = o[0] + '@'), (e = o[1])),
      t + At((e = e.replace(wt, '.')).split('.'), a).join('.')
    );
  }
  function _t(e) {
    for (var a, o, t = [], n = 0, i = e.length; n < i; )
      (a = e.charCodeAt(n++)) >= 55296 && a <= 56319 && n < i
        ? 56320 == (64512 & (o = e.charCodeAt(n++)))
          ? t.push(((1023 & a) << 10) + (1023 & o) + 65536)
          : (t.push(a), n--)
        : t.push(a);
    return t;
  }
  function Tt(e) {
    return At(e, function(e) {
      var a = '';
      return (
        e > 65535 &&
          ((a += Ct((((e -= 65536) >>> 10) & 1023) | 55296)),
          (e = 56320 | (1023 & e))),
        (a += Ct(e))
      );
    }).join('');
  }
  function Ot(e, a) {
    return e + 22 + 75 * (e < 26) - ((0 != a) << 5);
  }
  function qt(e, a, o) {
    var t = 0;
    for (
      e = o ? Et(e / ft) : e >> 1, e += Et(e / a);
      e > (xt * gt) >> 1;
      t += lt
    )
      e = Et(e / xt);
    return Et(t + ((xt + 1) * e) / (e + dt));
  }
  function Pt(e) {
    var a,
      o,
      t,
      n,
      i,
      r,
      s,
      u,
      m,
      c,
      p,
      l = [],
      h = e.length,
      g = 0,
      d = yt,
      f = kt;
    for ((o = e.lastIndexOf(bt)) < 0 && (o = 0), t = 0; t < o; ++t)
      e.charCodeAt(t) >= 128 && St('not-basic'), l.push(e.charCodeAt(t));
    for (n = o > 0 ? o + 1 : 0; n < h; ) {
      for (
        i = g, r = 1, s = lt;
        n >= h && St('invalid-input'),
          ((u =
            (p = e.charCodeAt(n++)) - 48 < 10
              ? p - 22
              : p - 65 < 26
              ? p - 65
              : p - 97 < 26
              ? p - 97
              : lt) >= lt ||
            u > Et((pt - g) / r)) &&
            St('overflow'),
          (g += u * r),
          !(u < (m = s <= f ? ht : s >= f + gt ? gt : s - f));
        s += lt
      )
        r > Et(pt / (c = lt - m)) && St('overflow'), (r *= c);
      (f = qt(g - i, (a = l.length + 1), 0 == i)),
        Et(g / a) > pt - d && St('overflow'),
        (d += Et(g / a)),
        (g %= a),
        l.splice(g++, 0, d);
    }
    return Tt(l);
  }
  function Lt(e) {
    var a,
      o,
      t,
      n,
      i,
      r,
      s,
      u,
      m,
      c,
      p,
      l,
      h,
      g,
      d,
      f = [];
    for (l = (e = _t(e)).length, a = yt, o = 0, i = kt, r = 0; r < l; ++r)
      (p = e[r]) < 128 && f.push(Ct(p));
    for (t = n = f.length, n && f.push(bt); t < l; ) {
      for (s = pt, r = 0; r < l; ++r) (p = e[r]) >= a && p < s && (s = p);
      for (
        s - a > Et((pt - o) / (h = t + 1)) && St('overflow'),
          o += (s - a) * h,
          a = s,
          r = 0;
        r < l;
        ++r
      )
        if (((p = e[r]) < a && ++o > pt && St('overflow'), p == a)) {
          for (
            u = o, m = lt;
            !(u < (c = m <= i ? ht : m >= i + gt ? gt : m - i));
            m += lt
          )
            (d = u - c),
              (g = lt - c),
              f.push(Ct(Ot(c + (d % g), 0))),
              (u = Et(d / g));
          f.push(Ct(Ot(u, 0))), (i = qt(o, h, t == n)), (o = 0), ++t;
        }
      ++o, ++a;
    }
    return f.join('');
  }
  function Mt(e) {
    return Rt(e, function(e) {
      return vt.test(e) ? 'xn--' + Lt(e) : e;
    });
  }
  var Nt = {
    version: '1.4.1',
    ucs2: { decode: _t, encode: Tt },
    toASCII: Mt,
    toUnicode: function(e) {
      return Rt(e, function(e) {
        return jt.test(e) ? Pt(e.slice(4).toLowerCase()) : e;
      });
    },
    encode: Lt,
    decode: Pt
  };
  function Dt(e, a) {
    return Object.prototype.hasOwnProperty.call(e, a);
  }
  var It =
    Array.isArray ||
    function(e) {
      return '[object Array]' === Object.prototype.toString.call(e);
    };
  function Ut(e) {
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
  function Bt(e, a) {
    if (e.map) return e.map(a);
    for (var o = [], t = 0; t < e.length; t++) o.push(a(e[t], t));
    return o;
  }
  var Ft =
    Object.keys ||
    function(e) {
      var a = [];
      for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && a.push(o);
      return a;
    };
  function Ht(e, a, o, t) {
    (a = a || '&'), (o = o || '=');
    var n = {};
    if ('string' != typeof e || 0 === e.length) return n;
    var i = /\+/g;
    e = e.split(a);
    var r = 1e3;
    t && 'number' == typeof t.maxKeys && (r = t.maxKeys);
    var s = e.length;
    r > 0 && s > r && (s = r);
    for (var u = 0; u < s; ++u) {
      var m,
        c,
        p,
        l,
        h = e[u].replace(i, '%20'),
        g = h.indexOf(o);
      g >= 0
        ? ((m = h.substr(0, g)), (c = h.substr(g + 1)))
        : ((m = h), (c = '')),
        (p = decodeURIComponent(m)),
        (l = decodeURIComponent(c)),
        Dt(n, p) ? (It(n[p]) ? n[p].push(l) : (n[p] = [n[p], l])) : (n[p] = l);
    }
    return n;
  }
  var Xt = rn;
  function Yt() {
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
  var Wt = /^([a-z0-9.+-]+:)/i,
    $t = /:[0-9]*$/,
    Jt = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
    Kt = ['{', '}', '|', '\\', '^', '`'].concat([
      '<',
      '>',
      '"',
      '`',
      ' ',
      '\r',
      '\n',
      '\t'
    ]),
    Vt = ["'"].concat(Kt),
    Gt = ['%', '/', '?', ';', '#'].concat(Vt),
    Zt = ['/', '?', '#'],
    Qt = 255,
    en = /^[+a-z0-9A-Z_-]{0,63}$/,
    an = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    on = { javascript: !0, 'javascript:': !0 },
    tn = { javascript: !0, 'javascript:': !0 },
    nn = {
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
  function rn(e, a, o) {
    if (e && $a(e) && e instanceof Yt) return e;
    var t = new Yt();
    return t.parse(e, a, o), t;
  }
  function sn(e, a, o, t) {
    if (!Xa(a))
      throw new TypeError("Parameter 'url' must be a string, not " + typeof a);
    var n = a.indexOf('?'),
      i = -1 !== n && n < a.indexOf('#') ? '?' : '#',
      r = a.split(i);
    r[0] = r[0].replace(/\\/g, '/');
    var s = (a = r.join(i));
    if (((s = s.trim()), !t && 1 === a.split('#').length)) {
      var u = Jt.exec(s);
      if (u)
        return (
          (e.path = s),
          (e.href = s),
          (e.pathname = u[1]),
          u[2]
            ? ((e.search = u[2]),
              (e.query = o ? Ht(e.search.substr(1)) : e.search.substr(1)))
            : o && ((e.search = ''), (e.query = {})),
          e
        );
    }
    var m,
      c,
      p,
      l,
      h = Wt.exec(s);
    if (h) {
      var g = (h = h[0]).toLowerCase();
      (e.protocol = g), (s = s.substr(h.length));
    }
    if (t || h || s.match(/^\/\/[^@\/]+@[^@\/]+/)) {
      var d = '//' === s.substr(0, 2);
      !d || (h && tn[h]) || ((s = s.substr(2)), (e.slashes = !0));
    }
    if (!tn[h] && (d || (h && !nn[h]))) {
      var f,
        k,
        y = -1;
      for (m = 0; m < Zt.length; m++)
        -1 !== (c = s.indexOf(Zt[m])) && (-1 === y || c < y) && (y = c);
      for (
        -1 !== (k = -1 === y ? s.lastIndexOf('@') : s.lastIndexOf('@', y)) &&
          ((f = s.slice(0, k)),
          (s = s.slice(k + 1)),
          (e.auth = decodeURIComponent(f))),
          y = -1,
          m = 0;
        m < Gt.length;
        m++
      )
        -1 !== (c = s.indexOf(Gt[m])) && (-1 === y || c < y) && (y = c);
      -1 === y && (y = s.length),
        (e.host = s.slice(0, y)),
        (s = s.slice(y)),
        mn(e),
        (e.hostname = e.hostname || '');
      var b =
        '[' === e.hostname[0] && ']' === e.hostname[e.hostname.length - 1];
      if (!b) {
        var j = e.hostname.split(/\./);
        for (m = 0, p = j.length; m < p; m++) {
          var v = j[m];
          if (v && !v.match(en)) {
            for (var w = '', z = 0, x = v.length; z < x; z++)
              v.charCodeAt(z) > 127 ? (w += 'x') : (w += v[z]);
            if (!w.match(en)) {
              var E = j.slice(0, m),
                C = j.slice(m + 1),
                S = v.match(an);
              S && (E.push(S[1]), C.unshift(S[2])),
                C.length && (s = '/' + C.join('.') + s),
                (e.hostname = E.join('.'));
              break;
            }
          }
        }
      }
      e.hostname.length > Qt
        ? (e.hostname = '')
        : (e.hostname = e.hostname.toLowerCase()),
        b || (e.hostname = Mt(e.hostname)),
        (l = e.port ? ':' + e.port : '');
      var A = e.hostname || '';
      (e.host = A + l),
        (e.href += e.host),
        b &&
          ((e.hostname = e.hostname.substr(1, e.hostname.length - 2)),
          '/' !== s[0] && (s = '/' + s));
    }
    if (!on[g])
      for (m = 0, p = Vt.length; m < p; m++) {
        var R = Vt[m];
        if (-1 !== s.indexOf(R)) {
          var _ = encodeURIComponent(R);
          _ === R && (_ = escape(R)), (s = s.split(R).join(_));
        }
      }
    var T = s.indexOf('#');
    -1 !== T && ((e.hash = s.substr(T)), (s = s.slice(0, T)));
    var O = s.indexOf('?');
    if (
      (-1 !== O
        ? ((e.search = s.substr(O)),
          (e.query = s.substr(O + 1)),
          o && (e.query = Ht(e.query)),
          (s = s.slice(0, O)))
        : o && ((e.search = ''), (e.query = {})),
      s && (e.pathname = s),
      nn[g] && e.hostname && !e.pathname && (e.pathname = '/'),
      e.pathname || e.search)
    ) {
      l = e.pathname || '';
      var q = e.search || '';
      e.path = l + q;
    }
    return (e.href = un(e)), e;
  }
  function un(e) {
    var a = e.auth || '';
    a && ((a = (a = encodeURIComponent(a)).replace(/%3A/i, ':')), (a += '@'));
    var o = e.protocol || '',
      t = e.pathname || '',
      n = e.hash || '',
      i = !1,
      r = '';
    e.host
      ? (i = a + e.host)
      : e.hostname &&
        ((i =
          a +
          (-1 === e.hostname.indexOf(':')
            ? e.hostname
            : '[' + this.hostname + ']')),
        e.port && (i += ':' + e.port)),
      e.query &&
        $a(e.query) &&
        Object.keys(e.query).length &&
        (r = (function(e, a, o, t) {
          return (
            (a = a || '&'),
            (o = o || '='),
            null === e && (e = void 0),
            'object' == typeof e
              ? Bt(Ft(e), function(t) {
                  var n = encodeURIComponent(Ut(t)) + o;
                  return It(e[t])
                    ? Bt(e[t], function(e) {
                        return n + encodeURIComponent(Ut(e));
                      }).join(a)
                    : n + encodeURIComponent(Ut(e[t]));
                }).join(a)
              : t
              ? encodeURIComponent(Ut(t)) + o + encodeURIComponent(Ut(e))
              : ''
          );
        })(e.query));
    var s = e.search || (r && '?' + r) || '';
    return (
      o && ':' !== o.substr(-1) && (o += ':'),
      e.slashes || ((!o || nn[o]) && !1 !== i)
        ? ((i = '//' + (i || '')), t && '/' !== t.charAt(0) && (t = '/' + t))
        : i || (i = ''),
      n && '#' !== n.charAt(0) && (n = '#' + n),
      s && '?' !== s.charAt(0) && (s = '?' + s),
      o +
        i +
        (t = t.replace(/[?#]/g, function(e) {
          return encodeURIComponent(e);
        })) +
        (s = s.replace('#', '%23')) +
        n
    );
  }
  function mn(e) {
    var a = e.host,
      o = $t.exec(a);
    o &&
      (':' !== (o = o[0]) && (e.port = o.substr(1)),
      (a = a.substr(0, a.length - o.length))),
      a && (e.hostname = a);
  }
  function cn(e, a) {
    'string' == typeof e && (e = rn(e));
    var o = -1 === b.location.protocol.search(/^https?:$/) ? 'http:' : '',
      t = e.protocol || o,
      n = e.hostname || e.host,
      i = e.port,
      r = e.path || '/';
    n && -1 !== n.indexOf(':') && (n = '[' + n + ']'),
      (e.url = (n ? t + '//' + n : '') + (i ? ':' + i : '') + r),
      (e.method = (e.method || 'GET').toUpperCase()),
      (e.headers = e.headers || {});
    var s = new mt(e);
    return a && s.on('response', a), s;
  }
  function pn() {}
  (Yt.prototype.parse = function(e, a, o) {
    return sn(this, e, a, o);
  }),
    (Yt.prototype.format = function() {
      return un(this);
    }),
    (Yt.prototype.resolve = function(e) {
      return this.resolveObject(rn(e, !1, !0)).format();
    }),
    (Yt.prototype.resolveObject = function(e) {
      if (Xa(e)) {
        var a = new Yt();
        a.parse(e, !1, !0), (e = a);
      }
      for (
        var o, t = new Yt(), n = Object.keys(this), i = 0;
        i < n.length;
        i++
      ) {
        var r = n[i];
        t[r] = this[r];
      }
      if (((t.hash = e.hash), '' === e.href)) return (t.href = t.format()), t;
      if (e.slashes && !e.protocol) {
        for (var s = Object.keys(e), u = 0; u < s.length; u++) {
          var m = s[u];
          'protocol' !== m && (t[m] = e[m]);
        }
        return (
          nn[t.protocol] &&
            t.hostname &&
            !t.pathname &&
            (t.path = t.pathname = '/'),
          (t.href = t.format()),
          t
        );
      }
      if (e.protocol && e.protocol !== t.protocol) {
        if (!nn[e.protocol]) {
          for (var c = Object.keys(e), p = 0; p < c.length; p++) {
            var l = c[p];
            t[l] = e[l];
          }
          return (t.href = t.format()), t;
        }
        if (((t.protocol = e.protocol), e.host || tn[e.protocol]))
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
            g = t.search || '';
          t.path = h + g;
        }
        return (t.slashes = t.slashes || e.slashes), (t.href = t.format()), t;
      }
      var d,
        f = t.pathname && '/' === t.pathname.charAt(0),
        k = e.host || (e.pathname && '/' === e.pathname.charAt(0)),
        y = k || f || (t.host && e.pathname),
        b = y,
        j = (t.pathname && t.pathname.split('/')) || [],
        v = t.protocol && !nn[t.protocol];
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
          (y = y && ('' === o[0] || '' === j[0]))),
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
      else if (!Fa(e.search))
        return (
          v &&
            ((t.hostname = t.host = j.shift()),
            (d = !!(t.host && t.host.indexOf('@') > 0) && t.host.split('@')) &&
              ((t.auth = d.shift()), (t.host = t.hostname = d.shift()))),
          (t.search = e.search),
          (t.query = e.query),
          (Ba(t.pathname) && Ba(t.search)) ||
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
          z =
            ((t.host || e.host || j.length > 1) && ('.' === w || '..' === w)) ||
            '' === w,
          x = 0,
          E = j.length;
        E >= 0;
        E--
      )
        '.' === (w = j[E])
          ? j.splice(E, 1)
          : '..' === w
          ? (j.splice(E, 1), x++)
          : x && (j.splice(E, 1), x--);
      if (!y && !b) for (; x--; x) j.unshift('..');
      !y || '' === j[0] || (j[0] && '/' === j[0].charAt(0)) || j.unshift(''),
        z && '/' !== j.join('/').substr(-1) && j.push('');
      var C = '' === j[0] || (j[0] && '/' === j[0].charAt(0));
      return (
        v &&
          ((t.hostname = t.host = C ? '' : j.length ? j.shift() : ''),
          (d = !!(t.host && t.host.indexOf('@') > 0) && t.host.split('@')) &&
            ((t.auth = d.shift()), (t.host = t.hostname = d.shift()))),
        (y = y || (t.host && j.length)) && !C && j.unshift(''),
        j.length
          ? (t.pathname = j.join('/'))
          : ((t.pathname = null), (t.path = null)),
        (Ba(t.pathname) && Ba(t.search)) ||
          (t.path =
            (t.pathname ? t.pathname : '') + (t.search ? t.search : '')),
        (t.auth = e.auth || t.auth),
        (t.slashes = t.slashes || e.slashes),
        (t.href = t.format()),
        t
      );
    }),
    (Yt.prototype.parseHost = function() {
      return mn(this);
    }),
    (pn.defaultMaxSockets = 4);
  var ln = {
      request: cn,
      get: function(e, a) {
        var o = cn(e, a);
        return o.end(), o;
      },
      Agent: pn,
      METHODS: [
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
      STATUS_CODES: {
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
      }
    },
    hn = {
      isStandardBrowserEnv: function() {
        return (
          ('undefined' == typeof navigator ||
            'ReactNative' !== navigator.product) &&
          ('undefined' != typeof window && 'undefined' != typeof document)
        );
      },
      isNode: function() {
        return !hn.isStandardBrowserEnv();
      }
    };
  var gn = function(e) {
    return e;
  };
  function dn(e, a) {
    return e((a = { exports: {} }), a.exports), a.exports;
  }
  var fn,
    kn = dn(function(e) {
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
        n = (e.exports = function(e) {
          return e && e.exact
            ? new RegExp('(?:^'.concat(a, '$)|(?:^').concat(t, '$)'))
            : new RegExp('(?:'.concat(a, ')|(?:').concat(t, ')'), 'g');
        });
      (n.v4 = function(e) {
        return e && e.exact
          ? new RegExp('^'.concat(a, '$'))
          : new RegExp(a, 'g');
      }),
        (n.v6 = function(e) {
          return e && e.exact
            ? new RegExp('^'.concat(t, '$'))
            : new RegExp(t, 'g');
        });
    }),
    yn =
      ((fn = Object.freeze({
        default: [
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
        ]
      })) &&
        fn.default) ||
      fn,
    bn = dn(function(e, a) {
      var o = {};
      (o.rules = yn.map(function(e) {
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
          var a = Nt.toASCII(e);
          return o.rules.reduce(function(e, t) {
            return (
              -1 === t.punySuffix && (t.punySuffix = Nt.toASCII(t.suffix)),
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
          var a = Nt.toASCII(e);
          if (a.length < 1) return 'DOMAIN_TOO_SHORT';
          if (a.length > 255) return 'DOMAIN_TOO_LONG';
          for (var o, t = a.split('.'), n = 0; n < t.length; ++n) {
            if (!(o = t[n]).length) return 'LABEL_TOO_SHORT';
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
          var n = o.validate(t);
          if (n)
            return { input: e, error: { message: a.errorCodes[n], code: n } };
          var i = {
              input: e,
              tld: null,
              sld: null,
              domain: null,
              subdomain: null,
              listed: !1
            },
            r = t.split('.');
          if ('local' === r[r.length - 1]) return i;
          var s = function() {
              return /xn--/.test(t)
                ? (i.domain && (i.domain = Nt.toASCII(i.domain)),
                  i.subdomain && (i.subdomain = Nt.toASCII(i.subdomain)),
                  i)
                : i;
            },
            u = o.findRule(t);
          if (!u)
            return r.length < 2
              ? i
              : ((i.tld = r.pop()),
                (i.sld = r.pop()),
                (i.domain = [i.sld, i.tld].join('.')),
                r.length && (i.subdomain = r.pop()),
                s());
          i.listed = !0;
          var m = u.suffix.split('.'),
            c = r.slice(0, r.length - m.length);
          return (
            u.exception && c.push(m.shift()),
            (i.tld = m.join('.')),
            c.length
              ? (u.wildcard && (m.unshift(c.pop()), (i.tld = m.join('.'))),
                c.length
                  ? ((i.sld = c.pop()),
                    (i.domain = [i.sld, i.tld].join('.')),
                    c.length && (i.subdomain = c.join('.')),
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
    });
  bn.errorCodes, bn.parse, bn.get, bn.isValid;
  var jn = {
    getPublicSuffix: function(e) {
      return bn.get(e);
    }
  };
  function vn() {}
  var wn = vn;
  (vn.prototype.synchronous = !1),
    (vn.prototype.findCookie = function(e, a, o, t) {
      throw new Error('findCookie is not implemented');
    }),
    (vn.prototype.findCookies = function(e, a, o) {
      throw new Error('findCookies is not implemented');
    }),
    (vn.prototype.putCookie = function(e, a) {
      throw new Error('putCookie is not implemented');
    }),
    (vn.prototype.updateCookie = function(e, a, o) {
      throw new Error('updateCookie is not implemented');
    }),
    (vn.prototype.removeCookie = function(e, a, o, t) {
      throw new Error('removeCookie is not implemented');
    }),
    (vn.prototype.removeCookies = function(e, a, o) {
      throw new Error('removeCookies is not implemented');
    }),
    (vn.prototype.removeAllCookies = function(e) {
      throw new Error('removeAllCookies is not implemented');
    }),
    (vn.prototype.getAllCookies = function(e) {
      throw new Error(
        'getAllCookies is not implemented (therefore jar cannot be serialized)'
      );
    });
  var zn = { Store: wn };
  var xn = {
    permuteDomain: function(e) {
      var a = jn.getPublicSuffix(e);
      if (!a) return null;
      if (a == e) return [e];
      for (
        var o = e
            .slice(0, -(a.length + 1))
            .split('.')
            .reverse(),
          t = a,
          n = [t];
        o.length;

      )
        (t = o.shift() + '.' + t), n.push(t);
      return n;
    }
  };
  var En = {
      pathMatch: function(e, a) {
        if (a === e) return !0;
        if (0 === e.indexOf(a)) {
          if ('/' === a.substr(-1)) return !0;
          if ('/' === e.substr(a.length, 1)) return !0;
        }
        return !1;
      }
    },
    Cn = zn.Store,
    Sn = xn.permuteDomain,
    An = En.pathMatch;
  function Rn() {
    Cn.call(this), (this.idx = {});
  }
  oo.inherits(Rn, Cn);
  var _n = Rn;
  (Rn.prototype.idx = null),
    (Rn.prototype.synchronous = !0),
    (Rn.prototype.inspect = function() {
      return '{ idx: ' + oo.inspect(this.idx, !1, 2) + ' }';
    }),
    oo.inspect.custom &&
      (Rn.prototype[oo.inspect.custom] = Rn.prototype.inspect),
    (Rn.prototype.findCookie = function(e, a, o, t) {
      return this.idx[e] && this.idx[e][a]
        ? t(null, this.idx[e][a][o] || null)
        : t(null, void 0);
    }),
    (Rn.prototype.findCookies = function(e, a, o) {
      var t,
        n = [];
      if (!e) return o(null, []);
      t = a
        ? function(e) {
            Object.keys(e).forEach(function(o) {
              if (An(a, o)) {
                var t = e[o];
                for (var i in t) n.push(t[i]);
              }
            });
          }
        : function(e) {
            for (var a in e) {
              var o = e[a];
              for (var t in o) n.push(o[t]);
            }
          };
      var i = Sn(e) || [e],
        r = this.idx;
      i.forEach(function(e) {
        var a = r[e];
        a && t(a);
      }),
        o(null, n);
    }),
    (Rn.prototype.putCookie = function(e, a) {
      this.idx[e.domain] || (this.idx[e.domain] = {}),
        this.idx[e.domain][e.path] || (this.idx[e.domain][e.path] = {}),
        (this.idx[e.domain][e.path][e.key] = e),
        a(null);
    }),
    (Rn.prototype.updateCookie = function(e, a, o) {
      this.putCookie(a, o);
    }),
    (Rn.prototype.removeCookie = function(e, a, o, t) {
      this.idx[e] &&
        this.idx[e][a] &&
        this.idx[e][a][o] &&
        delete this.idx[e][a][o],
        t(null);
    }),
    (Rn.prototype.removeCookies = function(e, a, o) {
      return (
        this.idx[e] && (a ? delete this.idx[e][a] : delete this.idx[e]), o(null)
      );
    }),
    (Rn.prototype.removeAllCookies = function(e) {
      return (this.idx = {}), e(null);
    }),
    (Rn.prototype.getAllCookies = function(e) {
      var a = [],
        o = this.idx;
      Object.keys(o).forEach(function(e) {
        Object.keys(o[e]).forEach(function(t) {
          Object.keys(o[e][t]).forEach(function(n) {
            null !== n && a.push(o[e][t][n]);
          });
        });
      }),
        a.sort(function(e, a) {
          return (e.creationIndex || 0) - (a.creationIndex || 0);
        }),
        e(null, a);
    });
  var Tn,
    On = { MemoryCookieStore: _n },
    qn = Xt,
    Pn = kn({ exact: !0 }),
    Ln = zn.Store,
    Mn = On.MemoryCookieStore,
    Nn = En.pathMatch;
  try {
    Tn = Nt;
  } catch (e) {
    console.warn(
      "tough-cookie: can't load punycode; won't use punycode for domain normalization"
    );
  }
  var Dn = /^[\x21\x23-\x2B\x2D-\x3A\x3C-\x5B\x5D-\x7E]+$/,
    In = /[\x00-\x1F]/,
    Un = ['\n', '\r', '\0'],
    Bn = /[\x20-\x3A\x3C-\x7E]+/,
    Fn = /[\x09\x20-\x2F\x3B-\x40\x5B-\x60\x7B-\x7E]/,
    Hn = {
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
    Xn = [
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
    Yn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    Wn = 2147483647e3;
  function $n(e, a, o, t) {
    for (var n = 0; n < e.length; ) {
      var i = e.charCodeAt(n);
      if (i <= 47 || i >= 58) break;
      n++;
    }
    return n < a || n > o
      ? null
      : t || n == e.length
      ? parseInt(e.substr(0, n), 10)
      : null;
  }
  function Jn(e) {
    var a = e.split(':'),
      o = [0, 0, 0];
    if (3 !== a.length) return null;
    for (var t = 0; t < 3; t++) {
      var n = 2 == t,
        i = $n(a[t], 1, 2, n);
      if (null === i) return null;
      o[t] = i;
    }
    return o;
  }
  function Kn(e) {
    e = String(e)
      .substr(0, 3)
      .toLowerCase();
    var a = Hn[e];
    return a >= 0 ? a : null;
  }
  function Vn(e) {
    if (e) {
      var a = e.split(Fn);
      if (a) {
        for (
          var o = null, t = null, n = null, i = null, r = null, s = null, u = 0;
          u < a.length;
          u++
        ) {
          var m,
            c = a[u].trim();
          if (c.length)
            null === n && (m = Jn(c))
              ? ((o = m[0]), (t = m[1]), (n = m[2]))
              : null !== i || null === (m = $n(c, 1, 2, !0))
              ? null !== r || null === (m = Kn(c))
                ? null === s &&
                  null !== (m = $n(c, 2, 4, !0)) &&
                  ((s = m) >= 70 && s <= 99
                    ? (s += 1900)
                    : s >= 0 && s <= 69 && (s += 2e3))
                : (r = m)
              : (i = m);
        }
        if (
          !(
            null === i ||
            null === r ||
            null === s ||
            null === n ||
            i < 1 ||
            i > 31 ||
            s < 1601 ||
            o > 23 ||
            t > 59 ||
            n > 59
          )
        )
          return new Date(Date.UTC(s, r, i, o, t, n));
      }
    }
  }
  function Gn(e) {
    var a = e.getUTCDate();
    a = a >= 10 ? a : '0' + a;
    var o = e.getUTCHours();
    o = o >= 10 ? o : '0' + o;
    var t = e.getUTCMinutes();
    t = t >= 10 ? t : '0' + t;
    var n = e.getUTCSeconds();
    return (
      (n = n >= 10 ? n : '0' + n),
      Yn[e.getUTCDay()] +
        ', ' +
        a +
        ' ' +
        Xn[e.getUTCMonth()] +
        ' ' +
        e.getUTCFullYear() +
        ' ' +
        o +
        ':' +
        t +
        ':' +
        n +
        ' GMT'
    );
  }
  function Zn(e) {
    return null == e
      ? null
      : ((e = e.trim().replace(/^\./, '')),
        Tn && /[^\u0001-\u007f]/.test(e) && (e = Tn.toASCII(e)),
        e.toLowerCase());
  }
  function Qn(e, a, o) {
    if (null == e || null == a) return null;
    if ((!1 !== o && ((e = Zn(e)), (a = Zn(a))), e == a)) return !0;
    if (Pn.test(e)) return !1;
    var t = e.indexOf(a);
    return (
      !(t <= 0) && (e.length === a.length + t && '.' === e.substr(t - 1, 1))
    );
  }
  function ei(e) {
    if (!e || '/' !== e.substr(0, 1)) return '/';
    if ('/' === e) return e;
    var a = e.lastIndexOf('/');
    return 0 === a ? '/' : e.slice(0, a);
  }
  function ai(e, a) {
    var o,
      t,
      n = (e = (function(e) {
        for (var a = 0; a < Un.length; a++) {
          var o = e.indexOf(Un[a]);
          -1 !== o && (e = e.substr(0, o));
        }
        return e;
      })(e)).indexOf('=');
    if (a) 0 === n && (n = (e = e.substr(1)).indexOf('='));
    else if (n <= 0) return;
    if (
      (n <= 0
        ? ((o = ''), (t = e.trim()))
        : ((o = e.substr(0, n).trim()), (t = e.substr(n + 1).trim())),
      !In.test(o) && !In.test(t))
    ) {
      var i = new si();
      return (i.key = o), (i.value = t), i;
    }
  }
  function oi(e, a) {
    (a && 'object' == typeof a) || (a = {});
    var o = (e = e.trim()).indexOf(';'),
      t = ai(-1 === o ? e : e.substr(0, o), !!a.loose);
    if (t) {
      if (-1 === o) return t;
      var n = e.slice(o + 1).trim();
      if (0 === n.length) return t;
      for (var i = n.split(';'); i.length; ) {
        var r = i.shift().trim();
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
                var c = Vn(u);
                c && (t.expires = c);
              }
              break;
            case 'max-age':
              if (u && /^-?[0-9]+$/.test(u)) {
                var p = parseInt(u, 10);
                t.setMaxAge(p);
              }
              break;
            case 'domain':
              if (u) {
                var l = u.trim().replace(/^\./, '');
                l && (t.domain = l.toLowerCase());
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
  function ti(e) {
    var a;
    try {
      a = JSON.parse(e);
    } catch (e) {
      return e;
    }
    return a;
  }
  function ni(e) {
    if (!e) return null;
    var a;
    if ('string' == typeof e) {
      if ((a = ti(e)) instanceof Error) return null;
    } else a = e;
    for (var o = new si(), t = 0; t < si.serializableProperties.length; t++) {
      var n = si.serializableProperties[t];
      void 0 !== a[n] &&
        a[n] !== si.prototype[n] &&
        ('expires' === n || 'creation' === n || 'lastAccessed' === n
          ? null === a[n]
            ? (o[n] = null)
            : (o[n] = 'Infinity' == a[n] ? 'Infinity' : new Date(a[n]))
          : (o[n] = a[n]));
    }
    return o;
  }
  function ii(e, a) {
    var o = 0,
      t = e.path ? e.path.length : 0;
    return 0 !== (o = (a.path ? a.path.length : 0) - t)
      ? o
      : 0 !==
        (o =
          (e.creation ? e.creation.getTime() : Wn) -
          (a.creation ? a.creation.getTime() : Wn))
      ? o
      : (o = e.creationIndex - a.creationIndex);
  }
  function ri(e) {
    if (e instanceof Object) return e;
    try {
      e = decodeURI(e);
    } catch (e) {}
    return qn(e);
  }
  function si(e) {
    (e = e || {}),
      Object.keys(e).forEach(function(a) {
        si.prototype.hasOwnProperty(a) &&
          si.prototype[a] !== e[a] &&
          '_' !== a.substr(0, 1) &&
          (this[a] = e[a]);
      }, this),
      (this.creation = this.creation || new Date()),
      Object.defineProperty(this, 'creationIndex', {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: ++si.cookiesCreated
      });
  }
  function ui(e, a) {
    'boolean' == typeof a
      ? (a = { rejectPublicSuffixes: a })
      : null == a && (a = {}),
      null != a.rejectPublicSuffixes &&
        (this.rejectPublicSuffixes = a.rejectPublicSuffixes),
      null != a.looseMode && (this.enableLooseMode = a.looseMode),
      e || (e = new Mn()),
      (this.store = e);
  }
  (si.cookiesCreated = 0),
    (si.parse = oi),
    (si.fromJSON = ni),
    (si.prototype.key = ''),
    (si.prototype.value = ''),
    (si.prototype.expires = 'Infinity'),
    (si.prototype.maxAge = null),
    (si.prototype.domain = null),
    (si.prototype.path = null),
    (si.prototype.secure = !1),
    (si.prototype.httpOnly = !1),
    (si.prototype.extensions = null),
    (si.prototype.hostOnly = null),
    (si.prototype.pathIsDefault = null),
    (si.prototype.creation = null),
    (si.prototype.lastAccessed = null),
    Object.defineProperty(si.prototype, 'creationIndex', {
      configurable: !0,
      enumerable: !1,
      writable: !0,
      value: 0
    }),
    (si.serializableProperties = Object.keys(si.prototype).filter(function(e) {
      return !(
        si.prototype[e] instanceof Function ||
        'creationIndex' === e ||
        '_' === e.substr(0, 1)
      );
    })),
    (si.prototype.inspect = function() {
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
    oo.inspect.custom &&
      (si.prototype[oo.inspect.custom] = si.prototype.inspect),
    (si.prototype.toJSON = function() {
      for (
        var e = {}, a = si.serializableProperties, o = 0;
        o < a.length;
        o++
      ) {
        var t = a[o];
        this[t] !== si.prototype[t] &&
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
            : this[t] !== si.prototype[t] && (e[t] = this[t]));
      }
      return e;
    }),
    (si.prototype.clone = function() {
      return ni(this.toJSON());
    }),
    (si.prototype.validate = function() {
      if (!Dn.test(this.value)) return !1;
      if (
        !(
          this.expires == 1 / 0 ||
          this.expires instanceof Date ||
          Vn(this.expires)
        )
      )
        return !1;
      if (null != this.maxAge && this.maxAge <= 0) return !1;
      if (null != this.path && !Bn.test(this.path)) return !1;
      var e = this.cdomain();
      if (e) {
        if (e.match(/\.$/)) return !1;
        if (null == jn.getPublicSuffix(e)) return !1;
      }
      return !0;
    }),
    (si.prototype.setExpires = function(e) {
      e instanceof Date
        ? (this.expires = e)
        : (this.expires = Vn(e) || 'Infinity');
    }),
    (si.prototype.setMaxAge = function(e) {
      this.maxAge = e === 1 / 0 || e === -1 / 0 ? e.toString() : e;
    }),
    (si.prototype.cookieString = function() {
      var e = this.value;
      return null == e && (e = ''), '' === this.key ? e : this.key + '=' + e;
    }),
    (si.prototype.toString = function() {
      var e = this.cookieString();
      return (
        this.expires != 1 / 0 &&
          (this.expires instanceof Date
            ? (e += '; Expires=' + Gn(this.expires))
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
    (si.prototype.TTL = function(e) {
      if (null != this.maxAge) return this.maxAge <= 0 ? 0 : 1e3 * this.maxAge;
      var a = this.expires;
      return a != 1 / 0
        ? (a instanceof Date || (a = Vn(a) || 1 / 0),
          a == 1 / 0 ? 1 / 0 : a.getTime() - (e || Date.now()))
        : 1 / 0;
    }),
    (si.prototype.expiryTime = function(e) {
      if (null != this.maxAge) {
        var a = e || this.creation || new Date(),
          o = this.maxAge <= 0 ? -1 / 0 : 1e3 * this.maxAge;
        return a.getTime() + o;
      }
      return this.expires == 1 / 0 ? 1 / 0 : this.expires.getTime();
    }),
    (si.prototype.expiryDate = function(e) {
      var a = this.expiryTime(e);
      return a == 1 / 0
        ? new Date(Wn)
        : a == -1 / 0
        ? new Date(0)
        : new Date(a);
    }),
    (si.prototype.isPersistent = function() {
      return null != this.maxAge || this.expires != 1 / 0;
    }),
    (si.prototype.cdomain = si.prototype.canonicalizedDomain = function() {
      return null == this.domain ? null : Zn(this.domain);
    }),
    (ui.prototype.store = null),
    (ui.prototype.rejectPublicSuffixes = !0),
    (ui.prototype.enableLooseMode = !1);
  var mi = [];
  function ci(e) {
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
  mi.push('setCookie'),
    (ui.prototype.setCookie = function(e, a, o, t) {
      var n,
        i = ri(a);
      o instanceof Function && ((t = o), (o = {}));
      var r = Zn(i.hostname),
        s = this.enableLooseMode;
      if (
        (null != o.loose && (s = o.loose),
        'string' == typeof e || e instanceof String)
      ) {
        if (!(e = si.parse(e, { loose: s })))
          return (
            (n = new Error('Cookie failed to parse')),
            t(o.ignoreError ? null : n)
          );
      } else if (!(e instanceof si))
        return (
          (n = new Error(
            'First argument to setCookie must be a Cookie object or string'
          )),
          t(o.ignoreError ? null : n)
        );
      var u = o.now || new Date();
      if (
        this.rejectPublicSuffixes &&
        e.domain &&
        null == jn.getPublicSuffix(e.cdomain())
      )
        return (
          (n = new Error('Cookie has domain set to a public suffix')),
          t(o.ignoreError ? null : n)
        );
      if (e.domain) {
        if (!Qn(r, e.cdomain(), !1))
          return (
            (n = new Error(
              "Cookie not in this host's domain. Cookie:" +
                e.cdomain() +
                ' Request:' +
                r
            )),
            t(o.ignoreError ? null : n)
          );
        null == e.hostOnly && (e.hostOnly = !1);
      } else (e.hostOnly = !0), (e.domain = r);
      if (
        ((e.path && '/' === e.path[0]) ||
          ((e.path = ei(i.pathname)), (e.pathIsDefault = !0)),
        !1 === o.http && e.httpOnly)
      )
        return (
          (n = new Error("Cookie is HttpOnly and this isn't an HTTP API")),
          t(o.ignoreError ? null : n)
        );
      var m = this.store;
      m.updateCookie ||
        (m.updateCookie = function(e, a, o) {
          this.putCookie(a, o);
        }),
        m.findCookie(e.domain, e.path, e.key, function(a, n) {
          if (a) return t(a);
          var i = function(a) {
            if (a) return t(a);
            t(null, e);
          };
          if (n) {
            if (!1 === o.http && n.httpOnly)
              return (
                (a = new Error(
                  "old Cookie is HttpOnly and this isn't an HTTP API"
                )),
                t(o.ignoreError ? null : a)
              );
            (e.creation = n.creation),
              (e.creationIndex = n.creationIndex),
              (e.lastAccessed = u),
              m.updateCookie(n, e, i);
          } else (e.creation = e.lastAccessed = u), m.putCookie(e, i);
        });
    }),
    mi.push('getCookies'),
    (ui.prototype.getCookies = function(e, a, o) {
      var t = ri(e);
      a instanceof Function && ((o = a), (a = {}));
      var n = Zn(t.hostname),
        i = t.pathname || '/',
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
        p = this.store;
      function l(e) {
        if (e.hostOnly) {
          if (e.domain != n) return !1;
        } else if (!Qn(n, e.domain, !1)) return !1;
        return (
          !(!c && !Nn(i, e.path)) &&
          (!(e.secure && !r) &&
            (!(e.httpOnly && !s) &&
              (!(m && e.expiryTime() <= u) ||
                (p.removeCookie(e.domain, e.path, e.key, function() {}), !1))))
        );
      }
      p.findCookies(n, c ? null : i, function(e, t) {
        if (e) return o(e);
        (t = t.filter(l)), !1 !== a.sort && (t = t.sort(ii));
        var n = new Date();
        t.forEach(function(e) {
          e.lastAccessed = n;
        }),
          o(null, t);
      });
    }),
    mi.push('getCookieString'),
    (ui.prototype.getCookieString = function() {
      var e = Array.prototype.slice.call(arguments, 0),
        a = e.pop(),
        o = function(e, o) {
          e
            ? a(e)
            : a(
                null,
                o
                  .sort(ii)
                  .map(function(e) {
                    return e.cookieString();
                  })
                  .join('; ')
              );
        };
      e.push(o), this.getCookies.apply(this, e);
    }),
    mi.push('getSetCookieStrings'),
    (ui.prototype.getSetCookieStrings = function() {
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
    mi.push('serialize'),
    (ui.prototype.serialize = function(e) {
      var a = this.store.constructor.name;
      'Object' === a && (a = null);
      var o = {
        version: 'tough-cookie@3.0.1',
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
                delete (e = e instanceof si ? e.toJSON() : e).creationIndex, e
              );
            })),
            e(null, o));
      });
    }),
    (ui.prototype.toJSON = function() {
      return this.serializeSync();
    }),
    mi.push('_importCookies'),
    (ui.prototype._importCookies = function(e, a) {
      var o = this,
        t = e.cookies;
      if (!t || !Array.isArray(t))
        return a(new Error('serialized jar has no cookies array'));
      (t = t.slice()),
        (function e(n) {
          if (n) return a(n);
          if (!t.length) return a(n, o);
          var i;
          try {
            i = ni(t.shift());
          } catch (e) {
            return a(e);
          }
          if (null === i) return e(null);
          o.store.putCookie(i, e);
        })();
    }),
    (ui.deserialize = function(e, a, o) {
      var t;
      if (
        (3 !== arguments.length && ((o = a), (a = null)), 'string' == typeof e)
      ) {
        if ((t = ti(e)) instanceof Error) return o(t);
      } else t = e;
      var n = new ui(a, t.rejectPublicSuffixes);
      n._importCookies(t, function(e) {
        if (e) return o(e);
        o(null, n);
      });
    }),
    (ui.deserializeSync = function(e, a) {
      var o = 'string' == typeof e ? JSON.parse(e) : e,
        t = new ui(a, o.rejectPublicSuffixes);
      if (!t.store.synchronous)
        throw new Error(
          'CookieJar store is not synchronous; use async API instead.'
        );
      return t._importCookiesSync(o), t;
    }),
    (ui.fromJSON = ui.deserializeSync),
    (ui.prototype.clone = function(e, a) {
      1 === arguments.length && ((a = e), (e = null)),
        this.serialize(function(o, t) {
          if (o) return a(o);
          ui.deserialize(t, e, a);
        });
    }),
    mi.push('removeAllCookies'),
    (ui.prototype.removeAllCookies = function(e) {
      var a = this.store;
      if (
        a.removeAllCookies instanceof Function &&
        a.removeAllCookies !== Ln.prototype.removeAllCookies
      )
        return a.removeAllCookies(e);
      a.getAllCookies(function(o, t) {
        if (o) return e(o);
        if (0 === t.length) return e(null);
        var n = 0,
          i = [];
        function r(a) {
          if ((a && i.push(a), ++n === t.length))
            return e(i.length ? i[0] : null);
        }
        t.forEach(function(e) {
          a.removeCookie(e.domain, e.path, e.key, r);
        });
      });
    }),
    (ui.prototype._cloneSync = ci('clone')),
    (ui.prototype.cloneSync = function(e) {
      if (!e.synchronous)
        throw new Error(
          'CookieJar clone destination store is not synchronous; use async API instead.'
        );
      return this._cloneSync(e);
    }),
    mi.forEach(function(e) {
      ui.prototype[e + 'Sync'] = ci(e);
    });
  var pi,
    li = {
      version: '3.0.1',
      CookieJar: ui,
      Cookie: si,
      Store: Ln,
      MemoryCookieStore: Mn,
      parseDate: Vn,
      formatDate: Gn,
      parse: oi,
      fromJSON: ni,
      domainMatch: Qn,
      defaultPath: ei,
      pathMatch: Nn,
      getPublicSuffix: jn.getPublicSuffix,
      cookieCompare: ii,
      permuteDomain: xn.permuteDomain,
      permutePath: function(e) {
        if ('/' === e) return ['/'];
        e.lastIndexOf('/') === e.length - 1 && (e = e.substr(0, e.length - 1));
        for (var a = [e]; e.length > 1; ) {
          var o = e.lastIndexOf('/');
          if (0 === o) break;
          (e = e.substr(0, o)), a.push(e);
        }
        return a.push('/'), a;
      },
      canonicalDomain: Zn
    },
    hi = (function() {
      function e(a, t, n, i) {
        o(this, e),
          '/' !== a.substr(-1) && (a += '/'),
          (this.url = a),
          (this.debug = t),
          (this.token = ''),
          (this.loggedin = !1),
          (this.namespace = ''),
          (this.namespaces = []),
          (this.timeout = n),
          (this.ignoreinvalidcertificates = i);
      }
      return (
        n(e, [
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
                n = {
                  timeout: a.timeout,
                  maxRedirects: 10,
                  maxContentLength: 5e7
                };
              if (
                (this.ignoreinvalidcertificates &&
                  (n.httpsAgent = new ln.Agent({ rejectUnauthorized: !1 })),
                (this.axios = de.create(n)),
                hn.isNode())
              ) {
                gn(this.axios);
                o = new li.CookieJar();
                (a.cookies = o), a.log('CookieJar is set', o);
              } else {
                if ('' == a.token) {
                  var i = document.cookie.split(';'),
                    r = !0;
                  if (
                    (i.forEach(function(o) {
                      var t = li.parse(o);
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
                  gn(this.axios);
                  o = new li.CookieJar();
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
                    hn.isNode() && void 0 !== o)
                  ) {
                    a.log('Cookiejar', o);
                    var t = a.url;
                    (t = a.url + 'bi'), a.log('cookie url: ' + t);
                    o.getCookies(t, { allPaths: !0 }, function(e, n) {
                      n.forEach(function(e) {
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
                    var n = '';
                    e.response.data.promptInfo.displayObjects.forEach(function(
                      e
                    ) {
                      'CAMNamespaceDisplayName' == e.name &&
                        ((n = e.value), a.log('Default Namespace Name: ' + n));
                    }),
                      n &&
                        a.namespaces.push({
                          isDefault: !0,
                          id: a.namespace,
                          value: n
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
            key: 'setCAF',
            value: function(e) {
              var a = 'caf=' + e + ';',
                o = li.parse(a, { loose: !1 });
              return (
                (o.key = 'caf'),
                (o.value = e),
                (o.maxAge = 'Infinity'),
                (o.path = '/ibmcognos/bi/v1'),
                this.cookies.setCookie(o, this.url, { loose: !1 }, function(
                  e,
                  a
                ) {})
              );
            }
          },
          {
            key: 'get',
            value: function(e) {
              var a = this,
                o = {};
              new li.CookieJar();
              return (
                Ba(this.cookies) || this.cookies,
                a.log('get URL:    ' + a.url + e),
                hn.isNode
                  ? a.token && (o['X-XSRF-TOKEN'] = a.token)
                  : (document.cookie = 'XSRF-TOKEN=' + a.token),
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
                n = JSON.stringify(a),
                i = {};
              return (
                t.log('params: ' + n),
                t.log('token: ' + t.token),
                t.log('cookies: ', t.cookies),
                hn.isNode
                  ? t.token && (i['X-XSRF-TOKEN'] = t.token)
                  : (document.cookie = 'XSRF-TOKEN=' + t.token),
                (i['X-Requested-With'] = 'XMLHttpRequest'),
                (i['Content-Type'] = 'application/json; charset=UTF-8'),
                this.axios
                  .post(t.url + e, n, {
                    headers: i,
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
                n = {},
                i = JSON.stringify(a),
                r = {};
              return (
                hn.isNode
                  ? t.token && (n['X-XSRF-TOKEN'] = t.token)
                  : (document.cookie = 'XSRF-TOKEN=' + t.token),
                (n['X-Requested-With'] = 'XMLHttpRequest'),
                (n['Content-Type'] = 'application/json; charset=UTF-8'),
                t.log('params: ' + i),
                this.axios
                  .delete(t.url + e, {
                    data: i,
                    headers: n,
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
                n = this;
              if (hn.isStandardBrowserEnv())
                return (
                  console.log(
                    'The put function is not implemented for browser environments'
                  ),
                  !1
                );
              var i = {};
              hn.isNode
                ? n.token && (i['X-XSRF-TOKEN'] = n.token)
                : (document.cookie = 'XSRF-TOKEN=' + n.token),
                (i['X-Requested-With'] = 'XMLHttpRequest');
              var r = n.url + e;
              if (o) {
                i['Content-Type'] = 'application/zip';
                require('fs');
                n.log('About to upload extension'),
                  n.log('File: ' + o),
                  n.log('To:', r),
                  (a = require('fs').createReadStream(o)).on(
                    'error',
                    console.log
                  );
              } else
                (i['Content-Type'] = 'application/json; charset=UTF-8'),
                  (a = t);
              var s = { headers: i, jar: n.cookies, withCredentials: !0 };
              return this.axios
                .put(r, a, s)
                .then(function(e) {
                  return n.log('CognosRequest : Success Putting '), e.data;
                })
                .catch(function(e) {
                  var a = '';
                  if (
                    (n.error('CognosRequest : Error in put', e),
                    (a =
                      void 0 !== e.response
                        ? void 0 !== e.response.data.messages
                          ? e.response.data.messages[0].messageString
                          : e.response.data
                          ? e.response.data
                          : e.response.statusText
                        : e.message),
                    n.error(a),
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
              if (hn.isStandardBrowserEnv())
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
              var n = o.url + e;
              o.log('About to upload data file'),
                o.log('File: ' + a),
                o.log('To:', n);
              return (
                require('fs')
                  .createReadStream(a)
                  .on('error', console.log),
                o.axios
                  .put(n, a, {
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
              if (hn.isStandardBrowserEnv())
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
  function gi(e, a) {
    var o = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
      t = arguments.length > 3 ? arguments[3] : void 0,
      n = arguments.length > 4 ? arguments[4] : void 0;
    return (
      o && (pi = void 0),
      void 0 === pi || o
        ? (pi = new hi(e, a, t, n)).initialise()
        : Promise.resolve(pi)
    );
  }
  function di(e, a) {
    for (var o = 0, t = e.length - 1; t >= 0; t--) {
      var n = e[t];
      '.' === n
        ? e.splice(t, 1)
        : '..' === n
        ? (e.splice(t, 1), o++)
        : o && (e.splice(t, 1), o--);
    }
    if (a) for (; o--; o) e.unshift('..');
    return e;
  }
  var fi = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,
    ki = function(e) {
      return fi.exec(e).slice(1);
    };
  function yi() {
    for (var e = '', a = !1, o = arguments.length - 1; o >= -1 && !a; o--) {
      var t = o >= 0 ? arguments[o] : '/';
      if ('string' != typeof t)
        throw new TypeError('Arguments to path.resolve must be strings');
      t && ((e = t + '/' + e), (a = '/' === t.charAt(0)));
    }
    return (
      (a ? '/' : '') +
        (e = di(
          wi(e.split('/'), function(e) {
            return !!e;
          }),
          !a
        ).join('/')) || '.'
    );
  }
  function bi(e) {
    var a = ji(e),
      o = '/' === zi(e, -1);
    return (
      (e = di(
        wi(e.split('/'), function(e) {
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
  function ji(e) {
    return '/' === e.charAt(0);
  }
  var vi = {
    extname: function(e) {
      return ki(e)[3];
    },
    basename: function(e, a) {
      var o = ki(e)[2];
      return (
        a &&
          o.substr(-1 * a.length) === a &&
          (o = o.substr(0, o.length - a.length)),
        o
      );
    },
    dirname: function(e) {
      var a = ki(e),
        o = a[0],
        t = a[1];
      return o || t ? (t && (t = t.substr(0, t.length - 1)), o + t) : '.';
    },
    sep: '/',
    delimiter: ':',
    relative: function(e, a) {
      function o(e) {
        for (var a = 0; a < e.length && '' === e[a]; a++);
        for (var o = e.length - 1; o >= 0 && '' === e[o]; o--);
        return a > o ? [] : e.slice(a, o - a + 1);
      }
      (e = yi(e).substr(1)), (a = yi(a).substr(1));
      for (
        var t = o(e.split('/')),
          n = o(a.split('/')),
          i = Math.min(t.length, n.length),
          r = i,
          s = 0;
        s < i;
        s++
      )
        if (t[s] !== n[s]) {
          r = s;
          break;
        }
      var u = [];
      for (s = r; s < t.length; s++) u.push('..');
      return (u = u.concat(n.slice(r))).join('/');
    },
    join: function() {
      return bi(
        wi(Array.prototype.slice.call(arguments, 0), function(e, a) {
          if ('string' != typeof e)
            throw new TypeError('Arguments to path.join must be strings');
          return e;
        }).join('/')
      );
    },
    isAbsolute: ji,
    normalize: bi,
    resolve: yi
  };
  function wi(e, a) {
    if (e.filter) return e.filter(a);
    for (var o = [], t = 0; t < e.length; t++) a(e[t], t, e) && o.push(e[t]);
    return o;
  }
  var zi =
      'b' === 'ab'.substr(-1)
        ? function(e, a, o) {
            return e.substr(a, o);
          }
        : function(e, a, o) {
            return a < 0 && (a = e.length + a), e.substr(a, o);
          },
    xi = function(e, a) {
      for (var o = [], t = 0; t < e.length; t++) {
        var n = a(e[t], t);
        Ei(n) ? o.push.apply(o, n) : o.push(n);
      }
      return o;
    },
    Ei =
      Array.isArray ||
      function(e) {
        return '[object Array]' === Object.prototype.toString.call(e);
      },
    Ci = Si;
  function Si(e, a, o) {
    e instanceof RegExp && (e = Ai(e, o)),
      a instanceof RegExp && (a = Ai(a, o));
    var t = Ri(e, a, o);
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
  function Ai(e, a) {
    var o = a.match(e);
    return o ? o[0] : null;
  }
  function Ri(e, a, o) {
    var t,
      n,
      i,
      r,
      s,
      u = o.indexOf(e),
      m = o.indexOf(a, u + 1),
      c = u;
    if (u >= 0 && m > 0) {
      for (t = [], i = o.length; c >= 0 && !s; )
        c == u
          ? (t.push(c), (u = o.indexOf(e, c + 1)))
          : 1 == t.length
          ? (s = [t.pop(), m])
          : ((n = t.pop()) < i && ((i = n), (r = m)),
            (m = o.indexOf(a, c + 1))),
          (c = u < m && u >= 0 ? u : m);
      t.length && (s = [i, r]);
    }
    return s;
  }
  Si.range = Ri;
  var _i = function(e) {
      if (!e) return [];
      '{}' === e.substr(0, 2) && (e = '\\{\\}' + e.substr(2));
      return (function e(a, o) {
        var t = [];
        var n = Ci('{', '}', a);
        if (!n || /\$$/.test(n.pre)) return [a];
        var i = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(n.body);
        var r = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(n.body);
        var s = i || r;
        var u = n.body.indexOf(',') >= 0;
        if (!s && !u)
          return n.post.match(/,.*\}/)
            ? ((a = n.pre + '{' + n.body + qi + n.post), e(a))
            : [a];
        var m;
        if (s) m = n.body.split(/\.\./);
        else if (
          1 ===
            (m = (function e(a) {
              if (!a) return [''];
              var o = [];
              var t = Ci('{', '}', a);
              if (!t) return a.split(',');
              var n = t.pre;
              var i = t.body;
              var r = t.post;
              var s = n.split(',');
              s[s.length - 1] += '{' + i + '}';
              var u = e(r);
              r.length && ((s[s.length - 1] += u.shift()), s.push.apply(s, u));
              o.push.apply(o, s);
              return o;
            })(n.body)).length &&
          1 === (m = e(m[0], !1).map(Di)).length
        ) {
          var c = n.post.length ? e(n.post, !1) : [''];
          return c.map(function(e) {
            return n.pre + m[0] + e;
          });
        }
        var p = n.pre;
        var c = n.post.length ? e(n.post, !1) : [''];
        var l;
        if (s) {
          var h = Mi(m[0]),
            g = Mi(m[1]),
            d = Math.max(m[0].length, m[1].length),
            f = 3 == m.length ? Math.abs(Mi(m[2])) : 1,
            k = Ui,
            y = g < h;
          y && ((f *= -1), (k = Bi));
          var b = m.some(Ii);
          l = [];
          for (var j = h; k(j, g); j += f) {
            var v;
            if (r) '\\' === (v = String.fromCharCode(j)) && (v = '');
            else if (((v = String(j)), b)) {
              var w = d - v.length;
              if (w > 0) {
                var z = new Array(w + 1).join('0');
                v = j < 0 ? '-' + z + v.slice(1) : z + v;
              }
            }
            l.push(v);
          }
        } else
          l = xi(m, function(a) {
            return e(a, !1);
          });
        for (var x = 0; x < l.length; x++)
          for (var E = 0; E < c.length; E++) {
            var C = p + l[x] + c[E];
            (!o || s || C) && t.push(C);
          }
        return t;
      })(
        (function(e) {
          return e
            .split('\\\\')
            .join(Ti)
            .split('\\{')
            .join(Oi)
            .split('\\}')
            .join(qi)
            .split('\\,')
            .join(Pi)
            .split('\\.')
            .join(Li);
        })(e),
        !0
      ).map(Ni);
    },
    Ti = '\0SLASH' + Math.random() + '\0',
    Oi = '\0OPEN' + Math.random() + '\0',
    qi = '\0CLOSE' + Math.random() + '\0',
    Pi = '\0COMMA' + Math.random() + '\0',
    Li = '\0PERIOD' + Math.random() + '\0';
  function Mi(e) {
    return parseInt(e, 10) == e ? parseInt(e, 10) : e.charCodeAt(0);
  }
  function Ni(e) {
    return e
      .split(Ti)
      .join('\\')
      .split(Oi)
      .join('{')
      .split(qi)
      .join('}')
      .split(Pi)
      .join(',')
      .split(Li)
      .join('.');
  }
  function Di(e) {
    return '{' + e + '}';
  }
  function Ii(e) {
    return /^-?0\d/.test(e);
  }
  function Ui(e, a) {
    return e <= a;
  }
  function Bi(e, a) {
    return e >= a;
  }
  var Fi = Qi;
  Qi.Minimatch = er;
  var Hi = { sep: '/' };
  try {
    Hi = vi;
  } catch (e) {}
  var Xi = (Qi.GLOBSTAR = er.GLOBSTAR = {}),
    Yi = {
      '!': { open: '(?:(?!(?:', close: '))[^/]*?)' },
      '?': { open: '(?:', close: ')?' },
      '+': { open: '(?:', close: ')+' },
      '*': { open: '(?:', close: ')*' },
      '@': { open: '(?:', close: ')' }
    },
    Wi = '[^/]',
    $i = Wi + '*?',
    Ji = '(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?',
    Ki = '(?:(?!(?:\\/|^)\\.).)*?',
    Vi = '().*{}+?[]^$\\!'.split('').reduce(function(e, a) {
      return (e[a] = !0), e;
    }, {});
  var Gi = /\/+/;
  function Zi(e, a) {
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
  function Qi(e, a, o) {
    if ('string' != typeof a)
      throw new TypeError('glob pattern string required');
    return (
      o || (o = {}),
      !(!o.nocomment && '#' === a.charAt(0)) &&
        ('' === a.trim() ? '' === e : new er(a, o).match(e))
    );
  }
  function er(e, a) {
    if (!(this instanceof er)) return new er(e, a);
    if ('string' != typeof e)
      throw new TypeError('glob pattern string required');
    a || (a = {}),
      (e = e.trim()),
      '/' !== Hi.sep && (e = e.split(Hi.sep).join('/')),
      (this.options = a),
      (this.set = []),
      (this.pattern = e),
      (this.regexp = null),
      (this.negate = !1),
      (this.comment = !1),
      (this.empty = !1),
      this.make();
  }
  function ar(e, a) {
    if (
      (a || (a = this instanceof er ? this.options : {}),
      void 0 === (e = void 0 === e ? this.pattern : e))
    )
      throw new TypeError('undefined pattern');
    return a.nobrace || !e.match(/\{.*\}/) ? [e] : _i(e);
  }
  (Qi.filter = function(e, a) {
    return (
      (a = a || {}),
      function(o, t, n) {
        return Qi(o, e, a);
      }
    );
  }),
    (Qi.defaults = function(e) {
      if (!e || !Object.keys(e).length) return Qi;
      var a = Qi,
        o = function(o, t, n) {
          return a.minimatch(o, t, Zi(e, n));
        };
      return (
        (o.Minimatch = function(o, t) {
          return new a.Minimatch(o, Zi(e, t));
        }),
        o
      );
    }),
    (er.defaults = function(e) {
      return e && Object.keys(e).length ? Qi.defaults(e).Minimatch : er;
    }),
    (er.prototype.debug = function() {}),
    (er.prototype.make = function() {
      if (this._made) return;
      var e = this.pattern,
        a = this.options;
      if (!a.nocomment && '#' === e.charAt(0)) return void (this.comment = !0);
      if (!e) return void (this.empty = !0);
      this.parseNegate();
      var o = (this.globSet = this.braceExpand());
      a.debug && (this.debug = console.error);
      this.debug(this.pattern, o),
        (o = this.globParts = o.map(function(e) {
          return e.split(Gi);
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
    }),
    (er.prototype.parseNegate = function() {
      var e = this.pattern,
        a = !1,
        o = this.options,
        t = 0;
      if (o.nonegate) return;
      for (var n = 0, i = e.length; n < i && '!' === e.charAt(n); n++)
        (a = !a), t++;
      t && (this.pattern = e.substr(t));
      this.negate = a;
    }),
    (Qi.braceExpand = function(e, a) {
      return ar(e, a);
    }),
    (er.prototype.braceExpand = ar),
    (er.prototype.parse = function(e, a) {
      if (e.length > 65536) throw new TypeError('pattern is too long');
      var o = this.options;
      if (!o.noglobstar && '**' === e) return Xi;
      if ('' === e) return '';
      var t,
        n = '',
        i = !!o.nocase,
        r = !1,
        s = [],
        u = [],
        m = !1,
        c = -1,
        p = -1,
        l =
          '.' === e.charAt(0)
            ? ''
            : o.dot
            ? '(?!(?:^|\\/)\\.{1,2}(?:$|\\/))'
            : '(?!\\.)',
        h = this;
      function g() {
        if (t) {
          switch (t) {
            case '*':
              (n += $i), (i = !0);
              break;
            case '?':
              (n += Wi), (i = !0);
              break;
            default:
              n += '\\' + t;
          }
          h.debug('clearStateChar %j %j', t, n), (t = !1);
        }
      }
      for (var d, f = 0, k = e.length; f < k && (d = e.charAt(f)); f++)
        if ((this.debug('%s\t%s %s %j', e, f, n, d), r && Vi[d]))
          (n += '\\' + d), (r = !1);
        else
          switch (d) {
            case '/':
              return !1;
            case '\\':
              g(), (r = !0);
              continue;
            case '?':
            case '*':
            case '+':
            case '@':
            case '!':
              if ((this.debug('%s\t%s %s %j <-- stateChar', e, f, n, d), m)) {
                this.debug('  in class'),
                  '!' === d && f === p + 1 && (d = '^'),
                  (n += d);
                continue;
              }
              h.debug('call clearStateChar %j', t),
                g(),
                (t = d),
                o.noext && g();
              continue;
            case '(':
              if (m) {
                n += '(';
                continue;
              }
              if (!t) {
                n += '\\(';
                continue;
              }
              s.push({
                type: t,
                start: f - 1,
                reStart: n.length,
                open: Yi[t].open,
                close: Yi[t].close
              }),
                (n += '!' === t ? '(?:(?!(?:' : '(?:'),
                this.debug('plType %j %j', t, n),
                (t = !1);
              continue;
            case ')':
              if (m || !s.length) {
                n += '\\)';
                continue;
              }
              g(), (i = !0);
              var y = s.pop();
              (n += y.close), '!' === y.type && u.push(y), (y.reEnd = n.length);
              continue;
            case '|':
              if (m || !s.length || r) {
                (n += '\\|'), (r = !1);
                continue;
              }
              g(), (n += '|');
              continue;
            case '[':
              if ((g(), m)) {
                n += '\\' + d;
                continue;
              }
              (m = !0), (p = f), (c = n.length), (n += d);
              continue;
            case ']':
              if (f === p + 1 || !m) {
                (n += '\\' + d), (r = !1);
                continue;
              }
              if (m) {
                var b = e.substring(p + 1, f);
                try {
                  RegExp('[' + b + ']');
                } catch (e) {
                  var j = this.parse(b, nr);
                  (n = n.substr(0, c) + '\\[' + j[0] + '\\]'),
                    (i = i || j[1]),
                    (m = !1);
                  continue;
                }
              }
              (i = !0), (m = !1), (n += d);
              continue;
            default:
              g(),
                r ? (r = !1) : !Vi[d] || ('^' === d && m) || (n += '\\'),
                (n += d);
          }
      m &&
        ((b = e.substr(p + 1)),
        (j = this.parse(b, nr)),
        (n = n.substr(0, c) + '\\[' + j[0]),
        (i = i || j[1]));
      for (y = s.pop(); y; y = s.pop()) {
        var v = n.slice(y.reStart + y.open.length);
        this.debug('setting tail', n, y),
          (v = v.replace(/((?:\\{2}){0,64})(\\?)\|/g, function(e, a, o) {
            return o || (o = '\\'), a + a + o + '|';
          })),
          this.debug('tail=%j\n   %s', v, v, y, n);
        var w = '*' === y.type ? $i : '?' === y.type ? Wi : '\\' + y.type;
        (i = !0), (n = n.slice(0, y.reStart) + w + '\\(' + v);
      }
      g(), r && (n += '\\\\');
      var z = !1;
      switch (n.charAt(0)) {
        case '.':
        case '[':
        case '(':
          z = !0;
      }
      for (var x = u.length - 1; x > -1; x--) {
        var E = u[x],
          C = n.slice(0, E.reStart),
          S = n.slice(E.reStart, E.reEnd - 8),
          A = n.slice(E.reEnd - 8, E.reEnd),
          R = n.slice(E.reEnd);
        A += R;
        var _ = C.split('(').length - 1,
          T = R;
        for (f = 0; f < _; f++) T = T.replace(/\)[+*?]?/, '');
        var O = '';
        '' === (R = T) && a !== nr && (O = '$'), (n = C + S + R + O + A);
      }
      '' !== n && i && (n = '(?=.)' + n);
      z && (n = l + n);
      if (a === nr) return [n, i];
      if (!i)
        return (function(e) {
          return e.replace(/\\(.)/g, '$1');
        })(e);
      var q = o.nocase ? 'i' : '';
      try {
        var P = new RegExp('^' + n + '$', q);
      } catch (e) {
        return new RegExp('$.');
      }
      return (P._glob = e), (P._src = n), P;
    });
  var or,
    tr,
    nr = {};
  (Qi.makeRe = function(e, a) {
    return new er(e, a || {}).makeRe();
  }),
    (er.prototype.makeRe = function() {
      if (this.regexp || !1 === this.regexp) return this.regexp;
      var e = this.set;
      if (!e.length) return (this.regexp = !1), this.regexp;
      var a = this.options,
        o = a.noglobstar ? $i : a.dot ? Ji : Ki,
        t = a.nocase ? 'i' : '',
        n = e
          .map(function(e) {
            return e
              .map(function(e) {
                return e === Xi
                  ? o
                  : 'string' == typeof e
                  ? (function(e) {
                      return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
                    })(e)
                  : e._src;
              })
              .join('\\/');
          })
          .join('|');
      (n = '^(?:' + n + ')$'), this.negate && (n = '^(?!' + n + ').*$');
      try {
        this.regexp = new RegExp(n, t);
      } catch (e) {
        this.regexp = !1;
      }
      return this.regexp;
    }),
    (Qi.match = function(e, a, o) {
      var t = new er(a, (o = o || {}));
      return (
        (e = e.filter(function(e) {
          return t.match(e);
        })),
        t.options.nonull && !e.length && e.push(a),
        e
      );
    }),
    (er.prototype.match = function(e, a) {
      if ((this.debug('match', e, this.pattern), this.comment)) return !1;
      if (this.empty) return '' === e;
      if ('/' === e && a) return !0;
      var o = this.options;
      '/' !== Hi.sep && (e = e.split(Hi.sep).join('/'));
      (e = e.split(Gi)), this.debug(this.pattern, 'split', e);
      var t,
        n,
        i = this.set;
      for (
        this.debug(this.pattern, 'set', i), n = e.length - 1;
        n >= 0 && !(t = e[n]);
        n--
      );
      for (n = 0; n < i.length; n++) {
        var r = i[n],
          s = e;
        if (
          (o.matchBase && 1 === r.length && (s = [t]), this.matchOne(s, r, a))
        )
          return !!o.flipNegate || !this.negate;
      }
      return !o.flipNegate && this.negate;
    }),
    (er.prototype.matchOne = function(e, a, o) {
      var t = this.options;
      this.debug('matchOne', { this: this, file: e, pattern: a }),
        this.debug('matchOne', e.length, a.length);
      for (
        var n = 0, i = 0, r = e.length, s = a.length;
        n < r && i < s;
        n++, i++
      ) {
        this.debug('matchOne loop');
        var u,
          m = a[i],
          c = e[n];
        if ((this.debug(a, m, c), !1 === m)) return !1;
        if (m === Xi) {
          this.debug('GLOBSTAR', [a, m, c]);
          var p = n,
            l = i + 1;
          if (l === s) {
            for (this.debug('** at the end'); n < r; n++)
              if (
                '.' === e[n] ||
                '..' === e[n] ||
                (!t.dot && '.' === e[n].charAt(0))
              )
                return !1;
            return !0;
          }
          for (; p < r; ) {
            var h = e[p];
            if (
              (this.debug('\nglobstar while', e, p, a, l, h),
              this.matchOne(e.slice(p), a.slice(l), o))
            )
              return this.debug('globstar found match!', p, r, h), !0;
            if ('.' === h || '..' === h || (!t.dot && '.' === h.charAt(0))) {
              this.debug('dot detected!', e, p, a, l);
              break;
            }
            this.debug('globstar swallow a segment, and continue'), p++;
          }
          return !(
            !o || (this.debug('\n>>> no match, partial?', e, p, a, l), p !== r)
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
      if (n === r && i === s) return !0;
      if (n === r) return o;
      if (i === s) return n === r - 1 && '' === e[n];
      throw new Error('wtf?');
    });
  var ir = (function() {
    function e(a, t, n) {
      o(this, e),
        (this.loggedin = !1),
        (this.url = ''),
        (this.debug = a),
        (this.username = ''),
        (this.password = ''),
        (this.timeout = t),
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
      n(e, [
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
            var n = {
              parameters: [
                { name: 'CAMNamespace', value: o },
                { name: 'h_CAM_action', value: 'logonAs' },
                { name: 'CAMUsername', value: e },
                { name: 'CAMPassword', value: a }
              ]
            };
            return (
              (this.loginrequest = t.requester
                .post('bi/v1/login', n)
                .then(function(n) {
                  (t.loggedin = !0),
                    (t.username = e),
                    (t.password = a),
                    (t.namespace = o),
                    (t.loginrequest = !1);
                  var i = Promise.resolve(
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
                    ),
                    s = Promise.resolve(
                      t.requester.get('bi').then(function(e) {
                        var a = e
                          .split('cafContextId":"')
                          .pop()
                          .split('"')[0];
                        return t.requester.setCAF(a);
                      })
                    );
                  return Promise.resolve(Promise.all([i, r, s]));
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
            return void 0 !== a(e.requester)
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
                      (this.resetting = gi(
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
              .put('bi/v1/configuration/keys/global', !1, i({}, e, a))
              .then(function(t) {
                return (
                  (o.productVersion = t['Glass.productVersion']),
                  o.log('saved key ' + e + ' with value ' + a),
                  i({}, e, a)
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
          value: function() {
            var e = this,
              a = '';
            return this.getCognosVersion().then(function(o) {
              return (
                (a = 'bi/v1/objects/.public_folders?fields=permissions'),
                e.requester
                  .get(a)
                  .then(function(e) {
                    return e.data[0].id;
                  })
                  .catch(function(a) {
                    throw (e.error(
                      'There was an error fetching the folder id',
                      a
                    ),
                    a);
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
              n = t.requester
                .get(
                  'bi/v1/objects/' +
                    e +
                    '/items?nav_filter=true&fields=defaultName,defaultScreenTip'
                )
                .then(function(e) {
                  var n = [];
                  return (
                    e.data.forEach(function(e) {
                      if (Fi(e.defaultName, a)) {
                        t.log('folder ', e.defaultName);
                        try {
                          if (o.indexOf(e.type) > -1) {
                            var i = {
                              name: e.defaultName,
                              id: e.id,
                              searchPath: e.searchPath,
                              type: e.type
                            };
                            n.push(i);
                          }
                        } catch (e) {
                          t.error('something fishy', e);
                        }
                      }
                    }),
                    n
                  );
                })
                .catch(function(n) {
                  return (
                    t.error('CognosRequest : Error in listFolderById', n),
                    t
                      .handleError(n)
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
                        throw n;
                      })
                  );
                });
            return n;
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
              n = { force: a, recursive: o };
            return t.requester
              .delete('bi/v1/objects/' + e, n, !0)
              .then(function() {
                return t.log('Deleted folder'), !0;
              })
              .catch(function(n) {
                return (
                  t.error('CognosRequest : Error in deleteFolder', n),
                  t
                    .handleError(n)
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
              n = '',
              i = Object.keys(a);
            i.forEach(function(e) {
              n += '&p_' + e + '=' + a[e];
            });
            var r = t.requester
              .get(
                'bi/v1/disp/rds/reportData/report/' +
                  e +
                  '?fmt=DataSetJSON&rowLimit=' +
                  o +
                  n
              )
              .then(function(e) {
                return t.log('retrieved the data', e), e;
              })
              .catch(function(n) {
                return (
                  t.error('CognosRequest : Error in getReportData', n),
                  t
                    .handleError(n)
                    .then(function() {
                      return (
                        t.log('We have been reset, get Report Data again'),
                        (t.resetting = !1),
                        t.getReportData(e, a, o)
                      );
                    })
                    .catch(function() {
                      throw n;
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
              n = 'bi/v1/plugins/' + o + '/' + a,
              i = this.requester
                .put(n, e, !1)
                .then(function(e) {
                  t.log('New extension id =' + e.id);
                })
                .catch(function(e) {
                  throw (t.error('CognosRequest : Error in uploadExtension', e),
                  e);
                });
            return i;
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
      e
    );
  })();
  (e.getCognos = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
      a = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
      o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 6e4,
      t = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
      n = !1;
    return (
      e && e !== tr && ((or = void 0), (n = !0)),
      void 0 === or && e
        ? gi(e, a, n, o, t)
            .then(function(n) {
              return (
                ((or = new ir(a, o, t)).requester = n),
                (or.url = e),
                (or.defaultNamespace = n.namespace),
                (or.namespaces = n.namespaces),
                or
              );
            })
            .catch(function(e) {
              throw e;
            })
        : Promise.resolve(or)
    );
  }),
    Object.defineProperty(e, '__esModule', { value: !0 });
});
