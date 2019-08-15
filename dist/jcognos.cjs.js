/**
 * Copyright (c) 2017, Reinier Battenberg
 * All rights reserved.
 *
 * Source code can be found at:
 * https://github.com/CognosExt/jcognos
 *
 * @license GPL 3.0
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var axios = _interopDefault(require('axios'));
var https = _interopDefault(require('https'));
var axiosCookieJarSupport = _interopDefault(require('axios-cookiejar-support'));
var tough = _interopDefault(require('tough-cookie'));
var util = require('util');
var minimatch = _interopDefault(require('minimatch'));

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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

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

var cRequest;

var CognosRequest = (function() {
  function CognosRequest(url, debug, timeout, ignoreinvalidcertificates) {
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
    this.ignoreinvalidcertificates = ignoreinvalidcertificates;
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
        var axiosparams = {
          timeout: me.timeout,
          maxRedirects: 10,
          maxContentLength: 50 * 1000 * 1000
        };

        if (this.ignoreinvalidcertificates) {
          axiosparams.httpsAgent = new https.Agent({
            rejectUnauthorized: false
          });
        }

        this.axios = axios.create(axiosparams);

        if (Utils.isNode()) {
          axiosCookieJarSupport(this.axios);
          var cookieJar = new tough.CookieJar();
          me.cookies = cookieJar;
          me.log('CookieJar is set', cookieJar);
        } else {
          if (me.token == '') {
            var rawcookies = document.cookie.split(';');
            var goon = true;
            rawcookies.forEach(function(rawcookie) {
              var cookie = tough.parse(rawcookie);

              if (typeof cookie != 'undefined') {
                if (
                  cookie.key == 'X-XSRF-TOKEN' ||
                  cookie.key == 'XSRF-TOKEN'
                ) {
                  if (cookie.value != 'undefined' || cookie.value != '') {
                    me.token = cookie.value;
                  }
                } else {
                  me.log('deleting cookie' + cookie.key);
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
            axiosCookieJarSupport(this.axios);
            var cookieJar = new tough.CookieJar();
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
        me.log('Login function made it until the end');
        return result;
      }
    },
    {
      key: 'setCAF',
      value: function setCAF(CAF) {
        var cookieString = 'caf=' + CAF + ';';
        var cookie = tough.parse(cookieString, {
          loose: false
        });
        cookie.key = 'caf';
        cookie.value = CAF;
        cookie.maxAge = 'Infinity';
        cookie.path = '/ibmcognos/bi/v1';
        return this.cookies.setCookie(
          cookie,
          this.url,
          {
            loose: false
          },
          function(err, mycookie) {}
        );
      }
    },
    {
      key: 'get',
      value: function get(path) {
        var me = this;
        var headers = {};
        var cookieJar = new tough.CookieJar();

        if (!util.isNull(this.cookies)) {
          cookieJar = this.cookies;
        }

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
        return this.axios['delete'](me.url + path, {
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
        var me = this;
        var stream;

        if (Utils.isStandardBrowserEnv()) {
          console.log(
            'The put function is not implemented for browser environments'
          );
          return false;
        }

        var headers = {};

        if (!Utils.isNode) {
          document.cookie = 'XSRF-TOKEN=' + me.token;
        } else if (me.token) {
          headers['X-XSRF-TOKEN'] = me.token;
        }

        headers['X-Requested-With'] = 'XMLHttpRequest';
        var url = me.url + path;

        if (filename) {
          headers['Content-Type'] = 'application/zip';

          var fs = require('fs');

          me.log('About to upload extension');
          me.log('File: ' + filename);
          me.log('To:', url);

          var fs = require('fs');

          stream = fs.createReadStream(filename);
          stream.on('error', console.log);
        } else {
          headers['Content-Type'] = 'application/json; charset=UTF-8';
          stream = data;
        }

        var axiosparams = {
          headers: headers,
          jar: me.cookies,
          withCredentials: true
        };
        return this.axios
          .put(url, stream, axiosparams)
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
  var ignoreinvalidcertificates =
    arguments.length > 4 ? arguments[4] : undefined;

  if (reset) {
    cRequest = undefined;
  }

  var result;

  if (typeof cRequest == 'undefined' || reset) {
    cRequest = new CognosRequest(
      url,
      debug,
      timeout,
      ignoreinvalidcertificates
    );
    result = cRequest.initialise();
  } else {
    result = Promise.resolve(cRequest);
  }

  return result;
}

var jCognos;
var cognosUrl;

var Cognos = (function() {
  function Cognos(debug, timeout, ignoreInvalidCertificates) {
    _classCallCheck(this, Cognos);

    this.loggedin = false;
    this.url = '';
    this.debug = debug;
    this.username = '';
    this.password = '';
    this.timeout = timeout;
    this.productVersion = '';
    this.ignoreInvalidCertificates;
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
          .then(function(response) {
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
            var CAF = Promise.resolve(
              me.requester.get('bi').then(function(html) {
                var last = html.split('cafContextId":"').pop();
                var CAF = last.split('"')[0];
                return me.requester.setCAF(CAF);
              })
            );
            return Promise.resolve(
              Promise.all([capabilities, preferences, CAF])
            );
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
          return me.requester['delete']('bi/v1/login')
            .then(function(body) {
              me.loggedin = false;
              return body;
            })
            ['catch'](function(err) {
              me.log('Cognos: Error when logging off.', err);
            });
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
          this.timeout,
          this.ignoreInvalidCertificates
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
      key: 'setConfig',
      value: function setConfig(inkey, value) {
        var me = this;
        var url = 'bi/v1/configuration/keys/' + inkey;
        var url = 'bi/v1/configuration/keys/global';
        return me.requester
          .put(url, false, _defineProperty({}, inkey, value))
          .then(function(version) {
            me.productVersion = version['Glass.productVersion'];
            me.log('saved key ' + inkey + ' with value ' + value);

            var returnvalue = _defineProperty({}, inkey, value);

            return returnvalue;
          })
          ['catch'](function(err) {
            me.error('Error while setting key ' + inkey, err);
            throw err;
          });
      }
    },
    {
      key: 'getConfig',
      value: function getConfig() {
        var me = this;
        var url = 'bi/v1/configuration/keys';
        return me.requester
          .get(url)
          .then(function(keys) {
            return keys;
          })
          ['catch'](function(err) {
            me.error('Error while fetching Cognos configuration keys.', err);
            throw err;
          });
      }
    },
    {
      key: 'getConfigKey',
      value: function getConfigKey(key) {
        var me = this;
        return me
          .getConfig()
          .then(function(keys) {
            return keys.global[key];
          })
          ['catch'](function(err) {
            me.error('Error while fetching Cognos configuration keys.', err);
            throw err;
          });
      }
    },
    {
      key: '_getPublicFolderId',
      value: function _getPublicFolderId() {
        var me = this;
        var url = '';
        return this.getCognosVersion().then(function(version) {
          url = 'bi/v1/objects/.public_folders?fields=permissions';
          return me.requester
            .get(url)
            .then(function(folders) {
              var id;
              id = folders.data[0].id;
              return id;
            })
            ['catch'](function(err) {
              me.error('There was an error fetching the folder id', err);
              throw err;
            });
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
            return me._getPublicFolderId().then(function(id) {
              me.log('Got the Public Folders');

              if (typeof id !== 'undefined') {
                rootfolders.push({
                  id: id,
                  name: 'Team Content'
                });
              }

              return rootfolders;
            });
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
              if (minimatch(folder.defaultName, pattern)) {
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
        return me.requester
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
        return me.requester['delete']('bi/v1/objects/' + id, params, true)
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
        var me = this;
        var path = 'bi/v1/plugins/' + type + '/' + name;
        var result = this.requester
          .put(path, filename, false)
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
                  me.error('CognosRequest : Error in uploadDataFile Part', err);
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
  var ignoreInvalidCertificates =
    arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var reset = false;

  if (url && url !== cognosUrl) {
    jCognos = undefined;
    reset = true;
  }

  if (typeof jCognos == 'undefined' && url) {
    var myRequest = getCognosRequest(
      url,
      debug,
      reset,
      timeout,
      ignoreInvalidCertificates
    )
      .then(function(cRequest) {
        jCognos = new Cognos(debug, timeout, ignoreInvalidCertificates);
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
