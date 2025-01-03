const loginPage = require('../../support/page_objects/loginPage');
const storePage = require('../../support/page_objects/storePage');

describe('CORE', () => {
  beforeEach(() => {
    loginPage.checkUser();
  });

  it('CORE - Store - No products found', () => {
    storePage.interceptProductsAPI_mockNoProducts();
    cy.visit('/');
    loginPage.makeLogin();
    
    storePage.getNoProductsFoundLbl().invoke('text').should('eq', 'No products found');
  })

  it('CORE - Store - No stock', () => {
    storePage.interceptProductsAPI_mockOutOfStock();
    cy.visit('/');
    loginPage.makeLogin();

    storePage.getOutOfStockLbl().invoke('text').should('eq', 'Out of Stock!');
  })
})

