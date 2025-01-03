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

Cypress.Commands.add('logout_API', (username) => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('baseUrlAPI')}/users/logout`,
        body: {
            username: username
        }
    });
})

Cypress.Commands.add('register_API', (username, pwd) => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('baseUrlAPI')}/users/register`,
        body: {
            username: username,
            password: pwd
        },
        failOnStatusCode: false
    });
})

Cypress.Commands.add('login_API', (username, pwd) => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('baseUrlAPI')}/users/login`,
        body: {
            username: username,
            password: pwd
        },
        failOnStatusCode: false
    });
})

Cypress.Commands.add('get_products_API', (username = Cypress.env('username')) => {
    return cy.request({
        method: 'GET',
        url: `${Cypress.env('baseUrlAPI')}/${username}/products`,
        failOnStatusCode: false
    })
})

Cypress.Commands.add('get_product_info_API', (username = Cypress.env('username'), product_name) => {
    return cy.request({
        method: 'GET',
        url: `${Cypress.env('baseUrlAPI')}/${username}/products/${product_name}`,
        failOnStatusCode: false
    })
})

Cypress.Commands.add('get_cart_API', () => {
    return cy.request('GET', `${Cypress.env('baseUrlAPI')}/${username}/products/cart`);
})

Cypress.Commands.add('remove_cart_item_API', (product_name) => {
    return cy.request('POST', `${Cypress.env('baseUrlAPI')}/${username}/products/cart/${product_name}/remove`);
})