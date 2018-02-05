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

//var getCognos;
var cognos;
describe('Cognos Object', function() {
  beforeEach(function() {
    var result = getCognos(url, debug)
      .then(function(lcognos) {
        assert.isOk(lcognos, 'Succesfully created Cognos');
        cognos = lcognos;
        if (!cognos.loggedin) {
          return lcognos.login(user, password);
        }
      })
      .then(function(mycognos) {
        assert.isOk(true, 'Succesfully logged in');
      })
      .catch(function(err) {
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
        assert.equal('My Content', folders[0].name, 'My Content exists');
        assert.equal('Team Content', folders[1].name, 'Team Content exists');
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
            .then(done, done);
        });
      });
    });
  it('Should give meaningful errors when logging in');
  /*,
        it('Should be able to fetch the public folders', (done) => {
          getCognos(url)
            .then(function (cognos) {
              assert.isOk(cognos, 'Succesfully created Cognos');
              cognos.login('tester', 'tester')
                .then(function () {
                  assert.isOk(cognos, 'Succesfully logged in');
                  cognos.listPublicFolders()
                    .then(function (folders) {
                      assert.isOk(folders, 'There are public folders');
                    })
                    .then(done, done);
                })
                .catch(function (err) {
                  assert.fail(err, 'none', 'login failed');
                });
            });
        })*/
});
