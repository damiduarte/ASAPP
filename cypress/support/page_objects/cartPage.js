const product_row = '.cart-table-row';

export class CartPage{
    enter(){
        cy.contains('Cart').click();
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

}
module.exports = new CartPage();