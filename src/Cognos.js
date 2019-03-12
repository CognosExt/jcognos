import { getCognosRequest } from './CognosRequest';

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
  constructor(debug, timeout) {
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
    this.timeout = timeout;
    this.productVersion = '';
    /**
     *  capabilities - returns the Cognos User Capabilities object
     *
     * @return {Object} Object with Capabilities
     */
    this.capabilities = {};
    /**
     *  preferences - returns the Cognos User Preferences, eg. timezone, skin, accessibiltity settings etc.
     *
     * @return {Object} Object with Preferences
     */
    this.preferences = {};
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
      return Promise.resolve(me.loginrequest);
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
      .then(function() {
        me.loggedin = true;
        me.username = user;
        me.password = password;
        me.namespace = namespace;
        me.loginrequest = false;
        var capabilities = Promise.resolve(
          me.requester.get('bi/v1/users/~/capabilities').then(function(caps) {
            me.capabilities = caps;
            return caps;
          })
        );
        var preferences = Promise.resolve(
          me.requester.get('bi/v1/users/~/preferences').then(function(prefs) {
            me.preferences = prefs;
            return prefs;
          })
        );

        return Promise.resolve(Promise.all([capabilities, preferences]));
      })
      .then(function() {
        return me;
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
        return body;
      })
      .catch(function(err) {
        me.log('Cognos: Error when logging off.', err);
      });
    return result;
  }

  handleError(err) {
    var me = this;
    var errormessage = '';

    if (err.code === 'ECONNABORTED' || err.message === 'Network Error') {
      // We can not recuparate from network errors.
      throw err;
    }

    // We have 3 different ways to return an error.
    if (typeof err.response !== 'undefined') {
      if (err.response.status == 441 || err.response.status == 403) {
        me.log('going to reset');
        let result = me.reset();
        me.log('in handleError, returning promise', result);
        return result;
      }

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

    this.resetting = getCognosRequest(this.url, this.debug, true, this.timeout)
      .then(function(cRequest) {
        me.requester = cRequest;
        me.log('going to login again');
        let result = me.login(me.username, me.password, me.namespace);
        me.log('login promise', result);
        return Promise.resolve(result);
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
   * getCurrentThemeSettings - Fetches current theme settings
   *
   * @return {Promise}  The promise resolves to an object that holds the spec.json of the current theme. It has attributes such as brandTextSmall etc.
   */
  getCurrentThemeSettings() {
    var me = this;
    var url = 'bi/v1/plugins/themes/current/spec.json';
    var result = me.requester
      .get(url)
      .then(function(themesettings) {
        return themesettings;
      })
      .catch(function(err) {
        me.error('Error while fetching Cognos Current Theme Settings.', err);
        throw err;
      });
    return result;
  }

  /**
   * getCognosVersion - Fetches Cognos Product Version
   *
   * @return {Promise}  The promise resolves to a string that holds the version number
   */
  getCognosVersion() {
    var me = this;
    if (this.productVersion !== '') {
      return Promise.resolve(me.productVersion);
    }
    var url = 'bi/v1/configuration/keys/Glass.productVersion';
    var result = me.requester
      .get(url)
      .then(function(version) {
        me.productVersion = version['Glass.productVersion'];
        return me.productVersion;
      })
      .catch(function(err) {
        me.error('Error while fetching Cognos Version.', err);
        throw err;
      });
    return result;
  }

  /**
   * _getPublicFolderId - Internal function to retrieve the ObjectId of the public folders
   *
   * @return {Promise} Promise that results in an id as {String}.
   */
  _getPublicFolderId() {
    var me = this;
    var url = '';

    return this.getCognosVersion().then(function(version) {
      if (version.substr(0, 4) == '11.1') {
        // Cognos 10 & 11 (but might be depricated)
        // the dojo= is added to make the result json. the alternative is xml.
        url = 'bi/v1/disp/icd/feeds/cm/?dojo=';
        me.log('We are version 11. Going to fetch: ' + url);
      } else {
        url = 'bi/v1/objects/.public_folders?fields=permissions';
      }
      return Promise.resolve(
        me.requester
          .get(url)
          .then(function(folders) {
            var id;
            if (version.substr(0, 4) == '11.1') {
              // This is pure evil. It is only there because JSON.parse breaks on the json returned
              // by cognos. This is not fair, because the Chrome debugger does not chocke on it.
              //JSON.parse(folders);
              folders = eval('(' + folders + ')');
              id = folders.items[0].entry[2].cm$storeID;
            } else {
              id = folders.data[0].id;
            }
            return id;
          })
          .catch(function(err) {
            me.error('There was an error fetching the folder id', err);
            throw err;
          })
      );
    });
  }

  /**
   * listRootFolder - Returns the Public Folders and the My Content
   *
   * @return {CognosObject[]}  Array of CognosObjects
   */
  listRootFolder() {
    var me = this;
    var rootfolders = [];
    return me.requester
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
        return Promise.resolve(
          me._getPublicFolderId().then(function(id) {
            me.log('Got the Public Folders');
            if (typeof id !== 'undefined') {
              rootfolders.push({
                id: id,
                name: 'Team Content'
              });
            }
            return rootfolders;
          })
        );
      })
      .catch(function(err) {
        me.error('CognosRequest : Error in listRootFolder', err);
        me.handleError(err)
          .then(function() {
            me.log('We have been reset, list the root folder again');
            me.resetting = false;
            return me.listRootFolder();
          })
          .catch(function() {
            throw err;
          });
      });
  }

  /**
   * listPublicFolders - List content of the Public Folders
   *
   * @return {CognosObject[]}  List of sub-folders
   */
  listPublicFolders() {
    var me = this;
    var result = me
      ._getPublicFolderId()
      .then(function(id) {
        if (typeof id !== 'undefined') {
          return Promise.resolve(me.listFolderById(id));
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
          .catch(function() {
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
          .catch(function() {
            throw err;
          });
      });
    return result;
  }

  /**
   * getFolderDetails - Gets the raw Cognos details of a folder
   *
   * @param  {String} id objectId
   * @return {Object}    Full object as returned by Cognos
   */
  getFolderDetails(id) {
    var me = this;
    var url =
      'bi/v1/objects/' +
      id +
      '?fields=id,defaultName,owner.defaultName,ancestors,defaultDescription,modificationTime,creationTime,contact,type,disabled,hidden,name.locale,permissions,tenantID,searchPath,repositoryRules';
    return me.requester
      .get(url)
      .then(function(details) {
        me.log('Got Folder Details', details);
        return details;
      })
      .catch(function(err) {
        me.error('CognosRequest : Error in getFolderDetails', err);
        me.handleError(err)
          .then(function() {
            me.log('We have been reset, getFolderDetails again');
            me.resetting = false;
            return me.getFolderDetails(id);
          })
          .catch(function() {
            throw err;
          });
      });
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
          .catch(function() {
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
      .then(function() {
        me.log('Deleted folder');
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
          .catch(function(errtwo) {
            throw errtwo;
          });
      });
    me.log('Returning Delete Promise');
    return result;
  }

  getReportData(id, prompts = {}, limit = 2000) {
    var me = this;
    // Cognos 11
    // https://srv06.gologic.eu/ibmcognos/bi/v1/disp/atom/cm/id/iD9D1A99B207B40D6AB25DB476C476E33?json=
    // https://srv06.gologic.eu/ibmcognos/bi/v1/disp/rds/reportData/report/i821EB6721EDB41A29E0361BC83393C56?fmt=DataSet&rowLimit=2000
    var promptString = '';
    var keys = Object.keys(prompts);
    keys.forEach(function(key) {
      promptString += '&p_' + key + '=' + prompts[key];
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
          .catch(function() {
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

  upLoadDataFile(filename) {
    // First check what the max upload size is
    //  https://srv06.gologic.eu/ibmcognos/bi/v1/configuration/keys/DatasetService.maxUploadSizeMBytes
    var me = this;
    //you can add //&async=true for async, not sure what that does (it uploads in a second http connection)
    var path = 'bi/v1/metadata/files?filename=' + file; //+ "&async=true";
    // The reading of the file and the actual put have to be in the same function. So not much to see here.
    var result = this.requester
      .uploadfile(path, filename)
      .then(function(response) {
        me.log('New extension id =' + response);

        if (response) {
          path = 'bi/v1/metadata/files/segment/' + response + '?index=1';
          me.requester
            .uploadfilepart(path, filename)
            .then(function(response) {
              me.log('New extension id =' + response);
              path = 'bi/v1/metadata/files/segment/' + response + '?index=-1';
              me.requester
                .uploadfilepartFinish(path)
                .then(function(response) {
                  me.log('New extension id =' + response);
                })
                .catch(function(err) {
                  me.error('CognosRequest : Error in uploadDataFile Part', err);
                  throw err;
                });
            })
            .catch(function(err) {
              me.error('CognosRequest : Error in uploadDataFile Part', err);
              throw err;
            });
        }
      })
      .catch(function(err) {
        me.error('CognosRequest : Error in uploadDataFile', err);
        throw err;
      });
    return result;
  }

  getPalettes() {
    var me = this;
    var result = me.requester
      .get('bi/v1/palettes/public')
      .then(function(data) {
        me.log('retrieved the data', data);
        return data;
      })
      .catch(function(err) {
        me.error('CognosRequest : Error in getPalettes', err);

        return me
          .handleError(err)
          .then(function() {
            me.log('We have been reset, getPalettes again');
            me.resetting = false;
            return me.getPalettes();
          })
          .catch(function() {
            throw err;
          });
      });

    return result;
  }

  savePalette(palette, id = false) {
    var me = this;
    var result;
    if (id) {
      result = me.requester
        .put('bi/v1/palettes/' + id, false, palette)
        .then(function(data) {
          me.log('saved palette ' + id);
          return id;
        })
        .catch(function(err) {
          me.error('CognosRequest : Error in savePalette', err);
          if (err == 'Not Found') {
            throw 'Palette with id ' + id + ' is not found';
          }
          return me
            .handleError(err)
            .then(function() {
              me.log('We have been reset, savePalette again');
              me.resetting = false;
              return me.savePalettes(id, palette);
            })
            .catch(function() {
              throw err;
            });
        });
    } else {
      result = me.requester
        .post('bi/v1/palettes/my', palette, true)
        .then(function(data) {
          me.log('saved palette');
        })
        .catch(function(err) {
          me.error('CognosRequest : Error in savePalette', err);
          return me
            .handleError(err)
            .then(function() {
              me.log('We have been reset, savePalette again');
              me.resetting = false;
              return me.savePalettes(palette, id);
            })
            .catch(function() {
              throw err;
            });
        });
    }
    return result;
  }
}

/**
 * getCognos - Static function to get the Cognos Object. You can have only 1 Cognos object in your application
 * at any time.
 *
 * @param  {String} url The URL of your Cognos installation. If empty, this function becomes static and a Promise for the current jCognos object is returned.
 * @param  {Boolean} debug If true, starts debugging into the console
 * @param  {Number} Timeout value for http(s) connections. In milliseconds. Default is 60000.
 * @return {Promise}  a promise that will return the jCognos object
 */
function getCognos(url = false, debug = false, timeout = 60000) {
  var reset = false;
  if (url && url !== cognosUrl) {
    jCognos = undefined;
    reset = true;
  }
  if (typeof jCognos == 'undefined' && url) {
    var myRequest = getCognosRequest(url, debug, reset, timeout)
      .then(function(cRequest) {
        jCognos = new Cognos(debug, timeout);
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
