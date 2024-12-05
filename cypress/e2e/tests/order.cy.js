import { navigateTo } from "../../support/pageObjects/navigation";
import { onOrder } from "../../support/pageObjects/order";
import { shippingData } from "../../support/commands";

describe('Order Tests', () => {

    beforeEach('Open application and navigate to gear > watches', () => {
       cy.visit('/') // Open the homepage
       navigateTo.goToWatchesPage(); // Navigate to the "Sign In" page
    });

    it('Order is not placed', () => {
        onOrder.validateTheOrderPage();
        onOrder.chooseTheProduct();
        onOrder.addToCart();
        onOrder.succesfullyAdded();
        onOrder.goToCart();
        onOrder.proceedToCheckout();
        onOrder.shipping({
            ...shippingData, // Use valid test data
            firstName: ' ' //empty first name
          });
        onOrder.validateErrorMessageField('field-error', 'This is a required field.');
    })

    it('Order is placed', () => {
        onOrder.validateTheOrderPage();
        onOrder.chooseTheProduct();
        onOrder.addToCart();
        onOrder.succesfullyAdded();
        onOrder.goToCart();
        onOrder.proceedToCheckout();
        onOrder.shipping({
            ...shippingData // Use valid test data
          });
        onOrder.payment();
    })

});

