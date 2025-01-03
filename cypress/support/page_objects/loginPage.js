const storePage = require('./storePage');

const userInput = '#username';
const pwdInput = '#password';
const username = Cypress.env('username');
const pwd = Cypress.env('pwd');

export class LoginPage{
    makeLogin_E2E(){
        this.makeLogin().then(() => {
            this.validateLoginAPI();
            storePage.validateLoadedProductsAPI();
        });
    }

    makeLogin(){
        cy.get(userInput).type(username);
        cy.get(pwdInput).type(pwd);
        return cy.contains('Log In').click();
    }
    
    interceptLoginAPI(){
        cy.intercept('POST', '/users/login').as('loginAPI');
    }

    validateLoginAPI(){
        /**
         * This function waits for the login API call to complete, then validates the request body and response data.
         * It checks that the username and password in the request body match the expected values, and that the response status code is 200 with a body of 'Login succeeded.'
         */
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