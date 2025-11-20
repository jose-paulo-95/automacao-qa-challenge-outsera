const { config } = require('./capabilities/config');

exports.config = {
  runner: 'local',
  port: 4723,
  path: '/',
  specs: [
    './tests/**/*.spec.js'
  ],
  maxInstances: 1,
  capabilities: config.capabilities,
  logLevel: 'info',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  autoCompileOpts: {
    autoCompile: false
  },
  services: [
    ['appium', {
      args: {
        address: 'localhost',
        port: 4723,
        relaxedSecurity: true,
        log: './reports/appium.log',
        logLevel: 'info'
      },
      logPath: './reports'
    }]
  ],
  framework: 'mocha',
  reporters: [
    'spec'
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },
  before: function (capabilities, specs) {
    // Configurações antes dos testes
    console.log('🚀 Iniciando testes mobile...');
    console.log(`📱 Plataforma: ${capabilities[0]?.platformName || 'N/A'}`);
    console.log(`📱 Dispositivo: ${capabilities[0]?.['appium:deviceName'] || 'N/A'}`);
  },
  beforeSession: function (config, capabilities, specs) {
    // Validações antes de criar a sessão
    if (!capabilities || capabilities.length === 0) {
      throw new Error('❌ Nenhuma capability configurada. Verifique mobile-tests/capabilities/config.js');
    }
  },
  after: function (result, capabilities, specs) {
    // Limpeza após os testes
    console.log('✅ Testes mobile finalizados');
  },
  onError: function (error, capabilities, specs) {
    // Tratamento de erros
    console.error('❌ Erro durante execução dos testes:', error.message);
  }
};

