const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.WEB_BASE_URL || 'https://www.saucedemo.com',
    specPattern: 'web-tests/features/**/*.feature',
    supportFile: 'web-tests/support/e2e.js',
    fixturesFolder: 'web-tests/fixtures',
    videosFolder: 'web-tests/videos',
    screenshotsFolder: 'web-tests/screenshots',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 30000,
    pageLoadTimeout: 60000, // Aumentado para dar mais tempo ao carregamento
    requestTimeout: 30000, // Aumentado para não falhar em requisições lentas
    responseTimeout: 30000, // Aumentado para não falhar em respostas lentas
    // Ignorar erros de requisições que não impedem o carregamento
    blockHosts: [], // Não bloquear hosts
    chromeWebSecurity: false, // Desabilitar segurança web do Chrome para evitar problemas de CORS
    env: {
      webBaseUrl: process.env.WEB_BASE_URL || 'https://www.saucedemo.com',
      webTimeout: process.env.WEB_TIMEOUT || 30000
    },
    setupNodeEvents(on, config) {
      addCucumberPreprocessorPlugin(on, config, {
        stepDefinitions: [
          'web-tests/step_definitions/**/*.{js,mjs,ts,tsx}'
        ],
        nonGlobalStepDefinitions: false,
      });
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      return config;
    }
  }
});

