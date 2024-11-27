import { navigateTo } from "../../support/pageObjects/navigation";
import { onLogin } from '../../support/pageObjects/login';
import users from '../../fixtures/users.json';
import { onRegister } from '../../support/pageObjects/register';


describe('Login Tests', () => {
     // Run before each test: Navigate to the "Sign In" page
     beforeEach('Open Application and navigate to Sign In page', () => {
        cy.visit('/') // Open the homepage
        navigateTo.goToSignIn(); // Navigate to the "Sign In" page
    });

    const emailRegex = /^\S+@\S+\.\S+$/; // Regular expression to validate email format

    // Iterate through each user from the users.json file to test multiple scenarios
    users.forEach(user => {
        it(`should ${user.success 
            ? 'log in successfully for'   // Message for successful login
            : user.email === ' ' && user.password === '' // Message for missing email/password
            ? 'show error message for empty fields' 
            : 'show error message for'}  ${user.email}`, () => {
            onLogin.validateTheLoginPage(); // Validate the Login page
            onLogin.login(user.email, user.password);

            // Test case for both email and password fields being empty
            if (user.email === '' && user.password === '') {
                onRegister.validateErrorMessageField('email-error', user.error);
                onRegister.validateErrorMessageField('pass-error', user.error);
            } else if (!emailRegex.test(user.email)) {
                onRegister.validateErrorMessageField('email-error', user.error);
            }  else if (user.alert) {
                onLogin.validateInvalidCredentials(user.alert);
            } else {
                onLogin.validateValidCredentials(user.success);
                onLogin.logoutBtn();
            }
        });
    });
});

