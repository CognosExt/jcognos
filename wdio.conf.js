'use strict';

exports.config = {
  runner: 'local',
  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        // to run chrome headless the following flags are required
        // (see https://developers.google.com/web/updates/2017/04/headless-chrome)
        args: ['--headless', '--disable-gpu']
      }
    },
    {
      // maxInstances can get overwritten per capability. So if you have an in house Selenium
      // grid with only 5 firefox instance available you can make sure that not more than
      // 5 instance gets started at a time.
      maxInstances: 5,
      browserName: 'firefox',
      //      specs: ["test/ffOnly/*"],
      'moz:firefoxOptions': {
        // flag to activate Firefox headless mode (see https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities for more details about moz:firefoxOptions)
        args: ['-headless']
      }
    }
  ],
  services: ['selenium-standalone'],
  specs: [
    './test/1_API.js',
    './test/2_loginlogoff.js',
    './test/3_loginlogofffailures.js',
    './test/4_Reset.js',
    './test/5_NameSpaces.js'
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
    compilers: ['js:@babel/register']
  }
};
