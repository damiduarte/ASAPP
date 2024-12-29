const loginPage = require('../support/page_objects/loginPage');
const storePage = require('../support/page_objects/storePage');
const cartPage = require('../support/page_objects/cartPage');

describe('E2E', () => {
  it('E2E - Finish purchase with multiples products', () => {
    cy.visit('/');
    
    loginPage.makeLogin();
    storePage.addProductsToCart();
    cartPage.enter();
    cartPage.validateAddedProducts();
  })
})