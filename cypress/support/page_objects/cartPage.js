const username = Cypress.env('username');
const product_row = '.cart-table-row';
const purchaseOkPopup = '[role="dialog"]';
const purchaseOkBtn = '[type="button"]';

export class CartPage{
    enter_E2E(){
        this.enter().then(() => {
            this.validateCartAPI();
            this.validateAddedProducts();
        });
    }

    finishPayment_E2E(){
        this.getBuyBtn().click().then(() => {
            this.validateCheckoutAPI();
            this.getSuccessfullBuyPopupBtn().click();
        });
    }

    enter(){
        return cy.contains('Cart').click();
    }

    getBuyBtn(){
        return cy.contains('BUY!');
    }

    getSuccessfullBuyPopupBtn() {
        return cy.get(purchaseOkPopup).find(purchaseOkBtn);
    }

    interceptProductsCartAPI(){
        cy.intercept('GET', `/${username}/products/cart`).as('getCartAPI');
    }

    interceptCheckoutAPI(){
        cy.intercept('POST', `/${username}/products/cart/checkout`).as('checkoutAPI');
    }

    validateAddedProducts(){
        /*
        * This function iterates over each product title stored in the alias '@product_titles',
        * finds the corresponding product in the CART, and checks if the displayed quantity
        * matches the expected quantity obtained when added product to the cart.
        */
        cy.get('@product_titles').each(product_title => {
            cy.contains(product_title.title).next().invoke('text').should('equal', product_title.quantity);
        })
    }

    validateCartAPI(){
        /*
        * Validates that the cart has been loaded correctly by checking the response from the getCartAPI.
        * It waits for the '@getCartAPI' alias, verifies the status code is 200, and then checks that each product's
        * name and quantity in the response match the displayed values on the page.
        */
        cy.wait('@getCartAPI').then(cartIntercept => {
            const responseData = cartIntercept.response;

            cy.wrap(responseData.statusCode).should('eq', 200);
            cy.wrap(responseData.body).each(product => {
                cy.contains(product.product_name).next().invoke('text').should('equal', product.product_qty.toString());
            })
        })
    }
    
    validateCheckoutAPI(){
        cy.wait('@checkoutAPI').then(checkoutIntercept => {
            const responseData = checkoutIntercept.response;
            cy.wrap(responseData.statusCode).should('eq', 200);
            cy.wrap(responseData.body).should('eq', 'Checkout successful! Thank you for shopping with us.');
        });
    }

    cleanCart(){
        cy.get(product_row).each(row => {
            cy.wrap(row).contains('x').click({force: true});
        })
    }
}
module.exports = new CartPage();