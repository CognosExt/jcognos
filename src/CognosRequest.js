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
    if (Utils.isNode()) {
      //var axiosCookieJarSupport =  require('axios-cookiejar-support');

      //var tough = require('tough-cookie');
      axiosCookieJarSupport(axios);
      var cookieJar = new tough.CookieJar();
    } else {
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
      }
    }

    var result = axios
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
        me.log('Expected Error in initialise');
        if (cookieJar) {
          // Find the XSRF Token in the cookie
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

        // Find the namespace in the body
        try {
          if (typeof err.response !== 'undefined') {
            err.response.data.promptInfo.displayObjects.forEach(function(item) {
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

  get(path) {
    var me = this;
    me.log('get URL:    ' + me.url + path);

    var result = axios
      .get(me.url + path, {
        headers: {
          //  'X-XSRF-TOKEN': me.token,
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json; charset=UTF-8' //,
          //  Cookie: 'XSRF-TOKEN=' + me.token // this last one is the trick, it is not a cookie!
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

  post(path, params, fullResponse) {
    var me = this;
    var paramsJSON = JSON.stringify(params);
    var result = {};
    // Post the request
    me.log('params: ' + paramsJSON);
    me.log('cookies: ' + me.cookies);
    if (!Utils.isNode) {
      document.cookie = 'XSRF-TOKEN=' + me.token;
    }
    var result = axios
      .post(me.url + path, paramsJSON, {
        //        method: 'post',
        headers: {
          //  'X-XSRF-TOKEN': me.token,
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json; charset=UTF-8' //,
          //  Cookie: 'XSRF-TOKEN=' + me.token // this last one is the trick, it is not a cookie!
        },
        //  jar: false,
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
        if (fullResponse) {
          result = response;
        } else {
          result = response.data;
        }
        return response;
      })
      .catch(function(err) {
        var errormessage = '';
        if (typeof err.response !== 'undefined') {
          errormessage = err.response.data.messages[0].messageString;
        } else {
          errormessage = err.message;
        }

        me.log('CognosRequest : Error in post', err);
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
    var paramsJSON = JSON.stringify(params);
    var result = {};
    // Post the request
    me.log('params: ' + paramsJSON);
    var result = axios
      .delete(me.url + path, {
        data: paramsJSON,
        headers: {
          'X-XSRF-TOKEN': me.token,
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json; charset=UTF-8'
          //  Cookie: 'XSRF-TOKEN=' + me.token // this last one is the trick, it is not a cookie!
        },
        jar: me.cookies,
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
        me.log('CognosRequest : Error in delete', err);
        //me.error(err);
      });
    return result;
  }

  put(path) {
    var me = this;

    var result = axios
      .put(me.url + path, {
        headers: {
          //    'X-XSRF-TOKEN': me.token,
          'X-Requested-With': 'XMLHttpRequest'
          //          Cookie: 'XSRF-TOKEN=' + me.token // this last one is the trick, it is not a cookie!
        },
        jar: me.cookies,
        withCredentials: true
      })
      .then(function(response) {
        me.log('CognosRequest : Success Putting ');
        // Ok, Cognos might return som invalid json.
        // First up, it might return "hallo =\'give me a beer\']"
        // To get things working (I dont need this personally),
        // I will replace =\' with =' and \'] with ']
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

export { getCognosRequest };
