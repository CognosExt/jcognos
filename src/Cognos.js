import { getCognosRequest } from './CognosRequest';

var minimatch = require('minimatch');

//Local static variable that holds Cognos instance
var jCognos;

/**
 * Class that helps you connect with your inner Cognos. You can not create this class directly, use {@link getCognos} to
 * retrieve the Cognos instance.
 * @class
 */
class Cognos {
  /**
   * constructor - Called when creating a new Cognos.
   *
   * @return {Cognos}     New Cognos object
   * @constructs
   * @private
   */
  constructor(debug) {
    /**
     * Check to see of user is loggedin or not
     * @type {Boolean}
     * @memberof Cognos
     */
    this.loggedin = false;
    this.debug = debug;
  }

  log(text, object) {
    if (this.debug) {
      if (object) {
        console.log(text, object);
      } else {
        console.log(text);
      }
    }
  }

  error(text, object) {
    if (this.debug) {
      if (object) {
        console.error(text, object);
      } else {
        console.error(text);
      }
    }
  }
  /**
     * login - Logs into Cognos.
     *
     * @param  {String} user     Cognos username
     * @param  {String} password Password
     * @return {Promise}          returns a promise.
     */
  login(user, password) {
    var me = this;

    // Set the parameters of the login POST request
    var params = {
      parameters: [
        {
          name: 'CAMNamespace',
          value: me.requester.namespace
        },
        {
          name: 'h_CAM_action',
          value: 'LogonAs'
        },
        {
          name: 'CAMUsername',
          value: user
        },
        {
          name: 'CAMPassword',
          value: password
        }
      ]
    };

    var result = me.requester
      .post('bi/v1/login', params)
      .then(function(body) {
        me.loggedin = true;
        return body;
      })
      .catch(function(err) {
        me.log('Cognos: Error when logging in.');
        me.log(err);
      });
    return result;
  }

  listfolderbyname(name) {}

  /**
   * listRootFolder - Returns the Public Folders and the My Content
   *
   * @return {CognosObject[]}  Array of CognosObjects
   */
  listRootFolder() {
    var me = this;
    var rootfolders = [];
    // Cognos 11
    var result = me.requester
      .get('bi/v1/objects/.my_folders?fields=permissions')
      .then(function(folders) {
        rootfolders.push({
          id: folders.data[0].id,
          name: 'My Content'
        });
      })
      .then(function() {
        return me.requester
          .get('bi/v1/objects/.public_folders?fields=permissions')
          .then(function(folders) {
            rootfolders.push({
              id: folders.data[0].id,
              name: 'Team Content'
            });
            return rootfolders;
          });
      });
    return result;
  }

  listPublicFolders() {
    var me = this;
    // Cognos 11
    var result = me.requester
      .get('bi/v1/objects/.public_folders?fields=permissions')
      // Cognos 10 & 11 (but might be depricated)
      // the dojo= is added to make the result json. the alternative is xml.
      //var result = me.requester.get('bi/v1/disp/icd/feeds/cm/?dojo=')
      .then(function(folders) {
        return me.listFolderById(folders.data[0].id);
      });
    return result;
  }

  listPublicFolders10() {
    var me = this;

    // the dojo= is added to make the result json. the alternative is xml.
    var result = me.requester
      .get('bi/v1/disp/icd/feeds/cm/?dojo=')
      .then(function(folders) {
        // TODO build this
        //        me.log(folders.data);
        //return me.listFolderById(folders.data[0].id);
      });
    //  });
    return result;
  }

  /**
   * listFolderById - Lists the folder content by id
   *
   * @param  {String} id            Cognos Object id of the folder
   * @param  {String} pattern = '*' Pattern like you would use when listing folders in your filesystem. eg. 'Sales*'
   * @return {CognosObject[]}  List of sub-folders
   */
  listFolderById(id, pattern = '*') {
    var me = this;
    var result = me.requester
      .get(
        'bi/v1/objects/' +
          id +
          '/items?nav_filter=true&fields=defaultName,defaultScreenTip'
      )
      .then(function(folders) {
        //me.log(folders);
        var result = [];
        folders.data.forEach(function(folder) {
          // options is optional
          if (minimatch(folder.defaultName, pattern)) {
            me.log('folder ', folder.defaultName);

            var tpFolder = {
              name: folder.defaultName,
              id: folder.id
            };
            result.push(tpFolder);
          }
        });
        return result;
      });
    return result;
  }

  /**
   * addFolder - Creates a new folder
   *
   * @param  {String} parentid Id of the parent folder of the new folder.
   * @param  {String} name     The name of the new folder
   * @return {CognosObject}  The newly created folder
   */
  addFolder(parentid, name) {
    var me = this;
    var params = {
      defaultName: name,
      type: 'folder'
    };

    var result = me.requester
      .post('bi/v1/objects/' + parentid + '/items', params, true)
      .then(function(response) {
        me.log('created folder');
        var id = response.headers.location.split('/').pop();
        return {
          name: name,
          id: id
        };
      })
      .catch(function(err) {
        me.log('Cognos: Error creating folder.');
        me.log(err);
      });
    return result;
  }

  /**
   * deleteFolder - Deletes a folder, its content and subfolders
   *
   * @param  {String} id               Id of the folder to be deleted
   * @param  {type} force = true     Not sure, actually
   * @param  {type} recursive = true Will probably fail if folder contains children and set to false
   * @return {Boolean}                  Returns true upon success
   */
  deleteFolder(id, force = true, recursive = true) {
    var me = this;
    var params = {
      force: force,
      recursive: recursive
    };

    var result = me.requester
      .delete('bi/v1/objects/' + id, params, true)
      .then(function(response) {
        me.log('deleted folder');
        return true;
      })
      .catch(function(err) {
        me.log('Cognos: Error Deleting folder.');
        me.log(err);
      });
    return result;
  }

  /**
   * uploadExtension - Uploads zipfile containing Cognos Extension to
   *
   * @param  {String} path Path to the .zip file
   * @param  {String} name name of the module (as found in the spec.json)
   * @return {Object}      Whatever JSON Cognos returns
   */
  uploadExtension(path, name) {
    var me = this;
    var fs = require('fs');
    path =
      '/var/www/gologic/Cognos11/Buttons/InsightsAllwaysButton/dist/extension.zip';
    var result = fs
      .createReadStream(path)
      .pipe(me.requester.put('bi/v1/plugins/extensions/' + name));
    return result;
  }
}

/**
 * getCognos - Static function to get the Cognos Object. You can have only 1 Cognos object in your application
 * at any time.
 *
 * @param  {String} url The URL of your Cognos installation
 * @return {Cognos}     The Cognos object
 */
function getCognos(url, debug = false) {
  if (typeof jCognos == 'undefined') {
    var myRequest = getCognosRequest(url, debug).then(function(cRequest) {
      jCognos = new Cognos(debug);
      jCognos.requester = cRequest;
      return jCognos;
    });
    return myRequest;
  } else {
    return Promise.resolve(jCognos);
  }
}

export { getCognos };

// More JSDoc things that should not be on top

/**
 * @typedef {Object} CognosObject
 * @property {String} id - Cognos Object Id
 * @property {String} name - Name of object.
 */
