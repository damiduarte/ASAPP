const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env:{
      username: 'dam_test',
      pwd: 'Aa123123'
    },
    baseUrl: "http://localhost:3000",
  },
});
