

class ErrorPages {

    homebutton = `[data-testid="home-button"]` ; 

    clickOnHomeButton () {
        cy.get(this.homebutton).should('be.visible').click();
    }
}
export const errorPages = new ErrorPages();
