'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var asyncGenerator = (function() {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function(resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(
            function(arg) {
              resume('next', arg);
            },
            function(arg) {
              resume('throw', arg);
            }
          );
        } else {
          settle(result.done ? 'return' : 'normal', result.value);
        }
      } catch (err) {
        settle('throw', err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case 'return':
          front.resolve({
            value: value,
            done: true
          });
          break;

        case 'throw':
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== 'function') {
      this.return = undefined;
    }
  }

  if (typeof Symbol === 'function' && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function() {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function(arg) {
    return this._invoke('next', arg);
  };

  AsyncGenerator.prototype.throw = function(arg) {
    return this._invoke('throw', arg);
  };

  AsyncGenerator.prototype.return = function(arg) {
    return this._invoke('return', arg);
  };

  return {
    wrap: function(fn) {
      return function() {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function(value) {
      return new AwaitValue(value);
    }
  };
})();

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

var request = require('request-promise');

var cRequest;

var CognosRequest = (function() {
  function CognosRequest(url, debug) {
    classCallCheck(this, CognosRequest);

    if (url.substr(-1) !== '/') {
      url = url + '/';
    }
    this.url = url;
    this.debug = debug;
    request.debug = debug;
    request.defaults({
      jar: true
    });
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
        var me = this;
        var j = request.jar();

        var result = request
          .get({
            url: me.url + 'bi/v1/login',
            jar: j
          })
          .then(function(body) {
            me.log('Unexpected success');
          })
          .catch(function(err) {
            me.log('Expected Error in initialise');

            var cookies = j.getCookies(me.url + 'bi');
            cookies.forEach(function(cook) {
              if ((cook.key = 'XSRFToken')) {
                me.token = cook.value;
                request.cookie('XSRF-TOKEN=' + me.token);
                request.cookie('X-XSRF-TOKEN=' + me.token);
              }
            });

            JSON.parse(
              err.response.body
            ).promptInfo.displayObjects.forEach(function(item) {
              if (item.name == 'CAMNamespace') {
                me.namespace = item.value;
              }
            });

            request.cookie('XSRF-TOKEN=' + me.token);
            me.cookies = request.jar();

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
        var result = request
          .get({
            url: me.url + path,
            headers: {
              'X-XSRF-TOKEN': me.token,
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json; charset=UTF-8',
              Cookie: 'XSRF-TOKEN=' + me.token
            },
            jar: me.cookies
          })
          .then(function(response) {
            response = response.replace(/=\\'/g, "='");
            response = response.replace(/\\']/g, "']");

            var result = JSON.parse(response);
            return result;
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
        var result = request
          .post({
            url: me.url + path,
            body: paramsJSON,
            headers: {
              'X-XSRF-TOKEN': me.token,
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json; charset=UTF-8',
              Cookie: 'XSRF-TOKEN=' + me.token
            },
            jar: me.cookies,
            resolveWithFullResponse: fullResponse
          })
          .then(function(response) {
            me.log('CognosRequest : Success Posting');

            if (fullResponse) {
              result = response;
            } else {
              try {
                result = response.replace(/=\\'/g, "='");
                result = result.replace(/\\']/g, "']");
                result = JSON.parse(result);
              } catch (err) {
                me.log('No valid JSON returned from post request. ' + path);
                result = response;
              }
            }
            return result;
          })
          .catch(function(err) {
            me.log('CognosRequest : Error in post', err);
          });
        return result;
      }
    },
    {
      key: 'delete',
      value: function _delete(path, params, fullResponse) {
        var me = this;
        var paramsJSON = JSON.stringify(params);
        var result = {};

        me.log('params: ' + paramsJSON);
        var result = request
          .delete({
            url: me.url + path,
            body: paramsJSON,
            headers: {
              'X-XSRF-TOKEN': me.token,
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json; charset=UTF-8',
              Cookie: 'XSRF-TOKEN=' + me.token
            },
            jar: me.cookies,
            resolveWithFullResponse: fullResponse
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
                me.log('No valid JSON returned from post request. ' + path);
                result = response;
              }
            }
            return result;
          })
          .catch(function(err) {
            me.log('CognosRequest : Error in post', err);
          });
        return result;
      }
    },
    {
      key: 'put',
      value: function put(path) {
        var me = this;

        var result = request
          .put({
            url: me.url + path,
            headers: {
              'X-XSRF-TOKEN': me.token,
              'X-Requested-With': 'XMLHttpRequest',
              Cookie: 'XSRF-TOKEN=' + me.token
            },
            jar: me.cookies
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

var minimatch = require('minimatch');

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
              value: 'LogonAs'
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
            return body;
          })
          .catch(function(err) {
            me.log('Cognos: Error when logging in.');
            me.log(err);
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
            rootfolders.push({
              id: folders.data[0].id,
              name: 'My Content'
            });
          })
          .then(function() {
            return me.requester
              .get('bi/v1/objects/.public_folders?fields=permissions')
              .then(function(folders) {
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
              if (minimatch(folder.defaultName, pattern)) {
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
            var id = response.headers.location.split('/').pop();
            return {
              name: name,
              id: id
            };
          })
          .catch(function(err) {
            me.log('Cognos: Error creating folder.');
            me.log(err);
          });
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
        var me = this;
        var fs = require('fs');
        path =
          '/var/www/gologic/Cognos11/Buttons/InsightsAllwaysButton/dist/extension.zip';
        var result = fs
          .createReadStream(path)
          .pipe(me.requester.put('bi/v1/plugins/extensions/' + name));
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
