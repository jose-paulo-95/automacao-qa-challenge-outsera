const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.WEB_BASE_URL || 'https://the-internet.herokuapp.com',
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
    pageLoadTimeout: 30000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    env: {
      webBaseUrl: process.env.WEB_BASE_URL || 'https://the-internet.herokuapp.com',
      webTimeout: process.env.WEB_TIMEOUT || 30000
    },
    setupNodeEvents(on, config) {
      addCucumberPreprocessorPlugin(on, config);
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

