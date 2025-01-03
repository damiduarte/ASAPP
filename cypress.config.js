const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env:{
      username: 'dam_test',
      pwd: 'Aa123123',
      baseUrlAPI: "http://localhost:5000"
    },
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/tests/*/*cy.js"
  },
});
