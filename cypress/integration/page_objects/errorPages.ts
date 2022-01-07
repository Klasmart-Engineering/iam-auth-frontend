class ErrorPages {

    clickOnHomeButton (){
        cy.contains(`Home`)
            .should(`be.visible`)
            .click();
    }
}
export const errorPages = new ErrorPages();
