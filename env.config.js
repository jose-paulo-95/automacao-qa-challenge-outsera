/**
 * Arquivo de configuração de ambiente
 * Copie este arquivo para .env e ajuste conforme necessário
 *
 * IMPORTANTE: O arquivo .env não é versionado por segurança
 * Use este arquivo como referência
 */

module.exports = {
  // API Configuration
  API_BASE_URL:
    process.env.API_BASE_URL || "https://jsonplaceholder.typicode.com",
  API_TIMEOUT: process.env.API_TIMEOUT || 10000,

  // Web Application
  WEB_BASE_URL:
    process.env.WEB_BASE_URL || "https://the-internet.herokuapp.com",
  WEB_TIMEOUT: process.env.WEB_TIMEOUT || 30000,

  // Mobile Configuration
  MOBILE_PLATFORM: process.env.MOBILE_PLATFORM || "Android",
  MOBILE_DEVICE_NAME: process.env.MOBILE_DEVICE_NAME || "emulator-5554",
  MOBILE_APP_PATH: process.env.MOBILE_APP_PATH || "./mobile-tests/apps/app.apk",
  MOBILE_AUTOMATION_NAME: process.env.MOBILE_AUTOMATION_NAME || "UiAutomator2",

  // K6 Configuration
  K6_VUS: process.env.K6_VUS || 500,
  K6_DURATION: process.env.K6_DURATION || "5m",

  // CI/CD
  CI: process.env.CI || "false",
};
