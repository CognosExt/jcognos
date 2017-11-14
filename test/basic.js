import { assert } from 'chai';

import { getCognos } from '../src/Cognos';

import { url } from './Settings.json';

import { debug } from './Settings.json';

const uuid = require('uuid/v4');
var cognos;
describe('Cognos Object', function() {
  beforeEach(function() {
    var result = getCognos(url, debug)
      .then(function(lcognos) {
        assert.isOk(lcognos, 'Succesfully created Cognos');
        cognos = lcognos;
        if (!cognos.loggedin) {
          return lcognos.login('tester', 'tester');
        }
      })
      .then(function(mycognos) {
        assert.isOk(true, 'Succesfully logged in');
      });
    return result;
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
        var foldername = uuid();
        cognos
          .addFolder(folders[0].id, foldername)
          .then(function(folder) {
            assert.equal(foldername, folder.name, 'New Folder Exists');
            cognos.deleteFolder(folder.id).then(function(folder) {
              assert.equal(folder, true, 'New Folder Deleted');
            });
          })
          .then(done, done);
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
