const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.API_BASE_URL || "https://jsonplaceholder.typicode.com",
    specPattern: "api-tests/tests/**/*.spec.js",
    supportFile: "api-tests/support/e2e.js",
    fixturesFolder: "api-tests/fixtures",
    videosFolder: "api-tests/videos",
    screenshotsFolder: "api-tests/screenshots",
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    env: {
      apiBaseUrl:
        process.env.API_BASE_URL || "https://jsonplaceholder.typicode.com",
      apiTimeout: process.env.API_TIMEOUT || 10000,
    },
    setupNodeEvents(on, config) {
      // Implementar plugins aqui se necessário
      return config;
    },
  },
});
