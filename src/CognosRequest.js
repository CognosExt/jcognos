import axios from 'axios';
import { Utils } from './Utils';
import axiosCookieJarSupport from 'axios-cookiejar-support';

// I dont think we should need this by now
import tough from 'tough-cookie';

/**
 * Local Variable that holds the single CognosRequest instance
 */
var cRequest;

class CognosRequest {
  constructor(url, debug) {
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

  log(text, object) {
    if (this.debug) {
      if (object) {
        console.log(text, object);
      } else {
        console.log(text);
      }
    }
  }

  error(text, object) {
    if (this.debug) {
      if (object) {
        console.error(text, object);
      } else {
        console.error(text);
      }
    }
  }

  initialise(loggedout = false) {
    var me = this;
    var cookieJar = false;
    var firstheaders = {};
    this.axios = axios.create({
      timeout: 60000,

      //follow up to 10 HTTP 3xx redirects
      maxRedirects: 10,

      //cap the maximum content length we'll accept to 50MBs, just in case
      maxContentLength: 50 * 1000 * 1000
    });
    if (Utils.isNode()) {
      axiosCookieJarSupport(this.axios);
      var cookieJar = new tough.CookieJar();
      me.cookies = cookieJar;

      me.log('CookieJar is set', cookieJar);
    } else {
      // This is the scenario when this lib is loaded from the cognos path ibmcognos/bi
      // it is not working yet.
      if (me.token == '') {
        var rawcookies = document.cookie.split(';');
        var goon = true;
        rawcookies.forEach(function(rawcookie) {
          var cookie = tough.parse(rawcookie);
          if (typeof cookie != 'undefined') {
            if (cookie.key == 'X-XSRF-TOKEN' || cookie.key == 'XSRF-TOKEN') {
              if (cookie.value != 'undefined' || cookie.value != '') {
                me.token = cookie.value;
              }
            } else {
              me.log('deleting cookie' + cookie.key);
              //  document.cookie = cookie.key +
              //    "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
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
        //TODO CookieJar is not set. Fix that.
        jar: cookieJar,
        withCredentials: false, // If true, send cookie stored in jar
        headers: firstheaders
      })
      .then(function(body) {
        me.log('Unexpected success');
        return me;
        // This will never happen, the first call to Cognos will always return a 401
      })
      .catch(function(err) {
        // If there is another error, like a 500 or 404 (wrong URL)
        // Also, if there is a network error there is no response
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
          // Find the XSRF Token in the cookie
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

        // Find the namespace in the body
        try {
          if (typeof err.response !== 'undefined') {
            // This is the scenario where there is only 1 namespace
            err.response.data.promptInfo.displayObjects.forEach(function(item) {
              if (item.name == 'CAMNamespace') {
                me.namespace = item.value;
                me.log('Default Namespace: ' + me.namespace);
              }
            });
            var displayName = '';
            err.response.data.promptInfo.displayObjects.forEach(function(item) {
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

  get(path) {
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
    //      .catch(function(err) {
    //      });

    return result;
  }

  post(path, params, fullResponse) {
    var me = this;
    var paramsJSON = JSON.stringify(params);
    var result = {};
    var headers = {};
    // Post the request
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
        //resolveWithFullResponse: fullResponse,
        withCredentials: true
      })
      .then(function(response) {
        me.log('CognosRequest : Success Posting');
        // Ok, Cognos might return som invalid json.
        // First up, it might return "hallo =\'give me a beer\']"
        // To get things working (I dont need this personally),
        // I will replace =\' with =' and \'] with ']
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
        // We have 3 different ways to return an error.
        if (typeof err.response !== 'undefined') {
          if (typeof err.response.data.messages !== 'undefined') {
            errormessage = err.response.data.messages[0].messageString; // This is a real Cognos error
          } else {
            errormessage = err.response.data; // It will probably be 'Forbidden'
          }
        } else {
          errormessage = err.message; // This is axios saying 'Network Error'
        }

        me.error(err);
        /*
         *  This happens when you didnt logout properly. It seems harmless.
         */
        if (errormessage != 'AAA-AUT-0011 Invalid namespace was selected.') {
          throw errormessage;
        }
      });
    return result;
  }

  delete(path, params = {}, fullResponse = false) {
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
        jar: me.cookies, // Delete does not accept the jar parameter it seems
        withCredentials: true
      })
      .then(function(response) {
        me.log('CognosRequest : Success Deleting');
        // Ok, Cognos might return som invalid json.
        // First up, it might return "hallo =\'give me a beer\']"
        // To get things working (I dont need this personally),
        // I will replace =\' with =' and \'] with ']
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
        // We have 3 different ways to return an error.
        if (typeof err.response !== 'undefined') {
          if (typeof err.response.data.messages !== 'undefined') {
            errormessage = err.response.data.messages[0].messageString; // This is a real Cognos error
          } else {
            errormessage = err.response.data; // It will probably be 'Forbidden'
          }
        } else {
          errormessage = err.message; // This is axios saying 'Network Error'
        }

        me.error(err);
        /*
         *  This happens when you didnt logout properly. It seems harmless.
         */
        if (errormessage != 'AAA-AUT-0011 Invalid namespace was selected.') {
          throw errormessage;
        }
      });
    return result;
  }

  put(path, filename) {
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
      // This is a very tricky extra bonus that you only have to add when using PUT
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
    //try {
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
        // We have 3 different ways to return an error.
        if (typeof err.response !== 'undefined') {
          if (typeof err.response.data.messages !== 'undefined') {
            errormessage = err.response.data.messages[0].messageString; // This is a real Cognos error
          } else {
            errormessage = err.response.data
              ? err.response.data
              : err.response.statusText; // It will probably be 'Forbidden'
          }
        } else {
          errormessage = err.message; // This is axios saying 'Network Error'
        }
        me.error(errormessage);
        /*
         *  This happens when you didnt logout properly. It seems harmless.
         */
        if (errormessage != 'AAA-AUT-0011 Invalid namespace was selected.') {
          throw errormessage;
        }
      });

    return result;
  }
}

function getCognosRequest(url, debug, reset = false) {
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

export { getCognosRequest };
