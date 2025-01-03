const username = Cypress.env('username');
const products_card = '[data-test-name="product-card"]';
const product_title = '[data-test-name="product-title"]';
const product_desc = '[data-test-name="product-desc"]';
const quantity_input = '.MuiInputBase-root';
const add_to_cart_button = '[data-test-name="add-to-cart-button"]';
const out_of_stock_lbl = '[data-test-name="out-of-stock-label"]';
const add_to_cart_text_alert = '#snackbar-fab-message-id';
var quantity;
var products_titles_obj_array = [];

const noProductsLbl = '[data-test-name="no-products-found"]';
export class StorePage{
    addProductsToCart_E2E(quantity){
        this.getAllProductsCards().each((product_card, i) => {
            this.addProductToCart(product_card).then(() => {
                this.validateAddToCartPopUp();
                this.getProductCardTitle(product_card).then(product_title => {
                    this.saveProductTitleAndQuantity(product_title);
                    this.validateAddToCartAPI(product_title);
                })
            });
            if(i === quantity - 1){return false;} //Break loop after adding the desired quantity of products
        });
    }

    enter(){
        cy.contains('Store').click();
    }

    interceptProductsAPI(){
        cy.intercept('GET', `${username}/products`).as('obtainedProductsAPI');
    }

    interceptAddToCartAPI(){
        cy.intercept('POST', `${username}/products/*/add`).as('addToCartAPI');
    }

    interceptProductsAPI_mockOutOfStock(){
        cy.intercept('GET', `${username}/products`, {
            statusCode: 200,
            body: [{
                product_descr: "State of the art pen, hand-crafted by the internationally famous D. Lacy. We guarantee it will never run out of ink.",
                product_name: "ASAPP Pens",
                product_qty: 0
            }]
        }).as('addToCartAPI');
    }

    interceptProductsAPI_mockNoProducts(){
        cy.intercept('GET', `${username}/products`, {
            body: []
        }).as('obtainedProductsAPI');
    }

    validateAddToCartPopUp(){
        cy.get(add_to_cart_text_alert).invoke('text').should('equal', 'Product Added to Cart');
    }

    validateAddToCartAPI(product_title){    
        /**
         * Validates the Add to Cart API by waiting for the '@addToCartAPI' alias.
         * It checks that the request body contains the expected quantity and that the response status code is 200.
         */
        cy.wait('@addToCartAPI').then(addToCartIntercept => {
            const request_endpoint = addToCartIntercept.request.url;
            const request_body = addToCartIntercept.request.body;
            const response_data = addToCartIntercept.response;

            cy.wrap(request_endpoint).should('contain', product_title.replaceAll(' ', '%20'));
            cy.wrap(request_body.quantity).should('eq', quantity);
            cy.wrap(response_data.statusCode).should('eq', 200);
        });
    }

    validateLoadedProductsAPI(){
        /**
         * This function waits for the '@obtainedProductsAPI' network request to complete, then iterates over each product card
         * on the cart page and checks that the product title and description match the corresponding data from the network response.
         */
        cy.wait('@obtainedProductsAPI').then(products_intercept => {
            const response_data = products_intercept.response;

            cy.get(products_card).each((product_card, i) => {
                cy.wrap(product_card).find(product_title).invoke('text').should('equal', response_data.body[i].product_name);
                cy.wrap(product_card).find(product_desc).invoke('text').should('equal', response_data.body[i].product_descr);
            });
        });
    }

    addProductToCart(product_card){
        /*
        * Clicks on the quantity input, sets it to 1 and adds the product to the cart
        */
        cy.wrap(product_card).find(quantity_input).click();
        quantity = '1';
        this.setProductsQuantity(quantity);

        return cy.wrap(product_card).find(add_to_cart_button).click();
    }

    saveProductTitleAndQuantity(product_title){
        /*
        * Saves the given title and quantity
        */
        const product_info = {
            title: product_title,
            quantity: quantity
        }
        products_titles_obj_array.push(product_info);
        cy.wrap(products_titles_obj_array).as('product_titles');
    }

    getProductCardTitle(product_card){
        return cy.wrap(product_card).find(product_title).invoke('text');
    }

    getAllProductsCards(){
        return cy.get(products_card);
    }

    getNoProductsFoundLbl(){
        return cy.get(noProductsLbl);
    }

    getOutOfStockLbl(){
        return cy.get(out_of_stock_lbl);
    }

    setProductsQuantity(n){
        const quantity_selector = `[data-value="${n}"]`;
        cy.get(quantity_selector).click({force: true});
    }
}
module.exports = new StorePage();