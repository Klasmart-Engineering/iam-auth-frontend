

class ErrorPages {

    homebutton = `[type="submit"]` ; 

    clickOnHomeButton () {
        cy.get(this.homebutton).should('be.visible').click();
    }
}
export const errorPages = new ErrorPages();
