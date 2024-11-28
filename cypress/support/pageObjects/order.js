export class OrderPage {

    validateTheOrderPage() {
        cy.get('.page-title-wrapper [data-ui-id="page-title-wrapper"]')
        .should('be.visible') 
        .and('contain', 'Watches');  
    }
}

// This allows other test files to use this instance directly
export const onOrder = new OrderPage();