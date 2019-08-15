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
describe('jcognos Configuration Keys Tests', function() {
  beforeEach(function() {
    return getCognos(url, debug)
      .then(function(lcognos) {
        assert.isOk(lcognos, 'Succesfully created Cognos');
        cognos = lcognos;
        if (!cognos.loggedin) {
          return lcognos.login(user, password, namespace);
        }
      })
      .then(function(mycognos) {
        assert.isOk(true, 'Succesfully logged in');
      })
      .catch(function(err) {
        console.log(err);
        assert.fail(true, true, 'Can not login');
      });
  });
  afterEach(function() {
    try {
      return cognos.setConfig('Test.Key', '').then(function() {
        return cognos.logoff().then(function(folder) {
          assert.equal(cognos.loggedin, false, 'Logged off');
        });
      });
    } catch (err) {
      console.error('There was an error logging off. ', err);
    }
  });
  it('Should be able to set key', function() {
    return cognos.setConfig('Test.Key', 'I am testing').then(function(keys) {
      var returnvalue = { 'Test.Key': 'I am testing' };
      assert.deepEqual(keys, returnvalue, 'Saved Key equals result');
    });
  }),
    it('Should be able to fetch stored key', function() {
      cognos.getConfigKey('Test.Key').then(function(keys) {
        assert.deepEqual(
          'Test.Key',
          'I am testing',
          'Testkey was set correctly'
        );
      });
    });
});
