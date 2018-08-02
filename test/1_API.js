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
describe('jcognos API Tests', function() {
  beforeEach(function() {
    this.timeout(0);
    var result = getCognos(url, debug)
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
        console.log('here', err);
        assert.fail(true, true, 'Can not login');
      });
    return result;
  });
  afterEach(function() {
    return cognos.logoff().then(function(folder) {
      assert.equal(cognos.loggedin, false, 'Logged off');
    });
  });
  it('Should be able to fetch root folders', done => {
    cognos
      .listRootFolder()
      .then(function(folders) {
        if (folders.length > 0) {
          assert.equal('My Content', folders[0].name, 'My Content exists');
          if (folders.length > 1) {
            assert.equal(
              'Team Content',
              folders[1].name,
              'Team Content exists'
            );
          }
        } else {
          assert.fail(true, true, 'Folders are empty. Are you logged in?');
        }
      })
      .then(done, done);
  }),
    it('Should be able to create folders and delete them', done => {
      cognos.listRootFolder().then(function(folders) {
        var foldername = uuidv4();
        cognos.addFolder(folders[0].id, foldername).then(function(folder) {
          assert.equal(foldername, folder.name, 'New Folder Exists');
          cognos
            .deleteFolder(folder.id)
            .then(function(folder) {
              assert.equal(folder, true, 'New Folder Deleted');
            })
            .catch(function(err) {
              console.log(err);
              assert.fail(true, true, err);
            })
            .then(done, done);
        });
      });
    });
});
