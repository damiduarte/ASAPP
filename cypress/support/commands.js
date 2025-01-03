// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const loginPage = require('../support/page_objects/loginPage');
const storePage = require('../support/page_objects/storePage');
const cartPage = require('../support/page_objects/cartPage');
const username = Cypress.env('username');

Cypress.Commands.add('intercept_E2E_APIS', () => {
        loginPage.interceptLoginAPI();
        storePage.interceptProductsAPI();
        storePage.interceptAddToCartAPI();
        cartPage.interceptProductsCartAPI();
        cartPage.interceptCheckoutAPI();
})

Cypress.Commands.add('get_cart_API', () => {
    return cy.request('GET', `${Cypress.env('baseUrlAPI')}/${username}/products/cart`);
})

Cypress.Commands.add('remove_cart_item_API', (product_name) => {
    return cy.request('POST', `${Cypress.env('baseUrlAPI')}/${username}/products/cart/${product_name}/remove`);
})