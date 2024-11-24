const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://magento.softwaretestingboard.com/',
    excludeSpecPattern: ['**/1-getting-started', '**/2-advanced-examples'],
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
