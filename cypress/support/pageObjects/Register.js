// Helper function to fill input fields
// It clears the input field first and types the provided value only if it exists
function fillInputField(fieldId, value) {
    cy.get(`#${fieldId}`).clear(); // Clear the field to remove any existing text
    if (value) { // Check if a value is provided
        cy.get(`#${fieldId}`).type(value); // Type the value into the field
    }
}

// Class to handle the Register page actions and validations
export class RegisterPage {
    // Method to fill out the registration form and submit it
    register({ firstName, lastName, email, password, confirmPassword }) {
        fillInputField('firstname', firstName); // Fill the First Name field
        fillInputField('lastname', lastName); // Fill the Last Name field
        fillInputField('email_address', email); // Fill the Email field
        fillInputField('password', password); // Fill the Password field
        fillInputField('password-confirmation', confirmPassword); // Fill the Confirm Password field
        cy.get('button[type="submit"][title="Create an Account"]').click(); // Click the Submit button
    }

    // Method to validate error messages for fields
    validateErrorMessageField(fieldId, errorMessage) {
        cy.get(`#${fieldId}`)  // Locate the error message element by its ID
            .should('be.visible') // Ensure the error message is visible
            .and('have.text', errorMessage); // Verify that the error message matches the expected text
    }

    // Method to validate alert messages for general errors
    validateErrorMessage(expectedMessage) {
        cy.get('div[role="alert"]') // Target the alert container by its role attribute
          .should('be.visible') // Ensure the alert is visible
          .and('contain.text', expectedMessage); // Check if it contains the expected message
      }
    
    // Method to validate that the Register page is displayed correctly
    validateTheRegisterPage() {
        // Verify the page title is visible and contains the correct text
        cy.get('.page-title-wrapper [data-ui-id="page-title-wrapper"]')
        .should('be.visible') // Ensure the element is visible
        .and('contain', 'Create New Customer Account');  // Verify the title contains the expected text

        // Validate that the "Personal Information" section is displayed
        cy.get('.fieldset.create.info') // Finds the fieldset with class "create info"
        .find('legend.legend span')  // Finds the span inside the legend element
        .should('have.text', 'Personal Information'); // Verifies it contains the expected text

        // Validate that the "Sign-in Information" section is displayed
        cy.get('.fieldset.create.account') // Finds the fieldset with class "create account"
        .find('legend.legend span')  // Finds the span inside the legend
        .should('have.text', 'Sign-in Information'); // Verifies it contains the expected text
    }

    // Method to validate successful registration with valid credentials
    validateValidCredentials() {
        cy.wait(1500); // Wait for a brief moment to ensure the page is updated
        cy.get('[class="page messages"]') // Locate the message container
            .find('[role="alert"]') // Find the alert message
            .should('contain', 'Thank you for registering with Main Website Store.') // Verify the message matches

        // Verify the user is redirected to the correct URL after successful registration
        cy.url().should('eq', 'https://magento.softwaretestingboard.com/customer/account/')
    }

}

// Export a new instance of the RegisterPage class
// This allows other test files to use this instance directly
export const onRegister = new RegisterPage();