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

    const emailRegex = /^\S+@\S+\.\S+$/; // Regex to validate email format

    users.forEach(user => {
        it(`should ${user.alert 
            ? 'show error message for invalid credentials' 
            : user.success 
            ? 'log in successfully' 
            : user.email === ' ' && user.password === '' 
            ? 'show error message for empty fields' 
            : 'validate email format'} for ${user.email}`, () => {
            onLogin.validateTheLoginPage(); // Validate the Login page
            onLogin.login(user.email, user.password);

            if (user.email === '' && user.password === '') {
                onRegister.validateErrorMessageField('email-error', user.error);
                onRegister.validateErrorMessageField('pass-error', user.error);
            } else if (!emailRegex.test(user.email)) {
                onRegister.validateErrorMessageField('email-error', user.error);
            }  else if (user.alert) {
                onLogin.validateInvalidCredentials(user.alert);
            } else {
                onLogin.validateValidCredentials(user.success);
            }
        });
    });
});

