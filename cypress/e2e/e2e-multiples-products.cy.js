const loginPage = require('../support/page_objects/loginPage');
const storePage = require('../support/page_objects/storePage');

describe('template spec', () => {
  it('E2E - Finish purchase with multiples products', () => {
    cy.visit('/');
    
    loginPage.makeLogin();
    storePage.addProductsToCart();
  })
})