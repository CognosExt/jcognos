if (typeof window === 'undefined' && typeof document === 'undefined') {
  var chai = require('chai');
  var settings = require('./Settings.json');
  var { v4: uuidv4 } = require('uuid');

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
describe('jcognos Reset Tests', function () {
  beforeEach(function () {
    return getCognos(url, debug)
      .then(function (lcognos) {
        assert.isOk(lcognos, 'Succesfully created Cognos');
        cognos = lcognos;
        if (!cognos.loggedin) {
          return lcognos.login(user, password, namespace);
        }
      })
      .then(function (mycognos) {
        assert.isOk(true, 'Succesfully logged in');
      })
      .catch(function (err) {
        assert.fail(true, true, 'Can not login');
      });
  });
  afterEach(function () {
    try {
      return cognos.logoff().then(function (folder) {
        assert.equal(cognos.loggedin, false, 'Logged off');
      });
    } catch (err) {
      console.error('There was an error logging off. ', err);
    }
  });
  it('Should be able to fetch root folders', function () {
    return cognos
      .reset()
      .then(function () {
        return cognos.listRootFolder();
      })
      .then(function (folders) {
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
        return Promise.resolve();
      })
      .catch(function (err) {
        console.log('There was an error fetching the root folder', err);
      });
  }),
    it('Should be able to create folders and delete them', function () {
      return cognos
        .reset()
        .then(function () {
          return cognos.listRootFolder();
        })
        .then(function (folders) {
          var foldername = uuidv4();
          return cognos
            .addFolder(folders[0].id, foldername)
            .then(function (folder) {
              assert.equal(foldername, folder.name, 'New Folder Exists');
              return;
              cognos
                .deleteFolder(folder.id)
                .then(function (folder) {
                  assert.equal(folder, true, 'New Folder Deleted');
                  return Promise.resolve();
                })
                .catch(function (err) {
                  console.log('Error deleting folder: ', err);
                  assert.fail(true, true, 'Error Deleting the folder: ' + err);
                });
            });
        })

        .catch(function (err) {
          console.log('There was an error listing the root folder', err);
          assert.fail(true, true, 'Error listing root folder' + err);
        });
    }),
    it('getCognos should return same object', function () {
      var newCognos = jcognos.getCognos().then(function (freshCognos) {
        assert.equal(cognos, freshCognos, 'Two Cognosses are the same.');
        return cognos
          .reset()
          .then(function () {
            jcognos.getCognos().then(function (newerCognos) {
              assert.notEqual(
                cognos,
                newCognos,
                'After reset, Two Cognosses are not the same.'
              );
              return Promise.resolve();
            });
          })
          .catch(function (err) {
            console.log(
              'There was an error comparing cognos objects after reset',
              err
            );
          });
      });
      return newCognos;
    });
});
