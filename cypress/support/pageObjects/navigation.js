export class Navigation {
// It contains reusable functions for accessing common pages like Create Account and Sign In.

  // Navigates to the "Create an Account" page.
  goToCreateAccount() {
    cy.get('header') // Targets the header element where the link is located.
      .find('a') // Looks for all anchor tags in the header.
      .contains('Create an Account') // Finds the link containing the text "Create an Account".
      .click() // Clicks the link to navigate to the Create Account page.
  }
}
// Export an instance of the Navigation class for use in tests
export const navigateTo = new Navigation();