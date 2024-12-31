const product_row = '.cart-table-row';
const purchaseOkPopup = '[role="dialog"]';
const purchaseOkBtn = '[type="button"]';

export class CartPage{
    enter(){
        cy.contains('Cart').click();
    }

    buyBtn(){
        return cy.contains('BUY!');
    }

    validateAddedProducts(){
        cy.get('@product_titles').each(product_title => {
            cy.contains(product_title.title).next().invoke('text').should('equal', product_title.quantity);
        })
    }

    cleanCart(){
        cy.get(product_row).each(row => {
            cy.wrap(row).contains('x').click({force: true});
        })
    }

    successfullBuyPopupBtn() {
        return cy.get(purchaseOkPopup).find(purchaseOkBtn);
    }

}
module.exports = new CartPage();