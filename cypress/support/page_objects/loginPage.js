const userInput = '#username';
const pwdInput = '#password';
const username = 'dam_test';
const pwd = 'Aa123123';

export class LoginPage{
    makeLogin(){
        cy.intercept('POST', '/users/login').as('loginAPI');
        cy.get(userInput).type(username);
        cy.get(pwdInput).type(pwd);
        cy.contains('Log In').click()

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