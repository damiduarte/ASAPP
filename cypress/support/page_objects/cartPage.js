const product_row = '.cart-table-row';
const purchaseOkPopup = '[role="dialog"]';
const purchaseOkBtn = '[type="button"]';

export class CartPage{
    enter(){
        cy.contains('Cart').click().then(() => {
            cy.wait('@getCartAPI').then(cartIntercept => {
                const responseData = cartIntercept.response;

                cy.wrap(responseData.statusCode).should('eq', 200);
                cy.wrap(responseData.body).each(product => {
                    cy.contains(product.product_name).next().invoke('text').should('equal', product.product_qty.toString());
                })
            })
        });
    }

    interceptProductsCartAPI(){
        cy.intercept('GET', '/dam_test/products/cart').as('getCartAPI');
    }

    getBuyBtn(){
        return cy.contains('BUY!');
    }

    /*
    * This function iterates over each product title stored in the alias '@product_titles',
    * finds the corresponding product in the CART, and checks if the displayed quantity
    * matches the expected quantity.
    */
    validateAddedProducts(){
        cy.get('@product_titles').each(product_title => {
            cy.contains(product_title.title).next().invoke('text').should('equal', product_title.quantity);
        })
    }

    cleanCart(){
        cy.get(product_row).each(row => {
            cy.wrap(row).contains('x').click({force: true});
        })
    }

    getSuccessfullBuyPopupBtn() {
        return cy.get(purchaseOkPopup).find(purchaseOkBtn);
    }

}
module.exports = new CartPage();