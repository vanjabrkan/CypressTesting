import { navigateTo } from "../../support/pageObjects/navigation";
import { onOrder } from "../../support/pageObjects/order";

describe('Cart Tests', () => {

    beforeEach('Open application and navigate to gear > watches', () => {
       cy.visit('/') // Open the homepage
       navigateTo.goToWatchesPage(); // Navigate to the "Sign In" page
   });

   it('Should be able to add product to cart', () => {
    onOrder.validateTheOrderPage();

   })


});

