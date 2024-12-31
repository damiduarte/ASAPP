const products_card = '[data-test-name="product-card"]';
const product_title = '[data-test-name="product-title"]';
const quantity_input = '.MuiInputBase-root';
const add_to_cart_button = '[data-test-name="add-to-cart-button"]';
const add_to_cart_text_alert = '#snackbar-fab-message-id';
var quantity;
var products_titles_obj_array = [];

export class StorePage{
    enter(){
        cy.contains('STORE').click();
    }

    addProductsToCart(){
        /*
        * This function iterates over the first two product cards found on the page.
        * Each iteration clicks on the quantity input, sets it to 1, adds the product to the cart
        * and saves the product title in an alias
        */
        cy.get(products_card).each((product_card, i) => {
            cy.wrap(product_card).find(quantity_input).click();
            quantity = 1;
            this.setProductsQuantity(quantity);

            cy.wrap(product_card).find(add_to_cart_button).click();
            cy.get(add_to_cart_text_alert).invoke('text').should('equal', 'Product Added to Cart');

            this.saveProductsTitles(product_card);

            if(i === 1){return false;}
        });
    }

    setProductsQuantity(n){
        const quantity_selector = `[data-value="${n}"]`;
        cy.get(quantity_selector).click({force: true});
    }

    /**
     * Saves the titles of the given product cards into an array of product information objects.
     */
    saveProductsTitles(product_card){
        cy.wrap(product_card).find(product_title).invoke('text').then((product_title) => {
            const product_info = {
                title: product_title,
                quantity: quantity.toString()
            }
            products_titles_obj_array.push(product_info);
            cy.wrap(products_titles_obj_array).as('product_titles');
        })
    }
}
module.exports = new StorePage();