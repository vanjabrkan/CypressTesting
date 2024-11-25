import { navigateTo } from "../../support/pageObjects/navigation";
import { onLogin } from '../../support/pageObjects/login';

describe("Login page", () => {
    // Run before each test: Navigate to the "Sign In" page
    beforeEach('Open Application and navigate to Sign In page', () => {
        cy.visit('/') // Open the homepage
        navigateTo.goToSignIn(); // Navigate to the "Sign In" page
    });

      // Test for valid data and successful registration
  it('Should be able to login with valid credentials', () => {
    onLogin.validateTheLoginPage(); // Validate the page
    
  });
});
