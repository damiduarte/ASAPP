const loginPage = require('../../support/page_objects/loginPage');
const storePage = require('../../support/page_objects/storePage');
const cartPage = require('../../support/page_objects/cartPage');

describe('E2E', () => {
  beforeEach(() => {
    loginPage.checkUser();
  });

  it('E2E - Finish purchase with multiples products', () => {
    cy.visit('/');
    cy.intercept_E2E_APIS();

    loginPage.makeLogin_E2E();
    storePage.addProductsToCart_E2E(2);
    cartPage.enter_E2E();
    cartPage.finishPayment_E2E();
  });

  afterEach(function() {
    if (this.currentTest.state === 'failed') {
      cartPage.cleanCart();
    }
  });
})