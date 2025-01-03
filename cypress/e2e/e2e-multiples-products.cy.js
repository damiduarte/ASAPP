const loginPage = require('../support/page_objects/loginPage');
const storePage = require('../support/page_objects/storePage');
const cartPage = require('../support/page_objects/cartPage');

describe('E2E', () => {
  it('E2E - Finish purchase with multiples products', () => {
    cy.visit('/');
    loginPage.interceptLoginAPI();
    storePage.interceptProductsAPI();
    storePage.interceptAddToCartAPI();
    cartPage.interceptProductsCartAPI();
    cartPage.interceptCheckoutAPI();

    loginPage.makeLogin().then(() => {
      loginPage.validateLoginAPI();
      storePage.validateLoadedProductsAPI();
    });

    storePage.obtainAllProductsCards().each((product_card, i) => {
      storePage.addProductToCart(product_card).then(() => {
        storePage.validateAddToCartPopUp();
        storePage.getProductCardTitle(product_card).then(product_title => {
          storePage.saveProductTitleAndQuantity(product_title);
          storePage.validateAddToCartAPI(product_title);
        })
        if(i === 1){return false;} //Break loop after adding 2 products
      });
    });

    cartPage.enter().then(() => {
      cartPage.validateCartAPI();
      cartPage.validateAddedProducts();
    });

    cartPage.getBuyBtn().click().then(() => {
      cartPage.validateCheckoutAPI();
      cartPage.getSuccessfullBuyPopupBtn().click();
    });
  })

  afterEach(function() {
    if (this.currentTest.state === 'failed') {
      cartPage.cleanCart();
    }
  });
})