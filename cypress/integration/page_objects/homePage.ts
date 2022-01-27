import { waitFor } from "@testing-library/react";

class HomePage {
    dashboardWelcomeText = `.jss118`;
    youAreNotAPartOfOrgPage = `:nth-child(2) > .MuiTypography-root`;
    profileButton = `[data-testid=profile-icon]`;
    signOutButton = `[data-testid="logout-button"] > .MuiButton-label`;

    async getWelcomeText (errorText: string) {
        await waitFor(() => {
            cy.contains(errorText)
                .should(`be.visible`);

        });
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
        cy.get(this.signOutButton).should(`be.visible`).click();
    }
}

export const homePage = new HomePage();
