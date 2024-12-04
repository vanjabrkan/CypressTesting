function fillInputFields(fieldId, value) {
    cy.wait(1500);
    cy.get(`input${fieldId}`).eq(0).clear(); // Clear the field to remove any existing text
    if (value) { // Check if a value is provided
        cy.get(`.control > input${fieldId}`).eq(0).type(value); // Type the value into the field
    }
}



export class OrderPage {

    validateTheOrderPage() {
        cy.get('.page-title-wrapper [data-ui-id="page-title-wrapper"]')
        .should('be.visible') 
        .and('contain', 'Watches');  
    }

    chooseTheProduct() {
    // Find all products and select the eighth one (index 7)
        cy.get('.products .product-item')
        .eq(7) // Index 7 corresponds to the eighth element
        .within(() => {
            cy.get('.product-item-name a')
                .should('be.visible')
                .click() // Perform the click action
                .invoke('text') // Extract the product name
                .as('productName')
                .then((text) => {
                     cy.log('The name of the eighth product is: ' + text.trim());
                });
        });
    }

    addToCart() {
        cy.get('.fieldset')
            .find('[id="product-addtocart-button"]')
                .should('be.visible')
                .click() // Perform the click action
    };
   
    succesfullyAdded() {
        cy.get('[role="alert"]')
            .should('exist') // Ensure the alert exists
            .should('be.visible')
            .then(() => {
                cy.get('@productName').then((name) => {
                    cy.get('[role="alert"]')
                        .should('contain', `You added ${name.trim()} to your shopping cart.`); // Verifikuje tačan naziv proizvoda
                });
            });
    }

    goToCart() {
        cy.get('.minicart-wrapper')
            .should('contain', `My Cart`)
            .click() // Perform the click action

        cy.get('.block-content')
            .find('.actions')
            .find('.secondary')
            .find('[class="action viewcart"]')
            .should('contain', `View and Edit Cart`)
            .click() // Perform the click action
    };

    proceedToCheckout() {
        cy.wait(1500);
        cy.get('.cart-summary')
            .find('[data-role="proceed-to-checkout"]')
            .should('contain', `Proceed to Checkout`)
            .click() // Perform the click action
    };

    shipping({ firstName, lastName, email, address, city, zip, phone }) {
        cy.wait(1500);
        cy.get('#shipping')
        .find('[data-role="title"]')
        .should('contain', `Shipping Address`)

        fillInputFields('[id="customer-email"]', email); // Fill the Email field
        fillInputFields('[name="firstname"]', firstName); // Fill the First Name field
        fillInputFields('[name="lastname"]', lastName); // Fill the Last Name field
        fillInputFields('[name="street[0]"]', address); // Fill the Street Address field
        fillInputFields('[name="city"]', city); // Fill the City field
        fillInputFields('[name="postcode"]', zip); // Fill the Zip Code field
        cy.get('select[name="country_id"]').select('DE');
        fillInputFields('[name="telephone"]', phone); // Fill the Telephone field

        cy.get('button[type="submit"][data-role="opc-continue"]').click(); // Click the Submit button
    }

    payment() {
        cy.wait(1500);
        cy.get('.payment-group [data-role="title"]')
        .should('be.visible') 
        .and('contain', 'Payment Method');  

        cy.get('button[type="submit"][title="Place Order"]')
        .should('be.visible') 
        .click(); // Click the Submit button

        cy.get('.page-title-wrapper [data-ui-id="page-title-wrapper"]')
        .should('be.visible') 
        .and('contain', 'Thank you for your purchase!');  
    }

}

// This allows other test files to use this instance directly
export const onOrder = new OrderPage();