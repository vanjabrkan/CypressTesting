// Helper function to fill input fields
// It clears the input field first and types the provided value only if it exists
function fillInputField(fieldId, value) {
    cy.get(`#${fieldId}`).clear(); // Clear the field to remove any existing text
    if (value) { // Check if a value is provided
        cy.get(`#${fieldId}`).type(value); // Type the value into the field
    }
}
// Class to handle the Login page actions and validations
export class LoginPage {

        // Method to fill out the registration form and submit it
    login(email, password) {
        fillInputField('email', email); // Fill the First Name field
        fillInputField('pass', password); // Fill the Last Name field
        cy.get('button[type="submit"][id="send2"][class="action login primary"]').click(); // Click the Submit button
    }

    validateInvalidCredentials(expectedText) {
        cy.get('div[role="alert"]').should('contain', expectedText);
    }

    validateValidCredentials(expectedText) {
        cy.wait(3000);
        cy.get('.header').find('span[class="logged-in"]').should('contain', expectedText);
    }
    
    // Method to validate that the Login page is displayed correctly
    validateTheLoginPage() {
        // Verify the page title is visible and contains the correct text
        cy.get('.page-title-wrapper [data-ui-id="page-title-wrapper"]')
            .should('be.visible') // Ensure the element is visible
            .and('contain', 'Customer Login');  // Verify the title contains the expected text

        // Validate that the "Registered Customers" heading is displayed
        cy.get('.block-title > strong[id="block-customer-login-heading"]')  // Find the <strong> HTML element with the id "block-customer-login-heading"
            .should('have.text', 'Registered Customers'); // Verifies it contains the expected text

        // Validate that the "New Customers" heading is displayed
        cy.get('strong[id="block-new-customer-heading"]')  // Find the <strong> HTML element with the id "block-new-customer-heading"
            .should('have.text', 'New Customers'); // Verifies it contains the expected text
    }

    // Logout functionality
    logoutBtn() {
        cy.get('.page-header')
            .find('.panel.header')
            .find('span[class="customer-name"]').click();
    
        cy.get('.page-header')
            .find('.panel.header')
            .find('li[class="customer-welcome active"]')    
            .find('li[class="authorization-link"]').contains('Sign Out').click() 
    }
}

// Export a new instance of the LoginPage class
// This allows other test files to use this instance directly
export const onLogin = new LoginPage();