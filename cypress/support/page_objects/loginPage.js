export class LoginPage{
    makeLogin(){
        cy.get('#username').type('dam_test');
        cy.get('#password').type('Aa123123');
        cy.contains('Log In').click();
    }
}

module.exports = new LoginPage();