const storePage = require('./storePage');

const user_input = '#username';
const pwd_input = '#password';
var username = Cypress.env('username');
var pwd = Cypress.env('pwd');

export class LoginPage{
    checkUser(user, password){
        if(username === undefined || pwd === undefined){
            user = Cypress.env('username');
            password = Cypress.env('pwd');
        }

        cy.login_API(user, password).then(response => {
            if(response.status === 401){
                cy.register_API(user, password);
            }else{
                cy.logout_API(user);
            }
        })
    }
    
    makeLogin_E2E(){
        this.makeLogin().then(() => {
            this.validateLoginAPI();
            storePage.validateLoadedProductsAPI();
        });
    }

    makeLogin(user, password){
        if(username === undefined || pwd === undefined){
            user = Cypress.env('username');
            password = Cypress.env('pwd');
        }

        cy.get(user_input).type(user);
        cy.get(pwd_input).type(password);
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