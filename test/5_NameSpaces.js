if (typeof window == 'undefined') {
  var chai = require('chai');
  var settings = require('./Settings.json');
  var uuidv4 = require('uuid/v4');

  var jcognos = require('../dist/jcognos.esm');
  var url = settings.url;
  var debug = settings.debug;
  var namespace = settings.namespace;
}

var getCognos = jcognos.getCognos;
var assert = chai.assert;

var cognos;
describe('jcognos NameSpaces Tests', function() {
  beforeEach(function() {
    this.timeout(0);
    var result = getCognos(url, debug).then(function(lcognos) {
      assert.isOk(lcognos, 'Succesfully created Cognos');
      cognos = lcognos;
    });
    return result;
  });
  it('Check if default namespace is in namespaces', done => {
    var passed = false;
    cognos.namespaces.forEach(function(item) {
      var lpassed = cognos.defaultNamespace == item.id && item.isDefault;
      passed = passed | lpassed;
    });
    if (passed) {
      assert(passed == true, 'Default namespace exists');
    } else {
      assert.fail(true, true, 'Default namespace is not listed.');
    }
    done();
  });
});
