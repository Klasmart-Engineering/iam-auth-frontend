
before(() => {
    cy.log(`Starting IAM regression`);
    let viewport = Cypress.env(`VIEWPORT`);
    if(viewport == null) {
        viewport = `mac`;
    }
    cy.viewport(viewport);
});
