const storePage = require('./storePage');

const userInput = '#username';
const pwdInput = '#password';
const username = Cypress.env('username');
const pwd = Cypress.env('pwd');

export class LoginPage{
    interceptLoginAPI(){
        cy.intercept('POST', '/users/login').as('loginAPI');
    }

    makeLogin_E2E(){
        this.makeLogin().then(() => {
            this.validateLoginAPI();
            storePage.validateLoadedProductsAPI();
        });
    }

    /*
    * This function inputs the provided username and password into their respective fields,
    * and clicks the 'Log In' button. It then waits for the intercepted request
    * to complete and verifies the request body and response data.
    */
    makeLogin(){
        cy.get(userInput).type(username);
        cy.get(pwdInput).type(pwd);
        return cy.contains('Log In').click();
    }

    validateLoginAPI(){
        cy.wait('@loginAPI').then(loginIntercept => {
            const requestBody = loginIntercept.request.body;
            const responseData = loginIntercept.response;
            
            cy.wrap(requestBody.username).should('eq', username);
            cy.wrap(requestBody.password).should('eq', pwd);
            cy.wrap(responseData.statusCode).should('eq', 200);
            cy.wrap(responseData.body).should('eq', 'Login succeeded.');
        })
    }
}

module.exports = new LoginPage();