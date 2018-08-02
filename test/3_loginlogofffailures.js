if (typeof window == 'undefined') {
  var chai = require('chai');
  var settings = require('./Settings.json');
  var uuidv4 = require('uuid/v4');

  var jcognos = require('../dist/jcognos.esm');
  var url = settings.url;
  var debug = settings.debug;
  var user = settings.user;
  var password = settings.password;
  var namespace = settings.namespace;
}

var getCognos = jcognos.getCognos;

var assert = chai.assert;

var cognos;

describe('Logon Logoff with errors', function() {
  it('Should throw an error if page does not exist', done => {
    getCognos(url + 'pagedoesnotexist', debug)
      .then(function(lcognos) {
        assert.fail('Error 404', 'No Error was thrown');
      })
      .catch(function(err) {
        assert.equal(
          err,
          'Request failed with status code 404' //note the space!
        );
      })
      .then(done, done);
  }),
    it('Should have useful error messages when login fails', done => {
      getCognos(url, debug).then(function(lcognos) {
        cognos = lcognos;
        assert.isOk(lcognos, 'Succesfully created Cognos');

        if (!cognos.loggedin) {
          lcognos
            .login('SOMEONE', 'WRONGPASSWORD', namespace)
            .then(function(someresult) {
              //dummy code
            })
            .catch(function(err) {
              assert.equal(
                err,
                'The provided credentials are invalid. Please type your credentials for authentication. ' //note the space!
              );
            })
            .then(done, done);
        }
      });
    });
});
