const { config } = require('./capabilities/config');

exports.config = {
  runner: 'local',
  port: 4723,
  path: '/',
  specs: [
    './tests/**/*.spec.js'
  ],
  capabilities: config.capabilities,
  logLevel: 'info',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: [
    ['appium', {
      args: {
        address: 'localhost',
        port: 4723,
        relaxedSecurity: true
      },
      logPath: './mobile-tests/reports'
    }]
  ],
  framework: 'mocha',
  reporters: [
    'spec',
    ['mochawesome', {
      outputDir: './mobile-tests/reports',
      outputFileFormat: {
        report: 'mobile-test-report-%DATE%.html',
        json: 'mobile-test-report-%DATE%.json'
      }
    }]
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },
  before: function (capabilities, specs) {
    // Configurações antes dos testes
  },
  after: function (result, capabilities, specs) {
    // Limpeza após os testes
  }
};

