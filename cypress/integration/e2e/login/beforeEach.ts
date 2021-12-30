beforeEach(() => {
    cy.log(`Starteed `);
    cy.log(Cypress.spec.name);
});

afterEach(()=> {
    cy.log(`Finished `, Cypress.spec.name);
});
