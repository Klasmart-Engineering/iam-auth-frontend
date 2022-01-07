import { waitFor } from "@testing-library/react";

class HomePage {
    dashboardWelcomeText = `.jss118`;
    youAreNotAPartOfOrgPage = `:nth-child(2) > .MuiTypography-root`;
    profileButton = `#app > div > div > header > div > div > div.MuiBox-root.jss186 > div > button`;

    async getWelcomeText (errorText: string) {
        await waitFor(() => {
            cy.get(this.dashboardWelcomeText).should(`be.visible`);
        });
        cy.get(this.dashboardWelcomeText).should(`contain`, errorText);
    }

    getNotPartOfOrgText () {
        return cy.get(this.youAreNotAPartOfOrgPage);
    }

    async clickOnProfile () {
        await waitFor(() => {
            cy.get(this.profileButton).should(`exist`);
        });
        cy.get(this.profileButton).click({
            force: true,
        });
    }

    clickOnSignoutLink () {
        cy.contains(`Sign out`)
            .should(`be.visible`)
            .click();
    }
}

export const homePage = new HomePage();
