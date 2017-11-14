var request = require('request-promise');

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
    request.debug = debug;
    request.defaults({
      jar: true
    });
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

  initialise() {
    var me = this;
    var j = request.jar();

    var result = request
      .get({
        url: me.url + 'bi/v1/login',
        jar: j
      })
      .then(function(body) {
        me.log('Unexpected success');
        // This will never happen, the first call to Cognos will always return a 401
      })
      .catch(function(err) {
        me.log('Expected Error in initialise');

        // Find the XSRF Token in the cookie
        var cookies = j.getCookies(me.url + 'bi');
        cookies.forEach(function(cook) {
          if ((cook.key = 'XSRFToken')) {
            me.token = cook.value;
            request.cookie('XSRF-TOKEN=' + me.token);
            request.cookie('X-XSRF-TOKEN=' + me.token);
          }
        });

        // Find the namespace in the body
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

  get(path) {
    var me = this;
    me.log('get URL:    ' + me.url + path);
    var result = request
      .get({
        url: me.url + path,
        headers: {
          'X-XSRF-TOKEN': me.token,
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json; charset=UTF-8',
          Cookie: 'XSRF-TOKEN=' + me.token // this last one is the trick, it is not a cookie!
        },
        jar: me.cookies
      })
      .then(function(response) {
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
    var result = request
      .post({
        url: me.url + path,
        body: paramsJSON,
        headers: {
          'X-XSRF-TOKEN': me.token,
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json; charset=UTF-8',
          Cookie: 'XSRF-TOKEN=' + me.token // this last one is the trick, it is not a cookie!
        },
        jar: me.cookies,
        resolveWithFullResponse: fullResponse
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
        //me.error(err);
      });
    return result;
  }

  delete(path, params, fullResponse) {
    var me = this;
    var paramsJSON = JSON.stringify(params);
    var result = {};
    // Post the request
    me.log('params: ' + paramsJSON);
    var result = request
      .delete({
        url: me.url + path,
        body: paramsJSON,
        headers: {
          'X-XSRF-TOKEN': me.token,
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json; charset=UTF-8',
          Cookie: 'XSRF-TOKEN=' + me.token // this last one is the trick, it is not a cookie!
        },
        jar: me.cookies,
        resolveWithFullResponse: fullResponse
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
            me.log('No valid JSON returned from post request. ' + path);
            result = response;
          }
        }
        return result;
      })
      .catch(function(err) {
        me.log('CognosRequest : Error in post', err);
        //me.error(err);
      });
    return result;
  }

  put(path) {
    var me = this;

    var result = request
      .put({
        url: me.url + path,
        headers: {
          'X-XSRF-TOKEN': me.token,
          'X-Requested-With': 'XMLHttpRequest',
          Cookie: 'XSRF-TOKEN=' + me.token // this last one is the trick, it is not a cookie!
        },
        jar: me.cookies
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
