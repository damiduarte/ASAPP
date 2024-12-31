const loginPage = require('../support/page_objects/loginPage');
const storePage = require('../support/page_objects/storePage');
const cartPage = require('../support/page_objects/cartPage');

describe('E2E', () => {
  it('E2E - Finish purchase with multiples products', () => {
    cy.visit('/');
    loginPage.interceptLoginAPI();
    storePage.interceptProductsAPI();
    storePage.interceptAddToCartAPI();

    loginPage.makeLogin();
    storePage.validateLoadedItems();
    storePage.addProductsToCart();
    cartPage.enter();
    cartPage.validateAddedProducts();
    cartPage.getBuyBtn().click();
    cartPage.getSuccessfulBuyPopupBtn().click();
  })

  afterEach(function() {
    if (this.currentTest.state === 'failed') {
      cartPage.cleanCart();
    }
  });
})