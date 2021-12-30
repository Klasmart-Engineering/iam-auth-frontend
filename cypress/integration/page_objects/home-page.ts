
class HomePage {
    dashboardWelcomeText = '.jss118';
    youAreNotAPartOfOrgPage = ':nth-child(2) > .MuiTypography-root';
    profileButton = '#app > div > div > header > div > div > div.MuiBox-root.jss186 > div > button';
    

    getWelcomeText() {
        return cy.get(this.dashboardWelcomeText);
    }

    getNotPartOfOrgText() {
        return cy.get(this.youAreNotAPartOfOrgPage);
    }
   
    clickOnProfile() {
       cy.get(this.profileButton).click({ force: true });
    } 
    
    clickOnSignoutLink() {
        cy.contains('Sign out')
        .should('be.visible')
        .click();
    }
};

export const homePage = new HomePage();
