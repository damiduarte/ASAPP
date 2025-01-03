const loginPage = require('../../support/page_objects/loginPage');
const username = 'api_user';
const pwd = 'Aa123123'
const fail_username = 'fail_user';
const fail_pwd = 'fail_pwd';

describe('API - Login', () => {
    it('API - Login - Ok', () => {
        loginPage.checkUser(username, pwd);

        cy.login_API(username, pwd).then(response => {
            cy.wrap(response.status).should('eq', 200);
            cy.wrap(response.body).should('eq', 'Login succeeded.');
        });
    });

    it('API - Login - Invalid user', () => {
        cy.login_API(fail_username, fail_pwd).then(response => {
            cy.wrap(response.status).should('eq', 401);
            cy.wrap(response.body).should('eq', 'Invalid username/password combo.');
        });
    });

    it('API - Login - Invalid pwd', () => {
        cy.login_API(username, fail_pwd).then(response => {
            cy.wrap(response.status).should('eq', 401);
            cy.wrap(response.body).should('eq', 'Invalid username/password combo.');
        });
    });
})

describe('API - Register', () => {
    it('API - Register - Ok', () => {
        const new_username = `${Date.now().toString()}-automation`;
        cy.register_API(new_username, pwd).then(response => {
            cy.wrap(response.status).should('eq', 200);
            cy.wrap(response.body).should('eq', 'User created successfully');
        })
    });

    it('API - Register - Duplicate', () => {
        const new_username = `${Date.now().toString()}-automation`;
        cy.register_API(new_username, pwd).then(() => {
            cy.register_API(new_username, pwd).then(response => {
                cy.wrap(response.status).should('eq', 409);
                cy.wrap(response.body).should('eq', `Username "${new_username}" already exists`);
            })
        });
    })
})

describe('API - Get Products', () => {
    beforeEach(() => {
        loginPage.checkUser(username, pwd);
    })

    it('API - Get Products - Ok', () => {
        cy.get_products_API().then(response => {
            cy.wrap(response.status).should('eq', 200);
            cy.wrap(response.body).each(product => {
                cy.wrap(typeof(product.product_name)).should('eq', 'string');
                cy.wrap(typeof(product.product_qty)).should('eq', 'number');
                cy.wrap(typeof(product.product_descr)).should('eq', 'string');
            });
        });
    })
    
    it('API - Get Products - No Auth', () => {
        cy.get_products_API('dsadsa').then(response => {
            cy.wrap(response.status).should('eq', 401);
            cy.wrap(response.body).should('eq', 'User must be logged-in to perform this action');
        });
    })
})