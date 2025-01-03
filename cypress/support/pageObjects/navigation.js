export class Navigation {
// It contains reusable functions for accessing common pages like Create Account and Sign In.

  // Navigates to the "Create an Account" page.
  goToCreateAccount() {
    cy.get('header') // Targets the header element where the link is located.
      .find('a') // Looks for all anchor tags in the header.
      .contains('Create an Account') // Finds the link containing the text "Create an Account".
      .click() // Clicks the link to navigate to the Create Account page.
  }

    // Navigates to the "Sign In" page.
  goToSignIn() {
    cy.get('header') // Targets the header element where the link is located.
      .find('a') // Looks for all anchor tags in the header.
      .contains('Sign In') // Finds the link containing the text "Sign In".
      .click() // Clicks the link to navigate to the Create Account page.
    }

    // Navigates to the "Watches" page.
  goToWatchesPage() {
    cy.get('nav[data-action="navigation"]') 
      .find('a[id="ui-id-6"]') 
      .contains('Gear') 
      .trigger('mouseover');

    cy.get('a#ui-id-27').click();
  }
}
// Export an instance of the Navigation class for use in tests
export const navigateTo = new Navigation();