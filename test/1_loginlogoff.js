if (typeof window == 'undefined') {
  var chai = require('chai');
  var settings = require('./Settings.json');
  var uuidv4 = require('uuid/v4');

  var jcognos = require('../dist/jcognos.esm');
  var url = settings.url;
  var debug = settings.debug;
  var user = settings.user;
  var password = settings.password;
}

var getCognos = jcognos.getCognos;

var assert = chai.assert;

var cognos;
describe('Logon Logoff', function() {
  beforeEach(function() {});
  afterEach(function() {
    // Somehow in WebRunner (wdio) cognos is not set on time to logout.
    if (typeof cognos !== 'undefined') {
      return cognos.logoff().then(function(folder) {
        assert.equal(cognos.loggedin, false, 'Logged off');
      });
    }
  });
  it('Should be able to login', done => {
    getCognos(url, debug)
      .then(function(lcognos) {
        cognos = lcognos;
        assert.isOk(lcognos, 'Succesfully created Cognos');
        if (!cognos.loggedin) {
          return lcognos.login(user, password);
        }
      })
      .then(function(mycognos) {
        assert.isOk(true, 'Succesfully logged in');
      })
      .catch(function(err) {
        console.log('Error is', err);
        assert.equal(
          err,
          'Network Error. ' //note the space!
        );
        //        assert.fail(true, true, 'Can not login');
      })
      .then(done, done);
  }),
    it('Should have useful error messages when login fails', done => {
      getCognos(url, debug).then(function(lcognos) {
        cognos = lcognos;
        assert.isOk(lcognos, 'Succesfully created Cognos');

        if (!cognos.loggedin) {
          lcognos
            .login('SOMEONE', 'WRONGPASSWORD')
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
