import { navigateTo } from "../../support/pageObjects/navigation";
import { onOrder } from "../../support/pageObjects/order";
import { shippingData } from "../../support/commands";

describe('Cart Tests', () => {

    beforeEach('Open application and navigate to gear > watches', () => {
       cy.visit('/') // Open the homepage
       navigateTo.goToWatchesPage(); // Navigate to the "Sign In" page
    });

    it('Should be able to add product to cart', () => {
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

