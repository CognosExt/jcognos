# jcognos

[![Greenkeeper badge](https://badges.greenkeeper.io/CognosExt/jcognos.svg)](https://greenkeeper.io/)
[![CircleCI](https://circleci.com/gh/CognosExt/jcognos.svg?style=svg)](https://circleci.com/gh/CognosExt/jcognos)

Library that encapsulates the (undocumented) [IBM Cognos Analytics](https://www.ibm.com/products/cognos-analytics) REST API.

You can use this to write tests, external clients or build tools for your Cognos environment. As the Cognos API is not official, things might break (badly) after Cognos upgrades.

## Getting Started

```shell
npm install jcognos
```

Once the jcognos has been installed, you can include it in your projects as a CommonJS module

```javascript
require("jcognos");
```

or as an ES2016 module

```javascript
import getCognos from "jcognos";
```

Then get going like:

```javascript
jcognos
  .getCognos("https://cognos.example.com/ibmcognos/", true)
  .then(function(lcognos) {
    lcognos.login("username", "password"); // Which also returns a promise
  });
```

If you want to run this module in your browser, this version does not support XSRF headers. It is (temporarily) broken. To use the module against Cognos Analytics 11.0.7 or later, follow these steps:

1.  Open the Windows Services window and stop the IBM Cognos service.
2.  Open the file installation_location\\wlp\\usr\\servers\\cognosserver\\bootstrap.properties.
3.  Add the following line:

    disableXSRFCheck=true

4.  Save the file.
5.  Restart the IBM Cognos service

You do not need to do this if you use jcognos in nodejs or in cordova.

# Usage

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [Cognos](#cognos)
    -   [Parameters](#parameters)
    -   [capabilities](#capabilities)
    -   [preferences](#preferences)
    -   [defaultNamespace](#defaultnamespace)
    -   [namespaces](#namespaces)
    -   [login](#login)
        -   [Parameters](#parameters-1)
    -   [logoff](#logoff)
    -   [reset](#reset)
    -   [getCurrentThemeSettings](#getcurrentthemesettings)
    -   [getCognosVersion](#getcognosversion)
    -   [setKey](#setkey)
        -   [Parameters](#parameters-2)
    -   [getKeys](#getkeys)
    -   [\_getPublicFolderId](#_getpublicfolderid)
    -   [listRootFolder](#listrootfolder)
    -   [listPublicFolders](#listpublicfolders)
    -   [listFolderById](#listfolderbyid)
        -   [Parameters](#parameters-3)
    -   [getFolderDetails](#getfolderdetails)
        -   [Parameters](#parameters-4)
    -   [addFolder](#addfolder)
        -   [Parameters](#parameters-5)
    -   [deleteFolder](#deletefolder)
        -   [Parameters](#parameters-6)
    -   [uploadExtension](#uploadextension)
        -   [Parameters](#parameters-7)
    -   [loggedin](#loggedin)
-   [getCognos](#getcognos)
    -   [Parameters](#parameters-8)
-   [CognosObject](#cognosobject)
    -   [Properties](#properties)
-   [NameSpace](#namespace)
    -   [Properties](#properties-1)
-   [cRequest](#crequest)
-   [CAF](#caf)
-   [isStandardBrowserEnv](#isstandardbrowserenv)
-   [isNode](#isnode)

## Cognos

Class that helps you connect with your inner Cognos. You can not create this class directly, use [getCognos](#getcognos) to
retrieve the Cognos instance.

### Parameters

-   `debug`  
-   `timeout`  
-   `ignoreInvalidCertificates`  

### capabilities

capabilities - returns the Cognos User Capabilities object

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Object with Capabilities

### preferences

preferences - returns the Cognos User Preferences, eg. timezone, skin, accessibiltity settings etc.

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Object with Preferences

### defaultNamespace

defaultNamespace - returns the default namespace that jCognos will login to

Returns **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** id of the default namespace

### namespaces

namespaces - returns a list of possible namespaces, also when there is only 1

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[NameSpace](#namespace)>** An array of objects describing the namespaces

### login

login - Logs into Cognos.

#### Parameters

-   `user` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Cognos username
-   `password` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Password
-   `namespace` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Namespace (optional, default `CognosDefaultnamespaceorthenamespacethatistheonlynamespace`)

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** returns a promise.

### logoff

logoff - Logs off from Cognos.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** returns a promise.

### reset

reset - Create a new connection

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** When resolved we are logged in

### getCurrentThemeSettings

getCurrentThemeSettings - Fetches current theme settings

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** The promise resolves to an object that holds the spec.json of the current theme. It has attributes such as brandTextSmall etc.

### getCognosVersion

getCognosVersion - Fetches Cognos Product Version

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** The promise resolves to a string that holds the version number

### setKey

setKey - Sets Configuration Key

#### Parameters

-   `inkey`  
-   `value` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Value of the key
-   `key` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Name of the key

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** The promise resolves to a string that holds the key value

### getKeys

getKey - Fetches Configuration Keys

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** The promise resolves to a string that holds the key value

### \_getPublicFolderId

\_getPublicFolderId - Internal function to retrieve the ObjectId of the public folders

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Promise that results in an id as {String}.

### listRootFolder

listRootFolder - Returns the Public Folders and the My Content

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[CognosObject](#cognosobject)>** Array of CognosObjects

### listPublicFolders

listPublicFolders - List content of the Public Folders

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[CognosObject](#cognosobject)>** List of sub-folders

### listFolderById

listFolderById - Lists the folder content by id

#### Parameters

-   `id` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Cognos Object id of the folder
-   `pattern` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** = '_' Pattern like you would use when listing folders in your filesystem. eg. 'Sales_' (optional, default `'*'`)
-   `types` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** = '['folder']' Types of Cognos objects to list. defaults to folders only. Other values could be 'report' (optional, default `['folder']`)

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[CognosObject](#cognosobject)>** List of sub-folders

### getFolderDetails

getFolderDetails - Gets the raw Cognos details of a folder

#### Parameters

-   `id` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** objectId

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Full object as returned by Cognos

### addFolder

addFolder - Creates a new folder

#### Parameters

-   `parentid` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Id of the parent folder of the new folder.
-   `name` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The name of the new folder

Returns **[CognosObject](#cognosobject)** The newly created folder

### deleteFolder

deleteFolder - Deletes a folder, its content and subfolders

#### Parameters

-   `id` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Id of the folder to be deleted
-   `force` **type** = true     Not sure, actually (optional, default `true`)
-   `recursive` **type** = true Will probably fail if folder contains children and set to false (optional, default `true`)

Returns **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Returns true upon success

### uploadExtension

uploadExtension - Uploads zipfile containing Cognos Extension. Only supports updating an existing module.
This function is only supported by Node.js. In the browser this function returns false;

#### Parameters

-   `filename` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Path to the .zip file
-   `name` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** name of the module (as found in the spec.json)
-   `type` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** type of upload. Default is 'extensions', for themes use 'themes'. (optional, default `'extensions'`)

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Promise that resolves to a string.

### loggedin

Check to see of user is loggedin or not

Type: [Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

## getCognos

getCognos - Static function to get the Cognos Object. You can have only 1 Cognos object in your application
at any time.

### Parameters

-   `url` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The URL of your Cognos installation. If empty, this function becomes static and a Promise for the current jCognos object is returned. (optional, default `false`)
-   `debug` **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** If true, starts debugging into the console (optional, default `false`)
-   `timeout`   (optional, default `60000`)
-   `ignoreInvalidCertificates`   (optional, default `false`)
-   `Timeout` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** value for http(s) connections. In milliseconds. Default is 60000.
-   `ignoreinvalidcertificates` **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Should invalid certificates over ssl be ignored. Default = false

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** a promise that will return the jCognos object

## CognosObject

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

### Properties

-   `id` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Cognos Object Id
-   `name` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Name of object.

## NameSpace

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

### Properties

-   `id` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The id of the namespace
-   `value` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Displayname of the NameSpace
-   `isDefault` **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Set to true if this is the default namespace

## cRequest

Local Variable that holds the single CognosRequest instance

## CAF

CAF - internal security token that is added in a Cookie for wite actions (eg. PUT )

## isStandardBrowserEnv

Determine if we're running in a standard browser environment
returns {boolean}

## isNode

Determine if we're running in node
returns {boolean}
