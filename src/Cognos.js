import { getCognosRequest } from './CognosRequest';
import { Utils } from './Utils';

import minimatch from 'minimatch';

// Local static variable that holds Cognos instance
var jCognos;
// We keep the cognosUrl, if a second request to getCognos is made, we create a new jCognos
var cognosUrl;
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
    this.url = '';
    this.debug = debug;
    this.username = '';
    this.password = '';
    /**
     *  defaultNamespace - returns the default namespace that jCognos will login to
     *
     * @return {String} id of the default namespace
     */
    this.defaultNamespace = '';
    this.namespace = '';
    /**
     * namespaces - returns a list of possible namespaces, also when there is only 1
     *
     * @return {Array<NameSpace>}  An array of objects describing the namespaces
     */
    this.namespaces = '';
    this.retrycount = 0;
    this.loginrequest = false;
    this.resetting = false;
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
   * @param {String} [namespace=Cognos Default namespace or the namespace that is the only namespace] Namespace
   * @return {Promise}          returns a promise.
   */
  login(user, password, namespace = '') {
    var me = this;
    me.log('login: Starting to login');
    if (me.loginrequest !== false) {
      me.log(
        'login: Already logging in, returning loginrequest promise',
        me.loginrequest
      );
      return me.loginrequest;
    }

    if (namespace == '') {
      namespace = me.defaultNamespace;
    }
    if (!namespace) {
      throw 'Namespace not known.';
    }
    // Set the parameters of the login POST request
    var params = {
      parameters: [
        {
          name: 'CAMNamespace',
          value: namespace
        },
        {
          name: 'h_CAM_action',
          value: 'logonAs'
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

    this.loginrequest = me.requester
      .post('bi/v1/login', params)
      .then(function(body) {
        me.loggedin = true;
        me.username = user;
        me.password = password;
        me.namespace = namespace;
        me.loginrequest = false;
        me.log('Successfully logged in');
        return body;
      })
      .catch(function(err) {
        me.log('Cognos: Error when logging in.');
        me.loginrequest = false;
        throw err;
      });

    this.log('login: returning login promise', this.loginrequest);

    return this.loginrequest;
  }

  /**
   * logoff - Logs off from Cognos.
   * @return {Promise}          returns a promise.
   */
  logoff() {
    var me = this;

    var result = me.requester
      .delete('bi/v1/login')
      .then(function(body) {
        me.loggedin = false;
        me.log('Successfully logged off');
        return body;
      })
      .catch(function(err) {
        me.log('Cognos: Error when logging off.');
      });
    return result;
  }

  handleError(err) {
    var me = this;
    var errormessage = '';

    if (err.response.status == 441 || err.response.status == 403) {
      me.log('going to reset');
      let result = me.reset();
      me.log('in handleError, returning promise', result);
      return result;
    }

    // We have 3 different ways to return an error.
    if (typeof err.response !== 'undefined') {
      if (typeof err.response.data.messages !== 'undefined') {
        errormessage = err.response.data.messages[0].messageString; // This is a real Cognos error
      } else {
        errormessage = err.response.data; // It will probably be 'Forbidden'
      }
    } else {
      errormessage = err.message; // This is axios saying 'Network Error'
    }

    me.error(err);
    /*
   *  This happens when you didnt logout properly. It seems harmless.
   */
    if (errormessage != 'AAA-AUT-0011 Invalid namespace was selected.') {
      throw errormessage;
    }
    // all seems fine return a resolved promise
    return Promise.resolve();
  }

  /**
   * reset - Create a new connection
   *
   * @return {Promise}  When resolved we are logged in
   */

  reset() {
    var me = this;
    me.log('Going to Reset');

    if (this.resetting) {
      return this.resetting;
    }

    this.retrycount++;
    me.log('retrycount = ' + this.retrycount);

    if (this.retrycount > 2) {
      return Promise.reject();
    }
    this.requester = undefined;
    me.log('going to reset the cognos request');

    this.resetting = getCognosRequest(this.url, this.debug, true)
      .then(function(cRequest) {
        me.requester = cRequest;
        me.log('going to login again');
        let result = me.login(me.username, me.password, me.namespace);
        me.log('login promise', result);
        return result;
      })
      .then(function() {
        me.log('Done logging in');
        return Promise.resolve();
      })
      .catch(function(err) {
        me.error('Error resetting', err);
        if (me.retrycount < 3) {
          return me.reset();
        }
        throw err;
      });
    me.log('Returning a promise to reset', this.resetting);
    return this.resetting;
  }

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
        me.log('Got the Private Folders');
        if (typeof folders !== 'undefined') {
          rootfolders.push({
            id: folders.data[0].id,
            name: 'My Content'
          });
        }
      })
      .then(function() {
        return me.requester
          .get('bi/v1/objects/.public_folders?fields=permissions')
          .then(function(folders) {
            me.log('Got the Public Folders');
            if (typeof folders !== 'undefined') {
              rootfolders.push({
                id: folders.data[0].id,
                name: 'Team Content'
              });
            }
            return rootfolders;
          });
      })
      .catch(function(err) {
        me.error('CognosRequest : Error in listRootFolder', err);

        me.handleError(err)
          .then(function() {
            me.log('We have been reset, list the root folder again');
            me.resetting = false;
            return me.listRootFolder();
          })
          .catch(function(rejecterr) {
            throw err;
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
        if (typeof folders !== 'undefined') {
          return me.listFolderById(folders.data[0].id);
        }
        return {};
      })
      .catch(function(err) {
        me.error('CognosRequest : Error in listPublicFolders', err);

        me.handleError(err)
          .then(function() {
            me.log('We have been reset, list the public folders again');
            me.resetting = false;
            return me.listPublicFolders();
          })
          .catch(function(rejecterr) {
            throw err;
          });
      });

    return result;
  }

  /**
   * listFolderById - Lists the folder content by id
   *
   * @param  {String} id            Cognos Object id of the folder
   * @param  {String} pattern = '*' Pattern like you would use when listing folders in your filesystem. eg. 'Sales*'
   * @param {Array} types = '['folder']' Types of Cognos objects to list. defaults to folders only. Other values could be 'report'
   * @return {CognosObject[]}  List of sub-folders
   */
  listFolderById(id, pattern = '*', types = ['folder']) {
    var me = this;
    var result = me.requester
      .get(
        'bi/v1/objects/' +
          id +
          '/items?nav_filter=true&fields=defaultName,defaultScreenTip'
      )
      .then(function(folders) {
        var result = [];
        folders.data.forEach(function(folder) {
          // options is optional
          if (minimatch(folder.defaultName, pattern)) {
            me.log('folder ', folder.defaultName);
            try {
              if (types.indexOf(folder.type) > -1) {
                var tpFolder = {
                  name: folder.defaultName,
                  id: folder.id,
                  searchPath: folder.searchPath,
                  type: folder.type
                };
                result.push(tpFolder);
              }
            } catch (err) {
              me.error('something fishy', err);
            }
          }
        });
        return result;
      })
      .catch(function(err) {
        me.error('CognosRequest : Error in listFolderById', err);

        return me
          .handleError(err)
          .then(function() {
            me.log('We have been reset, list the folder by id again');
            me.resetting = false;
            return me.listFolderById(id, pattern, types);
          })
          .catch(function(rejecterr) {
            throw err;
          });
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
        //    if (Utils.isStandardBrowserEnv()) did not work per-se
        if (response.headers && response.headers.location) {
          var id = response.headers.location.split('/').pop();
        } else {
          var id = response.data.data[0].id;
        }
        return {
          name: name,
          id: id
        };
      })
      .catch(function(err) {
        me.error('CognosRequest : Error in addFolder', err);

        return me
          .handleError(err)
          .then(function() {
            me.log('We have been reset, lets add the folder again');
            me.resetting = false;
            return me.addFolder(parentid, name);
          })
          .catch(function(rejecterr) {
            throw err;
          });
      });

    me.log('Maybe going to create folder');
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
        me.error('CognosRequest : Error in deleteFolder', err);

        return me
          .handleError(err)
          .then(function() {
            me.log('We have been reset, delete the folder again');
            me.resetting = false;
            return me.deleteFolder(id, force, recursive);
          })
          .catch(function(rejecterr) {
            throw err;
          });
      });
    return result;
  }

  getReportData(id, prompts = {}, limit = 2000) {
    var me = this;
    // Cognos 11
    // https://srv06.gologic.eu/ibmcognos/bi/v1/disp/atom/cm/id/iD9D1A99B207B40D6AB25DB476C476E33?json=
    // https://srv06.gologic.eu/ibmcognos/bi/v1/disp/rds/reportData/report/i821EB6721EDB41A29E0361BC83393C56?fmt=DataSet&rowLimit=2000
    var promptString = '&';
    var keys = Object.keys(prompts);
    keys.forEach(function(key) {
      promptString += 'p_' + key + '=' + prompts[key];
    });

    var result = me.requester
      .get(
        'bi/v1/disp/rds/reportData/report/' +
          id +
          '?fmt=DataSetJSON&rowLimit=' +
          limit +
          promptString
      )
      .then(function(data) {
        me.log('retrieved the data', data);
        return data;
      })
      .catch(function(err) {
        me.error('CognosRequest : Error in getReportData', err);

        return me
          .handleError(err)
          .then(function() {
            me.log('We have been reset, get Report Data again');
            me.resetting = false;
            return me.getReportData(id, prompts, limit);
          })
          .catch(function(rejecterr) {
            throw err;
          });
      });

    return result;
  }

  /**
   * uploadExtension - Uploads zipfile containing Cognos Extension. Only supports updating an existing module.
   * This function is only supported by Node.js. In the browser this function returns false;
   *
   * @param  {String} filename Path to the .zip file
   * @param  {String} name name of the module (as found in the spec.json)
   * @param  {String} type type of upload. Default is 'extensions', for themes use 'themes'.
   * @return {Promise} Promise that resolves to a string.
   */
  uploadExtension(filename, name, type = 'extensions') {
    var me = this;
    var path = 'bi/v1/plugins/' + type + '/' + name;
    // The reading of the file and the actual put have to be in the same function. So not much to see here.
    var result = this.requester
      .put(path, filename)
      .then(function(response) {
        me.log('New extension id =' + response.id);
      })
      .catch(function(err) {
        me.error('CognosRequest : Error in uploadExtension', err);
        throw err;
      });
    return result;
  }
}

/**
 * getCognos - Static function to get the Cognos Object. You can have only 1 Cognos object in your application
 * at any time.
 *
 * @param  {String} url The URL of your Cognos installation. If empty, this function becomes static and a Promise for the current jCognos object is returned.
 * @param  {Boolean} debug If true, starts debugging into the console
 * @return {Promise}  a promise that will return the jCognos object
 */
function getCognos(url = false, debug = false) {
  var reset = false;
  if (url && url !== cognosUrl) {
    jCognos = undefined;
    reset = true;
  }
  if (typeof jCognos == 'undefined' && url) {
    var myRequest = getCognosRequest(url, debug, reset)
      .then(function(cRequest) {
        jCognos = new Cognos(debug);
        jCognos.requester = cRequest;
        jCognos.url = url;
        jCognos.defaultNamespace = cRequest.namespace;
        jCognos.namespaces = cRequest.namespaces;
        return jCognos;
      })
      .catch(function(err) {
        throw err;
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
 *
 */

/**
 * @typedef {Object} NameSpace Object holding a namespace
 * @property {String} id - The id of the namespace
 * @property {String} value - Displayname of the NameSpace
 * @property {Boolean} isDefault - Set to true if this is the default namespace
 *
 */
