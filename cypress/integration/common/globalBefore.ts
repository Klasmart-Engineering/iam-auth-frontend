
before(() => {
    cy.log(`Starting IAM regression`);
    const viewport = Cypress.env(`VIEWPORT`);
    if(viewport != null) {
        cy.viewport(viewport);
    }
});
