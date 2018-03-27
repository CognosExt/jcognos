'use strict';

exports.config = {
  capabilities: [
    { browserName: 'Chrome' }
    // If you want to use other browsers,
    // you may need local Selenium standalone server.
  ],
  services: ['phantomjs'],
  specs: [
    './test/1_API.js',
    './test/2_loginlogoff.js',
    './test/3_loginlogofffailures.js'
  ],
  exclude: [],
  maxInstances: 2,
  sync: true,
  logLevel: 'error',
  coloredLogs: true,
  waitforTimeout: 20000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 30000,
    // We wrote the tests in ES-2016 so we need to transpile
    compilers: ['js:babel-register']
  }
};
