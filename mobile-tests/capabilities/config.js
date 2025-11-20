require('dotenv').config();
const fs = require('fs');
const path = require('path');

const platform = process.env.MOBILE_PLATFORM || 'Android';
const deviceName = process.env.MOBILE_DEVICE_NAME || 'emulator-5554';
const appPath = process.env.MOBILE_APP_PATH || './mobile-tests/apps/app.apk';
const automationName = process.env.MOBILE_AUTOMATION_NAME || 'UiAutomator2';

// Verificar se o arquivo do app existe
const resolvedAppPath = path.resolve(appPath);
if (!fs.existsSync(resolvedAppPath)) {
  console.warn(`⚠️  AVISO: Arquivo do app não encontrado em: ${resolvedAppPath}`);
  console.warn('   Os testes podem falhar se o app não estiver instalado no dispositivo.');
  console.warn('   Para resolver:');
  console.warn('   1. Coloque o arquivo .apk/.ipa na pasta mobile-tests/apps/');
  console.warn('   2. Ou configure MOBILE_APP_PATH no arquivo .env');
  console.warn('   3. Ou remova a propriedade "app" das capabilities para usar app já instalado');
}

const androidCapabilities = {
  platformName: 'Android',
  'appium:platformVersion': process.env.MOBILE_PLATFORM_VERSION || '16', // Ajustar conforme seu emulador
  'appium:deviceName': deviceName,
  'appium:automationName': automationName,
  'appium:noReset': false,
  'appium:fullReset': false,
  'appium:newCommandTimeout': 300,
  'appium:autoGrantPermissions': true,
  'appium:skipServerInstallation': false,
  'appium:skipDeviceInitialization': false
};

// Adicionar app apenas se o arquivo existir
if (fs.existsSync(resolvedAppPath)) {
  androidCapabilities['appium:app'] = resolvedAppPath;
} else {
  // Se não houver app, tentar usar app já instalado ou browser
  console.warn('   Usando configuração sem app - certifique-se de que há um app instalado no dispositivo');
  // Opção alternativa: usar browser para testes web mobile
  // androidCapabilities['appium:browserName'] = 'Chrome';
}

const iosCapabilities = {
  platformName: 'iOS',
  'appium:platformVersion': '15.0',
  'appium:deviceName': 'iPhone 13',
  'appium:automationName': 'XCUITest',
  'appium:noReset': false,
  'appium:fullReset': false,
  'appium:newCommandTimeout': 300
};

const iosAppPath = './mobile-tests/apps/app.ipa';
const resolvedIosAppPath = path.resolve(iosAppPath);
if (fs.existsSync(resolvedIosAppPath)) {
  iosCapabilities['appium:app'] = resolvedIosAppPath;
}

exports.config = {
  capabilities: platform === 'iOS' ? [iosCapabilities] : [androidCapabilities]
};

