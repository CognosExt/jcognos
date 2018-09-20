# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="1.5.0"></a>
# [1.5.0](https://github.com/CognosExt/jcognos/compare/v1.4.0...v1.5.0) (2018-09-20)


### Features

* Added support for uploading themes and extensions in the compiled sources ([dbd2ac8](https://github.com/CognosExt/jcognos/commit/dbd2ac8))
* Added uploadExtension method that allows you to upload extensions and themes ([7423305](https://github.com/CognosExt/jcognos/commit/7423305))



<a name="1.4.0"></a>
# [1.4.0](https://github.com/CognosExt/jcognos/compare/v1.3.1...v1.4.0) (2018-08-22)


### Features

* The getCognos function now returns the same object if you omit the url parameter ([54a3236](https://github.com/CognosExt/jcognos/commit/54a3236))



<a name="1.3.1"></a>
## [1.3.1](https://github.com/CognosExt/jcognos/compare/v1.3.0...v1.3.1) (2018-08-06)



<a name="1.3.0"></a>
# [1.3.0](https://github.com/CognosExt/jcognos/compare/v1.2.3...v1.3.0) (2018-08-06)


### Features

* Added attributes for possible NameSpaces and the defaultNamespace ([fbf4aef](https://github.com/CognosExt/jcognos/commit/fbf4aef))



<a name="1.2.3"></a>
## [1.2.3](https://github.com/CognosExt/jcognos/compare/v1.2.2...v1.2.3) (2018-08-03)



<a name="1.2.2"></a>
## [1.2.2](https://github.com/CognosExt/jcognos/compare/v1.2.1...v1.2.2) (2018-08-03)


### Bug Fixes

* Never compiled a version for node usage. ([1fa5729](https://github.com/CognosExt/jcognos/commit/1fa5729))
* typo in package.json ([a2c6e8a](https://github.com/CognosExt/jcognos/commit/a2c6e8a))
* **addFolder function:** in some environments the addFolder function failed ([8210cca](https://github.com/CognosExt/jcognos/commit/8210cca))



<a name="1.2.1"></a>

## [1.2.1](https://github.com/CognosExt/jcognos/compare/v1.2.0...v1.2.1) (2018-08-02)

<a name="1.2.0"></a>

# [1.2.0](https://github.com/CognosExt/jcognos/compare/v1.1.0...v1.2.0) (2018-08-02)

### Bug Fixes

* Small improvements in reselience of http requests to Cognos. Support of Redirects for example. ([eb20164](https://github.com/CognosExt/jcognos/commit/eb20164))

### Features

* Add support for namespaces as requested in [#6](https://github.com/CognosExt/jcognos/issues/6) ([3f09039](https://github.com/CognosExt/jcognos/commit/3f09039))

<a name="1.1.0"></a>

# [1.1.0](https://github.com/CognosExt/jcognos/compare/v1.0.3...v1.1.0) (2018-04-20)

### Bug Fixes

* Added another error scenario when the network connection disappears ([0c2412a](https://github.com/CognosExt/jcognos/commit/0c2412a))

### Features

* Add Filter to fetch report data URL ([133ee4b](https://github.com/CognosExt/jcognos/commit/133ee4b))
* jcognos will reset the connection if a timeout has occured ([cac122f](https://github.com/CognosExt/jcognos/commit/cac122f))

<a name="1.0.3"></a>

## [1.0.3](https://github.com/CognosExt/jcognos/compare/v1.0.2...v1.0.3) (2018-03-27)

### Bug Fixes

* fixed: After deleting session, the next session fails. ([85181ed](https://github.com/CognosExt/jcognos/commit/85181ed))

<a name="1.0.2"></a>

## [1.0.2](https://github.com/CognosExt/jcognos/compare/v1.0.1...v1.0.2) (2018-03-20)

### Bug Fixes

* More Error handling, better tests ([b324ba2](https://github.com/CognosExt/jcognos/commit/b324ba2))

<a name="1.0.1"></a>

## [1.0.1](https://github.com/CognosExt/jcognos/compare/v1.0.0...v1.0.1) (2018-03-15)

### Bug Fixes

* Fixed NodeJs support for Cognos including XSRF Cookie. Fixed tests, more error handling ([ff31d4b](https://github.com/CognosExt/jcognos/commit/ff31d4b))

<a name="1.0.0"></a>

# [1.0.0](https://github.com/CognosExt/jcognos/compare/v0.1.4...v1.0.0) (2018-03-13)

### Features

* Added GetReportData function ([2786922](https://github.com/CognosExt/jcognos/commit/2786922))

### BREAKING CHANGES

* The main API changed (the way the jcognos object is exported.

<a name="0.1.4"></a>

## [0.1.4](https://github.com/CognosExt/jcognos/compare/v0.1.3...v0.1.4) (2018-03-12)

### Bug Fixes

* Working Axios version without XSRF support ([1142f44](https://github.com/CognosExt/jcognos/commit/1142f44))

<a name="0.1.3"></a>

## [0.1.3](https://github.com/CognosExt/jcognos/compare/v0.1.2...v0.1.3) (2017-11-29)

<a name="0.1.2"></a>

## [0.1.2](https://github.com/CognosExt/jcognos/compare/v0.1.1...v0.1.2) (2017-11-17)

### Bug Fixes

* Simplified the babel configuation and fixed main file path for npm module ([4b97165](https://github.com/CognosExt/jcognos/commit/4b97165))

<a name="0.1.1"></a>

## [0.1.1](https://github.com/CognosExt/jcognos/compare/v0.1.0...v0.1.1) (2017-11-15)

<a name="0.1.0"></a>

# 0.1.0 (2017-11-15)

### Features

* Initial Version ([1abc423](https://github.com/CognosExt/jcognos/commit/1abc423))
