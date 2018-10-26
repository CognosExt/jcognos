if (typeof window == 'undefined') {
  const chai = require('chai');
  const settings = require('./Settings.json');
  const uuidv4 = require('uuid/v4');
  const path = require('path');

  const jcognos = require('../dist/jcognos.esm');
  const url = settings.url;
  const debug = settings.debug;
  const user = settings.user;
  const password = settings.password;
  const namespace = settings.namespace;
}

var getCognos = jcognos.getCognos;
var assert = chai.assert;

var cognos;

/**
 * Download a sample extension
 * @return {[type]} [description]
 */
var http = require('http');
var fs = require('fs');

describe('jcognos Extensions Tests', function() {
  beforeEach(function() {
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
        console.log(err);
        assert.fail(true, true, 'Can not login');
      });
    return result;
  });
  afterEach(function() {
    return cognos.logoff().then(function(folder) {
      assert.equal(cognos.loggedin, false, 'Logged off');
    });
  });
  it('Should be able to upload extension', done => {
    var file = path.resolve(file);
    lcognos
      .uploadExtension(file, program.extname)
      .then(function() {
        console.log('Uploaded Extension');
      })
      .catch(function(err) {
        console.log('Error uploading', err);
      })
      .then(done, done);
  }),
    it('Should be able to create folders and delete them', done => {
      cognos
        .reset()
        .then(function() {
          return cognos.listRootFolder();
        })
        .then(function(folders) {
          var foldername = uuidv4();
          cognos.addFolder(folders[0].id, foldername).then(function(folder) {
            assert.equal(foldername, folder.name, 'New Folder Exists');
            cognos
              .deleteFolder(folder.id)
              .then(function(folder) {
                assert.equal(folder, true, 'New Folder Deleted');
              })
              .catch(function(err) {
                console.log('Three was an error deleting a folder', err);
                assert.fail(true, true, err);
              })
              .then(done, done);
          });
        })
        .catch(function(err) {
          console.log('There was an error listing the root folder', err);
        });
    }),
    it('getCognos should return same object', done => {
      var newCognos = jcognos.getCognos().then(function(freshCognos) {
        assert.equal(cognos, freshCognos, 'Two Cognosses are the same.');
        cognos
          .reset()
          .then(function() {
            jcognos.getCognos().then(function(newerCognos) {
              assert.notEqual(
                cognos,
                newCognos,
                'After reset, Two Cognosses are not the same.'
              );
            });
          })
          .catch(function(err) {
            console.log('There was an error fetching the root folder', err);
          })
          .then(done, done);
      });
    });
});
