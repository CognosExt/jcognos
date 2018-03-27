/**
 * Copyright (c) 2017, Reinier Battenberg
 * All rights reserved.
 *
 * Source code can be found at:
 * https://github.com/CognosExt/jcognos
 *
 * @license GPL 3.0
 */

import axios from 'axios';
import axiosCookieJarSupport from 'axios-cookiejar-support';
import tough from 'tough-cookie';
import minimatch from 'minimatch';

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
        this.axios = axios.create({});
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
          .then(function(body) {
            me.log('Unexpected success');
            return me;
          })
          .catch(function(err) {
            if (err.response.status !== 441) {
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
                    me.log('Namespace: ' + me.namespace);
                  }
                });
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
          })
          .catch(function(err) {
            var errormessage = '';
            me.error('CognosRequest : Error in get', err);

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
      value: function put(path) {
        var me = this;
        var headers = {};
        if (!Utils.isNode) {
          document.cookie = 'XSRF-TOKEN=' + me.token;
        } else if (me.token) {
          headers['X-XSRF-TOKEN'] = me.token;
        }

        headers['X-Requested-With'] = 'XMLHttpRequest';
        headers['Content-Type'] = 'application/json; charset=UTF-8';

        var result = this.axios
          .put(me.url + path, {
            headers: headers,
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
            var errormessage = '';
            me.error('CognosRequest : Error in put', err);

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
  if (typeof cRequest == 'undefined') {
    cRequest = new CognosRequest(url, debug);
    result = cRequest.initialise();
  } else {
    result = Promise.resolve(cRequest);
  }
  return result;
}

var jCognos;

var cognosUrl;

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
            throw err;
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
            console.error(err);
            throw 'Error in listRootFolder: ' + err;
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
            me.log('Cognos: Error creating folder.', err);
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
      key: 'getReportData',
      value: function getReportData(id) {
        var me = this;

        var result = me.requester
          .get(
            'bi/v1/disp/rds/reportData/report/' +
              id +
              '?fmt=DataSetJSON&rowLimit=100'
          )
          .then(function(data) {
            me.log('retrieved the data', data);
            return data;
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

  var reset = false;
  if (url !== cognosUrl) {
    jCognos = undefined;
    reset = true;
  }
  if (typeof jCognos == 'undefined') {
    var myRequest = getCognosRequest(url, debug, reset).then(function(
      cRequest
    ) {
      jCognos = new Cognos(debug);
      jCognos.requester = cRequest;
      return jCognos;
    });
    return myRequest;
  } else {
    return Promise.resolve(jCognos);
  }
}

export { getCognos };
