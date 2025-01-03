const storePage = require('./storePage');

const user_input = '#username';
const pwd_input = '#password';
const username = Cypress.env('username');
const pwd = Cypress.env('pwd');

export class LoginPage{
    checkUser(){
        cy.login_API(username, pwd).then(response => {
            if(response.status === 401){
                cy.register_API(username, pwd);
            }else{
                cy.logout_API(username);
            }
        })
    }
    
    makeLogin_E2E(){
        this.makeLogin().then(() => {
            this.validateLoginAPI();
            storePage.validateLoadedProductsAPI();
        });
    }

    makeLogin(){
        cy.get(user_input).type(username);
        cy.get(pwd_input).type(pwd);
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
        cy.wait('@loginAPI').then(login_intercept => {
            const request_body = login_intercept.request.body;
            const response_data = login_intercept.response;
            
            cy.wrap(request_body.username).should('eq', username);
            cy.wrap(request_body.password).should('eq', pwd);
            cy.wrap(response_data.statusCode).should('eq', 200);
            cy.wrap(response_data.body).should('eq', 'Login succeeded.');
        })
    }
}

module.exports = new LoginPage();