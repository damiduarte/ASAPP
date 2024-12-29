export class CartPage{
    enter(){
        cy.contains('Cart').click();
    }

    validateAddedProducts(){
        cy.get('@product_titles').each(product_title => {
            cy.contains(product_title.title).next().invoke('text').should('equal', product_title.quantity);
        })
    }

}
module.exports = new CartPage();