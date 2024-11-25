// Class to handle the Login page actions and validations
export class LoginPage {
    
    // Method to validate that the Login page is displayed correctly
    validateTheLoginPage() {
        // Verify the page title is visible and contains the correct text
        cy.get('.page-title-wrapper [data-ui-id="page-title-wrapper"]')
        .should('be.visible') // Ensure the element is visible
        .and('contain', 'Customer Login');  // Verify the title contains the expected text

        // Validate that the "Registered Customers" heading is displayed
        cy.get('strong[id="block-customer-login-heading"]')  // / Target the heading container by its role attribute
        .should('have.text', 'Registered Customers'); // Verifies it contains the expected text

       
    }

   

}

// Export a new instance of the LoginPage class
// This allows other test files to use this instance directly
export const onLogin = new LoginPage();