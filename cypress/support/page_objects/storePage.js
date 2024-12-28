const product_card = '[data-test-name="product-card"]';
const quantity_input = '.MuiInputBase-root';
const add_to_cart_button = '[data-test-name="add-to-cart-button"]';
const add_to_cart_text_alert = '#snackbar-fab-message-id'

export class StorePage{
    enter(){
        cy.contains('STORE');
    }

    /*
     * This function iterates over the first two product cards found on the page.
     * Each iteration clicks on the quantity input, sets it to 1 and add the product to the cart
     */
    addProductsToCart(){
        cy.get(product_card).each((product_card, i) => {
            cy.wrap(product_card).find(quantity_input).click();
            this.setProductsQuantity(1);
            cy.wrap(product_card).find(add_to_cart_button).click();
            cy.get(add_to_cart_text_alert).invoke('text').should('equal', 'Product Added to Cart');

            if(i === 1){return false;}
        });
    }

    setProductsQuantity(n){
        const quantity_selector = `[data-value="${n}"]`;
        cy.get(quantity_selector).click({force: true});
    }
}
module.exports = new StorePage();