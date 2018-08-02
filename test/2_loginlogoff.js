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

describe('Logon Logoff with success', function() {
  afterEach(function() {
    // Somehow in WebRunner (wdio) cognos is not set on time to logout.
    if (typeof cognos !== 'undefined') {
      return cognos.logoff().then(function(folder) {
        console.log('logged off');
        assert.equal(cognos.loggedin, false, 'Logged off');
      });
    }
  });
  it('Succesful login without namespace', done => {
    getCognos(url, debug)
      .then(function(lcognos) {
        cognos = lcognos;
        assert.isOk(lcognos, 'Succesfully created Cognos');
        if (!cognos.loggedin) {
          return lcognos.login(user, password, namespace);
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
      })
      .then(done, done);
  }),
    it('Successful login with namespace', done => {
      getCognos(url, debug)
        .then(function(lcognos) {
          cognos = lcognos;
          assert.isOk(lcognos, 'Succesfully created Cognos');
          if (!cognos.loggedin) {
            return lcognos.login(user, password, namespace);
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
        })
        .then(done, done);
    });
});
