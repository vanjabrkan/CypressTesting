function fillInputField(fieldId, value) {
    cy.get(`.control > input${fieldId}`, { timeout: 10000 }).clear(); // Clear the field to remove any existing text
    if (value) { // Check if a value is provided
        cy.get(`.control > input${fieldId}`).type(value); // Type the value into the field
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

        fillInputField('[name="firstname"]', firstName); // Fill the First Name field
        fillInputField('[name="lastname"]', lastName); // Fill the Last Name field
        fillInputField('[name="street[0]"]', address); // Fill the Street Address field
        fillInputField('[name="city"]', city); // Fill the City field
        fillInputField('[name="postcode"]', zip); // Fill the Zip Code field
        fillInputField('[name="telephone"]', phone); // Fill the Telephone field  
    }
}

// This allows other test files to use this instance directly
export const onOrder = new OrderPage();